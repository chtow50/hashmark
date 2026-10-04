-- Week 5 remaining FINALs. Research CLEAR pack
-- week5_fbs_fbs_finals_clear_2026-10-04 (as_of 2026-10-04 10:13 AM CT).
-- Scores and status only. Kick time, TV, Vegas, and HX unchanged.
-- Stamp 53 FBS-FBS games. Do not re-stamp already live
-- Western Kentucky @ New Mexico State and North Texas @ Tulsa (0045). HOLD = 0.
-- Do not put event digits here: parseSqlStampsForWeek would overwrite 0036/0041 kick and Vegas.
-- ESPN Final/OT (Syracuse @ UConn, Kentucky @ South Carolina): UI has no OT badge.
-- Status stays final. Scores only. North Texas OT already live in 0045.

-- Liberty @ Delaware — Delaware 14, Liberty 30 (home is delaware).
update games g
set status = 'final',
    home_score = 14,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'delaware' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'delaware'));

-- Pittsburgh @ Virginia Tech — Virginia Tech 33, Pittsburgh 35 (home is virginia-tech).
update games g
set status = 'final',
    home_score = 33,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'virginia-tech' and a.slug = 'pittsburgh')
    or (h.slug = 'pittsburgh' and a.slug = 'virginia-tech'));

-- Penn State @ Northwestern — Northwestern 34, Penn State 13 (home is northwestern).
update games g
set status = 'final',
    home_score = 34,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'northwestern' and a.slug = 'penn-state')
    or (h.slug = 'penn-state' and a.slug = 'northwestern'));

-- Memphis @ Charlotte — Charlotte 8, Memphis 59 (home is charlotte).
update games g
set status = 'final',
    home_score = 8,
    away_score = 59
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'charlotte' and a.slug = 'memphis')
    or (h.slug = 'memphis' and a.slug = 'charlotte'));

-- Alabama @ Mississippi State — Mississippi State 23, Alabama 56 (home is mississippi-state).
update games g
set status = 'final',
    home_score = 23,
    away_score = 56
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'mississippi-state' and a.slug = 'alabama')
    or (h.slug = 'alabama' and a.slug = 'mississippi-state'));

-- Boston College @ SMU — SMU 25, Boston College 16 (home is smu).
update games g
set status = 'final',
    home_score = 25,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'smu' and a.slug = 'boston-college')
    or (h.slug = 'boston-college' and a.slug = 'smu'));

-- Michigan @ Minnesota — Minnesota 20, Michigan 14 (home is minnesota).
update games g
set status = 'final',
    home_score = 20,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'minnesota' and a.slug = 'michigan')
    or (h.slug = 'michigan' and a.slug = 'minnesota'));

-- Middle Tennessee @ Kansas — Kansas 55, Middle Tennessee 0 (home is kansas).
update games g
set status = 'final',
    home_score = 55,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'kansas' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'kansas'));

-- Navy @ Air Force — Air Force 14, Navy 9 (home is air-force).
update games g
set status = 'final',
    home_score = 14,
    away_score = 9
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'air-force' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'air-force'));

-- Notre Dame @ North Carolina — North Carolina 26, Notre Dame 37 (home is north-carolina).
update games g
set status = 'final',
    home_score = 26,
    away_score = 37
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'north-carolina' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'north-carolina'));

-- Stanford @ Wake Forest — Wake Forest 57, Stanford 3 (home is wake-forest).
update games g
set status = 'final',
    home_score = 57,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'wake-forest' and a.slug = 'stanford')
    or (h.slug = 'stanford' and a.slug = 'wake-forest'));

-- Syracuse @ UConn — UConn 41, Syracuse 42 (home is uconn). ESPN Final/OT; no OT badge on the card.
update games g
set status = 'final',
    home_score = 41,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'uconn' and a.slug = 'syracuse')
    or (h.slug = 'syracuse' and a.slug = 'uconn'));

-- UCF @ Houston — Houston 27, UCF 17 (home is houston).
update games g
set status = 'final',
    home_score = 27,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'houston' and a.slug = 'ucf')
    or (h.slug = 'ucf' and a.slug = 'houston'));

-- West Virginia @ Iowa State — Iowa State 45, West Virginia 42 (home is iowa-state).
update games g
set status = 'final',
    home_score = 45,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'iowa-state' and a.slug = 'west-virginia')
    or (h.slug = 'west-virginia' and a.slug = 'iowa-state'));

-- Michigan State @ Wisconsin — Wisconsin 31, Michigan State 3 (home is wisconsin).
update games g
set status = 'final',
    home_score = 31,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'wisconsin' and a.slug = 'michigan-state')
    or (h.slug = 'michigan-state' and a.slug = 'wisconsin'));

