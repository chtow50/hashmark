import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { scanClientOutput } from "./check-client-bundle.mjs";

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

/** Server-only, Stripe-gated Edge Pack chunk (data/edge-packs/current via import.meta.glob). */
const GATED_PACK_CHUNK_RE = /functions\/__server\.func\/_ssr\/edge-pack-files\.server-[^/]+\.mjs$/;

function corpusExcludingGatedPack() {
  const files = walk(OUT).filter((p) => /\.(js|mjs)$/.test(p) && !GATED_PACK_CHUNK_RE.test(p));
  return files.map((p) => readFileSync(p, "utf8")).join("\n");
}

describe("prebuilt deploy artifacts", () => {
  it("public static output carries no win_title (Edge Pack / paid only)", () => {
    const hits = scanClientOutput(join(OUT, "static"));
    assert.deepEqual(hits, [], `win_title leaked into public static: ${JSON.stringify(hits)}`);
    const assets = walk(join(OUT, "static/assets")).filter((p) => p.endsWith(".js"));
    assert.ok(assets.length > 5, "static/assets has client chunks");
    const client = assets.map((p) => readFileSync(p, "utf8")).join("\n");
    // Free Make 12 still ships: Georgia make-field 86.51 on HX 2026.7.
    assert.match(client, /86\.51/);
    assert.match(client, /sim_free_hx2026_7|sim_10k_2026_hx2026_7\.json/);
    assert.doesNotMatch(client, /24\.29/);
    assert.doesNotMatch(client, /\/workspace\/cfb\/week5_od_hx_ship_2026/);
  });

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

  it("includes Week 1 tape, gaps, and HX 2026.7 Make the 12 in committed output", () => {
    const text = corpus();
    assert.match(text, /36\/43/);
    assert.match(text, /make_field/);
    assert.match(text, /86\.51/);
    // Georgia HX 2026.7 win_title (24.29) is Edge Pack only: it may live in the
    // Stripe-gated server pack chunk (edge-pack-files.server-*), never anywhere else.
    assert.doesNotMatch(corpusExcludingGatedPack(), /24\.29/);
    assert.match(text, /20260913/);
    assert.match(text, /2026-10-05/);
    assert.match(text, /sim_10k_2026_hx2026_7/);
    assert.match(text, /HX 2026\.7/);
    assert.match(text, /10k draws/);
    assert.match(text, /make12FromSim|amd-draws|make-field, not title/);
    assert.doesNotMatch(text, /HX 2026\.4 · 10k draws/);
    assert.doesNotMatch(text, /make-field · HX 2026\.4 10k/);
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

  it("includes Week 4 FBS–FBS Research kick/TV/Vegas stamps in committed output", () => {
    const text = corpus();
    assert.match(text, /0031_week4_kick_tv_vegas/);
    assert.match(text, /week4_fbs_fbs_kick_tv_vegas_2026/);
    assert.match(text, /timestamptz '2026-09-24 18:30:00-05'/);
    assert.match(text, /h\.slug = 'coastal-carolina' and a\.slug = 'liberty'/);
    assert.match(text, /h\.slug = 'lsu' then 5\.5 else -5\.5/);
    assert.match(text, /h\.slug = 'tennessee' then -4\.5 else 4\.5/);
    assert.match(text, /Liberty @ Coastal Carolina/);
    assert.match(text, /WEEK4_FEATURED|coastal-carolina/);
  });

  it("includes the Sep 23 Week 4 Vegas CLEAR refresh in committed output", () => {
    const text = corpus();
    assert.match(text, /0035_week4_vegas_clear_2026_09_23/);
    assert.match(text, /week4_vegas_clear_pack_2026-09-23/);
    assert.match(text, /h\.slug = 'coastal-carolina' then -2\.5 else 2\.5/);
    assert.match(text, /vegas_total = 50\.5/);
    assert.match(text, /h\.slug = 'lsu' then 8\.5 else -8\.5/);
    assert.match(text, /h\.slug = 'west-virginia' then 1\.5 else -1\.5/);
    assert.match(text, /h\.slug = 'usc' then -3 else 3/);
    assert.match(text, /timestamptz '2026-09-26 14:30:00-05'/);
    assert.match(text, /tv = 'ESPN2'/);
    assert.match(text, /timestamptz '2026-09-26 15:00:00-05'/);
    assert.match(text, /tv = 'ESPNU'/);
    assert.match(text, /401869941/);
    assert.match(text, /401860897/);
    assert.match(text, /401856806/);
  });

  it("includes Week 5 FBS–FBS Research kick/TV/Vegas stamps in committed output", () => {
    const text = corpus();
    assert.match(text, /0036_week5_kick_tv_vegas/);
    assert.match(text, /week5_fbs_fbs_kick_tv_vegas_2026/);
    assert.match(text, /timestamptz '2026-10-02 18:00:00-05'/);
    assert.match(text, /h\.slug = 'virginia-tech' then 5\.5 else -5\.5/);
    assert.match(text, /vegas_total = 56\.5/);
    assert.match(text, /h\.slug = 'northwestern' then -7 else 7/);
    assert.match(text, /h\.slug = 'minnesota' then -8\.5 else 8\.5/);
    assert.match(text, /h\.slug = 'iowa' then -14 else 14/);
    assert.match(text, /h\.slug = 'south-carolina' then 7 else -7/);
    assert.match(text, /h\.slug = 'usc' then 10 else -10/);
    assert.match(text, /timestamptz '2026-10-01 19:00:00-05'/);
    assert.match(text, /timestamptz '2026-10-01 20:00:00-05'/);
    assert.match(text, /timestamptz '2026-10-03 19:00:00-05'/);
    assert.match(text, /timestamptz '2026-10-03 20:30:00-05'/);
    assert.match(text, /timestamptz '2026-10-03 21:30:00-05'/);
    assert.match(text, /WEEK5_FEATURED/);
    assert.match(text, /selectWeekScopedFeatured/);
    assert.match(text, /Week 5 board/);
    assert.match(text, /Week 6 board/);
    assert.match(text, /401858245/);
  });

  it("includes the Sep 28 Week 5 Vegas CLEAR refresh in committed output", () => {
    const text = corpus();
    assert.match(text, /0041_week5_vegas_refresh_2026_09_28/);
    assert.match(text, /week5_vegas_clear_pack_2026-09-28/);
    assert.match(text, /VT −3\.5 \/ 52\.5/);
    assert.match(text, /h\.slug = 'new-mexico-state' then 2\.5 else -2\.5/);
    assert.match(text, /vegas_total = 54\.5/);
    assert.match(text, /h\.slug = 'tulsa' then 1\.5 else -1\.5/);
    assert.match(text, /vegas_total = 57\.5/);
    assert.match(text, /h\.slug = 'delaware' then -7 else 7/);
    assert.match(text, /vegas_total = 49\.5/);
    assert.match(text, /h\.slug = 'virginia-tech' then 3\.5 else -3\.5/);
    assert.match(text, /vegas_total = 52\.5/);
    assert.match(text, /h\.slug = 'northwestern' then -2\.5 else 2\.5/);
    assert.match(text, /vegas_total = 46\.5/);
    assert.match(text, /h\.slug = 'tennessee' then 7 else -7/);
    assert.match(text, /HOLD \(TV\) Auburn @ Tennessee/);
    assert.match(text, /leave tv null/);
  });

  it("includes the Sep 30 Auburn @ Tennessee TV ESPN stamp in committed output", () => {
    const text = corpus();
    assert.match(text, /0042_week5_auburn_tennessee_tv_espn/);
    assert.match(text, /week5_auburn_tennessee_tv_clear_2026-09-30/);
    assert.match(text, /TV field only/);
    assert.match(text, /set tv = 'ESPN'/);
    assert.match(text, /h\.slug = 'tennessee' and a\.slug = 'auburn'/);
    assert.match(text, /Source event 401856710/);
    assert.match(text, /Do not put ESPN event digits in this header/);
  });

  it("includes Week 6 FBS–FBS Research kick/TV/Vegas stamps in committed output", () => {
    const text = corpus();
    assert.match(text, /0043_week6_kick_tv_vegas/);
    assert.match(text, /week6_fbs_fbs_kick_tv_vegas_2026/);
    assert.match(text, /timestamptz '2026-10-09 21:15:00-05'/);
    assert.match(text, /h\.slug = 'byu' then 14\.5 else -14\.5/);
    assert.match(text, /vegas_total = 50\.5/);
    assert.match(text, /h\.slug = 'troy' then 8\.5 else -8\.5/);
    assert.match(text, /h\.slug = 'kennesaw-state' then -2\.5 else 2\.5/);
    assert.match(text, /h\.slug = 'oklahoma' then -9\.5 else 9\.5/);
    assert.match(text, /h\.slug = 'oregon' then 12\.5 else -12\.5/);
    assert.match(text, /h\.slug = 'alabama' then -3 else 3/);
    assert.match(text, /h\.slug = 'penn-state' then 1\.5 else -1\.5/);
    assert.match(text, /h\.slug = 'nebraska' then -9\.5 else 9\.5/);
    assert.match(text, /h\.slug = 'kentucky' then -10\.5 else 10\.5/);
    assert.match(text, /timestamptz '2026-10-06 19:00:00-05'/);
    assert.match(text, /WEEK6_FEATURED/);
    assert.match(text, /401856826/);
    assert.match(text, /FEATURED_SLATE_WEEK = 5/);
  });

  it("includes the Oct 5 Week 6 Vegas CLEAR refresh in committed output", () => {
    const text = corpus();
    assert.match(text, /0048_week6_vegas_clear_2026_10_05/);
    assert.match(text, /week6_vegas_clear_pack_2026-10-05/);
    assert.match(text, /timestamptz '2026-10-09 21:15:00-05'/);
    assert.match(text, /h\.slug = 'byu' then 10\.5 else -10\.5/);
    assert.match(text, /vegas_total = 48\.5/);
    assert.match(text, /h\.slug = 'troy' then 10\.5 else -10\.5/);
    assert.match(text, /h\.slug = 'florida' then 13\.5 else -13\.5/);
    assert.match(text, /vegas_total = 62\.5/);
    assert.match(text, /h\.slug = 'missouri' then 3\.5 else -3\.5/);
    assert.match(text, /h\.slug = 'alabama' then 1\.5 else -1\.5/);
    assert.match(text, /vegas_total = 55\.5/);
    assert.match(text, /h\.slug = 'washington' then 2\.5 else -2\.5/);
    assert.match(text, /tv = null/);
    assert.match(text, /HOLD \(TV\) Iowa @ Washington/);
    assert.match(text, /HOLD \(Vegas\) Kansas @ Utah/);
    assert.match(text, /WEEK6_FEATURED/);
    assert.match(text, /BOARD_WEEK is 6|BOARD_WEEK = 6/);
  });


  it("includes Week 2 O/D + HX 2026.4 stamp and Week 3 chrome in committed output", () => {
    const text = corpus();
    assert.match(text, /0028_week2_od_hx_ship/);
    assert.match(text, /HX 2026\.4/);
    // Chrome string used to ride along via the Week 3 SAMPLE pack embed; after
    // the Week 5 unlock bake that pack is gone — assert the 0028 migration note.
    assert.match(text, /chrome markets Week 3/);
    assert.match(text, /7\.9055/);
    assert.match(text, /7\.8131/);
    assert.match(text, /6\.4443/);
    assert.match(text, /0\.0717/);
    assert.match(text, /week2_od_hx_ship_2026/);
    assert.doesNotMatch(text, /The board is posted/);
  });

  it("includes Week 3 O/D + HX 2026.5 stamp (live chrome is Week 6)", () => {
    const text = corpus();
    assert.match(text, /0034_week3_od_hx_ship/);
    assert.match(text, /HX 2026\.5/);
    assert.match(text, /Week 6 board/);
    assert.match(text, /HX is Week 6/);
    assert.match(text, /not a Week 5 ballot/);
    assert.match(text, /Week 6 AP/);
    assert.match(text, /W6 stamp/);
    assert.match(text, /7\.8978/);
    assert.match(text, /0\.0711/);
    assert.match(text, /week3_od_hx_ship_2026/);
    assert.match(text, /sunday_od_delta_2026_w3/);
    assert.match(text, /sim_10k_2026_hx2026_7/);
    assert.match(text, /HX 2026\.7/);
    assert.match(text, /10k draws/);
  });

  it("includes Week 3 remaining CLEAR FINALs and Week 3 tape in committed output", () => {
    const text = corpus();
    assert.match(text, /0033_week3_remaining_finals/);
    assert.match(text, /Miami @ Wake Forest — Wake Forest 20, Miami 33/);
    assert.match(text, /h\.slug = 'wake-forest' and a\.slug = 'miami'/);
    assert.match(text, /h\.slug = 'texas-am' and a\.slug = 'kentucky'/);
    assert.match(text, /week-3-tape/);
    assert.match(text, /49\/56/);
    assert.match(text, /23\/56/);
    assert.match(text, /week3_tape_2026/);
    assert.match(text, /week3_tape_top25_closer_2026/);
    assert.match(text, /5\/21/);
    assert.match(text, /20\/21/);
  });

  it("includes Week 4 O/D + HX 2026.6 stamp (live chrome is Week 6)", () => {
    const text = corpus();
    assert.match(text, /0040_week4_od_hx_ship/);
    assert.match(text, /HX 2026\.6/);
    assert.match(text, /Week 6 board/);
    assert.match(text, /7\.8964/);
    assert.match(text, /UCLA \+0\.071/);
    assert.match(text, /week4_od_hx_ship_2026/);
    assert.match(text, /sunday_od_delta_2026_w4/);
    assert.match(text, /Soft-cal FLAG/);
    assert.match(text, /sim_10k_2026_hx2026_7/);
    assert.match(text, /HX 2026\.7/);
    assert.match(text, /10k draws/);
    assert.doesNotMatch(text, /unit O\/D pulse is live|pulse chrome/i);
  });

  it("includes Week 4 remaining FINALs and the Week 4 tape in committed output", () => {
    const text = corpus();
    assert.match(text, /0039_week4_remaining_finals/);
    assert.match(text, /Army @ Temple — Temple 17, Army 21/);
    assert.match(text, /h\.slug = 'temple' and a\.slug = 'army'/);
    assert.match(text, /h\.slug = 'lsu' and a\.slug = 'texas-am'/);
    assert.match(text, /h\.slug = 'wyoming' and a\.slug = 'hawaii'/);
    assert.match(text, /week-4-tape/);
    assert.match(text, /42\/57/);
    assert.match(text, /20\/57/);
    assert.match(text, /week4_tape_2026/);
    assert.match(text, /week4_tape_top25_closer_2026/);
    assert.match(text, /8\/18/);
    assert.match(text, /Soft-cal FLAG/);
    assert.match(text, /homepage desk uses FEATURED_SLATE_WEEK/);
    assert.match(text, /HX is Week 6/);
  });

  it("includes Week 4 Friday stories, Liberty FINAL, Iowa FCS, and Week 4 AP in committed output", () => {
    const text = corpus();
    assert.match(text, /0037_week4_liberty_coastal_final/);
    assert.match(text, /Liberty @ Coastal Carolina — Coastal Carolina 17, Liberty 34/);
    assert.match(text, /home_score = 17/);
    assert.match(text, /away_score = 34/);
    assert.match(text, /h\.slug = 'coastal-carolina' and a\.slug = 'liberty'/);
    assert.match(text, /0038_week4_ap_top25/);
    assert.match(text, /week4_ap_top25_2026/);
    assert.match(text, /\('ole-miss', 4\)/);
    assert.match(text, /\('texas-am', 23\)/);
    assert.match(text, /\('houston', 25\)/);
    assert.match(text, /week6_hx_vs_ap_gaps_2026/);
    assert.match(text, /week-4-texas-am-lsu/);
    assert.match(text, /week-4-ole-miss-florida/);
    assert.match(text, /week-4-clemson-cal/);
    assert.match(text, /week-4-missouri-mississippi-state/);
    assert.match(text, /Northern Iowa/);
    assert.match(text, /W6 stamp/);
    assert.match(text, /not a Week 5 ballot/);
    assert.doesNotMatch(text, /Virginia AP 25/);
  });

  it("includes Week 5 Friday stories, Thu FINALs, Oregon FCS, AP Week 5, and Week 5 chrome in committed output", () => {
    const text = corpus();
    assert.match(text, /0045_week5_thu_finals/);
    assert.match(text, /Western Kentucky @ New Mexico State — New Mexico State 34, Western Kentucky 13/);
    assert.match(text, /home_score = 34/);
    assert.match(text, /away_score = 13/);
    assert.match(text, /h\.slug = 'new-mexico-state' and a\.slug = 'western-kentucky'/);
    assert.match(text, /North Texas @ Tulsa — Tulsa 44, North Texas 45/);
    assert.match(text, /home_score = 44/);
    assert.match(text, /away_score = 45/);
    assert.match(text, /h\.slug = 'tulsa' and a\.slug = 'north-texas'/);
    assert.match(text, /0044_week5_ap_top25/);
    assert.match(text, /week5_ap_top25_2026/);
    assert.match(text, /\('florida', 8\)/);
    assert.match(text, /\('mississippi-state', 16\)/);
    assert.match(text, /\('missouri', 25\)/);
    assert.match(text, /week6_hx_vs_ap_gaps_2026/);
    assert.match(text, /week-5-florida-missouri/);
    assert.match(text, /week-5-miami-clemson/);
    assert.match(text, /week-5-alabama-mississippi-state/);
    assert.match(text, /week-5-ohio-state-iowa/);
    assert.match(text, /week-5-louisville-nc-state/);
    assert.match(text, /week-5-wku-nmsu-final/);
    assert.match(text, /Portland State/);
    assert.match(text, /W6 stamp/);
    assert.match(text, /Week 6 board/);
    assert.match(text, /HX is Week 6/);
    assert.match(text, /not a Week 5 ballot/);
    assert.doesNotMatch(text, /Texas A&M AP 23/);
  });


  it("includes Week 6 Friday stories, AP Week 6 (Oct. 4), and KU @ Utah Vegas in committed output", () => {
    const text = corpus();
    assert.match(text, /0052_week6_ap_top25/);
    assert.match(text, /week6_ap_top25_2026/);
    assert.match(text, /\('florida', 16\)/);
    assert.match(text, /\('missouri', 14\)/);
    assert.match(text, /\('iowa', 20\)/);
    assert.match(text, /\('byu', 8\)/);
    assert.match(text, /\('pittsburgh', 25\)/);
    assert.match(text, /week6_hx_vs_ap_gaps_2026/);
    assert.match(text, /Week 6 AP/);
    assert.match(text, /W6 stamp/);
    assert.match(text, /not a Week 5 ballot/);
    assert.match(text, /0053_week6_ku_utah_vegas/);
    assert.match(text, /then 15\.5 else -15\.5 end/);
    assert.match(text, /vegas_total = 51\.5/);
    for (const slug of [
      "week-6-georgia-alabama",
      "week-6-ucla-oregon",
      "week-6-texas-am-missouri",
      "week-6-iowa-washington",
      "week-6-ranked-chill-gaps",
      "week-6-midweek-tape",
    ]) {
      assert.match(text, new RegExp(slug));
    }
    assert.match(text, /HX and Vegas have Washington by about two\. FPI has Iowa by 3\.5\./);
    assert.match(text, /Week 6 Friday desk/);
  });

  it("includes Week 3 Pitt FINAL and Week 5 HX-vs-AP gaps in committed output", () => {
    const text = corpus();
    assert.match(text, /0032_week3_pitt_syracuse_final/);
    assert.match(text, /Syracuse @ Pittsburgh — Pittsburgh 27, Syracuse 13/);
    assert.match(text, /home_score = 27/);
    assert.match(text, /away_score = 13/);
    assert.match(text, /h\.slug = 'pittsburgh' and a\.slug = 'syracuse'/);
    assert.match(text, /week6_hx_vs_ap_gaps_2026/);
    assert.match(text, /week-4-texas-am-lsu/);
    assert.match(text, /week-3-houston-texas-tech/);
    assert.match(text, /week-3-lsu-ole-miss/);
    assert.match(text, /Vegas has Texas Tech/);
    assert.match(text, /Week 5 board/);
    assert.match(text, /Week 6 board/);
  });

  it("includes HX Edge Pack /edge with only the baked $5 Stripe Payment Link (Edge pause step 1)", () => {
    const text = corpus();
    assert.match(text, /HX Edge Pack/);
    assert.match(text, /\$5 Week sample/);
    assert.doesNotMatch(text, /\$15\/mo|15\/mo/);
    assert.match(text, /createFileRoute\("\/edge"\)|path:"\/edge"|id:"\/edge"|to:"\/edge"/);
    assert.match(text, /buy\.stripe\.com\/00w14obUSbUZ5N67sydUY03/);
    assert.doesNotMatch(text, /4gM6oIf74cZ3cbubIOdUY02|UY02/);
    assert.doesNotMatch(text, /buy\.stripe\.com\/6oUdRa0caaQV1wQ5kqdUY01/);
    assert.doesNotMatch(text, /buy\.stripe\.com\/eVqaEY9MK0cha3meV0dUY00/);
    // Only the week env path remains.
    assert.match(text, /VITE_EDGE_CHECKOUT_WEEK_URL/);
    assert.doesNotMatch(text, /VITE_EDGE_CHECKOUT_URL\b/);
    // Fallback hash remains for unset-env, but week Buy is not left on it.
    assert.match(text, /#checkout-pending/);
    assert.match(
      text,
      /VITE_EDGE_CHECKOUT_WEEK_URL[`"']?:[`"']https:\/\/buy\.stripe\.com\/00w14obUSbUZ5N67sydUY03/,
    );
  });

  it("includes gated /edge/unlock + pack download on the server", () => {
    const server = walk(join(OUT, "functions"))
      .filter((p) => /\.mjs$/.test(p))
      .map((p) => readFileSync(p, "utf8"))
      .join("\n");
    assert.match(server, /\/edge\/unlock/);
    assert.match(server, /\/api\/edge\/pack/);
    assert.match(server, /STRIPE_SECRET_KEY/);
    assert.doesNotMatch(server, /VITE_STRIPE_SECRET_KEY/);
    assert.match(server, /hello@hashmarkcfb\.com/);
    assert.match(server, /hx_edge_confidence_schema_2026/);
    assert.match(server, /hx_edge_pack_week6_sample_2026/);
    // Week 6 rebuild (as_of 2026-10-07, HX 2026.7, 55 cards) is the gated current pack.
    const packChunks = walk(join(OUT, "functions")).filter((p) => GATED_PACK_CHUNK_RE.test(p));
    assert.equal(packChunks.length, 1, "exactly one gated edge-pack-files chunk");
    const pack = readFileSync(packChunks[0], "utf8");
    assert.match(pack, /\\?"as_of\\?": \\?"2026-10-07/);
    assert.match(pack, /\\?"confidence_card_n\\?": 55,/);
    assert.match(pack, /HX 2026\.7/);
    assert.match(pack, /24\.29/);
    assert.doesNotMatch(pack, /correction_note/);
  });

  it("does not dump the current Edge Pack onto public client assets", () => {
    const client = walk(join(OUT, "static"))
      .filter((p) => /\.js$/.test(p))
      .map((p) => readFileSync(p, "utf8"))
      .join("\n");
    assert.doesNotMatch(client, /SAMPLE_5/);
    assert.doesNotMatch(client, /pack_body_paste/);
    assert.doesNotMatch(client, /hx_edge_pack_week6_sample_2026/);
    assert.doesNotMatch(client, /hx_edge_pack_week5_sample_2026/);
    assert.doesNotMatch(client, /hx_edge_pack_week3_sample_thickened_2026/);
    assert.match(client, /\/edge\/unlock|edge\/unlock/);
    assert.match(client, /hx_edge_confidence_schema_2026|hx_edge_card_confidence/);
  });

  it("includes Scenario Sim preview route and Edge Board v1 without live-interactive marketing", () => {
    const text = corpus();
    assert.match(text, /Scenario Sim \(preview \/ offline\)/);
    assert.match(text, /\/edge\/sim/);
    assert.match(text, /\/edge\/board/);
    assert.match(text, /demo fixture — CLI not wired/);
    assert.match(text, /Monte Carlo ± noise on 10k draws; not a lock/);
    assert.match(text, /401856700/);
    assert.match(text, /52\.4/);
    assert.match(text, /hx_edge_card_confidence/);
    assert.match(text, /card\.demo_label|EXAMPLE \/ schema demo/);
    assert.match(text, /"small":\[0,3\]|"small": \[0, 3\]/);
    assert.match(text, /"medium":\[3,7\]|"medium": \[3, 7\]/);
    assert.match(text, /"large":\[7,99\]|"large": \[7, 99\]/);
    assert.match(text, /≥ 7 pts|>= 7 pts/);
    assert.doesNotMatch(text, /large \|HX−Vegas\| \(≥ 4 pts\)/);
    assert.doesNotMatch(text, /live interactive sim/i);
    assert.doesNotMatch(text, /Open Scenario Sim \(preview\)/);
    assert.doesNotMatch(text, /waitlist/i);
  });

  it("includes mobile ranking cards so Re-Publish does not ship the swipe table", () => {
    const text = corpus();
    assert.match(text, /RankingCard/);
    assert.match(text, /AP · /);
    assert.match(text, /space-y-3 sm:hidden/);
    assert.doesNotMatch(text, /Swipe → AP stays/);
  });

  it("includes Week 6 Southern Miss @ Troy FINAL in committed output", () => {
    const text = corpus();
    assert.match(text, /0049_week6_usm_troy_final/);
    assert.match(text, /Southern Miss @ Troy — Troy 55, Southern Miss 34/);
    assert.match(text, /home_score = 55/);
    assert.match(text, /away_score = 34/);
    assert.match(text, /h\.slug = 'troy' and a\.slug = 'southern-miss'/);
    assert.match(text, /week6_finals_clear_2026-10-07/);
    assert.match(text, /Soft-cal FLAG stays/);
  });

  it("includes Week 6 Wednesday JXST @ KENN and NMSU @ FIU FINALs in committed output", () => {
    const text = corpus();
    assert.match(text, /0050_week6_jxst_kenn_nmsu_fiu_final/);
    assert.match(text, /Jacksonville State @ Kennesaw State — Jacksonville State 27, Kennesaw State 26/);
    assert.match(text, /New Mexico State @ FIU — FIU 22, New Mexico State 3/);
    assert.match(text, /home_score = 26,\\n    away_score = 27/);
    assert.match(text, /home_score = 22,\\n    away_score = 3\b/);
    assert.match(text, /h\.slug = 'kennesaw-state' and a\.slug = 'jacksonville-state'/);
    assert.match(text, /h\.slug = 'fiu' and a\.slug = 'new-mexico-state'/);
    assert.match(text, /week6_finals_clear_2026-10-08/);
    // USM @ Troy (0049) stays in the bundle untouched.
    assert.match(text, /Southern Miss @ Troy — Troy 55, Southern Miss 34/);
  });

  it("includes Week 6 Thursday FINALs (0051) with exact home/away orientation in committed output", () => {
    const text = corpus();
    assert.match(text, /0051_week6_thu_finals/);
    assert.match(text, /week6_finals_clear_2026-10-09/);
    assert.match(text, /Sam Houston @ Liberty — Liberty 35, Sam Houston 3/);
    assert.match(text, /Missouri State @ Western Kentucky — Western Kentucky 34, Missouri State 13/);
    assert.match(text, /South Florida @ UTSA — UTSA 31, South Florida 24/);
    assert.match(text, /South Alabama @ Arkansas State — South Alabama 56, Arkansas State 49/);
    assert.match(text, /home_score = 35,\\n    away_score = 3\\n/);
    assert.match(text, /home_score = 34,\\n    away_score = 13\\n/);
    assert.match(text, /home_score = 31,\\n    away_score = 24\\n/);
    assert.match(text, /home_score = 49,\\n    away_score = 56\\n/);
    assert.match(text, /and h\.slug = 'liberty' and a\.slug = 'sam-houston';/);
    assert.match(text, /and h\.slug = 'western-kentucky' and a\.slug = 'missouri-state';/);
    assert.match(text, /and h\.slug = 'utsa' and a\.slug = 'usf';/);
    assert.match(text, /and h\.slug = 'arkansas-state' and a\.slug = 'south-alabama';/);
    // Prior FINALs (0049/0050) stay in the bundle untouched.
    assert.match(text, /Jacksonville State @ Kennesaw State — Jacksonville State 27, Kennesaw State 26/);
    assert.match(text, /New Mexico State @ FIU — FIU 22, New Mexico State 3/);
  });

  it("includes the 32 Week 1 FCS stub finals (fcs-stubs backfill) in committed output", () => {
    const text = corpus();
    const pack = JSON.parse(
      readFileSync(join(ROOT, "data/fcs_backfill_week1_all_finals_clear_2026-10-09.json"), "utf8"),
    );
    assert.equal(pack.replacement_calls.length, 32);
    for (const call of pack.replacement_calls) {
      assert.ok(text.includes(call), `missing ${call}`);
    }
    for (const g of pack.games) {
      assert.ok(!text.includes(g.scheduled_call), `stale ${g.scheduled_call}`);
    }
    assert.match(text, /finalHome\("charlotte", 1, "2026-09-05", "The Citadel", 41, 43\)/);
  });

  it("includes the records-audit FCS finals (W0/3/4/5 + finalAway + TTU fix) in committed output", () => {
    const text = corpus();
    const spec = JSON.parse(
      readFileSync(join(ROOT, "data/records_audit_vs_espn_2026-10-09.json"), "utf8"),
    );
    const groups = spec.change_spec.groups;
    const calls = [
      ...groups.WEEK0_new_array.calls,
      ...groups.WEEK3_append.calls,
      ...groups.WEEK4_new_array.calls,
      ...groups.WEEK5_new_array.calls,
    ].map((c) => c.call);
    assert.equal(calls.length, 36);
    for (const call of calls) {
      assert.ok(text.includes(call), `missing ${call}`);
    }
    const ttu = groups.WEEK1_ttu_fix.calls[0];
    assert.ok(text.includes(ttu.with), `missing ${ttu.with}`);
    assert.ok(!text.includes(ttu.replace), `stale ${ttu.replace}`);
    assert.match(text, /finalHome\("kansas-state", 1, "2026-09-05", "Nicholls", 71, 3\)/);
    assert.match(text, /function finalAway\(/);
    assert.match(text, /finalAway\("jacksonville-state", 0, "2026-08-29", "North Dakota State", 7, 33\)/);
  });

  it("includes Week 6 Friday FINALs (0054) with exact home/away orientation in committed output", () => {
    const text = corpus();
    assert.match(text, /0054_week6_fri_finals/);
    assert.match(text, /Florida State @ Louisville — Louisville 44, Florida State 20/);
    assert.match(text, /Washington State @ Utah State — Utah State 17, Washington State 16/);
    assert.match(text, /Wyoming @ San José State — Wyoming 16, San José State 13/);
    assert.match(text, /Iowa @ Washington — Iowa 41, Washington 24/);
    assert.match(text, /Iowa State @ BYU — BYU 24, Iowa State 10/);
    assert.match(text, /and h\.slug = 'louisville' and a\.slug = 'florida-state';/);
    assert.match(text, /and h\.slug = 'utah-state' and a\.slug = 'washington-state';/);
    assert.match(text, /and h\.slug = 'san-jose-state' and a\.slug = 'wyoming';/);
    assert.match(text, /and h\.slug = 'washington' and a\.slug = 'iowa';/);
    assert.match(text, /and h\.slug = 'byu' and a\.slug = 'iowa-state';/);
    // Thursday FINALs (0051) stay in the bundle untouched.
    assert.match(text, /Sam Houston @ Liberty — Liberty 35, Sam Houston 3/);
  });

  it("pins serverless function runtime to nodejs22.x (Vercel blocked new nodejs20.x after 2026-10-01)", () => {
    const cfgPath = join(OUT, "functions/__server.func/.vc-config.json");
    assert.ok(existsSync(cfgPath), "missing .vc-config.json");
    const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
    assert.equal(cfg.runtime, "nodejs22.x");
    const nitro = JSON.parse(readFileSync(join(OUT, "nitro.json"), "utf8"));
    assert.equal(nitro?.config?.vercel?.functions?.runtime, "nodejs22.x");
    const nitroText = readFileSync(join(OUT, "nitro.json"), "utf8");
    assert.doesNotMatch(nitroText, /nodejs20\.x/);
  });

  it("keeps PGLite wasm sidecars next to the server bundle", () => {
    const libs = join(OUT, "functions/__server.func/_libs");
    for (const name of ["pglite.wasm", "initdb.wasm", "pglite.data"]) {
      assert.ok(existsSync(join(libs, name)), `missing ${name}`);
    }
  });
});
