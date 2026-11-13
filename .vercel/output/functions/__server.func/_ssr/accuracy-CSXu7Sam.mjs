import { r as predictMatchup } from "./model-C--_NYY0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accuracy-CSXu7Sam.js
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
//#endregion
export { rollup as n, gradeGame as t };
