import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { fcsScheduleGamesForWeek } from "./fcs-stubs.ts";
import {
  auditStampShipGate,
  countSeedFbsGamesForWeek,
  evaluateFcsFbsStampGate,
  formatStampGaps,
  parseSqlStampsForWeek,
  readMigrationsSql,
} from "./fcs-fbs-stamp-gate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function fixtureRoot(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), "hashmark-stamp-gate-"));
  mkdirSync(join(dir, "data"), { recursive: true });
  mkdirSync(join(dir, "migrations"), { recursive: true });
  for (const [rel, body] of Object.entries(files)) {
    const path = join(dir, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, body);
  }
  return dir;
}

const fcsJson = (week: number, n = 2) =>
  JSON.stringify({
    meta: { week, n_fbs_fcs: n },
    games: Array.from({ length: n }, (_, i) => ({
      espn_event_id: `fcs-${week}-${i}`,
      hx_spread_policy: "vegas_only_fcs_unrated",
      vegas_spread: -10.5,
    })),
  });

const fbsPack = (
  week: number,
  games: Array<{
    espn_event_id: string;
    kick_ct: string | null;
    vegas_spread: number | null;
    home?: string;
    away?: string;
  }>,
) =>
  JSON.stringify({
    meta: { week, n_games: games.length, n_blank_vegas: games.filter((g) => g.vegas_spread == null).length },
    games: games.map((g) => ({
      ...g,
      home_location: g.home ?? "Home",
      away_location: g.away ?? "Away",
      tv: "ABC",
    })),
  });

