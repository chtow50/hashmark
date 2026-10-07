/**
 * Server / test only: full AMD Scenario Sim contract fixtures, including win_title.
 *
 * win_title is Edge Pack / paid only. Do NOT import this module from any route or
 * component — /edge/sim is a public preview and anything it imports lands in the
 * public static/assets/*.js. The client preview reads the generated free fixture
 * (data/scenario_sim_golden_response_free.json) via ./scenario-sim.ts.
 */
import exampleRaw from "../../data/scenario_sim_rerun_contract_example.json" with { type: "json" };
import goldenResponseRaw from "../../data/scenario_sim_golden_response.json" with { type: "json" };
import type { ScenarioSimContractExample, ScenarioSimOkResponseFull } from "./scenario-sim.ts";

export function loadScenarioSimExample(): ScenarioSimContractExample {
  return exampleRaw as ScenarioSimContractExample;
}

/** Full AMD golden response (baseline / scenario / Δ with win_title). */
export function loadScenarioSimFullFixture(): ScenarioSimOkResponseFull {
  return goldenResponseRaw as ScenarioSimOkResponseFull;
}
