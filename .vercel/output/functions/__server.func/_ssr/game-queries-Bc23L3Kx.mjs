import { n as gameKey, r as parseGameKey, t as chicagoDate } from "./game-key-MogMlpsX.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, o as string } from "../_libs/zod.mjs";
import { a as hashmarkWeekFromRow } from "./queries-Dk--NEHa.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-CpGBlXNn.mjs";
import { t as gradeGame } from "./accuracy-CSXu7Sam.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game-queries-Bc23L3Kx.js
var DAY = 864e5;
var near = (a, b) => Math.abs(Date.parse(a) - Date.parse(b)) <= DAY;
/** One FBS–FBS game from the games table, its frozen pregame HX grade, and the cached CFBD box (FINALs only). */
var getGamePage_createServerFn_handler = createServerRpc({
	id: "abbcd1d8320134b5980dcde52a6634c25897891df0c2e0b703446b41a255ccf9",
	name: "getGamePage",
	filename: "src/lib/cfb/game-queries.ts"
}, (opts) => getGamePage.__executeServer(opts));
var getGamePage = createServerFn({ method: "GET" }).validator(object({ key: string().min(1).max(120) })).handler(getGamePage_createServerFn_handler, async ({ data }) => {
	const k = parseGameKey(data.key);
	if (!k) return null;
	const sql = await getSql();
	const rows = await sql.query(`select g.id, g.week, g.kickoff_date::text as "kickoffDate", g.kickoff_at::text as "kickoffAt", g.tv, g.location, g.neutral,
              g.status, g.home_score as hs, g.away_score as "as", g.vegas_spread as vegas, g.vegas_total as vtotal,
              g.lock_home_hx as lh, g.lock_away_hx as la, g.hx_unrated as unrated, ht.slug as home, at.slug as away
       from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id
       where (ht.slug = $1 and at.slug = $2) or (ht.slug = $2 and at.slug = $1)`, [k.home, k.away]);
	const exact = rows.find((r) => r.home === k.home && r.away === k.away && String(r.kickoffDate).slice(0, 10) === k.date);
	if (!exact) {
		const close = rows.find((r) => near(String(r.kickoffDate).slice(0, 10), k.date));
		return close ? { redirect: gameKey(String(close.kickoffDate), close.away, close.home) } : null;
	}
	const g = exact;
	const date = String(g.kickoffDate).slice(0, 10);
	const teams = await sql.query(`select t.slug, t.name, t.short_name as "shortName", t.mascot, t.color_primary as color, r.hx_rank as "hxRank"
       from teams t left join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
       where t.slug = $1 or t.slug = $2`, [g.home, g.away]);
	const team = (slug) => {
		const t = teams.find((x) => x.slug === slug);
		return {
			...t,
			hxRank: t.hxRank == null ? null : Number(t.hxRank)
		};
	};
	const final = g.status === "final" && g.hs != null && g.as != null;
	const graded = final ? gradeGame({
		id: `g${g.id}`,
		week: g.week,
		kickoffDate: date,
		home: g.home,
		away: g.away,
		homeShort: team(g.home).shortName,
		awayShort: team(g.away).shortName,
		neutral: Boolean(g.neutral),
		homeScore: Number(g.hs),
		awayScore: Number(g.as),
		lockHome: g.lh == null ? null : Number(g.lh),
		lockAway: g.la == null ? null : Number(g.la),
		vegasSpread: g.vegas == null ? null : Number(g.vegas),
		...g.unrated ? { naReason: "unrated" } : {}
	}) : null;
	let box = null;
	let adv = null;
	let source = null;
	if (final) {
		const file = (await import("./game_box_2026-BoK8SnLE.mjs")).default;
		const hit = Object.values(file.games).find((b) => (b.home === g.home && b.away === g.away || b.home === g.away && b.away === g.home) && near(chicagoDate(b.start), date));
		if (hit && hit.box[g.home]?.pts === Number(g.hs) && hit.box[g.away]?.pts === Number(g.as)) {
			box = {
				home: hit.box[g.home],
				away: hit.box[g.away]
			};
			adv = hit.adv ? {
				home: hit.adv[g.home],
				away: hit.adv[g.away]
			} : null;
			source = {
				box: file.meta.source,
				through: file.meta.through
			};
		}
	}
	return {
		key: gameKey(date, g.away, g.home),
		week: hashmarkWeekFromRow(date, g.week),
		kickoffDate: date,
		kickoffAt: g.kickoffAt,
		tv: g.tv,
		location: g.location,
		neutral: Boolean(g.neutral),
		status: g.status,
		homeScore: g.hs == null ? null : Number(g.hs),
		awayScore: g.as == null ? null : Number(g.as),
		vegasSpread: g.vegas == null ? null : Number(g.vegas),
		vegasTotal: g.vtotal == null ? null : Number(g.vtotal),
		home: team(g.home),
		away: team(g.away),
		graded,
		unrated: Boolean(g.unrated),
		box,
		adv,
		source
	};
});
//#endregion
export { getGamePage_createServerFn_handler };
