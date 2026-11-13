import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import OG_CARDS from "@/lib/og/cards.json";
import { HxResultsPanel } from "@/components/hx-results";
import { PageHead, Panel } from "@/components/shell";
import { PinButton } from "@/components/pin";
import { ShareImageButton } from "@/components/share-button";
import { confRaceFor, fmtOdds, parseRaceConf } from "@/lib/cfb/conf-races";
import { MixBar, RankMove, Stat, TeamMark } from "@/components/marks";
import { RosterList } from "@/components/roster-duel";
import { RemainingScheduleSection, SeasonScheduleSection } from "@/components/season-sim";
import { TALENT_UNITS } from "@/lib/cfb/positions";
import { getTeam } from "@/lib/cfb/queries";
import { getTeamAdvanced } from "@/lib/cfb/stats-queries";
import { getSorBoard } from "@/lib/cfb/sor-queries";
import { getHxHistory } from "@/lib/cfb/hx-history-queries";
import { HxSparkline } from "@/components/hx-sparkline";
import { AdvancedStatsPanel } from "@/components/advanced-stats-panel";
import { formatSeasonRecord } from "@/lib/cfb/season-record";
import { COMPOSITE_SOURCE, ratedStarCount, visibleClassAvg } from "@/lib/cfb/recruiting";
import { modelShare, MODEL } from "@/lib/cfb/model";
import { buildRemainingSchedule, buildSeasonSchedule, make12FreeFromSim } from "@/lib/cfb/season-sim";
import { apLabel, cn, fmtHeight, fmtNum, fmtPct } from "@/lib/utils";

export const Route = createFileRoute("/teams/$slug")({
  loader: async ({ params }) => {
    const [data, advanced, sor, hxHistory] = await Promise.all([
      getTeam({ data: { slug: params.slug } }),
      getTeamAdvanced({ data: { slug: params.slug } }),
      getSorBoard(),
      getHxHistory({ data: { slug: params.slug } }),
    ]);
    if (!data) throw notFound();
    return { ...data, advanced, hxHistory, sor: sor.rows.find((r) => r.slug === params.slug) ?? null };
  },
  component: TeamPage,
  head: ({ loaderData, params }) =>
    seo({
      path: `/teams/${params.slug}`,
      image: OG_CARDS.teams.includes(params.slug) ? `/og/teams/${params.slug}.jpg` : undefined,
      title: loaderData ? `${loaderData.team.name} ${loaderData.team.mascot} · HX rating, schedule, stats · HASHMARK` : "Team · HASHMARK",
      description: loaderData
        ? `${loaderData.team.name}: HX rank #${loaderData.team.hxRank}, record, schedule with HX spreads, playoff make-field odds, and HX vs results.`
        : "HASHMARK team page.",
    }),
});

