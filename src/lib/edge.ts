/**
 * HX Edge Pack — paused (2026-10-11).
 * Step 1 (2026-10-09) removed the recurring tier. Step 2 removes the week
 * sample buy: the Stripe Payment Link is deactivated and the site carries no
 * paid CTA, checkout env, or price. /edge is a short paused page that points
 * to the free board. /edge/unlock still serves the baked Week 6 rebuild for an
 * already-paid Checkout Session (server-side STRIPE_SECRET_KEY only).
 */

export const EDGE_SUPPORT_EMAIL = "hello@hashmarkcfb.com";

export const EDGE = {
  name: "HX Edge Pack",
  shortName: "Edge Pack",
  status: "paused",
  supportEmail: EDGE_SUPPORT_EMAIL,
} as const;
