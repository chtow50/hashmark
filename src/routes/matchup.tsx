import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHead, Panel, TeamSelect } from "@/components/shell";
import { CompareRow, Stat, TeamSwatch, WinBar } from "@/components/marks";
import { RosterDuel } from "@/components/roster-duel";
import { getMatchup, listTeams } from "@/lib/cfb/queries";
import { fmtNum, fmtPct } from "@/lib/utils";

type Search = { home?: string; away?: string; neutral?: boolean };

function parseNeutral(v: unknown): boolean | undefined {
  if (v === true || v === "1" || v === "true") return true;
  if (v === false || v === "0" || v === "false") return false;
  return undefined;
}

export const Route = createFileRoute("/matchup")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    home: typeof s.home === "string" ? s.home : "texas",
    away: typeof s.away === "string" ? s.away : "ohio-state",
    ...(parseNeutral(s.neutral) !== undefined ? { neutral: parseNeutral(s.neutral) } : {}),
  }),
  loaderDeps: ({ search }) => ({
    home: search.home ?? "texas",
    away: search.away ?? "ohio-state",
    neutral: search.neutral,
  }),
  loader: async ({ deps }) => {
    const [teams, match] = await Promise.all([
      listTeams(),
      getMatchup({
        data: {
          home: deps.home,
          away: deps.away,
          ...(deps.neutral !== undefined ? { neutral: deps.neutral } : {}),
        },
      }),
    ]);
    return { teams, match };
  },
  component: MatchupPage,
  head: () => ({ meta: [{ title: "Matchup · HASHMARK" }] }),
});

