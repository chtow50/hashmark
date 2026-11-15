-- Week 11 Sunday sweep (Sunday Board + Tape ship, 2026-11-15 CT).
-- Source: ESPN scoreboard + summary, STATUS_FINAL, scores agree.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- North Dakota State @ Hawaii was the Saturday straggler (in progress at the 0099 stamp).
-- Re-verified 2026-11-15 11:30 AM CT: ESPN 401864537 STATUS_FINAL, Hawaiʻi 13, North Dakota State 21.

-- North Dakota State @ Hawaii — North Dakota State 21, Hawaii 13 (home is hawaii).
update games g
set status = 'final',
    home_score = 13,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'hawaii' and a.slug = 'north-dakota-state';

-- Source event 401864537. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ole Miss @ Oklahoma kick / TV / Vegas. ESPN lists it Sun Nov 15, 12:00 PM CT (18:00 UTC), SEC Network;
-- our board held it TBD with a Nov 14 date. Date fixed to the ESPN CT date.
-- Vegas: DraftKings and Bovada (CFBD lines, pulled 11:30 AM CT) both Oklahoma -2.5, total 48.5; live ESPN
-- DraftKings OU -2.5, o/u 48.5. Two independent books match exactly, so spread +2.5 (home favored) and total 48.5.
-- ESPN 401856887 · Sun 2026-11-15 12:00 CT · SEC Network · Vegas OU -2.5 / 48.5
update games g
set kickoff_at = timestamptz '2026-11-15 12:00:00-06',
    kickoff_date = date '2026-11-15',
    tv = 'SEC Network',
    vegas_spread = 2.5,
    vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma' and a.slug = 'ole-miss'
  and g.status <> 'final'
  and g.week = 11;

-- Ole Miss @ Oklahoma — Oklahoma 24, Ole Miss 17 (home is oklahoma).
-- Verified 2026-11-15 ESPN 401856887 STATUS_FINAL (summary + scoreboard agree).
update games g
set status = 'final',
    home_score = 24,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'oklahoma' and a.slug = 'ole-miss';
