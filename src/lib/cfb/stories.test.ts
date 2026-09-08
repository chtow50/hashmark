import assert from "node:assert/strict";
import test from "node:test";
import { STORIES } from "./stories.ts";

const WEEK1_FRIDAY = [
  "week-1-lsu-clemson-gap",
  "week-1-georgia-hx-one",
  "week-1-miami-stanford-gap",
  "week-1-oregon-boise",
  "week-1-ole-miss-louisville",
  "week-1-notre-dame-lambeau",
] as const;

const SOURCED_CLOSES = [
  "LSU −10.5",
  "Miami −23.5",
  "Ole Miss −6.5",
  "Notre Dame −20.5",
] as const;

test("Week 1 tape leads STORIES; Friday package follows", () => {
  assert.equal(STORIES[0]?.slug, "week-1-tape");
  assert.match(STORIES[0]?.headline ?? "", /36\/43/);
  assert.match(STORIES[0]?.headline ?? "", /20\/43/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /83\.7%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /46\.5%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /term = O\/D/i);
  assert.deepEqual(
    STORIES.slice(1, 1 + WEEK1_FRIDAY.length).map((s) => s.slug),
    [...WEEK1_FRIDAY],
  );
});

test("Week 1 package uses only the four sourced HASHMARK Vegas closes", () => {
  const week1 = STORIES.filter((s) => s.slug.startsWith("week-1-"));
  const text = week1
    .flatMap((s) => [...s.body, s.whyItMatters, s.dek, s.headline])
    .join("\n");
  for (const close of SOURCED_CLOSES) {
    assert.equal(text.includes(close), true, `missing sourced close: ${close}`);
  }
  assert.equal(text.includes("The board is posted"), false);
  assert.match(text, /Hawaiʻi/);
  assert.doesNotMatch(text, /HASHMARK(?:’s)? Vegas close.*Oregon/);
  assert.doesNotMatch(text, /Vegas(?: close)?(?: is| of)? Toledo/);
});
