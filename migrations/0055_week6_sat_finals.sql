-- Week 6 Saturday FINALs (nightly stamp, 2026-10-11 01:14 AM CT).
-- Source: ESPN game pages / scoreboard, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Boise State @ Fresno State and Hawaiʻi @ Arizona State were still in progress; not stamped.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0043/0048 kick and Vegas on the same card.

-- Arizona @ West Virginia — Arizona 52, West Virginia 31 (road win) (home is west-virginia).
update games g
set status = 'final',
    home_score = 31,
    away_score = 52
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'west-virginia' and a.slug = 'arizona';

-- Source event 401856823. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Indiana @ Nebraska — Indiana 20, Nebraska 17 (road win) (home is nebraska).
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'nebraska' and a.slug = 'indiana';

-- Source event 401858481. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- North Carolina @ Pittsburgh — North Carolina 21, Pittsburgh 17 (road win) (home is pittsburgh).
update games g
set status = 'final',
    home_score = 17,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'pittsburgh' and a.slug = 'north-carolina';

-- Source event 401858256. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tulane @ Army — Army 20, Tulane 17 (home is army).
update games g
set status = 'final',
    home_score = 20,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'army' and a.slug = 'tulane';

-- Source event 401862795. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UCF @ Oklahoma State — Oklahoma State 42, UCF 28 (home is oklahoma-state).
update games g
set status = 'final',
    home_score = 42,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'oklahoma-state' and a.slug = 'ucf';

-- Source event 401856824. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wake Forest @ NC State — Wake Forest 38, NC State 14 (road win) (home is nc-state).
update games g
set status = 'final',
    home_score = 14,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'nc-state' and a.slug = 'wake-forest';

-- Source event 401858260. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ball State @ Northwestern — Northwestern 45, Ball State 14 (home is northwestern).
update games g
set status = 'final',
    home_score = 45,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'northwestern' and a.slug = 'ball-state';

-- Source event 401858482. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Old Dominion @ App State — Old Dominion 10, App State 3 (road win) (home is app-state).
update games g
set status = 'final',
    home_score = 3,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'app-state' and a.slug = 'old-dominion';

-- Source event 401869843. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Miami (OH) @ Massachusetts — Miami (OH) 20, Massachusetts 19 (road win) (home is massachusetts).
update games g
set status = 'final',
    home_score = 19,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'massachusetts' and a.slug = 'miami-oh';

-- Source event 401866440. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Buffalo @ Toledo — Buffalo 23, Toledo 8 (road win) (home is toledo).
update games g
set status = 'final',
    home_score = 8,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'toledo' and a.slug = 'buffalo';

-- Source event 401866437. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Central Michigan @ Ohio — Ohio 31, Central Michigan 14 (home is ohio).
update games g
set status = 'final',
    home_score = 31,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'ohio' and a.slug = 'central-michigan';

-- Source event 401866438. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Charlotte @ North Texas — North Texas 50, Charlotte 10 (home is north-texas).
update games g
set status = 'final',
    home_score = 50,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'north-texas' and a.slug = 'charlotte';

-- Source event 401862796. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Duke @ Georgia Tech — Georgia Tech 28, Duke 25 (home is georgia-tech).
update games g
set status = 'final',
    home_score = 28,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'georgia-tech' and a.slug = 'duke';

-- Source event 401858255. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Eastern Michigan @ Akron — Eastern Michigan 25, Akron 23 (road win) (home is akron).
update games g
set status = 'final',
    home_score = 23,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'akron' and a.slug = 'eastern-michigan';

-- Source event 401866435. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Houston @ Kansas State — Houston 35, Kansas State 16 (road win) (home is kansas-state).
update games g
set status = 'final',
    home_score = 16,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'kansas-state' and a.slug = 'houston';

-- Source event 401856825. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Illinois @ Michigan State — Illinois 38, Michigan State 37 (OT, road win) (home is michigan-state).
update games g
set status = 'final',
    home_score = 37,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'michigan-state' and a.slug = 'illinois';

-- Source event 401858480. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kent State @ Western Michigan — Western Michigan 38, Kent State 7 (home is western-michigan).
update games g
set status = 'final',
    home_score = 38,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'western-michigan' and a.slug = 'kent-state';

-- Source event 401866439. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ole Miss @ Vanderbilt — Ole Miss 52, Vanderbilt 17 (road win) (home is vanderbilt).
update games g
set status = 'final',
    home_score = 17,
    away_score = 52
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'vanderbilt' and a.slug = 'ole-miss';

-- Source event 401856718. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Stanford @ Notre Dame — Notre Dame 58, Stanford 7 (home is notre-dame).
update games g
set status = 'final',
    home_score = 58,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'notre-dame' and a.slug = 'stanford';

-- Source event 401858257. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas vs Oklahoma — Oklahoma 27, Texas 24 (home is oklahoma).
update games g
set status = 'final',
    home_score = 27,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'oklahoma' and a.slug = 'texas';

