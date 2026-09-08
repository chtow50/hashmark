import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderMigration, seedSlugs, validateBallot } from "./generate-week1-ap-top25.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load() {
  const payload = JSON.parse(readFileSync(join(root, "data/week1_ap_top25_2026.json"), "utf8"));
  const sql = readFileSync(join(root, "migrations/0022_week1_ap_top25.sql"), "utf8");
  return { payload, sql };
}

test("Week 1 AP ballot peer-clears vs JSON: OSU 1, UGA 2, ND 3, LSU 8, UVA 25, Michigan dropped", () => {
  const payload = JSON.parse(readFileSync(join(root, "data/week1_ap_top25_2026.json"), "utf8"));
  const slugs = seedSlugs(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"));
  const { n, asOf } = validateBallot(payload, slugs);
  assert.equal(n, 25);
  assert.equal(asOf, "2026-09-08");
  assert.equal(payload.teams.find((t) => t.slug === "ohio-state")?.rank, 1);
  assert.equal(payload.teams.find((t) => t.slug === "georgia")?.rank, 2);
  assert.equal(payload.teams.find((t) => t.slug === "notre-dame")?.rank, 3);
  assert.equal(payload.teams.find((t) => t.slug === "lsu")?.rank, 8);
  assert.equal(payload.teams.find((t) => t.slug === "virginia")?.rank, 25);
  assert.equal(
    payload.teams.find((t) => t.slug === "michigan"),
    undefined,
  );
});

test("0022 SQL spot-check: clear-then-set, week 0, no HX/O/D/games touch", () => {
  const { payload, sql } = load();
  const body = sql
    .split("\n")
    .filter((line) => !line.startsWith("--"))
    .join("\n");
  assert.match(body, /season = 2026/);
  assert.match(body, /week = 0/);
  assert.match(body, /set ap_rank = null where season = 2026 and week = 0/);
  assert.doesNotMatch(body, /truncate/i);
  assert.doesNotMatch(body, /\bhx_/);
  assert.doesNotMatch(body, /offense_rating/);
  assert.doesNotMatch(body, /defense_rating/);
  assert.doesNotMatch(body, /\bgames\b/);
  assert.doesNotMatch(body, /roster_profile/);
  assert.doesNotMatch(body, /talent/);

  const want = {
    "ohio-state": 1,
    georgia: 2,
    "notre-dame": 3,
    lsu: 8,
    virginia: 25,
  };
  for (const [slug, rank] of Object.entries(want)) {
    const row = payload.teams.find((t) => t.slug === slug);
    assert.ok(row, slug);
    assert.equal(row.rank, rank);
    assert.ok(sql.includes(`('${slug}', ${rank})`), `('${slug}', ${rank})`);
  }
  assert.doesNotMatch(sql, /michigan/);

  const regenerated = renderMigration(payload);
  assert.equal(sql, regenerated);
});