-- Vanderbilt @ Georgia — Georgia 38, Vanderbilt 14 (home is georgia).
update games g
set status = 'final',
    home_score = 38,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'georgia' and a.slug = 'vanderbilt')
    or (h.slug = 'vanderbilt' and a.slug = 'georgia'));

-- Western Michigan @ Buffalo — Buffalo 17, Western Michigan 20 (home is buffalo).
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'buffalo' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'buffalo'));

-- Toledo @ Ball State — Ball State 24, Toledo 39 (home is ball-state).
update games g
set status = 'final',
    home_score = 24,
    away_score = 39
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'ball-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'ball-state'));

-- Akron @ Central Michigan — Central Michigan 41, Akron 17 (home is central-michigan).
update games g
set status = 'final',
    home_score = 41,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'central-michigan' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'central-michigan'));

-- Auburn @ Tennessee — Tennessee 24, Auburn 14 (home is tennessee).
update games g
set status = 'final',
    home_score = 24,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'tennessee' and a.slug = 'auburn')
    or (h.slug = 'auburn' and a.slug = 'tennessee'));

-- Bowling Green @ Miami (OH) — Miami (OH) 20, Bowling Green 24 (home is miami-oh).
update games g
set status = 'final',
    home_score = 20,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'miami-oh' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'miami-oh'));

-- California @ UNLV — UNLV 39, California 31 (home is unlv).
update games g
set status = 'final',
    home_score = 39,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'unlv' and a.slug = 'california')
    or (h.slug = 'california' and a.slug = 'unlv'));

-- Eastern Michigan @ Massachusetts — Massachusetts 14, Eastern Michigan 38 (home is massachusetts).
update games g
set status = 'final',
    home_score = 14,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'massachusetts' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'massachusetts'));

-- Louisville @ NC State — NC State 31, Louisville 28 (home is nc-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'nc-state' and a.slug = 'louisville')
    or (h.slug = 'louisville' and a.slug = 'nc-state'));

-- Ohio @ Kent State — Kent State 10, Ohio 13 (home is kent-state).
update games g
set status = 'final',
    home_score = 10,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'kent-state' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'kent-state'));

-- Ohio State @ Iowa — Iowa 14, Ohio State 31 (home is iowa).
update games g
set status = 'final',
    home_score = 14,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'iowa' and a.slug = 'ohio-state')
    or (h.slug = 'ohio-state' and a.slug = 'iowa'));

-- Old Dominion @ Georgia State — Georgia State 42, Old Dominion 10 (home is georgia-state).
update games g
set status = 'final',
    home_score = 42,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'georgia-state' and a.slug = 'old-dominion')
    or (h.slug = 'old-dominion' and a.slug = 'georgia-state'));

-- Virginia @ Florida State — Florida State 38, Virginia 7 (home is florida-state).
update games g
set status = 'final',
    home_score = 38,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'florida-state' and a.slug = 'virginia')
    or (h.slug = 'virginia' and a.slug = 'florida-state'));

-- Marshall @ James Madison — James Madison 45, Marshall 17 (home is james-madison).
update games g
set status = 'final',
    home_score = 45,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'james-madison' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'james-madison'));

-- Florida @ Missouri — Missouri 45, Florida 17 (home is missouri).
update games g
set status = 'final',
    home_score = 45,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'missouri' and a.slug = 'florida')
    or (h.slug = 'florida' and a.slug = 'missouri'));

-- Maryland @ Nebraska — Nebraska 48, Maryland 23 (home is nebraska).
update games g
set status = 'final',
    home_score = 48,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'nebraska' and a.slug = 'maryland')
    or (h.slug = 'maryland' and a.slug = 'nebraska'));

-- UTEP @ New Mexico — New Mexico 61, UTEP 7 (home is new-mexico).
update games g
set status = 'final',
    home_score = 61,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'new-mexico' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'new-mexico'));

-- Kentucky @ South Carolina — South Carolina 34, Kentucky 35 (home is south-carolina). ESPN Final/OT; no OT badge on the card.
update games g
set status = 'final',
    home_score = 34,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'south-carolina' and a.slug = 'kentucky')
    or (h.slug = 'kentucky' and a.slug = 'south-carolina'));

-- Purdue @ Illinois — Illinois 17, Purdue 24 (home is illinois).
update games g
set status = 'final',
    home_score = 17,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'illinois' and a.slug = 'purdue')
    or (h.slug = 'purdue' and a.slug = 'illinois'));

