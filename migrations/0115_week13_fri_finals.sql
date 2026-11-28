-- Week 13 Friday FINALs (Nightly FINAL Stamp, 2026-11-28 ~1:20 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0111 kick/TV/Vegas on the same card.

-- Nebraska @ Iowa — Iowa 31, Nebraska 7 (home is iowa).
update games g
set status = 'final',
    home_score = 31,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'iowa' and a.slug = 'nebraska';

-- Mississippi State @ Ole Miss — Ole Miss 41, Mississippi State 17 (home is ole-miss).
update games g
set status = 'final',
    home_score = 41,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'ole-miss' and a.slug = 'mississippi-state';

-- Tulsa @ UTSA — UTSA 28, Tulsa 22 (home is utsa).
update games g
set status = 'final',
    home_score = 28,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'utsa' and a.slug = 'tulsa';

-- Buffalo @ Akron — Buffalo 17, Akron 9 (home is akron).
update games g
set status = 'final',
    home_score = 9,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'akron' and a.slug = 'buffalo';

-- Toledo @ Ohio — Toledo 34, Ohio 31 (home is ohio).
update games g
set status = 'final',
    home_score = 31,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'ohio' and a.slug = 'toledo';

-- App State @ South Alabama — South Alabama 20, App State 13 (home is south-alabama).
update games g
set status = 'final',
    home_score = 20,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'south-alabama' and a.slug = 'app-state';

-- Florida @ Florida State — Florida 26, Florida State 10 (home is florida-state).
update games g
set status = 'final',
    home_score = 10,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'florida-state' and a.slug = 'florida';

-- Temple @ Memphis — Temple 35, Memphis 31 (home is memphis).
update games g
set status = 'final',
    home_score = 31,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'memphis' and a.slug = 'temple';

-- North Dakota State @ San José State — North Dakota State 38, San José State 31 (home is san-jose-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'san-jose-state' and a.slug = 'north-dakota-state';

-- Air Force @ New Mexico — New Mexico 42, Air Force 19 (home is new-mexico).
update games g
set status = 'final',
    home_score = 42,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'new-mexico' and a.slug = 'air-force';

-- Texas @ Texas A&M — Texas 16, Texas A&M 6 (home is texas-am).
update games g
set status = 'final',
    home_score = 6,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'texas-am' and a.slug = 'texas';

-- Minnesota @ Wisconsin — Wisconsin 28, Minnesota 5 (home is wisconsin).
update games g
set status = 'final',
    home_score = 28,
    away_score = 5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'wisconsin' and a.slug = 'minnesota';

-- West Virginia @ Utah — Utah 52, West Virginia 28 (home is utah).
update games g
set status = 'final',
    home_score = 52,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'utah' and a.slug = 'west-virginia';

-- Source events: 401858536, 401856762, 401862840, 401866472, 401866473, 401869930, 401856759, 401862838, 401864549, 401864546, 401856756, 401858544, 401856880. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
