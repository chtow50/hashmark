//#region ../hashmark-repo/node_modules/.nitro/vite/services/ssr/assets/qb-leaders-ClQAW6us.js
/**
* /stats metric catalog and math (client-safe; no data import).
* Rows come from data/stats_2026.json via the getStatsTab server function (stats.server.ts).
* Box counting stats: cfbstats.com. Advanced: CollegeFootballData (CFBD) play-by-play.
*/
var STAT_TABS = [
	"teams",
	"qb",
	"rush",
	"rec",
	"def"
];
var TAB_LABEL = {
	teams: "Teams",
	qb: "QBs",
	rush: "Rushers",
	rec: "Receivers",
	def: "Defenders"
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
var G_TKL = "Tackles";
var G_PLAYS = "Plays on the ball";
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
	],
	def: [
		m("tot", "Total tackles", "Tkl", true, 0, G_TKL, "box", "Solo plus assisted tackles."),
		m("solo", "Solo tackles", "Solo", true, 0, G_TKL, "box", "Tackles made alone."),
		m("tpg", "Tackles per game", "Tkl/G", true, 1, G_TKL, "derived", "Total tackles / games played."),
		m("tfl", "Tackles for loss", "TFL", true, 1, G_PLAYS, "box", "Tackles behind the line of scrimmage, sacks included. Half credit for shared stops."),
		m("sk", "Sacks", "Sacks", true, 1, G_PLAYS, "box", "Quarterback sacks. Half credit for shared sacks."),
		m("qbh", "QB hurries", "Hurries", true, 0, G_PLAYS, "box", "Pressures that hurried the throw, as charted in the official box."),
		m("int", "Interceptions", "INT", true, 0, G_PLAYS, "box", "Passes intercepted."),
		m("pbu", "Passes broken up", "PBU", true, 0, G_PLAYS, "box", "Passes defended without an interception."),
		m("ff", "Forced fumbles", "FF", true, 0, G_PLAYS, "box", "Fumbles forced."),
		m("hp", "Havoc plays", "Havoc", true, 1, G_PLAYS, "derived", "TFL + INT + PBU + forced fumbles. Sacks are already inside TFL, so they are not counted twice."),
		m("hpg", "Havoc plays per game", "Havoc/G", true, 2, G_PLAYS, "derived", "Havoc plays / games played.")
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
	} else if (tab === "def") {
		const tot = n(r.tot), tfl = n(r.tfl) ?? 0, it = n(r.int) ?? 0, pbu = n(r.pbu) ?? 0, ff = n(r.ff) ?? 0;
		v.tpg = g > 0 && tot != null ? tot / g : null;
		v.hp = tfl + it + pbu + ff;
		v.hpg = g > 0 ? v.hp / g : null;
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
/**
* Leaderboard qualifiers, NCAA style: volume per team game. The data file carries everyone at
* `floor`; /stats shows qualified players by default and `floor` when "Show all" is on.
* Defense keeps its fixed pool (no per-game qualifier).
*/
var QUALIFY = {
	qb: {
		perGame: 10,
		floor: 50,
		unit: "pass attempts"
	},
	rush: {
		perGame: 6,
		floor: 40,
		unit: "carries"
	},
	rec: {
		perGame: 2.5,
		floor: 15,
		unit: "receptions"
	}
};
function isQualified(tab, r) {
	const q = QUALIFY[tab];
	if (!q) return true;
	return (r.vol ?? 0) >= q.perGame * (r.teamG ?? 0);
}
/** Cutoff line shown on the page. */
function qualifierText(tab, all) {
	const q = QUALIFY[tab];
	if (!q) return null;
	return all ? `${q.floor}+ ${q.unit}` : `qualified: ${q.perGame}+ ${q.unit} per team game`;
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
	],
	def: [
		{
			key: "all",
			label: "All columns",
			cols: allCols("def")
		},
		{
			key: "tackles",
			label: "Tackles",
			cols: groupCols("def", G_TKL)
		},
		{
			key: "plays",
			label: "Plays on the ball",
			cols: groupCols("def", G_PLAYS)
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
	],
	def: [
		{
			label: "Havoc plays",
			group: "all",
			sort: "hp"
		},
		{
			label: "Sacks",
			group: "all",
			sort: "sk"
		},
		{
			label: "Tackles for loss",
			group: "all",
			sort: "tfl"
		},
		{
			label: "Tackles",
			group: "all",
			sort: "tot"
		},
		{
			label: "Interceptions",
			group: "all",
			sort: "int"
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
/**
* Matchup unit-vs-unit pairings: one offense stat against the matching defense stat.
* Each side is placed as an FBS percentile (100 = best offense, or best defense), so the two
* numbers share a scale. The edge is the gap; under EDGE_EVEN points it reads "even".
* Stats only: the HX line stays the prediction.
*/
var UNIT_PAIRS = [
	{
		key: "epa",
		label: "EPA per play",
		off: "epa",
		def: "oepa"
	},
	{
		key: "sr",
		label: "Success rate",
		off: "sr",
		def: "osr"
	},
	{
		key: "xpl",
		label: "Explosiveness",
		off: "xpl",
		def: "oxpl"
	},
	{
		key: "ly",
		label: "Line yards (run blocking)",
		off: "ly",
		def: "oly"
	},
	{
		key: "ypc",
		label: "Rushing (yards per carry)",
		off: "ypc",
		def: "oypc"
	},
	{
		key: "ypp",
		label: "Yards per play",
		off: "ypp",
		def: "oypp"
	},
	{
		key: "c3",
		label: "3rd down",
		off: "c3",
		def: "oc3"
	},
	{
		key: "hav",
		label: "Havoc (offense allowed vs defense made)",
		off: "ohav",
		def: "hav"
	}
];
/** Pairs for one offense (team a) against one defense (team b). Pure. */
function unitEdges(a, b, all) {
	return UNIT_PAIRS.map((pr) => {
		const om = metricOf("teams", pr.off);
		const dm = metricOf("teams", pr.def);
		const os = standing(om, a[pr.off] ?? null, all.map((v) => v[pr.off] ?? null));
		const ds = standing(dm, b[pr.def] ?? null, all.map((v) => v[pr.def] ?? null));
		return {
			key: pr.key,
			label: pr.label,
			offK: pr.off,
			defK: pr.def,
			offVal: a[pr.off] ?? null,
			defVal: b[pr.def] ?? null,
			offP: os?.p ?? null,
			defP: ds?.p ?? null
		};
	});
}
function edgeCall(e) {
	if (e.offP == null || e.defP == null) return null;
	const d = e.offP - e.defP;
	return Math.abs(d) < 10 ? "even" : d > 0 ? "offense" : "defense";
}
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
	const { file, entry, row, raw, rows, keyOf, teamShort, teamName, gameKeyOf } = args;
	const qualified = rows.filter((r) => isQualified("qb", r));
	const games = entry.games.map((g) => ({
		...g,
		opp_name: teamName(g.opp, g.opp_name),
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
/**
* QB stat leaderboard (client-safe; no data import). Qualified FBS QBs from the /stats QB board,
* sorted by one real stat (default: total EPA). Every other column shows the stat and its FBS rank among
* the same qualified QBs. Team record and HX rank are context only. Not a rating, not a Heisman prediction.
*/
/** Columns shown for every QB, each with its FBS rank. Any column can be the sort. */
var LEADER_COLS = [
	"tepa",
	"epa",
	"eff",
	"ypa",
	"cmp",
	"yds",
	"td",
	"int",
	"ruy"
];
var LEADER_SORTS = LEADER_COLS;
var DEFAULT_LEADER_SORT = "tepa";
var parseLeaderSort = (v) => LEADER_SORTS.includes(v) ? v : DEFAULT_LEADER_SORT;
var DEFAULT_LEADER_DIR = "best";
var parseLeaderDir = (v) => v === "worst" ? "worst" : DEFAULT_LEADER_DIR;
/** Broad pool pills (All FBS / Power 4 / Group of 5). */
var LEADER_POOLS = [
	"fbs",
	"p4",
	"g5"
];
/** Per-conference scopes, P4 then independents then G5, matching /stats. */
var LEADER_CONFS = [
	"sec",
	"big-ten",
	"acc",
	"big-12",
	"independent",
	"american",
	"sun-belt",
	"mac",
	"cusa",
	"mountain-west",
	"pac-12"
];
var SCOPE_LABEL = {
	fbs: "All FBS",
	p4: "Power 4",
	g5: "Group of 5",
	sec: "SEC",
	"big-ten": "Big Ten",
	acc: "ACC",
	"big-12": "Big 12",
	independent: "Independents",
	american: "American",
	"sun-belt": "Sun Belt",
	mac: "MAC",
	cusa: "CUSA",
	"mountain-west": "Mountain West",
	"pac-12": "Pac-12"
};
/** Teams-table conference name for a per-conference scope; null for All / P4 / G5. */
var SCOPE_CONF = {
	fbs: null,
	p4: null,
	g5: null,
	sec: "SEC",
	"big-ten": "Big Ten",
	acc: "ACC",
	"big-12": "Big 12",
	independent: "Independent",
	american: "American",
	"sun-belt": "Sun Belt",
	mac: "MAC",
	cusa: "CUSA",
	"mountain-west": "Mountain West",
	"pac-12": "Pac-12"
};
var SCOPE_ALIASES = {
	fbs: "fbs",
	all: "fbs",
	"all-fbs": "fbs",
	p4: "p4",
	"power-4": "p4",
	"power 4": "p4",
	g5: "g5",
	"group-of-5": "g5",
	"group-of-five": "g5",
	"group of 5": "g5",
	"group of five": "g5",
	sec: "sec",
	"big-ten": "big-ten",
	"big ten": "big-ten",
	acc: "acc",
	"big-12": "big-12",
	"big 12": "big-12",
	independent: "independent",
	independents: "independent",
	american: "american",
	"sun-belt": "sun-belt",
	"sun belt": "sun-belt",
	mac: "mac",
	cusa: "cusa",
	"mountain-west": "mountain-west",
	"mountain west": "mountain-west",
	"pac-12": "pac-12",
	"pac 12": "pac-12"
};
var parseLeaderScope = (v) => {
	if (typeof v !== "string") return "fbs";
	return SCOPE_ALIASES[v.trim().toLowerCase()] ?? "fbs";
};
var isConfScope = (scope) => LEADER_CONFS.includes(scope);
function inLeaderScope(conference, scope) {
	if (scope === "fbs") return true;
	if (scope === "p4") return P4_CONFS.has(conference);
	if (scope === "g5") return G5_CONFS.has(conference);
	return conference === SCOPE_CONF[scope];
}
var leaderMetric = (k) => metricOf("qb", k);
/** Search object with defaults dropped, so the bare /stats/qb-leaders URL stays canonical. */
function leadersSearch(scope, sort, dir) {
	const s = {};
	if (scope !== "fbs") s.scope = scope;
	if (sort !== "tepa") s.sort = sort;
	if (dir !== "best") s.dir = dir;
	return s;
}
/**
* Builds the full qualified FBS board. Ranks on every column (and `rank` / `fbsRank`) are FBS ranks.
* Use `viewLeaders` to filter, re-sort, and compute the rank within a narrower scope.
*/
function buildLeaders(args) {
	const sort = args.sort ?? "tepa";
	const { rows, keyOf, teams } = args;
	const pool = rows.filter((r) => isQualified("qb", r));
	const bySlug = new Map(teams.map((t) => [t.slug, t]));
	const colVals = new Map(LEADER_COLS.map((k) => [k, pool.map((r) => r.v[k] ?? null)]));
	const sm = leaderMetric(sort);
	const sortVals = pool.map((r) => r.v[sort] ?? null);
	const out = sortRows(pool, sm).map((r) => {
		const t = bySlug.get(r.slug);
		const stats = Object.fromEntries(LEADER_COLS.map((k) => {
			const v = r.v[k] ?? null;
			return [k, {
				v,
				rank: standing(leaderMetric(k), v, colVals.get(k))?.rank ?? null
			}];
		}));
		const fbsRank = standing(sm, r.v[sort] ?? null, sortVals)?.rank ?? null;
		return {
			rank: fbsRank ?? 0,
			fbsRank,
			key: keyOf(r),
			name: r.name,
			slug: r.slug,
			team: r.team,
			conference: r.conference,
			color: r.color,
			g: r.g,
			att: r.vol ?? 0,
			record: t ? `${t.w}–${t.l}` : null,
			hxRank: t?.hxRank ?? null,
			stats
		};
	});
	return {
		n: pool.length,
		rows: out
	};
}
/**
* Filters a full FBS board to `scope`, ranks by `sort` within that pool (best-to-worst, even when
* `dir` is worst-first), and orders the list by `dir`. Column ranks stay the FBS ranks from `buildLeaders`.
*/
function viewLeaders(rows, opts = {}) {
	const scope = opts.scope ?? "fbs";
	const sort = opts.sort ?? "tepa";
	const dir = opts.dir ?? "best";
	const fbsN = rows.length;
	const pool = rows.filter((r) => inLeaderScope(r.conference, scope));
	const sm = leaderMetric(sort);
	const sortVals = pool.map((r) => r.stats[sort].v);
	const ranked = pool.map((r) => {
		const v = r.stats[sort].v;
		const rank = standing(sm, v, sortVals)?.rank ?? 0;
		return {
			...r,
			rank,
			fbsRank: r.stats[sort].rank
		};
	});
	return {
		n: pool.length,
		fbsN,
		rows: sortLeaderRows(ranked, sort, dir)
	};
}
function sortLeaderRows(rows, sort, dir) {
	const sign = (leaderMetric(sort).hi ? -1 : 1) * (dir === "best" ? 1 : -1);
	return [...rows].sort((a, b) => {
		const x = a.stats[sort].v, y = b.stats[sort].v;
		if (x == null && y == null) return a.name.localeCompare(b.name);
		if (x == null) return 1;
		if (y == null) return -1;
		return sign * (x - y) || a.name.localeCompare(b.name);
	});
}
//#endregion
export { parseLeaderSort as A, isConfScope as C, metricOf as D, leadersSearch as E, standing as F, unitEdges as I, viewLeaders as L, percentileMap as M, qualifierText as N, parseLeaderDir as O, sortRows as P, fmtStat as S, leaderMetric as T, buildLeaders as _, LEADER_CONFS as a, deskMetric as b, METRICS as c, SCOPE_LABEL as d, SOURCE_LABEL as f, buildDesk as g, TEAM_ADVANCED_KEYS as h, LEADER_COLS as i, parseTab as j, parseLeaderScope as k, QUALIFY as l, TAB_LABEL as m, COLUMN_SETS as n, LEADER_POOLS as o, STAT_TABS as p, DESK_KEYS as r, LEADER_SORTS as s, CHART_KEYS as t, QUICK_VIEWS as u, columnSet as v, isQualified as w, edgeCall as x, deriveValues as y };
