#!/usr/bin/env node
/**
 * Emits migrations/0022_week1_ap_top25.sql from the Research-cleared Week 1 AP ballot.
 * Run: node scripts/generate-week1-ap-top25.mjs
 *
 * Stamps ap_rank onto rankings (season 2026, week 0 — the row Rankings/Board read).
 * Clears every ap_rank in that season/week first so dropouts (Michigan) go NULL.
 * Does not touch hx_*, offense_rating, defense_rating, games, players, roster_profile.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(root, "data/week1_ap_top25_2026.json");
const seedPath = join(root, "migrations/0003_seed.sql");
const outPath = join(root, "migrations/0022_week1_ap_top25.sql");

function sqlStr(s) {
  if (typeof s !== "string" || !s) throw new Error(`bad slug ${s}`);
  return `'${s.replaceAll("'", "''")}'`;
}

export function seedSlugs(seedSql) {
  const block = seedSql.split("insert into teams")[1]?.split("insert into")[0];
  if (!block) throw new Error("could not find teams insert in 0003_seed.sql");
  return new Set([...block.matchAll(/^\s*\(\d+, '([^']+)'/gm)].map((m) => m[1]));
}

export function validateBallot(payload, slugs) {
  if (!payload || !Array.isArray(payload.teams)) {
    throw new Error("ballot JSON missing teams[]");
  }
  if (payload.season !== 2026) throw new Error(`season=${payload.season}`);
  if (payload.as_of !== "2026-09-08") throw new Error(`as_of=${payload.as_of}`);
  if (payload.n !== 25) throw new Error(`n=${payload.n}`);
  if (payload.teams.length !== 25) {
    throw new Error(`expected 25 teams, got ${payload.teams.length}`);
  }

  const seen = new Set();
  const ranks = new Set();
  for (const t of payload.teams) {
    if (!t.slug) throw new Error(`missing slug for rank ${t.rank}`);
    if (seen.has(t.slug)) throw new Error(`duplicate slug ${t.slug}`);
    seen.add(t.slug);
    if (!slugs.has(t.slug)) throw new Error(`slug ${t.slug} not in teams seed`);
    if (!Number.isInteger(t.rank) || t.rank < 1 || t.rank > 25) {
      throw new Error(`bad rank ${t.rank} for ${t.slug}`);
    }
    if (ranks.has(t.rank)) throw new Error(`duplicate rank ${t.rank}`);
    ranks.add(t.rank);
  }
  if (ranks.size !== 25) throw new Error(`ranks not unique 1–25 (${ranks.size})`);

  const want = {
    "ohio-state": 1,
    georgia: 2,
    "notre-dame": 3,
    lsu: 8,
    virginia: 25,
  };
  for (const [slug, rank] of Object.entries(want)) {
    const row = payload.teams.find((t) => t.slug === slug);
    if (!row) throw new Error(`${slug} missing`);
    if (row.rank !== rank) throw new Error(`${slug} rank=${row.rank}, expected ${rank}`);
  }
  if (payload.teams.some((t) => t.slug === "michigan")) {
    throw new Error("michigan must be dropped (NULL), not in the ballot");
  }
  if (!payload.dropped_from_preseason?.includes("Michigan")) {
    throw new Error("dropped_from_preseason must include Michigan");
  }

  return { n: payload.teams.length, asOf: payload.as_of };
}

export function renderMigration(payload) {
  const teams = [...payload.teams].sort((a, b) => a.rank - b.rank);
  const rows = teams.map((t, i) => {
    const comma = i === teams.length - 1 ? "" : ",";
    return `  (${sqlStr(t.slug)}, ${t.rank})${comma}`;
  });

  return `-- Week 1 AP Top 25 stamp (2026-09-08, ESPN/AP ballot).
-- Source: data/week1_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 2)
-- Clears every ap_rank in that season/week first so dropouts (Michigan) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
${rows.join("\n")}
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
`;
}

function main() {
  const payload = JSON.parse(readFileSync(jsonPath, "utf8"));
  const slugs = seedSlugs(readFileSync(seedPath, "utf8"));
  const { n, asOf } = validateBallot(payload, slugs);
  const sql = renderMigration(payload);
  writeFileSync(outPath, sql);
  console.log(`[0022] wrote ${outPath} (${n} teams; as_of ${asOf})`);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
