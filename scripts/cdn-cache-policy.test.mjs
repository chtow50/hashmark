import { test } from "node:test";
import assert from "node:assert/strict";
import { cdnCacheControl, FEATURED_CACHE, LONG_CACHE, nextChicagoMidnightMs } from "./cdn-cache-policy.mjs";

const base = { method: "GET", status: 200 };

test("data pages and server functions get the long tier", () => {
  for (const pathname of ["/teams/ohio-state", "/games/2026-08-29-hawaii-at-stanford", "/stats", "/stats/qb-leaders", "/coordinators", "/recruiting", "/talent", "/rankings", "/model", "/_serverFn/abc"]) {
    assert.equal(cdnCacheControl({ ...base, pathname }), LONG_CACHE, pathname);
  }
  assert.equal(cdnCacheControl({ ...base, pathname: "/stats/qb-leaders", search: "?scope=sec&dir=asc" }), LONG_CACHE);
  assert.equal(cdnCacheControl({ ...base, pathname: "/matchup", search: "?home=texas&away=ohio-state" }), LONG_CACHE);
  assert.equal(cdnCacheControl({ ...base, pathname: "/nope", status: 404 }), LONG_CACHE);
});

test("clock-dependent pages get short tiers", () => {
  assert.equal(cdnCacheControl({ ...base, pathname: "/" }), FEATURED_CACHE);
  assert.equal(cdnCacheControl({ ...base, pathname: "/matchup" }), FEATURED_CACHE);
  assert.equal(cdnCacheControl({ ...base, pathname: "/matchup", search: "?home=texas" }), FEATURED_CACHE);
  // 2026-11-21 09:00 CST = 15:00Z → 15h to midnight.
  const now = Date.UTC(2026, 10, 21, 15, 0, 0);
  assert.equal(cdnCacheControl({ ...base, pathname: "/schedule", search: "?w=12", nowMs: now }), "public, max-age=0, s-maxage=54000");
});

test("never caches errors, writes, cookies, auth, or responses that chose their own policy", () => {
  assert.equal(cdnCacheControl({ ...base, pathname: "/", status: 500 }), null);
  assert.equal(cdnCacheControl({ ...base, method: "POST", pathname: "/_serverFn/x" }), null);
  assert.equal(cdnCacheControl({ ...base, pathname: "/stats", hasSetCookie: true }), null);
  assert.equal(cdnCacheControl({ ...base, pathname: "/api/auth/get-session" }), null);
  assert.equal(cdnCacheControl({ ...base, pathname: "/__grok/manifest.webmanifest" }), null);
  assert.equal(cdnCacheControl({ ...base, pathname: "/", search: "?install=1" }), null);
  assert.equal(cdnCacheControl({ ...base, pathname: "/", existingCacheControl: "no-cache" }), null);
});

test("next Chicago midnight is DST-exact", () => {
  // CST day.
  assert.equal(nextChicagoMidnightMs(Date.UTC(2026, 10, 21, 15)), Date.UTC(2026, 10, 22, 6));
  // Spring forward Sun 2027-03-14: 00:30 CST → next midnight is Mon 05:00Z (CDT).
  assert.equal(nextChicagoMidnightMs(Date.UTC(2027, 2, 14, 6, 30)), Date.UTC(2027, 2, 15, 5));
  // Fall back Sun 2026-11-01: 00:30 CDT → next midnight is Mon 06:00Z (CST).
  assert.equal(nextChicagoMidnightMs(Date.UTC(2026, 10, 1, 5, 30)), Date.UTC(2026, 10, 2, 6));
  // 23:59:59 local rolls to the following midnight, 1s away.
  assert.equal(nextChicagoMidnightMs(Date.UTC(2026, 10, 22, 5, 59, 59)), Date.UTC(2026, 10, 22, 6));
});
