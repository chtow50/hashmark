-- Week 1 AP Top 25 stamp (2026-09-08, ESPN/AP ballot).
-- Source: data/week1_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 2)
-- Clears every ap_rank in that season/week first so dropouts (Michigan) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('ohio-state', 1),
  ('georgia', 2),
  ('notre-dame', 3),
  ('texas', 4),
  ('indiana', 5),
  ('oregon', 6),
  ('miami', 7),
  ('lsu', 8),
  ('ole-miss', 9),
  ('texas-am', 10),
  ('oklahoma', 11),
  ('alabama', 12),
  ('texas-tech', 13),
  ('usc', 14),
  ('byu', 15),
  ('penn-state', 16),
  ('smu', 17),
  ('tennessee', 18),
  ('washington', 19),
  ('utah', 20),
  ('iowa', 21),
  ('houston', 22),
  ('missouri', 23),
  ('louisville', 24),
  ('virginia', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
