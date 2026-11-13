import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { gradeGame, rollup, type AccGame, type AccGameIn, type AccRollup } from "./accuracy";
import { FCS_STUB_GAMES, fcsStubIsFinal } from "./fcs-stubs";
import { hashmarkWeekFromRow } from "./queries";

export type AccuracyPayload = { games: AccGame[]; season: AccRollup; weeks: { week: number; r: AccRollup }[] };

/** Every FINAL (FBS–FBS from the games table, FBS–FCS from the stubs), graded on its frozen pregame HX. */
export const getAccuracy = createServerFn({ method: "GET" }).handler(async (): Promise<AccuracyPayload> => {
  const sql = await getSql();
  const rows = await sql.query<{
    id: number; week: number; kickoffDate: string; home: string; away: string; homeShort: string; awayShort: string;
    neutral: boolean; hs: number; as: number; lh: number | null; la: number | null; vegas: number | null; unrated: boolean | null;
  }>(
    `select g.id, g.week, g.kickoff_date::text as "kickoffDate", ht.slug as home, at.slug as away,
            ht.short_name as "homeShort", at.short_name as "awayShort", g.neutral,
            g.home_score as hs, g.away_score as "as", g.lock_home_hx as lh, g.lock_away_hx as la,
            g.vegas_spread as vegas, g.hx_unrated as unrated
     from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id
     where g.status = 'final' and g.home_score is not null and g.away_score is not null
     order by g.kickoff_date, g.id`,
  );
  const fbs: AccGameIn[] = rows.map((r) => ({
    id: `g${r.id}`,
    week: hashmarkWeekFromRow(String(r.kickoffDate).slice(0, 10), r.week),
    kickoffDate: String(r.kickoffDate).slice(0, 10),
    home: r.home,
    away: r.away,
    homeShort: r.homeShort,
    awayShort: r.awayShort,
    neutral: Boolean(r.neutral),
    homeScore: Number(r.hs),
    awayScore: Number(r.as),
    lockHome: r.lh == null ? null : Number(r.lh),
    lockAway: r.la == null ? null : Number(r.la),
    vegasSpread: r.vegas == null ? null : Number(r.vegas),
    ...(r.unrated ? { naReason: "unrated" as const } : {}),
  }));
  const fcs: AccGameIn[] = FCS_STUB_GAMES.filter(fcsStubIsFinal).map((s, i) => ({
    id: `f${i}`,
    week: s.week,
    kickoffDate: s.kickoffDate,
    home: s.home ? s.teamSlug : `fcs:${s.opponentLabel}`,
    away: s.home ? `fcs:${s.opponentLabel}` : s.teamSlug,
    homeShort: s.homeShort ?? (s.home ? s.teamSlug : s.opponentLabel),
    awayShort: s.awayShort ?? (s.home ? s.opponentLabel : s.teamSlug),
    neutral: false,
    homeScore: s.homeScore!,
    awayScore: s.awayScore!,
    lockHome: null,
    lockAway: null,
    vegasSpread: s.vegasSpread ?? null,
    naReason: "fcs" as const,
  }));
  const games = [...fbs, ...fcs].map(gradeGame).sort((a, b) => a.kickoffDate.localeCompare(b.kickoffDate) || a.id.localeCompare(b.id));
  const weeks = [...new Set(games.map((g) => g.week))].sort((a, b) => a - b).map((week) => ({ week, r: rollup(games.filter((g) => g.week === week)) }));
  return { games, season: rollup(games), weeks };
});
