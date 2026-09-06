/**
 * Local team logo registry. Assets live in `public/logos/{slug}.png`.
 *
 * Spike: Big 12 (16 teams). Expand by adding ESPN ids here and running
 * `node scripts/fetch-team-logos.mjs` (see script header for full 136 workflow).
 *
 * Source: ESPN CDN (`a.espncdn.com/i/teamlogos/ncaa/500/{id}.png`) — fetched once
 * into the repo so runtime does not depend on ESPN.
 */

/** ESPN numeric team ids — add rows as logos are fetched. */
export const TEAM_LOGO_ESPN_IDS: Record<string, number> = {
  // Big 12 (spike)
  "arizona": 12,
  "arizona-state": 9,
  "baylor": 239,
  "byu": 252,
  "cincinnati": 2132,
  "colorado": 38,
  "houston": 248,
  "iowa-state": 66,
  "kansas": 2305,
  "kansas-state": 2306,
  "oklahoma-state": 197,
  "tcu": 2628,
  "texas-tech": 2641,
  "ucf": 2116,
  "utah": 254,
  "west-virginia": 277,
};

/** Slugs with a committed asset under `public/logos/`. */
export const TEAM_LOGO_SLUGS = new Set(Object.keys(TEAM_LOGO_ESPN_IDS));

export function hasTeamLogo(slug: string): boolean {
  return TEAM_LOGO_SLUGS.has(slug);
}

export function teamLogoSrc(slug: string): string | null {
  return hasTeamLogo(slug) ? `/logos/${slug}.png` : null;
}
