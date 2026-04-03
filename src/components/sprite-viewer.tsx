"use client";

import { useEffect, useState } from "react";
import { renderAnimatedSprite, IDLE_SEQUENCE_LENGTH } from "@/lib/sprites";
import type { Species, Eye, Hat, Rarity } from "@/lib/constants";
import { RARITY_COLORS } from "@/lib/constants";

interface SpriteViewerProps {
  species: Species;
  eye: Eye;
  hat: Hat;
  rarity: Rarity;
  shiny: boolean;
}

export function SpriteViewer({
  species,
  eye,
  hat,
  rarity,
  shiny,
}: SpriteViewerProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % IDLE_SEQUENCE_LENGTH);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const lines = renderAnimatedSprite(species, eye, hat, frame);

  return (
    <div className="flex items-center justify-center">
      <pre
        className={`text-lg leading-snug font-mono select-none ${shiny ? "animate-pulse text-yellow-300" : RARITY_COLORS[rarity]}`}
      >
        {lines.join("\n")}
      </pre>
    </div>
  );
}
