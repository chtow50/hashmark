-- Week 2 remaining FINALs. Research CLEAR pack
-- data/week2_remaining_finals_clear_2026.json (as_of 2026-09-13 9:00 AM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Stamp clear[] FBS–FBS only (37 games). FBS–FCS scores live in
-- data/week2_fbs_fcs_spreads_2026.json. Do not stamp already_live 19.
-- HOLD = 0.
-- Do not put ESPN event digits here: parseSqlStampsForWeek would overwrite 0024 kick/Vegas.

-- Western Kentucky @ Georgia — Georgia 70, Western Kentucky 20 (home is georgia)
update games g
set status = 'final',
    home_score = 70,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'georgia' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'georgia'));

-- Oregon @ Oklahoma State — Oklahoma State 39, Oregon 31 (home is oklahoma-state)
update games g
set status = 'final',
    home_score = 39,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'oklahoma-state' and a.slug = 'oregon')
    or (h.slug = 'oregon' and a.slug = 'oklahoma-state'));

-- Arizona @ BYU — BYU 28, Arizona 17 (home is byu)
update games g
set status = 'final',
    home_score = 28,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'byu' and a.slug = 'arizona')
    or (h.slug = 'arizona' and a.slug = 'byu'));

-- Duke @ Illinois — Duke 31, Illinois 27 (home is illinois)
update games g
set status = 'final',
    home_score = 27,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'illinois' and a.slug = 'duke')
    or (h.slug = 'duke' and a.slug = 'illinois'));

-- Alabama @ Kentucky — Alabama 45, Kentucky 17 (home is kentucky)
update games g
set status = 'final',
    home_score = 17,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'kentucky' and a.slug = 'alabama')
    or (h.slug = 'alabama' and a.slug = 'kentucky'));

-- Eastern Michigan @ Michigan State — Michigan State 35, Eastern Michigan 7 (home is michigan-state)
update games g
set status = 'final',
    home_score = 35,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'michigan-state' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'michigan-state'));

-- Mississippi State @ Minnesota — Mississippi State 38, Minnesota 13 (home is minnesota)
update games g
set status = 'final',
    home_score = 13,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'minnesota' and a.slug = 'mississippi-state')
    or (h.slug = 'mississippi-state' and a.slug = 'minnesota'));

-- Rice @ Notre Dame — Notre Dame 52, Rice 0 (home is notre-dame)
update games g
set status = 'final',
    home_score = 52,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'notre-dame' and a.slug = 'rice')
    or (h.slug = 'rice' and a.slug = 'notre-dame'));

-- UCF @ Pittsburgh — Pittsburgh 12, UCF 7 (home is pittsburgh)
update games g
set status = 'final',
    home_score = 12,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'pittsburgh' and a.slug = 'ucf')
    or (h.slug = 'ucf' and a.slug = 'pittsburgh'));

-- California @ Syracuse — California 21, Syracuse 18 (home is syracuse)
update games g
set status = 'final',
    home_score = 18,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'syracuse' and a.slug = 'california')
    or (h.slug = 'california' and a.slug = 'syracuse'));

-- UTSA @ Texas State — UTSA 31, Texas State 26 (home is texas-state)
update games g
set status = 'final',
    home_score = 26,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'texas-state' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'texas-state'));

-- UL Monroe @ UAB — UAB 26, UL Monroe 20 (home is uab)
update games g
set status = 'final',
    home_score = 26,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'uab' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'uab'));

-- Maryland @ UConn — Maryland 38, UConn 14 (home is uconn)
update games g
set status = 'final',
    home_score = 14,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'uconn' and a.slug = 'maryland')
    or (h.slug = 'maryland' and a.slug = 'uconn'));

-- Utah State @ Washington — Washington 16, Utah State 14 (home is washington)
update games g
set status = 'final',
    home_score = 16,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'washington' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'washington'));

-- UNLV @ North Texas — North Texas 44, UNLV 6 (home is north-texas)
update games g
set status = 'final',
    home_score = 44,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'north-texas' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'north-texas'));

-- Delaware @ Vanderbilt — Vanderbilt 35, Delaware 26 (home is vanderbilt)
update games g
set status = 'final',
    home_score = 35,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'vanderbilt' and a.slug = 'delaware')
    or (h.slug = 'delaware' and a.slug = 'vanderbilt'));

-- Memphis @ Boise State — Boise State 38, Memphis 20 (home is boise-state)
update games g
set status = 'final',
    home_score = 38,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'boise-state' and a.slug = 'memphis')
    or (h.slug = 'memphis' and a.slug = 'boise-state'));

-- Buffalo @ Florida International — Florida International 33, Buffalo 20 (home is fiu)
update games g
set status = 'final',
    home_score = 33,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'fiu' and a.slug = 'buffalo')
    or (h.slug = 'buffalo' and a.slug = 'fiu'));

