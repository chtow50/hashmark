-- Week 10 AP Top 25 stamp (2026-11-01, AP poll via ESPN rankings API; NCAA.com cross-check 25/25 ranks + points).
-- No ties. Source: data/week10_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 11)
-- Clears every ap_rank in that season/week first so the dropouts (SMU, Northwestern, Oklahoma State, Wisconsin) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('miami', 1),
  ('georgia', 2),
  ('utah', 3),
  ('notre-dame', 4),
  ('ucla', 5),
  ('indiana', 6),
  ('byu', 7),
  ('kentucky', 8),
  ('alabama', 9),
  ('texas', 10),
  ('ohio-state', 11),
  ('ole-miss', 12),
  ('texas-tech', 13),
  ('wake-forest', 14),
  ('lsu', 15),
  ('tennessee', 16),
  ('houston', 17),
  ('usc', 18),
  ('missouri', 19),
  ('boise-state', 20),
  ('iowa', 21),
  ('new-mexico', 22),
  ('south-carolina', 23),
  ('arizona', 24),
  ('florida', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
