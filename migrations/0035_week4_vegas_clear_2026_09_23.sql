-- Week 4 FBS–FBS Vegas + kick/TV refresh from Research CLEAR pack
-- data/week4_vegas_clear_pack_2026-09-23.json (as_of 2026-09-23 15:35 CT).
-- Supersedes 0031_week4_kick_tv_vegas.sql (Sep 17 archive: 43 blank Vegas; Boise and Houston Fri 23:00 CT).
-- vegas_details is the DraftKings favorite line (e.g. LIB -2.5). Pack vegas_spread is that
-- favorite's signed number (always negative) — not home-relative. Do not negate it.
-- SQL stores the board convention: positive = home favored.
-- Favorite abbrev is matched to the Sep 17 ESPN home_short / away_short (AF aliases to AFA).
-- Match by home/away slug + week=4. games has no espn_event_id; the ESPN id is in the comment.
-- 57 CLEAR · 0 HOLD · 0 blank Vegas · 43 NEW · 14 MOVED · 2 kick fixes · 7 TV gains.
-- No scores. No HX writes. Featured Liberty @ Coastal stays Thu 18:30 CT · ESPN · LIB -2.5 / 50.5.

-- Liberty @ Coastal Carolina · Thu 2026-09-24 18:30 CT · ESPN · LIB -2.5 / O/U 50.5 · ESPN 401869941 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-24 18:30:00-05',
    kickoff_date = date '2026-09-24',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'coastal-carolina' then -2.5 else 2.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'coastal-carolina' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'coastal-carolina'))
  and g.week = 4;

-- Army @ Temple · Fri 2026-09-25 15:00 CT · ESPN · ARMY -3 / O/U 47.5 · ESPN 401862779 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-25 15:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'temple' then -3 else 3 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'temple' and a.slug = 'army')
    or (h.slug = 'army' and a.slug = 'temple'))
  and g.week = 4;

-- Navy @ UAB · Fri 2026-09-25 18:00 CT · ESPN · NAVY -7 / O/U 51.5 · ESPN 401862778 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-25 18:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'uab' then -7 else 7 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'uab' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'uab'))
  and g.week = 4;

-- Northwestern @ Indiana · Fri 2026-09-25 19:00 CT · FOX · IU -21 / O/U 49.5 · ESPN 401858461 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-25 19:00:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'indiana' then 21 else -21 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'indiana' and a.slug = 'northwestern')
    or (h.slug = 'northwestern' and a.slug = 'indiana'))
  and g.week = 4;

-- Clemson @ California · Fri 2026-09-25 21:30 CT · ESPN · CAL -1.5 / O/U 50.5 · ESPN 401858234 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-25 21:30:00-05',
    kickoff_date = date '2026-09-25',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'california' then 1.5 else -1.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'california' and a.slug = 'clemson')
    or (h.slug = 'clemson' and a.slug = 'california'))
  and g.week = 4;

-- Texas @ Tennessee · Sat 2026-09-26 11:00 CT · ABC · TEX -4.5 / O/U 55.5 · ESPN 401856704 · MOVED vs Sep 17: was TEX -4.5 / O/U 56.5 → TEX -4.5 / O/U 55.5
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'tennessee' then -4.5 else 4.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tennessee' and a.slug = 'texas')
    or (h.slug = 'texas' and a.slug = 'tennessee'))
  and g.week = 4;

-- Sam Houston @ Texas Tech · Sat 2026-09-26 11:00 CT · TNT · TTU -34.5 / O/U 55.5 · ESPN 401856805 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'TNT',
    vegas_spread = case when h.slug = 'texas-tech' then 34.5 else -34.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-tech' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'texas-tech'))
  and g.week = 4;

-- Colorado @ Baylor · Sat 2026-09-26 11:00 CT · ESPN2 · BAY -10 / O/U 55.5 · ESPN 401856813 · NEW line vs Sep 17 pack (was blank); TV GAIN: — → ESPN2
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'baylor' then 10 else -10 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'baylor' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'baylor'))
  and g.week = 4;

