"use client";

import { createSwishUrl, isMobileDevice } from "@/lib/swish";
import { useState } from "react";

interface SwishButtonProps {
  characterName: string;
  color: string;
}

export default function SwishButton({ characterName, color }: SwishButtonProps) {
  const [showDesktopMessage, setShowDesktopMessage] = useState(false);
  const swishUrl = createSwishUrl({ message: `Mata ${characterName}` });

  function handleClick() {
    if (isMobileDevice()) {
      window.location.href = swishUrl;
    } else {
      setShowDesktopMessage(true);
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        style={{ backgroundColor: color }}
        className="w-full max-w-xs rounded-2xl px-8 py-4 text-xl font-bold text-white shadow-lg active:scale-95 transition-transform"
      >
        Mata {characterName} 🍪
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
