-- Week 12 Wednesday FINALs (Nightly FINAL Stamp, 2026-11-19 ~1:30 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0101 kick/TV/Vegas on the same card.

-- Akron @ Massachusetts — Massachusetts 33, Akron 34 (home is massachusetts).
update games g
set status = 'final',
    home_score = 33,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'massachusetts' and a.slug = 'akron';

-- Source event 401866467. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Central Michigan @ Buffalo — Buffalo 40, Central Michigan 21 (home is buffalo).
update games g
set status = 'final',
    home_score = 40,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'buffalo' and a.slug = 'central-michigan';

-- Source event 401866469. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
