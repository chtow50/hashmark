/**
 * Rendered SSR checks against the committed `.vercel/output` server function.
 *
 * Imports the Vercel (nitro) handler that Production runs and renders real
 * pages through it (PGLite fallback, no DATABASE_URL), so these assert the
 * markup a visitor gets, not a copy of the row logic. Rebuild `.vercel/output`
 * (`npm run build`) before running when source changes.
 */
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { before, describe, it } from "node:test";

const ENTRY = join(import.meta.dirname, "..", ".vercel/output/functions/__server.func/index.mjs");

let handler;
const cache = new Map();

async function render(path) {
  if (!cache.has(path)) {
    const res = await handler.fetch(new Request(`http://localhost${path}`), {});
    assert.equal(res.status, 200, `${path} status`);
    cache.set(path, await res.text());
  }
  return cache.get(path);
}

/** Chip labels per /schedule row (the chip strip above the team names). */
function scheduleRowChips(html) {
  return [
    ...html.matchAll(
      /<div class="min-w-0"><div class="flex flex-wrap items-center gap-2">(.*?)<\/div>/g,
    ),
  ].map((m) => [...m[1].matchAll(/<span class="inline-flex h-6[^"]*">([^<]*)<\/span>/g)].map((x) => x[1]));
}

/** FINAL games for a week in the dehydrated payload (FBS rows and FCS Vegas-only stubs). */
function payloadFinals(html, week) {
  return [...html.matchAll(/\{id:-?\d+,week:(\d+),[^{}]*?status:"(\w+)"/g)].filter(
    (m) => Number(m[1]) === week && m[2] === "final",
  ).length;
}

describe("rendered SSR (committed .vercel/output)", { timeout: 120_000 }, () => {
  before(async () => {
    handler = (await import(pathToFileURL(ENTRY).href)).default;
  });

  for (const week of [2, 5, 6]) {
    it(`/schedule?w=${week}: every FINAL row renders exactly one Final chip`, async () => {
      const html = await render(`/schedule?w=${week}`);
      const rows = scheduleRowChips(html);
      assert.ok(rows.length > 0, "no schedule rows parsed");
      const finals = payloadFinals(html, week);
      assert.ok(finals > 0, "week has FINAL games");
      for (const chips of rows) {
        assert.ok(chips.filter((c) => c === "Final").length <= 1, `duplicate Final chip: ${chips.join(" · ")}`);
      }
      // One Final chip per FINAL game, and none on scheduled rows.
      assert.equal(rows.filter((c) => c.includes("Final")).length, finals);
      assert.equal((html.match(/>FINAL</g) ?? []).length, finals);
    });
  }

  it("/schedule?w=2 Vegas-only FCS FINAL rows keep their single Final chip", async () => {
    const rows = scheduleRowChips(await render("/schedule?w=2"));
    const vegasOnly = rows.filter((c) => c.includes("Vegas-only"));
    assert.ok(vegasOnly.length > 0);
    for (const chips of vegasOnly) {
      assert.deepEqual(chips.filter((c) => c === "Final"), ["Final"]);
    }
  });

  it("/matchup same-favorite note is gated at >= 4 pts (USF @ UTSA, HX = Vegas UTSA −7.0)", async () => {
    const html = await render("/matchup?home=utsa&away=usf");
    assert.match(html, /UTSA −7\.0/);
    assert.doesNotMatch(html, /same favorite/);
    assert.doesNotMatch(html, />Spread gap</);
  });

  it("/matchup keeps the same-favorite note at >= 4 pts (Iowa St @ BYU, gap 4.5)", async () => {
    const html = await render("/matchup?home=byu&away=iowa-state");
    assert.match(html, /HASHMARK <!-- -->BYU −15\.0<!-- --> vs Vegas <!-- -->BYU −10\.5<!-- --> · same favorite|HASHMARK BYU −15\.0 vs Vegas BYU −10\.5 · same favorite/);
    assert.match(html, />Spread gap</);
  });
});
