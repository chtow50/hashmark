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

test("Week 2 tape leads STORIES; Week 1 tape then Friday package follow", () => {
  assert.equal(STORIES[0]?.slug, "week-2-tape");
  assert.match(STORIES[0]?.headline ?? "", /37\/47/);
  assert.match(STORIES[0]?.headline ?? "", /20\/47/);
  assert.match(STORIES[0]?.headline ?? "", /FLAG/);
  assert.match(STORIES[0]?.headline ?? "", /12\/19/);
  assert.match(STORIES[0]?.dek ?? "", /12\/19/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /78\.7%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /42\.6%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /81\.1%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /44\.4%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /63\.2%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /17\/19/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /10\.81/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /12\.03/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /12\/18/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /66\.7%/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /Oregon @ OKST/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /OSU @ Texas/);
  assert.match(STORIES[0]?.whyItMatters ?? "", /12\/19/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /pre-Δ/);
  assert.match(STORIES[0]?.body.join("\n") ?? "", /2026\.3/);
  assert.doesNotMatch(STORIES[0]?.body.join("\n") ?? "", /The board is posted/);
  assert.doesNotMatch(STORIES[0]?.headline ?? "", /2026\.4/);
  assert.doesNotMatch(STORIES[0]?.body.join("\n") ?? "", /FCS/);
  assert.equal(STORIES[1]?.slug, "week-1-tape");
  assert.match(STORIES[1]?.headline ?? "", /36\/43/);
  assert.match(STORIES[1]?.headline ?? "", /20\/43/);
  assert.match(STORIES[1]?.body.join("\n") ?? "", /term = O\/D/i);
  assert.deepEqual(
    STORIES.slice(2, 2 + WEEK1_FRIDAY.length).map((s) => s.slug),
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
  const week2 = STORIES.find((s) => s.slug === "week-2-tape");
  const week2Text = [week2?.headline, week2?.dek, week2?.whyItMatters, ...(week2?.body ?? [])].join(
    "\n",
  );
  assert.equal(text.includes("The board is posted"), false);
  assert.equal(week2Text.includes("The board is posted"), false);
  assert.match(week2Text, /Research Vegas pack/);
  assert.match(week2Text, /ESPN FINALs/);
  assert.match(week2Text, /Mich −5\.4/);
  assert.match(week2Text, /Ohio St −1\.0/);
  assert.match(text, /Hawaiʻi/);
  assert.doesNotMatch(text, /HASHMARK(?:’s)? Vegas close.*Oregon/);
  assert.doesNotMatch(text, /Vegas(?: close)?(?: is| of)? Toledo/);
});
