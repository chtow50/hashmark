-- Week 8 Saturday FINALs (Nightly FINAL Stamp, 2026-10-25 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Houston @ Utah was still in progress at stamp time and is not included.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0064 kick/TV/Vegas on the same card.

-- Pittsburgh @ Miami — Pittsburgh 23, Miami 52 (home is miami).
update games g
set status = 'final',
    home_score = 52,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'miami' and a.slug = 'pittsburgh';

-- California @ SMU — California 20, SMU 59 (home is smu).
update games g
set status = 'final',
    home_score = 59,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'smu' and a.slug = 'california';

-- Rutgers @ Northwestern — Rutgers 14, Northwestern 42 (home is northwestern).
update games g
set status = 'final',
    home_score = 42,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'northwestern' and a.slug = 'rutgers';

-- Western Michigan @ Toledo — Western Michigan 38, Toledo 45 (home is toledo).
update games g
set status = 'final',
    home_score = 45,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'toledo' and a.slug = 'western-michigan';

-- West Virginia @ TCU — West Virginia 24, TCU 20 (home is tcu).
update games g
set status = 'final',
    home_score = 20,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'tcu' and a.slug = 'west-virginia';

-- Indiana @ Michigan — Indiana 13, Michigan 6 (home is michigan).
update games g
set status = 'final',
    home_score = 6,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'michigan' and a.slug = 'indiana';

-- Rice @ Florida Atlantic — Rice 49, Florida Atlantic 51 (home is florida-atlantic).
update games g
set status = 'final',
    home_score = 51,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'florida-atlantic' and a.slug = 'rice';

-- LSU @ Auburn — LSU 38, Auburn 17 (home is auburn).
update games g
set status = 'final',
    home_score = 17,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'auburn' and a.slug = 'lsu';

-- Akron @ Kent State — Akron 20, Kent State 35 (home is kent-state).
update games g
set status = 'final',
    home_score = 35,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'kent-state' and a.slug = 'akron';

-- Miami (OH) @ Central Michigan — Miami (OH) 28, Central Michigan 27 (home is central-michigan).
update games g
set status = 'final',
    home_score = 27,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'central-michigan' and a.slug = 'miami-oh';

-- Oregon @ Illinois — Oregon 10, Illinois 21 (home is illinois).
update games g
set status = 'final',
    home_score = 21,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'illinois' and a.slug = 'oregon';

-- Oklahoma @ Mississippi State — Oklahoma 23, Mississippi State 15 (home is mississippi-state).
update games g
set status = 'final',
    home_score = 15,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'mississippi-state' and a.slug = 'oklahoma';

-- Hawaiʻi @ Northern Illinois — Hawaiʻi 56, Northern Illinois 21 (home is northern-illinois).
update games g
set status = 'final',
    home_score = 21,
    away_score = 56
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'northern-illinois' and a.slug = 'hawaii';

-- Michigan State @ UCLA — Michigan State 10, UCLA 28 (home is ucla).
update games g
set status = 'final',
    home_score = 28,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'ucla' and a.slug = 'michigan-state';

-- Iowa @ Minnesota — Iowa 10, Minnesota 13 (home is minnesota).
update games g
set status = 'final',
    home_score = 13,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'minnesota' and a.slug = 'iowa';

-- Texas A&M @ Alabama — Texas A&M 20, Alabama 31 (home is alabama).
update games g
set status = 'final',
    home_score = 31,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'alabama' and a.slug = 'texas-am';

-- Boston College @ Georgia Tech — Boston College 49, Georgia Tech 27 (home is georgia-tech).
update games g
set status = 'final',
    home_score = 27,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'georgia-tech' and a.slug = 'boston-college';

-- Tennessee @ South Carolina — Tennessee 24, South Carolina 27 (home is south-carolina).
update games g
set status = 'final',
    home_score = 27,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'south-carolina' and a.slug = 'tennessee';

-- Bowling Green @ Buffalo — Bowling Green 24, Buffalo 31 (home is buffalo).
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'buffalo' and a.slug = 'bowling-green';

-- North Texas @ Navy — North Texas 49, Navy 39 (home is navy).
update games g
set status = 'final',
    home_score = 39,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'navy' and a.slug = 'north-texas';

-- Eastern Michigan @ Ohio — Eastern Michigan 20, Ohio 24 (home is ohio).
update games g
set status = 'final',
    home_score = 24,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'ohio' and a.slug = 'eastern-michigan';

-- UL Monroe @ Troy — UL Monroe 21, Troy 14 (home is troy).
update games g
set status = 'final',
    home_score = 14,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'troy' and a.slug = 'ul-monroe';

-- Old Dominion @ Louisiana Tech — Old Dominion 0, Louisiana Tech 26 (home is louisiana-tech).
update games g
set status = 'final',
    home_score = 26,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'louisiana-tech' and a.slug = 'old-dominion';

-- San José State @ Nevada — San José State 13, Nevada 28 (home is nevada).
update games g
set status = 'final',
    home_score = 28,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'nevada' and a.slug = 'san-jose-state';

-- Louisiana @ Southern Miss — Louisiana 31, Southern Miss 35 (home is southern-miss).
update games g
set status = 'final',
    home_score = 35,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'southern-miss' and a.slug = 'louisiana';

-- Boise State @ Washington State — Boise State 31, Washington State 10 (home is washington-state).
update games g
set status = 'final',
    home_score = 10,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'washington-state' and a.slug = 'boise-state';

-- San Diego State @ Colorado State — San Diego State 49, Colorado State 56 (home is colorado-state).
update games g
set status = 'final',
    home_score = 56,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'colorado-state' and a.slug = 'san-diego-state';

-- Georgia State @ Arkansas State — Georgia State 32, Arkansas State 38 (home is arkansas-state).
update games g
set status = 'final',
    home_score = 38,
    away_score = 32
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'arkansas-state' and a.slug = 'georgia-state';

-- Virginia Tech @ Clemson — Virginia Tech 20, Clemson 16 (home is clemson).
update games g
set status = 'final',
    home_score = 16,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'clemson' and a.slug = 'virginia-tech';

-- Syracuse @ North Carolina — Syracuse 31, North Carolina 30 (home is north-carolina).
update games g
set status = 'final',
    home_score = 30,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'north-carolina' and a.slug = 'syracuse';

-- Vanderbilt @ Kentucky — Vanderbilt 17, Kentucky 34 (home is kentucky).
update games g
set status = 'final',
    home_score = 34,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'kentucky' and a.slug = 'vanderbilt';

-- Iowa State @ Arizona — Iowa State 3, Arizona 39 (home is arizona).
update games g
set status = 'final',
    home_score = 39,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'arizona' and a.slug = 'iowa-state';

-- USC @ Wisconsin — USC 7, Wisconsin 24 (home is wisconsin).
update games g
set status = 'final',
    home_score = 24,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'wisconsin' and a.slug = 'usc';

-- Ole Miss @ Texas — Ole Miss 27, Texas 34 (home is texas).
update games g
set status = 'final',
    home_score = 34,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'texas' and a.slug = 'ole-miss';

-- Utah State @ Texas State — Utah State 17, Texas State 20 (home is texas-state).
update games g
set status = 'final',
    home_score = 20,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'texas-state' and a.slug = 'utah-state';

-- UTSA @ Tulane — UTSA 42, Tulane 19 (home is tulane).
update games g
set status = 'final',
    home_score = 19,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'tulane' and a.slug = 'utsa';

-- BYU @ UCF — BYU 31, UCF 39 (home is ucf).
update games g
set status = 'final',
    home_score = 39,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'ucf' and a.slug = 'byu';

-- Texas Tech @ Cincinnati — Texas Tech 24, Cincinnati 37 (home is cincinnati).
update games g
set status = 'final',
    home_score = 37,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'cincinnati' and a.slug = 'texas-tech';

-- Kansas State @ Arizona State — Kansas State 17, Arizona State 28 (home is arizona-state).
update games g
set status = 'final',
    home_score = 28,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'arizona-state' and a.slug = 'kansas-state';

-- Baylor @ Kansas — Baylor 24, Kansas 25 (home is kansas).
update games g
set status = 'final',
    home_score = 25,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'kansas' and a.slug = 'baylor';

-- Colorado @ Oklahoma State — Colorado 24, Oklahoma State 57 (home is oklahoma-state).
update games g
set status = 'final',
    home_score = 57,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'oklahoma-state' and a.slug = 'colorado';

-- Source events 401858274, 401858270, 401858498, 401866450, 401856841, 401858496, 401862809, 401856728, 401866446, 401866476, 401858495, 401856730, 401864526, 401858499, 401858497, 401856727, 401858273, 401856731, 401866448, 401862810, 401866449, 401871094, 401871093, 401864528, 401869967, 401860907, 401860905, 401869935, 401858276, 401858275, 401856729, 401856838, 401858500, 401856732, 401860906, 401862811, 401856835, 401856840, 401856839, 401856834, 401856836. Digits stay below the week predicates so the stamp gate keeps kick/Vegas.
