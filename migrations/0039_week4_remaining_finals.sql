-- Week 4 remaining FINALs. Research CLEAR pack
-- data/week4_fbs_fbs_finals_clear_2026-09-27.json (as_of 2026-09-27 10:16 AM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Stamp 56 FBS–FBS games. Do not re-stamp already_live
-- Liberty @ Coastal Carolina (0037). HOLD = 0.
-- Do not put event digits here: parseSqlStampsForWeek would overwrite 0031/0035 kick/Vegas.

-- Army @ Temple — Temple 17, Army 21 (home is temple)
update games g
set status = 'final',
    home_score = 17,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'temple' and a.slug = 'army')
    or (h.slug = 'army' and a.slug = 'temple'));

-- Navy @ UAB — UAB 24, Navy 20 (home is uab)
update games g
set status = 'final',
    home_score = 24,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'uab' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'uab'));

-- Northwestern @ Indiana — Indiana 29, Northwestern 23 (home is indiana)
update games g
set status = 'final',
    home_score = 29,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'indiana' and a.slug = 'northwestern')
    or (h.slug = 'northwestern' and a.slug = 'indiana'));

-- Clemson @ California — California 10, Clemson 24 (home is california)
update games g
set status = 'final',
    home_score = 10,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'california' and a.slug = 'clemson')
    or (h.slug = 'clemson' and a.slug = 'california'));

-- Texas @ Tennessee — Tennessee 17, Texas 20 (home is tennessee)
update games g
set status = 'final',
    home_score = 17,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'tennessee' and a.slug = 'texas')
    or (h.slug = 'texas' and a.slug = 'tennessee'));

-- Sam Houston @ Texas Tech — Texas Tech 49, Sam Houston 14 (home is texas-tech)
update games g
set status = 'final',
    home_score = 49,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'texas-tech' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'texas-tech'));

-- Colorado @ Baylor — Baylor 23, Colorado 13 (home is baylor)
update games g
set status = 'final',
    home_score = 23,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'baylor' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'baylor'));

-- Virginia Tech @ Boston College — Boston College 14, Virginia Tech 21 (home is boston-college)
update games g
set status = 'final',
    home_score = 14,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'boston-college' and a.slug = 'virginia-tech')
    or (h.slug = 'virginia-tech' and a.slug = 'boston-college'));

-- Wake Forest @ Louisville — Louisville 27, Wake Forest 30 (home is louisville)
update games g
set status = 'final',
    home_score = 27,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'louisville' and a.slug = 'wake-forest')
    or (h.slug = 'wake-forest' and a.slug = 'louisville'));

-- Illinois @ Ohio State — Ohio State 42, Illinois 19 (home is ohio-state)
update games g
set status = 'final',
    home_score = 42,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'ohio-state' and a.slug = 'illinois')
    or (h.slug = 'illinois' and a.slug = 'ohio-state'));

-- San Diego State @ Toledo — Toledo 41, San Diego State 16 (home is toledo)
update games g
set status = 'final',
    home_score = 41,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'toledo' and a.slug = 'san-diego-state')
    or (h.slug = 'san-diego-state' and a.slug = 'toledo'));

-- Colorado State @ UTSA — UTSA 59, Colorado State 45 (home is utsa)
update games g
set status = 'final',
    home_score = 59,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'utsa' and a.slug = 'colorado-state')
    or (h.slug = 'colorado-state' and a.slug = 'utsa'));

-- UNLV @ Akron — Akron 10, UNLV 38 (home is akron)
update games g
set status = 'final',
    home_score = 10,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'akron' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'akron'));

-- Ball State @ Kent State — Kent State 26, Ball State 13 (home is kent-state)
update games g
set status = 'final',
    home_score = 26,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'kent-state' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'kent-state'));

-- South Alabama @ Kentucky — Kentucky 45, South Alabama 21 (home is kentucky)
update games g
set status = 'final',
    home_score = 45,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'kentucky' and a.slug = 'south-alabama')
    or (h.slug = 'south-alabama' and a.slug = 'kentucky'));

-- UCLA @ Maryland — Maryland 3, UCLA 54 (home is maryland)
update games g
set status = 'final',
    home_score = 3,
    away_score = 54
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'maryland' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'maryland'));

-- Notre Dame @ Purdue — Purdue 10, Notre Dame 49 (home is purdue)
update games g
set status = 'final',
    home_score = 10,
    away_score = 49
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'purdue' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'purdue'));

-- Northern Illinois @ Georgia State — Georgia State 35, Northern Illinois 14 (home is georgia-state)
update games g
set status = 'final',
    home_score = 35,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'georgia-state' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'georgia-state'));

-- Hawaiʻi @ Wyoming — Wyoming 27, Hawaiʻi 10 (home is wyoming)
update games g
set status = 'final',
    home_score = 27,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'wyoming' and a.slug = 'hawaii')
    or (h.slug = 'hawaii' and a.slug = 'wyoming'));

