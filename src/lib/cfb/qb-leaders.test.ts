import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { buildLeaders, LEADER_SORTS, parseLeaderSort } from "./qb-leaders.ts";
import { deskKey, qbDesk } from "./qb-desk.server.ts";
import { statRows } from "./stats.server.ts";

const root = join(import.meta.dirname, "../../..");
const stats = JSON.parse(readFileSync(join(root, "data/stats_2026.json"), "utf8"));
const teams = stats.teams.map((t: { slug: string }) => ({ slug: t.slug, name: t.slug, shortName: t.slug, conference: "Other", colorPrimary: "#888888" }));
const ctx = stats.teams.map((t: { slug: string; w: number; l: number }, i: number) => ({ slug: t.slug, w: t.w, l: t.l, hxRank: i + 1 }));
const rows = statRows("qb", teams);
const keyOf = (r: { name: string; slug: string }) => deskKey(r.name, r.slug);
const tg = new Map(stats.teams.map((t: { slug: string; g: number }) => [t.slug, t.g]));
const qualified = stats.qb.filter((q: { slug: string; att: number }) => q.att >= 10 * (tg.get(q.slug) as number));

describe("QB stat leaderboard", () => {
  it("holds qualified QBs only, sorted by total EPA by default with ranks 1..n", () => {
    const b = buildLeaders({ rows, sort: "tepa", keyOf, teams: ctx });
    assert.equal(b.n, qualified.length);
    assert.equal(b.rows.length, qualified.length);
    const vals = b.rows.map((r) => r.stats.tepa.v).filter((v): v is number => v != null);
    for (let i = 1; i < vals.length; i++) assert.ok(vals[i - 1] >= vals[i]);
    assert.equal(b.rows[0].rank, 1);
    assert.equal(b.rows[0].stats.tepa.rank, 1);
    const best = Math.max(...qualified.filter((q: { tepa: number | null }) => q.tepa != null).map((q: { tepa: number }) => q.tepa));
    assert.equal(b.rows[0].stats.tepa.v, best);
  });
  it("shows the file's real numbers and FBS ranks (fewer INTs rank higher)", () => {
    const b = buildLeaders({ rows, sort: "tepa", keyOf, teams: ctx });
    for (const r of b.rows) {
      const src = stats.qb.find((q: { name: string; slug: string }) => q.name === r.name && q.slug === r.slug);
      assert.equal(r.stats.tepa.v, src.tepa);
      assert.equal(r.stats.yds.v, src.yds);
      assert.equal(r.stats.td.v, src.td);
      assert.equal(r.stats.int.v, src.int);
    }
    const minInt = Math.min(...b.rows.map((r) => r.stats.int.v as number));
    assert.ok(b.rows.filter((r) => r.stats.int.v === minInt).every((r) => r.stats.int.rank === 1));
  });
  it("every sort works and every QB links to a real QB Desk entry", () => {
    for (const s of LEADER_SORTS) {
      const b = buildLeaders({ rows, sort: s, keyOf, teams: ctx });
      assert.equal(b.rows[0].stats[s].rank, 1);
    }
    const b = buildLeaders({ rows, sort: "tepa", keyOf, teams: ctx });
    for (const r of b.rows) assert.equal(qbDesk(r.key, teams)?.qb.key, r.key);
    assert.equal(parseLeaderSort("bogus"), "tepa");
    assert.equal(parseLeaderSort("eff"), "eff");
  });
  it("carries team context but no composite score", () => {
    const b = buildLeaders({ rows, sort: "tepa", keyOf, teams: ctx });
    assert.match(b.rows[0].record ?? "", /^\d+–\d+$/);
    assert.ok(b.rows[0].hxRank != null);
    for (const k of Object.keys(b.rows[0])) assert.doesNotMatch(k, /score|rating|grade|win_title/i);
  });
});
