import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { fcsStubsForTeam } from "./fcs-stubs.ts";
import {
  buildRemainingSchedule,
  buildSeasonSchedule,
  make12FieldLabel,
  make12FreeFromSim,
  make12FromSimRow,
  make12FreeView,
  make12FromTeam,
  make12PanelLede,
  make12TitleLabel,
} from "./season-sim.ts";
import { make12FromSimFull } from "./sim-full.server.ts";
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

test("make12FromSimFull (server-only) loads Georgia HX 2026.7 draws — make-field is not title", () => {
  const odds = make12FromSimFull("georgia", { playoffOdds: 98.4 });
  assert.equal(odds.makeFieldSource, "amd-draws");
  assert.equal(odds.winTitleSource, "amd-draws");
  assert.ok(odds.makeField != null);
  assert.ok(odds.winTitle != null);
  assert.equal(odds.makeField, 86.51);
  assert.equal(odds.winTitle, 24.29);
  assert.equal(Number(odds.makeField.toFixed(1)), 86.5);
  assert.equal(Number(odds.winTitle.toFixed(1)), 24.3);
  assert.notEqual(odds.makeField, odds.winTitle);
  assert.notEqual(Number(odds.makeField.toFixed(0)), 98);
  assert.match(make12FieldLabel(odds.makeFieldSource) ?? "", /HX 2026\.7 · 10k draws/);
  assert.match(make12FieldLabel(odds.makeFieldSource) ?? "", /2026-10-05/);
  assert.match(make12FieldLabel(odds.makeFieldSource) ?? "", /not title/);
  assert.doesNotMatch(make12FieldLabel(odds.makeFieldSource) ?? "", /HX 2026\.6 ·/);
  assert.doesNotMatch(make12FieldLabel(odds.makeFieldSource) ?? "", /HX 2026\.4/);
  assert.doesNotMatch(make12FieldLabel(odds.makeFieldSource) ?? "", /pre-Δ/);
  assert.doesNotMatch(make12TitleLabel(odds.winTitleSource) ?? "", /not a post-2026\.3 re-sim/);
  assert.doesNotMatch(make12TitleLabel(odds.winTitleSource) ?? "", /pre-Δ/);
  assert.match(make12PanelLede(odds.makeFieldSource), /not a national title/);
  assert.match(make12PanelLede(odds.makeFieldSource), /HX 2026\.7 · 10k draws/);
  assert.doesNotMatch(make12PanelLede(odds.makeFieldSource), /HX 2026\.6 ·/);
  assert.doesNotMatch(make12PanelLede(odds.makeFieldSource), /HX 2026\.4/);
  assert.doesNotMatch(make12PanelLede(odds.makeFieldSource), /pre-Δ/);
  assert.doesNotMatch(make12PanelLede(odds.makeFieldSource), /not a post-2026\.3 re-sim/);
});

test("rankings Make 12 column reads make12FreeFromSim makeField, not playoffOdds", () => {
  const src = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../routes/rankings.tsx"),
    "utf8",
  );
  assert.match(src, /make12FreeFromSim\(t\.slug, t\)\.makeField/);
  assert.doesNotMatch(src, /make12FromSim\(/);
  assert.doesNotMatch(src, /fmtPct\(t\.playoffOdds/);
});

test("free Make 12 keeps Georgia make-field public and drops win_title (Edge Pack only)", () => {
  const free = make12FreeFromSim("georgia", { playoffOdds: 98.4 });
  assert.equal(free.makeField, 86.51);
  assert.equal(free.makeFieldSource, "amd-draws");
  assert.equal(free.winTitle, null);
  assert.equal(free.winTitleSource, "pack-only");
  assert.match(make12TitleLabel(free.winTitleSource) ?? "", /Edge Pack only/);
  assert.doesNotMatch(JSON.stringify(free), /24\.29|24\.3/);
  // Free row (no title field) maps straight to pack-only — the client never reads a title.
  const row = make12FromSimRow({ make_field: 86.51 });
  assert.equal(row.makeField, 86.51);
  assert.equal(row.winTitle, null);
  assert.equal(row.winTitleSource, "pack-only");
  // Pending / legacy stay pending — never relabelled as a pack number.
  const legacy = make12FreeView(make12FromTeam({ playoffOdds: 42.5 }));
  assert.equal(legacy.winTitle, null);
  assert.equal(legacy.winTitleSource, "pending");
});

test("free team page and Make12Panel never render win_title", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const team = readFileSync(join(here, "../../routes/teams.$slug.tsx"), "utf8");
  assert.match(team, /make12FreeFromSim\(team\.slug, team\)/);
  assert.doesNotMatch(team, /make12FromSim\(/);
  assert.doesNotMatch(team, /tier="pack"/);
  const panel = readFileSync(join(here, "../../components/season-sim.tsx"), "utf8");
  assert.match(panel, /tier = "free"/);
  assert.match(panel, /make12FreeView\(odds\)/);
  for (const route of ["index.tsx", "rankings.tsx"]) {
    const src = readFileSync(join(here, "../../routes", route), "utf8");
    assert.doesNotMatch(src, /winTitle|win_title/, `${route} must not render win_title on free chrome`);
    assert.match(src, /make12FreeFromSim\(/, `${route} reads the free Make 12 export`);
  }
});

test("client modules never import the full sim or title-bearing fixtures", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = join(here, "../..");
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
      d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
    );
  const clientFiles = walk(src).filter(
    (f) => /\.(ts|tsx)$/.test(f) && !/\.test\.tsx?$/.test(f) && !/\.server\.tsx?$/.test(f),
  );
  assert.ok(clientFiles.length > 20);
  for (const f of clientFiles) {
    const text = readFileSync(f, "utf8");
    assert.doesNotMatch(text, /from "[^"]*sim_10k_2026[^"]*\.json"/, f);
    assert.doesNotMatch(text, /from "[^"]*scenario_sim_golden_response\.json"/, f);
    assert.doesNotMatch(text, /from "[^"]*scenario_sim_rerun_contract_example\.json"/, f);
    assert.doesNotMatch(text, /from "[^"]*(sim-full|scenario-sim-contract)\.server[^"]*"/, f);
    assert.doesNotMatch(text, /hx_edge_full_sim_table/, f);
  }
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

test("Miami Week 2 FAMU FINAL drops from remaining (Vegas-only stub still stamped)", () => {
  const remaining = buildRemainingSchedule("miami", []);
  assert.equal(
    remaining.filter((r) => r.isFcs && r.week === 2).length,
    0,
    "Miami FAMU FINAL must not appear as remaining",
  );

  const famu = fcsStubsForTeam("miami").find((s) => s.week === 2);
  assert.ok(famu);
  assert.match(famu.opponentLabel, /Florida A&M/);
  assert.equal(famu.status, "final");
  assert.equal(famu.home, true);
  assert.equal(famu.homeScore, 77);
  assert.equal(famu.awayScore, 7);
  assert.equal(famu.vegasSpread, 59.5);
  assert.equal(famu.tv, "ACCN");
  assert.equal(famu.hxSpreadPolicy, "vegas_only_fcs_unrated");
});
