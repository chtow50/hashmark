-- Week 6 FBS–FBS kick / TV / Vegas from Research CLEAR pack
-- data/week6_fbs_fbs_kick_tv_vegas_2026.json (as_of 2026-10-01 10:15 CT).
-- Memo: data/week6_fbs_fbs_kick_tv_vegas_2026.md.
-- Website verify: /workspace/cfb/week6_kick_tv_vegas_website_verify_2026-10-01.md.
-- vegas_details is the DraftKings favorite line (e.g. BYU -14.5).
-- Pack vegas_spread is home-perspective (negative = home favored).
-- SQL stores the board convention: positive = home favored.
-- board_vegas_spread = -pack.vegas_spread when the pack home matches.
-- Favorite abbrev is matched to the pack home_short / away_short on that card.
-- Match by home/away slug + week=6. ESPN id is comment-only; the games table has no event-id column.
-- kickoff_at / kickoff_date use ESPN America/Chicago civil time (kick_iso / kick_ct), not the HM day label.
-- HOLD kick (timeValid=false): stamp Vegas only when CLEAR. Leave kickoff_at and kickoff_date untouched.
-- Those cards carry a midnight UTC placeholder, not a kick. Do not invent a time.
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- Texas vs Oklahoma is neutral (Cotton Bowl). All other sites are the home stadium.
-- 56 updates · 9 CLEAR · 47 HOLD · 12 Vegas · 44 blank Vegas · 9 blank TV · 4 TBD kick.
-- Day-risk kicks (HM label ≠ ESPN CT weekday) use the ESPN CT kick:
--   USM @ Troy Tue 19:00 CT · Iowa @ Washington Fri 20:00 CT · WSU @ USU Fri 20:00 CT
--   Wyoming @ SJSU Fri 20:00 CT · Iowa State @ BYU Fri 21:15 CT · Boise @ Fresno Sat 21:30 CT
-- Week-scoped featured for /schedule?w=6: Iowa State @ BYU · Fri 21:15 CT · ESPN · BYU -14.5 / 50.5.
-- Live desk stays Week 5 (FEATURED_SLATE_WEEK = 5). Soft-cal FLAG stays.
-- Soft-cal FLAG / PR #46 Scenario Sim stay HOLD — do not touch them.

-- Southern Miss @ Troy · Tue 2026-10-06 19:00 CT · ESPN2 · TROY -8.5 / O/U 48.5 · STATUS_SCHEDULED · day-risk: ESPN CT Tue 2026-10-06 19:00 (HM Wednesday, Oct 7) · ESPN 401871090
update games g
set kickoff_at = timestamptz '2026-10-06 19:00:00-05',
    kickoff_date = date '2026-10-06',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'troy' then 8.5 else -8.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'troy' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'troy'))
  and g.week = 6;

-- Jacksonville State @ Kennesaw State · Wed 2026-10-07 18:00 CT · CBSSN · JXST -2.5 / O/U 48.5 · STATUS_SCHEDULED · ESPN 401871051
update games g
set kickoff_at = timestamptz '2026-10-07 18:00:00-05',
    kickoff_date = date '2026-10-07',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'kennesaw-state' then -2.5 else 2.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kennesaw-state' and a.slug = 'jacksonville-state')
    or (h.slug = 'jacksonville-state' and a.slug = 'kennesaw-state'))
  and g.week = 6;

-- New Mexico State @ FIU · Wed 2026-10-07 18:30 CT · ESPN2 · Vegas — · HOLD (Vegas) · ESPN 401871066
update games g
set kickoff_at = timestamptz '2026-10-07 18:30:00-05',
    kickoff_date = date '2026-10-07',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'fiu' and a.slug = 'new-mexico-state')
    or (h.slug = 'new-mexico-state' and a.slug = 'fiu'))
  and g.week = 6;

-- Missouri State @ Western Kentucky · Thu 2026-10-08 18:00 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401871052
update games g
set kickoff_at = timestamptz '2026-10-08 18:00:00-05',
    kickoff_date = date '2026-10-08',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'western-kentucky' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'western-kentucky'))
  and g.week = 6;

-- Sam Houston @ Liberty · Thu 2026-10-08 18:00 CT · ESPNU · Vegas — · HOLD (Vegas) · ESPN 401870766
update games g
set kickoff_at = timestamptz '2026-10-08 18:00:00-05',
    kickoff_date = date '2026-10-08',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'liberty' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'liberty'))
  and g.week = 6;

