import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  buildBoard2026,
  buildBoard3y,
  creditedSeasons,
  fmtCol,
  labelCounts,
  parseCoordSort,
  parseView,
  qualifies3y,
  summarize3y,
  teamCoordinators,
  type CoachRecord,
  type CoordinatorsFile,
  type HistoryRow,
  type Live2026,
  type Unit2026,
} from "./coordinators.ts";

const st = (epa: number, rank: number) => ({ epa, sr: 45, xpl: 1.2, ppd: 2.5, rank, nFbs: 136 });
const row = (season: number, status: "credited" | "excluded", epa = 0.1, rank = 20): HistoryRow => ({ season, team: "x", status, staffUrl: "https://example.edu", stats: st(epa, rank) });
const coach = (name: string, unit: "off" | "def", rows: HistoryRow[]): CoachRecord => ({ name, unit, team: "x", title: "", history: rows });

describe("3-year view", () => {
  it("needs 2 credited seasons inside 2024–26; excluded, out-of-window and number-less seasons never count", () => {
    assert.equal(qualifies3y(coach("A", "off", [row(2026, "credited")])), false);
    assert.equal(qualifies3y(coach("B", "off", [row(2025, "credited"), row(2026, "credited")])), true);
    const c = coach("C", "off", [row(2023, "credited"), row(2024, "excluded"), row(2026, "credited"), { ...row(2025, "credited"), stats: null }]);
    assert.equal(creditedSeasons(c).length, 1);
    assert.equal(qualifies3y(c), false);
  });
  it("equal-weight mean; offense ranks highest EPA first, defense lowest", () => {
    const m = coach("M", "off", [row(2024, "credited", 0.3, 1), row(2025, "credited", 0.0, 60), row(2026, "credited", 0.0, 50)]);
    assert.ok(Math.abs(summarize3y(m).epa! - 0.1) < 1e-9);
    assert.equal(summarize3y(m).n, 3);
    const list = [coach("Low", "off", [row(2025, "credited", 0.05), row(2026, "credited", 0.05)]), coach("High", "off", [row(2025, "credited", 0.2), row(2026, "credited", 0.2)])];
    assert.deepEqual(buildBoard3y(list, "off").map((r) => r.coach.name), ["High", "Low"]);
    const def = list.map((c) => ({ ...c, unit: "def" as const }));
    assert.deepEqual(buildBoard3y(def, "def").map((r) => r.coach.name), ["Low", "High"]);
  });
});

describe("2026 board", () => {
  const u = (team: string, label: Unit2026["label"] = "sole"): Unit2026 => ({ team, unit: "off", label, coaches: label === "unverified" ? [] : [{ name: team.toUpperCase(), title: "Offensive Coordinator" }], staffUrl: null });
  const lv = (epa: number | null): Live2026 => ({ epa, sr: 45, xpl: 1.2, ppg: 30, games: 11, rank: 1, n: 3 });
  const units = [u("a"), u("b", "co"), u("c", "unverified"), u("d")];
  const live = { "off|a": lv(0.1), "off|b": lv(0.3), "off|c": lv(0.2), "off|d": null };
  const prior: CoordinatorsFile["prior2025"] = { a: { off: st(0.15, 10) } };
  it("keeps every unit, labeled ones included; units without numbers sort last unranked", () => {
    const b = buildBoard2026(units, live, prior, {}, "off");
    assert.deepEqual(b.map((r) => r.u.team), ["b", "c", "a", "d"]);
    assert.deepEqual(b.map((r) => r.rank), [1, 2, 3, 0]);
  });
  it("vs 2025 is this season minus last season for the same school's unit", () => {
    const a = buildBoard2026(units, live, prior, { a: 40 }, "off").find((r) => r.u.team === "a")!;
    assert.ok(Math.abs(a.v.delta! - -0.05) < 1e-9);
    assert.equal(a.v.talent, 40);
  });
  it("label counts and URL parsing", () => {
    assert.deepEqual(labelCounts(units, "off"), { sole: 2, "with-co": 0, co: 1, "hc-title": 0, "hc-calls": 0, interim: 0, unverified: 1 });
    assert.equal(parseView("3y"), "3y");
    assert.equal(parseView("10y"), "2026");
    assert.equal(parseCoordSort("talent", "3y"), "epa");
    assert.equal(parseCoordSort("n", "3y"), "n");
    assert.equal(fmtCol("epa", -0.05), "−0.050");
    assert.equal(fmtCol("talent", 7), "#7");
  });
});

