"use client";

import { useEffect, useState, useCallback } from "react";
import type { FeedEvent } from "@/lib/feed";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 10) return "just nu";
  if (seconds < 60) return `${seconds}s sedan`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m sedan`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h sedan`;
  return `${Math.floor(hours / 24)}d sedan`;
}

export default function FeedList() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  const fetchEvents = useCallback(async (isInitial: boolean) => {
    try {
      const res = await fetch("/api/feed");
      const data: FeedEvent[] = await res.json();

      if (!isInitial && data.length > 0) {
        const fresh = new Set(
          data
            .filter((e) => !events.some((prev) => prev.id === e.id))
            .map((e) => e.id)
        );
        if (fresh.size > 0) {
          setNewIds(fresh);
          setTimeout(() => setNewIds(new Set()), 1000);
        }
      }

      setEvents(data);
    } catch {
      // silently retry next poll
    }
  }, [events]);

  useEffect(() => {
    fetchEvents(true);
    const interval = setInterval(() => fetchEvents(false), 5000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update relative timestamps
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 10000);
    return () => clearInterval(timer);
  }, []);

  if (events.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        Inga matningar ännu. Bli den första! 🍪
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {events.map((event) => (
        <li
          key={event.id}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-500 ${
            newIds.has(event.id)
              ? "bg-amber-50 scale-[1.02]"
              : "bg-white shadow-sm"
          }`}
        >
          <span className="text-2xl">{event.characterEmoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-semibold">{event.name}</span> matade{" "}
              <span className="font-semibold">{event.characterName}</span>
            </p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {timeAgo(event.timestamp)}
          </span>
        </li>
      ))}
    </ul>
  );
}
