import { notFound } from "next/navigation";
import { characters, getCharacter } from "@/data/characters";
import SwishButton from "@/components/SwishButton";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return characters.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = getCharacter(Number(id));
  if (!character) return {};
  return {
    title: `${character.name} — 7Sorters Fika`,
    description: `Mata ${character.name} på ${character.cafe}! Din fika-peng ger en ensam äldre person sällskap.`,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;
  const character = getCharacter(Number(id));

  if (!character) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
        <Link
          href="/"
          className="self-start text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Alla karaktärer
        </Link>

        <div
          className="flex h-32 w-32 items-center justify-center rounded-full text-7xl"
          style={{ backgroundColor: character.color + "25" }}
        >
          {character.emoji}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{character.name}</h1>
          <p className="text-sm text-gray-500 mt-1">📍 {character.cafe}</p>
        </div>

        <p className="text-gray-700 leading-relaxed">{character.description}</p>

        <SwishButton characterId={character.id} characterName={character.name} color={character.color} />

        <p className="text-xs text-gray-400 max-w-xs">
          Pengarna går till{" "}
          <a
            href="https://www.aldrekontakt.se"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Äldrekontakt
          </a>{" "}
          — en organisation som hjälper äldre ur ensamhet. Tack för att du matar{" "}
          {character.name}! ❤️
        </p>
      </div>
    </main>
  );
}
