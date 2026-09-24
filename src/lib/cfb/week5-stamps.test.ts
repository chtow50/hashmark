import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { chicagoCivilToIso, formatKickCt } from "./chicago.ts";
import { BOARD_WEEK, FEATURED_SLATE_WEEK, WEEK5_FEATURED, favoriteLine } from "./featured.ts";
import { countSeedFbsGamesForWeek } from "./fcs-fbs-stamp-gate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const payload = JSON.parse(
  readFileSync(join(root, "data/week5_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: {
    as_of: string;
    n_games: number;
    n_with_vegas: number;
    n_blank_vegas: number;
    n_clear: number;
    n_hold: number;
    n_blank_tv: number;
    n_fri_sat_day_risks: number;
  };
  featured_pick: {
    matchup: string;
    kick_ct: string;
    tv: string;
    vegas_details: string;
    over_under: number;
    clear_or_hold: string;
  };
  games: Array<{
    espn_event_id: string;
    matchup: string;
    kick_ct: string;
    kick_iso: string;
    weekday: string;
    home_short: string;
    away_short: string;
    tv: string;
    vegas_details: string;
    vegas_spread: number | null;
    vegas_ou: number | null;
    over_under: number | null;
    clear_or_hold: "CLEAR" | "HOLD";
    hold_reasons?: string[];
    fri_sat_day_risk?: boolean;
    hashmark_kickoff_date: string | null;
    time_valid: boolean;
    neutral: boolean;
  }>;
};

const sql = readFileSync(join(root, "migrations/0036_week5_kick_tv_vegas.sql"), "utf8");

const EXCLUDED_ESPN = ["401862793", "401864515", "401862790", "401856706"];

function blankTv(tv: string | null | undefined): boolean {
  const v = String(tv ?? "").trim();
  return v === "" || v === "—" || v === "-" || v === "–";
}

function blankVegas(details: string | null | undefined): boolean {
  const v = String(details ?? "").trim();
  return v === "" || v === "—" || v === "-" || v === "–";
}

function sqlBlock(espnId: string): string {
  const re = new RegExp(
    `^--[^\\n]*ESPN ${espnId}\\nupdate games[\\s\\S]*?g\\.week = 5;`,
    "m",
  );
  const m = sql.match(re);
  assert.ok(m, `missing SQL block for ESPN ${espnId}`);
  return m[0];
}

function mag(n: number): string {
  const a = Math.abs(n);
  return Number.isInteger(a) ? String(a) : String(a);
}

