import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  buildLeaders,
  inLeaderScope,
  leadersSearch,
  LEADER_SORTS,
  parseLeaderDir,
  parseLeaderScope,
  parseLeaderSort,
  viewLeaders,
} from "./qb-leaders.ts";
import { deskKey, qbDesk } from "./qb-desk.server.ts";
import { statRows } from "./stats.server.ts";

const root = join(import.meta.dirname, "../../..");
const stats = JSON.parse(readFileSync(join(root, "data/stats_2026.json"), "utf8"));
const confBySlug = Object.fromEntries(
  JSON.parse(readFileSync(join(root, "data/conf_races_2026.json"), "utf8")).teams.map((t: { slug: string; conference: string }) => [t.slug, t.conference]),
);
const teams = stats.teams.map((t: { slug: string }) => ({
  slug: t.slug,
  name: t.slug,
  shortName: t.slug,
  conference: confBySlug[t.slug] ?? "Independent",
  colorPrimary: "#888888",
}));
const ctx = stats.teams.map((t: { slug: string; w: number; l: number }, i: number) => ({ slug: t.slug, w: t.w, l: t.l, hxRank: i + 1 }));
const rows = statRows("qb", teams);
const keyOf = (r: { name: string; slug: string }) => deskKey(r.name, r.slug);
const tg = new Map(stats.teams.map((t: { slug: string; g: number }) => [t.slug, t.g]));
const qualified = stats.qb.filter((q: { slug: string; att: number }) => q.att >= 10 * (tg.get(q.slug) as number));
const board = buildLeaders({ rows, sort: "tepa", keyOf, teams: ctx });

describe("QB stat leaderboard", () => {
  it("holds qualified QBs only, sorted by total EPA by default with ranks 1..n", () => {
    const b = board;
    assert.equal(b.n, qualified.length);
    assert.equal(b.rows.length, qualified.length);
    const vals = b.rows.map((r) => r.stats.tepa.v).filter((v): v is number => v != null);
    for (let i = 1; i < vals.length; i++) assert.ok(vals[i - 1] >= vals[i]);
    assert.equal(b.rows[0].rank, 1);
    assert.equal(b.rows[0].fbsRank, 1);
    assert.equal(b.rows[0].stats.tepa.rank, 1);
    const best = Math.max(...qualified.filter((q: { tepa: number | null }) => q.tepa != null).map((q: { tepa: number }) => q.tepa));
    assert.equal(b.rows[0].stats.tepa.v, best);
  });
  it("shows the file's real numbers and FBS ranks (fewer INTs rank higher)", () => {
    for (const r of board.rows) {
      const src = stats.qb.find((q: { name: string; slug: string }) => q.name === r.name && q.slug === r.slug);
      assert.equal(r.stats.tepa.v, src.tepa);
      assert.equal(r.stats.yds.v, src.yds);
      assert.equal(r.stats.td.v, src.td);
      assert.equal(r.stats.int.v, src.int);
    }
    const minInt = Math.min(...board.rows.map((r) => r.stats.int.v as number));
    assert.ok(board.rows.filter((r) => r.stats.int.v === minInt).every((r) => r.stats.int.rank === 1));
  });
  it("every sort works and every QB links to a real QB Desk entry", () => {
    for (const s of LEADER_SORTS) {
      const b = buildLeaders({ rows, sort: s, keyOf, teams: ctx });
      assert.equal(b.rows[0].stats[s].rank, 1);
    }
    for (const r of board.rows) assert.equal(qbDesk(r.key, teams)?.qb.key, r.key);
    assert.equal(parseLeaderSort("bogus"), "tepa");
    assert.equal(parseLeaderSort("eff"), "eff");
    assert.equal(parseLeaderSort("int"), "int");
  });
  it("carries team context but no composite score", () => {
    assert.match(board.rows[0].record ?? "", /^\d+–\d+$/);
    assert.ok(board.rows[0].hxRank != null);
    for (const k of Object.keys(board.rows[0])) assert.doesNotMatch(k, /score|rating|grade|win_title/i);
  });
});

