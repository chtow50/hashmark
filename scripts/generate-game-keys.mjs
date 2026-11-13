#!/usr/bin/env node
/**
 * Build-time list of /games/<key> URLs for FINALs: data/game_keys_2026.json.
 * Source is the committed migrations replayed into an in-memory PGLite (the same
 * files the deploy applies), so the build never needs the production database.
 * Key = gameKey(kickoff_date, away, home), matching src/lib/cfb/game-key.ts.
 *
 *   node scripts/generate-game-keys.mjs          # write
 *   node scripts/generate-game-keys.mjs --check  # exit 1 if the committed file is stale
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { isMigrationFile } from "./migration-plan.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const GAME_KEYS_PATH = join(ROOT, "data/game_keys_2026.json");

export async function finalGameKeys() {
  const dir = join(ROOT, "migrations");
  const db = new PGlite();
  try {
    for (const f of readdirSync(dir).filter(isMigrationFile).sort()) {
      await db.exec(readFileSync(join(dir, f), "utf8"));
    }
    const r = await db.query(
      `select g.kickoff_date::text as d, ht.slug as home, at.slug as away
       from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id
       where g.status = 'final' and g.home_score is not null and g.away_score is not null
       order by g.kickoff_date, at.slug, ht.slug`,
    );
    return r.rows.map((x) => `${String(x.d).slice(0, 10)}-${x.away}-at-${x.home}`);
  } finally {
    await db.close();
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const keys = await finalGameKeys();
  const json = JSON.stringify({ source: "migrations/*.sql replay (status=final)", keys }, null, 0) + "\n";
  if (process.argv.includes("--check")) {
    if (readFileSync(GAME_KEYS_PATH, "utf8") !== json) {
      console.error("[game-keys] data/game_keys_2026.json is stale — run node scripts/generate-game-keys.mjs");
      process.exit(1);
    }
    console.log("[game-keys] OK");
  } else {
    writeFileSync(GAME_KEYS_PATH, json);
    console.log(`[game-keys] wrote ${keys.length} FINAL game keys → data/game_keys_2026.json`);
  }
}
