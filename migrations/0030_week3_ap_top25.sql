-- Week 3 AP Top 25 stamp (2026-09-13, NCAA/AP ballot).
-- Source: data/week3_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 3)
-- Clears every ap_rank in that season/week first so dropouts (Washington) go NULL.
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
  ('indiana', 4),
  ('miami', 5),
  ('ohio-state', 6),
  ('lsu', 7),
  ('ole-miss', 8),
  ('texas-am', 9),
  ('alabama', 10),
  ('byu', 11),
  ('usc', 12),
  ('texas-tech', 13),
  ('penn-state', 14),
  ('tennessee', 15),
  ('smu', 16),
  ('utah', 17),
  ('iowa', 18),
  ('michigan', 19),
  ('missouri', 20),
  ('oregon', 21),
  ('houston', 22),
  ('louisville', 23),
  ('oklahoma', 24),
  ('virginia', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
