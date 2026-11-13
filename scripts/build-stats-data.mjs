#!/usr/bin/env node
/**
 * Builds data/stats_2026.json for /stats and the team-page advanced block.
 *
 *   node scripts/build-stats-data.mjs --cfbstats <cfb_stats_2026_page_data.json> --cfbd <cfbd out/2026 dir>
 *
 * Box counting stats: cfbstats.com (official NCAA box, per-team pages). Advanced: CollegeFootballData
 * (CFBD) PPA/EPA, success rate, explosiveness, line yards, havoc, player PPA and usage. Team EPA,
 * success rate, explosiveness, and line yards are opponent-adjusted (ridge over FBS–FBS games, done
 * upstream in the CFBD pull). No API key is read or written here: inputs are already-pulled files.
 * Deterministic; re-run after each weekly pull.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const STATS_PATH = "data/stats_2026.json";
const ROOT = join(import.meta.dirname, "..");

const norm = (s) =>
  String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
/** cfbstats school names that differ from CFBD school names. */
const CFBSTATS_ALIASES = {
  appalachianstate: "app-state",
  connecticut: "uconn",
  fiu: "fiu",
  louisianamonroe: "ul-monroe",
  miamifl: "miami",
  middletennesseestate: "middle-tennessee",
  samhoustonstate: "sam-houston",
  sanjosestate: "san-jose-state",
  usf: "usf",
};
const playerKey = (name) => norm(String(name).replace(/\b(jr|sr|ii|iii|iv|v)\.?$/i, ""));
const r = (x, d = 4) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);

function cols(spec) {
  return Object.fromEntries(spec.split(",").map((c, i) => [c, i]));
}

