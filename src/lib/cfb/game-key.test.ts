import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { chicagoDate, gameKey, parseGameKey } from "./game-key.ts";

describe("game keys and the cached box file", () => {
  it("round-trips keys, including hyphenated slugs", () => {
    const k = gameKey("2026-10-10", "texas-am", "missouri");
    assert.equal(k, "2026-10-10-texas-am-at-missouri");
    assert.deepEqual(parseGameKey(k), { date: "2026-10-10", away: "texas-am", home: "missouri" });
    assert.deepEqual(parseGameKey("2026-09-05-missouri-state-at-texas-am"), { date: "2026-09-05", away: "missouri-state", home: "texas-am" });
    assert.equal(parseGameKey("nope"), null);
    assert.equal(chicagoDate("2026-09-12T01:00:00.000Z"), "2026-09-11");
  });
  it("box file: every game has both sides and the box points equal the game score", () => {
    const f = JSON.parse(readFileSync(new URL("../../../data/game_box_2026.json", import.meta.url), "utf8"));
    const games = Object.values(f.games) as { home: string; away: string; hp: number; ap: number; box: Record<string, { pts: number }> }[];
    assert.equal(games.length, f.meta.games);
    for (const g of games) {
      assert.equal(g.box[g.home].pts, g.hp);
      assert.equal(g.box[g.away].pts, g.ap);
    }
  });
});
