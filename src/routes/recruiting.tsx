import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { RankMove, RankNum, RankSpark, TeamMark } from "@/components/marks";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { getStateDetail, listRecruiting, listStates } from "@/lib/cfb/queries";
import { parseStateCode, StatesTab } from "@/components/states-tab";
import { ShowMore } from "@/components/show-more";
import { TalentNav } from "@/components/talent-nav";
import recruiting2027 from "../../data/recruiting_2027_247.json" with { type: "json" };
import { seo } from "@/lib/seo";
import {
  COMPOSITE_SOURCE,
  compareAvgSort,
  featuredByComposite,
  ratedStarCount,
  visibleClassAvg,
} from "@/lib/cfb/recruiting";
import { cn, fmtNum } from "@/lib/utils";
import type { RecruitingClass } from "@/lib/cfb/types";

/** Signed classes (247 Composite final). The cycle board averages these. */
const YEARS = [2023, 2024, 2025, 2026] as const;
/** Class of 2027 is in progress (commitments, 247 top 50 as-of stamp). */
const NEXT_YEAR = 2027;
const ALL_YEARS = [...YEARS, NEXT_YEAR] as const;
/** 247 lists no FBS team-composite rank for these rows (FCS that year): stored with 0 points. */
const isUnranked = (r: { points: number }) => r.points === 0;

type Search = {
  year?: number;
  board?: "class" | "cycle";
  conf?: ConfFilter;
  tab?: "states";
  code?: string;
};
type SortKey = "compositeRank" | "commits" | "avgRating" | "points" | "delta";

export const Route = createFileRoute("/recruiting")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const y = Number(s.year);
    const year = (ALL_YEARS as readonly number[]).includes(y) ? y : 2026;
    if (s.tab === "states") {
      const code = parseStateCode(s.code);
      return { tab: "states", code: code === "TX" ? undefined : code };
    }
    // Defaults are dropped (undefined) so /recruiting never 307s to a param-stuffed URL on crawl.
    const conf = parseConf(s.conf);
    return {
      year: year === 2026 ? undefined : year,
      board: s.board === "cycle" ? "cycle" : undefined,
      conf: conf === "All" ? undefined : conf,
    };
  },
  loaderDeps: ({ search }) => ({
    tab: search.tab === "states" ? ("states" as const) : undefined,
    code: parseStateCode(search.code),
  }),
  loader: async ({ deps }) => {
    if (deps.tab === "states") {
      const [states, detail] = await Promise.all([
        listStates(),
        getStateDetail({ data: { code: deps.code } }),
      ]);
      return { rows: [], states: { states, detail, code: deps.code } };
    }
    return { rows: await listRecruiting(), states: null };
  },
  component: RecruitingRoute,
  head: () =>
    seo({
      path: "/recruiting",
      title:
        "Recruiting classes · 2027 class rankings, 2023–2026 classes, cycle and pipelines · HASHMARK",
      description:
        "247Sports Composite recruiting classes for every FBS program: the 2027 class in progress, signed 2023–2026 classes, the four-year cycle next to HX, and recruiting pipelines by state.",
    }),
});

function RecruitingRoute() {
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  if (data.states) {
    const st = data.states;
    return (
      <div>
        <PageHead
          kicker="Pipelines"
          title="Recruiting by state"
          lede="Where the 2026 class comes from, which FBS programs live there, and who is harvesting the state."
        />
        <TalentNav active="states" />
        <StatesTab
          states={st.states}
          detail={st.detail}
          code={st.code}
          onSelect={(code) =>
            navigate({ search: { tab: "states", code: code === "TX" ? undefined : code } })
          }
        />
      </div>
    );
  }
  return <RecruitingPage rows={data.rows} />;
}

