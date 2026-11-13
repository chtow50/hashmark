#!/usr/bin/env node
/**
 * Build step: a prebuilt PGLite data dir for cold server instances.
 *
 * Replays migrations/*.sql into a fresh PGLite exactly as src/lib/db.ts does (same
 * _migrations DDL, one transaction per file, basename keys), dumps the data dir as a
 * gzip tarball next to the Vercel server function, and writes a sidecar listing the
 * baked migrations. Cold instances load it in ~0.5 s instead of replaying every file.
 *
 * The canonical copy lives in db-snapshot/ (committed; vite empties .vercel/output on
 * every build) and is copied next to the function, so git stores one blob. To keep git
 * small the build REUSES that snapshot while it is still an exact prefix of migrations/
 * with at most MAX_TAIL newer files (db.ts applies that tail at start); it rebuilds
 * when a baked migration changed, the tail grew past MAX_TAIL, the PGLite version
 * changed, or with --force.
 *
 *   node scripts/build-db-snapshot.mjs [--force] [functionDir] [snapshotDir]
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { pendingMigrations, isMigrationFile } from "./migration-plan.mjs";
import {
  MAX_TAIL,
  MIGRATIONS_TABLE_DDL,
  SNAPSHOT_FILE,
  SNAPSHOT_META,
  SNAPSHOT_VERSION,
  migrationManifest,
  snapshotTail,
} from "./db-snapshot-shared.mjs";

const args = process.argv.slice(2);
const force = args.includes("--force");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [fnArg, snapArg] = args.filter((a) => !a.startsWith("--"));
const outDir = fnArg ?? join(root, ".vercel/output/functions/__server.func");
const snapDir = snapArg ?? join(root, "db-snapshot");
if (!existsSync(outDir)) throw new Error(`[db-snapshot] function dir missing: ${outDir}`);
mkdirSync(snapDir, { recursive: true });
function ship() {
  copyFileSync(join(snapDir, SNAPSHOT_FILE), join(outDir, SNAPSHOT_FILE));
  copyFileSync(join(snapDir, SNAPSHOT_META), join(outDir, SNAPSHOT_META));
}

const pgliteVersion = JSON.parse(
  readFileSync(join(dirname(createRequire(import.meta.url).resolve("@electric-sql/pglite")), "../package.json"), "utf8"),
).version;
const dir = join(root, "migrations");
const files = readdirSync(dir).filter(isMigrationFile);
const sqlByName = Object.fromEntries(files.map((f) => [f, readFileSync(join(dir, f), "utf8")]));
const manifest = migrationManifest(Object.entries(sqlByName));

const metaPath = join(snapDir, SNAPSHOT_META);
const tarPath = join(snapDir, SNAPSHOT_FILE);
if (!force && existsSync(metaPath) && existsSync(tarPath)) {
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  const tail = snapshotTail(meta, manifest);
  if (tail !== null && tail <= MAX_TAIL && meta.pglite === pgliteVersion) {
    ship();
    console.log(`[db-snapshot] reuse: ${meta.migrations.length} baked + ${tail} applied at start (rebuild after ${MAX_TAIL})`);
    process.exit(0);
  }
}

const t0 = performance.now();
const pg = new PGlite();
await pg.waitReady;
await pg.exec(MIGRATIONS_TABLE_DDL);
for (const { name } of pendingMigrations(files, [])) {
  await pg.transaction(async (tx) => {
    await tx.exec(sqlByName[name]);
    await tx.query("insert into _migrations (name) values ($1)", [name]);
  });
}
await pg.exec("checkpoint");
const blob = await pg.dumpDataDir("gzip");
await pg.close();
const buf = Buffer.from(await blob.arrayBuffer());
writeFileSync(tarPath, buf);
writeFileSync(
  metaPath,
  JSON.stringify({ version: SNAPSHOT_VERSION, pglite: pgliteVersion, bytes: buf.length, migrations: manifest }, null, 0) + "\n",
);
ship();
console.log(
  `[db-snapshot] ${files.length} migrations → ${SNAPSHOT_FILE} (${(buf.length / 1048576).toFixed(1)} MB, ${Math.round(performance.now() - t0)} ms)`,
);
process.exit(0);
