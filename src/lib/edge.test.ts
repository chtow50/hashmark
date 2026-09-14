import assert from "node:assert/strict";
import test from "node:test";
import { resolveCheckoutUrl } from "./edge.ts";

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
