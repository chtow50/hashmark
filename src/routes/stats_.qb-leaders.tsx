import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import {
  DEFAULT_LEADER_DIR,
  DEFAULT_LEADER_SCOPE,
  DEFAULT_LEADER_SORT,
  isConfScope,
  LEADER_COLS,
  LEADER_CONFS,
  LEADER_POOLS,
  LEADER_SORTS,
  SCOPE_LABEL,
  leaderMetric,
  leadersSearch,
  parseLeaderDir,
  parseLeaderScope,
  parseLeaderSort,
  viewLeaders,
  type LeaderDir,
  type LeaderRow,
  type LeaderScope,
  type LeaderSort,
} from "@/lib/cfb/qb-leaders";
import { fmtStat, QUALIFY, SOURCE_LABEL } from "@/lib/cfb/stats";
import { getQbLeaders } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { scope?: LeaderScope; sort?: LeaderSort; dir?: LeaderDir };
const PAGE = 25;

const SORT_LABEL: Record<LeaderSort, string> = {
  tepa: "Total EPA",
  epa: "EPA per dropback",
  eff: "NCAA passing efficiency",
  ypa: "Yards per attempt",
  cmp: "Completion %",
  yds: "Passing yards",
  td: "Passing TDs",
  int: "Interceptions",
  ruy: "Rushing yards",
};

export const Route = createFileRoute("/stats_/qb-leaders")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const scope = parseLeaderScope(s.scope);
    const sort = parseLeaderSort(s.sort);
    const dir = parseLeaderDir(s.dir);
    return {
      scope: s.scope != null && scope !== DEFAULT_LEADER_SCOPE ? scope : undefined,
      sort: s.sort != null && sort !== DEFAULT_LEADER_SORT ? sort : undefined,
      dir: s.dir != null && dir !== DEFAULT_LEADER_DIR ? dir : undefined,
    };
  },
  loader: () => getQbLeaders({ data: {} }),
  component: QbLeadersPage,
  head: () =>
    seo({
      path: "/stats/qb-leaders",
      title: "QB stat leaderboard · total EPA, efficiency, FBS ranks · HASHMARK",
      description:
        "Every qualified FBS quarterback sorted by total EPA, with EPA per dropback, passing efficiency, yards, TDs and FBS ranks. Filter by Power 4, Group of 5 or conference. A stat leaderboard, not a rating or a Heisman prediction.",
    }),
});

