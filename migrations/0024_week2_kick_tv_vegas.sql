-- Week 2 FBS–FBS kick / TV / Vegas from Research pack
-- data/week2_fbs_fbs_kick_tv_vegas_2026.json (as_of 2026-09-10 21:53 CT).
-- Home-perspective Vegas: positive = home favored. TV abbreviations match Week 1.
-- Do not invent. FCS stays in JSON stubs (vegas_only_fcs_unrated) — not this file.
-- Featured pick: Ohio State @ Texas 401856682 · ABC · TEX −1.5.

-- Rutgers @ Boston College · Fri 2026-09-11 18:30 CT · ESPN2 · BC -3.5 · ESPN 401858214
update games g
set kickoff_at = timestamptz '2026-09-11 18:30:00-05',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'boston-college' then 3.5 else -3.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'boston-college' and a.slug = 'rutgers')
    or (h.slug = 'rutgers' and a.slug = 'boston-college'))
  and g.week = 2;

-- Missouri @ Kansas · Fri 2026-09-11 19:00 CT · FOX · MIZ -5.5 · ESPN 401856678
update games g
set kickoff_at = timestamptz '2026-09-11 19:00:00-05',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'kansas' then -5.5 else 5.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kansas' and a.slug = 'missouri')
    or (h.slug = 'missouri' and a.slug = 'kansas'))
  and g.week = 2;

-- South Florida @ Army · Sat 2026-09-12 11:00 CT · CBSSN · ARMY -3.5 · ESPN 401862702
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'army' then 3.5 else -3.5 end,
    vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'army' and a.slug = 'usf')
    or (h.slug = 'usf' and a.slug = 'army'))
  and g.week = 2;

-- App State @ East Carolina · Sat 2026-09-12 11:00 CT · ESPNU · ECU -6.5 · ESPN 401864571
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'east-carolina' then 6.5 else -6.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'east-carolina' and a.slug = 'app-state')
    or (h.slug = 'app-state' and a.slug = 'east-carolina'))
  and g.week = 2;

-- Washington State @ Kansas State · Sat 2026-09-12 11:00 CT · TNT · KSU -17.5 · ESPN 401856781
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'TNT',
    vegas_spread = case when h.slug = 'kansas-state' then 17.5 else -17.5 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kansas-state' and a.slug = 'washington-state')
    or (h.slug = 'washington-state' and a.slug = 'kansas-state'))
  and g.week = 2;

-- Oklahoma @ Michigan · Sat 2026-09-12 11:00 CT · FOX · OU -5.5 · ESPN 401856679
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'michigan' then -5.5 else 5.5 end,
    vegas_total = 43.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan' and a.slug = 'oklahoma')
    or (h.slug = 'oklahoma' and a.slug = 'michigan'))
  and g.week = 2;

-- Oregon @ Oklahoma State · Sat 2026-09-12 11:00 CT · ESPN · ORE -23.5 · ESPN 401856782
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'oklahoma-state' then -23.5 else 23.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oklahoma-state' and a.slug = 'oregon')
    or (h.slug = 'oregon' and a.slug = 'oklahoma-state'))
  and g.week = 2;

-- Wake Forest @ Purdue · Sat 2026-09-12 11:00 CT · FS1 · WAKE -3 · ESPN 401858224
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'purdue' then -3 else 3 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'purdue' and a.slug = 'wake-forest')
    or (h.slug = 'wake-forest' and a.slug = 'purdue'))
  and g.week = 2;

-- Arizona State @ Texas A&M · Sat 2026-09-12 11:00 CT · ABC · TA&M -15.5 · ESPN 401856683
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'texas-am' then 15.5 else -15.5 end,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-am' and a.slug = 'arizona-state')
    or (h.slug = 'arizona-state' and a.slug = 'texas-am'))
  and g.week = 2;

-- Penn State @ Temple · Sat 2026-09-12 11:00 CT · ESPN2 · PSU -23.5 · ESPN 401858442
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'temple' then -23.5 else 23.5 end,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'temple' and a.slug = 'penn-state')
    or (h.slug = 'penn-state' and a.slug = 'temple'))
  and g.week = 2;

-- Old Dominion @ Virginia Tech · Sat 2026-09-12 11:00 CT · CW · VT -18.5 · ESPN 401858221
update games g
set kickoff_at = timestamptz '2026-09-12 11:00:00-05',
    tv = 'CW',
    vegas_spread = case when h.slug = 'virginia-tech' then 18.5 else -18.5 end,
    vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'virginia-tech' and a.slug = 'old-dominion')
    or (h.slug = 'old-dominion' and a.slug = 'virginia-tech'))
  and g.week = 2;

