import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { filterScheduleGames, top25SlugSet } from "./schedule-filter.ts";
import type { ScheduleGame, TeamSummary } from "./types.ts";

function team(slug: string, hxRank: number, apRank: number | null, conference = "SEC"): TeamSummary {
  return {
    id: 1,
    slug,
    name: slug,
    shortName: slug,
    mascot: "Mascot",
    conference,
    city: "City",
    state: "AL",
    colorPrimary: "#000",
    colorSecondary: "#fff",
    lastWins: 0,
    lastLosses: 0,
    seasonWins: 0,
    seasonLosses: 0,
    lastFinish: "",
    hxRank,
    hxRating: 90,
    apRank,
    offenseRating: 90,
    defenseRating: 90,
    specialRating: 90,
    sosRating: 90,
    projectedWins: 10,
    returningProduction: 50,
    playoffOdds: 10,
    priorScore: 90,
    talentScore: 92,
    recRank: 1,
    commits: 20,
    recAvg: 90,
    recPoints: 300,
    fiveStars: 2,
    fourStars: 10,
    threeStars: 8,
    talentRank: 1,
    blueChipPct: 50,
    transferPct: 10,
    transferCount: 0,
    offTalent: 90,
    defTalent: 90,
    starterTalent: 92,
    rosterAvgRating: 90,
    hsTalent: 91,
    portalTalent: 0,
    portalShare: 0,
    qbTalent: 90,
    skillTalent: 90,
    olTalent: 90,
    dlTalent: 90,
    lbTalent: 90,
    dbTalent: 90,
    avgHeightIn: 74,
    avgWeightLbs: 210,
    olAvgHeightIn: 76,
    olAvgWeightLbs: 310,
    skillAvgHeightIn: 72,
    skillAvgWeightLbs: 200,
    qbAvgHeightIn: 74,
    qbAvgWeightLbs: 215,
    dlAvgHeightIn: 76,
    dlAvgWeightLbs: 285,
    lbAvgHeightIn: 73,
    lbAvgWeightLbs: 230,
    dbAvgHeightIn: 72,
    dbAvgWeightLbs: 195,
    returningStarters: 10,
    zTalent: 1,
    zRetention: 0,
    zTrend: 0,
    zPortal: 0,
    zPrior: 0,
    twoDeepSource: "listed",
  };
}

function game(homeSlug: string, awaySlug: string): ScheduleGame {
  return {
    id: 1,
    week: 1,
    kickoffDate: "2026-09-05",
    homeSlug,
    awaySlug,
    homeName: homeSlug,
    awayName: awaySlug,
    homeShort: homeSlug,
    awayShort: awaySlug,
    homeColor: "#000",
    awayColor: "#fff",
    homeHx: 90,
    awayHx: 80,
    homeRank: 1,
    awayRank: 50,
    homeOff: 90,
    awayOff: 80,
    homeDef: 90,
    awayDef: 80,
    neutral: false,
    location: null,
    headline: null,
    kickoffAt: null,
    vegasSpread: null,
    vegasTotal: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    tv: null,
  };
}

describe("schedule-filter", () => {
  it("builds top-25 slug set from HX and AP", () => {
    const teams = [
      team("georgia", 1, 3),
      team("coastal", 80, 22),
      team("james-madison", 90, null),
    ];
    const top = top25SlugSet(teams);
    assert.equal(top.has("georgia"), true);
    assert.equal(top.has("coastal"), true);
    assert.equal(top.has("james-madison"), false);
  });

  it("filters top-25 games when either side qualifies", () => {
    const teams = [team("georgia", 1, 3), team("auburn", 30, null), team("kent-state", 120, null)];
    const games = [game("georgia", "kent-state"), game("auburn", "kent-state")];
    const filtered = filterScheduleGames(games, teams, "top25", "All");
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].homeSlug, "georgia");
  });

  it("filters conference games", () => {
    const teams = [
      team("georgia", 1, 3, "SEC"),
      team("ohio-state", 2, 1, "Big Ten"),
    ];
    const games = [game("georgia", "ohio-state")];
    const secOnly = filterScheduleGames(games, teams, "conf", "SEC");
    assert.equal(secOnly.length, 1);
    const bigTenOnly = filterScheduleGames(games, teams, "conf", "Big Ten");
    assert.equal(bigTenOnly.length, 1);
    const accOnly = filterScheduleGames(games, teams, "conf", "ACC");
    assert.equal(accOnly.length, 0);
  });
});
