import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { fcsStubsForTeam } from "./fcs-stubs.ts";
import {
  buildRemainingSchedule,
  buildSeasonSchedule,
  make12FieldLabel,
  make12FromSim,
  make12FromTeam,
  make12PanelLede,
  make12TitleLabel,
} from "./season-sim.ts";
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

test("make12FromSim loads Georgia HX 2026.3 draws — make-field is not title", () => {
  const odds = make12FromSim("georgia", { playoffOdds: 98.4 });
  assert.equal(odds.makeFieldSource, "amd-draws");
  assert.equal(odds.winTitleSource, "amd-draws");
  assert.ok(odds.makeField != null);
  assert.ok(odds.winTitle != null);
  assert.equal(odds.makeField, 74.31);
  assert.equal(odds.winTitle, 20.84);
  assert.equal(Number(odds.makeField.toFixed(1)), 74.3);
  assert.equal(Number(odds.winTitle.toFixed(1)), 20.8);
  assert.notEqual(odds.makeField, odds.winTitle);
  assert.notEqual(Number(odds.makeField.toFixed(0)), 98);
  assert.match(make12FieldLabel(odds.makeFieldSource) ?? "", /HX 2026\.3 · 10k draws/);
  assert.match(make12FieldLabel(odds.makeFieldSource) ?? "", /2026-09-09/);
  assert.match(make12FieldLabel(odds.makeFieldSource) ?? "", /not title/);
  assert.doesNotMatch(make12FieldLabel(odds.makeFieldSource) ?? "", /pre-Δ/);
  assert.doesNotMatch(make12TitleLabel(odds.winTitleSource) ?? "", /not a post-2026\.3 re-sim/);
  assert.doesNotMatch(make12TitleLabel(odds.winTitleSource) ?? "", /pre-Δ/);
  assert.match(make12PanelLede(odds.makeFieldSource), /not a national title/);
  assert.match(make12PanelLede(odds.makeFieldSource), /HX 2026\.3 · 10k draws/);
  assert.doesNotMatch(make12PanelLede(odds.makeFieldSource), /pre-Δ/);
  assert.doesNotMatch(make12PanelLede(odds.makeFieldSource), /not a post-2026\.3 re-sim/);
});

test("rankings Make 12 column reads make12FromSim makeField, not playoffOdds", () => {
  const src = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../routes/rankings.tsx"),
    "utf8",
  );
  assert.match(src, /make12FromSim\(t\.slug, t\)\.makeField/);
  assert.doesNotMatch(src, /fmtPct\(t\.playoffOdds/);
});

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
  assert.equal(fcs.length, 0);
});

test("buildRemainingSchedule keeps scheduled FCS stubs and drops FINAL stubs", () => {
  const scheduled = buildRemainingSchedule("buffalo", []);
  assert.ok(scheduled.some((r) => r.isFcs && r.kickoffDate === "2026-09-03"));
  assert.ok(scheduled.every((r) => r.status !== "final"));

  const georgia = buildRemainingSchedule("georgia", []);
  assert.equal(
    georgia.filter((r) => r.isFcs).length,
    0,
    "Georgia TSU FINAL must not appear as remaining",
  );
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

test("fcsStubsForTeam returns georgia week-1 FCS FINAL", () => {
  const stubs = fcsStubsForTeam("georgia");
  const uga = stubs.find((s) => s.kickoffDate === "2026-09-05");
  assert.ok(uga);
  assert.equal(uga?.status, "final");
  assert.equal(uga?.opponentLabel, "Tennessee State");
  assert.equal(uga?.homeScore, 63);
  assert.equal(uga?.awayScore, 3);
});
