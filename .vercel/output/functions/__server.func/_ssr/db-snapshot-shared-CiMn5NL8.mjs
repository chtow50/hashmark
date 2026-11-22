import { createHash } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/db-snapshot-shared-CiMn5NL8.js
/**
* Prebuilt PGLite snapshot, shared by the build step (scripts/build-db-snapshot.mjs)
* and the runtime loader (src/lib/db.ts).
*
* The sidecar JSON lists every migration baked into the tarball as [basename, sha256].
* A cold instance loads the tarball only when that list is an exact prefix of the
* migrations bundled into the server (same names, same text, same order); the normal
* migrate pass then applies just the newer tail. So a nightly stamp or Sunday refit
* that adds a migration is served correctly even before the snapshot is rebuilt, and
* an edited or removed migration makes the loader ignore the snapshot and replay
* everything, exactly as before.
*/
var SNAPSHOT_FILE = "hx-db-snapshot.tar.gz";
var SNAPSHOT_META = "hx-db-snapshot.json";
var SNAPSHOT_VERSION = 2;
/** The build regenerates the snapshot once this many migrations sit on top of it. */
var MAX_TAIL = 8;
var MIGRATIONS_TABLE_DDL = "create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())";
/**
* A loaded data dir starts through recovery, which arms a repeating 10 s
* startup-progress timer that keeps a Node process alive; switch it off.
*/
var SNAPSHOT_START_PARAMS = ["-c", "log_startup_progress_interval=0"];
/** @param {string} sql */
function sqlHash(sql) {
	return createHash("sha256").update(sql).digest("hex");
}
/**
* [basename, sha256] for each migration, in apply order (basename sort, as pendingMigrations).
* @param {Array<[string, string]>} entries [basename, sql]
* @returns {Array<[string, string]>}
*/
function migrationManifest(entries) {
	return [...entries].sort((a, b) => a[0].localeCompare(b[0])).map(([name, sql]) => [name, sqlHash(sql)]);
}
/** One hash for a whole manifest (logging, and a quick "anything changed?" check). */
function migrationsHash(entries) {
	return createHash("sha256").update(JSON.stringify(migrationManifest(entries))).digest("hex");
}
/**
* How many bundled migrations the snapshot does NOT contain, or null when the snapshot
* cannot be used (not an exact prefix: a migration was edited, removed or inserted
* before the newest baked one, or the sidecar is from another format).
* @param {unknown} meta parsed sidecar JSON
* @param {Array<[string, string]>} bundled migrationManifest of the deployed migrations
* @returns {number | null}
*/
function snapshotTail(meta, bundled) {
	const m = meta ?? {};
	if (m.version !== 2 || !Array.isArray(m.migrations)) return null;
	const baked = m.migrations;
	if (baked.length === 0 || baked.length > bundled.length) return null;
	for (let i = 0; i < baked.length; i++) if (!Array.isArray(baked[i]) || baked[i][0] !== bundled[i][0] || baked[i][1] !== bundled[i][1]) return null;
	return bundled.length - baked.length;
}
//#endregion
export { MAX_TAIL, MIGRATIONS_TABLE_DDL, SNAPSHOT_FILE, SNAPSHOT_META, SNAPSHOT_START_PARAMS, SNAPSHOT_VERSION, migrationManifest, migrationsHash, snapshotTail, sqlHash };
