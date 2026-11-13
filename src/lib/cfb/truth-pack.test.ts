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
  week4BoardFlags,
  week4SeasonTape,
  week4Tape,
  week4TapePack,
  week4Top25Pack,
  week4Top25Tape,
  week5BoardFlags,
  week5SeasonTape,
  week5Tape,
  week5TapePack,
  week5Top25Pack,
  week5Top25Tape,
  week6BoardFlags,
  week6SeasonTape,
  week6Tape,
  week6TapePack,
  week6Top25Pack,
  week6Top25Tape,
  week7BoardFlags,
  week7SeasonTape,
  week7Tape,
  week7TapePack,
  week7Top25Pack,
  week7Top25Tape,
  week8BoardFlags,
  week8SeasonTape,
  week8Tape,
  week8TapePack,
  week8Top25Pack,
  week8Top25Tape,
  week9BoardFlags,
  week9SeasonTape,
  week9Tape,
  week9TapePack,
  week9Top25Pack,
  week9Top25Tape,
  week10BoardFlags,
  week10SeasonTape,
  week10Tape,
  week10TapePack,
  week10Top25Pack,
  week10Top25Tape,
} from "./truth-pack.ts";
import { SIM_FULL_FILE, sim10kFull, simFullTeamBySlug } from "./sim-full.server.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

test("gaps JSON flags the Week 10 ballot desks vs live HX 2026.7", () => {
  const expected: Record<string, { ap: number; hx: number; delta: number }> = {
    Kentucky: { ap: 8, hx: 64, delta: -56 },
    "Wake Forest": { ap: 14, hx: 71, delta: -57 },
    "New Mexico": { ap: 22, hx: 98, delta: -76 },
    Houston: { ap: 17, hx: 38, delta: -21 },
    "South Carolina": { ap: 23, hx: 27, delta: -4 },
    BYU: { ap: 7, hx: 17, delta: -10 },
  };
  for (const name of DISAGREE_HIGHLIGHT_NAMES) {
    const g = gapByName(name);
    assert.ok(g, `missing gap ${name}`);
    assert.equal(g.ap, expected[name].ap, `${name} ap`);
    assert.equal(g.hx, expected[name].hx, `${name} hx`);
    assert.equal(g.delta, expected[name].delta, `${name} delta`);
    assert.equal(g.delta, g.ap - g.hx, `${name} delta must be ap − hx`);
  }
  assert.equal(gapByName("UCLA")?.delta, -40);
  assert.equal(gapByName("UCLA")?.ap, 5);
  assert.equal(gapByName("Boise State")?.delta, -27);
  assert.equal(gapByName("Boise State")?.ap, 20);
  assert.equal(gapByName("Boise State")?.hx, 47);
  assert.equal(gapByName("Arizona")?.ap, 24);
  // Dropouts (SMU, Northwestern, Oklahoma State, Wisconsin) have no gap row.
  // Iowa |delta| is 2 (< 3). Oregon is HX-not-in-AP. Ohio State is AP 11 vs HX 2 (delta +9).
  assert.equal(gapByName("Northwestern"), undefined);
  assert.equal(gapByName("Oklahoma State"), undefined);
  assert.equal(gapByName("Wisconsin"), undefined);
  assert.equal(gapByName("SMU"), undefined);
  assert.equal(gapByName("Iowa"), undefined);
  assert.equal(gapByName("Oregon"), undefined);
  assert.equal(gapByName("Ohio State")?.delta, 9);
  assert.equal(hxApGaps.poll_week, 10);
  assert.match(hxApGaps.source_hx, /week5_od_hx_ship_2026/);
  assert.match(hxApGaps.hx_board ?? "", /2026\.7/);
  assert.match(hxApGaps.source_ap, /week10_ap/i);
  assert.doesNotMatch(hxApGaps.source_ap, /week9_ap/i);
  assert.doesNotMatch(hxApGaps.source_ap, /preseason/i);
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /import gapsRaw from "\.\.\/\.\.\/\.\.\/data\/week10_hx_vs_ap_gaps_2026\.json"/);
  assert.doesNotMatch(src, /import gapsRaw from "\.\.\/\.\.\/\.\.\/data\/week9_hx_vs_ap_gaps_2026\.json"/);
  assert.match(src, /import week10ApRaw from "\.\.\/\.\.\/\.\.\/data\/week10_ap_top25_2026\.json"/);
});

