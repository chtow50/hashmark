-- Week 9 Thursday FINALs (Nightly FINAL Stamp, 2026-10-30 ~1:15 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0072 kick/TV/Vegas on the same card.

-- Florida Atlantic @ North Texas — North Texas 48, Florida Atlantic 41 (home is north-texas).
update games g
set status = 'final',
    home_score = 48,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'north-texas' and a.slug = 'florida-atlantic';

-- Source event 401862812. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Troy @ James Madison — Troy 24, James Madison 21 (home is james-madison).
update games g
set status = 'final',
    home_score = 21,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'james-madison' and a.slug = 'troy';

-- Source event 401869963. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
