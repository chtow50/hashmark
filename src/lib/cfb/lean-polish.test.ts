import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function read(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("LEAN polish gates", () => {
  it("Edge week sample is the full depth pack, not the free-board teaser", () => {
    const src = read("src/routes/edge.tsx");
    assert.match(src, /confidence cards/i);
    assert.match(src, /unit O\/D pulse/);
    assert.match(src, /tape write-up/);
    assert.match(src, /not the free-board teaser/i);
    assert.match(src, /EDGE\.weekPrice/);
    assert.match(src, /kind="week"/);
    assert.match(src, /kind="month"/);
    assert.match(src, /No locks/);
    assert.match(src, /No guaranteed ROI/);
    assert.doesNotMatch(src, /sure thing|print money|can't miss/i);
  });

  it("States loads pipeline in the route loader instead of a stuck spinner", () => {
    const src = read("src/routes/states.tsx");
    assert.match(src, /loaderDeps/);
    assert.match(src, /getStateDetail/);
    assert.match(src, /No pipeline on the desk/);
    assert.doesNotMatch(src, /Loading pipeline/);
    assert.doesNotMatch(src, /useEffect/);
  });

  it("Home leads with the HX board and labels Edge as paid depth", () => {
    const src = read("src/routes/index.tsx");
    const head = src.indexOf("<PageHead");
    const hxOne = src.indexOf("HX No. 1");
    const edge = src.indexOf("<EdgePackStrip");
    assert.ok(head >= 0 && hxOne >= 0 && edge >= 0);
    assert.ok(hxOne < edge, "HX No. 1 must precede the Edge strip");
    assert.match(src, /EdgePackStrip compact paid/);
  });

  it("schedule default omits view when All FBS", () => {
    const src = read("src/routes/schedule.tsx");
    assert.match(src, /key: "all", label: "All FBS"/);
    assert.match(src, /view !== "all"/);
    assert.match(src, /Top 25 · HX or last stamped AP/);
  });

  it("sitemap lists /edge, /edge/board, /desk, and Week 2 tape on hashmarkcfb.com", () => {
    const xml = read("public/sitemap.xml");
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/edge</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/edge\/board</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/desk</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-2-tape</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-3-houston-texas-tech</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-3-lsu-ole-miss</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-3-unc-clemson</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-3-usc-rutgers</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-3-indiana-wku</);
    assert.doesNotMatch(xml, /localhost/);
  });

  it("rankings mobile stacks cards so AP, rating, and Make 12 stay unclipped", () => {
    const src = read("src/routes/rankings.tsx");
    assert.match(src, /function RankingCard/);
    assert.match(src, /space-y-3 sm:hidden/);
    assert.match(src, /hidden overflow-hidden p-0 sm:block/);
    assert.match(src, /AP · \{AP_STAMP\.columnHint\}/);
    assert.match(src, /DeltaChip hxRank=\{team\.hxRank\} apRank=\{team\.apRank\}/);
    assert.match(src, /fmtNum\(team\.hxRating, 2\)/);
    assert.match(src, /make12Pct\(team\)/);
    assert.doesNotMatch(src, /Swipe → AP stays/);
    const table = src.slice(src.indexOf("<table"));
    const apTh = table.indexOf('toggle("apRank")');
    const ratingTh = table.indexOf('toggle("hxRating")');
    assert.ok(apTh >= 0 && ratingTh >= 0 && apTh < ratingTh);
  });
});
