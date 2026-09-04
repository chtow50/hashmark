import assert from "node:assert/strict";
import test from "node:test";
import {
  formatKickCt,
  formatKickDayTitle,
  kickoffCivilYmd,
} from "./chicago.ts";

/** Thu Sep 3 7:00 CT ESPN — Colorado at GT. Instant is Fri 00:00 UTC. */
const gtKick = "2026-09-04T00:00:00.000Z";
/** Fri Sep 4 8:00 CT ESPN — Miami at Stanford. Instant is Sat 01:00 UTC. */
const miamiKick = "2026-09-05T01:00:00.000Z";
/** Sat Sep 5 9:30 CT ESPN — UCLA at Cal. Instant is Sun 02:30 UTC. */
const calKick = "2026-09-06T02:30:00.000Z";

test("GT Thu 7:00 CT is Thursday Sep 3 in Chicago, not Friday UTC", () => {
  assert.equal(kickoffCivilYmd(gtKick, "2026-09-04"), "2026-09-03");
  assert.equal(formatKickDayTitle(gtKick, "2026-09-04"), "Thursday, Sep 3");
  assert.equal(formatKickCt(gtKick), "7:00 CT");
});

test("Miami Fri 8:00 CT is Friday Sep 4 in Chicago, not Saturday UTC", () => {
  assert.equal(kickoffCivilYmd(miamiKick, "2026-09-05"), "2026-09-04");
  assert.equal(formatKickDayTitle(miamiKick, "2026-09-05"), "Friday, Sep 4");
  assert.equal(formatKickCt(miamiKick), "8:00 CT");
});

test("late Saturday Pacific kicks stay Saturday in Chicago, not Sunday UTC", () => {
  assert.equal(kickoffCivilYmd(calKick, "2026-09-06"), "2026-09-05");
  assert.equal(formatKickDayTitle(calKick, "2026-09-06"), "Saturday, Sep 5");
  assert.equal(formatKickCt(calKick), "9:30 CT");
});
