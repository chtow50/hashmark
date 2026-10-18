-- Week 7 AP Top 25 stamp (2026-10-11, AP poll via ESPN rankings API; NCAA.com cross-check 25/25).
-- Source: data/week7_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 8)
-- Clears every ap_rank in that season/week first so the dropouts (Oregon, Florida, Pittsburgh) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('georgia', 1),
  ('notre-dame', 2),
  ('miami', 3),
  ('ohio-state', 4),
  ('indiana', 5),
  ('alabama', 6),
  ('texas', 7),
  ('byu', 8),
  ('ole-miss', 9),
  ('texas-tech', 10),
  ('utah', 11),
  ('ucla', 12),
  ('missouri', 13),
  ('tennessee', 14),
  ('kentucky', 15),
  ('mississippi-state', 16),
  ('iowa', 17),
  ('oklahoma-state', 18),
  ('usc', 19),
  ('houston', 20),
  ('wake-forest', 21),
  ('lsu', 22),
  ('boise-state', 23),
  ('smu', 24),
  ('northwestern', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