-- Ole Miss @ Florida — Florida 52, Ole Miss 28 (home is florida)
update games g
set status = 'final',
    home_score = 52,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'florida' and a.slug = 'ole-miss')
    or (h.slug = 'ole-miss' and a.slug = 'florida'));

-- Oklahoma @ Georgia — Georgia 41, Oklahoma 13 (home is georgia)
update games g
set status = 'final',
    home_score = 41,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'georgia' and a.slug = 'oklahoma')
    or (h.slug = 'oklahoma' and a.slug = 'georgia'));

-- TCU @ UCF — UCF 21, TCU 13 (home is ucf)
update games g
set status = 'final',
    home_score = 21,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'ucf' and a.slug = 'tcu')
    or (h.slug = 'tcu' and a.slug = 'ucf'));

-- Utah @ Iowa State — Iowa State 17, Utah 31 (home is iowa-state)
update games g
set status = 'final',
    home_score = 17,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'iowa-state' and a.slug = 'utah')
    or (h.slug = 'utah' and a.slug = 'iowa-state'));

-- Iowa @ Michigan — Michigan 19, Iowa 20 (home is michigan)
update games g
set status = 'final',
    home_score = 19,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'michigan' and a.slug = 'iowa')
    or (h.slug = 'iowa' and a.slug = 'michigan'));

-- Boise State @ Western Michigan — Western Michigan 7, Boise State 32 (home is western-michigan)
update games g
set status = 'final',
    home_score = 7,
    away_score = 32
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'western-michigan' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'western-michigan'));

-- UConn @ Miami (OH) — Miami (OH) 24, UConn 21 (home is miami-oh)
update games g
set status = 'final',
    home_score = 24,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'miami-oh' and a.slug = 'uconn')
    or (h.slug = 'uconn' and a.slug = 'miami-oh'));

-- New Mexico @ New Mexico State — New Mexico State 18, New Mexico 42 (home is new-mexico-state)
update games g
set status = 'final',
    home_score = 18,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'new-mexico-state' and a.slug = 'new-mexico')
    or (h.slug = 'new-mexico' and a.slug = 'new-mexico-state'));

-- Houston @ Georgia Southern — Georgia Southern 28, Houston 42 (home is georgia-southern)
update games g
set status = 'final',
    home_score = 28,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'georgia-southern' and a.slug = 'houston')
    or (h.slug = 'houston' and a.slug = 'georgia-southern'));

-- Vanderbilt @ Auburn — Auburn 21, Vanderbilt 15 (home is auburn)
update games g
set status = 'final',
    home_score = 21,
    away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'auburn' and a.slug = 'vanderbilt')
    or (h.slug = 'vanderbilt' and a.slug = 'auburn'));

-- Nebraska @ Michigan State — Michigan State 13, Nebraska 31 (home is michigan-state)
update games g
set status = 'final',
    home_score = 13,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'michigan-state' and a.slug = 'nebraska')
    or (h.slug = 'nebraska' and a.slug = 'michigan-state'));

-- Wisconsin @ Penn State — Penn State 20, Wisconsin 24 (home is penn-state)
update games g
set status = 'final',
    home_score = 20,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'penn-state' and a.slug = 'wisconsin')
    or (h.slug = 'wisconsin' and a.slug = 'penn-state'));

-- South Florida @ Bowling Green — Bowling Green 6, South Florida 14 (home is bowling-green)
update games g
set status = 'final',
    home_score = 6,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'bowling-green' and a.slug = 'usf')
    or (h.slug = 'usf' and a.slug = 'bowling-green'));

-- Delaware @ Virginia — Virginia 42, Delaware 3 (home is virginia)
update games g
set status = 'final',
    home_score = 42,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'virginia' and a.slug = 'delaware')
    or (h.slug = 'delaware' and a.slug = 'virginia'));

-- James Madison @ Old Dominion — Old Dominion 20, James Madison 46 (home is old-dominion)
update games g
set status = 'final',
    home_score = 20,
    away_score = 46
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'old-dominion' and a.slug = 'james-madison')
    or (h.slug = 'james-madison' and a.slug = 'old-dominion'));

-- Central Michigan @ Miami — Miami 52, Central Michigan 3 (home is miami)
update games g
set status = 'final',
    home_score = 52,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'miami' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'miami'));

-- Louisiana @ Charlotte — Charlotte 7, Louisiana 34 (home is charlotte)
update games g
set status = 'final',
    home_score = 7,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'charlotte' and a.slug = 'louisiana')
    or (h.slug = 'louisiana' and a.slug = 'charlotte'));

-- South Carolina @ Alabama — Alabama 49, South Carolina 18 (home is alabama)
update games g
set status = 'final',
    home_score = 49,
    away_score = 18
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'alabama' and a.slug = 'south-carolina')
    or (h.slug = 'south-carolina' and a.slug = 'alabama'));

