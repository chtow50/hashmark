//#region node_modules/.nitro/vite/services/ssr/assets/coordinators-rOHwFHgg.js
var UNITS = ["off", "def"];
var UNIT_LABEL = {
	off: "Offenses · OCs",
	def: "Defenses · DCs"
};
var UNIT_SHORT = {
	off: "OC",
	def: "DC"
};
var UNIT_SIDE = {
	off: "offense",
	def: "defense"
};
var VIEWS = {
	"2026": {
		label: "2026 season",
		from: 2026,
		to: 2026,
		min: 1
	},
	"3y": {
		label: "3-year average (2024–26)",
		from: 2024,
		to: 2026,
		min: 2
	}
};
var DEFAULT_VIEW = "2026";
var parseView = (v) => v === "3y" ? "3y" : DEFAULT_VIEW;
var parseUnit = (v) => v === "def" ? "def" : "off";
var LABEL_TEXT = {
	sole: "",
	"with-co": "Plus co-coordinator",
	co: "Co-coordinators",
	"hc-title": "Head coach holds the title",
	"hc-calls": "Head coach calls plays",
	interim: "Interim",
	unverified: "Coordinator unverified"
};
/** 2026 board columns. `delta` = change in adj EPA/play vs the same unit in 2025. `talent` = 247 roster talent rank. */
var COLS_2026 = [
	"epa",
	"sr",
	"xpl",
	"ppg",
	"delta",
	"talent"
];
var COLS_3Y = [
	"epa",
	"sr",
	"xpl",
	"rank",
	"n"
];
var ALL_COLS = [
	"epa",
	"sr",
	"xpl",
	"ppg",
	"delta",
	"talent",
	"rank",
	"n"
];
var colsFor = (v) => v === "2026" ? COLS_2026 : COLS_3Y;
var parseCoordSort = (v, view = DEFAULT_VIEW) => ALL_COLS.includes(v) && colsFor(view).includes(v) ? v : "epa";
var parseCoordDir = (v) => v === "worst" ? "worst" : "best";
var COL_META = {
	epa: {
		s: "Adj EPA/play",
		l: "Opponent-adjusted EPA per play",
		def: "HASHMARK ridge model, same as /stats, FBS-vs-FBS games. The ranking stat.",
		digits: 3
	},
	sr: {
		s: "Success %",
		l: "Opponent-adjusted success rate",
		def: "Share of plays that gain 50% of needed yards on 1st down, 70% on 2nd, 100% on 3rd/4th.",
		digits: 1
	},
	xpl: {
		s: "Explosiveness",
		l: "Opponent-adjusted explosiveness",
		def: "Average EPA on successful plays: how big the good plays are.",
		digits: 3
	},
	ppg: {
		s: "Pts/game",
		l: "Points per game",
		def: "Offense: points scored per game. Defense: points allowed per game. All games, not opponent-adjusted.",
		digits: 1
	},
	delta: {
		s: "vs 2025",
		l: "Change in adj EPA/play vs the same unit in 2025",
		def: "This season minus last season for this school's unit (positive = better for offense; for defense, negative = fewer EPA allowed = better). For a first-year coordinator it is the change from the unit he inherited.",
		digits: 3
	},
	talent: {
		s: "Talent rank",
		l: "247 roster talent rank (2026)",
		def: "247Sports Team Talent Composite rank among FBS teams: what the unit had to work with. Context only.",
		digits: 0
	},
	rank: {
		s: "Avg FBS rank",
		l: "Average FBS rank (adj EPA/play)",
		def: "The unit's FBS rank on adjusted EPA/play each credited season, averaged.",
		digits: 1
	},
	n: {
		s: "Seasons",
		l: "Credited seasons, 2024–26",
		def: "Seasons where that year's official staff page lists him holding the full coordinator title on that side (a co-coordinator may also be listed).",
		digits: 0
	}
};
/** True when a higher value is better for this unit and column. */
function higherIsBetter(unit, col) {
	if (col === "n") return true;
	if (col === "rank" || col === "talent") return false;
	return unit === "off";
}
var mean = (xs) => {
	const v = xs.filter((x) => typeof x === "number" && Number.isFinite(x));
	return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};
