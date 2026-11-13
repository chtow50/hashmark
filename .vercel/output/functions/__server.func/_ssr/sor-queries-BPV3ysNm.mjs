import { i as toElo, t as MODEL } from "./model-C--_NYY0.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-CvLYD4PV.mjs";
import { r as fcsStubIsFinal, t as FCS_STUB_GAMES } from "./fcs-stubs-BauL-2kD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sor-queries-BPV3ysNm.js
/**
* Strength of Record (SOR) and strength of schedule (SOS), from current HX and the actual
* schedule. Pure; the server function feeds it games, FCS stubs, and the board.
*
* - SOS (played / remaining): average current HX of FBS opponents. FCS opponents are counted
*   but have no HX, so they sit outside the average.
* - Benchmark: the current No. 25 team on the HX board.
* - SOR = actual wins − the benchmark's expected wins on the same games at the same sites
*   (Elo = 1500 + 55·HX, 60 home field, P = 1/(1+10^(−d/400))). FCS games use the season sim's
*   fixed rule for the benchmark: 0.92 home, 0.88 away, 0.90 neutral.
* Positive SOR = a better record than a typical top-25 team would have against that schedule.
*/
var FCS_BENCH_P = {
	home: .92,
	away: .88,
	neutral: .9
};
function pWin(hxA, hxB, site) {
	const hfa = site === "home" ? MODEL.homeFieldElo : site === "away" ? -MODEL.homeFieldElo : 0;
	return 1 / (1 + 10 ** (-(toElo(hxA) - toElo(hxB) + hfa) / MODEL.eloDenom));
}
var mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
/** Rank 1 = highest value; ties share the best rank; nulls get null. */
function rankDesc(rows, get) {
	const vals = rows.map((r) => [r.slug, get(r)]).filter((x) => x[1] != null);
	const out = /* @__PURE__ */ new Map();
	for (const [slug, v] of vals) out.set(slug, 1 + vals.filter(([, x]) => x > v + 1e-9).length);
	return out;
}
function computeSor(hx, games, fcs, benchHx) {
	const acc = /* @__PURE__ */ new Map();
	const get = (s) => {
		let a = acc.get(s);
		if (!a) acc.set(s, a = {
			w: 0,
			l: 0,
			opp: [],
			rem: [],
			bench: 0,
			fcsP: 0,
			fcsR: 0
		});
		return a;
	};
	for (const s of Object.keys(hx)) get(s);
	for (const g of games) {
		if (hx[g.home] == null || hx[g.away] == null) continue;
		for (const [me, opp, site] of [[
			g.home,
			g.away,
			g.neutral ? "neutral" : "home"
		], [
			g.away,
			g.home,
			g.neutral ? "neutral" : "away"
		]]) {
			const a = get(me);
			if (g.final && g.winner) {
				if (g.winner === me) a.w++;
				else a.l++;
				a.opp.push(hx[opp]);
				a.bench += pWin(benchHx, hx[opp], site);
			} else if (!g.final) a.rem.push(hx[opp]);
		}
	}
	for (const f of fcs) {
		if (hx[f.team] == null) continue;
		const a = get(f.team);
		if (f.final && f.won != null) {
			if (f.won) a.w++;
			else a.l++;
			a.fcsP++;
			a.bench += FCS_BENCH_P[f.site];
		} else if (!f.final) a.fcsR++;
	}
	const rows = [...acc.entries()].map(([slug, a]) => ({
		slug,
		w: a.w,
		l: a.l,
		sosPlayed: mean(a.opp),
		sosRemaining: mean(a.rem),
		fbsPlayed: a.opp.length,
		fbsRemaining: a.rem.length,
		fcsPlayed: a.fcsP,
		fcsRemaining: a.fcsR,
		benchW: a.bench,
		sor: a.w - a.bench,
		sorRank: 0,
		sosPlayedRank: null,
		sosRemainingRank: null
	}));
	const sorR = rankDesc(rows, (r) => r.sor);
	const spR = rankDesc(rows, (r) => r.sosPlayed);
	const srR = rankDesc(rows, (r) => r.sosRemaining);
	for (const r of rows) {
		r.sorRank = sorR.get(r.slug);
		r.sosPlayedRank = spR.get(r.slug) ?? null;
		r.sosRemainingRank = srR.get(r.slug) ?? null;
	}
	return rows.sort((a, b) => a.sorRank - b.sorRank || a.slug.localeCompare(b.slug));
}
var getSorBoard_createServerFn_handler = createServerRpc({
	id: "8fc30d569d06734d70bec6e4323a3edfbaefd8eb191dde667d76927e807531ee",
	name: "getSorBoard",
	filename: "src/lib/cfb/sor-queries.ts"
}, (opts) => getSorBoard.__executeServer(opts));
var getSorBoard = createServerFn({ method: "GET" }).handler(getSorBoard_createServerFn_handler, async () => {
	const sql = await getSql();
	const board = await sql.query(`select t.slug, r.hx_rating as hx, r.hx_rank as rank
     from teams t join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0`);
	const games = await sql.query(`select ht.slug as home, at.slug as away, g.neutral, g.status, g.home_score as hs, g.away_score as "as"
     from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id`);
	const hx = Object.fromEntries(board.map((b) => [b.slug, Number(b.hx)]));
	const bench = [...board].sort((a, b) => a.rank - b.rank)[24];
	return {
		rows: computeSor(hx, games.map((g) => {
			const final = g.status === "final" && g.hs != null && g.as != null;
			return {
				home: g.home,
				away: g.away,
				neutral: Boolean(g.neutral),
				final,
				winner: final ? g.hs > g.as ? g.home : g.away : null
			};
		}), FCS_STUB_GAMES.map((s) => {
			const final = fcsStubIsFinal(s);
			const mine = s.home ? s.homeScore : s.awayScore;
			const theirs = s.home ? s.awayScore : s.homeScore;
			return {
				team: s.teamSlug,
				site: s.home ? "home" : "away",
				final,
				won: final ? mine > theirs : null
			};
		}), Number(bench.hx)),
		benchSlug: bench.slug,
		benchHx: Number(bench.hx)
	};
});
//#endregion
export { getSorBoard_createServerFn_handler };
