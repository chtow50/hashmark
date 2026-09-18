import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderMigration, seedSlugs, validateBallot } from "./generate-week3-ap-top25.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load() {
  const payload = JSON.parse(readFileSync(join(root, "data/week3_ap_top25_2026.json"), "utf8"));
  const sql = readFileSync(join(root, "migrations/0030_week3_ap_top25.sql"), "utf8");
  return { payload, sql };
}

test("Week 3 AP ballot peer-clears vs JSON: Texas 1 (56 FPV), UGA 2, OSU 6, Michigan 19, Oregon 21, Oklahoma 24, Washington dropped", () => {
  const payload = JSON.parse(readFileSync(join(root, "data/week3_ap_top25_2026.json"), "utf8"));
  const slugs = seedSlugs(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"));
  const { n, asOf } = validateBallot(payload, slugs);
  assert.equal(n, 25);
  assert.equal(asOf, "2026-09-13");
  assert.equal(payload.poll_week, 3);
  assert.equal(payload.teams.find((t) => t.slug === "texas")?.rank, 1);
  assert.equal(payload.teams.find((t) => t.slug === "texas")?.first_place_votes, 56);
  assert.equal(payload.teams.find((t) => t.slug === "georgia")?.rank, 2);
  assert.equal(payload.teams.find((t) => t.slug === "ohio-state")?.rank, 6);
  assert.equal(payload.teams.find((t) => t.slug === "michigan")?.rank, 19);
  assert.equal(payload.teams.find((t) => t.slug === "oregon")?.rank, 21);
  assert.equal(payload.teams.find((t) => t.slug === "oklahoma")?.rank, 24);
  assert.equal(payload.teams.find((t) => t.slug === "miami")?.rank, 5);
  assert.equal(payload.teams.find((t) => t.slug === "usc")?.rank, 12);
  assert.equal(payload.teams.find((t) => t.slug === "texas-am")?.rank, 9);
  assert.equal(payload.teams.find((t) => t.slug === "ole-miss")?.rank, 8);
  assert.equal(
    payload.teams.find((t) => t.slug === "washington"),
    undefined,
  );
  assert.equal(
    payload.teams.find((t) => t.slug === "miami-fl"),
    undefined,
  );
});

test("0030 SQL spot-check: clear-then-set, week 0, no HX/O/D/games touch, Washington not stamped", () => {
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
    texas: 1,
    georgia: 2,
    "ohio-state": 6,
    michigan: 19,
    oregon: 21,
    oklahoma: 24,
  };
  for (const [slug, rank] of Object.entries(want)) {
    const row = payload.teams.find((t) => t.slug === slug);
    assert.ok(row, slug);
    assert.equal(row.rank, rank);
    assert.ok(sql.includes(`('${slug}', ${rank})`), `('${slug}', ${rank})`);
  }
  assert.doesNotMatch(sql, /washington/);
  assert.doesNotMatch(sql, /miami-fl/);

  const regenerated = renderMigration(payload);
  assert.equal(sql, regenerated);
});

test("home / rankings / disagreement chrome is Week 3 AP, not leftover Week 1 / Sept. 8", () => {
  const featured = readFileSync(join(root, "src/lib/cfb/featured.ts"), "utf8");
  const home = readFileSync(join(root, "src/routes/index.tsx"), "utf8");
  const rankings = readFileSync(join(root, "src/routes/rankings.tsx"), "utf8");
  const card = readFileSync(join(root, "src/components/truth-pack.tsx"), "utf8");

  assert.match(featured, /week: 3/);
  assert.match(featured, /asOf: "Sept\. 13"/);
  assert.match(featured, /label: "Week 3 AP"/);
  assert.match(featured, /columnHint: "W3 stamp"/);
  assert.match(featured, /HX is Week 3/);
  assert.match(featured, /not a Week 4 ballot/);
  assert.doesNotMatch(featured, /Week 1 AP/);
  assert.doesNotMatch(featured, /Sept\. 8/);
  assert.doesNotMatch(featured, /W1 stamp/);

  assert.doesNotMatch(home, /Week 1 AP/);
  assert.doesNotMatch(home, /Sept\. 8/);
  assert.doesNotMatch(rankings, /Week 1 AP/);
  assert.doesNotMatch(rankings, /Sept\. 8/);
  assert.doesNotMatch(card, /Week 1 AP/);
  assert.doesNotMatch(card, /Sept\. 8/);
  assert.match(card, /AP_STAMP\.vsHx/);
});
