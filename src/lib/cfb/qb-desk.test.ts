import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { qbDesk, deskKey, DEFAULT_QB } from "./qb-desk.server.ts";

const root = join(import.meta.dirname, "../../..");
const text = readFileSync(join(root, "data/qb_desk_2026.json"), "utf8");
const file = JSON.parse(text);
const stats = JSON.parse(readFileSync(join(root, "data/stats_2026.json"), "utf8"));
// Minimal teams table (the real one lives in the database): SEC slugs tagged, everyone else "Other".
const SEC = ["alabama", "arkansas", "auburn", "florida", "georgia", "kentucky", "lsu", "mississippi-state", "missouri", "oklahoma", "ole-miss", "south-carolina", "tennessee", "texas", "texas-am", "vanderbilt"];
const teams = stats.teams.map((t: { slug: string }) => ({
  slug: t.slug,
  name: t.slug,
  shortName: t.slug,
  conference: SEC.includes(t.slug) ? "SEC" : "Other",
  colorPrimary: "#888888",
}));

describe("data/qb_desk_2026.json", () => {
  it("is dated, sourced, carries no credential, and covers every /stats QB", () => {
    assert.equal(file.meta.as_of, stats.meta.as_of);
    assert.match(file.meta.game_source, /CollegeFootballData/);
    assert.doesNotMatch(text, /api[_-]?key|bearer|authorization|CFBD_KEY/i);
    assert.equal(file.qbs.length, stats.qb.length);
  });
  it("game logs add up to the official attempts within 3", () => {
    for (const q of file.qbs) {
      const s = stats.qb.find((x: { name: string; slug: string }) => x.name === q.name && x.slug === q.slug);
      assert.ok(Math.abs(q.att_logs - s.att) <= 3, `${q.name} ${q.att_logs} vs ${s.att}`);
    }
  });
});

describe("QB Desk", () => {
  it("Marcel Reed: Week 11 vs Tennessee, season before matches the Nov 11 build", () => {
    const d = qbDesk(DEFAULT_QB, teams)!;
    assert.equal(d.qb.name, "Marcel Reed");
    assert.equal(d.last?.opp, "tennessee");
    assert.deepEqual([d.last?.c, d.last?.a, d.last?.y, d.last?.td, d.last?.i], [9, 22, 71, 0, 1]);
    assert.deepEqual(d.line.before, { g: 9, att: 265, cmp: 151, yds: 1641, td: 8, int: 8, ruy: 206 });
    assert.equal(d.values.before?.epa, 0.059);
    assert.equal(d.values.after.epa, 0.015);
    assert.equal(d.values.before?.tepa, 16.2);
    assert.equal(d.values.after.tepa, 4.3);
    const sec = d.pools.find((p) => p.label === "SEC")!;
    assert.deepEqual(sec.ranks.eff.after, { rank: 18, n: 18 });
    assert.equal(d.last?.gameKey, "2026-11-14-tennessee-at-texas-am");
    assert.equal(d.epaBeforeNote, null);
  });
  it("unknown keys fall back to the default QB", () => {
    assert.equal(qbDesk("nobody-nowhere", teams)?.qb.key, DEFAULT_QB);
    assert.equal(deskKey("Marcel Reed", "texas-am"), "marcel-reed-texas-am");
  });
});
