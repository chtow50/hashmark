# Team logos

Local PNG assets keyed by team `slug` (matches `teams.slug` in the DB).

## Full FBS (136)

All 136 HASHMARK team slugs are registered in `src/lib/cfb/team-logos.ts` with ESPN ids.
Preview grid: `/logos` route in the app.

## Re-fetch / add teams

1. Add `slug → ESPN id` pairs to `TEAM_LOGO_ESPN_IDS` in `src/lib/cfb/team-logos.ts`.
   ESPN ids are stable; a community-maintained list lives at
   [nickmillerdotnow/sports-ids](https://github.com/nickmillerdotnow/sports-ids).
2. Run `node scripts/fetch-team-logos.mjs` (or pass explicit slugs).
3. Commit new PNGs + registry update.

Runtime never calls ESPN — assets are vendored here. Missing slugs render color bar only (`TeamMark` / `TeamLogo` fail soft).

Source for initial fetch: `https://a.espncdn.com/i/teamlogos/ncaa/500/{id}.png`
