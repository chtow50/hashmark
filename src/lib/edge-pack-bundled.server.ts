/**
 * Bundled Week 3 CLEARed pack. Server-only — never import from a route
 * component or any client module. Vite inlines these files into the
 * serverless bundle so Vercel does not need a runtime filesystem copy.
 */
import manifest from "../../data/edge-packs/current/manifest.json" with { type: "json" };
import packJson from "../../data/edge-packs/current/hx_edge_pack_week3_sample_thickened_2026.json" with { type: "json" };
import packMd from "../../data/edge-packs/current/hx_edge_pack_week3_sample_thickened_2026.md?raw";

export const bundledEdgePack = {
  manifest,
  markdown: packMd,
  json: packJson,
  mdName: "hx_edge_pack_week3_sample_thickened_2026.md",
  jsonName: "hx_edge_pack_week3_sample_thickened_2026.json",
} as const;
