#!/usr/bin/env node
/**
 * Build-time sitemap: public/sitemap.xml (Vite copies public/ into .vercel/output/static).
 * Pages are listed here; stories come from src/lib/cfb/stories.ts and teams from the
 * current HX refit board (data/hx_refit_2026.json, all 138 FBS), and FINAL game pages from
 * data/game_keys_2026.json (written just before this by scripts/generate-game-keys.mjs).
 * Edge is paused — no /edge URLs.
 *
 *   node scripts/generate-sitemap.mjs          # write
 *   node scripts/generate-sitemap.mjs --check  # exit 1 if the committed file is stale
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { STORIES } from "../src/lib/cfb/stories.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const SITE = "https://hashmarkcfb.com";
export const SITEMAP_PATH = join(ROOT, "public/sitemap.xml");

export const STATIC_PATHS = [
  "",
  "/schedule",
  "/stories",
  "/rankings",
  "/matchup",
  "/recruiting",
  "/talent",
  "/stats",
  "/stats?tab=qb",
  "/stats?tab=rush",
  "/stats?tab=rec",
  "/stats?tab=def",
  "/conferences",
  "/strength",
  "/accuracy",
  "/model",
  "/talent?board=size",
  "/recruiting?year=2023",
  "/recruiting?year=2024",
  "/recruiting?year=2025",
  "/recruiting?year=2026",
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function sitemapPaths() {
  const board = JSON.parse(readFileSync(join(ROOT, "data/hx_refit_2026.json"), "utf8")).board;
  const teams = [...board].sort((a, b) => a.rank - b.rank).map((t) => `/teams/${t.slug}`);
  const stories = STORIES.map((s) => `/stories/${s.slug}`);
  const games = JSON.parse(readFileSync(join(ROOT, "data/game_keys_2026.json"), "utf8")).keys.map((k) => `/games/${k}`);
  return [...STATIC_PATHS, ...stories, ...teams, ...games];
}

export function buildSitemap(paths = sitemapPaths()) {
  const lines = paths.map((p) => `  <url><loc>${esc(SITE + p)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join("\n")}\n</urlset>\n`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const xml = buildSitemap();
  if (process.argv.includes("--check")) {
    const cur = readFileSync(SITEMAP_PATH, "utf8");
    if (cur !== xml) {
      console.error("[sitemap] public/sitemap.xml is stale — run node scripts/generate-sitemap.mjs");
      process.exit(1);
    }
    console.log("[sitemap] OK");
  } else {
    writeFileSync(SITEMAP_PATH, xml);
    console.log(`[sitemap] wrote ${xml.split("<url>").length - 1} URLs → public/sitemap.xml`);
  }
}
