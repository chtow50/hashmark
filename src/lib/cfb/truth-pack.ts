/**
 * Week 1 truth-pack loaders. Numbers come from the AMD JSON payloads —
 * do not invent deltas, tape rates, or make/title splits.
 *
 *   data/week1_hx_vs_ap_gaps_2026.json
 *   data/week1_accountability_pack_2026.json
 *   data/sim_10k_2026.json
 */
import gapsRaw from "../../../data/week1_hx_vs_ap_gaps_2026.json" with { type: "json" };
import packRaw from "../../../data/week1_accountability_pack_2026.json" with { type: "json" };
import simRaw from "../../../data/sim_10k_2026.json" with { type: "json" };
import week1ApRaw from "../../../data/week1_ap_top25_2026.json" with { type: "json" };

export const DISAGREE_HIGHLIGHT_NAMES = [
  "Virginia",
  "Houston",
  "LSU",
  "Missouri",
  "Texas Tech",
] as const;

export type HxApGap = {
  name: string;
  ap: number;
  hx: number;
  hx_rating: number;
  delta: number;
};

export type HxApGapsFile = {
  as_of: string;
  source_ap: string;
  source_hx: string;
  gaps: HxApGap[];
  hx_not_in_ap: { hx_rank: number; name: string; hx: number }[];
  ap_not_in_hx25: { ap: number; name: string; hx_rank: number }[];
};

export type Week1Tape = {
  n: number;
  su_pct: number;
  su: string;
  hx_closer_pct: number;
  hx_closer: string;
  source: string;
};

export type HxMover = {
  name: string;
  slug: string;
  hx_rank_pre: number;
  hx_rank_post: number;
  delta_hx: number;
  delta_off: number;
  delta_def: number;
  term: string;
};

export type AccountabilityPack = {
  as_of: string;
  tape: Week1Tape;
  movers_by_abs_dhx: HxMover[];
};

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
  };
  teams: Sim10kTeam[];
};

export const hxApGaps = gapsRaw as HxApGapsFile;
export const accountabilityPack = packRaw as AccountabilityPack;
export const sim10k = simRaw as Sim10kFile;

const AP_SLUG_BY_NAME = new Map(
  (week1ApRaw.teams as { team: string; slug: string }[]).map((t) => [t.team, t.slug]),
);

/** pre-Δ 10k draws — frozen before Week 1 O/D ΔHX (HX 2026.3). */
export const SIM_10K_AS_OF = sim10k.meta.as_of;
export const SIM_10K_NOTE = `pre-Δ 10k draws · as_of ${SIM_10K_AS_OF}`;
export const SIM_10K_NOT_RESIM = "not a post-2026.3 re-sim";

export type TeamRef = {
  slug: string;
  name: string;
  shortName: string;
  colorPrimary: string;
};

export type BoardGapRow = HxApGap & {
  slug: string;
  shortName: string;
  colorPrimary: string;
  highlight: boolean;
};

const HIGHLIGHT = new Set<string>(DISAGREE_HIGHLIGHT_NAMES);

export function isOdTerm(term: string): boolean {
  return /^O\/D\b/.test(term);
}

/** Display term for movers — pack stores "O/D EPA"; chrome is O/D. */
export function odTermLabel(term: string): string {
  return isOdTerm(term) ? "O/D" : term;
}

export function gapByName(name: string): HxApGap | undefined {
  return hxApGaps.gaps.find((g) => g.name === name);
}

/**
 * Recompute HX-vs-AP gaps from a Week 1 AP ballot + HX ship.
 * delta = ap_rank − hx_rank (negative = HX colder than the ballot).
 */
export function recomputeHxVsApGaps(
  apTeams: { rank: number; team: string; slug: string }[],
  hxTeams: { slug: string; name: string; hx_rank_post: number; hx_post: number }[],
): HxApGap[] {
  const hxBySlug = new Map(hxTeams.map((t) => [t.slug, t]));
  const hxByName = new Map(hxTeams.map((t) => [t.name, t]));
  const gaps: HxApGap[] = [];
  for (const ap of apTeams) {
    const hx = hxBySlug.get(ap.slug) ?? hxByName.get(ap.team);
    if (!hx) continue;
    gaps.push({
      name: ap.team,
      ap: ap.rank,
      hx: hx.hx_rank_post,
      hx_rating: hx.hx_post,
      delta: ap.rank - hx.hx_rank_post,
    });
  }
  return gaps.sort((a, b) => {
    const ad = Math.abs(b.delta) - Math.abs(a.delta);
    if (ad !== 0) return ad;
    return a.ap - b.ap;
  });
}

function refForName(name: string, teams: TeamRef[]): TeamRef | undefined {
  return teams.find((t) => t.name === name || t.shortName === name);
}

/** Board card rows: highlighted five first (JSON order), then remaining by |delta|. */
export function boardDisagreementRows(teams: TeamRef[]): BoardGapRow[] {
  const rows: BoardGapRow[] = hxApGaps.gaps.map((g) => {
    const ref = refForName(g.name, teams);
    return {
      ...g,
      slug: ref?.slug ?? AP_SLUG_BY_NAME.get(g.name) ?? slugGuess(g.name),
      shortName: ref?.shortName ?? g.name,
      colorPrimary: ref?.colorPrimary ?? "#8c8c86",
      highlight: HIGHLIGHT.has(g.name),
    };
  });
  const flagged = DISAGREE_HIGHLIGHT_NAMES.map((name) => rows.find((r) => r.name === name)).filter(
    (r): r is BoardGapRow => r != null,
  );
  const rest = rows
    .filter((r) => !r.highlight)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return [...flagged, ...rest];
}

function slugGuess(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function week1Tape(): Week1Tape {
  return accountabilityPack.tape;
}

/** Top |ΔHX| movers whose term is O/D (not a second rating). */
export function odMovers(limit = 8): HxMover[] {
  return accountabilityPack.movers_by_abs_dhx.filter((m) => isOdTerm(m.term)).slice(0, limit);
}

export function simTeamBySlug(slug: string): Sim10kTeam | undefined {
  return sim10k.teams.find((t) => t.slug === slug);
}
