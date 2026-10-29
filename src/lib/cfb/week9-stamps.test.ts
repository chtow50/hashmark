import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { AP_STAMP, BOARD_WEEK, FEATURED_SLATE_WEEK, WEEK9_FEATURED } from "./featured.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

describe("Week 8 late FINAL (0071, Houston @ Utah)", () => {
  const lateSql = readFileSync(join(root, "migrations/0071_week8_late_finals.sql"), "utf8");
  it("stamps Utah 21, Houston 13 with exact home/away orientation, scores+status only", () => {
    assert.equal((lateSql.match(/update games/g) ?? []).length, 1);
    assert.match(lateSql, /g\.week = 8/);
    assert.match(lateSql, /h\.slug = 'utah' and a\.slug = 'houston'/);
    assert.match(lateSql, /home_score = 21/);
    assert.match(lateSql, /away_score = 13/);
    assert.match(lateSql, /status = 'final'/);
    assert.doesNotMatch(lateSql, /kickoff_at|vegas_spread|\btv\s*=|hx_rating|win_title|make_field/);
    // ESPN event digits stay below the update block so the stamp gate keeps 0064 kick/Vegas.
    const header = lateSql.slice(0, lateSql.indexOf("update games"));
    assert.doesNotMatch(header, /401856837/);
    assert.match(lateSql, /401856837/);
  });
});

const pack = JSON.parse(
  readFileSync(join(root, "data/week9_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: { n_games: number; n_with_vegas: number; n_blank_vegas: number; n_blank_tv: number; n_tbd_kick: number; excluded_fcs: string[] };
  games: Array<{
    home_slug: string;
    away_slug: string;
    kick_ct: string | null;
    tv: string | null;
    vegas_details: string | null;
    board_vegas_spread: number | null;
    over_under: number | null;
  }>;
};
const sql = readFileSync(join(root, "migrations/0072_week9_kick_tv_vegas.sql"), "utf8");
const blockFor = (home: string, away: string) =>
  sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));

describe("Week 9 FBS–FBS kick / TV / Vegas (0072)", () => {
  it("covers 54 games, 6 Vegas (ESPN DraftKings = CBS Sports), 0 TBD kick, 0 blank TV", () => {
    assert.equal(pack.meta.n_games, 54);
    assert.equal(pack.games.length, 54);
    assert.equal(pack.meta.n_with_vegas, 6);
    assert.equal(pack.meta.n_blank_vegas, 48);
    assert.equal(pack.meta.n_tbd_kick, 0);
    assert.equal(pack.meta.n_blank_tv, 0);
    assert.equal(pack.meta.excluded_fcs.length, 2);
    assert.equal(pack.games.filter((g) => g.vegas_details != null).length, 6);
    assert.equal(pack.games.filter((g) => g.kick_ct == null).length, 0);
    assert.equal((sql.match(/update games/g) ?? []).length, 54);
    assert.equal((sql.match(/g\.week = 9;/g) ?? []).length, 54);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("stores the six two-source Vegas lines (positive = home favored)", () => {
    for (const [home, away, spread, total] of [
      ["ucf", "baylor", 2.5, 48.5],
      ["texas-tech", "arizona", 4.5, 55.5],
      ["navy", "notre-dame", -30.5, 52.5],
      ["cincinnati", "utah", -6.5, 55.5],
      ["wake-forest", "virginia", 13.5, 49.5],
      ["texas", "mississippi-state", 20.5, 50.5],
    ] as const) {
      const g = pack.games.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.board_vegas_spread, spread);
      assert.equal(g.over_under, total);
      const block = blockFor(home, away);
      assert.ok(block, `${away} @ ${home} block`);
      assert.match(block, new RegExp(`vegas_spread = ${spread}\\b`));
      assert.match(block, new RegExp(`vegas_total = ${total}\\b`));
    }
  });

  it("pins the featured Ohio State @ USC card: Sat 18:30 CT · NBC · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 9);
    assert.equal(FEATURED_SLATE_WEEK, 9);
    assert.equal(WEEK9_FEATURED.homeSlug, "usc");
    assert.equal(WEEK9_FEATURED.awaySlug, "ohio-state");
    const g = pack.games.find((r) => r.home_slug === "usc" && r.away_slug === "ohio-state");
    assert.equal(g?.kick_ct, "2026-10-31 18:30");
    assert.equal(g?.tv, "NBC");
    assert.equal(g?.vegas_details, null);
    const block = blockFor("usc", "ohio-state");
    assert.ok(block);
    assert.match(block, /kickoff_at = timestamptz '2026-10-31 18:30:00-05'/);
    assert.match(block, /tv = 'NBC'/);
    assert.match(block, /vegas_spread = null/);
  });
});

