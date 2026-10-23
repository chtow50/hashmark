-- Week 8 Thursday FINALs (Nightly FINAL Stamp, 2026-10-23 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0064 kick/TV/Vegas on the same card.

-- James Madison @ App State — James Madison 31, App State 34 (OT) (home is app-state).
update games g
set status = 'final',
    home_score = 34,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'app-state' and a.slug = 'james-madison';

-- Liberty @ Kennesaw State — Liberty 34, Kennesaw State 6 (home is kennesaw-state).
update games g
set status = 'final',
    home_score = 6,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'kennesaw-state' and a.slug = 'liberty';

-- East Carolina @ Memphis — East Carolina 34, Memphis 41 (OT) (home is memphis).
update games g
set status = 'final',
    home_score = 41,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'memphis' and a.slug = 'east-carolina';

-- Source events 401869845, 401871056, 401862807. Digits stay below the week predicates so the stamp gate keeps kick/Vegas.
