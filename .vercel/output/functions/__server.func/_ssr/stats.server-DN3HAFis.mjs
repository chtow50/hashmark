import { F as standing, I as unitEdges, c as METRICS, h as TEAM_ADVANCED_KEYS, y as deriveValues } from "./qb-leaders-ClQAW6us.mjs";
import { t as stats_2026_default } from "./stats_2026-CRa7esya.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats.server-DN3HAFis.js
/** Server only: reads data/stats_2026.json. Imported dynamically from server-function handlers. */
var data = stats_2026_default;
var statsMeta = () => data.meta;
function statRows(tab, teams) {
	const bySlug = new Map(teams.map((t) => [t.slug, t]));
	const teamGames = new Map(data.teams.map((t) => [String(t.slug), Number(t.g ?? 0)]));
	const volKey = tab === "rec" ? "rec" : tab === "qb" || tab === "rush" ? "att" : null;
	return data[tab].map((r, i) => {
		const slug = String(r.slug);
		const t = bySlug.get(slug);
		return {
			id: `${tab}-${i}`,
			name: tab === "teams" ? t?.name ?? slug : String(r.name),
			slug,
			team: t?.name ?? slug,
			conference: t?.conference ?? "",
			color: t?.colorPrimary ?? "#888888",
			pos: tab === "teams" ? "" : String(r.pos ?? ""),
			g: Number(r.g ?? 0),
			wl: tab === "teams" ? `${r.w}–${r.l}` : "",
			...volKey ? {
				vol: Number(r[volKey] ?? 0),
				teamG: teamGames.get(slug) ?? 0
			} : {},
			v: deriveValues(tab, r)
		};
	});
}
function teamAdvanced(slug) {
	const row = data.teams.find((t) => t.slug === slug);
	if (!row) return null;
	const all = data.teams.map((t) => deriveValues("teams", t));
	const mine = deriveValues("teams", row);
	return {
		meta: data.meta,
		games: typeof row.adv_g === "number" ? row.adv_g : null,
		rows: TEAM_ADVANCED_KEYS.map((k) => {
			const mt = METRICS.teams.find((x) => x.k === k);
			const s = standing(mt, mine[k], all.map((v) => v[k]));
			return {
				k,
				value: mine[k],
				rank: s?.rank ?? null,
				n: s?.n ?? 0
			};
		})
	};
}
function matchupEdges(home, away) {
	const h = data.teams.find((t) => t.slug === home);
	const a = data.teams.find((t) => t.slug === away);
	if (!h || !a) return null;
	const all = data.teams.map((t) => deriveValues("teams", t));
	const hv = deriveValues("teams", h);
	const av = deriveValues("teams", a);
	return {
		asOf: data.meta.as_of,
		advancedThrough: data.meta.advanced_through,
		homeOff: unitEdges(hv, av, all),
		awayOff: unitEdges(av, hv, all)
	};
}
//#endregion
export { matchupEdges, statRows, statsMeta, teamAdvanced };
