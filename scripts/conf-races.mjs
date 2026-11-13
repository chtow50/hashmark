#!/usr/bin/env node
/**
 * Conference races for /conferences: odds to reach and to win each conference title game,
 * from the same 10k HX season sim (scripts/hx-sim-10k.mjs, same seed, same inputs).
 *
 * Writes data/conf_races_2026.json. Refuses to write unless every team's make_field and
 * conf_title match the committed sim file exactly (proof these are the same 10k draws).
 * Never carries win_title (free surface).
 *
 *   node scripts/conf-races.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { loadInputs, N_SIMS, SEED, SIM_OUT_JSON, simulate } from "./hx-sim-10k.mjs";
import { ROOT } from "./replay-migrations.mjs";

export const RACES_OUT = "data/conf_races_2026.json";

export async function main() {
  const inputs = await loadInputs();
  const out = simulate(inputs);
  const committed = JSON.parse(readFileSync(join(ROOT, SIM_OUT_JSON), "utf8"));
  const bad = committed.teams.filter((t) => out[t.slug]?.make_field !== t.make_field || out[t.slug]?.conf_title !== t.conf_title);
  if (bad.length) throw new Error(`draws differ from ${SIM_OUT_JSON} for ${bad.length} teams (e.g. ${bad[0].slug}); re-run the sim first`);
  const teams = inputs.teams.map((t) => {
    const o = out[t.slug];
    return {
      slug: t.slug,
      conference: t.conference,
      make_ccg: o.make_ccg,
      conf_title: t.conference === "Independent" ? null : o.conf_title,
      conf_w_now: o.conf_w_now,
      conf_l_now: o.conf_l_now,
      proj_conf_w: o.proj_conf_w,
      proj_conf_l: o.proj_conf_l,
      proj_wins: o.proj_wins,
    };
  });
  const payload = {
    meta: {
      n_sims: N_SIMS,
      seed: SEED,
      hx_stamp: committed.meta.hx_stamp,
      as_of: committed.meta.as_of,
      as_of_tz: "America/Chicago",
      source: SIM_OUT_JSON,
      title_game_rule:
        "Top two by simulated conference win % (then conference wins, then HX, then a coin flip) meet at a neutral site. This is a simplified tiebreak, not each league's full rulebook.",
      pac12_rule: "Pac-12 has two members in 2026 and no title game: champion by overall record, then head-to-head, then HX.",
      independents: "Independents have no conference race.",
      note: "Conference title odds are the same numbers as the 10k sim file. National title odds are not shown here.",
    },
    teams,
  };
  const text = `${JSON.stringify(payload, null, 1)}\n`;
  if (/win_title/.test(text)) throw new Error("win_title must not reach a free surface");
  writeFileSync(join(ROOT, RACES_OUT), text);
  console.log(`[conf-races] wrote ${RACES_OUT} · ${teams.length} teams · matches ${SIM_OUT_JSON}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
