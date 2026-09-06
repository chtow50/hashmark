# Team logos

Local PNG assets keyed by team `slug` (matches `teams.slug` in the DB).

## Spike (Big 12)

Sixteen files for the Big 12 conference. Registry: `src/lib/cfb/team-logos.ts`.

## Expand to full 136 FBS

1. Add `slug → ESPN id` pairs to `TEAM_LOGO_ESPN_IDS` in `src/lib/cfb/team-logos.ts`.
   ESPN ids are stable; a community-maintained list lives at
   [nickmillerdotnow/sports-ids](https://github.com/nickmillerdotnow/sports-ids).
2. Run `node scripts/fetch-team-logos.mjs` (or pass explicit slugs).
3. Commit new PNGs + registry update.

Runtime never calls ESPN — assets are vendored here. Missing slugs render color bar only (`TeamMark` / `TeamLogo` fail soft).

Source for initial fetch: `https://a.espncdn.com/i/teamlogos/ncaa/500/{id}.png`
