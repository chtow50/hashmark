import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHead, Panel } from "@/components/shell";
import { TeamMark } from "@/components/marks";
import { DEFAULT_LEADER_SORT, LEADER_COLS, LEADER_SORTS, leaderMetric, parseLeaderSort, type LeaderRow, type LeaderSort } from "@/lib/cfb/qb-leaders";
import { fmtStat, QUALIFY } from "@/lib/cfb/stats";
import { getQbLeaders } from "@/lib/cfb/stats-queries";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { sort?: LeaderSort };
const PAGE = 25;

const SORT_LABEL: Record<LeaderSort, string> = {
  tepa: "Total EPA",
  epa: "EPA per dropback",
  eff: "NCAA passing efficiency",
  yds: "Passing yards",
  td: "Passing TDs",
};

export const Route = createFileRoute("/stats_/qb-leaders")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const sort = parseLeaderSort(s.sort);
    return { sort: s.sort != null && sort !== DEFAULT_LEADER_SORT ? sort : undefined };
  },
  loaderDeps: ({ search }) => ({ sort: search.sort ?? DEFAULT_LEADER_SORT }),
  loader: ({ deps }) => getQbLeaders({ data: { sort: deps.sort } }),
  component: QbLeadersPage,
  head: () =>
    seo({
      path: "/stats/qb-leaders",
      title: "QB stat leaderboard · total EPA, efficiency, FBS ranks · HASHMARK",
      description:
        "Every qualified FBS quarterback sorted by total EPA, with EPA per dropback, passing efficiency, yards, TDs and FBS ranks. A stat leaderboard, not a rating or a Heisman prediction.",
    }),
});

function QbLeadersPage() {
  const { asOf, n, rows } = Route.useLoaderData();
  const search = Route.useSearch();
  const sort = search.sort ?? DEFAULT_LEADER_SORT;
  const sm = leaderMetric(sort);
  const [all, setAll] = useState(false);
  const shown = all ? rows : rows.slice(0, PAGE);
  const q = QUALIFY.qb!;

  return (
    <div>
      <PageHead
        kicker={`2026 season · stats through ${asOf}`}
        title="QB stat leaderboard"
        lede={`The ${n} qualified FBS quarterbacks, sorted by ${SORT_LABEL[sort]}. Every other number shows its FBS rank among the same QBs. Real season stats only: no player score, no second rating, and no Heisman prediction.`}
      />

      <Panel className="mb-4">
        <h2 className="font-display text-lg">How to read it</h2>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
          <li>
            <span className="text-fg">Sorted by one stat.</span> Default is total EPA (expected points added on every pass and run the QB was
            charged with), because it counts both how good the plays were and how many there were. Switch the sort below; nothing is blended.
          </li>
          <li>
            <span className="text-fg">Small numbers are FBS ranks</span> among the {n} qualified QBs ({q.perGame}+ pass attempts per team game). For
            interceptions, fewer ranks higher.
          </li>
          <li>
            <span className="text-fg">EPA is raw</span> (CollegeFootballData play-by-play, not opponent-adjusted), so schedule matters. Team record
            and HX rank are shown as context only and are current; the stats run through {asOf}.
          </li>
          <li>
            <span className="text-fg">QBs only.</span> Rusher and receiver EPA cover different play sets (carries, targets), so they don't line up
            with a QB's total. Those boards live on{" "}
            <Link to="/stats" search={{ tab: "rush" }} className="text-accent underline-offset-2 hover:underline">
              /stats
            </Link>
            .
          </li>
          <li>Tap a QB for his HASHMARK QB Desk: last game, rank moves and game-by-game EPA.</li>
        </ul>
      </Panel>

      <div className="-mx-4 mb-3 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Sort by">
        <span className="mr-1 shrink-0 text-xs text-muted">Sort by</span>
        {LEADER_SORTS.map((k) => (
          <Link
            key={k}
            to="/stats/qb-leaders"
            search={k === DEFAULT_LEADER_SORT ? {} : { sort: k }}
            resetScroll={false}
            role="tab"
            aria-selected={sort === k}
            className={cn(
              "inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs transition-colors",
              sort === k ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:border-faint hover:text-fg",
            )}
          >
            {SORT_LABEL[k]}
          </Link>
        ))}
      </div>

      <Panel className="p-0 sm:p-0">
        {/* Phones and tablets: cards. */}
        <ol className="divide-y divide-border lg:hidden">
          {shown.map((r) => (
            <LeaderCard key={r.key} r={r} sort={sort} />
          ))}
        </ol>
        {/* Desktop: table. */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="w-10 px-3 py-2 text-right font-medium">#</th>
                <th className="px-3 py-2 font-medium">Quarterback</th>
                <th className="px-3 py-2 font-medium">Team now</th>
                {LEADER_COLS.map((k) => (
                  <th key={k} className={cn("px-2 py-2 text-right font-medium", k === sort && "text-fg")} title={leaderMetric(k).l}>
                    {leaderMetric(k).s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.key} className="border-b border-border/60 last:border-0 hover:bg-raised/60">
                  <td className="px-3 py-2 text-right tabular text-faint">{r.stats[sort as keyof LeaderRow["stats"]]?.v == null ? "—" : r.rank}</td>
                  <td className="px-3 py-2">
                    <QbName r={r} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-muted">
                    <TeamContext r={r} />
                  </td>
                  {LEADER_COLS.map((k) => (
                    <td key={k} className={cn("whitespace-nowrap px-2 py-2 text-right tabular", k === sort ? "font-semibold text-fg" : "text-fg/90")}>
                      {fmtStat(leaderMetric(k), r.stats[k].v)}
                      <span className="ml-1 text-[10px] text-faint">{r.stats[k].rank ?? ""}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > PAGE ? (
          <div className="border-t border-border p-3">
            <button type="button" onClick={() => setAll(!all)} className="inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border">
              {all ? `Show top ${PAGE}` : `Show all ${rows.length} QBs`}
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

function LeaderCard({ r, sort }: { r: LeaderRow; sort: LeaderSort }) {
  const sm = leaderMetric(sort);
  const rest = LEADER_COLS.filter((k) => k !== sort);
  return (
    <li className="px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="w-7 shrink-0 text-right tabular text-sm text-faint">{r.stats[sort as keyof LeaderRow["stats"]]?.v == null ? "—" : r.rank}</span>
        <div className="min-w-0 flex-1">
          <QbName r={r} />
        </div>
        <div className="shrink-0 rounded-md bg-raised px-2 py-1 text-right">
          <div className="font-display text-xl leading-none tabular">{fmtStat(sm, r.stats[sort as keyof LeaderRow["stats"]]?.v ?? null)}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-fg/80">{sm.s}</div>
        </div>
      </div>
      <p className="mt-1 pl-10 text-xs text-muted">
        Team now: <TeamContext r={r} />
      </p>
      <dl className="mt-2 grid grid-cols-4 gap-1 pl-10 text-xs">
        {rest.slice(0, 8).map((k) => (
          <div key={k} className="min-w-0 rounded bg-raised/60 px-1.5 py-1">
            <dt className="truncate text-[10px] uppercase tracking-wide text-fg/80">{leaderMetric(k).s}</dt>
            <dd className="tabular text-fg/90">
              {fmtStat(leaderMetric(k), r.stats[k].v)}
              <span className="ml-1 text-[10px] text-faint">{r.stats[k].rank ? `#${r.stats[k].rank}` : ""}</span>
            </dd>
          </div>
        ))}
      </dl>
    </li>
  );
}
