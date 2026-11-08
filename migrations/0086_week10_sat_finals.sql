-- Week 10 Saturday FINALs (Nightly FINAL Stamp, 2026-11-08 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0080 kick/TV/Vegas on the same card.

-- Miami @ Notre Dame — Notre Dame 31, Miami 24 (home is notre-dame).
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'notre-dame' and a.slug = 'miami';

-- Source event 401858291. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia @ Ole Miss — Georgia 42, Ole Miss 7 (home is ole-miss).
update games g
set status = 'final',
    home_score = 7,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'ole-miss' and a.slug = 'georgia';

-- Source event 401856741. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- BYU @ Utah — Utah 28, BYU 20 (home is utah).
update games g
set status = 'final',
    home_score = 28,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'utah' and a.slug = 'byu';

-- Source event 401856849. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Alabama @ LSU — Alabama 31, LSU 13 (home is lsu).
update games g
set status = 'final',
    home_score = 13,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'lsu' and a.slug = 'alabama';

-- Source event 401856740. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kentucky @ Tennessee — Tennessee 34, Kentucky 6 (home is tennessee).
update games g
set status = 'final',
    home_score = 34,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'tennessee' and a.slug = 'kentucky';

-- Source event 401856745. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas @ Missouri — Texas 34, Missouri 20 (home is missouri).
update games g
set status = 'final',
    home_score = 20,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'missouri' and a.slug = 'texas';

-- Source event 401856743. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UCLA @ Minnesota — UCLA 34, Minnesota 20 (home is minnesota).
update games g
set status = 'final',
    home_score = 20,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'minnesota' and a.slug = 'ucla';

-- Source event 401858512. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oregon @ Ohio State — Oregon 41, Ohio State 28 (home is ohio-state).
update games g
set status = 'final',
    home_score = 28,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'ohio-state' and a.slug = 'oregon';

-- Source event 401858514. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- West Virginia @ Texas Tech — Texas Tech 53, West Virginia 48 (home is texas-tech).
update games g
set status = 'final',
    home_score = 53,
    away_score = 48
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'texas-tech' and a.slug = 'west-virginia';

-- Source event 401856856. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Cincinnati @ Houston — Houston 31, Cincinnati 24 (home is houston).
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'houston' and a.slug = 'cincinnati';

-- Source event 401856851. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Iowa @ Northwestern — Iowa 24, Northwestern 10 (home is northwestern).
update games g
set status = 'final',
    home_score = 10,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'northwestern' and a.slug = 'iowa';

-- Source event 401858513. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas A&M @ South Carolina — South Carolina 17, Texas A&M 9 (home is south-carolina).
update games g
set status = 'final',
    home_score = 17,
    away_score = 9
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'south-carolina' and a.slug = 'texas-am';

-- Source event 401856744. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oklahoma @ Florida — Oklahoma 23, Florida 7 (home is florida).
update games g
set status = 'final',
    home_score = 7,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'florida' and a.slug = 'oklahoma';

-- Source event 401856739. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Boise State @ Colorado State — Boise State 64, Colorado State 38 (home is colorado-state).
update games g
set status = 'final',
    home_score = 38,
    away_score = 64
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'colorado-state' and a.slug = 'boise-state';

-- Source event 401860911. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Iowa State @ Baylor — Baylor 42, Iowa State 31 (home is baylor).
update games g
set status = 'final',
    home_score = 42,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'baylor' and a.slug = 'iowa-state';

-- Source event 401856853. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Clemson @ Syracuse — Clemson 18, Syracuse 13 (home is syracuse).
update games g
set status = 'final',
    home_score = 13,
    away_score = 18
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'syracuse' and a.slug = 'clemson';

-- Source event 401858285. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida State @ Boston College — Florida State 31, Boston College 24 (home is boston-college).
update games g
set status = 'final',
    home_score = 24,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'boston-college' and a.slug = 'florida-state';

-- Source event 401858289. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- North Carolina @ UConn — North Carolina 38, UConn 21 (home is uconn).
update games g
set status = 'final',
    home_score = 21,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'uconn' and a.slug = 'north-carolina';

-- Source event 401858292. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tulsa @ Tulane — Tulsa 60, Tulane 10 (home is tulane).
update games g
set status = 'final',
    home_score = 10,
    away_score = 60
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'tulane' and a.slug = 'tulsa';

-- Source event 401862822. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Duke @ NC State — Duke 41, NC State 3 (home is nc-state).
update games g
set status = 'final',
    home_score = 3,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'nc-state' and a.slug = 'duke';

-- Source event 401858286. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Maryland @ Purdue — Maryland 34, Purdue 29 (home is purdue).
update games g
set status = 'final',
    home_score = 29,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'purdue' and a.slug = 'maryland';

-- Source event 401858515. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arkansas @ Auburn — Auburn 26, Arkansas 23 (home is auburn).
update games g
set status = 'final',
    home_score = 26,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'auburn' and a.slug = 'arkansas';

-- Source event 401856738. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oklahoma State @ Kansas State — Oklahoma State 66, Kansas State 28 (home is kansas-state).
update games g
set status = 'final',
    home_score = 28,
    away_score = 66
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'kansas-state' and a.slug = 'oklahoma-state';

-- Source event 401856854. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Old Dominion @ Coastal Carolina — Old Dominion 21, Coastal Carolina 8 (home is coastal-carolina).
update games g
set status = 'final',
    home_score = 8,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'coastal-carolina' and a.slug = 'old-dominion';

-- Source event 401869945. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia State @ App State — Georgia State 39, App State 23 (home is app-state).
update games g
set status = 'final',
    home_score = 23,
    away_score = 39
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'app-state' and a.slug = 'georgia-state';

-- Source event 401869927. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UL Monroe @ Arkansas State — UL Monroe 19, Arkansas State 17 (home is arkansas-state).
update games g
set status = 'final',
    home_score = 17,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'arkansas-state' and a.slug = 'ul-monroe';

-- Source event 401869936. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Delaware @ Kennesaw State — Kennesaw State 42, Delaware 40 (home is kennesaw-state).
update games g
set status = 'final',
    home_score = 42,
    away_score = 40
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'kennesaw-state' and a.slug = 'delaware';

-- Source event 401871073. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Penn State @ Washington — Penn State 28, Washington 25 (home is washington).
update games g
set status = 'final',
    home_score = 25,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'washington' and a.slug = 'penn-state';

-- Source event 401858516. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Charlotte @ UAB — UAB 23, Charlotte 12 (home is uab).
update games g
set status = 'final',
    home_score = 23,
    away_score = 12
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'uab' and a.slug = 'charlotte';

-- Source event 401862819. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Temple @ Navy — Navy 42, Temple 35 (home is navy).
update games g
set status = 'final',
    home_score = 42,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'navy' and a.slug = 'temple';

-- Source event 401862820. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Marshall @ Georgia Southern — Georgia Southern 49, Marshall 13 (home is georgia-southern).
update games g
set status = 'final',
    home_score = 49,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'georgia-southern' and a.slug = 'marshall';

-- Source event 401869951. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Western Kentucky @ Middle Tennessee — Middle Tennessee 51, Western Kentucky 42 (home is middle-tennessee).
update games g
set status = 'final',
    home_score = 51,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'middle-tennessee' and a.slug = 'western-kentucky';

-- Source event 401871076. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UCF @ Kansas — UCF 33, Kansas 32 (home is kansas).
update games g
set status = 'final',
    home_score = 32,
    away_score = 33
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'kansas' and a.slug = 'ucf';

-- Source event 401856850. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Rice @ North Texas — North Texas 52, Rice 23 (home is north-texas).
update games g
set status = 'final',
    home_score = 52,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'north-texas' and a.slug = 'rice';

-- Source event 401862821. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Northern Illinois @ San José State — San José State 30, Northern Illinois 19 (home is san-jose-state).
update games g
set status = 'final',
    home_score = 30,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'san-jose-state' and a.slug = 'northern-illinois';

-- Source event 401864534. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Missouri State @ Florida International — Florida International 23, Missouri State 20 (home is fiu).
update games g
set status = 'final',
    home_score = 23,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'fiu' and a.slug = 'missouri-state';

-- Source event 401871074. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisiana Tech @ Troy — Louisiana Tech 41, Troy 17 (home is troy).
update games g
set status = 'final',
    home_score = 17,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'troy' and a.slug = 'louisiana-tech';

-- Source event 401871098. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Vanderbilt @ Mississippi State — Vanderbilt 25, Mississippi State 23 (home is mississippi-state).
update games g
set status = 'final',
    home_score = 23,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'mississippi-state' and a.slug = 'vanderbilt';

-- Source event 401856742. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Rutgers @ Wisconsin — Wisconsin 31, Rutgers 10 (home is wisconsin).
update games g
set status = 'final',
    home_score = 31,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'wisconsin' and a.slug = 'rutgers';

-- Source event 401858517. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Alabama @ Louisiana — Louisiana 28, South Alabama 26 (home is louisiana).
update games g
set status = 'final',
    home_score = 28,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'louisiana' and a.slug = 'south-alabama';

-- Source event 401869968. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Sam Houston @ Jacksonville State — Jacksonville State 47, Sam Houston 14 (home is jacksonville-state).
update games g
set status = 'final',
    home_score = 47,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'jacksonville-state' and a.slug = 'sam-houston';

-- Source event 401871075. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Colorado @ Arizona State — Arizona State 20, Colorado 10 (home is arizona-state).
update games g
set status = 'final',
    home_score = 20,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'arizona-state' and a.slug = 'colorado';

-- Source event 401856852. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisville @ Georgia Tech — Louisville 44, Georgia Tech 17 (home is georgia-tech).
update games g
set status = 'final',
    home_score = 17,
    away_score = 44
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'georgia-tech' and a.slug = 'louisville';

-- Source event 401858287. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Michigan State @ Michigan — Michigan State 15, Michigan 6 (home is michigan).
update games g
set status = 'final',
    home_score = 6,
    away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'michigan' and a.slug = 'michigan-state';

-- Source event 401858511. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Air Force @ Army — Air Force 24, Army 21 (home is army).
update games g
set status = 'final',
    home_score = 21,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'army' and a.slug = 'air-force';

-- Source event 401862823. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Liberty @ New Mexico State — Liberty 30, New Mexico State 14 (home is new-mexico-state).
update games g
set status = 'final',
    home_score = 14,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'new-mexico-state' and a.slug = 'liberty';

-- Source event 401870795. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Fresno State @ Utah State — Utah State 17, Fresno State 10 (home is utah-state).
update games g
set status = 'final',
    home_score = 17,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'utah-state' and a.slug = 'fresno-state';

-- Source event 401860913. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Hawaiʻi @ UTEP — Hawaiʻi 17, UTEP 14 (home is utep).
update games g
set status = 'final',
    home_score = 14,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'utep' and a.slug = 'hawaii';

-- Source event 401864532. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas State @ Oregon State — Texas State 42, Oregon State 21 (home is oregon-state).
update games g
set status = 'final',
    home_score = 21,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'oregon-state' and a.slug = 'texas-state';

-- Source event 401860912. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wyoming @ UNLV — Wyoming 41, UNLV 35 (home is unlv).
update games g
set status = 'final',
    home_score = 35,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'unlv' and a.slug = 'wyoming';

-- Source event 401864535. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
