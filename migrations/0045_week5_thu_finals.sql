-- Week 5 Thursday FINALs. Website peer CLEAR vs ESPN STATUS_FINAL (Oct 1).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0036/0041 kick and Vegas on the same cards.

-- Western Kentucky @ New Mexico State — New Mexico State 34, Western Kentucky 13 (home is new-mexico-state).
update games g
set status = 'final',
    home_score = 34,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'new-mexico-state' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'new-mexico-state'));

-- Source event 401871049. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- North Texas @ Tulsa — Tulsa 44, North Texas 45 OT (home is tulsa).
update games g
set status = 'final',
    home_score = 44,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'tulsa' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'tulsa'));

-- Source event 401862786. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