-- Western Kentucky @ Georgia · Sat 2026-09-12 11:45 CT · SECN · UGA -40.5 · ESPN 401856673
update games g
set kickoff_at = timestamptz '2026-09-12 11:45:00-05',
    tv = 'SECN',
    vegas_spread = case when h.slug = 'georgia' then 40.5 else -40.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'georgia'))
  and g.week = 2;

-- Arizona @ BYU · Sat 2026-09-12 14:30 CT · FOX · BYU -7.5 · ESPN 401856810
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'byu' then 7.5 else -7.5 end,
    vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'byu' and a.slug = 'arizona')
    or (h.slug = 'arizona' and a.slug = 'byu'))
  and g.week = 2;

-- Maryland @ UConn · Sat 2026-09-12 14:30 CT · CBSSN · MD -11.5 · ESPN 401858444
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'uconn' then -11.5 else 11.5 end,
    vegas_total = 52.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'uconn' and a.slug = 'maryland')
    or (h.slug = 'maryland' and a.slug = 'uconn'))
  and g.week = 2;

-- Duke @ Illinois · Sat 2026-09-12 14:30 CT · FS1 · ILL -5.5 · ESPN 401858217
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'illinois' then 5.5 else -5.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'illinois' and a.slug = 'duke')
    or (h.slug = 'duke' and a.slug = 'illinois'))
  and g.week = 2;

-- Mississippi State @ Minnesota · Sat 2026-09-12 14:30 CT · CBS · MSST -1.5 · ESPN 401856677
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'minnesota' then -1.5 else 1.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'minnesota' and a.slug = 'mississippi-state')
    or (h.slug = 'mississippi-state' and a.slug = 'minnesota'))
  and g.week = 2;

-- Eastern Michigan @ Michigan State · Sat 2026-09-12 14:30 CT · BTN · MSU -17.5 · ESPN 401858440
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'michigan-state' then 17.5 else -17.5 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan-state' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'michigan-state'))
  and g.week = 2;

-- Rice @ Notre Dame · Sat 2026-09-12 14:30 CT · NBC · ND -44.5 · ESPN 401859184
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'notre-dame' then 44.5 else -44.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'notre-dame' and a.slug = 'rice')
    or (h.slug = 'rice' and a.slug = 'notre-dame'))
  and g.week = 2;

-- UCF @ Pittsburgh · Sat 2026-09-12 14:30 CT · ESPN2 · PITT -7 · ESPN 401856790
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'pittsburgh' then 7 else -7 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'pittsburgh' and a.slug = 'ucf')
    or (h.slug = 'ucf' and a.slug = 'pittsburgh'))
  and g.week = 2;

-- California @ Syracuse · Sat 2026-09-12 14:30 CT · ACCN · SYR -3.5 · ESPN 401858216
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'ACCN',
    vegas_spread = case when h.slug = 'syracuse' then 3.5 else -3.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'syracuse' and a.slug = 'california')
    or (h.slug = 'california' and a.slug = 'syracuse'))
  and g.week = 2;

-- UTSA @ Texas State · Sat 2026-09-12 14:30 CT · CW · TXST -1.5 · ESPN 401860884
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'CW',
    vegas_spread = case when h.slug = 'texas-state' then 1.5 else -1.5 end,
    vegas_total = 66.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-state' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'texas-state'))
  and g.week = 2;

-- UL Monroe @ UAB · Sat 2026-09-12 14:30 CT · ESPN+ · UAB -10 · ESPN 401862708
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'uab' then 10 else -10 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'uab' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'uab'))
  and g.week = 2;

-- Alabama @ Kentucky · Sat 2026-09-12 14:30 CT · ABC · ALA -10 · ESPN 401856674
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'kentucky' then -10 else 10 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kentucky' and a.slug = 'alabama')
    or (h.slug = 'alabama' and a.slug = 'kentucky'))
  and g.week = 2;

-- Utah State @ Washington · Sat 2026-09-12 14:30 CT · BTN · WASH -27.5 · ESPN 401858446
update games g
set kickoff_at = timestamptz '2026-09-12 14:30:00-05',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'washington' then 27.5 else -27.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'washington'))
  and g.week = 2;

-- UNLV @ North Texas · Sat 2026-09-12 14:45 CT · ESPNU · UNLV -3 · ESPN 401862705
update games g
set kickoff_at = timestamptz '2026-09-12 14:45:00-05',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'north-texas' then -3 else 3 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'north-texas' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'north-texas'))
  and g.week = 2;

