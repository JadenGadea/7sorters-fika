import Link from "next/link";
import type { Character } from "@/data/characters";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/c/${character.id}`}
      className="group block rounded-2xl p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
      style={{ backgroundColor: character.color + "18" }}
    >
      <div className="text-5xl mb-3">{character.emoji}</div>
      <h3 className="text-lg font-bold text-gray-900">{character.name}</h3>
      <p className="text-sm text-gray-500">{character.cafe}</p>
    </Link>
  );
}
