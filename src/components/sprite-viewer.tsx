"use client";

import { useEffect, useState } from "react";
import { renderAnimatedSprite, IDLE_SEQUENCE_LENGTH } from "@/lib/sprites";
import type { Species, Eye, Hat, Rarity } from "@/lib/constants";
import { RARITY_COLORS, RARITY_SHIMMER_COLORS } from "@/lib/constants";
import { useShimmerAnimation } from "@/hooks/use-shimmer-animation";

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
  const glimmerIndex = useShimmerAnimation(shiny);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % IDLE_SEQUENCE_LENGTH);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const lines = renderAnimatedSprite(species, eye, hat, frame);
  const baseColor = RARITY_COLORS[rarity];
  const shimmerColor = RARITY_SHIMMER_COLORS[rarity];

  return (
    <div className="flex items-center justify-center">
      <pre className="text-lg leading-snug select-none" style={{ fontFamily: "var(--font-jetbrains-mono), var(--font-fira-code), monospace" }}>
        {lines.map((line, lineIdx) => (
          <span key={lineIdx}>
            {shiny
              ? [...line].map((char, charIdx) => {
                  const shouldShimmer = Math.abs(charIdx - glimmerIndex) <= 1;
                  return (
                    <span
                      key={charIdx}
                      className={shouldShimmer ? shimmerColor : baseColor}
                    >
                      {char}
                    </span>
                  );
                })
              : <span className={baseColor}>{line}</span>}
            {lineIdx < lines.length - 1 && "\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
