import { t as createServerFn } from "./ssr.mjs";
import { a as hashmarkWeekFromRow } from "./queries-Dk--NEHa.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-DeuCy2PR.mjs";
import { n as rollup, t as gradeGame } from "./accuracy-CSXu7Sam.mjs";
import { r as fcsStubIsFinal, t as FCS_STUB_GAMES } from "./fcs-stubs-BauL-2kD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accuracy-queries-C2hJzKY7.js
var getAccuracy_createServerFn_handler = createServerRpc({
	id: "f10099cdbad71a91021c2c6930a843871be7cb7eba78087d6bf15e538a9f257b",
	name: "getAccuracy",
	filename: "src/lib/cfb/accuracy-queries.ts"
}, (opts) => getAccuracy.__executeServer(opts));
var getAccuracy = createServerFn({ method: "GET" }).handler(getAccuracy_createServerFn_handler, async () => {
	const fbs = (await (await getSql()).query(`select g.id, g.week, g.kickoff_date::text as "kickoffDate", ht.slug as home, at.slug as away,
            ht.short_name as "homeShort", at.short_name as "awayShort", g.neutral,
            g.home_score as hs, g.away_score as "as", g.lock_home_hx as lh, g.lock_away_hx as la,
            g.vegas_spread as vegas, g.hx_unrated as unrated
     from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id
     where g.status = 'final' and g.home_score is not null and g.away_score is not null
     order by g.kickoff_date, g.id`)).map((r) => ({
		id: `g${r.id}`,
		week: hashmarkWeekFromRow(String(r.kickoffDate).slice(0, 10), r.week),
		kickoffDate: String(r.kickoffDate).slice(0, 10),
		home: r.home,
		away: r.away,
		homeShort: r.homeShort,
		awayShort: r.awayShort,
		neutral: Boolean(r.neutral),
		homeScore: Number(r.hs),
		awayScore: Number(r.as),
		lockHome: r.lh == null ? null : Number(r.lh),
		lockAway: r.la == null ? null : Number(r.la),
		vegasSpread: r.vegas == null ? null : Number(r.vegas),
		...r.unrated ? { naReason: "unrated" } : {}
	}));
	const fcs = FCS_STUB_GAMES.filter(fcsStubIsFinal).map((s, i) => ({
		id: `f${i}`,
		week: s.week,
		kickoffDate: s.kickoffDate,
		home: s.home ? s.teamSlug : `fcs:${s.opponentLabel}`,
		away: s.home ? `fcs:${s.opponentLabel}` : s.teamSlug,
		homeShort: s.homeShort ?? (s.home ? s.teamSlug : s.opponentLabel),
		awayShort: s.awayShort ?? (s.home ? s.opponentLabel : s.teamSlug),
		neutral: false,
		homeScore: s.homeScore,
		awayScore: s.awayScore,
		lockHome: null,
		lockAway: null,
		vegasSpread: s.vegasSpread ?? null,
		naReason: "fcs"
	}));
	const games = [...fbs, ...fcs].map(gradeGame).sort((a, b) => a.kickoffDate.localeCompare(b.kickoffDate) || a.id.localeCompare(b.id));
	const weeks = [...new Set(games.map((g) => g.week))].sort((a, b) => a - b).map((week) => ({
		week,
		r: rollup(games.filter((g) => g.week === week))
	}));
	return {
		games,
		season: rollup(games),
		weeks
	};
});
//#endregion
export { getAccuracy_createServerFn_handler };
