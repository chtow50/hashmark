-- Week 3 remaining FINALs. Research CLEAR pack
-- data/week3_remaining_finals_clear_2026.json (as_of 2026-09-20 10:06 AM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Stamp clear[] FBS–FBS only (55 games). Do not re-stamp already_live
-- Syracuse @ Pittsburgh (0032). HOLD = 0.
-- Do not put ESPN event digits here: parseSqlStampsForWeek would overwrite 0029 kick/Vegas.

-- Miami @ Wake Forest — Wake Forest 20, Miami 33 (home is wake-forest)
update games g
set status = 'final',
    home_score = 20,
    away_score = 33
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'wake-forest' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'wake-forest'));

-- Houston @ Texas Tech — Texas Tech 28, Houston 26 (home is texas-tech)
update games g
set status = 'final',
    home_score = 28,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'texas-tech' and a.slug = 'houston')
    or (h.slug = 'houston' and a.slug = 'texas-tech'));

-- Coastal Carolina @ Delaware — Delaware 22, Coastal Carolina 14 (home is delaware)
update games g
set status = 'final',
    home_score = 22,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'delaware' and a.slug = 'coastal-carolina')
    or (h.slug = 'coastal-carolina' and a.slug = 'delaware'));

-- Georgia @ Arkansas — Arkansas 17, Georgia 45 (home is arkansas)
update games g
set status = 'final',
    home_score = 17,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'arkansas' and a.slug = 'georgia')
    or (h.slug = 'georgia' and a.slug = 'arkansas'));

-- Kent State @ Ohio State — Ohio State 59, Kent State 3 (home is ohio-state)
update games g
set status = 'final',
    home_score = 59,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'ohio-state' and a.slug = 'kent-state')
    or (h.slug = 'kent-state' and a.slug = 'ohio-state'));

-- Buffalo @ Penn State — Penn State 55, Buffalo 13 (home is penn-state)
update games g
set status = 'final',
    home_score = 55,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'penn-state' and a.slug = 'buffalo')
    or (h.slug = 'buffalo' and a.slug = 'penn-state'));

-- Tulane @ Kansas State — Kansas State 31, Tulane 20 (home is kansas-state)
update games g
set status = 'final',
    home_score = 31,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'kansas-state' and a.slug = 'tulane')
    or (h.slug = 'tulane' and a.slug = 'kansas-state'));

-- Bowling Green @ Iowa State — Iowa State 55, Bowling Green 7 (home is iowa-state)
update games g
set status = 'final',
    home_score = 55,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'iowa-state' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'iowa-state'));

-- Arizona State @ Kansas — Kansas 17, Arizona State 24 (home is kansas)
update games g
set status = 'final',
    home_score = 17,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'kansas' and a.slug = 'arizona-state')
    or (h.slug = 'arizona-state' and a.slug = 'kansas'));

-- North Carolina @ Clemson — Clemson 28, North Carolina 20 (home is clemson)
update games g
set status = 'final',
    home_score = 28,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'clemson' and a.slug = 'north-carolina')
    or (h.slug = 'north-carolina' and a.slug = 'clemson'));

-- Akron @ Minnesota — Minnesota 41, Akron 7 (home is minnesota)
update games g
set status = 'final',
    home_score = 41,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'minnesota' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'minnesota'));

-- North Texas @ Texas State — Texas State 49, North Texas 35 (home is texas-state)
update games g
set status = 'final',
    home_score = 49,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'texas-state' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'texas-state'));

-- Eastern Michigan @ Wisconsin — Wisconsin 54, Eastern Michigan 10 (home is wisconsin)
update games g
set status = 'final',
    home_score = 54,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'wisconsin' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'wisconsin'));

-- NC State @ Vanderbilt — Vanderbilt 35, NC State 31 (home is vanderbilt)
update games g
set status = 'final',
    home_score = 35,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'vanderbilt' and a.slug = 'nc-state')
    or (h.slug = 'nc-state' and a.slug = 'vanderbilt'));

-- Wyoming @ Central Michigan — Central Michigan 24, Wyoming 10 (home is central-michigan)
update games g
set status = 'final',
    home_score = 24,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'central-michigan' and a.slug = 'wyoming')
    or (h.slug = 'wyoming' and a.slug = 'central-michigan'));

-- Temple @ Toledo — Toledo 49, Temple 48 (home is toledo)
update games g
set status = 'final',
    home_score = 49,
    away_score = 48
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'toledo' and a.slug = 'temple')
    or (h.slug = 'temple' and a.slug = 'toledo'));

-- Kentucky @ Texas A&M — Texas A&M 21, Kentucky 31 (home is texas-am)
update games g
set status = 'final',
    home_score = 21,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'texas-am' and a.slug = 'kentucky')
    or (h.slug = 'kentucky' and a.slug = 'texas-am'));

