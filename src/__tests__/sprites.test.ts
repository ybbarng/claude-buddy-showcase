import { describe, it, expect } from "vitest";
import { renderAnimatedSprite, renderSprite } from "@/lib/sprites";

describe("renderSprite", () => {
  it("duck 프레임 0을 렌더링한다", () => {
    const lines = renderSprite("duck", "·", "none", 0, false);
    expect(lines.some((l) => l.includes("·"))).toBe(true);
  });

  it("sleeping 상태에서 눈이 -로 바뀐다", () => {
    const lines = renderSprite("duck", "·", "none", 0, true);
    expect(lines.some((l) => l.includes("-"))).toBe(true);
    expect(lines.some((l) => l.includes("·"))).toBe(false);
  });

  it("모자가 있으면 첫 줄에 모자가 렌더링된다", () => {
    const lines = renderSprite("duck", "·", "crown", 0, false);
    expect(lines[0]).toContain("^^^");
  });
});

describe("renderAnimatedSprite", () => {
  it("15스텝 시퀀스를 순환한다", () => {
    const frame0 = renderAnimatedSprite("duck", "·", "none", 0);
    const frame15 = renderAnimatedSprite("duck", "·", "none", 15);
    expect(frame0).toEqual(frame15);
  });
});
