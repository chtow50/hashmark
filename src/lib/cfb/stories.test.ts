import assert from "node:assert/strict";
import test from "node:test";
import { STORIES } from "./stories.ts";

const WEEK3_FRIDAY = [
  "week-3-houston-texas-tech",
  "week-3-lsu-ole-miss",
  "week-3-unc-clemson",
  "week-3-usc-rutgers",
  "week-3-indiana-wku",
] as const;

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

const WEEK3_SOURCED_CLOSES = [
  "Texas Tech −7.5",
  "LSU −3.0",
  "Clemson −3.5",
  "USC −23.5",
  "Indiana −44.5",
] as const;

test("Week 3 tape leads STORIES; Week 3 Friday then Week 2 tape then Week 1 follow", () => {
  assert.equal(STORIES[0]?.slug, "week-3-tape");
  assert.match(STORIES[0]?.headline ?? "", /49\/56/);
  assert.match(STORIES[0]?.headline ?? "", /23\/56/);
  assert.match(STORIES[0]?.headline ?? "", /FLAG/);
  assert.match(STORIES[0]?.headline ?? "", /5\/21/);
  assert.match(STORIES[0]?.dek ?? "", /20\/21/);
  assert.match(STORIES[0]?.dek ?? "", /5\/21/);
  const w3 = [STORIES[0]?.headline, STORIES[0]?.dek, STORIES[0]?.whyItMatters, ...(STORIES[0]?.body ?? [])].join(
    "\n",
  );
  assert.match(w3, /87\.5%/);
  assert.match(w3, /41\.1%/);
  assert.match(w3, /29\/56/);
  assert.match(w3, /51\.8%/);
  assert.match(w3, /83\.6%/);
  assert.match(w3, /43\.2%/);
  assert.match(w3, /122\/146/);
  assert.match(w3, /63\/146/);
  assert.match(w3, /23\.8%/);
  assert.match(w3, /20\/21/);
  assert.match(w3, /16\/21/);
  assert.match(w3, /10\.03/);
  assert.match(w3, /8\.71/);
  assert.match(w3, /Kentucky @ Texas A&M/);
  assert.match(w3, /Nevada @ Middle Tennessee/);
  assert.match(w3, /LSU @ Ole Miss/);
  assert.match(w3, /UConn @ Southern Miss/);
  assert.match(w3, /Ohio @ South Alabama/);
  assert.match(w3, /HX not retuned/);
  assert.doesNotMatch(w3, /The board is posted/);
  assert.doesNotMatch(w3, /2026\.5/);
  assert.doesNotMatch(w3, /FCS/);
  assert.doesNotMatch(w3, /\block/i);
  assert.doesNotMatch(w3, /guaranteed ROI/i);
  assert.deepEqual(
    STORIES.slice(1, 1 + WEEK3_FRIDAY.length).map((s) => s.slug),
    [...WEEK3_FRIDAY],
  );
  const tapeIdx = 1 + WEEK3_FRIDAY.length;
  assert.equal(STORIES[tapeIdx]?.slug, "week-2-tape");
  assert.match(STORIES[tapeIdx]?.headline ?? "", /37\/47/);
  assert.match(STORIES[tapeIdx]?.headline ?? "", /20\/47/);
  assert.match(STORIES[tapeIdx]?.headline ?? "", /FLAG/);
  assert.match(STORIES[tapeIdx]?.headline ?? "", /12\/19/);
  assert.match(STORIES[tapeIdx]?.dek ?? "", /12\/19/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /78\.7%/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /42\.6%/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /81\.1%/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /44\.4%/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /63\.2%/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /17\/19/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /10\.81/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /12\.03/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /12\/18/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /66\.7%/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /Oregon @ OKST/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /OSU @ Texas/);
  assert.match(STORIES[tapeIdx]?.whyItMatters ?? "", /12\/19/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /pre-Δ/);
  assert.match(STORIES[tapeIdx]?.body.join("\n") ?? "", /2026\.3/);
  assert.doesNotMatch(STORIES[tapeIdx]?.body.join("\n") ?? "", /The board is posted/);
  assert.doesNotMatch(STORIES[tapeIdx]?.headline ?? "", /2026\.4/);
  assert.doesNotMatch(STORIES[tapeIdx]?.body.join("\n") ?? "", /FCS/);
  assert.equal(STORIES[tapeIdx + 1]?.slug, "week-1-tape");
  assert.match(STORIES[tapeIdx + 1]?.headline ?? "", /36\/43/);
  assert.match(STORIES[tapeIdx + 1]?.headline ?? "", /20\/43/);
  assert.match(STORIES[tapeIdx + 1]?.body.join("\n") ?? "", /term = O\/D/i);
  assert.deepEqual(
    STORIES.slice(tapeIdx + 2, tapeIdx + 2 + WEEK1_FRIDAY.length).map((s) => s.slug),
    [...WEEK1_FRIDAY],
  );
});

test("Week 3 package uses Week 3 AP ranks and sourced HASHMARK Vegas closes", () => {
  const week3 = STORIES.filter((s) => s.slug.startsWith("week-3-") && s.slug !== "week-3-tape");
  assert.equal(week3.length, 5);
  const text = week3
    .flatMap((s) => [...s.body, s.whyItMatters, s.dek, s.headline])
    .join("\n");
  for (const close of WEEK3_SOURCED_CLOSES) {
    assert.equal(text.includes(close), true, `missing sourced close: ${close}`);
  }
  assert.match(text, /AP(?:’s)? 13|AP 13/);
  assert.match(text, /Tigers 7th|AP 7|AP ballot that has the Tigers 7th/);
  assert.match(text, /against AP 12/);
  assert.match(text, /against AP 4/);
  assert.doesNotMatch(text, /AP 8/);
  assert.doesNotMatch(text, /AP 14/);
  assert.doesNotMatch(text, /AP 5/);
  assert.doesNotMatch(text, /AP 23/);
  assert.doesNotMatch(text, /Week 4 board/);
  assert.doesNotMatch(text, /home (?:gap )?module still/);
  assert.doesNotMatch(text, /\block\b/i);
  assert.doesNotMatch(text, /guaranteed ROI/i);
  for (const s of week3) {
    assert.ok(s.sources.some((src) => src.href.startsWith("https://hashmarkcfb.com")));
    assert.equal(
      s.sources.every(
        (src) =>
          src.href.startsWith("https://hashmarkcfb.com") ||
          src.href.startsWith("https://www.ncaa.com/") ||
          src.href.startsWith("https://www.thebiglead.com/") ||
          src.href.startsWith("https://gatorswire.usatoday.com/") ||
          src.href.startsWith("https://www.reuters.com/") ||
          src.href.startsWith("https://www.wafb.com/") ||
          src.href.startsWith("https://www.wlbt.com/") ||
          src.href.startsWith("https://www.si.com/") ||
          src.href.startsWith("https://www.espn.com/"),
      ),
      true,
      s.slug,
    );
  }
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
