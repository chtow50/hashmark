-- Week 9 AP Top 25 stamp (2026-10-25, AP poll via ESPN rankings API; NCAA.com cross-check 25/25 ranks + points).
-- Boise State and Northwestern are tied at No. 20 (both stored as 20; no No. 21).
-- Source: data/week9_ap_top25_2026.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0
--   (queries in src/lib/cfb/queries.ts join week = 0; chrome markets Week 10)
-- Clears every ap_rank in that season/week first so the dropouts (Iowa, USC) go NULL.
-- Then sets ap_rank for the 25 slugs. Idempotent UPDATEs via teams.slug.
-- No TRUNCATE. Does not touch hx_*, offense_rating, defense_rating,
-- games, players, roster_profile, or talent.

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('miami', 1),
  ('ohio-state', 2),
  ('georgia', 3),
  ('indiana', 4),
  ('notre-dame', 5),
  ('utah', 6),
  ('ucla', 7),
  ('byu', 8),
  ('kentucky', 9),
  ('alabama', 10),
  ('texas', 11),
  ('ole-miss', 12),
  ('texas-tech', 13),
  ('wake-forest', 14),
  ('lsu', 15),
  ('tennessee', 16),
  ('florida', 17),
  ('houston', 18),
  ('smu', 19),
  ('boise-state', 20),
  ('northwestern', 20),
  ('arizona', 22),
  ('missouri', 23),
  ('oklahoma-state', 24),
  ('wisconsin', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
