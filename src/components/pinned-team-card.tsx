import { Link } from "@tanstack/react-router";
import { Panel } from "@/components/shell";
import { LineStat, Stat, TeamMark } from "@/components/marks";
import { formatKickCt, formatKickDayTitle } from "@/lib/cfb/chicago";
import { isVegasOnlyFcs } from "@/lib/cfb/fcs-stubs";
import { favoriteLine } from "@/lib/cfb/featured";
import { predictMatchup } from "@/lib/cfb/model";
import { formatSeasonRecord } from "@/lib/cfb/season-record";
import type { ScheduleGame, TeamSummary as Team } from "@/lib/cfb/types";
import { usePinnedTeam } from "@/lib/pin";
import { fmtNum } from "@/lib/utils";

/**
 * "Your team" card on the board. Client-only (localStorage pin), so it renders
 * nothing on the server and nothing until a team is pinned. Same HX line math
 * as the schedule rows; FCS stubs and unrated FINALs show no HX line.
 */
export function PinnedTeamCard({
  teams,
  slate,
  week,
}: {
  teams: Team[];
  slate: ScheduleGame[];
  week: number;
}) {
  const [pinned, setPinned] = usePinnedTeam();
  const team = pinned ? teams.find((t) => t.slug === pinned) : undefined;
  if (!team) return null;
  const g = slate.find((x) => x.homeSlug === team.slug || x.awaySlug === team.slug);
  const isHome = g ? g.homeSlug === team.slug : false;
  const pred =
    g && !isVegasOnlyFcs(g) && g.hxUnrated !== true
      ? predictMatchup(
          { hxRating: g.homeHx, offenseRating: g.homeOff, defenseRating: g.homeDef },
          { hxRating: g.awayHx, offenseRating: g.awayOff, defenseRating: g.awayDef },
          { neutral: g.neutral },
        )
      : null;
  const hxLine = g && pred ? favoriteLine(g.homeShort, g.awayShort, pred.spread) : null;
  const vegasLine =
    g && g.vegasSpread != null ? favoriteLine(g.homeShort, g.awayShort, g.vegasSpread) : null;
  const opp = g ? (isHome ? g.awayName : g.homeName) : null;
  const final = g?.status === "final" && g.homeScore != null && g.awayScore != null;

  return (
    <Panel className="enter">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Your team</p>
        <button
          type="button"
          onClick={() => setPinned(null)}
          className="min-h-10 text-xs text-muted hover:text-fg"
        >
          Unpin
        </button>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <TeamMark slug={team.slug} color={team.colorPrimary} swatchClassName="h-10 w-1.5 rounded-sm" logoSize={20} />
          <div>
            <Link to="/teams/$slug" params={{ slug: team.slug }} className="font-display text-3xl tracking-wide">
              {team.name}
            </Link>
            <p className="mt-1 text-sm text-muted">
              {team.conference} · {formatSeasonRecord(team.seasonWins, team.seasonLosses)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Stat label="HX rank" value={String(team.hxRank)} />
          <Stat label="HX" value={fmtNum(team.hxRating, 2)} />
        </div>
      </div>
      <div className="mt-4 border-t border-line pt-4">
        {g && opp ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-faint">Week {week}</p>
              <p className="mt-1 text-sm">
                {isHome ? "vs" : g.neutral ? "vs" : "at"} <span className="text-fg">{opp}</span>
                <span className="text-muted">
                  {" · "}
                  {final
                    ? `FINAL ${g.awayShort} ${g.awayScore}, ${g.homeShort} ${g.homeScore}`
                    : g.kickoffAt
                      ? formatKickCt(g.kickoffAt)
                      : formatKickDayTitle(null, g.kickoffDate)}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <LineStat label="HASHMARK" value={hxLine} empty="No HX line" />
              <LineStat label="Vegas" value={vegasLine} empty="No line posted" />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">No game for {team.shortName} in Week {week}.</p>
        )}
        {g && !isVegasOnlyFcs(g) ? (
          <Link
            to="/matchup"
            search={{ home: g.homeSlug, away: g.awaySlug, ...(g.neutral ? { neutral: true } : {}) }}
            className="mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Open in the matchup engine
          </Link>
        ) : null}
      </div>
    </Panel>
  );
}