-- Florida State @ Alabama — Alabama 50, Florida State 36 (home is alabama)
update games g
set status = 'final',
    home_score = 50,
    away_score = 36
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'alabama' and a.slug = 'florida-state')
    or (h.slug = 'florida-state' and a.slug = 'alabama'));

-- USC @ Rutgers — Rutgers 35, USC 42 (home is rutgers)
update games g
set status = 'final',
    home_score = 35,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'rutgers' and a.slug = 'usc')
    or (h.slug = 'usc' and a.slug = 'rutgers'));

-- SMU @ Louisville — Louisville 41, SMU 31 (home is louisville)
update games g
set status = 'final',
    home_score = 41,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'louisville' and a.slug = 'smu')
    or (h.slug = 'smu' and a.slug = 'louisville'));

-- Utah State @ Utah — Utah 33, Utah State 0 (home is utah)
update games g
set status = 'final',
    home_score = 33,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'utah' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'utah'));

-- UTEP @ Michigan — Michigan 52, UTEP 17 (home is michigan)
update games g
set status = 'final',
    home_score = 52,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'michigan' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'michigan'));

-- Miami (OH) @ Cincinnati — Cincinnati 35, Miami (OH) 31 (home is cincinnati)
update games g
set status = 'final',
    home_score = 35,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'cincinnati' and a.slug = 'miami-oh')
    or (h.slug = 'miami-oh' and a.slug = 'cincinnati'));

-- Western Kentucky @ Indiana — Indiana 38, Western Kentucky 0 (home is indiana)
update games g
set status = 'final',
    home_score = 38,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'indiana' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'indiana'));

-- Stanford @ Duke — Duke 35, Stanford 7 (home is duke)
update games g
set status = 'final',
    home_score = 35,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'duke' and a.slug = 'stanford')
    or (h.slug = 'stanford' and a.slug = 'duke'));

-- Ball State @ Liberty — Liberty 51, Ball State 15 (home is liberty)
update games g
set status = 'final',
    home_score = 51,
    away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'liberty' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'liberty'));

-- Louisiana Tech @ Baylor — Baylor 36, Louisiana Tech 19 (home is baylor)
update games g
set status = 'final',
    home_score = 36,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'baylor' and a.slug = 'louisiana-tech')
    or (h.slug = 'louisiana-tech' and a.slug = 'baylor'));

-- Mississippi State @ South Carolina — South Carolina 34, Mississippi State 41 (home is south-carolina)
update games g
set status = 'final',
    home_score = 34,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'south-carolina' and a.slug = 'mississippi-state')
    or (h.slug = 'mississippi-state' and a.slug = 'south-carolina'));

-- East Carolina @ Old Dominion — Old Dominion 17, East Carolina 20 (home is old-dominion)
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'old-dominion' and a.slug = 'east-carolina')
    or (h.slug = 'east-carolina' and a.slug = 'old-dominion'));

-- Florida International @ Florida Atlantic — Florida Atlantic 16, Florida International 10 (home is florida-atlantic)
update games g
set status = 'final',
    home_score = 16,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'florida-atlantic' and a.slug = 'fiu')
    or (h.slug = 'fiu' and a.slug = 'florida-atlantic'));

-- Charlotte @ App State — App State 26, Charlotte 21 (home is app-state)
update games g
set status = 'final',
    home_score = 26,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'app-state' and a.slug = 'charlotte')
    or (h.slug = 'charlotte' and a.slug = 'app-state'));

-- Marshall @ Missouri State — Missouri State 24, Marshall 30 (home is missouri-state)
update games g
set status = 'final',
    home_score = 24,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'missouri-state' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'missouri-state'));

-- Troy @ Missouri — Missouri 27, Troy 17 (home is missouri)
update games g
set status = 'final',
    home_score = 27,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'missouri' and a.slug = 'troy')
    or (h.slug = 'troy' and a.slug = 'missouri'));

-- Florida @ Auburn — Auburn 39, Florida 44 (home is auburn)
update games g
set status = 'final',
    home_score = 39,
    away_score = 44
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'auburn' and a.slug = 'florida')
    or (h.slug = 'florida' and a.slug = 'auburn'));

-- Georgia State @ UCF — UCF 44, Georgia State 30 (home is ucf)
update games g
set status = 'final',
    home_score = 44,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'ucf' and a.slug = 'georgia-state')
    or (h.slug = 'georgia-state' and a.slug = 'ucf'));

-- UConn @ Southern Miss — Southern Miss 20, UConn 48 (home is southern-miss)
update games g
set status = 'final',
    home_score = 20,
    away_score = 48
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'southern-miss' and a.slug = 'uconn')
    or (h.slug = 'uconn' and a.slug = 'southern-miss'));