function QbLeadersPage() {
  const { asOf, rows: all } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/stats/qb-leaders" });
  const scope = search.scope ?? DEFAULT_LEADER_SCOPE;
  const sort = search.sort ?? DEFAULT_LEADER_SORT;
  const dir = search.dir ?? DEFAULT_LEADER_DIR;
  const sm = leaderMetric(sort);
  const view = useMemo(() => viewLeaders(all, { scope, sort, dir }), [all, scope, sort, dir]);
  const { n, fbsN, rows } = view;
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setShowAll(false);
  }, [scope, sort, dir]);
  const shown = showAll ? rows : rows.slice(0, PAGE);
  const q = QUALIFY.qb!;
  const scopeName = SCOPE_LABEL[scope];
  const poolPhrase =
    scope === "fbs"
      ? `${n} qualified FBS quarterbacks`
      : `${n} qualified ${scopeName} quarterback${n === 1 ? "" : "s"}`;

  return (
    <div>
      <PageHead
        kicker={`2026 season · stats through ${asOf}`}
        title="QB stat leaderboard"
        lede={`${poolPhrase}, sorted by ${SORT_LABEL[sort]}, ${dir === "best" ? "best first" : "worst first"}. Every other number shows its FBS rank among the ${fbsN} qualified QBs. Real season stats only: no player score, no second rating, and no Heisman prediction.`}
      />

      <Panel className="mb-4">
        <h2 className="font-display text-lg">How to read it</h2>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
          <li>
            <span className="text-fg">The # column is the rank in this view</span> (best to worst on the sort stat
            {scope === "fbs" ? "" : `, among ${scopeName} QBs`}). When you filter, the FBS rank sits under it. Ranks
            stay best-to-worst even if you flip the list to worst first.
          </li>
          <li>
            <span className="text-fg">Sorted by one stat.</span> Default is total EPA (expected points added on every
            pass and run the QB was charged with), because it counts both how good the plays were and how many there
            were. Pick a column or use Sort by; nothing is blended. For interceptions, fewer is better.
          </li>
          <li>
            <span className="text-fg">Small numbers next to each stat are FBS ranks</span> among the {fbsN} qualified
            QBs ({q.perGame}+ pass attempts per team game).
          </li>
          <li>
            <span className="text-fg">EPA is raw</span> (CollegeFootballData play-by-play, not opponent-adjusted), so
            schedule matters. Team record and HX rank are shown as context only and are current; the stats run through{" "}
            {asOf}.
          </li>
          <li>
            <span className="text-fg">QBs only.</span> Rusher and receiver EPA cover different play sets (carries,
            targets), so they don&apos;t line up with a QB&apos;s total. Those boards live on{" "}
            <Link to="/stats" search={{ tab: "rush" }} className="text-accent underline-offset-2 hover:underline">
              /stats
            </Link>
            .
          </li>
          <li>Tap a QB for his HASHMARK QB Desk: last game, rank moves and game-by-game EPA.</li>
        </ul>
      </Panel>

      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex max-w-full shrink-0 overflow-x-auto rounded-xl bg-raised p-1" role="tablist" aria-label="QB pool">
          {LEADER_POOLS.map((k) => (
            <Link
              key={k}
              to="/stats/qb-leaders"
              search={leadersSearch(k, sort, dir)}
              resetScroll={false}
              role="tab"
              aria-selected={scope === k}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-[13px] font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm",
                scope === k ? "bg-fg text-bg" : "text-muted hover:text-fg",
              )}
            >
              {SCOPE_LABEL[k]}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <label className="relative flex-1 sm:max-w-56">
            <span className="sr-only">Conference</span>
            <select
              value={isConfScope(scope) ? scope : ""}
              onChange={(e) => {
                const next = e.target.value ? parseLeaderScope(e.target.value) : "fbs";
                void navigate({ search: leadersSearch(next, sort, dir), resetScroll: false });
              }}
              className="h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg"
            >
              <option value="">{isConfScope(scope) ? "All FBS" : "Conference"}</option>
              {LEADER_CONFS.map((c) => (
                <option key={c} value={c}>
                  {SCOPE_LABEL[c]}
                </option>
              ))}
            </select>
          </label>
          <label className="relative flex-1 sm:max-w-64 lg:hidden">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => {
                const next = parseLeaderSort(e.target.value);
                void navigate({ search: leadersSearch(scope, next, "best"), resetScroll: false });
              }}
              className="h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg"
            >
              {LEADER_SORTS.map((k) => (
                <option key={k} value={k}>
                  Sort by {SORT_LABEL[k]}
                </option>
              ))}
            </select>
          </label>
          <div className="flex shrink-0 overflow-x-auto rounded-xl bg-raised p-1 sm:flex-none" role="group" aria-label="Sort direction">
            {(["best", "worst"] as const).map((d) => (
              <Link
                key={d}
                to="/stats/qb-leaders"
                search={leadersSearch(scope, sort, d)}
                resetScroll={false}
                aria-pressed={dir === d}
                className={cn(
                  "inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-[13px] font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm",
                  dir === d ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                {d === "best" ? "Best to worst" : "Worst to best"}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-3 rounded-xl bg-inset px-4 py-3 text-sm">
        <p>
          <span className="text-muted">Sorted by </span>
          <span className="font-medium">{sm.l}</span>
          <span className="text-muted">
            {" "}
            · {dir === "best" ? "best first" : "worst first"} · {n} QB{n === 1 ? "" : "s"}
            {scope === "fbs" ? "" : ` in ${scopeName}`}
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {sm.def}{" "}
          <span className="text-faint">
            ({SOURCE_LABEL[sm.src]}
            {sm.hi ? "" : "; lower is better"})
          </span>
        </p>
      </div>

      <Panel className="p-0 sm:p-0">
        {/* Phones and tablets: cards. */}
        <ol className="divide-y divide-border lg:hidden">
          {shown.map((r) => (
            <LeaderCard key={r.key} r={r} sort={sort} showFbs={scope !== "fbs"} />
          ))}
          {rows.length === 0 ? (
            <li className="px-4 py-10 text-center text-muted">No qualified QBs in {scopeName}.</li>
          ) : null}
        </ol>
        {/* Desktop: table. */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="w-14 px-3 py-2 text-right font-medium">#</th>
                <th className="px-3 py-2 font-medium">Quarterback</th>
                <th className="px-3 py-2 font-medium">Team now</th>
                {LEADER_COLS.map((k, i) => (
                  <HeaderCell key={k} k={k} scope={scope} sort={sort} dir={dir} alignRight={i >= LEADER_COLS.length - 3} />
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.key} className="border-b border-border/60 last:border-0 hover:bg-raised/60">
                  <td className="px-3 py-2 text-right tabular text-faint">
                    <RankCell r={r} sort={sort} showFbs={scope !== "fbs"} />
                  </td>
                  <td className="px-3 py-2">
                    <QbName r={r} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-muted">
                    <TeamContext r={r} />
                  </td>
                  {LEADER_COLS.map((k) => (
                    <td key={k} className={cn("whitespace-nowrap px-2 py-2 text-right tabular", k === sort ? "font-semibold text-fg" : "text-fg/90")}>
                      {fmtStat(leaderMetric(k), r.stats[k].v)}
                      <span className="ml-1 text-[10px] text-faint" title={r.stats[k].rank != null ? `FBS #${r.stats[k].rank}` : undefined}>
                        {r.stats[k].rank ?? ""}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={LEADER_COLS.length + 3} className="px-4 py-10 text-center text-muted">
                    No qualified QBs in {scopeName}.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        {rows.length > PAGE ? (
          <div className="border-t border-border p-3">
            <button type="button" onClick={() => setShowAll(!showAll)} className="inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border">
              {showAll ? `Show top ${PAGE}` : `Show all ${rows.length} QBs`}
            </button>
          </div>
        ) : null}
      </Panel>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Sources: EPA from CollegeFootballData (CFBD) play-by-play, through {asOf}; attempts, completions, yards, TDs, INTs and rushing yards from the
        official box via cfbstats.com. Rushing yards are NCAA net (sack losses count). Definitions for every column are in the{" "}
        <Link to="/stats" search={{ tab: "qb" }} className="text-accent underline-offset-2 hover:underline">
          stats explorer glossary
        </Link>
        . {sm.l} is the sort; HX is the only rating on HASHMARK.
      </p>
    </div>
  );
}

function RankCell({ r, sort, showFbs }: { r: LeaderRow; sort: LeaderSort; showFbs: boolean }) {
  if (r.stats[sort].v == null) return "—";
  return (
    <>
      <span className="block">{r.rank}</span>
      {showFbs && r.fbsRank != null ? (
        <span className="block text-[10px] font-normal normal-case tracking-normal text-faint" title={`FBS #${r.fbsRank}`}>
          FBS #{r.fbsRank}
        </span>
      ) : null}
    </>
  );
}

function QbName({ r }: { r: LeaderRow }) {
  return (
    <Link to="/stats" search={{ tab: "qb", qb: r.key }} className="flex min-h-10 min-w-0 items-center gap-2 hover:text-accent">
      <TeamMark slug={r.slug} color={r.color} />
      <span className="min-w-0">
        <span className="block truncate font-medium">{r.name}</span>
        <span className="block truncate text-xs text-muted">
          {r.team} · {r.g} G · {r.att} att
        </span>
      </span>
    </Link>
  );
}

function TeamContext({ r }: { r: LeaderRow }) {
  return (
    <>
      {r.record ?? "—"}
      {r.hxRank ? <span className="text-faint"> · HX #{r.hxRank}</span> : null}
    </>
  );
}

function HeaderCell({
  k,
  scope,
  sort,
  dir,
  alignRight,
}: {
  k: LeaderSort;
  scope: LeaderScope;
  sort: LeaderSort;
  dir: LeaderDir;
  alignRight: boolean;
}) {
  const m = leaderMetric(k);
  const active = sort === k;
  // Click a column to sort best-first; click the active column again to flip.
  const nextDir: LeaderDir = active && dir === "best" ? "worst" : "best";
  return (
    <th
      className="group/th relative px-2 py-2 text-right font-medium"
      aria-sort={active ? ((m.hi ? dir === "best" : dir === "worst") ? "descending" : "ascending") : undefined}
    >
      <Link
        to="/stats/qb-leaders"
        search={leadersSearch(scope, k, nextDir)}
        resetScroll={false}
        title={m.l}
        className={cn(
          "inline-flex min-h-8 items-center justify-end gap-1 whitespace-nowrap underline decoration-dotted decoration-faint underline-offset-4 hover:text-fg",
          active ? "text-fg decoration-fg" : "text-muted",
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
          "pointer-events-none absolute top-full z-40 mt-1 hidden w-56 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block",
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

function LeaderCard({ r, sort, showFbs }: { r: LeaderRow; sort: LeaderSort; showFbs: boolean }) {
  const sm = leaderMetric(sort);
  const rest = LEADER_COLS.filter((k) => k !== sort);
  return (
    <li className="px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="w-14 shrink-0 text-right tabular text-sm text-faint">
          <RankCell r={r} sort={sort} showFbs={showFbs} />
        </span>
        <div className="min-w-0 flex-1">
          <QbName r={r} />
        </div>
        <div className="shrink-0 rounded-md bg-raised px-2 py-1 text-right">
          <div className="font-display text-xl leading-none tabular">{fmtStat(sm, r.stats[sort].v)}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-fg/80">{sm.s}</div>
        </div>
      </div>
      <p className="mt-1 pl-16 text-xs text-muted">
        Team now: <TeamContext r={r} />
      </p>
      <dl className="mt-2 grid grid-cols-4 gap-1 pl-16 text-xs">
        {rest.slice(0, 8).map((k) => (
          <div key={k} className="min-w-0 rounded bg-raised/60 px-1.5 py-1">
            <dt className="truncate text-[10px] uppercase tracking-wide text-fg/80">{leaderMetric(k).s}</dt>
            <dd className="tabular text-fg/90">
              {fmtStat(leaderMetric(k), r.stats[k].v)}
              <span className="ml-1 text-[10px] text-faint" title={r.stats[k].rank != null ? `FBS #${r.stats[k].rank}` : undefined}>
                {r.stats[k].rank ? `#${r.stats[k].rank}` : ""}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </li>
  );
}
