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
  week3BoardFlags,
  week3SeasonTape,
  week3Tape,
  week3TapePack,
  week3Top25Pack,
  week3Top25Tape,
} from "./truth-pack.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

test("gaps JSON flags Week 4 Research desks vs live HX 2026.5", () => {
  const expected: Record<string, { ap: number; hx: number; delta: number }> = {
    "Texas A&M": { ap: 23, hx: 6, delta: 17 },
    Oregon: { ap: 20, hx: 4, delta: 16 },
    Houston: { ap: 25, hx: 39, delta: -14 },
    LSU: { ap: 10, hx: 19, delta: -9 },
    USC: { ap: 12, hx: 21, delta: -9 },
    BYU: { ap: 9, hx: 17, delta: -8 },
  };
  for (const name of DISAGREE_HIGHLIGHT_NAMES) {
    const g = gapByName(name);
    assert.ok(g, `missing gap ${name}`);
    assert.equal(g.ap, expected[name].ap, `${name} ap`);
    assert.equal(g.hx, expected[name].hx, `${name} hx`);
    assert.equal(g.delta, expected[name].delta, `${name} delta`);
    assert.equal(g.delta, g.ap - g.hx, `${name} delta must be ap − hx`);
  }
  assert.equal(gapByName("Mississippi State")?.delta, -43);
  assert.equal(gapByName("Mississippi State")?.hx, 67);
  assert.equal(gapByName("Virginia"), undefined);
  assert.notEqual(gapByName("Houston")?.ap, 22);
  assert.notEqual(gapByName("LSU")?.ap, 7);
  assert.equal(hxApGaps.poll_week, 4);
  assert.match(hxApGaps.source_hx, /week3_od_hx_ship_2026/);
  assert.match(hxApGaps.hx_board ?? "", /2026\.5/);
  assert.match(hxApGaps.source_ap, /week4_ap/i);
  assert.doesNotMatch(hxApGaps.source_ap, /week3_ap/i);
  assert.doesNotMatch(hxApGaps.source_ap, /week1_ap/i);
  assert.doesNotMatch(hxApGaps.source_ap, /preseason/i);
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /week4_hx_vs_ap_gaps_2026\.json/);
  assert.doesNotMatch(src, /week3_hx_vs_ap_gaps_2026/);
  assert.doesNotMatch(src, /week1_hx_vs_ap_gaps_2026/);
});

test("Week 4 ballot ranks on the disagreement card — not the Week 3 stamp", () => {
  assert.equal(gapByName("LSU")?.ap, 10);
  assert.equal(gapByName("Oregon")?.ap, 20);
  assert.equal(gapByName("Texas A&M")?.ap, 23);
  assert.equal(gapByName("Houston")?.ap, 25);
  assert.equal(gapByName("USC")?.ap, 12);
  assert.equal(gapByName("Oklahoma"), undefined);
  assert.equal(gapByName("Virginia"), undefined);
  assert.equal(gapByName("Washington"), undefined);
  assert.equal(
    hxApGaps.hx_not_in_ap.some((t) => t.name === "Oklahoma" && t.hx_rank === 16),
    true,
  );
  assert.equal(
    hxApGaps.hx_not_in_ap.some((t) => t.name === "Washington" && t.hx_rank === 25),
    true,
  );
  assert.notEqual(gapByName("LSU")?.ap, 7);
  assert.notEqual(gapByName("Houston")?.ap, 22);
  assert.notEqual(gapByName("Oregon")?.ap, 21);
  assert.notEqual(gapByName("Texas A&M")?.ap, 9);
});

test("recompute from Week 4 AP + HX 2026.5 ship matches gaps file", () => {
  const ap = JSON.parse(readFileSync(join(root, "data/week4_ap_top25_2026.json"), "utf8"));
  const ship = JSON.parse(readFileSync(join(root, "data/week3_od_hx_ship_2026.json"), "utf8"));
  const recomputed = recomputeHxVsApGaps(ap.teams, ship.teams);
  const kept = recomputed.filter((g) => Math.abs(g.delta) >= 3);
  assert.deepEqual(
    hxApGaps.gaps.map((g) => g.name),
    kept.map((g) => g.name),
  );
  for (const fromFile of hxApGaps.gaps) {
    const fromRe = recomputed.find((g) => g.name === fromFile.name);
    assert.ok(fromRe, fromFile.name);
    assert.equal(fromRe.ap, fromFile.ap, `${fromFile.name} ap`);
    assert.equal(fromRe.hx, fromFile.hx, `${fromFile.name} hx`);
    assert.equal(fromRe.hx_rating, fromFile.hx_rating, `${fromFile.name} rating`);
    assert.equal(fromRe.delta, fromFile.delta, `${fromFile.name} delta`);
  }
  assert.equal(recomputed.find((g) => g.name === "Virginia"), undefined);
  assert.equal(recomputed.find((g) => g.name === "Oklahoma"), undefined);
});