describe("Week 5 FBS–FBS Research kick/TV/Vegas stamp", () => {
  it("covers 55 games, 6 CLEAR, 49 HOLD, 14 Vegas, 41 blank Vegas, 10 blank TV, 4 TBD kicks", () => {
    assert.equal(payload.meta.as_of, "2026-09-24 10:31");
    assert.equal(payload.meta.n_games, 55);
    assert.equal(payload.games.length, 55);
    assert.equal(payload.meta.n_clear, 6);
    assert.equal(payload.meta.n_hold, 49);
    assert.equal(payload.meta.n_with_vegas, 14);
    assert.equal(payload.meta.n_blank_vegas, 41);
    assert.equal(payload.meta.n_blank_tv, 10);
    assert.equal(payload.meta.n_fri_sat_day_risks, 6);
    assert.equal(payload.games.filter((g) => g.clear_or_hold === "CLEAR").length, 6);
    assert.equal(payload.games.filter((g) => g.clear_or_hold === "HOLD").length, 49);
    assert.equal(payload.games.filter((g) => blankTv(g.tv)).length, 10);
    assert.equal(payload.games.filter((g) => blankVegas(g.vegas_details)).length, 41);
    assert.equal(payload.games.filter((g) => g.time_valid === false).length, 4);
    assert.equal(payload.games.filter((g) => g.neutral).length, 0);
    assert.equal(payload.featured_pick.matchup, "Pittsburgh @ Virginia Tech");
    assert.equal(payload.featured_pick.clear_or_hold, "CLEAR");
    assert.equal(WEEK5_FEATURED.homeSlug, "virginia-tech");
    assert.equal(WEEK5_FEATURED.awaySlug, "pittsburgh");
    assert.equal(BOARD_WEEK, 4);
    assert.equal(FEATURED_SLATE_WEEK, 4);
  });

  it("stamps every sourced field from vegas_details, and leaves HOLD blanks null", () => {
    assert.equal((sql.match(/g\.week = 5;/g) ?? []).length, 55);
    assert.equal((sql.match(/neutral = false/g) ?? []).length, 55);
    assert.equal((sql.match(/tv = null/g) ?? []).length, 10);
    assert.doesNotMatch(sql, /neutral = true/);
    assert.doesNotMatch(sql, /home_score|away_score|hx_rating|BOARD_WEEK/);
    assert.doesNotMatch(sql, /espn_event_id/);
    for (const id of EXCLUDED_ESPN) assert.doesNotMatch(sql, new RegExp(id));

    for (const g of payload.games) {
      const block = sqlBlock(g.espn_event_id);
      const kickHold = g.time_valid === false;
      assert.equal(kickHold, (g.hold_reasons ?? []).includes("Kick"));
      if (kickHold) {
        assert.equal(g.kick_ct, "");
        assert.doesNotMatch(block, /kickoff_at/);
        assert.doesNotMatch(block, /kickoff_date/);
        assert.match(block, /tv = null/);
      } else {
        const [ymd, hm] = g.kick_ct.split(" ");
        assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
        assert.match(block, new RegExp(`kickoff_date = date '${ymd}'`));
        assert.equal(g.kick_iso, `${ymd}T${hm}:00-05:00`);
      }
      if (blankTv(g.tv)) assert.match(block, /tv = null/);
      else assert.match(block, new RegExp(`tv = '${g.tv.replace("+", "\\+")}'`));

      if (blankVegas(g.vegas_details)) {
        assert.equal(g.vegas_spread, null);
        assert.equal(g.over_under, null);
        assert.match(block, /vegas_spread = null/);
        assert.match(block, /vegas_total = null/);
      } else {
        const m = g.vegas_details.match(/^(.+?)\s+(-?\d+(?:\.\d+)?)$/);
        assert.ok(m, g.vegas_details);
        const fav = m[1];
        const line = Number(m[2]);
        assert.ok(line < 0);
        const homeFav = fav === g.home_short;
        const awayFav = fav === g.away_short;
        assert.equal(homeFav, !awayFav);
        const size = mag(line);
        const homeSlug = block.match(/h\.slug = '([^']+)' and a\.slug = '([^']+)'/);
        assert.ok(homeSlug);
        if (homeFav) {
          assert.match(block, new RegExp(`h\\.slug = '${homeSlug[1]}' then ${size} else -${size}`));
        } else {
          assert.match(block, new RegExp(`h\\.slug = '${homeSlug[1]}' then -${size} else ${size}`));
        }
        const ou = g.over_under ?? g.vegas_ou;
        assert.equal(ou, g.vegas_ou);
        assert.match(block, new RegExp(`vegas_total = ${ou}`));
        assert.notEqual(g.vegas_spread, null);
        const board = homeFav ? Math.abs(line) : -Math.abs(line);
        assert.equal(board, -(g.vegas_spread as number));
      }
    }

    const seedN = countSeedFbsGamesForWeek(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"), 5);
    assert.equal(seedN, 55);
    assert.match(sqlBlock("401864513"), /h\.slug = 'hawaii' and a\.slug = 'san-jose-state'/);
  });

  it("stamps the six CLEAR cards and the six ESPN CT day-risk kicks", () => {
    const clear: Array<[string, string, string, string, string, string]> = [
      ["401858245", "2026-10-02 18:00", "ESPN", "VT -5.5", "56.5", "h\\.slug = 'virginia-tech' then 5\\.5 else -5\\.5"],
      ["401858476", "2026-10-02 19:00", "FOX", "PSU -7", "48.5", "h\\.slug = 'northwestern' then -7 else 7"],
      ["401858474", "2026-10-03 11:00", "FOX", "MICH -8.5", "44.5", "h\\.slug = 'minnesota' then -8\\.5 else 8\\.5"],
      ["401858473", "2026-10-03 14:30", "CBS", "OSU -14", "44.5", "h\\.slug = 'iowa' then -14 else 14"],
      ["401856709", "2026-10-03 15:15", "SEC Network", "SC -7", "49.5", "h\\.slug = 'south-carolina' then 7 else -7"],
      ["401858478", "2026-10-03 18:30", "NBC", "USC -10", "57.5", "h\\.slug = 'usc' then 10 else -10"],
    ];
    for (const [id, kick, tv, details, ou, spread] of clear) {
      const g = payload.games.find((row) => row.espn_event_id === id);
      assert.ok(g);
      assert.equal(g.clear_or_hold, "CLEAR");
      assert.equal(g.kick_ct, kick);
      assert.equal(g.tv, tv);
      assert.equal(g.vegas_details, details);
      assert.equal(g.over_under, Number(ou));
      const block = sqlBlock(id);
      const [ymd, hm] = kick.split(" ");
      assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
      assert.match(block, new RegExp(`tv = '${tv}'`));
      assert.match(block, new RegExp(spread));
      assert.match(block, new RegExp(`vegas_total = ${ou}`));
    }

    const pittIso = chicagoCivilToIso("2026-10-02 18:00");
    assert.equal(pittIso, "2026-10-02T23:00:00.000Z");
    assert.equal(formatKickCt(pittIso), "6:00 CT");
    assert.equal(favoriteLine("Virginia Tech", "Pitt", 5.5), "Virginia Tech −5.5");
    assert.equal(favoriteLine("Northwestern", "Penn St", -7), "Penn St −7.0");
    assert.equal(favoriteLine("Minnesota", "Michigan", -8.5), "Michigan −8.5");
    assert.equal(favoriteLine("Iowa", "Ohio St", -14), "Ohio St −14.0");
    assert.equal(favoriteLine("S Carolina", "Kentucky", 7), "S Carolina −7.0");
    assert.equal(favoriteLine("USC", "Washington", 10), "USC −10.0");

    const risks: Array<[string, string, string]> = [
      ["401871049", "2026-10-01", "19:00"],
      ["401862786", "2026-10-01", "20:00"],
      ["401858476", "2026-10-02", "19:00"],
      ["401858477", "2026-10-03", "19:00"],
      ["401860921", "2026-10-03", "20:30"],
      ["401860900", "2026-10-03", "21:30"],
    ];
    assert.equal(payload.games.filter((g) => g.fri_sat_day_risk).length, 6);
    for (const [id, ymd, hm] of risks) {
      const g = payload.games.find((row) => row.espn_event_id === id);
      assert.ok(g);
      assert.equal(g.fri_sat_day_risk, true);
      assert.notEqual(g.hashmark_kickoff_date, ymd);
      const block = sqlBlock(id);
      assert.match(block, new RegExp(`kickoff_date = date '${ymd}'`));
      assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
    }

    for (const id of ["401856707", "401858249", "401858250", "401856705"]) {
      const g = payload.games.find((row) => row.espn_event_id === id);
      assert.ok(g);
      assert.equal(g.time_valid, false);
      assert.equal(g.clear_or_hold, "HOLD");
      assert.ok(!blankVegas(g.vegas_details));
      const block = sqlBlock(id);
      assert.doesNotMatch(block, /kickoff_at/);
      assert.match(block, /tv = null/);
      assert.match(block, /vegas_spread = case when/);
    }
  });
});