-- Western Michigan @ Rice — Rice 21, Western Michigan 28 (home is rice)
update games g
set status = 'final',
    home_score = 21,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'rice' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'rice'));

-- Nevada @ Middle Tennessee — Middle Tennessee 27, Nevada 20 (home is middle-tennessee)
update games g
set status = 'final',
    home_score = 27,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'middle-tennessee' and a.slug = 'nevada')
    or (h.slug = 'nevada' and a.slug = 'middle-tennessee'));

-- Ohio @ South Alabama — South Alabama 41, Ohio 36 (home is south-alabama)
update games g
set status = 'final',
    home_score = 41,
    away_score = 36
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'south-alabama' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'south-alabama'));

-- Georgia Southern @ Jacksonville State — Jacksonville State 31, Georgia Southern 27 (home is jacksonville-state)
update games g
set status = 'final',
    home_score = 31,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'jacksonville-state' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'jacksonville-state'));

-- Michigan State @ Notre Dame — Notre Dame 27, Michigan State 10 (home is notre-dame)
update games g
set status = 'final',
    home_score = 27,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'notre-dame' and a.slug = 'michigan-state')
    or (h.slug = 'michigan-state' and a.slug = 'notre-dame'));

-- LSU @ Ole Miss — Ole Miss 32, LSU 24 (home is ole-miss)
update games g
set status = 'final',
    home_score = 32,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'ole-miss' and a.slug = 'lsu')
    or (h.slug = 'lsu' and a.slug = 'ole-miss'));

-- BYU @ Colorado State — Colorado State 23, BYU 41 (home is colorado-state)
update games g
set status = 'final',
    home_score = 23,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'colorado-state' and a.slug = 'byu')
    or (h.slug = 'byu' and a.slug = 'colorado-state'));

-- New Mexico @ Oklahoma — Oklahoma 14, New Mexico 6 (home is oklahoma)
update games g
set status = 'final',
    home_score = 14,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'oklahoma' and a.slug = 'new-mexico')
    or (h.slug = 'new-mexico' and a.slug = 'oklahoma'));

-- West Virginia @ Virginia — Virginia 27, West Virginia 38 (home is virginia)
update games g
set status = 'final',
    home_score = 27,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'virginia' and a.slug = 'west-virginia')
    or (h.slug = 'west-virginia' and a.slug = 'virginia'));

-- Colorado @ Northwestern — Northwestern 41, Colorado 7 (home is northwestern)
update games g
set status = 'final',
    home_score = 41,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'northwestern' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'northwestern'));

-- Virginia Tech @ Maryland — Maryland 26, Virginia Tech 35 (home is maryland)
update games g
set status = 'final',
    home_score = 26,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'maryland' and a.slug = 'virginia-tech')
    or (h.slug = 'virginia-tech' and a.slug = 'maryland'));

-- Kennesaw State @ Tennessee — Tennessee 42, Kennesaw State 9 (home is tennessee)
update games g
set status = 'final',
    home_score = 42,
    away_score = 9
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'tennessee' and a.slug = 'kennesaw-state')
    or (h.slug = 'kennesaw-state' and a.slug = 'tennessee'));

-- UTSA @ Texas — Texas 30, UTSA 6 (home is texas)
update games g
set status = 'final',
    home_score = 30,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'texas' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'texas'));

-- Arkansas State @ TCU — TCU 31, Arkansas State 7 (home is tcu)
update games g
set status = 'final',
    home_score = 31,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'tcu' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'tcu'));

-- UAB @ Louisiana — Louisiana 21, UAB 14 (home is louisiana)
update games g
set status = 'final',
    home_score = 21,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'louisiana' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'louisiana'));

-- James Madison @ San Diego State — San Diego State 13, James Madison 26 (home is san-diego-state)
update games g
set status = 'final',
    home_score = 13,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'san-diego-state' and a.slug = 'james-madison')
    or (h.slug = 'james-madison' and a.slug = 'san-diego-state'));

-- Northern Illinois @ Arizona — Arizona 42, Northern Illinois 17 (home is arizona)
update games g
set status = 'final',
    home_score = 42,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'arizona' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'arizona'));

-- Purdue @ UCLA — UCLA 52, Purdue 38 (home is ucla)
update games g
set status = 'final',
    home_score = 52,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'ucla' and a.slug = 'purdue')
    or (h.slug = 'purdue' and a.slug = 'ucla'));

-- Fresno State @ San José State — San José State 10, Fresno State 26 (home is san-jose-state)
update games g
set status = 'final',
    home_score = 10,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'san-jose-state' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'san-jose-state'));
