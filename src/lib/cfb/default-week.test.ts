import assert from "node:assert/strict";
import test from "node:test";
import { SCHEDULE_MAX_WEEK, defaultWeek } from "./default-week.ts";

test("Wed 2026-09-23 defaults to Week 4", () => {
  assert.equal(defaultWeek("2026-09-23"), 4);
});

test("early buckets stay Week 0 through Week 2", () => {
  assert.equal(defaultWeek("2026-08-29"), 0);
  assert.equal(defaultWeek("2026-08-30"), 0);
  assert.equal(defaultWeek("2026-08-31"), 1);
  assert.equal(defaultWeek("2026-09-07"), 1);
  assert.equal(defaultWeek("2026-09-08"), 2);
  assert.equal(defaultWeek("2026-09-12"), 2);
});

test("Week 3 ends 2026-09-20 and Week 4 runs through 2026-09-27", () => {
  assert.equal(defaultWeek("2026-09-13"), 3);
  assert.equal(defaultWeek("2026-09-20"), 3);
  assert.equal(defaultWeek("2026-09-21"), 4);
  assert.equal(defaultWeek("2026-09-24"), 4);
  assert.equal(defaultWeek("2026-09-27"), 4);
  assert.equal(defaultWeek("2026-09-28"), 5);
});

test("later weeks advance by Sunday until the season cap", () => {
  assert.equal(SCHEDULE_MAX_WEEK, 13);
  assert.equal(defaultWeek("2026-10-04"), 5);
  assert.equal(defaultWeek("2026-10-05"), 6);
  assert.equal(defaultWeek("2026-11-29"), 13);
  assert.equal(defaultWeek("2026-11-30"), 13);
  assert.equal(defaultWeek("2027-01-01"), 13);
  assert.notEqual(defaultWeek("2026-09-23"), 3);
});
