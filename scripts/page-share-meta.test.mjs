import assert from "node:assert/strict";
import { test } from "node:test";
import { injectGrokPwaHead } from "./grok-pwa-shared.mjs";

const page =
  '<html><head><title>Ohio State · HASHMARK</title>' +
  '<meta property="og:title" content="Ohio State Buckeyes · HX">' +
  '<meta property="og:description" content="HX rank &amp; schedule">' +
  '<meta property="og:image" content="https://hashmarkcfb.com/og/teams/ohio-state.jpg">' +
  '<meta property="og:url" content="https://hashmarkcfb.com/teams/ohio-state">' +
  '<meta name="twitter:image" content="https://hashmarkcfb.com/og/teams/ohio-state.jpg"></head><body></body></html>';
const site = { title: "HASHMARK", card: "custom", image: "/og.jpg", pageShareMeta: true };
const count = (html, key) => html.split(`="${key}"`).length - 1;

test("pageShareMeta: page og/twitter tags win, once each", () => {
  const out = injectGrokPwaHead(page, { site, host: "hashmarkcfb.com", cwd: "/nonexistent" });
  assert.match(out, /property="og:title" content="Ohio State Buckeyes · HX"/);
  assert.match(out, /property="og:image" content="https:\/\/hashmarkcfb\.com\/og\/teams\/ohio-state\.jpg"/);
  assert.match(out, /property="og:description" content="HX rank &amp; schedule"/);
  assert.match(out, /property="og:url" content="https:\/\/hashmarkcfb\.com\/teams\/ohio-state"/);
  for (const k of ["og:title", "og:image", "og:description", "og:url", "twitter:image", "twitter:card"]) assert.equal(count(out, k), 1, k);
});

test("pageShareMeta: a page with no share tags gets the site card", () => {
  const out = injectGrokPwaHead("<html><head><title>X</title></head></html>", { site, host: "hashmarkcfb.com", cwd: "/nonexistent" });
  assert.match(out, /property="og:image" content="https:\/\/hashmarkcfb\.com\/og\.jpg"/);
  assert.match(out, /property="og:title" content="HASHMARK"/);
});

test("without pageShareMeta the platform still overwrites", () => {
  const out = injectGrokPwaHead(page, { site: { ...site, pageShareMeta: undefined }, host: "hashmarkcfb.com", cwd: "/nonexistent" });
  assert.match(out, /property="og:title" content="HASHMARK"/);
  assert.equal(count(out, "og:url"), 0);
});
