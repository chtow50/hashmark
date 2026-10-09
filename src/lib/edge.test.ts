import assert from "node:assert/strict";
import test from "node:test";
import {
  EDGE,
  EDGE_CHECKOUT_PENDING,
  edgeCheckoutHref,
  edgeCheckoutLive,
  edgeCheckoutUrl,
  resolveCheckoutUrl,
} from "./edge.ts";

test("Edge Pack display price is the $5 week sample only (Edge pause step 1)", () => {
  assert.equal(EDGE.weekPrice, "$5");
  assert.equal(EDGE.weekLabel, "$5 Week sample");
  assert.equal("monthPrice" in EDGE, false);
  assert.equal("monthLabel" in EDGE, false);
  assert.doesNotMatch(JSON.stringify(EDGE), /\/mo|monthly|subscri/i);
});
test("unset, blank, and non-http values do not become a checkout URL", () => {
  assert.equal(resolveCheckoutUrl(undefined), null);
  assert.equal(resolveCheckoutUrl(null), null);
  assert.equal(resolveCheckoutUrl(""), null);
  assert.equal(resolveCheckoutUrl("   "), null);
  assert.equal(resolveCheckoutUrl("#checkout-pending"), null);
  assert.equal(resolveCheckoutUrl("/edge"), null);
  assert.equal(resolveCheckoutUrl("javascript:alert(1)"), null);
});

test("absolute http(s) checkout URLs are kept", () => {
  assert.equal(
    resolveCheckoutUrl("https://example.com/pay"),
    "https://example.com/pay",
  );
  assert.equal(
    resolveCheckoutUrl("  https://example.com/pay?sku=week  "),
    "https://example.com/pay?sku=week",
  );
});

test("week checkout reads only VITE_EDGE_CHECKOUT_WEEK_URL; a leftover monthly env is ignored", () => {
  const env = { VITE_EDGE_CHECKOUT_URL: "https://example.com/edge-month" } as Record<string, string>;
  assert.equal(edgeCheckoutUrl("week", env), null);
  assert.equal(edgeCheckoutHref("week", env), EDGE_CHECKOUT_PENDING);
  assert.equal(edgeCheckoutLive("week", env), false);
  const both = { ...env, VITE_EDGE_CHECKOUT_WEEK_URL: "https://example.com/edge-week" };
  assert.equal(edgeCheckoutUrl("week", both), "https://example.com/edge-week");
  assert.equal(edgeCheckoutHref(undefined, both), "https://example.com/edge-week");
});

test("blank or junk week env stays pending", () => {
  for (const week of ["", "   ", "#checkout-pending", "/edge"]) {
    const env = { VITE_EDGE_CHECKOUT_WEEK_URL: week };
    assert.equal(edgeCheckoutUrl("week", env), null);
    assert.equal(edgeCheckoutHref("week", env), EDGE_CHECKOUT_PENDING);
    assert.equal(edgeCheckoutLive("week", env), false);
  }
});
