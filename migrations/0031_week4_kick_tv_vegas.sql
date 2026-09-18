-- Week 4 FBS–FBS kick / TV / Vegas from Research CLEAR pack
-- data/week4_fbs_fbs_kick_tv_vegas_2026.json (as_of 2026-09-17 10:34 CT).
-- Pack vegas_spread is home-relative (negative = home favored).
-- SQL stores the Week 2 / board convention: positive = home favored.
-- Match by home/away slug + week=4 (pack has no stable hashmark_ids).
-- kickoff_date = America/Chicago civil date of kick_iso (not stale HM dates).
-- CLEAR only on sourced fields. HOLD TV/Vegas stay null. Do not invent. No ESPN event IDs.
-- Featured: Liberty @ Coastal Carolina · Thu 18:30 CT · ESPN · Vegas HOLD.

-- Liberty @ Coastal Carolina · Thu 2026-09-24 18:30 CT · ESPN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-24 18:30:00-05',
    kickoff_date = date '2026-09-24',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'coastal-carolina' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'coastal-carolina'))
  and g.week = 4;

-- Army @ Temple · Fri 2026-09-25 15:00 CT · ESPN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-25 15:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'temple' and a.slug = 'army')
    or (h.slug = 'army' and a.slug = 'temple'))
  and g.week = 4;

-- Navy @ UAB · Fri 2026-09-25 18:00 CT · ESPN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-25 18:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'uab' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'uab'))
  and g.week = 4;

-- Northwestern @ Indiana · Fri 2026-09-25 19:00 CT · FOX · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-25 19:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'indiana' and a.slug = 'northwestern')
    or (h.slug = 'northwestern' and a.slug = 'indiana'))
  and g.week = 4;

-- Clemson @ California · Fri 2026-09-25 21:30 CT · ESPN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-25 21:30:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'california' and a.slug = 'clemson')
    or (h.slug = 'clemson' and a.slug = 'california'))
  and g.week = 4;

-- Boise State @ Western Michigan · Fri 2026-09-25 23:00 CT · TV — · BOIS -7.5 · HOLD (TV)
update games g
set kickoff_at = timestamptz '2026-09-25 23:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = null,
    vegas_spread = case when h.slug = 'western-michigan' then -7.5 else 7.5 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'western-michigan' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'western-michigan'))
  and g.week = 4;

-- Houston @ Georgia Southern · Fri 2026-09-25 23:00 CT · TV — · Vegas — · HOLD (TV/Vegas)
update games g
set kickoff_at = timestamptz '2026-09-25 23:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-southern' and a.slug = 'houston')
    or (h.slug = 'houston' and a.slug = 'georgia-southern'))
  and g.week = 4;

-- Colorado @ Baylor · Sat 2026-09-26 11:00 CT · TV — · Vegas — · HOLD (TV/Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'baylor' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'baylor'))
  and g.week = 4;

-- Sam Houston @ Texas Tech · Sat 2026-09-26 11:00 CT · TNT · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-tech' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'texas-tech'))
  and g.week = 4;

-- San Diego State @ Toledo · Sat 2026-09-26 11:00 CT · CBSSN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'toledo' and a.slug = 'san-diego-state')
    or (h.slug = 'san-diego-state' and a.slug = 'toledo'))
  and g.week = 4;

-- Ball State @ Kent State · Sat 2026-09-26 11:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kent-state' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'kent-state'))
  and g.week = 4;

-- UNLV @ Akron · Sat 2026-09-26 11:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'akron' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'akron'))
  and g.week = 4;

-- Illinois @ Ohio State · Sat 2026-09-26 11:00 CT · FOX · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio-state' and a.slug = 'illinois')
    or (h.slug = 'illinois' and a.slug = 'ohio-state'))
  and g.week = 4;

-- Virginia Tech @ Boston College · Sat 2026-09-26 11:00 CT · TV — · Vegas — · HOLD (TV/Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'boston-college' and a.slug = 'virginia-tech')
    or (h.slug = 'virginia-tech' and a.slug = 'boston-college'))
  and g.week = 4;

-- Wake Forest @ Louisville · Sat 2026-09-26 11:00 CT · TV — · Vegas — · HOLD (TV/Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisville' and a.slug = 'wake-forest')
    or (h.slug = 'wake-forest' and a.slug = 'louisville'))
  and g.week = 4;

-- Colorado State @ UTSA · Sat 2026-09-26 11:00 CT · ESPNU · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utsa' and a.slug = 'colorado-state')
    or (h.slug = 'colorado-state' and a.slug = 'utsa'))
  and g.week = 4;

-- Texas @ Tennessee · Sat 2026-09-26 11:00 CT · ABC · TEX -4.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'tennessee' then -4.5 else 4.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tennessee' and a.slug = 'texas')
    or (h.slug = 'texas' and a.slug = 'tennessee'))
  and g.week = 4;

-- South Alabama @ Kentucky · Sat 2026-09-26 11:45 CT · SEC Network · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 11:45:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kentucky' and a.slug = 'south-alabama')
    or (h.slug = 'south-alabama' and a.slug = 'kentucky'))
  and g.week = 4;

