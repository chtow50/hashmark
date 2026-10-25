-- Week 8 AP Top 25 stamp (2026-10-18, AP poll via ESPN rankings API; NCAA.com cross-check 25/25 ranks).
-- Source: data/week8_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 9)
-- Clears every ap_rank in that season/week first so the dropouts (Mississippi State, Oklahoma State) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('miami', 1),
  ('byu', 2),
  ('ohio-state', 3),
  ('notre-dame', 4),
  ('georgia', 5),
  ('indiana', 6),
  ('ole-miss', 7),
  ('texas-tech', 8),
  ('ucla', 9),
  ('utah', 10),
  ('tennessee', 11),
  ('kentucky', 12),
  ('alabama', 13),
  ('houston', 14),
  ('iowa', 15),
  ('usc', 16),
  ('wake-forest', 17),
  ('lsu', 18),
  ('texas', 19),
  ('florida', 20),
  ('boise-state', 21),
  ('missouri', 22),
  ('smu', 23),
  ('northwestern', 24),
  ('arizona', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
