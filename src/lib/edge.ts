/**
 * HX Edge Pack — public monetization surface.
 * Checkout URLs are Stripe Payment Links from env when they exist:
 *   VITE_EDGE_CHECKOUT_URL       monthly ($15/mo) only
 *   VITE_EDGE_CHECKOUT_WEEK_URL  week sample ($5) only — never fall back to monthly
 * Never invent a payment link. Unset → #checkout-pending.
 */

export const EDGE_CHECKOUT_PENDING = "#checkout-pending";

export const EDGE_SUPPORT_EMAIL = "hello@hashmarkcfb.com";

export const EDGE = {
  name: "HX Edge Pack",
  shortName: "Edge Pack",
  weekPrice: "$5",
  weekLabel: "$5 Week sample",
  monthPrice: "$15/mo",
  monthLabel: "$15/mo",
  supportEmail: EDGE_SUPPORT_EMAIL,
} as const;

export type EdgeCheckoutKind = "week" | "month";

export type EdgeCheckoutEnv = {
  VITE_EDGE_CHECKOUT_URL?: string | undefined;
  VITE_EDGE_CHECKOUT_WEEK_URL?: string | undefined;
};

function readCheckoutEnv(): EdgeCheckoutEnv {
  return ((import.meta as { env?: EdgeCheckoutEnv }).env ?? {}) as EdgeCheckoutEnv;
}

/** Accept only absolute http(s) URLs. Empty, hash, or junk → unset. */
export function resolveCheckoutUrl(raw: string | undefined | null): string | null {
  const value = raw?.trim() ?? "";
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

export function edgeCheckoutUrl(
  kind: EdgeCheckoutKind = "month",
  env: EdgeCheckoutEnv = readCheckoutEnv(),
): string | null {
  if (kind === "week") {
    return resolveCheckoutUrl(env.VITE_EDGE_CHECKOUT_WEEK_URL);
  }
  return resolveCheckoutUrl(env.VITE_EDGE_CHECKOUT_URL);
}

export function edgeCheckoutHref(
  kind: EdgeCheckoutKind = "month",
  env: EdgeCheckoutEnv = readCheckoutEnv(),
): string {
  return edgeCheckoutUrl(kind, env) ?? EDGE_CHECKOUT_PENDING;
}

export function edgeCheckoutLive(
  kind: EdgeCheckoutKind = "month",
  env: EdgeCheckoutEnv = readCheckoutEnv(),
): boolean {
  return edgeCheckoutUrl(kind, env) != null;
}
