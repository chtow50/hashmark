import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, ".vercel/output");

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

function corpus() {
  const files = walk(OUT).filter((p) => /\.(js|mjs)$/.test(p));
  return files.map((p) => readFileSync(p, "utf8")).join("\n");
}

describe("prebuilt deploy artifacts", () => {
  it("includes PR #19 schedule filters in committed output", () => {
    const text = corpus();
    assert.match(text, /Top 25/);
    assert.match(text, /Schedule filter/);
    assert.match(text, /All FBS/);
  });

  it("includes matchup TeamMark logos in committed output", () => {
    const text = corpus();
    assert.match(text, /TeamMark/);
    assert.match(text, /logoSize/);
  });

  it("includes all six size-board groups in committed output", () => {
    const text = corpus();
    for (const label of ["QB", "Skill", "OL", "DL", "LB", "DB"]) {
      assert.match(text, new RegExp(label));
    }
    assert.match(text, /qbAvgWeightLbs/);
    assert.match(text, /dlAvgWeightLbs/);
    assert.match(text, /lbAvgWeightLbs/);
  });

  it("includes Week 1 tape, gaps, and HX 2026.3 Make 12 in committed output", () => {
    const text = corpus();
    assert.match(text, /36\/43/);
    assert.match(text, /make_field/);
    assert.match(text, /74\.31/);
    assert.match(text, /20\.84/);
    assert.match(text, /2026-09-09/);
    assert.match(text, /HX 2026\.3 · 10k draws|make-field · HX 2026\.3 10k/);
    assert.match(text, /make12FromSim|amd-draws|make-field, not title/);
    assert.doesNotMatch(text, /pre-Δ 10k draws/);
    assert.doesNotMatch(text, /not a post-2026\.3 re-sim/);
  });

  it("includes Week 2 FBS–FCS Vegas-only stamps in committed output", () => {
    const text = corpus();
    assert.match(text, /Vegas-only/);
    assert.match(text, /vegas_only_fcs_unrated/);
    assert.match(text, /401858213/);
    assert.match(text, /Florida A&M/);
    assert.match(text, /STATUS_FINAL/);
    assert.match(text, /home_score":77|"home_score": 77|homeScore:77/);
    assert.match(text, /6604311/);
    assert.match(text, /Hard Rock Stadium/);
  });

  it("includes Week 2 FBS–FBS Research kick/TV/Vegas stamps in committed output", () => {
    // Companion unit gate: src/lib/cfb/fcs-fbs-stamp-gate.test.ts (wrong stamp is worse than late).
    const text = corpus();
    assert.match(text, /401856682/);
    assert.match(text, /0024_week2_kick_tv_vegas/);
    assert.match(text, /selectBoardFeaturedKick/);
    assert.match(text, /timestamptz '2026-09-12 18:30:00-05'/);
    assert.match(text, /h\.slug = 'texas' then 1\.5 else -1\.5/);
    assert.match(text, /h\.slug = 'boston-college' then 3\.5 else -3\.5/);
    assert.match(text, /h\.slug = 'michigan' then -5\.5 else 5\.5/);
  });

  it("includes Week 2 Oklahoma @ Michigan FINAL in committed output", () => {
    const text = corpus();
    assert.match(text, /0025_week2_oklahoma_michigan_final/);
    assert.match(text, /Oklahoma @ Michigan — Michigan 17, Oklahoma 10/);
    assert.match(text, /home_score = 17/);
    assert.match(text, /away_score = 10/);
    assert.match(text, /h\.slug = 'michigan' and a\.slug = 'oklahoma'/);
  });

  it("keeps PGLite wasm sidecars next to the server bundle", () => {
    const libs = join(OUT, "functions/__server.func/_libs");
    for (const name of ["pglite.wasm", "initdb.wasm", "pglite.data"]) {
      assert.ok(existsSync(join(libs, name)), `missing ${name}`);
    }
  });
});
