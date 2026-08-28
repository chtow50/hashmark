import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { predictMatchup } from "./model";
import { POS_SQL_ARRAY, TALENT_UNITS_JOIN } from "./positions";
import type { GameRow, Player, RecruitingClass, StateCommit, StateRow, TeamSummary } from "./types";

type TeamDb = {
  id: number;
  slug: string;
  name: string;
  short_name: string;
  mascot: string;
  conference: string;
  city: string;
  state: string;
  color_primary: string;
  color_secondary: string;
  last_wins: number;
  last_losses: number;
  last_finish: string;
  hx_rank: number;
  hx_rating: number;
  ap_rank: number | null;
  offense_rating: number;
  defense_rating: number;
  special_rating: number;
  sos_rating: number;
  projected_wins: number;
  returning_production: number;
  playoff_odds: number;
  prior_score: number;
  talent_score: number;
  rec_rank: number;
  commits: number;
  rec_avg: number;
  rec_points: number;
  five_stars: number;
  four_stars: number;
  three_stars: number;
  talent_rank: number;
  roster_talent: number;
  blue_chip_pct: number;
  transfer_pct: number;
  transfer_count: number;
  off_talent: number;
  def_talent: number;
  starter_talent: number;
  roster_avg_rating: number;
  hs_talent: number;
  portal_talent: number;
  portal_share: number;
  qb_talent: number;
  skill_talent: number;
  ol_talent: number;
  dl_talent: number;
  lb_talent: number;
  db_talent: number;
  avg_height_in: number;
  avg_weight_lbs: number;
  ol_avg_height_in: number;
  ol_avg_weight_lbs: number;
  skill_avg_height_in: number;
  skill_avg_weight_lbs: number;
  db_avg_height_in: number;
  returning_starters: number;
  z_talent: number;
  z_retention: number;
  z_trend: number;
  z_portal: number;
  z_prior: number;
  two_deep_source: "listed" | "projected";
};

const TEAM_SELECT = `
  t.id, t.slug, t.name, t.short_name, t.mascot, t.conference, t.city, t.state,
  t.color_primary, t.color_secondary, t.last_wins, t.last_losses, t.last_finish,
  r.hx_rank, r.hx_rating, r.ap_rank, r.offense_rating, r.defense_rating,
  r.special_rating, r.sos_rating, r.projected_wins, r.returning_production,
  r.playoff_odds, r.prior_score, r.talent_score,
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
  p.avg_height_in, p.avg_weight_lbs, p.ol_avg_height_in, p.ol_avg_weight_lbs,
  p.skill_avg_height_in, p.skill_avg_weight_lbs, p.db_avg_height_in,
  p.returning_starters, p.two_deep_source
`;

const TEAM_FROM = `
  from teams t
  join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
  join recruiting rec on rec.team_id = t.id and rec.class_year = 2026
  join roster_profile p on p.team_id = t.id
  ${TALENT_UNITS_JOIN}
`;

function mapTeam(row: TeamDb): TeamSummary {
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
    lastFinish: row.last_finish,
    hxRank: row.hx_rank,
    hxRating: Number(row.hx_rating),
    apRank: row.ap_rank,
    offenseRating: Number(row.offense_rating),
    defenseRating: Number(row.defense_rating),
    specialRating: Number(row.special_rating),
    sosRating: Number(row.sos_rating),
    projectedWins: Number(row.projected_wins),
    returningProduction: Number(row.returning_production),
    playoffOdds: Number(row.playoff_odds),
    priorScore: Number(row.prior_score),
    talentScore: Number(row.roster_talent ?? row.talent_score),
    recRank: row.rec_rank,
    commits: row.commits,
    recAvg: Number(row.rec_avg),
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
    dbAvgHeightIn: Number(row.db_avg_height_in),
    returningStarters: row.returning_starters,
    zTalent: Number(row.z_talent),
    zRetention: Number(row.z_retention),
    zTrend: Number(row.z_trend),
    zPortal: Number(row.z_portal),
    zPrior: Number(row.z_prior),
    twoDeepSource: row.two_deep_source === "listed" ? "listed" : "projected",
  };
}

export const listTeams = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql.query<TeamDb>(
    `select ${TEAM_SELECT}
     ${TEAM_FROM}
     order by r.hx_rank asc`,
  );
  return rows.map(mapTeam);
});