describe("team page block", () => {
  const units: Unit2026[] = [
    { team: "x", unit: "off", label: "with-co", coaches: [{ name: "Full OC", title: "Offensive Coordinator" }, { name: "Co OC", title: "Co-Offensive Coordinator" }], staffUrl: "https://example.edu" },
    { team: "x", unit: "def", label: "sole", coaches: [{ name: "DC", title: "Defensive Coordinator" }], staffUrl: "https://example.edu" },
  ];
  const lv = (epa: number): Live2026 => ({ epa, sr: 45, xpl: 1.2, ppg: 30, games: 11, rank: 5, n: 138 });
  const live = { "off|x": lv(0.2), "def|x": lv(-0.05) };
  const prior: CoordinatorsFile["prior2025"] = { x: { off: st(0.1, 30), def: st(0.05, 60) } };
  const coaches: CoachRecord[] = [
    coach("Co OC", "off", [row(2026, "excluded")]),
    coach("Full OC", "off", [row(2025, "credited", 0.1, 30), row(2026, "credited", 0.2, 5)]),
    { ...coach("Other OC", "off", [row(2025, "credited", 0.3, 2), row(2026, "credited", 0.3, 2)]), team: "y" },
    coach("DC", "def", [row(2026, "credited", -0.05, 5)]),
  ];
  const cards = teamCoordinators(units, prior, coaches, live, "x");
  it("one card per side; the school's full coordinator before the co-coordinator; other schools' coaches stay out", () => {
    assert.deepEqual(cards.map((c) => c.unit), ["off", "def"]);
    assert.deepEqual(cards[0].coaches.map((k) => k.coach.name), ["Full OC", "Co OC"]);
  });
  it("vs 2025 and the 3-year rank match the /coordinators boards exactly", () => {
    assert.ok(Math.abs(cards[0].delta! - 0.1) < 1e-9);
    assert.ok(Math.abs(cards[1].delta! - -0.1) < 1e-9);
    const board = buildBoard3y(coaches, "off");
    assert.deepEqual(cards[0].coaches[0].board3y && { rank: cards[0].coaches[0].board3y.rank, n: cards[0].coaches[0].board3y.n }, { rank: 2, n: board.length });
    assert.equal(cards[0].coaches[1].board3y, null, "co-coordinator-only seasons never rank");
    assert.equal(cards[1].coaches[0].board3y, null, "one credited season is not enough");
  });
  it("unknown team: empty cards, nothing invented", () => {
    const none = teamCoordinators(units, prior, coaches, live, "zzz");
    assert.ok(none.every((c) => c.u === null && c.live === null && c.prior === null && c.delta === null && c.coaches.length === 0));
  });
});

describe("shipped data", () => {
  const root = join(import.meta.dirname, "../../..");
  const file = JSON.parse(readFileSync(join(root, "data/coordinators_2026.json"), "utf8")) as CoordinatorsFile;
  const stats = JSON.parse(readFileSync(join(root, "data/stats_2026.json"), "utf8")) as { teams: { slug: string }[] };
  it("one entry per FBS team and side, every one sourced or labeled unverified", () => {
    assert.equal(file.units2026.length, stats.teams.length * 2);
    const keys = new Set(file.units2026.map((u) => `${u.unit}|${u.team}`));
    for (const t of stats.teams) for (const s of ["off", "def"]) assert.ok(keys.has(`${s}|${t.slug}`), `${s} ${t.slug}`);
    for (const u of file.units2026) {
      if (u.label !== "unverified") assert.match(String(u.staffUrl), /^https?:\/\//, `${u.team} ${u.unit}`);
      if (u.label === "sole") assert.equal(u.coaches.length, 1, `${u.team} ${u.unit}`);
      if (u.label === "hc-calls") assert.match(String(u.hcSource?.url), /^https?:\/\//);
    }
  });
  it("credited seasons carry a staff page and numbers, sit in 2024–26, and excluded ones give a reason", () => {
    for (const c of file.coaches) {
      for (const h of c.history) {
        assert.ok(h.season >= 2024 && h.season <= 2026, `${c.name} ${h.season}`);
        if (h.status === "credited") {
          assert.match(String(h.staffUrl), /^https?:\/\//, `${c.name} ${h.season}`);
          if (h.season < 2026) assert.ok(h.stats && h.stats.epa != null, `${c.name} ${h.season} stats`);
        } else {
          assert.ok(h.reasons && h.reasons.length > 0, `${c.name} ${h.season} reason`);
          assert.ok(!h.reasons!.some((r) => /co-coordinator season/.test(r)), "old strict-sole reason must be gone");
        }
      }
    }
  });
  it("a credited 2026 season means he holds the school's full coordinator title on that side (a co-coordinator may also be listed)", () => {
    const sole = new Set(file.units2026.filter((u) => u.label === "sole" || u.label === "with-co").map((u) => `${u.unit}|${u.team}|${u.coaches[0].name}`));
    for (const c of file.coaches) for (const h of c.history) if (h.season === 2026 && h.status === "credited") assert.ok(sole.has(`${c.unit}|${h.team}|${c.name}`), c.name);
  });
  it("team pages: every FBS team gets both sides, and every listed coordinator (head coaches with the title aside) has a track record", () => {
    for (const t of stats.teams) {
      const cards = teamCoordinators(file.units2026, file.prior2025, file.coaches, {}, t.slug);
      assert.ok(cards.every((c) => c.u), t.slug);
      for (const c of cards) {
        if (c.u!.label === "hc-title") continue;
        const names = new Set(c.coaches.map((k) => k.coach.name));
        for (const p of c.u!.coaches) assert.ok(names.has(p.name), `${t.slug} ${c.unit} ${p.name}`);
      }
    }
    const bama = teamCoordinators(file.units2026, file.prior2025, file.coaches, {}, "alabama");
    assert.equal(bama[1].coaches[0].coach.name, "Kane Wommack");
    assert.equal(bama[1].coaches[0].board3y?.rank, buildBoard3y(file.coaches, "def").find((r) => r.coach.name === "Kane Wommack")?.rank);
  });
  it("incoming coordinators, when added, cite an official announcement", () => {
    for (const u of file.units2026) for (const i of u.incoming ?? []) assert.match(i.sourceUrl, /^https:\/\//, `${u.team} ${i.name}`);
  });
  it("free surface: no win_title", () => {
    assert.ok(!JSON.stringify(file).includes("win_title"));
  });
});
