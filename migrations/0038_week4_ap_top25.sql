-- Week 4 AP Top 25 stamp (2026-09-20, NCAA/AP ballot).
-- Source: data/week4_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 4)
-- Clears every ap_rank in that season/week first so dropouts (Oklahoma, Virginia) go NULL.
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
  ('ole-miss', 4),
  ('indiana', 5),
  ('miami', 6),
  ('ohio-state', 7),
  ('alabama', 8),
  ('byu', 9),
  ('lsu', 10),
  ('texas-tech', 11),
  ('usc', 12),
  ('penn-state', 13),
  ('tennessee', 14),
  ('utah', 15),
  ('louisville', 16),
  ('iowa', 17),
  ('michigan', 18),
  ('missouri', 19),
  ('oregon', 20),
  ('florida', 21),
  ('smu', 22),
  ('texas-am', 23),
  ('mississippi-state', 24),
  ('houston', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