test("board card leads with the Week 4 flags, then remaining JSON gaps", () => {
  const rows = boardDisagreementRows([
    { slug: "texas-am", name: "Texas A&M", shortName: "A&M", colorPrimary: "#500000" },
    { slug: "oregon", name: "Oregon", shortName: "Oregon", colorPrimary: "#154733" },
    { slug: "houston", name: "Houston", shortName: "Houston", colorPrimary: "#c8102e" },
    { slug: "lsu", name: "LSU", shortName: "LSU", colorPrimary: "#461d7c" },
    { slug: "usc", name: "USC", shortName: "USC", colorPrimary: "#990000" },
    { slug: "byu", name: "BYU", shortName: "BYU", colorPrimary: "#002e5d" },
  ]);
  assert.deepEqual(
    rows.slice(0, DISAGREE_HIGHLIGHT_NAMES.length).map((r) => r.name),
    [...DISAGREE_HIGHLIGHT_NAMES],
  );
  assert.ok(rows.slice(0, DISAGREE_HIGHLIGHT_NAMES.length).every((r) => r.highlight));
  const miss = rows.find((r) => r.name === "Mississippi State");
  assert.equal(miss?.slug, "mississippi-state");
  assert.equal(miss?.ap, 24);
  assert.equal(miss?.hx, 67);
  assert.equal(rows.find((r) => r.name === "Virginia"), undefined);
  assert.notEqual(rows.find((r) => r.name === "Houston")?.ap, 22);
  assert.notEqual(rows.find((r) => r.name === "LSU")?.ap, 7);
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

test("Week 3 tape is 49/56 SU and 23/56 closer FLAG", () => {
  const tape = week3Tape();
  assert.equal(tape.n, 56);
  assert.equal(tape.su, "49/56");
  assert.equal(tape.su_pct, 87.5);
  assert.equal(tape.hx_closer, "23/56");
  assert.equal(tape.hx_closer_pct, 41.1);
  assert.equal(tape.closer_flag, true);
  assert.equal(tape.vegas_closer, "33/56");
  assert.equal(tape.hx_ats, "29/56");
  assert.equal(tape.hx_ats_pct, 51.8);
  assert.equal(tape.mae_hx, 10.03);
  assert.equal(tape.mae_vegas, 8.71);
  assert.equal(tape.brier, 0.119);
  assert.equal(week3TapePack.meta.n_games, 56);
  assert.equal(week3TapePack.meta.scope, "FBS–FBS only");
  assert.equal(week3TapePack.su_misses.length, 7);
  assert.equal(week3TapePack.winner_flip_hits.length, 2);
  assert.equal(week3TapePack.winner_flip_misses.length, 2);
  assert.equal(week3TapePack.games.length, 56);
  const season = week3SeasonTape();
  assert.equal(season.label, "W1–W3");
  assert.equal(season.su, "122/146");
  assert.equal(season.su_pct, 83.6);
  assert.equal(season.hx_closer, "63/146");
  assert.equal(season.hx_closer_pct, 43.2);
  const flags = week3BoardFlags();
  assert.equal(flags.length, 4);
  assert.equal(flags.filter((f) => f.result === "HIT").length, 2);
  assert.equal(flags.filter((f) => f.result === "MISS").length, 2);
  assert.match(flags.map((f) => f.matchup).join(" | "), /Nevada @ Middle Tennessee/);
  assert.match(flags.map((f) => f.matchup).join(" | "), /LSU @ Ole Miss/);
  assert.match(flags.map((f) => f.matchup).join(" | "), /UConn @ Southern Miss/);
  assert.match(flags.map((f) => f.matchup).join(" | "), /Ohio @ South Alabama/);
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /week3_tape_2026\.json/);
  assert.match(src, /week3_tape_top25_closer_2026\.json/);
  const packText = JSON.stringify(week3TapePack);
  assert.doesNotMatch(packText, /The board is posted/);
  assert.doesNotMatch(packText, /guaranteed ROI/i);
});

test("Week 3 Top 25 closer cut is 5/21 HX · 20/21 SU", () => {
  const cut = week3Top25Tape();
  assert.equal(cut.n, 21);
  assert.equal(cut.su, "20/21");
  assert.equal(cut.su_pct, 95.2);
  assert.equal(cut.hx_closer, "5/21");
  assert.equal(cut.hx_closer_pct, 23.8);
  assert.equal(cut.vegas_closer, "16/21");
  assert.equal(cut.mae_hx, undefined);
  assert.equal(cut.mae_vegas, undefined);
  assert.equal(week3Top25Pack.meta.n_games, 21);
  assert.equal(week3Top25Pack.games.length, 21);
  assert.equal(week3Top25Pack.games.filter((g) => g.closer === "hx").length, 5);
  assert.equal(week3Top25Pack.games.filter((g) => g.su_hit).length, 20);
  assert.match(week3Top25Pack.meta.full_slate_closer, /23\/56/);
  const src = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  assert.match(src, /week3Tape\(\)/);
  assert.doesNotMatch(src, /week2Tape\(\)/);
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
