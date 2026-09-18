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
