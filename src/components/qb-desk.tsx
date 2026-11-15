import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { CHART_KEYS, DESK_KEYS, deskMetric, type DeskGameOut, type DeskKey, type QbDesk as Desk, type Stand } from "@/lib/cfb/qb-desk";
import { fmtStat } from "@/lib/cfb/stats";
import { cn } from "@/lib/utils";

const UP = "var(--color-up)";
const DOWN = "var(--color-down)";
const fmtInt = (x: number) => x.toLocaleString("en-US");
const fmtSigned = (x: number | null | undefined, d = 3) => (x == null ? "—" : `${x > 0 ? "+" : ""}${x.toFixed(d)}`);
const gameDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short", month: "short", day: "numeric" }).format(new Date(iso));
const where = (g: DeskGameOut) => (g.ha === "A" ? "at" : "vs");

/** Change in a metric, colored by whether it helped (green) or hurt (red). */
function Delta({ k, before, after }: { k: DeskKey; before: number | null | undefined; after: number | null | undefined }) {
  if (before == null || after == null) return <span className="text-faint">—</span>;
  const m = deskMetric(k);
  const d = after - before;
  const eps = 0.5 * 10 ** -m.d;
  if (Math.abs(d) < eps) return <span className="text-muted">no change</span>;
  const good = m.hi ? d > 0 : d < 0;
  return (
    <span className="tabular font-medium" style={{ color: good ? UP : DOWN }}>
      {d > 0 ? "+" : "−"}
      {Math.abs(d).toFixed(m.d)}
    </span>
  );
}

function RankMove({ s }: { s: { before: Stand; after: Stand } }) {
  const a = s.after;
  const b = s.before;
  if (!a) return <span className="text-faint">—</span>;
  const moved = b ? b.rank - a.rank : 0; // positive = climbed
  return (
    <span className="inline-flex flex-col items-end whitespace-nowrap leading-tight">
      <span className="tabular">
        {b ? <span className="text-muted">{b.rank}→</span> : null}
        <span className="font-medium">{a.rank}</span>
      </span>
      <span className="text-[11px] tabular text-faint">
        of {a.n}
        {b ? (
          moved !== 0 ? (
            <span style={{ color: moved > 0 ? UP : DOWN }}> {moved > 0 ? `▲${moved}` : `▼${-moved}`}</span>
          ) : (
            " · same"
          )
        ) : null}
      </span>
    </span>
  );
}

