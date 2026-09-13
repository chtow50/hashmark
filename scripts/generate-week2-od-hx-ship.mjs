#!/usr/bin/env node
/**
 * Emits migrations/0028_week2_od_hx_ship.sql from the dual-CLEAR AMD board.
 * Run: node scripts/generate-week2-od-hx-ship.mjs
 *
 * Stamps O/D units + HX onto rankings (season 2026, week 0 — the row Rankings/Board read).
 * Does not touch games, recruiting, players, roster_profile, or Vegas.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(root, "data/week2_od_hx_ship_2026.json");
const seedPath = join(root, "migrations/0003_seed.sql");
const outPath = join(root, "migrations/0028_week2_od_hx_ship.sql");

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
  if (payload.board !== "HX 2026.4") {
    throw new Error(`board=${payload.board}, expected HX 2026.4`);
  }
  if (payload.georgia_hx !== 7.9055) {
    throw new Error(`georgia_hx=${payload.georgia_hx}`);
  }
  if (payload.max_abs_delta !== 0.0717) {
    throw new Error(`max_abs_delta=${payload.max_abs_delta}`);
  }

  const georgia = payload.teams.find((t) => t.slug === "georgia");
  if (!georgia) throw new Error("georgia missing");
  if (georgia.hx_rank_post !== 1) throw new Error(`georgia hx_rank_post=${georgia.hx_rank_post}`);
  if (georgia.hx_post !== 7.9055) throw new Error(`georgia hx_post=${georgia.hx_post}`);
  if (georgia.delta_hx !== 0) throw new Error(`georgia delta_hx=${georgia.delta_hx} (WKU garbage-stripped)`);

  const osu = payload.teams.find((t) => t.slug === "ohio-state");
  const texas = payload.teams.find((t) => t.slug === "texas");
  const mich = payload.teams.find((t) => t.slug === "michigan");
  const oregon = payload.teams.find((t) => t.slug === "oregon");
  if (!osu || osu.hx_post !== 7.8131 || osu.delta_hx !== -0.0354) {
    throw new Error(`ohio-state hx_post=${osu?.hx_post} Δ=${osu?.delta_hx}`);
  }
  if (!texas || texas.hx_post !== 6.4443 || texas.delta_hx !== 0.0354) {
    throw new Error(`texas hx_post=${texas?.hx_post} Δ=${texas?.delta_hx}`);
  }
  if (!mich || mich.delta_hx !== 0.0079) throw new Error(`michigan Δ=${mich?.delta_hx}`);
  if (!oregon || oregon.hx_post !== 6.9056 || oregon.delta_hx !== -0.0597) {
    throw new Error(`oregon hx_post=${oregon?.hx_post} Δ=${oregon?.delta_hx}`);
  }

  const lockedTop = [
    ["georgia", 7.9055, 1],
    ["ohio-state", 7.8131, 2],
    ["notre-dame", 7.0293, 3],
    ["oregon", 6.9056, 4],
    ["texas", 6.4443, 5],
    ["texas-am", 6.1292, 6],
    ["texas-tech", 5.8395, 7],
    ["ole-miss", 5.4649, 8],
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
  for (const t of payload.teams) {
    if (seen.has(t.slug)) throw new Error(`duplicate slug ${t.slug}`);
    seen.add(t.slug);
    if (!slugs.has(t.slug)) throw new Error(`slug ${t.slug} not in teams seed`);
    if (t.hx_rank_post == null) throw new Error(`${t.slug} missing hx_rank_post`);
    if (t.post_off == null || t.post_def == null || t.hx_post == null || t.post_st == null) {
      throw new Error(`${t.slug} missing post units / hx_post`);
    }
    ranks.add(t.hx_rank_post);
    const abs = Math.abs(t.delta_hx ?? 0);
    if (abs > maxAbs) {
      maxAbs = abs;
      maxSlug = t.slug;
    }
  }
  if (ranks.size !== 136) throw new Error(`hx_rank_post not unique 1–136 (${ranks.size})`);
  if (maxSlug !== "kennesaw-state" && maxSlug !== "georgia-state") {
    throw new Error(`max |ΔHX| slug=${maxSlug} abs=${maxAbs} (expected Kennesaw or Georgia State 0.0717)`);
  }
  if (Math.abs(maxAbs - 0.0717) > 1e-6) {
    throw new Error(`max |ΔHX|=${maxAbs}, expected 0.0717`);
  }
  if (!seen.has("hawaii")) throw new Error("hawaii slug missing (okina name, slug stays hawaii)");
  return { georgia, maxAbs, maxSlug };
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

  return `-- Week 2 → Week 3 O/D units + ΔHX stamp (AMD, dual CLEAR).
-- Source: data/week2_od_hx_ship_2026.json  (136 FBS)
-- Approval: Research + Website CLEAR vs AMD week2_od_hx_ship_2026
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 3)
-- Board HX 2026.4. Georgia stays #1 at 7.9055 (Δ=0, WKU garbage-stripped).
-- Max |ΔHX| 0.0717 (Kennesaw State / Georgia State).
-- hx_rank trusts AMD hx_rank_post (not recomputed).
-- Idempotent UPDATEs via teams.slug. No TRUNCATE.
-- Does not touch games, recruiting, players, roster_profile, Vegas,
-- quadratic / talent / z* weights / team-HFA / weather / QB tenure SOS.
-- Does not stamp Make 12 / win-title (AMD re-sim still pending).

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
    `[0028] wrote ${outPath} (${payload.teams.length} teams; georgia ${georgia.hx_post} #${georgia.hx_rank_post}; max |ΔHX| ${maxAbs} ${maxSlug})`,
  );
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