-- Kansas State @ Cincinnati — Cincinnati 31, Kansas State 26 (home is cincinnati)
update games g
set status = 'final',
    home_score = 31,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'cincinnati' and a.slug = 'kansas-state')
    or (h.slug = 'kansas-state' and a.slug = 'cincinnati'));

-- Oklahoma State @ West Virginia — West Virginia 24, Oklahoma State 41 (home is west-virginia)
update games g
set status = 'final',
    home_score = 24,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'west-virginia' and a.slug = 'oklahoma-state')
    or (h.slug = 'oklahoma-state' and a.slug = 'west-virginia'));

-- Southern Miss @ Tulane — Tulane 24, Southern Miss 21 (home is tulane)
update games g
set status = 'final',
    home_score = 24,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'tulane' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'tulane'));

-- Kennesaw State @ Arkansas State — Arkansas State 17, Kennesaw State 14 (home is arkansas-state)
update games g
set status = 'final',
    home_score = 17,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'arkansas-state' and a.slug = 'kennesaw-state')
    or (h.slug = 'kennesaw-state' and a.slug = 'arkansas-state'));

-- Middle Tennessee @ Jacksonville State — Jacksonville State 23, Middle Tennessee 13 (home is jacksonville-state)
update games g
set status = 'final',
    home_score = 23,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'jacksonville-state' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'jacksonville-state'));

-- Texas A&M @ LSU — LSU 35, Texas A&M 6 (home is lsu)
update games g
set status = 'final',
    home_score = 35,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'lsu' and a.slug = 'texas-am')
    or (h.slug = 'texas-am' and a.slug = 'lsu'));

-- Arizona @ Washington State — Washington State 24, Arizona 34 (home is washington-state)
update games g
set status = 'final',
    home_score = 24,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'washington-state' and a.slug = 'arizona')
    or (h.slug = 'arizona' and a.slug = 'washington-state'));

-- Oregon @ USC — USC 27, Oregon 41 (home is usc)
update games g
set status = 'final',
    home_score = 27,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'usc' and a.slug = 'oregon')
    or (h.slug = 'oregon' and a.slug = 'usc'));

-- Troy @ Utah State — Utah State 21, Troy 10 (home is utah-state)
update games g
set status = 'final',
    home_score = 21,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'utah-state' and a.slug = 'troy')
    or (h.slug = 'troy' and a.slug = 'utah-state'));

-- App State @ NC State — NC State 41, App State 31 (home is nc-state)
update games g
set status = 'final',
    home_score = 41,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'nc-state' and a.slug = 'app-state')
    or (h.slug = 'app-state' and a.slug = 'nc-state'));

-- Missouri @ Mississippi State — Mississippi State 31, Missouri 24 (home is mississippi-state)
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'mississippi-state' and a.slug = 'missouri')
    or (h.slug = 'missouri' and a.slug = 'mississippi-state'));

-- Tulsa @ Arkansas — Arkansas 34, Tulsa 6 (home is arkansas)
update games g
set status = 'final',
    home_score = 34,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'arkansas' and a.slug = 'tulsa')
    or (h.slug = 'tulsa' and a.slug = 'arkansas'));

-- Florida Atlantic @ UL Monroe — UL Monroe 17, Florida Atlantic 45 (home is ul-monroe)
update games g
set status = 'final',
    home_score = 17,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'ul-monroe' and a.slug = 'florida-atlantic')
    or (h.slug = 'florida-atlantic' and a.slug = 'ul-monroe'));

-- Missouri State @ SMU — SMU 34, Missouri State 24 (home is smu)
update games g
set status = 'final',
    home_score = 34,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'smu' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'smu'));

-- Oregon State @ UTEP — UTEP 7, Oregon State 33 (home is utep)
update games g
set status = 'final',
    home_score = 7,
    away_score = 33
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'utep' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'utep'));

-- Rice @ Fresno State — Fresno State 38, Rice 24 (home is fresno-state)
update games g
set status = 'final',
    home_score = 38,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'fresno-state' and a.slug = 'rice')
    or (h.slug = 'rice' and a.slug = 'fresno-state'));

-- Georgia Tech @ Stanford — Stanford 34, Georgia Tech 27 (home is stanford)
update games g
set status = 'final',
    home_score = 34,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'stanford' and a.slug = 'georgia-tech')
    or (h.slug = 'georgia-tech' and a.slug = 'stanford'));

-- Air Force @ Nevada — Nevada 33, Air Force 36 (home is nevada)
update games g
set status = 'final',
    home_score = 33,
    away_score = 36
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'nevada' and a.slug = 'air-force')
    or (h.slug = 'air-force' and a.slug = 'nevada'));

-- Minnesota @ Washington — Washington 24, Minnesota 27 (home is washington)
update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'washington' and a.slug = 'minnesota')
    or (h.slug = 'minnesota' and a.slug = 'washington'));
