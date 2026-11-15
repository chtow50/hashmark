-- Week 11 Saturday FINALs (Nightly FINAL Stamp, 2026-11-15 ~1:20 AM CT).
-- Source: ESPN scoreboard + summary, STATUS_FINAL, scores agree.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Not stamped: North Dakota State @ Hawaii (in progress), Ole Miss @ Oklahoma (Sunday).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0087 kick/TV/Vegas on the same card.

-- Utah @ Arizona — Utah 40, Arizona 39 (home is arizona).
update games g
set status = 'final',
    home_score = 39,
    away_score = 40
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'arizona' and a.slug = 'utah';

-- Source event 401856864. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Missouri @ Georgia — Georgia 48, Missouri 21 (home is georgia).
update games g
set status = 'final',
    home_score = 48,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'georgia' and a.slug = 'missouri';

-- Source event 401856883. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Alabama @ Vanderbilt — Alabama 21, Vanderbilt 6 (home is vanderbilt).
update games g
set status = 'final',
    home_score = 6,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'vanderbilt' and a.slug = 'alabama';

-- Source event 401856889. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Boston College @ Notre Dame — Notre Dame 41, Boston College 7 (home is notre-dame).
update games g
set status = 'final',
    home_score = 41,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'notre-dame' and a.slug = 'boston-college';

-- Source event 401858294. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas @ LSU — Texas 22, LSU 21 (home is lsu).
update games g
set status = 'final',
    home_score = 21,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'lsu' and a.slug = 'texas';

-- Source event 401856885. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Duke @ Miami — Miami 36, Duke 25 (home is miami).
update games g
set status = 'final',
    home_score = 36,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'miami' and a.slug = 'duke';

-- Source event 401858296. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tennessee @ Texas A&M — Tennessee 22, Texas A&M 7 (home is texas-am).
update games g
set status = 'final',
    home_score = 7,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'texas-am' and a.slug = 'tennessee';

-- Source event 401856888. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- USC @ Indiana — Indiana 27, USC 13 (home is indiana).
update games g
set status = 'final',
    home_score = 27,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'indiana' and a.slug = 'usc';

-- Source event 401858518. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Baylor @ BYU — BYU 28, Baylor 7 (home is byu).
update games g
set status = 'final',
    home_score = 28,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'byu' and a.slug = 'baylor';

-- Source event 401856858. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida @ Kentucky — Florida 21, Kentucky 14 (home is kentucky).
update games g
set status = 'final',
    home_score = 14,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'kentucky' and a.slug = 'florida';

-- Source event 401856884. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Texas Tech @ Oklahoma State — Texas Tech 52, Oklahoma State 27 (home is oklahoma-state).
update games g
set status = 'final',
    home_score = 27,
    away_score = 52
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'oklahoma-state' and a.slug = 'texas-tech';

-- Source event 401856863. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wake Forest @ SMU — Wake Forest 49, SMU 7 (home is smu).
update games g
set status = 'final',
    home_score = 7,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'smu' and a.slug = 'wake-forest';

-- Source event 401858301. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Purdue @ Iowa — Iowa 28, Purdue 7 (home is iowa).
update games g
set status = 'final',
    home_score = 28,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'iowa' and a.slug = 'purdue';

-- Source event 401858519. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Michigan @ Oregon — Oregon 31, Michigan 7 (home is oregon).
update games g
set status = 'final',
    home_score = 31,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'oregon' and a.slug = 'michigan';

-- Source event 401858523. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Carolina @ Arkansas — Arkansas 34, South Carolina 6 (home is arkansas).
update games g
set status = 'final',
    home_score = 34,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'arkansas' and a.slug = 'south-carolina';

-- Source event 401856882. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Northwestern @ Ohio State — Ohio State 28, Northwestern 19 (home is ohio-state).
update games g
set status = 'final',
    home_score = 28,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'ohio-state' and a.slug = 'northwestern';

-- Source event 401858522. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oregon State @ Boise State — Boise State 46, Oregon State 41 (home is boise-state).
update games g
set status = 'final',
    home_score = 46,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'boise-state' and a.slug = 'oregon-state';

