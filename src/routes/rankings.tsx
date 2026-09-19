import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { DeltaChip, RankNum, TeamMark } from "@/components/marks";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { BOARD_WEEK, AP_STAMP } from "@/lib/cfb/featured";
import { MODEL } from "@/lib/cfb/model";
import { listTeams } from "@/lib/cfb/queries";
import { formatSeasonRecord } from "@/lib/cfb/season-record";
import { make12FromSim } from "@/lib/cfb/season-sim";
import { cn, fmtNum, fmtPct } from "@/lib/utils";
import type { TeamSummary } from "@/lib/cfb/types";

type Search = { conf?: ConfFilter };

export const Route = createFileRoute("/rankings")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const conf = parseConf(s.conf);
    return conf === "All" ? {} : { conf };
  },
  loader: () => listTeams(),
  component: RankingsPage,
  head: () => ({ meta: [{ title: "HX Rankings · HASHMARK" }] }),
});

type SortKey =
  | "hxRank"
  | "hxRating"
  | "apRank"
  | "projectedWins"
  | "makeField"
  | "talentScore"
  | "recRank";

const MOBILE_SORTS: { key: SortKey; label: string }[] = [
  { key: "hxRank", label: "HX" },
  { key: "hxRating", label: "Rating" },
  { key: "apRank", label: "AP" },
  { key: "makeField", label: "Make 12" },
];

/** Rank col is w-16; Team sticks at that offset so names never slide under AP. */
const STICKY_RANK = "sticky left-0 z-20 w-16 min-w-16 bg-surface";
const STICKY_TEAM = "sticky left-16 z-20 min-w-36 border-r border-line bg-surface sm:min-w-52";

function make12Pct(t: TeamSummary) {
  return fmtPct(make12FromSim(t.slug, t).makeField ?? t.playoffOdds, 1);
}

