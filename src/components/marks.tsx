import { Link } from "@tanstack/react-router";
import { cn, deltaVsAp, fmtHeight, fmtNum } from "@/lib/utils";

export function TeamSwatch({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-block shrink-0 rounded-sm", className ?? "h-5 w-1.5")}
      style={{ background: color }}
      aria-hidden
    />
  );
}

export function TeamLink({
  slug,
  name,
  color,
  className,
}: {
  slug: string;
  name: string;
  color: string;
  className?: string;
}) {
  return (
    <Link
      to="/teams/$slug"
      params={{ slug }}
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 text-fg hover:text-accent",
        "transition-colors duration-150",
        className,
      )}
    >
      <TeamSwatch color={color} />
      <span className="font-medium tracking-tight">{name}</span>
    </Link>
  );
}

export function RankNum({ rank, className }: { rank: number; className?: string }) {
  return <span className={cn("font-display tabular text-muted", className)}>{rank}</span>;
}

export function RankMove({ delta }: { delta: number | null }) {
  if (delta == null) return <span className="text-xs tabular text-faint">—</span>;
  if (delta === 0) return <span className="text-xs tabular text-faint">even</span>;
  return (
    <span className="text-xs tabular text-muted">
      {delta > 0 ? `↑${delta}` : `↓${-delta}`}
    </span>
  );
}

export function RankSpark({
  values,
  className,
}: {
  values: Array<number | null | undefined>;
  className?: string;
}) {
  const nums = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  if (nums.length < 2) return null;
  const w = 72;
  const h = 22;
  const max = Math.max(80, ...nums);
  const pts = values
    .map((v, i) => {
      if (v == null || !Number.isFinite(v)) return null;
      const x = (i / Math.max(values.length - 1, 1)) * (w - 4) + 2;
      const y = 2 + ((v - 1) / (max - 1)) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .filter(Boolean)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-5 w-20 text-accent", className)}
      aria-hidden
    >
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={pts} />
    </svg>
  );
}

export function DeltaChip({
  hxRank,
  apRank,
}: {
  hxRank: number;
  apRank: number | null;
}) {
  const d = deltaVsAp(hxRank, apRank);
  if (d.kind === "even") {
    return <span className="text-xs text-faint tabular">AP even</span>;
  }
  if (d.kind === "nr") {
    return <span className="text-xs text-faint">AP NR</span>;
  }
  return (
    <span className={cn("text-xs tabular", d.kind === "up" ? "text-up" : "text-down")}>
      {d.kind === "up" ? "↑" : "↓"} {Math.abs(d.value)} vs AP
    </span>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</div>
      <div className="mt-1 font-display text-xl tabular leading-none whitespace-nowrap text-fg sm:text-2xl">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted">{hint}</div> : null}
    </div>
  );
}

export function CompareRow({
  label,
  a,
  b,
  max,
  format,
  invert,
}: {
  label: string;
  a: number;
  b: number;
  max: number;
  format: (n: number) => string;
  invert?: boolean;
}) {
  const aWin = invert ? a < b : a > b;
  const bWin = invert ? b < a : b > a;
  return (
    <div className="grid grid-cols-[1fr_7.5rem_1fr] items-center gap-3 py-2.5 sm:grid-cols-[1fr_8rem_1fr]">
      <div className="flex min-w-0 flex-col items-end gap-1">
        <span className={cn("text-sm tabular", aWin ? "text-fg" : "text-muted")}>
          {format(a)}
        </span>
        <div className="h-1 w-full overflow-hidden rounded-full bg-raised">
          <div
            className={cn("ml-auto h-full rounded-full", aWin ? "bg-accent" : "bg-faint")}
            style={{ width: `${Math.min(100, (a / max) * 100)}%` }}
          />
        </div>
      </div>
      <div className="text-center text-[11px] uppercase tracking-[0.12em] text-faint">
        {label}
      </div>
      <div className="flex min-w-0 flex-col items-start gap-1">
        <span className={cn("text-sm tabular", bWin ? "text-fg" : "text-muted")}>
          {format(b)}
        </span>
        <div className="h-1 w-full overflow-hidden rounded-full bg-raised">
          <div
            className={cn("h-full rounded-full", bWin ? "bg-accent" : "bg-faint")}
            style={{ width: `${Math.min(100, (b / max) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function MixBar({
  leftPct,
  leftLabel,
  rightLabel,
}: {
  leftPct: number;
  leftLabel: string;
  rightLabel: string;
}) {
  const left = Math.max(0, Math.min(100, leftPct));
  const right = 100 - left;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[11px] uppercase tracking-[0.12em] text-faint">
        <span>
          {leftLabel} {fmtNum(left, 0)}%
        </span>
        <span>
          {rightLabel} {fmtNum(right, 0)}%
        </span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-raised">
        <div className="h-full bg-accent" style={{ width: `${left}%` }} />
        <div className="h-full bg-faint" style={{ width: `${right}%` }} />
      </div>
    </div>
  );
}

export function Measurable({ height, weight }: { height: number; weight: number }) {
  return (
    <span className="tabular text-muted">
      {fmtHeight(height)} · {fmtNum(weight, 0)} lb
    </span>
  );
}

export function WinBar({
  homePct,
  homeName,
  awayName,
}: {
  homePct: number;
  homeName: string;
  awayName: string;
}) {
  const home = Math.round(homePct * 1000) / 10;
  const away = Math.round((100 - home) * 10) / 10;
  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{homeName}</div>
          <div className="font-display text-3xl tabular leading-none">{fmtNum(home, 1)}%</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{awayName}</div>
          <div className="font-display text-3xl tabular leading-none">{fmtNum(away, 1)}%</div>
        </div>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-raised">
        <div className="h-full bg-accent" style={{ width: `${home}%` }} />
        <div className="h-full bg-faint" style={{ width: `${away}%` }} />
      </div>
    </div>
  );
}
