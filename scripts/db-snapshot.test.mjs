import { test } from "node:test";
import assert from "node:assert/strict";
import { copyFileSync, mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { PGlite } from "@electric-sql/pglite";
import {
  MAX_TAIL,
  SNAPSHOT_FILE,
  SNAPSHOT_META,
  SNAPSHOT_START_PARAMS,
  SNAPSHOT_VERSION,
  migrationManifest,
  snapshotTail,
} from "./db-snapshot-shared.mjs";
import { isMigrationFile } from "./migration-plan.mjs";

const BUILD = new URL("./build-db-snapshot.mjs", import.meta.url).pathname;
const MIG = new URL("../migrations/", import.meta.url).pathname;
const a = [["0001_a.sql", "create table t (x int);"], ["0002_b.sql", "insert into t values (1);"]];
const meta = (entries) => ({ version: SNAPSHOT_VERSION, migrations: migrationManifest(entries) });

test("snapshot is used only as an exact prefix of the deployed migrations", () => {
  const bundled = migrationManifest(a);
  assert.equal(snapshotTail(meta(a), bundled), 0);
  assert.equal(snapshotTail(meta([...a].reverse()), bundled), 0, "order of input does not matter");
  // A nightly stamp adds 0003: the snapshot still loads and only 0003 replays.
  assert.equal(snapshotTail(meta(a), migrationManifest([...a, ["0003_c.sql", "select 1;"]])), 1);
  // An edited, removed or back-dated migration disables the snapshot.
  assert.equal(snapshotTail(meta(a), migrationManifest([a[0], ["0002_b.sql", "insert into t values (2);"]])), null);
  assert.equal(snapshotTail(meta(a), migrationManifest([a[0]])), null);
  assert.equal(snapshotTail(meta(a), migrationManifest([...a, ["0001b_x.sql", "select 1;"]])), null);
  assert.equal(snapshotTail({ ...meta(a), version: 1 }, bundled), null);
  assert.equal(snapshotTail(null, bundled), null);
});

test("db.ts falls back to replaying every migration when the snapshot does not fit", () => {
  const src = readFileSync(new URL("../src/lib/db.ts", import.meta.url), "utf8");
  assert.match(src, /if \(tail === null\) \{[^}]*return null;/);
  assert.match(src, /loadDataDir: snapshot\.data/);
  assert.match(src, /snapshot load failed, replaying migrations/);
});

test("snapshot round-trips every migration, reuses itself, and lets a process exit", { timeout: 180_000 }, async () => {
  const out = mkdtempSync(join(tmpdir(), "hx-snap-"));
  const snapDir = mkdtempSync(join(tmpdir(), "hx-snap-src-"));
  execFileSync(process.execPath, [BUILD, out, snapDir], { stdio: "pipe" });
  const files = readdirSync(MIG).filter(isMigrationFile);
  const m = JSON.parse(readFileSync(join(out, SNAPSHOT_META), "utf8"));
  assert.equal(snapshotTail(m, migrationManifest(files.map((f) => [f, readFileSync(join(MIG, f), "utf8")]))), 0);
  const before = readFileSync(join(out, SNAPSHOT_FILE));
  const again = execFileSync(process.execPath, [BUILD, out, snapDir], { encoding: "utf8" });
  assert.match(again, /reuse/);
  assert.ok(readFileSync(join(out, SNAPSHOT_FILE)).equals(before), "reuse leaves the committed tarball untouched");
  assert.ok(MAX_TAIL >= 1);

  const pg = new PGlite({
    loadDataDir: new Blob([before]),
    startParams: [...PGlite.defaultStartParams, ...SNAPSHOT_START_PARAMS],
  });
  const { rows } = await pg.query("select count(*)::int n from _migrations");
  assert.equal(rows[0].n, files.length);
  await pg.close();

  // A process holding a snapshot-loaded instance must still exit on its own.
  copyFileSync(join(out, SNAPSHOT_FILE), join(out, "s.tgz"));
  const probe = `import { PGlite } from "@electric-sql/pglite"; import { readFileSync } from "node:fs";
    const pg = new PGlite({ loadDataDir: new Blob([readFileSync(${JSON.stringify(join(out, "s.tgz"))})]),
      startParams: [...PGlite.defaultStartParams, ...${JSON.stringify(SNAPSHOT_START_PARAMS)}] });
    await pg.query("select 1");`;
  execFileSync(process.execPath, ["--input-type=module", "-e", probe], {
    cwd: new URL("..", import.meta.url).pathname,
    timeout: 30_000,
  });
});
