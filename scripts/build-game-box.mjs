#!/usr/bin/env node
/**
 * Builds data/game_box_2026.json for /games pages from CFBD files that were already pulled
 * (no API calls, no key read here):
 *
 *   node scripts/build-game-box.mjs --cfbd <cfbd-data/out/2026> --cache <cfbd-data/cache>
 *
 * Box: CFBD /games/teams (out/2026/team_game_stats.json). Advanced: CFBD /stats/game/advanced,
 * all plays (cache/stats_game_advanced__year-2026.json). Completed games only. Deterministic.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const GAME_BOX_PATH = "data/game_box_2026.json";
const ROOT = join(import.meta.dirname, "..");
const r = (x, d = 3) => (x == null || !Number.isFinite(Number(x)) ? null : Math.round(Number(x) * 10 ** d) / 10 ** d);
const norm = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

export function buildGameBox({ outDir, cacheDir }) {
  const read = (d, f) => JSON.parse(readFileSync(join(d, f), "utf8"));
  const games = read(outDir, "games.json").filter((g) => g.completed);
  const teams = read(outDir, "teams.json");
  const slugBySchool = new Map(teams.map((t) => [norm(t.school), t.slug]));
  const stats = read(outDir, "team_game_stats.json");
  const adv = read(cacheDir, "stats_game_advanced__year-2026.json");
  const meta = read(outDir, "meta.json");

  const box = new Map();
  for (const s of stats) {
    const k = `${s.game_id}|${s.team}`;
    if (box.has(k)) continue; // duplicate rows from overlapping weekly pulls are identical
    box.set(k, {
      pts: s.points,
      fd: s.firstDowns ?? null,
      yds: s.totalYards ?? null,
      ra: s.rushingAttempts ?? null,
      ry: s.rushingYards ?? null,
      cmp: s.completionAttempts_a ?? null,
      pa: s.completionAttempts_b ?? null,
      py: s.netPassingYards ?? null,
      c3: s.thirdDownEff_a ?? null,
      a3: s.thirdDownEff_b ?? null,
      c4: s.fourthDownEff_a ?? null,
      a4: s.fourthDownEff_b ?? null,
      to: s.turnovers ?? null,
      fl: s.fumblesLost ?? null,
      intThrown: s.passesIntercepted ?? null,
      pen: s.totalPenaltiesYards_a ?? null,
      peny: s.totalPenaltiesYards_b ?? null,
      top: s.possessionTime ?? null,
      sk: s.sacks ?? null,
      tfl: s.tacklesForLoss ?? null,
    });
  }
  const advBy = new Map();
  for (const a of adv) {
    const slug = slugBySchool.get(norm(a.team));
    if (!slug) continue;
    const o = a.offense ?? {};
    advBy.set(`${a.gameId}|${slug}`, {
      plays: o.plays ?? null,
      drives: o.drives ?? null,
      epa: r(o.ppa),
      tepa: r(o.totalPPA, 1),
      sr: r(o.successRate == null ? null : o.successRate * 100, 1),
      xpl: r(o.explosiveness),
      repa: r(o.rushingPlays?.ppa),
      rsr: r(o.rushingPlays?.successRate == null ? null : o.rushingPlays.successRate * 100, 1),
      pepa: r(o.passingPlays?.ppa),
      psr: r(o.passingPlays?.successRate == null ? null : o.passingPlays.successRate * 100, 1),
      sdsr: r(o.standardDowns?.successRate == null ? null : o.standardDowns.successRate * 100, 1),
      pdsr: r(o.passingDowns?.successRate == null ? null : o.passingDowns.successRate * 100, 1),
      ly: r(o.lineYards, 2),
      stuff: r(o.stuffRate == null ? null : o.stuffRate * 100, 1),
      power: r(o.powerSuccess == null ? null : o.powerSuccess * 100, 1),
    });
  }
  const out = {};
  let withAdv = 0;
  for (const g of games) {
    const hb = box.get(`${g.id}|${g.home}`);
    const ab = box.get(`${g.id}|${g.away}`);
    if (!hb || !ab) continue;
    const ha = advBy.get(`${g.id}|${g.home}`) ?? null;
    const aa = advBy.get(`${g.id}|${g.away}`) ?? null;
    if (ha && aa) withAdv++;
    out[g.id] = {
      start: g.start, week: g.week, neutral: g.neutral, home: g.home, away: g.away,
      hp: g.home_pts, ap: g.away_pts,
      box: { [g.home]: hb, [g.away]: ab },
      adv: ha && aa ? { [g.home]: ha, [g.away]: aa } : null,
    };
  }
  return {
    meta: {
      source: "CollegeFootballData (CFBD): /games/teams box and /stats/game/advanced (all plays)",
      through: meta.last_completed_kickoff_utc,
      games: Object.keys(out).length,
      with_advanced: withAdv,
    },
    games: out,
  };
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : null;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outDir = arg("--cfbd");
  const cacheDir = arg("--cache");
  if (!outDir || !cacheDir) throw new Error("usage: --cfbd <out/2026> --cache <cache dir>");
  const res = buildGameBox({ outDir, cacheDir });
  writeFileSync(join(ROOT, GAME_BOX_PATH), `${JSON.stringify(res)}\n`);
  console.log(`[game-box] wrote ${GAME_BOX_PATH} · ${res.meta.games} games · ${res.meta.with_advanced} with advanced · through ${res.meta.through}`);
}
