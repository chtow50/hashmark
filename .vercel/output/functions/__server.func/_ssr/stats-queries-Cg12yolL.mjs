import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, t as _enum } from "../_libs/zod.mjs";
import { _ as buildLeaders, p as STAT_TABS, s as LEADER_SORTS } from "./qb-leaders-ClQAW6us.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-D3xAvpA2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-queries-Cg12yolL.js
/** One /stats tab: rows joined to team name, conference, and color. Data file stays server-side. */
var getStatsTab_createServerFn_handler = createServerRpc({
	id: "1bcb5614a4b0c0e964e8cd896b3f3adeb70bf0346ddda783d7bc1ff58e3f503e",
	name: "getStatsTab",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getStatsTab.__executeServer(opts));
var getStatsTab = createServerFn({ method: "GET" }).validator(object({ tab: _enum(STAT_TABS) })).handler(getStatsTab_createServerFn_handler, async ({ data }) => {
	const teams = await (await getSql()).query(`select slug, name, conference, color_primary as "colorPrimary" from teams`);
	const { statRows, statsMeta } = await import("./stats.server-BYdmWDs-.mjs");
	return {
		meta: statsMeta(),
		rows: statRows(data.tab, teams)
	};
});
var getTeamAdvanced_createServerFn_handler = createServerRpc({
	id: "f39ad56d3d347de0a6b25c8e8ad2766460a4dc12615fb1f0df56124407037068",
	name: "getTeamAdvanced",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getTeamAdvanced.__executeServer(opts));
var getTeamAdvanced = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(getTeamAdvanced_createServerFn_handler, async ({ data }) => {
	const { teamAdvanced } = await import("./stats.server-BYdmWDs-.mjs");
	return teamAdvanced(data.slug);
});
var getMatchupEdges_createServerFn_handler = createServerRpc({
	id: "15966f3ae068c05fe480bee351a575db8156272dddcf0f8d17efa1eb37487af2",
	name: "getMatchupEdges",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getMatchupEdges.__executeServer(opts));
var getMatchupEdges = createServerFn({ method: "GET" }).validator(object({
	home: string().min(1),
	away: string().min(1)
})).handler(getMatchupEdges_createServerFn_handler, async ({ data }) => {
	const { matchupEdges } = await import("./stats.server-BYdmWDs-.mjs");
	return matchupEdges(data.home, data.away);
});
var getQbDesk_createServerFn_handler = createServerRpc({
	id: "f650f8727ec4c385aa32dd5d363114aa5ed2dd96dbe9e99041a4fe01dc40aa63",
	name: "getQbDesk",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getQbDesk.__executeServer(opts));
var getQbDesk = createServerFn({ method: "GET" }).validator(object({ qb: string().max(120).optional() })).handler(getQbDesk_createServerFn_handler, async ({ data }) => {
	const teams = await (await getSql()).query(`select slug, name, short_name as "shortName", conference, color_primary as "colorPrimary" from teams`);
	const { qbDesk } = await import("./qb-desk.server-CtWwFgQl.mjs");
	return qbDesk(data.qb, teams);
});
var getQbLeaders_createServerFn_handler = createServerRpc({
	id: "fa38ba192c4a8331fcc33cbcb432a5ed273c560940b3568ba3260dc9f3db3d75",
	name: "getQbLeaders",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getQbLeaders.__executeServer(opts));
var getQbLeaders = createServerFn({ method: "GET" }).validator(object({
	sort: _enum(LEADER_SORTS).optional(),
	limit: number().int().min(1).max(250).optional()
})).handler(getQbLeaders_createServerFn_handler, async ({ data }) => {
	const { listTeams } = await import("./queries-CZzNuLfd.mjs").then((n) => n.u);
	const teams = await listTeams();
	const { statRows, statsMeta } = await import("./stats.server-BYdmWDs-.mjs");
	const { deskKey } = await import("./qb-desk.server-CtWwFgQl.mjs");
	const board = buildLeaders({
		rows: statRows("qb", teams),
		sort: data.sort ?? "tepa",
		keyOf: (r) => deskKey(r.name, r.slug),
		teams: teams.map((t) => ({
			slug: t.slug,
			w: t.seasonWins,
			l: t.seasonLosses,
			hxRank: t.hxRank ?? null
		}))
	});
	const meta = statsMeta();
	return {
		asOf: meta.as_of,
		advancedThrough: meta.advanced_through,
		n: board.n,
		rows: data.limit ? board.rows.slice(0, data.limit) : board.rows
	};
});
//#endregion
export { getMatchupEdges_createServerFn_handler, getQbDesk_createServerFn_handler, getQbLeaders_createServerFn_handler, getStatsTab_createServerFn_handler, getTeamAdvanced_createServerFn_handler };
