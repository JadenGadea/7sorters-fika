import { kv } from "@vercel/kv";
import { getCharacter } from "@/data/characters";
import type { FeedEvent } from "@/lib/feed";
import { NextRequest, NextResponse } from "next/server";

const FEED_KEY = "feed:events";
const MAX_EVENTS = 200;
const RATE_LIMIT_SECONDS = 30;

export async function GET() {
  try {
    const events = await kv.lrange<FeedEvent>(FEED_KEY, 0, 49);
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { characterId, name } = body as {
      characterId: number;
      name?: string;
    };

    const character = getCharacter(characterId);
    if (!character) {
      return NextResponse.json({ error: "Unknown character" }, { status: 400 });
    }

    // Rate limit by IP
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const rateLimitKey = `ratelimit:${ip}`;
    const existing = await kv.get(rateLimitKey);
    if (existing) {
      return NextResponse.json(
        { error: "Vänta lite innan du matar igen!" },
        { status: 429 }
      );
    }
    await kv.set(rateLimitKey, 1, { ex: RATE_LIMIT_SECONDS });

    const event: FeedEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      characterId: character.id,
      characterName: character.name,
      characterEmoji: character.emoji,
      name: name?.trim() || "Anonym",
      timestamp: Date.now(),
    };

    await kv.lpush(FEED_KEY, event);
    await kv.ltrim(FEED_KEY, 0, MAX_EVENTS - 1);

    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Något gick fel" },
      { status: 500 }
    );
  }
}
