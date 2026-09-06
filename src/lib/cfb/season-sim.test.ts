import assert from "node:assert/strict";
import { test } from "node:test";
import { fcsStubsForTeam } from "./fcs-stubs.ts";
import { buildRemainingSchedule, make12FromTeam } from "./season-sim.ts";
import type { TeamScheduleGame } from "./season-sim.ts";

test("make12FromTeam maps legacy playoff_odds to make-field only", () => {
  const odds = make12FromTeam({ playoffOdds: 42.5 });
  assert.equal(odds.makeField, 42.5);
  assert.equal(odds.winTitle, null);
  assert.equal(odds.makeFieldSource, "legacy-playoff-odds");
  assert.equal(odds.winTitleSource, "pending");
});

test("buildRemainingSchedule merges FCS stubs and drops finals", () => {
  const games: TeamScheduleGame[] = [
    {
      id: 1,
      week: 2,
      kickoffDate: "2026-09-12",
      homeSlug: "georgia",
      awaySlug: "western-kentucky",
      homeName: "Georgia",
      awayName: "Western Kentucky",
      homeShort: "Georgia",
      awayShort: "WKU",
      homeColor: "#ba0c2f",
      awayColor: "#c8102e",
      homeHx: 7,
      awayHx: 1,
      homeRank: 1,
      awayRank: 50,
      homeOff: 30,
      awayOff: 20,
      homeDef: 28,
      awayDef: 22,
      neutral: false,
      location: "Sanford Stadium",
      headline: null,
      status: "scheduled",
      homeScore: null,
      awayScore: null,
    },
    {
      id: 2,
      week: 1,
      kickoffDate: "2026-09-05",
      homeSlug: "georgia",
      awaySlug: "clemson",
      homeName: "Georgia",
      awayName: "Clemson",
      homeShort: "Georgia",
      awayShort: "Clemson",
      homeColor: "#ba0c2f",
      awayColor: "#f56600",
      homeHx: 7,
      awayHx: 5,
      homeRank: 1,
      awayRank: 10,
      homeOff: 30,
      awayOff: 28,
      homeDef: 28,
      awayDef: 26,
      neutral: false,
      location: "Sanford Stadium",
      headline: null,
      status: "final",
      homeScore: 31,
      awayScore: 24,
    },
  ];

  const rows = buildRemainingSchedule("georgia", games);
  const fcs = rows.filter((r) => r.isFcs);
  const fbs = rows.filter((r) => !r.isFcs);

  assert.equal(fbs.length, 1);
  assert.equal(fbs[0]?.opponentSlug, "western-kentucky");
  assert.ok(fcs.length >= 1);
  assert.ok(fcs.some((r) => r.kickoffDate === "2026-09-05"));
});

test("fcsStubsForTeam returns georgia week-1 FCS row", () => {
  const stubs = fcsStubsForTeam("georgia");
  assert.ok(stubs.some((s) => s.kickoffDate === "2026-09-05"));
});
