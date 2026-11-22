import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { buildBoard, creditedSeasons, fmtCol, qualifies, qualifyCounts, summarize, unrankedFor, type CoachRecord, type HistoryRow } from "./coordinators.ts";

const st = (epa: number, rank: number) => ({ epa, sr: 45, xpl: 1.2, ppd: 2.5, rank, nFbs: 130 });
const row = (season: number, status: "verified" | "excluded", epa = 0.1, rank = 20): HistoryRow => ({
  season, team: "x", school: "X", status, staffUrl: "https://example.edu", headCoach: "HC", bioLine: "", stats: st(epa, rank),
});
const coach = (name: string, unit: "off" | "def", rows: HistoryRow[]): CoachRecord => ({ name, unit, team: "x", title: "", bioUrl: "", history: rows });

describe("qualification", () => {
  it("10-year view needs 5 credited seasons in 2016–25", () => {
    const four = coach("A", "off", [2016, 2017, 2018, 2019].map((y) => row(y, "verified")));
    const five = coach("B", "off", [2016, 2017, 2018, 2019, 2020].map((y) => row(y, "verified")));
    assert.equal(qualifies(four, "10y"), false);
    assert.equal(qualifies(five, "10y"), true);
  });
  it("5-year view needs 3 credited seasons in 2021–25; older seasons do not count", () => {
    const c = coach("C", "def", [2016, 2017, 2018, 2019, 2020, 2021, 2022].map((y) => row(y, "verified")));
    assert.equal(qualifies(c, "10y"), true);
    assert.equal(qualifies(c, "5y"), false);
    assert.equal(creditedSeasons(c, "5y").length, 2);
  });
  it("excluded seasons never count, and neither do seasons outside the window or without numbers", () => {
    const c = coach("D", "off", [row(2021, "verified"), row(2022, "excluded"), row(2023, "excluded"), row(2026, "verified"), { ...row(2024, "verified"), stats: null }]);
    assert.equal(creditedSeasons(c, "5y").length, 1);
    assert.equal(qualifies(c, "5y"), false);
  });
});

describe("ranking", () => {
  const off = [
    coach("Low", "off", [2021, 2022, 2023].map((y) => row(y, "verified", 0.05, 60))),
    coach("High", "off", [2021, 2022, 2023].map((y) => row(y, "verified", 0.2, 5))),
    coach("Mid", "off", [2021, 2022, 2023, 2024].map((y) => row(y, "verified", 0.1, 30))),
  ];
  it("offense ranks highest adjusted EPA first; the summary is an unweighted season mean", () => {
    const b = buildBoard(off, "off", "5y");
    assert.deepEqual(b.map((r) => r.coach.name), ["High", "Mid", "Low"]);
    assert.deepEqual(b.map((r) => r.rank), [1, 2, 3]);
    const mixed = coach("M", "off", [row(2021, "verified", 0.3, 1), row(2022, "verified", 0.0, 60), row(2023, "verified", 0.0, 50)]);
    assert.ok(Math.abs(summarize(mixed, "5y").epa! - 0.1) < 1e-9);
    assert.equal(summarize(mixed, "5y").n, 3);
  });
  it("defense ranks lowest EPA allowed first", () => {
    const def = off.map((c) => ({ ...c, unit: "def" as const }));
    assert.deepEqual(buildBoard(def, "def", "5y").map((r) => r.coach.name), ["Low", "Mid", "High"]);
  });
  it("re-sorting changes order but not the EPA rank", () => {
    const b = buildBoard(off, "off", "5y", "n", "best");
    assert.equal(b[0].coach.name, "Mid");
    assert.equal(b[0].rank, 2);
    assert.deepEqual(buildBoard(off, "off", "5y", "epa", "worst").map((r) => r.coach.name), ["Low", "Mid", "High"]);
  });
  it("fmtCol signs EPA and uses a real minus", () => {
    assert.equal(fmtCol("epa", 0.1234), "+0.123");
    assert.equal(fmtCol("epa", -0.05), "−0.050");
    assert.equal(fmtCol("rank", null), "—");
  });
});

describe("shipped data", () => {
  const root = join(import.meta.dirname, "../../..");
  const file = JSON.parse(readFileSync(join(root, "data/coordinators_2026.json"), "utf8"));
  it("every credited season carries a staff-page source and a play-caller source, and only FBS 2016–25", () => {
    for (const c of file.coaches as CoachRecord[]) {
      for (const h of c.history) {
        assert.ok(h.season >= 2016 && h.season <= 2025, `${c.name} ${h.season}`);
        if (h.status === "verified") {
          assert.match(String(h.staffUrl), /^https?:\/\//, `${c.name} ${h.season} staff`);
          assert.match(String(h.hcUrl), /^https?:\/\//, `${c.name} ${h.season} hc`);
          assert.ok(h.stats && h.stats.epa != null, `${c.name} ${h.season} stats`);
        } else assert.ok(h.reasons && h.reasons.length > 0, `${c.name} ${h.season} reason`);
      }
    }
  });
  it("ranked coaches are in the 2026 population and counts are honest", () => {
    const names = new Set(file.population.map((p: { name: string; unit: string }) => `${p.unit}|${p.name}`));
    for (const c of file.coaches as CoachRecord[]) assert.ok(names.has(`${c.unit}|${c.name}`), c.name);
    for (const u of ["off", "def"] as const)
      for (const w of ["10y", "5y"] as const) {
        const { ranked, total } = qualifyCounts(file, u, w);
        assert.equal(ranked + unrankedFor(file, u, w).length, total);
      }
  });
});
