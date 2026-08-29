import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHead, Panel } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DeltaChip, RankNum, Stat, TeamLink, TeamSwatch, WinBar } from "@/components/marks";
import { listGames, listSchedule, listTeams } from "@/lib/cfb/queries";
import { todayChicago } from "@/lib/cfb/chicago";
import { predictMatchup } from "@/lib/cfb/model";
import { apLabel, fmtNum, fmtPct } from "@/lib/utils";

/** HASHMARK board week. Opening weekend is Week 0; games.week in seed is NCAA week 1. */
const BOARD_WEEK = 0;

export const Route = createFileRoute("/")({
  loader: async () => {
    const date = todayChicago();
    const [teams, games, slate] = await Promise.all([
      listTeams(),
      listGames(),
      listSchedule({ data: { date } }),
    ]);
    const top = new Set(teams.slice(0, 20).map((t) => t.slug));
    const notable = games.filter((g) => top.has(g.homeSlug) && top.has(g.awaySlug));
    const now = Date.now();
    const upcoming = slate.find(
      (g) => g.status !== "final" && g.kickoffAt != null && Date.parse(g.kickoffAt) > now,
    );
    const featured = upcoming ?? slate.find((g) => g.status === "final") ?? slate[0] ?? null;
    return { teams, games: notable.length ? notable : games.slice(0, 12), featured };
  },
  component: Home,
  head: () => ({
    meta: [{ title: `HASHMARK · Week ${BOARD_WEEK} board` }],
  }),
});

