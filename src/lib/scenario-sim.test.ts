import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { make12FromSim } from "./cfb/season-sim.ts";
import {
  EDGE_SCENARIO_UNLOCK,
  SCENARIO_SIM_CONFIDENCE_NOTE,
  SCENARIO_SIM_CONTRACT_VERSION,
  SCENARIO_SIM_DEMO_LABEL,
  SCENARIO_SIM_MAX_OVERRIDES,
  SCENARIO_SIM_PRODUCT,
  buildScenarioRequest,
  clampHxBump,
  isScenarioSimUnlocked,
  loadScenarioSimExample,
  loadScenarioSimFixture,
  parseScenarioUnlockSearch,
  runDemoScenarioSim,
  validateOverrides,
  type ForceWinnerOverride,
  type HxBumpOverride,
} from "./scenario-sim.ts";

const here = dirname(fileURLToPath(import.meta.url));

function forceWinner(partial?: Partial<ForceWinnerOverride>): ForceWinnerOverride {
  return {
    type: "force_winner",
    week: 4,
    home_slug: "georgia",
    away_slug: "alabama",
    winner_slug: "alabama",
    ...partial,
  };
}

test("AMD fixture keeps Georgia make-field 75.26 separate from title 21.59", () => {
  const example = loadScenarioSimExample();
  const fixture = loadScenarioSimFixture();
  assert.equal(example.contract_version, SCENARIO_SIM_CONTRACT_VERSION);
  assert.equal(example.product, SCENARIO_SIM_PRODUCT);
  assert.equal(example.request.contract_version, SCENARIO_SIM_CONTRACT_VERSION);
  assert.equal(example.request.product, SCENARIO_SIM_PRODUCT);
  assert.equal(example.request.n_sims, 10000);
  assert.equal(example.request.seed, null);
  assert.equal(example.request.overrides.length, 2);
  assert.ok(example.request.overrides.length >= 1);
  assert.ok(example.request.overrides.length <= SCENARIO_SIM_MAX_OVERRIDES);

  const g = fixture.baseline.georgia;
  assert.ok(g);
  assert.equal(g.make_field, 75.26);
  assert.equal(g.win_title, 21.59);
  assert.notEqual(g.make_field, g.win_title);
  assert.equal(fixture.scenario.georgia.make_field, 72.1);
  assert.equal(fixture.scenario.georgia.win_title, 18.4);
  assert.notEqual(fixture.scenario.georgia.make_field, fixture.scenario.georgia.win_title);
  assert.equal(fixture.confidence_note, SCENARIO_SIM_CONFIDENCE_NOTE);
  assert.match(fixture.confidence_note, /not a lock/i);

  const board = make12FromSim("georgia");
  assert.equal(board.makeField, 75.26);
  assert.equal(board.winTitle, 21.59);
});

test("buildScenarioRequest fills contract defaults and clamps hx_bump", () => {
  const built = buildScenarioRequest({
    overrides: [
      forceWinner(),
      { type: "hx_bump", team_slug: "Ohio State", delta_hx: 1.8, note: "too hot" },
    ],
    teams: ["georgia", "ohio-state"],
  });
  assert.equal(built.ok, true);
  if (!built.ok) return;
  assert.equal(built.request.contract_version, "2026.09.14");
  assert.equal(built.request.product, "hx_edge_scenario_sim");
  assert.equal(built.request.n_sims, 10000);
  assert.equal(built.request.seed, null);
  assert.equal(built.request.hx_stamp, "HX 2026.4");
  assert.equal(built.request.hx_ship_path, "week2_od_hx_ship_2026.json");
  assert.equal(built.request.return.include_full_board, false);
  assert.equal(built.request.return.include_baseline_delta, true);
  const bump = built.request.overrides[1] as HxBumpOverride;
  assert.equal(bump.type, "hx_bump");
  assert.equal(bump.team_slug, "ohio-state");
  assert.equal(bump.delta_hx, 1);
  assert.equal(clampHxBump(-4), -1);
  assert.equal(clampHxBump(0.15), 0.15);
});

