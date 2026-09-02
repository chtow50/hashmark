import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { DeltaChip, RankNum, TeamSwatch } from "@/components/marks";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
import { MODEL } from "@/lib/cfb/model";
import { listTeams } from "@/lib/cfb/queries";
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
  | "playoffOdds"
  | "talentScore"
  | "recRank";

/** Rank col is w-16; Team sticks at that offset so names never slide under Off/Def. */
const STICKY_RANK = "sticky left-0 z-20 w-16 min-w-16 bg-surface";
const STICKY_TEAM = "sticky left-16 z-20 min-w-52 border-r border-line bg-surface";

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
      setDir(key === "hxRating" || key === "projectedWins" || key === "playoffOdds" || key === "talentScore" ? "desc" : "asc");
    }
  }

  return (
    <div>
      <PageHead
        kicker={`Week 1 · HX ${MODEL.version}`}
        title="Power rankings"
        lede="Every FBS program, ranked by HX. Talent is listed two-deep composite, not class rank — TWO·DEEP / 247. Talent and prior-year SP+/Elo/SRS carry the real signal. Make 12 is make-field, not title odds; projected wins are Elo vs the 2026 slate. AP is the Aug 17 preseason ballot."
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

      <Panel className="overflow-hidden p-0 sm:p-0">
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
                <Th onClick={() => toggle("hxRating")} active={sort === "hxRating"} className="border-b border-line">
                  Rating
                </Th>
                <Th onClick={() => toggle("apRank")} active={sort === "apRank"} className="border-b border-line">
                  AP
                </Th>
                <th className="border-b border-line px-3 py-3 font-medium">Off / Def</th>
                <Th onClick={() => toggle("projectedWins")} active={sort === "projectedWins"} className="border-b border-line">
                  Proj W
                </Th>
                <Th onClick={() => toggle("playoffOdds")} active={sort === "playoffOdds"} className="border-b border-line">
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
                      <TeamSwatch color={t.colorPrimary} />
                      <span>
                        <span className="block whitespace-nowrap font-medium">{t.name}</span>
                        <span className="block whitespace-nowrap text-xs text-muted">
                          {t.conference} · {t.lastWins}–{t.lastLosses}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="border-b border-line px-3 py-3 tabular">{fmtNum(t.hxRating, 2)}</td>
                  <td className="border-b border-line px-3 py-3">
                    <div className="tabular">{t.apRank ?? "NR"}</div>
                    <DeltaChip hxRank={t.hxRank} apRank={t.apRank} />
                  </td>
                  <td className="border-b border-line px-3 py-3 tabular text-muted">
                    {fmtNum(t.offenseRating, 1)} / {fmtNum(t.defenseRating, 1)}
                  </td>
                  <td className="border-b border-line px-3 py-3 tabular">{fmtNum(t.projectedWins, 1)}</td>
                  <td className="border-b border-line px-3 py-3 tabular">{fmtPct(t.playoffOdds, 1)}</td>
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

function value(t: TeamSummary, key: SortKey) {
  if (key === "apRank") return t.apRank ?? 99;
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
