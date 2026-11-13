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

describe("defense board", () => {
  it("has a cfbstats defense pool on board teams with box-only numbers", () => {
    const set = new Set(board.map((t) => t.slug));
    assert.ok(file.def.length > 300, `def rows ${file.def.length}`);
    for (const p of file.def) {
      assert.ok(set.has(p.slug), `def ${p.name} ${p.slug}`);
      assert.ok(p.tot >= 40 || p.sk >= 4 || p.int >= 3 || p.tfl >= 8, `pool rule ${p.name}`);
      assert.ok(p.solo + p.ast === p.tot, `solo+ast=tot ${p.name}`);
      assert.ok(p.sk <= p.tfl + 0.001 || p.tfl === 0, `sacks inside TFL ${p.name}`);
      assert.doesNotMatch(p.name, /\bESPN\b/);
    }
  });
  it("derives havoc plays without double-counting sacks", () => {
    const v = deriveValues("def", { g: 10, tot: 50, tfl: 8, sk: 5, int: 2, pbu: 6, ff: 1 });
    assert.equal(v.hp, 17);
    assert.equal(v.hpg, 1.7);
    assert.equal(v.tpg, 5);
  });
});

describe("chart labels and CSV", () => {
  it("keeps close labels apart and inside the plot", async () => {
    const { placeLabels, textW } = await import("./chart-labels.ts");
    const pts = [
      { id: "a", text: "Marcel Reed", cx: 300, cy: 200 },
      { id: "b", text: "Arch Manning", cx: 304, cy: 203 },
      { id: "c", text: "Gunner Stockton", cx: 298, cy: 198 },
    ];
    const out = placeLabels(pts, [], { x0: 50, x1: 600, y0: 20, y1: 400 });
    const boxes = out.map((l) => {
      const w = textW(l.text);
      return { x: l.anchor === "start" ? l.x : l.x - w, y: l.y - 11, w, h: 14 };
    });
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        assert.ok(!(a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h), `${out[i].id} overlaps ${out[j].id}`);
      }
  });
  it("quotes CSV cells that need it", async () => {
    const { toCsv } = await import("../download.ts");
    assert.equal(toCsv(["a", "b"], [["x,y", 'say "hi"'], [null, 3]]), 'a,b\n"x,y","say ""hi"""\n,3\n');
  });
});

describe("conference races data", () => {
  const races = JSON.parse(readFileSync(join(root, "data/conf_races_2026.json"), "utf8"));
  const sim = JSON.parse(readFileSync(join(root, "data/sim_10k_2026_hx2026_8.json"), "utf8"));
  it("never carries national title odds", () => {
    assert.doesNotMatch(JSON.stringify(races), /win_title/);
  });
  it("uses the same draws as the 10k sim (conf_title identical) and sums per league", () => {
    const simBy = new Map(sim.teams.map((t: { slug: string; conf_title: number }) => [t.slug, t.conf_title]));
    const sums = new Map<string, { ccg: number; title: number }>();
    for (const t of races.teams) {
      if (t.conference !== "Independent") assert.equal(t.conf_title, simBy.get(t.slug), t.slug);
      const s = sums.get(t.conference) ?? { ccg: 0, title: 0 };
      s.ccg += t.make_ccg ?? 0;
      s.title += t.conf_title ?? 0;
      sums.set(t.conference, s);
    }
    for (const [c, s] of sums) {
      if (c === "Independent") continue;
      assert.ok(Math.abs(s.title - 100) < 0.05, `${c} title ${s.title}`);
      if (c !== "Pac-12") assert.ok(Math.abs(s.ccg - 200) < 0.05, `${c} ccg ${s.ccg}`);
    }
  });
});

describe("matchup unit edges", () => {
  it("puts offense and defense on one scale (100 = best) and calls edges at 10+ points", async () => {
    const { unitEdges, edgeCall, UNIT_PAIRS } = await import("./stats.ts");
    const { matchupEdges } = await import("./stats.server.ts");
    const e = matchupEdges("georgia", "alabama");
    assert.ok(e);
    assert.equal(e!.homeOff.length, UNIT_PAIRS.length);
    for (const r of [...e!.homeOff, ...e!.awayOff]) {
      if (r.offP != null) assert.ok(r.offP >= 0 && r.offP <= 100);
      if (r.defP != null) assert.ok(r.defP >= 0 && r.defP <= 100);
    }
    // Best offense vs worst defense on EPA reads as an offense edge; lower-is-better handled.
    const all = [{ epa: 0.3, oepa: -0.2 }, { epa: -0.1, oepa: 0.25 }, { epa: 0.0, oepa: 0.0 }];
    const [epa] = unitEdges(all[0], all[1], all);
    assert.equal(epa.offP, 100);
    assert.equal(epa.defP, 0);
    assert.equal(edgeCall(epa), "offense");
    assert.equal(edgeCall({ offP: 55, defP: 50 }), "even");
    assert.equal(edgeCall({ offP: null, defP: 50 }), null);
    assert.equal(matchupEdges("georgia", "not-a-team"), null);
  });
});
