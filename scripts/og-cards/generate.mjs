#!/usr/bin/env node
/**
 * OFFLINE share-card generator (not part of the build): public/og/*.jpg + src/lib/og/cards.json.
 * Needs playwright-core and Chrome on the box:
 *   NODE_PATH=$(dirname $(dirname $(node -e "console.log(require.resolve('playwright-core'))" ))) \
 *   node --experimental-strip-types scripts/og-cards/generate.mjs
 *
 * Cards hold only numbers that never change once written:
 *  - teams: logo, name, mascot, conference (no HX number, so the Sunday refit cannot stale it)
 *  - games: FINAL score + the frozen pregame HX line (lock_home_hx/lock_away_hx via gradeGame)
 *    + stamped Vegas line. Only FINALs are carded.
 *  - /accuracy and /matchup: static explainer cards.
 * Data: committed migrations replayed into in-memory PGLite (same as scripts/generate-game-keys.mjs).
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { PGlite } from "@electric-sql/pglite";
import { gradeGame } from "../../src/lib/cfb/accuracy.ts";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE ?? "playwright-core");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "public/og");
mkdirSync(join(OUT, "teams"), { recursive: true });
mkdirSync(join(OUT, "games"), { recursive: true });

const db = new PGlite();
for (const f of readdirSync(join(ROOT, "migrations")).filter((f) => f.endsWith(".sql")).sort()) {
  await db.exec(readFileSync(join(ROOT, "migrations", f), "utf8"));
}
const teams = (await db.query(`select slug, name, short_name as short, mascot, conference, color_primary as color from teams order by slug`)).rows;
const bySlug = Object.fromEntries(teams.map((t) => [t.slug, t]));
const games = (await db.query(
  `select g.id, g.week, g.kickoff_date::text as d, g.neutral, g.home_score as hs, g.away_score as "as", g.vegas_spread as vegas,
          g.lock_home_hx as lh, g.lock_away_hx as la, g.hx_unrated as unrated, ht.slug as home, at.slug as away
   from games g join teams ht on ht.id = g.home_team_id join teams at on at.id = g.away_team_id
   where g.status = 'final' and g.home_score is not null and g.away_score is not null order by g.kickoff_date`,
)).rows;
await db.close();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const logo = (slug) => {
  const p = join(ROOT, "public/logos", `${slug}.png`);
  return existsSync(p) ? `data:image/png;base64,${readFileSync(p).toString("base64")}` : null;
};
const hex = (c) => (/^#?[0-9a-f]{6}$/i.test(String(c ?? "")) ? (String(c).startsWith("#") ? c : `#${c}`) : "#3f3f46");
const line = (homeShort, awayShort, spread) =>
  Math.abs(spread) < 0.05 ? "PK" : spread > 0 ? `${homeShort} −${spread.toFixed(1)}` : `${awayShort} −${(-spread).toFixed(1)}`;
const fmtDate = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const shell = (accent, body) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#09090b;color:#fafafa;font-family:'IBM Plex Sans',sans-serif;overflow:hidden;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(900px 500px at 0% 0%, ${accent}55, transparent 60%),radial-gradient(700px 500px at 100% 100%, #f59e0b22, transparent 60%)}
.bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:${accent}}
.top{position:absolute;left:64px;right:64px;top:44px;display:flex;justify-content:space-between;align-items:center}
.brand{font-family:'Barlow Condensed';font-weight:700;font-size:40px;letter-spacing:.14em}
.brand b{color:#f59e0b}
.kick{font-family:'IBM Plex Mono';font-size:22px;letter-spacing:.16em;text-transform:uppercase;color:#a1a1aa}
.foot{position:absolute;left:64px;right:64px;bottom:40px;display:flex;justify-content:space-between;font-family:'IBM Plex Mono';font-size:22px;color:#a1a1aa}
.tile{background:#f4f4f5;border-radius:28px;display:flex;align-items:center;justify-content:center}
.tile img{max-width:80%;max-height:80%}
.disp{font-family:'Barlow Condensed';font-weight:700;letter-spacing:.02em;line-height:.95}
</style></head><body><div class="glow"></div><div class="bar"></div>
<div class="top"><div class="brand">HASH<b>MARK</b></div><div class="kick">College football analytics</div></div>
${body}</body></html>`;

function teamCard(t) {
  const src = logo(t.slug);
  return shell(hex(t.color), `
<div style="position:absolute;left:64px;top:150px;display:flex;gap:56px;align-items:center">
  <div class="tile" style="width:300px;height:300px">${src ? `<img src="${src}">` : ""}</div>
  <div style="max-width:720px">
    <div class="kick" style="color:#f59e0b">${esc(t.conference)}</div>
    <div class="disp" style="font-size:${t.name.length > 16 ? 92 : 120}px;margin-top:12px">${esc(t.name)}</div>
    <div style="font-size:34px;color:#d4d4d8;margin-top:14px">${esc(t.mascot ?? "")}</div>
    <div style="font-size:26px;color:#a1a1aa;margin-top:26px">HX rating · weekly history · schedule · advanced stats</div>
  </div>
</div>
<div class="foot"><span>hashmarkcfb.com/teams/${esc(t.slug)}</span><span>HX · one rating, all 138 FBS</span></div>`);
}

function gameCard(g) {
  const h = bySlug[g.home], a = bySlug[g.away];
  const gr = gradeGame({
    id: `g${g.id}`, week: g.week, kickoffDate: g.d, home: g.home, away: g.away, homeShort: h.short, awayShort: a.short,
    neutral: Boolean(g.neutral), homeScore: Number(g.hs), awayScore: Number(g.as),
    lockHome: g.lh == null ? null : Number(g.lh), lockAway: g.la == null ? null : Number(g.la),
    vegasSpread: g.vegas == null ? null : Number(g.vegas), ...(g.unrated ? { naReason: "unrated" } : {}),
  });
  const side = (t, pts, win) => `
  <div style="display:flex;flex-direction:column;align-items:center;width:360px">
    <div class="tile" style="width:190px;height:190px">${logo(t.slug) ? `<img src="${logo(t.slug)}">` : ""}</div>
    <div class="disp" style="font-size:46px;margin-top:18px;text-align:center">${esc(t.short)}</div>
    <div class="disp" style="font-size:120px;margin-top:4px;color:${win ? "#fafafa" : "#71717a"}">${pts}</div>
  </div>`;
  const hx = gr.graded
    ? `HX pregame: <b style="color:#fafafa">${esc(line(h.short, a.short, gr.hxSpread))}</b> · ${gr.suHit === true ? '<span style="color:#4ade80">picked the winner</span>' : gr.suHit === false ? '<span style="color:#f87171">missed the winner</span>' : "pick'em"}`
    : "HX pregame: not graded (no frozen pregame line)";
  const vegas = g.vegas == null ? "" : ` · Vegas line: ${esc(line(h.short, a.short, Number(g.vegas)))}`;
  return shell(hex(Number(g.hs) > Number(g.as) ? h.color : a.color), `
<div class="kick" style="position:absolute;left:0;right:0;top:118px;text-align:center;color:#f59e0b">Final · ${esc(fmtDate(g.d))}${g.neutral ? " · neutral site" : ""}</div>
<div style="position:absolute;left:0;right:0;top:160px;display:flex;justify-content:center;align-items:flex-start;gap:40px">
  ${side(a, g.as, Number(g.as) > Number(g.hs))}
  <div class="disp" style="font-size:60px;color:#71717a;margin-top:200px">at</div>
  ${side(h, g.hs, Number(g.hs) > Number(g.as))}
</div>
<div class="foot" style="justify-content:center;color:#d4d4d8;font-family:'IBM Plex Sans';font-size:26px"><span>${hx}${vegas}</span></div>`);
}

const staticCard = (title, sub, kicker) => shell("#f59e0b", `
<div style="position:absolute;left:64px;right:64px;top:170px">
  <div class="kick" style="color:#f59e0b">${esc(kicker)}</div>
  <div class="disp" style="font-size:120px;margin-top:16px">${esc(title)}</div>
  <div style="font-size:34px;color:#d4d4d8;margin-top:22px;max-width:1000px;line-height:1.3">${esc(sub)}</div>
</div>
<div class="foot"><span>hashmarkcfb.com</span><span>HX · one rating, all 138 FBS</span></div>`);

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
async function shot(html, file) {
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, type: "jpeg", quality: 78 });
}
const only = process.argv.slice(2);
const want = (k) => only.length === 0 || only.includes(k);
if (want("static")) {
  await shot(staticCard("Accuracy", "Every FINAL graded against its frozen pregame HX line and win probability, beside the stamped Vegas line.", "HX report card"), join(OUT, "accuracy.jpg"));
  await shot(staticCard("Matchup", "Any two FBS teams: HX line and win %, plus unit-vs-unit edges from the advanced stats.", "Head to head"), join(OUT, "matchup.jpg"));
}
const cards = { teams: [], games: [] };
for (const t of teams) {
  if (want("teams")) await shot(teamCard(t), join(OUT, "teams", `${t.slug}.jpg`));
  cards.teams.push(t.slug);
}
for (const g of games) {
  const key = `${g.d.slice(0, 10)}-${g.away}-at-${g.home}`;
  if (want("games")) await shot(gameCard(g), join(OUT, "games", `${key}.jpg`));
  cards.games.push(key);
}
await browser.close();
writeFileSync(join(ROOT, "src/lib/og/cards.json"), JSON.stringify(cards) + "\n");
console.log(`[og-cards] teams ${cards.teams.length} · games ${cards.games.length}`);