/** Compare rows on a column, best first; adjusted EPA then a label as tie-breaks. Missing values sort last. */
function cmp(unit, col) {
	return (a, b) => {
		for (const k of [col, "epa"]) {
			const x = a.v[k], y = b.v[k];
			if (x == null && y == null) continue;
			if (x == null) return 1;
			if (y == null) return -1;
			if (x !== y) return higherIsBetter(unit, k) ? y - x : x - y;
		}
		return a.key.localeCompare(b.key);
	};
}
/** `rank` is the standing on adjusted EPA/play and does not change with the sort; `dir` flips the order. */
function rankAndSort(rows, unit, sort, dir) {
	[...rows].sort(cmp(unit, "epa")).forEach((r, i) => r.rank = r.v.epa == null ? 0 : i + 1);
	const sorted = [...rows].sort(cmp(unit, sort));
	return dir === "worst" ? sorted.reverse() : sorted;
}
function buildBoard2026(units, live, prior, talent, unit, sort = "epa", dir = "best") {
	return rankAndSort(units.filter((u) => u.unit === unit).map((u) => {
		const l = live[`${u.unit}|${u.team}`] ?? null;
		const p = prior[u.team]?.[u.unit]?.epa;
		const delta = l?.epa != null && p != null ? l.epa - p : null;
		const t = talent[u.team] ?? null;
		return {
			u,
			live: l,
			talent: t,
			key: `${u.team}`,
			rank: 0,
			v: {
				epa: l?.epa ?? null,
				sr: l?.sr ?? null,
				xpl: l?.xpl ?? null,
				ppg: l?.ppg ?? null,
				delta,
				talent: t
			}
		};
	}), unit, sort, dir);
}
/** Seasons that count for the 3-year view (credited, with numbers, inside 2024–26). */
function creditedSeasons(c) {
	return c.history.filter((h) => h.status === "credited" && h.stats != null && h.stats.epa != null && h.season >= VIEWS["3y"].from && h.season <= VIEWS["3y"].to);
}
var qualifies3y = (c) => creditedSeasons(c).length >= VIEWS["3y"].min;
/** Equal-weight mean over credited seasons. */
function summarize3y(c) {
	const s = creditedSeasons(c).map((h) => h.stats);
	return {
		epa: mean(s.map((x) => x.epa)),
		sr: mean(s.map((x) => x.sr)),
		xpl: mean(s.map((x) => x.xpl)),
		rank: mean(s.map((x) => x.rank)),
		n: s.length
	};
}
function buildBoard3y(coaches, unit, sort = "epa", dir = "best") {
	return rankAndSort(coaches.filter((c) => c.unit === unit && qualifies3y(c)).map((coach) => ({
		coach,
		v: summarize3y(coach),
		key: coach.name,
		rank: 0
	})), unit, sort, dir);
}
/** Label counts for the 2026 board (one per unit). */
function labelCounts(units, unit) {
	const out = {
		sole: 0,
		"with-co": 0,
		co: 0,
		"hc-title": 0,
		"hc-calls": 0,
		interim: 0,
		unverified: 0
	};
	for (const u of units) if (u.unit === unit) out[u.label] += 1;
	return out;
}
function fmtCol(col, v) {
	if (v == null || !Number.isFinite(v)) return "—";
	const d = COL_META[col].digits;
	const s = v.toFixed(d);
	if (col === "talent") return `#${s}`;
	return (col === "epa" || col === "delta") && v > 0 ? `+${s}` : s.replace("-", "−");
}
var coordSearch = (view, unit, sort, dir) => ({
	view: view === "2026" ? void 0 : view,
	unit: unit === "off" ? void 0 : unit,
	sort: sort === "epa" ? void 0 : sort,
	dir: dir === "best" ? void 0 : dir
});
/** "Who runs it" line for a 2026 unit. */
function whoLine(u) {
	if (!u.coaches.length) return "No coordinator listed";
	if (u.label === "with-co") return u.coaches[0].name;
	return u.coaches.map((c) => c.name).join(" & ");
}
function teamCoordinators(units, prior, coaches, live, slug) {
	return UNITS.map((unit) => {
		const u = units.find((x) => x.team === slug && x.unit === unit) ?? null;
		const l = live[`${unit}|${slug}`] ?? null;
		const p = prior[slug]?.[unit] ?? null;
		const delta = l?.epa != null && p?.epa != null ? l.epa - p.epa : null;
		const board = buildBoard3y(coaches, unit);
		const recs = coaches.filter((c) => c.team === slug && c.unit === unit);
		const order = (c) => {
			const i = u?.coaches.findIndex((x) => x.name === c.name) ?? -1;
			return i < 0 ? 99 : i;
		};
		return {
			unit,
			u,
			live: l,
			prior: p,
			delta,
			coaches: [...recs].sort((a, b) => order(a) - order(b) || a.name.localeCompare(b.name)).map((coach) => {
				const r = board.find((b) => b.coach.name === coach.name && b.coach.team === coach.team);
				return {
					coach,
					board3y: r ? {
						rank: r.rank,
						n: board.length,
						v: r.v
					} : null
				};
			})
		};
	});
}
//#endregion
export { parseView as _, UNIT_SIDE as a, whoLine as b, buildBoard3y as c, fmtCol as d, higherIsBetter as f, parseUnit as g, parseCoordSort as h, UNIT_SHORT as i, colsFor as l, parseCoordDir as m, LABEL_TEXT as n, VIEWS as o, labelCounts as p, UNIT_LABEL as r, buildBoard2026 as s, COL_META as t, coordSearch as u, qualifies3y as v, teamCoordinators as y };
