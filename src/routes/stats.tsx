import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Download, Plus, Search as SearchIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { StatsCompare, StatsLeaders, StatsScatter, cellTint } from "@/components/stats-explorer";
import { CONFS, inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import {
  QUALIFY,
  isQualified,
  qualifierText,
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
import { downloadCsv } from "@/lib/download";
import { cn } from "@/lib/utils";

type Dir = "worst";
type Search = { tab?: StatTab; conf?: ConfFilter; group?: string; sort?: string; dir?: Dir };

const DEFAULT_SORT: Record<StatTab, string> = { teams: "nepa", qb: "epa", rush: "yds", rec: "yds", def: "hp" };
const PAGE = 25;
const NOUN: Record<StatTab, string> = { teams: "teams", qb: "QBs", rush: "rushers", rec: "receivers", def: "defenders" };

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
  def: [],
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
  const [allPlayers, setAllPlayers] = useState(false);
  const qual = QUALIFY[tab];
  const eligible = useMemo(() => (qual && !allPlayers ? rows.filter((r) => isQualified(tab, r)) : rows), [rows, tab, qual, allPlayers]);
  const [picksByTab, setPicksByTab] = useState<Partial<Record<StatTab, string[]>>>({});
  const picks = picksByTab[tab] ?? defaultPicks(tab, eligible);
  const setPicks = (next: string[]) => setPicksByTab((p) => ({ ...p, [tab]: next.slice(0, 4) }));
  const togglePick = (id: string) => setPicks(picks.includes(id) ? picks.filter((p) => p !== id) : [...picks, id]);

  // Ranks, percentiles, and shading are all computed inside this pool (qualifier + conference).
  const pool = useMemo(() => eligible.filter((r) => inConf(r.conference, conf)), [eligible, conf]);
  const sorted = useMemo(() => sortRows(pool, sortMetric, dir), [pool, sortMetric, dir]);
  const rankOf = useMemo(() => new Map(sortRows(pool, sortMetric).map((r, i) => [r.id, i + 1])), [pool, sortMetric]);
  const cols = set.cols.map((k) => metricOf(tab, k)!).filter(Boolean);
  const pct = useMemo(() => new Map(cols.map((m) => [m.k, percentileMap(pool, m)])), [pool, cols]);
  const q = query.trim().toLowerCase();
  const matches = q ? sorted.filter((r) => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q)) : sorted;
  const shown = q || showAll ? matches : matches.slice(0, PAGE);
  const noun = NOUN[tab];
  const poolDef = tab === "teams" ? null : (qualifierText(tab, allPlayers) ?? (meta.pools as Record<string, string | undefined>)[tab]);
  const poolLabel = tab === "teams" ? `${pool.length} teams` : `${pool.length} ${noun}${poolDef ? ` (${poolDef})` : ""}`;
  const headRef = useRef<HTMLDivElement>(null);
  // Fixed layout so the sticky header strip and the body share column widths exactly.
  const tableWidth = `max(100%, ${2 + 14 + 4 + cols.length * 6.5 + 3}rem)`;
  function exportCsv() {
    const all = METRICS[tab];
    const header = ["rank", tab === "teams" ? "team" : "player", ...(tab === "teams" ? ["conference", "w_l"] : ["team", "pos", "conference", "g"]), ...all.map((m) => m.l)];
    const body = matches.map((r) => [
      r.v[sortMetric.k] == null ? "" : rankOf.get(r.id),
      r.name,
      ...(tab === "teams" ? [r.conference, r.wl] : [r.team, r.pos, r.conference, r.g]),
      ...all.map((m) => (r.v[m.k] == null ? "" : Number((r.v[m.k] as number).toFixed(m.d)))),
    ]);
    const scope = conf === "All" ? "fbs" : conf.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadCsv(`hashmark-stats-${tab}-${scope}-${meta.as_of}.csv`, header, body);
  }

  return (
    <div>
      <PageHead
        kicker={`2026 season · through ${meta.as_of}`}
        title="Stats explorer"
        lede="Team and player stats for every FBS program: play-by-play EPA (CollegeFootballData) next to the official box (cfbstats). Sort any column, filter by conference, chart any two stats, and compare up to four. Stats, not ratings: HX stays the one rating."
      />

      {/* Toolbar: board, conference, search. */}
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex max-w-full shrink-0 overflow-x-auto rounded-xl bg-raised p-1 lg:inline-flex" role="tablist" aria-label="Stat board">
          {STAT_TABS.map((t) => (
            <Link
              key={t}
              to="/stats"
              search={statsSearch(t, conf)}
              role="tab"
              aria-selected={tab === t}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors sm:flex-none sm:px-4",
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

      {qual ? (
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div role="group" aria-label="Player pool" className="inline-flex rounded-lg bg-inset p-1">
            {([false, true] as const).map((all) => (
              <button
                key={String(all)}
                type="button"
                aria-pressed={allPlayers === all}
                onClick={() => {
                  setAllPlayers(all);
                  setPicksByTab((p) => ({ ...p, [tab]: undefined }));
                }}
                className={cn(
                  "min-h-9 rounded-md px-3 text-sm transition-colors",
                  allPlayers === all ? "bg-raised text-fg" : "text-muted hover:text-fg",
                )}
              >
                {all ? `All ${qual.floor}+` : "Qualified"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">
            {allPlayers
              ? `Everyone with ${qual.floor}+ ${qual.unit}. Small samples included.`
              : `Qualified = at least ${qual.perGame} ${qual.unit} per team game (${qual.unit} ≥ ${qual.perGame} × games the team has played).`}{" "}
            Ranks and shading are within the players shown.
          </p>
        </div>
      ) : null}

      <SortedBy metric={sortMetric} dir={dir} poolLabel={poolLabel} conf={conf} />

      <Panel className="p-0 sm:p-0">
        {/* Phones: one card per row. */}
        <ol className="divide-y divide-line sm:hidden">
          {shown.map((r) => (
            <StatCard
              key={r.id}
              r={r}
              tab={tab}
              rank={r.v[sortMetric.k] == null ? null : (rankOf.get(r.id) ?? null)}
              sortMetric={sortMetric}
              cols={cols}
              pct={pct}
              picked={picks.includes(r.id)}
              full={picks.length >= 4}
              onToggle={() => togglePick(r.id)}
            />
          ))}
          {shown.length === 0 ? (
            <li className="px-4 py-10 text-center text-muted">
              No {noun} match “{query}”{conf !== "All" ? ` in ${conf}` : ""}.
            </li>
          ) : null}
        </ol>

        {/* Tablet and up: table. The column header is a separate sticky strip under the site header,
            kept in step with the table's sideways scroll, so it stays in view down the whole page. */}
        <div className="hidden sm:block">
          <div
            ref={headRef}
            className="sticky top-16 z-20 rounded-t-xl bg-surface [overflow-x:clip]"
            style={{ ["--sx" as string]: "0px" }}
          >
            <table className="table-fixed border-separate border-spacing-0 text-sm [transform:translateX(calc(-1*var(--sx)))]" style={{ width: tableWidth }}>
              <TableCols n={cols.length} />
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.08em] text-muted">
                  <th className="sticky left-0 z-30 border-b border-border bg-surface px-2 py-3 text-right font-medium [transform:translateX(var(--sx))]">#</th>
                  <th className="sticky left-8 z-30 border-b border-r border-border bg-surface px-3 py-3 text-left font-medium [transform:translateX(var(--sx))]">
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
            </table>
          </div>
          <div
            className="overflow-x-auto"
            onScroll={(e) => headRef.current?.style.setProperty("--sx", `${e.currentTarget.scrollLeft}px`)}
          >
            <table className="table-fixed border-separate border-spacing-0 text-sm" style={{ width: tableWidth }}>
              <TableCols n={cols.length} />
              <thead className="sr-only">
                <tr>
                  <th>Rank</th>
                  <th>{tab === "teams" ? "Team" : "Player"}</th>
                  <th>{tab === "teams" ? "W–L" : "G"}</th>
                  {cols.map((m) => (
                    <th key={m.k}>{m.l}</th>
                  ))}
                  <th>Compare</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => {
                  const picked = picks.includes(r.id);
                  return (
                    <tr key={r.id} className={cn("group", picked && "[&>td]:bg-raised")}>
                      <td className="sticky left-0 z-10 border-b border-line bg-surface px-2 py-2 text-right tabular text-faint group-hover:bg-raised">
                        {r.v[sortMetric.k] == null ? "—" : rankOf.get(r.id)}
                      </td>
                      <td className="sticky left-8 z-10 border-b border-r border-line bg-surface px-3 py-2 group-hover:bg-raised">
                        <Link to="/teams/$slug" params={{ slug: r.slug }} className="flex min-h-10 items-center gap-2">
                          <TeamMark slug={r.slug} color={r.color} />
                          <span className="min-w-0">
                            <span className="block truncate font-medium">{r.name}</span>
                            <span className="block truncate text-xs text-muted">
                              {tab === "teams" ? r.conference : `${r.pos ? `${r.pos} · ` : ""}${r.team}`}
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
                        <CompareToggle name={r.name} picked={picked} full={picks.length >= 4} onToggle={() => togglePick(r.id)} />
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
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted">
          <ShadeLegend />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-raised px-3 text-sm text-fg hover:bg-border"
            >
              <Download className="h-4 w-4" aria-hidden />
              CSV
            </button>
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
        </div>
      </Panel>

      <div className="mt-6">
        <StatsCompare tab={tab} rows={rows} cohort={pool} conf={conf} picks={picks} setPicks={setPicks} defaultSet={set.key} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <StatsScatter key={`sc-${tab}`} tab={tab} rows={pool} picks={picks} asOf={meta.as_of} scope={conf === "All" ? "FBS" : conf} />
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

/** Column widths shared by the sticky header strip and the body table. */
function TableCols({ n }: { n: number }) {
  return (
    <colgroup>
      <col style={{ width: "2rem" }} />
      <col style={{ width: "14rem" }} />
      <col style={{ width: "4rem" }} />
      {Array.from({ length: n }, (_, i) => (
        <col key={i} style={{ width: "6.5rem" }} />
      ))}
      <col style={{ width: "3rem" }} />
    </colgroup>
  );
}

function CompareToggle({ name, picked, full, onToggle }: { name: string; picked: boolean; full: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!picked && full}
      aria-pressed={picked}
      aria-label={picked ? `Remove ${name} from compare` : `Add ${name} to compare`}
      title={picked ? "In compare (click to remove)" : full ? "Compare is full (4)" : "Add to compare"}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors disabled:opacity-30",
        picked ? "bg-accent text-accent-fg" : "text-muted hover:bg-raised hover:text-fg",
      )}
    >
      {picked ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </button>
  );
}

/** Phone row: the sorted stat up top, the rest of the column set as a shaded grid. */
function StatCard({
  r,
  tab,
  rank,
  sortMetric,
  cols,
  pct,
  picked,
  full,
  onToggle,
}: {
  r: StatRow;
  tab: StatTab;
  rank: number | null;
  sortMetric: Metric;
  cols: Metric[];
  pct: Map<string, Map<string, number>>;
  picked: boolean;
  full: boolean;
  onToggle: () => void;
}) {
  const rest = cols.filter((m) => m.k !== sortMetric.k);
  const sp = pct.get(sortMetric.k)?.get(r.id);
  return (
    <li className={cn("px-4 py-3", picked && "bg-raised")}>
      <div className="flex items-center gap-3">
        <span className="w-7 shrink-0 text-right tabular text-sm text-faint">{rank ?? "—"}</span>
        <Link to="/teams/$slug" params={{ slug: r.slug }} className="flex min-h-10 min-w-0 flex-1 items-center gap-2">
          <TeamMark slug={r.slug} color={r.color} />
          <span className="min-w-0">
            <span className="block truncate font-medium">{r.name}</span>
            <span className="block truncate text-xs text-muted">
              {tab === "teams" ? `${r.conference} · ${r.wl}` : `${r.pos ? `${r.pos} · ` : ""}${r.team} · ${r.g} G`}
            </span>
          </span>
        </Link>
        <div className="shrink-0 rounded-md px-2 py-1 text-right" style={cellTint(sp)}>
          <div className="font-display text-xl leading-none tabular">{fmtStat(sortMetric, r.v[sortMetric.k])}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">{sortMetric.s}</div>
        </div>
        <CompareToggle name={r.name} picked={picked} full={full} onToggle={onToggle} />
      </div>
      {rest.length ? (
        <dl className="mt-2 grid grid-cols-4 gap-1 pl-10 text-xs">
          {rest.slice(0, 8).map((m) => (
            <div key={m.k} className="min-w-0 rounded px-1.5 py-1" style={cellTint(pct.get(m.k)?.get(r.id))}>
              <dt className="truncate text-[10px] uppercase tracking-wide text-muted">{m.s}</dt>
              <dd className="tabular text-fg/90">{fmtStat(m, r.v[m.k])}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </li>
  );
}