export function QbDesk({ desk, onPick, pending }: { desk: Desk; onPick: (key: string) => void; pending: boolean }) {
  const { qb, last, line, values, pools, games, options } = desk;
  const byConf = useMemo(() => {
    const m = new Map<string, Desk["options"]>();
    for (const o of options) {
      const c = o.conference || "Other";
      (m.get(c) ?? m.set(c, []).get(c))!.push(o);
    }
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [options]);

  return (
    <Panel className={cn("mb-6 transition-opacity", pending && "opacity-60")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">HASHMARK QB Desk</p>
          <h2 className="mt-1 flex items-center gap-2 font-display text-2xl leading-tight">
            <TeamMark slug={qb.slug} color={qb.color} logoSize={22} />
            <span className="min-w-0 truncate">{qb.name}</span>
          </h2>
          <p className="mt-1 text-sm text-muted">
            <Link to="/teams/$slug" params={{ slug: qb.slug }} className="underline decoration-faint underline-offset-4 hover:text-fg">
              {qb.team}
            </Link>
            {qb.conference ? ` · ${qb.conference}` : ""} · season through {desk.asOf}
          </p>
        </div>
        <label className="flex w-full flex-col gap-1 text-xs text-muted sm:w-72">
          Pick a qualified QB
          <select
            value={qb.key}
            onChange={(e) => onPick(e.target.value)}
            className="h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg"
            aria-label="Pick a QB for the QB Desk"
          >
            {byConf.map(([c, list]) => (
              <optgroup key={c} label={c}>
                {list.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.name} · {o.team}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-5 [&>*]:min-w-0">
        {/* Last game. */}
        <div className="rounded-xl bg-inset p-4 lg:col-span-2">
          {last ? (
            <>
              <p className="text-xs uppercase tracking-wide text-muted">
                Last game · Week {last.w} · {gameDate(last.date)}
              </p>
              <p className="mt-1 font-display text-lg leading-snug">
                <span style={{ color: last.result === "W" ? UP : last.result === "L" ? DOWN : undefined }}>{last.result}</span> {last.pf}–{last.pa}{" "}
                {where(last)} {last.opp_name}
              </p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <Stat label="C/ATT" value={`${last.c}/${last.a}`} />
                <Stat label="Pass yds" value={fmtInt(last.y)} />
                <Stat label="TD / INT" value={`${last.td} / ${last.i}`} />
                <Stat label="Y/A" value={last.a ? (last.y / last.a).toFixed(1) : "—"} />
                <Stat label="Rush" value={last.car ? `${last.car}–${last.ry}${last.rtd ? `, ${last.rtd} TD` : ""}` : "0"} />
                <Stat label="EPA/play" value={fmtSigned(last.ea)} tone={last.ea} />
              </dl>
              <p className="mt-2 text-xs text-muted">
                EPA per pass play this game: <span className="tabular text-fg/90">{fmtSigned(last.ep)}</span>
                {last.gameKey ? (
                  <>
                    {" "}
                    ·{" "}
                    <Link to="/games/$key" params={{ key: last.gameKey }} className="underline decoration-faint underline-offset-4 hover:text-fg">
                      Game page
                    </Link>
                  </>
                ) : null}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">No game log for this QB yet.</p>
          )}
        </div>

        {/* Season before vs after the last game. */}
        <div className="rounded-xl bg-inset p-4 lg:col-span-3">
          <p className="text-xs uppercase tracking-wide text-muted">Season before vs after {last ? `Week ${last.w}` : "the last game"}</p>
          <p className="mt-1 text-xs text-muted">
            {line.before ? (
              <>
                Before: {line.before.cmp}/{line.before.att}, {fmtInt(line.before.yds)} yds, {line.before.td} TD, {line.before.int} INT · After:{" "}
              </>
            ) : null}
            {line.before ? "" : "Season: "}
            {line.after.cmp}/{line.after.att}, {fmtInt(line.after.yds)} yds, {line.after.td} TD, {line.after.int} INT
          </p>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted">
                <th className="py-1.5 text-left font-medium">Stat</th>
                <th className="py-1.5 pl-3 text-right font-medium">Before</th>
                <th className="py-1.5 pl-3 text-right font-medium">After</th>
                <th className="py-1.5 pl-3 text-right font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {DESK_KEYS.map((k) => {
                const m = deskMetric(k);
                return (
                  <tr key={k} className="border-t border-line">
                    <td className="py-1.5 pr-2" title={m.def}>
                      <span className="hidden sm:inline">{m.l}</span>
                      <span className="sm:hidden">{m.s}</span>
                    </td>
                    <td className="py-1.5 pl-3 text-right tabular text-muted">{fmtStat(m, values.before?.[k])}</td>
                    <td className="py-1.5 pl-3 text-right font-medium tabular">{fmtStat(m, values.after[k])}</td>
                    <td className="py-1.5 pl-2 text-right">
                      <Delta k={k} before={values.before?.[k]} after={values.after[k]} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {desk.epaBeforeNote ? <p className="mt-2 text-xs text-muted">{desk.epaBeforeNote}</p> : null}
        </div>
      </div>

      {/* Rank moves. */}
      <div className="mt-4 rounded-xl bg-inset p-4">
        <p className="text-xs uppercase tracking-wide text-muted">Rank among qualified QBs, before → after {last ? `Week ${last.w}` : "the last game"}</p>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted">
                <th className="py-1.5 text-left font-medium">Stat</th>
                {pools.map((p) => (
                  <th key={p.label} className="py-1.5 pl-3 text-right font-medium">
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DESK_KEYS.map((k) => (
                <tr key={k} className="border-t border-line">
                  <td className="py-1.5 pr-2">
                    <span className="hidden sm:inline">{deskMetric(k).l}</span>
                    <span className="sm:hidden">{deskMetric(k).s}</span>
                  </td>
                  {pools.map((p) => (
                    <td key={p.label} className="py-1.5 pl-3 text-right">
                      <RankMove s={p.ranks[k]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted">
          1 = best. Qualified = 10+ pass attempts per team game. Other QBs stay at their current numbers, so the move shows what this one game did.
          {pools.some((p) => p.label === "P4") ? " P4 = SEC, Big Ten, Big 12 and ACC." : ""}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 [&>*]:min-w-0">
        <ConfChart desk={desk} />
        <GameChart games={games} name={qb.name} />
      </div>

      <GameLog games={games} />

      <details className="mt-4 rounded-xl bg-inset p-4">
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3">
          <span className="font-medium">How to read EPA</span>
          <span className="text-sm text-muted">Show</span>
        </summary>
        <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
          <p>
            <span className="text-fg">EPA (expected points added).</span> Before every snap, the down, distance and field position say how many points an
            average offense would expect to score on that drive. EPA is how much one play moved that number. A long completion on third down adds expected
            points; a sack or an interception takes them away.
          </p>
          <p>
            <span className="text-fg">EPA per play</span> is the average over a QB&apos;s plays. <span className="text-fg">0.000 is an average play</span> in the
            same down, distance and field spot. Above zero is better than average, below zero is worse. Because it is an average, it is the fair way to
            compare QBs with different workloads. The season number on this desk is per pass play (dropback); the game chart can show all plays or passes
            only.
          </p>
          <p>
            <span className="text-fg">Total EPA</span> adds up every pass and run all season. It grows with volume, so a busy average QB can out-total an
            efficient backup. Zero means break-even with an average QB. It can go negative, which means his plays cost his team points compared with an
            average play. It does not mean the team would be better with no QB: zero is an average QB, not an empty field.
          </p>
          <p>
            Player EPA is raw, not adjusted for opponents. Source: CollegeFootballData play-by-play. Counting stats come from the official box (cfbstats);
            the before line is the season total minus this game&apos;s box line. Season through {desk.asOf}; the before EPA comes from our {desk.beforeAsOf}{" "}
            stats build.
          </p>
        </div>
      </details>
    </Panel>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: number | null }) {
  return (
    <div className="min-w-0 rounded-lg bg-surface px-2 py-1.5">
      <dt className="truncate text-[10px] uppercase tracking-wide text-muted">{label}</dt>
      <dd className="tabular font-medium" style={tone == null ? undefined : { color: tone > 0 ? UP : tone < 0 ? DOWN : undefined }}>
        {value}
      </dd>
    </div>
  );
}

/** Conference QBs on one stat, best first. EPA stats are drawn from zero (an average play). */
function ConfChart({ desk }: { desk: Desk }) {
  const [k, setK] = useState<(typeof CHART_KEYS)[number]>("epa");
  const m = deskMetric(k);
  const rows = desk.conf.rows.filter((r) => r.v[k] != null).sort((a, b) => (b.v[k] as number) - (a.v[k] as number));
  const vals = rows.map((r) => r.v[k] as number);
  const zeroBased = k === "epa" || k === "tepa";
  const lo = zeroBased ? Math.min(0, ...vals) : Math.min(...vals);
  const hi = zeroBased ? Math.max(0, ...vals) : Math.max(...vals);
  const span = hi - lo || 1;
  const base = zeroBased ? 0 : lo;
  const pos = (x: number) => (100 * (x - lo)) / span;
  const avg = vals.length ? vals.reduce((s, x) => s + x, 0) / vals.length : null;
  return (
    <div className="rounded-xl bg-inset p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-muted">{desk.conf.label} QBs · {m.l}</p>
        <div role="group" aria-label="Chart stat" className="inline-flex rounded-lg bg-surface p-1">
          {CHART_KEYS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={k === c}
              onClick={() => setK(c)}
              className={cn("min-h-9 rounded-md px-2.5 text-xs transition-colors", k === c ? "bg-raised text-fg" : "text-muted hover:text-fg")}
            >
              {deskMetric(c).s}
            </button>
          ))}
        </div>
      </div>
      <ol className="mt-3 space-y-1.5">
        {rows.map((r, i) => {
          const v = r.v[k] as number;
          const me = r.key === desk.qb.key;
          const a = pos(Math.min(v, base));
          const b = pos(Math.max(v, base));
          return (
            <li key={r.key} className={cn("grid grid-cols-[1.25rem_minmax(0,7.5rem)_minmax(0,1fr)_3.75rem] items-center gap-x-2 text-xs", me && "font-semibold")}>
              <span className="text-right tabular text-faint">{i + 1}</span>
              <span className={cn("truncate", me ? "text-fg" : "text-fg/80")} title={`${r.name} · ${r.team}`}>
                {r.name}
              </span>
              <span className="relative h-3.5 rounded-sm bg-surface">
                {zeroBased ? <span className="absolute inset-y-0 w-px bg-faint/60" style={{ left: `${pos(0)}%` }} aria-hidden /> : null}
                <span
                  className="absolute inset-y-0.5 rounded-sm"
                  style={{
                    left: `${a}%`,
                    width: `${Math.max(1, b - a)}%`,
                    background: me ? "var(--color-accent)" : zeroBased ? (v >= 0 ? UP : DOWN) : "var(--color-faint)",
                    opacity: me ? 1 : 0.55,
                  }}
                />
              </span>
              <span className="text-right tabular">{fmtStat(m, v)}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-muted">
        Qualified {desk.conf.label} QBs ({rows.length}).{" "}
        {zeroBased ? "Bars start at zero, an average play: right of the line is above average, left is below." : "Bars start at the lowest value shown."}
        {avg != null ? ` Group average ${fmtStat(m, avg)}.` : ""} Highlighted: {desk.qb.name}.
      </p>
    </div>
  );
}

/** EPA per play in each game, above or below zero (an average play). */
function GameChart({ games, name }: { games: DeskGameOut[]; name: string }) {
  const [kind, setKind] = useState<"ea" | "ep">("ea");
  const vals = games.map((g) => g[kind]).filter((x): x is number => x != null);
  const ext = Math.max(0.25, ...vals.map((x) => Math.abs(x)));
  const H = 72; // px each side of zero
  return (
    <div className="rounded-xl bg-inset p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-muted">Game by game · EPA per play</p>
        <div role="group" aria-label="Plays" className="inline-flex rounded-lg bg-surface p-1">
          {(
            [
              ["ea", "All plays"],
              ["ep", "Passes"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn("min-h-9 rounded-md px-2.5 text-xs transition-colors", kind === k ? "bg-raised text-fg" : "text-muted hover:text-fg")}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-stretch gap-1" role="img" aria-label={`${name}: EPA per play by game`}>
        {games.map((g) => {
          const v = g[kind];
          const h = v == null ? 0 : Math.max(2, (Math.abs(v) / ext) * H);
          return (
            <div key={g.gid} className="flex min-w-0 flex-1 flex-col items-center" title={`Week ${g.w} ${where(g)} ${g.opp_name}: ${fmtSigned(v)}`}>
              <div className="flex w-full flex-col items-center justify-end" style={{ height: H + 14 }}>
                {v != null && v >= 0 ? (
                  <>
                    <span className="hidden text-[10px] tabular text-muted sm:block">{fmtSigned(v, 2)}</span>
                    <div className="w-full max-w-7 rounded-t-sm" style={{ height: h, background: UP }} />
                  </>
                ) : null}
              </div>
              <div className="h-px w-full bg-faint/70" />
              <div className="flex w-full flex-col items-center justify-start" style={{ height: H + 14 }}>
                {v != null && v < 0 ? (
                  <>
                    <div className="w-full max-w-7 rounded-b-sm" style={{ height: h, background: DOWN }} />
                    <span className="hidden text-[10px] tabular text-muted sm:block">{fmtSigned(v, 2)}</span>
                  </>
                ) : null}
              </div>
              <span className="mt-1 text-[10px] tabular text-faint">W{g.w}</span>
              <span className="w-full truncate text-center text-[10px] text-muted">{g.oppShort}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        The line is zero, an average play. Green is above average, red below. {vals.length < games.length ? "Blank: no play-by-play EPA for that game. " : ""}
        Source: CollegeFootballData.
      </p>
    </div>
  );
}

function GameLog({ games }: { games: DeskGameOut[] }) {
  if (!games.length) return null;
  return (
    <div className="mt-4 overflow-x-auto rounded-xl bg-inset">
      <table className="w-full min-w-[40rem] text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-muted">
            <th className="px-3 py-2 text-left font-medium">Wk</th>
            <th className="px-3 py-2 text-left font-medium">Opponent</th>
            <th className="px-3 py-2 text-left font-medium">Result</th>
            <th className="px-3 py-2 text-right font-medium">C/ATT</th>
            <th className="px-3 py-2 text-right font-medium">Yds</th>
            <th className="px-3 py-2 text-right font-medium">TD</th>
            <th className="px-3 py-2 text-right font-medium">INT</th>
            <th className="px-3 py-2 text-right font-medium">Rush</th>
            <th className="px-3 py-2 text-right font-medium">EPA/play</th>
            <th className="px-3 py-2 text-right font-medium">Pass EPA</th>
          </tr>
        </thead>
        <tbody>
          {[...games].reverse().map((g) => (
            <tr key={g.gid} className="border-t border-line">
              <td className="px-3 py-2 tabular text-muted">{g.w}</td>
              <td className="whitespace-nowrap px-3 py-2">
                <span className="text-muted">{where(g)} </span>
                {g.gameKey ? (
                  <Link to="/games/$key" params={{ key: g.gameKey }} className="underline decoration-faint underline-offset-4 hover:text-fg">
                    {g.opp_name}
                  </Link>
                ) : (
                  g.opp_name
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-2 tabular">
                <span style={{ color: g.result === "W" ? UP : g.result === "L" ? DOWN : undefined }}>{g.result}</span> {g.pf}–{g.pa}
              </td>
              <td className="px-3 py-2 text-right tabular">
                {g.c}/{g.a}
              </td>
              <td className="px-3 py-2 text-right tabular">{fmtInt(g.y)}</td>
              <td className="px-3 py-2 text-right tabular">{g.td}</td>
              <td className="px-3 py-2 text-right tabular">{g.i}</td>
              <td className="whitespace-nowrap px-3 py-2 text-right tabular">{g.car ? `${g.car}–${g.ry}` : "0"}</td>
              <td className="px-3 py-2 text-right tabular" style={{ color: g.ea == null ? undefined : g.ea > 0 ? UP : g.ea < 0 ? DOWN : undefined }}>
                {fmtSigned(g.ea)}
              </td>
              <td className="px-3 py-2 text-right tabular text-muted">{fmtSigned(g.ep)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line px-3 py-2 text-xs text-muted">
        Game lines: CollegeFootballData box scores (can differ from the official season box by a play or two). EPA per play: CollegeFootballData play-by-play.
      </p>
    </div>
  );
}
