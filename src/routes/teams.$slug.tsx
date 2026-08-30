import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { DeltaChip, MixBar, RankMove, Stat, TeamSwatch, WinBar } from "@/components/marks";
import { RosterList } from "@/components/roster-duel";
import { TALENT_UNITS } from "@/lib/cfb/positions";
import { getTeam } from "@/lib/cfb/queries";
import { modelShare, predictMatchup, MODEL } from "@/lib/cfb/model";
import { apLabel, fmtHeight, fmtNum, fmtPct } from "@/lib/utils";

export const Route = createFileRoute("/teams/$slug")({
  loader: async ({ params }) => {
    const data = await getTeam({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  component: TeamPage,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.team.name} · HASHMARK` : "Team · HASHMARK" }],
  }),
});

function TeamPage() {
  const { team, players, games, classes } = Route.useLoaderData();
  const share = modelShare(team);

  return (
    <div>
      <PageHead
        kicker={`${team.conference} · ${team.city}, ${team.state}`}
        title={team.name}
        lede={`${team.mascot} · ${team.lastWins}–${team.lastLosses} last season · ${team.lastFinish}`}
      />

      <Panel className="mb-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <TeamSwatch color={team.colorPrimary} className="h-12 w-1.5" />
            <div>
              <div className="font-display text-5xl tabular leading-none">{team.hxRank}</div>
              <div className="mt-1 text-sm text-muted">HX rank</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat label="HX" value={fmtNum(team.hxRating, 2)} />
            <Stat label="AP" value={apLabel(team.apRank)} hint={apHint(team.hxRank, team.apRank)} />
            <Stat label="Make 12" value={fmtPct(team.playoffOdds, 1)} />
            <Stat label="Proj W" value={fmtNum(team.projectedWins, 1)} />
          </div>
        </div>
        <div className="mt-2">
          <DeltaChip hxRank={team.hxRank} apRank={team.apRank} />
        </div>
      </Panel>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Why this rating</h2>
          <ul className="mt-4 space-y-3">
            {(
              [
                ["Talent", share.talent, MODEL.weights.talent],
                ["Prior rating", share.prior, MODEL.weights.prior],
                ["Win trend", share.trend, MODEL.weights.trend],
                ["Retention", share.retention, MODEL.weights.retention],
                ["Portal net", share.portal, MODEL.weights.portal],
              ] as const
            ).map(([label, z, w]) => (
              <li key={label}>
                <div className="flex justify-between text-sm">
                  <span>{label} <span className="text-faint">× {w}</span></span>
                  <span className="tabular text-muted">{z >= 0 ? "+" : ""}{fmtNum(z, 2)}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-raised">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.max(4, Math.min(100, ((z + 2.5) / 5) * 100))}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Z-scores vs the 136-team FBS pool. Composite HX = weighted sum.
          </p>
        </Panel>
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Size</h2>
          <p className="mt-1 text-sm text-muted">Measurables only. Talent is the panel below.</p>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <KV k="Avg height" v={fmtHeight(team.avgHeightIn)} />
            <KV k="Avg weight" v={`${fmtNum(team.avgWeightLbs, 0)} lb`} />
            <KV k="OL size" v={`${fmtHeight(team.olAvgHeightIn)} / ${fmtNum(team.olAvgWeightLbs, 0)} lb`} />
            <KV k="Skill height" v={fmtHeight(team.skillAvgHeightIn)} />
            <KV k="DB height" v={fmtHeight(team.dbAvgHeightIn)} />
            <KV k="Returning starters" v={String(team.returningStarters)} />
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/matchup"
              search={{ home: team.slug, away: team.slug === "ohio-state" ? "texas" : "ohio-state" }}
              className="inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
            >
              Run a matchup
            </Link>
            <Link
              to="/talent"
              search={{ board: "composite" }}
              className="inline-flex h-11 items-center rounded-md bg-raised px-4 text-sm"
            >
              Talent board
            </Link>
          </div>
        </Panel>
      </div>

      <Panel className="mb-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl tracking-wide">Roster talent</h2>
          <span className="text-sm text-muted">Two-deep composite · transfers included</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Composite" value={fmtNum(team.talentScore, 1)} hint={`#${team.talentRank} nationally`} />
          <Stat label="HS two-deep" value={fmtNum(team.hsTalent, 1)} />
          <Stat label="Portal two-deep" value={fmtNum(team.portalTalent, 1)} hint={`${team.transferCount} transfers`} />
          <Stat label="Blue-chip" value={fmtPct(team.blueChipPct, 0)} />
        </div>
        <div className="mt-5 max-w-md">
          <MixBar leftPct={100 - team.portalShare} leftLabel="HS weight" rightLabel="Portal weight" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {TALENT_UNITS.map((u) => (
            <Stat key={u.key} label={u.label} value={fmtNum(team[u.key], 1)} />
          ))}
        </div>
      </Panel>

      <Panel className="mb-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl tracking-wide">Composite classes</h2>
          <span className="text-sm text-muted">247Sports · 2023–2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-lg text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint">
                <th className="py-2 pr-3 font-medium">Year</th>
                <th className="py-2 pr-3 font-medium">Rk</th>
                <th className="py-2 pr-3 font-medium">vs last</th>
                <th className="py-2 pr-3 font-medium">Commits</th>
                <th className="py-2 pr-3 font-medium">Avg</th>
                <th className="py-2 pr-3 font-medium">Points</th>
                <th className="py-2 font-medium">5 / 4 / 3</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, i) => {
                const prev = classes[i - 1];
                const delta = prev ? prev.compositeRank - c.compositeRank : null;
                return (
                  <tr key={c.classYear} className="border-b border-line last:border-0">
                    <td className="py-2.5 pr-3">
                      <Link to="/recruiting" search={{ year: c.classYear, board: "class" }} className="font-medium">
                        {c.classYear}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-3 tabular">{c.compositeRank}</td>
                    <td className="py-2.5 pr-3">
                      <RankMove delta={delta} />
                    </td>
                    <td className="py-2.5 pr-3 tabular">{c.commits}</td>
                    <td className="py-2.5 pr-3 tabular">{fmtNum(c.avgRating, 2)}</td>
                    <td className="py-2.5 pr-3 tabular">{fmtNum(c.points, 1)}</td>
                    <td className="py-2.5 tabular">
                      {c.fiveStars} / {c.fourStars} / {c.threeStars}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      {games.length > 0 ? (
        <Panel className="mb-6">
          <h2 className="mb-4 font-display text-2xl tracking-wide">On the slate</h2>
          <ul className="divide-y divide-line">
            {games.map((g) => {
              const homeIs = g.homeSlug === team.slug;
              const pred = predictMatchup(
                { hxRating: g.homeHx, offenseRating: g.homeOff, defenseRating: g.homeDef },
                { hxRating: g.awayHx, offenseRating: g.awayOff, defenseRating: g.awayDef },
                { neutral: g.neutral },
              );
              const opp = homeIs ? g.awayName : g.homeName;
              const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
              const win = homeIs ? pred.homeWinPct : pred.awayWinPct;
              return (
                <li key={g.id} className="py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.14em] text-faint">
                        Week {g.week} · {g.kickoffDate} · {g.location}
                      </div>
                      <Link
                        to="/matchup"
                        search={{ home: g.homeSlug, away: g.awaySlug }}
                        className="mt-1 inline-block font-medium"
                      >
                        {homeIs ? "vs" : "@"} {opp}
                      </Link>
                    </div>
                    <div className="w-full max-w-xs sm:w-56">
                      <WinBar
                        homePct={win}
                        homeName={team.shortName}
                        awayName={homeIs ? g.awayShort : g.homeShort}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link to="/teams/$slug" params={{ slug: oppSlug }} className="text-xs text-muted hover:text-fg">
                      Opponent page
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      ) : null}

      <Panel>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl tracking-wide">Two-deep</h2>
          <span className="text-xs text-faint">
            {team.twoDeepSource === "listed"
              ? "Listed chart · TWO·DEEP"
              : "Projected · ranked by recruiting rating within position group"}
          </span>
        </div>
        <RosterList players={players} />
      </Panel>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">{k}</dt>
      <dd className="mt-1 tabular">{v}</dd>
    </div>
  );
}

function apHint(rank: number, ap: number | null) {
  if (ap == null) return "Unranked in AP";
  const d = ap - rank;
  if (d === 0) return "Even with AP";
  return d > 0 ? `HX ${d} spots higher` : `AP ${-d} spots higher`;
}