-- Source event 401860914. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Cincinnati @ Iowa State — Iowa State 41, Cincinnati 13 (home is iowa-state).
update games g
set status = 'final',
    home_score = 41,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'iowa-state' and a.slug = 'cincinnati';

-- Source event 401856859. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Syracuse @ NC State — Syracuse 34, NC State 31 (home is nc-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'nc-state' and a.slug = 'syracuse';

-- Source event 401858300. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wisconsin @ Maryland — Maryland 24, Wisconsin 21 (home is maryland).
update games g
set status = 'final',
    home_score = 24,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'maryland' and a.slug = 'wisconsin';

-- Source event 401858520. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- James Madison @ UConn — UConn 46, James Madison 22 (home is uconn).
update games g
set status = 'final',
    home_score = 46,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'uconn' and a.slug = 'james-madison';

-- Source event 401861967. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia Tech @ Clemson — Georgia Tech 20, Clemson 6 (home is clemson).
update games g
set status = 'final',
    home_score = 6,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'clemson' and a.slug = 'georgia-tech';

-- Source event 401858297. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Nebraska @ Rutgers — Nebraska 31, Rutgers 0 (home is rutgers).
update games g
set status = 'final',
    home_score = 0,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'rutgers' and a.slug = 'nebraska';

-- Source event 401858525. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- East Carolina @ Charlotte — East Carolina 17, Charlotte 16 (home is charlotte).
update games g
set status = 'final',
    home_score = 16,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'charlotte' and a.slug = 'east-carolina';

-- Source event 401862825. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UAB @ Temple — UAB 36, Temple 10 (home is temple).
update games g
set status = 'final',
    home_score = 10,
    away_score = 36
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'temple' and a.slug = 'uab';

-- Source event 401862829. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arkansas State @ Coastal Carolina — Coastal Carolina 28, Arkansas State 21 (home is coastal-carolina).
update games g
set status = 'final',
    home_score = 28,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'coastal-carolina' and a.slug = 'arkansas-state';

-- Source event 401869937. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kansas State @ TCU — TCU 20, Kansas State 10 (home is tcu).
update games g
set status = 'final',
    home_score = 20,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'tcu' and a.slug = 'kansas-state';

-- Source event 401856862. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kennesaw State @ Sam Houston — Kennesaw State 26, Sam Houston 7 (home is sam-houston).
update games g
set status = 'final',
    home_score = 7,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'sam-houston' and a.slug = 'kennesaw-state';

-- Source event 401870769. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- New Mexico State @ Missouri State — Missouri State 27, New Mexico State 21 (home is missouri-state).
update games g
set status = 'final',
    home_score = 27,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'missouri-state' and a.slug = 'new-mexico-state';

-- Source event 401870796. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida International @ Delaware — Delaware 24, Florida International 16 (home is delaware).
update games g
set status = 'final',
    home_score = 24,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'delaware' and a.slug = 'fiu';

-- Source event 401871060. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kansas @ West Virginia — Kansas 37, West Virginia 14 (home is west-virginia).
update games g
set status = 'final',
    home_score = 14,
    away_score = 37
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'west-virginia' and a.slug = 'kansas';

-- Source event 401856861. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- California @ Virginia — Virginia 36, California 7 (home is virginia).
update games g
set status = 'final',
    home_score = 36,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'virginia' and a.slug = 'california';

-- Source event 401858295. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Nevada @ Northern Illinois — Nevada 28, Northern Illinois 7 (home is northern-illinois).
update games g
set status = 'final',
    home_score = 7,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'northern-illinois' and a.slug = 'nevada';

-- Source event 401864536. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia Southern @ Georgia State — Georgia Southern 34, Georgia State 17 (home is georgia-state).
update games g
set status = 'final',
    home_score = 17,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'georgia-state' and a.slug = 'georgia-southern';

-- Source event 401869952. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Jacksonville State @ Western Kentucky — Western Kentucky 34, Jacksonville State 24 (home is western-kentucky).
update games g
set status = 'final',
    home_score = 34,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'western-kentucky' and a.slug = 'jacksonville-state';

-- Source event 401870752. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Middle Tennessee @ Liberty — Liberty 28, Middle Tennessee 23 (home is liberty).
update games g
set status = 'final',
    home_score = 28,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'liberty' and a.slug = 'middle-tennessee';

-- Source event 401871061. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Fresno State @ Texas State — Texas State 37, Fresno State 35 (home is texas-state).
update games g
set status = 'final',
    home_score = 37,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'texas-state' and a.slug = 'fresno-state';

-- Source event 401860916. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Auburn @ Mississippi State — Auburn 41, Mississippi State 9 (home is mississippi-state).
update games g
set status = 'final',
    home_score = 9,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'mississippi-state' and a.slug = 'auburn';

-- Source event 401856886. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tulane @ Rice — Tulane 20, Rice 17 (home is rice).
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'rice' and a.slug = 'tulane';

-- Source event 401862828. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Southern Miss @ Louisiana Tech — Louisiana Tech 63, Southern Miss 31 (home is louisiana-tech).
update games g
set status = 'final',
    home_score = 63,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'louisiana-tech' and a.slug = 'southern-miss';

-- Source event 401871099. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arizona State @ UCF — Arizona State 26, UCF 13 (home is ucf).
update games g
set status = 'final',
    home_score = 13,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'ucf' and a.slug = 'arizona-state';

-- Source event 401856857. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Washington @ Michigan State — Washington 21, Michigan State 14 (home is michigan-state).
update games g
set status = 'final',
    home_score = 14,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'michigan-state' and a.slug = 'washington';

-- Source event 401858521. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- App State @ Marshall — App State 20, Marshall 16 (home is marshall).
update games g
set status = 'final',
    home_score = 16,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'marshall' and a.slug = 'app-state';

-- Source event 401869928. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisville @ North Carolina — Louisville 16, North Carolina 14 (home is north-carolina).
update games g
set status = 'final',
    home_score = 14,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'north-carolina' and a.slug = 'louisville';

-- Source event 401858298. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Minnesota @ Penn State — Penn State 42, Minnesota 14 (home is penn-state).
update games g
set status = 'final',
    home_score = 42,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'penn-state' and a.slug = 'minnesota';

-- Source event 401858524. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- San José State @ Air Force — Air Force 24, San José State 3 (home is air-force).
update games g
set status = 'final',
    home_score = 24,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'air-force' and a.slug = 'san-jose-state';

-- Source event 401864538. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Troy @ South Alabama — South Alabama 27, Troy 14 (home is south-alabama).
update games g
set status = 'final',
    home_score = 27,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'south-alabama' and a.slug = 'troy';

-- Source event 401871100. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida Atlantic @ Tulsa — Tulsa 38, Florida Atlantic 21 (home is tulsa).
update games g
set status = 'final',
    home_score = 38,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'tulsa' and a.slug = 'florida-atlantic';

-- Source event 401862826. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Stanford @ Virginia Tech — Stanford 40, Virginia Tech 22 (home is virginia-tech).
update games g
set status = 'final',
    home_score = 22,
    away_score = 40
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'virginia-tech' and a.slug = 'stanford';

-- Source event 401858299. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UNLV @ New Mexico — UNLV 21, New Mexico 17 (home is new-mexico).
update games g
set status = 'final',
    home_score = 17,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'new-mexico' and a.slug = 'unlv';

-- Source event 401864539. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- North Texas @ UTSA — UTSA 35, North Texas 16 (home is utsa).
update games g
set status = 'final',
    home_score = 35,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'utsa' and a.slug = 'north-texas';

-- Source event 401862827. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Utah State @ San Diego State — San Diego State 30, Utah State 13 (home is san-diego-state).
update games g
set status = 'final',
    home_score = 30,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'san-diego-state' and a.slug = 'utah-state';

-- Source event 401860915. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wyoming @ UTEP — Wyoming 27, UTEP 15 (home is utep).
update games g
set status = 'final',
    home_score = 15,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'utep' and a.slug = 'wyoming';

-- Source event 401864540. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Colorado State @ Washington State — Washington State 73, Colorado State 7 (home is washington-state).
update games g
set status = 'final',
    home_score = 73,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'washington-state' and a.slug = 'colorado-state';

-- Source event 401860917. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
