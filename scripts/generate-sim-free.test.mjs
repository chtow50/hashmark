import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  SIM_FREE_PATH,
  SIM_FULL_PATH,
  SCENARIO_FREE_PATH,
  buildScenarioFree,
  buildSimFree,
  freeExports,
} from "./generate-sim-free.mjs";

const ROOT = join(import.meta.dirname, "..");

describe("free sim exports (win_title is Edge Pack only)", () => {
  it("committed free exports match the generator (not stale)", () => {
    for (const { path, body } of freeExports()) {
      assert.equal(readFileSync(join(ROOT, path), "utf8"), body, `${path} is stale`);
    }
  });

  it("free exports carry no win_title", () => {
    for (const path of [SIM_FREE_PATH, SCENARIO_FREE_PATH]) {
      assert.doesNotMatch(readFileSync(join(ROOT, path), "utf8"), /win_title/, path);
    }
  });

  it("allow-list drops unknown fields, including win_title", () => {
    const sim = buildSimFree({
      meta: { n_sims: 1, seed: 2, as_of: "x", as_of_tz: "y", hx_stamp: "HX", hx_policy: "p", secret: 1 },
      teams: [{ name: "A", slug: "a", conference: "C", make_field: 1, win_title: 2, proj_wins: 3, conf_title: 4, hx_board: 5 }],
    });
    assert.deepEqual(sim.teams[0], { name: "A", slug: "a", conference: "C", make_field: 1, proj_wins: 3, conf_title: 4 });
    assert.equal("secret" in sim.meta, false);
    const sc = buildScenarioFree({
      ok: true,
      baseline: { a: { make_field: 1, win_title: 2, proj_wins: 3, conf_title: 4 } },
      scenario: {},
      delta: {},
    });
    assert.deepEqual(sc.baseline.a, { make_field: 1, proj_wins: 3, conf_title: 4 });
  });

  it("free export mirrors the full sim's make-field and meta, without win_title", () => {
    const free = JSON.parse(readFileSync(join(ROOT, SIM_FREE_PATH), "utf8"));
    const full = JSON.parse(readFileSync(join(ROOT, SIM_FULL_PATH), "utf8"));
    const g = free.teams.find((t) => t.slug === "georgia");
    const gf = full.teams.find((t) => t.slug === "georgia");
    assert.equal(g.make_field, gf.make_field);
    assert.equal(g.win_title, undefined);
    assert.equal(free.meta.hx_stamp, full.meta.hx_stamp);
    assert.match(free.meta.hx_stamp, /^HX 2026\.(8|9|\d{2})$/);
    assert.equal(free.meta.as_of, full.meta.as_of);
    assert.equal(free.meta.source, SIM_FULL_PATH.replace(/^data\//, ""));
  });
});