-- South Alabama @ Arkansas State · Thu 2026-10-08 18:30 CT · ESPN2 · Vegas — · HOLD (Vegas) · ESPN 401869933
update games g
set kickoff_at = timestamptz '2026-10-08 18:30:00-05',
    kickoff_date = date '2026-10-08',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arkansas-state' and a.slug = 'south-alabama')
    or (h.slug = 'south-alabama' and a.slug = 'arkansas-state'))
  and g.week = 6;

-- South Florida @ UTSA · Thu 2026-10-08 18:30 CT · ESPN · Vegas — · HOLD (Vegas) · ESPN 401862794
update games g
set kickoff_at = timestamptz '2026-10-08 18:30:00-05',
    kickoff_date = date '2026-10-08',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utsa' and a.slug = 'usf')
    or (h.slug = 'usf' and a.slug = 'utsa'))
  and g.week = 6;

-- Florida State @ Louisville · Fri 2026-10-09 18:00 CT · ESPN · Vegas — · HOLD (Vegas) · ESPN 401858254
update games g
set kickoff_at = timestamptz '2026-10-09 18:00:00-05',
    kickoff_date = date '2026-10-09',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisville' and a.slug = 'florida-state')
    or (h.slug = 'florida-state' and a.slug = 'louisville'))
  and g.week = 6;

-- Iowa @ Washington · Fri 2026-10-09 20:00 CT · TV — · WASH -1.5 / O/U 41.5 · HOLD (TV) · day-risk: ESPN CT Fri 2026-10-09 20:00 (HM Saturday, Oct 10) · ESPN 401858487
update games g
set kickoff_at = timestamptz '2026-10-09 20:00:00-05',
    kickoff_date = date '2026-10-09',
    tv = null,
    vegas_spread = case when h.slug = 'washington' then 1.5 else -1.5 end,
    vegas_total = 41.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington' and a.slug = 'iowa')
    or (h.slug = 'iowa' and a.slug = 'washington'))
  and g.week = 6;

-- Washington State @ Utah State · Fri 2026-10-09 20:00 CT · CW · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Fri 2026-10-09 20:00 (HM Saturday, Oct 10) · ESPN 401860922
update games g
set kickoff_at = timestamptz '2026-10-09 20:00:00-05',
    kickoff_date = date '2026-10-09',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utah-state' and a.slug = 'washington-state')
    or (h.slug = 'washington-state' and a.slug = 'utah-state'))
  and g.week = 6;

-- Wyoming @ San José State · Fri 2026-10-09 20:00 CT · CBSSN · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Fri 2026-10-09 20:00 (HM Saturday, Oct 10) · ESPN 401864519
update games g
set kickoff_at = timestamptz '2026-10-09 20:00:00-05',
    kickoff_date = date '2026-10-09',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'san-jose-state' and a.slug = 'wyoming')
    or (h.slug = 'wyoming' and a.slug = 'san-jose-state'))
  and g.week = 6;

-- Iowa State @ BYU · Fri 2026-10-09 21:15 CT · ESPN · BYU -14.5 / O/U 50.5 · STATUS_SCHEDULED · day-risk: ESPN CT Fri 2026-10-09 21:15 (HM Saturday, Oct 10) · ESPN 401856826
update games g
set kickoff_at = timestamptz '2026-10-09 21:15:00-05',
    kickoff_date = date '2026-10-09',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'byu' then 14.5 else -14.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'byu' and a.slug = 'iowa-state')
    or (h.slug = 'iowa-state' and a.slug = 'byu'))
  and g.week = 6;

-- Arizona @ West Virginia · Sat 2026-10-10 11:00 CT · TNT · Vegas — · HOLD (Vegas) · ESPN 401856823
update games g
set kickoff_at = timestamptz '2026-10-10 11:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'west-virginia' and a.slug = 'arizona')
    or (h.slug = 'arizona' and a.slug = 'west-virginia'))
  and g.week = 6;

-- Indiana @ Nebraska · Sat 2026-10-10 11:00 CT · FOX · IU -9.5 / O/U 50.5 · STATUS_SCHEDULED · ESPN 401858481
update games g
set kickoff_at = timestamptz '2026-10-10 11:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'nebraska' then -9.5 else 9.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nebraska' and a.slug = 'indiana')
    or (h.slug = 'indiana' and a.slug = 'nebraska'))
  and g.week = 6;

-- North Carolina @ Pittsburgh · Sat 2026-10-10 11:00 CT · TV — · Vegas — · HOLD (TV, Vegas) · ESPN 401858256
update games g
set kickoff_at = timestamptz '2026-10-10 11:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'pittsburgh' and a.slug = 'north-carolina')
    or (h.slug = 'north-carolina' and a.slug = 'pittsburgh'))
  and g.week = 6;

