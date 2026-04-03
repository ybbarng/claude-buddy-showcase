import { STAT_LABELS, type StatName } from "@/lib/constants";

interface StatBarProps {
  name: StatName;
  value: number;
}

export function StatBar({ name, value }: StatBarProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-36 text-muted-foreground text-xs">
        {STAT_LABELS[name]}
      </span>
      <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
        <div
          className="h-full bg-muted-foreground/60 rounded-sm transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right tabular-nums font-mono">{value}</span>
    </div>
  );
}
