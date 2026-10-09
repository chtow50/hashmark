-- Week 6 AP Top 25 stamp (2026-10-04, AP poll via ESPN rankings API).
-- Source: data/week6_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 6)
-- Clears every ap_rank in that season/week first so the dropout (Kentucky) goes NULL.
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
  ('alabama', 6),
  ('indiana', 7),
  ('byu', 8),
  ('ole-miss', 9),
  ('lsu', 10),
  ('texas-tech', 11),
  ('utah', 12),
  ('oregon', 13),
  ('missouri', 14),
  ('tennessee', 15),
  ('florida', 16),
  ('mississippi-state', 17),
  ('oklahoma-state', 18),
  ('usc', 19),
  ('iowa', 20),
  ('ucla', 21),
  ('houston', 22),
  ('boise-state', 23),
  ('smu', 24),
  ('pittsburgh', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
