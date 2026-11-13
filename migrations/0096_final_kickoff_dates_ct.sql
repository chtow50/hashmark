-- Kickoff-date fix for 4 FINALs, 2026-11-12 night CT.
-- Every FINAL (568 FBS-FBS rows here + 123 FCS stubs) was checked against the ESPN
-- scoreboard kickoff converted to America/Chicago. These 4 were stored one day late
-- (late-night CT kicks that are already the next day in UTC/ET). kickoff_at was right.
-- Date only: no scores, Vegas, kick/TV, locks, or HX touched. Week numbers unchanged.
-- Old /games/<old date>-... URLs 301 to the new key (game page matches within 1 day).

-- memphis @ unlv · ESPN Sat Aug 29, 9:00 PM CT
update games g set kickoff_date = date '2026-08-29'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'memphis'
  and g.kickoff_date = date '2026-08-30' and g.status = 'final';

-- missouri @ kansas · ESPN Fri Sep 11, 7:00 PM CT
update games g set kickoff_date = date '2026-09-11'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas' and a.slug = 'missouri'
  and g.kickoff_date = date '2026-09-12' and g.status = 'final';

-- arkansas @ utah · ESPN Sat Sep 12, 9:30 PM CT
update games g set kickoff_date = date '2026-09-12'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah' and a.slug = 'arkansas'
  and g.kickoff_date = date '2026-09-13' and g.status = 'final';

-- louisiana @ usc · ESPN Sat Sep 12, 10:00 PM CT
update games g set kickoff_date = date '2026-09-12'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'louisiana'
  and g.kickoff_date = date '2026-09-13' and g.status = 'final';
