import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
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
  fcsStubToScheduleGame,
  isVegasOnlyFcs,
  scheduled,
  sortScheduleGames,
  WEEK2_FCS_META,
} from "./fcs-stubs.ts";
import { buildRemainingSchedule } from "./season-sim.ts";
import { tallyFcsStubRecord, tallyFcsStubs } from "./season-record.ts";

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

describe("Week 1 FCS backfill (fcs_backfill_week1_all_finals_clear_2026-10-09)", () => {
  const pack = JSON.parse(
    readFileSync(join(root, "data/fcs_backfill_week1_all_finals_clear_2026-10-09.json"), "utf8"),
  ) as {
    counts: { CLEAR: number; HOLD: number; to_stamp: number; ot_finals: number; fbs_losses_in_window: number };
    replacement_calls: string[];
    games: Array<{
      stub_key: { teamSlug: string; week: number; kickoffDate: string };
      scheduled_call: string;
      replacement_call: string;
      home_slug: string;
      away_label: string;
      home_score: number;
      away_score: number;
      espn_status: string;
      fbs_result: "W" | "L";
      ot: boolean;
      cross_check: { result: string; home_score: number; away_score: number };
    }>;
  };
  const src = readFileSync(join(root, "src/lib/cfb/fcs-stubs.ts"), "utf8");
  const week1Block = src.slice(src.indexOf("const WEEK1_FCS_STUBS"), src.indexOf("const WEEK2_FCS_STUBS"));
  const week3Block = src.slice(src.indexOf("const WEEK3_FCS_STUBS"), src.indexOf("export const FCS_STUB_GAMES"));
  const callLines = (block: string, fn: string) =>
    block
      .split("\n")
      .map((l) => l.trim().replace(/,$/, ""))
      .filter((l) => l.startsWith(`${fn}(`));

  it("pack is 32 CLEAR / 0 HOLD, ESPN FINAL and CBS MATCH, all FBS home", () => {
    assert.equal(pack.counts.CLEAR, 32);
    assert.equal(pack.counts.HOLD, 0);
    assert.equal(pack.counts.to_stamp, 32);
    assert.equal(pack.games.length, 32);
    assert.equal(pack.replacement_calls.length, 32);
    assert.deepEqual(
      [...pack.games.map((g) => g.replacement_call)].sort(),
      [...pack.replacement_calls].sort(),
    );
    for (const g of pack.games) {
      assert.equal(g.espn_status, "STATUS_FINAL", g.home_slug);
      assert.equal(g.cross_check.result, "MATCH", g.home_slug);
      assert.equal(g.cross_check.home_score, g.home_score, g.home_slug);
      assert.equal(g.cross_check.away_score, g.away_score, g.home_slug);
      assert.equal(g.stub_key.teamSlug, g.home_slug);
      assert.equal(g.stub_key.week, 1);
      assert.equal(
        g.replacement_call,
        `finalHome("${g.home_slug}", 1, "${g.stub_key.kickoffDate}", "${g.away_label}", ${g.home_score}, ${g.away_score})`,
      );
      assert.equal(g.scheduled_call, `scheduled("${g.home_slug}", 1, "${g.stub_key.kickoffDate}")`);
    }
  });

  it("replaces exactly the 32 Week 1 scheduled stubs with the pack's finalHome calls", () => {
    assert.deepEqual(callLines(week1Block, "scheduled"), []);
    assert.equal((src.match(/^\s+scheduled\(/gm) ?? []).length, 0);
    const w1Finals = callLines(week1Block, "finalHome");
    for (const g of pack.games) {
      assert.ok(w1Finals.includes(g.replacement_call), g.replacement_call);
      assert.ok(!src.includes(g.scheduled_call), g.scheduled_call);
      const stub = FCS_STUB_GAMES.find(
        (s) => s.teamSlug === g.home_slug && s.week === 1 && s.kickoffDate === g.stub_key.kickoffDate,
      );
      assert.ok(stub, g.home_slug);
      assert.deepEqual(
        [stub.status, stub.home, stub.opponentLabel, stub.homeScore, stub.awayScore],
        ["final", true, g.away_label, g.home_score, g.away_score],
      );
      assert.equal(fcsStubIsFinal(stub), true);
    }
    // Week 1: the 32 backfilled + the 14 previously stamped finals, nothing else.
    assert.equal(w1Finals.length, 46);
    assert.equal(fcsStubsForWeek(1).length, 46);
  });

  it("three FBS losses: Bowling Green, Utah State, Charlotte (3OT, score only)", () => {
    const losses = pack.games.filter((g) => g.fbs_result === "L").map((g) => g.replacement_call).sort();
    assert.deepEqual(losses, [
      'finalHome("bowling-green", 1, "2026-09-05", "Tarleton State", 13, 20)',
      'finalHome("charlotte", 1, "2026-09-05", "The Citadel", 41, 43)',
      'finalHome("utah-state", 1, "2026-09-05", "Idaho State", 17, 29)',
    ]);
    assert.deepEqual(pack.games.filter((g) => g.ot).map((g) => g.home_slug), ["charlotte"]);
  });

  it("leaves every other FCS stub unchanged", () => {
    const packCalls = new Set(pack.replacement_calls);
    assert.deepEqual(
      callLines(week1Block, "finalHome").filter((l) => !packCalls.has(l)),
      [
        'finalHome("minnesota", 1, "2026-09-03", "Eastern Illinois", 59, 7)',
        'finalHome("missouri", 1, "2026-09-03", "UAPB", 54, 14)',
        'finalHome("utah", 1, "2026-09-03", "Idaho", 66, 14)',
        'finalHome("purdue", 1, "2026-09-04", "Indiana State", 44, 19)',
        'finalHome("app-state", 1, "2026-09-05", "Maine", 55, 3)',
        'finalHome("army", 1, "2026-09-05", "Bryant", 59, 3)',
        'finalHome("byu", 1, "2026-09-05", "Utah Tech", 63, 7)',
        'finalHome("georgia", 1, "2026-09-05", "Tennessee State", 63, 3)',
        'finalHome("maryland", 1, "2026-09-05", "Hampton", 62, 0)',
        'finalHome("navy", 1, "2026-09-05", "Towson", 42, 15)',
        'finalHome("tennessee", 1, "2026-09-05", "Furman", 56, 9)',
        // Records audit (records_audit_vs_espn_2026-10-09): TTU Week 1 opponent/score corrected.
        'finalHome("texas-tech", 1, "2026-09-05", "Abilene Christian", 33, 10)',
        'finalHome("uconn", 1, "2026-09-05", "Lafayette", 56, 7)',
        'finalHome("virginia-tech", 1, "2026-09-05", "VMI", 73, 3)',
      ],
    );
    assert.deepEqual(callLines(week3Block, "finalHome").slice(0, 2), [
      'finalHome("iowa", 3, "2026-09-19", "Northern Iowa", 55, 0)',
      'finalHome("oregon", 3, "2026-09-18", "Portland State", 84, 0)',
    ]);
    assert.equal(fcsStubsForWeek(2).length, payload.games.length);
    // 87 after #84, + 36 records-audit finals (TTU is replace-not-add).
    assert.equal(FCS_STUB_GAMES.length, 123);
    // Buffalo Week 4 (Robert Morris) and Jacksonville State Week 0 (NDSU) landed in the records audit.
    assert.deepEqual(fcsStubsForTeam("buffalo").map((s) => s.week), [1, 4]);
    assert.deepEqual(fcsStubsForTeam("jacksonville-state").map((s) => s.week), [0, 1]);
  });
});

describe("Records audit vs ESPN (records_audit_vs_espn_2026-10-09)", () => {
  type SpecCall = {
    call: string;
    helper: "finalHome" | "finalAway";
    espn_id: string;
    team_slug: string;
    date_ct: string;
    fbs_is_home: boolean;
    fbs_result: "W" | "L";
    clear_or_hold: string;
    opponent: string;
    home_score: number;
    away_score: number;
  };
  const spec = JSON.parse(
    readFileSync(join(root, "data/records_audit_vs_espn_2026-10-09.json"), "utf8"),
  ) as {
    counts: { gap_games_CLEAR: number; gap_games_HOLD: number; remaining_gap_games: number; match_after_all_fixes: number };
    change_spec: {
      groups: {
        WEEK0_new_array: { calls: SpecCall[] };
        WEEK1_ttu_fix: { calls: Array<{ replace: string; with: string; espn_id: string; clear_or_hold: string }> };
        WEEK3_append: { calls: SpecCall[] };
        WEEK4_new_array: { calls: SpecCall[] };
        WEEK5_new_array: { calls: SpecCall[] };
      };
      call_counts: Record<string, number>;
      double_count_check: { week2_json_overlap: unknown[]; safe_to_stamp: boolean };
      records_after_all_fixes: Array<{ slug: string; after_all_fixes: string; espn_overall: string; matches_espn: boolean }>;
    };
  };
  const g = spec.change_spec.groups;
  const byWeek: Array<[number, SpecCall[]]> = [
    [0, g.WEEK0_new_array.calls],
    [3, g.WEEK3_append.calls],
    [4, g.WEEK4_new_array.calls],
    [5, g.WEEK5_new_array.calls],
  ];
  const allGap = byWeek.flatMap(([week, calls]) => calls.map((c) => ({ week, c })));
  const src = readFileSync(join(root, "src/lib/cfb/fcs-stubs.ts"), "utf8");
  const block = (start: string, end: string) => src.slice(src.indexOf(start), src.indexOf(end));
  const lines = (b: string) =>
    b
      .split("\n")
      .map((l) => l.trim().replace(/,$/, ""))
      .filter((l) => /^final(Home|Away)\(/.test(l));
  const blocks: Record<number, string> = {
    0: block("const WEEK0_FCS_STUBS", "const WEEK1_FCS_STUBS"),
    3: block("const WEEK3_FCS_STUBS", "const WEEK4_FCS_STUBS"),
    4: block("const WEEK4_FCS_STUBS", "const WEEK5_FCS_STUBS"),
    5: block("const WEEK5_FCS_STUBS", "export const FCS_STUB_GAMES"),
  };

  it("spec is 36 CLEAR / 0 HOLD gap games + TTU fix, counts W0 2 / W3 16 / W4 14 / W5 4", () => {
    assert.equal(spec.counts.remaining_gap_games, 36);
    assert.equal(spec.counts.gap_games_CLEAR, 36);
    assert.equal(spec.counts.gap_games_HOLD, 0);
    assert.equal(allGap.length, 36);
    assert.deepEqual(byWeek.map(([w, c]) => [w, c.length]), [[0, 2], [3, 16], [4, 14], [5, 4]]);
    assert.equal(spec.change_spec.call_counts.total_calls, 37);
    assert.equal(g.WEEK1_ttu_fix.calls.length, 1);
    for (const { week, c } of allGap) {
      assert.equal(c.clear_or_hold, "CLEAR", c.call);
      // The call string is exactly what the structured fields say.
      const [teamScore, oppScore] = c.fbs_is_home ? [c.home_score, c.away_score] : [c.away_score, c.home_score];
      assert.equal(c.helper, c.fbs_is_home ? "finalHome" : "finalAway", c.call);
      assert.equal(
        c.call,
        `${c.helper}("${c.team_slug}", ${week}, "${c.date_ct}", "${c.opponent}", ${teamScore}, ${oppScore})`,
      );
      assert.equal(c.fbs_result, teamScore > oppScore ? "W" : "L", c.call);
    }
  });

  it("stubs match the spec: exact calls per week array, and each stub's fields", () => {
    for (const [week, calls] of byWeek) {
      const have = lines(blocks[week]);
      const want = calls.map((c) => c.call);
      if (week === 3) {
        // Iowa + Oregon predate the audit; the 16 gap finals are appended after them.
        assert.deepEqual(have.slice(2), want);
      } else {
        assert.deepEqual(have, want, `week ${week}`);
      }
      for (const c of calls) {
        const matches = FCS_STUB_GAMES.filter(
          (s) => s.teamSlug === c.team_slug && s.week === week && s.kickoffDate === c.date_ct,
        );
        assert.equal(matches.length, 1, c.call);
        const s = matches[0];
        assert.deepEqual(
          [s.status, s.home, s.opponentLabel, s.homeScore, s.awayScore],
          ["final", c.fbs_is_home, c.opponent, c.home_score, c.away_score],
          c.call,
        );
        assert.equal(fcsStubIsFinal(s), true);
        assert.deepEqual(
          tallyFcsStubs([s]),
          c.fbs_result === "W" ? { seasonWins: 1, seasonLosses: 0 } : { seasonWins: 0, seasonLosses: 1 },
          c.call,
        );
      }
    }
    assert.equal(fcsStubsForWeek(0).length, 2);
    assert.equal(fcsStubsForWeek(3).length, 18);
    assert.equal(fcsStubsForWeek(4).length, 14);
    assert.equal(fcsStubsForWeek(5).length, 4);
  });

  it("finalAway sets home:false and maps team score to away, opponent score to home", () => {
    const away = allGap.filter(({ c }) => !c.fbs_is_home).map(({ c }) => c.call).sort();
    assert.deepEqual(away, [
      'finalAway("jacksonville-state", 0, "2026-08-29", "North Dakota State", 7, 33)',
      'finalAway("massachusetts", 4, "2026-09-26", "Sacramento State", 35, 6)',
      'finalAway("wyoming", 5, "2026-10-03", "North Dakota State", 0, 28)',
    ]);
    const jxst = fcsStubsForTeam("jacksonville-state").find((s) => s.week === 0);
    assert.ok(jxst);
    assert.equal(jxst.home, false);
    assert.equal(jxst.homeScore, 33); // NDSU (venue home)
    assert.equal(jxst.awayScore, 7); // Jax State
    assert.deepEqual(tallyFcsStubs([jxst]), { seasonWins: 0, seasonLosses: 1 });
    const umass = fcsStubsForTeam("massachusetts").find((s) => s.week === 4);
    assert.ok(umass);
    assert.deepEqual([umass.home, umass.homeScore, umass.awayScore], [false, 6, 35]);
    assert.deepEqual(tallyFcsStubs([umass]), { seasonWins: 1, seasonLosses: 0 });
    const wyo = fcsStubsForTeam("wyoming").find((s) => s.week === 5);
    assert.ok(wyo);
    assert.deepEqual([wyo.home, wyo.homeScore, wyo.awayScore], [false, 28, 0]);
    assert.deepEqual(tallyFcsStubs([wyo]), { seasonWins: 0, seasonLosses: 1 });
    // Board mapping keeps the FBS team on the away side.
    const row = fcsStubToScheduleGame(wyo);
    assert.equal(row.awaySlug, "wyoming");
    assert.equal(row.homeName, "North Dakota State");
    assert.deepEqual([row.homeScore, row.awayScore, row.status], [28, 0, "final"]);
    // Records: Jax State 1–1 (W1 EKU W, W0 NDSU L); Wyoming 1–1 (W2 W, W5 NDSU L); UMass 3–0.
    assert.deepEqual(tallyFcsStubRecord("jacksonville-state"), { seasonWins: 1, seasonLosses: 1 });
    assert.deepEqual(tallyFcsStubRecord("wyoming"), { seasonWins: 1, seasonLosses: 1 });
    assert.deepEqual(tallyFcsStubRecord("massachusetts"), { seasonWins: 3, seasonLosses: 0 });
    // Away FINALs never surface as Remaining schedule rows.
    for (const slug of ["jacksonville-state", "massachusetts", "wyoming"]) {
      assert.equal(buildRemainingSchedule(slug, []).filter((r) => r.isFcs).length, 0, slug);
    }
  });

  it("TTU Week 1 is Abilene Christian 33–10 (ESPN 401856770); K-State's Nicholls 71–3 is intact", () => {
    const fix = g.WEEK1_ttu_fix.calls[0];
    assert.equal(fix.clear_or_hold, "CLEAR");
    assert.equal(fix.espn_id, "401856770");
    assert.ok(src.includes(fix.with), fix.with);
    assert.ok(!src.includes(fix.replace), fix.replace);
    const ttu = fcsStubsForTeam("texas-tech");
    assert.equal(ttu.length, 1);
    assert.deepEqual(
      [ttu[0].week, ttu[0].kickoffDate, ttu[0].opponentLabel, ttu[0].home, ttu[0].homeScore, ttu[0].awayScore],
      [1, "2026-09-05", "Abilene Christian", true, 33, 10],
    );
    assert.deepEqual(tallyFcsStubRecord("texas-tech"), { seasonWins: 1, seasonLosses: 0 });
    const ksu = fcsStubsForTeam("kansas-state");
    assert.equal(ksu.length, 1);
    assert.deepEqual(
      [ksu[0].week, ksu[0].opponentLabel, ksu[0].home, ksu[0].homeScore, ksu[0].awayScore],
      [1, "Nicholls", true, 71, 3],
    );
    // Only K-State (W1) and Sam Houston (W3, records audit) list Nicholls.
    assert.deepEqual(
      FCS_STUB_GAMES.filter((s) => s.opponentLabel === "Nicholls").map((s) => `${s.teamSlug}:${s.week}`),
      ["kansas-state:1", "sam-houston:3"],
    );
  });

  it("no duplicates: no WEEK2 JSON overlap, one stub per team-week, no team double-booked on a date", () => {
    assert.deepEqual(spec.change_spec.double_count_check.week2_json_overlap, []);
    const week2Ids = new Set(payload.games.map((x) => x.espn_event_id));
    const week2Teams = new Set(payload.games.map((x) => x.fbs_slug));
    for (const { week, c } of allGap) {
      assert.ok(!week2Ids.has(c.espn_id), c.espn_id);
      assert.notEqual(week, 2);
      // Gap teams that also have a Week 2 FCS row are distinct games (different week/opponent).
      if (week2Teams.has(c.team_slug)) {
        const w2 = fcsStubsForTeam(c.team_slug).filter((s) => s.week === 2);
        for (const s of w2) assert.notEqual(s.kickoffDate, c.date_ct, c.call);
      }
    }
    assert.equal(new Set(allGap.map(({ c }) => c.espn_id)).size, 36);
    const teamWeek = FCS_STUB_GAMES.map((s) => `${s.teamSlug}|${s.week}`);
    assert.equal(new Set(teamWeek).size, teamWeek.length, "duplicate team-week FCS stub");
    const teamDate = FCS_STUB_GAMES.map((s) => `${s.teamSlug}|${s.kickoffDate}`);
    assert.equal(new Set(teamDate).size, teamDate.length, "duplicate team-date FCS stub");
  });

  it("no duplicates against games: migrations never stamp these team-weeks or ESPN ids", () => {
    // `games` is FBS–FBS only; a gap stub would double-count only if a migration
    // inserted the same team on the same week/date. Check every migration's text.
    const migDir = join(root, "migrations");
    const sql = readdirSync(migDir)
      .filter((f) => f.endsWith(".sql"))
      .map((f) => readFileSync(join(migDir, f), "utf8"))
      .join("\n");
    for (const { c } of allGap) {
      assert.ok(!sql.includes(c.espn_id), `${c.espn_id} in migrations`);
    }
    assert.ok(!sql.includes("401856770"));
    // FCS opponents are never team slugs in the 136 (no games row can reference them).
    for (const { c } of allGap) {
      const fcsSlug = c.opponent.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      assert.ok(!new RegExp(`slug = '${fcsSlug}'`).test(sql), fcsSlug);
    }
  });

  it("schedule board stays Vegas-only Week 2: no W–L stub renders as a /schedule row", () => {
    for (const w of [0, 1, 3, 4, 5, 6]) assert.equal(fcsScheduleGamesForWeek(w).length, 0, `week ${w}`);
    assert.equal(fcsScheduleGamesForWeek(2).length, 39);
  });
});

describe("scheduled() fixture (unused in data since #84)", () => {
  it("builds an unplayed home stub that never counts and stays on Remaining", () => {
    const s = scheduled("ohio-state", 7, "2026-10-17");
    assert.deepEqual(s, {
      teamSlug: "ohio-state",
      week: 7,
      kickoffDate: "2026-10-17",
      opponentLabel: "FCS opponent",
      home: true,
      status: "scheduled",
      homeScore: null,
      awayScore: null,
    });
    assert.equal(fcsStubIsFinal(s), false);
    assert.deepEqual(tallyFcsStubs([s]), { seasonWins: 0, seasonLosses: 0 });
    const row = fcsStubToScheduleGame(s);
    assert.deepEqual([row.status, row.homeScore, row.awayScore, row.homeSlug], ["scheduled", null, null, "ohio-state"]);
    // A scheduled stub next to a FINAL: only the FINAL counts.
    const fin = { ...s, week: 1, kickoffDate: "2026-09-05", status: "final" as const, homeScore: 30, awayScore: 3 };
    assert.deepEqual(tallyFcsStubs([s, fin]), { seasonWins: 1, seasonLosses: 0 });
    // Remaining: the scheduled stub is listed; the FINAL is not.
    const remaining = buildRemainingSchedule("ohio-state", [], [s, fin]);
    assert.equal(remaining.length, 1);
    assert.equal(remaining[0].isFcs, true);
    assert.equal(remaining[0].week, 7);
    assert.equal(remaining[0].kickoffDate, "2026-10-17");
    assert.equal(buildRemainingSchedule("ohio-state", [], [fin]).length, 0);
    // No live data uses scheduled(): every current stub outside Week 2 JSON is FINAL.
    assert.equal(FCS_STUB_GAMES.filter((x) => x.status === "scheduled").length, 0);
  });
});
