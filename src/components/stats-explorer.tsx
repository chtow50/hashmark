import { Download, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { teamLogoSrc } from "@/lib/cfb/team-logos";
import {
  COLUMN_SETS,
  METRICS,
  TAB_LABEL,
  columnSet,
  fmtStat,
  metricOf,
  sortRows,
  standing,
  type Metric,
  type StatRow,
  type StatTab,
} from "@/lib/cfb/stats";
import { downloadSvgPng } from "@/lib/download";
import { placeLabels, textW, type Box } from "@/lib/cfb/chart-labels";
import { cn } from "@/lib/utils";

const label = (tab: StatTab, r: StatRow) => (tab === "teams" ? r.name : `${r.name} (${r.team})`);

/**
 * Cell background by percentile (100 = best): up-tone above the median, down-tone below,
 * strength grows toward the extremes; the middle third stays unshaded.
 */
export function cellTint(p: number | undefined): CSSProperties | undefined {
  if (p == null) return undefined;
  const d = (p - 50) / 50;
  if (Math.abs(d) < 0.34) return undefined;
  const a = Math.round(7 + (Math.abs(d) - 0.34) * 30);
  return { background: `color-mix(in srgb, var(--color-${d > 0 ? "up" : "down"}) ${a}%, transparent)` };
}

function MetricSelect({ tab, value, onChange, id, labelText }: { tab: StatTab; value: string; onChange: (k: string) => void; id: string; labelText: string }) {
  return (
    <label htmlFor={id} className="flex min-w-0 flex-1 flex-col gap-1 text-xs text-muted">
      {labelText}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-lg bg-raised px-2 text-sm text-fg">
        {COLUMN_SETS[tab].slice(1).map((s) => (
          <optgroup key={s.key} label={s.label}>
            {s.cols.map((k) => {
              const m = metricOf(tab, k)!;
              return (
                <option key={k} value={k}>
                  {m.l}
                </option>
              );
            })}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

/** Top 10 bars for the sorted metric inside the current conference filter. */
export function StatsLeaders({ tab, rows, metric }: { tab: StatTab; rows: StatRow[]; metric: Metric }) {
  const top = sortRows(rows, metric).filter((r) => r.v[metric.k] != null).slice(0, 10);
  const all = rows.map((r) => r.v[metric.k]).filter((x): x is number => x != null);
  // Bars run from the pool's worst value so lower-is-better metrics still read "longer = better".
  const worst = all.length ? (metric.hi ? Math.min(...all) : Math.max(...all)) : 0;
  const best = (top[0]?.v[metric.k] as number | undefined) ?? 0;
  const span = Math.abs(best - worst) || 1;
  return (
    <Panel className="h-full">
      <h2 className="font-display text-lg">Top 10 · {metric.l}</h2>
      <p className="mb-4 text-xs text-muted">Follows the table sort. {metric.hi ? "Higher is better." : "Lower is better."} Bars start at the worst value in view.</p>
      <ol className="space-y-2.5">
        {top.map((r, i) => {
          const v = r.v[metric.k] as number;
          const w = Math.max(3, (100 * Math.abs(v - worst)) / span);
          return (
            <li key={r.id} className="grid grid-cols-[1.25rem_minmax(0,1fr)_4rem] items-center gap-x-2 text-sm">
              <span className="text-right tabular text-faint">{i + 1}</span>
              <span className="flex min-w-0 items-center gap-2">
                <TeamMark slug={r.slug} color={r.color} logoSize={16} />
                <span className="truncate" title={label(tab, r)}>
                  {r.name}
                  {tab !== "teams" ? <span className="text-xs text-muted"> · {r.team}</span> : null}
                </span>
              </span>
              <span className="text-right font-medium tabular">{fmtStat(metric, v)}</span>
              <span />
              <span className="col-span-2 mt-1 h-1.5 rounded-full bg-raised">
                <span className="block h-1.5 rounded-full" style={{ width: `${w}%`, background: r.color }} />
              </span>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}

const SCATTER_DEFAULTS: Record<StatTab, [string, string]> = {
  teams: ["epa", "oepa"],
  qb: ["use", "epa"],
  rush: ["att", "epa"],
  rec: ["use", "epa"],
  def: ["tfl", "pbu"],
};

/** SVG scatter: any two metrics, better is always up/right, average lines, compared rows labeled. */
export function StatsScatter({ tab, rows, picks, asOf, scope }: { tab: StatTab; rows: StatRow[]; picks: string[]; asOf: string; scope: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [saving, setSaving] = useState(false);
  const [xk, setX] = useState(SCATTER_DEFAULTS[tab][0]);
  const [yk, setY] = useState(SCATTER_DEFAULTS[tab][1]);
  const [hover, setHover] = useState<StatRow | null>(null);
  const xm = metricOf(tab, xk)!;
  const ym = metricOf(tab, yk)!;
  const pts = rows.filter((r) => r.v[xk] != null && r.v[yk] != null);
  // Size the SVG to its box so 11–12px labels stay 11–12px on phones (no viewBox shrink).
  const box = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(300, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = Math.round(Math.min(460, Math.max(300, W * 0.72))), PL = 52, PR = 12, PT = 18, PB = 44;
  const ext = (k: string) => {
    const v = pts.map((r) => r.v[k] as number);
    const lo = Math.min(...v), hi = Math.max(...v);
    const pad = (hi - lo) * 0.06 || 1;
    return [lo - pad, hi + pad] as const;
  };
  const [x0, x1] = pts.length ? ext(xk) : [0, 1];
  const [y0, y1] = pts.length ? ext(yk) : [0, 1];
  const fx = (v: number) => (v - x0) / (x1 - x0);
  const fy = (v: number) => (v - y0) / (y1 - y0);
  const sx = (v: number) => PL + (xm.hi ? fx(v) : 1 - fx(v)) * (W - PL - PR);
  const sy = (v: number) => PT + (ym.hi ? 1 - fy(v) : fy(v)) * (H - PT - PB);
  const ticks = (a: number, b: number) => [0.1, 0.3, 0.5, 0.7, 0.9].map((t) => a + t * (b - a));
  const mean = (k: string) => (pts.length ? pts.reduce((s, r) => s + (r.v[k] as number), 0) / pts.length : 0);
  const mx = mean(xk), my = mean(yk);
  const logos = tab === "teams";
  const picked = pts.filter((r) => picks.includes(r.id));
  const tip = hover ? { x: sx(hover.v[xk] as number), y: sy(hover.v[yk] as number) } : null;
  // Fixed text the pick labels must not cover: quadrant notes and axis titles.
  const reserved: Box[] = [
    { x: W - PR - 4 - 96, y: PT, w: 96, h: 16 },
    { x: PL + 4, y: H - PB - 18, w: 96, h: 16 },
    { x: PL, y: 0, w: textW(`↑ ${ym.l}`, 12), h: PT },
  ];
  const labels = placeLabels(
    picked.map((r) => ({ id: r.id, text: r.name, cx: sx(r.v[xk] as number), cy: sy(r.v[yk] as number) })),
    reserved,
    { x0: PL, x1: W - PR, y0: PT, y1: H - PB },
  );
  async function savePng() {
    if (!svgRef.current) return;
    setSaving(true);
    try {
      await downloadSvgPng(svgRef.current, `hashmark-${tab}-${xk}-vs-${yk}.png`, {
        title: `${ym.l} vs ${xm.l} · ${TAB_LABEL[tab]} · ${scope}`,
        footer: `2026 through ${asOf} · box: cfbstats · EPA: CFBD · up/right = better`,
      });
    } finally {
      setSaving(false);
    }
  }
  return (
    <Panel>
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display text-lg">Chart builder</h2>
        <button
          type="button"
          onClick={savePng}
          disabled={saving || pts.length === 0}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-raised px-3 text-sm text-fg hover:bg-border disabled:opacity-50"
        >
          <Download className="h-4 w-4" aria-hidden />
          {saving ? "Saving…" : "PNG"}
        </button>
      </div>
      <p className="mb-3 text-xs text-muted">Pick any two stats. Axes are oriented so up and to the right is always better; dashed lines are the average in view. Rows in Compare are labeled.</p>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row">
        <MetricSelect id="sc-x" labelText="Across (x)" tab={tab} value={xk} onChange={setX} />
        <MetricSelect id="sc-y" labelText="Up (y)" tab={tab} value={yk} onChange={setY} />
      </div>
      <div className="relative" ref={box}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block h-auto w-full select-none" role="img" aria-label={`${ym.l} against ${xm.l}`} onMouseLeave={() => setHover(null)}>
          {ticks(x0, x1).map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} x2={sx(t)} y1={PT} y2={H - PB} stroke="var(--color-line)" />
              <text x={sx(t)} y={H - PB + 16} textAnchor="middle" fill="var(--color-muted)" fontSize="11">{fmtStat(xm, t)}</text>
            </g>
          ))}
          {ticks(y0, y1).map((t) => (
            <g key={`y${t}`}>
              <line x1={PL} x2={W - PR} y1={sy(t)} y2={sy(t)} stroke="var(--color-line)" />
              <text x={PL - 6} y={sy(t) + 4} textAnchor="end" fill="var(--color-muted)" fontSize="11">{fmtStat(ym, t)}</text>
            </g>
          ))}
          <line x1={sx(mx)} x2={sx(mx)} y1={PT} y2={H - PB} stroke="var(--color-faint)" strokeDasharray="4 4" />
          <line x1={PL} x2={W - PR} y1={sy(my)} y2={sy(my)} stroke="var(--color-faint)" strokeDasharray="4 4" />
          <text x={W - PR - 4} y={PT + 12} textAnchor="end" fill="var(--color-up)" fontSize="11">Better on both ↗</text>
          <text x={PL + 4} y={H - PB - 6} fill="var(--color-down)" fontSize="11">↙ Worse on both</text>
          {pts.map((r) => {
            const cx = sx(r.v[xk] as number), cy = sy(r.v[yk] as number);
            const src = logos ? teamLogoSrc(r.slug) : null;
            const on = hover?.id === r.id || picks.includes(r.id);
            const dim = picks.length > 0 && !on;
            return (
              <g key={r.id} onMouseEnter={() => setHover(r)} opacity={dim ? 0.55 : 1} style={{ cursor: "pointer" }}>
                {src ? (
                  <image href={src} style={{ filter: "drop-shadow(0 0 1px rgba(242,241,236,0.75))" }} x={cx - (on ? 11 : 8)} y={cy - (on ? 11 : 8)} width={on ? 22 : 16} height={on ? 22 : 16} />
                ) : (
                  <circle cx={cx} cy={cy} r={on ? 6.5 : 4.5} fill={r.color} stroke="var(--color-bg)" strokeWidth="1" />
                )}
                {/* Larger invisible hit area for touch. */}
                <circle cx={cx} cy={cy} r={11} fill="transparent" onClick={() => setHover(r)} />
              </g>
            );
          })}
          {labels.map((l) => (
            <g key={`l-${l.id}`} pointerEvents="none">
              <circle cx={l.cx} cy={l.cy} r={13} fill="none" stroke="var(--color-fg)" strokeWidth="1.5" />
              {l.moved ? (
                <line x1={l.cx} y1={l.cy} x2={l.anchor === "start" ? l.x - 2 : l.x + 2} y2={l.y - 4} stroke="var(--color-muted)" strokeWidth="1" />
              ) : null}
              <text x={l.x} y={l.y} textAnchor={l.anchor} fill="var(--color-fg)" fontSize="12" fontWeight="600" paintOrder="stroke" stroke="var(--color-surface)" strokeWidth="3">
                {l.text}
              </text>
            </g>
          ))}
          <text x={W - PR} y={H - 6} textAnchor="end" fill="var(--color-fg)" fontSize="12">{xm.l} →</text>
          <text x={PL} y={PT - 4} fill="var(--color-fg)" fontSize="12">↑ {ym.l}</text>
        </svg>
        {hover && tip ? (
          <div
            className="pointer-events-none absolute z-10 w-56 rounded-lg border border-border bg-raised p-2.5 text-xs shadow-xl"
            style={{ left: Math.max(0, Math.min(tip.x - 112, W - 224)), top: Math.max(tip.y - 84, 0) }}
          >
            <div className="mb-1 flex items-center gap-1.5 font-medium">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: hover.color }} />
              {label(tab, hover)}
            </div>
            <div className="text-muted">{xm.s}: <span className="text-fg tabular">{fmtStat(xm, hover.v[xk])}</span></div>
            <div className="text-muted">{ym.s}: <span className="text-fg tabular">{fmtStat(ym, hover.v[yk])}</span></div>
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-muted">
        {pts.length} plotted{xm.hi && ym.hi ? "" : " · lower-is-better axes are flipped"}. Hover or tap a {logos ? "logo" : "dot"} for values.
      </p>
    </Panel>
  );
}

/** 1–2 picks side by side everywhere; 3–4 picks wrap to two columns on phones. */
const gridCols = (n: number) =>
  n <= 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : n === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4";

/** Compare up to 4 rows: value, percentile and rank inside the current conference cohort. */
export function StatsCompare({
  tab,
  rows,
  cohort,
  conf,
  picks,
  setPicks,
  defaultSet,
}: {
  tab: StatTab;
  rows: StatRow[];
  cohort: StatRow[];
  conf: string;
  picks: string[];
  setPicks: (ids: string[]) => void;
  defaultSet: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const [text, setText] = useState("");
  const chosen = picks.map((id) => rows.find((r) => r.id === id)).filter((r): r is StatRow => Boolean(r));
  const options = useMemo(() => [...rows].sort((a, b) => a.name.localeCompare(b.name)), [rows]);
  const set = columnSet(tab, defaultSet);
  const metrics: Metric[] = showAll ? METRICS[tab] : set.cols.map((k) => metricOf(tab, k)!);
  const cohortVals = (m: Metric, r: StatRow) =>
    cohort.some((c) => c.id === r.id) ? cohort.map((c) => c.v[m.k]) : [...cohort.map((c) => c.v[m.k]), r.v[m.k]];
  const tryAdd = (value: string) => {
    const hit = options.find((r) => label(tab, r).toLowerCase() === value.trim().toLowerCase());
    if (hit && !picks.includes(hit.id) && picks.length < 4) {
      setPicks([...picks, hit.id]);
      setText("");
    } else setText(value);
  };
  const n = chosen.length;
  return (
    <Panel>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-lg">Compare</h2>
          <p className="text-xs text-muted">
            Up to 4. Add from the table (+) or search here. Bars and P = percentile within {conf === "All" ? "all FBS" : conf} {tab === "teams" ? "teams" : "qualifiers"} (P100 = best).
          </p>
        </div>
        <label className="w-full sm:w-72">
          <span className="sr-only">Add to compare</span>
          <input
            list={`cmp-${tab}`}
            value={text}
            disabled={picks.length >= 4}
            onChange={(e) => tryAdd(e.target.value)}
            placeholder={picks.length >= 4 ? "Compare is full: remove one" : `Add a ${tab === "teams" ? "team" : "player"}…`}
            className="h-11 w-full rounded-lg bg-raised px-3 text-sm text-fg placeholder:text-faint disabled:opacity-60"
          />
          <datalist id={`cmp-${tab}`}>
            {options.filter((r) => !picks.includes(r.id)).map((r) => (
              <option key={r.id} value={label(tab, r)} />
            ))}
          </datalist>
        </label>
      </div>

      {n === 0 ? (
        <p className="rounded-lg bg-inset px-4 py-8 text-center text-sm text-muted">Nothing picked yet. Use + on any row in the table above.</p>
      ) : (
        <div className="text-sm">
          <div className={cn("grid gap-2 border-b border-border pb-3", gridCols(n))}>
            {chosen.map((r) => (
              <div key={r.id} className="flex min-w-0 items-center gap-2 rounded-lg bg-raised py-1 pl-2 pr-1">
                <span className="h-6 w-1 shrink-0 rounded-full" style={{ background: r.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{r.name}</span>
                  <span className="block truncate text-xs text-muted">{tab === "teams" ? r.conference : `${r.pos} · ${r.team}`}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setPicks(picks.filter((p) => p !== r.id))}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-border hover:text-fg"
                  aria-label={`Remove ${r.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="divide-y divide-line">
            {metrics.map((m) => {
              const vals = chosen.map((r) => r.v[m.k]);
              const valid = vals.filter((x): x is number => x != null);
              const best = valid.length > 1 ? (m.hi ? Math.max(...valid) : Math.min(...valid)) : null;
              return (
                <div key={m.k} className="py-2.5">
                  <div className="mb-1.5 text-xs text-muted" title={m.def}>
                    {m.l}
                    {m.hi ? "" : <span className="text-faint"> · lower is better</span>}
                  </div>
                  <div className={cn("grid gap-x-3 gap-y-2", gridCols(n))}>
                    {chosen.map((r) => {
                      const v = r.v[m.k];
                      const s = standing(m, v, cohortVals(m, r));
                      const top = best != null && v === best;
                      return (
                        <div key={r.id} className="min-w-0">
                          <div className="flex items-baseline justify-between gap-1">
                            <span className="flex min-w-0 items-baseline gap-1.5">
                              <span className="h-2 w-2 shrink-0 self-center rounded-full sm:hidden" style={{ background: r.color }} aria-hidden />
                              <span className={cn("tabular", top ? "font-semibold text-fg" : "text-fg/85")}>{fmtStat(m, v)}</span>
                            </span>
                            {s ? <span className="whitespace-nowrap text-[11px] tabular text-muted">P{Math.round(s.p)} · #{s.rank}</span> : null}
                          </div>
                          <div className="mt-1 h-1.5 rounded-full bg-raised">
                            {s ? <div className="h-1.5 rounded-full" style={{ width: `${Math.max(3, s.p)}%`, background: r.color }} /> : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {set.cols.length < METRICS[tab].length ? (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="mt-3 inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border"
          >
            {showAll ? `Show only ${set.label}` : `Show all ${METRICS[tab].length} stats`}
          </button>
          ) : null}
        </div>
      )}
    </Panel>
  );
}