describe("Week 8 AP Top 25 stamp (0073, Oct. 18)", () => {
  const apSql = readFileSync(join(root, "migrations/0073_week8_ap_top25.sql"), "utf8");
  const ap = JSON.parse(readFileSync(join(root, "data/week8_ap_top25_2026.json"), "utf8"));

  it("clears then sets 25 AP ranks on week 0 rows only", () => {
    assert.match(apSql, /update rankings set ap_rank = null where season = 2026 and week = 0;/);
    assert.equal((apSql.match(/^\s+\('[a-z-]+', \d+\)/gm) ?? []).length, 25);
    assert.match(apSql, /\('miami', 1\)/);
    assert.match(apSql, /\('byu', 2\)/);
    assert.match(apSql, /\('kentucky', 12\)/);
    assert.match(apSql, /\('arizona', 25\)/);
    assert.doesNotMatch(apSql, /'mississippi-state'|'oklahoma-state'/);
    const body = apSql
      .split("\n")
      .filter((l) => !l.startsWith("--"))
      .join("\n");
    assert.doesNotMatch(body, /hx_|make_field|win_title|truncate|games/i);
    assert.equal(ap.poll_week, 8);
    assert.equal(ap.as_of, "2026-10-18");
    assert.deepEqual(
      ap.dropped.map((d: { slug: string }) => d.slug),
      ["mississippi-state", "oklahoma-state"],
    );
    for (const t of ap.teams as { slug: string; rank: number }[]) {
      assert.match(apSql, new RegExp(`\\('${t.slug}', ${t.rank}\\)`));
    }
  });

  it("drives the AP chrome", () => {
    assert.equal(AP_STAMP.week, 8);
    assert.equal(AP_STAMP.asOf, "Oct. 18");
    assert.equal(AP_STAMP.label, "Week 8 AP");
    assert.equal(AP_STAMP.columnHint, "W8 stamp");
  });
});

describe("Week 9 Tuesday FINALs (0074, DEL@WKU + SHSU@MOST)", () => {
  const tueSql = readFileSync(join(root, "migrations/0074_week9_tue_finals.sql"), "utf8");
  const expected = [
    ["401871071", "western-kentucky", "delaware", 21, 35, "Delaware @ Western Kentucky — Delaware 35, Western Kentucky 21"],
    ["401871072", "missouri-state", "sam-houston", 24, 3, "Sam Houston @ Missouri State — Missouri State 24, Sam Houston 3"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 2);
    assert.equal((tueSql.match(/g\.week = 9/g) ?? []).length, 2);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(tueSql.includes(`-- ${label}`), label);
      assert.ok(tueSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(tueSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(tueSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(tueSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = tueSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 9 Wednesday FINALs (0075, KENN@MTSU + JVST@NMSU)", () => {
  const wedSql = readFileSync(join(root, "migrations/0075_week9_wed_finals.sql"), "utf8");
  const expected = [
    ["401871058", "middle-tennessee", "kennesaw-state", 28, 44, "Kennesaw State @ Middle Tennessee — Kennesaw State 44, Middle Tennessee 28"],
    ["401871057", "new-mexico-state", "jacksonville-state", 0, 24, "Jacksonville State @ New Mexico State — Jacksonville State 24, New Mexico State 0"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 9/g) ?? []).length, 2);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(wedSql.includes(`-- ${label}`), label);
      assert.ok(wedSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(wedSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(wedSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(wedSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = wedSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});
