-- Week 5 FBS–FBS kick / TV / Vegas from Research CLEAR pack
-- data/week5_fbs_fbs_kick_tv_vegas_2026.json (as_of 2026-09-24 10:31 CT).
-- Memo: data/week5_fbs_fbs_kick_tv_vegas_2026.md.
-- vegas_details is the DraftKings favorite line (e.g. VT -5.5).
-- SQL stores the board convention: positive = home favored.
-- Favorite abbrev is matched to the pack home_short / away_short on that card.
-- Do not copy pack vegas_spread — Week 5 values are home-relative
-- (negative often = home favored), the opposite of this board.
-- Match by home/away slug + week=5. ESPN id is comment-only; the games table has no event-id column.
-- kickoff_at / kickoff_date use ESPN America/Chicago civil time (kick_iso), not the HM day label.
-- HOLD kick (timeValid=false): stamp Vegas only. Leave kickoff_at and kickoff_date untouched.
-- Those four cards carry a midnight UTC placeholder, not a kick. Do not invent a time.
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- Every site on this slate is the home stadium.
-- 55 updates · 6 CLEAR · 49 HOLD · 14 Vegas · 41 blank Vegas · 10 blank TV · 4 TBD kick.
-- Day-risk kicks (HM label ≠ ESPN CT weekday) use the ESPN CT kick:
--   WKU @ NMSU Thu 19:00 CT · UNT @ Tulsa Thu 20:00 CT · PSU @ Northwestern Fri 19:00 CT
--   IU @ Rutgers Sat 19:00 CT · Fresno @ WSU Sat 20:30 CT · Texas St @ SDSU Sat 21:30 CT
-- Week-scoped featured for /schedule?w=5: Pittsburgh @ Virginia Tech · Fri 18:00 CT · ESPN · VT -5.5 / 56.5.
-- Live desk stays Week 4. Liberty @ Coastal remains the homepage card. FCS extras are not in this stamp.

-- Western Kentucky @ New Mexico State · Thu 2026-10-01 19:00 CT · CBSSN · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Thu 2026-10-01 19:00 (HM Friday, Oct 2) · ESPN 401871049
update games g
set kickoff_at = timestamptz '2026-10-01 19:00:00-05',
    kickoff_date = date '2026-10-01',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico-state' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'new-mexico-state'))
  and g.week = 5;

-- North Texas @ Tulsa · Thu 2026-10-01 20:00 CT · ESPN · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Thu 2026-10-01 20:00 (HM Friday, Oct 2) · ESPN 401862786
update games g
set kickoff_at = timestamptz '2026-10-01 20:00:00-05',
    kickoff_date = date '2026-10-01',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulsa' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'tulsa'))
  and g.week = 5;

-- Liberty @ Delaware · Fri 2026-10-02 18:00 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401871050
update games g
set kickoff_at = timestamptz '2026-10-02 18:00:00-05',
    kickoff_date = date '2026-10-02',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'delaware' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'delaware'))
  and g.week = 5;

-- Pittsburgh @ Virginia Tech · Fri 2026-10-02 18:00 CT · ESPN · VT -5.5 / O/U 56.5 · STATUS_SCHEDULED · ESPN 401858245
update games g
set kickoff_at = timestamptz '2026-10-02 18:00:00-05',
    kickoff_date = date '2026-10-02',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'virginia-tech' then 5.5 else -5.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'virginia-tech' and a.slug = 'pittsburgh')
    or (h.slug = 'pittsburgh' and a.slug = 'virginia-tech'))
  and g.week = 5;

-- Penn State @ Northwestern · Fri 2026-10-02 19:00 CT · FOX · PSU -7 / O/U 48.5 · STATUS_SCHEDULED · day-risk: ESPN CT Fri 2026-10-02 19:00 (HM Saturday, Oct 3) · ESPN 401858476
update games g
set kickoff_at = timestamptz '2026-10-02 19:00:00-05',
    kickoff_date = date '2026-10-02',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'northwestern' then -7 else 7 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'northwestern' and a.slug = 'penn-state')
    or (h.slug = 'penn-state' and a.slug = 'northwestern'))
  and g.week = 5;

-- Boston College @ SMU · Sat 2026-10-03 11:00 CT · CW · Vegas — · HOLD (Vegas) · ESPN 401858246
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'smu' and a.slug = 'boston-college')
    or (h.slug = 'boston-college' and a.slug = 'smu'))
  and g.week = 5;

-- Michigan @ Minnesota · Sat 2026-10-03 11:00 CT · FOX · MICH -8.5 / O/U 44.5 · STATUS_SCHEDULED · ESPN 401858474
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'minnesota' then -8.5 else 8.5 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'minnesota' and a.slug = 'michigan')
    or (h.slug = 'michigan' and a.slug = 'minnesota'))
  and g.week = 5;

