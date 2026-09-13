import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderMigration, sqlNum, validateShip } from "./generate-week2-od-hx-ship.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load() {
  const payload = JSON.parse(readFileSync(join(root, "data/week2_od_hx_ship_2026.json"), "utf8"));
  const units = JSON.parse(readFileSync(join(root, "data/sunday_od_delta_2026_w2.json"), "utf8"));
  const sql = readFileSync(join(root, "migrations/0028_week2_od_hx_ship.sql"), "utf8");
  return { payload, units, sql };
}

test("sqlNum keeps JSON decimals (3–4 places)", () => {
  assert.equal(sqlNum(7.9055), "7.9055");
  assert.equal(sqlNum(7.8131), "7.8131");
  assert.equal(sqlNum(5.8395), "5.8395");
  assert.equal(sqlNum(1.9), "1.9");
  assert.equal(sqlNum(-0.341), "-0.341");
  assert.equal(sqlNum(35.92), "35.92");
});

test("AMD ship peer-clears vs JSON: Georgia #1 7.9055 Δ=0, max |ΔHX| 0.0717", () => {
  const payload = JSON.parse(readFileSync(join(root, "data/week2_od_hx_ship_2026.json"), "utf8"));
  const seed = readFileSync(join(root, "migrations/0003_seed.sql"), "utf8");
  const block = seed.split("insert into teams")[1].split("insert into")[0];
  const slugs = new Set([...block.matchAll(/^\s*\(\d+, '([^']+)'/gm)].map((m) => m[1]));
  const { georgia, maxAbs, maxSlug } = validateShip(payload, slugs);
  assert.equal(payload.board, "HX 2026.4");
  assert.equal(payload.n, 136);
  assert.equal(georgia.hx_rank_post, 1);
  assert.equal(georgia.hx_post, 7.9055);
  assert.equal(georgia.delta_hx, 0);
  assert.ok(maxSlug === "kennesaw-state" || maxSlug === "georgia-state");
  assert.equal(maxAbs, 0.0717);
});

test("sunday_od_delta_2026_w2 matches ship post units for all 136", () => {
  const { payload, units } = load();
  assert.equal(units.board, "HX 2026.4");
  assert.equal(units.n, 136);
  assert.equal(units.georgia_hx, 7.9055);
  assert.equal(units.max_abs_delta, 0.0717);
  assert.equal(units.teams.length, 136);
  for (const row of payload.teams) {
    const u = units.teams.find((t) => t.slug === row.slug);
    assert.ok(u, row.slug);
    assert.equal(u.hx_post, row.hx_post);
    assert.equal(u.hx_rank_post, row.hx_rank_post);
    assert.equal(u.post_off, row.post_off);
    assert.equal(u.post_def, row.post_def);
    assert.equal(u.post_st, row.post_st);
    assert.equal(u.delta_hx, row.delta_hx);
  }
});

test("0028 SQL spot-check: georgia, ohio-state, texas, oregon, michigan, hawaii", () => {
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
  assert.doesNotMatch(body, /Make 12|win-title|sim_10k/i);
  assert.match(sql, /Does not stamp Make 12/);
  assert.match(body, /^update rankings /m);
  assert.match(sql, /HX 2026\.4/);

  const want = {
    georgia: ["7.9055", "1", "37.482", "25.682", "1.9"],
    "ohio-state": ["7.8131", "2", "38.652", "29.434", "0.275"],
    texas: ["6.4443", "5", "37.082", "21.348", "2.259"],
    oregon: ["6.9056", "4", "39.129", "22.528", "2.818"],
    michigan: ["4.8972", "12", "32.264", "21.976", "-0.341"],
    hawaii: ["-0.9715", "82", "25.975", "9.982", "2.439"],
    "kennesaw-state": ["-3.9818", "119", "25.029", "8.485", "-1.058"],
    "georgia-state": ["-4.3578", "123", "21.521", "1.267", "-0.941"],
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
