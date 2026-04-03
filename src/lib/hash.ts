import { hash as bunWyhash } from "bun-wyhash";

export function hashWyhash(s: string): number {
  const result = bunWyhash(s, 0);
  return Number(BigInt(result) & 0xffffffffn);
}
