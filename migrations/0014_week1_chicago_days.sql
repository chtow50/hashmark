-- Research CFB verified: restamp kickoff_date to America/Chicago civil day.
-- Kick times, TV, Vegas, and HX unchanged. These 10 only.
-- Seed stored the UTC calendar date of late kicks (Thu 19:00 CT = Fri 00:00 UTC).

-- 1. Colorado @ Georgia Tech. Thu Sep 3 7:00 CT ESPN. FINAL 14–13 already on 0013.
update games g
set kickoff_date = date '2026-09-03'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'georgia-tech' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'georgia-tech'));

-- 2. UAB @ Illinois. Thu Sep 3 8:00 CT BTN. NCAA FINAL Illinois 42–23.
update games g
set kickoff_date = date '2026-09-03',
    status = 'final',
    home_score = 42,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'illinois' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'illinois'));

-- 3. UTEP @ Oklahoma. Fri Sep 4 7:00 CT SECN+.
update games g
set kickoff_date = date '2026-09-04'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'oklahoma' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'oklahoma'));

-- 4. Toledo @ Michigan State. Fri Sep 4 7:00 CT FS1.
update games g
set kickoff_date = date '2026-09-04'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'michigan-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'michigan-state'));

-- 5. Miami @ Stanford. Fri Sep 4 8:00 CT ESPN.
update games g
set kickoff_date = date '2026-09-04'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'stanford' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'stanford'));

-- 6. Fresno State @ USC. Fri Sep 4 8:00 CT FOX.
update games g
set kickoff_date = date '2026-09-04'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'usc' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'usc'));

-- 7. UNLV @ Hawaiʻi. Sat Sep 5 9:00 CT CW. Slug stays hawaii.
update games g
set kickoff_date = date '2026-09-05'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'hawaii' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'hawaii'));

-- 8. Central Michigan @ New Mexico. Sat Sep 5 9:00 CT FS1.
update games g
set kickoff_date = date '2026-09-05'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'new-mexico' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'new-mexico'));

-- 9. UCLA @ California. Sat Sep 5 9:30 CT ESPN.
update games g
set kickoff_date = date '2026-09-05'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'california' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'california'));

-- 10. Western Kentucky @ Nevada. Sat Sep 5 9:30 CT CBSSN.
update games g
set kickoff_date = date '2026-09-05'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'nevada' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'nevada'));
