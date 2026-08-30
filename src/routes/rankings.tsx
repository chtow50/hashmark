import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ConfPills, PageHead, Panel } from "@/components/shell";
import { DeltaChip, RankNum, TeamSwatch } from "@/components/marks";
import { inConf, parseConf, type ConfFilter } from "@/lib/cfb/conferences";
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
        kicker="HX Rating · Week 0"
        title="Power rankings"
        lede="Every FBS program, ranked by HX. Talent and prior-year SP+/Elo/SRS carry the real signal. Playoff odds are a logistic on rank; projected wins are Elo vs the 2026 slate. AP is the Aug 17 preseason ballot."
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
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <Th onClick={() => toggle("hxRank")} active={sort === "hxRank"}>
                  HX
                </Th>
                <th className="px-3 py-3 font-medium">Team</th>
                <Th onClick={() => toggle("hxRating")} active={sort === "hxRating"}>
                  Rating
                </Th>
                <Th onClick={() => toggle("apRank")} active={sort === "apRank"}>
                  AP
                </Th>
                <th className="px-3 py-3 font-medium">Off / Def</th>
                <Th onClick={() => toggle("projectedWins")} active={sort === "projectedWins"}>
                  Proj W
                </Th>
                <Th onClick={() => toggle("playoffOdds")} active={sort === "playoffOdds"}>
                  Make 12
                </Th>
                <Th onClick={() => toggle("talentScore")} active={sort === "talentScore"}>
                  Talent
                </Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.slug} className="border-b border-line last:border-0 hover:bg-raised/60">
                  <td className="px-4 py-3">
                    <RankNum rank={t.hxRank} className="text-xl text-fg" />
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
                        <span className="block text-xs text-muted">
                          {t.conference} · {t.lastWins}–{t.lastLosses}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 tabular">{fmtNum(t.hxRating, 2)}</td>
                  <td className="px-3 py-3">
                    <div className="tabular">{t.apRank ?? "NR"}</div>
                    <DeltaChip hxRank={t.hxRank} apRank={t.apRank} />
                  </td>
                  <td className="px-3 py-3 tabular text-muted">
                    {fmtNum(t.offenseRating, 1)} / {fmtNum(t.defenseRating, 1)}
                  </td>
                  <td className="px-3 py-3 tabular">{fmtNum(t.projectedWins, 1)}</td>
                  <td className="px-3 py-3 tabular">{fmtPct(t.playoffOdds, 1)}</td>
                  <td className="px-3 py-3 tabular">{fmtNum(t.talentScore, 1)}</td>
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
