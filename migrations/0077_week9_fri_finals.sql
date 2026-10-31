-- Week 9 Friday FINALs (Nightly FINAL Stamp, 2026-10-31 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0072 kick/TV/Vegas on the same card.

-- Tulane @ Charlotte — Tulane 38, Charlotte 31 (home is charlotte).
update games g
set status = 'final',
    home_score = 31,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'charlotte' and a.slug = 'tulane';

-- Source event 401862813. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Baylor @ UCF — Baylor 41, UCF 9 (home is ucf).
update games g
set status = 'final',
    home_score = 9,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'ucf' and a.slug = 'baylor';

-- Source event 401856844. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
