/**
 * Guard: game-writing migrations must match a game by its exact home/away slugs.
 * Early migrations matched "(h='x' and a='y') or (h='y' and a='x')"; a swapped pair can
 * silently stamp a score onto the wrong side. Grandfathered through LAST_EITHER_DIRECTION;
 * everything after must name home and away exactly once per statement.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { MIGRATIONS_DIR, migrationFiles } from "./replay-migrations.mjs";

const LAST_EITHER_DIRECTION = 53;

const stripComments = (sql) => sql.replace(/--.*$/gm, "");

/** Statements (split on ;) that match the same slug pair in both directions, or IN-lists on both sides. */
export function eitherDirectionStatements(sql) {
  const bad = [];
  for (const stmt of stripComments(sql).split(";")) {
    const pairs = [...stmt.matchAll(/(\w+)\.slug\s*=\s*'([^']+)'\s+and\s+(\w+)\.slug\s*=\s*'([^']+)'/gi)].map(
      (m) => `${m[2]}|${m[4]}`,
    );
    const set = new Set(pairs);
    const swapped = pairs.some((p) => {
      const [x, y] = p.split("|");
      return x !== y && set.has(`${y}|${x}`);
    });
    const inBoth = /\bh\w*\.slug\s+in\s*\(/i.test(stmt) && /\ba\w*\.slug\s+in\s*\(/i.test(stmt);
    if (swapped || inBoth) bad.push(stmt.trim().slice(0, 160));
  }
  return bad;
}

describe("migration guard: no either-direction slug matches", () => {
  it("detector catches the old pattern and passes an exact match", () => {
    const old = "update games g set home_score=1 from teams h, teams a where g.home_team_id=h.id and g.away_team_id=a.id and ((h.slug = 'lsu' and a.slug = 'clemson') or (h.slug = 'clemson' and a.slug = 'lsu'));";
    assert.equal(eitherDirectionStatements(old).length, 1);
    const inList = "update games g set x=1 from teams h, teams a where h.slug in ('lsu','clemson') and a.slug in ('lsu','clemson');";
    assert.equal(eitherDirectionStatements(inList).length, 1);
    const exact = "update games g set home_score=1 from teams h, teams a where h.slug = 'lsu' and a.slug = 'clemson';\n-- or (h.slug = 'clemson' and a.slug = 'lsu')";
    assert.equal(eitherDirectionStatements(exact).length, 0);
  });

  it(`no migration after ${String(LAST_EITHER_DIRECTION).padStart(4, "0")} matches a game in either direction`, () => {
    const offenders = [];
    for (const f of migrationFiles()) {
      if (Number(f.slice(0, 4)) <= LAST_EITHER_DIRECTION) continue;
      const bad = eitherDirectionStatements(readFileSync(join(MIGRATIONS_DIR, f), "utf8"));
      if (bad.length) offenders.push(`${f}: ${bad[0]}`);
    }
    assert.deepEqual(offenders, []);
  });
});
