import assert from "node:assert/strict";
import test from "node:test";
import {
  EDGE_CHECKOUT_PENDING,
  edgeCheckoutHref,
  edgeCheckoutLive,
  edgeCheckoutUrl,
  resolveCheckoutUrl,
} from "./edge.ts";

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

test("week checkout does not fall back to monthly when week env is unset", () => {
  const env = { VITE_EDGE_CHECKOUT_URL: "https://example.com/edge-month" };
  assert.equal(edgeCheckoutUrl("week", env), null);
  assert.equal(edgeCheckoutHref("week", env), EDGE_CHECKOUT_PENDING);
  assert.equal(edgeCheckoutLive("week", env), false);
  assert.equal(edgeCheckoutUrl("month", env), "https://example.com/edge-month");
  assert.equal(edgeCheckoutHref("month", env), "https://example.com/edge-month");
  assert.equal(edgeCheckoutLive("month", env), true);
});

test("blank or junk week env stays pending even if monthly is live", () => {
  const monthly = { VITE_EDGE_CHECKOUT_URL: "https://example.com/edge-month" };
  for (const week of ["", "   ", "#checkout-pending", "/edge"]) {
    const env = { ...monthly, VITE_EDGE_CHECKOUT_WEEK_URL: week };
    assert.equal(edgeCheckoutUrl("week", env), null);
    assert.equal(edgeCheckoutHref("week", env), EDGE_CHECKOUT_PENDING);
    assert.equal(edgeCheckoutLive("week", env), false);
  }
});

test("week and month use only their own env URLs when both are set", () => {
  const env = {
    VITE_EDGE_CHECKOUT_URL: "https://example.com/edge-month",
    VITE_EDGE_CHECKOUT_WEEK_URL: "https://example.com/edge-week",
  };
  assert.equal(edgeCheckoutUrl("week", env), "https://example.com/edge-week");
  assert.equal(edgeCheckoutUrl("month", env), "https://example.com/edge-month");
});
