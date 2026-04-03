"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuddyCard } from "@/components/buddy-card";
import { roll, type PetResult } from "@/lib/roll";
import {
  SPECIES,
  EYES,
  HATS,
  RARITIES,
  RARITY_FLOOR,
  SPECIES_LABELS,
  HAT_LABELS,
  RARITY_LABELS,
  type Species,
  type Eye,
  type Hat,
  type Rarity,
  type StatName,
} from "@/lib/constants";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function Home() {
  const [uuid, setUuid] = useState("");
  const [uuidOpen, setUuidOpen] = useState(false);
  const [error, setError] = useState("");
  const [lockedPet, setLockedPet] = useState<PetResult | null>(null);

  const [species, setSpecies] = useState<Species>("duck");
  const [eye, setEye] = useState<Eye>("·");
  const [hat, setHat] = useState<Hat>("none");
  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [shiny, setShiny] = useState(false);

  const locked = lockedPet !== null;

  const handleUuidSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = uuid.trim();
      if (!trimmed) {
        setLockedPet(null);
        setError("");
        return;
      }
      if (!UUID_REGEX.test(trimmed)) {
        setError("올바른 UUID 형식이 아닙니다.");
        setLockedPet(null);
        return;
      }
      setError("");
      const pet = roll(trimmed);
      setLockedPet(pet);
      setSpecies(pet.species);
      setEye(pet.eye);
      setHat(pet.hat);
      setRarity(pet.rarity);
      setShiny(pet.shiny);
    },
    [uuid],
  );

  const handleClear = useCallback(() => {
    setUuid("");
    setLockedPet(null);
    setError("");
  }, []);

  const floor = RARITY_FLOOR[rarity];
  const pet: PetResult = locked
    ? lockedPet
    : {
        rarity,
        species,
        eye,
        hat: rarity === "common" ? "none" : hat,
        shiny,
        stats: {
          DEBUGGING: floor + 20,
          PATIENCE: floor + 15,
          CHAOS: floor + 10,
          WISDOM: floor + 5,
          SNARK: floor + 35,
        } as Record<StatName, number>,
        peak: "SNARK",
        dump: "WISDOM",
      };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Claude Buddy Showcase
        </h1>
        <p className="text-muted-foreground text-sm">
          Claude Code 버디를 확인하거나 커스텀 미리보기를 할 수 있습니다.
        </p>
        <p className="text-muted-foreground text-xs">
          모든 계산은 브라우저에서만 수행되며, 서버로 전송되지 않습니다.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="pt-6 space-y-5">
          {/* UUID 입력 (접었다 펼침) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setUuidOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span
                className={`transition-transform ${uuidOpen ? "rotate-90" : ""}`}
              >
                ▶
              </span>
              내 버디 조회 (Account UUID 입력)
            </button>
            {uuidOpen && (
              <form
                onSubmit={handleUuidSubmit}
                className="flex gap-2 items-start"
              >
                <div className="flex-1 space-y-1">
                  <Input
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-destructive min-h-4">
                    {error || "\u00A0"}
                  </p>
                </div>
                <Button type="submit" size="sm">
                  조회
                </Button>
                {locked && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                  >
                    해제
                  </Button>
                )}
              </form>
            )}
            {locked && (
              <p className="text-xs text-green-500">
                UUID로 조회된 결과입니다. 아래 설정은 읽기 전용입니다.
              </p>
            )}
          </div>

          {/* 속성 설정 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>종(species)</Label>
              <Select
                value={species}
                onValueChange={(v) => setSpecies(v as Species)}
                disabled={locked}
              >
                <SelectTrigger>
                  <SelectValue>{SPECIES_LABELS[species]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SPECIES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {SPECIES_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>희귀도(rarity)</Label>
              <Select
                value={rarity}
                onValueChange={(v) => setRarity(v as Rarity)}
                disabled={locked}
              >
                <SelectTrigger>
                  <SelectValue>{RARITY_LABELS[rarity]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {RARITIES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {RARITY_LABELS[r]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>눈(eye)</Label>
              <Select
                value={eye}
                onValueChange={(v) => setEye(v as Eye)}
                disabled={locked}
              >
                <SelectTrigger>
                  <SelectValue>
                    <span className="font-mono text-lg">{eye}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {EYES.map((e) => (
                    <SelectItem key={e} value={e}>
                      <span className="font-mono text-lg">{e}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                모자(hat){" "}
                {rarity === "common" && !locked && (
                  <span className="text-xs text-muted-foreground">
                    (일반 등급은 모자 없음)
                  </span>
                )}
              </Label>
              <Select
                value={locked ? pet.hat : hat}
                onValueChange={(v) => setHat(v as Hat)}
                disabled={locked || rarity === "common"}
              >
                <SelectTrigger>
                  <SelectValue>
                    {HAT_LABELS[locked ? pet.hat : hat]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {HATS.map((h) => (
                    <SelectItem key={h} value={h}>
                      {HAT_LABELS[h]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="shiny"
              checked={locked ? pet.shiny : shiny}
              onChange={(e) => setShiny(e.target.checked)}
              disabled={locked}
              className="rounded"
            />
            <Label htmlFor="shiny">반짝이(shiny)</Label>
          </div>
        </CardContent>
      </Card>

      <BuddyCard pet={pet} />
    </main>
  );
}