-- Delaware @ Vanderbilt · Sat 2026-09-12 15:15 CT · SECN · VAN -21 · ESPN 401856684
update games g
set kickoff_at = timestamptz '2026-09-12 15:15:00-05',
    tv = 'SECN',
    vegas_spread = case when h.slug = 'vanderbilt' then 21 else -21 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'vanderbilt' and a.slug = 'delaware')
    or (h.slug = 'delaware' and a.slug = 'vanderbilt'))
  and g.week = 2;

-- Memphis @ Boise State · Sat 2026-09-12 17:00 CT · USA · BOIS -8.5 · ESPN 401860881
update games g
set kickoff_at = timestamptz '2026-09-12 17:00:00-05',
    tv = 'USA',
    vegas_spread = case when h.slug = 'boise-state' then 8.5 else -8.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'boise-state' and a.slug = 'memphis')
    or (h.slug = 'memphis' and a.slug = 'boise-state'))
  and g.week = 2;

-- Buffalo @ Florida International · Sat 2026-09-12 17:00 CT · ESPN+ · FIU -10 · ESPN 401866414
update games g
set kickoff_at = timestamptz '2026-09-12 17:00:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'fiu' then 10 else -10 end,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'fiu' and a.slug = 'buffalo')
    or (h.slug = 'buffalo' and a.slug = 'fiu'))
  and g.week = 2;

-- Jacksonville State @ Ohio · Sat 2026-09-12 17:00 CT · ESPN+ · OHIO -2.5 · ESPN 401866418
update games g
set kickoff_at = timestamptz '2026-09-12 17:00:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'ohio' then 2.5 else -2.5 end,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio' and a.slug = 'jacksonville-state')
    or (h.slug = 'jacksonville-state' and a.slug = 'ohio'))
  and g.week = 2;

-- Tennessee @ Georgia Tech · Sat 2026-09-12 18:00 CT · ESPN · TENN -12.5 · ESPN 401856681
update games g
set kickoff_at = timestamptz '2026-09-12 18:00:00-05',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'georgia-tech' then -12.5 else 12.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-tech' and a.slug = 'tennessee')
    or (h.slug = 'tennessee' and a.slug = 'georgia-tech'))
  and g.week = 2;

-- Georgia State @ Kennesaw State · Sat 2026-09-12 18:00 CT · ESPN+ · KENN -7.5 · ESPN 401869955
update games g
set kickoff_at = timestamptz '2026-09-12 18:00:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'kennesaw-state' then 7.5 else -7.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kennesaw-state' and a.slug = 'georgia-state')
    or (h.slug = 'georgia-state' and a.slug = 'kennesaw-state'))
  and g.week = 2;

-- Middle Tennessee @ Marshall · Sat 2026-09-12 18:00 CT · ESPN+ · MRSH -13.5 · ESPN 401871045
update games g
set kickoff_at = timestamptz '2026-09-12 18:00:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'marshall' then 13.5 else -13.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'marshall' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'marshall'))
  and g.week = 2;

-- Bowling Green @ Nebraska · Sat 2026-09-12 18:00 CT · FS1 · NEB -30.5 · ESPN 401858441
update games g
set kickoff_at = timestamptz '2026-09-12 18:00:00-05',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'nebraska' then 30.5 else -30.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nebraska' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'nebraska'))
  and g.week = 2;

-- Tulsa @ Sam Houston · Sat 2026-09-12 18:00 CT · ESPN+ · TLSA -13.5 · ESPN 401862707
update games g
set kickoff_at = timestamptz '2026-09-12 18:00:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'sam-houston' then -13.5 else 13.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'sam-houston' and a.slug = 'tulsa')
    or (h.slug = 'tulsa' and a.slug = 'sam-houston'))
  and g.week = 2;

-- South Alabama @ Tulane · Sat 2026-09-12 18:00 CT · ESPN+ · TULN -9.5 · ESPN 401864575
update games g
set kickoff_at = timestamptz '2026-09-12 18:00:00-05',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'tulane' then 9.5 else -9.5 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulane' and a.slug = 'south-alabama')
    or (h.slug = 'south-alabama' and a.slug = 'tulane'))
  and g.week = 2;

-- San Diego State @ UCLA · Sat 2026-09-12 18:15 CT · BTN · UCLA -12.5 · ESPN 401858443
update games g
set kickoff_at = timestamptz '2026-09-12 18:15:00-05',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'ucla' then 12.5 else -12.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ucla' and a.slug = 'san-diego-state')
    or (h.slug = 'san-diego-state' and a.slug = 'ucla'))
  and g.week = 2;

