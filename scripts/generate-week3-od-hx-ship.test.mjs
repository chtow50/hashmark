import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  renderMigration,
  sqlNum,
  validateShip,
  validateUnits,
} from "./generate-week3-od-hx-ship.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load() {
  const payload = JSON.parse(readFileSync(join(root, "data/week3_od_hx_ship_2026.json"), "utf8"));
  const units = JSON.parse(readFileSync(join(root, "data/sunday_od_delta_2026_w3.json"), "utf8"));
  const sql = readFileSync(join(root, "migrations/0034_week3_od_hx_ship.sql"), "utf8");
  return { payload, units, sql };
}

test("sqlNum keeps JSON decimals (3–4 places)", () => {
  assert.equal(sqlNum(7.8978), "7.8978");
  assert.equal(sqlNum(7.8131), "7.8131");
  assert.equal(sqlNum(5.8206), "5.8206");
  assert.equal(sqlNum(1.9), "1.9");
  assert.equal(sqlNum(-0.341), "-0.341");
  assert.equal(sqlNum(-0.752), "-0.752");
  assert.equal(sqlNum(4.981), "4.981");
});

test("AMD ship peer-clears vs JSON: Georgia #1 7.8978, max |ΔHX| 0.0711", () => {
  const payload = JSON.parse(readFileSync(join(root, "data/week3_od_hx_ship_2026.json"), "utf8"));
  const seed = readFileSync(join(root, "migrations/0003_seed.sql"), "utf8");
  const block = seed.split("insert into teams")[1].split("insert into")[0];
  const slugs = new Set([...block.matchAll(/^\s*\(\d+, '([^']+)'/gm)].map((m) => m[1]));
  const { georgia, maxAbs, maxSlug } = validateShip(payload, slugs);
  assert.equal(payload.board, "HX 2026.5");
  assert.equal(payload.n, 136);
  assert.equal(georgia.hx_rank_post, 1);
  assert.equal(georgia.hx_post, 7.8978);
  assert.equal(georgia.delta_hx, -0.0077);
  assert.ok(maxSlug === "missouri" || maxSlug === "troy");
  assert.equal(maxAbs, 0.0711);
});

test("sunday_od_delta_2026_w3 matches ship post units for all 136", () => {
  const { payload, units } = load();
  validateUnits(units, payload);
  assert.equal(units.meta.n_teams, 136);
  assert.equal(units.meta.n_updated, 107);
  assert.equal(units.meta.hx_board_changed, false);
  assert.equal(units.teams.length, 136);
  const georgia = units.teams.find((t) => t.team === "Georgia");
  assert.ok(georgia);
  assert.equal(georgia.post_off, 37.482);
  assert.equal(georgia.post_def, 25.258);
  assert.equal(georgia.post_st, 1.9);
  assert.equal(georgia.delta_def, -0.424);
});

test("0034 SQL spot-check: georgia, ohio-state, texas, oregon, michigan, missouri, hawaii", () => {
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
  assert.match(sql, /HX 2026\.5/);
  assert.match(sql, /7\.8978/);
  assert.doesNotMatch(sql, /Week 4 board/);

  const want = {
    georgia: ["7.8978", "1", "37.482", "25.258", "1.9"],
    "ohio-state": ["7.8131", "2", "38.652", "29.434", "0.275"],
    texas: ["6.4443", "5", "37.082", "21.348", "2.259"],
    oregon: ["6.9056", "4", "39.129", "22.528", "2.818"],
    michigan: ["4.8942", "12", "32.241", "21.835", "-0.341"],
    missouri: ["4.2596", "15", "30.631", "21.904", "-0.752"],
    hawaii: ["-0.9715", "81", "25.975", "9.982", "2.439"],
    troy: ["-1.0841", "87", "24.304", "11.61", "1.873"],
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
