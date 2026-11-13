import { c as predictMatchup } from "./chicago-BWYtrpnu.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as hashmarkWeekFromRow } from "./queries-Dk--NEHa.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-Dxzb89Ja.mjs";
import { r as fcsStubIsFinal, t as FCS_STUB_GAMES } from "./fcs-stubs-Cww2tI6J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accuracy-queries-DwGfu0-d.js
/**
* Accuracy tape: every FINAL graded against its frozen pregame HX number.
*
* Pregame number = games.lock_home_hx / lock_away_hx: the HX board that was live when the game
* was stamped (written by scripts/hx-refit.mjs from migration history; Week 0 frozen in 0005).
* The HX line and win% come from those two numbers through the same matchup engine as the
* board. A FINAL with no lock (2026 newcomers before they joined, FCS opponents) is n/a and is
* never backfilled from a later board. Pure; the server function supplies rows.
*/
function gradeGame(g) {
	const margin = g.homeScore - g.awayScore;
	if (!(g.lockHome != null && g.lockAway != null && !g.naReason)) return {
		...g,
		naReason: g.naReason ?? "no-lock",
		graded: false,
		hxSpread: null,
		pHome: null,
		margin,
		suHit: null,
		absErr: null,
		brier: null,
		vegasAbsErr: g.vegasSpread == null ? null : Math.abs(margin - g.vegasSpread)
	};
	const p = predictMatchup({
		hxRating: g.lockHome,
		offenseRating: 0,
		defenseRating: 0
	}, {
		hxRating: g.lockAway,
		offenseRating: 0,
		defenseRating: 0
	}, { neutral: g.neutral });
	const homeWon = margin > 0 ? 1 : 0;
	return {
		...g,
		graded: true,
		hxSpread: p.spread,
		pHome: p.homeWinPct,
		margin,
		suHit: p.spread === 0 ? null : p.spread > 0 === margin > 0,
		absErr: Math.abs(margin - p.spread),
		brier: (p.homeWinPct - homeWon) ** 2,
		vegasAbsErr: g.vegasSpread == null ? null : Math.abs(margin - g.vegasSpread)
	};
}
var avg = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
function rollup(games) {
	const graded = games.filter((g) => g.graded);
	const picks = graded.filter((g) => g.suHit != null);
	const lined = graded.filter((g) => g.vegasAbsErr != null);
	return {
		games: games.length,
		graded: graded.length,
		na: games.length - graded.length,
		suHits: picks.filter((g) => g.suHit).length,
		suPct: picks.length ? 100 * picks.filter((g) => g.suHit).length / picks.length : null,
		mae: avg(graded.map((g) => g.absErr)),
		bias: avg(graded.map((g) => g.margin - g.hxSpread)),
		brier: avg(graded.map((g) => g.brier)),
		lined: lined.length,
		maeHxLined: avg(lined.map((g) => g.absErr)),
		maeVegasLined: avg(lined.map((g) => g.vegasAbsErr))
	};
}
var getAccuracy_createServerFn_handler = createServerRpc({
	id: "f10099cdbad71a91021c2c6930a843871be7cb7eba78087d6bf15e538a9f257b",
	name: "getAccuracy",
	filename: "src/lib/cfb/accuracy-queries.ts"
}, (opts) => getAccuracy.__executeServer(opts));
var getAccuracy = createServerFn({ method: "GET" }).handler(getAccuracy_createServerFn_handler, async () => {
	const fbs = (await (await getSql()).query(`select g.id, g.week, g.kickoff_date::text as "kickoffDate", ht.slug as home, at.slug as away,
            ht.short_name as "homeShort", at.short_name as "awayShort", g.neutral,
            g.home_score as hs, g.away_score as "as", g.lock_home_hx as lh, g.lock_away_hx as la,
            g.vegas_spread as vegas, g.hx_unrated as unrated
     from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id
     where g.status = 'final' and g.home_score is not null and g.away_score is not null
     order by g.kickoff_date, g.id`)).map((r) => ({
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
		...r.unrated ? { naReason: "unrated" } : {}
	}));
	const fcs = FCS_STUB_GAMES.filter(fcsStubIsFinal).map((s, i) => ({
		id: `f${i}`,
		week: s.week,
		kickoffDate: s.kickoffDate,
		home: s.home ? s.teamSlug : `fcs:${s.opponentLabel}`,
		away: s.home ? `fcs:${s.opponentLabel}` : s.teamSlug,
		homeShort: s.homeShort ?? (s.home ? s.teamSlug : s.opponentLabel),
		awayShort: s.awayShort ?? (s.home ? s.opponentLabel : s.teamSlug),
		neutral: false,
		homeScore: s.homeScore,
		awayScore: s.awayScore,
		lockHome: null,
		lockAway: null,
		vegasSpread: s.vegasSpread ?? null,
		naReason: "fcs"
	}));
	const games = [...fbs, ...fcs].map(gradeGame).sort((a, b) => a.kickoffDate.localeCompare(b.kickoffDate) || a.id.localeCompare(b.id));
	const weeks = [...new Set(games.map((g) => g.week))].sort((a, b) => a - b).map((week) => ({
		week,
		r: rollup(games.filter((g) => g.week === week))
	}));
	return {
		games,
		season: rollup(games),
		weeks
	};
});
//#endregion
export { getAccuracy_createServerFn_handler };
