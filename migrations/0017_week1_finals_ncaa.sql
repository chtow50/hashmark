-- Week 1 FINALs (NCAA clear). Research CFB confirmed vs NCAA.com (~4:00 CT Sun 2026-09-06).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Idempotent: includes batch 1 (0016) so live gets them even if 0016 has not published yet.
-- Skip already stamped: UMass@Rutgers, Akron@Wake, Colorado@GT, UAB@Illinois.
-- HOLD (do not stamp): WSU@Washington, Louisville–Ole Miss, Wisconsin–ND, SMU@FSU.

-- San José State @ Eastern Michigan — SJSU 27, EMU 21
update games g
set status = 'final',
    home_score = 21,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'eastern-michigan' and a.slug = 'san-jose-state')
    or (h.slug = 'san-jose-state' and a.slug = 'eastern-michigan'));

-- UTEP @ Oklahoma — Oklahoma 51, UTEP 0
update games g
set status = 'final',
    home_score = 51,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'oklahoma' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'oklahoma'));

-- Toledo @ Michigan State — MSU 30, Toledo 20 (batch 1)
update games g
set status = 'final',
    home_score = 30,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'michigan-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'michigan-state'));

-- Miami @ Stanford — Miami 45, Stanford 6 (batch 1)
update games g
set status = 'final',
    home_score = 6,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'stanford' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'stanford'));

-- Fresno State @ USC — USC 39, Fresno State 0
update games g
set status = 'final',
    home_score = 39,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'usc' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'usc'));

-- East Carolina @ Alabama — Alabama 48, ECU 10
update games g
set status = 'final',
    home_score = 48,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'alabama' and a.slug = 'east-carolina')
    or (h.slug = 'east-carolina' and a.slug = 'alabama'));

-- Oregon State @ Houston — Houston 33, Oregon State 20
update games g
set status = 'final',
    home_score = 33,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'houston' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'houston'));

-- Coastal Carolina @ West Virginia — WVU 31, Coastal 24
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'west-virginia' and a.slug = 'coastal-carolina')
    or (h.slug = 'coastal-carolina' and a.slug = 'west-virginia'));

-- North Texas @ Indiana — Indiana 52, North Texas 16
update games g
set status = 'final',
    home_score = 52,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'indiana' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'indiana'));

-- Ohio @ Nebraska — Nebraska 49, Ohio 21
update games g
set status = 'final',
    home_score = 49,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'nebraska' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'nebraska'));

-- Liberty @ James Madison — JMU 20, Liberty 13
update games g
set status = 'final',
    home_score = 20,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'james-madison' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'james-madison'));

-- Miami (OH) @ Pittsburgh — Pitt 59, Miami (OH) 14
update games g
set status = 'final',
    home_score = 59,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'pittsburgh' and a.slug = 'miami-oh')
    or (h.slug = 'miami-oh' and a.slug = 'pittsburgh'));

-- Ball State @ Ohio State — Ohio State 56, Ball State 3
update games g
set status = 'final',
    home_score = 56,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'ohio-state' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'ohio-state'));

-- Kent State @ South Carolina — South Carolina 57, Kent State 0
update games g
set status = 'final',
    home_score = 57,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'south-carolina' and a.slug = 'kent-state')
    or (h.slug = 'kent-state' and a.slug = 'south-carolina'));

-- Baylor vs Auburn (Atlanta, Neutral) — Auburn 17, Baylor 16
update games g
set status = 'final',
    home_score = case when h.slug = 'auburn' then 17 else 16 end,
    away_score = case when h.slug = 'auburn' then 16 else 17 end
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'auburn' and a.slug = 'baylor')
    or (h.slug = 'baylor' and a.slug = 'auburn'));

-- Texas State @ Texas — Texas 59, Texas State 7
update games g
set status = 'final',
    home_score = 59,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'texas' and a.slug = 'texas-state')
    or (h.slug = 'texas-state' and a.slug = 'texas'));

-- Boston College @ Cincinnati — Cincinnati 34, BC 15
update games g
set status = 'final',
    home_score = 34,
    away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'cincinnati' and a.slug = 'boston-college')
    or (h.slug = 'boston-college' and a.slug = 'cincinnati'));

-- Tulane @ Duke — Duke 17, Tulane 3
update games g
set status = 'final',
    home_score = 17,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'duke' and a.slug = 'tulane')
    or (h.slug = 'tulane' and a.slug = 'duke'));

-- Boise State @ Oregon — Oregon 34, Boise State 27
update games g
set status = 'final',
    home_score = 34,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'oregon' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'oregon'));

-- Marshall @ Penn State — Penn State 45, Marshall 0
update games g
set status = 'final',
    home_score = 45,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'penn-state' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'penn-state'));

-- Oklahoma State @ Tulsa — Tulsa 24, Oklahoma State 10
update games g
set status = 'final',
    home_score = 24,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'tulsa' and a.slug = 'oklahoma-state')
    or (h.slug = 'oklahoma-state' and a.slug = 'tulsa'));

-- Northern Illinois @ Iowa — Iowa 40, NIU 0
update games g
set status = 'final',
    home_score = 40,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'iowa' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'iowa'));

-- Wyoming @ Colorado State — CSU 35, Wyoming 13
update games g
set status = 'final',
    home_score = 35,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'colorado-state' and a.slug = 'wyoming')
    or (h.slug = 'wyoming' and a.slug = 'colorado-state'));

-- Missouri State @ Texas A&M — Texas A&M 50, Missouri State 0
update games g
set status = 'final',
    home_score = 50,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'texas-am' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'texas-am'));

-- Arkansas State @ Memphis — Memphis 42, Arkansas State 24
update games g
set status = 'final',
    home_score = 42,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'memphis' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'memphis'));

-- FIU @ South Florida — USF 19, FIU 9
update games g
set status = 'final',
    home_score = 19,
    away_score = 9
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'usf' and a.slug = 'fiu')
    or (h.slug = 'fiu' and a.slug = 'usf'));

-- Sam Houston @ Troy — Troy 24, Sam Houston 21
update games g
set status = 'final',
    home_score = 24,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'troy' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'troy'));

-- Clemson @ LSU — LSU 51, Clemson 10 (batch 1)
update games g
set status = 'final',
    home_score = 51,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'lsu' and a.slug = 'clemson')
    or (h.slug = 'clemson' and a.slug = 'lsu'));

-- UL Monroe @ Mississippi State — Miss State 62, ULM 13
update games g
set status = 'final',
    home_score = 62,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'mississippi-state' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'mississippi-state'));

-- Western Michigan @ Michigan — Michigan 13, WMU 12
update games g
set status = 'final',
    home_score = 13,
    away_score = 12
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'michigan' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'michigan'));

-- Florida Atlantic @ Florida — Florida 66, FAU 21
update games g
set status = 'final',
    home_score = 66,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'florida' and a.slug = 'florida-atlantic')
    or (h.slug = 'florida-atlantic' and a.slug = 'florida'));

-- UNLV @ Hawaiʻi — UNLV 21, Hawaiʻi 6
update games g
set status = 'final',
    home_score = 6,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'hawaii' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'hawaii'));

-- Central Michigan @ New Mexico — New Mexico 38, CMU 7
update games g
set status = 'final',
    home_score = 38,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'new-mexico' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'new-mexico'));

-- UCLA @ California — UCLA 45, Cal 24 (batch 1)
update games g
set status = 'final',
    home_score = 24,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'california' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'california'));

-- Western Kentucky @ Nevada — Nevada 49, WKU 14
update games g
set status = 'final',
    home_score = 49,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'nevada' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'nevada'));
