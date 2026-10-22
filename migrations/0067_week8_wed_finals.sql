-- Week 8 Wednesday FINAL (Nightly FINAL Stamp, 2026-10-22 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0064 kick/TV/Vegas on the same card.

-- New Mexico State @ Sam Houston — New Mexico State 30, Sam Houston 24 (home is sam-houston).
update games g
set status = 'final',
    home_score = 24,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'sam-houston' and a.slug = 'new-mexico-state';

-- Source event 401871070. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