-- Jacksonville State @ Ohio — Ohio 29, Jacksonville State 27 (home is ohio)
update games g
set status = 'final',
    home_score = 29,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'ohio' and a.slug = 'jacksonville-state')
    or (h.slug = 'jacksonville-state' and a.slug = 'ohio'));

-- Tennessee @ Georgia Tech — Tennessee 45, Georgia Tech 24 (home is georgia-tech)
update games g
set status = 'final',
    home_score = 24,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'georgia-tech' and a.slug = 'tennessee')
    or (h.slug = 'tennessee' and a.slug = 'georgia-tech'));

-- Georgia State @ Kennesaw State — Georgia State 31, Kennesaw State 17 (home is kennesaw-state)
update games g
set status = 'final',
    home_score = 17,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'kennesaw-state' and a.slug = 'georgia-state')
    or (h.slug = 'georgia-state' and a.slug = 'kennesaw-state'));

-- Middle Tennessee @ Marshall — Marshall 28, Middle Tennessee 26 (home is marshall)
update games g
set status = 'final',
    home_score = 28,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'marshall' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'marshall'));

-- Bowling Green @ Nebraska — Nebraska 56, Bowling Green 7 (home is nebraska)
update games g
set status = 'final',
    home_score = 56,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'nebraska' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'nebraska'));

-- Tulsa @ Sam Houston — Tulsa 23, Sam Houston 17 (home is sam-houston)
update games g
set status = 'final',
    home_score = 17,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'sam-houston' and a.slug = 'tulsa')
    or (h.slug = 'tulsa' and a.slug = 'sam-houston'));

-- South Alabama @ Tulane — Tulane 28, South Alabama 24 (home is tulane)
update games g
set status = 'final',
    home_score = 28,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'tulane' and a.slug = 'south-alabama')
    or (h.slug = 'south-alabama' and a.slug = 'tulane'));

-- San Diego State @ UCLA — UCLA 28, San Diego State 10 (home is ucla)
update games g
set status = 'final',
    home_score = 28,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'ucla' and a.slug = 'san-diego-state')
    or (h.slug = 'san-diego-state' and a.slug = 'ucla'));

-- Navy @ Florida Atlantic — Florida Atlantic 38, Navy 30 (home is florida-atlantic)
update games g
set status = 'final',
    home_score = 38,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'florida-atlantic' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'florida-atlantic'));

-- Iowa State @ Iowa — Iowa 16, Iowa State 13 (home is iowa)
update games g
set status = 'final',
    home_score = 16,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'iowa' and a.slug = 'iowa-state')
    or (h.slug = 'iowa-state' and a.slug = 'iowa'));

-- Louisiana Tech @ LSU — LSU 45, Louisiana Tech 14 (home is lsu)
update games g
set status = 'final',
    home_score = 45,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'lsu' and a.slug = 'louisiana-tech')
    or (h.slug = 'louisiana-tech' and a.slug = 'lsu'));

-- Texas Tech @ Oregon State — Texas Tech 35, Oregon State 24 (home is oregon-state)
update games g
set status = 'final',
    home_score = 24,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'oregon-state' and a.slug = 'texas-tech')
    or (h.slug = 'texas-tech' and a.slug = 'oregon-state'));

-- Ohio State @ Texas — Texas 24, Ohio State 23 (home is texas)
update games g
set status = 'final',
    home_score = 24,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'texas' and a.slug = 'ohio-state')
    or (h.slug = 'ohio-state' and a.slug = 'texas'));

-- Charlotte @ Ole Miss — Ole Miss 41, Charlotte 9 (home is ole-miss)
update games g
set status = 'final',
    home_score = 41,
    away_score = 9
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'ole-miss' and a.slug = 'charlotte')
    or (h.slug = 'charlotte' and a.slug = 'ole-miss'));

-- Southern Miss @ Auburn — Auburn 43, Southern Miss 8 (home is auburn)
update games g
set status = 'final',
    home_score = 43,
    away_score = 8
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'auburn' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'auburn'));

-- Georgia Southern @ Clemson — Clemson 22, Georgia Southern 7 (home is clemson)
update games g
set status = 'final',
    home_score = 22,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'clemson' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'clemson'));

-- Arkansas @ Utah — Utah 43, Arkansas 10 (home is utah)
update games g
set status = 'final',
    home_score = 43,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'utah' and a.slug = 'arkansas')
    or (h.slug = 'arkansas' and a.slug = 'utah'));

-- Louisiana @ USC — USC 49, Louisiana 30 (home is usc)
update games g
set status = 'final',
    home_score = 49,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'usc' and a.slug = 'louisiana')
    or (h.slug = 'louisiana' and a.slug = 'usc'));

-- New Mexico State @ Hawaiʻi — Hawaiʻi 29, New Mexico State 19 (home is hawaii)
update games g
set status = 'final',
    home_score = 29,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'hawaii' and a.slug = 'new-mexico-state')
    or (h.slug = 'new-mexico-state' and a.slug = 'hawaii'));