-- Middle Tennessee @ Kansas · Sat 2026-10-03 11:00 CT · ESPNU · Vegas — · HOLD (Vegas) · ESPN 401856807
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kansas' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'kansas'))
  and g.week = 5;

-- Navy @ Air Force · Sat 2026-10-03 11:00 CT · CBS · Vegas — · HOLD (Vegas) · ESPN 401862791
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'air-force' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'air-force'))
  and g.week = 5;

-- Stanford @ Wake Forest · Sat 2026-10-03 11:00 CT · ACC Network · Vegas — · HOLD (Vegas) · ESPN 401858251
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wake-forest' and a.slug = 'stanford')
    or (h.slug = 'stanford' and a.slug = 'wake-forest'))
  and g.week = 5;

-- Syracuse @ UConn · Sat 2026-10-03 11:00 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401858252
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'uconn' and a.slug = 'syracuse')
    or (h.slug = 'syracuse' and a.slug = 'uconn'))
  and g.week = 5;

-- UCF @ Houston · Sat 2026-10-03 11:00 CT · ESPN2 · Vegas — · HOLD (Vegas) · ESPN 401856819
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'houston' and a.slug = 'ucf')
    or (h.slug = 'ucf' and a.slug = 'houston'))
  and g.week = 5;

-- West Virginia @ Iowa State · Sat 2026-10-03 11:00 CT · TNT · Vegas — · HOLD (Vegas) · ESPN 401856822
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa-state' and a.slug = 'west-virginia')
    or (h.slug = 'west-virginia' and a.slug = 'iowa-state'))
  and g.week = 5;

-- Michigan State @ Wisconsin · Sat 2026-10-03 11:30 CT · BTN · Vegas — · HOLD (Vegas) · ESPN 401858479
update games g
set kickoff_at = timestamptz '2026-10-03 11:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wisconsin' and a.slug = 'michigan-state')
    or (h.slug = 'michigan-state' and a.slug = 'wisconsin'))
  and g.week = 5;

-- Western Michigan @ Buffalo · Sat 2026-10-03 12:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866432
update games g
set kickoff_at = timestamptz '2026-10-03 12:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'buffalo' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'buffalo'))
  and g.week = 5;

-- Toledo @ Ball State · Sat 2026-10-03 13:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866431
update games g
set kickoff_at = timestamptz '2026-10-03 13:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ball-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'ball-state'))
  and g.week = 5;

-- Akron @ Central Michigan · Sat 2026-10-03 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866430
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'central-michigan' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'central-michigan'))
  and g.week = 5;

-- Auburn @ Tennessee · Sat 2026-10-03 14:30 CT · TV — · TENN -7.5 / O/U 57.5 · HOLD (TV) · ESPN 401856710
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = case when h.slug = 'tennessee' then 7.5 else -7.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tennessee' and a.slug = 'auburn')
    or (h.slug = 'auburn' and a.slug = 'tennessee'))
  and g.week = 5;

-- Bowling Green @ Miami (OH) · Sat 2026-10-03 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866477
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'miami-oh' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'miami-oh'))
  and g.week = 5;

-- California @ UNLV · Sat 2026-10-03 14:30 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401858247
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'unlv' and a.slug = 'california')
    or (h.slug = 'california' and a.slug = 'unlv'))
  and g.week = 5;

-- Eastern Michigan @ Massachusetts · Sat 2026-10-03 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866433
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'massachusetts' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'massachusetts'))
  and g.week = 5;

-- Florida @ Missouri · Sat 2026-10-03 14:30 CT · TV — · FLA -2.5 / O/U 53.5 · HOLD (TV) · ESPN 401856708
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = case when h.slug = 'missouri' then -2.5 else 2.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'missouri' and a.slug = 'florida')
    or (h.slug = 'florida' and a.slug = 'missouri'))
  and g.week = 5;

-- Louisville @ NC State · Sat 2026-10-03 14:30 CT · TV — · LOU -7.5 / O/U 59.5 · HOLD (TV) · ESPN 401858248
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = case when h.slug = 'nc-state' then -7.5 else 7.5 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nc-state' and a.slug = 'louisville')
    or (h.slug = 'louisville' and a.slug = 'nc-state'))
  and g.week = 5;

-- Memphis @ Charlotte · Sat 2026-10-03 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401862787
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'charlotte' and a.slug = 'memphis')
    or (h.slug = 'memphis' and a.slug = 'charlotte'))
  and g.week = 5;

-- Ohio @ Kent State · Sat 2026-10-03 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866434
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kent-state' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'kent-state'))
  and g.week = 5;