-- Tulane @ Army · Sat 2026-10-10 11:00 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401862795
update games g
set kickoff_at = timestamptz '2026-10-10 11:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'army' and a.slug = 'tulane')
    or (h.slug = 'tulane' and a.slug = 'army'))
  and g.week = 6;

-- UCF @ Oklahoma State · Sat 2026-10-10 11:00 CT · TV — · Vegas — · HOLD (TV, Vegas) · ESPN 401856824
update games g
set kickoff_at = timestamptz '2026-10-10 11:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oklahoma-state' and a.slug = 'ucf')
    or (h.slug = 'ucf' and a.slug = 'oklahoma-state'))
  and g.week = 6;

-- Wake Forest @ NC State · Sat 2026-10-10 11:00 CT · CW · Vegas — · HOLD (Vegas) · ESPN 401858260
update games g
set kickoff_at = timestamptz '2026-10-10 11:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nc-state' and a.slug = 'wake-forest')
    or (h.slug = 'wake-forest' and a.slug = 'nc-state'))
  and g.week = 6;

-- Ball State @ Northwestern · Sat 2026-10-10 11:30 CT · BTN · Vegas — · HOLD (Vegas) · ESPN 401858482
update games g
set kickoff_at = timestamptz '2026-10-10 11:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'northwestern' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'northwestern'))
  and g.week = 6;

-- Old Dominion @ App State · Sat 2026-10-10 12:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869843
update games g
set kickoff_at = timestamptz '2026-10-10 12:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'app-state' and a.slug = 'old-dominion')
    or (h.slug = 'old-dominion' and a.slug = 'app-state'))
  and g.week = 6;

-- Miami (OH) @ Massachusetts · Sat 2026-10-10 13:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866440
update games g
set kickoff_at = timestamptz '2026-10-10 13:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'massachusetts' and a.slug = 'miami-oh')
    or (h.slug = 'miami-oh' and a.slug = 'massachusetts'))
  and g.week = 6;

-- Buffalo @ Toledo · Sat 2026-10-10 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866437
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'toledo' and a.slug = 'buffalo')
    or (h.slug = 'buffalo' and a.slug = 'toledo'))
  and g.week = 6;

-- Central Michigan @ Ohio · Sat 2026-10-10 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866438
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'ohio'))
  and g.week = 6;

-- Charlotte @ North Texas · Sat 2026-10-10 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401862796
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'north-texas' and a.slug = 'charlotte')
    or (h.slug = 'charlotte' and a.slug = 'north-texas'))
  and g.week = 6;

-- Duke @ Georgia Tech · Sat 2026-10-10 14:30 CT · TV — · Vegas — · HOLD (TV, Vegas) · ESPN 401858255
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-tech' and a.slug = 'duke')
    or (h.slug = 'duke' and a.slug = 'georgia-tech'))
  and g.week = 6;

-- Eastern Michigan @ Akron · Sat 2026-10-10 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866435
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'akron' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'akron'))
  and g.week = 6;

-- Houston @ Kansas State · Sat 2026-10-10 14:30 CT · FOX · Vegas — · HOLD (Vegas) · ESPN 401856825
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kansas-state' and a.slug = 'houston')
    or (h.slug = 'houston' and a.slug = 'kansas-state'))
  and g.week = 6;

-- Illinois @ Michigan State · Sat 2026-10-10 14:30 CT · FS1 · Vegas — · HOLD (Vegas) · ESPN 401858480
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan-state' and a.slug = 'illinois')
    or (h.slug = 'illinois' and a.slug = 'michigan-state'))
  and g.week = 6;

-- Kent State @ Western Michigan · Sat 2026-10-10 14:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401866439
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'western-michigan' and a.slug = 'kent-state')
    or (h.slug = 'kent-state' and a.slug = 'western-michigan'))
  and g.week = 6;

-- Ole Miss @ Vanderbilt · Sat 2026-10-10 14:30 CT · ESPN · Vegas — · HOLD (Vegas) · ESPN 401856718
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'vanderbilt' and a.slug = 'ole-miss')
    or (h.slug = 'ole-miss' and a.slug = 'vanderbilt'))
  and g.week = 6;

-- Stanford @ Notre Dame · Sat 2026-10-10 14:30 CT · NBC · Vegas — · HOLD (Vegas) · ESPN 401858257
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'notre-dame' and a.slug = 'stanford')
    or (h.slug = 'stanford' and a.slug = 'notre-dame'))
  and g.week = 6;

