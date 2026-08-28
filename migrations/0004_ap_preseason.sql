-- 2026 preseason AP Top 25 (released Aug 17, 2026). BYU/USC tied at 14.
update rankings set ap_rank = null where season = 2026 and week = 0;

update rankings r
set ap_rank = v.rk
from teams t
join (values
  ('ohio-state', 1),
  ('oregon', 2),
  ('georgia', 3),
  ('notre-dame', 4),
  ('texas', 5),
  ('indiana', 6),
  ('miami', 7),
  ('texas-am', 8),
  ('ole-miss', 9),
  ('oklahoma', 10),
  ('lsu', 11),
  ('texas-tech', 12),
  ('alabama', 13),
  ('byu', 14),
  ('usc', 14),
  ('michigan', 16),
  ('washington', 17),
  ('penn-state', 18),
  ('smu', 19),
  ('tennessee', 20),
  ('utah', 21),
  ('iowa', 22),
  ('houston', 23),
  ('louisville', 24),
  ('missouri', 25)
) as v(slug, rk) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
