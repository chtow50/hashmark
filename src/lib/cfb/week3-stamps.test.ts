import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { chicagoCivilToIso, formatKickCt, kickoffCivilYmd } from "./chicago.ts";
import { WEEK3_FEATURED, favoriteLine } from "./featured.ts";
import { countSeedFbsGamesForWeek } from "./fcs-fbs-stamp-gate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const payload = JSON.parse(
  readFileSync(join(root, "data/week3_stamp_compact_2026.json"), "utf8"),
) as {
  featured_hashmark_id: number;
  games: Array<{
    hashmark_id: number;
    away: string;
    home: string;
    matchup: string;
    kick_iso: string;
    kickoff_date: string;
    weekday: string;
    tv: string | null;
    vegas_spread: number;
    vegas_ou: number | null;
    vegas_label: string;
    neutral: boolean;
    clear_or_hold: "CLEAR" | "HOLD";
  }>;
};

const sql = readFileSync(join(root, "migrations/0029_week3_kick_tv_vegas.sql"), "utf8");

function game(id: number) {
  return payload.games.find((g) => g.hashmark_id === id);
}

function sqlBlock(id: number): string {
  const re = new RegExp(`(?:^--[^\\n]*\\n)+update games[\\s\\S]*?g\\.id = ${id}\\b[\\s\\S]*?g\\.week = 3;`, "m");
  const m = sql.match(re);
  assert.ok(m, `missing SQL block for hashmark_id ${id}`);
  return m[0];
}