export function buildStats({ box, cfbdDir }) {
  const read = (f) => JSON.parse(readFileSync(join(cfbdDir, f), "utf8"));
  const teamsCfbd = read("teams.json");
  const slugBySchool = new Map(teamsCfbd.map((t) => [norm(t.school), t.slug]));
  const slugOf = (school) => CFBSTATS_ALIASES[norm(school)] ?? slugBySchool.get(norm(school)) ?? null;
  const adj = new Map(read("team_adjusted_efficiency.json").map((t) => [t.slug, t]));
  const season = new Map(read("team_season.json").map((t) => [t.slug, t]));
  const players = read("players_season_qb_rb_wr_te.json");
  const playerBy = new Map();
  const byTeam = new Map();
  for (const p of players) {
    const k = `${p.team}|${playerKey(p.name)}`;
    // Rare duplicate team+name rows: keep the one with more usage.
    if (!playerBy.has(k) || (p.usage_overall ?? 0) > (playerBy.get(k).usage_overall ?? 0)) playerBy.set(k, p);
    (byTeam.get(p.team) ?? byTeam.set(p.team, []).get(p.team)).push(p);
  }
  const lastName = (name) => playerKey(String(name).trim().split(/\s+/).filter((w) => !/^(jr|sr|ii|iii|iv|v)\.?$/i.test(w)).pop() ?? "");
  /**
   * Exact team + name first; else a unique same-team, same-last-name player whose CFBD volume is
   * within 15% of the box volume (nicknames: "Steve"/"Steven"). `vol(p)` reads CFBD volume.
   */
  const findPlayer = (name, slug, boxVol, vol) => {
    const exact = playerBy.get(`${slug}|${playerKey(name)}`);
    if (exact) return exact;
    const cands = (byTeam.get(slug) ?? []).filter(
      (p) => lastName(p.name) === lastName(name) && boxVol > 0 && Math.abs((vol(p) ?? 0) - boxVol) / boxVol <= 0.15,
    );
    return cands.length === 1 ? cands[0] : null;
  };
  /**
   * PPA counts only when CFBD play-by-play attributes most of the player's box volume: plays implied
   * by total / average PPA must be at least 70% of the box volume. Otherwise the advanced cells are null.
   */
  const ppa = (p, kind, boxVol) => {
    const avg = p?.[`ppa_avg_${kind}`];
    const tot = p?.[`ppa_tot_${kind}`];
    if (avg == null || tot == null || avg === 0 || boxVol <= 0) return null;
    const plays = tot / avg;
    return plays >= 0.7 * boxVol ? p : null;
  };

  const T = cols(box.T_cols);
  const teams = box.T.map((row) => {
    const slug = slugOf(row[T.team]);
    if (!slug) throw new Error(`no slug for cfbstats team ${row[T.team]}`);
    const a = adj.get(slug);
    const s = season.get(slug);
    const v = (k) => row[T[k]];
    return {
      slug,
      g: v("games"),
      w: v("W"),
      l: v("L"),
      ppg: v("ppg"), oppg: v("opp_ppg"), ypg: v("ypg"), oypg: v("opp_ypg"), ypp: v("ypp"), oypp: v("opp_ypp"),
      rypg: v("rush_ypg"), pypg: v("pass_ypg"), orypg: v("opp_rush_ypg"), opypg: v("opp_pass_ypg"),
      c3: v("3rd%"), oc3: v("opp3rd%"), rz: v("rz%"), tom: v("to_margin"), pen: v("pen_pg"), sk: v("sacks"), sa: v("sacks_allowed"),
      pd: v("pt_diff_pg"), yppm: v("ypp_margin"), nypa: v("net_ypa"), ypc: v("ypc"), oypc: v("opp_ypc"), tdr: v("off_td_per100plays"),
      // CFBD advanced (opponent-adjusted where noted in the metric definitions).
      epa: r(a?.adj_off_ppa), oepa: r(a?.adj_def_ppa), nepa: r(a?.adj_net_ppa),
      sr: r(a?.adj_off_successRate == null ? null : a.adj_off_successRate * 100, 1),
      osr: r(a?.adj_def_successRate == null ? null : a.adj_def_successRate * 100, 1),
      xpl: r(a?.adj_off_explosiveness, 3), oxpl: r(a?.adj_def_explosiveness, 3),
      repa: r(a?.adj_off_rushingPlays_ppa), pepa: r(a?.adj_off_passingPlays_ppa),
      ly: r(a?.adj_off_lineYards, 2), oly: r(a?.adj_def_lineYards, 2),
      hav: r(s?.adv_d_havoc_total == null ? null : s.adv_d_havoc_total * 100, 1),
      ohav: r(s?.adv_o_havoc_total == null ? null : s.adv_o_havoc_total * 100, 1),
      adv_g: a?.games ?? null,
    };
  });

  const Q = cols(box.Q_cols);
  const qb = box.Q.map((row) => {
    const slug = slugOf(row[Q.team]);
    const p = ppa(findPlayer(row[Q.name], slug, row[Q.att], (x) => x.passing_att), "pass", row[Q.att]);
    return {
      name: row[Q.name], slug, pos: "QB", g: row[Q.g], att: row[Q.att], cmp: row[Q["cmp%"]], yds: row[Q.yds], td: row[Q.td], int: row[Q.int],
      ruy: row[Q.rush_yds],
      epa: r(p?.ppa_avg_pass, 3), tepa: r(p?.ppa_tot_all, 1), use: r(p?.usage_overall == null ? null : p.usage_overall * 100, 1),
    };
  });
  const R = cols(box.R_cols);
  const rush = box.R.map((row) => {
    const slug = slugOf(row[R.team]);
    const p = ppa(findPlayer(row[R.name], slug, row[R.att], (x) => x.rushing_car), "rush", row[R.att]);
    return {
      name: row[R.name], slug, pos: row[R.pos], g: row[R.g], att: row[R.att], yds: row[R.yds], td: row[R.td],
      epa: r(p?.ppa_avg_rush, 3), tepa: r(p?.ppa_tot_rush, 1), use: r(p?.usage_rush == null ? null : p.usage_rush * 100, 1),
    };
  });
  const W = cols(box.W_cols);
  const rec = box.W.map((row) => {
    const slug = slugOf(row[W.team]);
    const p = ppa(findPlayer(row[W.name], slug, row[W.rec], (x) => x.receiving_rec), "pass", row[W.rec]);
    return {
      name: row[W.name], slug, pos: row[W.pos], g: row[W.g], rec: row[W.rec], yds: row[W.yds], td: row[W.td],
      epa: r(p?.ppa_avg_pass, 3), tepa: r(p?.ppa_tot_pass, 1), use: r(p?.usage_pass == null ? null : p.usage_pass * 100, 1),
    };
  });
  const matched = (rows) => rows.filter((x) => x.epa != null).length;
  const meta = JSON.parse(readFileSync(join(cfbdDir, "meta.json"), "utf8"));
  return {
    meta: {
      as_of: box.coverage,
      box_source: `cfbstats.com team pages, through ${box.coverage}`,
      advanced_source: "CollegeFootballData (CFBD) API: PPA/EPA, success rate, explosiveness, line yards, havoc, player PPA and usage",
      advanced_through: meta.last_completed_kickoff_utc,
      adjustment:
        "Team EPA/play, success rate, explosiveness, and line yards are opponent-adjusted: ridge fit of offense + opposing defense + home field over FBS–FBS games (1 pseudo-game toward average). Havoc and player PPA are raw season values.",
      pools: { qb: "100+ pass attempts", rush: "100+ carries", rec: "30+ receptions" },
      matched_advanced: { qb: `${matched(qb)}/${qb.length}`, rush: `${matched(rush)}/${rush.length}`, rec: `${matched(rec)}/${rec.length}` },
    },
    teams,
    qb,
    rush,
    rec,
  };
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : null;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const boxPath = arg("--cfbstats");
  const cfbdDir = arg("--cfbd");
  if (!boxPath || !cfbdDir) throw new Error("usage: --cfbstats <page_data.json> --cfbd <out/2026 dir>");
  const out = buildStats({ box: JSON.parse(readFileSync(boxPath, "utf8")), cfbdDir });
  writeFileSync(join(ROOT, STATS_PATH), `${JSON.stringify(out)}\n`);
  console.log(`[stats] wrote ${STATS_PATH} · as_of ${out.meta.as_of} · teams ${out.teams.length} · advanced matched ${JSON.stringify(out.meta.matched_advanced)}`);
}