-- Texas vs Oklahoma · Sat 2026-10-10 14:30 CT · ABC · TEX -9.5 / O/U 41.5 · STATUS_SCHEDULED · ESPN 401856717
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'oklahoma' then -9.5 else 9.5 end,
    vegas_total = 41.5,
    neutral = true
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oklahoma' and a.slug = 'texas')
    or (h.slug = 'texas' and a.slug = 'oklahoma'))
  and g.week = 6;

-- Tulsa @ Navy · Sat 2026-10-10 14:30 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401862799
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'navy' and a.slug = 'tulsa')
    or (h.slug = 'tulsa' and a.slug = 'navy'))
  and g.week = 6;

-- UCLA @ Oregon · Sat 2026-10-10 14:30 CT · CBS · ORE -12.5 / O/U 60.5 · STATUS_SCHEDULED · ESPN 401858484
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'oregon' then 12.5 else -12.5 end,
    vegas_total = 60.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oregon' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'oregon'))
  and g.week = 6;

-- Virginia Tech @ California · Sat 2026-10-10 14:30 CT · TV — · Vegas — · HOLD (TV, Vegas) · ESPN 401858259
update games g
set kickoff_at = timestamptz '2026-10-10 14:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'california' and a.slug = 'virginia-tech')
    or (h.slug = 'virginia-tech' and a.slug = 'california'))
  and g.week = 6;

-- UConn @ Temple · Sat 2026-10-10 14:45 CT · ESPNU · Vegas — · HOLD (Vegas) · ESPN 401861964
update games g
set kickoff_at = timestamptz '2026-10-10 14:45:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'temple' and a.slug = 'uconn')
    or (h.slug = 'uconn' and a.slug = 'temple'))
  and g.week = 6;

-- Rice @ East Carolina · Sat 2026-10-10 15:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401862797
update games g
set kickoff_at = timestamptz '2026-10-10 15:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'east-carolina' and a.slug = 'rice')
    or (h.slug = 'rice' and a.slug = 'east-carolina'))
  and g.week = 6;

-- Maryland @ Ohio State · Sat 2026-10-10 15:15 CT · BTN · Vegas — · HOLD (Vegas) · ESPN 401858483
update games g
set kickoff_at = timestamptz '2026-10-10 15:15:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio-state' and a.slug = 'maryland')
    or (h.slug = 'maryland' and a.slug = 'ohio-state'))
  and g.week = 6;

-- Tennessee @ Arkansas · Sat 2026-10-10 15:15 CT · SEC Network · Vegas — · HOLD (Vegas) · ESPN 401856713
update games g
set kickoff_at = timestamptz '2026-10-10 15:15:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arkansas' and a.slug = 'tennessee')
    or (h.slug = 'tennessee' and a.slug = 'arkansas'))
  and g.week = 6;

-- San Diego State @ Oregon State · Sat 2026-10-10 17:00 CT · USA Net · Vegas — · HOLD (Vegas) · ESPN 401860902
update games g
set kickoff_at = timestamptz '2026-10-10 17:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oregon-state' and a.slug = 'san-diego-state')
    or (h.slug = 'san-diego-state' and a.slug = 'oregon-state'))
  and g.week = 6;

-- Coastal Carolina @ Marshall · Sat 2026-10-10 18:00 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869943
update games g
set kickoff_at = timestamptz '2026-10-10 18:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'marshall' and a.slug = 'coastal-carolina')
    or (h.slug = 'coastal-carolina' and a.slug = 'marshall'))
  and g.week = 6;

-- LSU @ Kentucky · Sat 2026-10-10 18:00 CT · ESPN · LSU -10.5 / O/U 49.5 · STATUS_SCHEDULED · ESPN 401856715
update games g
set kickoff_at = timestamptz '2026-10-10 18:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'kentucky' then -10.5 else 10.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kentucky' and a.slug = 'lsu')
    or (h.slug = 'lsu' and a.slug = 'kentucky'))
  and g.week = 6;

-- Nevada @ UTEP · Sat 2026-10-10 18:00 CT · FS1 · Vegas — · HOLD (Vegas) · ESPN 401864517
update games g
set kickoff_at = timestamptz '2026-10-10 18:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utep' and a.slug = 'nevada')
    or (h.slug = 'nevada' and a.slug = 'utep'))
  and g.week = 6;

-- Air Force @ Northern Illinois · Sat 2026-10-10 18:30 CT · CBSSN · Vegas — · HOLD (Vegas) · ESPN 401864516
update games g
set kickoff_at = timestamptz '2026-10-10 18:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'northern-illinois' and a.slug = 'air-force')
    or (h.slug = 'air-force' and a.slug = 'northern-illinois'))
  and g.week = 6;

