-- Week 1 Vegas closes from Research CFB (Chase approved). Home-perspective:
-- positive = home favored, negative = away favored. Display still shows favorite −X.
-- Do not retune HX. Miami / LSU / Ole Miss / Notre Dame stay on 0010 — do not touch.
-- Thursday FINALs where Research gave scores. Illinois won without a sourced score:
-- stamp Vegas only, leave scores unset.

-- Thu 9/3 FINAL UMass 37–21 at Rutgers. Rutgers −28.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'rutgers' then 28.5 else -28.5 end,
    vegas_total = 51.5,
    status = 'final',
    home_score = 21,
    away_score = 37
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'rutgers' and a.slug = 'massachusetts')
    or (h.slug = 'massachusetts' and a.slug = 'rutgers'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

-- Thu 9/3 FINAL Wake 38–16 vs Akron. Wake Forest −24.5 / 48.5.
update games g
set vegas_spread = case when h.slug = 'wake-forest' then 24.5 else -24.5 end,
    vegas_total = 48.5,
    status = 'final',
    home_score = 38,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wake-forest' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'wake-forest'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

-- Thu 9/3 FINAL Colorado 14–13 at Georgia Tech. GT −6.5 / 50.5.
update games g
set vegas_spread = case when h.slug = 'georgia-tech' then 6.5 else -6.5 end,
    vegas_total = 50.5,
    status = 'final',
    home_score = 13,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-tech' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'georgia-tech'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

-- Thu 9/3 Illinois vs UAB. Illinois −27.5 / 54.5. Won, no sourced score — Vegas only.
update games g
set vegas_spread = case when h.slug = 'illinois' then 27.5 else -27.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'illinois' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'illinois'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

-- Fri 9/4 Eastern Michigan vs San José State. EMU −4.5 / 54.5.
update games g
set vegas_spread = case when h.slug = 'eastern-michigan' then 4.5 else -4.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'eastern-michigan' and a.slug = 'san-jose-state')
    or (h.slug = 'san-jose-state' and a.slug = 'eastern-michigan'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

-- Fri 9/4 Oklahoma vs UTEP. Oklahoma −41.5 / 49.5.
update games g
set vegas_spread = case when h.slug = 'oklahoma' then 41.5 else -41.5 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oklahoma' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'oklahoma'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

-- Fri 9/4 Michigan State vs Toledo. MSU −10 / 46.5.
update games g
set vegas_spread = case when h.slug = 'michigan-state' then 10 else -10 end,
    vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'michigan-state'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

-- Fri 9/4 USC vs Fresno State. USC −22.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'usc' then 22.5 else -22.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'usc'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

-- Sat 9/5 Alabama vs East Carolina. Alabama −28.5 / 54.5.
update games g
set vegas_spread = case when h.slug = 'alabama' then 28.5 else -28.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'alabama' and a.slug = 'east-carolina')
    or (h.slug = 'east-carolina' and a.slug = 'alabama'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Houston vs Oregon State. Houston −20.5 / 49.5.
update games g
set vegas_spread = case when h.slug = 'houston' then 20.5 else -20.5 end,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'houston' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'houston'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 West Virginia vs Coastal Carolina. WVU −21.5 / 56.5.
update games g
set vegas_spread = case when h.slug = 'west-virginia' then 21.5 else -21.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'west-virginia' and a.slug = 'coastal-carolina')
    or (h.slug = 'coastal-carolina' and a.slug = 'west-virginia'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Indiana vs North Texas. Indiana −40.5 / 55.5.
update games g
set vegas_spread = case when h.slug = 'indiana' then 40.5 else -40.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'indiana' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'indiana'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Nebraska vs Ohio. Nebraska −23.5 / 47.5.
update games g
set vegas_spread = case when h.slug = 'nebraska' then 23.5 else -23.5 end,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nebraska' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'nebraska'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 James Madison vs Liberty. JMU −6.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'james-madison' then 6.5 else -6.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'james-madison' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'james-madison'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Pittsburgh vs Miami (OH). Pitt −16.5 / 50.5.
update games g
set vegas_spread = case when h.slug = 'pittsburgh' then 16.5 else -16.5 end,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'pittsburgh' and a.slug = 'miami-oh')
    or (h.slug = 'miami-oh' and a.slug = 'pittsburgh'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Ohio State vs Ball State. Ohio State −50.5 / 56.5.
update games g
set vegas_spread = case when h.slug = 'ohio-state' then 50.5 else -50.5 end,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio-state' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'ohio-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 South Carolina vs Kent State. South Carolina −36.5 / 52.5.
update games g
set vegas_spread = case when h.slug = 'south-carolina' then 36.5 else -36.5 end,
    vegas_total = 52.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'south-carolina' and a.slug = 'kent-state')
    or (h.slug = 'kent-state' and a.slug = 'south-carolina'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Auburn vs Baylor Neutral (Auburn is the home row). Auburn −7.5 / 58.5.
update games g
set vegas_spread = case when h.slug = 'auburn' then 7.5 else -7.5 end,
    vegas_total = 58.5,
    neutral = true
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'auburn' and a.slug = 'baylor')
    or (h.slug = 'baylor' and a.slug = 'auburn'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Texas vs Texas State. Texas −30.5 / 60.5.
update games g
set vegas_spread = case when h.slug = 'texas' then 30.5 else -30.5 end,
    vegas_total = 60.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas' and a.slug = 'texas-state')
    or (h.slug = 'texas-state' and a.slug = 'texas'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Cincinnati vs Boston College. Cincinnati −7.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'cincinnati' then 7.5 else -7.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'cincinnati' and a.slug = 'boston-college')
    or (h.slug = 'boston-college' and a.slug = 'cincinnati'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Duke vs Tulane. Duke −9.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'duke' then 9.5 else -9.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'duke' and a.slug = 'tulane')
    or (h.slug = 'tulane' and a.slug = 'duke'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Oregon vs Boise State. Oregon −24.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'oregon' then 24.5 else -24.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oregon' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'oregon'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Penn State vs Marshall. Penn State −24.5 / 54.5.
update games g
set vegas_spread = case when h.slug = 'penn-state' then 24.5 else -24.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'penn-state' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'penn-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Tulsa vs Oklahoma State. OKST −13.5 away favorite / 59.5.
update games g
set vegas_spread = case when h.slug = 'tulsa' then -13.5 else 13.5 end,
    vegas_total = 59.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulsa' and a.slug = 'oklahoma-state')
    or (h.slug = 'oklahoma-state' and a.slug = 'tulsa'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Iowa vs Northern Illinois. Iowa −31.5 / 46.5.
update games g
set vegas_spread = case when h.slug = 'iowa' then 31.5 else -31.5 end,
    vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'iowa'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Colorado State vs Wyoming. CSU −3.5 / 47.5.
update games g
set vegas_spread = case when h.slug = 'colorado-state' then 3.5 else -3.5 end,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'colorado-state' and a.slug = 'wyoming')
    or (h.slug = 'wyoming' and a.slug = 'colorado-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Texas A&M vs Missouri State. Texas A&M −40.5 / 53.5.
update games g
set vegas_spread = case when h.slug = 'texas-am' then 40.5 else -40.5 end,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-am' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'texas-am'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Memphis vs Arkansas State. Memphis −9.5 / 55.5.
update games g
set vegas_spread = case when h.slug = 'memphis' then 9.5 else -9.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'memphis' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'memphis'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 USF vs FIU. USF −13.5 / 54.5.
update games g
set vegas_spread = case when h.slug = 'usf' then 13.5 else -13.5 end,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usf' and a.slug = 'fiu')
    or (h.slug = 'fiu' and a.slug = 'usf'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Troy vs Sam Houston. Troy −16.5 / 53.5.
update games g
set vegas_spread = case when h.slug = 'troy' then 16.5 else -16.5 end,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'troy' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'troy'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Mississippi State vs UL Monroe. Miss St −28.5 / 55.5.
update games g
set vegas_spread = case when h.slug = 'mississippi-state' then 28.5 else -28.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'mississippi-state' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'mississippi-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Michigan vs Western Michigan. Michigan −27.5 / 47.5.
update games g
set vegas_spread = case when h.slug = 'michigan' then 27.5 else -27.5 end,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'michigan'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Florida vs Florida Atlantic. Florida −26.5 / 59.5.
update games g
set vegas_spread = case when h.slug = 'florida' then 26.5 else -26.5 end,
    vegas_total = 59.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida' and a.slug = 'florida-atlantic')
    or (h.slug = 'florida-atlantic' and a.slug = 'florida'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Hawaiʻi vs UNLV. UNLV −3.5 away favorite / 58.5. Slug stays hawaii.
update games g
set vegas_spread = case when h.slug = 'hawaii' then -3.5 else 3.5 end,
    vegas_total = 58.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'hawaii' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'hawaii'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 New Mexico vs Central Michigan. New Mexico −10.5 / 47.5.
update games g
set vegas_spread = case when h.slug = 'new-mexico' then 10.5 else -10.5 end,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'new-mexico'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 California vs UCLA. UCLA −1.5 away favorite / 53.5 (flips HASHMARK Cal).
update games g
set vegas_spread = case when h.slug = 'california' then -1.5 else 1.5 end,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'california' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'california'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sat 9/5 Nevada vs Western Kentucky. WKU −2.5 away favorite / 52.5.
update games g
set vegas_spread = case when h.slug = 'nevada' then -2.5 else 2.5 end,
    vegas_total = 52.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nevada' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'nevada'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

-- Sun 9/6 Washington vs Washington State. Washington −23.5 / 51.5.
update games g
set vegas_spread = case when h.slug = 'washington' then 23.5 else -23.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington' and a.slug = 'washington-state')
    or (h.slug = 'washington-state' and a.slug = 'washington'))
  and g.kickoff_date between date '2026-09-06' - 1 and date '2026-09-06' + 1;

-- Mon 9/7 Florida State vs SMU. SMU −3.5 away favorite / 53.5.
update games g
set vegas_spread = case when h.slug = 'florida-state' then -3.5 else 3.5 end,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida-state' and a.slug = 'smu')
    or (h.slug = 'smu' and a.slug = 'florida-state'))
  and g.kickoff_date between date '2026-09-07' - 1 and date '2026-09-07' + 1;