describe("Week 3 FBS–FBS Research stamps", () => {
  it("covers 56 games, all with Vegas, two TV HOLDs only", () => {
    assert.equal(payload.games.length, 56);
    assert.equal(payload.featured_hashmark_id, 97);
    const holds = payload.games.filter((g) => g.clear_or_hold === "HOLD");
    const clears = payload.games.filter((g) => g.clear_or_hold === "CLEAR");
    assert.equal(holds.length, 2);
    assert.equal(clears.length, 54);
    assert.equal(payload.games.filter((g) => g.tv == null).length, 2);
    assert.equal(payload.games.filter((g) => g.vegas_spread == null).length, 0);
    for (const g of payload.games) {
      assert.ok(g.kick_iso);
      assert.ok(g.matchup);
      assert.notEqual(g.vegas_spread, null);
      if (g.clear_or_hold === "HOLD") assert.equal(g.tv, null);
      else assert.ok(g.tv);
    }
    assert.deepEqual(
      holds.map((g) => g.matchup).sort(),
      ["Colorado @ Northwestern", "Virginia Tech @ Maryland"],
    );
  });

  it("Syracuse @ Pittsburgh is Thu 18:30 CT · ESPN · PITT −10.5 · id 97", () => {
    const g = game(97);
    assert.ok(g);
    assert.equal(g.away, "Syracuse");
    assert.equal(g.home, "Pittsburgh");
    assert.equal(g.kick_iso, "2026-09-17T18:30:00-05:00");
    assert.equal(g.weekday, "Thu");
    assert.equal(g.tv, "ESPN");
    assert.equal(g.vegas_spread, -10.5);
    assert.equal(g.vegas_ou, 51.5);
    assert.equal(g.vegas_label, "PITT -10.5");
    const iso = chicagoCivilToIso("2026-09-17 18:30");
    assert.equal(iso, "2026-09-17T23:30:00.000Z");
    assert.equal(formatKickCt(iso), "6:30 CT");
    assert.equal(favoriteLine("Pitt", "Syracuse", 10.5), "Pitt −10.5");
    assert.equal(WEEK3_FEATURED.id, 97);
    assert.equal(WEEK3_FEATURED.homeSlug, "pittsburgh");
    assert.equal(WEEK3_FEATURED.awaySlug, "syracuse");
    const block = sqlBlock(97);
    assert.match(block, /timestamptz '2026-09-17 18:30:00-05'/);
    assert.match(block, /tv = 'ESPN'/);
    assert.match(block, /h\.slug = 'pittsburgh' then 10\.5 else -10\.5/);
    assert.match(block, /vegas_total = 51\.5/);
    assert.match(block, /g\.id = 97/);
  });

  it("Houston @ Texas Tech uses Fri 2026-09-18 from kick_iso, not pack 2026-09-19", () => {
    const g = game(99);
    assert.ok(g);
    assert.equal(g.kick_iso, "2026-09-18T19:00:00-05:00");
    assert.equal(g.weekday, "Fri");
    assert.equal(g.kickoff_date, "2026-09-19");
    assert.equal(kickoffCivilYmd(g.kick_iso, g.kickoff_date), "2026-09-18");
    const block = sqlBlock(99);
    assert.match(block, /kickoff_date = date '2026-09-18'/);
    assert.match(block, /timestamptz '2026-09-18 19:00:00-05'/);
    assert.match(block, /tv = 'FOX'/);
    assert.match(block, /h\.slug = 'texas-tech' then 7\.5 else -7\.5/);
    assert.match(block, /vegas_total = null/);
  });

  it("stamps stale Sep 20 date-only cards to Sat Sep 19 CT from kick_iso", () => {
    const stale = payload.games.filter((g) => g.kickoff_date === "2026-09-20");
    assert.equal(stale.length, 8);
    for (const g of stale) {
      assert.equal(g.kick_iso.startsWith("2026-09-19T"), true, g.matchup);
      assert.equal(kickoffCivilYmd(g.kick_iso, g.kickoff_date), "2026-09-19");
      assert.match(sqlBlock(g.hashmark_id), /kickoff_date = date '2026-09-19'/);
    }
  });

  it("sets neutral on Arizona State vs Kansas and West Virginia vs Virginia", () => {
    const asu = game(103);
    const wvu = game(141);
    assert.ok(asu && wvu);
    assert.equal(asu.neutral, true);
    assert.equal(wvu.neutral, true);
    assert.equal(payload.games.filter((g) => g.neutral).length, 2);
    assert.match(sqlBlock(103), /neutral = true/);
    assert.match(sqlBlock(141), /neutral = true/);
  });

  it("leaves TV null only on the two HOLDs and stamps their kick + Vegas", () => {
    const cu = sqlBlock(137);
    const vt = sqlBlock(139);
    assert.match(cu, /tv = null/);
    assert.match(vt, /tv = null/);
    assert.match(cu, /timestamptz '2026-09-19 18:30:00-05'/);
    assert.match(vt, /timestamptz '2026-09-19 18:30:00-05'/);
    assert.match(cu, /h\.slug = 'northwestern' then 3\.5 else -3\.5/);
    assert.match(vt, /h\.slug = 'maryland' then -3 else 3/);
    assert.equal((sql.match(/tv = null/g) ?? []).length, 2);
  });

  it("stamps all 56 by hashmark_id + week=3 and omits ESPN event digits", () => {
    const ids = payload.games.map((g) => g.hashmark_id).sort((a, b) => a - b);
    assert.deepEqual(ids, Array.from({ length: 56 }, (_, i) => 97 + i));
    for (const id of ids) {
      assert.match(sql, new RegExp(`g\\.id = ${id}`));
    }
    assert.equal((sql.match(/g\.week = 3;/g) ?? []).length, 56);
    assert.doesNotMatch(sql, /401\d{6,}/);
    assert.doesNotMatch(sql, /ESPN \d{6,}/);
    const seedN = countSeedFbsGamesForWeek(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"), 3);
    assert.equal(seedN, 56);
  });

  it("converts home-relative pack spreads to board (positive = home favored)", () => {
    assert.match(sqlBlock(98), /h\.slug = 'wake-forest' then -20\.5 else 20\.5/);
    assert.match(sqlBlock(143), /h\.slug = 'ole-miss' then -3 else 3/);
    assert.equal(game(98)?.vegas_spread, 20.5);
    assert.equal(game(143)?.vegas_spread, 3);
    assert.equal(favoriteLine("Wake Forest", "Miami", -20.5), "Miami −20.5");
    assert.equal(favoriteLine("Ole Miss", "LSU", -3), "LSU −3.0");
  });
});

describe("Week 3 Syracuse @ Pittsburgh FINAL", () => {
  const finalSql = readFileSync(join(root, "migrations/0032_week3_pitt_syracuse_final.sql"), "utf8");

  it("stamps Pittsburgh 27, Syracuse 13, status final, scores only", () => {
    assert.match(finalSql, /Syracuse @ Pittsburgh — Pittsburgh 27, Syracuse 13/);
    assert.match(finalSql, /status = 'final'/);
    assert.match(finalSql, /home_score = 27/);
    assert.match(finalSql, /away_score = 13/);
    assert.match(finalSql, /g\.week = 3/);
    assert.match(finalSql, /h\.slug = 'pittsburgh' and a\.slug = 'syracuse'/);
    assert.doesNotMatch(finalSql, /kickoff_at/);
    assert.doesNotMatch(finalSql, /vegas_spread/);
    assert.doesNotMatch(finalSql, /401\d{6,}/);
    assert.doesNotMatch(finalSql, /ESPN \d{6,}/);
  });
});
