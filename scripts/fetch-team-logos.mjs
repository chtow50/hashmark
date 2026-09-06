#!/usr/bin/env node
/**
 * Fetch FBS team logos from ESPN CDN into public/logos/{slug}.png.
 *
 * Usage:
 *   node scripts/fetch-team-logos.mjs              # all ids in TEAM_LOGO_ESPN_IDS
 *   node scripts/fetch-team-logos.mjs texas ohio-state  # explicit slugs
 *
 * To reach full 136 FBS:
 * 1. Copy slug → ESPN id pairs from https://github.com/nickmillerdotnow/sports-ids
 *    or ESPN's team directory into src/lib/cfb/team-logos.ts (TEAM_LOGO_ESPN_IDS).
 * 2. Run this script — it skips files that already exist unless --force.
 * 3. Commit new PNGs + registry update.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logosDir = path.join(root, "public", "logos");
const registryPath = path.join(root, "src", "lib", "cfb", "team-logos.ts");

const force = process.argv.includes("--force");
const slugArgs = process.argv.slice(2).filter((a) => !a.startsWith("--"));

async function loadRegistry() {
  const src = await readFile(registryPath, "utf8");
  const map = {};
  for (const m of src.matchAll(/"([a-z0-9-]+)":\s*(\d+)/g)) {
    map[m[1]] = Number(m[2]);
  }
  return map;
}

async function fetchOne(slug, id) {
  const dest = path.join(logosDir, `${slug}.png`);
  if (!force && existsSync(dest)) {
    console.log(`skip ${slug} (exists)`);
    return true;
  }
  const url = `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${slug} (${id}): HTTP ${res.status}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`OK ${slug}`);
  return true;
}

const registry = await loadRegistry();
const slugs = slugArgs.length ? slugArgs : Object.keys(registry);
await mkdir(logosDir, { recursive: true });

let ok = 0;
let fail = 0;
for (const slug of slugs) {
  const id = registry[slug];
  if (!id) {
    console.error(`no ESPN id for ${slug}`);
    fail++;
    continue;
  }
  if (await fetchOne(slug, id)) ok++;
  else fail++;
}

console.log(`done: ${ok} ok, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