-- Source event 401856717. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tulsa @ Navy — Navy 34, Tulsa 26 (home is navy).
update games g
set status = 'final',
    home_score = 34,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'navy' and a.slug = 'tulsa';

-- Source event 401862799. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UCLA @ Oregon — UCLA 17, Oregon 15 (road win) (home is oregon).
update games g
set status = 'final',
    home_score = 15,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'oregon' and a.slug = 'ucla';

-- Source event 401858484. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Virginia Tech @ California — California 25, Virginia Tech 20 (home is california).
update games g
set status = 'final',
    home_score = 25,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'california' and a.slug = 'virginia-tech';

-- Source event 401858259. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UConn @ Temple — UConn 34, Temple 20 (road win) (home is temple).
update games g
set status = 'final',
    home_score = 20,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'temple' and a.slug = 'uconn';

-- Source event 401861964. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Rice @ East Carolina — East Carolina 28, Rice 12 (home is east-carolina).
update games g
set status = 'final',
    home_score = 28,
    away_score = 12
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'east-carolina' and a.slug = 'rice';

-- Source event 401862797. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Maryland @ Ohio State — Ohio State 45, Maryland 16 (home is ohio-state).
update games g
set status = 'final',
    home_score = 45,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'ohio-state' and a.slug = 'maryland';

-- Source event 401858483. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tennessee @ Arkansas — Tennessee 24, Arkansas 17 (road win) (home is arkansas).
update games g
set status = 'final',
    home_score = 17,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'arkansas' and a.slug = 'tennessee';

-- Source event 401856713. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- San Diego State @ Oregon State — Oregon State 66, San Diego State 14 (home is oregon-state).
update games g
set status = 'final',
    home_score = 66,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'oregon-state' and a.slug = 'san-diego-state';

-- Source event 401860902. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Coastal Carolina @ Marshall — Coastal Carolina 27, Marshall 21 (road win) (home is marshall).
update games g
set status = 'final',
    home_score = 21,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'marshall' and a.slug = 'coastal-carolina';

-- Source event 401869943. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- LSU @ Kentucky — Kentucky 35, LSU 34 (OT) (home is kentucky).
update games g
set status = 'final',
    home_score = 35,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'kentucky' and a.slug = 'lsu';

-- Source event 401856715. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Nevada @ UTEP — Nevada 30, UTEP 13 (road win) (home is utep).
update games g
set status = 'final',
    home_score = 13,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'utep' and a.slug = 'nevada';

-- Source event 401864517. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Air Force @ Northern Illinois — Air Force 28, Northern Illinois 7 (road win) (home is northern-illinois).
update games g
set status = 'final',
    home_score = 7,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'northern-illinois' and a.slug = 'air-force';

-- Source event 401864516. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia @ Alabama — Georgia 20, Alabama 17 (road win) (home is alabama).
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'alabama' and a.slug = 'georgia';

-- Source event 401856712. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisiana @ Louisiana Tech — Louisiana Tech 32, Louisiana 31 (home is louisiana-tech).
update games g
set status = 'final',
    home_score = 32,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'louisiana-tech' and a.slug = 'louisiana';

-- Source event 401869965. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Syracuse @ Virginia — Virginia 28, Syracuse 25 (home is virginia).
update games g
set status = 'final',
    home_score = 28,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'virginia' and a.slug = 'syracuse';

-- Source event 401858258. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- USC @ Penn State — USC 31, Penn State 23 (road win) (home is penn-state).
update games g
set status = 'final',
    home_score = 23,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'penn-state' and a.slug = 'usc';

-- Source event 401858485. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Minnesota @ Purdue — Purdue 41, Minnesota 13 (home is purdue).
update games g
set status = 'final',
    home_score = 41,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'purdue' and a.slug = 'minnesota';

-- Source event 401858486. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kansas @ Utah — Utah 41, Kansas 24 (home is utah).
update games g
set status = 'final',
    home_score = 41,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'utah' and a.slug = 'kansas';

-- Source event 401856827. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- James Madison @ Georgia Southern — James Madison 27, Georgia Southern 24 (road win) (home is georgia-southern).
update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'georgia-southern' and a.slug = 'james-madison';

-- Source event 401869949. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Carolina @ Florida — South Carolina 38, Florida 19 (road win) (home is florida).
update games g
set status = 'final',
    home_score = 19,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'florida' and a.slug = 'south-carolina';

-- Source event 401856714. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas A&M @ Missouri — Missouri 27, Texas A&M 6 (home is missouri).
update games g
set status = 'final',
    home_score = 27,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'missouri' and a.slug = 'texas-am';

-- Source event 401856716. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UAB @ Memphis — Memphis 38, UAB 13 (home is memphis).
update games g
set status = 'final',
    home_score = 38,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'memphis' and a.slug = 'uab';

-- Source event 401862798. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
