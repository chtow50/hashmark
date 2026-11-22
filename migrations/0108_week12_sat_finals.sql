-- Week 12 Saturday FINALs (Nightly FINAL Stamp, 2026-11-22 ~1:20 AM CT).
-- Source: ESPN scoreboard + summary, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0101 kick/TV/Vegas on the same card.

-- Georgia @ South Carolina — South Carolina 6, Georgia 34 (home is south-carolina).
update games g
set status = 'final',
    home_score = 6,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'south-carolina' and a.slug = 'georgia';

-- Utah @ TCU — TCU 17, Utah 38 (home is tcu).
update games g
set status = 'final',
    home_score = 17,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'tcu' and a.slug = 'utah';

-- UCLA @ Michigan — Michigan 18, UCLA 16 (home is michigan).
update games g
set status = 'final',
    home_score = 18,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'michigan' and a.slug = 'ucla';

-- Arkansas @ Texas — Texas 45, Arkansas 3 (home is texas).
update games g
set status = 'final',
    home_score = 45,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'texas' and a.slug = 'arkansas';

-- SMU @ Notre Dame — Notre Dame 24, SMU 3 (home is notre-dame).
update games g
set status = 'final',
    home_score = 24,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'notre-dame' and a.slug = 'smu';

-- Virginia Tech @ Miami — Miami 28, Virginia Tech 20 (home is miami).
update games g
set status = 'final',
    home_score = 28,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'miami' and a.slug = 'virginia-tech';

-- Indiana @ Washington — Washington 27, Indiana 24 (home is washington).
update games g
set status = 'final',
    home_score = 27,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'washington' and a.slug = 'indiana';

-- LSU @ Tennessee — Tennessee 27, LSU 13 (home is tennessee).
update games g
set status = 'final',
    home_score = 27,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'tennessee' and a.slug = 'lsu';

-- BYU @ Kansas — Kansas 29, BYU 31 (home is kansas).
update games g
set status = 'final',
    home_score = 29,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'kansas' and a.slug = 'byu';

-- Wake Forest @ Georgia Tech — Georgia Tech 29, Wake Forest 50 (home is georgia-tech).
update games g
set status = 'final',
    home_score = 29,
    away_score = 50
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'georgia-tech' and a.slug = 'wake-forest';

-- Texas Tech @ Baylor — Baylor 10, Texas Tech 20 (home is baylor).
update games g
set status = 'final',
    home_score = 10,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'baylor' and a.slug = 'texas-tech';

-- Ohio State @ Nebraska — Nebraska 31, Ohio State 28 (home is nebraska).
update games g
set status = 'final',
    home_score = 31,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'nebraska' and a.slug = 'ohio-state';

-- Iowa @ Illinois — Illinois 17, Iowa 34 (home is illinois).
update games g
set status = 'final',
    home_score = 17,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'illinois' and a.slug = 'iowa';

-- Kentucky @ Missouri — Missouri 28, Kentucky 14 (home is missouri).
update games g
set status = 'final',
    home_score = 28,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'missouri' and a.slug = 'kentucky';

-- San Diego State @ Boise State — Boise State 20, San Diego State 22 (home is boise-state).
update games g
set status = 'final',
    home_score = 20,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'boise-state' and a.slug = 'san-diego-state';

-- Maryland @ USC — USC 35, Maryland 21 (home is usc).
update games g
set status = 'final',
    home_score = 35,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'usc' and a.slug = 'maryland';

-- Arizona @ Kansas State — Kansas State 28, Arizona 35 (home is kansas-state).
update games g
set status = 'final',
    home_score = 28,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'kansas-state' and a.slug = 'arizona';

-- Houston @ West Virginia — West Virginia 31, Houston 34 (home is west-virginia).
update games g
set status = 'final',
    home_score = 31,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'west-virginia' and a.slug = 'houston';

-- Texas A&M @ Oklahoma — Oklahoma 28, Texas A&M 7 (home is oklahoma).
update games g
set status = 'final',
    home_score = 28,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'oklahoma' and a.slug = 'texas-am';

-- Pittsburgh @ Louisville — Louisville 42, Pittsburgh 10 (home is louisville).
update games g
set status = 'final',
    home_score = 42,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'louisville' and a.slug = 'pittsburgh';

-- Vanderbilt @ Florida — Florida 34, Vanderbilt 27 (home is florida).
update games g
set status = 'final',
    home_score = 34,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'florida' and a.slug = 'vanderbilt';

-- Colorado @ Cincinnati — Cincinnati 35, Colorado 28 (home is cincinnati).
update games g
set status = 'final',
    home_score = 35,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'cincinnati' and a.slug = 'colorado';

-- Syracuse @ Boston College — Boston College 27, Syracuse 15 (home is boston-college).
update games g
set status = 'final',
    home_score = 27,
    away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'boston-college' and a.slug = 'syracuse';

-- Northwestern @ Minnesota — Minnesota 20, Northwestern 17 (home is minnesota).
update games g
set status = 'final',
    home_score = 20,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'minnesota' and a.slug = 'northwestern';

-- Wisconsin @ Purdue — Purdue 10, Wisconsin 42 (home is purdue).
update games g
set status = 'final',
    home_score = 10,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'purdue' and a.slug = 'wisconsin';

-- East Carolina @ Army — Army 6, East Carolina 10 (home is army).
update games g
set status = 'final',
    home_score = 6,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'army' and a.slug = 'east-carolina';