-- UCLA @ Maryland · Sat 2026-09-26 12:30 CT · BTN · UCLA -1.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 12:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'maryland' then -1.5 else 1.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'maryland' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'maryland'))
  and g.week = 4;

-- Notre Dame @ Purdue · Sat 2026-09-26 13:00 CT · Peacock · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 13:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'Peacock',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'purdue' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'purdue'))
  and g.week = 4;

-- Northern Illinois @ Georgia State · Sat 2026-09-26 13:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 13:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-state' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'georgia-state'))
  and g.week = 4;

-- Hawaiʻi @ Wyoming · Sat 2026-09-26 14:00 CT · CW · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 14:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wyoming' and a.slug = 'hawaii')
    or (h.slug = 'hawaii' and a.slug = 'wyoming'))
  and g.week = 4;

-- Utah @ Iowa State · Sat 2026-09-26 14:30 CT · FOX · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa-state' and a.slug = 'utah')
    or (h.slug = 'utah' and a.slug = 'iowa-state'))
  and g.week = 4;

-- Oklahoma @ Georgia · Sat 2026-09-26 14:30 CT · TV — · UGA -13.5 · HOLD (TV)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = null,
    vegas_spread = case when h.slug = 'georgia' then 13.5 else -13.5 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia' and a.slug = 'oklahoma')
    or (h.slug = 'oklahoma' and a.slug = 'georgia'))
  and g.week = 4;

-- Ole Miss @ Florida · Sat 2026-09-26 14:30 CT · TV — · FLA -1.5 · HOLD (TV)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = null,
    vegas_spread = case when h.slug = 'florida' then 1.5 else -1.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida' and a.slug = 'ole-miss')
    or (h.slug = 'ole-miss' and a.slug = 'florida'))
  and g.week = 4;

-- UConn @ Miami (OH) · Sat 2026-09-26 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'miami-oh' and a.slug = 'uconn')
    or (h.slug = 'uconn' and a.slug = 'miami-oh'))
  and g.week = 4;

-- Iowa @ Michigan · Sat 2026-09-26 14:30 CT · CBS · MICH -4.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'michigan' then 4.5 else -4.5 end,
    vegas_total = 39.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan' and a.slug = 'iowa')
    or (h.slug = 'iowa' and a.slug = 'michigan'))
  and g.week = 4;

-- TCU @ UCF · Sat 2026-09-26 14:30 CT · FS1 · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ucf' and a.slug = 'tcu')
    or (h.slug = 'tcu' and a.slug = 'ucf'))
  and g.week = 4;

-- New Mexico @ New Mexico State · Sat 2026-09-26 14:30 CT · CBSSN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico-state' and a.slug = 'new-mexico')
    or (h.slug = 'new-mexico' and a.slug = 'new-mexico-state'))
  and g.week = 4;

-- Vanderbilt @ Auburn · Sat 2026-09-26 15:15 CT · SEC Network · AUB -8.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 15:15:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'auburn' then 8.5 else -8.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'auburn' and a.slug = 'vanderbilt')
    or (h.slug = 'vanderbilt' and a.slug = 'auburn'))
  and g.week = 4;

-- South Florida @ Bowling Green · Sat 2026-09-26 16:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 16:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'bowling-green' and a.slug = 'usf')
    or (h.slug = 'usf' and a.slug = 'bowling-green'))
  and g.week = 4;

-- Wisconsin @ Penn State · Sat 2026-09-26 16:00 CT · Peacock · PSU -11.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 16:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'Peacock',
    vegas_spread = case when h.slug = 'penn-state' then 11.5 else -11.5 end,
    vegas_total = 42.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'penn-state' and a.slug = 'wisconsin')
    or (h.slug = 'wisconsin' and a.slug = 'penn-state'))
  and g.week = 4;

-- Nebraska @ Michigan State · Sat 2026-09-26 16:00 CT · BTN · NEB -5.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 16:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'michigan-state' then -5.5 else 5.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan-state' and a.slug = 'nebraska')
    or (h.slug = 'nebraska' and a.slug = 'michigan-state'))
  and g.week = 4;

-- James Madison @ Old Dominion · Sat 2026-09-26 17:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 17:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'old-dominion' and a.slug = 'james-madison')
    or (h.slug = 'james-madison' and a.slug = 'old-dominion'))
  and g.week = 4;

-- Delaware @ Virginia · Sat 2026-09-26 17:00 CT · ACC Network · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 17:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'virginia' and a.slug = 'delaware')
    or (h.slug = 'delaware' and a.slug = 'virginia'))
  and g.week = 4;

-- Louisiana @ Charlotte · Sat 2026-09-26 17:30 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 17:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'charlotte' and a.slug = 'louisiana')
    or (h.slug = 'louisiana' and a.slug = 'charlotte'))
  and g.week = 4;

-- Central Michigan @ Miami · Sat 2026-09-26 17:30 CT · CW · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 17:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'miami' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'miami'))
  and g.week = 4;

