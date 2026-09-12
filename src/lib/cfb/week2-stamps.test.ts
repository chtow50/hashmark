import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { chicagoCivilToIso, formatKickCt } from "./chicago.ts";
import { favoriteLine } from "./featured.ts";
import { parseSqlStampsForWeek, readMigrationsSql } from "./fcs-fbs-stamp-gate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const payload = JSON.parse(
  readFileSync(join(root, "data/week2_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: { n_games: number; n_with_vegas: number; n_blank_vegas: number };
  featured_pick: { espn_event_id: string; matchup: string; tv: string; vegas_details: string; kick_ct: string };
  games: Array<{
    espn_event_id: string;
    kick_ct: string;
    home_location: string;
    away_location: string;
    home_short: string;
    away_short: string;
    tv: string;
    vegas_details: string;
    vegas_spread: number | null;
    vegas_ou: number | null;
  }>;
};

const sql = readFileSync(join(root, "migrations/0024_week2_kick_tv_vegas.sql"), "utf8");

function game(id: string) {
  return payload.games.find((g) => g.espn_event_id === id);
}

describe("Week 2 FBS–FBS Research stamps", () => {
  it("covers 47 games, all with Vegas, none blank", () => {
    assert.equal(payload.meta.n_games, 47);
    assert.equal(payload.games.length, 47);
    assert.equal(payload.meta.n_with_vegas, 47);
    assert.equal(payload.meta.n_blank_vegas, 0);
    for (const g of payload.games) {
      assert.ok(g.kick_ct);
      assert.ok(g.tv);
      assert.ok(g.vegas_details);
      assert.notEqual(g.vegas_spread, null);
      assert.notEqual(g.vegas_ou, null);
    }
  });

  it("Ohio State @ Texas is Sat 6:30 CT · ABC · TEX −1.5 · ESPN 401856682", () => {
    const g = game("401856682");
    assert.ok(g);
    assert.match(g.away_location, /Ohio State/);
    assert.equal(g.home_location, "Texas");
    assert.equal(g.kick_ct, "2026-09-12 18:30");
    assert.equal(g.tv, "ABC");
    assert.equal(g.vegas_details, "TEX -1.5");
    const iso = chicagoCivilToIso(g.kick_ct);
    assert.equal(formatKickCt(iso), "6:30 CT");
    assert.equal(favoriteLine("Texas", "Ohio St", 1.5), "Texas −1.5");
    assert.match(sql, /Ohio State @ Texas/);
    assert.match(sql, /401856682/);
    assert.match(sql, /timestamptz '2026-09-12 18:30:00-05'/);
    assert.match(sql, /tv = 'ABC'/);
    assert.match(sql, /h\.slug = 'texas' then 1\.5 else -1\.5/);
    assert.equal(payload.featured_pick.espn_event_id, "401856682");
  });

  it("Oklahoma @ Michigan is Sat 11:00 CT · FOX · OU −5.5 · ESPN 401856679", () => {
    const g = game("401856679");
    assert.ok(g);
    assert.equal(g.away_location, "Oklahoma");
    assert.equal(g.home_location, "Michigan");
    assert.equal(g.kick_ct, "2026-09-12 11:00");
    assert.equal(g.tv, "FOX");
    assert.equal(g.vegas_details, "OU -5.5");
    const iso = chicagoCivilToIso(g.kick_ct);
    assert.equal(formatKickCt(iso), "11:00 CT");
    assert.equal(favoriteLine("Michigan", "Oklahoma", -5.5), "Oklahoma −5.5");
    assert.match(sql, /Oklahoma @ Michigan/);
    assert.match(sql, /401856679/);
    assert.match(sql, /timestamptz '2026-09-12 11:00:00-05'/);
    assert.match(sql, /h\.slug = 'michigan' then -5\.5 else 5\.5/);
  });

  it("Rutgers @ BC is Fri 6:30 CT · ESPN2 · BC −3.5 · ESPN 401858214", () => {
    const g = game("401858214");
    assert.ok(g);
    assert.equal(g.away_location, "Rutgers");
    assert.equal(g.home_location, "Boston College");
    assert.equal(g.kick_ct, "2026-09-11 18:30");
    assert.equal(g.tv, "ESPN2");
    assert.equal(g.vegas_details, "BC -3.5");
    const iso = chicagoCivilToIso(g.kick_ct);
    assert.equal(formatKickCt(iso), "6:30 CT");
    assert.equal(favoriteLine("BC", "Rutgers", 3.5), "BC −3.5");
    assert.match(sql, /Rutgers @ Boston College/);
    assert.match(sql, /401858214/);
    assert.match(sql, /timestamptz '2026-09-11 18:30:00-05'/);
    assert.match(sql, /tv = 'ESPN2'/);
    assert.match(sql, /h\.slug = 'boston-college' then 3\.5 else -3\.5/);
  });

  it("does not invent FCS HX and leaves Miami–FAMU in the FCS pack", () => {
    assert.doesNotMatch(sql, /florida a&m/i);
    assert.doesNotMatch(sql, /401858213/);
    const fcs = JSON.parse(
      readFileSync(join(root, "data/week2_fbs_fcs_spreads_2026.json"), "utf8"),
    ) as {
      games: Array<{
        espn_event_id: string;
        hx_spread: number | null;
        vegas_spread: number | null;
        status: string;
        home_score?: number | null;
        away_score?: number | null;
        ncaa_contest_id?: string | null;
        venue?: string | null;
      }>;
    };
    assert.equal(fcs.games.length, 39);
    const miami = fcs.games.find((g) => g.espn_event_id === "401858213");
    assert.ok(miami);
    assert.equal(miami.hx_spread, null);
    assert.equal(miami.vegas_spread, -59.5);
    assert.equal(miami.status, "STATUS_FINAL");
    assert.equal(miami.home_score, 77);
    assert.equal(miami.away_score, 7);
    assert.equal(miami.ncaa_contest_id, "6604311");
    assert.equal(miami.venue, "Hard Rock Stadium");
  });
});

describe("Week 2 Oklahoma @ Michigan FINAL (Research CLEAR)", () => {
  const finalSql = readFileSync(join(root, "migrations/0025_week2_oklahoma_michigan_final.sql"), "utf8");

  it("stamps only this FINAL: Michigan 17, Oklahoma 10 (home Michigan)", () => {
    assert.match(finalSql, /status = 'final'/);
    assert.match(finalSql, /home_score = 17/);
    assert.match(finalSql, /away_score = 10/);
    assert.match(finalSql, /g\.week = 2/);
    assert.match(finalSql, /h\.slug = 'michigan' and a\.slug = 'oklahoma'/);
    assert.match(finalSql, /h\.slug = 'oklahoma' and a\.slug = 'michigan'/);
    assert.doesNotMatch(finalSql, /home_score = (?!17\b)\d/);
    assert.doesNotMatch(finalSql, /away_score = (?!10\b)\d/);
  });

  it("does not restamp kick, TV, or Vegas (0024 stays)", () => {
    assert.doesNotMatch(finalSql, /kickoff_at/);
    assert.doesNotMatch(finalSql, /\btv\s*=/);
    assert.doesNotMatch(finalSql, /vegas_spread/);
    assert.doesNotMatch(finalSql, /vegas_total/);
    assert.match(sql, /Oklahoma @ Michigan/);
    assert.match(sql, /h\.slug = 'michigan' then -5\.5 else 5\.5/);
    assert.match(sql, /vegas_total = 43\.5/);
    assert.match(sql, /tv = 'FOX'/);
  });

  it("omits ESPN event digits so stamp-gate keeps 0024 kick/Vegas for this row", () => {
    assert.doesNotMatch(finalSql, /401\d{6,}/);
    const week2 = parseSqlStampsForWeek(readMigrationsSql(root), 2);
    assert.equal(week2.size, 47);
    assert.equal(week2.get("401856679")?.hasKick, true);
    assert.equal(week2.get("401856679")?.hasVegas, true);
  });
});

describe("Week 2 early-window FINALs (Research CLEAR pack)", () => {
  const earlySql = readFileSync(join(root, "migrations/0026_week2_early_window_finals.sql"), "utf8");
  const clear = JSON.parse(
    readFileSync(join(root, "data/week2_early_window_finals_clear_2026.json"), "utf8"),
  ) as {
    meta: { n_clear: number; n_hold: number };
    clear: Array<{ espn_event_id: string; home_score: number; away_score: number }>;
    hold: Array<{ espn_event_id: string }>;
    already_live: Array<{ espn_event_id: string }>;
  };

  it("covers 18 CLEAR games and 6 HOLD games from the Research pack", () => {
    assert.equal(clear.meta.n_clear, 18);
    assert.equal(clear.clear.length, 18);
    assert.equal(clear.meta.n_hold, 6);
    assert.equal(clear.hold.length, 6);
    assert.equal(clear.already_live[0]?.espn_event_id, "401858213");
  });

  it("reasserts OU–Michigan 17–10 and stamps ASU@TAMU 48–20 and Mizzou@Kansas 38–21", () => {
    assert.match(earlySql, /home_score = 17/);
    assert.match(earlySql, /away_score = 10/);
    assert.match(earlySql, /h\.slug = 'michigan' and a\.slug = 'oklahoma'/);
    assert.match(earlySql, /home_score = 48/);
    assert.match(earlySql, /away_score = 20/);
    assert.match(earlySql, /h\.slug = 'texas-am' and a\.slug = 'arizona-state'/);
    assert.match(earlySql, /home_score = 21/);
    assert.match(earlySql, /away_score = 38/);
    assert.match(earlySql, /h\.slug = 'kansas' and a\.slug = 'missouri'/);
  });

  it("does not stamp HOLD FBS–FBS (Oregon @ Oklahoma State, WKU @ Georgia)", () => {
    assert.doesNotMatch(earlySql, /slug = 'oklahoma-state'/);
    assert.doesNotMatch(earlySql, /slug = 'oregon'/);
    assert.doesNotMatch(earlySql, /slug = 'western-kentucky'/);
    assert.doesNotMatch(earlySql, /slug = 'georgia'/);
  });

  it("does not restamp kick, TV, or Vegas, and omits ESPN digits", () => {
    assert.doesNotMatch(earlySql, /kickoff_at/);
    assert.doesNotMatch(earlySql, /\btv\s*=/);
    assert.doesNotMatch(earlySql, /vegas_spread/);
    assert.doesNotMatch(earlySql, /vegas_total/);
    assert.doesNotMatch(earlySql, /401\d{6,}/);
    const week2 = parseSqlStampsForWeek(readMigrationsSql(root), 2);
    assert.equal(week2.size, 47);
    assert.equal(week2.get("401856683")?.hasKick, true);
    assert.equal(week2.get("401856683")?.hasVegas, true);
    assert.equal(week2.get("401856678")?.hasKick, true);
    assert.equal(week2.get("401856782")?.hasKick, true);
    assert.equal(week2.get("401856673")?.hasKick, true);
  });
});