describe("QB leaderboard filters and sort direction", () => {
  it("parses scope, direction, and share URLs, dropping defaults", () => {
    assert.equal(parseLeaderScope("sec"), "sec");
    assert.equal(parseLeaderScope("SEC"), "sec");
    assert.equal(parseLeaderScope("Big Ten"), "big-ten");
    assert.equal(parseLeaderScope("Power 4"), "p4");
    assert.equal(parseLeaderScope("Group of Five"), "g5");
    assert.equal(parseLeaderScope("independents"), "independent");
    assert.equal(parseLeaderScope("nope"), "fbs");
    assert.equal(parseLeaderDir("worst"), "worst");
    assert.equal(parseLeaderDir("asc"), "best");
    assert.deepEqual(leadersSearch("fbs", "tepa", "best"), {});
    assert.deepEqual(leadersSearch("sec", "epa", "worst"), { scope: "sec", sort: "epa", dir: "worst" });
    assert.equal(inLeaderScope("SEC", "p4"), true);
    assert.equal(inLeaderScope("SEC", "g5"), false);
    assert.equal(inLeaderScope("Independent", "p4"), false);
    assert.equal(inLeaderScope("Independent", "independent"), true);
    assert.equal(inLeaderScope("Pac-12", "g5"), true);
  });

  it("filters to P4, G5, and each conference using the row's real conference", () => {
    const p4 = viewLeaders(board.rows, { scope: "p4", sort: "tepa" });
    const g5 = viewLeaders(board.rows, { scope: "g5", sort: "tepa" });
    const ind = viewLeaders(board.rows, { scope: "independent", sort: "tepa" });
    assert.ok(p4.rows.every((r) => inLeaderScope(r.conference, "p4")));
    assert.ok(g5.rows.every((r) => inLeaderScope(r.conference, "g5")));
    assert.ok(ind.rows.every((r) => r.conference === "Independent"));
    assert.equal(p4.n + g5.n + ind.n, board.n);
    assert.equal(p4.fbsN, board.n);
    const sec = viewLeaders(board.rows, { scope: "sec", sort: "tepa" });
    assert.ok(sec.rows.every((r) => r.conference === "SEC"));
    assert.equal(sec.n, qualified.filter((q: { slug: string }) => confBySlug[q.slug] === "SEC").length);
    assert.ok(sec.n > 0);
  });

  it("ranks Marcel Reed within the SEC and keeps his FBS rank as a secondary", () => {
    const sec = viewLeaders(board.rows, { scope: "sec", sort: "tepa" });
    const reed = sec.rows.find((r) => r.name === "Marcel Reed" && r.slug === "texas-am");
    assert.ok(reed, "Marcel Reed should be among qualified SEC QBs");
    const secSrc = qualified.filter((q: { slug: string; tepa: number | null }) => confBySlug[q.slug] === "SEC" && q.tepa != null);
    const better = secSrc.filter((q: { tepa: number }) => q.tepa > (reed!.stats.tepa.v as number)).length;
    assert.equal(reed!.rank, better + 1);
    assert.equal(reed!.stats.tepa.v, 4.3);
    // Near the bottom of the SEC by total EPA, well down the FBS list.
    assert.ok(reed!.rank >= sec.n - 2);
    assert.ok(reed!.fbsRank != null && reed!.fbsRank > reed!.rank);
    const fbs = board.rows.find((r) => r.key === reed!.key)!;
    assert.equal(reed!.fbsRank, fbs.stats.tepa.rank);
    assert.equal(reed!.fbsRank, fbs.rank);
  });

  it("keeps best-to-worst ranks when the list is sorted worst-to-best, including lower-is-better INT", () => {
    const best = viewLeaders(board.rows, { scope: "sec", sort: "tepa", dir: "best" });
    const worst = viewLeaders(board.rows, { scope: "sec", sort: "tepa", dir: "worst" });
    assert.equal(worst.n, best.n);
    assert.equal(worst.rows[0].key, best.rows[best.rows.length - 1].key);
    assert.equal(worst.rows[0].rank, best.n); // still the worst rank, now first in the list
    assert.equal(worst.rows[worst.rows.length - 1].rank, 1); // #1 is last
    const reedW = worst.rows.find((r) => r.name === "Marcel Reed" && r.slug === "texas-am")!;
    const reedB = best.rows.find((r) => r.name === "Marcel Reed" && r.slug === "texas-am")!;
    assert.equal(reedW.rank, reedB.rank);
    assert.equal(reedW.fbsRank, reedB.fbsRank);
    assert.ok(worst.rows.slice(0, 3).some((r) => r.key === reedW.key));

    const intBest = viewLeaders(board.rows, { scope: "sec", sort: "int", dir: "best" });
    const intWorst = viewLeaders(board.rows, { scope: "sec", sort: "int", dir: "worst" });
    const ints = intBest.rows.map((r) => r.stats.int.v as number);
    for (let i = 1; i < ints.length; i++) assert.ok(ints[i - 1] <= ints[i]);
    assert.equal(intBest.rows[0].rank, 1);
    assert.ok((intBest.rows[0].stats.int.v as number) < (intBest.rows[intBest.rows.length - 1].stats.int.v as number));
    assert.equal(intWorst.rows[0].key, intBest.rows[intBest.rows.length - 1].key);
    assert.equal(intWorst.rows[0].rank, intBest.rows[intBest.rows.length - 1].rank);
    assert.equal(intWorst.rows[intWorst.rows.length - 1].rank, 1);
  });

  it("returns an empty view when a filter has no qualified QBs", () => {
    const empty = viewLeaders(
      board.rows.map((r) => ({ ...r, conference: "Other" })),
      { scope: "sec", sort: "tepa" },
    );
    assert.equal(empty.n, 0);
    assert.equal(empty.rows.length, 0);
    assert.equal(empty.fbsN, board.n);
  });
});
