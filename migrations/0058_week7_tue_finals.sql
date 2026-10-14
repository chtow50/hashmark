-- Week 7 Tuesday FINALs (Nightly FINAL Stamp, 2026-10-14 ~1:22 AM CT).
-- Source: ESPN game pages (STATUS_FINAL) + official athletics / AP.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0057 kick/TV/Vegas on the same card.

-- Delaware @ Middle Tennessee — Middle Tennessee 33, Delaware 30 (home is middle-tennessee).
update games g
set status = 'final',
    home_score = 33,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'middle-tennessee' and a.slug = 'delaware';

-- Source event 401871067. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida International @ Jacksonville State — Jacksonville State 27, FIU 24 (home is jacksonville-state).
update games g
set status = 'final',
    home_score = 27,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'jacksonville-state' and a.slug = 'fiu';

-- Source event 401871053. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
