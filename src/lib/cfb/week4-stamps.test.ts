import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { chicagoCivilToIso, formatKickCt, kickoffCivilYmd } from "./chicago.ts";
import { WEEK4_FEATURED, favoriteLine } from "./featured.ts";
import { countSeedFbsGamesForWeek } from "./fcs-fbs-stamp-gate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const payload = JSON.parse(
  readFileSync(join(root, "data/week4_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: {
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
    vegas_spread: number | null;
    clear_or_hold: string;
  };
  games: Array<{
    espn_event_id: string;
    matchup: string;
    kick_ct: string;
    kick_iso: string;
    weekday: string;
    home_location: string;
    away_location: string;
    home_short: string;
    away_short: string;
    tv: string;
    vegas_details: string;
    vegas_spread: number | null;
    vegas_ou: number | null;
    clear_or_hold: "CLEAR" | "HOLD";
    hold_reasons?: string[];
    fri_sat_day_risk?: boolean;
    hashmark_kickoff_date: string;
    hashmark_id: number | null;
    neutral: boolean;
  }>;
};

const sql = readFileSync(join(root, "migrations/0031_week4_kick_tv_vegas.sql"), "utf8");

function blankTv(tv: string | null | undefined): boolean {
  const v = String(tv ?? "").trim();
  return v === "" || v === "—" || v === "-" || v === "–";
}

function game(matchup: string) {
  return payload.games.find((g) => g.matchup === matchup);
}

function sqlBlock(homeSlug: string, awaySlug: string): string {
  const re = new RegExp(
    `(?:^--[^\\n]*\\n)+update games[\\s\\S]*?h\\.slug = '${homeSlug}' and a\\.slug = '${awaySlug}'[\\s\\S]*?g\\.week = 4;`,
    "m",
  );
  const m = sql.match(re);
  assert.ok(m, `missing SQL block for ${awaySlug} @ ${homeSlug}`);
  return m[0];
}

