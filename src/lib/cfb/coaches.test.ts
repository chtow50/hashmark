import assert from "node:assert/strict";
import { describe, it } from "node:test";
import raw from "../../../data/coaches_2026.json" with { type: "json" };
import { deltas, parseCol, sortRows, viewRows, coachSearch, type CoachesFile, type CoachRow } from "./coaches.ts";

const file = raw as unknown as CoachesFile;
const by = (slug: string) => file.coaches.find((c) => c.slug === slug) as CoachRow;

describe("coaches data", () => {
  it("one row per FBS team (138), unique slugs, no rating or paid-only fields", () => {
    assert.equal(file.coaches.length, 138);
    assert.equal(new Set(file.coaches.map((c) => c.slug)).size, 138);
    assert.ok(!JSON.stringify(file).includes("win_title"));
    assert.ok(file.sources.length >= 4 && file.sources.every((s) => s.url.startsWith("https://")));
  });
  it("compared coaches have at least 2 completed seasons, matched windows, and a before window that ends before he arrived", () => {
    for (const c of file.coaches) {
      if (c.status === "compared") {
        assert.ok(c.completed >= file.minSeasons, c.name);
        assert.ok(c.n >= file.minSeasons && c.n <= file.maxMatch, c.name);
        assert.ok(c.before && c.after, c.name);
        assert.ok(c.before!.years[1] < c.after!.years[0], c.name);
        assert.ok(c.after!.years[1] <= file.lastCompleted, c.name);
        const nBefore = c.seasons.filter((s) => s.win === "before").length;
        const nAfter = c.seasons.filter((s) => s.win === "after").length;
        assert.ok(nBefore <= c.n && nAfter <= c.n && nAfter >= file.minSeasons - 1, c.name);
      } else {
        assert.equal(c.before, null);
        assert.equal(c.after, null);
        if (c.status === "too-new") assert.ok(c.completed < file.minSeasons, c.name);
      }
    }
  });
  it("window records equal the sum of their season rows", () => {
    for (const c of file.coaches.filter((x) => x.status === "compared")) {
      for (const [k, w] of [["before", c.before!], ["after", c.after!]] as const) {
        const rows = c.seasons.filter((s) => s.win === k);
        assert.equal(rows.reduce((a, s) => a + s.w, 0), w.w, `${c.name} ${k} wins`);
        assert.equal(rows.reduce((a, s) => a + s.l, 0), w.l, `${c.name} ${k} losses`);
      }
    }
  });
  it("named spot checks against the CFBD /records totals", () => {
    const smart = by("georgia");
    assert.equal(smart.name, "Kirby Smart");
    assert.deepEqual([smart.before!.w, smart.before!.l, smart.after!.w, smart.after!.l], [28, 11, 32, 10]);
    const cig = by("indiana");
    assert.deepEqual([cig.before!.w, cig.before!.l, cig.after!.w, cig.after!.l], [7, 17, 27, 2]);
    assert.deepEqual(cig.prior.map((p) => p.school), ["James Madison"]);
    assert.equal(by("iowa").status, "no-before");
  });
  it("midseason starts are excluded from both windows and noted", () => {
    const day = by("ohio-state");
    assert.ok(day.notes.some((n) => n.startsWith("Started partway through 2018")));
    assert.equal(day.seasons.find((s) => s.y === 2018)?.win, null);
  });
});

describe("deltas and sorting", () => {
  it("win delta in points, rank delta positive when the rank number fell", () => {
    const d = deltas(by("indiana"));
    assert.ok(Math.abs(d.win! - (27 / 29 - 7 / 24) * 100) < 0.1);
    const c = by("texas-am");
    assert.equal(c.before!.recRank! - c.after!.recRank!, deltas(c).rec);
  });
  it("no deltas for too-new coaches; null sorts last in either direction", () => {
    const tooNew = file.coaches.find((c) => c.status === "too-new")!;
    assert.deepEqual(deltas(tooNew), { win: null, rec: null, tal: null, epa: null });
    for (const dir of ["best", "worst"] as const) {
      const rows = sortRows(file.coaches, "win", dir);
      const firstNull = rows.findIndex((r) => deltas(r).win == null);
      assert.ok(rows.slice(firstNull).every((r) => deltas(r).win == null));
    }
    const best = sortRows(file.coaches, "win", "best");
    const w = best.filter((r) => deltas(r).win != null).map((r) => deltas(r).win!);
    assert.deepEqual(w, [...w].sort((a, b) => b - a));
  });
  it("views and search defaults", () => {
    assert.equal(viewRows(file, "compared", "win", "best").length, file.coaches.filter((c) => c.status === "compared").length);
    assert.equal(viewRows(file, "all", "name", "best").length, 138);
    assert.deepEqual(coachSearch("compared", "win", "best"), {});
    assert.deepEqual(coachSearch("all", "epa", "worst", "georgia"), { view: "all", sort: "epa", dir: "worst", team: "georgia" });
    assert.equal(parseCol("junk"), "win");
  });
});
