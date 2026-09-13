import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import {
  DISAGREE_HIGHLIGHT_NAMES,
  SIM_10K_AS_OF,
  SIM_10K_NOTE,
  accountabilityPack,
  boardDisagreementRows,
  gapByName,
  hxApGaps,
  isOdTerm,
  odMovers,
  odTermLabel,
  recomputeHxVsApGaps,
  sim10k,
  simTeamBySlug,
  week1Tape,
  week2BoardFlags,
  week2SeasonTape,
  week2Tape,
  week2TapePack,
  week2Top25Pack,
  week2Top25Tape,
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

test("Week 2 tape is 37/47 SU and 20/47 closer FLAG", () => {
  const tape = week2Tape();
  assert.equal(tape.n, 47);
  assert.equal(tape.su, "37/47");
  assert.equal(tape.su_pct, 78.7);
  assert.equal(tape.hx_closer, "20/47");
  assert.equal(tape.hx_closer_pct, 42.6);
  assert.equal(tape.closer_flag, true);
  assert.equal(tape.vegas_closer, "27/47");
  assert.equal(tape.hx_ats, "20/47");
  assert.equal(tape.mae_hx, 12.2);
  assert.equal(tape.mae_vegas, 10.49);
  assert.equal(tape.brier, 0.147);
  assert.equal(week2TapePack.meta.scope, "FBS–FBS only");
  assert.equal(week2TapePack.meta.hx_version, "2026.3");
  assert.match(week2TapePack.meta.hx_policy, /pre-Δ/);
  assert.doesNotMatch(week2TapePack.meta.hx_policy, /HX 2026\.4/);
  assert.equal(week2TapePack.su_misses.length, 10);
  assert.equal(week2TapePack.winner_flip_hits.length, 4);
  const season = week2SeasonTape();
  assert.equal(season.su_pct, 81.1);
  assert.equal(season.hx_closer_pct, 44.4);
  const flags = week2BoardFlags();
  assert.equal(flags[0]?.result, "HIT");
  assert.match(flags[0]?.label ?? "", /Michigan/);
  assert.equal(flags[1]?.result, "MISS");
  assert.match(flags[1]?.label ?? "", /Texas/);
});

test("Week 2 Top 25 closer cut is 12/19 HX · 17/19 SU", () => {
  const cut = week2Top25Tape();
  assert.equal(cut.n, 19);
  assert.equal(cut.su, "17/19");
  assert.equal(cut.hx_closer, "12/19");
  assert.equal(cut.hx_closer_pct, 63.2);
  assert.equal(cut.vegas_closer, "7/19");
  assert.equal(cut.mae_hx, 10.81);
  assert.equal(cut.mae_vegas, 12.03);
  assert.equal(week2Top25Pack.meta.scope.includes("HX Top 25"), true);
  assert.equal(week2Top25Pack.meta.hx_version, "2026.3");
  assert.match(week2Top25Pack.meta.hx_policy, /pre-Δ/);
  assert.doesNotMatch(week2Top25Pack.meta.hx_policy, /HX 2026\.4/);
  assert.equal(week2Top25Pack.full_slate.hx_closer, "20/47");
  assert.equal(week2Top25Pack.full_slate.closer_flag, true);
  assert.equal(week2Top25Pack.ap_alt.hx_closer, "12/18");
  assert.equal(week2Top25Pack.ap_alt.hx_closer_pct, 66.7);
  assert.equal(week2Top25Pack.hx_closer_hits.length, 12);
  assert.equal(week2Top25Pack.vegas_closer.length, 7);
  assert.equal(week2Top25Pack.su_misses.length, 2);
  assert.match(week2Top25Pack.su_misses[0]?.matchup ?? "", /Oregon/);
  assert.match(week2Top25Pack.su_misses[1]?.matchup ?? "", /Texas/);
  assert.equal(week2Top25Pack.su_misses.every((m) => m.closer === "Vegas"), true);
  const packText = JSON.stringify(week2Top25Pack);
  assert.doesNotMatch(packText, /The board is posted/);
  assert.doesNotMatch(packText, /FBS–FCS|FCS–FCS/);
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

test("truth-pack loads the HX 2026.4 10k pack, not the 2026.3 file", () => {
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /sim_10k_2026_hx2026_4\.json/);
  assert.doesNotMatch(src, /from "\.\.\/\.\.\/\.\.\/data\/sim_10k_2026\.json"/);
  assert.equal(sim10k.meta.n_sims, 10000);
  assert.equal(sim10k.meta.seed, 20260913);
  assert.equal(sim10k.teams.length, 136);
});

test("sim_10k Georgia is 75.26 / 21.59 on HX 2026.4 as_of 2026-09-13", () => {
  const g = simTeamBySlug("georgia");
  assert.ok(g);
  assert.equal(g.make_field, 75.26);
  assert.equal(g.win_title, 21.59);
  assert.equal(g.hx_board, 7.9055);
  assert.equal(Number(g.make_field.toFixed(1)), 75.3);
  assert.equal(Number(g.win_title.toFixed(1)), 21.6);
  assert.notEqual(g.make_field, g.win_title);
  assert.equal(SIM_10K_AS_OF, "2026-09-13");
  assert.match(SIM_10K_NOTE, /HX 2026\.4 · 10k draws/);
  assert.match(SIM_10K_NOTE, /2026-09-13/);
  assert.doesNotMatch(SIM_10K_NOTE, /pre-Δ/);
  assert.doesNotMatch(SIM_10K_NOTE, /not a post-2026\.3 re-sim/);
});

test("sim_10k top win_title and make_field stay separate cells", () => {
  const byTitle = [...sim10k.teams].sort((a, b) => b.win_title - a.win_title).slice(0, 5);
  const byMake = [...sim10k.teams].sort((a, b) => b.make_field - a.make_field).slice(0, 5);
  assert.deepEqual(
    byTitle.map((t) => [t.name, t.win_title]),
    [
      ["Georgia", 21.59],
      ["Notre Dame", 17.57],
      ["Ohio State", 14.89],
      ["Texas Tech", 9.48],
      ["Oregon", 6.91],
    ],
  );
  assert.deepEqual(
    byMake.map((t) => [t.name, t.make_field]),
    [
      ["Notre Dame", 89.27],
      ["Texas Tech", 86.45],
      ["Georgia", 75.26],
      ["Miami", 71.08],
      ["Ohio State", 59.57],
    ],
  );
  assert.notDeepEqual(
    byTitle.map((t) => t.slug),
    byMake.map((t) => t.slug),
  );
});
