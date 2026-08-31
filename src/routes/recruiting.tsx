import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { RankMove, RankNum, RankSpark, TeamSwatch } from "@/components/marks";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { listRecruiting } from "@/lib/cfb/queries";
import {
  COMPOSITE_SOURCE,
  compareAvgSort,
  featuredByComposite,
  ratedStarCount,
  visibleClassAvg,
} from "@/lib/cfb/recruiting";
import { cn, fmtNum } from "@/lib/utils";
import type { RecruitingClass } from "@/lib/cfb/types";

const YEARS = [2023, 2024, 2025, 2026] as const;

type Search = { year?: number; board?: "class" | "cycle"; conf?: ConfFilter };
type SortKey = "compositeRank" | "commits" | "avgRating" | "points" | "delta";

export const Route = createFileRoute("/recruiting")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const y = Number(s.year);
    const year = YEARS.includes(y as (typeof YEARS)[number]) ? y : 2026;
    return {
      year,
      board: s.board === "cycle" ? "cycle" : "class",
      conf: parseConf(s.conf),
    };
  },
  loader: () => listRecruiting(),
  component: RecruitingPage,
  head: () => ({ meta: [{ title: "Composite Recruiting · HASHMARK" }] }),
});

function RecruitingPage() {
  const rows = Route.useLoaderData();
  const year = Route.useSearch().year ?? 2026;
  const board = Route.useSearch().board ?? "class";
  const conf = Route.useSearch().conf ?? "All";
  const [sort, setSort] = useState<SortKey>("compositeRank");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const leaders = useMemo(() => yearLeaders(rows), [rows]);
  const ofYear = useMemo(() => {
    const prevMap = new Map(
      rows.filter((r) => r.classYear === year - 1).map((r) => [r.slug, r.compositeRank]),
    );
    return rows
      .filter((r) => r.classYear === year)
      .filter((r) => inConf(r.conference, conf))
      .map((r) => {
        const prev = prevMap.get(r.slug);
        return {
          ...r,
          prevRank: prev ?? null,
          delta: prev == null ? null : prev - r.compositeRank,
        };
      });
  }, [rows, year, conf]);
  const featured = useMemo(() => featuredByComposite(ofYear), [ofYear]);
  const tableRows = useMemo(() => {
    if (sort === "avgRating") {
      return [...ofYear].sort((a, b) => compareAvgSort(a, b, dir));
    }
    const mul = dir === "asc" ? 1 : -1;
    return [...ofYear].sort((a, b) => {
      const av = sort === "delta" ? (a.delta ?? 0) : a[sort];
      const bv = sort === "delta" ? (b.delta ?? 0) : b[sort];
      if (av === bv) return a.compositeRank - b.compositeRank || b.points - a.points;
      return (av < bv ? -1 : 1) * mul;
    });
  }, [ofYear, sort, dir]);
  const cycle = useMemo(() => fourYearBoard(rows, conf), [rows, conf]);

  function toggle(key: SortKey) {
    if (sort === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSort(key);
      setDir(key === "compositeRank" ? "asc" : "desc");
    }
  }

  return (
    <div>
      <PageHead
        kicker="247Sports composite"
        title={board === "cycle" ? "Four-year cycle" : `Class of ${year}`}
        lede="Incoming high-school classes only. Class avg is the mean of rated 247 Composite decimals (×100) — unrated (NA) commits are dropped from the average, never from points. Points are 247 Composite. Frozen with the Week 0 board. This is not roster talent — transfers sit on the talent board."
      />

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {YEARS.map((y) => {
          const lead = leaders[y];
          const active = board === "class" && y === year;
          return (
            <Link
              key={y}
              to="/recruiting"
              search={{ year: y, board: "class", conf: conf === "All" ? undefined : conf }}
              className={cn(
                "rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150",
                active ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised",
              )}
            >
              <div
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.16em]",
                  active ? "text-accent-fg/70" : "text-faint",
                )}
              >
                Class of
              </div>
              <div className="font-display text-3xl tracking-wide">{y}</div>
              {lead ? (
                <div className={cn("mt-1 truncate text-sm", active ? "text-accent-fg/80" : "text-muted")}>
                  #{lead.rank} {lead.name}
                </div>
              ) : null}
            </Link>
          );
        })}
        <Link
          to="/recruiting"
          search={{ year, board: "cycle", conf: conf === "All" ? undefined : conf }}
          className={cn(
            "rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150",
            board === "cycle" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised",
          )}
        >
          <div
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.16em]",
              board === "cycle" ? "text-accent-fg/70" : "text-faint",
            )}
          >
            2023–2026
          </div>
          <div className="font-display text-3xl tracking-wide">Cycle</div>
          <div className={cn("mt-1 truncate text-sm", board === "cycle" ? "text-accent-fg/80" : "text-muted")}>
            {cycle[0] ? `#1 ${cycle[0].name}` : "Four-year avg"}
          </div>
        </Link>
      </div>

      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {COMPOSITE_SOURCE.board} · rated commits only
      </p>

      <div className="mb-5">
        <ConfPills
          value={conf}
          to="/recruiting"
          searchFor={(c) => ({
            year,
            board,
            ...(c === "All" ? {} : { conf: c }),
          })}
        />
      </div>

      {board === "cycle" ? (
        <CycleTable cycle={cycle} />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {featured.map((t) => (
              <Panel key={`${t.slug}-${t.classYear}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="font-display text-3xl tabular text-muted">{t.compositeRank}</div>
                  <RankMove delta={t.delta} />
                </div>
                <Link
                  to="/teams/$slug"
                  params={{ slug: t.slug }}
                  className="mt-2 flex items-center gap-2 font-display text-2xl tracking-wide"
                >
                  <TeamSwatch color={t.colorPrimary} />
                  {t.name}
                </Link>
                <p className="mt-2 text-sm text-muted">
                  {t.commits} commits ·{" "}
                  <ClassAvg
                    avg={t.avgRating}
                    five={t.fiveStars}
                    four={t.fourStars}
                    three={t.threeStars}
                    withLabel
                  />{" "}
                  · {t.fiveStars} five-stars
                </p>
              </Panel>
            ))}
          </div>

          <Panel className="overflow-hidden p-0 sm:p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-3xl text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                    <Th onClick={() => toggle("compositeRank")} active={sort === "compositeRank"}>
                      Rk
                    </Th>
                    <th className="px-3 py-3 font-medium">Team</th>
                    <Th onClick={() => toggle("delta")} active={sort === "delta"}>
                      vs last
                    </Th>
                    <Th onClick={() => toggle("commits")} active={sort === "commits"}>
                      Commits
                    </Th>
                    <Th onClick={() => toggle("avgRating")} active={sort === "avgRating"}>
                      Avg
                    </Th>
                    <Th onClick={() => toggle("points")} active={sort === "points"}>
                      Points
                    </Th>
                    <th className="px-3 py-3 font-medium">5 / 4 / 3</th>
                    <th className="px-3 py-3 font-medium">HX</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((t) => (
                    <tr key={`${t.slug}-${t.classYear}`} className="border-b border-line last:border-0 hover:bg-raised/60">
                      <td className="px-4 py-3">
                        <RankNum rank={t.compositeRank} className="text-lg text-fg" />
                      </td>
                      <td className="px-3 py-3">
                        <Link
                          to="/teams/$slug"
                          params={{ slug: t.slug }}
                          className="flex min-h-11 items-center gap-2.5"
                        >
                          <TeamSwatch color={t.colorPrimary} />
                          <span>
                            <span className="block font-medium">{t.name}</span>
                            <span className="block text-xs text-muted">{t.conference}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        <RankMove delta={t.delta} />
                      </td>
                      <td className="px-3 py-3 tabular">{t.commits}</td>
                      <td className="px-3 py-3">
                        <ClassAvg avg={t.avgRating} five={t.fiveStars} four={t.fourStars} three={t.threeStars} />
                      </td>
                      <td className="px-3 py-3 tabular">{fmtNum(t.points, 1)}</td>
                      <td className="px-3 py-3">
                        <StarBar five={t.fiveStars} four={t.fourStars} three={t.threeStars} />
                      </td>
                      <td className="px-3 py-3 tabular text-muted">{t.hxRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}

function CycleTable({
  cycle,
}: {
  cycle: Array<{
    slug: string;
    name: string;
    colorPrimary: string;
    byYear: Partial<Record<number, number>>;
    avgRank: number;
    points: number;
  }>;
}) {
  return (
    <Panel className="overflow-hidden p-0 sm:p-0">
      <div className="border-b border-line px-4 py-4 sm:px-5">
        <h2 className="font-display text-2xl tracking-wide">Four-year cycle</h2>
        <p className="mt-1 text-sm text-muted">
          Composite rank by signing class. Average is unweighted — 2023 through 2026.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-3xl text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-3 py-3 font-medium">Cycle</th>
              {YEARS.map((y) => (
                <th key={y} className="px-3 py-3 font-medium tabular">
                  {y}
                </th>
              ))}
              <th className="px-3 py-3 font-medium">Avg rk</th>
              <th className="px-3 py-3 font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {cycle.map((row) => (
              <tr key={row.slug} className="border-b border-line last:border-0 hover:bg-raised/60">
                <td className="px-4 py-3">
                  <Link
                    to="/teams/$slug"
                    params={{ slug: row.slug }}
                    className="flex min-h-11 items-center gap-2.5"
                  >
                    <TeamSwatch color={row.colorPrimary} />
                    {row.name}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <RankSpark values={YEARS.map((y) => row.byYear[y] ?? null)} />
                </td>
                {YEARS.map((y) => (
                  <td key={y} className="px-3 py-3 tabular">
                    <Link to="/recruiting" search={{ year: y, board: "class" }} className="hover:text-accent">
                      {row.byYear[y] ?? "—"}
                    </Link>
                  </td>
                ))}
                <td className="px-3 py-3 tabular">{fmtNum(row.avgRank, 1)}</td>
                <td className="px-3 py-3 tabular text-muted">{fmtNum(row.points, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function yearLeaders(rows: RecruitingClass[]) {
  const out: Partial<Record<number, { name: string; rank: number }>> = {};
  for (const y of YEARS) {
    const top = rows
      .filter((r) => r.classYear === y)
      .sort((a, b) => a.compositeRank - b.compositeRank)[0];
    if (top) out[y] = { name: top.shortName, rank: top.compositeRank };
  }
  return out;
}

function fourYearBoard(rows: RecruitingClass[], conf: ConfFilter) {
  const bySlug = new Map<
    string,
    {
      slug: string;
      name: string;
      colorPrimary: string;
      conference: string;
      byYear: Partial<Record<number, number>>;
      points: number;
      ranks: number[];
    }
  >();
  for (const r of rows) {
    const cur = bySlug.get(r.slug) ?? {
      slug: r.slug,
      name: r.name,
      colorPrimary: r.colorPrimary,
      conference: r.conference,
      byYear: {},
      points: 0,
      ranks: [],
    };
    cur.byYear[r.classYear] = r.compositeRank;
    cur.points += r.points;
    cur.ranks.push(r.compositeRank);
    bySlug.set(r.slug, cur);
  }
  return [...bySlug.values()]
    .filter((r) => inConf(r.conference, conf))
    .map((r) => ({
      ...r,
      avgRank: r.ranks.reduce((s, n) => s + n, 0) / r.ranks.length,
    }))
    .sort((a, b) => a.avgRank - b.avgRank);
}

function Th({
  children,
  onClick,
  active,
}: {
  children: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <th className="px-3 py-3 font-medium">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "min-h-9 text-left uppercase tracking-[0.12em]",
          active ? "text-fg" : "text-faint hover:text-muted",
        )}
      >
        {children}
      </button>
    </th>
  );
}

function StarBar({ five, four, three }: { five: number; four: number; three: number }) {
  const total = Math.max(five + four + three, 1);
  return (
    <div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-raised">
        <div className="bg-accent" style={{ width: `${(five / total) * 100}%` }} />
        <div className="bg-muted" style={{ width: `${(four / total) * 100}%` }} />
        <div className="bg-faint" style={{ width: `${(three / total) * 100}%` }} />
      </div>
      <div className="mt-1 text-xs tabular text-muted">
        {five} / {four} / {three}
      </div>
    </div>
  );
}

function ClassAvg({
  avg,
  five,
  four,
  three,
  withLabel = false,
}: {
  avg: number;
  five: number;
  four: number;
  three: number;
  withLabel?: boolean;
}) {
  const rated = ratedStarCount(five, four, three);
  const shown = visibleClassAvg(avg, rated);
  return (
    <span className="tabular">
      {shown == null ? "—" : fmtNum(shown, 2)}
      {withLabel ? " avg" : ""}
      <span className="text-muted"> · {rated} rated</span>
    </span>
  );
}