test("Week 10 ballot ranks on the disagreement card — not the Week 9 stamp", () => {
  // Week 9 → Week 10: UGA 3→2, UTAH 6→3, UCLA 7→5, OSU 2→11; USC/IOWA/UNM/SC in; SMU/NU/OKST/WIS out.
  assert.equal(gapByName("BYU")?.ap, 7);
  assert.equal(gapByName("UCLA")?.ap, 5);
  assert.equal(gapByName("Kentucky")?.ap, 8);
  assert.equal(gapByName("Houston")?.ap, 17);
  assert.equal(gapByName("Texas")?.ap, 10);
  assert.equal(gapByName("Miami")?.ap, 1);
  assert.notEqual(gapByName("BYU")?.ap, 8);
  assert.equal(gapByName("Boise State")?.ap, 20);
  assert.equal(gapByName("New Mexico")?.ap, 22);
  for (const [name, rank] of [
    ["Oregon", 4],
    ["Texas A&M", 6],
    ["Michigan", 12],
    ["Penn State", 15],
    ["Oklahoma", 16],
    ["SMU", 20],
    ["Clemson", 22],
    ["Washington", 25],
  ] as const) {
    assert.equal(
      hxApGaps.hx_not_in_ap.some((t) => t.name === name && t.hx_rank === rank),
      true,
      name,
    );
  }
  assert.equal(
    hxApGaps.ap_not_in_hx25.some((t) => t.name === "New Mexico" && t.ap === 22 && t.hx_rank === 98),
    true,
  );
  assert.equal(
    hxApGaps.ap_not_in_hx25.some((t) => t.name === "South Carolina" && t.ap === 23 && t.hx_rank === 27),
    true,
  );
});

test("recompute from Week 10 AP + HX 2026.7 ship matches gaps file", () => {
  const ap = JSON.parse(readFileSync(join(root, "data/week10_ap_top25_2026.json"), "utf8"));
  assert.equal(ap.poll_week, 10);
  assert.equal(ap.as_of, "2026-11-01");
  assert.equal(ap.teams.length, 25);
  assert.deepEqual(
    ap.teams.map((t: { slug: string }) => t.slug),
    [
      "miami", "georgia", "utah", "notre-dame", "ucla", "indiana", "byu", "kentucky",
      "alabama", "texas", "ohio-state", "ole-miss", "texas-tech", "wake-forest", "lsu", "tennessee",
      "houston", "usc", "missouri", "boise-state", "iowa", "new-mexico", "south-carolina", "arizona", "florida",
    ],
  );
  assert.deepEqual(
    ap.teams.map((t: { rank: number }) => t.rank),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  );
  const ship = JSON.parse(readFileSync(join(root, "data/week5_od_hx_ship_2026.json"), "utf8"));
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
  assert.equal(recomputed.find((g) => g.name === "Oregon"), undefined);
  assert.equal(recomputed.find((g) => g.name === "Ohio State")?.delta, 9);
});

