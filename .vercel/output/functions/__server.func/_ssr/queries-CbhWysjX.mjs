import { c as predictMatchup, o as kickoffCivilYmd } from "./chicago-ce7grsdn.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as boolean, o as string } from "../_libs/zod.mjs";
import { l as TALENT_UNITS_JOIN, o as POS_SQL_ARRAY } from "./positions-C0zZnrTX.mjs";
import { n as getSql, t as createServerRpc } from "./db-BjTnl2OZ.mjs";
import { n as SIZE_UNITS_JOIN } from "./size-groups-BYECeJcY.mjs";
import { n as fcsScheduleGamesForDate, o as mergeFcsScheduleGames, s as sortScheduleGames } from "./fcs-stubs-wYfFtroN.mjs";
import { r as compositeClassAvg } from "./recruiting-B2tK2ji6.mjs";
import { r as sim_free_hx2026_8_default, t as SEASON_RECORD_JOIN } from "./sim_free_hx2026_8-C6Yr1yBl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CbhWysjX.js
var SIM_PROJ_WINS = new Map(sim_free_hx2026_8_default.teams.map((t) => [t.slug, t.proj_wins]));
var TEAM_SELECT = `
  t.id, t.slug, t.name, t.short_name, t.mascot, t.conference, t.city, t.state,
  t.color_primary, t.color_secondary, t.last_wins, t.last_losses, t.last_finish,
  coalesce(wl.season_wins, 0) as season_wins,
  coalesce(wl.season_losses, 0) as season_losses,
  r.hx_rank, r.hx_rating, r.ap_rank, r.cfp_rank,
  -- 2026 newcomers (0093) have no O/D units: league mean keeps the total model neutral; units_rated drives "—".
  coalesce(r.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as offense_rating,
  coalesce(r.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as defense_rating,
  (r.offense_rating is not null) as units_rated,
  (p.team_id is not null) as has_profile,
  coalesce(r.special_rating, 0) as special_rating, coalesce(r.sos_rating, 0) as sos_rating,
  coalesce(r.projected_wins, 0) as projected_wins, coalesce(r.returning_production, 0) as returning_production,
  coalesce(r.playoff_odds, 0) as playoff_odds, coalesce(r.prior_score, 0) as prior_score, coalesce(r.talent_score, 0) as talent_score,
  r.z_talent, r.z_retention, r.z_trend, r.z_portal, r.z_prior,
  rec.composite_rank as rec_rank, rec.commits, rec.avg_rating as rec_avg,
  rec.points as rec_points, rec.five_stars, rec.four_stars, rec.three_stars,
  p.talent_rank, p.talent_score as roster_talent, p.blue_chip_pct,
  p.transfer_pct, p.transfer_count, p.off_talent, p.def_talent,
  p.starter_talent, p.avg_rating as roster_avg_rating,
  coalesce(u.hs_talent, p.hs_talent, 0) as hs_talent,
  coalesce(u.portal_talent, p.portal_talent, 0) as portal_talent,
  coalesce(u.portal_share, p.portal_share, 0) as portal_share,
  coalesce(u.qb_talent, p.qb_talent, 0) as qb_talent,
  coalesce(u.skill_talent, p.skill_talent, 0) as skill_talent,
  coalesce(u.ol_talent, p.ol_talent, 0) as ol_talent,
  coalesce(u.dl_talent, p.dl_talent, 0) as dl_talent,
  coalesce(u.lb_talent, p.lb_talent, 0) as lb_talent,
  coalesce(u.db_talent, p.db_talent, 0) as db_talent,
  p.avg_height_in, p.avg_weight_lbs,
  coalesce(sz.ol_avg_height_in, p.ol_avg_height_in) as ol_avg_height_in,
  coalesce(sz.ol_avg_weight_lbs, p.ol_avg_weight_lbs) as ol_avg_weight_lbs,
  coalesce(sz.skill_avg_height_in, p.skill_avg_height_in) as skill_avg_height_in,
  coalesce(sz.skill_avg_weight_lbs, p.skill_avg_weight_lbs) as skill_avg_weight_lbs,
  coalesce(sz.qb_avg_height_in, 0) as qb_avg_height_in,
  coalesce(sz.qb_avg_weight_lbs, 0) as qb_avg_weight_lbs,
  coalesce(sz.dl_avg_height_in, 0) as dl_avg_height_in,
  coalesce(sz.dl_avg_weight_lbs, 0) as dl_avg_weight_lbs,
  coalesce(sz.lb_avg_height_in, 0) as lb_avg_height_in,
  coalesce(sz.lb_avg_weight_lbs, 0) as lb_avg_weight_lbs,
  coalesce(sz.db_avg_height_in, p.db_avg_height_in) as db_avg_height_in,
  coalesce(sz.db_avg_weight_lbs, 0) as db_avg_weight_lbs,
  p.returning_starters, p.two_deep_source
`;
var TEAM_FROM = `
  from teams t
  join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
  left join recruiting rec on rec.team_id = t.id and rec.class_year = 2026
  left join roster_profile p on p.team_id = t.id
  ${TALENT_UNITS_JOIN}
  ${SIZE_UNITS_JOIN}
  ${SEASON_RECORD_JOIN}
`;
function mapTeam(row) {
	return {
		id: row.id,
		slug: row.slug,
		name: row.name,
		shortName: row.short_name,
		mascot: row.mascot,
		conference: row.conference,
		city: row.city,
		state: row.state,
		colorPrimary: row.color_primary,
		colorSecondary: row.color_secondary,
		lastWins: row.last_wins,
		lastLosses: row.last_losses,
		seasonWins: Number(row.season_wins),
		seasonLosses: Number(row.season_losses),
		lastFinish: row.last_finish,
		hxRank: row.hx_rank,
		hxRating: Number(row.hx_rating),
		apRank: row.ap_rank,
		cfpRank: row.cfp_rank ?? null,
		unitsRated: row.units_rated !== false,
		hasProfile: row.has_profile !== false,
		offenseRating: Number(row.offense_rating),
		defenseRating: Number(row.defense_rating),
		specialRating: Number(row.special_rating),
		sosRating: Number(row.sos_rating),
		projectedWins: SIM_PROJ_WINS.get(row.slug) ?? Number(row.projected_wins),
		returningProduction: Number(row.returning_production),
		playoffOdds: Number(row.playoff_odds),
		priorScore: Number(row.prior_score),
		talentScore: Number(row.roster_talent ?? row.talent_score),
		recRank: row.rec_rank,
		commits: row.commits,
		recAvg: compositeClassAvg({
			storedAvg: Number(row.rec_avg),
			commits: row.commits,
			fiveStars: row.five_stars,
			fourStars: row.four_stars,
			threeStars: row.three_stars,
			slug: row.slug,
			classYear: 2026
		}),
		recPoints: Number(row.rec_points),
		fiveStars: row.five_stars,
		fourStars: row.four_stars,
		threeStars: row.three_stars,
		talentRank: row.talent_rank,
		blueChipPct: Number(row.blue_chip_pct),
		transferPct: Number(row.transfer_pct),
		transferCount: row.transfer_count,
		offTalent: Number(row.off_talent),
		defTalent: Number(row.def_talent),
		starterTalent: Number(row.starter_talent),
		rosterAvgRating: Number(row.roster_avg_rating),
		hsTalent: Number(row.hs_talent),
		portalTalent: Number(row.portal_talent),
		portalShare: Number(row.portal_share),
		qbTalent: Number(row.qb_talent),
		skillTalent: Number(row.skill_talent),
		olTalent: Number(row.ol_talent),
		dlTalent: Number(row.dl_talent),
		lbTalent: Number(row.lb_talent),
		dbTalent: Number(row.db_talent),
		avgHeightIn: Number(row.avg_height_in),
		avgWeightLbs: Number(row.avg_weight_lbs),
		olAvgHeightIn: Number(row.ol_avg_height_in),
		olAvgWeightLbs: Number(row.ol_avg_weight_lbs),
		skillAvgHeightIn: Number(row.skill_avg_height_in),
		skillAvgWeightLbs: Number(row.skill_avg_weight_lbs),
		qbAvgHeightIn: Number(row.qb_avg_height_in),
		qbAvgWeightLbs: Number(row.qb_avg_weight_lbs),
		dlAvgHeightIn: Number(row.dl_avg_height_in),
		dlAvgWeightLbs: Number(row.dl_avg_weight_lbs),
		lbAvgHeightIn: Number(row.lb_avg_height_in),
		lbAvgWeightLbs: Number(row.lb_avg_weight_lbs),
		dbAvgHeightIn: Number(row.db_avg_height_in),
		dbAvgWeightLbs: Number(row.db_avg_weight_lbs),
		returningStarters: row.returning_starters,
		zTalent: Number(row.z_talent),
		zRetention: Number(row.z_retention),
		zTrend: Number(row.z_trend),
		zPortal: Number(row.z_portal),
		zPrior: Number(row.z_prior),
		twoDeepSource: row.two_deep_source === "listed" ? "listed" : "projected"
	};
}
var listTeams_createServerFn_handler = createServerRpc({
	id: "212fff7d2072b94c01d35d756a6846efbcca652fa93e6206b5e625d8fd64ecc1",
	name: "listTeams",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => listTeams.__executeServer(opts));
var listTeams = createServerFn({ method: "GET" }).handler(listTeams_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select ${TEAM_SELECT}
     ${TEAM_FROM}
     order by r.hx_rank asc`)).map(mapTeam);
});
var getTeam_createServerFn_handler = createServerRpc({
	id: "7bd9c5bd2dac37273cb6e205f595eb0bc550bfd9c6ffff5b5b31dcf74c2250bb",
	name: "getTeam",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => getTeam.__executeServer(opts));
var getTeam = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(getTeam_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const rows = await sql.query(`select ${TEAM_SELECT}
       ${TEAM_FROM}
       where t.slug = $1`, [data.slug]);
	const team = rows[0] ? mapTeam(rows[0]) : null;
	if (!team) return null;
	const players = await sql.query(`select id, team_id as "teamId", name, jersey, position, depth,
              class_year as "classYear",
              height_in as "heightIn", weight_lbs as "weightLbs", stars,
              rating, hometown_state as "hometownState", unit, transfer
       from players where team_id = $1
       order by unit desc, array_position(${POS_SQL_ARRAY}, position), depth, name`, [team.id]);
	const classes = await sql.query(`select rec.team_id as "teamId", t.slug, t.name, t.short_name as "shortName",
              t.conference, t.color_primary as "colorPrimary", r.hx_rank as "hxRank",
              rec.class_year as "classYear", rec.composite_rank as "compositeRank",
              rec.commits, rec.avg_rating as "avgRating", rec.points,
              rec.five_stars as "fiveStars", rec.four_stars as "fourStars",
              rec.three_stars as "threeStars"
       from recruiting rec
       join teams t on t.id = rec.team_id
       join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
       where rec.team_id = $1
       order by rec.class_year`, [team.id]);
	const games = await sql.query(`select g.id, g.week, g.kickoff_date as "kickoffDate",
              ht.slug as "homeSlug", at.slug as "awaySlug",
              ht.name as "homeName", at.name as "awayName",
              ht.short_name as "homeShort", at.short_name as "awayShort",
              ht.color_primary as "homeColor", at.color_primary as "awayColor",
              coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx", g.hx_unrated as "hxUnrated",
              hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
              coalesce(hr.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "homeOff", coalesce(ar.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "awayOff",
              coalesce(hr.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "homeDef", coalesce(ar.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "awayDef",
              g.neutral, g.location, g.headline,
              g.kickoff_at as "kickoffAt",
              g.vegas_spread as "vegasSpread",
              g.vegas_total as "vegasTotal",
              g.home_score as "homeScore",
              g.away_score as "awayScore",
              g.status,
              g.tv as "tv"
       from games g
       join teams ht on ht.id = g.home_team_id
       join teams at on at.id = g.away_team_id
       join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
       join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
       where ht.slug = $1 or at.slug = $1
       order by g.week, g.id`, [data.slug]);
	return {
		team,
		players: players.map(mapPlayer),
		classes: classes.map(mapClass),
		games: games.map(mapSchedule)
	};
});
function mapClass(row) {
	const commits = Number(row.commits);
	const fiveStars = Number(row.fiveStars);
	const fourStars = Number(row.fourStars);
	const threeStars = Number(row.threeStars);
	const classYear = Number(row.classYear);
	return {
		...row,
		avgRating: compositeClassAvg({
			storedAvg: Number(row.avgRating),
			commits,
			fiveStars,
			fourStars,
			threeStars,
			slug: row.slug,
			classYear
		}),
		points: Number(row.points),
		compositeRank: Number(row.compositeRank),
		classYear,
		commits,
		fiveStars,
		fourStars,
		threeStars,
		hxRank: Number(row.hxRank)
	};
}
var listRecruiting_createServerFn_handler = createServerRpc({
	id: "eefaa67313e68bdbcc1c8f6789d44047383841a9720a2e2ed8b4294d8674c7ca",
	name: "listRecruiting",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => listRecruiting.__executeServer(opts));
var listRecruiting = createServerFn({ method: "GET" }).handler(listRecruiting_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select rec.team_id as "teamId", t.slug, t.name, t.short_name as "shortName",
            t.conference, t.color_primary as "colorPrimary", r.hx_rank as "hxRank",
            rec.class_year as "classYear", rec.composite_rank as "compositeRank",
            rec.commits, rec.avg_rating as "avgRating", rec.points,
            rec.five_stars as "fiveStars", rec.four_stars as "fourStars",
            rec.three_stars as "threeStars"
     from recruiting rec
     join teams t on t.id = rec.team_id
     join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
     order by rec.class_year, rec.composite_rank, t.name`)).map(mapClass);
});
function mapPlayer(p) {
	return {
		...p,
		jersey: p.jersey == null ? null : Number(p.jersey),
		depth: Number(p.depth ?? 1),
		rating: Number(p.rating),
		heightIn: Number(p.heightIn),
		weightLbs: Number(p.weightLbs),
		stars: Number(p.stars),
		transfer: Boolean(p.transfer)
	};
}
function numGame(g) {
	return {
		...g,
		homeHx: Number(g.homeHx),
		awayHx: Number(g.awayHx),
		homeOff: Number(g.homeOff),
		awayOff: Number(g.awayOff),
		homeDef: Number(g.homeDef),
		awayDef: Number(g.awayDef),
		neutral: Boolean(g.neutral),
		hxUnrated: g.hxUnrated === true
	};
}
var listGames_createServerFn_handler = createServerRpc({
	id: "245d4daa33d1f4543fb00eb58f19731eeb1b55fa11f6b5859d8efe1c0915d423",
	name: "listGames",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => listGames.__executeServer(opts));
var listGames = createServerFn({ method: "GET" }).handler(listGames_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select g.id, g.week, g.kickoff_date as "kickoffDate",
            ht.slug as "homeSlug", at.slug as "awaySlug",
            ht.name as "homeName", at.name as "awayName",
            ht.short_name as "homeShort", at.short_name as "awayShort",
            ht.color_primary as "homeColor", at.color_primary as "awayColor",
            coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx", g.hx_unrated as "hxUnrated",
            hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
            coalesce(hr.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "homeOff", coalesce(ar.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "awayOff",
            coalesce(hr.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "homeDef", coalesce(ar.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "awayDef",
            g.neutral, g.location, g.headline
     from games g
     join teams ht on ht.id = g.home_team_id
     join teams at on at.id = g.away_team_id
     join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
     join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
     order by g.week, g.id`)).map(numGame);
});
function isoTs(value) {
	if (value == null) return null;
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString();
	if (typeof value === "string") {
		const parsed = new Date(value);
		return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
	}
	return null;
}
function mapSchedule(g) {
	const base = numGame(g);
	const status = g.status === "final" ? "final" : "scheduled";
	const kickoffAt = isoTs(g.kickoffAt);
	return {
		...base,
		kickoffAt,
		kickoffDate: kickoffCivilYmd(kickoffAt, base.kickoffDate),
		vegasSpread: g.vegasSpread == null ? null : Number(g.vegasSpread),
		vegasTotal: g.vegasTotal == null ? null : Number(g.vegasTotal),
		homeScore: g.homeScore == null ? null : Number(g.homeScore),
		awayScore: g.awayScore == null ? null : Number(g.awayScore),
		status,
		tv: g.tv ?? null
	};
}
/** FBS slate for one America/Chicago civil date. Uses lock HX the same way as listGames. */
var listSchedule_createServerFn_handler = createServerRpc({
	id: "9ad172d35fd2eca98874454de1af972b7e747ffcef39b3001b6739144dfe4457",
	name: "listSchedule",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => listSchedule.__executeServer(opts));
var listSchedule = createServerFn({ method: "GET" }).validator(object({ date: string().regex(/^\d{4}-\d{2}-\d{2}$/) })).handler(listSchedule_createServerFn_handler, async ({ data }) => {
	const mapped = (await (await getSql()).query(`select g.id, g.week, g.kickoff_date as "kickoffDate",
              ht.slug as "homeSlug", at.slug as "awaySlug",
              ht.name as "homeName", at.name as "awayName",
              ht.short_name as "homeShort", at.short_name as "awayShort",
              ht.color_primary as "homeColor", at.color_primary as "awayColor",
              coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx", g.hx_unrated as "hxUnrated",
              hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
              coalesce(hr.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "homeOff", coalesce(ar.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "awayOff",
              coalesce(hr.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "homeDef", coalesce(ar.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "awayDef",
              g.neutral, g.location, g.headline,
              g.kickoff_at as "kickoffAt",
              g.vegas_spread as "vegasSpread",
              g.vegas_total as "vegasTotal",
              g.home_score as "homeScore",
              g.away_score as "awayScore",
              g.status,
              g.tv as "tv"
       from games g
       join teams ht on ht.id = g.home_team_id
       join teams at on at.id = g.away_team_id
       join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
       join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
       where g.kickoff_date between ($1::date - 1) and ($1::date + 1)
       order by g.kickoff_at nulls last, g.id`, [data.date])).map(mapSchedule).filter((g) => g.kickoffDate === data.date);
	return sortScheduleGames([...mapped, ...fcsScheduleGamesForDate(data.date)]);
});
var HASHMARK_MAX_WEEK = 13;
var listScheduleWeek_createServerFn_handler = createServerRpc({
	id: "a86900331928441127b7b8d77aaf20878746d66deb7c81c2cb47f2c898494144",
	name: "listScheduleWeek",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => listScheduleWeek.__executeServer(opts));
var listScheduleWeek = createServerFn({ method: "GET" }).validator(object({ week: number().int().min(0).max(HASHMARK_MAX_WEEK) })).handler(listScheduleWeek_createServerFn_handler, async ({ data }) => {
	const rows = await (await getSql()).query(`select g.id, g.week, g.kickoff_date as "kickoffDate",
              ht.slug as "homeSlug", at.slug as "awaySlug",
              ht.name as "homeName", at.name as "awayName",
              ht.short_name as "homeShort", at.short_name as "awayShort",
              ht.color_primary as "homeColor", at.color_primary as "awayColor",
              coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx", g.hx_unrated as "hxUnrated",
              hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
              coalesce(hr.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "homeOff", coalesce(ar.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "awayOff",
              coalesce(hr.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "homeDef", coalesce(ar.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "awayDef",
              g.neutral, g.location, g.headline,
              g.kickoff_at as "kickoffAt",
              g.vegas_spread as "vegasSpread",
              g.vegas_total as "vegasTotal",
              g.home_score as "homeScore",
              g.away_score as "awayScore",
              g.status,
              g.tv as "tv"
       from games g
       join teams ht on ht.id = g.home_team_id
       join teams at on at.id = g.away_team_id
       join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
       join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
       where case when g.kickoff_date <= date '2026-08-30' then 0 else g.week end = $1
       order by g.kickoff_at nulls last, g.kickoff_date, g.id`, [data.week]);
	return mergeFcsScheduleGames(rows.map(mapSchedule), data.week);
});
function orientScheduleToMatchup(game, homeSlug, awaySlug) {
	if (game.homeSlug === homeSlug && game.awaySlug === awaySlug) return game;
	if (game.homeSlug !== awaySlug || game.awaySlug !== homeSlug) return game;
	return {
		...game,
		homeSlug,
		awaySlug,
		homeName: game.awayName,
		awayName: game.homeName,
		homeShort: game.awayShort,
		awayShort: game.homeShort,
		homeColor: game.awayColor,
		awayColor: game.homeColor,
		homeHx: game.awayHx,
		awayHx: game.homeHx,
		homeRank: game.awayRank,
		awayRank: game.homeRank,
		homeOff: game.awayOff,
		awayOff: game.homeOff,
		homeDef: game.awayDef,
		awayDef: game.homeDef,
		vegasSpread: game.vegasSpread == null ? null : -game.vegasSpread,
		homeScore: game.awayScore,
		awayScore: game.homeScore
	};
}
async function fetchMatchupGame(sql, homeSlug, awaySlug) {
	const row = (await sql.query(`select g.id, g.week, g.kickoff_date as "kickoffDate",
            ht.slug as "homeSlug", at.slug as "awaySlug",
            ht.name as "homeName", at.name as "awayName",
            ht.short_name as "homeShort", at.short_name as "awayShort",
            ht.color_primary as "homeColor", at.color_primary as "awayColor",
            coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx", g.hx_unrated as "hxUnrated",
            hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
            coalesce(hr.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "homeOff", coalesce(ar.offense_rating, (select avg(offense_rating) from rankings where season = 2026 and week = 0)) as "awayOff",
            coalesce(hr.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "homeDef", coalesce(ar.defense_rating, (select avg(defense_rating) from rankings where season = 2026 and week = 0)) as "awayDef",
            g.neutral, g.location, g.headline,
            g.kickoff_at as "kickoffAt",
            g.vegas_spread as "vegasSpread",
            g.vegas_total as "vegasTotal",
            g.home_score as "homeScore",
            g.away_score as "awayScore",
            g.status,
            g.tv as "tv"
     from games g
     join teams ht on ht.id = g.home_team_id
     join teams at on at.id = g.away_team_id
     join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
     join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
     where (ht.slug = $1 and at.slug = $2) or (ht.slug = $2 and at.slug = $1)
     order by g.kickoff_date
     limit 1`, [homeSlug, awaySlug]))[0];
	if (!row) return null;
	return orientScheduleToMatchup(mapSchedule(row), homeSlug, awaySlug);
}
var getMatchup_createServerFn_handler = createServerRpc({
	id: "e848cc7c6a78d9034685b108649e3e18d710ecbbe452bcc72388a9cb1e28bc5d",
	name: "getMatchup",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => getMatchup.__executeServer(opts));
var getMatchup = createServerFn({ method: "GET" }).validator(object({
	home: string().min(1),
	away: string().min(1),
	neutral: boolean().optional()
})).handler(getMatchup_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const mapped = (await sql.query(`select ${TEAM_SELECT}
       ${TEAM_FROM}
       where t.slug = $1 or t.slug = $2`, [data.home, data.away])).map(mapTeam);
	const home = mapped.find((t) => t.slug === data.home) ?? null;
	const away = mapped.find((t) => t.slug === data.away) ?? null;
	if (!home || !away) return {
		home,
		away,
		homePlayers: [],
		awayPlayers: [],
		prediction: null,
		appliedNeutral: false,
		game: null
	};
	const mappedPlayers = (await sql.query(`select id, team_id as "teamId", name, jersey, position, depth,
              class_year as "classYear",
              height_in as "heightIn", weight_lbs as "weightLbs", stars,
              rating, hometown_state as "hometownState", unit, transfer
       from players where team_id = $1 or team_id = $2
       order by unit desc, array_position(${POS_SQL_ARRAY}, position), depth, name`, [home.id, away.id])).map(mapPlayer);
	const game = await fetchMatchupGame(sql, data.home, data.away);
	const appliedNeutral = data.neutral ?? Boolean(game?.neutral);
	let homeForPred = home;
	let awayForPred = away;
	const lock = (await sql.query(`select g.lock_home_hx as "lockHomeHx", g.lock_away_hx as "lockAwayHx"
       from games g
       join teams ht on ht.id = g.home_team_id
       join teams at on at.id = g.away_team_id
       where g.lock_home_hx is not null
         and ht.slug = $1 and at.slug = $2
       limit 1`, [data.home, data.away]))[0];
	if (lock) {
		homeForPred = {
			...home,
			hxRating: Number(lock.lockHomeHx)
		};
		awayForPred = {
			...away,
			hxRating: Number(lock.lockAwayHx)
		};
	}
	const prediction = predictMatchup(homeForPred, awayForPred, { neutral: appliedNeutral });
	return {
		home,
		away,
		homePlayers: mappedPlayers.filter((p) => p.teamId === home.id),
		awayPlayers: mappedPlayers.filter((p) => p.teamId === away.id),
		prediction,
		appliedNeutral,
		game
	};
});
var listStates_createServerFn_handler = createServerRpc({
	id: "9e7264d9dac7ca986bcb4f134e9bd2a0a4dbce110f243ebdee63580e3b08ec00",
	name: "listStates",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => listStates.__executeServer(opts));
var listStates = createServerFn({ method: "GET" }).handler(listStates_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select s.code, s.name, s.region, s.recruits, s.five_stars as "fiveStars",
            s.avg_rating as "avgRating", s.talent_index as "talentIndex",
            (select count(*)::int from teams t where t.state = s.code) as "teamCount"
     from states s
     order by s.talent_index desc`)).map((r) => ({
		...r,
		avgRating: Number(r.avgRating),
		talentIndex: Number(r.talentIndex)
	}));
});
var getStateDetail_createServerFn_handler = createServerRpc({
	id: "bab9328854859b702258836ae2f74acf39b2bd6bc01cd038d2facb244149f301",
	name: "getStateDetail",
	filename: "src/lib/cfb/queries.ts"
}, (opts) => getStateDetail.__executeServer(opts));
var getStateDetail = createServerFn({ method: "GET" }).validator(object({ code: string().min(2).max(2) })).handler(getStateDetail_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const code = data.code.toUpperCase();
	const states = await sql.query(`select s.code, s.name, s.region, s.recruits, s.five_stars as "fiveStars",
              s.avg_rating as "avgRating", s.talent_index as "talentIndex",
              (select count(*)::int from teams t where t.state = s.code) as "teamCount"
       from states s where s.code = $1`, [code]);
	return {
		state: states[0] ? {
			...states[0],
			avgRating: Number(states[0].avgRating),
			talentIndex: Number(states[0].talentIndex)
		} : null,
		teams: await sql.query(`select t.slug, t.name, t.conference, t.city, t.color_primary, r.hx_rank, t.mascot
       from teams t
       join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
       where t.state = $1
       order by r.hx_rank`, [code]),
		commits: await sql.query(`select sc.state_code as "stateCode", t.slug as "teamSlug", t.name as "teamName",
              t.conference, t.color_primary as "colorPrimary", sc.commits
       from state_commits sc
       join teams t on t.id = sc.team_id
       where sc.state_code = $1
       order by sc.commits desc, t.name
       limit 12`, [code])
	};
});
//#endregion
export { getMatchup_createServerFn_handler, getStateDetail_createServerFn_handler, getTeam_createServerFn_handler, listGames_createServerFn_handler, listRecruiting_createServerFn_handler, listScheduleWeek_createServerFn_handler, listSchedule_createServerFn_handler, listStates_createServerFn_handler, listTeams_createServerFn_handler };
