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

  it("includes Week 1 tape, gaps, and HX 2026.4 Make 12 in committed output", () => {
    const text = corpus();
    assert.match(text, /36\/43/);
    assert.match(text, /make_field/);
    assert.match(text, /75\.26/);
    assert.match(text, /21\.59/);
    assert.match(text, /2026-09-13/);
    assert.match(text, /HX 2026\.4 · 10k draws|make-field · HX 2026\.4 10k/);
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

  it("includes Week 2 early-window CLEAR FINALs in committed output", () => {
    const text = corpus();
    assert.match(text, /0026_week2_early_window_finals/);
    assert.match(text, /Arizona State @ Texas A&M — Texas A&M 48, Arizona State 20/);
    assert.match(text, /Missouri @ Kansas — Missouri 38, Kansas 21/);
    assert.match(text, /h\.slug = 'texas-am' and a\.slug = 'arizona-state'/);
    assert.match(text, /home_score = 48/);
    assert.match(text, /401858215/);
    assert.match(text, /home_score":59|"home_score": 59|homeScore:59/);
  });

  it("includes Week 2 remaining CLEAR FINALs in committed output", () => {
    const text = corpus();
    assert.match(text, /0027_week2_remaining_finals/);
    assert.match(text, /Ohio State @ Texas — Texas 24, Ohio State 23/);
    assert.match(text, /Oregon @ Oklahoma State — Oklahoma State 39, Oregon 31/);
    assert.match(text, /h\.slug = 'texas' and a\.slug = 'ohio-state'/);
    assert.match(text, /home_score = 24/);
    assert.match(text, /away_score = 23/);
    assert.match(text, /401856682/);
    assert.match(text, /home_score":24|"home_score": 24|homeScore:24/);
  });

  it("includes Week 2 Top 25 closer cut in committed output", () => {
    const text = corpus();
    assert.match(text, /12\/19/);
    assert.match(text, /63\.2/);
    assert.match(text, /10\.81/);
    assert.match(text, /week2_tape_top25_closer_2026/);
    assert.match(text, /Top 25 closer 12\/19/);
  });

  it("includes Week 3 FBS–FBS Research kick/TV/Vegas stamps in committed output", () => {
    const text = corpus();
    assert.match(text, /0029_week3_kick_tv_vegas/);
    assert.match(text, /week3_stamp_compact_2026/);
    assert.match(text, /timestamptz '2026-09-17 18:30:00-05'/);
    assert.match(text, /h\.slug = 'pittsburgh' then 10\.5 else -10\.5/);
    assert.match(text, /h\.slug = 'wake-forest' then -20\.5 else 20\.5/);
    assert.match(text, /Syracuse @ Pittsburgh/);
  });

  it("includes Week 2 O/D + HX 2026.4 stamp and Week 3 chrome in committed output", () => {
    const text = corpus();
    assert.match(text, /0028_week2_od_hx_ship/);
    assert.match(text, /HX 2026\.4/);
    assert.match(text, /Week 3 board/);
    assert.match(text, /7\.9055/);
    assert.match(text, /7\.8131/);
    assert.match(text, /6\.4443/);
    assert.match(text, /0\.0717/);
    assert.match(text, /week2_od_hx_ship_2026/);
    assert.doesNotMatch(text, /The board is posted/);
  });

  it("includes HX Edge Pack /edge with no week→month checkout fallback", () => {
    const text = corpus();
    assert.match(text, /HX Edge Pack/);
    assert.match(text, /\$9 Week sample/);
    assert.match(text, /\$29\/mo/);
    assert.match(text, /createFileRoute\("\/edge"\)|path:"\/edge"|id:"\/edge"|to:"\/edge"/);
    assert.match(text, /#checkout-pending/);
    assert.match(text, /VITE_EDGE_CHECKOUT_WEEK_URL/);
    assert.match(text, /VITE_EDGE_CHECKOUT_URL/);
    assert.doesNotMatch(text, /buy\.stripe\.com|checkout\.stripe\.com/);
  });

  it("keeps PGLite wasm sidecars next to the server bundle", () => {
    const libs = join(OUT, "functions/__server.func/_libs");
    for (const name of ["pglite.wasm", "initdb.wasm", "pglite.data"]) {
      assert.ok(existsSync(join(libs, name)), `missing ${name}`);
    }
  });
});
