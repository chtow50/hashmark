#!/usr/bin/env node
/**
 * Emits migrations/0034_week3_od_hx_ship.sql from the dual-CLEAR AMD board.
 * Run: node scripts/generate-week3-od-hx-ship.mjs
 *
 * Stamps O/D units + HX onto rankings (season 2026, week 0 — the row Rankings/Board read).
 * Does not touch games, recruiting, players, roster_profile, or Vegas.
 * Does not stamp Make 12 / win-title (no 2026.5 re-sim in this pack).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(root, "data/week3_od_hx_ship_2026.json");
const seedPath = join(root, "migrations/0003_seed.sql");
const outPath = join(root, "migrations/0034_week3_od_hx_ship.sql");

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
  if (payload.board !== "HX 2026.5") {
    throw new Error(`board=${payload.board}, expected HX 2026.5`);
  }
  if (payload.georgia_hx_post !== 7.8978) {
    throw new Error(`georgia_hx_post=${payload.georgia_hx_post}`);
  }
  if (payload.georgia_rank_post !== 1) {
    throw new Error(`georgia_rank_post=${payload.georgia_rank_post}`);
  }
  if (payload.max_abs_delta_hx !== -0.0711) {
    throw new Error(`max_abs_delta_hx=${payload.max_abs_delta_hx}`);
  }

  const georgia = payload.teams.find((t) => t.slug === "georgia");
  if (!georgia) throw new Error("georgia missing");
  if (georgia.hx_rank_post !== 1) throw new Error(`georgia hx_rank_post=${georgia.hx_rank_post}`);
  if (georgia.hx_post !== 7.8978) throw new Error(`georgia hx_post=${georgia.hx_post}`);
  if (georgia.delta_hx !== -0.0077) throw new Error(`georgia delta_hx=${georgia.delta_hx}`);
  if (georgia.post_off !== 37.482 || georgia.post_def !== 25.258 || georgia.post_st !== 1.9) {
    throw new Error(`georgia post units ${georgia.post_off}/${georgia.post_def}/${georgia.post_st}`);
  }

  const osu = payload.teams.find((t) => t.slug === "ohio-state");
  const texas = payload.teams.find((t) => t.slug === "texas");
  const mich = payload.teams.find((t) => t.slug === "michigan");
  const oregon = payload.teams.find((t) => t.slug === "oregon");
  const missouri = payload.teams.find((t) => t.slug === "missouri");
  const troy = payload.teams.find((t) => t.slug === "troy");
  if (!osu || osu.hx_post !== 7.8131 || osu.delta_hx !== 0) {
    throw new Error(`ohio-state hx_post=${osu?.hx_post} Δ=${osu?.delta_hx}`);
  }
  if (!texas || texas.hx_post !== 6.4443 || texas.delta_hx !== 0) {
    throw new Error(`texas hx_post=${texas?.hx_post} Δ=${texas?.delta_hx}`);
  }
  if (!mich || mich.hx_post !== 4.8942 || mich.delta_hx !== -0.003) {
    throw new Error(`michigan hx=${mich?.hx_post} Δ=${mich?.delta_hx}`);
  }
  if (!oregon || oregon.hx_post !== 6.9056 || oregon.delta_hx !== 0) {
    throw new Error(`oregon hx_post=${oregon?.hx_post} Δ=${oregon?.delta_hx}`);
  }
  if (!missouri || missouri.hx_post !== 4.2596 || missouri.delta_hx !== -0.0711) {
    throw new Error(`missouri hx=${missouri?.hx_post} Δ=${missouri?.delta_hx}`);
  }
  if (!troy || troy.delta_hx !== 0.0711) {
    throw new Error(`troy Δ=${troy?.delta_hx}`);
  }

  const lockedTop = [
    ["georgia", 7.8978, 1],
    ["ohio-state", 7.8131, 2],
    ["notre-dame", 7.0293, 3],
    ["oregon", 6.9056, 4],
    ["texas", 6.4443, 5],
    ["texas-am", 6.1053, 6],
    ["texas-tech", 5.8206, 7],
    ["ole-miss", 5.4492, 8],
    ["alabama", 5.2998, 9],
    ["miami", 5.2345, 10],
  ];
  for (const [slug, hx, rank] of lockedTop) {
    const t = payload.teams.find((row) => row.slug === slug);
    if (!t || t.hx_post !== hx || t.hx_rank_post !== rank) {
      throw new Error(`top-10 lock ${slug}: hx=${t?.hx_post} rank=${t?.hx_rank_post}`);
    }
  }

  let maxAbs = 0;
  let maxSlug = "";
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
    ranks.add(t.hx_rank_post);
    if (t.updated) updated += 1;
    const abs = Math.abs(t.delta_hx ?? 0);
    if (abs > maxAbs) {
      maxAbs = abs;
      maxSlug = t.slug;
    }
  }
  if (ranks.size !== 136) throw new Error(`hx_rank_post not unique 1–136 (${ranks.size})`);
  if (updated !== 107) throw new Error(`updated=${updated}, expected 107`);
  if (maxSlug !== "missouri" && maxSlug !== "troy") {
    throw new Error(`max |ΔHX| slug=${maxSlug} abs=${maxAbs} (expected Missouri or Troy 0.0711)`);
  }
  if (Math.abs(maxAbs - 0.0711) > 1e-6) {
    throw new Error(`max |ΔHX|=${maxAbs}, expected 0.0711`);
  }
  if (!seen.has("hawaii")) throw new Error("hawaii slug missing (okina name, slug stays hawaii)");
  return { georgia, maxAbs, maxSlug };
}

export function validateUnits(units, ship) {
  if (!units?.meta || !Array.isArray(units.teams)) {
    throw new Error("units JSON missing meta / teams[]");
  }
  if (units.meta.n_teams !== 136 || units.teams.length !== 136) {
    throw new Error(`units n=${units.meta.n_teams} teams.length=${units.teams.length}`);
  }
  if (units.meta.n_updated !== 107) {
    throw new Error(`units n_updated=${units.meta.n_updated}`);
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

  return `-- Week 3 → Week 4 O/D units + ΔHX stamp (AMD, dual CLEAR).
-- Source: data/week3_od_hx_ship_2026.json  (136 FBS)
-- Units: data/sunday_od_delta_2026_w3.json (107 updated; 56/56 FBS–FBS FINAL)
-- Approval: Research + Website CLEAR vs AMD week3_od_hx_ship_2026
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 3)
-- Board HX 2026.5. Georgia stays #1 at 7.8978 (ΔHX −0.0077).
-- Max |ΔHX| 0.0711 (Missouri −0.0711 / Troy +0.0711).
-- hx_rank trusts AMD hx_rank_post (not recomputed).
-- Idempotent UPDATEs via teams.slug. No TRUNCATE.
-- Does not touch games, recruiting, players, roster_profile, Vegas,
-- quadratic / talent / z* weights / team-HFA / weather / QB tenure SOS.
-- Does not stamp Make 12 / win-title (no 2026.5 re-sim in this pack).

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
  const { georgia, maxAbs, maxSlug } = validateShip(payload, slugs);
  const sql = renderMigration(payload);
  writeFileSync(outPath, sql);
  console.log(
    `[0034] wrote ${outPath} (${payload.teams.length} teams; georgia ${georgia.hx_post} #${georgia.hx_rank_post}; max |ΔHX| ${maxAbs} ${maxSlug})`,
  );
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
