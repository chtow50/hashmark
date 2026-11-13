/**
 * Test helper for the 2026 FBS newcomers (0093). Older stamp tests listed their games with
 * FBS teams as FCS stubs; those rows now live in `games` (data/fbs_newcomers_2026.json).
 * `splitNewcomerStubRows` drops them from a stub expectation and checks each one moved intact.
 */
import assert from "node:assert/strict";
import newcomers from "../../../data/fbs_newcomers_2026.json" with { type: "json" };
import { FBS_NEWCOMER_LABELS } from "./fcs-stubs.ts";

const SLUG_BY_LABEL: Record<string, string> = {
  "North Dakota State": "north-dakota-state",
  "Sacramento State": "sacramento-state",
};

type StubRow = readonly [string, boolean, string, number | null, number | null, string];

export function splitNewcomerStubRows<T extends StubRow>(rows: readonly T[]): T[] {
  const kept: T[] = [];
  for (const row of rows) {
    const [teamSlug, fbsHome, label, homeScore, awayScore, status] = row;
    if (!(FBS_NEWCOMER_LABELS as readonly string[]).includes(label)) {
      kept.push(row);
      continue;
    }
    const newcomer = SLUG_BY_LABEL[label];
    const [home, away] = fbsHome ? [teamSlug, newcomer] : [newcomer, teamSlug];
    const g = newcomers.fbs_games.find((x) => x.home === home && x.away === away);
    assert.ok(g, `${away} @ ${home} moved to games (data/fbs_newcomers_2026.json)`);
    assert.deepEqual([g.home_score, g.away_score, g.status], [homeScore, awayScore, status], `${away} @ ${home}`);
  }
  return kept;
}
