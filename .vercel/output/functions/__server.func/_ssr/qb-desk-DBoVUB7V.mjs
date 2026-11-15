import { m as metricOf, p as isQualified, u as deriveValues, y as standing } from "./stats-Btq-9QFw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qb-desk-DBoVUB7V.js
/**
* HASHMARK QB Desk (client-safe math and types; no data import).
* One QB: last game, season before vs after it, rank moves among qualified QBs, a conference chart,
* and game-by-game EPA. Data: data/qb_desk_2026.json (scripts/build-qb-desk-data.mjs) plus the /stats QB rows.
*/
var P4_CONFS = /* @__PURE__ */ new Set([
	"SEC",
	"Big Ten",
	"Big 12",
	"ACC"
]);
var G5_CONFS = /* @__PURE__ */ new Set([
	"American",
	"Sun Belt",
	"MAC",
	"CUSA",
	"Mountain West",
	"Pac-12"
]);
/** Metrics shown in the before/after and rank tables, in order. */
var DESK_KEYS = [
	"epa",
	"tepa",
	"eff",
	"ypa",
	"aya",
	"cmp",
	"tdp",
	"intp"
];
/** Metrics the conference chart can plot. */
var CHART_KEYS = [
	"epa",
	"tepa",
	"eff",
	"ypa"
];
var deskMetric = (k) => metricOf("qb", k);
/** Pools a QB is ranked in: own conference (if it has 4+ qualified QBs), P4 or G5, then FBS. */
function poolsFor(conference) {
	const out = [];
	if (conference && conference !== "Independent") out.push({
		label: conference,
		test: (c) => c === conference
	});
	if (P4_CONFS.has(conference)) out.push({
		label: "P4",
		test: (c) => P4_CONFS.has(c)
	});
	else if (G5_CONFS.has(conference)) out.push({
		label: "G5",
		test: (c) => G5_CONFS.has(c)
	});
	out.push({
		label: "FBS",
		test: () => true
	});
	return out;
}
var pickVals = (v) => Object.fromEntries(DESK_KEYS.map((k) => [k, v[k] ?? null]));
/**
* Builds the desk for one QB. `rows` are the /stats QB rows (current season, with team info);
* `raw` is that QB's raw season row from data/stats_2026.json; `entry` its desk-file entry.
* Ranks: the QB's before and after values against every other qualified QB in the pool at their
* current numbers, so the move isolates what this one game did.
*/
function buildDesk(args) {
	const { file, entry, row, raw, rows, keyOf, teamShort, gameKeyOf } = args;
	const qualified = rows.filter((r) => isQualified("qb", r));
	const games = entry.games.map((g) => ({
		...g,
		result: g.pf > g.pa ? "W" : g.pf < g.pa ? "L" : "T",
		gameKey: gameKeyOf(g, row.slug),
		oppShort: teamShort(g.opp, g.opp_name)
	}));
	const last = games.at(-1) ?? null;
	const cmpN = Math.round(raw.cmp * raw.att / 100);
	const after = {
		g: raw.g,
		att: raw.att,
		cmp: cmpN,
		yds: raw.yds,
		td: raw.td,
		int: raw.int,
		ruy: raw.ruy
	};
	const before = last && raw.att - last.a > 0 ? {
		g: raw.g - 1,
		att: raw.att - last.a,
		cmp: cmpN - last.c,
		yds: raw.yds - last.y,
		td: raw.td - last.td,
		int: raw.int - last.i,
		ruy: raw.ruy - last.ry
	} : null;
	const afterV = pickVals(row.v);
	const beforeV = before ? pickVals(deriveValues("qb", {
		...before,
		cmp: 100 * before.cmp / before.att,
		epa: entry.prev?.epa ?? null,
		tepa: entry.prev?.tepa ?? null
	})) : null;
	const epaBeforeNote = !before ? null : entry.prev ? null : `EPA before this game needs a stats build from just before it. Ours is from ${file.meta.before_as_of}, and this game was not the only one played after that, so the before EPA is left blank.`;
	const pools = poolsFor(row.conference).map((p) => {
		const others = qualified.filter((r) => r.id !== row.id && p.test(r.conference));
		const ranks = Object.fromEntries(DESK_KEYS.map((k) => {
			const mt = deskMetric(k);
			const vals = others.map((r) => r.v[k]);
			const s = (x) => {
				const st = standing(mt, x, [...vals, x]);
				return st ? {
					rank: st.rank,
					n: st.n
				} : null;
			};
			return [k, {
				before: beforeV ? s(beforeV[k]) : null,
				after: s(afterV[k])
			}];
		}));
		return {
			label: p.label,
			n: others.length + 1,
			ranks
		};
	});
	const confLabel = row.conference && row.conference !== "Independent" ? row.conference : "FBS independents";
	const confRows = qualified.filter((r) => r.conference === row.conference || r.id === row.id).map((r) => ({
		key: keyOf(r),
		name: r.name,
		team: r.team,
		slug: r.slug,
		color: r.color,
		v: Object.fromEntries(CHART_KEYS.map((k) => [k, r.v[k] ?? null]))
	}));
	return {
		asOf: file.meta.as_of,
		beforeAsOf: file.meta.before_as_of,
		options: qualified.map((r) => ({
			key: keyOf(r),
			name: r.name,
			team: r.team,
			conference: r.conference
		})).sort((a, b) => a.name.localeCompare(b.name)),
		qb: {
			key: entry.key,
			name: row.name,
			slug: row.slug,
			team: row.team,
			conference: row.conference,
			color: row.color
		},
		last,
		line: {
			before,
			after
		},
		values: {
			before: beforeV,
			after: afterV
		},
		epaBeforeNote,
		pools,
		conf: {
			label: confLabel,
			rows: confRows
		},
		games
	};
}
//#endregion
export { deskMetric as i, DESK_KEYS as n, buildDesk as r, CHART_KEYS as t };