-- Virginia Tech @ Boston College · Sat 2026-09-26 11:00 CT · ACC Network · VT -14 / O/U 48.5 · ESPN 401858242 · NEW line vs Sep 17 pack (was blank); TV GAIN: — → ACC Network
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ACC Network',
    vegas_spread = case when h.slug = 'boston-college' then -14 else 14 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'boston-college' and a.slug = 'virginia-tech')
    or (h.slug = 'virginia-tech' and a.slug = 'boston-college'))
  and g.week = 4;

-- Wake Forest @ Louisville · Sat 2026-09-26 11:00 CT · ESPN · LOU -12.5 / O/U 58.5 · ESPN 401858243 · NEW line vs Sep 17 pack (was blank); TV GAIN: — → ESPN
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'louisville' then 12.5 else -12.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisville' and a.slug = 'wake-forest')
    or (h.slug = 'wake-forest' and a.slug = 'louisville'))
  and g.week = 4;

-- Illinois @ Ohio State · Sat 2026-09-26 11:00 CT · FOX · OSU -26.5 / O/U 53.5 · ESPN 401858465 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'ohio-state' then 26.5 else -26.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio-state' and a.slug = 'illinois')
    or (h.slug = 'illinois' and a.slug = 'ohio-state'))
  and g.week = 4;

-- San Diego State @ Toledo · Sat 2026-09-26 11:00 CT · CBSSN · TOL -3 / O/U 51.5 · ESPN 401860893 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'toledo' then 3 else -3 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'toledo' and a.slug = 'san-diego-state')
    or (h.slug = 'san-diego-state' and a.slug = 'toledo'))
  and g.week = 4;

-- Colorado State @ UTSA · Sat 2026-09-26 11:00 CT · ESPNU · UTSA -13.5 / O/U 58.5 · ESPN 401860896 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'utsa' then 13.5 else -13.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utsa' and a.slug = 'colorado-state')
    or (h.slug = 'colorado-state' and a.slug = 'utsa'))
  and g.week = 4;

-- UNLV @ Akron · Sat 2026-09-26 11:00 CT · ESPN+ · UNLV -13.5 / O/U 52.5 · ESPN 401864512 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'akron' then -13.5 else 13.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'akron' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'akron'))
  and g.week = 4;

-- Ball State @ Kent State · Sat 2026-09-26 11:00 CT · ESPN+ · KENT -3.5 / O/U 50.5 · ESPN 401866425 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'kent-state' then 3.5 else -3.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kent-state' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'kent-state'))
  and g.week = 4;

-- South Alabama @ Kentucky · Sat 2026-09-26 11:45 CT · SEC Network · UK -20.5 / O/U 54.5 · ESPN 401864576 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 11:45:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'kentucky' then 20.5 else -20.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kentucky' and a.slug = 'south-alabama')
    or (h.slug = 'south-alabama' and a.slug = 'kentucky'))
  and g.week = 4;

-- UCLA @ Maryland · Sat 2026-09-26 12:30 CT · BTN · UCLA -1.5 / O/U 56.5 · ESPN 401858462 · MOVED vs Sep 17: was UCLA -1.5 / O/U 51.5 → UCLA -1.5 / O/U 56.5
update games g
set kickoff_at = timestamptz '2026-09-26 12:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'maryland' then -1.5 else 1.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'maryland' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'maryland'))
  and g.week = 4;

-- Notre Dame @ Purdue · Sat 2026-09-26 13:00 CT · Peacock · ND -27.5 / O/U 58.5 · ESPN 401858467 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 13:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'Peacock',
    vegas_spread = case when h.slug = 'purdue' then -27.5 else 27.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'purdue' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'purdue'))
  and g.week = 4;

-- Northern Illinois @ Georgia State · Sat 2026-09-26 13:00 CT · ESPN+ · GAST -10.5 / O/U 55.5 · ESPN 401864511 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 13:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'georgia-state' then 10.5 else -10.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-state' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'georgia-state'))
  and g.week = 4;

