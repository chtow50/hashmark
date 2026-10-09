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

const WEEK4_FRIDAY = [
  "week-4-texas-am-lsu",
  "week-4-ole-miss-florida",
  "week-4-texas-tennessee",
  "week-4-oregon-usc",
  "week-4-clemson-cal",
  "week-4-missouri-mississippi-state",
] as const;

const WEEK5_FRIDAY = [
  "week-5-florida-missouri",
  "week-5-miami-clemson",
  "week-5-alabama-mississippi-state",
  "week-5-ohio-state-iowa",
  "week-5-louisville-nc-state",
  "week-5-wku-nmsu-final",
] as const;

const WEEK6_FRIDAY = [
  "week-6-georgia-alabama",
  "week-6-ucla-oregon",
  "week-6-texas-am-missouri",
  "week-6-ranked-chill-gaps",
  "week-6-midweek-tape",
] as const;
const W6 = WEEK6_FRIDAY.length;

test("Week 6 Friday desk leads STORIES: CLEAR stories only, Oct 5 CLEAR Vegas, Week 6 AP, no win_title", () => {
  assert.deepEqual(
    STORIES.slice(0, W6).map((s) => s.slug),
    [...WEEK6_FRIDAY],
  );
  // Story 4 (Iowa @ Washington) is Website peer HOLD for Research.
  assert.equal(STORIES.find((s) => s.slug === "week-6-iowa-washington"), undefined);
  const text = (i: number) => {
    const s = STORIES[i];
    return [s?.headline, s?.dek, s?.whyItMatters, ...(s?.body ?? [])].join("\n");
  };
  for (let i = 0; i < W6; i++) {
    const t = text(i);
    assert.equal(STORIES[i]?.date, "Friday, Oct 9, 2026");
    assert.doesNotMatch(t, /win_title|title odds|win the title/i);
    assert.doesNotMatch(t, /The board is posted/);
    assert.doesNotMatch(t, /ESPN now/);
    assert.doesNotMatch(t, /\block\b/i);
    assert.doesNotMatch(t, /guaranteed ROI/i);
    for (const src of STORIES[i]?.sources ?? []) {
      assert.match(src.href, /^https:\/\//, src.href);
      assert.doesNotMatch(src.href, /grok\.me|www\.hashmarkcfb/);
      if (/hashmark/i.test(src.label)) assert.match(src.href, /^https:\/\/hashmarkcfb\.com\//);
    }
  }
  const uga = text(0);
  assert.match(uga, /Georgia −4\.6, 61\.8%/);
  assert.match(uga, /1\.5-point favorite/);
  assert.match(uga, /86\.5% Make 12/);
  assert.doesNotMatch(uga, /51\.5/);
  const ore = text(1);
  assert.match(ore, /Oregon −24\.5, 89\.0%/);
  assert.match(ore, /Oregon −11\.5, O\/U 59\.5/);
  assert.match(ore, /No\. 21 UCLA/);
  const mizz = text(2);
  assert.match(mizz, /Texas A&M −2\.1, 55\.7%/);
  assert.match(mizz, /Vegas Missouri −3\.5/);
  assert.match(mizz, /No\. 25 to No\. 14/);
  const chill = text(3);
  assert.match(chill, /Florida −5\.2 \(63\.3%\) vs Vegas Florida −13\.5/);
  assert.match(chill, /Tennessee −7\.4 \(68\.0%\) vs Vegas −13\.5/);
  assert.match(chill, /Oklahoma State −1\.9 \(55\.2%\) vs Vegas −10\.0/);
  assert.match(chill, /Vegas \(−4\.5\)/);
  assert.match(chill, /No\. 16 Florida/);
  assert.match(chill, /No\. 25 Pittsburgh/);
  assert.match(chill, /soft-calibration FLAG/);
  assert.doesNotMatch(chill, /−11\.5|−10\.5|−3\.5/);
  const tape = text(4);
  for (const score of ["55–34", "27–26", "22–3", "35–3", "34–13", "31–24", "56–49"]) {
    assert.match(tape, new RegExp(score));
  }
  assert.match(tape, /6–1/);
});

test("Week 5 tape follows the Week 6 Friday desk; Week 5 Friday then Week 4 tape follow", () => {
  assert.equal(STORIES[W6 + 0]?.slug, "week-5-tape");
  assert.equal(STORIES[W6 + 0]?.date, "Sunday, Oct 4, 2026");
  assert.match(STORIES[W6 + 0]?.headline ?? "", /39\/55/);
  assert.match(STORIES[W6 + 0]?.headline ?? "", /20\/55/);
  assert.match(STORIES[W6 + 0]?.headline ?? "", /FLAG/);
  assert.doesNotMatch(STORIES[W6 + 0]?.headline ?? "", /7\/15/);
  const w5tape = [
    STORIES[W6 + 0]?.headline,
    STORIES[W6 + 0]?.dek,
    STORIES[W6 + 0]?.whyItMatters,
    ...(STORIES[W6 + 0]?.body ?? []),
  ].join("\n");
  assert.match(w5tape, /70\.9%/);
  assert.match(w5tape, /36\.4%/);
  assert.match(w5tape, /35\/55/);
  assert.match(w5tape, /26\/55/);
  assert.match(w5tape, /47\.3%/);
  assert.match(w5tape, /14\.87/);
  assert.match(w5tape, /13\.19/);
  assert.match(w5tape, /78\.7%/);
  assert.match(w5tape, /39\.9%/);
  assert.match(w5tape, /203\/258/);
  assert.match(w5tape, /103\/258/);
  assert.match(w5tape, /7\/15/);
  assert.match(w5tape, /46\.7%/);
  assert.match(w5tape, /13\/15/);
  assert.match(w5tape, /Soft-cal FLAG/);
  assert.match(w5tape, /all-D/);
  assert.match(w5tape, /HX not retuned/);
  assert.match(w5tape, /not a fresh audit/);
  assert.doesNotMatch(w5tape, /2026\.7/);
  assert.doesNotMatch(w5tape, /The board is posted/);
  assert.doesNotMatch(w5tape, /\block/i);
  assert.doesNotMatch(w5tape, /guaranteed ROI/i);
  assert.deepEqual(
    STORIES.slice(W6 + 1, W6 + 1 + WEEK5_FRIDAY.length).map((s) => s.slug),
    [...WEEK5_FRIDAY],
  );
  assert.equal(STORIES[W6 + 1]?.slug, "week-5-florida-missouri");
  assert.equal(STORIES[W6 + 1]?.date, "Friday, Oct 2, 2026");
  assert.match(STORIES[W6 + 1]?.headline ?? "", /Florida/);
  assert.match(STORIES[W6 + 1]?.headline ?? "", /Missouri/);
  const w5 = [
    STORIES[W6 + 1]?.headline,
    STORIES[W6 + 1]?.dek,
    STORIES[W6 + 1]?.whyItMatters,
    ...(STORIES[W6 + 1]?.body ?? []),
  ].join("\n");
  assert.match(w5, /Missouri −5\.6/);
  assert.match(w5, /64\.1%/);
  assert.match(w5, /Florida −4\.5/);
  assert.match(w5, /56\.5/);
  assert.doesNotMatch(w5, /\block/i);
  assert.doesNotMatch(w5, /guaranteed ROI/i);
  const miami = STORIES[W6 + 2];
  assert.equal(miami?.slug, "week-5-miami-clemson");
  assert.match(miami?.body.join("\n") ?? "", /Miami −0\.9/);
  assert.match(miami?.body.join("\n") ?? "", /Miami −17\.5/);
  const bama = STORIES[W6 + 3];
  assert.match(bama?.body.join("\n") ?? "", /Alabama −13\.3/);
  assert.match(bama?.body.join("\n") ?? "", /Alabama −6\.0/);
  assert.match(bama?.body.join("\n") ?? "", /66th/);
  const osu = STORIES[W6 + 4];
  assert.match(osu?.body.join("\n") ?? "", /Ohio St −9\.7/);
  assert.match(osu?.body.join("\n") ?? "", /Ohio St −13\.5/);
  const lou = STORIES[W6 + 5];
  assert.match(lou?.body.join("\n") ?? "", /NC State −0\.6/);
  assert.match(lou?.body.join("\n") ?? "", /Louisville −6\.5/);
  const wku = STORIES[W6 + 6];
  assert.match(wku?.body.join("\n") ?? "", /34/);
  assert.match(wku?.body.join("\n") ?? "", /WKU −13\.0/);
  assert.match(wku?.body.join("\n") ?? "", /MISS/);
  const tapeIdx = W6 + 1 + WEEK5_FRIDAY.length;
  assert.equal(STORIES[tapeIdx]?.slug, "week-4-tape");
  assert.equal(STORIES[tapeIdx]?.date, "Sunday, Sep 27, 2026");
  assert.match(STORIES[tapeIdx]?.headline ?? "", /42\/57/);
  assert.match(STORIES[tapeIdx]?.headline ?? "", /20\/57/);
  assert.match(STORIES[tapeIdx]?.headline ?? "", /FLAG/);
  assert.match(STORIES[tapeIdx]?.headline ?? "", /8\/18/);
  assert.match(STORIES[tapeIdx]?.dek ?? "", /FLAG/);
  assert.match(STORIES[tapeIdx]?.dek ?? "", /12\/18/);
  assert.match(STORIES[tapeIdx]?.dek ?? "", /8\/18/);
  const w4 = [
    STORIES[tapeIdx]?.headline,
    STORIES[tapeIdx]?.dek,
    STORIES[tapeIdx]?.whyItMatters,
    ...(STORIES[tapeIdx]?.body ?? []),
  ].join("\n");
  assert.match(w4, /73\.7%/);
  assert.match(w4, /35\.1%/);
  assert.match(w4, /28\/57/);
  assert.match(w4, /49\.1%/);
  assert.match(w4, /80\.8%/);
  assert.match(w4, /40\.9%/);
  assert.match(w4, /164\/203/);
  assert.match(w4, /83\/203/);
  assert.match(w4, /44\.4%/);
  assert.match(w4, /12\/18/);
  assert.match(w4, /10\/18/);
  assert.match(w4, /12\.79/);
  assert.match(w4, /11\.21/);
  assert.match(w4, /Hawaiʻi @ Wyoming/);
  assert.match(w4, /Navy @ UAB/);
  assert.match(w4, /Clemson @ California/);
  assert.match(w4, /Texas A&M @ LSU/);
  assert.match(w4, /Soft-cal FLAG/);
  assert.match(w4, /all-D/);
  assert.match(w4, /HX not retuned/);
  assert.doesNotMatch(w4, /The board is posted/);
  assert.doesNotMatch(w4, /2026\.6/);
  assert.doesNotMatch(w4, /FCS/);
  assert.doesNotMatch(w4, /\block/i);
  assert.doesNotMatch(w4, /guaranteed ROI/i);
  assert.deepEqual(
    STORIES.slice(tapeIdx + 1, tapeIdx + 1 + WEEK4_FRIDAY.length).map((s) => s.slug),
    [...WEEK4_FRIDAY],
  );
  assert.equal(STORIES[tapeIdx + 1]?.slug, "week-4-texas-am-lsu");
  assert.equal(STORIES[tapeIdx + 1]?.date, "Friday, Sep 25, 2026");
  const w3Lead = tapeIdx + 1 + WEEK4_FRIDAY.length;
  assert.equal(STORIES[w3Lead]?.slug, "week-3-tape");
  assert.match(STORIES[w3Lead]?.headline ?? "", /49\/56/);
  assert.match(STORIES[w3Lead]?.headline ?? "", /23\/56/);
  assert.match(STORIES[w3Lead]?.headline ?? "", /FLAG/);
  assert.match(STORIES[w3Lead]?.headline ?? "", /5\/21/);
  assert.match(STORIES[w3Lead]?.dek ?? "", /20\/21/);
  assert.match(STORIES[w3Lead]?.dek ?? "", /5\/21/);
  const w3 = [
    STORIES[w3Lead]?.headline,
    STORIES[w3Lead]?.dek,
    STORIES[w3Lead]?.whyItMatters,
    ...(STORIES[w3Lead]?.body ?? []),
  ].join("\n");
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
    STORIES.slice(w3Lead + 1, w3Lead + 1 + WEEK3_FRIDAY.length).map((s) => s.slug),
    [...WEEK3_FRIDAY],
  );
  const week2TapeIdx = w3Lead + 1 + WEEK3_FRIDAY.length;
  assert.equal(STORIES[week2TapeIdx]?.slug, "week-2-tape");
  assert.match(STORIES[week2TapeIdx]?.headline ?? "", /37\/47/);
  assert.match(STORIES[week2TapeIdx]?.headline ?? "", /20\/47/);
  assert.match(STORIES[week2TapeIdx]?.headline ?? "", /FLAG/);
  assert.match(STORIES[week2TapeIdx]?.headline ?? "", /12\/19/);
  assert.match(STORIES[week2TapeIdx]?.dek ?? "", /12\/19/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /78\.7%/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /42\.6%/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /81\.1%/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /44\.4%/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /63\.2%/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /17\/19/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /10\.81/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /12\.03/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /12\/18/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /66\.7%/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /Oregon @ OKST/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /OSU @ Texas/);
  assert.match(STORIES[week2TapeIdx]?.whyItMatters ?? "", /12\/19/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /pre-Δ/);
  assert.match(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /2026\.3/);
  assert.doesNotMatch(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /The board is posted/);
  assert.doesNotMatch(STORIES[week2TapeIdx]?.headline ?? "", /2026\.4/);
  assert.doesNotMatch(STORIES[week2TapeIdx]?.body.join("\n") ?? "", /FCS/);
  assert.equal(STORIES[week2TapeIdx + 1]?.slug, "week-1-tape");
  assert.match(STORIES[week2TapeIdx + 1]?.headline ?? "", /36\/43/);
  assert.match(STORIES[week2TapeIdx + 1]?.headline ?? "", /20\/43/);
  assert.match(STORIES[week2TapeIdx + 1]?.body.join("\n") ?? "", /term = O\/D/i);
  assert.deepEqual(
    STORIES.slice(week2TapeIdx + 2, week2TapeIdx + 2 + WEEK1_FRIDAY.length).map((s) => s.slug),
    [...WEEK1_FRIDAY],
  );
});

const WEEK4_SOURCED_CLOSES = [
  "Texas A&M −2.7 / 57.4%",
  "LSU −8.5",
  "Ole Miss −2.5 / 56.8%",
  "Florida −3.5",
  "Texas −3.8 / 59.9%",
  "Texas −4.5",
  "Oregon −6.0 / 65.1%",
  "Oregon −3.0",
  "Clemson −6.7 / 66.5%",
  "Cal −1.5",
  "Missouri −9.5 / 71.9%",
  "Miss St −6.5",
] as const;

test("Week 4 package uses the Research order, Week 4 AP ranks, and sourced HASHMARK closes", () => {
  const week4 = STORIES.filter((s) => s.slug.startsWith("week-4-") && s.slug !== "week-4-tape");
  assert.equal(week4.length, 6);
  assert.deepEqual(
    week4.map((s) => s.slug),
    [...WEEK4_FRIDAY],
  );
  const text = week4.flatMap((s) => [...s.body, s.whyItMatters, s.dek, s.headline]).join("\n");
  for (const close of WEEK4_SOURCED_CLOSES) {
    assert.equal(text.includes(close), true, `missing sourced close: ${close}`);
  }
  assert.match(text, /6th \(6\.11\)/);
  assert.match(text, /AP Week 4/);
  assert.match(text, /Tigers 10th/);
  assert.match(text, /AP 23|to 23/);
  assert.match(text, /game-time decision/);
  assert.match(text, /questionable/);
  assert.match(text, /9:30 CT, ESPN/);
  assert.match(text, /6:45 CT, SEC Network/);
  assert.doesNotMatch(text, /\block\b/i);
  assert.doesNotMatch(text, /guaranteed ROI/i);
  for (const s of week4) {
    assert.equal(s.date, "Friday, Sep 25, 2026");
    assert.ok(s.sources.some((src) => src.href.startsWith("https://hashmarkcfb.com")));
    assert.equal(
      s.sources.every(
        (src) =>
          src.href.startsWith("https://hashmarkcfb.com") ||
          src.href.startsWith("https://www.cbssports.com/") ||
          src.href.startsWith("https://www.si.com/") ||
          src.href.startsWith("https://sports.yahoo.com/") ||
          src.href.startsWith("https://www.ncaa.com/") ||
          src.href.startsWith("https://www.thebiglead.com/") ||
          src.href.startsWith("https://www.rockytopinsider.com/"),
      ),
      true,
      s.slug,
    );
  }
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