function MatchupPage() {
  const { teams, match } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/matchup" });
  const homeSlug = search.home ?? "texas";
  const awaySlug = search.away ?? "ohio-state";
  const appliedNeutral = match.appliedNeutral ?? false;

  function setPair(next: { home?: string; away?: string; neutral?: boolean }) {
    const neutral = next.neutral ?? appliedNeutral;
    navigate({
      search: {
        home: next.home ?? homeSlug,
        away: next.away ?? awaySlug,
        ...(neutral ? { neutral: true } : { neutral: false }),
      },
    });
  }

  const { home, away, prediction, homePlayers, awayPlayers } = match;

  return (
    <div>
      <PageHead
        kicker="Predictive model"
        title="Head to head"
        lede="Type a school or pick from the list. HX seeds an Elo rating (1500 + 55 × composite). Home-field is 60 Elo points unless Neutral site is on (Dublin, CFP, etc.). Win probability and spread come from that gap."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <TeamSelect
          id="home"
          label="Home"
          value={homeSlug}
          teams={teams}
          onChange={(slug) => setPair({ home: slug })}
        />
        <div className="flex flex-col gap-2">
          <span className="mb-0 hidden text-[11px] uppercase tracking-[0.14em] text-transparent sm:block" aria-hidden>
            Home
          </span>
          <button
            type="button"
            className="h-12 w-full rounded-lg bg-raised px-4 text-sm text-muted hover:text-fg sm:w-auto"
            onClick={() => setPair({ home: awaySlug, away: homeSlug })}
          >
            Swap
          </button>
          <button
            type="button"
            aria-pressed={appliedNeutral}
            className={
              appliedNeutral
                ? "h-12 w-full rounded-lg bg-accent px-4 text-sm text-accent-fg sm:w-auto"
                : "h-12 w-full rounded-lg bg-raised px-4 text-sm text-muted hover:text-fg sm:w-auto"
            }
            onClick={() => setPair({ neutral: !appliedNeutral })}
          >
            Neutral site
          </button>
        </div>
        <TeamSelect
          id="away"
          label="Away"
          value={awaySlug}
          teams={teams}
          onChange={(slug) => setPair({ away: slug })}
        />
      </div>

      {!home || !away || !prediction ? (
        <Panel>
          <p className="text-muted">Choose two teams in the HASHMARK database.</p>
        </Panel>
      ) : (
        <div className="space-y-6">
          <Panel>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <TeamHead team={home} side="Home" />
              <div className="text-center">
                <div className="font-display text-5xl tabular tracking-wide">
                  {prediction.homeScore}–{prediction.awayScore}
                </div>
                <p className="mt-2 text-sm text-muted">
                  {prediction.spread >= 0
                    ? `${home.shortName} −${fmtNum(prediction.spread, 1)}`
                    : `${away.shortName} −${fmtNum(-prediction.spread, 1)}`}
                  {" · "}O/U {fmtNum(prediction.total, 1)}
                </p>
              </div>
              <TeamHead team={away} side="Away" />
            </div>
            <div className="mt-8">
              <WinBar
                homePct={prediction.homeWinPct}
                homeName={home.shortName}
                awayName={away.shortName}
              />
            </div>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-3">
            <Panel>
              <Stat label="HX edge" value={prediction.edge > 0 ? `+${fmtNum(prediction.edge, 2)}` : fmtNum(prediction.edge, 2)} hint={appliedNeutral ? "Neutral site · HFA off" : "Includes home field"} />
            </Panel>
            <Panel>
              <Stat label="Home win" value={fmtPct(prediction.homeWinPct * 100, 1)} />
            </Panel>
            <Panel>
              <Stat
                label="Projected wins"
                value={`${fmtNum(home.projectedWins, 1)} / ${fmtNum(away.projectedWins, 1)}`}
                hint="Season, pre-game"
              />
            </Panel>
          </div>

          <Panel>
            <h2 className="mb-1 font-display text-2xl tracking-wide">Roster talent</h2>
            <p className="mb-4 text-sm text-muted">
              Two-deep composite, transfers included. Unit slices sit under that. OL mass is size, not the ranking.
            </p>
            <CompareRow label="HX rating" a={home.hxRating} b={away.hxRating} max={10} format={(n) => fmtNum(n, 2)} />
            <CompareRow label="Talent composite" a={home.talentScore} b={away.talentScore} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="HS two-deep" a={home.hsTalent} b={away.hsTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Portal two-deep" a={home.portalTalent} b={away.portalTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Offense two-deep" a={home.offTalent} b={away.offTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Defense two-deep" a={home.defTalent} b={away.defTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="QB" a={home.qbTalent} b={away.qbTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Skill" a={home.skillTalent} b={away.skillTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="OL" a={home.olTalent} b={away.olTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="DL" a={home.dlTalent} b={away.dlTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="LB" a={home.lbTalent} b={away.lbTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="DB" a={home.dbTalent} b={away.dbTalent} max={100} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Blue-chip %" a={home.blueChipPct} b={away.blueChipPct} max={100} format={(n) => fmtPct(n, 0)} />
            <CompareRow label="Portal share" a={home.portalShare} b={away.portalShare} max={100} format={(n) => fmtPct(n, 0)} />
            <CompareRow label="2026 class pts" a={home.recPoints} b={away.recPoints} max={320} format={(n) => fmtNum(n, 0)} />
            <CompareRow label="Returning" a={home.returningProduction} b={away.returningProduction} max={100} format={(n) => fmtPct(n, 0)} />
            <CompareRow label="Offense rating" a={home.offenseRating} b={away.offenseRating} max={45} format={(n) => fmtNum(n, 1)} />
            <CompareRow label="Defense rating" a={home.defenseRating} b={away.defenseRating} max={45} format={(n) => fmtNum(n, 1)} />
            <CompareRow
              label="OL mass"
              a={home.olAvgWeightLbs}
              b={away.olAvgWeightLbs}
              max={360}
              format={(n) => `${fmtNum(n, 0)} lb`}
            />
          </Panel>

          <Panel>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl tracking-wide">Two-deep</h2>
              <span className="text-xs text-faint">
                {home.twoDeepSource === "listed" && away.twoDeepSource === "listed"
                  ? "Listed charts · TWO·DEEP"
                  : "Listed TWO·DEEP where available · CFBD projection otherwise"}
              </span>
            </div>
            <RosterDuel
              home={homePlayers}
              away={awayPlayers}
              homeName={home.shortName}
              awayName={away.shortName}
            />
          </Panel>
        </div>
      )}
    </div>
  );
}

function TeamHead({
  team,
  side,
}: {
  team: { slug: string; name: string; shortName: string; colorPrimary: string; hxRank: number; conference: string };
  side: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-[11px] uppercase tracking-[0.14em] text-faint">{side}</p>
      <div className="mt-2 flex items-center gap-2">
        <TeamSwatch color={team.colorPrimary} className="h-8 w-1.5" />
        <div>
          <div className="font-display text-3xl tracking-wide">{team.name}</div>
          <div className="text-sm text-muted">
            HX #{team.hxRank} · {team.conference}
          </div>
        </div>
      </div>
    </div>
  );
}
