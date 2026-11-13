import { Panel } from "@/components/shell";
import { TeamLink } from "@/components/marks";
import {
  HX_REFIT_STAMP,
  HX_REFIT_THROUGH_WEEK,
  hxTrajectory,
  hxVsResults,
  risersFallers,
  summarizeHxResults,
  type RankMover,
} from "@/lib/cfb/hx-results";
import type { ScheduleGame, TeamSummary } from "@/lib/cfb/types";
import { cn, fmtNum } from "@/lib/utils";

const signed = (n: number, d = 1) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${fmtNum(Math.abs(n), d)}`;

function Sparkline({ values, className }: { values: number[]; className?: string }) {
  if (values.length < 2) return null;
  const w = 240;
  const h = 56;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (w - 8) + 4;
    const y = h - 4 - ((v - min) / span) * (h - 8);
    return [x, y] as const;
  });
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-14 w-full max-w-[240px]", className)} aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
      <circle cx={lx} cy={ly} r="3" className="fill-accent" />
    </svg>
  );
}

/** Team page: pregame HX line vs final margin on every stamped FBS FINAL, plus HX by week. */
export function HxResultsPanel({ teamSlug, games }: { teamSlug: string; games: ScheduleGame[] }) {
  const rows = hxVsResults(teamSlug, games);
  const summary = summarizeHxResults(rows);
  const traj = hxTrajectory(teamSlug);
  if (!summary && !traj) return null;

  return (
    <Panel className="mb-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-2xl tracking-wide">HX vs results</h2>
        <p className="text-xs text-faint">
          {HX_REFIT_STAMP} · FBS FINALs through Week {HX_REFIT_THROUGH_WEEK}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">
        Expected margin is the pregame HX line for each game (the board in effect at kickoff). Actual is the final.
      </p>

      <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_auto]">
        {summary ? (
          <dl className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">Expected</dt>
              <dd className="mt-1 font-display text-2xl tabular leading-none">{signed(summary.avgExpected)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">Actual</dt>
              <dd className="mt-1 font-display text-2xl tabular leading-none">{signed(summary.avgActual)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">vs HX</dt>
              <dd
                className={cn(
                  "mt-1 font-display text-2xl tabular leading-none",
                  summary.avgDiff > 0 ? "text-up" : summary.avgDiff < 0 ? "text-down" : "",
                )}
              >
                {signed(summary.avgDiff)}
              </dd>
            </div>
            <p className="col-span-3 text-xs text-muted">
              Points per game, {summary.n} FBS FINAL{summary.n === 1 ? "" : "s"}. HX picked the winner{" "}
              {summary.suHits}/{summary.n}.
            </p>
          </dl>
        ) : (
          <p className="text-sm text-muted">No FBS FINALs stamped yet.</p>
        )}
        {traj ? (
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-faint">HX by week</div>
            <Sparkline values={traj.points.map((p) => p.hx)} className="mt-1" />
            <p className="text-xs tabular text-muted">
              Preseason {fmtNum(traj.preHx, 2)} (#{traj.preRank}) → now {fmtNum(traj.hx, 2)} (#{traj.rank})
            </p>
          </div>
        ) : null}
      </div>

      {rows.length ? (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm tabular">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-faint">
                <th className="py-2 pr-3 font-normal">Wk</th>
                <th className="py-2 pr-3 font-normal">Opponent</th>
                <th className="py-2 pr-3 text-right font-normal">Expected</th>
                <th className="py-2 pr-3 text-right font-normal">Actual</th>
                <th className="py-2 text-right font-normal">Diff</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.gameId} className="border-b border-line last:border-0">
                  <td className="py-2 pr-3 text-muted">{r.week}</td>
                  <td className="py-2 pr-3">
                    {r.neutral ? "vs " : r.home ? "" : "@ "}
                    {r.opponentShort}
                  </td>
                  <td className="py-2 pr-3 text-right">{signed(r.expected)}</td>
                  <td className="py-2 pr-3 text-right">{signed(r.actual, 0)}</td>
                  <td
                    className={cn(
                      "py-2 text-right",
                      r.diff > 0 ? "text-up" : r.diff < 0 ? "text-down" : "text-muted",
                    )}
                  >
                    {signed(r.diff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Panel>
  );
}

function MoverList({
  title,
  movers,
  bySlug,
}: {
  title: string;
  movers: RankMover[];
  bySlug: Map<string, Pick<TeamSummary, "slug" | "shortName" | "colorPrimary">>;
}) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.14em] text-faint">{title}</h3>
      <ul className="mt-2">
        {movers.map((m) => {
          const t = bySlug.get(m.slug);
          return (
            <li key={m.slug} className="flex items-center justify-between gap-3 py-1.5">
              {t ? <TeamLink slug={t.slug} name={t.shortName} color={t.colorPrimary} /> : <span>{m.slug}</span>}
              <span className="shrink-0 text-right text-sm tabular">
                <span className={m.delta > 0 ? "text-up" : "text-down"}>{signed(m.delta, 0)}</span>
                <span className="ml-2 text-[11px] text-faint">
                  #{m.preRank} → #{m.rank}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Homepage: biggest HX rank moves since the preseason board. */
export function RisersFallersCard({
  teams,
  limit = 5,
}: {
  teams: Pick<TeamSummary, "slug" | "shortName" | "colorPrimary">[];
  limit?: number;
}) {
  const { risers, fallers } = risersFallers(limit);
  const bySlug = new Map(teams.map((t) => [t.slug, t]));
  return (
    <Panel>
      <h2 className="font-display text-2xl tracking-wide">Risers &amp; fallers</h2>
      <p className="mt-1 mb-4 text-sm text-muted">
        HX rank now vs the preseason board · {HX_REFIT_STAMP}, FINALs through Week {HX_REFIT_THROUGH_WEEK}.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <MoverList title="Risers" movers={risers} bySlug={bySlug} />
        <MoverList title="Fallers" movers={fallers} bySlug={bySlug} />
      </div>
    </Panel>
  );
}
