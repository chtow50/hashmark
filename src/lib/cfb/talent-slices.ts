import type { TeamSummary } from "./types";

/** Weighted two-deep rating for high-school signees (non-transfers). */
export function hasHsSlice(team: TeamSummary): boolean {
  return Number.isFinite(team.hsTalent) && team.hsTalent > 0;
}

/** Weighted two-deep rating for portal transfers on the roster. */
export function hasPortalSlice(team: TeamSummary): boolean {
  return team.transferCount > 0 && Number.isFinite(team.portalTalent) && team.portalTalent > 0;
}

/** Portal share of two-deep weight (0–100). Hidden when no portal players. */
export function hasPortalMix(team: TeamSummary): boolean {
  return hasPortalSlice(team) && Number.isFinite(team.portalShare) && team.portalShare > 0;
}