export const getTeam = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql.query<TeamDb>(
      `select ${TEAM_SELECT}
       ${TEAM_FROM}
       where t.slug = $1`,
      [data.slug],
    );
    const team = rows[0] ? mapTeam(rows[0]) : null;
    if (!team) return null;
    const players = await sql.query<Player>(
      `select id, team_id as "teamId", name, jersey, position, depth,
              class_year as "classYear",
              height_in as "heightIn", weight_lbs as "weightLbs", stars,
              rating, hometown_state as "hometownState", unit, transfer
       from players where team_id = $1
       order by unit desc, array_position(${POS_SQL_ARRAY}, position), depth, name`,
      [team.id],
    );
    const classes = await sql.query<RecruitingClass>(
      `select rec.team_id as "teamId", t.slug, t.name, t.short_name as "shortName",
              t.conference, t.color_primary as "colorPrimary", r.hx_rank as "hxRank",
              rec.class_year as "classYear", rec.composite_rank as "compositeRank",
              rec.commits, rec.avg_rating as "avgRating", rec.points,
              rec.five_stars as "fiveStars", rec.four_stars as "fourStars",
              rec.three_stars as "threeStars"
       from recruiting rec
       join teams t on t.id = rec.team_id
       join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
       where rec.team_id = $1
       order by rec.class_year`,
      [team.id],
    );
    const games = await sql.query<GameRow>(
      `select g.id, g.week, g.kickoff_date as "kickoffDate",
              ht.slug as "homeSlug", at.slug as "awaySlug",
              ht.name as "homeName", at.name as "awayName",
              ht.short_name as "homeShort", at.short_name as "awayShort",
              ht.color_primary as "homeColor", at.color_primary as "awayColor",
              coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx",
              hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
              hr.offense_rating as "homeOff", ar.offense_rating as "awayOff",
              hr.defense_rating as "homeDef", ar.defense_rating as "awayDef",
              g.neutral, g.location, g.headline
       from games g
       join teams ht on ht.id = g.home_team_id
       join teams at on at.id = g.away_team_id
       join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
       join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
       where ht.slug = $1 or at.slug = $1
       order by g.week, g.id`,
      [data.slug],
    );
    return {
      team,
      players: players.map(mapPlayer),
      classes: classes.map(mapClass),
      games: games.map(numGame),
    };
  });

function mapClass(row: RecruitingClass): RecruitingClass {
  return {
    ...row,
    avgRating: Number(row.avgRating),
    points: Number(row.points),
    compositeRank: Number(row.compositeRank),
    commits: Number(row.commits),
    fiveStars: Number(row.fiveStars),
    fourStars: Number(row.fourStars),
    threeStars: Number(row.threeStars),
    hxRank: Number(row.hxRank),
  };
}

export const listRecruiting = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql.query<RecruitingClass>(
    `select rec.team_id as "teamId", t.slug, t.name, t.short_name as "shortName",
            t.conference, t.color_primary as "colorPrimary", r.hx_rank as "hxRank",
            rec.class_year as "classYear", rec.composite_rank as "compositeRank",
            rec.commits, rec.avg_rating as "avgRating", rec.points,
            rec.five_stars as "fiveStars", rec.four_stars as "fourStars",
            rec.three_stars as "threeStars"
     from recruiting rec
     join teams t on t.id = rec.team_id
     join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
     order by rec.class_year, rec.composite_rank, t.name`,
  );
  return rows.map(mapClass);
});

function mapPlayer(p: Player): Player {
  return {
    ...p,
    jersey: p.jersey == null ? null : Number(p.jersey),
    depth: Number(p.depth ?? 1),
    rating: Number(p.rating),
    heightIn: Number(p.heightIn),
    weightLbs: Number(p.weightLbs),
    stars: Number(p.stars),
    transfer: Boolean(p.transfer),
  };
}

function numGame(g: GameRow): GameRow {
  return {
    ...g,
    homeHx: Number(g.homeHx),
    awayHx: Number(g.awayHx),
    homeOff: Number(g.homeOff),
    awayOff: Number(g.awayOff),
    homeDef: Number(g.homeDef),
    awayDef: Number(g.awayDef),
    neutral: Boolean(g.neutral),
  };
}

export const listGames = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql.query<GameRow>(
    `select g.id, g.week, g.kickoff_date as "kickoffDate",
            ht.slug as "homeSlug", at.slug as "awaySlug",
            ht.name as "homeName", at.name as "awayName",
            ht.short_name as "homeShort", at.short_name as "awayShort",
            ht.color_primary as "homeColor", at.color_primary as "awayColor",
            coalesce(g.lock_home_hx, hr.hx_rating) as "homeHx", coalesce(g.lock_away_hx, ar.hx_rating) as "awayHx",
            hr.hx_rank as "homeRank", ar.hx_rank as "awayRank",
            hr.offense_rating as "homeOff", ar.offense_rating as "awayOff",
            hr.defense_rating as "homeDef", ar.defense_rating as "awayDef",
            g.neutral, g.location, g.headline
     from games g
     join teams ht on ht.id = g.home_team_id
     join teams at on at.id = g.away_team_id
     join rankings hr on hr.team_id = ht.id and hr.season = 2026 and hr.week = 0
     join rankings ar on ar.team_id = at.id and ar.season = 2026 and ar.week = 0
     order by g.week, g.id`,
  );
  return rows.map(numGame);
});

