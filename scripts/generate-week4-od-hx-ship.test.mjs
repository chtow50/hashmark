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
} from "./generate-week4-od-hx-ship.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load() {
  const payload = JSON.parse(readFileSync(join(root, "data/week4_od_hx_ship_2026.json"), "utf8"));
  const units = JSON.parse(readFileSync(join(root, "data/sunday_od_delta_2026_w4.json"), "utf8"));
  const sql = readFileSync(join(root, "migrations/0040_week4_od_hx_ship.sql"), "utf8");
  return { payload, units, sql };
}

test("sqlNum keeps JSON decimals (3–4 places)", () => {
  assert.equal(sqlNum(7.8964), "7.8964");
  assert.equal(sqlNum(7.8131), "7.8131");
  assert.equal(sqlNum(6.9019), "6.9019");
  assert.equal(sqlNum(1.9), "1.9");
  assert.equal(sqlNum(0.071), "0.071");
  assert.equal(sqlNum(-0.071), "-0.071");
  assert.equal(sqlNum(-0.3184), "-0.3184");
  assert.equal(sqlNum(4.9296), "4.9296");
});

test("ship peer-clears vs JSON: Georgia #1 7.8964, max |ΔHX| 0.071", () => {
  const payload = JSON.parse(readFileSync(join(root, "data/week4_od_hx_ship_2026.json"), "utf8"));
  const prior = JSON.parse(readFileSync(join(root, "data/week3_od_hx_ship_2026.json"), "utf8"));
  const seed = readFileSync(join(root, "migrations/0003_seed.sql"), "utf8");
  const block = seed.split("insert into teams")[1].split("insert into")[0];
  const slugs = new Set([...block.matchAll(/^\s*\(\d+, '([^']+)'/gm)].map((m) => m[1]));
  const { georgia, maxAbs, maxSlugs } = validateShip(payload, slugs);
  assert.equal(payload.board, "HX 2026.6");
  assert.equal(payload.n, 136);
  assert.equal(georgia.hx_rank_post, 1);
  assert.equal(georgia.hx_post, 7.8964);
  assert.equal(georgia.delta_hx, -0.0014);
  assert.deepEqual(maxSlugs.sort(), ["maryland", "ucla"]);
  assert.equal(maxAbs, 0.071);
  const priorBy = new Map(prior.teams.map((t) => [t.slug, t.hx_post]));
  for (const t of payload.teams) {
    assert.equal(t.hx_pre, priorBy.get(t.slug), `${t.slug} hx_pre`);
  }
});

test("sunday_od_delta_2026_w4 matches ship post units for all 136", () => {
  const { payload, units } = load();
  validateUnits(units, payload);
  assert.equal(units.meta.n_teams, 136);
  assert.equal(units.meta.n_updated, 117);
  assert.equal(units.meta.n_fbs_fbs, 57);
  assert.equal(units.meta.hx_board_changed, false);
  assert.equal(units.teams.length, 136);
  const georgia = units.teams.find((t) => t.team === "Georgia");
  assert.ok(georgia);
  assert.equal(georgia.post_off, 39.241);
  assert.equal(georgia.post_def, 23.423);
  assert.equal(georgia.post_st, 1.9);
  assert.equal(georgia.delta_off, 1.759);
  assert.equal(georgia.delta_def, -1.835);
});

test("0040 SQL spot-check: georgia, ohio-state, ucla, maryland, lsu, hawaii", () => {
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
  assert.doesNotMatch(body, /home_score|away_score|kickoff_at/);
  assert.doesNotMatch(sql, /401\d{6,}/);
  assert.doesNotMatch(body, /Make 12|win-title|sim_10k|pulse/i);
  assert.match(sql, /Does not stamp Make 12/);
  assert.match(sql, /Does not stamp unit O\/D pulse/);
  assert.match(body, /^update rankings /m);
  assert.match(sql, /HX 2026\.6/);
  assert.match(sql, /7\.8964/);
  assert.match(sql, /Week 4/);

  const want = {
    georgia: ["7.8964", "1", "39.241", "23.423", "1.9"],
    "ohio-state": ["7.8131", "2", "38.652", "29.434", "0.275"],
    michigan: ["4.9296", "12", "34.359", "21.665", "0.718"],
    lsu: ["4.1243", "17", "31.164", "24.161", "2.127"],
    ucla: ["1.3963", "45", "28.45", "9.909", "1.194"],
    maryland: ["-0.3184", "72", "25.119", "11.695", "2.332"],
    hawaii: ["-0.9941", "83", "26.754", "7.959", "3.23"],
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
