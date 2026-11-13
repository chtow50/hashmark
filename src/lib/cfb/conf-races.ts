/**
 * Conference race odds from the 10k HX season sim (data/conf_races_2026.json, written by
 * scripts/conf-races.mjs from the same draws as data/sim_10k_2026_hx2026_8.json).
 * Title-game and conference-title odds only; national title odds never live here.
 */
import races from "../../../data/conf_races_2026.json" with { type: "json" };

export type ConfRaceRow = {
  slug: string;
  conference: string;
  /** % of sims reaching the title game; null where the league plays none (Pac-12, Independents). */
  make_ccg: number | null;
  /** % of sims winning the conference; null for Independents. */
  conf_title: number | null;
  conf_w_now: number;
  conf_l_now: number;
  proj_conf_w: number;
  proj_conf_l: number;
  proj_wins: number;
};

export type ConfRacesMeta = {
  n_sims: number;
  seed: number;
  hx_stamp: string;
  as_of: string;
  source: string;
  title_game_rule: string;
  pac12_rule: string;
  note: string;
};

const data = races as unknown as { meta: ConfRacesMeta; teams: ConfRaceRow[] };

export const RACE_CONFS = ["SEC", "Big Ten", "ACC", "Big 12", "American", "Sun Belt", "MAC", "CUSA", "Mountain West", "Pac-12"] as const;
export type RaceConf = (typeof RACE_CONFS)[number];
export const parseRaceConf = (v: unknown): RaceConf | undefined =>
  RACE_CONFS.includes(v as RaceConf) ? (v as RaceConf) : undefined;

export const confRacesMeta = (): ConfRacesMeta => data.meta;

/** One league's race, best title odds first (then title-game odds, then projected conf wins). */
export function confRace(conf: RaceConf): ConfRaceRow[] {
  return data.teams
    .filter((t) => t.conference === conf)
    .sort(
      (a, b) =>
        (b.conf_title ?? 0) - (a.conf_title ?? 0) ||
        (b.make_ccg ?? 0) - (a.make_ccg ?? 0) ||
        b.proj_conf_w - a.proj_conf_w ||
        a.slug.localeCompare(b.slug),
    );
}

export const confRaceFor = (slug: string): ConfRaceRow | undefined => data.teams.find((t) => t.slug === slug);

/** Shown as "<0.1%" rather than a bare 0 when a team is alive but very unlikely; exact 0 stays 0. */
export function fmtOdds(x: number | null): string {
  if (x == null) return "n/a";
  if (x === 0) return "0%";
  if (x < 0.1) return "<0.1%";
  if (x > 99.9 && x < 100) return ">99.9%";
  return `${x.toFixed(1)}%`;
}
