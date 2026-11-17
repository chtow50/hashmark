#!/usr/bin/env node
/**
 * Offline builder for the Recruiting + Talent overhaul (Nov 17, 2026). No network, no key.
 *
 *  data/talent_247_2026.json   247Sports Team Talent Composite (whole roster), 2026 and 2025,
 *                              from the CollegeFootballData.com /talent cache (CFBD mirrors 247).
 *  data/recruiting_2027_247.json  2027 class in progress: 247Sports Composite Team Rankings top 50,
 *                              transcribed from scripts/data-src/247_composite_2027_top50_2026-11-17.tsv
 *                              (247 page "Last updated on 11/17/26 at 2:15 PM CST").
 *
 * Usage: node scripts/build-recruiting-talent-data.mjs --cfbd /workspace/cfbd-data
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const arg = (k) => {
  const i = process.argv.indexOf(k);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const cfbd = arg("--cfbd") ?? "/workspace/cfbd-data";
const teams = JSON.parse(readFileSync(join(cfbd, "out/2026/teams.json"), "utf8"));
const slugOf = new Map(teams.map((t) => [t.school, t.slug]));

function talent(year) {
  const raw = JSON.parse(readFileSync(join(cfbd, `cache/talent__year-${year}.json`), "utf8"));
  const rows = raw
    .map((r) => ({ slug: slugOf.get(r.team), talent: Number(r.talent) }))
    .filter((r) => r.slug)
    .sort((a, b) => b.talent - a.talent || a.slug.localeCompare(b.slug));
  // Competition ranking among HASHMARK's FBS teams (ties share a rank).
  rows.forEach((r, i) => {
    r.rank = i > 0 && rows[i - 1].talent === r.talent ? rows[i - 1].rank : i + 1;
  });
  return rows;
}
const t26 = talent(2026);
const t25 = talent(2025);
if (t26.length !== teams.length)
  throw new Error(`talent 2026 maps ${t26.length}/${teams.length} teams`);
writeFileSync(
  "data/talent_247_2026.json",
  JSON.stringify(
    {
      source: "247Sports Team Talent Composite",
      via: "CollegeFootballData.com /talent, pulled Nov 12, 2026",
      url: "https://247sports.com/season/2026-football/compositeteamtalent/",
      note: "Whole-roster 247 Composite talent points. Rank is among HASHMARK's FBS teams. Not HX and not the two-deep composite.",
      years: { 2026: t26, 2025: t25 },
    },
    null,
    1,
  ) + "\n",
);

const tsv = readFileSync("scripts/data-src/247_composite_2027_top50_2026-11-17.tsv", "utf8")
  .trim()
  .split("\n");
const classes = tsv.map((line) => {
  const [rank, , team, commits, avg, five, four, three, points] = line.split("\t");
  const slug = slugOf.get(team);
  if (!slug) throw new Error(`2027: no slug for ${team}`);
  const row = {
    slug,
    rank: +rank,
    commits: +commits,
    avg: +avg,
    five: +five,
    four: +four,
    three: +three,
    points: +points,
  };
  if (row.five + row.four + row.three > row.commits)
    throw new Error(`2027: stars > commits for ${team}`);
  return row;
});
classes.forEach((c, i) => {
  if (c.rank !== i + 1) throw new Error("2027: rank order");
  if (i && c.points > classes[i - 1].points) throw new Error("2027: points order");
});
writeFileSync(
  "data/recruiting_2027_247.json",
  JSON.stringify(
    {
      source: "247Sports Composite Team Rankings",
      url: "https://247sports.com/season/2027-football/compositeteamrankings/",
      asOf: "2026-11-17T14:15:00-06:00",
      asOfLabel: "Nov 17, 2026, 2:15 PM CT",
      note: "Class of 2027 in progress (commitments, before the December early signing period). 247 lists the top 50 on its first page; HASHMARK shows those 50 only.",
      classes,
    },
    null,
    1,
  ) + "\n",
);
console.log(`talent 2026 ${t26.length}, 2025 ${t25.length}; 2027 classes ${classes.length}`);
