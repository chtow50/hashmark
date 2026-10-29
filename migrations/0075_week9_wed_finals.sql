-- Week 9 Wednesday FINALs (Nightly FINAL Stamp, 2026-10-29 ~1:15 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0072 kick/TV/Vegas on the same card.

-- Kennesaw State @ Middle Tennessee — Kennesaw State 44, Middle Tennessee 28 (home is middle-tennessee).
update games g
set status = 'final',
    home_score = 28,
    away_score = 44
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'middle-tennessee' and a.slug = 'kennesaw-state';

-- Source event 401871058. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Jacksonville State @ New Mexico State — Jacksonville State 24, New Mexico State 0 (home is new-mexico-state).
update games g
set status = 'final',
    home_score = 0,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'new-mexico-state' and a.slug = 'jacksonville-state';

-- Source event 401871057. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
