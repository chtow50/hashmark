export type StorySource = { label: string; href: string };

export type Story = {
  slug: string;
  kicker: string;
  headline: string;
  dek: string;
  date: string;
  body: string[];
  whyItMatters: string;
  sources: StorySource[];
};

export const STORY_DATE = "Friday, Aug 28, 2026";
export const STORY_DATE_WEEK1 = "Friday, Sep 4, 2026";
export const STORY_DATE_TAPE = "Tuesday, Sep 8, 2026";
export const STORY_DATE_TAPE_WEEK2 = "Sunday, Sep 13, 2026";
export const STORY_DATE_TAPE_WEEK3 = "Sunday, Sep 20, 2026";
export const STORY_DATE_TAPE_WEEK4 = "Sunday, Sep 27, 2026";
export const STORY_DATE_WEEK3 = "Friday, Sep 18, 2026";
export const STORY_DATE_WEEK4 = "Friday, Sep 25, 2026";
export const STORY_DATE_WEEK5 = "Friday, Oct 2, 2026";
export const STORY_DATE_TAPE_WEEK5 = "Sunday, Oct 4, 2026";
export const STORY_DATE_WEEK6 = "Friday, Oct 9, 2026";

export const STORIES: Story[] = [
  {
    slug: "week-6-georgia-alabama",
    kicker: "Week 6 · Winner flip",
    headline: "HX takes Georgia in Tuscaloosa as the book moves to Alabama",
    dek: "The market swung from Georgia to Alabama. HX didn’t follow.",
    date: STORY_DATE_WEEK6,
    body: [
      "No. 2 Georgia (5–0) visits No. 6 Alabama (5–0) Saturday at 6:30 CT on ABC, with College GameDay set up at Denny Chimes and Bryce Young as guest picker.",
      "The line has traveled. Alabama opened as a three-point home underdog and was bet to a 1.5-point favorite, per ESPN’s DraftKings tracking. ESPN’s FPI makes it Alabama by 0.9 with a 53% win probability.",
      "HASHMARK lands on the other side: Georgia −4.6, 61.8%. HX rates Georgia No. 1 nationally at 7.90 and Alabama ninth at 5.29, a gap of more than two and a half points of rating. HX’s board also gives the Bulldogs an 86.5% Make 12 number.",
      "Georgia arrives without junior running back Chauncey Bowens, its touchdown leader with six and the primary short-yardage back, who is out after an injury against Vanderbilt. Nate Frazier, the team’s leading rusher (211 yards), came off the availability report after bruised ribs. Alabama’s run defense is allowing 78.6 yards per game, third in the SEC.",
      "HX is a team rating. It doesn’t adjust for a single running back’s availability. That’s the honest gap between the model and a market that has spent all week digesting injury reports.",
    ],
    whyItMatters:
      "It’s the week’s biggest game and the cleanest winner flip at the top of the board. HX and FPI split the winner, and the market moved toward Alabama.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=6" },
      {
        label: "ESPN · Week 6 Top 25 lines",
        href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds",
      },
      {
        label: "ESPN · Bowens out",
        href: "https://www.espn.com/college-football/story/_/id/50128870/georgia-bulldogs-chauncey-bowens-vs-alabama-crimson-tide",
      },
      {
        label: "ESPN · College GameDay Week 6",
        href: "https://www.espn.com/college-football/story/_/id/50133318/2026-college-gameday-week-6-georgia-vs-alabama",
      },
    ],
  },
  {
    slug: "week-6-ucla-oregon",
    kicker: "Week 6 · Spread gap",
    headline: "Dante Moore out vs. UCLA; HX’s Oregon number is twice the book’s",
    dek: "HX has the Ducks by 24.5. Vegas has 11.5. Only one of them knows who’s playing quarterback.",
    date: STORY_DATE_WEEK6,
    body: [
      "Oregon quarterback Dante Moore is officially out Saturday against No. 21 UCLA (2:30 CT, CBS), per the Big Ten injury report. Moore sustained a concussion against USC on Sept. 26. Former Nebraska starter Dylan Raiola, who threw for 289 yards and two touchdowns in relief in the USC win, makes his first start for the Ducks. Raiola is 13–9 as a college starter with 5,232 career passing yards.",
      "HX has Oregon −24.5, 89.0%. Vegas has Oregon −11.5, O/U 59.5, and FPI makes it Oregon by 14.7. That’s a 13-point HX–Vegas gap, the largest among ranked matchups this week.",
      "Two things drive it. HX rates Oregon fourth nationally (6.90) against an AP rank of 13, and it rates UCLA 45th (1.40) against an AP rank of 21. UCLA is 4–0 under first-year coach Bob Chesney, 13 months after an 0–3 start got DeShaun Foster fired. HX’s inputs (talent, prior-year SP+/Elo/SRS, portal net, returning production) haven’t caught up with that turnaround.",
      "HX also doesn’t price a quarterback swap. Raiola is a former five-star with a full résumé, but the number on the board is a team number.",
    ],
    whyItMatters:
      "It’s the week’s only other ranked-vs-ranked game besides Georgia–Alabama, and it’s where HX disagrees most with both the AP and the book.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=6" },
      { label: "HASHMARK Rankings", href: "https://hashmarkcfb.com/rankings" },
      {
        label: "ESPN · Moore out, Raiola starts",
        href: "https://www.espn.com/college-football/story/_/id/50129251/oregon-qb-moore-ruled-ucla-game-raiola-start",
      },
      {
        label: "ESPN · Chesney’s UCLA turnaround",
        href: "https://www.espn.com/college-football/story/_/id/50125661/2026-bob-chesney-ucla-winning-turnaround",
      },
      {
        label: "ESPN · Week 6 Top 25 lines",
        href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds",
      },
    ],
  },
  {
    slug: "week-6-texas-am-missouri",
    kicker: "Week 6 · Winner flip",
    headline: "Missouri climbed 11 spots. HX still takes Texas A&M in Columbia",
    dek: "The AP’s biggest riser hosts the team HX can’t stop ranking.",
    date: STORY_DATE_WEEK6,
    body: [
      "Missouri jumped from No. 25 to No. 14 in the AP Week 6 poll after a 45–17 win over Florida, a game HX had as a winner flip toward the Tigers (Missouri −5.6 vs Vegas Florida −4.5). That one hit.",
      "This week the model flips the other way. Texas A&M (3–2) visits Missouri (4–1) at 11:00 CT on ABC, and HX has Texas A&M −2.1, 55.7% against Vegas Missouri −3.5. FPI calls it nearly even, Missouri by 0.8 with a 52% win probability.",
      "The disagreement is about A&M more than Missouri. HX rates the Aggies sixth nationally at 6.06 despite two losses and no AP ranking. Missouri sits 14th in HX at 4.25, which happens to match its new AP rank exactly. HX has held A&M high all season. It took the Aggies at LSU in Week 4 as a winner flip, and that one missed.",
    ],
    whyItMatters:
      "It’s an 11:00 window winner flip involving a ranked home team, and it’s a direct test of HX’s most stubborn AP disagreement.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=6" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "ESPN · Week 6 Top 25 lines",
        href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds",
      },
      { label: "ESPN · AP Week 6 (Oct 4)", href: "https://www.espn.com/college-football/rankings" },
    ],
  },
  // HOOK (Story 4 · week-6-iowa-washington): Website peer HOLD 2026-10-09 — dek / why
  // framing ("three-way model split") is wrong: HX and Vegas both favor Washington.
  // Research to rewrite; insert here once CLEAR. Iowa @ Washington TV stays HOLD.
  {
    slug: "week-6-ranked-chill-gaps",
    kicker: "Week 6 · Spread gap",
    headline: "HX trims the chalk on Florida, Tennessee and Oklahoma State",
    dek: "Three ranked favorites, three HX numbers well below Vegas.",
    date: STORY_DATE_WEEK6,
    body: [
      "HX agrees on the favorite in all three games. It just thinks the book has the margins too wide.",
      "South Carolina at No. 16 Florida (11:45 CT, SEC Network): HX Florida −5.2 (63.3%) vs Vegas Florida −13.5. FPI has Florida by 8.5. HX rates Florida 24th, eight spots below its AP rank of 16, even after the Gators fell 8 spots in the poll.",
      "No. 15 Tennessee at Arkansas (3:15 CT, SEC Network): HX Tennessee −7.4 (68.0%) vs Vegas −13.5. FPI is wider than both at 16.1.",
      "UCF at No. 18 Oklahoma State (11:00 CT, ESPN2): HX Oklahoma State −1.9 (55.2%) vs Vegas −10.0. FPI says 4.4. HX rates Oklahoma State 89th (−1.17). That 71-spot gap against its AP rank is the biggest on the board.",
      "The other way: No. 25 Pittsburgh (5–0) makes its AP debut ranked 53rd in HX. But against North Carolina, HX (Pitt −9.5) sits right next to FPI (9.2) and well above Vegas (−4.5).",
    ],
    whyItMatters:
      "These are the board’s biggest ranked-team margin gaps. They’re a fair test of the soft-calibration FLAG that’s been on the board all season. The Week 5 full-slate closer was 20/55.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=6" },
      { label: "HASHMARK Rankings", href: "https://hashmarkcfb.com/rankings" },
      {
        label: "ESPN · Week 6 Top 25 lines",
        href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds",
      },
    ],
  },
  {
    slug: "week-6-midweek-tape",
    kicker: "Week 6 · Tape",
    headline: "HX goes 6–1 midweek; South Alabama and Arkansas State set the season’s scoring high",
    dek: "Seven games are in the books before Friday, and no head coach has been fired yet this season.",
    date: STORY_DATE_WEEK6,
    body: [
      "Week 6 opened early. Troy beat Southern Miss 55–34 on Tuesday. Wednesday had Jacksonville State edging Kennesaw State 27–26 on a Garrison Rippa field goal with 51 seconds left, and FIU beating New Mexico State 22–3 behind five Robert Czeremcha field goals. Thursday brought Liberty 35–3 over Sam Houston, WKU 34–13 over Missouri State, UTSA 31–24 over USF, and South Alabama 56–49 at Arkansas State, the highest-scoring FBS game of the season according to ESPN.",
      "HX picked six of the seven winners. The miss was Arkansas State (HX −7.5), which Vegas also favored at −1.5. UTSA landed exactly on HX’s −7.0, which matched the book’s number too.",
      "Off the field, the carousel hasn’t started. ESPN’s Pete Thamel reports no FBS firings so far this season. By this point last year there were five power-conference openings. Turnover hit a record 33 jobs in the last cycle, and ADs are weighing big buyouts against rising roster costs. Separately, Big Ten commissioner Tony Petitti said the league has had “absolutely no discussions” about expansion, even though the proposed Protect College Sports Act would allow up to 20 members.",
    ],
    whyItMatters:
      "The midweek results are already final on the site, and the carousel’s silence is the backdrop for a Saturday that could start it.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=6" },
      {
        label: "ESPN · South Alabama 56, Arkansas State 49",
        href: "https://www.espn.com/college-football/recap/_/gameId/401869933",
      },
      {
        label: "ESPN · Jacksonville State 27, Kennesaw State 26",
        href: "https://www.espn.com/college-football/recap/_/gameId/401871051",
      },
      {
        label: "ESPN · FIU 22, New Mexico State 3",
        href: "https://www.espn.com/college-football/recap/_/gameId/401871066",
      },
      {
        label: "ESPN · Coaching carousel buyouts",
        href: "https://www.espn.com/college-football/story/_/id/50136127/college-football-coaching-carousel-buyouts",
      },
      {
        label: "ESPN · Big Ten: no expansion talks",
        href: "https://www.espn.com/college-sports/story/_/id/50133579/big-ten-18-strong-members-no-expansion-talks-commish-says",
      },
    ],
  },
  {
    slug: "week-5-tape",
    kicker: "Week 5 tape",
    headline: "Week 5 tape: 39/55 SU, 20/55 closer FLAG.",
    dek: "Full slate closer is a FLAG. Soft-cal FLAG stays. HX not retuned.",
    date: STORY_DATE_TAPE_WEEK5,
    body: [
      "Week 5 SU 39/55 (70.9%). HX closer to the final than Vegas 20/55 (36.4%) — FLAG, under 45%. Vegas closer 35/55. Ties 0. FBS–FBS only, n=55. Season W1–W5 arithmetic, not a fresh audit of Weeks 1–4: SU 78.7% (203/258) · closer 39.9% (103/258). Soft-cal FLAG. This week’s ledger, not a retune.",
      "Stored file ATS is 26/55 (47.3%). This desk did not re-derive that ATS rule. Full-slate MAE HX 14.87 / Vegas 13.19. Brier 0.195. Research Vegas books + ESPN FINALs. Soft-cal FLAG. all-D still in force. HX not retuned.",
      "Sixteen SU misses, HX favorites: Western Kentucky @ New Mexico State, North Texas @ Tulsa, Pittsburgh @ Virginia Tech, Penn State @ Northwestern, Michigan @ Minnesota, Syracuse @ UConn, Navy @ Air Force, Old Dominion @ Georgia State, Bowling Green @ Miami (OH), Kentucky @ South Carolina, Purdue @ Illinois, Georgia Southern @ Coastal Carolina, Temple @ South Florida, Fresno State @ Washington State, Baylor @ Arizona State, San José State @ Hawaiʻi.",
      "Winner-flip hits: Florida @ Missouri, Eastern Michigan @ Massachusetts, Louisville @ NC State, Virginia @ Florida State, Army @ Louisiana Tech, Texas State @ San Diego State. Winner-flip misses: Western Kentucky @ New Mexico State, Syracuse @ UConn, Navy @ Air Force, Old Dominion @ Georgia State, Georgia Southern @ Coastal Carolina. Two overtime cards in the new stamps: Syracuse 42–UConn 41 and Kentucky 35–South Carolina 34. The schedule card has no overtime badge, so those rows stamp as FINAL with the score only. North Texas 45–44 Tulsa was already live.",
      "Top 25 involvement on the HX 2026.6 pregame board (n=15, hx_rank ≤25): closer 7/15 (46.7%), SU 13/15. That cut uses the Week 4 rule on this week’s CLEARed finals. It is not the Research headline and it does not clear the full-slate FLAG.",
    ],
    whyItMatters:
      "Fifth public ledger of 2026. Full slate closer is a FLAG. Soft-cal FLAG stays. HX not retuned.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
    ],
  },
  {
    slug: "week-5-florida-missouri",
    kicker: "Week 5 · Winner flip",
    headline: "Vegas has Florida −4.5. HX has Missouri −5.6.",
    dek: "AP’s new No. 8 road favorite — and HASHMARK flips the card in Columbia.",
    date: STORY_DATE_WEEK5,
    body: [
      "No. 8 Florida visits No. 25 Missouri on Saturday (2:30 CT, ABC). Live HASHMARK posts a winner flip: Missouri −5.6 / 64.1%. The sourced Vegas close on the schedule is Florida −4.5, O/U 56.5 — roughly a 10-point HX–market disagreement and the only ranked-vs-ranked flip on the Week 5 board.",
      "HX ranks Missouri 15th (4.26) against an AP Week 5 ballot that dropped the Tigers from 19 to 25 after the Miss State loss. Florida sits HX 24th (3.52) while AP vaulted the Gators 13 spots to 8 after the 52–28 win over Ole Miss (NCAA / AP Week 5). That is a −16 HX–ballot gap on the road favorite — HX still treats Sumrall’s start as mid-20s talent, not a top-10 ballot surge.",
      "Injury cloud is sourced. Florida WR Vernell Brown III (knee) and WR Bailey Stockton (back) opened the week questionable; RB Kelvin Jimenez is out (knee). Missouri lists RB Ahmad Hardy out among five outs on the Thursday availability report (Florida athletics / On3). Stick to the number on hashmarkcfb.com/schedule. Do not invent snaps.",
    ],
    whyItMatters:
      "Primetime ranked winner flip + HX’s Florida under-rank vs the biggest AP riser of the week. Lead card for @Hashmark_CFB.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
      {
        label: "NCAA.com · Week 5 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "Florida Gators · Opening Kickoff",
        href: "https://floridagators.com/news/2026/10/1/football-the-opening-kickoff-no-8-gators-at-no-25-missouri-buzz-builds-focus-required",
      },
      {
        label: "On3 · Florida availability",
        href: "https://www.on3.com/teams/florida-gators/news/thursday-availability-report-for-florida-gators-vs-missouri-tigers/",
      },
      {
        label: "CBS Sports · Week 5 odds",
        href: "https://www.cbssports.com/betting/news/2026-week-5-college-football-odds-betting-lines-spreads-start-times-get-cfb-predictions-best-bets-picks/",
      },
    ],
  },
  {
    slug: "week-5-miami-clemson",
    kicker: "Week 5 · Spread gap",
    headline: "Same favorite. Sixteen-plus points apart.",
    dek: "No. 4 Miami in Death Valley — HASHMARK almost calls it a coin flip; the book does not.",
    date: STORY_DATE_WEEK5,
    body: [
      "No. 4 Miami visits Clemson on Saturday (6:30 CT, ABC). Live HASHMARK: Miami −0.9 / 52.5%. Vegas close on the schedule: Miami −17.5, O/U 49.5. Same side, ~16.6-point chill — the largest HX–Vegas absolute gap on the Week 5 FBS–FBS slate.",
      "HX ranks Miami 10th (5.23) against AP’s No. 4. Clemson is HX 22nd (3.83) and still unranked on the Week 5 ballot after the LSU opener loss and three straight wins (including last week’s Cal flip hit on the HASHMARK tape). The market prices Miami as a blowout road favorite; HX prices a one-point lean.",
      "CBS frames Darian Mensah’s early tape (14 TD passes, zero interceptions through four games) against a Clemson pass defense that held opponents under 150 passing yards in each of the last two. Miami is averaging 51.8 points per game and a 42.8-point margin through four — school-record pace per CBS. Stick to the live schedule number. This is not a winner flip; it is the board’s loudest disagreement.",
    ],
    whyItMatters:
      "Clean brand story — HX vs book magnitude on a national ABC night, with Clemson’s HX-over-AP thread still alive.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "CBS Sports · Miami–Clemson",
        href: "https://www.cbssports.com/college-football/news/miami-clemson-prediction-picks-odds-spread-where-to-watch-live/",
      },
      {
        label: "NCAA.com · Week 5 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "USA Today · Week 5 picks",
        href: "https://www.usatoday.com/story/sports/ncaaf/2026/09/30/college-football-picks-week-5-top-25-game-predictions-odds/91987813007/",
      },
    ],
  },
  {
    slug: "week-5-alabama-mississippi-state",
    kicker: "Week 5 · Spread gap",
    headline: "Vegas has Alabama −6. HX has Alabama −13.3 — and Miss State is still HX 66th.",
    dek: "AP’s No. 16 hosts No. 7. HASHMARK’s ballot gap on the Bulldogs is the loudest on the board.",
    date: STORY_DATE_WEEK5,
    body: [
      "No. 7 Alabama visits No. 16 Mississippi State on Saturday (11:00 CT, ABC). Live HASHMARK: Alabama −13.3 / 77.9%. Vegas close on the schedule: Alabama −6.0, O/U 59.5 — a 7.3-point chill, same favorite.",
      "The ranking fight is louder than the spread. Mississippi State climbed to AP 16 after beating Missouri 31–24 (NCAA Week 5). HX still has the Bulldogs 66th (0.21) — a −50 gap vs the Week 5 ballot, and the site’s Week 4 stamp already showed −42 vs AP 24. Alabama is HX 9th (5.28) against AP 7.",
      "CBS frames Kamario Taylor (SEC-leading yards of offense per game) against Keelon Russell’s recent explosion (685 yards, seven TDs in the last two). Both sides are 4–0. Stick to the schedule number. Pair in social with the Florida–Missouri flip if Marketing wants an “SEC numbers” thread — Starkville is the morning ABC window.",
    ],
    whyItMatters:
      "Biggest HX–AP disagreement meeting a live ranked home underdog; clean Make-12 / CFP resume stress for both.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
      { label: "HASHMARK Rankings", href: "https://hashmarkcfb.com/rankings" },
      {
        label: "CBS Sports · Alabama–Miss State",
        href: "https://www.cbssports.com/college-football/news/alabama-mississippi-state-prediction-picks-odds-spread-where-to-watch-live/",
      },
      {
        label: "NCAA.com · Week 5 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings",
      },
    ],
  },
  {
    slug: "week-5-ohio-state-iowa",
    kicker: "Week 5 · GameDay",
    headline: "No. 5 Ohio State at No. 14 Iowa — HX has Ohio State −9.7; Vegas has −13.5.",
    dek: "College GameDay is in Iowa City for the first time in 20 years. HASHMARK trims the road favorite.",
    date: STORY_DATE_WEEK5,
    body: [
      "No. 5 Ohio State visits No. 14 Iowa on Saturday (2:30 CT, CBS). Live HASHMARK: Ohio St −9.7 / 72.2%. Vegas close on the schedule: Ohio St −13.5, O/U 45.5. Same favorite; HX is ~3.8 points cooler on the Buckeyes at Kinnick.",
      "HX ranks Ohio State 2nd (7.81) against AP 5; Iowa is HX 23rd (3.71) vs AP 14 — a −9 ballot gap on the home side. Iowa jumped after the last-play 20–19 win at Michigan (NCAA / Bleacher Report GameDay). Ohio State’s only loss is the one-point road game at Texas.",
      "CBS and SI note Ohio State’s last Kinnick trip (55–24 loss in 2017) and Iowa’s early-season run game. Do not invent snaps. The card is agreement on the side, disagreement on the margin — useful contrast against the Florida–Missouri flip and the Miami–Clemson chill.",
    ],
    whyItMatters: "National GameDay window + HX’s Iowa under-rank vs a top-15 ballot home dog.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "CBS Sports · Ohio State–Iowa",
        href: "https://www.cbssports.com/college-football/news/ohio-state-iowa-prediction-picks-odds-spread-where-to-watch-live/",
      },
      {
        label: "SI · McElroy / GameDay",
        href: "https://www.si.com/fannation/college/cfb-hq/picks/greg-mcelroy-predicts-ohio-state-iowa-winner-college-gameday-heads-kinnick-buckeyes-hawkeyes",
      },
      {
        label: "Bleacher Report · GameDay",
        href: "https://bleacherreport.com/articles/25505507-espn-college-gameday-2026-week-5-schedule-location-predictions-and-more",
      },
      {
        label: "NCAA.com · Week 5 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings",
      },
    ],
  },
  {
    slug: "week-5-louisville-nc-state",
    kicker: "Week 5 · Winner flip",
    headline: "Vegas has Louisville −6.5. HX has NC State −0.6.",
    dek: "Louisville fell out of the AP. HASHMARK flips the favorite in Raleigh.",
    date: STORY_DATE_WEEK5,
    body: [
      "Louisville visits NC State on Saturday (2:30 CT, ACC Network). Live HASHMARK: NC State −0.6 / 51.6%. Vegas close on the schedule: Louisville −6.5, O/U 60.5 — a winner flip of roughly seven points from favorite to favorite.",
      "HX still has Louisville 26th (2.98) after the team dropped out of the Week 5 AP (was 16 on the Week 4 stamp). NC State is HX 33rd (2.10) and unranked. Wake Forest’s win at Louisville last week helped push the Cardinals off the ballot (NCAA others-receiving-votes list still has Louisville with 25 points).",
      "Stick to the live schedule number. Pair with Miami–Clemson if Marketing wants an ACC Saturday thread — this is the quieter flip under the Death Valley ABC card.",
    ],
    whyItMatters: "Clean winner flip on a team HX still rates inside the top 30 after an AP exit.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
      { label: "HASHMARK Rankings", href: "https://hashmarkcfb.com/rankings" },
      {
        label: "NCAA.com · Week 5 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "CBS Sports · Miami–Clemson (ACC slate)",
        href: "https://www.cbssports.com/college-football/news/miami-clemson-prediction-picks-odds-spread-where-to-watch-live/",
      },
    ],
  },
  {
    slug: "week-5-wku-nmsu-final",
    kicker: "Week 5 · Tape",
    headline: "HX took Western Kentucky −13. New Mexico State won 34–13.",
    dek: "First Week 5 winner-flip result is in. Live /schedule has not stamped the FINAL.",
    date: STORY_DATE_WEEK5,
    body: [
      "Western Kentucky visited New Mexico State on Thursday (7:00 CT, CBSSN). Live HASHMARK had posted a winner flip: WKU −13.0 / 77.5% against Vegas NM State −2.5, O/U 54.5. Final: New Mexico State 34, Western Kentucky 13 (NMSU athletics / ESPN box). Aggies SU and cover; HX flip MISS.",
      "James Jones ran for 155 yards and a touchdown; De’Marcus Peters returned an interception for a score (ESPN). Rodney Tisdale Jr. threw for 314 yards with an interception for WKU. The card was one of the largest absolute HX–Vegas disagreements on the early Week 5 board — and the first flip result of the weekend went against the model.",
      "Same night: North Texas 45, Tulsa 44 in OT (ESPN). HX had Tulsa −0.3 / 50.9% vs Vegas Tulsa −1.5 — both sides leaned Tulsa. Live /schedule?w=5 still shows both Thursday games as Kick until this stamp ships the FINALs.",
    ],
    whyItMatters:
      "Honest early-weekend tape note; board-hole flag for the FINAL stamp; social-ready “flip miss” before Friday’s ESPN/FOX windows.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=5" },
      {
        label: "NMSU athletics",
        href: "https://nmstatesports.com/news/2026/10/1/football-aggies-shine-in-all-three-phases-to-defeat-western-kentucky-in-cusa-opener.aspx",
      },
      {
        label: "ESPN · WKU @ NMSU",
        href: "https://www.espn.com/college-football/recap?gameId=401871049",
      },
      {
        label: "ESPN · UNT @ Tulsa",
        href: "https://www.espn.com/college-football/recap?gameId=401862786",
      },
      {
        label: "NMSU box score",
        href: "https://nmstatesports.com/sports/football/stats/2026/western-kentucky/boxscore/19276",
      },
    ],
  },
  {
    slug: "week-4-tape",
    kicker: "Week 4 tape",
    headline: "Week 4 tape: 42/57 SU, 20/57 closer FLAG. Top 25 closer 8/18.",
    dek: "Full slate closer is a FLAG. Top 25 closer 8/18 is a FLAG. SU 12/18 in that cut. HX not retuned.",
    date: STORY_DATE_TAPE_WEEK4,
    body: [
      "Week 4 SU 42/57 (73.7%). HX closer to the final than Vegas 20/57 (35.1%) — FLAG, under 45%. Vegas closer 37/57. HX ATS 28/57 (49.1%). FBS–FBS only, n=57. Season W1–W4: SU 80.8% (164/203) · closer 40.9% (83/203). Soft-cal FLAG. This week’s ledger, not a retune.",
      "HX Top 25 involvement (n=18, hx_rank ≤25 on the live HX 2026.5 board): closer 8/18 (44.4%) — FLAG, under 45%. Vegas 10/18. SU 12/18. Full slate closer stays FLAG. The ranked cut did not clear 45% either.",
      "Six SU misses in the Top 25 cut: Ole Miss @ Florida, Iowa @ Michigan, Wisconsin @ Penn State, Texas A&M @ LSU, Missouri @ Mississippi State, Minnesota @ Washington. Minnesota @ Washington was closer for HX (Washington −8.0 vs Vegas WASH −10, FINAL 27–24) and still an SU miss.",
      "HX closer hits in the Top 25 cut (8): Northwestern @ Indiana, Clemson @ California, Texas @ Tennessee, Notre Dame @ Purdue, Oklahoma @ Georgia, Oregon @ USC, Missouri State @ SMU, Minnesota @ Washington.",
      "Fifteen full-slate SU misses, HX favorites: Army @ Temple, Wake Forest @ Louisville, Hawaiʻi @ Wyoming, Ole Miss @ Florida, TCU @ UCF, Iowa @ Michigan, Boise State @ Western Michigan, Wisconsin @ Penn State, Kansas State @ Cincinnati, Oklahoma State @ West Virginia, Texas A&M @ LSU, Missouri @ Mississippi State, Georgia Tech @ Stanford, Air Force @ Nevada, Minnesota @ Washington. Winner-flip hits: Navy @ UAB (HX UAB −13.8 vs Vegas NAVY −7, FINAL 20–24), Clemson @ California (HX Clemson −6.7 vs Vegas CAL −1.5, FINAL 24–10). Winner-flip misses: Army @ Temple, Ole Miss @ Florida, Boise State @ Western Michigan, Texas A&M @ LSU, Missouri @ Mississippi State, Air Force @ Nevada. HX ATS 28/57 (49.1%). Full-slate MAE HX 12.79 / Vegas 11.21. Brier 0.181. Research Vegas pack + ESPN FINALs. Soft-cal FLAG. all-D still in force. HX not retuned.",
    ],
    whyItMatters:
      "Fourth public ledger of 2026. Full slate closer is a FLAG. Top 25 closer 8/18 is a FLAG. SU 12/18 in that cut. HX not retuned.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
    ],
  },
  {
    slug: "week-4-texas-am-lsu",
    kicker: "Week 4 · Winner flip",
    headline: "HX takes Texas A&M. Vegas takes LSU by more than a touchdown.",
    dek: "Both sides are 2–1 after SEC opener losses — and HASHMARK flips the favorite in Death Valley.",
    date: STORY_DATE_WEEK4,
    body: [
      "No. 23 Texas A&M visits No. 10 LSU on Saturday (6:30 CT, ABC). Live HASHMARK posts a winner flip: Texas A&M −2.7 / 57.4%. The sourced Vegas close on the schedule is LSU −8.5, O/U 51.5 — roughly an 11-point HX–market disagreement and the loudest ranked flip of the week.",
      "HX ranks Texas A&M 6th (6.11) against an AP Week 4 ballot that dropped the Aggies from 9 to 23 after the home loss to Kentucky. LSU sits HX 19th (4.08) while AP still has the Tigers 10th. Post–Week 3 FPI splits the difference: LSU 8th, A&M 12th. Among boards HASHMARK tracks, HX is the A&M-leaning model.",
      "Context without inventing snaps: both lost Week 3 SEC openers as favorites. A&M WR Terry Bussey is out for the season (lower-body / right-leg injury on the Kentucky kickoff). LSU safety Dashawn Spears is out for the season (ACL vs Ole Miss); TE Trey’Dez Green is expected to miss time (knee). SI’s LSU injury card also lists CB Ja’Keem Jackson questionable and WR Phillip Wright III out. Sam Leavitt has five interceptions to three touchdown passes through three games; Marcel Reed is coming off a rough Kentucky tape.",
    ],
    whyItMatters:
      "Primetime winner flip + HX’s season-long A&M overrate vs AP plummet. Lead card for the weekend.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
      {
        label: "CBS Sports",
        href: "https://www.cbssports.com/college-football/news/lsu-texas-am-prediction-picks-odds-spread-where-to-watch-live/",
      },
      {
        label: "SI · LSU",
        href: "https://www.si.com/college/lsu/football/no-10-lsu-vs-no-23-texas-am-how-to-watch-odds-injuries-and-more",
      },
      {
        label: "Yahoo · Week 4 guide",
        href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html",
      },
      {
        label: "NCAA.com · Week 4 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/",
      },
    ],
  },
  {
    slug: "week-4-ole-miss-florida",
    kicker: "Week 4 · Winner flip",
    headline: "Vegas has Florida −3.5. HX has Ole Miss −2.5. Lacy is a game-time call.",
    dek: "AP’s new No. 4 road underdog — and HASHMARK still takes the Rebels.",
    date: STORY_DATE_WEEK4,
    body: [
      "No. 4 Ole Miss visits No. 21 Florida on Saturday (2:30 CT, ABC). Live HASHMARK: Ole Miss −2.5 / 56.8%. Vegas close on the schedule: Florida −3.5, O/U 58.5 — another winner flip on the SEC slate.",
      "Ole Miss jumped to AP 4 after beating LSU 32–24. HX still has the Rebels 8th (5.45) — four spots behind the new ballot. Florida is HX 24th (3.50) and AP 21st in its first Sumrall-era ranking. FPI is warmer on Florida (16th) than HX is.",
      "The injury cloud is sourced. Junior RB Kewan Lacy re-injured his surgically repaired left shoulder vs LSU and opened Wednesday’s SEC availability report as questionable. Pete Golding said the MRI wasn’t nearly as bad as we thought and called him a game-time decision (SI Ole Miss, Sep 24). Yahoo notes LSU ran for 172 yards in Oxford — Florida’s Jadan Baugh has 458 rush yards and eight touchdowns through three games.",
    ],
    whyItMatters: "Second ABC winner flip of the day; Lacy status is the national desk’s injury lead.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
      {
        label: "SI · Ole Miss · Lacy",
        href: "https://www.si.com/college/olemiss/football/where-kewan-lacy-lands-on-first-injury-report-for-ole-miss-vs-florida",
      },
      {
        label: "Yahoo · Week 4 guide",
        href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html",
      },
      {
        label: "NCAA.com · Week 4 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/",
      },
    ],
  },
  {
    slug: "week-4-texas-tennessee",
    kicker: "Week 4 · GameDay",
    headline: "No. 1 Texas at No. 14 Tennessee — HX and Vegas are within a point.",
    dek: "College GameDay is in Knoxville. The HASHMARK number is not the disagreement story this time.",
    date: STORY_DATE_WEEK4,
    body: [
      "No. 1 Texas visits No. 14 Tennessee on Saturday (11:00 CT, ABC). Live HASHMARK: Texas −3.8 / 59.9%. Vegas close on the schedule: Texas −4.5, O/U 55.5. That is a rare close card on a weekend full of flips.",
      "HX ranks Texas 5th (6.44) against AP’s No. 1; Tennessee is HX 18th (4.08) vs AP 14. FPI has Texas 2nd and Tennessee 10th — so the market and FPI are closer to each other than either is to HX’s Texas under-rank relative to the ballot.",
      "Injury note for the desk: Texas RB Hollywood Smothers remains questionable (lower-leg) on the Thursday SEC report, with local reports flagging real concern he may not go. Do not invent snaps. Yahoo frames Faizon Brandon’s early Tennessee tape (nine total TDs, zero interceptions) against a Texas defense allowing 3.4 yards per carry.",
    ],
    whyItMatters:
      "National window + clean HX/Vegas agreement contrast against the A&M–LSU and Ole Miss–Florida flips.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
      {
        label: "Yahoo · Week 4 guide",
        href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html",
      },
      {
        label: "Rocky Top Insider · Smothers",
        href: "https://www.rockytopinsider.com/2026/09/24/key-texas-running-back-hollywood-smothers-remains-questionable-on-thursday-night-sec-injury-report-before-tennessee-game/",
      },
      {
        label: "NCAA.com · Week 4 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/",
      },
    ],
  },
  {
    slug: "week-4-oregon-usc",
    kicker: "Week 4 · HX Flag",
    headline: "Vegas has Oregon −3 at the Coliseum. HX has Oregon −6 — and ranks them fourth.",
    dek: "AP’s No. 20 Ducks are still HX’s No. 4. Saturday night NBC is the stress test.",
    date: STORY_DATE_WEEK4,
    body: [
      "No. 20 Oregon visits No. 12 USC on Saturday (6:30 CT, NBC). Live HASHMARK: Oregon −6.0 / 65.1%. Vegas close on the schedule: Oregon −3.0, O/U 62.5 — a three-point chill, not a smash gap, but the ranking disagreement is huge.",
      "HX has Oregon 4th (6.91) — +16 vs AP Week 4’s 20th, still the biggest positive AP gap among HX’s Top 10 after Texas A&M’s ballot freefall. USC is HX 21st (3.85) against AP 12. FPI has Oregon 9th and USC 18th, so HX is the Oregon-bullish board and the USC-skeptical one.",
      "Oregon already owns a loss (Oklahoma State in Week 2). USC is 4–0 but Yahoo flags 75 points allowed over the last two weeks, including 35 to Rutgers. Stick to the number on hashmarkcfb.com/schedule. Do not invent portal or injury angles beyond what the desk sources.",
    ],
    whyItMatters: "Clean brand story — HX’s Oregon overrate vs AP meets a live ranked road favorite.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
      {
        label: "Yahoo · Week 4 guide",
        href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html",
      },
      {
        label: "NCAA.com · Week 4 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/",
      },
    ],
  },
  {
    slug: "week-4-clemson-cal",
    kicker: "Week 4 · Friday",
    headline: "Vegas has Cal −1.5. HX has Clemson −6.7.",
    dek: "ACC after dark — HASHMARK flips the favorite in Berkeley.",
    date: STORY_DATE_WEEK4,
    body: [
      "Clemson visits California on Friday (9:30 CT, ESPN). Live HASHMARK: Clemson −6.7 / 66.5%. Vegas close on the schedule: Cal −1.5, O/U 50.5 — a winner flip and the Friday late window.",
      "HX still has Clemson 22nd (3.83) after the LSU loss in Week 1 and the UNC win last week; AP has the Tigers unranked. Yahoo notes freshman QB Tait Reynolds in his first road start after the weather-delayed UNC win, with Cal CB Kingston Lopa at five interceptions after Wagner.",
      "Last week’s UNC–Clemson card was the loudest spread gap on the board (HX Clemson −21.6 vs Vegas −3.5). This week the absolute gap is smaller, but the favorite flip is cleaner for social. Stick to the live schedule number.",
    ],
    whyItMatters: "Ready Friday social before the Saturday ABC slate; keeps the Clemson HX-over-AP thread alive.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "Yahoo · Week 4 guide",
        href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html",
      },
    ],
  },
  {
    slug: "week-4-missouri-mississippi-state",
    kicker: "Week 4 · Winner flip",
    headline: "Vegas has Miss State −6.5. HX has Missouri −9.5.",
    dek: "Two newly relevant SEC teams — and HASHMARK flips the home favorite in Starkville.",
    date: STORY_DATE_WEEK4,
    body: [
      "No. 19 Missouri visits No. 24 Mississippi State on Saturday (6:45 CT, SEC Network). Live HASHMARK: Missouri −9.5 / 71.9%. Vegas close on the schedule: Miss St −6.5, O/U 58.5 — a winner flip of roughly 16 points from favorite to favorite.",
      "HX ranks Missouri 15th (4.26) vs AP 19; Mississippi State is HX 67th (0.20) while AP Week 4 has the Bulldogs 24th for the first time since 2022. That is a massive HX–ballot disagreement on the home side. FPI has Mississippi State 22nd — closer to AP than to HX.",
      "Yahoo frames Kamario Taylor’s early star turn and last year’s 4–0-then-collapse MSU pattern. Stick to the schedule number. Pair with A&M–LSU and Ole Miss–Florida if the cut is an SEC flips thread — Missouri is the quiet third flip on Saturday night.",
    ],
    whyItMatters: "Completes the SEC winner-flip trio; HX’s Miss State under-rank vs a new AP entry.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=4" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "Yahoo · Week 4 guide",
        href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html",
      },
      {
        label: "NCAA.com · Week 4 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/",
      },
    ],
  },
  {
    slug: "week-3-tape",
    kicker: "Week 3 tape",
    headline: "Week 3 tape: 49/56 SU, 23/56 closer FLAG. Top 25 closer 5/21.",
    dek: "Full slate closer is a FLAG. Top 25 closer 5/21. SU 20/21 in that cut. HX not retuned.",
    date: STORY_DATE_TAPE_WEEK3,
    body: [
      "Week 3 SU 49/56 (87.5%). HX closer to the final than Vegas 23/56 (41.1%) — FLAG, under 45%. Vegas closer 33/56. HX ATS 29/56 (51.8%). FBS–FBS only, n=56. Season W1–W3: SU 83.6% (122/146) · closer 43.2% (63/146). This week’s ledger, not the 70.8% 2019–2025 claim.",
      "HX Top 25 involvement (n=21, hx_rank ≤25 on the live board): closer 5/21 (23.8%). Vegas 16/21. SU 20/21. Full slate closer stays FLAG. The ranked cut was not the scorecard beat this week — margin accuracy lagged Vegas on several chalk blowouts.",
      "The one SU miss in the Top 25 cut: Kentucky @ Texas A&M (HX Texas A&M −26.0 / Vegas TA&M −16.5 / FINAL Kentucky 31–Texas A&M 21). Vegas closer.",
      "HX closer hits in the Top 25 cut (5): Miami @ Wake Forest, USC @ Rutgers, Troy @ Missouri, LSU @ Ole Miss, UTSA @ Texas.",
      "Seven full-slate SU misses, HX favorites: Kentucky @ Texas A&M, Mississippi State @ South Carolina, East Carolina @ Old Dominion, UConn @ Southern Miss, Ohio @ South Alabama, West Virginia @ Virginia, James Madison @ San Diego State. Winner-flip hits: Nevada @ Middle Tennessee (HX Middle Tennessee −5.0 vs Vegas NEV −3.5, FINAL 20–27), LSU @ Ole Miss (HX Ole Miss −7.8 vs Vegas LSU −3, FINAL 24–32). Winner-flip misses: UConn @ Southern Miss, Ohio @ South Alabama. HX ATS 29/56 (51.8%). Full-slate MAE HX 10.03 / Vegas 8.71. Brier 0.119. Research Vegas pack + ESPN FINALs. HX not retuned.",
    ],
    whyItMatters: "Third public ledger of 2026. Full slate closer is a FLAG. Top 25 closer 5/21. SU 20/21 in that cut. HX not retuned.",
    sources: [
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=3",
      },
    ],
  },
  {
    slug: "week-3-houston-texas-tech",
    kicker: "Week 3 · Friday",
    headline: "Vegas has Texas Tech −7.5. HX has Tech −18.8.",
    dek: "Friday night FOX is the first stress test of HASHMARK’s Tech overrate vs AP.",
    date: STORY_DATE_WEEK3,
    body: [
      "No. 22 Houston visits No. 13 Texas Tech on Friday (7:00 CT, FOX). Live HASHMARK: Texas Tech −18.8 / 84.4%. Vegas close on the schedule: Texas Tech −7.5 — an ~11-point gap and the loudest Friday card.",
      "HX ranks Texas Tech 7th (5.84), +6 vs AP’s 13. Houston sits AP 22 / HX 41 (−19), the second-largest negative AP gap on the Week 3 disagreement card. Post–Week 2 FPI has Tech 16th; SP+ has Tech 15th (19.1). HX is the bullish Tech model among the boards HASHMARK tracks.",
      "This is an HX-vs-market and HX-vs-ballot story, not a claim about Houston’s résumé after two wins. The number on the schedule is the post. If Tech covers like an HX 7 seed, the prior looks early. If Houston keeps it one-score, the book was closer.",
    ],
    whyItMatters: "Ready Friday social before the Magnolia Bowl lead; HX brand disagreement with a live kick tonight.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=3" },
      {
        label: "NCAA.com · Week 3 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/",
      },
      {
        label: "Gators Wire · SP+",
        href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/",
      },
    ],
  },
  {
    slug: "week-3-lsu-ole-miss",
    kicker: "Week 3 · Magnolia Bowl",
    headline: "HX takes Ole Miss. Vegas takes LSU. Leavitt is questionable.",
    dek: "First AP top-10 Magnolia Bowl since 1962 — and HASHMARK flips the favorite in Oxford.",
    date: STORY_DATE_WEEK3,
    body: [
      "No. 7 LSU visits No. 8 Ole Miss on Saturday (6:30 CT, ABC). Live HASHMARK posts a winner flip: Ole Miss −7.8 / 68.8%. The sourced Vegas close on the schedule is LSU −3.0, O/U 59.5.",
      "That is the cleanest HX-vs-market card of the weekend. HX ranks Ole Miss 8th (5.46) — even with AP — and still has LSU 19th (4.06) against an AP ballot that has the Tigers 7th. Public boards are warmer on LSU than HX: post–Week 2 FPI has LSU 9th and Ole Miss 17th; SP+ (Sept. 13) has LSU 8th (24.1) and Ole Miss 20th (15.2). HX is the Rebel-leaning model among the boards HASHMARK tracks.",
      "The injury cloud is real and sourced. LSU QB Sam Leavitt was upgraded from doubtful to questionable on Thursday’s SEC availability report. Reuters / Field Level Media and WAFB report he missed Wednesday with back spasms (per LouisianaSports.net / Matt Moscona) and returned Thursday; the SEC report itself does not name the injury. Lane Kiffin stayed quiet. If he sits, backups Husan Longstreet or Landen Clark are the next names in the public notes — do not invent snaps.",
      "Context without inventing: first time both sides enter AP top 10 since 1962 (WLBT / Saturday Down South); Kiffin’s first game back at Vaught-Hemingway as LSU coach.",
    ],
    whyItMatters: "Primetime winner flip + Leavitt status + HX’s season-long LSU under-rank vs AP. Lead card for the weekend.",
    sources: [
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=3" },
      {
        label: "Reuters · Leavitt questionable",
        href: "https://www.reuters.com/sports/lsu-qb-sam-leavitt-upgraded-questionable-vs-ole-miss--flm-2026-09-18/",
      },
      {
        label: "WAFB",
        href: "https://www.wafb.com/2026/09/18/lsu-qb-sam-leavitt-no-longer-listed-doubtful-ahead-ole-miss-matchup/",
      },
      {
        label: "WLBT · Magnolia Bowl since 1962",
        href: "https://www.wlbt.com/2026/09/18/no-8-ole-miss-no-7-lsu-meet-first-top-10-magnolia-bowl-since-1962/",
      },
      {
        label: "NCAA.com · Week 3 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/",
      },
      {
        label: "Gators Wire · SP+",
        href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/",
      },
    ],
  },
  {
    slug: "week-3-unc-clemson",
    kicker: "Week 3 · HX Flag",
    headline: "Vegas has Clemson −3.5. HX has Clemson −21.6.",
    dek: "An ~18-point chill is the biggest HX–market disagreement on the Week 3 Top 25–adjacent slate.",
    date: STORY_DATE_WEEK3,
    body: [
      "North Carolina visits Clemson on Saturday (11:00 CT, ESPN/Disney+). Live HASHMARK: Clemson −21.6 / 86.9%. Vegas close on the schedule: Clemson −3.5, O/U 44.5.",
      "That absolute gap (~18 points) dwarfs most of the weekend’s ranked cards. HX still has Clemson 22nd (3.83) after the LSU loss — AP has the Tigers unranked. The market is pricing a short-field-goal favorite; HX is pricing a three-score home side.",
      "Belichick’s UNC is the road story the national desk will write. Stick to the number on the HASHMARK schedule. Do not invent Carolina injury or portal angles. Pair with Indiana–WKU and USC–Rutgers if the cut is “where HX and Vegas disagree” — Clemson is the largest sourced spread gap among the featured cards.",
    ],
    whyItMatters: "Largest sourced HX–Vegas spread gap on the Week 3 slate HASHMARK is featuring.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=3" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "NCAA.com · Week 3 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings",
      },
    ],
  },
  {
    slug: "week-3-usc-rutgers",
    kicker: "Week 3 · HX Flag",
    headline: "Vegas wants USC −23.5 at Rutgers. HX has −9.3.",
    dek: "A 14-point chill on CBS — and the Trojans’ leading receiver is out.",
    date: STORY_DATE_WEEK3,
    body: [
      "No. 12 USC visits Rutgers on Saturday (2:30 CT, CBS) for the Big Ten opener. Live HASHMARK: USC −9.3 / 71.5%. Vegas close on the schedule: USC −23.5, O/U 59.5.",
      "That is a clear “HX cools chalk” card. HX ranks USC 21st (3.88) against AP 12. FPI has USC 10th; SP+ has USC 12th (19.5). HX is cooler on the Trojans than the poll, FPI, and the book.",
      "Injury context is sourced, not invented. Freshman WR Trent Mosley is Out on USC’s first Big Ten injury report vs Rutgers. Lincoln Riley told SI the timeline is “not extremely long-term” but still inconclusive; CBS’s Matt Zenitz reported Mosley is expected to miss multiple games. Mosley had 13 catches, 255 yards, four TDs through three games (SI). Do not invent snap counts for anyone else — the spread gap is the story; the injury is the public why.",
    ],
    whyItMatters: "Second-largest featured chill after Clemson/Indiana; pairs injury news with an HX–Vegas disagreement.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=3" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "Sports Illustrated · Mosley",
        href: "https://www.si.com/college/usc/football/lincoln-riley-explains-trent-mosley-status-official-injury-report",
      },
      {
        label: "ESPN · Mosley",
        href: "https://www.espn.com/college-football/story/_/id/49961942/usc-star-freshman-receiver-trent-mosley-vs-rutgers-undisclosed-injury",
      },
      {
        label: "NCAA.com · Week 3 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/",
      },
      {
        label: "Gators Wire · SP+",
        href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/",
      },
    ],
  },
  {
    slug: "week-3-indiana-wku",
    kicker: "Week 3 · HX Flag",
    headline: "Vegas has Indiana −44.5. HX has Indiana −20.8.",
    dek: "A 23-point chill on Peacock — HASHMARK refuses the smash number.",
    date: STORY_DATE_WEEK3,
    body: [
      "Western Kentucky visits No. 4 Indiana on Saturday (3:00 CT, Peacock). Live HASHMARK: Indiana −20.8 / 86.1%. Vegas close on the schedule: Indiana −44.5, O/U 60.5.",
      "That is the largest absolute HX–Vegas gap on the featured Week 3 cards. HX ranks Indiana 11th (4.98) against AP 4. FPI has Indiana 6th; SP+ has Indiana 5th (25.4). Public efficiency boards and the ballot love the Hoosiers more than HX does — and the book is pricing a five-touchdown favorite HX will not match.",
      "Do not invent WKU injury or Indiana portal angles. When the market goes nuclear, HX stays inside two to three scores. Pair with Clemson (−21.6 vs −3.5) and USC (−9.3 vs −23.5) for a three-chills cut.",
    ],
    whyItMatters: "Largest featured absolute spread gap; frames HX as the cooler chalk model on smash favorites.",
    sources: [
      { label: "HASHMARK Schedule", href: "https://hashmarkcfb.com/schedule?w=3" },
      { label: "HASHMARK Board", href: "https://hashmarkcfb.com/" },
      {
        label: "NCAA.com · Week 3 AP",
        href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings",
      },
      {
        label: "The Big Lead · FPI",
        href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/",
      },
      {
        label: "Gators Wire · SP+",
        href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/",
      },
    ],
  },
  {
    slug: "week-2-tape",
    kicker: "Week 2 tape",
    headline: "Week 2 tape: 37/47 SU, 20/47 closer FLAG. Top 25 closer 12/19.",
    dek: "Full slate closer is a FLAG. HX Top 25 desk beat the book 12/19. HX not retuned.",
    date: STORY_DATE_TAPE_WEEK2,
    body: [
      "Week 2 SU 37/47 (78.7%). HX closer to the final than Vegas 20/47 (42.6%) — FLAG, under 45%. Vegas closer 27/47. FBS–FBS only, n=47. Season W1–W2: SU 81.1% · closer 44.4%. This week’s ledger, not the 70.8% 2019–2025 claim.",
      "HX Top 25 involvement (n=19, hx_rank ≤25 on HX 2026.3 pre-Δ): closer 12/19 (63.2%). Vegas 7/19. SU 17/19. MAE HX 10.81 / Vegas 12.03. That is the public scorecard beat. Full slate closer is soft. The ranked desk beat the book. AP-only alt is 12/18 (66.7%); HX Top 25 is the cut.",
      "The two SU misses in the Top 25 cut: Oregon @ OKST (HX Oregon −27.0 / Vegas ORE −23.5 / FINAL 31–39) and OSU @ Texas (HX Ohio St −1.0 / Vegas TEX −1.5 / FINAL 23–24). Both Vegas closer.",
      "HX closer hits (12): Missouri @ Kansas, OU @ Michigan, ASU @ Texas A&M, Arizona @ BYU, Rice @ Notre Dame, Alabama @ Kentucky, Utah St @ Washington, Iowa St @ Iowa, Louisiana Tech @ LSU, Texas Tech @ Oregon St, Arkansas @ Utah, Louisiana @ USC. Vegas closer (7): Oregon @ OKST, Penn St @ Temple, WKU @ Georgia, Tennessee @ Georgia Tech, Georgia Southern @ Clemson, OSU @ Texas, Charlotte @ Ole Miss.",
      "Michigan winner-flip HIT: HX Mich −5.4 vs Vegas OU −5.5, FINAL Mich 17–10. Ten full-slate SU misses, HX favorites: Rutgers @ BC, App @ ECU, Oregon @ OKST, Duke @ Illinois, MSST @ Minnesota, UTSA @ Texas St, UNLV @ UNT, GaSt @ Kennesaw, Tulsa @ Sam Houston, OSU @ Texas. Winner-flip hits: USF @ Army, OU @ Michigan, Cal @ Syracuse, Navy @ FAU. HX ATS 20/47 (42.6%). Full-slate MAE HX 12.2 / Vegas 10.49. Brier 0.147. Research Vegas pack + ESPN FINALs. Tape is pre-Δ. HX stays 2026.3. No retune.",
    ],
    whyItMatters: "Second public ledger of 2026. Full slate closer is a FLAG. Top 25 desk beat Vegas 12/19. HX stays 2026.3 until a separate 2026.4 ship.",
    sources: [
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=2",
      },
    ],
  },
  {
    slug: "week-1-tape",
    kicker: "Week 1 tape",
    headline: "Week 1 tape: 36/43 SU, 20/43 closer. HX not retuned.",
    dek: "Straight-up holds. Closer is a coin. Movers are O/D EPA — not a second rating.",
    date: STORY_DATE_TAPE,
    body: [
      "Week 1 SU 36/43 (83.7%). HX closer to the final than Vegas 20/43 (46.5%). Same tape, two scores. The SU number is this week’s ledger, not the 70.8% 2019–2025 claim.",
      "Top |ΔHX| movers are O/D EPA — Rutgers, UMass, James Madison, Liberty, Notre Dame, Wisconsin. Term = O/D. No HX retune. No second rating.",
      "The board’s disagreement card is Week 1 AP, not the Aug 17 preseason ballot. Virginia (−20), Houston (−18), LSU (−11), Missouri (+9), Texas Tech (+6) are the flags.",
    ],
    whyItMatters: "First full-slate public ledger of 2026. SU is the hit; closer is not. HX stays 2026.3.",
    sources: [
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=1",
      },
    ],
  },
  {
    slug: "week-1-lsu-clemson-gap",
    kicker: "Week 1 · HX Flag",
    headline: "HX sees Clemson–LSU as a one-score game. Vegas does not.",
    dek: "Lane Kiffin’s debut in Baton Rouge is priced like a double-digit home favorite. HASHMARK is barely buying it.",
    date: STORY_DATE_WEEK1,
    body: [
      "Clemson visits LSU Saturday night (6:30 CT, ABC). Live HX has LSU at −3.6 (59.5% win probability). The sourced Vegas close on the Week 1 schedule is LSU −10.5 with O/U 51.5 — nearly seven points of daylight, the largest HX-vs-Vegas disagreement on the Week 1 slate.",
      "Preseason AP has LSU 11th. HX has them 20th (4.02), nine spots below the ballot, the largest HX–AP rank gap among ranked teams. Clemson is HX 21st and unranked in AP. ESPN FPI’s preseason title-odds table still keeps LSU in the top-10 championship conversation. HX is cooler on the Kiffin reboot until the tape proves otherwise.",
      "This is the cleanest trust-the-model-or-trust-the-market card of Week 1.",
    ],
    whyItMatters: "Biggest live HX–Vegas gap; also the largest HX–AP rank gap among ranked teams.",
    sources: [
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=1",
      },
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
      {
        label: "NBC Sports",
        href: "https://www.nbcsports.com/betting/college-football/news/lsu-vs-clemson-prediction-odds-expert-picks-team-and-player-news-betting-trends-and-stats",
      },
      {
        label: "Action Network",
        href: "https://www.actionnetwork.com/ncaaf-game/clemson-lsu-score-odds-september-5-2026/287971",
      },
      {
        label: "AP Top 25",
        href: "https://apnews.com/hub/ap-top-25-college-football-poll",
      },
    ],
  },
  {
    slug: "week-1-georgia-hx-one",
    kicker: "Week 1 · Board",
    headline: "HX opens Week 1 with Georgia on top — and Ohio State as the consensus counterweight",
    dek: "A 0.04 HX edge over the Buckeyes puts Kirby Smart ahead of AP, FPI, and SP+.",
    date: STORY_DATE_WEEK1,
    body: [
      "The live Top 25 still reads Georgia 7.89, Ohio State 7.85. Preseason AP has Ohio State No. 1 and Georgia No. 3. ESPN’s preseason FPI posts Ohio State No. 1 (FPI 28.7) with the highest national-title odds; Georgia sits fifth in that title-odds ordering. Bill Connelly’s final preseason SP+ crowned Ohio State No. 1 (32.7) with Georgia around No. 4 (26.4).",
      "Roster talent composite still lists Georgia first (94.3). Ohio State hosts Ball State Saturday (11:30 CT, BTN) as a −68.7 HX smash. HX is a talent-and-efficiency prior, not a résumé poll. That 0.04 gap is the brand disagreement.",
    ],
    whyItMatters: "Defines HASHMARK vs AP/FPI/SP+ for the season-long comparison desk.",
    sources: [
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
      {
        label: "AP Top 25",
        href: "https://sportsdata.usatoday.com/football/ncaaf/ap-poll",
      },
      {
        label: "On3 · ESPN FPI",
        href: "https://www.on3.com/teams/ohio-state-buckeyes/news/ohio-state-buckeyes-football-espn-fpi-preseason-top-25-rankings-2/",
      },
      {
        label: "On3 · Preseason Top 25",
        href: "https://www.on3.com/news/espn-reveals-final-update-to-preseason-top-25-rankings-ahead-of-2026-college-football-season/",
      },
      {
        label: "ESPN · SP+",
        href: "https://www.espn.com/college-football/story/_/id/49593338/final-preseason-college-football-sp+-rankings-takeaways-2026",
      },
    ],
  },
  {
    slug: "week-1-miami-stanford-gap",
    kicker: "Week 1 · HX Flag",
    headline: "Miami −17 at Stanford on HX. Vegas wants −23.5.",
    dek: "Friday night in Palo Alto is the other big market disagreement on the live HASHMARK board.",
    date: STORY_DATE_WEEK1,
    body: [
      "No. 7 / HX No. 10 Miami opens at Stanford Friday (8:00 CT, ESPN). HASHMARK posts Miami −17.0 (82.5%). The sourced Vegas close on the Week 1 schedule is Miami −23.5 — a 6.5-point chill from HX versus the market, second only to the LSU gap.",
      "Miami is still top-10 (5.23) but three spots below preseason AP (No. 7). Stanford already has a Week 0 win (37–27 over Hawaiʻi). HX is not fading Miami so much as refusing to price a three-touchdown road cover off one Cardinal tape.",
    ],
    whyItMatters: "Second-largest sourced HX–Vegas gap; clean Friday lead.",
    sources: [
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=1",
      },
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
      {
        label: "NCAA.com TV schedule",
        href: "https://www.ncaa.com/news/football/article/college-football-tv-schedule-game-times-preview",
      },
    ],
  },
  {
    slug: "week-1-oregon-boise",
    kicker: "Week 1 · Matchup",
    headline: "No. 2 Oregon hosts a CFP-proven Boise State — HX still wants a multi-score Autzen night",
    dek: "The Ducks’ nonconference home streak meets a Pac-12 flagship with playoff recent history.",
    date: STORY_DATE_WEEK1,
    body: [
      "Saturday at Autzen (2:30 CT, CBS). Preseason AP No. 2 Oregon (HX No. 4, 6.97) hosts Boise State. HX has Oregon −25.1 (89.4%). Public books sit in the mid-20s — CBS Sports / Bleacher Report around Oregon −24.5, total near 51.5. HASHMARK’s Vegas column on this game is blank, so that is not a HASHMARK close.",
      "Oregon’s long FBS nonconference home streak meets a Pac-12 flagship with recent CFP history. HX is slightly cooler than AP (−2) and still top-five. If Boise keeps it inside two scores, that is a national story.",
    ],
    whyItMatters: "Best on-paper Week 1 game that isn’t ranked-ranked; CFP path optics.",
    sources: [
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=1",
      },
      {
        label: "CBS Sports",
        href: "https://www.cbssports.com/college-football/news/oregon-boise-state-prediction-pick-odds-spread-where-to-watch-live/",
      },
      {
        label: "Oregon Public Broadcasting",
        href: "https://www.opb.org/article/2026/09/03/oregon-hosts-boise-state-indiana-opens-title-defense-big-ten-football/",
      },
      {
        label: "NCAA.com",
        href: "https://www.ncaa.com/game/6604288",
      },
    ],
  },
  {
    slug: "week-1-ole-miss-louisville",
    kicker: "Week 1 · Ranked",
    headline: "Ole Miss–Louisville in Nashville is Week 1’s only Top 25 collision — and HX almost agrees with Vegas",
    dek: "A rare case where HASHMARK and the market are within a point and a half.",
    date: STORY_DATE_WEEK1,
    body: [
      "Sunday night at Nissan Stadium (6:30 CT, ABC): inaugural Music City Kickoff, the only ranked-on-ranked game in Week 1 — AP No. 9 Ole Miss vs No. 24 Louisville. HX has Ole Miss −7.9 (68.9%). The sourced Vegas close is Ole Miss −6.5 (O/U 55.5).",
      "HX ranks Ole Miss eighth (5.49, +1 vs AP). This is the models-agree counterpoint to the LSU card. The first regular-season AP poll posts Tuesday, Sept. 8.",
    ],
    whyItMatters: "Sole ranked-ranked Week 1 game; clean HX≈Vegas control story.",
    sources: [
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=1",
      },
      {
        label: "Associated Press",
        href: "https://apnews.com/live/top-25-college-football-poll-8-17-2026",
      },
      {
        label: "NCAA.com TV schedule",
        href: "https://www.ncaa.com/news/football/article/college-football-tv-schedule-game-times-preview",
      },
    ],
  },
  {
    slug: "week-1-notre-dame-lambeau",
    kicker: "Week 1 · Board",
    headline: "Notre Dame at Lambeau, plus the HX cards that don’t look like chalk",
    dek: "HX backs the Irish by three scores and quietly likes Toledo at Michigan State.",
    date: STORY_DATE_WEEK1,
    body: [
      "Sunday, Wisconsin vs No. 4 Notre Dame at Lambeau Field (6:30 CT, NBC). HX has Notre Dame −21.9 (87.1%). The sourced Vegas close is Notre Dame −20.5 (O/U 47.5). HX ranks the Irish third (7.09).",
      "Quiet notes off the same board: Cal −1.3 over UCLA (53.5%) is the only game in the 45–55% zone. Toledo −7.0 at Michigan State (67.1%, Friday 7:00 CT, FS1) — flag it; HASHMARK’s Vegas column is blank, so there is no HASHMARK close. Monday, SMU at Florida State is HX SMU −8.3 (69.6%).",
    ],
    whyItMatters: "Packages Sunday brand game with board curios that need Vegas fills.",
    sources: [
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule?w=1",
      },
      {
        label: "Oregon Public Broadcasting",
        href: "https://www.opb.org/article/2026/09/03/oregon-hosts-boise-state-indiana-opens-title-defense-big-ten-football/",
      },
      {
        label: "HASHMARK Board",
        href: "https://hashmarkcfb.com/",
      },
    ],
  },
  {
    slug: "week-0-tape",
    kicker: "Week 0 tape",
    headline: "Week 0 tape: 3/6 SU, 1/6 ATS. HX not retuned.",
    dek: "Hits USC, Virginia, Florida State. Misses Dublin, the Hawaiʻi flip, Memphis at UNLV. Vegas 4/6.",
    date: "Sunday, Aug 30, 2026",
    body: [
      "Pregame locks from /schedule. Elo = 1500 + 55×HX, HFA 60 (off on Neutral), quadratic spread. Win% was frozen. 70.8% SU is a 2019–2025 claim, not this tape.",
      "Hits: San José St at USC — HASHMARK USC 95.0% / −37.8, Vegas −38.5, final USC 42–26. SU hit, ATS no. NC State at Virginia — UVA 52.9% / −1.1, Vegas −4.0, final UVA 34–8. SU and ATS both hit. NM State at Florida St — FSU 87.7% / −22.6, Vegas −31.5, final FSU 34–17. SU hit, closer than Vegas, ATS no.",
      "Misses: UNC vs TCU, Dublin Neutral — TCU 74.2% / −10.9, Vegas −8.5, final UNC 15–10. Rain, 25 points, TCU WR Jordan Dwyer out. Dwyer is a note. We did not haircut the number. Hawaiʻi at Stanford, the flag — HASHMARK UH 53.8% / −1.4, Vegas Stanford −4.0, final Stanford 37–27. Frozen coach-change. If C20 had been on the matchup, Stanford ~59.6% / −3.6, near the close. That is a note, not a retune. Memphis at UNLV — UNLV 63.5% / −5.3, Vegas −4.0, final Memphis 27–21.",
      "NDSU and Sacramento State stay off this piece. They are not on the 136. Next week the matchup shows HX* win% and a units score. If they disagree by 4, the site flags it.",
    ],
    whyItMatters: "First 2026 public ledger vs the close. The 70.8% number waits until this tape has a season behind it.",
    sources: [
      {
        label: "HASHMARK Schedule",
        href: "https://hashmarkcfb.com/schedule",
      },
    ],
  },
  {
    slug: "dublin-unc-tcu",
    kicker: "Week 0 · Dublin",
    headline: "College football’s 2026 season opens in Dublin — UNC–TCU, take two",
    dek: "Bill Belichick’s second North Carolina team gets an overseas rematch with the TCU club that wrecked his debut.",
    date: STORY_DATE,
    body: [
      "The first FBS snap of 2026 will be taken an ocean away. North Carolina and TCU kick off the Aer Lingus College Football Classic at 11 a.m. CT Saturday at Aviva Stadium in Dublin, on ESPN — the fifth straight year the sport has opened in Ireland.",
      "This is not a random pairing. Last September in Chapel Hill, TCU beat the Tar Heels 48–14 in Belichick’s first game as a college head coach: 542 yards, 258 on the ground, three UNC turnovers flipped into two defensive scores. The Horned Frogs are different now. Josh Hoover transferred to Indiana. Offensive coordinator Kendal Briles left for South Carolina. Harvard transfer Jaden Craig is the new quarterback; former UConn OC Gordon Sammis is calling plays. TCU is receiving votes in the AP poll (11 points). UNC is unranked.",
      "HASHMARK is not close. TCU is HX 30, UNC HX 87. The model does not buy a revenge narrative. It buys a Power roster against a roster that was 4–8 a year ago.",
      "The Tar Heels named sixth-year transfer Billy Edwards Jr. (Maryland, Wisconsin) the starter. Belichick has preached ball security and explosive-play prevention all week. Defensive coordinator Steve Belichick remains on medical leave, and Bill will call the defense.",
      "There is no ranked-vs-ranked game in Week 0. This is the closest the sport has to a marquee opener.",
    ],
    whyItMatters: "Sets the tone for Belichick Year 2. HX says the scoreboard should not be a mystery.",
    sources: [
      {
        label: "ESPN Press Room",
        href: "https://espnpressroom.com/press-release/college-football-returns-espns-week-0-slate-opens-2026-season-with-dublin-duel-all-acc-clash-cricket-meac-swac-challenge-kickoff-and-more/",
      },
      {
        label: "CBS Sports",
        href: "https://www.cbssports.com/college-football/news/bill-belichick-defensive-play-caller-north-carolina-tcu-opener/",
      },
    ],
  },
  {
    slug: "belichick-calls-defense",
    kicker: "Week 0 · UNC",
    headline: "Bill Belichick will call UNC’s defense vs. TCU with Steve Belichick still out",
    dek: "North Carolina’s defensive coordinator remains on medical leave; his father takes the play sheet for the Dublin opener.",
    date: STORY_DATE,
    body: [
      "Steve Belichick was placed on medical leave Aug. 6. UNC has given no diagnosis and no return timeline. Bill said only, “Yeah, no updates,” and “We’ll work it out.”",
      "CBS Sports, citing On3, reports Bill Belichick will hold the defensive play sheet in Dublin. Defensive line coach Bob Diaco has led much of the in-week planning. Belichick last called a defense full-time with the 2019 Patriots.",
      "UNC’s defense was torched in last year’s TCU opener (48 points, 542 yards) and climbed to 24.5 points allowed per game by December. As of Friday, Aug. 28, Steve Belichick is out for the opener.",
    ],
    whyItMatters: "The only confirmed coaching-structure change affecting a Week 0 Power matchup.",
    sources: [
      {
        label: "CBS Sports",
        href: "https://www.cbssports.com/college-football/news/bill-belichick-defensive-play-caller-north-carolina-tcu-opener/",
      },
    ],
  },
  {
    slug: "memphis-at-unlv",
    kicker: "Week 0 · Group of Six",
    headline: "Memphis at UNLV is Week 0’s real game",
    dek: "Two Group of Six playoff hopefuls meet for the first time Saturday night in Las Vegas, with CFP-at-large math already in the room.",
    date: STORY_DATE,
    body: [
      "Memphis at UNLV, 9 p.m. CT, FOX, Allegiant Stadium. Dan Mullen: “You won’t feel it maybe after this game, but there’s going to be a lot of discussion about this game as the season goes on. Especially late into November.”",
      "First meeting. Charles Huff’s Memphis debut is a near-total rebuild (70-plus new players). UNLV is Year 2 under Mullen after 10–4. Both receiving AP votes (UNLV 4, Memphis 2). HASHMARK: UNLV HX 37, Memphis HX 50. Mullen named Jackson Arnold the starter; Alex Orji will play “pretty quick.” Huff had not named a Memphis starter as of late last week.",
    ],
    whyItMatters: "Highest-leverage Week 0 result for the Group of Six CFP race.",
    sources: [
      {
        label: "The Commercial Appeal",
        href: "https://www.commercialappeal.com/story/sports/college/memphis-tigers/2026/08/24/memphis-football-what-unlv-dan-mullen-said-about-season-opener/91411478007/",
      },
      {
        label: "Las Vegas Review-Journal",
        href: "https://www.reviewjournal.com/sports/unlv/unlv-football/jackson-arnold-named-unlvs-starting-quarterback-for-memphis-opener-3870646/",
      },
    ],
  },
  {
    slug: "usc-opens-shorthanded",
    kicker: "Week 0 · Ranked",
    headline: "Only ranked team in Week 0: No. 14 USC, minus its starting center",
    dek: "The Trojans open against San Jose State as the AP’s lone representative this weekend. HASHMARK has USC 22nd.",
    date: STORY_DATE,
    body: [
      "USC vs San Jose State, 2 p.m. CT, NBC, Coliseum. Starting center Kilian O’Connor suffered a season-ending knee injury in a non-contact camp drill. Tobias Raymond is expected to start at center. DT Jahkeem Stewart (foot) out at least for the opener. WR Tanook Hines is a game-time decision after an offseason medical procedure. HX: USC 22, SJSU 121. Jayden Maiava is the quarterback.",
    ],
    whyItMatters: "Only ranked result of the weekend. O’Connor’s loss is season-long. HX already had USC as a fade vs. the AP (−8).",
    sources: [
      {
        label: "CBS Sports",
        href: "https://www.cbssports.com/college-football/news/no-14-usc-loses-starting-center-kilian-oconnor-to-season-ending-knee-injury-in-practice/",
      },
    ],
  },
  {
    slug: "ndsu-first-fbs-game",
    kicker: "Week 0 · FBS",
    headline: "North Dakota State plays its first FBS game — against a program that already made the jump",
    dek: "The Bison host Jacksonville State in the Fargodome. HASHMARK’s 136-team board does not include NDSU or Sacramento State yet.",
    date: STORY_DATE,
    body: [
      "NDSU, 10 FCS titles between 2011 and 2024, is FBS now — Mountain West, 4:30 p.m. CT, CBSSN, Fargodome. Jacksonville State has 27 FBS wins and QB Caden Creel. HX has Jax State 83rd. NDSU is not on the HASHMARK 136-team table. SP+ already has 138 teams including NDSU and Sacramento State. Nathan Hayes is listed as NDSU’s starting quarterback.",
    ],
    whyItMatters: "Most significant program-status game of the weekend, and a hole in the HX board.",
    sources: [
      {
        label: "NCAA.com",
        href: "https://www.ncaa.com/news/football/article/2026-08-24/college-football-schedule-when-does-2026-college-football-season-start",
      },
    ],
  },
  {
    slug: "ap-preseason-frozen",
    kicker: "AP Poll",
    headline: "Ohio State is preseason No. 1. The defending champion is No. 6. Alabama is 13th.",
    dek: "The AP’s Aug. 17 poll is frozen until Sept. 8. HASHMARK disagrees with it on Indiana and Georgia.",
    date: STORY_DATE,
    body: [
      "Ohio State is AP No. 1 (40 of 69 first-place votes). Oregon No. 2. First time in 65 years the Big Ten occupies the top two preseason spots. Indiana, 16–0 national champion, is AP 6; HASHMARK has them 11th. Alabama is AP 13, first preseason outside the top 10 since 2008; HX has the Tide 9th. LSU is AP 11 / HX 20. Only USC among the 25 plays Saturday. First ranked-on-ranked game is Week 1: No. 9 Ole Miss vs No. 24 Louisville, Sept. 6. HX: Ole Miss 5, Louisville 25.",
    ],
    whyItMatters: "The ranking the sport plays under until Sept. 8, and HX’s running argument with it.",
    sources: [
      {
        label: "Associated Press",
        href: "https://apnews.com/article/fbc-t25-ap-top-25-bd2413a0e5694f53a5d59b0d511fbc34",
      },
    ],
  },
  {
    slug: "hawaii-at-stanford",
    kicker: "HX Flag",
    headline: "HX’s Week 0 flag — Hawaiʻi at Stanford",
    dek: "HASHMARK has Hawaiʻi 82nd and Stanford 102nd. A Rainbow Warriors win is not an upset on this board.",
    date: STORY_DATE,
    body: [
      "Hawaiʻi at Stanford, 6 p.m. CT, ACC Network. UH went 9–4, beat Stanford 23–20 in Honolulu last year, returns QB Micah Alejado. Stanford is Year 1 under Tavita Pritchard with Michigan transfer Davis Warren. ESPN win probability was reported around 60/40 Stanford. HX is on the visitor.",
    ],
    whyItMatters: "Cleanest HX-vs-public-lean on the Week 0 slate.",
    sources: [
      {
        label: "Hawaiʻi Athletics",
        href: "https://hawaiiathletics.com/news/2026/8/24/football-rainbow-warriors-travel-to-stanford-for-season-opener.aspx",
      },
    ],
  },
];