-- South Carolina @ Alabama · Sat 2026-09-26 18:00 CT · ESPN · ALA -11.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'alabama' then 11.5 else -11.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'alabama' and a.slug = 'south-carolina')
    or (h.slug = 'south-carolina' and a.slug = 'alabama'))
  and g.week = 4;

-- Oklahoma State @ West Virginia · Sat 2026-09-26 18:00 CT · FS1 · OKST -2.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'west-virginia' then -2.5 else 2.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'west-virginia' and a.slug = 'oklahoma-state')
    or (h.slug = 'oklahoma-state' and a.slug = 'west-virginia'))
  and g.week = 4;

-- Southern Miss @ Tulane · Sat 2026-09-26 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulane' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'tulane'))
  and g.week = 4;

-- Kennesaw State @ Arkansas State · Sat 2026-09-26 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arkansas-state' and a.slug = 'kennesaw-state')
    or (h.slug = 'kennesaw-state' and a.slug = 'arkansas-state'))
  and g.week = 4;

-- Kansas State @ Cincinnati · Sat 2026-09-26 18:00 CT · ESPN2 · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'cincinnati' and a.slug = 'kansas-state')
    or (h.slug = 'kansas-state' and a.slug = 'cincinnati'))
  and g.week = 4;

-- Middle Tennessee @ Jacksonville State · Sat 2026-09-26 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'jacksonville-state' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'jacksonville-state'))
  and g.week = 4;

-- Texas A&M @ LSU · Sat 2026-09-26 18:30 CT · ABC · LSU -5.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'lsu' then 5.5 else -5.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'lsu' and a.slug = 'texas-am')
    or (h.slug = 'texas-am' and a.slug = 'lsu'))
  and g.week = 4;

-- Oregon @ USC · Sat 2026-09-26 18:30 CT · NBC · USC -2.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'usc' then 2.5 else -2.5 end,
    vegas_total = 62.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'oregon')
    or (h.slug = 'oregon' and a.slug = 'usc'))
  and g.week = 4;

-- App State @ NC State · Sat 2026-09-26 18:30 CT · ESPNU · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nc-state' and a.slug = 'app-state')
    or (h.slug = 'app-state' and a.slug = 'nc-state'))
  and g.week = 4;

-- Troy @ Utah State · Sat 2026-09-26 18:30 CT · CBSSN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utah-state' and a.slug = 'troy')
    or (h.slug = 'troy' and a.slug = 'utah-state'))
  and g.week = 4;

-- Arizona @ Washington State · Sat 2026-09-26 18:30 CT · CBS · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington-state' and a.slug = 'arizona')
    or (h.slug = 'arizona' and a.slug = 'washington-state'))
  and g.week = 4;

-- Missouri @ Mississippi State · Sat 2026-09-26 18:45 CT · SEC Network · MSST -1.5 · CLEAR
update games g
set kickoff_at = timestamptz '2026-09-26 18:45:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'mississippi-state' then 1.5 else -1.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'mississippi-state' and a.slug = 'missouri')
    or (h.slug = 'missouri' and a.slug = 'mississippi-state'))
  and g.week = 4;

-- Florida Atlantic @ UL Monroe · Sat 2026-09-26 19:00 CT · ESPN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 19:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ul-monroe' and a.slug = 'florida-atlantic')
    or (h.slug = 'florida-atlantic' and a.slug = 'ul-monroe'))
  and g.week = 4;

-- Tulsa @ Arkansas · Sat 2026-09-26 19:00 CT · SECN+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 19:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SECN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arkansas' and a.slug = 'tulsa')
    or (h.slug = 'tulsa' and a.slug = 'arkansas'))
  and g.week = 4;

-- Missouri State @ SMU · Sat 2026-09-26 20:00 CT · ACC Network · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 20:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'smu' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'smu'))
  and g.week = 4;

-- Oregon State @ UTEP · Sat 2026-09-26 20:00 CT · MW+ · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 20:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utep' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'utep'))
  and g.week = 4;

-- Rice @ Fresno State · Sat 2026-09-26 21:00 CT · CW · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 21:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'fresno-state' and a.slug = 'rice')
    or (h.slug = 'rice' and a.slug = 'fresno-state'))
  and g.week = 4;

-- Air Force @ Nevada · Sat 2026-09-26 21:30 CT · FS1 · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 21:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nevada' and a.slug = 'air-force')
    or (h.slug = 'air-force' and a.slug = 'nevada'))
  and g.week = 4;

-- Georgia Tech @ Stanford · Sat 2026-09-26 21:30 CT · ESPN · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 21:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'stanford' and a.slug = 'georgia-tech')
    or (h.slug = 'georgia-tech' and a.slug = 'stanford'))
  and g.week = 4;

-- Minnesota @ Washington · Sat 2026-09-26 22:00 CT · FOX · Vegas — · HOLD (Vegas)
update games g
set kickoff_at = timestamptz '2026-09-26 22:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington' and a.slug = 'minnesota')
    or (h.slug = 'minnesota' and a.slug = 'washington'))
  and g.week = 4;