function fmtSigned(v: number) {
  return `${v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
}

function TeamPage() {
  const { team, players, games, classes, advanced, sor, hxHistory } = Route.useLoaderData();
  const share = modelShare(team);
  // Free team page: make-field only; win_title is never published on free surfaces.
  const make12 = make12FreeFromSim(team.slug, team);
  const race = confRaceFor(team.slug);
  const remaining = buildRemainingSchedule(team.slug, games);
  const season = buildSeasonSchedule(team.slug, games);

  return (
    <div>
      <PageHead
        kicker={`${team.conference} · ${team.city}, ${team.state}`}
        title={team.name}
        lede={`${team.mascot} · ${formatSeasonRecord(team.seasonWins, team.seasonLosses)} · 2025: ${team.lastFinish}`}
        action={
          <div className="flex flex-wrap gap-2">
            <PinButton slug={team.slug} name={team.shortName} />
            <ShareImageButton
              card={() => ({
                kicker: `${team.conference} · HX board`,
                title: `${team.name} ${team.mascot}`,
                subtitle: formatSeasonRecord(team.seasonWins, team.seasonLosses),
                stats: [
                  { label: "HX rank", value: `No. ${team.hxRank}` },
                  { label: "HX", value: fmtSigned(team.hxRating) },
                  { label: "Proj W", value: fmtNum(team.projectedWins, 1) },
                  { label: "Make 12", value: make12.makeField == null ? "—" : fmtPct(make12.makeField, 1) },
                ],
                line:
                  hxHistory && hxHistory.points.length > 1
                    ? {
                        values: hxHistory.points.map((p) => p.hx),
                        caption: "HX entering each week",
                        startLabel: `Wk ${hxHistory.points[0].week} (pre) · No. ${hxHistory.points[0].rank}`,
                        endLabel: `Now · No. ${hxHistory.points.at(-1)!.rank}`,
                      }
                    : undefined,
                accent: team.colorPrimary,
                footer: "Make 12 = odds of making the playoff field (10k HX sims), not title odds.",
                filename: `hashmark-${team.slug}.png`,
              })}
            />
          </div>
        }
      />

      <Panel className="mb-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <TeamMark slug={team.slug} color={team.colorPrimary} swatchClassName="h-12 w-1.5" logoSize={32} />
            <div>
              <div className="font-display text-5xl tabular leading-none">{team.hxRank}</div>
              <div className="mt-1 text-sm text-muted">HX rank of 138</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <Stat label="HX" value={fmtNum(team.hxRating, 2)} />
            <Stat label="AP" value={apLabel(team.apRank)} hint={apHint(team.hxRank, team.apRank)} />
            <Stat label="Proj W" value={fmtNum(team.projectedWins, 1)} hint="10k-draw mean" />
            <Stat
              label="Make 12"
              value={make12.makeField == null ? "—" : fmtPct(make12.makeField, 1)}
              hint="Make the field, not title odds"
            />
          </div>
        </div>
        {hxHistory ? (
          <div className="mt-4 border-t border-line pt-3">
            <HxSparkline history={hxHistory} color={team.colorPrimary} />
          </div>
        ) : null}
        {sor ? (
          <p className="mt-4 border-t border-line pt-3 text-sm text-muted">
            Strength of record <span className="tabular text-fg">No. {sor.sorRank}</span> ({sor.sor > 0 ? "+" : sor.sor < 0 ? "−" : ""}
            {Math.abs(sor.sor).toFixed(2)} wins vs a top-25 team) · schedule played{" "}
            <span className="tabular text-fg">{sor.sosPlayedRank != null ? `No. ${sor.sosPlayedRank}` : "n/a"}</span> · schedule left{" "}
            <span className="tabular text-fg">{sor.sosRemainingRank != null ? `No. ${sor.sosRemainingRank}` : "n/a"}</span>.{" "}
            <Link to="/strength" className="underline underline-offset-4 hover:text-fg">
              All teams
            </Link>
          </p>
        ) : null}
        {race && race.conf_title != null && parseRaceConf(team.conference) ? (
          <p className={cn("text-sm text-muted", sor ? "mt-1.5" : "mt-4 border-t border-line pt-3")}>
            {team.conference} race:{" "}
            {race.make_ccg != null ? (
              <>
                <span className="tabular text-fg">{fmtOdds(race.make_ccg)}</span> to reach the title game,{" "}
              </>
            ) : null}
            <span className="tabular text-fg">{fmtOdds(race.conf_title)}</span> to win the league.{" "}
            <Link
              to="/conferences"
              search={team.conference === "SEC" ? {} : { conf: parseRaceConf(team.conference) }}
              className="underline underline-offset-4 hover:text-fg"
            >
              Full race
            </Link>
          </p>
        ) : null}
      </Panel>

      <nav
        aria-label="On this page"
        className="sticky top-14 z-30 -mx-4 mb-6 flex gap-1 overflow-x-auto border-b border-line bg-bg/92 px-4 py-2 backdrop-blur-md sm:top-16 sm:mx-0 sm:rounded-xl sm:border sm:px-2"
      >
        {(
          [
            ["upcoming", "Upcoming"],
            ...(advanced ? [["advanced", "Advanced stats"]] : []),
            ["results", "HX vs results"],
            ["season", "Season"],
            ["roster", team.hasProfile === false ? "About" : "Roster & rating"],
          ] as [string, string][]
        ).map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="inline-flex h-9 shrink-0 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
          >
            {label}
          </a>
        ))}
      </nav>

      <section id="upcoming" className="scroll-mt-32">
        <RemainingScheduleSection rows={remaining} teamShortName={team.shortName} />
      </section>

      {advanced ? (
        <section id="advanced" className="scroll-mt-32">
          <AdvancedStatsPanel data={advanced} teamSlug={team.slug} />
        </section>
      ) : null}

      <section id="results" className="scroll-mt-32">
        <HxResultsPanel teamSlug={team.slug} games={games} />
      </section>

      <section id="season" className="scroll-mt-32">
        <SeasonScheduleSection rows={season} />
      </section>

      <div id="roster" className="scroll-mt-32" />
      {team.hasProfile === false ? (
        <NewcomerPanel />
      ) : (
        <>
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
            Z-scores vs the preseason FBS pool (136 teams). Composite HX = weighted sum.
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
              search={{}}
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
          <span className="text-sm text-muted">{COMPOSITE_SOURCE.board} · 2023–2026</span>
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
                      <Link to="/recruiting" search={{ year: c.classYear === 2026 ? undefined : c.classYear }} className="font-medium">
                        {c.classYear}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-3 tabular">{c.compositeRank}</td>
                    <td className="py-2.5 pr-3">
                      <RankMove delta={delta} />
                    </td>
                    <td className="py-2.5 pr-3 tabular">{c.commits}</td>
                    <td className="py-2.5 pr-3 tabular">
                      {visibleClassAvg(
                        c.avgRating,
                        ratedStarCount(c.fiveStars, c.fourStars, c.threeStars),
                      ) == null
                        ? "—"
                        : fmtNum(c.avgRating, 2)}
                    </td>
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
        </>
      )}
    </div>
  );
}

/** 2026 FBS newcomers (0093): no preseason profile rows, so no talent, class, size, or two-deep panels. */
function NewcomerPanel() {
  return (
    <Panel className="mb-6">
      <h2 className="font-display text-2xl tracking-wide">2026 FBS newcomer</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        This program moved up from FCS in 2026 and was not on the preseason board. Its HX starts from the
        newcomer prior (the mean preseason HX of the 2025 newcomers Delaware and Missouri State) and is refit
        weekly on its FBS results like every other team. Games it played before joining the board show no
        pregame HX line and are not graded. Talent, recruiting class, size, and two-deep panels return once a
        sourced profile is stamped.
      </p>
    </Panel>
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
  const n = Math.abs(d);
  const spots = n === 1 ? "spot" : "spots";
  return d > 0 ? `HX ${n} ${spots} higher` : `AP ${n} ${spots} higher`;
}