-- Hawaiʻi @ Wyoming · Sat 2026-09-26 14:00 CT · CW · HAW -3 / O/U 44.5 · ESPN 401864510 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 14:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CW',
    vegas_spread = case when h.slug = 'wyoming' then -3 else 3 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wyoming' and a.slug = 'hawaii')
    or (h.slug = 'hawaii' and a.slug = 'wyoming'))
  and g.week = 4;

-- Ole Miss @ Florida · Sat 2026-09-26 14:30 CT · ABC · FLA -3.5 / O/U 58.5 · ESPN 401856699 · MOVED vs Sep 17: was FLA -1.5 / O/U 57.5 → FLA -3.5 / O/U 58.5; TV GAIN: — → ABC
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'florida' then 3.5 else -3.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida' and a.slug = 'ole-miss')
    or (h.slug = 'ole-miss' and a.slug = 'florida'))
  and g.week = 4;

-- Oklahoma @ Georgia · Sat 2026-09-26 14:30 CT · ESPN · UGA -14 / O/U 44.5 · ESPN 401856700 · MOVED vs Sep 17: was UGA -13.5 / O/U 47.5 → UGA -14 / O/U 44.5; TV GAIN: — → ESPN
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'georgia' then 14 else -14 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia' and a.slug = 'oklahoma')
    or (h.slug = 'oklahoma' and a.slug = 'georgia'))
  and g.week = 4;

-- TCU @ UCF · Sat 2026-09-26 14:30 CT · FS1 · TCU -3 / O/U 48.5 · ESPN 401856815 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'ucf' then -3 else 3 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ucf' and a.slug = 'tcu')
    or (h.slug = 'tcu' and a.slug = 'ucf'))
  and g.week = 4;

-- Utah @ Iowa State · Sat 2026-09-26 14:30 CT · FOX · UTAH -8.5 / O/U 48.5 · ESPN 401856816 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'iowa-state' then -8.5 else 8.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa-state' and a.slug = 'utah')
    or (h.slug = 'utah' and a.slug = 'iowa-state'))
  and g.week = 4;

-- Iowa @ Michigan · Sat 2026-09-26 14:30 CT · CBS · MICH -5.5 / O/U 38.5 · ESPN 401858463 · MOVED vs Sep 17: was MICH -4.5 / O/U 39.5 → MICH -5.5 / O/U 38.5
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'michigan' then 5.5 else -5.5 end,
    vegas_total = 38.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan' and a.slug = 'iowa')
    or (h.slug = 'iowa' and a.slug = 'michigan'))
  and g.week = 4;

-- Boise State @ Western Michigan · Sat 2026-09-26 14:30 CT · ESPN2 · BOIS -7 / O/U 50.5 · ESPN 401860897 · MOVED vs Sep 17: was BOIS -7.5 / O/U 47.5 → BOIS -7 / O/U 50.5; KICK CORRECTION vs Sep 17 pack: 2026-09-25 23:00 Fri → 2026-09-26 14:30 Sat; TV GAIN: — → ESPN2
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'western-michigan' then -7 else 7 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'western-michigan' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'western-michigan'))
  and g.week = 4;

-- UConn @ Miami (OH) · Sat 2026-09-26 14:30 CT · ESPN+ · M-OH -3.5 / O/U 51.5 · ESPN 401861970 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'miami-oh' then 3.5 else -3.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'miami-oh' and a.slug = 'uconn')
    or (h.slug = 'uconn' and a.slug = 'miami-oh'))
  and g.week = 4;

-- New Mexico @ New Mexico State · Sat 2026-09-26 14:30 CT · CBSSN · UNM -11.5 / O/U 48.5 · ESPN 401864579 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 14:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'new-mexico-state' then -11.5 else 11.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico-state' and a.slug = 'new-mexico')
    or (h.slug = 'new-mexico' and a.slug = 'new-mexico-state'))
  and g.week = 4;