export const getMatchup = createServerFn({ method: "GET" })
  .validator(
    z.object({
      home: z.string().min(1),
      away: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql.query<TeamDb>(
      `select ${TEAM_SELECT}
       ${TEAM_FROM}
       where t.slug = $1 or t.slug = $2`,
      [data.home, data.away],
    );
    const mapped = rows.map(mapTeam);
    const home = mapped.find((t) => t.slug === data.home) ?? null;
    const away = mapped.find((t) => t.slug === data.away) ?? null;
    if (!home || !away) return { home, away, homePlayers: [], awayPlayers: [], prediction: null };

    const players = await sql.query<Player>(
      `select id, team_id as "teamId", name, jersey, position, depth,
              class_year as "classYear",
              height_in as "heightIn", weight_lbs as "weightLbs", stars,
              rating, hometown_state as "hometownState", unit, transfer
       from players where team_id = $1 or team_id = $2
       order by unit desc, array_position(${POS_SQL_ARRAY}, position), depth, name`,
      [home.id, away.id],
    );
    const mappedPlayers = players.map(mapPlayer);
    let prediction = predictMatchup(home, away);
    const locked = await sql.query<{
      lockHomeHx: number;
      lockAwayHx: number;
      neutral: boolean;
    }>(
      `select g.lock_home_hx as "lockHomeHx", g.lock_away_hx as "lockAwayHx", g.neutral
       from games g
       join teams ht on ht.id = g.home_team_id
       join teams at on at.id = g.away_team_id
       where g.lock_home_hx is not null
         and ht.slug = $1 and at.slug = $2
       limit 1`,
      [data.home, data.away],
    );
    const lock = locked[0];
    if (lock) {
      prediction = predictMatchup(
        { ...home, hxRating: Number(lock.lockHomeHx) },
        { ...away, hxRating: Number(lock.lockAwayHx) },
        { neutral: Boolean(lock.neutral) },
      );
    }
    return {
      home,
      away,
      homePlayers: mappedPlayers.filter((p) => p.teamId === home.id),
      awayPlayers: mappedPlayers.filter((p) => p.teamId === away.id),
      prediction,
    };
  });

export const listStates = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql.query<StateRow>(
    `select s.code, s.name, s.region, s.recruits, s.five_stars as "fiveStars",
            s.avg_rating as "avgRating", s.talent_index as "talentIndex",
            (select count(*)::int from teams t where t.state = s.code) as "teamCount"
     from states s
     order by s.talent_index desc`,
  );
  return rows.map((r) => ({
    ...r,
    avgRating: Number(r.avgRating),
    talentIndex: Number(r.talentIndex),
  }));
});

export const getStateDetail = createServerFn({ method: "GET" })
  .validator(z.object({ code: z.string().min(2).max(2) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const code = data.code.toUpperCase();
    const states = await sql.query<StateRow>(
      `select s.code, s.name, s.region, s.recruits, s.five_stars as "fiveStars",
              s.avg_rating as "avgRating", s.talent_index as "talentIndex",
              (select count(*)::int from teams t where t.state = s.code) as "teamCount"
       from states s where s.code = $1`,
      [code],
    );
    const state = states[0]
      ? {
          ...states[0],
          avgRating: Number(states[0].avgRating),
          talentIndex: Number(states[0].talentIndex),
        }
      : null;
    const teams = await sql.query<{
      slug: string;
      name: string;
      conference: string;
      city: string;
      color_primary: string;
      hx_rank: number;
      mascot: string;
    }>(
      `select t.slug, t.name, t.conference, t.city, t.color_primary, r.hx_rank, t.mascot
       from teams t
       join rankings r on r.team_id = t.id and r.season = 2026 and r.week = 0
       where t.state = $1
       order by r.hx_rank`,
      [code],
    );
    const commits = await sql.query<StateCommit>(
      `select sc.state_code as "stateCode", t.slug as "teamSlug", t.name as "teamName",
              t.conference, t.color_primary as "colorPrimary", sc.commits
       from state_commits sc
       join teams t on t.id = sc.team_id
       where sc.state_code = $1
       order by sc.commits desc, t.name
       limit 12`,
      [code],
    );
    return { state, teams, commits };
  });
