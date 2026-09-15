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
  SCENARIO_SIM_GOLDEN_BUMP,
  SCENARIO_SIM_GOLDEN_EVENT_ID,
  SCENARIO_SIM_GOLDEN_FORCE,
  SCENARIO_SIM_GOLDEN_TEAMS,
  SCENARIO_SIM_MAX_OVERRIDES,
  SCENARIO_SIM_PRODUCT,
  SCENARIO_SIM_SEED,
  buildScenarioRequest,
  clampHxBump,
  isScenarioSimUnlocked,
  loadScenarioSimExample,
  loadScenarioSimFixture,
  loadScenarioSimGoldenRequest,
  parseScenarioUnlockSearch,
  runDemoScenarioSim,
  validateOverrides,
  type ForceWinnerOverride,
  type HxBumpOverride,
} from "./scenario-sim.ts";

const here = dirname(fileURLToPath(import.meta.url));

function forceWinner(partial?: Partial<ForceWinnerOverride>): ForceWinnerOverride {
  return {
    ...SCENARIO_SIM_GOLDEN_FORCE,
    ...partial,
  };
}

test("AMD golden fixture keeps Georgia make-field 75.26 separate from title 21.59", () => {
  const example = loadScenarioSimExample();
  const fixture = loadScenarioSimFixture();
  const request = loadScenarioSimGoldenRequest();
  assert.equal(example.contract_version, SCENARIO_SIM_CONTRACT_VERSION);
  assert.equal(example.product, SCENARIO_SIM_PRODUCT);
  assert.equal(example.request.contract_version, SCENARIO_SIM_CONTRACT_VERSION);
  assert.equal(example.request.product, SCENARIO_SIM_PRODUCT);
  assert.equal(example.request.n_sims, 10000);
  assert.equal(example.request.seed, SCENARIO_SIM_SEED);
  assert.equal(request.seed, SCENARIO_SIM_SEED);
  assert.equal(fixture.meta.seed, SCENARIO_SIM_SEED);
  assert.equal(example.request.overrides.length, 2);
  assert.ok(example.request.overrides.length >= 1);
  assert.ok(example.request.overrides.length <= SCENARIO_SIM_MAX_OVERRIDES);
  assert.deepEqual([...example.request.return.teams], [...SCENARIO_SIM_GOLDEN_TEAMS]);

  const force = example.request.overrides[0] as ForceWinnerOverride;
  assert.equal(force.type, "force_winner");
  assert.equal(force.espn_event_id, SCENARIO_SIM_GOLDEN_EVENT_ID);
  assert.equal(force.week, 4);
  assert.equal(force.home_slug, "georgia");
  assert.equal(force.away_slug, "oklahoma");
  assert.equal(force.winner_slug, "oklahoma");
  const bump = example.request.overrides[1] as HxBumpOverride;
  assert.equal(bump.type, "hx_bump");
  assert.equal(bump.team_slug, "oregon");
  assert.equal(bump.delta_hx, -0.25);
  assert.deepEqual(request.overrides, example.request.overrides);
  assert.deepEqual(fixture.overrides_echo, example.request.overrides);

  const g = fixture.baseline.georgia;
  assert.ok(g);
  assert.equal(g.make_field, 75.26);
  assert.equal(g.win_title, 21.59);
  assert.notEqual(g.make_field, g.win_title);
  assert.equal(fixture.scenario.georgia.make_field, 52.4);
  assert.equal(fixture.scenario.georgia.win_title, 14.78);
  assert.notEqual(fixture.scenario.georgia.make_field, fixture.scenario.georgia.win_title);
  assert.equal(fixture.delta.georgia.make_field, -22.86);
  assert.equal(fixture.delta.georgia.win_title, -6.81);
  assert.equal(fixture.scenario.oklahoma.make_field, 6.53);
  assert.equal(fixture.scenario.oklahoma.win_title, 0.24);
  assert.equal(fixture.scenario.oregon.make_field, 42.41);
  assert.equal(fixture.scenario.oregon.win_title, 6.13);
  assert.equal(fixture.scenario["ohio-state"].make_field, 60.77);
  assert.equal(fixture.scenario["ohio-state"].win_title, 15.76);
  assert.equal(fixture.scenario.michigan.make_field, 22.14);
  assert.equal(fixture.scenario.michigan.win_title, 1.27);
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
  assert.equal(built.request.seed, SCENARIO_SIM_SEED);
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

test("demo runner returns golden cells for all five AMD return teams", () => {
  const built = buildScenarioRequest({
    overrides: [SCENARIO_SIM_GOLDEN_FORCE, SCENARIO_SIM_GOLDEN_BUMP],
    teams: [...SCENARIO_SIM_GOLDEN_TEAMS],
    seed: SCENARIO_SIM_SEED,
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
  assert.equal(a.scenario.georgia.make_field, 52.4);
  assert.equal(a.scenario.georgia.win_title, 14.78);
  assert.equal(a.delta.georgia.make_field, -22.86);
  assert.equal(a.delta.georgia.win_title, -6.81);
  assert.equal(a.scenario.oklahoma.make_field, 6.53);
  assert.equal(a.delta.oklahoma.make_field, 3.81);
  assert.equal(a.scenario.oregon.make_field, 42.41);
  assert.equal(a.delta.oregon.make_field, 3.84);
  assert.equal(a.scenario["ohio-state"].make_field, 60.77);
  assert.equal(a.delta["ohio-state"].make_field, 1.2);
  assert.equal(a.scenario.michigan.make_field, 22.14);
  assert.equal(a.delta.michigan.make_field, -5.28);
  assert.equal(a.confidence_note, SCENARIO_SIM_CONFIDENCE_NOTE);
  assert.equal(a.meta.overrides_applied, 2);
  assert.equal(a.meta.seed, SCENARIO_SIM_SEED);
  assert.equal(a.overrides_echo.length, 2);
  const echoForce = a.overrides_echo[0] as ForceWinnerOverride;
  assert.equal(echoForce.espn_event_id, "401856700");
  assert.doesNotMatch(JSON.stringify(a), /guarantee|ROI|lock ticket/i);
  assert.doesNotMatch(readFileSync(join(here, "scenario-sim.ts"), "utf8"), /demoShift/);
});

test("soft unlock is query/demo only — constant defaults false", () => {
  assert.equal(EDGE_SCENARIO_UNLOCK, false);
  assert.equal(isScenarioSimUnlocked({}), false);
  assert.equal(isScenarioSimUnlocked({ edge: "1" }), true);
  assert.equal(isScenarioSimUnlocked({ unlock: "1" }), true);
  assert.equal(isScenarioSimUnlocked({ edge: "0" }), false);
  const parsed = parseScenarioUnlockSearch({ edge: 1, unlock: "true" });
  assert.equal(parsed.unlock, "true");
  assert.equal(isScenarioSimUnlocked(parsed), true);
});

test("/edge marketing does not promo Scenario Sim; tool is preview/offline only", () => {
  const edge = readFileSync(join(here, "../routes/edge.tsx"), "utf8");
  const preview = readFileSync(join(here, "../components/scenario-sim.tsx"), "utf8");
  const sim = readFileSync(join(here, "../routes/edge_.sim.tsx"), "utf8");
  const shell = readFileSync(join(here, "../components/shell.tsx"), "utf8");
  assert.doesNotMatch(edge, /Scenario Sim|scenario-sim|\/edge\/sim/i);
  assert.doesNotMatch(edge, /live interactive sim/i);
  assert.doesNotMatch(edge, /waitlist/i);
  assert.doesNotMatch(shell, /\/edge\/sim|Scenario Sim/i);
  assert.doesNotMatch(preview, /waitlist/i);
  assert.doesNotMatch(preview, /ScenarioSimPreviewLink|Open Scenario Sim/);
  assert.match(preview, /preview \/ offline/);
  assert.doesNotMatch(preview, /live interactive sim/i);
  assert.match(preview, /401856700/);
  assert.match(preview, /SCENARIO_SIM_GOLDEN_FORCE/);
  assert.match(preview, /EDGE\.weekLabel/);
  assert.doesNotMatch(preview, /\$9 Week sample|\$29\/mo/);
  assert.match(sim, /preview \/ offline/);
  assert.match(sim, /Not this week’s paid pack|Not this week's paid pack/);
  assert.doesNotMatch(sim, /live interactive sim/i);
  assert.doesNotMatch(sim, /waitlist|password|Customer Portal/i);
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