-- Ohio State @ Iowa · Sat 2026-10-03 14:30 CT · CBS · OSU -14 / O/U 44.5 · STATUS_SCHEDULED · ESPN 401858473
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'iowa' then -14 else 14 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa' and a.slug = 'ohio-state')
    or (h.slug = 'ohio-state' and a.slug = 'iowa'))
  and g.week = 5;

-- Old Dominion @ Georgia State · Sat 2026-10-03 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869956
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-state' and a.slug = 'old-dominion')
    or (h.slug = 'old-dominion' and a.slug = 'georgia-state'))
  and g.week = 5;

-- Virginia @ Florida State · Sat 2026-10-03 14:30 CT · TV — · Vegas — · HOLD (TV/Vegas) · ESPN 401858253
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida-state' and a.slug = 'virginia')
    or (h.slug = 'virginia' and a.slug = 'florida-state'))
  and g.week = 5;

-- Marshall @ James Madison · Sat 2026-10-03 14:45 CT · ESPNU · Vegas — · HOLD (Vegas) · ESPN 401869962
update games g
set kickoff_at = timestamptz '2026-10-03 14:45:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'james-madison' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'james-madison'))
  and g.week = 5;

-- Maryland @ Nebraska · Sat 2026-10-03 15:00 CT · FS1 · Vegas — · HOLD (Vegas) · ESPN 401858475
update games g
set kickoff_at = timestamptz '2026-10-03 15:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nebraska' and a.slug = 'maryland')
    or (h.slug = 'maryland' and a.slug = 'nebraska'))
  and g.week = 5;

-- UTEP @ New Mexico · Sat 2026-10-03 15:00 CT · MW+ · Vegas — · HOLD (Vegas) · ESPN 401864514
update games g
set kickoff_at = timestamptz '2026-10-03 15:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'new-mexico'))
  and g.week = 5;

-- Kentucky @ South Carolina · Sat 2026-10-03 15:15 CT · SEC Network · SC -7 / O/U 49.5 · STATUS_SCHEDULED · ESPN 401856709
update games g
set kickoff_at = timestamptz '2026-10-03 15:15:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'south-carolina' then 7 else -7 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'south-carolina' and a.slug = 'kentucky')
    or (h.slug = 'kentucky' and a.slug = 'south-carolina'))
  and g.week = 5;

-- Purdue @ Illinois · Sat 2026-10-03 15:15 CT · BTN · Vegas — · HOLD (Vegas) · ESPN 401858472
update games g
set kickoff_at = timestamptz '2026-10-03 15:15:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'illinois' and a.slug = 'purdue')
    or (h.slug = 'purdue' and a.slug = 'illinois'))
  and g.week = 5;

-- Oregon State @ Colorado State · Sat 2026-10-03 17:00 CT · USA Net · Vegas — · HOLD (Vegas) · ESPN 401860899
update games g
set kickoff_at = timestamptz '2026-10-03 17:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'colorado-state' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'colorado-state'))
  and g.week = 5;

-- Arkansas @ Texas A&M · Sat 2026-10-03 18:00 CT · TV — · Vegas — · HOLD (TV/Vegas) · ESPN 401856711
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-am' and a.slug = 'arkansas')
    or (h.slug = 'arkansas' and a.slug = 'texas-am'))
  and g.week = 5;

-- BYU @ TCU · Sat 2026-10-03 18:00 CT · TV — · BYU -5.5 / O/U 52.5 · HOLD (TV) · ESPN 401856818
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = case when h.slug = 'tcu' then -5.5 else 5.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tcu' and a.slug = 'byu')
    or (h.slug = 'byu' and a.slug = 'tcu'))
  and g.week = 5;

-- Georgia Southern @ Coastal Carolina · Sat 2026-10-03 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869942
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'coastal-carolina' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'coastal-carolina'))
  and g.week = 5;

-- UL Monroe @ South Alabama · Sat 2026-10-03 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401871089
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'south-alabama' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'south-alabama'))
  and g.week = 5;

-- UTSA @ Rice · Sat 2026-10-03 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401862788
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'rice' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'rice'))
  and g.week = 5;

-- Army @ Louisiana Tech · Sat 2026-10-03 18:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869842
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisiana-tech' and a.slug = 'army')
    or (h.slug = 'army' and a.slug = 'louisiana-tech'))
  and g.week = 5;

-- Temple @ South Florida · Sat 2026-10-03 18:30 CT · ESPNU · Vegas — · HOLD (Vegas) · ESPN 401862792
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usf' and a.slug = 'temple')
    or (h.slug = 'temple' and a.slug = 'usf'))
  and g.week = 5;