-- Houston @ Georgia Southern · Sat 2026-09-26 15:00 CT · ESPNU · HOU -18.5 / O/U 56.5 · ESPN 401856806 · NEW line vs Sep 17 pack (was blank); KICK CORRECTION vs Sep 17 pack: 2026-09-25 23:00 Fri → 2026-09-26 15:00 Sat; TV GAIN: — → ESPNU
update games g
set kickoff_at = timestamptz '2026-09-26 15:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'georgia-southern' then -18.5 else 18.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-southern' and a.slug = 'houston')
    or (h.slug = 'houston' and a.slug = 'georgia-southern'))
  and g.week = 4;

-- Vanderbilt @ Auburn · Sat 2026-09-26 15:15 CT · SEC Network · AUB -9.5 / O/U 55.5 · ESPN 401856698 · MOVED vs Sep 17: was AUB -8.5 / O/U 50.5 → AUB -9.5 / O/U 55.5
update games g
set kickoff_at = timestamptz '2026-09-26 15:15:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'auburn' then 9.5 else -9.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'auburn' and a.slug = 'vanderbilt')
    or (h.slug = 'vanderbilt' and a.slug = 'auburn'))
  and g.week = 4;

-- Nebraska @ Michigan State · Sat 2026-09-26 16:00 CT · BTN · NEB -5.5 / O/U 48.5 · ESPN 401858464 · MOVED vs Sep 17: was NEB -5.5 / O/U 52.5 → NEB -5.5 / O/U 48.5
update games g
set kickoff_at = timestamptz '2026-09-26 16:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'michigan-state' then -5.5 else 5.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan-state' and a.slug = 'nebraska')
    or (h.slug = 'nebraska' and a.slug = 'michigan-state'))
  and g.week = 4;

-- Wisconsin @ Penn State · Sat 2026-09-26 16:00 CT · Peacock · PSU -10 / O/U 44.5 · ESPN 401858466 · MOVED vs Sep 17: was PSU -11.5 / O/U 42.5 → PSU -10 / O/U 44.5
update games g
set kickoff_at = timestamptz '2026-09-26 16:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'Peacock',
    vegas_spread = case when h.slug = 'penn-state' then 10 else -10 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'penn-state' and a.slug = 'wisconsin')
    or (h.slug = 'wisconsin' and a.slug = 'penn-state'))
  and g.week = 4;

-- South Florida @ Bowling Green · Sat 2026-09-26 16:00 CT · ESPN+ · USF -17.5 / O/U 48.5 · ESPN 401862785 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 16:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'bowling-green' then -17.5 else 17.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'bowling-green' and a.slug = 'usf')
    or (h.slug = 'usf' and a.slug = 'bowling-green'))
  and g.week = 4;

-- Delaware @ Virginia · Sat 2026-09-26 17:00 CT · ACC Network · UVA -19.5 / O/U 52.5 · ESPN 401858239 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 17:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ACC Network',
    vegas_spread = case when h.slug = 'virginia' then 19.5 else -19.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'virginia' and a.slug = 'delaware')
    or (h.slug = 'delaware' and a.slug = 'virginia'))
  and g.week = 4;

-- James Madison @ Old Dominion · Sat 2026-09-26 17:00 CT · ESPN+ · JMU -6 / O/U 44.5 · ESPN 401869961 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 17:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'old-dominion' then -6 else 6 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'old-dominion' and a.slug = 'james-madison')
    or (h.slug = 'james-madison' and a.slug = 'old-dominion'))
  and g.week = 4;

-- Central Michigan @ Miami · Sat 2026-09-26 17:30 CT · CW · MIA -41.5 / O/U 53.5 · ESPN 401858238 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 17:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CW',
    vegas_spread = case when h.slug = 'miami' then 41.5 else -41.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'miami' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'miami'))
  and g.week = 4;

-- Louisiana @ Charlotte · Sat 2026-09-26 17:30 CT · ESPN+ · UL -10 / O/U 48.5 · ESPN 401862780 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 17:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'charlotte' then -10 else 10 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'charlotte' and a.slug = 'louisiana')
    or (h.slug = 'louisiana' and a.slug = 'charlotte'))
  and g.week = 4;

