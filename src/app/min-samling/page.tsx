"use client";

import { characters } from "@/data/characters";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CollectionPage() {
  const [fedIds, setFedIds] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ids = new Set<number>();
    characters.forEach((c) => {
      if (localStorage.getItem(`fed:${c.id}`)) ids.add(c.id);
    });
    setFedIds(ids);
  }, []);

  const fedCount = fedIds.size;
  const total = characters.length;

  async function handleShare() {
    const text = `Jag har matat ${fedCount} av ${total} karaktärer på 7Sorters Fika! 🍪☕`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Min samling</h1>
          <p className="text-sm text-gray-500 mt-2">
            Du har matat{" "}
            <span className="font-bold text-gray-900">{fedCount}</span> av{" "}
            {total} karaktärer
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-3 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-700"
              style={{ width: `${(fedCount / total) * 100}%` }}
            />
          </div>
        </header>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {characters.map((c) => {
            const isFed = fedIds.has(c.id);
            return (
              <Link
                key={c.id}
                href={`/c/${c.id}`}
                className={`flex flex-col items-center rounded-2xl p-5 transition-all ${
                  isFed
                    ? "shadow-md"
                    : "opacity-40 grayscale"
                }`}
                style={{
                  backgroundColor: isFed ? c.color + "18" : undefined,
                }}
              >
                <span className="text-4xl mb-2">{c.emoji}</span>
                <span
                  className={`text-sm font-semibold ${
                    isFed ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {c.name}
                </span>
                {isFed && (
                  <span className="text-xs text-green-600 mt-1">Matad ✓</span>
                )}
              </Link>
            );
          })}
        </div>

        {fedCount > 0 && (
          <button
            onClick={handleShare}
            className="w-full rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            {copied ? "Kopierat! ✓" : "Dela min samling 📤"}
          </button>
        )}
      </div>
    </main>
  );
}