-- Georgia Southern @ Clemson · Sat 2026-09-12 18:30 CT · ACCN · CLEM -19.5 · ESPN 401858219
update games g
set kickoff_at = timestamptz '2026-09-12 18:30:00-05',
    tv = 'ACCN',
    vegas_spread = case when h.slug = 'clemson' then 19.5 else -19.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'clemson' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'clemson'))
  and g.week = 2;

-- Navy @ Florida Atlantic · Sat 2026-09-12 18:30 CT · ESPNU · NAVY -4.5 · ESPN 401862703
update games g
set kickoff_at = timestamptz '2026-09-12 18:30:00-05',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'florida-atlantic' then -4.5 else 4.5 end,
    vegas_total = 58.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida-atlantic' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'florida-atlantic'))
  and g.week = 2;

-- Iowa State @ Iowa · Sat 2026-09-12 18:30 CT · NBC · IOWA -14 · ESPN 401856788
update games g
set kickoff_at = timestamptz '2026-09-12 18:30:00-05',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'iowa' then 14 else -14 end,
    vegas_total = 40.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa' and a.slug = 'iowa-state')
    or (h.slug = 'iowa-state' and a.slug = 'iowa'))
  and g.week = 2;

-- Louisiana Tech @ LSU · Sat 2026-09-12 18:30 CT · SECN+ · LSU -35.5 · ESPN 401867796
update games g
set kickoff_at = timestamptz '2026-09-12 18:30:00-05',
    tv = 'SECN+',
    vegas_spread = case when h.slug = 'lsu' then 35.5 else -35.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'lsu' and a.slug = 'louisiana-tech')
    or (h.slug = 'louisiana-tech' and a.slug = 'lsu'))
  and g.week = 2;

-- Texas Tech @ Oregon State · Sat 2026-09-12 18:30 CT · CBS · TTU -26.5 · ESPN 401856783
update games g
set kickoff_at = timestamptz '2026-09-12 18:30:00-05',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'oregon-state' then -26.5 else 26.5 end,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oregon-state' and a.slug = 'texas-tech')
    or (h.slug = 'texas-tech' and a.slug = 'oregon-state'))
  and g.week = 2;

-- Ohio State @ Texas · Sat 2026-09-12 18:30 CT · ABC · TEX -1.5 · ESPN 401856682
update games g
set kickoff_at = timestamptz '2026-09-12 18:30:00-05',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'texas' then 1.5 else -1.5 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas' and a.slug = 'ohio-state')
    or (h.slug = 'ohio-state' and a.slug = 'texas'))
  and g.week = 2;

-- Southern Miss @ Auburn · Sat 2026-09-12 18:45 CT · SECN · AUB -32.5 · ESPN 401856671
update games g
set kickoff_at = timestamptz '2026-09-12 18:45:00-05',
    tv = 'SECN',
    vegas_spread = case when h.slug = 'auburn' then 32.5 else -32.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'auburn' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'auburn'))
  and g.week = 2;

-- Charlotte @ Ole Miss · Sat 2026-09-12 18:45 CT · ESPN2 · MISS -45.5 · ESPN 401856676
update games g
set kickoff_at = timestamptz '2026-09-12 18:45:00-05',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'ole-miss' then 45.5 else -45.5 end,
    vegas_total = 60.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ole-miss' and a.slug = 'charlotte')
    or (h.slug = 'charlotte' and a.slug = 'ole-miss'))
  and g.week = 2;

-- Arkansas @ Utah · Sat 2026-09-12 21:15 CT · ESPN · UTAH -12.5 · ESPN 401856670
update games g
set kickoff_at = timestamptz '2026-09-12 21:15:00-05',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'utah' then 12.5 else -12.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utah' and a.slug = 'arkansas')
    or (h.slug = 'arkansas' and a.slug = 'utah'))
  and g.week = 2;

-- Louisiana @ USC · Sat 2026-09-12 22:00 CT · BTN · USC -31.5 · ESPN 401858445
update games g
set kickoff_at = timestamptz '2026-09-12 22:00:00-05',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'usc' then 31.5 else -31.5 end,
    vegas_total = 59.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'louisiana')
    or (h.slug = 'louisiana' and a.slug = 'usc'))
  and g.week = 2;

-- New Mexico State @ Hawai'i · Sat 2026-09-12 22:59 CT · MW+ · HAW -7 · ESPN 401864578
update games g
set kickoff_at = timestamptz '2026-09-12 22:59:00-05',
    tv = 'MW+',
    vegas_spread = case when h.slug = 'hawaii' then 7 else -7 end,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'hawaii' and a.slug = 'new-mexico-state')
    or (h.slug = 'new-mexico-state' and a.slug = 'hawaii'))
  and g.week = 2;
