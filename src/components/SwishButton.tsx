"use client";

import { createSwishUrl, isMobileDevice } from "@/lib/swish";
import { useState, useEffect } from "react";

interface SwishButtonProps {
  characterId: number;
  characterName: string;
  color: string;
}

export default function SwishButton({
  characterId,
  characterName,
  color,
}: SwishButtonProps) {
  const [showDesktopMessage, setShowDesktopMessage] = useState(false);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("feedName");
    if (saved) setName(saved);
  }, []);

  async function handleFeed() {
    // Save name for next time
    if (name.trim()) {
      localStorage.setItem("feedName", name.trim());
    }

    // Mark as fed in collection
    localStorage.setItem(`fed:${characterId}`, "1");

    // Log to feed API
    try {
      await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId, name: name.trim() || undefined }),
      });
    } catch {
      // Don't block the Swish flow
    }

    // Open Swish
    const swishUrl = createSwishUrl({ message: `Mata ${characterName}` });
    if (isMobileDevice()) {
      window.location.href = swishUrl;
    } else {
      setShowDesktopMessage(true);
    }

    setSent(true);
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ditt namn (valfritt)"
        className="w-full max-w-xs rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-center text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
      />

      <button
        onClick={handleFeed}
        disabled={sent}
        style={{ backgroundColor: sent ? "#9CA3AF" : color }}
        className="w-full max-w-xs rounded-2xl px-8 py-4 text-xl font-bold text-white shadow-lg active:scale-95 transition-all disabled:active:scale-100"
      >
        {sent ? `${characterName} tackar! ❤️` : `Mata ${characterName} 🍪`}
      </button>

      {showDesktopMessage && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center text-sm text-amber-800 max-w-xs">
          <p className="font-semibold mb-1">Öppna på din telefon!</p>
          <p>
            Swish fungerar bara på mobilen. Besök den här sidan på din telefon
            för att mata {characterName}.
          </p>
        </div>
      )}
    </div>
  );
}
