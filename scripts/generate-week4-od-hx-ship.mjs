#!/usr/bin/env node
/**
 * Emits migrations/0040_week4_od_hx_ship.sql from the Research-CLEARed HX 2026.6 board.
 * Run: node scripts/generate-week4-od-hx-ship.mjs
 *
 * Stamps O/D units + HX onto rankings (season 2026, week 0 — the row Rankings/Board read).
 * Does not touch games, recruiting, players, roster_profile, or Vegas.
 * Does not stamp Make 12 / win-title (no 2026.6 re-sim in this pack).
 * Does not stamp unit O/D pulse (deferred).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(root, "data/week4_od_hx_ship_2026.json");
const seedPath = join(root, "migrations/0003_seed.sql");
const outPath = join(root, "migrations/0040_week4_od_hx_ship.sql");

/** Print JSON decimals without FP junk (up to 4 places, strip trailing zeros). */
export function sqlNum(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new Error(`expected finite number, got ${n}`);
  }
  return n.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

function sqlStr(s) {
  if (typeof s !== "string" || !s) throw new Error(`bad slug ${s}`);
  return `'${s.replaceAll("'", "''")}'`;
}

function seedSlugs(seedSql) {
  const block = seedSql.split("insert into teams")[1]?.split("insert into")[0];
  if (!block) throw new Error("could not find teams insert in 0003_seed.sql");
  return new Set([...block.matchAll(/^\s*\(\d+, '([^']+)'/gm)].map((m) => m[1]));
}

export function validateShip(payload, slugs) {
  if (!payload || !Array.isArray(payload.teams)) {
    throw new Error("ship JSON missing teams[]");
  }
  if (payload.n !== payload.teams.length) {
    throw new Error(`n=${payload.n} but teams.length=${payload.teams.length}`);
  }
  if (payload.teams.length !== 136) {
    throw new Error(`expected 136 teams, got ${payload.teams.length}`);
  }
  if (payload.board !== "HX 2026.6") {
    throw new Error(`board=${payload.board}, expected HX 2026.6`);
  }
  if (payload.georgia_hx_post !== 7.8964) {
    throw new Error(`georgia_hx_post=${payload.georgia_hx_post}`);
  }
  if (payload.georgia_rank_post !== 1) {
    throw new Error(`georgia_rank_post=${payload.georgia_rank_post}`);
  }
  // Header field is the signed UCLA mover (+0.071), same class of nit as W3.
  if (payload.max_abs_delta_hx !== 0.071) {
    throw new Error(`max_abs_delta_hx=${payload.max_abs_delta_hx}`);
  }

  const georgia = payload.teams.find((t) => t.slug === "georgia");
  if (!georgia) throw new Error("georgia missing");
  if (georgia.hx_rank_post !== 1) throw new Error(`georgia hx_rank_post=${georgia.hx_rank_post}`);
  if (georgia.hx_post !== 7.8964) throw new Error(`georgia hx_post=${georgia.hx_post}`);
  if (georgia.delta_hx !== -0.0014) throw new Error(`georgia delta_hx=${georgia.delta_hx}`);
  if (georgia.hx_pre !== 7.8978) throw new Error(`georgia hx_pre=${georgia.hx_pre}`);
  if (georgia.post_off !== 39.241 || georgia.post_def !== 23.423 || georgia.post_st !== 1.9) {
    throw new Error(`georgia post units ${georgia.post_off}/${georgia.post_def}/${georgia.post_st}`);
  }

  const osu = payload.teams.find((t) => t.slug === "ohio-state");
  const miami = payload.teams.find((t) => t.slug === "miami");
  const ucla = payload.teams.find((t) => t.slug === "ucla");
  const maryland = payload.teams.find((t) => t.slug === "maryland");
  const lsu = payload.teams.find((t) => t.slug === "lsu");
  if (!osu || osu.hx_post !== 7.8131 || osu.delta_hx !== 0) {
    throw new Error(`ohio-state hx_post=${osu?.hx_post} Δ=${osu?.delta_hx}`);
  }
  if (!miami || miami.hx_post !== 5.2345 || miami.delta_hx !== 0) {
    throw new Error(`miami hx_post=${miami?.hx_post} Δ=${miami?.delta_hx}`);
  }
  if (!ucla || ucla.hx_post !== 1.3963 || ucla.delta_hx !== 0.071 || ucla.hx_rank_post !== 45) {
    throw new Error(`ucla hx=${ucla?.hx_post} Δ=${ucla?.delta_hx} rk=${ucla?.hx_rank_post}`);
  }
  if (!maryland || maryland.hx_post !== -0.3184 || maryland.delta_hx !== -0.071 || maryland.hx_rank_post !== 72) {
    throw new Error(`maryland hx=${maryland?.hx_post} Δ=${maryland?.delta_hx} rk=${maryland?.hx_rank_post}`);
  }
  if (!lsu || lsu.hx_post !== 4.1243 || lsu.delta_hx !== 0.0467 || lsu.hx_rank_post !== 17) {
    throw new Error(`lsu hx=${lsu?.hx_post} Δ=${lsu?.delta_hx} rk=${lsu?.hx_rank_post}`);
  }

  const lockedTop = [
    ["georgia", 7.8964, 1],
    ["ohio-state", 7.8131, 2],
    ["notre-dame", 7.0216, 3],
    ["oregon", 6.9019, 4],
    ["texas", 6.4516, 5],
    ["texas-am", 6.0586, 6],
    ["texas-tech", 5.8155, 7],
    ["ole-miss", 5.4289, 8],
    ["alabama", 5.2821, 9],
    ["miami", 5.2345, 10],
  ];
  for (const [slug, hx, rank] of lockedTop) {
    const t = payload.teams.find((row) => row.slug === slug);
    if (!t || t.hx_post !== hx || t.hx_rank_post !== rank) {
      throw new Error(`top-10 lock ${slug}: hx=${t?.hx_post} rank=${t?.hx_rank_post}`);
    }
  }

  let maxAbs = 0;
  let maxSlugs = [];
  const ranks = new Set();
  const seen = new Set();
  let updated = 0;
  for (const t of payload.teams) {
    if (seen.has(t.slug)) throw new Error(`duplicate slug ${t.slug}`);
    seen.add(t.slug);
    if (!slugs.has(t.slug)) throw new Error(`slug ${t.slug} not in teams seed`);
    if (t.hx_rank_post == null) throw new Error(`${t.slug} missing hx_rank_post`);
    if (t.post_off == null || t.post_def == null || t.hx_post == null || t.post_st == null) {
      throw new Error(`${t.slug} missing post units / hx_post`);
    }
    const expectedDelta = (t.delta_off + t.delta_def) / 55;
    if (Math.abs(expectedDelta - t.delta_hx) > 5e-4) {
      throw new Error(`${t.slug} ΔHX=${t.delta_hx} != (ΔO+ΔD)/55=${expectedDelta}`);
    }
    if (Math.abs(t.hx_pre + t.delta_hx - t.hx_post) > 5e-4) {
      throw new Error(`${t.slug} hx_post=${t.hx_post} != hx_pre+ΔHX`);
    }
    ranks.add(t.hx_rank_post);
    if (t.updated) updated += 1;
    const abs = Math.abs(t.delta_hx ?? 0);
    if (abs > maxAbs + 1e-12) {
      maxAbs = abs;
      maxSlugs = [t.slug];
    } else if (Math.abs(abs - maxAbs) <= 1e-12) {
      maxSlugs.push(t.slug);
    }
  }
  if (ranks.size !== 136) throw new Error(`hx_rank_post not unique 1–136 (${ranks.size})`);
  for (let r = 1; r <= 136; r += 1) {
    if (!ranks.has(r)) throw new Error(`missing hx_rank_post ${r}`);
  }
  if (updated !== 117) throw new Error(`updated=${updated}, expected 117`);
  const maxSet = new Set(maxSlugs);
  if (!maxSet.has("ucla") || !maxSet.has("maryland") || maxSet.size !== 2) {
    throw new Error(`max |ΔHX| slugs=${maxSlugs.join(",")} abs=${maxAbs}`);
  }
  if (Math.abs(maxAbs - 0.071) > 1e-6) {
    throw new Error(`max |ΔHX|=${maxAbs}, expected 0.071`);
  }
  if (!seen.has("hawaii")) throw new Error("hawaii slug missing (okina name, slug stays hawaii)");
  return { georgia, maxAbs, maxSlugs };
}

export function validateUnits(units, ship) {
  if (!units?.meta || !Array.isArray(units.teams)) {
    throw new Error("units JSON missing meta / teams[]");
  }
  if (units.meta.n_teams !== 136 || units.teams.length !== 136) {
    throw new Error(`units n=${units.meta.n_teams} teams.length=${units.teams.length}`);
  }
  if (units.meta.n_updated !== 117) {
    throw new Error(`units n_updated=${units.meta.n_updated}`);
  }
  if (units.meta.n_fbs_fbs !== 57) {
    throw new Error(`units n_fbs_fbs=${units.meta.n_fbs_fbs}`);
  }
  if (units.meta.hx_board_changed !== false) {
    throw new Error("unit file must not rewrite the board (hx_board_changed)");
  }
  if (units.meta.quadratic_changed !== false || units.meta.talent_changed !== false) {
    throw new Error("unit file must not retune quadratic / talent");
  }
  const byName = new Map(units.teams.map((t) => [t.team, t]));
  for (const row of ship.teams) {
    const u = byName.get(row.name);
    if (!u) throw new Error(`units missing ${row.name}`);
    for (const k of ["post_off", "post_def", "post_st", "delta_off", "delta_def", "delta_st"]) {
      if (u[k] !== row[k]) {
        throw new Error(`${row.slug} ${k} units=${u[k]} ship=${row[k]}`);
      }
    }
  }
}

export function renderMigration(payload) {
  const teams = [...payload.teams].sort((a, b) => a.hx_rank_post - b.hx_rank_post);
  const rows = teams.map((t, i) => {
    const comma = i === teams.length - 1 ? "" : ",";
    const st = t.post_st == null ? "NULL" : sqlNum(t.post_st);
    const types =
      i === 0
        ? `${sqlStr(t.slug)}::text, ${sqlNum(t.hx_post)}::double precision, ${t.hx_rank_post}::int, ${sqlNum(t.post_off)}::double precision, ${sqlNum(t.post_def)}::double precision, ${st === "NULL" ? "NULL::double precision" : `${st}::double precision`}`
        : `${sqlStr(t.slug)}, ${sqlNum(t.hx_post)}, ${t.hx_rank_post}, ${sqlNum(t.post_off)}, ${sqlNum(t.post_def)}, ${st}`;
    return `  (${types})${comma}`;
  });

  return `-- Week 4 → Week 5 O/D units + ΔHX stamp (Research peer CLEAR).
-- Source: data/week4_od_hx_ship_2026.json  (136 FBS)
-- Units: data/sunday_od_delta_2026_w4.json (117 updated; 57/57 FBS–FBS FINAL)
-- Approval: data/hx2026_6_week4_research_peer_clear.md
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 4)
-- Board HX 2026.6. Georgia stays #1 at 7.8964 (ΔHX −0.0014).
-- Max |ΔHX| 0.071 (UCLA +0.071 / Maryland −0.071).
-- hx_rank trusts ship hx_rank_post (not recomputed).
-- Idempotent UPDATEs via teams.slug. No TRUNCATE.
-- Does not touch games, recruiting, players, roster_profile, Vegas,
-- quadratic / talent / z* weights / team-HFA / weather / QB tenure SOS.
-- Does not stamp Make 12 / win-title (no 2026.6 re-sim in this pack).
-- Does not stamp unit O/D pulse (deferred).

update rankings r
set hx_rating = v.hx_rating,
    hx_rank = v.hx_rank,
    offense_rating = v.offense_rating,
    defense_rating = v.defense_rating,
    special_rating = v.special_rating
from teams t
join (values
${rows.join("\n")}
) as v(slug, hx_rating, hx_rank, offense_rating, defense_rating, special_rating)
  on v.slug = t.slug
where r.team_id = t.id
  and r.season = 2026
  and r.week = 0;
`;
}

function main() {
  const payload = JSON.parse(readFileSync(jsonPath, "utf8"));
  const slugs = seedSlugs(readFileSync(seedPath, "utf8"));
  const { georgia, maxAbs, maxSlugs } = validateShip(payload, slugs);
  const sql = renderMigration(payload);
  writeFileSync(outPath, sql);
  console.log(
    `[0040] wrote ${outPath} (${payload.teams.length} teams; georgia ${georgia.hx_post} #${georgia.hx_rank_post}; max |ΔHX| ${maxAbs} ${maxSlugs.join("/")})`,
  );
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
