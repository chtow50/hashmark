-- Week 5 AP Top 25 stamp (2026-09-27, NCAA/AP ballot).
-- Source: data/week5_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 5)
-- Clears every ap_rank in that season/week first so dropouts (Penn State, Louisville, Michigan, Texas A&M) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('texas', 1),
  ('georgia', 2),
  ('notre-dame', 3),
  ('miami', 4),
  ('ohio-state', 5),
  ('indiana', 6),
  ('alabama', 7),
  ('florida', 8),
  ('ole-miss', 9),
  ('byu', 10),
  ('lsu', 11),
  ('texas-tech', 12),
  ('utah', 13),
  ('iowa', 14),
  ('oregon', 15),
  ('mississippi-state', 16),
  ('tennessee', 17),
  ('usc', 18),
  ('oklahoma-state', 19),
  ('houston', 20),
  ('smu', 21),
  ('boise-state', 22),
  ('ucla', 23),
  ('kentucky', 24),
  ('missouri', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