-- South Carolina @ Alabama · Sat 2026-09-26 18:00 CT · ESPN · ALA -12.5 / O/U 53.5 · ESPN 401856696 · MOVED vs Sep 17: was ALA -11.5 / O/U 46.5 → ALA -12.5 / O/U 53.5
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'alabama' then 12.5 else -12.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'alabama' and a.slug = 'south-carolina')
    or (h.slug = 'south-carolina' and a.slug = 'alabama'))
  and g.week = 4;

-- Kansas State @ Cincinnati · Sat 2026-09-26 18:00 CT · ESPN2 · KSU -6.5 / O/U 55.5 · ESPN 401856814 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'cincinnati' then -6.5 else 6.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'cincinnati' and a.slug = 'kansas-state')
    or (h.slug = 'kansas-state' and a.slug = 'cincinnati'))
  and g.week = 4;

-- Oklahoma State @ West Virginia · Sat 2026-09-26 18:00 CT · FS1 · WVU -1.5 / O/U 60.5 · ESPN 401856881 · MOVED vs Sep 17: was OKST -2.5 / O/U 57.5 → WVU -1.5 / O/U 60.5
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'west-virginia' then 1.5 else -1.5 end,
    vegas_total = 60.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'west-virginia' and a.slug = 'oklahoma-state')
    or (h.slug = 'oklahoma-state' and a.slug = 'west-virginia'))
  and g.week = 4;

-- Southern Miss @ Tulane · Sat 2026-09-26 18:00 CT · ESPN+ · TULN -18.5 / O/U 52.5 · ESPN 401862784 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'tulane' then 18.5 else -18.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulane' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'tulane'))
  and g.week = 4;

-- Kennesaw State @ Arkansas State · Sat 2026-09-26 18:00 CT · ESPN+ · ARST -6 / O/U 52.5 · ESPN 401869931 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'arkansas-state' then 6 else -6 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arkansas-state' and a.slug = 'kennesaw-state')
    or (h.slug = 'kennesaw-state' and a.slug = 'arkansas-state'))
  and g.week = 4;

-- Middle Tennessee @ Jacksonville State · Sat 2026-09-26 18:00 CT · ESPN+ · JXST -7 / O/U 51.5 · ESPN 401871048 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'jacksonville-state' then 7 else -7 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'jacksonville-state' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'jacksonville-state'))
  and g.week = 4;

-- Texas A&M @ LSU · Sat 2026-09-26 18:30 CT · ABC · LSU -8.5 / O/U 51.5 · ESPN 401856702 · MOVED vs Sep 17: was LSU -5.5 / O/U 54.5 → LSU -8.5 / O/U 51.5
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'lsu' then 8.5 else -8.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'lsu' and a.slug = 'texas-am')
    or (h.slug = 'texas-am' and a.slug = 'lsu'))
  and g.week = 4;

-- Arizona @ Washington State · Sat 2026-09-26 18:30 CT · CBS · ARIZ -10 / O/U 48.5 · ESPN 401856804 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'washington-state' then -10 else 10 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington-state' and a.slug = 'arizona')
    or (h.slug = 'arizona' and a.slug = 'washington-state'))
  and g.week = 4;

-- Oregon @ USC · Sat 2026-09-26 18:30 CT · NBC · ORE -3 / O/U 62.5 · ESPN 401858469 · MOVED vs Sep 17: was USC -2.5 / O/U 62.5 → ORE -3 / O/U 62.5
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'usc' then -3 else 3 end,
    vegas_total = 62.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'oregon')
    or (h.slug = 'oregon' and a.slug = 'usc'))
  and g.week = 4;

-- Troy @ Utah State · Sat 2026-09-26 18:30 CT · CBSSN · USU -3 / O/U 47.5 · ESPN 401860894 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'utah-state' then 3 else -3 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utah-state' and a.slug = 'troy')
    or (h.slug = 'troy' and a.slug = 'utah-state'))
  and g.week = 4;

