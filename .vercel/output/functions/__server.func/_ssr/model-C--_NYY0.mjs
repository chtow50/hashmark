//#region node_modules/.nitro/vite/services/ssr/assets/model-C--_NYY0.js
/**
* HASHMARK Index — HX 2026.8 (Week 11 board chrome).
* Preseason prior = the composite below (data/hx_preseason_prior_2026.json).
* In season, HX is refit weekly by scripts/hx-refit.mjs (Bayesian blend of the
* preseason prior, worth λ = 2 games, with opponent-adjusted capped margins of
* stamped FBS–FBS FINALs, cap ±28). The old ΔHX = (ΔO+ΔD)/55 step is retired.
* Weights from power_rankings.py DEFAULT_WEIGHTS, walk-forward Top 25
* balanced ≈ 0.646. Talent and prior_rating carry the real signal.
* Matchup math is the Elo mapping from matchup.py (70.8% SU, 2019–2025).
* Spread is a quadratic on Elo gap, fit on 2019–2023 FBS MOV (holdout 2024–2025).
* Quadratic / talent / z* weights / team-HFA / weather / QB tenure SOS — unchanged.
* Make the 12 free board is the current-HX 10k draws (scripts/hx-sim-10k.mjs; make-field only on free chrome; win_title never on free surfaces).
*/
var MODEL = {
	name: "HX Rating",
	version: "2026.8",
	season: 2026,
	week: 11,
	weekLabel: "Week 11 board",
	eloBase: 1500,
	eloScale: 55,
	homeFieldElo: 60,
	eloDenom: 400,
	/** Previous linear spread map (kept for display). */
	pointsPerElo: .0534,
	/** Quadratic MOV map: spread = a·d + b·d·|d| */
	spreadA: .050835,
	spreadB: 45795e-9,
	/** In-season refit knobs (scripts/hx-refit-core.mjs HX_REFIT). */
	refit: {
		lambda: 2,
		marginCap: 28
	},
	weights: {
		talent: 1.5,
		prior: 1.5,
		trend: 1,
		retention: .5,
		portal: .5
	}
};
function toElo(composite) {
	return MODEL.eloBase + MODEL.eloScale * composite;
}
/** Home-perspective spread (positive = home favored). Round separately. */
function spreadFromDiff(d) {
	return MODEL.spreadA * d + MODEL.spreadB * d * Math.abs(d);
}
function predictMatchup(home, away, opts) {
	const h = toElo(home.hxRating);
	const a = toElo(away.hxRating);
	const hfa = opts?.neutral ? 0 : MODEL.homeFieldElo;
	const diff = h - a + hfa;
	const homeWinPct = 1 / (1 + 10 ** (-diff / MODEL.eloDenom));
	const spread = spreadFromDiff(diff);
	const tempo = 51.4 + (home.offenseRating + away.offenseRating - home.defenseRating - away.defenseRating) * .12;
	const total = Math.max(38, Math.min(78, tempo));
	const homeScore = total / 2 + spread / 2;
	const awayScore = total / 2 - spread / 2;
	return {
		homeWinPct,
		awayWinPct: 1 - homeWinPct,
		spread: Math.round(spread * 10) / 10,
		total: Math.round(total * 10) / 10,
		homeScore: Math.max(6, Math.round(homeScore)),
		awayScore: Math.max(6, Math.round(awayScore)),
		edge: Math.round(diff * 10) / 10
	};
}
/** Signed z-scores that actually enter the composite. */
function modelShare(team) {
	return {
		talent: team.zTalent,
		prior: team.zPrior,
		trend: team.zTrend,
		retention: team.zRetention,
		portal: team.zPortal
	};
}
//#endregion
export { toElo as i, modelShare as n, predictMatchup as r, MODEL as t };
