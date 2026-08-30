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

export const STORIES: Story[] = [
  {
    slug: "week-0-tape",
    kicker: "Week 0 tape",
    headline: "Week 0 tape: 3/6 SU, 1/6 ATS",
    dek: "Six on the board. Hits USC, UVA, FSU. Misses Dublin, Hawaiʻi, Memphis. HX not retuned.",
    date: "Sunday, Aug 30, 2026",
    body: [
      "The Week 0 board is in. HASHMARK went 3-for-6 straight up and 1-for-6 ATS against the close. Vegas went 4-for-6 SU. This is the first live 2026 proof. The 70.8% SU mark is 2019–2025, not this Saturday.",
      "Hits: USC 42–26 (HX USC 95.0% / −37.8, Vegas −38.5). Virginia 34–8 (UVA 52.9% / −1.1, Vegas −4) — the ATS hit. FSU 34–17 (FSU 87.7% / −22.6, Vegas −31.5). HX was closer than Vegas on FSU.",
      "Misses: Dublin, UNC 15–10. HASHMARK had TCU 74.2% / −10.9 Neutral; Vegas TCU −8.5. Hawaiʻi flip: HASHMARK UH 53.8% / −1.4, Vegas Stanford −4, Stanford 37–27. Coach-change was frozen on the matchup; Stanford would have been ~59.6% / −3.6. That is a note, not a retune. Memphis 27–21 at UNLV (HX UNLV 63.5% / −5.3, Vegas UNLV −4).",
      "NDSU and Sac State proposed lines both hit. They stay off this piece. Not on the 136.",
    ],
    whyItMatters: "Sunday tape vs the close is the first 2026 proof. HX stays put.",
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
