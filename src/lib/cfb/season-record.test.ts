import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  SEASON_RECORD_JOIN,
  combineSeasonRecord,
  formatSeasonRecord,
  tallyFcsStubRecord,
  tallySeasonRecord,
  type SeasonRecordGame,
} from "./season-record.ts";

function game(partial: Partial<SeasonRecordGame> & Pick<SeasonRecordGame, "homeTeamId" | "awayTeamId">): SeasonRecordGame {
  return {
    status: "final",
    homeScore: 31,
    awayScore: 24,
    ...partial,
  };
}

describe("tallySeasonRecord", () => {
  it("starts 0–0 with no FINAL", () => {
    assert.deepEqual(tallySeasonRecord([], 1), { seasonWins: 0, seasonLosses: 0 });
    assert.deepEqual(
      tallySeasonRecord([game({ homeTeamId: 1, awayTeamId: 2, status: "scheduled" })], 1),
      { seasonWins: 0, seasonLosses: 0 },
    );
  });

  it("counts home and away FINALs, including FCS-style rows", () => {
    const games = [
      game({ homeTeamId: 1, awayTeamId: 99, homeScore: 45, awayScore: 7 }),
      game({ homeTeamId: 4, awayTeamId: 1, homeScore: 28, awayScore: 21 }),
    ];
    assert.deepEqual(tallySeasonRecord(games, 1), { seasonWins: 1, seasonLosses: 1 });
    assert.deepEqual(tallySeasonRecord(games, 99), { seasonWins: 0, seasonLosses: 1 });
  });

  it("ignores ties, missing scores, and other teams", () => {
    const games = [
      game({ homeTeamId: 1, awayTeamId: 2, homeScore: 17, awayScore: 17 }),
      game({ homeTeamId: 1, awayTeamId: 3, homeScore: null, awayScore: 10 }),
      game({ homeTeamId: 8, awayTeamId: 9, homeScore: 40, awayScore: 3 }),
    ];
    assert.deepEqual(tallySeasonRecord(games, 1), { seasonWins: 0, seasonLosses: 0 });
  });
});

describe("tallyFcsStubRecord", () => {
  it("counts Research FINAL FCS stubs (Georgia 1–0)", () => {
    assert.deepEqual(tallyFcsStubRecord("georgia"), { seasonWins: 1, seasonLosses: 0 });
    assert.deepEqual(tallyFcsStubRecord("missouri"), { seasonWins: 1, seasonLosses: 0 });
    assert.deepEqual(tallyFcsStubRecord("byu"), { seasonWins: 1, seasonLosses: 0 });
  });

  it("leaves unstamped FCS stubs at 0–0", () => {
    assert.deepEqual(tallyFcsStubRecord("buffalo"), { seasonWins: 0, seasonLosses: 0 });
    assert.deepEqual(tallyFcsStubRecord("ohio-state"), { seasonWins: 0, seasonLosses: 0 });
  });

  it("counts Miami Week 2 FAMU FINAL as one FCS win (home 77–7)", () => {
    assert.deepEqual(tallyFcsStubRecord("miami"), { seasonWins: 1, seasonLosses: 0 });
  });
});

describe("SEASON_RECORD_JOIN", () => {
  it("unions Research FINAL FCS stubs into the SQL tally", () => {
    assert.match(SEASON_RECORD_JOIN, /'georgia'/);
    assert.match(SEASON_RECORD_JOIN, /'missouri'/);
    assert.doesNotMatch(SEASON_RECORD_JOIN, /'buffalo'/);
    assert.match(SEASON_RECORD_JOIN, /'miami'/);
  });
});

describe("combineSeasonRecord", () => {
  it("adds FBS FINALs and FCS stub FINALs", () => {
    assert.deepEqual(
      combineSeasonRecord({ seasonWins: 1, seasonLosses: 1 }, tallyFcsStubRecord("georgia")),
      { seasonWins: 2, seasonLosses: 1 },
    );
    assert.deepEqual(
      combineSeasonRecord({ seasonWins: 0, seasonLosses: 0 }, tallyFcsStubRecord("georgia")),
      { seasonWins: 1, seasonLosses: 0 },
    );
    // Miami: Week 1 @ Stanford 45–6 (games row) + Week 2 FAMU 77–7 (FCS stub).
    assert.deepEqual(
      combineSeasonRecord({ seasonWins: 1, seasonLosses: 0 }, tallyFcsStubRecord("miami")),
      { seasonWins: 2, seasonLosses: 0 },
    );
  });
});

describe("formatSeasonRecord", () => {
  it("uses an en-dash", () => {
    assert.equal(formatSeasonRecord(1, 0), "1–0");
    assert.equal(formatSeasonRecord(0, 0), "0–0");
  });
});
