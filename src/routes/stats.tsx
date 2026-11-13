import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Plus, Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { StatsCompare, StatsLeaders, StatsScatter, cellTint } from "@/components/stats-explorer";
import { CONFS, inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import {
  COLUMN_SETS,
  METRICS,
  QUICK_VIEWS,
  SOURCE_LABEL,
  STAT_TABS,
  TAB_LABEL,
  columnSet,
  fmtStat,
  metricOf,
  parseTab,
  percentileMap,
  sortRows,
  type Metric,
  type StatRow,
  type StatTab,
} from "@/lib/cfb/stats";
import { getStatsTab } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Dir = "worst";
type Search = { tab?: StatTab; conf?: ConfFilter; group?: string; sort?: string; dir?: Dir };

const DEFAULT_SORT: Record<StatTab, string> = { teams: "nepa", qb: "epa", rush: "yds", rec: "yds" };
const PAGE = 25;

/** Link search with defaults dropped, matching validateSearch (no redirect on crawl). */
function statsSearch(tab: StatTab, conf: ConfFilter, group?: string, sort?: string, dir?: Dir): Search {
  return {
    tab: tab === "teams" ? undefined : tab,
    conf: conf === "All" ? undefined : conf,
    group: group && group !== COLUMN_SETS[tab][0].key ? group : undefined,
    sort: sort && sort !== DEFAULT_SORT[tab] ? sort : undefined,
    dir: dir === "worst" ? "worst" : undefined,
  };
}

export const Route = createFileRoute("/stats")({
  // Only echo params that were given (and valid), so bare /stats renders 200 instead of a canonicalizing redirect.
  validateSearch: (s: Record<string, unknown>): Search => {
    const tab = parseTab(s.tab);
    const conf = parseConf(s.conf);
    const group = COLUMN_SETS[tab].some((c) => c.key === s.group) && s.group !== COLUMN_SETS[tab][0].key ? String(s.group) : undefined;
    return {
      tab: s.tab != null && tab !== "teams" ? tab : undefined,
      conf: conf !== "All" ? conf : undefined,
      group,
      sort: metricOf(tab, String(s.sort)) ? String(s.sort) : undefined,
      dir: s.dir === "worst" ? "worst" : undefined,
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

const DEFAULT_PICKS: Record<StatTab, string[]> = {
  teams: ["texas-am", "georgia", "texas", "ohio-state"],
  qb: ["Marcel Reed", "Gunner Stockton", "Arch Manning", "Julian Sayin"],
  rush: [],
  rec: ["Jeremiah Smith"],
};

function defaultPicks(tab: StatTab, rows: StatRow[]): string[] {
  const ids = DEFAULT_PICKS[tab]
    .map((k) => rows.find((r) => (tab === "teams" ? r.slug === k : r.name === k))?.id)
    .filter((x): x is string => Boolean(x));
  for (const r of sortRows(rows, metricOf(tab, DEFAULT_SORT[tab])!)) if (ids.length < 3 && !ids.includes(r.id)) ids.push(r.id);
  return ids;
}

function StatsPage() {
  const { meta, rows } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/stats" });
  const tab = search.tab ?? "teams";
  const conf = search.conf ?? "All";
  const set = columnSet(tab, search.group);
  const sortMetric = metricOf(tab, search.sort ?? DEFAULT_SORT[tab]) ?? METRICS[tab][0];
  const dir = search.dir === "worst" ? "worst" : "best";
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [picksByTab, setPicksByTab] = useState<Partial<Record<StatTab, string[]>>>({});
  const picks = picksByTab[tab] ?? defaultPicks(tab, rows);
  const setPicks = (next: string[]) => setPicksByTab((p) => ({ ...p, [tab]: next.slice(0, 4) }));
  const togglePick = (id: string) => setPicks(picks.includes(id) ? picks.filter((p) => p !== id) : [...picks, id]);

  const pool = useMemo(() => rows.filter((r) => inConf(r.conference, conf)), [rows, conf]);
  const sorted = useMemo(() => sortRows(pool, sortMetric, dir), [pool, sortMetric, dir]);
  const rankOf = useMemo(() => new Map(sortRows(pool, sortMetric).map((r, i) => [r.id, i + 1])), [pool, sortMetric]);
  const cols = set.cols.map((k) => metricOf(tab, k)!).filter(Boolean);
  const pct = useMemo(() => new Map(cols.map((m) => [m.k, percentileMap(pool, m)])), [pool, cols]);
  const q = query.trim().toLowerCase();
  const matches = q ? sorted.filter((r) => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q)) : sorted;
  const shown = q || showAll ? matches : matches.slice(0, PAGE);
  const noun = tab === "teams" ? "teams" : tab === "qb" ? "QBs" : tab === "rush" ? "rushers" : "receivers";
  const poolLabel = tab === "teams" ? `${pool.length} teams` : `${pool.length} ${noun} (${meta.pools[tab]})`;

  return (
    <div>
      <PageHead
        kicker={`2026 season · through ${meta.as_of}`}
        title="Stats explorer"
        lede="Team and player stats for every FBS program: play-by-play EPA (CollegeFootballData) next to the official box (cfbstats). Sort any column, filter by conference, chart any two stats, and compare up to four. Stats, not ratings: HX stays the one rating."
      />

      {/* Toolbar: board, conference, search. */}
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="inline-flex shrink-0 rounded-xl bg-raised p-1" role="tablist" aria-label="Stat board">
          {STAT_TABS.map((t) => (
            <Link
              key={t}
              to="/stats"
              search={statsSearch(t, conf)}
              role="tab"
              aria-selected={tab === t}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none",
                tab === t ? "bg-fg text-bg" : "text-muted hover:text-fg",
              )}
            >
              {TAB_LABEL[t]}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <label className="relative flex-1 sm:max-w-56">
            <span className="sr-only">Conference</span>
            <select
              value={conf}
              onChange={(e) => navigate({ search: statsSearch(tab, parseConf(e.target.value), set.key, sortMetric.k, search.dir) })}
              className="h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg"
            >
              {CONFS.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All conferences" : c}
                </option>
              ))}
            </select>
          </label>
          <label className="relative flex-1 lg:max-w-72">
            <span className="sr-only">Find a {tab === "teams" ? "team" : "player or team"}</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tab === "teams" ? "Find a team" : "Find a player or team"}
              className="h-12 w-full rounded-xl bg-raised pl-9 pr-3 text-sm text-fg placeholder:text-faint"
            />
          </label>
        </div>
      </div>

      {/* Quick views + column sets. */}
      <div className="-mx-4 mb-2 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <span className="mr-1 shrink-0 text-xs text-muted">Quick views</span>
        {QUICK_VIEWS[tab].map((v) => {
          const active = set.key === v.group && sortMetric.k === v.sort && dir === "best";
          return (
            <Link
              key={v.label}
              to="/stats"
              search={statsSearch(tab, conf, v.group, v.sort)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs transition-colors",
                active ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:border-faint hover:text-fg",
              )}
            >
              {v.label}
            </Link>
          );
        })}
      </div>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border" role="tablist" aria-label="Columns">
        {COLUMN_SETS[tab].map((c) => (
          <Link
            key={c.key}
            to="/stats"
            search={statsSearch(tab, conf, c.key, c.cols.includes(sortMetric.k) ? sortMetric.k : c.cols[0], search.dir)}
            role="tab"
            aria-selected={set.key === c.key}
            className={cn(
              "-mb-px inline-flex h-11 shrink-0 items-center border-b-2 px-3 text-sm transition-colors",
              set.key === c.key ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
            )}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <SortedBy metric={sortMetric} dir={dir} poolLabel={poolLabel} conf={conf} />

      <Panel className="overflow-hidden p-0 sm:p-0">
        <div className={cn("overflow-auto", showAll && !q && "max-h-[80vh]")}>
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead className="sticky top-0 z-20">
              <tr className="text-[11px] uppercase tracking-[0.08em] text-muted">
                <th className="sticky left-0 z-30 w-8 border-b border-border bg-surface px-2 py-3 text-right font-medium">#</th>
                <th className="sticky left-8 z-30 border-b border-r border-border bg-surface px-3 py-3 text-left font-medium">
                  {tab === "teams" ? "Team" : "Player"}
                </th>
                <th className="whitespace-nowrap border-b border-border bg-surface px-3 py-3 text-right font-medium">{tab === "teams" ? "W–L" : "G"}</th>
                {cols.map((m, i) => (
                  <HeaderCell key={m.k} m={m} tab={tab} conf={conf} group={set.key} active={sortMetric.k === m.k} dir={dir} alignRight={i >= cols.length - 3} />
                ))}
                <th className="border-b border-border bg-surface px-2 py-3 text-center font-medium">
                  <span className="sr-only">Compare</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => {
                const picked = picks.includes(r.id);
                return (
                  <tr key={r.id} className={cn("group", picked && "[&>td]:bg-raised")}>
                    <td className="sticky left-0 z-10 w-8 border-b border-line bg-surface px-2 py-2 text-right tabular text-faint group-hover:bg-raised">
                      {r.v[sortMetric.k] == null ? "—" : rankOf.get(r.id)}
                    </td>
                    <td className="sticky left-8 z-10 max-w-[8.5rem] border-b border-r border-line bg-surface px-3 py-2 group-hover:bg-raised sm:max-w-none">
                      <Link to="/teams/$slug" params={{ slug: r.slug }} className="flex min-h-10 items-center gap-2">
                        <TeamMark slug={r.slug} color={r.color} />
                        <span className="min-w-0">
                          <span className="block truncate font-medium sm:whitespace-nowrap">{r.name}</span>
                          <span className={cn("truncate text-xs text-muted sm:block sm:whitespace-nowrap", tab === "teams" ? "hidden" : "block")}>
                            {tab === "teams" ? r.conference : r.team}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap border-b border-line px-3 py-2 text-right tabular text-muted">{tab === "teams" ? r.wl : r.g}</td>
                    {cols.map((m) => {
                      const p = pct.get(m.k)?.get(r.id);
                      return (
                        <td
                          key={m.k}
                          className={cn(
                            "whitespace-nowrap border-b border-line px-3 py-2 text-right tabular",
                            sortMetric.k === m.k ? "font-semibold text-fg" : "text-fg/85",
                          )}
                          style={cellTint(p)}
                          title={p == null ? undefined : `${m.l}: P${Math.round(p)} in ${conf === "All" ? "FBS" : conf}`}
                        >
                          {fmtStat(m, r.v[m.k])}
                        </td>
                      );
                    })}
                    <td className="border-b border-line px-1 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => togglePick(r.id)}
                        disabled={!picked && picks.length >= 4}
                        aria-pressed={picked}
                        aria-label={picked ? `Remove ${r.name} from compare` : `Add ${r.name} to compare`}
                        title={picked ? "In compare (click to remove)" : picks.length >= 4 ? "Compare is full (4)" : "Add to compare"}
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:opacity-30",
                          picked ? "bg-accent text-accent-fg" : "text-muted hover:bg-raised hover:text-fg",
                        )}
                      >
                        {picked ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {shown.length === 0 ? (
                <tr>
                  <td colSpan={cols.length + 4} className="px-4 py-10 text-center text-muted">
                    No {noun} match “{query}”{conf !== "All" ? ` in ${conf}` : ""}.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted">
          <ShadeLegend />
          {!q && matches.length > PAGE ? (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border"
            >
              {showAll ? `Show top ${PAGE}` : `Show all ${matches.length} ${noun}`}
            </button>
          ) : (
            <span>
              {matches.length} {noun}
            </span>
          )}
        </div>
      </Panel>

      <div className="mt-6">
        <StatsCompare tab={tab} rows={rows} cohort={pool} conf={conf} picks={picks} setPicks={setPicks} defaultSet={set.key} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <StatsScatter key={`sc-${tab}`} tab={tab} rows={pool} picks={picks} />
        </div>
        <div className="lg:col-span-2">
          <StatsLeaders tab={tab} rows={pool} metric={sortMetric} />
        </div>
      </div>

      <Panel className="mt-6">
        <details>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
            <span>
              <span className="block font-display text-lg">Glossary, sources and method</span>
              <span className="block text-xs text-muted">{METRICS[tab].length} stats on this board · where each number comes from</span>
            </span>
            <span className="text-sm text-muted">Show</span>
          </summary>
          <p className="mb-4 mt-3 text-sm leading-relaxed text-muted">
            Box: {meta.box_source}. Advanced: {meta.advanced_source}, through games kicked off by {meta.advanced_through.slice(0, 10)} (UTC). {meta.adjustment} Player EPA shows "—" when CFBD play-by-play does not credit at least 70% of the player&apos;s box volume (matched: QB {meta.matched_advanced.qb}, RB {meta.matched_advanced.rush}, WR/TE {meta.matched_advanced.rec}). CFBD counting stats can differ from the official box by 1–3, so counts here always come from cfbstats.
          </p>
          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {METRICS[tab].map((m) => (
              <div key={m.k}>
                <dt className="font-medium">
                  {m.l} <span className="text-xs font-normal text-muted">· {m.s} · {SOURCE_LABEL[m.src]}</span>
                </dt>
                <dd className="text-muted">{m.def}</dd>
              </div>
            ))}
          </dl>
        </details>
      </Panel>
    </div>
  );
}

function SortedBy({ metric, dir, poolLabel, conf }: { metric: Metric; dir: "best" | "worst"; poolLabel: string; conf: ConfFilter }) {
  return (
    <div className="mb-3 rounded-xl bg-inset px-4 py-3 text-sm">
      <p>
        <span className="text-muted">Sorted by </span>
        <span className="font-medium">{metric.l}</span>
        <span className="text-muted">
          {" "}
          · {dir === "best" ? "best first" : "worst first"} · {poolLabel}
          {conf === "All" ? "" : ` in ${conf}`}
        </span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {metric.def} <span className="text-faint">({SOURCE_LABEL[metric.src]}{metric.hi ? "" : "; lower is better"})</span>
      </p>
    </div>
  );
}

function HeaderCell({
  m,
  tab,
  conf,
  group,
  active,
  dir,
  alignRight,
}: {
  m: Metric;
  tab: StatTab;
  conf: ConfFilter;
  group: string;
  active: boolean;
  dir: "best" | "worst";
  alignRight: boolean;
}) {
  // Click a column to sort best-first; click the active column again to flip.
  const nextDir: Dir | undefined = active && dir === "best" ? "worst" : undefined;
  return (
    <th
      className="group/th relative border-b border-border bg-surface px-3 py-3 text-right font-medium"
      aria-sort={active ? ((m.hi ? dir === "best" : dir === "worst") ? "descending" : "ascending") : undefined}
    >
      <Link
        to="/stats"
        search={statsSearch(tab, conf, group, m.k, nextDir)}
        className={cn(
          "inline-flex min-h-8 items-center gap-1 whitespace-nowrap underline decoration-dotted decoration-faint underline-offset-4 hover:text-fg",
          active && "text-fg decoration-fg",
        )}
      >
        {m.s}
        <span aria-hidden className={cn("text-[10px]", active ? "opacity-100" : "opacity-0 group-hover/th:opacity-40")}>
          {active && dir === "worst" ? "▲" : "▼"}
        </span>
      </Link>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-full z-40 mt-1 hidden w-64 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block",
          alignRight ? "right-0" : "left-0",
        )}
      >
        <span className="block font-medium">{m.l}</span>
        <span className="mt-1 block text-muted">{m.def}</span>
        <span className="mt-1 block text-faint">
          {SOURCE_LABEL[m.src]} · {m.hi ? "higher is better" : "lower is better"}
        </span>
      </span>
    </th>
  );
}

function ShadeLegend() {
  return (
    <span className="flex items-center gap-2">
      <span>Cell shade = percentile in this view:</span>
      <span className="inline-flex items-center gap-1">
        <span className="h-3 w-5 rounded-sm" style={cellTint(5)} /> worse
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="h-3 w-5 rounded-sm border border-border" /> middle
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="h-3 w-5 rounded-sm" style={cellTint(95)} /> better
      </span>
    </span>
  );
}