test("board card leads with the Week 10 flags, then remaining JSON gaps", () => {
  const rows = boardDisagreementRows([
    { slug: "kentucky", name: "Kentucky", shortName: "Kentucky", colorPrimary: "#0033a0" },
    { slug: "wake-forest", name: "Wake Forest", shortName: "Wake", colorPrimary: "#9e7e38" },
    { slug: "new-mexico", name: "New Mexico", shortName: "New Mexico", colorPrimary: "#ba0c2f" },
    { slug: "houston", name: "Houston", shortName: "Houston", colorPrimary: "#c8102e" },
    { slug: "south-carolina", name: "South Carolina", shortName: "South Carolina", colorPrimary: "#73000a" },
    { slug: "byu", name: "BYU", shortName: "BYU", colorPrimary: "#002e5d" },
  ]);
  assert.deepEqual(
    rows.slice(0, DISAGREE_HIGHLIGHT_NAMES.length).map((r) => r.name),
    [...DISAGREE_HIGHLIGHT_NAMES],
  );
  assert.ok(rows.slice(0, DISAGREE_HIGHLIGHT_NAMES.length).every((r) => r.highlight));
  const rest = rows.slice(DISAGREE_HIGHLIGHT_NAMES.length);
  assert.deepEqual(rest.slice(0, 2).map((r) => r.name), ["UCLA", "Boise State"]);
  const ucla = rows.find((r) => r.name === "UCLA");
  assert.equal(ucla?.ap, 5);
  assert.equal(ucla?.hx, 45);
  assert.equal(rows.find((r) => r.name === "Wake Forest")?.slug, "wake-forest");
  assert.equal(rows.find((r) => r.name === "New Mexico")?.slug, "new-mexico");
  assert.equal(rows.find((r) => r.name === "Oklahoma State"), undefined);
  assert.equal(rows.find((r) => r.name === "Iowa"), undefined);
  assert.equal(rows.find((r) => r.name === "Oregon"), undefined);
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
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /function week3Tape\(\)/);
  const home = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  assert.match(home, /week10Tape\(\)/);
  assert.doesNotMatch(home, /week9Tape\(\)/);
  assert.doesNotMatch(home, /week8Tape\(\)/);
  assert.doesNotMatch(home, /week7Tape\(\)/);
  assert.doesNotMatch(home, /week6Tape\(\)/);
  assert.doesNotMatch(home, /week5Tape\(\)/);
  assert.doesNotMatch(home, /week4Tape\(\)/);
  assert.doesNotMatch(home, /week3Tape\(\)/);
  assert.doesNotMatch(home, /week2Tape\(\)/);
});

test("Week 4 tape is 42/57 SU and 20/57 closer FLAG", () => {
  const tape = week4Tape();
  assert.equal(tape.n, 57);
  assert.equal(tape.su, "42/57");
  assert.equal(tape.su_pct, 73.7);
  assert.equal(tape.hx_closer, "20/57");
  assert.equal(tape.hx_closer_pct, 35.1);
  assert.equal(tape.closer_flag, true);
  assert.equal(tape.vegas_closer, "37/57");
  assert.equal(tape.hx_ats, "28/57");
  assert.equal(tape.hx_ats_pct, 49.1);
  assert.equal(tape.mae_hx, 12.79);
  assert.equal(tape.mae_vegas, 11.21);
  assert.equal(tape.brier, 0.181);
  assert.equal(week4TapePack.meta.n_games, 57);
  assert.equal(week4TapePack.meta.scope, "FBS–FBS only");
  assert.equal(week4TapePack.su_misses.length, 15);
  assert.equal(week4TapePack.winner_flip_hits.length, 2);
  assert.equal(week4TapePack.winner_flip_misses.length, 6);
  assert.equal(week4TapePack.games.length, 57);
  const season = week4SeasonTape();
  assert.equal(season.label, "W1–W4");
  assert.equal(season.su, "164/203");
  assert.equal(season.su_pct, 80.8);
  assert.equal(season.hx_closer, "83/203");
  assert.equal(season.hx_closer_pct, 40.9);
  const flags = week4BoardFlags();
  assert.equal(flags.length, 8);
  assert.equal(flags.filter((f) => f.result === "HIT").length, 2);
  assert.equal(flags.filter((f) => f.result === "MISS").length, 6);
  const names = flags.map((f) => f.matchup).join(" | ");
  assert.match(names, /Navy @ UAB/);
  assert.match(names, /Clemson @ California/);
  assert.match(names, /Texas A&M @ LSU/);
  assert.match(names, /Air Force @ Nevada/);
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /week4_tape_2026\.json/);
  assert.match(src, /week4_tape_top25_closer_2026\.json/);
  const packText = JSON.stringify(week4TapePack);
  assert.doesNotMatch(packText, /The board is posted/);
  assert.doesNotMatch(packText, /guaranteed ROI/i);
  assert.doesNotMatch(packText, /2026\.6/);
});

test("Week 4 Top 25 closer cut is 8/18 HX FLAG · 12/18 SU", () => {
  const cut = week4Top25Tape();
  assert.equal(cut.n, 18);
  assert.equal(cut.su, "12/18");
  assert.equal(cut.su_pct, 66.7);
  assert.equal(cut.hx_closer, "8/18");
  assert.equal(cut.hx_closer_pct, 44.4);
  assert.ok(cut.hx_closer_pct < 45);
  assert.equal(cut.vegas_closer, "10/18");
  assert.equal(week4Top25Pack.meta.n_games, 18);
  assert.equal(week4Top25Pack.games.length, 18);
  assert.equal(week4Top25Pack.games.filter((g) => g.closer === "hx").length, 8);
  assert.equal(week4Top25Pack.games.filter((g) => g.su_hit).length, 12);
  assert.match(week4Top25Pack.meta.full_slate_closer, /20\/57/);
  const hawaii = week4TapePack.games.find((g) => g.away_slug === "hawaii");
  assert.ok(hawaii);
  assert.equal(hawaii.away, "Hawaiʻi");
  assert.equal(hawaii.home_slug, "wyoming");
  assert.equal(hawaii.score_away, 10);
  assert.equal(hawaii.score_home, 27);
});


