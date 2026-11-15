import {replayMigrations} from "./replay-migrations.mjs";
import fs from "fs";
const until=process.argv[2];
const full=await replayMigrations();
const r=await full.query(`select g.id,g.week,g.kickoff_date::text d,h.slug hs,a.slug as_,h.name hn,a.name an,h.short_name hsn,a.short_name asn,g.neutral,g.home_score,g.away_score,g.status,g.vegas_spread,g.vegas_total,g.tv,g.kickoff_at::text ka,g.lock_home_hx lh,g.lock_away_hx la,g.hx_unrated from games g join teams h on h.id=g.home_team_id join teams a on a.id=g.away_team_id where g.week=11 order by g.kickoff_date,g.id`);
const pre=await (await replayMigrations({until})).query(`select t.slug,r.hx_rating,r.hx_rank from rankings r join teams t on t.id=r.team_id where r.season=2026 and r.week=0`);
fs.writeFileSync('/tmp/w11dump.json',JSON.stringify({games:r.rows,pre:pre.rows}));
console.log(r.rows.length, r.rows.filter(x=>x.status==='final').length, r.rows.filter(x=>x.lh==null&&x.status==='final').length);
