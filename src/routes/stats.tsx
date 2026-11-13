import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { StatsCompare, StatsLeaders, StatsScatter } from "@/components/stats-explorer";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import {
  GROUPS,
  METRICS,
  SOURCE_LABEL,
  STAT_TABS,
  TAB_LABEL,
  fmtStat,
  metricOf,
  parseTab,
  sortRows,
  type StatTab,
} from "@/lib/cfb/stats";
import { getStatsTab } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { tab?: StatTab; conf?: ConfFilter; group?: string; sort?: string };

const DEFAULT_SORT: Record<StatTab, string> = { teams: "nepa", qb: "epa", rush: "yds", rec: "yds" };

/** Link search with defaults dropped, matching validateSearch (no redirect on crawl). */
function statsSearch(tab: StatTab, conf: ConfFilter, group?: string, sort?: string): Search {
  return {
    tab: tab === "teams" ? undefined : tab,
    conf: conf === "All" ? undefined : conf,
    group: group && group !== GROUPS[tab][0] ? group : undefined,
    sort: sort && sort !== DEFAULT_SORT[tab] ? sort : undefined,
  };
}

export const Route = createFileRoute("/stats")({
  // Only echo params that were given (and valid), so bare /stats renders 200 instead of a canonicalizing redirect.
  validateSearch: (s: Record<string, unknown>): Search => {
    const tab = parseTab(s.tab);
    const conf = parseConf(s.conf);
    return {
      tab: s.tab != null && tab !== "teams" ? tab : undefined,
      conf: conf !== "All" ? conf : undefined,
      group: GROUPS[tab].includes(String(s.group)) && s.group !== GROUPS[tab][0] ? String(s.group) : undefined,
      sort: metricOf(tab, String(s.sort)) ? String(s.sort) : undefined,
    };
  },
  loaderDeps: ({ search }) => ({ tab: search.tab ?? "teams" }),
  loader: ({ deps }) => getStatsTab({ data: { tab: deps.tab } }),
  component: StatsPage,
  head: () =>
    seo({
      path: "/stats",
      title: "CFB stats explorer · EPA, success rate, havoc, box stats · HASHMARK",
      description:
        "2026 FBS team and player stats: opponent-adjusted EPA per play, success rate, explosiveness, line yards, havoc, player EPA and usage, plus box stats. Sort, filter by conference, chart, and compare.",
    }),
});