describe("Week 4 FBS–FBS Research stamps", () => {
  it("covers 57 kicks, 50 TVs, 14 Vegas, 11 CLEAR, 46 HOLD", () => {
    assert.equal(payload.meta.n_games, 57);
    assert.equal(payload.games.length, 57);
    assert.equal(payload.meta.n_clear, 11);
    assert.equal(payload.meta.n_hold, 46);
    assert.equal(payload.meta.n_with_vegas, 14);
    assert.equal(payload.meta.n_blank_vegas, 43);
    assert.equal(payload.meta.n_blank_tv, 7);
    const holds = payload.games.filter((g) => g.clear_or_hold === "HOLD");
    const clears = payload.games.filter((g) => g.clear_or_hold === "CLEAR");
    assert.equal(holds.length, 46);
    assert.equal(clears.length, 11);
    assert.equal(payload.games.filter((g) => blankTv(g.tv)).length, 7);
    assert.equal(payload.games.filter((g) => g.vegas_spread == null).length, 43);
    for (const g of payload.games) {
      assert.ok(g.kick_iso);
      assert.ok(g.matchup);
      assert.equal(g.hashmark_id, null);
      if (g.clear_or_hold === "CLEAR") {
        assert.ok(!blankTv(g.tv));
        assert.notEqual(g.vegas_spread, null);
      } else {
        assert.ok(blankTv(g.tv) || g.vegas_spread == null);
      }
    }
  });

  it("Liberty @ Coastal Carolina is Thu 18:30 CT · ESPN · Vegas HOLD", () => {
    const g = game("Liberty @ Coastal Carolina");
    assert.ok(g);
    assert.equal(g.away_location, "Liberty");
    assert.equal(g.home_location, "Coastal Carolina");
    assert.equal(g.kick_iso, "2026-09-24T18:30:00-05:00");
    assert.equal(g.weekday, "Thu");
    assert.equal(g.tv, "ESPN");
    assert.equal(g.vegas_spread, null);
    assert.equal(g.clear_or_hold, "HOLD");
    const iso = chicagoCivilToIso("2026-09-24 18:30");
    assert.equal(iso, "2026-09-24T23:30:00.000Z");
    assert.equal(formatKickCt(iso), "6:30 CT");
    assert.equal(WEEK4_FEATURED.homeSlug, "coastal-carolina");
    assert.equal(WEEK4_FEATURED.awaySlug, "liberty");
    assert.equal(payload.featured_pick.matchup, "Liberty @ Coastal Carolina");
    assert.equal(payload.featured_pick.vegas_spread, null);
    const block = sqlBlock("coastal-carolina", "liberty");
    assert.match(block, /timestamptz '2026-09-24 18:30:00-05'/);
    assert.match(block, /kickoff_date = date '2026-09-24'/);
    assert.match(block, /tv = 'ESPN'/);
    assert.match(block, /vegas_spread = null/);
    assert.match(block, /vegas_total = null/);
  });

  it("Texas A&M @ LSU is Sat 18:30 CT · ABC · LSU −5.5 (board home-favored +5.5)", () => {
    const g = game("Texas A&M @ LSU");
    assert.ok(g);
    assert.equal(g.kick_iso, "2026-09-26T18:30:00-05:00");
    assert.equal(g.tv, "ABC");
    assert.equal(g.vegas_spread, -5.5);
    assert.equal(g.vegas_details, "LSU -5.5");
    assert.equal(g.clear_or_hold, "CLEAR");
    assert.equal(favoriteLine("LSU", "Texas A&M", 5.5), "LSU −5.5");
    const block = sqlBlock("lsu", "texas-am");
    assert.match(block, /timestamptz '2026-09-26 18:30:00-05'/);
    assert.match(block, /tv = 'ABC'/);
    assert.match(block, /h\.slug = 'lsu' then 5\.5 else -5\.5/);
    assert.match(block, /vegas_total = 54\.5/);
  });

  it("converts home-relative pack spreads to board (positive = home favored)", () => {
    assert.equal(game("Texas @ Tennessee")?.vegas_spread, 4.5);
    assert.equal(game("Iowa @ Michigan")?.vegas_spread, -4.5);
    assert.equal(game("Oklahoma @ Georgia")?.vegas_spread, -13.5);
    assert.match(sqlBlock("tennessee", "texas"), /h\.slug = 'tennessee' then -4\.5 else 4\.5/);
    assert.match(sqlBlock("michigan", "iowa"), /h\.slug = 'michigan' then 4\.5 else -4\.5/);
    assert.match(sqlBlock("georgia", "oklahoma"), /h\.slug = 'georgia' then 13\.5 else -13\.5/);
    assert.equal(favoriteLine("Tennessee", "Texas", -4.5), "Texas −4.5");
    assert.equal(favoriteLine("Michigan", "Iowa", 4.5), "Michigan −4.5");
    assert.equal(favoriteLine("Georgia", "Oklahoma", 13.5), "Georgia −13.5");
  });

  it("leaves TV null on the 7 TV HOLDs and still stamps their kicks", () => {
    const tvHolds = [
      ["western-michigan", "boise-state", "2026-09-25 23:00"],
      ["georgia-southern", "houston", "2026-09-25 23:00"],
      ["baylor", "colorado", "2026-09-26 11:00"],
      ["boston-college", "virginia-tech", "2026-09-26 11:00"],
      ["louisville", "wake-forest", "2026-09-26 11:00"],
      ["georgia", "oklahoma", "2026-09-26 14:30"],
      ["florida", "ole-miss", "2026-09-26 14:30"],
    ] as const;
    assert.equal((sql.match(/tv = null/g) ?? []).length, 7);
    for (const [home, away, kick] of tvHolds) {
      const block = sqlBlock(home, away);
      assert.match(block, /tv = null/);
      assert.match(block, new RegExp(`timestamptz '${kick}:00-05'`));
    }
    assert.match(sqlBlock("western-michigan", "boise-state"), /h\.slug = 'western-michigan' then -7\.5 else 7\.5/);
    assert.match(sqlBlock("georgia", "oklahoma"), /h\.slug = 'georgia' then 13\.5 else -13\.5/);
    assert.match(sqlBlock("florida", "ole-miss"), /h\.slug = 'florida' then 1\.5 else -1\.5/);
    assert.match(sqlBlock("georgia-southern", "houston"), /vegas_spread = null/);
  });

  it("stamps ESPN CT day-risk dates, not stale HASHMARK Sunday/Saturday labels", () => {
    const risks = payload.games.filter((g) => g.fri_sat_day_risk);
    assert.equal(risks.length, 8);
    assert.equal(payload.meta.n_fri_sat_day_risks, 8);
    const expected: Array<[string, string, string, string]> = [
      ["indiana", "northwestern", "2026-09-25", "19:00"],
      ["california", "clemson", "2026-09-25", "21:30"],
      ["western-michigan", "boise-state", "2026-09-25", "23:00"],
      ["georgia-southern", "houston", "2026-09-25", "23:00"],
      ["arkansas", "tulsa", "2026-09-26", "19:00"],
      ["utep", "oregon-state", "2026-09-26", "20:00"],
      ["fresno-state", "rice", "2026-09-26", "21:00"],
      ["stanford", "georgia-tech", "2026-09-26", "21:30"],
    ];
    for (const [home, away, ymd, hm] of expected) {
      const block = sqlBlock(home, away);
      assert.match(block, new RegExp(`kickoff_date = date '${ymd}'`));
      assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
    }
    const nu = game("Northwestern @ Indiana");
    assert.ok(nu);
    assert.equal(nu.hashmark_kickoff_date, "2026-09-26");
    assert.equal(kickoffCivilYmd(nu.kick_iso, nu.hashmark_kickoff_date), "2026-09-25");
    const gt = game("Georgia Tech @ Stanford");
    assert.ok(gt);
    assert.equal(gt.hashmark_kickoff_date, "2026-09-27");
    assert.equal(kickoffCivilYmd(gt.kick_iso, gt.hashmark_kickoff_date), "2026-09-26");
  });

  it("stamps all 57 by slug + week=4, omits ESPN digits, and matches seed count", () => {
    assert.equal((sql.match(/g\.week = 4;/g) ?? []).length, 57);
    assert.doesNotMatch(sql, /401\d{6,}/);
    assert.doesNotMatch(sql, /ESPN \d{6,}/);
    assert.doesNotMatch(sql, /g\.id = /);
    const seedN = countSeedFbsGamesForWeek(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"), 4);
    assert.equal(seedN, 57);
    assert.equal(payload.games.filter((g) => g.neutral).length, 0);
    assert.equal((sql.match(/neutral = false/g) ?? []).length, 57);
    assert.doesNotMatch(sql, /neutral = true/);
    assert.match(sqlBlock("wyoming", "hawaii"), /a\.slug = 'hawaii'/);
  });
});

const clearPack = JSON.parse(
  readFileSync(join(root, "data/week4_vegas_clear_pack_2026-09-23.json"), "utf8"),
) as {
  meta: {
    n_games: number;
    n_clear: number;
    n_hold: number;
    n_blank_vegas: number;
    n_with_ou: number;
    n_new_lines: number;
    n_moved_lines: number;
    n_kick_corrections: number;
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
    vegas_spread: number;
    ou: number;
    status: string;
  }>;
  stamp_table: Array<{ espn_id: string; vegas_details: string; ou: number; status: string }>;
};

const clearSql = readFileSync(join(root, "migrations/0035_week4_vegas_clear_2026_09_23.sql"), "utf8");

function clearBlock(espnId: string): string {
  const re = new RegExp(
    `^--[^\\n]*ESPN ${espnId}[^\\n]*\\nupdate games[\\s\\S]*?g\\.week = 4;`,
    "m",
  );
  const m = clearSql.match(re);
  assert.ok(m, `missing CLEAR SQL block for ESPN ${espnId}`);
  return m[0];
}

describe("Week 4 Sep 23 Vegas CLEAR refresh", () => {
  it("covers 57 CLEAR games, 0 HOLD, 0 blank Vegas, 43 NEW, 14 MOVED", () => {
    assert.equal(clearPack.meta.n_games, 57);
    assert.equal(clearPack.games.length, 57);
    assert.equal(clearPack.stamp_table.length, 57);
    assert.equal(clearPack.meta.n_clear, 57);
    assert.equal(clearPack.meta.n_hold, 0);
    assert.equal(clearPack.meta.n_blank_vegas, 0);
    assert.equal(clearPack.meta.n_with_ou, 57);
    assert.equal(clearPack.meta.n_new_lines, 43);
    assert.equal(clearPack.meta.n_moved_lines, 14);
    assert.equal(clearPack.meta.n_kick_corrections, 2);
    assert.equal(clearPack.meta.n_tv_gains, 7);
    assert.equal(clearPack.games.filter((g) => g.status === "CLEAR").length, 57);
    assert.equal(clearPack.games.filter((g) => g.vegas_spread == null || g.ou == null).length, 0);
    const ids = new Set(clearPack.games.map((g) => g.espn_id));
    assert.equal(ids.size, 57);
    for (const row of clearPack.stamp_table) {
      const g = clearPack.games.find((x) => x.espn_id === row.espn_id);
      assert.ok(g);
      assert.equal(row.vegas_details, g.vegas_details);
      assert.equal(row.ou, g.ou);
      assert.equal(row.status, "CLEAR");
    }
  });

  it("maps vegas_details onto the home-favored board spread (does not negate vegas_spread)", () => {
    const archive = payload.games;
    for (const g of clearPack.games) {
      const prior = archive.find((a) => a.espn_event_id === g.espn_id);
      assert.ok(prior, g.espn_id);
      const m = g.vegas_details.match(/^(.+?)\s+(-?\d+(?:\.\d+)?)$/);
      assert.ok(m, g.vegas_details);
      const fav = m[1] === "AF" ? "AFA" : m[1];
      const line = Number(m[2]);
      assert.equal(g.vegas_spread, line);
      assert.ok(line < 0);
      const homeFav = fav === prior.home_short;
      const awayFav = fav === prior.away_short;
      assert.ok(homeFav !== awayFav, `${g.espn_id} ${g.vegas_details}`);
      const board = homeFav ? Math.abs(line) : -Math.abs(line);
      const block = clearBlock(g.espn_id);
      const mag = Number.isInteger(Math.abs(line)) ? String(Math.abs(line)) : String(Math.abs(line));
      const homeSlug = block.match(/h\.slug = '([^']+)' and a\.slug = '([^']+)'/);
      assert.ok(homeSlug);
      if (homeFav) {
        assert.match(block, new RegExp(`h\\.slug = '${homeSlug[1]}' then ${mag} else -${mag}`));
      } else {
        assert.match(block, new RegExp(`h\\.slug = '${homeSlug[1]}' then -${mag} else ${mag}`));
      }
      assert.equal(board > 0, homeFav);
      assert.match(block, new RegExp(`vegas_total = ${g.ou}`));
      assert.match(block, new RegExp(`tv = '${g.tv.replace("+", "\\+")}'`));
      const [ymd, hm] = g.kick_ct.split(" ");
      assert.match(block, new RegExp(`timestamptz '${ymd} ${hm}:00-05'`));
      assert.match(block, new RegExp(`kickoff_date = date '${ymd}'`));
      assert.equal(g.weekday, prior.weekday === "Fri" && ymd === "2026-09-26" ? "Sat" : g.weekday);
    }
    assert.equal((clearSql.match(/g\.week = 4;/g) ?? []).length, 57);
    assert.equal((clearSql.match(/neutral = false/g) ?? []).length, 57);
    assert.doesNotMatch(clearSql, /home_score|away_score|hx_rating|BOARD_WEEK/);
  });

  it("stamps Liberty @ Coastal as Thu 18:30 CT · ESPN · LIB -2.5 / 50.5", () => {
    const g = clearPack.games.find((x) => x.espn_id === "401869941");
    assert.ok(g);
    assert.equal(g.matchup, "Liberty @ Coastal Carolina");
    assert.equal(g.kick_ct, "2026-09-24 18:30");
    assert.equal(g.weekday, "Thu");
    assert.equal(g.tv, "ESPN");
    assert.equal(g.vegas_details, "LIB -2.5");
    assert.equal(g.ou, 50.5);
    const block = clearBlock("401869941");
    assert.match(block, /timestamptz '2026-09-24 18:30:00-05'/);
    assert.match(block, /tv = 'ESPN'/);
    assert.match(block, /h\.slug = 'coastal-carolina' then -2\.5 else 2\.5/);
    assert.match(block, /vegas_total = 50\.5/);
    assert.equal(favoriteLine("Coastal", "Liberty", -2.5), "Liberty −2.5");
    assert.equal(WEEK4_FEATURED.homeSlug, "coastal-carolina");
    assert.equal(WEEK4_FEATURED.awaySlug, "liberty");
  });

  it("moves Boise and Houston off Friday night onto Saturday afternoon with TV", () => {
    const boise = clearPack.games.find((g) => g.espn_id === "401860897");
    const hou = clearPack.games.find((g) => g.espn_id === "401856806");
    assert.ok(boise && hou);
    assert.equal(boise.kick_ct, "2026-09-26 14:30");
    assert.equal(boise.weekday, "Sat");
    assert.equal(boise.tv, "ESPN2");
    assert.equal(boise.vegas_details, "BOIS -7");
    assert.equal(hou.kick_ct, "2026-09-26 15:00");
    assert.equal(hou.weekday, "Sat");
    assert.equal(hou.tv, "ESPNU");
    assert.equal(hou.vegas_details, "HOU -18.5");
    assert.match(clearBlock("401860897"), /h\.slug = 'western-michigan' then -7 else 7/);
    assert.match(clearBlock("401856806"), /h\.slug = 'georgia-southern' then -18\.5 else 18\.5/);
    assert.equal(clearPack.games.filter((g) => g.weekday === "Fri").length, 4);
    assert.equal(clearPack.games.filter((g) => g.weekday === "Sat").length, 52);
    assert.equal(clearPack.games.filter((g) => g.weekday === "Thu").length, 1);
  });

  it("stamps the seven TV gains and the flipped favorites", () => {
    const tv = [
      ["401856813", "ESPN2", "BAY -10"],
      ["401858242", "ACC Network", "VT -14"],
      ["401858243", "ESPN", "LOU -12.5"],
      ["401856700", "ESPN", "UGA -14"],
      ["401856699", "ABC", "FLA -3.5"],
      ["401860897", "ESPN2", "BOIS -7"],
      ["401856806", "ESPNU", "HOU -18.5"],
    ] as const;
    for (const [id, network, details] of tv) {
      const g = clearPack.games.find((x) => x.espn_id === id);
      assert.equal(g?.tv, network);
      assert.equal(g?.vegas_details, details);
      assert.match(clearBlock(id), new RegExp(`tv = '${network}'`));
    }
    assert.match(clearBlock("401856881"), /h\.slug = 'west-virginia' then 1\.5 else -1\.5/);
    assert.match(clearBlock("401858469"), /h\.slug = 'usc' then -3 else 3/);
    assert.match(clearBlock("401856702"), /h\.slug = 'lsu' then 8\.5 else -8\.5/);
    assert.equal(favoriteLine("West Virginia", "Oklahoma St", 1.5), "West Virginia −1.5");
    assert.equal(favoriteLine("USC", "Oregon", -3), "Oregon −3.0");
    assert.equal(favoriteLine("LSU", "Texas A&M", 8.5), "LSU −8.5");
  });
});