describe("ship gate: wrong stamp is worse than late — block FCS week if FBS–FBS kick/Vegas are incomplete", () => {
  it("fails a fixture with FCS present and blank FBS–FBS kicks (the Week 2 burial bug)", () => {
    const gaps = evaluateFcsFbsStampGate({
      week: 9,
      fcsCount: 39,
      fbsGames: [
        {
          espnEventId: "401900001",
          label: "Ohio State @ Texas",
          kickCt: null,
          vegasSpread: null,
        },
        {
          espnEventId: "401900002",
          label: "Oklahoma @ Michigan",
          kickCt: "",
          vegasSpread: -5.5,
        },
        {
          espnEventId: "401900003",
          label: "Rutgers @ Boston College",
          kickCt: "2026-09-19 18:30",
          vegasSpread: 3.5,
        },
      ],
    });
    assert.ok(gaps.length >= 3, formatStampGaps(gaps));
    assert.ok(gaps.some((g) => g.kind === "missing_kick" && g.game?.includes("Texas")));
    assert.ok(gaps.some((g) => g.kind === "missing_kick" && g.game?.includes("Michigan")));
    assert.ok(gaps.some((g) => g.kind === "missing_vegas" && g.game?.includes("Texas")));
    assert.ok(!gaps.some((g) => g.game?.includes("Boston College") && g.kind === "missing_kick"));
  });

  it("fails when FCS JSON exists and the FBS–FBS Research pack is missing", () => {
    const gaps = evaluateFcsFbsStampGate({
      week: 3,
      fcsCount: 12,
      fbsGames: [],
    });
    assert.equal(gaps.length, 1);
    assert.equal(gaps[0]?.kind, "missing_pack");
    assert.match(gaps[0]?.detail ?? "", /worse than late/);
  });

  it("does not block a week with no FCS on the board even if FBS kicks are still blank", () => {
    const gaps = evaluateFcsFbsStampGate({
      week: 3,
      fcsCount: 0,
      fbsGames: [{ espnEventId: "x", label: "A @ B", kickCt: null, vegasSpread: null }],
    });
    assert.deepEqual(gaps, []);
  });

  it("allows blank Vegas only when the espn id is on the documented Research allowlist", () => {
    const row = {
      espnEventId: "401900099",
      label: "Example @ Game",
      kickCt: "2026-09-19 14:30",
      vegasSpread: null as number | null,
    };
    const blocked = evaluateFcsFbsStampGate({ week: 4, fcsCount: 1, fbsGames: [row] });
    assert.ok(blocked.some((g) => g.kind === "missing_vegas"));
    const allowed = evaluateFcsFbsStampGate({
      week: 4,
      fcsCount: 1,
      fbsGames: [row],
      blankVegasAllowlist: ["401900099"],
    });
    assert.equal(allowed.length, 0, formatStampGaps(allowed));
  });

  it("fails a temp tree: week-N FCS JSON + pack with blank kicks and no SQL", () => {
    const dir = fixtureRoot({
      "data/week9_fbs_fcs_spreads_2026.json": fcsJson(9, 2),
      "data/week9_fbs_fbs_kick_tv_vegas_2026.json": fbsPack(9, [
        { espn_event_id: "401900010", kick_ct: null, vegas_spread: null, away: "Alpha", home: "Beta" },
        { espn_event_id: "401900011", kick_ct: "2026-10-10 11:00", vegas_spread: -3.5, away: "Gamma", home: "Delta" },
      ]),
      "migrations/0099_week9_incomplete.sql": "-- no kickoff_at stamps\n",
    });
    const verdict = auditStampShipGate(dir, { includeCodePath: false });
    assert.equal(verdict.ok, false, "gate must block this fixture");
    assert.deepEqual(verdict.weeksChecked, [9]);
    assert.ok(verdict.gaps.some((g) => g.kind === "missing_kick"));
    assert.ok(verdict.gaps.some((g) => g.kind === "sql_unstamped"));
  });

  it("fails a temp tree when FCS JSON exists and the FBS–FBS pack is absent (PR 31 shape)", () => {
    const dir = fixtureRoot({
      "data/week8_fbs_fcs_spreads_2026.json": fcsJson(8, 3),
    });
    const verdict = auditStampShipGate(dir, { includeCodePath: false });
    assert.equal(verdict.ok, false);
    assert.ok(verdict.gaps.some((g) => g.kind === "missing_pack" && g.week === 8));
  });

  it("passes a temp tree with FCS + fully stamped FBS–FBS pack and SQL", () => {
    const dir = fixtureRoot({
      "data/week7_fbs_fcs_spreads_2026.json": fcsJson(7, 1),
      "data/week7_fbs_fbs_kick_tv_vegas_2026.json": fbsPack(7, [
        {
          espn_event_id: "401900777",
          kick_ct: "2026-10-17 14:30",
          vegas_spread: -6.5,
          away: "Away U",
          home: "Home U",
        },
      ]),
      "migrations/0003_seed.sql": `insert into games (week, kickoff_date, home_team_id, away_team_id, neutral, location, headline) values
  (7, '2026-10-17', 1, 2, false, 'Stadium', NULL);
`,
      "migrations/0025_week7_kick_tv_vegas.sql": `-- Away U @ Home U · Sat 2026-10-17 14:30 CT · ABC · HOME -6.5 · ESPN 401900777
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'home-u' then 6.5 else -6.5 end
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'home-u' and a.slug = 'away-u'
  and g.week = 7;
`,
    });
    const verdict = auditStampShipGate(dir, { includeCodePath: false });
    assert.equal(verdict.ok, true, formatStampGaps(verdict.gaps));
    assert.deepEqual(verdict.weeksChecked, [7]);
  });

  it("passes current Week 2: FCS Vegas-only on the board and FBS–FBS kick/Vegas stamped (PR 32)", () => {
    assert.equal(fcsScheduleGamesForWeek(2).length, 39);
    const verdict = auditStampShipGate(root, { includeCodePath: true });
    assert.ok(verdict.weeksChecked.includes(2), `checked weeks: ${verdict.weeksChecked.join(",")}`);
    assert.equal(verdict.ok, true, formatStampGaps(verdict.gaps));

    const sql = parseSqlStampsForWeek(readMigrationsSql(root), 2);
    assert.equal(sql.size, 47);
    assert.equal(sql.get("401856682")?.hasKick, true);
    assert.equal(sql.get("401856682")?.hasVegas, true);
    assert.equal(sql.get("401856679")?.hasKick, true);
    assert.equal(sql.get("401858214")?.hasKick, true);

    const seedN = countSeedFbsGamesForWeek(readFileSync(join(root, "migrations/0003_seed.sql"), "utf8"), 2);
    assert.equal(seedN, 47);
  });
});
