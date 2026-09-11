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
    for (const row of fcsScheduleGamesForWeek(2)) {
      assert.equal(row.isFcs, true);
      assert.equal(row.hxSpreadPolicy, "vegas_only_fcs_unrated");
      assert.equal(isVegasOnlyFcs(row), true);
      assert.equal(row.homeHx, 0);
      assert.equal(row.awayHx, 0);
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
    assert.match(src, /view !== "top25"/);
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
