import assert from "node:assert/strict";
import test from "node:test";
import { predictMatchup } from "./model.ts";
import {
  BOARD_WEEK,
  FEATURED_SLATE_WEEK,
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

const gtFinal = game({
  ...gt,
  status: "final",
  homeScore: 13,
  awayScore: 14,
});

const illinoisFinal = game({
  id: 21,
  homeSlug: "illinois",
  awaySlug: "uab",
  kickoffDate: "2026-09-03",
  kickoffAt: "2026-09-04T01:00:00.000Z",
  status: "final",
  homeScore: 42,
  awayScore: 23,
  location: "Gies Memorial Stadium",
  tv: "BTN",
});

const emuFriday = game({
  id: 40,
  homeSlug: "eastern-michigan",
  awaySlug: "san-jose-state",
  kickoffDate: "2026-09-04",
  kickoffAt: "2026-09-04T22:30:00.000Z",
  location: "Rynearson Stadium",
  tv: "ESPN+",
});

const miamiFriday = game({
  id: 41,
  homeSlug: "stanford",
  awaySlug: "miami",
  kickoffDate: "2026-09-04",
  kickoffAt: "2026-09-05T01:00:00.000Z",
  location: "Stanford Stadium",
  tv: "ESPN",
  homeShort: "Stanford",
  awayShort: "Miami",
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
const fridayAfternoon = Date.parse("2026-09-04T18:00:00.000Z");

test("board chrome is Week 2; featured reads /schedule?w=2", () => {
  assert.equal(BOARD_WEEK, 2);
  assert.equal(FEATURED_SLATE_WEEK, 2);
});

test("Colorado at GT is HASHMARK GT −10.3 / 73.3% at home, Neutral off", () => {
  const pred = predictMatchup(
    { hxRating: 1.672, offenseRating: 32.5, defenseRating: 15.1 },
    { hxRating: -0.432, offenseRating: 22.6, defenseRating: 10.5 },
    { neutral: false },
  );
  assert.equal(pred.spread, 10.3);
  assert.equal(Math.round(pred.homeWinPct * 1000) / 10, 73.3);
});

test("featured kick is the next upcoming non-final by kick time", () => {
  const featured = selectFeaturedKick([rutgers, gt, utah], beforeThursday);
  assert.equal(featured?.homeSlug, "rutgers");
  assert.equal(featured?.awaySlug, "massachusetts");
});

test("after an earlier kick, featured walks to the next future kick", () => {
  const featured = selectFeaturedKick([rutgers, gt, utah], afterGtKick);
  assert.equal(featured?.homeSlug, "utah");
});

test("after Thursday FINALs, first remaining Friday kick features", () => {
  const featured = selectFeaturedKick(
    [gtFinal, illinoisFinal, emuFriday, miamiFriday],
    fridayAfternoon,
  );
  assert.equal(featured?.homeSlug, "eastern-michigan");
});

test("never features a FINAL or an in-progress kick", () => {
  assert.equal(selectFeaturedKick([dublinFinal], beforeThursday), null);
  assert.equal(isUpcomingKick(gt, afterGtKick), false);
  assert.equal(selectFeaturedKick([dublinFinal, gt], afterGtKick), null);
});

test("Ohio St–Texas is not featured while an earlier kick is still upcoming", () => {
  const featured = selectFeaturedKick([rutgers, gt, osuTexas], beforeThursday);
  assert.ok(featured);
  assert.notEqual(featured.awaySlug, "ohio-state");
  assert.notEqual(featured.homeSlug, "ohio-state");
});

test("Week 2 slate without kick times features the first non-final, no invented book", () => {
  const bc = game({
    id: 200,
    week: 2,
    homeSlug: "boston-college",
    awaySlug: "rutgers",
    kickoffDate: "2026-09-11",
    kickoffAt: null,
    location: "Alumni Stadium (Chestnut Hill, MA)",
    vegasSpread: null,
    vegasTotal: null,
  });
  const uga = game({
    id: 201,
    week: 2,
    homeSlug: "georgia",
    awaySlug: "austin-peay",
    kickoffDate: "2026-09-12",
    kickoffAt: null,
    location: "Sanford Stadium",
    vegasSpread: null,
    vegasTotal: null,
  });
  const featured = selectFeaturedKick([bc, uga], Date.parse("2026-09-08T16:00:00.000Z"));
  assert.equal(featured?.homeSlug, "boston-college");
  assert.equal(featured?.awaySlug, "rutgers");
  assert.equal(featuredSlateWeek(bc), 2);
  assert.equal(featuredBook(bc), null);
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
