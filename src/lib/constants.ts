export const ORIGINAL_SALT = "friend-2026-401";

export const SPECIES = [
  "duck",
  "goose",
  "blob",
  "cat",
  "dragon",
  "octopus",
  "owl",
  "penguin",
  "turtle",
  "snail",
  "ghost",
  "axolotl",
  "capybara",
  "cactus",
  "robot",
  "rabbit",
  "mushroom",
  "chonk",
] as const;

export type Species = (typeof SPECIES)[number];

export const EYES = ["·", "✦", "×", "◉", "@", "°"] as const;
export type Eye = (typeof EYES)[number];

export const HATS = [
  "none",
  "crown",
  "tophat",
  "propeller",
  "halo",
  "wizard",
  "beanie",
  "tinyduck",
] as const;
export type Hat = (typeof HATS)[number];

export const RARITIES = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
] as const;
export type Rarity = (typeof RARITIES)[number];

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1,
};

export const RARITY_FLOOR: Record<Rarity, number> = {
  common: 5,
  uncommon: 15,
  rare: 25,
  epic: 35,
  legendary: 50,
};

export const STAT_NAMES = [
  "DEBUGGING",
  "PATIENCE",
  "CHAOS",
  "WISDOM",
  "SNARK",
] as const;
export type StatName = (typeof STAT_NAMES)[number];

export const RARITY_STARS: Record<Rarity, string> = {
  common: "★",
  uncommon: "★★",
  rare: "★★★",
  epic: "★★★★",
  legendary: "★★★★★",
};

export const RARITY_COLORS: Record<Rarity, string> = {
  common: "text-gray-400",
  uncommon: "text-green-400",
  rare: "text-blue-400",
  epic: "text-purple-400",
  legendary: "text-yellow-400",
};

export const SPECIES_LABELS: Record<Species, string> = {
  duck: "오리(duck)",
  goose: "거위(goose)",
  blob: "슬라임(blob)",
  cat: "고양이(cat)",
  dragon: "드래곤(dragon)",
  octopus: "문어(octopus)",
  owl: "올빼미(owl)",
  penguin: "펭귄(penguin)",
  turtle: "거북이(turtle)",
  snail: "달팽이(snail)",
  ghost: "유령(ghost)",
  axolotl: "아홀로틀(axolotl)",
  capybara: "카피바라(capybara)",
  cactus: "선인장(cactus)",
  robot: "로봇(robot)",
  rabbit: "토끼(rabbit)",
  mushroom: "버섯(mushroom)",
  chonk: "뚱냥이(chonk)",
};

export const HAT_LABELS: Record<Hat, string> = {
  none: "없음(none)",
  crown: "왕관(crown)",
  tophat: "탑햇(tophat)",
  propeller: "프로펠러(propeller)",
  halo: "후광(halo)",
  wizard: "마법사 모자(wizard)",
  beanie: "비니(beanie)",
  tinyduck: "미니오리(tinyduck)",
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: "일반(common)",
  uncommon: "고급(uncommon)",
  rare: "희귀(rare)",
  epic: "영웅(epic)",
  legendary: "전설(legendary)",
};

export const SPECIES_LABELS_KO: Record<Species, string> = {
  duck: "오리",
  goose: "거위",
  blob: "슬라임",
  cat: "고양이",
  dragon: "드래곤",
  octopus: "문어",
  owl: "올빼미",
  penguin: "펭귄",
  turtle: "거북이",
  snail: "달팽이",
  ghost: "유령",
  axolotl: "아홀로틀",
  capybara: "카피바라",
  cactus: "선인장",
  robot: "로봇",
  rabbit: "토끼",
  mushroom: "버섯",
  chonk: "뚱냥이",
};

export const RARITY_LABELS_KO: Record<Rarity, string> = {
  common: "일반",
  uncommon: "고급",
  rare: "희귀",
  epic: "영웅",
  legendary: "전설",
};

export const STAT_LABELS: Record<StatName, string> = {
  DEBUGGING: "디버깅(DEBUGGING)",
  PATIENCE: "인내심(PATIENCE)",
  CHAOS: "혼돈(CHAOS)",
  WISDOM: "지혜(WISDOM)",
  SNARK: "비꼬기(SNARK)",
};
