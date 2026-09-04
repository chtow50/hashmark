import assert from "node:assert/strict";
import test from "node:test";
import { predictMatchup } from "./model.ts";
import {
  featuredBook,
  featuredSlateWeek,
  favoriteLine,
  isUpcomingKick,
  selectFeaturedKick,
  spreadGap,
} from "./featured.ts";
import type { ScheduleGame } from "./types.ts";

function game(partial: Partial<ScheduleGame> & Pick<ScheduleGame, "homeSlug" | "awaySlug">): ScheduleGame {
  return {
    id: partial.id ?? 1,
    week: partial.week ?? 1,
    kickoffDate: partial.kickoffDate ?? "2026-09-04",
    homeName: partial.homeName ?? partial.homeSlug,
    awayName: partial.awayName ?? partial.awaySlug,
    homeShort: partial.homeShort ?? partial.homeSlug,
    awayShort: partial.awayShort ?? partial.awaySlug,
    homeColor: "#000",
    awayColor: "#000",
    homeHx: 0,
    awayHx: 0,
    homeRank: 1,
    awayRank: 1,
    homeOff: 0,
    awayOff: 0,
    homeDef: 0,
    awayDef: 0,
    neutral: partial.neutral ?? false,
    location: partial.location ?? null,
    headline: null,
    kickoffAt: partial.kickoffAt ?? null,
    vegasSpread: partial.vegasSpread ?? null,
    vegasTotal: partial.vegasTotal ?? null,
    homeScore: null,
    awayScore: null,
    status: partial.status ?? "scheduled",
    tv: partial.tv ?? null,
    ...partial,
  };
}

const rutgers = game({
  id: 10,
  homeSlug: "rutgers",
  awaySlug: "massachusetts",
  kickoffDate: "2026-09-03",
  kickoffAt: "2026-09-03T22:00:00.000Z",
  location: "SHI Stadium",
});

const gt = game({
  id: 20,
  homeSlug: "georgia-tech",
  awaySlug: "colorado",
  kickoffDate: "2026-09-04",
  kickoffAt: "2026-09-04T00:00:00.000Z",
  location: "Bobby Dodd Stadium",
  tv: "ESPN",
  homeShort: "Georgia Tech",
  awayShort: "Colorado",
});

const utah = game({
  id: 30,
  homeSlug: "utah",
  awaySlug: "wyoming",
  kickoffDate: "2026-09-03",
  kickoffAt: "2026-09-04T01:00:00.000Z",
  location: "Rice-Eccles Stadium",
});

const dublinFinal = game({
  id: 1,
  week: 1,
  homeSlug: "tcu",
  awaySlug: "north-carolina",
  kickoffDate: "2026-08-29",
  kickoffAt: "2026-08-29T16:00:00.000Z",
  status: "final",
  location: "Dublin",
});

const osuTexas = game({
  id: 99,
  week: 2,
  homeSlug: "texas",
  awaySlug: "ohio-state",
  kickoffDate: "2026-09-12",
  kickoffAt: "2026-09-12T19:30:00.000Z",
  location: "DKR-Texas Memorial Stadium",
});

const beforeThursday = Date.parse("2026-09-01T22:00:00.000Z");
const afterGtKick = Date.parse("2026-09-04T00:01:00.000Z");

test("Colorado at GT is HASHMARK GT −10.3 / 73.3% at home, Neutral off", () => {
  const pred = predictMatchup(
    { hxRating: 1.672, offenseRating: 32.5, defenseRating: 15.1 },
    { hxRating: -0.432, offenseRating: 22.6, defenseRating: 10.5 },
    { neutral: false },
  );
  assert.equal(pred.spread, 10.3);
  assert.equal(Math.round(pred.homeWinPct * 1000) / 10, 73.3);
});

test("featured kick is Colorado at GT while that kick is still ahead, even if Rutgers is earlier", () => {
  const featured = selectFeaturedKick([rutgers, gt, utah], beforeThursday);
  assert.equal(featured?.homeSlug, "georgia-tech");
  assert.equal(featured?.awaySlug, "colorado");
  assert.equal(featured?.location, "Bobby Dodd Stadium");
});

test("after GT kicks, featured walks to the next future Week 1 kick", () => {
  const featured = selectFeaturedKick([rutgers, gt, utah], afterGtKick);
  assert.equal(featured?.homeSlug, "utah");
});

test("never features a FINAL or an in-progress kick", () => {
  assert.equal(selectFeaturedKick([dublinFinal], beforeThursday), null);
  assert.equal(isUpcomingKick(gt, afterGtKick), false);
  assert.equal(selectFeaturedKick([dublinFinal, gt], afterGtKick), null);
});

test("Ohio St–Texas is not the Week 1 featured kick", () => {
  const featured = selectFeaturedKick([rutgers, gt, osuTexas], beforeThursday);
  assert.ok(featured);
  assert.notEqual(featured.awaySlug, "ohio-state");
  assert.notEqual(featured.homeSlug, "ohio-state");
});

test("GT featured week is HASHMARK Week 1, not Week 0", () => {
  assert.equal(featuredSlateWeek(gt), 1);
  assert.equal(featuredSlateWeek({ kickoffDate: "2026-08-29", week: 1 }), 0);
});

test("unstamped GT book is the current Thursday book, not a close, and does not invent a total", () => {
  const book = featuredBook(gt);
  assert.ok(book);
  assert.equal(book.kind, "current");
  assert.equal(book.label, "Current book");
  assert.equal(book.spread, 6.5);
  assert.equal(book.total, "50.5–51");
  assert.match(book.note ?? "", /Not a close until kick/);
  assert.equal(gt.vegasSpread, null);
  assert.equal(gt.vegasTotal, null);
});

test("stamped GT close is Vegas −6.5 / 50.5, not the current-book range", () => {
  const stamped = game({
    homeSlug: "georgia-tech",
    awaySlug: "colorado",
    homeShort: "Georgia Tech",
    awayShort: "Colorado",
    vegasSpread: 6.5,
    vegasTotal: 50.5,
    status: "final",
  });
  const book = featuredBook(stamped);
  assert.ok(book);
  assert.equal(book.kind, "close");
  assert.equal(book.label, "Vegas");
  assert.equal(book.spread, 6.5);
  assert.equal(book.total, "50.5");
  assert.equal(book.note, null);
  assert.equal(favoriteLine("Georgia Tech", "Colorado", stamped.vegasSpread ?? 0), "Georgia Tech −6.5");
});

test("same-favorite spread gap vs −6.5 is the flag", () => {
  assert.equal(spreadGap(10.3, 6.5), 3.8);
  assert.equal(favoriteLine("Georgia Tech", "Colorado", 10.3), "Georgia Tech −10.3");
  assert.equal(favoriteLine("Georgia Tech", "Colorado", 6.5), "Georgia Tech −6.5");
  assert.equal(spreadGap(10.3, -6.5), null);
});
