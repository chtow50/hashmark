import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHead, Panel } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { AccountabilityCard, DisagreementCard } from "@/components/truth-pack";
import { DeltaChip, RankNum, Stat, TeamLink, TeamMark, WinBar } from "@/components/marks";
import { formatKickCt, formatKickDayTitle } from "@/lib/cfb/chicago";
import {
  BOARD_WEEK,
  FEATURED_SLATE_WEEK,
  favoriteLine,
  featuredBook,
  featuredSlateWeek,
  selectBoardFeaturedKick,
  spreadGap,
} from "@/lib/cfb/featured";
import { listGames, listScheduleWeek, listTeams } from "@/lib/cfb/queries";
import { formatSeasonRecord } from "@/lib/cfb/season-record";
import { MODEL, predictMatchup } from "@/lib/cfb/model";
import { make12FromSim } from "@/lib/cfb/season-sim";
import {
  boardDisagreementRows,
  odMovers,
  week1Tape,
} from "@/lib/cfb/truth-pack";
import type { Prediction, ScheduleGame } from "@/lib/cfb/types";
import { apLabel, fmtNum, fmtPct } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [teams, games, slate] = await Promise.all([
      listTeams(),
      listGames(),
      listScheduleWeek({ data: { week: FEATURED_SLATE_WEEK } }),
    ]);
    const top = new Set(teams.slice(0, 20).map((t) => t.slug));
    const notable = games.filter((g) => top.has(g.homeSlug) && top.has(g.awaySlug));
    const featured = selectBoardFeaturedKick(
      slate.filter((g) => !g.isFcs),
      Date.now(),
    );
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

  const disagreements = boardDisagreementRows(teams).slice(0, 8);
  const tape = week1Tape();
  const movers = odMovers(6);
  const oneMake = one ? make12FromSim(one.slug, one) : null;

  const recLeaders = [...teams].sort((a, b) => a.recRank - b.recRank).slice(0, 5);
  const talentLeaders = [...teams].sort((a, b) => a.talentRank - b.talentRank).slice(0, 5);

  return (
    <div className="space-y-10">
      <PageHead
        kicker={`Week ${BOARD_WEEK} · HX ${MODEL.version}`}
        title={`Week ${BOARD_WEEK} board`}
        lede="HASHMARK runs a single rating — HX — from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net. Full 136 FBS. The AP column is Week 1 AP (Sept. 8)."
      />

      {one ? (
        <Panel className="enter">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">HX No. 1</p>
              <div className="mt-3 flex items-center gap-3">
                <TeamMark slug={one.slug} color={one.colorPrimary} swatchClassName="h-10 w-1.5 rounded-sm" logoSize={20} />
                <div>
                  <Link
                    to="/teams/$slug"
                    params={{ slug: one.slug }}
                    className="font-display text-4xl tracking-wide sm:text-5xl"
                  >
                    {one.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {one.mascot} · {one.conference} · {formatSeasonRecord(one.seasonWins, one.seasonLosses)}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <Stat label="HX" value={fmtNum(one.hxRating, 2)} />
              <Stat label="AP" value={apLabel(one.apRank)} />
              <Stat
                label="Make 12"
                value={oneMake?.makeField != null ? fmtPct(oneMake.makeField, 1) : fmtPct(one.playoffOdds, 0)}
                hint={oneMake?.makeFieldSource === "amd-draws" ? "make-field · HX 2026.3 10k" : undefined}
              />
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
                <span className="tabular text-sm text-muted">{formatSeasonRecord(t.seasonWins, t.seasonLosses)}</span>
                <span className="hidden tabular text-sm text-muted sm:inline">{fmtNum(t.hxRating, 2)}</span>
                <DeltaChip hxRank={t.hxRank} apRank={t.apRank} />
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-6">
          {featured && featurePred ? (
            <FeaturedKick featured={featured} pred={featurePred} />
          ) : null}

          <DisagreementCard rows={disagreements} />
        </div>
      </div>

      <AccountabilityCard tape={tape} movers={movers} />

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
                <TeamMark slug={t.slug} color={t.colorPrimary} />
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
                <TeamMark slug={t.slug} color={t.colorPrimary} />
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

function FeaturedKick({ featured, pred }: { featured: ScheduleGame; pred: Prediction }) {
  const week = featuredSlateWeek(featured);
  const hxLine = favoriteLine(featured.homeShort, featured.awayShort, pred.spread);
  const hxWin = pred.spread >= 0 ? pred.homeWinPct : pred.awayWinPct;
  const book = featuredBook(featured);
  const bookLine = book ? favoriteLine(featured.homeShort, featured.awayShort, book.spread) : null;
  const gap = book ? spreadGap(pred.spread, book.spread) : null;
  const kick = featured.kickoffAt
    ? formatKickCt(featured.kickoffAt)
    : formatKickDayTitle(null, featured.kickoffDate);

  return (
    <Panel>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        Week {week} · {featured.location}
      </p>
      <h2 className="mt-2 font-display text-2xl tracking-wide">
        {featured.neutral
          ? `${featured.awayShort} vs ${featured.homeShort}`
          : `${featured.awayShort} at ${featured.homeShort}`}
      </h2>
      <p className="mt-1 text-sm text-muted">
        {kick}
        {featured.tv ? ` · ${featured.tv}` : ""}
        {featured.neutral ? " · Neutral" : ""}
      </p>
      {gap != null && bookLine ? (
        <p className="mt-3 inline-flex h-6 items-center rounded-full bg-raised px-2 text-[11px] uppercase tracking-[0.12em] text-warn">
          Spread gap
        </p>
      ) : null}
      <div className="mt-5">
        <WinBar
          homePct={pred.homeWinPct}
          homeName={featured.homeShort}
          awayName={featured.awayShort}
        />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-faint">HASHMARK</div>
          <div className="mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl">
            {hxLine} / {fmtPct(hxWin * 100, 1)}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{book?.label ?? "Vegas"}</div>
          <div className="mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl">
            {book && bookLine ? `${bookLine} · ${book.total}` : "—"}
          </div>
        </div>
      </div>
      {gap != null && bookLine ? (
        <p className="mt-4 text-sm text-warn">
          HASHMARK {hxLine} vs book {bookLine} · same favorite
        </p>
      ) : null}
      {book?.note ? <p className="mt-2 text-xs leading-relaxed text-muted">{book.note}</p> : null}
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
  );
}
