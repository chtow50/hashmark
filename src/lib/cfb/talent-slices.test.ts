import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hasHsSlice, hasPortalMix, hasPortalSlice } from "./talent-slices.ts";
import type { TeamSummary } from "./types.ts";

function team(partial: Partial<TeamSummary>): TeamSummary {
  return {
    id: 1,
    slug: "test",
    name: "Test",
    shortName: "TST",
    mascot: "Tests",
    conference: "SEC",
    city: "Test",
    state: "AL",
    colorPrimary: "#000",
    colorSecondary: "#fff",
    lastWins: 0,
    lastLosses: 0,
    seasonWins: 0,
    seasonLosses: 0,
    lastFinish: "",
    hxRank: 1,
    hxRating: 90,
    apRank: null,
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
    ...partial,
  };
}

describe("talent-slices", () => {
  it("detects HS slice when rating is positive", () => {
    assert.equal(hasHsSlice(team({ hsTalent: 88.2 })), true);
    assert.equal(hasHsSlice(team({ hsTalent: 0 })), false);
  });

  it("requires transfers for portal slice", () => {
    assert.equal(hasPortalSlice(team({ transferCount: 0, portalTalent: 90 })), false);
    assert.equal(hasPortalSlice(team({ transferCount: 3, portalTalent: 90.1 })), true);
    assert.equal(hasPortalSlice(team({ transferCount: 3, portalTalent: 0 })), false);
  });

  it("hides portal mix without portal players", () => {
    assert.equal(hasPortalMix(team({ transferCount: 0, portalShare: 0 })), false);
    assert.equal(hasPortalMix(team({ transferCount: 2, portalTalent: 88, portalShare: 12 })), true);
  });
});
