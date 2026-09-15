import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { formatKickCt } from "./chicago.ts";
import { favoriteLine } from "./featured.ts";
import {
  FCS_STUB_GAMES,
  fcsScheduleGamesForWeek,
  fcsStubIsFinal,
  fcsStubsForTeam,
  fcsStubsForWeek,
  homePerspectiveFcsVegas,
  isVegasOnlyFcs,
  sortScheduleGames,
  WEEK2_FCS_META,
} from "./fcs-stubs.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const payload = JSON.parse(
  readFileSync(join(root, "data/week2_fbs_fcs_spreads_2026.json"), "utf8"),
) as {
  meta: { n_fbs_fcs: number; hx_stamp?: string };
  games: Array<{
    espn_event_id: string;
    fbs_slug: string;
    fcs_opponent: string;
    vegas_spread: number | null;
    hx_spread: number | null;
    hx_spread_policy: string;
    broadcast: string | null;
    kick_ct: string;
    fbs_is_home: boolean;
    status: string;
    home_score?: number | null;
    away_score?: number | null;
    ncaa_contest_id?: string | null;
    kick_et?: string | null;
    venue?: string | null;
  }>;
};

describe("Week 2 FBS–FCS JSON ingest", () => {
  it("stamps 39 AMD games, all hx_spread null / vegas_only", () => {
    assert.equal(payload.meta.n_fbs_fcs, 39);
    assert.equal(payload.games.length, 39);
    assert.equal(WEEK2_FCS_META.n, 39);
    assert.equal(fcsStubsForWeek(2).length, 39);
    assert.equal(fcsScheduleGamesForWeek(2).length, 39);
    for (const g of payload.games) {
      assert.equal(g.hx_spread, null);
      assert.equal(g.hx_spread_policy, "vegas_only_fcs_unrated");
    }
    const week2FinalSlugs = new Set(
      fcsStubsForWeek(2).filter(fcsStubIsFinal).map((s) => s.teamSlug),
    );
    for (const row of fcsScheduleGamesForWeek(2)) {
      assert.equal(row.isFcs, true);
      assert.equal(row.hxSpreadPolicy, "vegas_only_fcs_unrated");
      assert.equal(isVegasOnlyFcs(row), true);
      assert.equal(row.homeHx, 0);
      assert.equal(row.awayHx, 0);
      if (week2FinalSlugs.has(row.homeSlug) || week2FinalSlugs.has(row.awaySlug)) continue;
      assert.equal(row.status, "scheduled");
      assert.equal(row.homeScore, null);
      assert.equal(row.awayScore, null);
    }
  });

  it("Miami vs Florida A&M is home Miami, Vegas MIA −59.5, ACCN, 7:00 CT", () => {
    const json = payload.games.find((g) => g.espn_event_id === "401858213");
    assert.ok(json);
    assert.equal(json.fbs_slug, "miami");
    assert.match(json.fcs_opponent, /Florida A&M/);
    assert.equal(json.vegas_spread, -59.5);
    assert.equal(json.fbs_is_home, true);
    assert.equal(homePerspectiveFcsVegas(json), 59.5);

    const stub = fcsStubsForTeam("miami").find((s) => s.week === 2);
    assert.ok(stub);
    assert.equal(stub.home, true);
    assert.equal(stub.vegasSpread, 59.5);
    assert.equal(stub.tv, "ACCN");
    assert.equal(stub.hxSpreadPolicy, "vegas_only_fcs_unrated");
    assert.match(stub.opponentLabel, /Florida A&M/);
    assert.equal(formatKickCt(stub.kickoffAt ?? null), "7:00 CT");
    assert.equal(favoriteLine("MIA", "FAMU", stub.vegasSpread ?? 0), "MIA −59.5");

    const row = fcsScheduleGamesForWeek(2).find((g) => g.homeSlug === "miami");
    assert.ok(row);
    assert.equal(row.vegasSpread, 59.5);
    assert.equal(row.tv, "ACCN");
    assert.equal(favoriteLine(row.homeShort, row.awayShort, row.vegasSpread ?? 0), "MIA −59.5");
  });

  it("keeps Miami–FAMU already_live FINAL 77–7 (home Miami) and does not restamp it", () => {
    const json = payload.games.find((g) => g.espn_event_id === "401858213");
    assert.ok(json);
    assert.equal(json.status, "STATUS_FINAL");
    assert.equal(json.home_score, 77);
    assert.equal(json.away_score, 7);
    assert.equal(json.hx_spread, null);
    assert.equal(json.ncaa_contest_id, "6604311");
    assert.equal(json.kick_et, "2026-09-10 20:00");
    assert.equal(json.venue, "Hard Rock Stadium");
    assert.equal(json.kick_ct, "2026-09-10 19:00");

    const miami = fcsStubsForWeek(2).find((s) => s.espnEventId === "401858213");
    assert.ok(miami);
    assert.equal(miami.teamSlug, "miami");
    assert.equal(miami.ncaaContestId, "6604311");
    assert.equal(miami.home, true);
    assert.equal(miami.homeScore, 77);
    assert.equal(miami.awayScore, 7);
    assert.equal(miami.live, false);
    assert.equal(miami.hxSpreadPolicy, "vegas_only_fcs_unrated");
    assert.equal(miami.location, "Hard Rock Stadium");
    assert.equal(formatKickCt(miami.kickoffAt ?? null), "7:00 CT");

    const row = fcsScheduleGamesForWeek(2).find((g) => g.id === -401858213);
    assert.ok(row);
    assert.equal(row.status, "final");
    assert.equal(row.homeScore, 77);
    assert.equal(row.awayScore, 7);
    assert.equal(row.headline, null);
    assert.equal(row.hxSpreadPolicy, "vegas_only_fcs_unrated");
    assert.equal(row.location, "Hard Rock Stadium");
    assert.equal(row.tv, "ACCN");
  });

  it("stamps all 39 Week 2 FCS rows STATUS_FINAL with Research home-perspective scores", () => {
    const clearScores: Record<string, { home: number; away: number; slug: string }> = {
      "401858213": { home: 77, away: 7, slug: "miami" },
      "401858215": { home: 59, away: 13, slug: "louisville" },
      "401858220": { home: 59, away: 3, slug: "virginia" },
      "401858222": { home: 73, away: 0, slug: "nc-state" },
      "401858439": { home: 55, away: 0, slug: "indiana" },
      "401866416": { home: 36, away: 15, slug: "kent-state" },
      "401867929": { home: 87, away: 3, slug: "james-madison" },
      "401868187": { home: 24, away: 23, slug: "liberty" },
      "401866417": { home: 45, away: 7, slug: "miami-oh" },
      "401858218": { home: 35, away: 3, slug: "north-carolina" },
      "401866415": { home: 13, away: 10, slug: "central-michigan" },
      "401856791": { home: 52, away: 7, slug: "west-virginia" },
      "401866413": { home: 41, away: 17, slug: "ball-state" },
      "401866412": { home: 45, away: 10, slug: "akron" },
      "401856785": { home: 52, away: 21, slug: "colorado" },
      "401866420": { home: 37, away: 10, slug: "massachusetts" },
      "401866419": { home: 63, away: 10, slug: "toledo" },
      "401865252": { home: 70, away: 7, slug: "new-mexico" },
      "401858223": { home: 56, away: 10, slug: "smu" },
      "401868326": { home: 34, away: 17, slug: "troy" },
      "401864506": { home: 21, away: 13, slug: "wyoming" },
      "401856672": { home: 52, away: 3, slug: "florida" },
      "401866421": { home: 49, away: 14, slug: "western-michigan" },
      "401868241": { home: 52, away: 7, slug: "arkansas-state" },
      "401856786": { home: 62, away: 10, slug: "cincinnati" },
      "401860882": { home: 58, away: 24, slug: "colorado-state" },
      "401856787": { home: 77, away: 6, slug: "houston" },
      "401871046": { home: 48, away: 14, slug: "missouri-state" },
      "401864503": { home: 24, away: 28, slug: "northern-illinois" },
      "401856680": { home: 45, away: 9, slug: "south-carolina" },
      "401858447": { home: 36, away: 9, slug: "wisconsin" },
      "401868008": { home: 45, away: 7, slug: "coastal-carolina" },
      "401856789": { home: 63, away: 7, slug: "tcu" },
      "401856784": { home: 44, away: 3, slug: "baylor" },
      "401864504": { home: 30, away: 20, slug: "san-jose-state" },
      "401864505": { home: 51, away: 10, slug: "utep" },
      "401864502": { home: 32, away: 38, slug: "air-force" },
      "401860883": { home: 49, away: 3, slug: "fresno-state" },
      "401864500": { home: 7, away: 20, slug: "nevada" },
    };

    for (const [id, expect] of Object.entries(clearScores)) {
      const json = payload.games.find((g) => g.espn_event_id === id);
      assert.ok(json, id);
      assert.equal(json.status, "STATUS_FINAL", id);
      assert.equal(json.home_score, expect.home, id);
      assert.equal(json.away_score, expect.away, id);
      assert.equal(json.hx_spread, null, id);
    }

    assert.equal(Object.keys(clearScores).length, 39);
    const finals = fcsStubsForWeek(2).filter(fcsStubIsFinal);
    assert.equal(finals.length, 39);
    for (const stub of finals) {
      const expect = stub.espnEventId ? clearScores[stub.espnEventId] : undefined;
      assert.ok(expect, stub.espnEventId ?? "missing espn id");
      assert.equal(stub.teamSlug, expect.slug);
      assert.equal(stub.homeScore, expect.home);
      assert.equal(stub.awayScore, expect.away);
      assert.equal(stub.live, false);
    }

    for (const g of payload.games) {
      assert.equal(g.status, "STATUS_FINAL", g.espn_event_id);
      assert.ok(g.espn_event_id in clearScores, g.espn_event_id);
    }
  });

  it("leaves Troy–Alabama State and Arkansas State–West Georgia Vegas blank", () => {
    const troy = fcsStubsForTeam("troy").find((s) => s.week === 2);
    const arst = fcsStubsForTeam("arkansas-state").find((s) => s.week === 2);
    assert.ok(troy);
    assert.ok(arst);
    assert.equal(troy.vegasSpread, null);
    assert.equal(arst.vegasSpread, null);
    assert.match(troy.opponentLabel, /Alabama State/);
    assert.match(arst.opponentLabel, /West Georgia/);
  });

  it("does not drop Week 1 W–L stubs", () => {
    const uga = FCS_STUB_GAMES.find((s) => s.teamSlug === "georgia" && s.week === 1);
    assert.equal(uga?.status, "final");
    assert.equal(uga?.homeScore, 63);
  });

  it("schedule board blanks HASHMARK for FCS and never links a fake matchup", () => {
    const src = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../routes/schedule.tsx"),
      "utf8",
    );
    assert.match(src, /Vegas-only/);
    assert.match(src, /isVegasOnlyFcs/);
    assert.match(src, /parseScheduleView/);
    assert.match(src, /view !== "all"/);
  });

  it("sorts by civil day, then kick; untimed after timed on that day", () => {
    const thuFcs = {
      id: -1,
      week: 2,
      kickoffDate: "2026-09-10",
      kickoffAt: "2026-09-11T00:00:00.000Z",
      homeSlug: "miami",
      awaySlug: "fcs-famu",
    };
    const friBc = {
      id: 10,
      week: 2,
      kickoffDate: "2026-09-11",
      kickoffAt: "2026-09-11T23:30:00.000Z",
      homeSlug: "boston-college",
      awaySlug: "rutgers",
    };
    const satUntimed = {
      id: 20,
      week: 2,
      kickoffDate: "2026-09-12",
      kickoffAt: null,
      homeSlug: "hawaii",
      awaySlug: "new-mexico-state",
    };
    const satTexas = {
      id: 30,
      week: 2,
      kickoffDate: "2026-09-12",
      kickoffAt: "2026-09-12T23:30:00.000Z",
      homeSlug: "texas",
      awaySlug: "ohio-state",
    };
    const satNoon = {
      id: 40,
      week: 2,
      kickoffDate: "2026-09-12",
      kickoffAt: "2026-09-12T16:00:00.000Z",
      homeSlug: "michigan",
      awaySlug: "oklahoma",
    };
    const sorted = sortScheduleGames([satUntimed, satTexas, thuFcs, friBc, satNoon] as never);
    assert.deepEqual(
      sorted.map((g) => g.homeSlug),
      ["miami", "boston-college", "michigan", "texas", "hawaii"],
    );
  });
});
