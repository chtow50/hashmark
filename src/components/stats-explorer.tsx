import { useMemo, useState } from "react";
import { Panel } from "@/components/shell";
import { METRICS, fmtStat, metricOf, sortRows, standing, type Metric, type StatRow, type StatTab } from "@/lib/cfb/stats";
import { cn } from "@/lib/utils";

const label = (tab: StatTab, r: StatRow) => (tab === "teams" ? r.name : `${r.name} (${r.team})`);

function MetricSelect({ tab, value, onChange, id, labelText }: { tab: StatTab; value: string; onChange: (k: string) => void; id: string; labelText: string }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-xs text-faint">
      {labelText}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg bg-raised px-2 text-sm text-fg"
      >
        {METRICS[tab].map((m) => (
          <option key={m.k} value={m.k}>
            {m.l}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Top 10 bars for the sorted metric inside the current conference filter. */
export function StatsLeaders({ tab, rows, metric }: { tab: StatTab; rows: StatRow[]; metric: Metric }) {
  const top = sortRows(rows, metric).filter((r) => r.v[metric.k] != null).slice(0, 10);
  const vals = top.map((r) => r.v[metric.k] as number);
  const all = rows.map((r) => r.v[metric.k]).filter((x): x is number => x != null);
  // Bars run from the pool's worst value so lower-is-better metrics still read "longer = better".
  const worst = all.length ? (metric.hi ? Math.min(...all) : Math.max(...all)) : 0;
  const best = vals[0] ?? 0;
  const span = Math.abs(best - worst) || 1;
  return (
    <Panel>
      <h2 className="mb-1 font-display text-lg">Leaders · {metric.l}</h2>
      <p className="mb-4 text-xs text-faint">{metric.hi ? "Higher is better." : "Lower is better."} Bar length is measured from the worst value in the pool.</p>
      <ol className="space-y-2">
        {top.map((r, i) => {
          const v = r.v[metric.k] as number;
          const w = Math.max(3, (100 * Math.abs(v - worst)) / span);
          return (
            <li key={r.id} className="grid grid-cols-[1.5rem_minmax(0,11rem)_1fr_4.5rem] items-center gap-2 text-sm">
              <span className="tabular text-faint">{i + 1}</span>
              <span className="truncate" title={label(tab, r)}>
                {r.name}
                {tab !== "teams" ? <span className="text-xs text-faint"> · {r.team}</span> : null}
              </span>
              <span className="h-2.5 rounded-full bg-raised">
                <span className="block h-2.5 rounded-full" style={{ width: `${w}%`, background: r.color }} />
              </span>
              <span className="text-right tabular">{fmtStat(metric, v)}</span>
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
};

/** Light SVG scatter: pick any two metrics; hover a dot for the row. */
export function StatsScatter({ tab, rows }: { tab: StatTab; rows: StatRow[] }) {
  const [xk, setX] = useState(SCATTER_DEFAULTS[tab][0]);
  const [yk, setY] = useState(SCATTER_DEFAULTS[tab][1]);
  const [hover, setHover] = useState<StatRow | null>(null);
  const xm = metricOf(tab, xk)!;
  const ym = metricOf(tab, yk)!;
  const pts = rows.filter((r) => r.v[xk] != null && r.v[yk] != null);
  const W = 520, H = 360, P = 44;
  const ext = (k: string) => {
    const v = pts.map((r) => r.v[k] as number);
    const lo = Math.min(...v), hi = Math.max(...v);
    const pad = (hi - lo) * 0.05 || 1;
    return [lo - pad, hi + pad] as const;
  };
  const [x0, x1] = pts.length ? ext(xk) : [0, 1];
  const [y0, y1] = pts.length ? ext(yk) : [0, 1];
  // "Better" is always up and right: flip lower-is-better axes.
  const sx = (v: number) => (xm.hi ? P + ((v - x0) / (x1 - x0)) * (W - 2 * P) : W - P - ((v - x0) / (x1 - x0)) * (W - 2 * P));
  const sy = (v: number) => (ym.hi ? H - P - ((v - y0) / (y1 - y0)) * (H - 2 * P) : P + ((v - y0) / (y1 - y0)) * (H - 2 * P));
  const ticks = (a: number, b: number) => [0, 0.25, 0.5, 0.75, 1].map((t) => a + t * (b - a));
  return (
    <Panel>
      <h2 className="mb-3 font-display text-lg">Chart builder</h2>
      <div className="mb-3 grid grid-cols-2 gap-3">
        <MetricSelect id="sc-x" labelText="X axis" tab={tab} value={xk} onChange={setX} />
        <MetricSelect id="sc-y" labelText="Y axis" tab={tab} value={yk} onChange={setY} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${ym.l} vs ${xm.l}`}>
        {ticks(x0, x1).map((t) => (
          <g key={`x${t}`}>
            <line x1={sx(t)} x2={sx(t)} y1={P} y2={H - P} className="stroke-line" />
            <text x={sx(t)} y={H - P + 16} textAnchor="middle" className="fill-faint text-[10px]">{fmtStat(xm, t)}</text>
          </g>
        ))}
        {ticks(y0, y1).map((t) => (
          <g key={`y${t}`}>
            <line x1={P} x2={W - P} y1={sy(t)} y2={sy(t)} className="stroke-line" />
            <text x={P - 6} y={sy(t) + 3} textAnchor="end" className="fill-faint text-[10px]">{fmtStat(ym, t)}</text>
          </g>
        ))}
        {pts.map((r) => (
          <circle
            key={r.id}
            cx={sx(r.v[xk] as number)}
            cy={sy(r.v[yk] as number)}
            r={hover?.id === r.id ? 6 : 4}
            fill={r.color}
            fillOpacity={0.8}
            className="stroke-bg"
            onMouseEnter={() => setHover(r)}
            onFocus={() => setHover(r)}
            tabIndex={0}
          >
            <title>{`${label(tab, r)}: ${xm.s} ${fmtStat(xm, r.v[xk])}, ${ym.s} ${fmtStat(ym, r.v[yk])}`}</title>
          </circle>
        ))}
        <text x={W - P} y={H - 6} textAnchor="end" className="fill-muted text-[11px]">{xm.s} →{xm.hi ? "" : " (lower)"}</text>
        <text x={6} y={14} className="fill-muted text-[11px]">↑ {ym.s}{ym.hi ? "" : " (lower)"}</text>
      </svg>
      <p className="mt-2 min-h-5 text-xs text-muted">
        {hover
          ? `${label(tab, hover)} · ${xm.s} ${fmtStat(xm, hover.v[xk])} · ${ym.s} ${fmtStat(ym, hover.v[yk])}`
          : `${pts.length} plotted. Up and right is better on both axes.`}
      </p>
    </Panel>
  );
}

const COMPARE_DEFAULTS: Record<StatTab, string[]> = {
  teams: ["texas-am", "georgia", "texas", "ohio-state"],
  qb: ["Marcel Reed", "Gunner Stockton", "Arch Manning", "Julian Sayin"],
  rush: [],
  rec: ["Jeremiah Smith"],
};

/** Compare up to 4 rows: value, rank, and percentile inside the current conference cohort. */
export function StatsCompare({ tab, rows, cohort, conf }: { tab: StatTab; rows: StatRow[]; cohort: StatRow[]; conf: string }) {
  const initial = useMemo(() => {
    const ids = COMPARE_DEFAULTS[tab]
      .map((k) => rows.find((r) => (tab === "teams" ? r.slug === k : r.name === k))?.id)
      .filter((x): x is string => Boolean(x));
    // Fill with the top of the default sort so the panel is never empty.
    for (const r of rows) if (ids.length < (tab === "teams" ? 4 : 3) && !ids.includes(r.id)) ids.push(r.id);
    return ids;
  }, [tab, rows]);
  const [picks, setPicks] = useState<string[]>(initial);
  const [add, setAdd] = useState("");
  const chosen = picks.map((id) => rows.find((r) => r.id === id)).filter((r): r is StatRow => Boolean(r));
  const options = useMemo(() => [...rows].sort((a, b) => a.name.localeCompare(b.name)), [rows]);
  const metrics = METRICS[tab];
  return (
    <Panel>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg">Compare</h2>
          <p className="text-xs text-faint">
            Up to 4. P = percentile within {conf === "All" ? "all FBS" : conf} {tab === "teams" ? "teams" : "qualifiers"} (P100 best); # = rank.
          </p>
        </div>
        <label className="flex items-end gap-2 text-xs text-faint">
          <span className="sr-only">Add to compare</span>
          <select
            value={add}
            disabled={picks.length >= 4}
            onChange={(e) => {
              const id = e.target.value;
              if (id && !picks.includes(id) && picks.length < 4) setPicks([...picks, id]);
              setAdd("");
            }}
            className="h-9 max-w-64 rounded-lg bg-raised px-2 text-sm text-fg disabled:opacity-50"
          >
            <option value="">{picks.length >= 4 ? "4 picked (remove one)" : "Add…"}</option>
            {options.map((r) => (
              <option key={r.id} value={r.id} disabled={picks.includes(r.id)}>
                {label(tab, r)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.1em] text-faint">
              <th className="py-2 pr-3 font-medium">Metric</th>
              {chosen.map((r) => (
                <th key={r.id} className="px-2 py-2 font-medium normal-case tracking-normal">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: r.color }} />
                    <span className="truncate text-fg">{label(tab, r)}</span>
                    <button
                      type="button"
                      onClick={() => setPicks(picks.filter((p) => p !== r.id))}
                      className="ml-auto px-1 text-faint hover:text-fg"
                      aria-label={`Remove ${r.name}`}
                    >
                      ×
                    </button>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((m) => (
              <tr key={m.k} className="border-t border-line">
                <td className="py-2 pr-3 text-muted" title={m.def}>{m.l}</td>
                {chosen.map((r) => {
                  const s = standing(m, r.v[m.k], cohort.some((c) => c.id === r.id) ? cohort.map((c) => c.v[m.k]) : [...cohort.map((c) => c.v[m.k]), r.v[m.k]]);
                  return (
                    <td key={r.id} className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        <span className="w-14 tabular">{fmtStat(m, r.v[m.k])}</span>
                        {s ? (
                          <>
                            <span className="h-1.5 flex-1 rounded-full bg-raised">
                              <span className={cn("block h-1.5 rounded-full", s.p >= 50 ? "bg-accent" : "bg-faint")} style={{ width: `${Math.max(2, s.p)}%` }} />
                            </span>
                            <span className="w-24 text-right text-xs tabular text-faint">P{Math.round(s.p)} · #{s.rank}/{s.n}</span>
                          </>
                        ) : null}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
