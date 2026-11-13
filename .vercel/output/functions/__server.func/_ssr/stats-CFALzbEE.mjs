//#region node_modules/.nitro/vite/services/ssr/assets/stats-CFALzbEE.js
/**
* /stats metric catalog and math (client-safe; no data import).
* Rows come from data/stats_2026.json via the getStatsTab server function (stats.server.ts).
* Box counting stats: cfbstats.com. Advanced: CollegeFootballData (CFBD) play-by-play.
*/
var STAT_TABS = [
	"teams",
	"qb",
	"rush",
	"rec"
];
var TAB_LABEL = {
	teams: "Teams",
	qb: "QBs",
	rush: "Rushers",
	rec: "Receivers"
};
var parseTab = (v) => STAT_TABS.includes(v) ? v : "teams";
var SOURCE_LABEL = {
	box: "cfbstats box",
	derived: "Derived from cfbstats box",
	"cfbd-adj": "CFBD, opponent-adjusted",
	cfbd: "CFBD play-by-play"
};
var m = (k, l, s, hi, d, g, src, def, signed = false) => ({
	k,
	l,
	s,
	hi,
	d,
	g,
	src,
	def,
	signed
});
var G_OFF = "Offense";
var G_DEF = "Defense";
var G_RATE = "Rates";
var G_EPA = "EPA (CFBD)";
var G_EFF = "Efficiency";
var METRICS = {
	teams: [
		m("nepa", "Net adjusted EPA per play", "Net EPA", true, 3, G_EPA, "cfbd-adj", "Offensive adjusted EPA/play minus defensive adjusted EPA/play allowed. EPA = expected points added: how much each play changed the expected points of the drive.", true),
		m("epa", "Offensive adjusted EPA per play", "Off EPA", true, 3, G_EPA, "cfbd-adj", "Average EPA per offensive play, adjusted for opposing defenses."),
		m("oepa", "Defensive adjusted EPA per play allowed", "Def EPA", false, 3, G_EPA, "cfbd-adj", "Average EPA per play allowed, adjusted for opposing offenses. Lower is better."),
		m("sr", "Offensive success rate", "Off SR %", true, 1, G_EPA, "cfbd-adj", "Share of plays that gain 50% of needed yards on 1st down, 70% on 2nd, 100% on 3rd/4th. Opponent-adjusted."),
		m("osr", "Defensive success rate allowed", "Def SR %", false, 1, G_EPA, "cfbd-adj", "Opponent success rate, adjusted for opposing offenses. Lower is better."),
		m("xpl", "Offensive explosiveness", "Off XPL", true, 3, G_EPA, "cfbd-adj", "Average EPA on successful plays: how big the good plays are. Opponent-adjusted."),
		m("oxpl", "Explosiveness allowed", "Def XPL", false, 3, G_EPA, "cfbd-adj", "Average EPA on opponents' successful plays. Lower is better."),
		m("repa", "Rushing adjusted EPA per play", "Rush EPA", true, 3, G_EPA, "cfbd-adj", "Offensive EPA per rush, opponent-adjusted."),
		m("pepa", "Passing adjusted EPA per play", "Pass EPA", true, 3, G_EPA, "cfbd-adj", "Offensive EPA per dropback, opponent-adjusted."),
		m("ly", "Offensive line yards", "Line Yds", true, 2, G_EPA, "cfbd-adj", "Rushing yards credited to the line: 0–4 yards full credit, 5–10 half, losses count 120%. Opponent-adjusted."),
		m("oly", "Line yards allowed", "Opp Line Yds", false, 2, G_EPA, "cfbd-adj", "Opponent line yards per carry. Lower is better."),
		m("hav", "Defensive havoc rate", "Havoc %", true, 1, G_EPA, "cfbd", "Share of defensive plays with a tackle for loss, forced fumble, interception, or pass breakup. Raw, not opponent-adjusted."),
		m("ohav", "Havoc allowed", "Havoc alw %", false, 1, G_EPA, "cfbd", "Share of offensive plays with a havoc event against. Lower is better."),
		m("ppg", "Points per game", "Pts/G", true, 1, G_OFF, "box", "Points scored divided by games."),
		m("ypg", "Total yards per game", "Yds/G", true, 1, G_OFF, "box", "Rush plus pass yards per game."),
		m("ypp", "Yards per play", "Yds/Play", true, 2, G_OFF, "box", "Total yards divided by offensive plays."),
		m("rypg", "Rush yards per game", "Rush/G", true, 1, G_OFF, "box", "Net rushing yards per game (NCAA counts sack yardage as rushing)."),
		m("pypg", "Pass yards per game", "Pass/G", true, 1, G_OFF, "box", "Passing yards per game."),
		m("c3", "3rd-down conversion %", "3rd %", true, 1, G_OFF, "box", "Third-down conversions divided by attempts."),
		m("rz", "Red-zone score %", "RZ %", true, 1, G_OFF, "box", "Red-zone trips ending in any score."),
		m("sa", "Sacks allowed", "Sacks alw", false, 0, G_OFF, "box", "Sacks taken by the offense, season total."),
		m("oppg", "Points allowed per game", "Opp Pts/G", false, 1, G_DEF, "box", "Opponent points divided by games."),
		m("oypg", "Yards allowed per game", "Opp Yds/G", false, 1, G_DEF, "box", "Opponent total yards per game."),
		m("oypp", "Yards per play allowed", "Opp Yds/Play", false, 2, G_DEF, "box", "Opponent total yards divided by opponent plays."),
		m("orypg", "Rush yards allowed per game", "Opp Rush/G", false, 1, G_DEF, "box", "Opponent rushing yards per game."),
		m("opypg", "Pass yards allowed per game", "Opp Pass/G", false, 1, G_DEF, "box", "Opponent passing yards per game."),
		m("oc3", "Opponent 3rd-down %", "Opp 3rd %", false, 1, G_DEF, "box", "Opponent third-down conversion rate."),
		m("sk", "Sacks", "Sacks", true, 0, G_DEF, "box", "Defensive sacks, season total."),
		m("tom", "Turnover margin", "TO +/-", true, 0, G_DEF, "box", "Takeaways minus giveaways.", true),
		m("pen", "Penalties per game", "Pen/G", false, 1, G_DEF, "box", "Accepted penalties against the team per game."),
		m("pd", "Point differential per game", "Pt Diff/G", true, 1, G_RATE, "derived", "(Points scored minus points allowed) / games.", true),
		m("yppm", "Yards-per-play margin", "YPP +/-", true, 2, G_RATE, "derived", "Yards per play minus yards per play allowed.", true),
		m("nypa", "Net yards per pass attempt", "Net Y/A", true, 2, G_RATE, "derived", "(Pass yards minus sack yards) / (attempts plus sacks)."),
		m("ypc", "Rush yards per carry", "Rush Y/C", true, 2, G_RATE, "derived", "Rushing yards / carries (sacks included per NCAA rules)."),
		m("oypc", "Rush yards per carry allowed", "Opp Y/C", false, 2, G_RATE, "derived", "Opponent rushing yards / opponent carries."),
		m("tdr", "Offensive TD rate", "TD/100 plays", true, 2, G_RATE, "derived", "Rushing plus passing TDs per 100 offensive plays.")
	],
	qb: [
		m("epa", "EPA per dropback", "EPA/Play", true, 3, G_EPA, "cfbd", "Average EPA on the player's passing plays. Raw, not opponent-adjusted."),
		m("tepa", "Total EPA", "Tot EPA", true, 1, G_EPA, "cfbd", "Season EPA on all the player's plays (pass and rush).", true),
		m("use", "Usage", "Usage %", true, 1, G_EPA, "cfbd", "Share of the team's offensive plays that involve the player."),
		m("att", "Pass attempts", "Att", true, 0, "Box", "box", "Passes thrown."),
		m("cmp", "Completion %", "Cmp %", true, 1, "Box", "box", "Completions divided by attempts."),
		m("yds", "Passing yards", "Yds", true, 0, "Box", "box", "Season passing yards."),
		m("td", "Passing TDs", "TD", true, 0, "Box", "box", "Touchdown passes."),
		m("int", "Interceptions", "INT", false, 0, "Box", "box", "Interceptions thrown."),
		m("ruy", "Rushing yards", "Rush Yds", true, 0, "Box", "box", "Net rushing yards (NCAA counts sack losses here)."),
		m("ypg", "Pass yards per game", "Yds/G", true, 1, G_EFF, "derived", "Passing yards / games played."),
		m("ypa", "Yards per attempt", "Y/A", true, 2, G_EFF, "derived", "Passing yards / attempts."),
		m("aya", "Adjusted yards per attempt", "AY/A", true, 2, G_EFF, "derived", "(Yards + 20×TD − 45×INT) / attempts."),
		m("tdp", "Touchdown %", "TD %", true, 2, G_EFF, "derived", "TD passes per 100 attempts."),
		m("intp", "Interception %", "INT %", false, 2, G_EFF, "derived", "Interceptions per 100 attempts."),
		m("eff", "NCAA passing efficiency", "NCAA Eff", true, 1, G_EFF, "derived", "(8.4×Yds + 330×TD + 100×Cmp − 200×INT) / Att.")
	],
	rush: [
		m("epa", "EPA per rush", "EPA/Rush", true, 3, G_EPA, "cfbd", "Average EPA on the player's carries. Raw, not opponent-adjusted."),
		m("tepa", "Total rushing EPA", "Tot EPA", true, 1, G_EPA, "cfbd", "Season EPA on the player's carries.", true),
		m("use", "Rush usage", "Usage %", true, 1, G_EPA, "cfbd", "Share of the team's rushes that are the player's."),
		m("att", "Carries", "Att", true, 0, "Box", "box", "Rushing attempts."),
		m("yds", "Rushing yards", "Yds", true, 0, "Box", "box", "Net rushing yards."),
		m("td", "Rushing TDs", "TD", true, 0, "Box", "box", "Rushing touchdowns."),
		m("ypc", "Yards per carry", "Y/C", true, 2, G_EFF, "derived", "Rushing yards / carries."),
		m("ypg", "Rush yards per game", "Yds/G", true, 1, G_EFF, "derived", "Rushing yards / games played."),
		m("tdr", "TD per 100 carries", "TD/100", true, 2, G_EFF, "derived", "Rushing TDs per 100 carries.")
	],
	rec: [
		m("epa", "EPA per target", "EPA/Tgt", true, 3, G_EPA, "cfbd", "Average EPA on passes thrown to the player. Raw, not opponent-adjusted."),
		m("tepa", "Total receiving EPA", "Tot EPA", true, 1, G_EPA, "cfbd", "Season EPA on passes thrown to the player.", true),
		m("use", "Target usage", "Usage %", true, 1, G_EPA, "cfbd", "Share of the team's passes thrown to the player."),
		m("rec", "Receptions", "Rec", true, 0, "Box", "box", "Catches."),
		m("yds", "Receiving yards", "Yds", true, 0, "Box", "box", "Receiving yards."),
		m("td", "Receiving TDs", "TD", true, 0, "Box", "box", "Receiving touchdowns."),
		m("ypr", "Yards per reception", "Y/R", true, 2, G_EFF, "derived", "Receiving yards / receptions."),
		m("ypg", "Receiving yards per game", "Yds/G", true, 1, G_EFF, "derived", "Receiving yards / games played."),
		m("tdr", "TD per 100 catches", "TD/100", true, 2, G_EFF, "derived", "Receiving TDs per 100 receptions.")
	]
};
var metricOf = (tab, k) => METRICS[tab].find((x) => x.k === k);
var n = (x) => typeof x === "number" && Number.isFinite(x) ? x : null;
/** Adds derived per-attempt values to a raw JSON row. Pure; used by the server function and tests. */
function deriveValues(tab, r) {
	const v = {};
	for (const mt of METRICS[tab]) v[mt.k] = n(r[mt.k]);
	const g = n(r.g) ?? 0;
	if (tab === "qb") {
		const att = n(r.att) ?? 0, yds = n(r.yds) ?? 0, td = n(r.td) ?? 0, it = n(r.int) ?? 0, cmp = (n(r.cmp) ?? 0) * att / 100;
		if (att > 0) Object.assign(v, {
			ypa: yds / att,
			aya: (yds + 20 * td - 45 * it) / att,
			tdp: 100 * td / att,
			intp: 100 * it / att,
			eff: (8.4 * yds + 330 * td + 100 * cmp - 200 * it) / att
		});
		v.ypg = g > 0 ? yds / g : null;
	} else if (tab === "rush") {
		const att = n(r.att) ?? 0, yds = n(r.yds) ?? 0, td = n(r.td) ?? 0;
		if (att > 0) Object.assign(v, {
			ypc: yds / att,
			tdr: 100 * td / att
		});
		v.ypg = g > 0 ? yds / g : null;
	} else if (tab === "rec") {
		const rec = n(r.rec) ?? 0, yds = n(r.yds) ?? 0, td = n(r.td) ?? 0;
		if (rec > 0) Object.assign(v, {
			ypr: yds / rec,
			tdr: 100 * td / rec
		});
		v.ypg = g > 0 ? yds / g : null;
	}
	return v;
}
/**
* Percentile and rank of one value inside a cohort (ties share the midpoint). Rows with a null value
* for the metric are left out of the cohort. P100 = best, P0 = worst.
*/
function standing(mt, val, cohort) {
	if (val == null) return null;
	const vals = cohort.filter((x) => x != null);
	const len = vals.length;
	if (!len) return null;
	const eps = 1e-9;
	const better = vals.filter((x) => mt.hi ? x > val + eps : x < val - eps).length;
	const mid = better + (Math.max(1, vals.filter((x) => Math.abs(x - val) <= eps).length) + 1) / 2;
	return {
		p: len > 1 ? Math.max(0, Math.min(100, 100 * (len - mid) / (len - 1))) : 100,
		rank: better + 1,
		n: len
	};
}
function fmtStat(mt, x) {
	if (x == null || !Number.isFinite(x)) return "—";
	const s = x.toFixed(mt.d);
	return mt.signed && x > 0 ? `+${s}` : s;
}
/** Sort rows by a metric, best first; nulls last. */
function sortRows(rows, mt, dir = "best") {
	const sign = (mt.hi ? -1 : 1) * (dir === "best" ? 1 : -1);
	return [...rows].sort((a, b) => {
		const x = a.v[mt.k], y = b.v[mt.k];
		if (x == null && y == null) return a.name.localeCompare(b.name);
		if (x == null) return 1;
		if (y == null) return -1;
		return sign * (x - y) || a.name.localeCompare(b.name);
	});
}
/** Team-page advanced block: the CFBD metrics with FBS rank. */
var TEAM_ADVANCED_KEYS = [
	"nepa",
	"epa",
	"oepa",
	"sr",
	"osr",
	"xpl",
	"oxpl",
	"ly",
	"oly",
	"hav",
	"ohav"
];
var groupCols = (tab, g) => METRICS[tab].filter((x) => x.g === g).map((x) => x.k);
var allCols = (tab) => METRICS[tab].map((x) => x.k);
var COLUMN_SETS = {
	teams: [
		{
			key: "overview",
			label: "Overview",
			cols: [
				"nepa",
				"epa",
				"oepa",
				"sr",
				"osr",
				"pd",
				"ppg",
				"oppg",
				"ypp",
				"oypp",
				"tom",
				"hav"
			]
		},
		{
			key: "epa",
			label: "EPA & efficiency",
			cols: groupCols("teams", G_EPA)
		},
		{
			key: "offense",
			label: "Offense box",
			cols: groupCols("teams", G_OFF)
		},
		{
			key: "defense",
			label: "Defense box",
			cols: groupCols("teams", G_DEF)
		},
		{
			key: "rates",
			label: "Rates",
			cols: groupCols("teams", G_RATE)
		}
	],
	qb: [
		{
			key: "all",
			label: "All columns",
			cols: allCols("qb")
		},
		{
			key: "epa",
			label: "EPA & usage",
			cols: groupCols("qb", G_EPA)
		},
		{
			key: "box",
			label: "Box",
			cols: groupCols("qb", "Box")
		},
		{
			key: "eff",
			label: "Efficiency",
			cols: groupCols("qb", G_EFF)
		}
	],
	rush: [
		{
			key: "all",
			label: "All columns",
			cols: allCols("rush")
		},
		{
			key: "epa",
			label: "EPA & usage",
			cols: groupCols("rush", G_EPA)
		},
		{
			key: "box",
			label: "Box",
			cols: groupCols("rush", "Box")
		},
		{
			key: "eff",
			label: "Efficiency",
			cols: groupCols("rush", G_EFF)
		}
	],
	rec: [
		{
			key: "all",
			label: "All columns",
			cols: allCols("rec")
		},
		{
			key: "epa",
			label: "EPA & usage",
			cols: groupCols("rec", G_EPA)
		},
		{
			key: "box",
			label: "Box",
			cols: groupCols("rec", "Box")
		},
		{
			key: "eff",
			label: "Efficiency",
			cols: groupCols("rec", G_EFF)
		}
	]
};
var columnSet = (tab, key) => COLUMN_SETS[tab].find((s) => s.key === key) ?? COLUMN_SETS[tab][0];
var QUICK_VIEWS = {
	teams: [
		{
			label: "Best overall",
			group: "overview",
			sort: "nepa"
		},
		{
			label: "Best offenses",
			group: "epa",
			sort: "epa"
		},
		{
			label: "Best defenses",
			group: "epa",
			sort: "oepa"
		},
		{
			label: "Most explosive",
			group: "epa",
			sort: "xpl"
		},
		{
			label: "Havoc defenses",
			group: "epa",
			sort: "hav"
		},
		{
			label: "Turnover margin",
			group: "overview",
			sort: "tom"
		}
	],
	qb: [
		{
			label: "Most efficient",
			group: "all",
			sort: "epa"
		},
		{
			label: "Most total EPA",
			group: "all",
			sort: "tepa"
		},
		{
			label: "Passing yards",
			group: "all",
			sort: "yds"
		},
		{
			label: "NCAA efficiency",
			group: "all",
			sort: "eff"
		}
	],
	rush: [
		{
			label: "Most efficient",
			group: "all",
			sort: "epa"
		},
		{
			label: "Rushing yards",
			group: "all",
			sort: "yds"
		},
		{
			label: "Yards per carry",
			group: "all",
			sort: "ypc"
		},
		{
			label: "Workload",
			group: "all",
			sort: "use"
		}
	],
	rec: [
		{
			label: "Most efficient",
			group: "all",
			sort: "epa"
		},
		{
			label: "Receiving yards",
			group: "all",
			sort: "yds"
		},
		{
			label: "Target share",
			group: "all",
			sort: "use"
		},
		{
			label: "Yards per catch",
			group: "all",
			sort: "ypr"
		}
	]
};
/**
* Percentile (0–100, 100 = best) of every row for one metric inside a pool, keyed by row id.
* Used to shade table cells; same tie rule as `standing`.
*/
function percentileMap(rows, mt) {
	const vals = rows.map((r) => r.v[mt.k]);
	const out = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const s = standing(mt, r.v[mt.k], vals);
		if (s && s.n > 1) out.set(r.id, s.p);
	}
	return out;
}
//#endregion
export { STAT_TABS as a, columnSet as c, metricOf as d, parseTab as f, standing as h, SOURCE_LABEL as i, deriveValues as l, sortRows as m, METRICS as n, TAB_LABEL as o, percentileMap as p, QUICK_VIEWS as r, TEAM_ADVANCED_KEYS as s, COLUMN_SETS as t, fmtStat as u };
