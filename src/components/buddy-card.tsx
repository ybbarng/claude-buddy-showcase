"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpriteViewer } from "@/components/sprite-viewer";
import { StatBar } from "@/components/stat-bar";
import {
  RARITY_STARS,
  RARITY_COLORS,
  RARITY_LABELS_KO,
  SPECIES_LABELS_KO,
  STAT_NAMES,
} from "@/lib/constants";
import type { PetResult } from "@/lib/roll";

interface BuddyCardProps {
  pet: PetResult;
}

export function BuddyCard({ pet }: BuddyCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-2">
        <h2 className={`text-2xl font-bold tracking-wide ${RARITY_COLORS[pet.rarity]}`}>
          {RARITY_STARS[pet.rarity]} {RARITY_LABELS_KO[pet.rarity]} {SPECIES_LABELS_KO[pet.species]}
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpriteViewer
          species={pet.species}
          eye={pet.eye}
          hat={pet.hat}
          rarity={pet.rarity}
          shiny={pet.shiny}
        />

        <div className="space-y-2">
          {STAT_NAMES.map((name) => (
            <StatBar
              key={name}
              name={name}
              value={pet.stats[name]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
