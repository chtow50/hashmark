import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { METRICS, SOURCE_LABEL, fmtStat } from "@/lib/cfb/stats";
import type { TeamAdvanced } from "@/lib/cfb/stats.server";
import { cn } from "@/lib/utils";

/** Team-page advanced block: CFBD EPA / success / explosiveness / line yards / havoc with FBS rank. */
export function AdvancedStatsPanel({ data, teamSlug }: { data: NonNullable<TeamAdvanced>; teamSlug: string }) {
  const rows = data.rows.map((r) => ({ ...r, m: METRICS.teams.find((x) => x.k === r.k)! }));
  return (
    <Panel className="mb-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl tracking-wide">Advanced stats</h2>
        <Link to="/stats" className="text-sm text-accent hover:underline">
          All teams in the stats explorer →
        </Link>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
        {rows.map(({ k, m, value, rank, n }) => (
          <div key={k} title={m.def}>
            <dt className="text-xs text-muted">{m.l}</dt>
            <dd className="mt-0.5 flex items-baseline gap-2">
              <span className="font-display text-2xl tabular">{fmtStat(m, value)}</span>
              {rank != null ? (
                <span className={cn("text-xs tabular", rank <= Math.ceil(n / 4) ? "text-accent" : "text-faint")}>
                  #{rank} of {n}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
      <details className="mt-4 text-xs text-muted">
        <summary className="cursor-pointer text-faint">Definitions and sources</summary>
        <ul className="mt-2 space-y-1.5">
          {rows.map(({ k, m }) => (
            <li key={k}>
              <span className="text-fg">{m.l}</span> ({SOURCE_LABEL[m.src]}): {m.def}
            </li>
          ))}
        </ul>
        <p className="mt-2">
          Source: {data.meta.advanced_source}, through games kicked off by {data.meta.advanced_through.slice(0, 10)} (UTC){data.games != null ? `, ${data.games} FBS games` : ""}. {data.meta.adjustment} Rank is among 138 FBS teams; #1 is best (lowest for defensive "allowed" stats). These are stats, not HX.
        </p>
      </details>
    </Panel>
  );
}
