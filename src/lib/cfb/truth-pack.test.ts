import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import {
  DISAGREE_HIGHLIGHT_NAMES,
  SIM_10K_AS_OF,
  SIM_10K_NOTE,
  SIM_10K_NOT_RESIM,
  accountabilityPack,
  boardDisagreementRows,
  gapByName,
  hxApGaps,
  isOdTerm,
  odMovers,
  odTermLabel,
  recomputeHxVsApGaps,
  simTeamBySlug,
  week1Tape,
} from "./truth-pack.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

test("gaps JSON flags Virginia / Houston / LSU / Missouri / Texas Tech", () => {
  const expected: Record<string, number> = {
    Virginia: -20,
    Houston: -18,
    LSU: -11,
    Missouri: 9,
    "Texas Tech": 6,
  };
  for (const name of DISAGREE_HIGHLIGHT_NAMES) {
    const g = gapByName(name);
    assert.ok(g, `missing gap ${name}`);
    assert.equal(g.delta, expected[name], `${name} delta`);
    assert.equal(g.delta, g.ap - g.hx, `${name} delta must be ap − hx`);
  }
  assert.match(hxApGaps.source_ap, /week1_ap/i);
  assert.doesNotMatch(hxApGaps.source_ap, /preseason/i);
});

test("recompute from Week 1 AP + HX ship matches AMD gaps file", () => {
  const ap = JSON.parse(readFileSync(join(root, "data/week1_ap_top25_2026.json"), "utf8"));
  const ship = JSON.parse(readFileSync(join(root, "data/week1_od_hx_ship_2026.json"), "utf8"));
  const recomputed = recomputeHxVsApGaps(ap.teams, ship.teams);
  for (const name of DISAGREE_HIGHLIGHT_NAMES) {
    const fromFile = gapByName(name);
    const fromRe = recomputed.find((g) => g.name === name);
    assert.ok(fromFile && fromRe, name);
    assert.equal(fromRe.ap, fromFile.ap, `${name} ap`);
    assert.equal(fromRe.hx, fromFile.hx, `${name} hx`);
    assert.equal(fromRe.delta, fromFile.delta, `${name} delta`);
  }
});

test("board card leads with the five flags, then remaining JSON gaps", () => {
  const rows = boardDisagreementRows([
    { slug: "virginia", name: "Virginia", shortName: "UVA", colorPrimary: "#232d4b" },
    { slug: "houston", name: "Houston", shortName: "Houston", colorPrimary: "#c8102e" },
    { slug: "lsu", name: "LSU", shortName: "LSU", colorPrimary: "#461d7c" },
    { slug: "missouri", name: "Missouri", shortName: "Missouri", colorPrimary: "#f1b82d" },
    { slug: "texas-tech", name: "Texas Tech", shortName: "Texas Tech", colorPrimary: "#cc0000" },
  ]);
  assert.deepEqual(
    rows.slice(0, 5).map((r) => r.name),
    [...DISAGREE_HIGHLIGHT_NAMES],
  );
  assert.ok(rows.slice(0, 5).every((r) => r.highlight));
  assert.ok(rows.length >= 5);
  const tamu = rows.find((r) => r.name === "Texas A&M");
  assert.equal(tamu?.slug, "texas-am");
});

test("accountability tape is 36/43 SU and 20/43 closer", () => {
  const tape = week1Tape();
  assert.equal(tape.n, 43);
  assert.equal(tape.su, "36/43");
  assert.equal(tape.su_pct, 83.7);
  assert.equal(tape.hx_closer, "20/43");
  assert.equal(tape.hx_closer_pct, 46.5);
  assert.equal(accountabilityPack.as_of, "2026-09-08");
});

test("movers_by_abs_dhx are O/D terms", () => {
  const movers = odMovers(10);
  assert.ok(movers.length >= 6);
  for (const m of movers) {
    assert.equal(isOdTerm(m.term), true, m.name);
    assert.equal(odTermLabel(m.term), "O/D");
    assert.ok(m.slug);
  }
  assert.equal(movers[0]?.name, "Rutgers");
});

test("sim_10k Georgia is 73.8 / 20.4 pre-Δ as_of 2026-09-06", () => {
  const g = simTeamBySlug("georgia");
  assert.ok(g);
  assert.equal(Number(g.make_field.toFixed(1)), 73.8);
  assert.equal(Number(g.win_title.toFixed(1)), 20.4);
  assert.notEqual(g.make_field, g.win_title);
  assert.equal(SIM_10K_AS_OF, "2026-09-06");
  assert.match(SIM_10K_NOTE, /pre-Δ 10k draws/);
  assert.match(SIM_10K_NOT_RESIM, /not a post-2026\.3 re-sim/);
});