-- Oregon State @ Colorado State — Colorado State 26, Oregon State 56 (home is colorado-state).
update games g
set status = 'final',
    home_score = 26,
    away_score = 56
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'colorado-state' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'colorado-state'));

-- Arkansas @ Texas A&M — Texas A&M 34, Arkansas 7 (home is texas-am).
update games g
set status = 'final',
    home_score = 34,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'texas-am' and a.slug = 'arkansas')
    or (h.slug = 'arkansas' and a.slug = 'texas-am'));

-- BYU @ TCU — TCU 10, BYU 17 (home is tcu).
update games g
set status = 'final',
    home_score = 10,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'tcu' and a.slug = 'byu')
    or (h.slug = 'byu' and a.slug = 'tcu'));

-- Georgia Southern @ Coastal Carolina — Coastal Carolina 24, Georgia Southern 31 (home is coastal-carolina).
update games g
set status = 'final',
    home_score = 24,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'coastal-carolina' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'coastal-carolina'));

-- UL Monroe @ South Alabama — South Alabama 52, UL Monroe 35 (home is south-alabama).
update games g
set status = 'final',
    home_score = 52,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'south-alabama' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'south-alabama'));

-- UTSA @ Rice — Rice 14, UTSA 16 (home is rice).
update games g
set status = 'final',
    home_score = 14,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'rice' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'rice'));

-- Army @ Louisiana Tech — Louisiana Tech 31, Army 29 (home is louisiana-tech).
update games g
set status = 'final',
    home_score = 31,
    away_score = 29
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'louisiana-tech' and a.slug = 'army')
    or (h.slug = 'army' and a.slug = 'louisiana-tech'));

-- Miami @ Clemson — Clemson 13, Miami 41 (home is clemson).
update games g
set status = 'final',
    home_score = 13,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'clemson' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'clemson'));

-- Temple @ South Florida — South Florida 13, Temple 17 (home is usf).
update games g
set status = 'final',
    home_score = 13,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'usf' and a.slug = 'temple')
    or (h.slug = 'temple' and a.slug = 'usf'));

-- Texas Tech @ Colorado — Colorado 7, Texas Tech 29 (home is colorado).
update games g
set status = 'final',
    home_score = 7,
    away_score = 29
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'colorado' and a.slug = 'texas-tech')
    or (h.slug = 'texas-tech' and a.slug = 'colorado'));

-- Utah State @ Boise State — Boise State 37, Utah State 18 (home is boise-state).
update games g
set status = 'final',
    home_score = 37,
    away_score = 18
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'boise-state' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'boise-state'));

-- Washington @ USC — USC 25, Washington 21 (home is usc).
update games g
set status = 'final',
    home_score = 25,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'usc' and a.slug = 'washington')
    or (h.slug = 'washington' and a.slug = 'usc'));

-- Arkansas State @ Louisiana — Louisiana 23, Arkansas State 20 (home is louisiana).
update games g
set status = 'final',
    home_score = 23,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'louisiana' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'louisiana'));

-- Indiana @ Rutgers — Rutgers 15, Indiana 47 (home is rutgers).
update games g
set status = 'final',
    home_score = 15,
    away_score = 47
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'rutgers' and a.slug = 'indiana')
    or (h.slug = 'indiana' and a.slug = 'rutgers'));

-- Fresno State @ Washington State — Washington State 6, Fresno State 26 (home is washington-state).
update games g
set status = 'final',
    home_score = 6,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'washington-state' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'washington-state'));

-- Baylor @ Arizona State — Arizona State 19, Baylor 55 (home is arizona-state).
update games g
set status = 'final',
    home_score = 19,
    away_score = 55
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'arizona-state' and a.slug = 'baylor')
    or (h.slug = 'baylor' and a.slug = 'arizona-state'));

-- Texas State @ San Diego State — San Diego State 31, Texas State 29 (home is san-diego-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 29
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'san-diego-state' and a.slug = 'texas-state')
    or (h.slug = 'texas-state' and a.slug = 'san-diego-state'));

-- Cincinnati @ Arizona — Arizona 34, Cincinnati 7 (home is arizona).
update games g
set status = 'final',
    home_score = 34,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'arizona' and a.slug = 'cincinnati')
    or (h.slug = 'cincinnati' and a.slug = 'arizona'));

-- San José State @ Hawaiʻi — Hawaiʻi 16, San José State 20 (home is hawaii).
update games g
set status = 'final',
    home_score = 16,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'hawaii' and a.slug = 'san-jose-state')
    or (h.slug = 'san-jose-state' and a.slug = 'hawaii'));