function RankingsPage() {
  const teams = Route.useLoaderData();
  const conf = Route.useSearch().conf ?? "All";
  const [sort, setSort] = useState<SortKey>("hxRank");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const rows = teams.filter((t) => inConf(t.conference, conf));
    const mul = dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = value(a, sort);
      const bv = value(b, sort);
      if (av === bv) return a.hxRank - b.hxRank;
      return (av < bv ? -1 : 1) * mul;
    });
  }, [teams, conf, sort, dir]);

  function toggle(key: SortKey) {
    if (sort === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSort(key);
      setDir(key === "hxRating" || key === "projectedWins" || key === "makeField" || key === "talentScore" ? "desc" : "asc");
    }
  }

  return (
    <div>
      <PageHead
        kicker={`Week ${BOARD_WEEK} · HX ${MODEL.version}`}
        title="Power rankings"
        lede={`Every FBS program, ranked by HX. Talent is listed two-deep composite, not class rank — TWO·DEEP / 247. Talent and prior-year SP+/Elo/SRS carry the real signal. Make 12 is make-field, not title odds; projected wins are Elo vs the 2026 slate. ${AP_STAMP.lede}`}
      />

      <ConfPills
        value={conf}
        to="/rankings"
        searchFor={(c) => (c === "All" ? {} : { conf: c })}
      />
      <p className="mb-4 text-xs tabular text-faint">
        {filtered.length} of {teams.length}
        {conf !== "All" ? ` · ${conf}` : ""}
      </p>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 sm:hidden" role="group" aria-label="Sort rankings">
        {MOBILE_SORTS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => toggle(opt.key)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150",
              sort === opt.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg",
            )}
          >
            {opt.label}
            {sort === opt.key ? <span className="ml-1.5 tabular">{dir === "asc" ? "↑" : "↓"}</span> : null}
          </button>
        ))}
      </div>

      <ul className="space-y-3 sm:hidden">
        {filtered.map((t) => (
          <li key={t.slug}>
            <RankingCard team={t} />
          </li>
        ))}
      </ul>

      <Panel className="hidden overflow-hidden p-0 sm:block sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.12em] text-faint">
                <Th
                  onClick={() => toggle("hxRank")}
                  active={sort === "hxRank"}
                  className={cn(STICKY_RANK, "z-30 border-b border-line px-4")}
                >
                  HX
                </Th>
                <th className={cn(STICKY_TEAM, "z-30 border-b border-line px-3 py-3 font-medium")}>
                  Team
                </th>
                <Th onClick={() => toggle("apRank")} active={sort === "apRank"} className="border-b border-line">
                  <span className="block">AP</span>
                  <span className="mt-0.5 block text-[10px] font-normal normal-case tracking-[0.08em] text-faint">
                    {AP_STAMP.columnHint}
                  </span>
                </Th>
                <Th onClick={() => toggle("hxRating")} active={sort === "hxRating"} className="border-b border-line">
                  Rating
                </Th>
                <th className="hidden border-b border-line px-3 py-3 font-medium md:table-cell">Off / Def</th>
                <Th onClick={() => toggle("projectedWins")} active={sort === "projectedWins"} className="hidden border-b border-line md:table-cell">
                  Proj W
                </Th>
                <Th onClick={() => toggle("makeField")} active={sort === "makeField"} className="border-b border-line">
                  Make 12
                </Th>
                <Th onClick={() => toggle("talentScore")} active={sort === "talentScore"} className="border-b border-line">
                  <span className="block">Talent</span>
                  <span className="mt-0.5 block text-[10px] font-normal normal-case tracking-[0.08em] text-faint">
                    two-deep
                  </span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.slug} className="group last:[&>td]:border-b-0 hover:bg-raised/60">
                  <td className={cn(STICKY_RANK, "border-b border-line px-4 py-3 group-hover:bg-raised")}>
                    <RankNum rank={t.hxRank} className="text-xl text-fg" />
                  </td>
                  <td className={cn(STICKY_TEAM, "border-b border-line px-3 py-3 group-hover:bg-raised")}>
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      className="flex min-h-11 items-center gap-2.5"
                    >
                      <TeamMark slug={t.slug} color={t.colorPrimary} />
                      <span>
                        <span className="block whitespace-nowrap font-medium">{t.name}</span>
                        <span className="block whitespace-nowrap text-xs text-muted">
                          {t.conference} · {formatSeasonRecord(t.seasonWins, t.seasonLosses)}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="border-b border-line px-3 py-3">
                    <div className="tabular">{t.apRank ?? "NR"}</div>
                    <DeltaChip hxRank={t.hxRank} apRank={t.apRank} />
                  </td>
                  <td className="border-b border-line px-3 py-3 tabular">{fmtNum(t.hxRating, 2)}</td>
                  <td className="hidden border-b border-line px-3 py-3 tabular text-muted md:table-cell">
                    {fmtNum(t.offenseRating, 1)} / {fmtNum(t.defenseRating, 1)}
                  </td>
                  <td className="hidden border-b border-line px-3 py-3 tabular md:table-cell">{fmtNum(t.projectedWins, 1)}</td>
                  <td className="border-b border-line px-3 py-3 tabular">
                    {make12Pct(t)}
                  </td>
                  <td className="border-b border-line px-3 py-3 tabular">{fmtNum(t.talentScore, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function RankingCard({ team }: { team: TeamSummary }) {
  return (
    <Link
      to="/teams/$slug"
      params={{ slug: team.slug }}
      className="block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <RankNum rank={team.hxRank} className="w-8 shrink-0 text-2xl text-fg" />
          <TeamMark slug={team.slug} color={team.colorPrimary} className="mt-1 shrink-0" />
          <span className="min-w-0">
            <span className="block font-medium">{team.name}</span>
            <span className="mt-0.5 block text-xs text-muted">
              {team.conference} · {formatSeasonRecord(team.seasonWins, team.seasonLosses)}
            </span>
          </span>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl tabular leading-none text-fg">{fmtNum(team.hxRating, 2)}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-faint">Rating</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">
            AP · {AP_STAMP.columnHint}
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="tabular text-fg">{team.apRank ?? "NR"}</span>
            <DeltaChip hxRank={team.hxRank} apRank={team.apRank} />
          </div>
        </div>
        <div className="min-w-0 text-right">
          <div className="text-[11px] uppercase tracking-[0.12em] text-faint">Make 12</div>
          <div className="mt-1 tabular text-fg">{make12Pct(team)}</div>
        </div>
      </div>
    </Link>
  );
}

function value(t: TeamSummary, key: SortKey) {
  if (key === "apRank") return t.apRank ?? 99;
  if (key === "makeField") return make12FromSim(t.slug, t).makeField ?? t.playoffOdds;
  return t[key];
}

function Th({
  children,
  onClick,
  active,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
  className?: string;
}) {
  return (
    <th className={cn("px-3 py-3 font-medium", className)}>
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
