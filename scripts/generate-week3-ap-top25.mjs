#!/usr/bin/env node
/**
 * Emits migrations/0030_week3_ap_top25.sql from the Research-cleared Week 3 AP ballot.
 * Run: node scripts/generate-week3-ap-top25.mjs
 *
 * Stamps ap_rank onto rankings (season 2026, week 0 — the row Rankings/Board read).
 * Clears every ap_rank in that season/week first so dropouts (Washington) go NULL.
 * Does not touch hx_*, offense_rating, defense_rating, games, players, roster_profile.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(root, "data/week3_ap_top25_2026.json");
const seedPath = join(root, "migrations/0003_seed.sql");
const outPath = join(root, "migrations/0030_week3_ap_top25.sql");

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
  if (payload.poll_week !== 3) throw new Error(`poll_week=${payload.poll_week}`);
  if (payload.as_of !== "2026-09-13") throw new Error(`as_of=${payload.as_of}`);
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
    texas: 1,
    georgia: 2,
    "ohio-state": 6,
    michigan: 19,
    oregon: 21,
    oklahoma: 24,
  };
  for (const [slug, rank] of Object.entries(want)) {
    const row = payload.teams.find((t) => t.slug === slug);
    if (!row) throw new Error(`${slug} missing`);
    if (row.rank !== rank) throw new Error(`${slug} rank=${row.rank}, expected ${rank}`);
  }

  const texas = payload.teams.find((t) => t.slug === "texas");
  if (texas.first_place_votes !== 56) {
    throw new Error(`texas FPV=${texas.first_place_votes}, expected 56`);
  }

  const miami = payload.teams.find((t) => t.rank === 5);
  if (miami?.slug !== "miami") {
    throw new Error(`rank 5 slug=${miami?.slug}, expected miami (not miami-fl / miami-oh)`);
  }
  const usc = payload.teams.find((t) => t.rank === 12);
  if (usc?.slug !== "usc") {
    throw new Error(`rank 12 slug=${usc?.slug}, expected usc`);
  }
  const tamu = payload.teams.find((t) => t.rank === 9);
  if (tamu?.slug !== "texas-am") {
    throw new Error(`rank 9 slug=${tamu?.slug}, expected texas-am`);
  }
  const oleMiss = payload.teams.find((t) => t.rank === 8);
  if (oleMiss?.slug !== "ole-miss") {
    throw new Error(`rank 8 slug=${oleMiss?.slug}, expected ole-miss`);
  }

  if (payload.teams.some((t) => t.slug === "washington")) {
    throw new Error("washington must be dropped (NULL), not in the ballot");
  }
  if (!payload.dropped_from_top25_vs_prev?.includes("Washington")) {
    throw new Error("dropped_from_top25_vs_prev must include Washington");
  }
  if (!payload.entered_top25?.includes("Michigan")) {
    throw new Error("entered_top25 must include Michigan");
  }

  return { n: payload.teams.length, asOf: payload.as_of };
}

export function renderMigration(payload) {
  const teams = [...payload.teams].sort((a, b) => a.rank - b.rank);
  const rows = teams.map((t, i) => {
    const comma = i === teams.length - 1 ? "" : ",";
    return `  (${sqlStr(t.slug)}, ${t.rank})${comma}`;
  });

  return `-- Week 3 AP Top 25 stamp (2026-09-13, NCAA/AP ballot).
-- Source: data/week3_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 3)
-- Clears every ap_rank in that season/week first so dropouts (Washington) go NULL.
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
  console.log(`[0030] wrote ${outPath} (${n} teams; as_of ${asOf})`);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
