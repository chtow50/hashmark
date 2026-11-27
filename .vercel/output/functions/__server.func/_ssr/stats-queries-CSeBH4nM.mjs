import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, t as _enum } from "../_libs/zod.mjs";
import { _ as buildLeaders, p as STAT_TABS, s as LEADER_SORTS } from "./qb-leaders-ClQAW6us.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BkV5ZcM9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-queries-CSeBH4nM.js
/** One /stats tab: rows joined to team name, conference, and color. Data file stays server-side. */
var getStatsTab_createServerFn_handler = createServerRpc({
	id: "1bcb5614a4b0c0e964e8cd896b3f3adeb70bf0346ddda783d7bc1ff58e3f503e",
	name: "getStatsTab",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getStatsTab.__executeServer(opts));
var getStatsTab = createServerFn({ method: "GET" }).validator(object({ tab: _enum(STAT_TABS) })).handler(getStatsTab_createServerFn_handler, async ({ data }) => {
	const teams = await (await getSql()).query(`select slug, name, conference, color_primary as "colorPrimary" from teams`);
	const { statRows, statsMeta } = await import("./stats.server-DN3HAFis.mjs");
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
	const { teamAdvanced } = await import("./stats.server-DN3HAFis.mjs");
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
	const { matchupEdges } = await import("./stats.server-DN3HAFis.mjs");
	return matchupEdges(data.home, data.away);
});
var getQbDesk_createServerFn_handler = createServerRpc({
	id: "f650f8727ec4c385aa32dd5d363114aa5ed2dd96dbe9e99041a4fe01dc40aa63",
	name: "getQbDesk",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getQbDesk.__executeServer(opts));
var getQbDesk = createServerFn({ method: "GET" }).validator(object({ qb: string().max(120).optional() })).handler(getQbDesk_createServerFn_handler, async ({ data }) => {
	const teams = await (await getSql()).query(`select slug, name, short_name as "shortName", conference, color_primary as "colorPrimary" from teams`);
	const { qbDesk } = await import("./qb-desk.server-DfHx6IXT.mjs");
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
	const { statRows, statsMeta } = await import("./stats.server-DN3HAFis.mjs");
	const { deskKey } = await import("./qb-desk.server-DfHx6IXT.mjs");
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
var getTeamCoordinators_createServerFn_handler = createServerRpc({
	id: "0fcf75150a0915af7905f243f7678498d03b11384ffac4f4f719d5df78fa756e",
	name: "getTeamCoordinators",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getTeamCoordinators.__executeServer(opts));
var getTeamCoordinators = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(getTeamCoordinators_createServerFn_handler, async ({ data }) => {
	const { teamCoordinatorBlock } = await import("./coordinators.server-Dd45dvMu.mjs");
	const block = teamCoordinatorBlock(data.slug);
	if (!block.cards.some((c) => c.u)) return null;
	const teams = await (await getSql()).query(`select slug, name from teams`);
	const used = new Set(block.teamsUsed);
	const names = Object.fromEntries(teams.filter((t) => used.has(t.slug)).map((t) => [t.slug, t.name]));
	return {
		cards: block.cards,
		names,
		built: block.built,
		asOf: block.asOf
	};
});
var getCoordinators_createServerFn_handler = createServerRpc({
	id: "7feab1b7a8f5e53284a47e583da371c3b7e969ae603d2138ff423f45a363aa52",
	name: "getCoordinators",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getCoordinators.__executeServer(opts));
var getCoordinators = createServerFn({ method: "GET" }).handler(getCoordinators_createServerFn_handler, async () => {
	const teams = await (await getSql()).query(`select slug, name, color_primary as "colorPrimary" from teams`);
	const { coordinatorsFile, live2026, talent2026, stats2026AsOf, withLive2026 } = await import("./coordinators.server-Dd45dvMu.mjs");
	const file = coordinatorsFile();
	const live = live2026();
	const coaches = withLive2026(file, live);
	const used = /* @__PURE__ */ new Set([...file.units2026.map((u) => u.team), ...coaches.flatMap((c) => c.history.map((h) => h.team))]);
	const teamInfo = Object.fromEntries(teams.filter((t) => used.has(t.slug)).map((t) => [t.slug, {
		name: t.name,
		color: t.colorPrimary
	}]));
	return {
		built: file.built,
		source: file.source,
		units2026: file.units2026,
		prior2025: file.prior2025,
		coaches,
		live,
		talent: talent2026(),
		asOf2026: stats2026AsOf(),
		teams: teamInfo
	};
});
var getCoaches_createServerFn_handler = createServerRpc({
	id: "1a70431e2dc272ca35156651201ec3f70739a748ebc41d1c5868f8ce3c46c5a8",
	name: "getCoaches",
	filename: "src/lib/cfb/stats-queries.ts"
}, (opts) => getCoaches.__executeServer(opts));
var getCoaches = createServerFn({ method: "GET" }).handler(getCoaches_createServerFn_handler, async () => {
	const { listTeams } = await import("./queries-CZzNuLfd.mjs").then((n) => n.u);
	const teams = await listTeams();
	const { coachesFile } = await import("./coaches.server-BnD8uioJ.mjs");
	return {
		file: coachesFile(),
		teams: Object.fromEntries(teams.map((t) => [t.slug, {
			name: t.name,
			color: t.colorPrimary,
			conference: t.conference,
			hxRank: t.hxRank ?? null
		}]))
	};
});
//#endregion
export { getCoaches_createServerFn_handler, getCoordinators_createServerFn_handler, getMatchupEdges_createServerFn_handler, getQbDesk_createServerFn_handler, getQbLeaders_createServerFn_handler, getStatsTab_createServerFn_handler, getTeamAdvanced_createServerFn_handler, getTeamCoordinators_createServerFn_handler };
