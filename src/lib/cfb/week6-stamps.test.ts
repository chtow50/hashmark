import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { chicagoCivilToIso, formatKickCt } from "./chicago.ts";
import {
  BOARD_WEEK,
  FEATURED_SLATE_WEEK,
  WEEK5_FEATURED,
  WEEK6_FEATURED,
  favoriteLine,
} from "./featured.ts";
import { countSeedFbsGamesForWeek } from "./fcs-fbs-stamp-gate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const payload = JSON.parse(
  readFileSync(join(root, "data/week6_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
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

const sql = readFileSync(join(root, "migrations/0043_week6_kick_tv_vegas.sql"), "utf8");

/** FCS / non-HM cards Research excluded from the pack table. */
const EXCLUDED_ESPN = ["401866436", "401864518"];

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
    `^--[^\\n]*ESPN ${espnId}[^\\n]*\\nupdate games[\\s\\S]*?g\\.week = 6;`,
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

describe("Week 6 FBS–FBS Research kick/TV/Vegas stamp", () => {
  it("covers 56 games, 9 CLEAR, 47 HOLD, 12 Vegas, 44 blank Vegas, 9 blank TV, 4 TBD kicks", () => {
    assert.equal(payload.meta.as_of, "2026-10-01 10:15");
    assert.equal(payload.meta.n_games, 56);
    assert.equal(payload.games.length, 56);
    assert.equal(payload.meta.n_clear, 9);
    assert.equal(payload.meta.n_hold, 47);
    assert.equal(payload.meta.n_with_vegas, 12);
    assert.equal(payload.meta.n_blank_vegas, 44);
    assert.equal(payload.meta.n_blank_tv, 9);
    assert.equal(payload.meta.n_fri_sat_day_risks, 6);
    assert.equal(payload.games.filter((g) => g.clear_or_hold === "CLEAR").length, 9);
    assert.equal(payload.games.filter((g) => g.clear_or_hold === "HOLD").length, 47);
    assert.equal(payload.games.filter((g) => blankTv(g.tv)).length, 9);
    assert.equal(payload.games.filter((g) => blankVegas(g.vegas_details)).length, 44);
    assert.equal(payload.games.filter((g) => g.time_valid === false).length, 4);
    assert.equal(payload.games.filter((g) => g.neutral).length, 1);
    assert.equal(payload.featured_pick.matchup, "Iowa State @ BYU");
    assert.equal(payload.featured_pick.clear_or_hold, "CLEAR");
    assert.equal(WEEK6_FEATURED.homeSlug, "byu");
    assert.equal(WEEK6_FEATURED.awaySlug, "iowa-state");
    assert.equal(WEEK5_FEATURED.homeSlug, "virginia-tech");
    assert.equal(BOARD_WEEK, 6);
    assert.equal(FEATURED_SLATE_WEEK, 6);
  });

  it("stamps every sourced field from vegas_details, and leaves HOLD blanks null", () => {
    assert.equal((sql.match(/g\.week = 6;/g) ?? []).length, 56);
    assert.equal((sql.match(/neutral = false/g) ?? []).length, 55);
    assert.equal((sql.match(/neutral = true/g) ?? []).length, 1);
    assert.equal((sql.match(/tv = null/g) ?? []).length, 9);
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

      if (g.neutral) assert.match(block, /neutral = true/);
      else assert.match(block, /neutral = false/);
    }

    const seedN = countSeedFbsGamesForWeek(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"), 6);
    assert.equal(seedN, 56);
    assert.match(sqlBlock("401856808"), /h\.slug = 'arizona-state' and a\.slug = 'hawaii'/);
    assert.match(sqlBlock("401856717"), /neutral = true/);
  });

  it("stamps the nine CLEAR cards and the six ESPN CT day-risk kicks", () => {
    const clear: Array<[string, string, string, string, string, string]> = [
      ["401871090", "2026-10-06 19:00", "ESPN2", "TROY -8.5", "48.5", "h\\.slug = 'troy' then 8\\.5 else -8\\.5"],
      ["401871051", "2026-10-07 18:00", "CBSSN", "JXST -2.5", "48.5", "h\\.slug = 'kennesaw-state' then -2\\.5 else 2\\.5"],
      ["401856826", "2026-10-09 21:15", "ESPN", "BYU -14.5", "50.5", "h\\.slug = 'byu' then 14\\.5 else -14\\.5"],
      ["401858481", "2026-10-10 11:00", "FOX", "IU -9.5", "50.5", "h\\.slug = 'nebraska' then -9\\.5 else 9\\.5"],
      ["401856717", "2026-10-10 14:30", "ABC", "TEX -9.5", "41.5", "h\\.slug = 'oklahoma' then -9\\.5 else 9\\.5"],
      ["401858484", "2026-10-10 14:30", "CBS", "ORE -12.5", "60.5", "h\\.slug = 'oregon' then 12\\.5 else -12\\.5"],
      ["401856715", "2026-10-10 18:00", "ESPN", "LSU -10.5", "49.5", "h\\.slug = 'kentucky' then -10\\.5 else 10\\.5"],
      ["401856712", "2026-10-10 18:30", "ABC", "UGA -3", "54.5", "h\\.slug = 'alabama' then -3 else 3"],
      ["401858485", "2026-10-10 18:30", "NBC", "PSU -1.5", "58.5", "h\\.slug = 'penn-state' then 1\\.5 else -1\\.5"],
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

    const byuIso = chicagoCivilToIso("2026-10-09 21:15");
    assert.equal(byuIso, "2026-10-10T02:15:00.000Z");
    assert.equal(formatKickCt(byuIso), "9:15 CT");
    assert.equal(favoriteLine("BYU", "Iowa St", 14.5), "BYU −14.5");
    assert.equal(favoriteLine("Kennesaw St", "Jax State", -2.5), "Jax State −2.5");
    assert.equal(favoriteLine("Oklahoma", "Texas", -9.5), "Texas −9.5");
    assert.equal(favoriteLine("Alabama", "Georgia", -3), "Georgia −3.0");
    assert.equal(favoriteLine("Penn St", "USC", 1.5), "Penn St −1.5");

    const risks: Array<[string, string, string]> = [
      ["401871090", "2026-10-06", "19:00"],
      ["401858487", "2026-10-09", "20:00"],
      ["401860922", "2026-10-09", "20:00"],
      ["401864519", "2026-10-09", "20:00"],
      ["401856826", "2026-10-09", "21:15"],
      ["401860901", "2026-10-10", "21:30"],
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

    // Kick/TV HOLD with Vegas CLEAR
    for (const id of ["401856714", "401856716"]) {
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

    // Full HOLD
    for (const id of ["401869949", "401862798"]) {
      const g = payload.games.find((row) => row.espn_event_id === id);
      assert.ok(g);
      assert.equal(g.clear_or_hold, "HOLD");
      assert.ok(blankVegas(g.vegas_details));
      assert.ok(blankTv(g.tv));
      const block = sqlBlock(id);
      assert.doesNotMatch(block, /kickoff_at/);
      assert.match(block, /tv = null/);
      assert.match(block, /vegas_spread = null/);
    }

    // TV HOLD with Vegas (Iowa @ Washington)
    {
      const block = sqlBlock("401858487");
      assert.match(block, /tv = null/);
      assert.match(block, /timestamptz '2026-10-09 20:00:00-05'/);
      assert.match(block, /h\.slug = 'washington' then 1\.5 else -1\.5/);
      assert.match(block, /vegas_total = 41\.5/);
    }

    // Alt featured kick/TV only (USF @ UTSA)
    {
      const block = sqlBlock("401862794");
      assert.match(block, /tv = 'ESPN'/);
      assert.match(block, /timestamptz '2026-10-08 18:30:00-05'/);
      assert.match(block, /vegas_spread = null/);
    }
  });
});


const clearPack = JSON.parse(
  readFileSync(join(root, "data/week6_vegas_clear_pack_2026-10-05.json"), "utf8"),
) as {
  meta: {
    as_of: string;
    n_games: number;
    n_clear: number;
    n_hold: number;
    n_blank_vegas: number;
    n_with_ou: number;
    n_blank_tv: number;
    n_new_lines: number;
    n_moved_lines: number;
    n_kick_gains: number;
    n_tv_gains: number;
  };
  games: Array<{
    espn_id: string;
    away: string;
    home: string;
    matchup: string;
    kick_ct: string;
    weekday: string;
    tv: string;
    vegas_details: string;
    vegas_spread: number | null;
    ou: number | null;
    status: string;
    clear_or_hold: "CLEAR" | "HOLD";
    hold_reasons?: string[];
    change?: string;
    fri_sat_day_risk?: boolean;
    neutral?: boolean;
  }>;
  stamp_table: Array<{ espn_id: string; vegas_details: string; ou: number; status: string }>;
  holds: Array<{ espn_id: string; reasons: string[]; matchup: string }>;
};

const clearSql = readFileSync(
  join(root, "migrations/0048_week6_vegas_clear_2026_10_05.sql"),
  "utf8",
);

function clearBlock(espnId: string): string {
  const re = new RegExp(
    `^--[^\\n]*ESPN ${espnId}[^\\n]*\\nupdate games[\\s\\S]*?g\\.week = 6;`,
    "m",
  );
  const m = clearSql.match(re);
  assert.ok(m, `missing CLEAR SQL block for ESPN ${espnId}`);
  return m[0];
}

describe("Week 6 Oct 5 Vegas CLEAR refresh", () => {
  it("covers 56 games, 54 CLEAR, 2 HOLD, 1 blank Vegas, 1 blank TV", () => {
    assert.equal(clearPack.meta.as_of, "2026-10-05 09:27");
    assert.equal(clearPack.meta.n_games, 56);
    assert.equal(clearPack.games.length, 56);
    assert.equal(clearPack.stamp_table.length, 54);
    assert.equal(clearPack.meta.n_clear, 54);
    assert.equal(clearPack.meta.n_hold, 2);
    assert.equal(clearPack.meta.n_blank_vegas, 1);
    assert.equal(clearPack.meta.n_with_ou, 55);
    assert.equal(clearPack.meta.n_blank_tv, 1);
    assert.equal(clearPack.meta.n_new_lines, 43);
    assert.equal(clearPack.meta.n_moved_lines, 11);
    assert.equal(clearPack.meta.n_kick_gains, 4);
    assert.equal(clearPack.meta.n_tv_gains, 8);
    assert.equal(clearPack.games.filter((g) => g.clear_or_hold === "CLEAR").length, 54);
    assert.equal(clearPack.games.filter((g) => g.clear_or_hold === "HOLD").length, 2);
    assert.equal(clearPack.holds.length, 2);
    assert.equal(clearPack.holds[0]?.espn_id, "401858487");
    assert.equal(clearPack.holds[1]?.espn_id, "401856827");
    const ids = new Set(clearPack.games.map((g) => g.espn_id));
    assert.equal(ids.size, 56);
    const stampIds = new Set(clearPack.stamp_table.map((r) => r.espn_id));
    assert.equal(stampIds.has("401858487"), false);
    assert.equal(stampIds.has("401856827"), false);
    for (const row of clearPack.stamp_table) {
      const g = clearPack.games.find((x) => x.espn_id === row.espn_id);
      assert.ok(g);
      assert.equal(g.clear_or_hold, "CLEAR");
      assert.equal(row.vegas_details, g.vegas_details);
      assert.equal(row.ou, g.ou);
      assert.equal(row.status, "CLEAR");
    }
    assert.equal(WEEK6_FEATURED.homeSlug, "byu");
    assert.equal(WEEK6_FEATURED.awaySlug, "iowa-state");
    assert.equal(BOARD_WEEK, 6);
    assert.equal(FEATURED_SLATE_WEEK, 6);
  });

  it("maps vegas_details onto the home-favored board spread for every CLEAR+HOLD update", () => {
    const archive = payload.games;
    for (const g of clearPack.games) {
      const prior = archive.find((a) => a.espn_event_id === g.espn_id);
      assert.ok(prior, g.espn_id);
      assert.equal(g.home, prior.home_short);
      assert.equal(g.away, prior.away_short);
      const block = clearBlock(g.espn_id);
      const [ymd, hm] = g.kick_ct.split(" ");
      assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
      assert.match(block, new RegExp(`kickoff_date = date '${ymd}'`));

      const tvHold = (g.hold_reasons ?? []).includes("TV") || blankTv(g.tv);
      const vegasHold = (g.hold_reasons ?? []).includes("Vegas") || g.vegas_spread == null;

      if (tvHold) assert.match(block, /tv = null/);
      else assert.match(block, new RegExp(`tv = '${g.tv.replace("+", "\\+")}'`));

      if (vegasHold) {
        assert.match(block, /vegas_spread = null/);
        assert.match(block, /vegas_total = null/);
      } else {
        const m = g.vegas_details.match(/^(.+?)\s+(-?\d+(?:\.\d+)?)$/);
        assert.ok(m, g.vegas_details);
        const fav = m[1];
        const line = Number(m[2]);
        assert.ok(line < 0, g.vegas_details);
        // DraftKings abbrev can disagree with pack home/away short (AF vs AFA).
        // Prefer short match; fall back to pack home-perspective vegas_spread sign.
        let homeFav = fav === g.home;
        let awayFav = fav === g.away;
        if (homeFav === awayFav) {
          homeFav = (g.vegas_spread as number) < 0;
          awayFav = !homeFav;
        }
        assert.equal(homeFav, !awayFav, `${g.espn_id} ${g.vegas_details}`);
        const board = homeFav ? Math.abs(line) : -Math.abs(line);
        assert.equal(board, -(g.vegas_spread as number));
        const homeSlug = block.match(/h\.slug = '([^']+)' and a\.slug = '([^']+)'/);
        assert.ok(homeSlug);
        const size = mag(line);
        if (homeFav) {
          assert.match(block, new RegExp(`h\\.slug = '${homeSlug[1]}' then ${size} else -${size}`));
        } else {
          assert.match(block, new RegExp(`h\\.slug = '${homeSlug[1]}' then -${size} else ${size}`));
        }
        assert.match(block, new RegExp(`vegas_total = ${g.ou}`));
      }

      if (g.neutral) assert.match(block, /neutral = true/);
      else assert.match(block, /neutral = false/);
    }
    assert.equal((clearSql.match(/g\.week = 6;/g) ?? []).length, 56);
    assert.equal((clearSql.match(/neutral = true/g) ?? []).length, 1);
    assert.equal((clearSql.match(/tv = null/g) ?? []).length, 1);
    assert.equal((clearSql.match(/vegas_spread = null/g) ?? []).length, 1);
    assert.doesNotMatch(clearSql, /home_score|away_score|hx_rating|BOARD_WEEK/);
    assert.doesNotMatch(clearSql, /espn_event_id/);
  });

  it("restamps management priority, featured MOVED, and UGA@ALA flip", () => {
    const spots: Array<[string, string, string | null, string, string, string]> = [
      ["401856714", "2026-10-10 11:45", "SEC Network", "FLA -13.5", "62.5", "h\\.slug = 'florida' then 13\\.5 else -13\\.5"],
      ["401856716", "2026-10-10 11:00", "ABC", "MIZ -3.5", "48.5", "h\\.slug = 'missouri' then 3\\.5 else -3\\.5"],
      ["401856826", "2026-10-09 21:15", "ESPN", "BYU -10.5", "48.5", "h\\.slug = 'byu' then 10\\.5 else -10\\.5"],
      ["401871090", "2026-10-06 19:00", "ESPN2", "TROY -10.5", "49.5", "h\\.slug = 'troy' then 10\\.5 else -10\\.5"],
      ["401871051", "2026-10-07 18:00", "CBSSN", "JXST -3", "50.5", "h\\.slug = 'kennesaw-state' then -3 else 3"],
      ["401858481", "2026-10-10 11:00", "FOX", "IU -7.5", "52.5", "h\\.slug = 'nebraska' then -7\\.5 else 7\\.5"],
      ["401858484", "2026-10-10 14:30", "CBS", "ORE -11.5", "59.5", "h\\.slug = 'oregon' then 11\\.5 else -11\\.5"],
      ["401856717", "2026-10-10 14:30", "ABC", "TEX -8.5", "39.5", "h\\.slug = 'oklahoma' then -8\\.5 else 8\\.5"],
      ["401856715", "2026-10-10 18:00", "ESPN", "LSU -10", "54.5", "h\\.slug = 'kentucky' then -10 else 10"],
      ["401856712", "2026-10-10 18:30", "ABC", "ALA -1.5", "55.5", "h\\.slug = 'alabama' then 1\\.5 else -1\\.5"],
      ["401858485", "2026-10-10 18:30", "NBC", "PSU -1.5", "54.5", "h\\.slug = 'penn-state' then 1\\.5 else -1\\.5"],
    ];
    for (const [id, kick, tv, details, ou, spread] of spots) {
      const g = clearPack.games.find((row) => row.espn_id === id);
      assert.ok(g);
      assert.equal(g.clear_or_hold, "CLEAR");
      assert.equal(g.kick_ct, kick);
      assert.equal(g.tv, tv);
      assert.equal(g.vegas_details, details);
      assert.equal(g.ou, Number(ou));
      const block = clearBlock(id);
      const [ymd, hm] = kick.split(" ");
      assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
      assert.match(block, new RegExp(`tv = '${tv.replace("+", "\\+")}'`));
      assert.match(block, new RegExp(spread));
      assert.match(block, new RegExp(`vegas_total = ${ou}`));
    }

    // HOLD (TV) Iowa @ Washington — stamp kick + Vegas, leave tv null
    {
      const g = clearPack.games.find((row) => row.espn_id === "401858487");
      assert.ok(g);
      assert.equal(g.clear_or_hold, "HOLD");
      assert.deepEqual(g.hold_reasons, ["TV"]);
      assert.equal(g.kick_ct, "2026-10-09 20:00");
      assert.equal(g.vegas_details, "WASH -2.5");
      assert.equal(g.ou, 41.5);
      assert.equal(blankTv(g.tv), true);
      const block = clearBlock("401858487");
      assert.match(block, /timestamptz '2026-10-09 20:00:00-05'/);
      assert.match(block, /tv = null/);
      assert.match(block, /h\.slug = 'washington' then 2\.5 else -2\.5/);
      assert.match(block, /vegas_total = 41\.5/);
      assert.doesNotMatch(block, /FOX|FS1/);
    }

    // HOLD (Vegas) Kansas @ Utah — stamp kick + TV; leave Vegas blank
    {
      const g = clearPack.games.find((row) => row.espn_id === "401856827");
      assert.ok(g);
      assert.equal(g.clear_or_hold, "HOLD");
      assert.deepEqual(g.hold_reasons, ["Vegas"]);
      assert.equal(g.kick_ct, "2026-10-10 21:15");
      assert.equal(g.tv, "ESPN");
      assert.equal(g.vegas_spread, null);
      assert.equal(g.ou, null);
      const block = clearBlock("401856827");
      assert.match(block, /timestamptz '2026-10-10 21:15:00-05'/);
      assert.match(block, /tv = 'ESPN'/);
      assert.match(block, /vegas_spread = null/);
      assert.match(block, /vegas_total = null/);
    }

    assert.equal(favoriteLine("BYU", "Iowa St", 10.5), "BYU −10.5");
    assert.equal(favoriteLine("Florida", "South Carolina", 13.5), "Florida −13.5");
    assert.equal(favoriteLine("Missouri", "Texas A&M", 3.5), "Missouri −3.5");
    assert.equal(favoriteLine("Alabama", "Georgia", 1.5), "Alabama −1.5");
    assert.equal(favoriteLine("Washington", "Iowa", 2.5), "Washington −2.5");
    assert.equal(favoriteLine("Oklahoma", "Texas", -8.5), "Texas −8.5");
    assert.doesNotMatch(clearSql, /home_score|away_score/);
  });
});


describe("Week 6 Tuesday USM @ Troy FINAL", () => {
  const finalsSql = readFileSync(join(root, "migrations/0049_week6_usm_troy_final.sql"), "utf8");

  it("stamps only Southern Miss @ Troy FINAL scores+status from Research CLEAR", () => {
    assert.equal((finalsSql.match(/update games/g) ?? []).length, 1);
    assert.equal((finalsSql.match(/g\.week = 6/g) ?? []).length, 1);
    assert.match(finalsSql, /week6_finals_clear_2026-10-07/);
    assert.match(finalsSql, /Scores and status only/);
    assert.match(finalsSql, /Soft-cal FLAG stays/);
    assert.match(finalsSql, /Southern Miss @ Troy — Troy 55, Southern Miss 34/);
    assert.match(finalsSql, /status = 'final'/);
    assert.match(finalsSql, /home_score = 55/);
    assert.match(finalsSql, /away_score = 34/);
    assert.match(finalsSql, /h\.slug = 'troy' and a\.slug = 'southern-miss'/);
    assert.match(finalsSql, /Source event 401871090/);
    assert.match(finalsSql, /Do not put ESPN event digits in this header/);
    assert.doesNotMatch(finalsSql, /kickoff_at/);
    assert.doesNotMatch(finalsSql, /vegas_spread/);
    assert.doesNotMatch(finalsSql, /vegas_total/);
    assert.doesNotMatch(finalsSql, /\btv\s*=/);
    assert.doesNotMatch(finalsSql, /hx_rating/);
    assert.doesNotMatch(finalsSql, /win_title|make_field/);
    // Header before the update must not carry event digits (stamp-gate overwrite).
    const header = finalsSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /401871090/);
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});