-- App State @ NC State · Sat 2026-09-26 18:30 CT · ESPNU · NCSU -14 / O/U 55.5 · ESPN 401864572 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 18:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'nc-state' then 14 else -14 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nc-state' and a.slug = 'app-state')
    or (h.slug = 'app-state' and a.slug = 'nc-state'))
  and g.week = 4;

-- Missouri @ Mississippi State · Sat 2026-09-26 18:45 CT · SEC Network · MSST -6.5 / O/U 58.5 · ESPN 401856703 · MOVED vs Sep 17: was MSST -1.5 / O/U 56.5 → MSST -6.5 / O/U 58.5
update games g
set kickoff_at = timestamptz '2026-09-26 18:45:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'mississippi-state' then 6.5 else -6.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'mississippi-state' and a.slug = 'missouri')
    or (h.slug = 'missouri' and a.slug = 'mississippi-state'))
  and g.week = 4;

-- Tulsa @ Arkansas · Sat 2026-09-26 19:00 CT · SECN+ · ARK -7 / O/U 50.5 · ESPN 401856697 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 19:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'SECN+',
    vegas_spread = case when h.slug = 'arkansas' then 7 else -7 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arkansas' and a.slug = 'tulsa')
    or (h.slug = 'tulsa' and a.slug = 'arkansas'))
  and g.week = 4;

-- Florida Atlantic @ UL Monroe · Sat 2026-09-26 19:00 CT · ESPN+ · FAU -13.5 / O/U 57.5 · ESPN 401862782 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 19:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'ul-monroe' then -13.5 else 13.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ul-monroe' and a.slug = 'florida-atlantic')
    or (h.slug = 'florida-atlantic' and a.slug = 'ul-monroe'))
  and g.week = 4;

-- Missouri State @ SMU · Sat 2026-09-26 20:00 CT · ACC Network · SMU -34.5 / O/U 59.5 · ESPN 401858241 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 20:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ACC Network',
    vegas_spread = case when h.slug = 'smu' then 34.5 else -34.5 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'smu' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'smu'))
  and g.week = 4;

-- Oregon State @ UTEP · Sat 2026-09-26 20:00 CT · MW+ · ORST -10.5 / O/U 55.5 · ESPN 401860895 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 20:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'MW+',
    vegas_spread = case when h.slug = 'utep' then -10.5 else 10.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utep' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'utep'))
  and g.week = 4;

-- Rice @ Fresno State · Sat 2026-09-26 21:00 CT · CW · FRES -13.5 / O/U 44.5 · ESPN 401860891 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 21:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'CW',
    vegas_spread = case when h.slug = 'fresno-state' then 13.5 else -13.5 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'fresno-state' and a.slug = 'rice')
    or (h.slug = 'rice' and a.slug = 'fresno-state'))
  and g.week = 4;

-- Georgia Tech @ Stanford · Sat 2026-09-26 21:30 CT · ESPN · GT -3.5 / O/U 48.5 · ESPN 401858240 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 21:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'stanford' then -3.5 else 3.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'stanford' and a.slug = 'georgia-tech')
    or (h.slug = 'georgia-tech' and a.slug = 'stanford'))
  and g.week = 4;

-- Air Force @ Nevada · Sat 2026-09-26 21:30 CT · FS1 · AF -5.5 / O/U 49.5 · ESPN 401864509 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 21:30:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'nevada' then -5.5 else 5.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nevada' and a.slug = 'air-force')
    or (h.slug = 'air-force' and a.slug = 'nevada'))
  and g.week = 4;

-- Minnesota @ Washington · Sat 2026-09-26 22:00 CT · FOX · WASH -10 / O/U 45.5 · ESPN 401858470 · NEW line vs Sep 17 pack (was blank)
update games g
set kickoff_at = timestamptz '2026-09-26 22:00:00-05',
    kickoff_date = date '2026-09-26',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'washington' then 10 else -10 end,
    vegas_total = 45.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington' and a.slug = 'minnesota')
    or (h.slug = 'minnesota' and a.slug = 'washington'))
  and g.week = 4;