-- Texas Tech @ Colorado · Sat 2026-10-03 18:30 CT · FOX · Vegas — · HOLD (Vegas) · ESPN 401856821
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'colorado' and a.slug = 'texas-tech')
    or (h.slug = 'texas-tech' and a.slug = 'colorado'))
  and g.week = 5;

-- Utah State @ Boise State · Sat 2026-10-03 18:30 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401860898
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'boise-state' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'boise-state'))
  and g.week = 5;

-- Washington @ USC · Sat 2026-10-03 18:30 CT · NBC · USC -10 / O/U 57.5 · STATUS_SCHEDULED · ESPN 401858478
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'usc' then 10 else -10 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'washington')
    or (h.slug = 'washington' and a.slug = 'usc'))
  and g.week = 5;

-- Arkansas State @ Louisiana · Sat 2026-10-03 19:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869932
update games g
set kickoff_at = timestamptz '2026-10-03 19:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisiana' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'louisiana'))
  and g.week = 5;

-- Indiana @ Rutgers · Sat 2026-10-03 19:00 CT · BTN · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Sat 2026-10-03 19:00 (HM Sunday, Oct 4) · ESPN 401858477
update games g
set kickoff_at = timestamptz '2026-10-03 19:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'rutgers' and a.slug = 'indiana')
    or (h.slug = 'indiana' and a.slug = 'rutgers'))
  and g.week = 5;

-- Fresno State @ Washington State · Sat 2026-10-03 20:30 CT · USA Net · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Sat 2026-10-03 20:30 (HM Sunday, Oct 4) · ESPN 401860921
update games g
set kickoff_at = timestamptz '2026-10-03 20:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington-state' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'washington-state'))
  and g.week = 5;

-- Baylor @ Arizona State · Sat 2026-10-03 21:30 CT · ESPN · Vegas — · HOLD (Vegas) · ESPN 401856817
update games g
set kickoff_at = timestamptz '2026-10-03 21:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arizona-state' and a.slug = 'baylor')
    or (h.slug = 'baylor' and a.slug = 'arizona-state'))
  and g.week = 5;

-- Texas State @ San Diego State · Sat 2026-10-03 21:30 CT · CW · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Sat 2026-10-03 21:30 (HM Sunday, Oct 4) · ESPN 401860900
update games g
set kickoff_at = timestamptz '2026-10-03 21:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'san-diego-state' and a.slug = 'texas-state')
    or (h.slug = 'texas-state' and a.slug = 'san-diego-state'))
  and g.week = 5;

-- Cincinnati @ Arizona · Sat 2026-10-03 22:00 CT · FOX · Vegas — · HOLD (Vegas) · ESPN 401856820
update games g
set kickoff_at = timestamptz '2026-10-03 22:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arizona' and a.slug = 'cincinnati')
    or (h.slug = 'cincinnati' and a.slug = 'arizona'))
  and g.week = 5;

-- San José State @ Hawaiʻi · Sat 2026-10-03 22:59 CT · MW+ · Vegas — · HOLD (Vegas) · ESPN 401864513
update games g
set kickoff_at = timestamptz '2026-10-03 22:59:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'hawaii' and a.slug = 'san-jose-state')
    or (h.slug = 'san-jose-state' and a.slug = 'hawaii'))
  and g.week = 5;

-- Alabama @ Mississippi State · TBD kick · TV — · ALA -3 / O/U 58.5 · HOLD (Kick/TV) · ESPN 401856707
update games g
set tv = null,
    vegas_spread = case when h.slug = 'mississippi-state' then -3 else 3 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'mississippi-state' and a.slug = 'alabama')
    or (h.slug = 'alabama' and a.slug = 'mississippi-state'))
  and g.week = 5;

-- Miami @ Clemson · TBD kick · TV — · MIA -17.5 / O/U 50.5 · HOLD (Kick/TV) · ESPN 401858249
update games g
set tv = null,
    vegas_spread = case when h.slug = 'clemson' then -17.5 else 17.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'clemson' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'clemson'))
  and g.week = 5;

-- Notre Dame @ North Carolina · TBD kick · TV — · ND -20.5 / O/U 49.5 · HOLD (Kick/TV) · ESPN 401858250
update games g
set tv = null,
    vegas_spread = case when h.slug = 'north-carolina' then -20.5 else 20.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'north-carolina' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'north-carolina'))
  and g.week = 5;

-- Vanderbilt @ Georgia · TBD kick · TV — · UGA -23.5 / O/U 57.5 · HOLD (Kick/TV) · ESPN 401856705
update games g
set tv = null,
    vegas_spread = case when h.slug = 'georgia' then 23.5 else -23.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia' and a.slug = 'vanderbilt')
    or (h.slug = 'vanderbilt' and a.slug = 'georgia'))
  and g.week = 5;
