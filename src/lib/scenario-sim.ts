/**
 * HX Edge Pack — Scenario Sim AMD contract (2026.09.14).
 * MVP: types, validators, request builder, golden fixture runner.
 * No browser Monte Carlo. Live CLI path is not wired — desk fixture only.
 */
import exampleRaw from "../../data/scenario_sim_rerun_contract_example.json" with { type: "json" };
import goldenRequestRaw from "../../data/scenario_sim_golden_request.json" with { type: "json" };
import goldenResponseRaw from "../../data/scenario_sim_golden_response.json" with { type: "json" };
import { make12FromSim } from "./cfb/season-sim.ts";
import { sim10k, simTeamBySlug } from "./cfb/truth-pack.ts";

export const SCENARIO_SIM_CONTRACT_VERSION = "2026.09.14";
export const SCENARIO_SIM_PRODUCT = "hx_edge_scenario_sim";
export const SCENARIO_SIM_HX_STAMP = "HX 2026.4";
export const SCENARIO_SIM_HX_SHIP_PATH = "week2_od_hx_ship_2026.json";
export const SCENARIO_SIM_N_SIMS = 10000;
export const SCENARIO_SIM_SEED = 20260913;
export const SCENARIO_SIM_MAX_OVERRIDES = 3;
export const SCENARIO_SIM_HX_BUMP_MIN = -1;
export const SCENARIO_SIM_HX_BUMP_MAX = 1;
export const SCENARIO_SIM_GOLDEN_TEAMS = [
  "georgia",
  "oklahoma",
  "oregon",
  "ohio-state",
  "michigan",
] as const;

/** Desk smoke / preview only. Paid unlock is Stripe Checkout → token later — not a login wall. */
export const EDGE_SCENARIO_UNLOCK = false;

export const SCENARIO_SIM_CONFIDENCE_NOTE =
  "Monte Carlo ± noise on 10k draws; not a lock.";

export const SCENARIO_SIM_DEMO_LABEL = "demo fixture — CLI not wired";

/** Website-cleared AMD golden: Oklahoma @ Georgia W4 + Oregon HX bump. */
export const SCENARIO_SIM_GOLDEN_EVENT_ID = "401856700";
export const SCENARIO_SIM_GOLDEN_FORCE: ForceWinnerOverride = {
  type: "force_winner",
  espn_event_id: SCENARIO_SIM_GOLDEN_EVENT_ID,
  week: 4,
  home_slug: "georgia",
  away_slug: "oklahoma",
  winner_slug: "oklahoma",
  note: "golden smoke — force Oklahoma @ Georgia week 4 (remaining non-FINAL)",
};
export const SCENARIO_SIM_GOLDEN_BUMP: HxBumpOverride = {
  type: "hx_bump",
  team_slug: "oregon",
  delta_hx: -0.25,
  note: "user scenario — not a live board rewrite",
};

export type ScenarioSimErrorCode =
  | "too_many_overrides"
  | "unknown_slug"
  | "game_already_final"
  | "game_not_found"
  | "delta_hx_out_of_range"
  | "engine_busy"
  | "empty_overrides"
  | "incomplete_override"
  | "winner_not_in_game";

export type ForceWinnerOverride = {
  type: "force_winner";
  espn_event_id?: string;
  week?: number;
  home_slug: string;
  away_slug: string;
  winner_slug: string;
  note?: string;
};

export type HxBumpOverride = {
  type: "hx_bump";
  team_slug: string;
  delta_hx: number;
  note?: string;
};

export type ScenarioOverride = ForceWinnerOverride | HxBumpOverride;

export type ScenarioSimReturn = {
  teams: string[];
  include_full_board: boolean;
  include_baseline_delta: boolean;
};

export type ScenarioSimRequest = {
  contract_version: typeof SCENARIO_SIM_CONTRACT_VERSION;
  product: typeof SCENARIO_SIM_PRODUCT;
  n_sims: number;
  seed: number | null;
  hx_stamp: string;
  hx_ship_path: string;
  overrides: ScenarioOverride[];
  return: ScenarioSimReturn;
};

export type ScenarioTeamMetrics = {
  make_field: number;
  win_title: number;
  proj_wins: number;
  conf_title: number;
};

export type ScenarioSimMeta = {
  n_sims: number;
  seed: number;
  hx_stamp: string;
  overrides_applied: number;
};

export type ScenarioSimOkResponse = {
  contract_version: typeof SCENARIO_SIM_CONTRACT_VERSION;
  ok: true;
  error: null;
  meta: ScenarioSimMeta;
  baseline: Record<string, ScenarioTeamMetrics>;
  scenario: Record<string, ScenarioTeamMetrics>;
  delta: Record<string, ScenarioTeamMetrics>;
  overrides_echo: ScenarioOverride[];
  confidence_note: string;
};

