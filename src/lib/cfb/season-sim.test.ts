import assert from "node:assert/strict";
import { test } from "node:test";
import { fcsStubsForTeam } from "./fcs-stubs.ts";
import { buildRemainingSchedule, buildSeasonSchedule, make12FromTeam } from "./season-sim.ts";
import type { ScheduleGame } from "./types.ts";

function scheduleFixture(
  partial: Partial<ScheduleGame> & Pick<ScheduleGame, "id" | "homeSlug" | "awaySlug" | "status">,
): ScheduleGame {
  return {
    week: partial.week ?? 1,
    kickoffDate: partial.kickoffDate ?? "2026-09-05",
    homeName: partial.homeName ?? "Georgia",
    awayName: partial.awayName ?? "Opponent",
    homeShort: partial.homeShort ?? "Georgia",
    awayShort: partial.awayShort ?? "Opp",
    homeColor: partial.homeColor ?? "#ba0c2f",
    awayColor: partial.awayColor ?? "#000",
    homeHx: partial.homeHx ?? 7,
    awayHx: partial.awayHx ?? 1,
    homeRank: partial.homeRank ?? 1,
    awayRank: partial.awayRank ?? 50,
    homeOff: partial.homeOff ?? 30,
    awayOff: partial.awayOff ?? 20,
    homeDef: partial.homeDef ?? 28,
    awayDef: partial.awayDef ?? 22,
    neutral: partial.neutral ?? false,
    location: partial.location ?? null,
    headline: partial.headline ?? null,
    kickoffAt: partial.kickoffAt ?? null,
    vegasSpread: partial.vegasSpread ?? null,
    vegasTotal: partial.vegasTotal ?? null,
    homeScore: partial.homeScore ?? null,
    awayScore: partial.awayScore ?? null,
    tv: partial.tv ?? null,
    ...partial,
  };
}

test("make12FromTeam maps legacy playoff_odds to make-field only", () => {
  const odds = make12FromTeam({ playoffOdds: 42.5 });
  assert.equal(odds.makeField, 42.5);
  assert.equal(odds.winTitle, null);
  assert.equal(odds.makeFieldSource, "legacy-playoff-odds");
  assert.equal(odds.winTitleSource, "pending");
});

test("buildRemainingSchedule merges FCS stubs and drops finals", () => {
  const games: ScheduleGame[] = [
    scheduleFixture({
      id: 1,
      week: 2,
      kickoffDate: "2026-09-12",
      homeSlug: "georgia",
      awaySlug: "western-kentucky",
      awayName: "Western Kentucky",
      awayShort: "WKU",
      awayColor: "#c8102e",
      status: "scheduled",
    }),
    scheduleFixture({
      id: 2,
      week: 1,
      kickoffDate: "2026-09-05",
      homeSlug: "georgia",
      awaySlug: "clemson",
      awayName: "Clemson",
      awayShort: "Clemson",
      awayColor: "#f56600",
      awayHx: 5,
      awayRank: 10,
      awayOff: 28,
      awayDef: 26,
      status: "final",
      homeScore: 31,
      awayScore: 24,
    }),
  ];

  const rows = buildRemainingSchedule("georgia", games);
  const fcs = rows.filter((r) => r.isFcs);
  const fbs = rows.filter((r) => !r.isFcs);

  assert.equal(fbs.length, 1);
  assert.equal(fbs[0]?.opponentSlug, "western-kentucky");
  assert.equal(fbs[0]?.opponentColor, "#c8102e");
  assert.ok(fbs[0]?.game?.vegasSpread === null);
  assert.ok(fcs.length >= 1);
  assert.ok(fcs.some((r) => r.kickoffDate === "2026-09-05"));
});

test("buildSeasonSchedule keeps finals with scores", () => {
  const games: ScheduleGame[] = [
    scheduleFixture({
      id: 2,
      homeSlug: "georgia",
      awaySlug: "clemson",
      status: "final",
      homeScore: 31,
      awayScore: 24,
      vegasSpread: 3.5,
      vegasTotal: 52.5,
    }),
  ];
  const rows = buildSeasonSchedule("georgia", games);
  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.status, "final");
  assert.equal(rows[0]?.homeScore, 31);
  assert.equal(rows[0]?.game?.vegasSpread, 3.5);
});

test("fcsStubsForTeam returns georgia week-1 FCS row", () => {
  const stubs = fcsStubsForTeam("georgia");
  assert.ok(stubs.some((s) => s.kickoffDate === "2026-09-05"));
});
