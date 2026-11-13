import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { FCS_STUB_GAMES, fcsStubIsFinal } from "./fcs-stubs";
import { computeSor, type SorFcs, type SorGame, type SorRow } from "./sor";

export type SorPayload = { rows: SorRow[]; benchSlug: string; benchHx: number };

/** SOR + SOS for every board team from current HX, the games table, and the FCS stubs. */
export const getSorBoard = createServerFn({ method: "GET" }).handler(async (): Promise<SorPayload> => {
  const sql = await getSql();
  const board = await sql.query<{ slug: string; hx: number; rank: number }>(
    `select t.slug, r.hx_rating as hx, r.hx_rank as rank
     from teams t join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0`,
  );
  const games = await sql.query<{ home: string; away: string; neutral: boolean; status: string; hs: number | null; as: number | null }>(
    `select ht.slug as home, at.slug as away, g.neutral, g.status, g.home_score as hs, g.away_score as "as"
     from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id`,
  );
  const hx = Object.fromEntries(board.map((b) => [b.slug, Number(b.hx)]));
  const bench = [...board].sort((a, b) => a.rank - b.rank)[24];
  const sorGames: SorGame[] = games.map((g) => {
    const final = g.status === "final" && g.hs != null && g.as != null;
    return { home: g.home, away: g.away, neutral: Boolean(g.neutral), final, winner: final ? (g.hs! > g.as! ? g.home : g.away) : null };
  });
  const fcs: SorFcs[] = FCS_STUB_GAMES.map((s) => {
    const final = fcsStubIsFinal(s);
    const mine = s.home ? s.homeScore : s.awayScore;
    const theirs = s.home ? s.awayScore : s.homeScore;
    return { team: s.teamSlug, site: s.home ? "home" : "away", final, won: final ? (mine as number) > (theirs as number) : null };
  });
  return { rows: computeSor(hx, sorGames, fcs, Number(bench.hx)), benchSlug: bench.slug, benchHx: Number(bench.hx) };
});