function StatsPage() {
  const { meta, rows } = Route.useLoaderData();
  const search = Route.useSearch();
  const tab = search.tab ?? "teams";
  const conf = search.conf ?? "All";
  const group = search.group ?? GROUPS[tab][0];
  const sortMetric = metricOf(tab, search.sort ?? DEFAULT_SORT[tab]) ?? METRICS[tab][0];
  const [query, setQuery] = useState("");

  const pool = useMemo(() => rows.filter((r) => inConf(r.conference, conf)), [rows, conf]);
  const sorted = useMemo(() => sortRows(pool, sortMetric), [pool, sortMetric]);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? sorted.filter((r) => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q)) : sorted;
  }, [sorted, query]);
  const rankOf = useMemo(() => new Map(sorted.map((r, i) => [r.id, i + 1])), [sorted]);
  const cols = METRICS[tab].filter((m) => m.g === group);
  const poolLabel = tab === "teams" ? "138 FBS teams" : `${meta.pools[tab]}, ${rows.length} players`;

  return (
    <div>
      <PageHead
        kicker={`Through ${meta.as_of}`}
        title="Stats explorer"
        lede="Every FBS team and the qualified passers, rushers, and receivers. EPA columns come from play-by-play (CollegeFootballData); counting stats come from the official box (cfbstats). These are stats, not HX: HX stays the one rating on the site."
      />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Stat board">
        {STAT_TABS.map((t) => (
          <Link
            key={t}
            to="/stats"
            search={statsSearch(t, conf)}
            role="tab"
            aria-selected={tab === t}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-lg px-4 text-sm font-medium transition-colors",
              tab === t ? "bg-fg text-bg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {TAB_LABEL[t]}
          </Link>
        ))}
      </div>

      <ConfPills value={conf} to="/stats" searchFor={(c) => statsSearch(tab, c, group, sortMetric.k)} />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {GROUPS[tab].map((g) => (
          <Link
            key={g}
            to="/stats"
            search={statsSearch(tab, conf, g, METRICS[tab].find((m) => m.g === g)?.k)}
            className={cn(
              "inline-flex h-9 items-center rounded-full px-3 text-xs transition-colors",
              group === g ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {g}
          </Link>
        ))}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tab === "teams" ? "Find a team" : "Find a player or team"}
          aria-label="Filter rows"
          className="ml-auto h-9 w-48 rounded-lg bg-raised px-3 text-sm text-fg placeholder:text-faint"
        />
      </div>
      <p className="mb-3 text-xs text-faint">
        {poolLabel} · {conf === "All" ? "all conferences" : conf} · sorted by {sortMetric.l} ({SOURCE_LABEL[sortMetric.src]}). Click a column to sort.
      </p>

      <Panel className="overflow-hidden p-0 sm:p-0">
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="sticky top-0 z-20 bg-surface">
              <tr className="text-[11px] uppercase tracking-[0.1em] text-faint">
                <th className="sticky left-0 z-30 border-b border-line bg-surface px-3 py-3 font-medium">#</th>
                <th className="sticky left-10 z-30 min-w-44 border-b border-r border-line bg-surface px-3 py-3 font-medium">
                  {tab === "teams" ? "Team" : "Player"}
                </th>
                <th className="border-b border-line px-3 py-3 font-medium">{tab === "teams" ? "W–L" : "G"}</th>
                {cols.map((m) => (
                  <th key={m.k} className="border-b border-line px-3 py-3 font-medium" title={`${m.l}: ${m.def}`}>
                    <Link
                      to="/stats"
                      search={statsSearch(tab, conf, group, m.k)}
                      className={cn("whitespace-nowrap hover:text-fg", sortMetric.k === m.k && "text-accent")}
                      aria-sort={sortMetric.k === m.k ? (m.hi ? "descending" : "ascending") : undefined}
                    >
                      {m.s}
                      {sortMetric.k === m.k ? " ▾" : ""}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="group hover:bg-raised/60">
                  <td className="sticky left-0 z-10 border-b border-line bg-surface px-3 py-2 tabular text-faint group-hover:bg-raised">
                    {r.v[sortMetric.k] == null ? "—" : rankOf.get(r.id)}
                  </td>
                  <td className="sticky left-10 z-10 border-b border-r border-line bg-surface px-3 py-2 group-hover:bg-raised">
                    <Link to="/teams/$slug" params={{ slug: r.slug }} className="flex items-center gap-2">
                      <TeamMark slug={r.slug} color={r.color} />
                      <span>
                        <span className="block whitespace-nowrap font-medium">{r.name}</span>
                        <span className="block whitespace-nowrap text-xs text-muted">
                          {tab === "teams" ? r.conference : `${r.pos} · ${r.team}`}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap border-b border-line px-3 py-2 tabular text-muted">{tab === "teams" ? r.wl : r.g}</td>
                  {cols.map((m) => (
                    <td
                      key={m.k}
                      className={cn("border-b border-line px-3 py-2 tabular", sortMetric.k === m.k ? "text-fg" : "text-muted")}
                    >
                      {fmtStat(m, r.v[m.k])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <StatsLeaders tab={tab} rows={pool} metric={sortMetric} />
        <StatsScatter key={`sc-${tab}`} tab={tab} rows={pool} />
      </div>
      <div className="mt-6">
        <StatsCompare key={`cmp-${tab}`} tab={tab} rows={rows} cohort={pool} conf={conf} />
      </div>

      <Panel className="mt-6">
        <h2 className="mb-1 font-display text-lg">Definitions and sources</h2>
        <p className="mb-4 text-xs leading-relaxed text-muted">
          Box: {meta.box_source}. Advanced: {meta.advanced_source}, through games kicked off by {meta.advanced_through.slice(0, 10)} (UTC). {meta.adjustment} Player EPA shows "—" when CFBD play-by-play does not credit at least 70% of the player&apos;s box volume (matched: QB {meta.matched_advanced.qb}, RB {meta.matched_advanced.rush}, WR/TE {meta.matched_advanced.rec}). CFBD counting stats can differ from the official box by 1–3, so counts here always come from cfbstats.
        </p>
        <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          {METRICS[tab].map((m) => (
            <div key={m.k}>
              <dt className="font-medium">
                {m.l} <span className="text-xs font-normal text-faint">· {m.s} · {SOURCE_LABEL[m.src]}</span>
              </dt>
              <dd className="text-muted">{m.def}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
