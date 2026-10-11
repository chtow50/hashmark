import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import * as edgeLib from "./edge.ts";
import { EDGE } from "./edge.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");

test("Edge is paused (step 2): no price, no checkout env, no buy helpers", () => {
  assert.equal(EDGE.status, "paused");
  assert.equal("weekPrice" in EDGE, false);
  assert.equal("weekLabel" in EDGE, false);
  assert.equal("monthPrice" in EDGE, false);
  assert.doesNotMatch(JSON.stringify(EDGE), /\$\d|\/mo|monthly|subscri/i);
  for (const name of ["edgeCheckoutUrl", "edgeCheckoutHref", "edgeCheckoutLive", "EDGE_CHECKOUT_PENDING"]) {
    assert.equal(name in edgeLib, false, `${name} should be gone`);
  }
  assert.doesNotMatch(read("src/lib/edge.ts"), /VITE_EDGE_CHECKOUT|buy\.stripe/);
  assert.doesNotMatch(read(".grok/app-env.json"), /VITE_EDGE_CHECKOUT|buy\.stripe/);
});

test("/edge is a short single-column paused page that points to the free board", () => {
  const src = read("src/routes/edge.tsx");
  assert.match(src, /Edge is paused\./);
  assert.match(src, /Nothing is for sale/);
  assert.match(src, /to="\/"/);
  assert.match(src, /max-w-2xl/);
  assert.doesNotMatch(src, /grid-cols-2|lg:grid-cols/);
  assert.doesNotMatch(src, /Buy|checkout|buy\.stripe|\$5|\$15|price/i);
  assert.doesNotMatch(src, /lock|ROI/i);
  assert.doesNotMatch(src, /return date|returns? (on|in|next)|resum|back soon|coming soon|relaunch/i);
});

test("zero paid CTAs on the free surfaces (home, schedule, matchup, shell, Scenario Sim)", () => {
  for (const rel of [
    "src/routes/index.tsx",
    "src/routes/schedule.tsx",
    "src/routes/matchup.tsx",
    "src/components/shell.tsx",
    "src/components/scenario-sim.tsx",
    "src/routes/edge_.sim.tsx",
  ]) {
    const src = read(rel);
    assert.doesNotMatch(src, /EdgePackStrip|EdgeBuyButton|EdgePackNavButton|EdgeCheckoutNote/, rel);
    assert.doesNotMatch(src, /buy\.stripe|VITE_EDGE_CHECKOUT|\$5 Week|\$15|Buy ·/, rel);
  }
});
