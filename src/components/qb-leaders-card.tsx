import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { leaderMetric, type LeaderRow } from "@/lib/cfb/qb-leaders";
import { fmtStat } from "@/lib/cfb/stats";

/** Board module: top 5 qualified QBs by total EPA (a real stat), linking to the full leaderboard and each QB Desk. */
export function QbLeadersCard({ rows, n, asOf }: { rows: LeaderRow[]; n: number; asOf: string }) {
  if (!rows.length) return null;
  const tepa = leaderMetric("tepa");
  const epa = leaderMetric("epa");
  return (
    <Panel>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg">QB stat leaders</h2>
        <Link to="/stats/qb-leaders" className="text-sm text-muted hover:text-fg">
          All {n} QBs
        </Link>
      </div>
      <p className="mb-3 text-xs text-muted">Sorted by total EPA (CFBD play-by-play, through {asOf}). A stat leaderboard, not a rating or a Heisman pick.</p>
      <ol className="space-y-1">
        {rows.map((r) => (
          <li key={r.key}>
            <Link to="/stats" search={{ tab: "qb", qb: r.key }} className="flex min-h-10 items-center gap-2 rounded-md text-sm hover:bg-raised">
              <span className="w-5 shrink-0 text-right tabular text-faint">{r.rank}</span>
              <TeamMark slug={r.slug} color={r.color} logoSize={16} />
              <span className="min-w-0 flex-1 truncate">
                {r.name}
                <span className="text-xs text-muted"> · {r.team}</span>
              </span>
              <span className="shrink-0 text-right tabular">
                <span className="font-medium">{fmtStat(tepa, r.stats.tepa.v)}</span>
                <span className="ml-2 text-xs text-muted">{fmtStat(epa, r.stats.epa.v)}/db</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