-- Memphis @ Navy — Navy 38, Memphis 34 (home is navy).
update games g
set status = 'final',
    home_score = 38,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'navy' and a.slug = 'memphis';

-- North Texas @ Tulane — Tulane 28, North Texas 24 (home is tulane).
update games g
set status = 'final',
    home_score = 28,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'tulane' and a.slug = 'north-texas';

-- North Carolina @ Virginia — Virginia 41, North Carolina 24 (home is virginia).
update games g
set status = 'final',
    home_score = 41,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'virginia' and a.slug = 'north-carolina';

-- Western Kentucky @ Liberty — Liberty 45, Western Kentucky 14 (home is liberty).
update games g
set status = 'final',
    home_score = 45,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'liberty' and a.slug = 'western-kentucky';

-- Charlotte @ Tulsa — Tulsa 42, Charlotte 14 (home is tulsa).
update games g
set status = 'final',
    home_score = 42,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'tulsa' and a.slug = 'charlotte';

-- Missouri State @ Jacksonville State — Jacksonville State 25, Missouri State 20 (home is jacksonville-state).
update games g
set status = 'final',
    home_score = 25,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'jacksonville-state' and a.slug = 'missouri-state';

-- Middle Tennessee @ Sam Houston — Sam Houston 28, Middle Tennessee 31 (home is sam-houston).
update games g
set status = 'final',
    home_score = 28,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'sam-houston' and a.slug = 'middle-tennessee';

-- South Florida @ Florida Atlantic — Florida Atlantic 35, South Florida 14 (home is florida-atlantic).
update games g
set status = 'final',
    home_score = 35,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'florida-atlantic' and a.slug = 'usf';

-- UL Monroe @ App State — App State 17, UL Monroe 16 (home is app-state).
update games g
set status = 'final',
    home_score = 17,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'app-state' and a.slug = 'ul-monroe';

-- Coastal Carolina @ Louisiana — Louisiana 38, Coastal Carolina 24 (home is louisiana).
update games g
set status = 'final',
    home_score = 38,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'louisiana' and a.slug = 'coastal-carolina';

-- Delaware @ New Mexico State — New Mexico State 30, Delaware 42 (home is new-mexico-state).
update games g
set status = 'final',
    home_score = 30,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'new-mexico-state' and a.slug = 'delaware';

-- Florida International @ Kennesaw State — Kennesaw State 35, Florida International 24 (home is kennesaw-state).
update games g
set status = 'final',
    home_score = 35,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'kennesaw-state' and a.slug = 'fiu';

-- NC State @ Florida State — Florida State 10, NC State 28 (home is florida-state).
update games g
set status = 'final',
    home_score = 10,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'florida-state' and a.slug = 'nc-state';

-- Rutgers @ Penn State — Penn State 24, Rutgers 25 (home is penn-state).
update games g
set status = 'final',
    home_score = 24,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'penn-state' and a.slug = 'rutgers';

-- Old Dominion @ UConn — UConn 29, Old Dominion 21 (home is uconn).
update games g
set status = 'final',
    home_score = 29,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'uconn' and a.slug = 'old-dominion';

-- Northern Illinois @ North Dakota State — North Dakota State 31, Northern Illinois 25 (home is north-dakota-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'north-dakota-state' and a.slug = 'northern-illinois';

-- Georgia Southern @ Troy — Troy 7, Georgia Southern 45 (home is troy).
update games g
set status = 'final',
    home_score = 7,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'troy' and a.slug = 'georgia-southern';

-- Georgia State @ Marshall — Marshall 28, Georgia State 27 (home is marshall).
update games g
set status = 'final',
    home_score = 28,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'marshall' and a.slug = 'georgia-state';

-- South Alabama @ Southern Miss — Southern Miss 35, South Alabama 40 (home is southern-miss).
update games g
set status = 'final',
    home_score = 35,
    away_score = 40
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'southern-miss' and a.slug = 'south-alabama';

-- Washington State @ Texas State — Texas State 42, Washington State 14 (home is texas-state).
update games g
set status = 'final',
    home_score = 42,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'texas-state' and a.slug = 'washington-state';

-- UNLV @ San José State — San José State 22, UNLV 24 (home is san-jose-state).
update games g
set status = 'final',
    home_score = 22,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'san-jose-state' and a.slug = 'unlv';

-- Arkansas State @ Louisiana Tech — Louisiana Tech 48, Arkansas State 3 (home is louisiana-tech).
update games g
set status = 'final',
    home_score = 48,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'louisiana-tech' and a.slug = 'arkansas-state';

-- Stanford @ California — California 28, Stanford 44 (home is california).
update games g
set status = 'final',
    home_score = 28,
    away_score = 44
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'california' and a.slug = 'stanford';

-- Colorado State @ Fresno State — Fresno State 49, Colorado State 42 (home is fresno-state).
update games g
set status = 'final',
    home_score = 49,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'fresno-state' and a.slug = 'colorado-state';

-- UTSA @ UAB — UAB 17, UTSA 19 (home is uab).
update games g
set status = 'final',
    home_score = 17,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'uab' and a.slug = 'utsa';

-- Utah State @ Oregon State — Oregon State 31, Utah State 24 (home is oregon-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'oregon-state' and a.slug = 'utah-state';

-- Hawai'i @ Nevada — Nevada 16, Hawai'i 8 (home is nevada).
update games g
set status = 'final',
    home_score = 16,
    away_score = 8
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'nevada' and a.slug = 'hawaii';