-- Georgia @ Alabama · Sat 2026-10-10 18:30 CT · ABC · UGA -3 / O/U 54.5 · STATUS_SCHEDULED · ESPN 401856712
update games g
set kickoff_at = timestamptz '2026-10-10 18:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'alabama' then -3 else 3 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'alabama' and a.slug = 'georgia')
    or (h.slug = 'georgia' and a.slug = 'alabama'))
  and g.week = 6;

-- Louisiana @ Louisiana Tech · Sat 2026-10-10 18:30 CT · ESPN+ · Vegas — · HOLD (Vegas) · ESPN 401869965
update games g
set kickoff_at = timestamptz '2026-10-10 18:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisiana-tech' and a.slug = 'louisiana')
    or (h.slug = 'louisiana' and a.slug = 'louisiana-tech'))
  and g.week = 6;

-- Syracuse @ Virginia · Sat 2026-10-10 18:30 CT · ACC Network · Vegas — · HOLD (Vegas) · ESPN 401858258
update games g
set kickoff_at = timestamptz '2026-10-10 18:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'virginia' and a.slug = 'syracuse')
    or (h.slug = 'syracuse' and a.slug = 'virginia'))
  and g.week = 6;

-- USC @ Penn State · Sat 2026-10-10 18:30 CT · NBC · PSU -1.5 / O/U 58.5 · STATUS_SCHEDULED · ESPN 401858485
update games g
set kickoff_at = timestamptz '2026-10-10 18:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'penn-state' then 1.5 else -1.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'penn-state' and a.slug = 'usc')
    or (h.slug = 'usc' and a.slug = 'penn-state'))
  and g.week = 6;

-- Minnesota @ Purdue · Sat 2026-10-10 19:00 CT · BTN · Vegas — · HOLD (Vegas) · ESPN 401858486
update games g
set kickoff_at = timestamptz '2026-10-10 19:00:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'purdue' and a.slug = 'minnesota')
    or (h.slug = 'minnesota' and a.slug = 'purdue'))
  and g.week = 6;

-- Kansas @ Utah · Sat 2026-10-10 21:15 CT · ESPN · Vegas — · HOLD (Vegas) · ESPN 401856827
update games g
set kickoff_at = timestamptz '2026-10-10 21:15:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utah' and a.slug = 'kansas')
    or (h.slug = 'kansas' and a.slug = 'utah'))
  and g.week = 6;

-- Boise State @ Fresno State · Sat 2026-10-10 21:30 CT · CW · Vegas — · HOLD (Vegas) · day-risk: ESPN CT Sat 2026-10-10 21:30 (HM Sunday, Oct 11) · ESPN 401860901
update games g
set kickoff_at = timestamptz '2026-10-10 21:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'fresno-state' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'fresno-state'))
  and g.week = 6;

-- Hawaiʻi @ Arizona State · Sat 2026-10-10 21:30 CT · FS1 · Vegas — · HOLD (Vegas) · ESPN 401856808
update games g
set kickoff_at = timestamptz '2026-10-10 21:30:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arizona-state' and a.slug = 'hawaii')
    or (h.slug = 'hawaii' and a.slug = 'arizona-state'))
  and g.week = 6;

-- James Madison @ Georgia Southern · Kick — · TV — · Vegas — · HOLD (Kick, TV, Vegas) · ESPN 401869949
update games g
set tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-southern' and a.slug = 'james-madison')
    or (h.slug = 'james-madison' and a.slug = 'georgia-southern'))
  and g.week = 6;

-- South Carolina @ Florida · Kick — · TV — · FLA -14.5 / O/U 57.5 · HOLD (Kick, TV) · ESPN 401856714
update games g
set tv = null,
    vegas_spread = case when h.slug = 'florida' then 14.5 else -14.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida' and a.slug = 'south-carolina')
    or (h.slug = 'south-carolina' and a.slug = 'florida'))
  and g.week = 6;

-- Texas A&M @ Missouri · Kick — · TV — · MIZ -1.5 / O/U 50.5 · HOLD (Kick, TV) · ESPN 401856716
update games g
set tv = null,
    vegas_spread = case when h.slug = 'missouri' then 1.5 else -1.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'missouri' and a.slug = 'texas-am')
    or (h.slug = 'texas-am' and a.slug = 'missouri'))
  and g.week = 6;

-- UAB @ Memphis · Kick — · TV — · Vegas — · HOLD (Kick, TV, Vegas) · ESPN 401862798
update games g
set tv = null,
    vegas_spread = null,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'memphis' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'memphis'))
  and g.week = 6;
