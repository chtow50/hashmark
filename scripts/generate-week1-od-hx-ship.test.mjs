import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderMigration, sqlNum, validateShip } from "./generate-week1-od-hx-ship.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load() {
  const payload = JSON.parse(readFileSync(join(root, "data/week1_od_hx_ship_2026.json"), "utf8"));
  const sql = readFileSync(join(root, "migrations/0021_week1_od_hx_ship.sql"), "utf8");
  return { payload, sql };
}

test("sqlNum keeps JSON decimals (3–4 places)", () => {
  assert.equal(sqlNum(7.9055), "7.9055");
  assert.equal(sqlNum(37.482), "37.482");
  assert.equal(sqlNum(1.9), "1.9");
  assert.equal(sqlNum(-0.109), "-0.109");
  assert.equal(sqlNum(35.92), "35.92");
});

test("AMD ship peer-clears vs JSON: Georgia #1, max |ΔHX| Rutgers 0.068", () => {
  const payload = JSON.parse(readFileSync(join(root, "data/week1_od_hx_ship_2026.json"), "utf8"));
  const seed = readFileSync(join(root, "migrations/0003_seed.sql"), "utf8");
  const block = seed.split("insert into teams")[1].split("insert into")[0];
  const slugs = new Set([...block.matchAll(/^\s*\(\d+, '([^']+)'/gm)].map((m) => m[1]));
  const { georgia, maxAbs, maxSlug } = validateShip(payload, slugs);
  assert.equal(georgia.hx_rank_post, 1);
  assert.equal(georgia.hx_post, 7.9055);
  assert.equal(maxSlug, "rutgers");
  assert.equal(maxAbs, 0.068);
});

test("0021 SQL spot-check: georgia, notre-dame, rutgers, smu, florida-state", () => {
  const { payload, sql } = load();
  const body = sql
    .split("\n")
    .filter((line) => !line.startsWith("--"))
    .join("\n");
  assert.match(body, /r\.season = 2026/);
  assert.match(body, /r\.week = 0/);
  assert.doesNotMatch(body, /truncate/i);
  assert.doesNotMatch(body, /\bgames\b/);
  assert.doesNotMatch(body, /recruiting/);
  assert.doesNotMatch(body, /roster_profile/);
  assert.doesNotMatch(body, /vegas/i);
  assert.match(body, /^update rankings /m);

  const want = {
    georgia: ["7.9055", "1", "37.482", "25.682", "1.9"],
    "notre-dame": ["7.0293", "3", "38.999", "21.582", "1.859"],
    rutgers: ["-0.109", "70", "29.978", "7.182", "0.2"],
    smu: ["4.0469", "20", "35.92", "19.435", "-2.259"],
    "florida-state": ["0.3063", "62", "30.115", "16.682", "0.259"],
  };
  for (const [slug, cols] of Object.entries(want)) {
    const row = payload.teams.find((t) => t.slug === slug);
    assert.ok(row, slug);
    assert.equal(sqlNum(row.hx_post), cols[0]);
    assert.equal(String(row.hx_rank_post), cols[1]);
    assert.equal(sqlNum(row.post_off), cols[2]);
    assert.equal(sqlNum(row.post_def), cols[3]);
    assert.equal(sqlNum(row.post_st), cols[4]);
    const tuple =
      slug === "georgia"
        ? `('${slug}'::text, ${cols[0]}::double precision, ${cols[1]}::int, ${cols[2]}::double precision, ${cols[3]}::double precision, ${cols[4]}::double precision)`
        : `('${slug}', ${cols.join(", ")})`;
    assert.ok(sql.includes(tuple), tuple);
  }

  const regenerated = renderMigration(payload);
  assert.equal(sql, regenerated);
});