function RecruitingPage({ rows }: { rows: RecruitingClass[] }) {
  const year = Route.useSearch().year ?? 2026;
  const board = Route.useSearch().board ?? "class";
  const conf = Route.useSearch().conf ?? "All";
  const [sort, setSort] = useState<SortKey>("compositeRank");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const leaders = useMemo(() => yearLeaders(rows), [rows]);
  const ofYear = useMemo(() => {
    const prevMap = new Map(
      rows
        .filter((r) => r.classYear === year - 1 && !isUnranked(r))
        .map((r) => [r.slug, r.compositeRank]),
    );
    return rows
      .filter((r) => r.classYear === year)
      .filter((r) => inConf(r.conference, conf))
      .map((r) => {
        const prev = prevMap.get(r.slug);
        const unranked = isUnranked(r);
        return {
          ...r,
          prevRank: prev ?? null,
          unranked,
          delta: prev == null || unranked ? null : prev - r.compositeRank,
        };
      });
  }, [rows, year, conf]);
  const featured = useMemo(() => featuredByComposite(ofYear.filter((r) => !r.unranked)), [ofYear]);
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
        lede={
          board === "cycle"
            ? "Every FBS program's signed classes, 2023 through 2026, by 247Sports Composite rank — next to where HX has the team now."
            : year === NEXT_YEAR
              ? "The class of 2027 is still being built: commitments, not signatures, ahead of the December early signing period. 247Sports Composite top 50."
              : "Incoming high-school classes only. Class avg is the mean of rated 247 Composite decimals (×100); unrated commits are dropped from the average, never from points. Transfers count on the roster talent board, not here."
        }
      />

      <TalentNav active="classes" />

      <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {ALL_YEARS.map((y) => {
          const lead = leaders[y];
          const active = board === "class" && y === year;
          return (
            <Link
              key={y}
              to="/recruiting"
              search={{ year: y === 2026 ? undefined : y, conf: conf === "All" ? undefined : conf }}
              className={cn(
                "rounded-xl px-3 py-3 shadow-[var(--shadow-border)] transition-colors duration-150 sm:px-4",
                active ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised",
              )}
            >
              <div
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.16em]",
                  active ? "text-accent-fg/70" : "text-faint",
                )}
              >
                {y === NEXT_YEAR ? "In progress" : "Class of"}
              </div>
              <div className="font-display text-2xl tracking-wide sm:text-3xl">{y}</div>
              {lead ? (
                <div
                  className={cn(
                    "mt-1 truncate text-sm",
                    active ? "text-accent-fg/80" : "text-muted",
                  )}
                >
                  #{lead.rank} {lead.name}
                </div>
              ) : null}
            </Link>
          );
        })}
        <Link
          to="/recruiting"
          search={{
            year: year === 2026 ? undefined : year,
            board: "cycle",
            conf: conf === "All" ? undefined : conf,
          }}
          className={cn(
            "rounded-xl px-3 py-3 shadow-[var(--shadow-border)] transition-colors duration-150 sm:px-4",
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
          <div className="font-display text-2xl tracking-wide sm:text-3xl">Cycle</div>
          <div
            className={cn(
              "mt-1 truncate text-sm",
              board === "cycle" ? "text-accent-fg/80" : "text-muted",
            )}
          >
            {cycle[0] ? `#1 ${cycle[0].name}` : "Four-year avg"}
          </div>
        </Link>
      </div>

      <SourceLine year={board === "cycle" ? 2026 : year} />

      <div className="mb-5">
        <ConfPills
          value={conf}
          to="/recruiting"
          searchFor={(c) => ({
            ...(year === 2026 ? {} : { year }),
            ...(board === "class" ? {} : { board }),
            ...(c === "All" ? {} : { conf: c }),
          })}
        />
      </div>

      {board === "cycle" ? (
        <CycleTable cycle={cycle} />
      ) : (
        <>
          <div className="mb-6 hidden gap-4 sm:grid sm:grid-cols-3">
            {featured.map((t) => (
              <Panel key={t.slug}>
                <div className="flex items-start justify-between gap-3">
                  <div className="font-display text-3xl tabular text-muted">{t.compositeRank}</div>
                  <RankMove delta={t.delta} />
                </div>
                <Link
                  to="/teams/$slug"
                  params={{ slug: t.slug }}
                  className="mt-2 flex items-center gap-2 font-display text-2xl tracking-wide"
                >
                  <TeamMark slug={t.slug} color={t.colorPrimary} logoSize={20} />
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

          {year === NEXT_YEAR ? (
            <p className="mb-4 text-sm text-muted">
              Showing the {tableRows.length} FBS classes in 247's top 50
              {conf === "All" ? "" : ` from ${conf}`}. Classes outside the top 50 are not listed
              yet.
            </p>
          ) : null}
          <div className="sm:hidden">
            <ShowMore
              items={tableRows}
              noun="classes"
              resetKey={`${year}-${conf}-${sort}-${dir}`}
              className="space-y-2"
              render={(t) => <ClassCard key={t.slug} t={t} />}
            />
          </div>
          <Panel className="hidden overflow-hidden p-0 sm:block sm:p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-3xl text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                    <Th onClick={() => toggle("compositeRank")} active={sort === "compositeRank"}>
                      Rk
                    </Th>
                    <th className="px-3 py-3 font-medium">Team</th>
                    <Th onClick={() => toggle("delta")} active={sort === "delta"}>
                      {`vs ${year - 1}`}
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
                    <th className="px-3 py-3 font-medium" title="Current HX rank (live board)">
                      HX now
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((t) => (
                    <tr
                      key={t.slug}
                      className="border-b border-line last:border-0 hover:bg-raised/60"
                    >
                      <td className="px-4 py-3">
                        {t.unranked ? (
                          <span
                            className="text-sm text-faint"
                            title="No 247 FBS team-composite rank that year"
                          >
                            NR
                          </span>
                        ) : (
                          <RankNum rank={t.compositeRank} className="text-lg text-fg" />
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <Link
                          to="/teams/$slug"
                          params={{ slug: t.slug }}
                          className="flex min-h-11 items-center gap-2.5"
                        >
                          <TeamMark slug={t.slug} color={t.colorPrimary} logoSize={20} />
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
                        <ClassAvg
                          avg={t.avgRating}
                          five={t.fiveStars}
                          four={t.fourStars}
                          three={t.threeStars}
                        />
                      </td>
                      <td className="px-3 py-3 tabular">
                        {t.unranked ? "—" : fmtNum(t.points, 1)}
                      </td>
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
    avgRank: number | null;
    points: number;
    hxRank: number;
  }>;
}) {
  return (
    <>
      <div className="sm:hidden">
        <ShowMore
          items={cycle}
          noun="teams"
          className="space-y-2"
          render={(row, i) => (
            <Link
              key={row.slug}
              to="/teams/$slug"
              params={{ slug: row.slug }}
              className="block rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="w-6 font-display text-lg tabular text-muted">{i + 1}</span>
                  <TeamMark slug={row.slug} color={row.colorPrimary} />
                  <span className="truncate font-medium">{row.name}</span>
                </span>
                <span className="shrink-0 text-right text-xs tabular text-muted">
                  avg rk{" "}
                  <span className="font-display text-lg text-fg">
                    {row.avgRank == null ? "—" : fmtNum(row.avgRank, 1)}
                  </span>
                </span>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-1 text-center text-xs tabular">
                {YEARS.map((y) => (
                  <span key={y} className="rounded bg-raised px-1 py-1">
                    <span className="block text-[10px] text-faint">{`'${String(y).slice(2)}`}</span>
                    {row.byYear[y] ?? "NR"}
                  </span>
                ))}
                <span className="rounded bg-raised px-1 py-1">
                  <span className="block text-[10px] text-faint">HX now</span>
                  {row.hxRank}
                </span>
              </div>
            </Link>
          )}
        />
      </div>
      <Panel className="hidden overflow-hidden p-0 sm:block sm:p-0">
        <div className="border-b border-line px-4 py-4 sm:px-5">
          <h2 className="font-display text-2xl tracking-wide">Four-year cycle</h2>
          <p className="mt-1 text-sm text-muted">
            Composite rank by signing class, 2023 through 2026. Average is unweighted over ranked
            classes (NR = no 247 FBS team rank that year). HX now is the live board rank, shown
            beside the cycle, not blended with it.
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
                <th className="px-3 py-3 font-medium">HX now</th>
              </tr>
            </thead>
            <tbody>
              {cycle.map((row) => (
                <tr
                  key={row.slug}
                  className="border-b border-line last:border-0 hover:bg-raised/60"
                >
                  <td className="px-4 py-3">
                    <Link
                      to="/teams/$slug"
                      params={{ slug: row.slug }}
                      className="flex min-h-11 items-center gap-2.5"
                    >
                      <TeamMark slug={row.slug} color={row.colorPrimary} />
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <RankSpark values={YEARS.map((y) => row.byYear[y] ?? null)} />
                  </td>
                  {YEARS.map((y) => (
                    <td key={y} className="px-3 py-3 tabular">
                      <Link
                        to="/recruiting"
                        search={{ year: y === 2026 ? undefined : y }}
                        className="hover:text-accent"
                      >
                        {row.byYear[y] ?? "NR"}
                      </Link>
                    </td>
                  ))}
                  <td className="px-3 py-3 tabular">
                    {row.avgRank == null ? "—" : fmtNum(row.avgRank, 1)}
                  </td>
                  <td className="px-3 py-3 tabular text-muted">{fmtNum(row.points, 0)}</td>
                  <td className="px-3 py-3 tabular text-muted">{row.hxRank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function SourceLine({ year }: { year: number }) {
  if (year === NEXT_YEAR) {
    return (
      <p className="mb-5 text-xs text-faint">
        Source:{" "}
        <a
          href={recruiting2027.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fg"
        >
          247Sports Composite Team Rankings, class of 2027
        </a>{" "}
        · as of {recruiting2027.asOfLabel} · commitments can still change
      </p>
    );
  }
  return (
    <p className="mb-5 text-xs text-faint">
      Source: {COMPOSITE_SOURCE.label} team rankings (final), cross-checked against{" "}
      <a
        href="https://collegefootballdata.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-fg"
      >
        CollegeFootballData.com
      </a>{" "}
      on Nov 17, 2026 (2023–2026: every ranked class matches on rank and points). Class avg: rated
      commits only.
    </p>
  );
}

type ClassRow = RecruitingClass & { delta: number | null; unranked: boolean };

function ClassCard({ t }: { t: ClassRow }) {
  return (
    <Link
      to="/teams/$slug"
      params={{ slug: t.slug }}
      className="block rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="w-7 font-display text-lg tabular text-fg">
            {t.unranked ? "NR" : t.compositeRank}
          </span>
          <TeamMark slug={t.slug} color={t.colorPrimary} />
          <span className="min-w-0">
            <span className="block truncate font-medium">{t.name}</span>
            <span className="block text-xs text-muted">
              {t.conference} · HX now {t.hxRank}
            </span>
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block font-display text-lg tabular">
            {t.unranked ? "—" : fmtNum(t.points, 1)}
          </span>
          <RankMove delta={t.delta} />
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted">
        <span>
          {t.commits} commits ·{" "}
          <ClassAvg
            avg={t.avgRating}
            five={t.fiveStars}
            four={t.fourStars}
            three={t.threeStars}
            withLabel
          />
        </span>
        <span className="tabular">
          {t.fiveStars}/{t.fourStars}/{t.threeStars}
        </span>
      </div>
    </Link>
  );
}

function yearLeaders(rows: RecruitingClass[]) {
  const out: Partial<Record<number, { name: string; rank: number }>> = {};
  for (const y of ALL_YEARS) {
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
      hxRank: number;
    }
  >();
  for (const r of rows) {
    if (!(YEARS as readonly number[]).includes(r.classYear)) continue;
    const cur = bySlug.get(r.slug) ?? {
      slug: r.slug,
      name: r.name,
      colorPrimary: r.colorPrimary,
      conference: r.conference,
      byYear: {},
      points: 0,
      ranks: [],
      hxRank: r.hxRank,
    };
    if (!isUnranked(r)) {
      cur.byYear[r.classYear] = r.compositeRank;
      cur.points += r.points;
      cur.ranks.push(r.compositeRank);
    }
    bySlug.set(r.slug, cur);
  }
  return [...bySlug.values()]
    .filter((r) => inConf(r.conference, conf))
    .map((r) => ({
      ...r,
      avgRank: r.ranks.length ? r.ranks.reduce((s, n) => s + n, 0) / r.ranks.length : null,
    }))
    .sort((a, b) => (a.avgRank ?? 999) - (b.avgRank ?? 999) || b.points - a.points);
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
          "min-h-9 min-w-9 text-left uppercase tracking-[0.12em]",
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
