import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const pack = JSON.parse(
  readFileSync(join(root, "data/week7_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: { n_games: number; n_with_vegas: number; n_blank_vegas: number; n_blank_tv: number; n_tbd_kick: number };
  games: Array<{
    espn_event_id: string;
    home_slug: string;
    away_slug: string;
    kick_ct: string | null;
    tv: string | null;
    vegas_details: string | null;
    board_vegas_spread: number | null;
    over_under: number | null;
  }>;
};
const sql = readFileSync(join(root, "migrations/0057_week7_kick_tv_vegas.sql"), "utf8");

describe("Week 7 FBS–FBS kick / TV / Vegas (0057)", () => {
  it("covers 57 games, 6 Vegas (ESPN DraftKings = CBS Sports), 1 TBD kick", () => {
    assert.equal(pack.meta.n_games, 57);
    assert.equal(pack.games.length, 57);
    assert.equal(pack.meta.n_with_vegas, 6);
    assert.equal(pack.meta.n_blank_vegas, 51);
    assert.equal(pack.meta.n_tbd_kick, 1);
    assert.equal((sql.match(/update games/g) ?? []).length, 57);
    assert.equal((sql.match(/g\.week = 7;/g) ?? []).length, 57);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("stores the board convention (positive = home favored) for every Vegas row", () => {
    const expected: Array<[string, string, number, number]> = [
      ["texas-state", "colorado-state", 11.5, 67.5],
      ["purdue", "washington", 2.5, 51.5],
      ["kansas-state", "kansas", 8.5, 54.5],
      ["tennessee", "alabama", -6.5, 55.5],
      ["oklahoma", "kentucky", 6.5, 42.5],
      ["houston", "oklahoma-state", 3.5, 58.5],
    ];
    const withVegas = pack.games.filter((g) => g.board_vegas_spread != null);
    assert.equal(withVegas.length, expected.length);
    for (const [home, away, spread, total] of expected) {
      const g = withVegas.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.board_vegas_spread, spread);
      assert.equal(g.over_under, total);
      const block = sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));
      assert.ok(block, `sql block ${away} @ ${home}`);
      assert.match(block, new RegExp(`vegas_spread = ${spread}\\b`));
      assert.match(block, new RegExp(`vegas_total = ${total}\\b`));
    }
  });

  it("holds Nebraska @ Oregon kick + TV (ESPN vs CBS disagree; goducks.com TBD)", () => {
    const g = pack.games.find((r) => r.home_slug === "oregon" && r.away_slug === "nebraska");
    assert.equal(g?.kick_ct, null);
    assert.equal(g?.tv, null);
    const block = sql.split("\n\n").find((b) => b.includes("h.slug = 'oregon' and a.slug = 'nebraska'"));
    assert.ok(block);
    assert.doesNotMatch(block, /kickoff_at|\btv\s*=/);
  });

  it("pins the featured Alabama @ Tennessee card: Sat 14:30 CT · ABC · ALA −6.5 / 55.5", () => {
    const g = pack.games.find((r) => r.home_slug === "tennessee" && r.away_slug === "alabama");
    assert.equal(g?.kick_ct, "2026-10-17 14:30");
    assert.equal(g?.tv, "ABC");
    assert.equal(g?.vegas_details, "ALA -6.5");
    assert.match(sql, /kickoff_at = timestamptz '2026-10-17 14:30:00-05'/);
  });
});

describe("Week 7 Tuesday FINALs (0058, DEL@MTSU + FIU@JXST)", () => {
  const tueSql = readFileSync(join(root, "migrations/0058_week7_tue_finals.sql"), "utf8");
  const expected = [
    ["401871067", "middle-tennessee", "delaware", 33, 30, "Delaware @ Middle Tennessee — Middle Tennessee 33, Delaware 30"],
    ["401871053", "jacksonville-state", "fiu", 27, 24, "Florida International @ Jacksonville State — Jacksonville State 27, FIU 24"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 2);
    assert.equal((tueSql.match(/g\.week = 7/g) ?? []).length, 2);
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

describe("Week 7 Wednesday FINALs (0059, KENN@MOST + WKU@SHSU)", () => {
  const wedSql = readFileSync(join(root, "migrations/0059_week7_wed_finals.sql"), "utf8");
  const expected = [
    ["401871054", "missouri-state", "kennesaw-state", 24, 21, "Kennesaw State @ Missouri State — Missouri State 24, Kennesaw State 21"],
    ["401871068", "sam-houston", "western-kentucky", 3, 16, "Western Kentucky @ Sam Houston — Western Kentucky 16, Sam Houston 3"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 7/g) ?? []).length, 2);
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