test("validators reject empty, too many, unknown slug, bad winner, strict bump range", () => {
  const empty = validateOverrides([]);
  assert.equal(empty.ok, false);
  if (!empty.ok) assert.equal(empty.error, "empty_overrides");

  const tooMany = validateOverrides([
    forceWinner(),
    forceWinner({ home_slug: "ohio-state", away_slug: "texas", winner_slug: "ohio-state" }),
    forceWinner({ home_slug: "oregon", away_slug: "penn-state", winner_slug: "oregon" }),
    { type: "hx_bump", team_slug: "miami", delta_hx: 0.1 },
  ]);
  assert.equal(tooMany.ok, false);
  if (!tooMany.ok) assert.equal(tooMany.error, "too_many_overrides");

  const unknown = validateOverrides([forceWinner({ home_slug: "not-a-team" })]);
  assert.equal(unknown.ok, false);
  if (!unknown.ok) assert.equal(unknown.error, "unknown_slug");

  const winner = validateOverrides([forceWinner({ winner_slug: "ohio-state" })]);
  assert.equal(winner.ok, false);
  if (!winner.ok) assert.equal(winner.error, "winner_not_in_game");

  const range = validateOverrides([{ type: "hx_bump", team_slug: "georgia", delta_hx: 2 }], {
    strictHxBump: true,
  });
  assert.equal(range.ok, false);
  if (!range.ok) assert.equal(range.error, "delta_hx_out_of_range");
});

test("demo runner returns fixture baseline/scenario/Δ and is not a Monte Carlo", () => {
  const built = buildScenarioRequest({
    overrides: [forceWinner(), { type: "hx_bump", team_slug: "ohio-state", delta_hx: 0.15 }],
    teams: ["georgia", "ohio-state"],
  });
  assert.equal(built.ok, true);
  if (!built.ok) return;
  const a = runDemoScenarioSim(built.request);
  const b = runDemoScenarioSim(built.request);
  assert.equal(a.ok, true);
  assert.equal(b.ok, true);
  if (!a.ok || !b.ok) return;
  assert.deepEqual(a.baseline.georgia, b.baseline.georgia);
  assert.deepEqual(a.scenario.georgia, b.scenario.georgia);
  assert.equal(a.baseline.georgia.make_field, 75.26);
  assert.equal(a.baseline.georgia.win_title, 21.59);
  assert.notEqual(a.baseline.georgia.make_field, a.baseline.georgia.win_title);
  assert.notEqual(a.scenario.georgia.make_field, a.scenario.georgia.win_title);
  assert.equal(a.delta.georgia.make_field, -3.16);
  assert.equal(a.confidence_note, SCENARIO_SIM_CONFIDENCE_NOTE);
  assert.equal(a.meta.overrides_applied, 2);
  assert.equal(a.overrides_echo.length, 2);
  assert.doesNotMatch(JSON.stringify(a), /guarantee|ROI|lock ticket/i);
});

test("soft unlock is query/demo only — constant defaults false", () => {
  assert.equal(EDGE_SCENARIO_UNLOCK, false);
  assert.equal(isScenarioSimUnlocked({}), false);
  assert.equal(isScenarioSimUnlocked({ edge: "1" }), true);
  assert.equal(isScenarioSimUnlocked({ unlock: "1" }), true);
  assert.equal(isScenarioSimUnlocked({ edge: "0" }), false);
  const parsed = parseScenarioUnlockSearch({ edge: 1, unlock: "true" });
  assert.equal(parsed.edge, "1");
  assert.equal(isScenarioSimUnlocked(parsed), true);
});

test("/edge copy does not claim a live interactive sim", () => {
  const edge = readFileSync(join(here, "../routes/edge.tsx"), "utf8");
  const preview = readFileSync(join(here, "../components/scenario-sim.tsx"), "utf8");
  const sim = readFileSync(join(here, "../routes/edge_.sim.tsx"), "utf8");
  assert.match(edge, /ScenarioSimPreviewLink/);
  assert.match(preview, /Scenario Sim \(preview\)/);
  assert.match(preview, /Coming online/);
  assert.match(preview, /CLI-backed/);
  assert.doesNotMatch(edge, /live interactive sim/i);
  assert.doesNotMatch(preview, /live interactive sim/i);
  assert.match(sim, /Scenario Sim/);
  assert.match(sim, /Coming online/);
  assert.doesNotMatch(sim, /live interactive sim/i);
  assert.doesNotMatch(preview, /Customer Portal/);
  assert.doesNotMatch(sim, /password|Customer Portal/);
  assert.match(SCENARIO_SIM_DEMO_LABEL, /demo fixture/);
});

test("public Make 12 stamps stay on make12FromSim — scenario-sim is not imported there", () => {
  const rankings = readFileSync(join(here, "../routes/rankings.tsx"), "utf8");
  const board = readFileSync(join(here, "../routes/index.tsx"), "utf8");
  assert.match(rankings, /make12FromSim\(t\.slug, t\)\.makeField/);
  assert.doesNotMatch(rankings, /scenario-sim/);
  assert.doesNotMatch(board, /scenario-sim/);
  assert.match(board, /Make 12/);
});
