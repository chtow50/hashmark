/**
 * Server / test only: the full HX 2026.7 10k sim, including win_title.
 *
 * win_title is Edge Pack / paid only. Do NOT import this module from any route,
 * component, or client-reachable lib — anything a route imports is bundled into
 * the public static/assets/*.js (that is how live index-BW9FktUn.js shipped ~150
 * win_title values before this split). Client code reads the generated free export
 * via ./truth-pack.ts (data/sim_free_hx2026_7.json) instead.
 *
 * Paid buyers get title odds from the Edge Pack files (data/edge-packs/current/),
 * served by src/lib/edge-pack-files.server.ts after Stripe verification.
 */
import simFullRaw from "../../../data/sim_10k_2026_hx2026_7.json" with { type: "json" };
import { make12FromSimRow, type Make12Odds } from "./season-sim.ts";
import type { TeamSummary } from "./types.ts";

export type Sim10kTeam = {
  name: string;
  slug: string;
  conference: string;
  hx_board: number;
  hx_matchup: number;
  make_field: number;
  win_title: number;
  proj_wins: number;
  conf_title: number;
  schedule_games_listed: number;
};

export type Sim10kFile = {
  meta: {
    n_sims: number;
    seed: number;
    as_of: string;
    as_of_tz: string;
    hx_policy: string;
    hx_stamp?: string;
  };
  teams: Sim10kTeam[];
};

export const SIM_FULL_FILE = "sim_10k_2026_hx2026_7.json";

export const sim10kFull = simFullRaw as Sim10kFile;

export function simFullTeamBySlug(slug: string): Sim10kTeam | undefined {
  return sim10kFull.teams.find((t) => t.slug === slug);
}

/** Make-field AND win-title from the full draws. Server / Edge Pack tooling only. */
export function make12FromSimFull(
  slug: string,
  team?: Pick<TeamSummary, "playoffOdds">,
): Make12Odds {
  const row = simFullTeamBySlug(slug);
  return make12FromSimRow(row, team, row ? row.win_title : null);
}
