import { t as createServerFn } from "./ssr.mjs";
import { a as object, o as string, t as _enum } from "../_libs/zod.mjs";
import { i as STAT_TABS } from "./stats-B2MUK_7K.mjs";
import { n as getSql, t as createServerRpc } from "./db-BjTnl2OZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-queries-DokJUiq5.js
/** One /stats tab: rows joined to team name, conference, and color. Data file stays server-side. */
var getStatsTab_createServerFn_handler = createServerRpc({
	id: "1bcb5614a4b0c0e964e8cd896b3f3adeb70bf0346ddda783d7bc1ff58e3f503e",
	name: "getStatsTab",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getStatsTab.__executeServer(opts));
var getStatsTab = createServerFn({ method: "GET" }).validator(object({ tab: _enum(STAT_TABS) })).handler(getStatsTab_createServerFn_handler, async ({ data }) => {
	const teams = await (await getSql()).query(`select slug, name, conference, color_primary as "colorPrimary" from teams`);
	const { statRows, statsMeta } = await import("./stats.server-DP1mcTON.mjs");
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
	const { teamAdvanced } = await import("./stats.server-DP1mcTON.mjs");
	return teamAdvanced(data.slug);
});
//#endregion
export { getStatsTab_createServerFn_handler, getTeamAdvanced_createServerFn_handler };