export type ScenarioSimErrorResponse = {
  contract_version: typeof SCENARIO_SIM_CONTRACT_VERSION;
  ok: false;
  error: ScenarioSimErrorCode;
  meta: ScenarioSimMeta | null;
  baseline: Record<string, ScenarioTeamMetrics>;
  scenario: Record<string, ScenarioTeamMetrics>;
  delta: Record<string, ScenarioTeamMetrics>;
  overrides_echo: ScenarioOverride[];
  confidence_note: string;
};

export type ScenarioSimResponse = ScenarioSimOkResponse | ScenarioSimErrorResponse;

export type ScenarioSimContractExample = {
  contract_version: string;
  product: string;
  request: ScenarioSimRequest;
  response: ScenarioSimOkResponse;
};

export type ScenarioValidationResult =
  | { ok: true; overrides: ScenarioOverride[] }
  | { ok: false; error: ScenarioSimErrorCode; message: string };

export type BuildScenarioRequestInput = {
  overrides: ScenarioOverride[];
  teams?: string[];
  n_sims?: number;
  seed?: number | null;
  hx_stamp?: string;
  hx_ship_path?: string;
  include_full_board?: boolean;
  include_baseline_delta?: boolean;
  /** When true, out-of-range hx_bump is an error instead of a clamp. */
  strictHxBump?: boolean;
  knownSlugs?: ReadonlySet<string>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value != null && !Array.isArray(value);
}

