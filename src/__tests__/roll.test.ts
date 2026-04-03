import { describe, it, expect } from "vitest";
import { roll } from "@/lib/roll";

const TEST_UUID = "00000000-0000-0000-0000-000000000000";

describe("roll", () => {
  it("동일한 UUID에 대해 항상 같은 결과를 반환한다", () => {
    const a = roll(TEST_UUID);
    const b = roll(TEST_UUID);
    expect(a).toEqual(b);
  });

  it("알려진 UUID에 대해 기대 결과와 일치한다", () => {
    const pet = roll(TEST_UUID);
    expect(pet.rarity).toBe("uncommon");
    expect(pet.species).toBe("cactus");
    expect(pet.eye).toBe("✦");
    expect(pet.hat).toBe("halo");
    expect(pet.shiny).toBe(false);
    expect(pet.stats.DEBUGGING).toBe(14);
    expect(pet.stats.PATIENCE).toBe(24);
    expect(pet.stats.CHAOS).toBe(32);
    expect(pet.stats.WISDOM).toBe(47);
    expect(pet.stats.SNARK).toBe(84);
  });

  it("다른 UUID에 대해 다른 결과를 반환한다", () => {
    const a = roll("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    const b = roll("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
    expect(a).not.toEqual(b);
  });
});
