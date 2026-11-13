import type { HxHistory } from "@/lib/cfb/hx-history";

const W = 320;
const H = 56;
const PAD = 6;

/** Team colors too dark to read on the dark board fall back to the text color. */
function readable(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!m) return "currentColor";
  const n = parseInt(m[1], 16);
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L < 0.07 ? "currentColor" : `#${m[1]}`;
}

function num(v: number) {
  return `${v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
}

function sign(v: number) {
  return `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
}

/** HX entering each week, from the refit history. Points only where a number exists. */
export function HxSparkline({ history, color: teamColor }: { history: HxHistory; color: string }) {
  const color = readable(teamColor);
  const pts = history.points;
  const first = pts[0];
  const last = pts[pts.length - 1];
  if (pts.length < 2) {
    return (
      <p className="text-sm text-muted">
        HX history starts the week this team joined the board (Week {first.week}): <span className="tabular text-fg">{num(first.hx)}</span>, No.{" "}
        {first.rank}.
      </p>
    );
  }
  const vals = pts.map((p) => p.hx);
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const span = hi - lo || 1;
  const x = (i: number) => PAD + (i * (W - 2 * PAD)) / (pts.length - 1);
  const y = (v: number) => PAD + ((hi - v) * (H - 2 * PAD)) / span;
  const path = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.hx).toFixed(1)}`).join(" ");
  const delta = last.hx - first.hx;
  const rankMove = first.rank - last.rank;
  const label = `HX by week: ${pts.map((p) => `Week ${p.week} ${num(p.hx)} (No. ${p.rank})`).join(", ")}`;

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="text-[11px] uppercase tracking-[0.12em] text-muted">HX by week</div>
        <div className="text-xs text-muted">
          Since preseason <span className="tabular text-fg">{sign(delta)}</span> HX ·{" "}
          {rankMove === 0 ? "rank unchanged" : `${rankMove > 0 ? "up" : "down"} ${Math.abs(rankMove)} spot${Math.abs(rankMove) === 1 ? "" : "s"}`}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-14 w-full text-fg" preserveAspectRatio="none" role="img" aria-label={label}>
        <path d={path} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={p.week} cx={x(i)} cy={y(p.hx)} r={i === pts.length - 1 ? 3 : 1.8} fill={color} vectorEffect="non-scaling-stroke">
            <title>{`Entering Week ${p.week}${p.week === 1 ? " (preseason)" : ""}: HX ${num(p.hx)}, No. ${p.rank} of ${p.of}`}</title>
          </circle>
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] tabular text-muted">
        <span>
          Wk {first.week} {first.week === 1 ? "(pre) " : ""}
          {num(first.hx)} · No. {first.rank}
        </span>
        <span>
          Now {num(last.hx)} · No. {last.rank}
        </span>
      </div>
      <p className="mt-1.5 text-[11px] text-muted">
        HX entering each week, refit on the FINALs before it. Week 1 is the frozen preseason board. Peak {num(history.peak!.hx)} (Wk{" "}
        {history.peak!.week}), low {num(history.low!.hx)} (Wk {history.low!.week}).
      </p>
    </div>
  );
}
