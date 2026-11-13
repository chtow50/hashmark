import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { canonicalUrl, seo } from "./seo.ts";

const ROUTES = new URL("../routes/", import.meta.url);

describe("seo", () => {
  it("canonical drops query/hash and trailing slash; root keeps its slash", () => {
    assert.equal(canonicalUrl("/"), "https://hashmarkcfb.com/");
    assert.equal(canonicalUrl("/rankings?sort=hx"), "https://hashmarkcfb.com/rankings");
    assert.equal(canonicalUrl("/teams/ucla/"), "https://hashmarkcfb.com/teams/ucla");
  });
  it("emits title, description, og and twitter tags plus one canonical", () => {
    const h = seo({ path: "/model", title: "T", description: "D" });
    const keys = h.meta.map((m) => ("title" in m ? "title" : (m as { name?: string; property?: string }).name ?? (m as { property?: string }).property));
    for (const k of ["title", "description", "og:title", "og:description", "og:url", "twitter:title", "twitter:description"]) {
      assert.ok(keys.includes(k), k);
    }
    assert.deepEqual(h.links, [{ rel: "canonical", href: "https://hashmarkcfb.com/model" }]);
  });
  it("root sets no canonical or og:url; every page route uses seo()", () => {
    const root = readFileSync(new URL("__root.tsx", ROUTES), "utf8");
    assert.doesNotMatch(root, /rel: "canonical"/);
    assert.doesNotMatch(root, /og:url/);
    const pages = readdirSync(ROUTES).filter((f) => f.endsWith(".tsx") && f !== "__root.tsx");
    for (const f of pages) {
      const src = readFileSync(new URL(f, ROUTES), "utf8");
      if (/throw redirect\(/.test(src) && !/component:/.test(src)) continue; // redirect-only routes
      assert.match(src, /seo\(\{/, `${f} must set per-route head via seo()`);
    }
  });
});
