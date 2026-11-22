-- Week 12 AP Top 25 restamp (AP poll released 2026-11-16 via ESPN rankings API; ESPN week label 12; 25/25 ranks, no ties).
-- And the CFP committee rankings restamp (2026-11-17, ESPN rankings API, 25/25).
-- Sources: data/week12_ap_top25_2026.json, data/cfp_rankings_2026_11_17.json
-- Live board rows: rankings.season = 2026 AND rankings.week = 0. Does not touch hx_*, games, or anything else.

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
  ('wake-forest', 10),
  ('texas-tech', 11),
  ('byu', 12),
  ('iowa', 13),
  ('oregon', 14),
  ('boise-state', 15),
  ('ohio-state', 16),
  ('kentucky', 17),
  ('usc', 18),
  ('arizona', 19),
  ('houston', 20),
  ('louisville', 21),
  ('liberty', 22),
  ('florida', 23),
  ('memphis', 24),
  ('ole-miss', 25)
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
  ('texas', 5),
  ('notre-dame', 6),
  ('miami', 7),
  ('indiana', 8),
  ('tennessee', 9),
  ('byu', 10),
  ('wake-forest', 11),
  ('texas-tech', 12),
  ('oregon', 13),
  ('ohio-state', 14),
  ('iowa', 15),
  ('kentucky', 16),
  ('boise-state', 17),
  ('usc', 18),
  ('arizona', 19),
  ('houston', 20),
  ('south-carolina', 21),
  ('oklahoma', 22),
  ('louisville', 23),
  ('florida', 24),
  ('ole-miss', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
