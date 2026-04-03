import {
  type Eye,
  EYES,
  type Hat,
  HATS,
  RARITIES,
  type Rarity,
  RARITY_FLOOR,
  RARITY_WEIGHTS,
  SPECIES,
  type Species,
  STAT_NAMES,
  type StatName,
  ORIGINAL_SALT,
} from "./constants";
import { hashWyhash } from "./hash";
import { type RngFunction, mulberry32, pick } from "./prng";

export interface PetResult {
  rarity: Rarity;
  species: Species;
  eye: Eye;
  hat: Hat;
  shiny: boolean;
  stats: Record<StatName, number>;
  peak: StatName;
  dump: StatName;
}

function rollRarity(rng: RngFunction): Rarity {
  const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let roll = rng() * total;
  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity];
    if (roll < 0) return rarity;
  }
  return "common";
}

function rollStats(
  rng: RngFunction,
  rarity: Rarity,
): { stats: Record<StatName, number>; peak: StatName; dump: StatName } {
  const floor = RARITY_FLOOR[rarity];
  const peak = pick(rng, STAT_NAMES);
  let dump = pick(rng, STAT_NAMES);
  while (dump === peak) dump = pick(rng, STAT_NAMES);

  const stats = {} as Record<StatName, number>;
  for (const name of STAT_NAMES) {
    if (name === peak) {
      stats[name] = Math.min(100, floor + 50 + Math.floor(rng() * 30));
    } else if (name === dump) {
      stats[name] = Math.max(1, floor - 10 + Math.floor(rng() * 15));
    } else {
      stats[name] = floor + Math.floor(rng() * 40);
    }
  }
  return { stats, peak, dump };
}

function rollPet(hashValue: number): PetResult {
  const rng = mulberry32(hashValue);
  const rarity = rollRarity(rng);
  const species = pick(rng, SPECIES);
  const eye = pick(rng, EYES);
  const hat = rarity === "common" ? "none" : pick(rng, HATS);
  const shiny = rng() < 0.01;
  const { stats, peak, dump } = rollStats(rng, rarity);
  return { rarity, species, eye, hat, shiny, stats, peak, dump };
}

export function roll(
  userId: string,
  salt: string = ORIGINAL_SALT,
): PetResult {
  const key = userId + salt;
  return rollPet(hashWyhash(key));
}
