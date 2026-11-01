-- Week 9 Saturday FINALs (Nightly FINAL Stamp, 2026-11-01 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Texas State @ Boise State, Northern Illinois @ UNLV, and Oregon State @ Fresno State
-- were still in progress at stamp time and are not included.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0072 kick/TV/Vegas on the same card.

-- Arizona @ Texas Tech — Arizona 26, Texas Tech 34 (home is texas-tech).
update games g
set status = 'final',
    home_score = 34,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'texas-tech' and a.slug = 'arizona';

-- Source event 401856842. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- California @ NC State — California 10, NC State 31 (home is nc-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'nc-state' and a.slug = 'california';

-- Source event 401858277. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- SMU @ Syracuse — SMU 27, Syracuse 30 (home is syracuse).
update games g
set status = 'final',
    home_score = 30,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'syracuse' and a.slug = 'smu';

-- Source event 401858278. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Boston College @ Duke — Boston College 2, Duke 47 (home is duke).
update games g
set status = 'final',
    home_score = 47,
    away_score = 2
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'duke' and a.slug = 'boston-college';

-- Source event 401858279. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wisconsin @ Iowa — Wisconsin 0, Iowa 30 (home is iowa).
update games g
set status = 'final',
    home_score = 30,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'iowa' and a.slug = 'wisconsin';

-- Source event 401858502. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Illinois @ Maryland — Illinois 20, Maryland 17 (home is maryland).
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'maryland' and a.slug = 'illinois';

-- Source event 401858503. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Notre Dame @ Navy — Notre Dame 35, Navy 13 (home is navy).
update games g
set status = 'final',
    home_score = 13,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'navy' and a.slug = 'notre-dame';

-- Source event 401859185. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UAB @ South Florida — UAB 10, South Florida 30 (home is usf).
update games g
set status = 'final',
    home_score = 30,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'usf' and a.slug = 'uab';

-- Source event 401862816. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Bowling Green @ Western Michigan — Bowling Green 10, Western Michigan 23 (home is western-michigan).
update games g
set status = 'final',
    home_score = 23,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'western-michigan' and a.slug = 'bowling-green';

-- Source event 401866452. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Michigan @ Rutgers — Michigan 28, Rutgers 21 (home is rutgers).
update games g
set status = 'final',
    home_score = 21,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'rutgers' and a.slug = 'michigan';

-- Source event 401858507. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Auburn @ Ole Miss — Auburn 15, Ole Miss 45 (home is ole-miss).
update games g
set status = 'final',
    home_score = 45,
    away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'ole-miss' and a.slug = 'auburn';

-- Source event 401856735. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Marshall @ Old Dominion — Marshall 36, Old Dominion 23 (home is old-dominion).
update games g
set status = 'final',
    home_score = 23,
    away_score = 36
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'old-dominion' and a.slug = 'marshall';

-- Source event 401871096. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kansas State @ Colorado — Kansas State 24, Colorado 27 (home is colorado).
update games g
set status = 'final',
    home_score = 27,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'colorado' and a.slug = 'kansas-state';

-- Source event 401856846. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Coastal Carolina @ Georgia State — Coastal Carolina 31, Georgia State 20 (home is georgia-state).
update games g
set status = 'final',
    home_score = 20,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'georgia-state' and a.slug = 'coastal-carolina';

-- Source event 401869944. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UConn @ Air Force — UConn 26, Air Force 35 (home is air-force).
update games g
set status = 'final',
    home_score = 35,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'air-force' and a.slug = 'uconn';

-- Source event 401861966. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Temple @ East Carolina — Temple 9, East Carolina 17 (home is east-carolina).
update games g
set status = 'final',
    home_score = 17,
    away_score = 9
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'east-carolina' and a.slug = 'temple';

-- Source event 401862815. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisiana Tech @ South Alabama — Louisiana Tech 35, South Alabama 20 (home is south-alabama).
update games g
set status = 'final',
    home_score = 20,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'south-alabama' and a.slug = 'louisiana-tech';

-- Source event 401871097. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Stanford @ Louisville — Stanford 24, Louisville 52 (home is louisville).
update games g
set status = 'final',
    home_score = 52,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'louisville' and a.slug = 'stanford';

-- Source event 401858283. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida @ Georgia — Florida 8, Georgia 27 (home is georgia).
update games g
set status = 'final',
    home_score = 27,
    away_score = 8
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'georgia' and a.slug = 'florida';

-- Source event 401856734. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arizona State @ BYU — Arizona State 20, BYU 27 (home is byu).
update games g
set status = 'final',
    home_score = 27,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'byu' and a.slug = 'arizona-state';

-- Source event 401856843. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kansas @ TCU — Kansas 16, TCU 22 (home is tcu).
update games g
set status = 'final',
    home_score = 22,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'tcu' and a.slug = 'kansas';

-- Source event 401856845. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Minnesota @ Indiana — Minnesota 16, Indiana 23 (home is indiana).
update games g
set status = 'final',
    home_score = 23,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'indiana' and a.slug = 'minnesota';

-- Source event 401858501. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Northwestern @ Oregon — Northwestern 26, Oregon 34 (home is oregon).
update games g
set status = 'final',
    home_score = 34,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'oregon' and a.slug = 'northwestern';

-- Source event 401858505. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Colorado State @ Utah State — Colorado State 14, Utah State 31 (home is utah-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'utah-state' and a.slug = 'colorado-state';

-- Source event 401860910. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida International @ Liberty — Florida International 10, Liberty 49 (home is liberty).
update games g
set status = 'final',
    home_score = 49,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'liberty' and a.slug = 'fiu';

-- Source event 401871059. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Southern Miss @ UL Monroe — Southern Miss 35, UL Monroe 21 (home is ul-monroe).
update games g
set status = 'final',
    home_score = 21,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'ul-monroe' and a.slug = 'southern-miss';

-- Source event 401871095. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Utah @ Cincinnati — Utah 49, Cincinnati 25 (home is cincinnati).
update games g
set status = 'final',
    home_score = 25,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'cincinnati' and a.slug = 'utah';

-- Source event 401856848. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Virginia @ Wake Forest — Virginia 7, Wake Forest 51 (home is wake-forest).
update games g
set status = 'final',
    home_score = 51,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'wake-forest' and a.slug = 'virginia';

-- Source event 401858284. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- New Mexico @ San José State — New Mexico 21, San José State 16 (home is san-jose-state).
update games g
set status = 'final',
    home_score = 16,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'san-jose-state' and a.slug = 'new-mexico';

-- Source event 401864529. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Carolina @ Oklahoma — South Carolina 42, Oklahoma 25 (home is oklahoma).
update games g
set status = 'final',
    home_score = 25,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'oklahoma' and a.slug = 'south-carolina';

-- Source event 401856736. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Purdue @ Penn State — Purdue 17, Penn State 31 (home is penn-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'penn-state' and a.slug = 'purdue';

-- Source event 401858506. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Nevada @ UCLA — Nevada 0, UCLA 27 (home is ucla).
update games g
set status = 'final',
    home_score = 27,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'ucla' and a.slug = 'nevada';

-- Source event 401858508. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- App State @ Georgia Southern — App State 3, Georgia Southern 19 (home is georgia-southern).
update games g
set status = 'final',
    home_score = 19,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'georgia-southern' and a.slug = 'app-state';

-- Source event 401869846. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oklahoma State @ Iowa State — Oklahoma State 49, Iowa State 51 (home is iowa-state).
update games g
set status = 'final',
    home_score = 51,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'iowa-state' and a.slug = 'oklahoma-state';

-- Source event 401856847. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Clemson @ Florida State — Clemson 36, Florida State 24 (home is florida-state).
update games g
set status = 'final',
    home_score = 24,
    away_score = 36
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'florida-state' and a.slug = 'clemson';

-- Source event 401858280. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Washington State @ San Diego State — Washington State 20, San Diego State 26 (home is san-diego-state).
update games g
set status = 'final',
    home_score = 26,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'san-diego-state' and a.slug = 'washington-state';

-- Source event 401860909. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Mississippi State @ Texas — Mississippi State 3, Texas 31 (home is texas).
update games g
set status = 'final',
    home_score = 31,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'texas' and a.slug = 'mississippi-state';

-- Source event 401856737. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia Tech @ Pittsburgh — Georgia Tech 11, Pittsburgh 34 (home is pittsburgh).
update games g
set status = 'final',
    home_score = 34,
    away_score = 11
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'pittsburgh' and a.slug = 'georgia-tech';

-- Source event 401858281. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Miami @ North Carolina — Miami 38, North Carolina 35 (home is north-carolina).
update games g
set status = 'final',
    home_score = 35,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'north-carolina' and a.slug = 'miami';

-- Source event 401858282. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ohio State @ USC — Ohio State 18, USC 30 (home is usc).
update games g
set status = 'final',
    home_score = 30,
    away_score = 18
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'usc' and a.slug = 'ohio-state';

-- Source event 401858509. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Missouri @ Arkansas — Missouri 34, Arkansas 10 (home is arkansas).
update games g
set status = 'final',
    home_score = 10,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'arkansas' and a.slug = 'missouri';

-- Source event 401856733. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Washington @ Nebraska — Washington 17, Nebraska 10 (home is nebraska).
update games g
set status = 'final',
    home_score = 10,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'nebraska' and a.slug = 'washington';

-- Source event 401858504. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Army @ Memphis — Army 22, Memphis 49 (home is memphis).
update games g
set status = 'final',
    home_score = 49,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'memphis' and a.slug = 'army';

-- Source event 401862814. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
