import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function read(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("LEAN polish gates", () => {
  it("Edge is gone: /edge and /edge/* 301 to the board; no Edge code left", () => {
    assert.match(read("src/routes/edge.tsx"), /redirect\(\{ to: "\/", statusCode: 301 \}\)/);
    assert.match(read("src/routes/edge.$.tsx"), /redirect\(\{ to: "\/", statusCode: 301 \}\)/);
    for (const gone of ["src/lib/edge.ts", "src/lib/scenario-sim.ts", "src/routes/api/edge.pack.ts", "src/components/edge-board.tsx"]) {
      assert.equal(existsSync(join(root, gone)), false, gone);
    }
  });

  it("States is the By state tab on /recruiting, loaded in the route loader", () => {
    const src = read("src/routes/recruiting.tsx");
    assert.match(src, /loaderDeps/);
    assert.match(src, /getStateDetail/);
    assert.match(read("src/components/states-tab.tsx"), /No pipeline on the desk/);
    assert.doesNotMatch(src, /useEffect/);
    assert.match(read("src/routes/states.tsx"), /to: "\/recruiting", search: \{ tab: "states", code \}/);
  });

  it("Home leads with the HX board and carries no Edge strip (Edge paused)", () => {
    const src = read("src/routes/index.tsx");
    const head = src.indexOf("<PageHead");
    const hxOne = src.indexOf("HX No. 1");
    assert.ok(head >= 0 && hxOne >= 0);
    assert.doesNotMatch(src, /EdgePackStrip/);
  });

  it("schedule default omits view when All FBS", () => {
    const src = read("src/routes/schedule.tsx");
    assert.match(src, /key: "all", label: "All FBS"/);
    assert.match(src, /view !== "all"/);
    assert.match(src, /Top 25 · HX or last stamped AP/);
  });

  it("sitemap lists the tapes and no /edge, /desk or /states URLs", () => {
    const xml = read("public/sitemap.xml");
    assert.doesNotMatch(xml, /hashmarkcfb\.com\/edge/);
    assert.doesNotMatch(xml, /hashmarkcfb\.com\/(desk|states|logos)</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-5-tape</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-4-tape</);
    assert.match(xml, /https:\/\/hashmarkcfb\.com\/stories\/week-3-tape</);
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
    // Phone cards: stacked (space-y-3) inside the sm:hidden list, top 25 then "Show all" (ShowMore).
    assert.match(src, /space-y-3 sm:hidden|className="sm:hidden">\s*<ShowMore[\s\S]{0,200}className="space-y-3"/);
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