test("Week 5 tape is 39/55 SU and 20/55 closer FLAG", () => {
  const tape = week5Tape();
  assert.equal(tape.n, 55);
  assert.equal(tape.su, "39/55");
  assert.equal(tape.su_pct, 70.9);
  assert.equal(tape.hx_closer, "20/55");
  assert.equal(tape.hx_closer_pct, 36.4);
  assert.equal(tape.closer_flag, true);
  assert.equal(tape.vegas_closer, "35/55");
  assert.equal(tape.hx_ats, "26/55");
  assert.equal(tape.hx_ats_pct, 47.3);
  assert.equal(tape.mae_hx, 14.87);
  assert.equal(tape.mae_vegas, 13.19);
  assert.equal(tape.brier, 0.195);
  assert.equal(week5TapePack.meta.n_games, 55);
  assert.equal(week5TapePack.meta.scope, "FBS–FBS only");
  assert.equal(week5TapePack.su_misses.length, 16);
  assert.equal(week5TapePack.winner_flip_hits.length, 6);
  assert.equal(week5TapePack.winner_flip_misses.length, 5);
  assert.equal(week5TapePack.games.length, 55);
  const season = week5SeasonTape();
  assert.equal(season.label, "W1–W5");
  assert.equal(season.su, "203/258");
  assert.equal(season.su_pct, 78.7);
  assert.equal(season.hx_closer, "103/258");
  assert.equal(season.hx_closer_pct, 39.9);
  assert.match(season.note, /Not a fresh/);
  const flags = week5BoardFlags();
  assert.equal(flags.length, 11);
  assert.equal(flags.filter((f) => f.result === "HIT").length, 6);
  assert.equal(flags.filter((f) => f.result === "MISS").length, 5);
  const names = flags.map((f) => f.matchup).join(" | ");
  assert.match(names, /Florida @ Missouri/);
  assert.match(names, /Syracuse @ UConn/);
  assert.match(names, /Western Kentucky @ New Mexico State/);
  const cut = week5Top25Tape();
  assert.equal(cut.n, 15);
  assert.equal(cut.su, "13/15");
  assert.equal(cut.su_pct, 86.7);
  assert.equal(cut.hx_closer, "7/15");
  assert.equal(cut.hx_closer_pct, 46.7);
  assert.ok(cut.hx_closer_pct >= 45);
  assert.equal(cut.vegas_closer, "8/15");
  assert.equal(week5Top25Pack.games.length, 15);
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  assert.match(src, /week5_tape_2026\.json/);
  assert.match(src, /week5_tape_top25_closer_2026\.json/);
  const packText = JSON.stringify(week5TapePack);
  assert.doesNotMatch(packText, /The board is posted/);
  assert.doesNotMatch(packText, /guaranteed ROI/i);
  assert.doesNotMatch(packText, /2026\.7/);
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

test("truth-pack loads the current-HX 10k free export, never the full sim", () => {
  const src = readFileSync(join(root, "src/lib/cfb/truth-pack.ts"), "utf8");
  // Client-bundled truth-pack reads the free export; the full sim (win_title) is server-only.
  assert.match(src, /from "\.\.\/\.\.\/\.\.\/data\/sim_free_hx2026_8\.json"/);
  assert.doesNotMatch(src, /from "\.\.\/\.\.\/\.\.\/data\/sim_10k_2026[^"]*\.json"/);
  assert.equal(sim10k.meta.source, SIM_FULL_FILE);
  assert.equal(sim10k.meta.as_of, sim10kFull.meta.as_of);
  assert.equal(sim10k.meta.n_sims, 10000);
  assert.equal(sim10k.meta.hx_stamp, sim10kFull.meta.hx_stamp);
  assert.match(sim10k.meta.hx_stamp ?? "", /^HX 2026\.8$/);
  assert.equal(sim10k.teams.length, 138); // 136 + 2026 newcomers (0093)
});

test("sim_10k Georgia make-field and title are separate cells; free row has no title", () => {
  const free = simTeamBySlug("georgia");
  assert.ok(free);
  assert.equal("win_title" in free, false, "free export carries no win_title");
  const g = simFullTeamBySlug("georgia");
  assert.ok(g);
  assert.equal(free.make_field, g.make_field);
  assert.notEqual(g.make_field, g.win_title);
  assert.ok(g.win_title < g.make_field, "title odds can never exceed make-field odds");
  assert.equal(SIM_10K_AS_OF, sim10kFull.meta.as_of);
  assert.match(SIM_10K_NOTE, /HX 2026\.8 · 10k draws/);
  assert.match(SIM_10K_NOTE, new RegExp(sim10kFull.meta.as_of));
  assert.doesNotMatch(SIM_10K_NOTE, /HX 2026\.7 ·/);
});

test("free sim export mirrors the full sim make-field cells and drops win_title", () => {
  assert.equal(sim10k.teams.length, sim10kFull.teams.length);
  for (const [i, full] of sim10kFull.teams.entries()) {
    const free = sim10k.teams[i]!;
    assert.equal(free.slug, full.slug);
    assert.equal(free.make_field, full.make_field, full.slug);
    assert.equal(free.proj_wins, full.proj_wins, full.slug);
    assert.equal(free.conf_title, full.conf_title, full.slug);
    assert.equal("win_title" in free, false, full.slug);
  }
  const raw = readFileSync(join(root, "data/sim_free_hx2026_8.json"), "utf8");
  assert.doesNotMatch(raw, /win_title/);
});

test("sim_10k: 12 make-field slots and one title per draw; every title is inside make-field", () => {
  const mf = sim10kFull.teams.reduce((a, t) => a + t.make_field, 0);
  const wt = sim10kFull.teams.reduce((a, t) => a + t.win_title, 0);
  assert.ok(Math.abs(mf - 1200) < 0.5, `make_field sums to ${mf}`);
  assert.ok(Math.abs(wt - 100) < 0.5, `win_title sums to ${wt}`);
  for (const t of sim10kFull.teams) assert.ok(t.win_title <= t.make_field, t.slug);
});


test("Week 6 tape is 33/56 SU and 27/56 closer (no closer FLAG) on the HX 2026.7 pregame board", () => {
  const tape = week6Tape();
  assert.equal(tape.n, 56);
  assert.equal(tape.su, "33/56");
  assert.equal(tape.su_pct, 58.9);
  assert.equal(tape.hx_closer, "27/56");
  assert.equal(tape.hx_closer_pct, 48.2);
  assert.equal(tape.closer_flag, false);
  assert.equal(tape.vegas_closer, "28/56");
  assert.equal(week6TapePack.meta.closer_ties, 1);
  assert.equal(tape.mae_hx, 12.74);
  assert.equal(tape.mae_vegas, 11.5);
  assert.equal(tape.brier, 0.232);
  assert.equal(week6TapePack.games.length, 56);
  assert.equal(week6TapePack.games.filter((g) => g.su_hit).length, 33);
  assert.equal(week6TapePack.games.filter((g) => g.closer === "hx").length, 27);
  assert.equal(week6TapePack.games.filter((g) => g.closer === "vegas").length, 28);
  assert.equal(week6TapePack.su_misses.length, 23);
  assert.equal(week6BoardFlags().filter((f) => f.result === "HIT").length, 4);
  assert.equal(week6BoardFlags().filter((f) => f.result === "MISS").length, 9);
  const season = week6SeasonTape();
  assert.equal(season.label, "W1–W6");
  assert.equal(season.su, "236/314");
  assert.equal(season.hx_closer, "130/314");
  const top = week6Top25Tape();
  assert.equal(top.n, 15);
  assert.equal(top.hx_closer, "9/15");
  assert.equal(top.su, "8/15");
  assert.equal(week6Top25Pack.games.length, 15);
  // Late stragglers are in the ledger with ESPN finals.
  const bois = week6TapePack.games.find((g) => g.home_slug === "fresno-state" && g.away_slug === "boise-state");
  assert.equal(bois?.score_away, 38);
  assert.equal(bois?.score_home, 31);
  const asu = week6TapePack.games.find((g) => g.home_slug === "arizona-state" && g.away_slug === "hawaii");
  assert.equal(asu?.score_home, 30);
  assert.equal(asu?.score_away, 12);
  const home = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  assert.match(home, /weekLabel="Week 10 tape"/);
  assert.doesNotMatch(home, /The board is posted/);
  assert.doesNotMatch(JSON.stringify(week6TapePack), /win_title/);
});

test("Week 7 tape is 34/57 SU; closer 3/6 on the Vegas-lined cards (HX 2026.7 pregame board)", () => {
  const tape = week7Tape();
  assert.equal(tape.n, 57);
  assert.equal(tape.su, "34/57");
  assert.equal(tape.su_pct, 59.6);
  assert.equal(tape.hx_closer, "3/6");
  assert.equal(tape.hx_closer_pct, 50);
  assert.equal(tape.closer_flag, false);
  assert.equal(tape.vegas_closer, "2/6");
  assert.equal(tape.hx_ats, "3/5");
  assert.equal(tape.mae_hx, 12.68);
  assert.equal(tape.mae_vegas, 13.67);
  assert.equal(tape.brier, 0.234);
  const m = week7TapePack.meta;
  assert.equal(m.closer_n, 6);
  assert.equal(m.closer_ties, 1);
  assert.equal(m.hx_closer_of_slate, "3/57");
  assert.equal(week7TapePack.games.length, 57);
  assert.equal(week7TapePack.games.filter((g) => g.su_hit).length, 34);
  assert.equal(week7TapePack.games.filter((g) => g.closer === "hx").length, 3);
  assert.equal(week7TapePack.games.filter((g) => g.closer === "vegas").length, 2);
  assert.equal(week7TapePack.games.filter((g) => g.closer === "tie").length, 1);
  assert.equal(week7TapePack.games.filter((g) => g.closer == null).length, 51);
  // Closer cards are exactly the six 0057 Vegas cards.
  assert.equal(week7TapePack.games.filter((g) => g.vegas_details != null).length, 6);
  assert.equal(week7TapePack.su_misses.length, 23);
  assert.equal(week7BoardFlags().filter((f) => f.result === "HIT").length, 1);
  assert.equal(week7BoardFlags().filter((f) => f.result === "MISS").length, 0);
  const season = week7SeasonTape();
  assert.equal(season.label, "W1–W7");
  assert.equal(season.su, "270/371");
  assert.equal(season.hx_closer, "133/320");
  const top = week7Top25Tape();
  assert.equal(top.n, 15);
  assert.equal(top.su, "10/15");
  assert.equal(top.hx_closer, "2/3");
  assert.equal(top.vegas_closer, "1/3");
  assert.equal(week7Top25Pack.games.length, 15);
  // Nebraska @ Oregon straggler is in the ledger with the ESPN final (0063).
  const ore = week7TapePack.games.find((g) => g.home_slug === "oregon" && g.away_slug === "nebraska");
  assert.equal(ore?.score_home, 17);
  assert.equal(ore?.score_away, 14);
  const home = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  assert.match(home, /weekLabel="Week 10 tape"/);
  assert.match(home, /scheduleWeek=\{10\}/);
  assert.match(home, /closerScope="Vegas-lined"/);
  assert.doesNotMatch(home, /The board is posted/);
  assert.doesNotMatch(JSON.stringify(week7TapePack), /win_title/);
  assert.doesNotMatch(JSON.stringify(week7Top25Pack), /win_title/);
});

test("Week 8 tape is 31/54 SU; closer 3/7 on the Vegas-lined cards FLAGs (HX 2026.7 pregame board)", () => {
  const tape = week8Tape();
  assert.equal(tape.n, 54);
  assert.equal(tape.su, "31/54");
  assert.equal(tape.su_pct, 57.4);
  assert.equal(tape.hx_closer, "3/7");
  assert.equal(tape.hx_closer_pct, 42.9);
  // Same <45% rule as every week: 3/7 is under it, so the closer tile FLAGs.
  assert.equal(tape.closer_flag, true);
  assert.equal(tape.vegas_closer, "4/7");
  assert.equal(tape.hx_ats, "4/7");
  assert.equal(tape.mae_hx, 12.99);
  assert.equal(tape.mae_vegas, 7.43);
  assert.equal(tape.brier, 0.26);
  const m = week8TapePack.meta;
  assert.equal(m.closer_n, 7);
  assert.equal(m.closer_ties, 0);
  assert.equal(m.hx_closer_of_slate, "3/54");
  assert.equal(week8TapePack.games.length, 54);
  assert.equal(week8TapePack.games.filter((g) => g.su_hit).length, 31);
  assert.equal(week8TapePack.games.filter((g) => g.closer === "hx").length, 3);
  assert.equal(week8TapePack.games.filter((g) => g.closer === "vegas").length, 4);
  assert.equal(week8TapePack.games.filter((g) => g.closer === "tie").length, 0);
  assert.equal(week8TapePack.games.filter((g) => g.closer == null).length, 47);
  // Closer cards are exactly the seven 0064 Vegas cards.
  assert.equal(week8TapePack.games.filter((g) => g.vegas_details != null).length, 7);
  assert.equal(week8TapePack.su_misses.length, 23);
  assert.equal(week8BoardFlags().filter((f) => f.result === "HIT").length, 0);
  assert.equal(week8BoardFlags().filter((f) => f.result === "MISS").length, 2);
  const season = week8SeasonTape();
  assert.equal(season.label, "W1–W8");
  assert.equal(season.su, "301/425");
  assert.equal(season.hx_closer, "136/327");
  const top = week8Top25Tape();
  assert.equal(top.n, 15);
  assert.equal(top.su, "7/15");
  assert.equal(top.hx_closer, "1/2");
  assert.equal(top.vegas_closer, "1/2");
  assert.equal(week8Top25Pack.games.length, 15);
  // Houston @ Utah straggler is in the ledger with the ESPN final (0071).
  const utah = week8TapePack.games.find((g) => g.home_slug === "utah" && g.away_slug === "houston");
  assert.equal(utah?.score_home, 21);
  assert.equal(utah?.score_away, 13);
  assert.doesNotMatch(JSON.stringify(week8TapePack), /win_title/);
  assert.doesNotMatch(JSON.stringify(week8Top25Pack), /win_title/);
});

test("Week 9 tape is 44/54 SU; closer 3/6 on the Vegas-lined cards, no closer FLAG (HX 2026.7 pregame board)", () => {
  const tape = week9Tape();
  assert.equal(tape.n, 54);
  assert.equal(tape.su, "44/54");
  assert.equal(tape.su_pct, 81.5);
  assert.equal(tape.hx_closer, "3/6");
  assert.equal(tape.hx_closer_pct, 50);
  // Same <45% rule as every week: 3/6 is not under it, so no closer FLAG.
  assert.equal(tape.closer_flag, false);
  assert.equal(tape.vegas_closer, "3/6");
  assert.equal(tape.hx_ats, "4/6");
  assert.equal(tape.mae_hx, 12.38);
  assert.equal(tape.mae_vegas, 17);
  assert.equal(tape.brier, 0.153);
  const m = week9TapePack.meta;
  assert.equal(m.closer_n, 6);
  assert.equal(m.closer_ties, 0);
  assert.equal(m.hx_closer_of_slate, "3/54");
  assert.equal(week9TapePack.games.length, 54);
  assert.equal(week9TapePack.games.filter((g) => g.su_hit).length, 44);
  assert.equal(week9TapePack.games.filter((g) => g.closer === "hx").length, 3);
  assert.equal(week9TapePack.games.filter((g) => g.closer === "vegas").length, 3);
  assert.equal(week9TapePack.games.filter((g) => g.closer === "tie").length, 0);
  assert.equal(week9TapePack.games.filter((g) => g.closer == null).length, 48);
  // Closer cards are exactly the six 0072 Vegas cards.
  assert.equal(week9TapePack.games.filter((g) => g.vegas_details != null).length, 6);
  assert.equal(week9TapePack.su_misses.length, 10);
  assert.equal(week9BoardFlags().filter((f) => f.result === "HIT").length, 1);
  assert.equal(week9BoardFlags().filter((f) => f.result === "MISS").length, 1);
  const season = week9SeasonTape();
  assert.equal(season.label, "W1–W9");
  assert.equal(season.su, "345/479");
  assert.equal(season.hx_closer, "139/333");
  const top = week9Top25Tape();
  assert.equal(top.n, 19);
  assert.equal(top.su, "16/19");
  assert.equal(top.hx_closer, "2/4");
  assert.equal(top.vegas_closer, "2/4");
  assert.equal(week9Top25Pack.games.length, 19);
  // Featured Week 9 card Ohio State @ USC is in the ledger with the ESPN final.
  const usc = week9TapePack.games.find((g) => g.home_slug === "usc" && g.away_slug === "ohio-state");
  assert.equal(usc?.score_home, 30);
  assert.equal(usc?.score_away, 18);
  const home = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  assert.match(home, /weekLabel="Week 10 tape"/);
  assert.match(home, /scheduleWeek=\{10\}/);
  assert.match(home, /closerScope="Vegas-lined"/);
  assert.doesNotMatch(home, /The board is posted/);
  assert.doesNotMatch(JSON.stringify(week9TapePack), /win_title/);
  assert.doesNotMatch(JSON.stringify(week9Top25Pack), /win_title/);
});

test("Week 10 tape is 36/61 SU; closer 3/5 on the Vegas-lined cards, SU FLAG, no closer FLAG (HX 2026.7 pregame board)", () => {
  const tape = week10Tape();
  assert.equal(tape.n, 61);
  assert.equal(tape.su, "36/61");
  assert.equal(tape.su_pct, 59);
  assert.equal(tape.hx_closer, "3/5");
  assert.equal(tape.hx_closer_pct, 60);
  // Same <45% rule as every week: 3/5 is not under it, so no closer FLAG.
  assert.equal(tape.closer_flag, false);
  assert.equal(tape.vegas_closer, "2/5");
  assert.equal(tape.hx_ats, "3/5");
  assert.equal(tape.mae_hx, 15.95);
  assert.equal(tape.mae_vegas, 19.8);
  assert.equal(tape.brier, 0.266);
  const m = week10TapePack.meta;
  assert.equal(m.closer_n, 5);
  assert.equal(m.closer_ties, 0);
  assert.equal(m.hx_closer_of_slate, "3/61");
  assert.equal(m.headline_flags.su_below_70, true);
  assert.equal(week10TapePack.games.length, 61);
  assert.equal(week10TapePack.games.filter((g) => g.su_hit).length, 36);
  assert.equal(week10TapePack.games.filter((g) => g.closer === "hx").length, 3);
  assert.equal(week10TapePack.games.filter((g) => g.closer === "vegas").length, 2);
  assert.equal(week10TapePack.games.filter((g) => g.closer === "tie").length, 0);
  assert.equal(week10TapePack.games.filter((g) => g.closer == null).length, 56);
  // Closer cards are exactly the five 0080 Vegas cards.
  assert.equal(week10TapePack.games.filter((g) => g.vegas_details != null).length, 5);
  assert.equal(week10TapePack.su_misses.length, 25);
  assert.equal(week10BoardFlags().filter((f) => f.result === "HIT").length, 2);
  assert.equal(week10BoardFlags().filter((f) => f.result === "MISS").length, 1);
  const season = week10SeasonTape();
  assert.equal(season.label, "W1–W10");
  assert.equal(season.su, "381/540");
  assert.equal(season.hx_closer, "142/338");
  const top = week10Top25Tape();
  assert.equal(top.n, 15);
  assert.equal(top.su, "10/15");
  assert.equal(top.hx_closer, "2/2");
  assert.equal(top.vegas_closer, "0/2");
  assert.equal(week10Top25Pack.games.length, 15);
  // Featured Week 10 card Oregon @ Ohio State is in the ledger with the ESPN final.
  const osu = week10TapePack.games.find((g) => g.home_slug === "ohio-state" && g.away_slug === "oregon");
  assert.equal(osu?.score_home, 28);
  assert.equal(osu?.score_away, 41);
  const home = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  assert.match(home, /weekLabel="Week 10 tape"/);
  assert.match(home, /scheduleWeek=\{10\}/);
  assert.match(home, /closerScope="Vegas-lined"/);
  assert.match(home, /SU 36\/61 is under 70%/);
  assert.doesNotMatch(home, /The board is posted/);
  assert.doesNotMatch(JSON.stringify(week10TapePack), /win_title/);
  assert.doesNotMatch(JSON.stringify(week10Top25Pack), /win_title/);
});
