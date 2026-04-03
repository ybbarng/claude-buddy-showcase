import { useEffect, useState } from "react";

const SHIMMER_SPEED = 200;
const SPRITE_WIDTH = 12;
const PADDING = 10;
const CYCLE_LENGTH = SPRITE_WIDTH + PADDING * 2;

export function useShimmerAnimation(enabled: boolean): number {
  const [glimmerIndex, setGlimmerIndex] = useState(-PADDING);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setGlimmerIndex((prev) => {
        const next = prev + 1;
        return next > SPRITE_WIDTH + PADDING ? -PADDING : next;
      });
    }, SHIMMER_SPEED);

    return () => clearInterval(interval);
  }, [enabled]);

  return enabled ? glimmerIndex : -100;
}
