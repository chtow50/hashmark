-- Week 11 AP Top 25 restamp (2026-11-08, AP poll via ESPN rankings API; NCAA.com cross-check 25/25 ranks, records, points).
-- And the first CFP committee rankings stamp (2026-11-10, ESPN rankings API; NCAA.com cross-check 25/25 ranks + records).
-- Sources: data/week11_ap_top25_2026.json, data/cfp_rankings_2026_11_10.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0. Does not touch hx_*, games, or anything else.

alter table rankings add column if not exists cfp_rank int;

update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('georgia', 1),
  ('utah', 2),
  ('notre-dame', 3),
  ('ucla', 4),
  ('miami', 5),
  ('indiana', 6),
  ('alabama', 7),
  ('texas', 8),
  ('tennessee', 9),
  ('texas-tech', 10),
  ('wake-forest', 11),
  ('byu', 12),
  ('kentucky', 13),
  ('houston', 14),
  ('usc', 15),
  ('iowa', 16),
  ('boise-state', 17),
  ('oregon', 18),
  ('ole-miss', 19),
  ('south-carolina', 20),
  ('ohio-state', 21),
  ('arizona', 22),
  ('new-mexico', 23),
  ('lsu', 24),
  ('smu', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;

update rankings set cfp_rank = null where season = 2026 and week = 0;

update rankings r
set cfp_rank = v.rk
from teams t
join (values
  ('georgia', 1),
  ('utah', 2),
  ('alabama', 3),
  ('ucla', 4),
  ('notre-dame', 5),
  ('texas', 6),
  ('miami', 7),
  ('tennessee', 8),
  ('indiana', 9),
  ('byu', 10),
  ('kentucky', 11),
  ('texas-tech', 12),
  ('wake-forest', 13),
  ('houston', 14),
  ('iowa', 15),
  ('oregon', 16),
  ('south-carolina', 17),
  ('usc', 18),
  ('ole-miss', 19),
  ('ohio-state', 20),
  ('lsu', 21),
  ('missouri', 22),
  ('arizona', 23),
  ('boise-state', 24),
  ('oklahoma-state', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