function Home() {
  const { teams, games, featured } = Route.useLoaderData();
  const top = teams.slice(0, 25);
  const one = teams[0];
  const featurePred = featured
    ? predictMatchup(
        { hxRating: featured.homeHx, offenseRating: featured.homeOff, defenseRating: featured.homeDef },
        { hxRating: featured.awayHx, offenseRating: featured.awayOff, defenseRating: featured.awayDef },
        { neutral: featured.neutral },
      )
    : null;

  const disagreements = [...teams]
    .filter((t) => t.apRank != null)
    .map((t) => ({ team: t, delta: (t.apRank ?? t.hxRank) - t.hxRank }))
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 6);

  const recLeaders = [...teams].sort((a, b) => a.recRank - b.recRank).slice(0, 5);
  const talentLeaders = [...teams].sort((a, b) => a.talentRank - b.talentRank).slice(0, 5);

  return (
    <div className="space-y-10">
      <PageHead
        kicker={`Week ${BOARD_WEEK} · HX 2026.2`}
        title={`Week ${BOARD_WEEK} board`}
        lede="HASHMARK runs a single rating — HX — from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net. Full 136 FBS. The AP column is the Aug 17 preseason ballot."
      />

      {one ? (
        <Panel className="enter">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">HX No. 1</p>
              <div className="mt-3 flex items-center gap-3">
                <TeamSwatch color={one.colorPrimary} className="h-10 w-1.5 rounded-sm" />
                <div>
                  <Link
                    to="/teams/$slug"
                    params={{ slug: one.slug }}
                    className="font-display text-4xl tracking-wide sm:text-5xl"
                  >
                    {one.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {one.mascot} · {one.conference} · {one.lastWins}–{one.lastLosses} last fall
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <Stat label="HX" value={fmtNum(one.hxRating, 2)} />
              <Stat label="AP" value={apLabel(one.apRank)} />
              <Stat label="Playoff" value={fmtPct(one.playoffOdds, 0)} />
            </div>
          </div>
        </Panel>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl tracking-wide">Top 25</h2>
            <Link to="/rankings" className="text-sm text-muted hover:text-fg">
              Full board
            </Link>
          </div>
          <ol>
            {top.map((t) => (
              <li
                key={t.slug}
                className="flex items-center gap-3 border-b border-line py-2.5 last:border-0"
              >
                <RankNum rank={t.hxRank} className="w-8 text-lg" />
                <TeamLink slug={t.slug} name={t.name} color={t.colorPrimary} className="min-h-10 flex-1" />
                <span className="hidden tabular text-sm text-muted sm:inline">{fmtNum(t.hxRating, 2)}</span>
                <DeltaChip hxRank={t.hxRank} apRank={t.apRank} />
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-6">
          {featured && featurePred ? (
            <Panel>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Week {BOARD_WEEK} · {featured.location}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-wide">
                {featured.neutral
                  ? `${featured.awayShort} vs ${featured.homeShort}`
                  : `${featured.awayShort} at ${featured.homeShort}`}
              </h2>
              <p className="mt-1 text-sm text-muted">{featured.headline ?? "Model matchup"}</p>
              <div className="mt-5">
                <WinBar
                  homePct={featurePred.homeWinPct}
                  homeName={featured.homeShort}
                  awayName={featured.awayShort}
                />
              </div>
              <p className="mt-4 text-sm text-muted">
                Projected {featurePred.homeScore}–{featurePred.awayScore}
                {featurePred.spread >= 0
                  ? ` · ${featured.homeShort} −${fmtNum(featurePred.spread, 1)}`
                  : ` · ${featured.awayShort} −${fmtNum(-featurePred.spread, 1)}`}
              </p>
              <Button asChild variant="outline" className="mt-5 w-full">
                <Link
                  to="/matchup"
                  search={{
                    home: featured.homeSlug,
                    away: featured.awaySlug,
                    ...(featured.neutral ? { neutral: true } : {}),
                  }}
                >
                  Open matchup
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Panel>
          ) : null}

          <Panel>
            <h2 className="font-display text-2xl tracking-wide">Where HX disagrees</h2>
            <p className="mt-1 mb-4 text-sm text-muted">Largest gaps versus the preseason AP ballot.</p>
            <ul>
              {disagreements.map(({ team, delta }) => (
                <li key={team.slug} className="flex items-center justify-between gap-3 py-2">
                  <TeamLink slug={team.slug} name={team.shortName} color={team.colorPrimary} />
                  <span className={delta > 0 ? "text-sm tabular text-up" : "text-sm tabular text-down"}>
                    {delta > 0 ? `HX +${delta}` : `HX ${delta}`}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <Panel>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-display text-2xl tracking-wide">Composite class of 2026</h2>
          <div className="flex flex-wrap items-center gap-2">
            {([2023, 2024, 2025, 2026] as const).map((y) => (
              <Link
                key={y}
                to="/recruiting"
                search={{ year: y, board: "class" }}
                className="inline-flex h-9 items-center rounded-full bg-raised px-3 text-sm text-muted hover:text-fg"
              >
                {y}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-5">
          {recLeaders.map((t) => (
            <Link
              key={t.slug}
              to="/teams/$slug"
              params={{ slug: t.slug }}
              className="bg-surface p-4 hover:bg-raised"
            >
              <div className="font-display text-2xl tabular text-muted">{t.recRank}</div>
              <div className="mt-2 flex items-center gap-2">
                <TeamSwatch color={t.colorPrimary} />
                <span className="font-medium">{t.shortName}</span>
              </div>
              <div className="mt-2 text-xs tabular text-muted">
                {t.fiveStars} five-star · {fmtNum(t.recAvg, 1)} avg
              </div>
            </Link>
          ))}
        </div>
      </Panel>

      <Panel>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-wide">Roster talent composite</h2>
            <p className="mt-1 text-sm text-muted">Listed two-deep, transfers included. Not OL mass.</p>
          </div>
          <Link to="/talent" search={{ board: "composite" }} className="text-sm text-muted hover:text-fg">
            Full board
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-5">
          {talentLeaders.map((t) => (
            <Link
              key={t.slug}
              to="/teams/$slug"
              params={{ slug: t.slug }}
              className="bg-surface p-4 hover:bg-raised"
            >
              <div className="font-display text-2xl tabular text-muted">{t.talentRank}</div>
              <div className="mt-2 flex items-center gap-2">
                <TeamSwatch color={t.colorPrimary} />
                <span className="font-medium">{t.shortName}</span>
              </div>
              <div className="mt-2 text-xs tabular text-muted">
                {fmtNum(t.talentScore, 1)} · {t.transferCount} TR · {fmtPct(t.portalShare, 0)} portal
              </div>
            </Link>
          ))}
        </div>
      </Panel>
    </div>
  );
}