export type SlateHx = { slug: string; name: string; rank: number } | { name: string; rank: null };

export type SlateGame = {
  time: string;
  tv: string;
  note?: string;
  away: SlateHx;
  home: SlateHx;
  neutral?: boolean;
};

export const WEEK0_SLATE: SlateGame[] = [
  {
    time: "11 a.m.",
    tv: "ESPN",
    note: "Dublin",
    away: { slug: "tcu", name: "TCU", rank: 30 },
    home: { slug: "north-carolina", name: "UNC", rank: 87 },
    neutral: true,
  },
  {
    time: "2 p.m.",
    tv: "NBC",
    away: { slug: "san-jose-state", name: "San José State", rank: 121 },
    home: { slug: "usc", name: "USC", rank: 22 },
  },
  {
    time: "2:30 p.m.",
    tv: "ESPN",
    away: { slug: "nc-state", name: "NC State", rank: 32 },
    home: { slug: "virginia", name: "Virginia", rank: 45 },
  },
  {
    time: "4:30 p.m.",
    tv: "CBSSN",
    away: { slug: "jacksonville-state", name: "Jax State", rank: 83 },
    home: { name: "NDSU", rank: null },
  },
  {
    time: "5:30 p.m.",
    tv: "ESPN+",
    away: { name: "Sacramento State", rank: null },
    home: { slug: "eastern-michigan", name: "EMU", rank: 105 },
  },
  {
    time: "6 p.m.",
    tv: "CW",
    away: { slug: "new-mexico-state", name: "NMSU", rank: 125 },
    home: { slug: "florida-state", name: "Florida State", rank: 65 },
  },
  {
    time: "6 p.m.",
    tv: "ACCN",
    away: { slug: "hawaii", name: "Hawaiʻi", rank: 82 },
    home: { slug: "stanford", name: "Stanford", rank: 102 },
  },
  {
    time: "9 p.m.",
    tv: "FOX",
    away: { slug: "memphis", name: "Memphis", rank: 50 },
    home: { slug: "unlv", name: "UNLV", rank: 37 },
  },
];

export function listStories() {
  return STORIES;
}

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug) ?? null;
}