export function normalizeTeamSlug(raw: string | undefined | null): string {
  return (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

export function clampHxBump(delta: number): number {
  if (!Number.isFinite(delta)) return 0;
  return Math.min(SCENARIO_SIM_HX_BUMP_MAX, Math.max(SCENARIO_SIM_HX_BUMP_MIN, delta));
}

export function hxBumpInRange(delta: number): boolean {
  return Number.isFinite(delta) && delta >= SCENARIO_SIM_HX_BUMP_MIN && delta <= SCENARIO_SIM_HX_BUMP_MAX;
}

export function knownSimSlugs(): ReadonlySet<string> {
  return new Set(sim10k.teams.map((t) => t.slug));
}

function slugSet(known?: ReadonlySet<string>): ReadonlySet<string> {
  return known ?? knownSimSlugs();
}

function collectSlugs(override: ScenarioOverride): string[] {
  if (override.type === "hx_bump") return [normalizeTeamSlug(override.team_slug)];
  return [
    normalizeTeamSlug(override.home_slug),
    normalizeTeamSlug(override.away_slug),
    normalizeTeamSlug(override.winner_slug),
  ];
}

export function validateOverrides(
  overrides: ScenarioOverride[],
  opts?: { strictHxBump?: boolean; knownSlugs?: ReadonlySet<string> },
): ScenarioValidationResult {
  if (!Array.isArray(overrides) || overrides.length === 0) {
    return { ok: false, error: "empty_overrides", message: "Need 1–3 overrides." };
  }
  if (overrides.length > SCENARIO_SIM_MAX_OVERRIDES) {
    return {
      ok: false,
      error: "too_many_overrides",
      message: `At most ${SCENARIO_SIM_MAX_OVERRIDES} overrides.`,
    };
  }

  const known = slugSet(opts?.knownSlugs);
  const normalized: ScenarioOverride[] = [];

  for (const raw of overrides) {
    if (!raw || (raw.type !== "force_winner" && raw.type !== "hx_bump")) {
      return { ok: false, error: "incomplete_override", message: "Each override needs a type." };
    }
    if (raw.type === "hx_bump") {
      const team_slug = normalizeTeamSlug(raw.team_slug);
      if (!team_slug) {
        return { ok: false, error: "incomplete_override", message: "HX bump needs a team." };
      }
      if (!known.has(team_slug)) {
        return { ok: false, error: "unknown_slug", message: `Unknown team: ${team_slug}` };
      }
      if (!Number.isFinite(raw.delta_hx)) {
        return { ok: false, error: "delta_hx_out_of_range", message: "HX bump must be a number." };
      }
      if (opts?.strictHxBump && !hxBumpInRange(raw.delta_hx)) {
        return {
          ok: false,
          error: "delta_hx_out_of_range",
          message: "HX bump must sit in [-1, 1].",
        };
      }
      const next: HxBumpOverride = {
        type: "hx_bump",
        team_slug,
        delta_hx: opts?.strictHxBump ? raw.delta_hx : clampHxBump(raw.delta_hx),
      };
      if (raw.note?.trim()) next.note = raw.note.trim();
      normalized.push(next);
      continue;
    }

    const home_slug = normalizeTeamSlug(raw.home_slug);
    const away_slug = normalizeTeamSlug(raw.away_slug);
    const winner_slug = normalizeTeamSlug(raw.winner_slug);
    if (!home_slug || !away_slug || !winner_slug) {
      return {
        ok: false,
        error: "incomplete_override",
        message: "Force winner needs home, away, and winner.",
      };
    }
    if (home_slug === away_slug) {
      return {
        ok: false,
        error: "incomplete_override",
        message: "Home and away must be different teams.",
      };
    }
    for (const slug of [home_slug, away_slug, winner_slug]) {
      if (!known.has(slug)) {
        return { ok: false, error: "unknown_slug", message: `Unknown team: ${slug}` };
      }
    }
    if (winner_slug !== home_slug && winner_slug !== away_slug) {
      return {
        ok: false,
        error: "winner_not_in_game",
        message: "Winner must be home or away.",
      };
    }
    const next: ForceWinnerOverride = {
      type: "force_winner",
      home_slug,
      away_slug,
      winner_slug,
    };
    if (typeof raw.week === "number" && Number.isFinite(raw.week)) {
      next.week = Math.trunc(raw.week);
    }
    if (raw.espn_event_id?.trim()) next.espn_event_id = raw.espn_event_id.trim();
    if (raw.note?.trim()) next.note = raw.note.trim();
    normalized.push(next);
  }

  return { ok: true, overrides: normalized };
}

export function buildScenarioRequest(
  input: BuildScenarioRequestInput,
): { ok: true; request: ScenarioSimRequest } | { ok: false; error: ScenarioSimErrorCode; message: string } {
  const validated = validateOverrides(input.overrides, {
    strictHxBump: input.strictHxBump,
    knownSlugs: input.knownSlugs,
  });
  if (!validated.ok) return validated;

  const teams = (input.teams?.map(normalizeTeamSlug).filter(Boolean) ?? []).length
    ? input.teams!.map(normalizeTeamSlug).filter(Boolean)
    : defaultReturnTeams(validated.overrides);

  const known = slugSet(input.knownSlugs);
  for (const slug of teams) {
    if (!known.has(slug)) {
      return { ok: false, error: "unknown_slug", message: `Unknown team: ${slug}` };
    }
  }

  return {
    ok: true,
    request: {
      contract_version: SCENARIO_SIM_CONTRACT_VERSION,
      product: SCENARIO_SIM_PRODUCT,
      n_sims: input.n_sims ?? SCENARIO_SIM_N_SIMS,
      seed: input.seed === undefined ? SCENARIO_SIM_SEED : input.seed,
      hx_stamp: input.hx_stamp ?? SCENARIO_SIM_HX_STAMP,
      hx_ship_path: input.hx_ship_path ?? SCENARIO_SIM_HX_SHIP_PATH,
      overrides: validated.overrides,
      return: {
        teams,
        include_full_board: input.include_full_board ?? false,
        include_baseline_delta: input.include_baseline_delta ?? true,
      },
    },
  };
}

export function defaultReturnTeams(overrides: ScenarioOverride[]): string[] {
  const seen = new Set<string>();
  const teams: string[] = [];
  for (const ov of overrides) {
    for (const slug of collectSlugs(ov)) {
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      teams.push(slug);
    }
  }
  for (const slug of SCENARIO_SIM_GOLDEN_TEAMS) {
    if (!seen.has(slug)) {
      seen.add(slug);
      teams.push(slug);
    }
  }
  return teams.slice(0, 6);
}

export function loadScenarioSimExample(): ScenarioSimContractExample {
  return exampleRaw as ScenarioSimContractExample;
}

export function loadScenarioSimGoldenRequest(): ScenarioSimRequest {
  return goldenRequestRaw as ScenarioSimRequest;
}

export function loadScenarioSimFixture(): ScenarioSimOkResponse {
  return goldenResponseRaw as ScenarioSimOkResponse;
}

export type ScenarioUnlockSearch = {
  edge?: string;
  unlock?: string;
};

export function parseScenarioUnlockSearch(s: Record<string, unknown>): ScenarioUnlockSearch {
  const out: ScenarioUnlockSearch = {};
  const edge = readFlag(s.edge);
  const unlock = readFlag(s.unlock);
  if (edge) out.edge = edge;
  if (unlock) out.unlock = unlock;
  return out;
}

function readFlag(value: unknown): string | undefined {
  if (value === true || value === 1) return "1";
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
}

function flagOn(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/** Soft gate for the MVP. No accounts. `?unlock=1` (or `?edge=1`) or demo constant. */
export function isScenarioSimUnlocked(search: ScenarioUnlockSearch = {}): boolean {
  if (EDGE_SCENARIO_UNLOCK) return true;
  return flagOn(search.edge) || flagOn(search.unlock);
}

function roundTo(n: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

function subtractMetrics(scenario: ScenarioTeamMetrics, baseline: ScenarioTeamMetrics): ScenarioTeamMetrics {
  return {
    make_field: roundTo(scenario.make_field - baseline.make_field, 2),
    win_title: roundTo(scenario.win_title - baseline.win_title, 2),
    proj_wins: roundTo(scenario.proj_wins - baseline.proj_wins, 2),
    conf_title: roundTo(scenario.conf_title - baseline.conf_title, 1),
  };
}

function metricsFromSimRow(slug: string): ScenarioTeamMetrics | null {
  const row = simTeamBySlug(slug);
  if (row) {
    return {
      make_field: row.make_field,
      win_title: row.win_title,
      proj_wins: roundTo(row.proj_wins, 3),
      conf_title: roundTo(row.conf_title, 2),
    };
  }
  const odds = make12FromSim(slug);
  if (odds.makeField == null || odds.winTitle == null) return null;
  return {
    make_field: odds.makeField,
    win_title: odds.winTitle,
    proj_wins: 0,
    conf_title: 0,
  };
}

function zeroDelta(): ScenarioTeamMetrics {
  return {
    make_field: 0,
    win_title: 0,
    proj_wins: 0,
    conf_title: 0,
  };
}

function errorResponse(
  error: ScenarioSimErrorCode,
  request: ScenarioSimRequest | null,
): ScenarioSimErrorResponse {
  return {
    contract_version: SCENARIO_SIM_CONTRACT_VERSION,
    ok: false,
    error,
    meta: request
      ? {
          n_sims: request.n_sims,
          seed: request.seed ?? SCENARIO_SIM_SEED,
          hx_stamp: request.hx_stamp,
          overrides_applied: 0,
        }
      : null,
    baseline: {},
    scenario: {},
    delta: {},
    overrides_echo: request?.overrides ?? [],
    confidence_note: SCENARIO_SIM_CONFIDENCE_NOTE,
  };
}

/**
 * Golden fixture runner until the live CLI path exists.
 * Georgia 75.26/21.59 → 52.40/14.78 plus the four other AMD return teams.
 * Does not draw seasons in the browser.
 */
export function runDemoScenarioSim(request: ScenarioSimRequest): ScenarioSimResponse {
  const validated = validateOverrides(request.overrides);
  if (!validated.ok) return errorResponse(validated.error, request);

  const fixture = loadScenarioSimFixture();
  const teams = request.return.teams.length ? request.return.teams : defaultReturnTeams(validated.overrides);
  const baseline: Record<string, ScenarioTeamMetrics> = {};
  const scenario: Record<string, ScenarioTeamMetrics> = {};
  const delta: Record<string, ScenarioTeamMetrics> = {};

  for (const slug of teams) {
    const fromFixture =
      isRecord(fixture.baseline[slug]) && isRecord(fixture.scenario[slug])
        ? {
            baseline: fixture.baseline[slug],
            scenario: fixture.scenario[slug],
          }
        : null;
    if (fromFixture) {
      baseline[slug] = fromFixture.baseline;
      scenario[slug] = fromFixture.scenario;
      delta[slug] = fixture.delta[slug] ?? subtractMetrics(fromFixture.scenario, fromFixture.baseline);
      continue;
    }
    const row = metricsFromSimRow(slug);
    if (!row) return errorResponse("unknown_slug", request);
    baseline[slug] = row;
    scenario[slug] = row;
    delta[slug] = fixture.delta[slug] ?? zeroDelta();
  }

  return {
    contract_version: SCENARIO_SIM_CONTRACT_VERSION,
    ok: true,
    error: null,
    meta: {
      n_sims: request.n_sims,
      seed: request.seed ?? fixture.meta.seed,
      hx_stamp: request.hx_stamp,
      overrides_applied: validated.overrides.length,
    },
    baseline,
    scenario,
    delta,
    overrides_echo: validated.overrides,
    confidence_note: fixture.confidence_note || SCENARIO_SIM_CONFIDENCE_NOTE,
  };
}

export function scenarioTeamSlugs(response: ScenarioSimResponse): string[] {
  return Object.keys(response.baseline);
}

export function formatScenarioError(code: ScenarioSimErrorCode): string {
  switch (code) {
    case "too_many_overrides":
      return "At most three overrides.";
    case "unknown_slug":
      return "Unknown team slug.";
    case "game_already_final":
      return "That game is already final.";
    case "game_not_found":
      return "Game not found.";
    case "delta_hx_out_of_range":
      return "HX bump must sit in [-1, 1].";
    case "engine_busy":
      return "Engine is busy.";
    case "empty_overrides":
      return "Need 1–3 overrides.";
    case "incomplete_override":
      return "Override is incomplete.";
    case "winner_not_in_game":
      return "Winner must be home or away.";
    default:
      return "Could not build the request.";
  }
}
