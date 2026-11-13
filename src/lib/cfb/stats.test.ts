import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { deriveValues, METRICS, metricOf, sortRows, standing, STAT_TABS, TEAM_ADVANCED_KEYS, type StatRow } from "./stats.ts";
import { statRows, teamAdvanced } from "./stats.server.ts";

const root = join(import.meta.dirname, "../../..");
const text = readFileSync(join(root, "data/stats_2026.json"), "utf8");
const file = JSON.parse(text);
const board: { slug: string }[] = JSON.parse(readFileSync(join(root, "data/hx_refit_2026.json"), "utf8")).board;

describe("data/stats_2026.json", () => {
  it("is dated, sourced, and carries no credential", () => {
    assert.match(file.meta.as_of, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(file.meta.box_source, /cfbstats/);
    assert.match(file.meta.advanced_source, /CollegeFootballData/);
    assert.doesNotMatch(text, /api[_-]?key|bearer|authorization|CFBD_KEY/i);
  });
  it("covers every board team exactly once, with advanced metrics", () => {
    const slugs = file.teams.map((t: { slug: string }) => t.slug).sort();
    assert.deepEqual(slugs, board.map((t) => t.slug).sort());
    for (const t of file.teams) for (const k of TEAM_ADVANCED_KEYS) assert.equal(typeof t[k], "number", `${t.slug} ${k}`);
  });
  it("player rows point at board teams and EPA is mostly matched", () => {
    const set = new Set(board.map((t) => t.slug));
    for (const tab of ["qb", "rush", "rec"] as const) {
      for (const p of file[tab]) assert.ok(set.has(p.slug), `${tab} ${p.name} ${p.slug}`);
      const matched = file[tab].filter((p: { epa: number | null }) => p.epa != null).length;
      assert.ok(matched / file[tab].length > 0.9, `${tab} matched ${matched}`);
    }
  });
  it("rejects CFBD player PPA that covers too little of the box volume", () => {
    // CFBD credits Van Buren with 2 pass plays against 181 box attempts; EPA must not show.
    const vb = file.qb.find((p: { name: string }) => p.name === "Michael Van Buren Jr.");
    assert.ok(vb);
    assert.equal(vb.epa, null);
  });
});

describe("stats math", () => {
  const eff = metricOf("teams", "nepa")!;
  const low = metricOf("teams", "oepa")!;
  it("standing: best is P100 #1; lower-is-better flips; nulls skipped", () => {
    assert.deepEqual(standing(eff, 3, [1, 2, 3, null]), { p: 100, rank: 1, n: 3 });
    assert.deepEqual(standing(eff, 1, [1, 2, 3]), { p: 0, rank: 3, n: 3 });
    assert.deepEqual(standing(low, 1, [1, 2, 3]), { p: 100, rank: 1, n: 3 });
    assert.equal(standing(eff, null, [1, 2]), null);
  });
  it("sortRows puts nulls last", () => {
    const row = (id: string, x: number | null): StatRow => ({ id, name: id, slug: id, team: id, conference: "", color: "", pos: "", g: 1, wl: "", v: { nepa: x } });
    assert.deepEqual(sortRows([row("a", null), row("b", 1), row("c", 2)], eff).map((r) => r.id), ["c", "b", "a"]);
  });
  it("deriveValues computes the NCAA efficiency formula", () => {
    const v = deriveValues("qb", { g: 10, att: 100, cmp: 60, yds: 800, td: 8, int: 2 });
    assert.equal(v.eff, (8.4 * 800 + 330 * 8 + 100 * 60 - 200 * 2) / 100);
    assert.equal(v.ypg, 80);
  });
  it("every tab's metrics resolve on real rows; team advanced ranks run 1..138", () => {
    const teams = board.map((t) => ({ slug: t.slug, name: t.slug, conference: "SEC", colorPrimary: "#000" }));
    for (const tab of STAT_TABS) {
      const rows = statRows(tab, teams);
      assert.ok(rows.length > 90, tab);
      for (const m of METRICS[tab]) assert.ok(rows.some((r) => r.v[m.k] != null), `${tab}.${m.k}`);
    }
    const top = teamAdvanced(sortRows(statRows("teams", teams), eff)[0].slug)!;
    assert.equal(top.rows.find((r) => r.k === "nepa")!.rank, 1);
    assert.equal(top.rows[0].n, 138);
    assert.equal(teamAdvanced("not-a-team"), null);
  });
});
