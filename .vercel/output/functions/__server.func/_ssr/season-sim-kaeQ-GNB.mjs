import { i as fcsStubsForTeam, r as fcsStubIsFinal } from "./fcs-stubs-Cww2tI6J.mjs";
import { r as sim_free_hx2026_8_default } from "./sim_free_hx2026_8-OqwTnGZT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/season-sim-kaeQ-GNB.js
var week10_tape_2026_default = {
	meta: {
		"as_of": "2026-11-08 10:30 AM CT",
		"week": 10,
		"season": 2026,
		"scope": "FBS–FBS only",
		"n_games": 61,
		"su": "36/61",
		"su_pct": 59,
		"closer_n": 5,
		"hx_closer": "3/5",
		"hx_closer_pct": 60,
		"vegas_closer": "2/5",
		"closer_ties": 0,
		"hx_closer_of_slate": "3/61",
		"closer_note": "Closer is HX vs the stamped Vegas close (smaller |line − home margin|), so it is graded only where a Vegas close is stamped: 5 of 61 cards. 56 Week 10 cards stayed blank (no exact ESPN DraftKings = CBS Sports match at the 0080 stamp). Same definition as Week 8 and Week 9 (closer on Vegas-lined cards only). Raw grader count over the full slate is 3/61.",
		"ats_hx": "3/5",
		"ats_hx_pct": 60,
		"ats_note": "Re-derived: HX side vs stamped Vegas close; HX = Vegas and pushes excluded (n=5).",
		"mae_hx": 15.95,
		"mae_vegas": 19.8,
		"mae_note": "MAE HX over all 61 cards; MAE Vegas over the 5 cards with a stamped close.",
		"brier": .266,
		"season_w1_w10_su": "70.6%",
		"season_w1_w10_closer": "42.0%",
		"season_w1_w10_su_frac": "381/540",
		"season_w1_w10_closer_frac": "142/338",
		"season_note": "Arithmetic: Week 9 tape W1–W9 rollup (345/479 SU, 139/333 closer) plus this week (SU 36/61, closer 3/5 on Vegas-lined cards). Not a fresh W1–W9 audit.",
		"sources": {
			"finals": "ESPN scoreboard/game pages STATUS_FINAL (migrations 0082–0086); 61/61 scores match ESPN week=10&groups=80&dates=2026 scoreboard",
			"grade": "HX 2026.7 pregame board (data/week5_od_hx_ship_2026.json hx_post) through src/lib/cfb/model.ts quadratic + HFA 60 (0 neutral); Vegas = stamped closes on games.vegas_* (0080)",
			"hx_ranks": "data/week5_od_hx_ship_2026.json (HX 2026.7 pregame, unchanged by this tape)",
			"method_check": "Same grader reproduces the published Week 9 tape exactly (SU 44/54, closer 3/6, Vegas 3/6, 0 ties, ATS 4/6, MAE 12.38/17.0, Brier 0.153)"
		},
		"coverage_notes": [
			"All 61 FBS–FBS games are ESPN STATUS_FINAL. Week 10 finals stamped in 0082–0086 (Tue–Sat nightly stamps). No stragglers.",
			"Vegas closes stay the stamped 0080 Week 10 book (5 cards). This tape does not add or rewrite lines.",
			"HX lines on the ledger are the HX 2026.7 pregame board. The tape is not a retune.",
			"Closer 3/5 (60.0%) on the Vegas-lined cards — small sample; not under 45%, so no closer FLAG. SU 59.0% is under 70%. Soft-cal FLAG remains.",
			"Season 381/540 is arithmetic, not a fresh audit of Weeks 1-9."
		],
		"headline_flags": {
			"closer_below_45": false,
			"su_below_70": true,
			"n_su_misses": 25,
			"n_winner_flip_hits": 2,
			"n_winner_flip_misses": 1
		}
	},
	su_misses: [
		{
			"matchup": "Buffalo@Miami (OH)",
			"hx_fav": "Miami (OH)",
			"hx_spread_display": "Miami (OH) -11.5",
			"vegas_details": null,
			"final": "Buffalo 34–Miami (OH) 31 OT",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401866454"
		},
		{
			"matchup": "Ball State@Massachusetts",
			"hx_fav": "Ball State",
			"hx_spread_display": "Ball State -7.7",
			"vegas_details": null,
			"final": "Ball State 30–Massachusetts 31 OT",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401866455"
		},
		{
			"matchup": "Central Michigan@Eastern Michigan",
			"hx_fav": "Eastern Michigan",
			"hx_spread_display": "Eastern Michigan -1.6",
			"vegas_details": null,
			"final": "Central Michigan 35–Eastern Michigan 7",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401866456"
		},
		{
			"matchup": "UTSA@Florida Atlantic",
			"hx_fav": "UTSA",
			"hx_spread_display": "UTSA -10.4",
			"vegas_details": null,
			"final": "UTSA 29–Florida Atlantic 60",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401862817"
		},
		{
			"matchup": "North Carolina@UConn",
			"hx_fav": "UConn",
			"hx_spread_display": "UConn -0.7",
			"vegas_details": null,
			"final": "North Carolina 38–UConn 21",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858292"
		},
		{
			"matchup": "UCLA@Minnesota",
			"hx_fav": "Minnesota",
			"hx_spread_display": "Minnesota -4.9",
			"vegas_details": null,
			"final": "UCLA 34–Minnesota 20",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858512"
		},
		{
			"matchup": "Tulsa@Tulane",
			"hx_fav": "Tulane",
			"hx_spread_display": "Tulane -9.7",
			"vegas_details": null,
			"final": "Tulsa 60–Tulane 10",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401862822"
		},
		{
			"matchup": "Duke@NC State",
			"hx_fav": "NC State",
			"hx_spread_display": "NC State -5.0",
			"vegas_details": null,
			"final": "Duke 41–NC State 3",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858286"
		},
		{
			"matchup": "Old Dominion@Coastal Carolina",
			"hx_fav": "Coastal Carolina",
			"hx_spread_display": "Coastal Carolina -1.4",
			"vegas_details": null,
			"final": "Old Dominion 21–Coastal Carolina 8",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401869945"
		},
		{
			"matchup": "Georgia State@App State",
			"hx_fav": "App State",
			"hx_spread_display": "App State -10.2",
			"vegas_details": "APP -3.5",
			"final": "Georgia State 39–App State 23",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401869927"
		},
		{
			"matchup": "Texas A&M@South Carolina",
			"hx_fav": "Texas A&M",
			"hx_spread_display": "Texas A&M -6.4",
			"vegas_details": null,
			"final": "Texas A&M 9–South Carolina 17",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401856744"
		},
		{
			"matchup": "UL Monroe@Arkansas State",
			"hx_fav": "Arkansas State",
			"hx_spread_display": "Arkansas State -15.5",
			"vegas_details": null,
			"final": "UL Monroe 19–Arkansas State 17",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401869936"
		},
		{
			"matchup": "Delaware@Kennesaw State",
			"hx_fav": "Delaware",
			"hx_spread_display": "Delaware -0.7",
			"vegas_details": null,
			"final": "Delaware 40–Kennesaw State 42",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401871073"
		},
		{
			"matchup": "Oregon@Ohio State",
			"hx_fav": "Ohio State",
			"hx_spread_display": "Ohio State -6.2",
			"vegas_details": null,
			"final": "Oregon 41–Ohio State 28",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858514"
		},
		{
			"matchup": "Penn State@Washington",
			"hx_fav": "Washington",
			"hx_spread_display": "Washington -0.3",
			"vegas_details": null,
			"final": "Penn State 28–Washington 25",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858516"
		},
		{
			"matchup": "Temple@Navy",
			"hx_fav": "Temple",
			"hx_spread_display": "Temple -2.2",
			"vegas_details": null,
			"final": "Temple 35–Navy 42",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401862820"
		},
		{
			"matchup": "Marshall@Georgia Southern",
			"hx_fav": "Marshall",
			"hx_spread_display": "Marshall -2.9",
			"vegas_details": "GASO -8.5",
			"final": "Marshall 13–Georgia Southern 49",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401869951"
		},
		{
			"matchup": "Western Kentucky@Middle Tennessee",
			"hx_fav": "Western Kentucky",
			"hx_spread_display": "Western Kentucky -13.6",
			"vegas_details": null,
			"final": "Western Kentucky 42–Middle Tennessee 51",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401871076"
		},
		{
			"matchup": "UCF@Kansas",
			"hx_fav": "Kansas",
			"hx_spread_display": "Kansas -8.4",
			"vegas_details": null,
			"final": "UCF 33–Kansas 32",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401856850"
		},
		{
			"matchup": "Louisiana Tech@Troy",
			"hx_fav": "Troy",
			"hx_spread_display": "Troy -6.4",
			"vegas_details": null,
			"final": "Louisiana Tech 41–Troy 17",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401871098"
		},
		{
			"matchup": "Michigan State@Michigan",
			"hx_fav": "Michigan",
			"hx_spread_display": "Michigan -30.7",
			"vegas_details": null,
			"final": "Michigan State 15–Michigan 6",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858511"
		},
		{
			"matchup": "Air Force@Army",
			"hx_fav": "Army",
			"hx_spread_display": "Army -10.5",
			"vegas_details": null,
			"final": "Air Force 24–Army 21",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401862823"
		},
		{
			"matchup": "Oklahoma@Florida",
			"hx_fav": "Florida",
			"hx_spread_display": "Florida -1.2",
			"vegas_details": null,
			"final": "Oklahoma 23–Florida 7",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401856739"
		},
		{
			"matchup": "Wyoming@UNLV",
			"hx_fav": "UNLV",
			"hx_spread_display": "UNLV -24.5",
			"vegas_details": null,
			"final": "Wyoming 41–UNLV 35",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401864535"
		},
		{
			"matchup": "Oklahoma State@Kansas State",
			"hx_fav": "Kansas State",
			"hx_spread_display": "Kansas State -16.1",
			"vegas_details": null,
			"final": "Oklahoma State 66–Kansas State 28",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401856854"
		}
	],
	winner_flip_hits: [{
		"matchup": "South Florida @ East Carolina",
		"hx": "East Carolina -1.5",
		"vegas": "USF -1.5",
		"final": "17–20",
		"espn_event_id": "401862818"
	}, {
		"matchup": "Iowa @ Northwestern",
		"hx": "Iowa -2.3",
		"vegas": "NU -1.5",
		"final": "24–10",
		"espn_event_id": "401858513"
	}],
	winner_flip_misses: [{
		"matchup": "Marshall @ Georgia Southern",
		"hx": "Marshall -2.9",
		"vegas": "GASO -8.5",
		"final": "13–49",
		"espn_event_id": "401869951"
	}],
	games: [
		{
			"espn_event_id": "401866453",
			"kick_ct": "2026-11-03 18:00",
			"tv": "ESPN2",
			"away": "Ohio",
			"home": "Akron",
			"away_slug": "ohio",
			"home_slug": "akron",
			"score_away": 28,
			"score_home": 20,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Ohio",
			"hx_spread_display": "Ohio -8.6",
			"vegas_details": null,
			"home_hx_rank": 117,
			"away_hx_rank": 67,
			"flags": []
		},
		{
			"espn_event_id": "401866454",
			"kick_ct": "2026-11-03 19:00",
			"tv": "ESPN",
			"away": "Buffalo",
			"home": "Miami (OH)",
			"away_slug": "buffalo",
			"home_slug": "miami-oh",
			"score_away": 34,
			"score_home": 31,
			"ot": true,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Miami (OH)",
			"hx_spread_display": "Miami (OH) -11.5",
			"vegas_details": null,
			"home_hx_rank": 81,
			"away_hx_rank": 115,
			"flags": []
		},
		{
			"espn_event_id": "401866455",
			"kick_ct": "2026-11-04 18:00",
			"tv": "ESPNU",
			"away": "Ball State",
			"home": "Massachusetts",
			"away_slug": "ball-state",
			"home_slug": "massachusetts",
			"score_away": 30,
			"score_home": 31,
			"ot": true,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Ball State",
			"hx_spread_display": "Ball State -7.7",
			"vegas_details": null,
			"home_hx_rank": 136,
			"away_hx_rank": 130,
			"flags": []
		},
		{
			"espn_event_id": "401866456",
			"kick_ct": "2026-11-04 18:30",
			"tv": "ESPN2",
			"away": "Central Michigan",
			"home": "Eastern Michigan",
			"away_slug": "central-michigan",
			"home_slug": "eastern-michigan",
			"score_away": 35,
			"score_home": 7,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Eastern Michigan",
			"hx_spread_display": "Eastern Michigan -1.6",
			"vegas_details": null,
			"home_hx_rank": 107,
			"away_hx_rank": 113,
			"flags": []
		},
		{
			"espn_event_id": "401862817",
			"kick_ct": "2026-11-05 18:30",
			"tv": "ESPN",
			"away": "UTSA",
			"home": "Florida Atlantic",
			"away_slug": "utsa",
			"home_slug": "florida-atlantic",
			"score_away": 29,
			"score_home": 60,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "UTSA",
			"hx_spread_display": "UTSA -10.4",
			"vegas_details": null,
			"home_hx_rank": 110,
			"away_hx_rank": 48,
			"flags": []
		},
		{
			"espn_event_id": "401869964",
			"kick_ct": "2026-11-05 19:00",
			"tv": "ESPN2",
			"away": "James Madison",
			"home": "Southern Miss",
			"away_slug": "james-madison",
			"home_slug": "southern-miss",
			"score_away": 54,
			"score_home": 23,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "James Madison",
			"hx_spread_display": "James Madison -3.2",
			"vegas_details": null,
			"home_hx_rank": 77,
			"away_hx_rank": 44,
			"flags": []
		},
		{
			"espn_event_id": "401858288",
			"kick_ct": "2026-11-06 18:00",
			"tv": "ESPN",
			"away": "Virginia Tech",
			"home": "SMU",
			"away_slug": "virginia-tech",
			"home_slug": "smu",
			"score_away": 28,
			"score_home": 51,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "SMU",
			"hx_spread_display": "SMU -12.6",
			"vegas_details": null,
			"home_hx_rank": 20,
			"away_hx_rank": 49,
			"flags": []
		},
		{
			"espn_event_id": "401862818",
			"kick_ct": "2026-11-06 18:30",
			"tv": "ESPN2",
			"away": "South Florida",
			"home": "East Carolina",
			"away_slug": "usf",
			"home_slug": "east-carolina",
			"score_away": 17,
			"score_home": 20,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "East Carolina",
			"hx_spread_display": "East Carolina -1.5",
			"vegas_details": "USF -1.5",
			"home_hx_rank": 74,
			"away_hx_rank": 69,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401858510",
			"kick_ct": "2026-11-06 19:00",
			"tv": "FOX",
			"away": "Nebraska",
			"home": "Illinois",
			"away_slug": "nebraska",
			"home_slug": "illinois",
			"score_away": 13,
			"score_home": 24,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Illinois",
			"hx_spread_display": "Illinois -1.9",
			"vegas_details": null,
			"home_hx_rank": 41,
			"away_hx_rank": 34,
			"flags": []
		},
		{
			"espn_event_id": "401864533",
			"kick_ct": "2026-11-06 20:00",
			"tv": "CBSSN",
			"away": "New Mexico",
			"home": "Nevada",
			"away_slug": "new-mexico",
			"home_slug": "nevada",
			"score_away": 31,
			"score_home": 3,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "New Mexico",
			"hx_spread_display": "New Mexico -7.1",
			"vegas_details": null,
			"home_hx_rank": 131,
			"away_hx_rank": 98,
			"flags": []
		},
		{
			"espn_event_id": "401856855",
			"kick_ct": "2026-11-06 21:15",
			"tv": "ESPN",
			"away": "TCU",
			"home": "Arizona",
			"away_slug": "tcu",
			"home_slug": "arizona",
			"score_away": 28,
			"score_home": 29,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Arizona",
			"hx_spread_display": "Arizona -3.7",
			"vegas_details": null,
			"home_hx_rank": 30,
			"away_hx_rank": 32,
			"flags": []
		},
		{
			"espn_event_id": "401856743",
			"kick_ct": "2026-11-07 11:00",
			"tv": "ESPN",
			"away": "Texas",
			"home": "Missouri",
			"away_slug": "texas",
			"home_slug": "missouri",
			"score_away": 34,
			"score_home": 20,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Texas",
			"hx_spread_display": "Texas -3.3",
			"vegas_details": null,
			"home_hx_rank": 14,
			"away_hx_rank": 5,
			"flags": []
		},
		{
			"espn_event_id": "401856849",
			"kick_ct": "2026-11-07 11:00",
			"tv": "ABC",
			"away": "BYU",
			"home": "Utah",
			"away_slug": "byu",
			"home_slug": "utah",
			"score_away": 20,
			"score_home": 28,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Utah",
			"hx_spread_display": "Utah -3.7",
			"vegas_details": null,
			"home_hx_rank": 13,
			"away_hx_rank": 17,
			"flags": []
		},
		{
			"espn_event_id": "401858285",
			"kick_ct": "2026-11-07 11:00",
			"tv": "ESPN2",
			"away": "Clemson",
			"home": "Syracuse",
			"away_slug": "clemson",
			"home_slug": "syracuse",
			"score_away": 18,
			"score_home": 13,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Clemson",
			"hx_spread_display": "Clemson -13.6",
			"vegas_details": null,
			"home_hx_rank": 91,
			"away_hx_rank": 22,
			"flags": []
		},
		{
			"espn_event_id": "401858289",
			"kick_ct": "2026-11-07 11:00",
			"tv": "ACC Network",
			"away": "Florida State",
			"home": "Boston College",
			"away_slug": "florida-state",
			"home_slug": "boston-college",
			"score_away": 31,
			"score_home": 24,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Florida State",
			"hx_spread_display": "Florida State -4.6",
			"vegas_details": null,
			"home_hx_rank": 104,
			"away_hx_rank": 63,
			"flags": []
		},
		{
			"espn_event_id": "401858292",
			"kick_ct": "2026-11-07 11:00",
			"tv": "CBSSN",
			"away": "North Carolina",
			"home": "UConn",
			"away_slug": "north-carolina",
			"home_slug": "uconn",
			"score_away": 38,
			"score_home": 21,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "UConn",
			"hx_spread_display": "UConn -0.7",
			"vegas_details": null,
			"home_hx_rank": 95,
			"away_hx_rank": 85,
			"flags": []
		},
		{
			"espn_event_id": "401858512",
			"kick_ct": "2026-11-07 11:00",
			"tv": "FOX",
			"away": "UCLA",
			"home": "Minnesota",
			"away_slug": "ucla",
			"home_slug": "minnesota",
			"score_away": 34,
			"score_home": 20,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Minnesota",
			"hx_spread_display": "Minnesota -4.9",
			"vegas_details": null,
			"home_hx_rank": 35,
			"away_hx_rank": 45,
			"flags": []
		},
		{
			"espn_event_id": "401862822",
			"kick_ct": "2026-11-07 11:00",
			"tv": "ESPNU",
			"away": "Tulsa",
			"home": "Tulane",
			"away_slug": "tulsa",
			"home_slug": "tulane",
			"score_away": 60,
			"score_home": 10,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Tulane",
			"hx_spread_display": "Tulane -9.7",
			"vegas_details": null,
			"home_hx_rank": 90,
			"away_hx_rank": 111,
			"flags": []
		},
		{
			"espn_event_id": "401858286",
			"kick_ct": "2026-11-07 11:30",
			"tv": "CW",
			"away": "Duke",
			"home": "NC State",
			"away_slug": "duke",
			"home_slug": "nc-state",
			"score_away": 41,
			"score_home": 3,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "NC State",
			"hx_spread_display": "NC State -5.0",
			"vegas_details": null,
			"home_hx_rank": 33,
			"away_hx_rank": 42,
			"flags": []
		},
		{
			"espn_event_id": "401858515",
			"kick_ct": "2026-11-07 11:30",
			"tv": "BTN",
			"away": "Maryland",
			"home": "Purdue",
			"away_slug": "maryland",
			"home_slug": "purdue",
			"score_away": 34,
			"score_home": 29,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Maryland",
			"hx_spread_display": "Maryland -0.1",
			"vegas_details": null,
			"home_hx_rank": 93,
			"away_hx_rank": 73,
			"flags": []
		},
		{
			"espn_event_id": "401856738",
			"kick_ct": "2026-11-07 11:45",
			"tv": "SEC Network",
			"away": "Arkansas",
			"home": "Auburn",
			"away_slug": "arkansas",
			"home_slug": "auburn",
			"score_away": 23,
			"score_home": 26,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Auburn",
			"hx_spread_display": "Auburn -8.8",
			"vegas_details": null,
			"home_hx_rank": 31,
			"away_hx_rank": 60,
			"flags": []
		},
		{
			"espn_event_id": "401869945",
			"kick_ct": "2026-11-07 12:00",
			"tv": "ESPN+",
			"away": "Old Dominion",
			"home": "Coastal Carolina",
			"away_slug": "old-dominion",
			"home_slug": "coastal-carolina",
			"score_away": 21,
			"score_home": 8,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Coastal Carolina",
			"hx_spread_display": "Coastal Carolina -1.4",
			"vegas_details": null,
			"home_hx_rank": 99,
			"away_hx_rank": 92,
			"flags": []
		},
		{
			"espn_event_id": "401869927",
			"kick_ct": "2026-11-07 13:30",
			"tv": "ESPN+",
			"away": "Georgia State",
			"home": "App State",
			"away_slug": "georgia-state",
			"home_slug": "app-state",
			"score_away": 39,
			"score_home": 23,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "App State",
			"hx_spread_display": "App State -10.2",
			"vegas_details": "APP -3.5",
			"home_hx_rank": 102,
			"away_hx_rank": 122,
			"flags": []
		},
		{
			"espn_event_id": "401856744",
			"kick_ct": "2026-11-07 14:00",
			"tv": "ESPN",
			"away": "Texas A&M",
			"home": "South Carolina",
			"away_slug": "texas-am",
			"home_slug": "south-carolina",
			"score_away": 9,
			"score_home": 17,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Texas A&M",
			"hx_spread_display": "Texas A&M -6.4",
			"vegas_details": null,
			"home_hx_rank": 27,
			"away_hx_rank": 6,
			"flags": []
		},
		{
			"espn_event_id": "401869936",
			"kick_ct": "2026-11-07 14:00",
			"tv": "ESPN+",
			"away": "UL Monroe",
			"home": "Arkansas State",
			"away_slug": "ul-monroe",
			"home_slug": "arkansas-state",
			"score_away": 19,
			"score_home": 17,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Arkansas State",
			"hx_spread_display": "Arkansas State -15.5",
			"vegas_details": null,
			"home_hx_rank": 94,
			"away_hx_rank": 128,
			"flags": []
		},
		{
			"espn_event_id": "401871073",
			"kick_ct": "2026-11-07 14:00",
			"tv": "ESPN+",
			"away": "Delaware",
			"home": "Kennesaw State",
			"away_slug": "delaware",
			"home_slug": "kennesaw-state",
			"score_away": 40,
			"score_home": 42,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Delaware",
			"hx_spread_display": "Delaware -0.7",
			"vegas_details": null,
			"home_hx_rank": 119,
			"away_hx_rank": 105,
			"flags": []
		},
		{
			"espn_event_id": "401856740",
			"kick_ct": "2026-11-07 14:30",
			"tv": "ABC",
			"away": "Alabama",
			"home": "LSU",
			"away_slug": "alabama",
			"home_slug": "lsu",
			"score_away": 31,
			"score_home": 13,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Alabama",
			"hx_spread_display": "Alabama -0.2",
			"vegas_details": null,
			"home_hx_rank": 18,
			"away_hx_rank": 9,
			"flags": []
		},
		{
			"espn_event_id": "401858514",
			"kick_ct": "2026-11-07 14:30",
			"tv": "CBS",
			"away": "Oregon",
			"home": "Ohio State",
			"away_slug": "oregon",
			"home_slug": "ohio-state",
			"score_away": 41,
			"score_home": 28,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Ohio State",
			"hx_spread_display": "Ohio State -6.2",
			"vegas_details": null,
			"home_hx_rank": 2,
			"away_hx_rank": 4,
			"flags": []
		},
		{
			"espn_event_id": "401858516",
			"kick_ct": "2026-11-07 14:30",
			"tv": "FS1",
			"away": "Penn State",
			"home": "Washington",
			"away_slug": "penn-state",
			"home_slug": "washington",
			"score_away": 28,
			"score_home": 25,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Washington",
			"hx_spread_display": "Washington -0.3",
			"vegas_details": null,
			"home_hx_rank": 25,
			"away_hx_rank": 15,
			"flags": []
		},
		{
			"espn_event_id": "401862819",
			"kick_ct": "2026-11-07 14:30",
			"tv": "ESPN+",
			"away": "Charlotte",
			"home": "UAB",
			"away_slug": "charlotte",
			"home_slug": "uab",
			"score_away": 12,
			"score_home": 23,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "UAB",
			"hx_spread_display": "UAB -16.6",
			"vegas_details": null,
			"home_hx_rank": 100,
			"away_hx_rank": 133,
			"flags": []
		},
		{
			"espn_event_id": "401862820",
			"kick_ct": "2026-11-07 14:30",
			"tv": "CBSSN",
			"away": "Temple",
			"home": "Navy",
			"away_slug": "temple",
			"home_slug": "navy",
			"score_away": 35,
			"score_home": 42,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Temple",
			"hx_spread_display": "Temple -2.2",
			"vegas_details": null,
			"home_hx_rank": 129,
			"away_hx_rank": 112,
			"flags": []
		},
		{
			"espn_event_id": "401869951",
			"kick_ct": "2026-11-07 14:30",
			"tv": "ESPN+",
			"away": "Marshall",
			"home": "Georgia Southern",
			"away_slug": "marshall",
			"home_slug": "georgia-southern",
			"score_away": 13,
			"score_home": 49,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Marshall",
			"hx_spread_display": "Marshall -2.9",
			"vegas_details": "GASO -8.5",
			"home_hx_rank": 96,
			"away_hx_rank": 65,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401871076",
			"kick_ct": "2026-11-07 14:30",
			"tv": "ESPN+",
			"away": "Western Kentucky",
			"home": "Middle Tennessee",
			"away_slug": "western-kentucky",
			"home_slug": "middle-tennessee",
			"score_away": 42,
			"score_home": 51,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Western Kentucky",
			"hx_spread_display": "Western Kentucky -13.6",
			"vegas_details": null,
			"home_hx_rank": 126,
			"away_hx_rank": 62,
			"flags": []
		},
		{
			"espn_event_id": "401856850",
			"kick_ct": "2026-11-07 14:45",
			"tv": "ESPN2",
			"away": "UCF",
			"home": "Kansas",
			"away_slug": "ucf",
			"home_slug": "kansas",
			"score_away": 33,
			"score_home": 32,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Kansas",
			"hx_spread_display": "Kansas -8.4",
			"vegas_details": null,
			"home_hx_rank": 55,
			"away_hx_rank": 78,
			"flags": []
		},
		{
			"espn_event_id": "401862821",
			"kick_ct": "2026-11-07 15:00",
			"tv": "ESPNU",
			"away": "Rice",
			"home": "North Texas",
			"away_slug": "rice",
			"home_slug": "north-texas",
			"score_away": 23,
			"score_home": 52,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "North Texas",
			"hx_spread_display": "North Texas -7.7",
			"vegas_details": null,
			"home_hx_rank": 103,
			"away_hx_rank": 116,
			"flags": []
		},
		{
			"espn_event_id": "401864534",
			"kick_ct": "2026-11-07 15:00",
			"tv": "MW+",
			"away": "Northern Illinois",
			"home": "San José State",
			"away_slug": "northern-illinois",
			"home_slug": "san-jose-state",
			"score_away": 19,
			"score_home": 30,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "San José State",
			"hx_spread_display": "San José State -5.2",
			"vegas_details": null,
			"home_hx_rank": 121,
			"away_hx_rank": 127,
			"flags": []
		},
		{
			"espn_event_id": "401871074",
			"kick_ct": "2026-11-07 15:00",
			"tv": "ESPN+",
			"away": "Missouri State",
			"home": "Florida International",
			"away_slug": "missouri-state",
			"home_slug": "fiu",
			"score_away": 20,
			"score_home": 23,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Florida International",
			"hx_spread_display": "Florida International -2.2",
			"vegas_details": null,
			"home_hx_rank": 109,
			"away_hx_rank": 106,
			"flags": []
		},
		{
			"espn_event_id": "401871098",
			"kick_ct": "2026-11-07 15:00",
			"tv": "ESPN+",
			"away": "Louisiana Tech",
			"home": "Troy",
			"away_slug": "louisiana-tech",
			"home_slug": "troy",
			"score_away": 41,
			"score_home": 17,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Troy",
			"hx_spread_display": "Troy -6.4",
			"vegas_details": null,
			"home_hx_rank": 87,
			"away_hx_rank": 101,
			"flags": []
		},
		{
			"espn_event_id": "401856742",
			"kick_ct": "2026-11-07 15:15",
			"tv": "SEC Network",
			"away": "Vanderbilt",
			"home": "Mississippi State",
			"away_slug": "vanderbilt",
			"home_slug": "mississippi-state",
			"score_away": 25,
			"score_home": 23,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Vanderbilt",
			"hx_spread_display": "Vanderbilt -3.4",
			"vegas_details": null,
			"home_hx_rank": 66,
			"away_hx_rank": 28,
			"flags": []
		},
		{
			"espn_event_id": "401858517",
			"kick_ct": "2026-11-07 15:15",
			"tv": "BTN",
			"away": "Rutgers",
			"home": "Wisconsin",
			"away_slug": "rutgers",
			"home_slug": "wisconsin",
			"score_away": 10,
			"score_home": 31,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Wisconsin",
			"hx_spread_display": "Wisconsin -7.3",
			"vegas_details": null,
			"home_hx_rank": 50,
			"away_hx_rank": 70,
			"flags": []
		},
		{
			"espn_event_id": "401869968",
			"kick_ct": "2026-11-07 16:00",
			"tv": "ESPN+",
			"away": "South Alabama",
			"home": "Louisiana",
			"away_slug": "south-alabama",
			"home_slug": "louisiana",
			"score_away": 26,
			"score_home": 28,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Louisiana",
			"hx_spread_display": "Louisiana -9.1",
			"vegas_details": null,
			"home_hx_rank": 86,
			"away_hx_rank": 108,
			"flags": []
		},
		{
			"espn_event_id": "401860911",
			"kick_ct": "2026-11-07 17:00",
			"tv": "USA Net",
			"away": "Boise State",
			"home": "Colorado State",
			"away_slug": "boise-state",
			"home_slug": "colorado-state",
			"score_away": 64,
			"score_home": 38,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Boise State",
			"hx_spread_display": "Boise State -11.9",
			"vegas_details": null,
			"home_hx_rank": 114,
			"away_hx_rank": 47,
			"flags": []
		},
		{
			"espn_event_id": "401856745",
			"kick_ct": "2026-11-07 17:15",
			"tv": "ESPN",
			"away": "Kentucky",
			"home": "Tennessee",
			"away_slug": "kentucky",
			"home_slug": "tennessee",
			"score_away": 6,
			"score_home": 34,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Tennessee",
			"hx_spread_display": "Tennessee -16.7",
			"vegas_details": null,
			"home_hx_rank": 19,
			"away_hx_rank": 64,
			"flags": []
		},
		{
			"espn_event_id": "401871075",
			"kick_ct": "2026-11-07 18:00",
			"tv": "CBSSN",
			"away": "Sam Houston",
			"home": "Jacksonville State",
			"away_slug": "sam-houston",
			"home_slug": "jacksonville-state",
			"score_away": 14,
			"score_home": 47,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Jacksonville State",
			"hx_spread_display": "Jacksonville State -14.9",
			"vegas_details": null,
			"home_hx_rank": 80,
			"away_hx_rank": 120,
			"flags": []
		},
		{
			"espn_event_id": "401856741",
			"kick_ct": "2026-11-07 18:30",
			"tv": "ABC",
			"away": "Georgia",
			"home": "Ole Miss",
			"away_slug": "georgia",
			"home_slug": "ole-miss",
			"score_away": 42,
			"score_home": 7,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Georgia",
			"hx_spread_display": "Georgia -4.1",
			"vegas_details": "UGA -3",
			"home_hx_rank": 8,
			"away_hx_rank": 1,
			"flags": []
		},
		{
			"espn_event_id": "401856852",
			"kick_ct": "2026-11-07 18:30",
			"tv": "ESPN2",
			"away": "Colorado",
			"home": "Arizona State",
			"away_slug": "colorado",
			"home_slug": "arizona-state",
			"score_away": 10,
			"score_home": 20,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Arizona State",
			"hx_spread_display": "Arizona State -9.4",
			"vegas_details": null,
			"home_hx_rank": 40,
			"away_hx_rank": 72,
			"flags": []
		},
		{
			"espn_event_id": "401858287",
			"kick_ct": "2026-11-07 18:30",
			"tv": "ACC Network",
			"away": "Louisville",
			"home": "Georgia Tech",
			"away_slug": "louisville",
			"home_slug": "georgia-tech",
			"score_away": 44,
			"score_home": 17,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Louisville",
			"hx_spread_display": "Louisville -0.8",
			"vegas_details": null,
			"home_hx_rank": 39,
			"away_hx_rank": 26,
			"flags": []
		},
		{
			"espn_event_id": "401858291",
			"kick_ct": "2026-11-07 18:30",
			"tv": "NBC",
			"away": "Miami",
			"home": "Notre Dame",
			"away_slug": "miami",
			"home_slug": "notre-dame",
			"score_away": 24,
			"score_home": 31,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Notre Dame",
			"hx_spread_display": "Notre Dame -9.1",
			"vegas_details": null,
			"home_hx_rank": 3,
			"away_hx_rank": 10,
			"flags": []
		},
		{
			"espn_event_id": "401858511",
			"kick_ct": "2026-11-07 18:30",
			"tv": "Peacock",
			"away": "Michigan State",
			"home": "Michigan",
			"away_slug": "michigan-state",
			"home_slug": "michigan",
			"score_away": 15,
			"score_home": 6,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Michigan",
			"hx_spread_display": "Michigan -30.7",
			"vegas_details": null,
			"home_hx_rank": 12,
			"away_hx_rank": 97,
			"flags": []
		},
		{
			"espn_event_id": "401858513",
			"kick_ct": "2026-11-07 18:30",
			"tv": "FOX",
			"away": "Iowa",
			"home": "Northwestern",
			"away_slug": "iowa",
			"home_slug": "northwestern",
			"score_away": 24,
			"score_home": 10,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Iowa",
			"hx_spread_display": "Iowa -2.3",
			"vegas_details": "NU -1.5",
			"home_hx_rank": 36,
			"away_hx_rank": 23,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401862823",
			"kick_ct": "2026-11-07 18:30",
			"tv": "CBS",
			"away": "Air Force",
			"home": "Army",
			"away_slug": "air-force",
			"home_slug": "army",
			"score_away": 24,
			"score_home": 21,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Army",
			"hx_spread_display": "Army -10.5",
			"vegas_details": null,
			"home_hx_rank": 124,
			"away_hx_rank": 135,
			"flags": []
		},
		{
			"espn_event_id": "401856739",
			"kick_ct": "2026-11-07 18:45",
			"tv": "SEC Network",
			"away": "Oklahoma",
			"home": "Florida",
			"away_slug": "oklahoma",
			"home_slug": "florida",
			"score_away": 23,
			"score_home": 7,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Florida",
			"hx_spread_display": "Florida -1.2",
			"vegas_details": null,
			"home_hx_rank": 24,
			"away_hx_rank": 16,
			"flags": []
		},
		{
			"espn_event_id": "401870795",
			"kick_ct": "2026-11-07 19:00",
			"tv": "ESPNU",
			"away": "Liberty",
			"home": "New Mexico State",
			"away_slug": "liberty",
			"home_slug": "new-mexico-state",
			"score_away": 30,
			"score_home": 14,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Liberty",
			"hx_spread_display": "Liberty -10.1",
			"vegas_details": null,
			"home_hx_rank": 125,
			"away_hx_rank": 75,
			"flags": []
		},
		{
			"espn_event_id": "401856856",
			"kick_ct": "2026-11-07 20:30",
			"tv": "ESPN",
			"away": "West Virginia",
			"home": "Texas Tech",
			"away_slug": "west-virginia",
			"home_slug": "texas-tech",
			"score_away": 48,
			"score_home": 53,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Texas Tech",
			"hx_spread_display": "Texas Tech -31.1",
			"vegas_details": null,
			"home_hx_rank": 7,
			"away_hx_rank": 88,
			"flags": []
		},
		{
			"espn_event_id": "401860913",
			"kick_ct": "2026-11-07 20:30",
			"tv": "USA Net",
			"away": "Fresno State",
			"home": "Utah State",
			"away_slug": "fresno-state",
			"home_slug": "utah-state",
			"score_away": 10,
			"score_home": 17,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Utah State",
			"hx_spread_display": "Utah State -0.7",
			"vegas_details": null,
			"home_hx_rank": 76,
			"away_hx_rank": 68,
			"flags": []
		},
		{
			"espn_event_id": "401864532",
			"kick_ct": "2026-11-07 20:30",
			"tv": "FS1",
			"away": "Hawai'i",
			"home": "UTEP",
			"away_slug": "hawaii",
			"home_slug": "utep",
			"score_away": 17,
			"score_home": 14,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Hawai'i",
			"hx_spread_display": "Hawai'i -11.2",
			"vegas_details": null,
			"home_hx_rank": 132,
			"away_hx_rank": 84,
			"flags": []
		},
		{
			"espn_event_id": "401860912",
			"kick_ct": "2026-11-07 21:30",
			"tv": "CW",
			"away": "Texas State",
			"home": "Oregon State",
			"away_slug": "texas-state",
			"home_slug": "oregon-state",
			"score_away": 42,
			"score_home": 21,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Texas State",
			"hx_spread_display": "Texas State -2.0",
			"vegas_details": null,
			"home_hx_rank": 82,
			"away_hx_rank": 56,
			"flags": []
		},
		{
			"espn_event_id": "401864535",
			"kick_ct": "2026-11-07 21:30",
			"tv": "CBSSN",
			"away": "Wyoming",
			"home": "UNLV",
			"away_slug": "wyoming",
			"home_slug": "unlv",
			"score_away": 41,
			"score_home": 35,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "UNLV",
			"hx_spread_display": "UNLV -24.5",
			"vegas_details": null,
			"home_hx_rank": 37,
			"away_hx_rank": 118,
			"flags": []
		},
		{
			"espn_event_id": "401856851",
			"kick_ct": null,
			"tv": null,
			"away": "Cincinnati",
			"home": "Houston",
			"away_slug": "cincinnati",
			"home_slug": "houston",
			"score_away": 24,
			"score_home": 31,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Houston",
			"hx_spread_display": "Houston -12.4",
			"vegas_details": null,
			"home_hx_rank": 38,
			"away_hx_rank": 83,
			"flags": []
		},
		{
			"espn_event_id": "401856853",
			"kick_ct": null,
			"tv": null,
			"away": "Iowa State",
			"home": "Baylor",
			"away_slug": "iowa-state",
			"home_slug": "baylor",
			"score_away": 31,
			"score_home": 42,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Baylor",
			"hx_spread_display": "Baylor -3.7",
			"vegas_details": null,
			"home_hx_rank": 52,
			"away_hx_rank": 54,
			"flags": []
		},
		{
			"espn_event_id": "401856854",
			"kick_ct": null,
			"tv": null,
			"away": "Oklahoma State",
			"home": "Kansas State",
			"away_slug": "oklahoma-state",
			"home_slug": "kansas-state",
			"score_away": 66,
			"score_home": 28,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Kansas State",
			"hx_spread_display": "Kansas State -16.1",
			"vegas_details": null,
			"home_hx_rank": 29,
			"away_hx_rank": 89,
			"flags": []
		}
	]
};
var week10_tape_top25_closer_2026_default = {
	meta: {
		"as_of": "2026-11-08 10:30 AM CT",
		"week": 10,
		"season": 2026,
		"universe": "FBS–FBS with at least one team in HX Top 25 (HX 2026.7 hx_rank_post <= 25)",
		"n_games": 15,
		"closer_n": 2,
		"hx_closer": "2/2",
		"hx_closer_pct": 100,
		"su": "10/15",
		"su_pct": 66.7,
		"vegas_closer_n": 0,
		"closer_ties": 0,
		"full_slate_closer": "3/5 (60.0%) on Vegas-lined cards",
		"source_tape": "data/week10_tape_2026.json",
		"rank_source": "week5_od_hx_ship_2026.json hx_rank_post (HX 2026.7 pregame, not retuned)",
		"peer_note": "Week 4 Top 25 rule applied to the 61 ESPN FINALs and HX 2026.7 ranks. Closer graded only on cards with a stamped Vegas close (2 of 15). Public headline is the full slate."
	},
	games: [
		{
			"espn_event_id": "401858288",
			"kick_ct": "2026-11-06 18:00",
			"matchup": "Virginia Tech @ SMU",
			"away": "Virginia Tech",
			"home": "SMU",
			"home_hx_rank": 20,
			"away_hx_rank": 49,
			"hx_spread_display": "SMU -12.6",
			"vegas_details": null,
			"final": "28–51",
			"score_away": 28,
			"score_home": 51,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401856743",
			"kick_ct": "2026-11-07 11:00",
			"matchup": "Texas @ Missouri",
			"away": "Texas",
			"home": "Missouri",
			"home_hx_rank": 14,
			"away_hx_rank": 5,
			"hx_spread_display": "Texas -3.3",
			"vegas_details": null,
			"final": "34–20",
			"score_away": 34,
			"score_home": 20,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401856849",
			"kick_ct": "2026-11-07 11:00",
			"matchup": "BYU @ Utah",
			"away": "BYU",
			"home": "Utah",
			"home_hx_rank": 13,
			"away_hx_rank": 17,
			"hx_spread_display": "Utah -3.7",
			"vegas_details": null,
			"final": "20–28",
			"score_away": 20,
			"score_home": 28,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401858285",
			"kick_ct": "2026-11-07 11:00",
			"matchup": "Clemson @ Syracuse",
			"away": "Clemson",
			"home": "Syracuse",
			"home_hx_rank": 91,
			"away_hx_rank": 22,
			"hx_spread_display": "Clemson -13.6",
			"vegas_details": null,
			"final": "18–13",
			"score_away": 18,
			"score_home": 13,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401856744",
			"kick_ct": "2026-11-07 14:00",
			"matchup": "Texas A&M @ South Carolina",
			"away": "Texas A&M",
			"home": "South Carolina",
			"home_hx_rank": 27,
			"away_hx_rank": 6,
			"hx_spread_display": "Texas A&M -6.4",
			"vegas_details": null,
			"final": "9–17",
			"score_away": 9,
			"score_home": 17,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401856740",
			"kick_ct": "2026-11-07 14:30",
			"matchup": "Alabama @ LSU",
			"away": "Alabama",
			"home": "LSU",
			"home_hx_rank": 18,
			"away_hx_rank": 9,
			"hx_spread_display": "Alabama -0.2",
			"vegas_details": null,
			"final": "31–13",
			"score_away": 31,
			"score_home": 13,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401858514",
			"kick_ct": "2026-11-07 14:30",
			"matchup": "Oregon @ Ohio State",
			"away": "Oregon",
			"home": "Ohio State",
			"home_hx_rank": 2,
			"away_hx_rank": 4,
			"hx_spread_display": "Ohio State -6.2",
			"vegas_details": null,
			"final": "41–28",
			"score_away": 41,
			"score_home": 28,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401858516",
			"kick_ct": "2026-11-07 14:30",
			"matchup": "Penn State @ Washington",
			"away": "Penn State",
			"home": "Washington",
			"home_hx_rank": 25,
			"away_hx_rank": 15,
			"hx_spread_display": "Washington -0.3",
			"vegas_details": null,
			"final": "28–25",
			"score_away": 28,
			"score_home": 25,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401856745",
			"kick_ct": "2026-11-07 17:15",
			"matchup": "Kentucky @ Tennessee",
			"away": "Kentucky",
			"home": "Tennessee",
			"home_hx_rank": 19,
			"away_hx_rank": 64,
			"hx_spread_display": "Tennessee -16.7",
			"vegas_details": null,
			"final": "6–34",
			"score_away": 6,
			"score_home": 34,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401856741",
			"kick_ct": "2026-11-07 18:30",
			"matchup": "Georgia @ Ole Miss",
			"away": "Georgia",
			"home": "Ole Miss",
			"home_hx_rank": 8,
			"away_hx_rank": 1,
			"hx_spread_display": "Georgia -4.1",
			"vegas_details": "UGA -3",
			"final": "42–7",
			"score_away": 42,
			"score_home": 7,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858291",
			"kick_ct": "2026-11-07 18:30",
			"matchup": "Miami @ Notre Dame",
			"away": "Miami",
			"home": "Notre Dame",
			"home_hx_rank": 3,
			"away_hx_rank": 10,
			"hx_spread_display": "Notre Dame -9.1",
			"vegas_details": null,
			"final": "24–31",
			"score_away": 24,
			"score_home": 31,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401858511",
			"kick_ct": "2026-11-07 18:30",
			"matchup": "Michigan State @ Michigan",
			"away": "Michigan State",
			"home": "Michigan",
			"home_hx_rank": 12,
			"away_hx_rank": 97,
			"hx_spread_display": "Michigan -30.7",
			"vegas_details": null,
			"final": "15–6",
			"score_away": 15,
			"score_home": 6,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401858513",
			"kick_ct": "2026-11-07 18:30",
			"matchup": "Iowa @ Northwestern",
			"away": "Iowa",
			"home": "Northwestern",
			"home_hx_rank": 36,
			"away_hx_rank": 23,
			"hx_spread_display": "Iowa -2.3",
			"vegas_details": "NU -1.5",
			"final": "24–10",
			"score_away": 24,
			"score_home": 10,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856739",
			"kick_ct": "2026-11-07 18:45",
			"matchup": "Oklahoma @ Florida",
			"away": "Oklahoma",
			"home": "Florida",
			"home_hx_rank": 24,
			"away_hx_rank": 16,
			"hx_spread_display": "Florida -1.2",
			"vegas_details": null,
			"final": "23–7",
			"score_away": 23,
			"score_home": 7,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401856856",
			"kick_ct": "2026-11-07 20:30",
			"matchup": "West Virginia @ Texas Tech",
			"away": "West Virginia",
			"home": "Texas Tech",
			"home_hx_rank": 7,
			"away_hx_rank": 88,
			"hx_spread_display": "Texas Tech -31.1",
			"vegas_details": null,
			"final": "48–53",
			"score_away": 48,
			"score_home": 53,
			"closer": null,
			"su_hit": true
		}
	]
};
var week10_ap_top25_2026_default = {
	product: "AP Top 25 stamp pack",
	poll: "AP",
	season: 2026,
	poll_week: 10,
	as_of: "2026-11-01",
	as_of_label: "Week 10 AP · Nov. 1",
	source: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings (AP Top 25 Week 10, 2026-11-01)",
	source_secondary: "https://www.ncaa.com/rankings/football/fbs/associated-press (Week 10, through games Oct. 31) — 25/25 ranks, records and points match ESPN",
	ties: [],
	chrome: {
		"replace": "Week 9 AP (Oct. 25) / AP_STAMP week:9",
		"set": {
			"week": 10,
			"asOf": "Nov. 1",
			"label": "Week 10 AP",
			"columnHint": "W10 stamp",
			"lede": "HX is Week 11. AP is the last stamped poll (Week 10, Nov. 1)."
		}
	},
	scope: "AP ranks + chrome only — no HX retune",
	dropped: [
		{
			"school": "SMU",
			"slug": "smu",
			"previous_rank": 19
		},
		{
			"school": "Northwestern",
			"slug": "northwestern",
			"previous_rank": 20
		},
		{
			"school": "Oklahoma State",
			"slug": "oklahoma-state",
			"previous_rank": 24
		},
		{
			"school": "Wisconsin",
			"slug": "wisconsin",
			"previous_rank": 25
		}
	],
	teams: [
		{
			"rank": 1,
			"school": "Miami (FL)",
			"slug": "miami",
			"record": "8-0",
			"previous_rank": 1,
			"first_place_votes": 62,
			"points": 1740
		},
		{
			"rank": 2,
			"school": "Georgia",
			"slug": "georgia",
			"record": "7-1",
			"previous_rank": 3,
			"first_place_votes": 7,
			"points": 1648
		},
		{
			"rank": 3,
			"school": "Utah",
			"slug": "utah",
			"record": "8-0",
			"previous_rank": 6,
			"first_place_votes": 1,
			"points": 1540
		},
		{
			"rank": 4,
			"school": "Notre Dame",
			"slug": "notre-dame",
			"record": "7-1",
			"previous_rank": 5,
			"first_place_votes": 0,
			"points": 1476
		},
		{
			"rank": 5,
			"school": "UCLA",
			"slug": "ucla",
			"record": "8-0",
			"previous_rank": 7,
			"first_place_votes": 0,
			"points": 1473
		},
		{
			"rank": 6,
			"school": "Indiana",
			"slug": "indiana",
			"record": "8-1",
			"previous_rank": 4,
			"first_place_votes": 0,
			"points": 1446
		},
		{
			"rank": 7,
			"school": "BYU",
			"slug": "byu",
			"record": "7-1",
			"previous_rank": 8,
			"first_place_votes": 0,
			"points": 1358
		},
		{
			"rank": 8,
			"school": "Kentucky",
			"slug": "kentucky",
			"record": "7-1",
			"previous_rank": 9,
			"first_place_votes": 0,
			"points": 1253
		},
		{
			"rank": 9,
			"school": "Alabama",
			"slug": "alabama",
			"record": "6-2",
			"previous_rank": 10,
			"first_place_votes": 0,
			"points": 1107
		},
		{
			"rank": 10,
			"school": "Texas",
			"slug": "texas",
			"record": "6-2",
			"previous_rank": 11,
			"first_place_votes": 0,
			"points": 1057
		},
		{
			"rank": 11,
			"school": "Ohio State",
			"slug": "ohio-state",
			"record": "6-2",
			"previous_rank": 2,
			"first_place_votes": 0,
			"points": 1049
		},
		{
			"rank": 12,
			"school": "Ole Miss",
			"slug": "ole-miss",
			"record": "6-2",
			"previous_rank": 12,
			"first_place_votes": 0,
			"points": 953
		},
		{
			"rank": 13,
			"school": "Texas Tech",
			"slug": "texas-tech",
			"record": "7-1",
			"previous_rank": 13,
			"first_place_votes": 0,
			"points": 931
		},
		{
			"rank": 14,
			"school": "Wake Forest",
			"slug": "wake-forest",
			"record": "7-1",
			"previous_rank": 14,
			"first_place_votes": 0,
			"points": 898
		},
		{
			"rank": 15,
			"school": "LSU",
			"slug": "lsu",
			"record": "6-2",
			"previous_rank": 15,
			"first_place_votes": 0,
			"points": 814
		},
		{
			"rank": 16,
			"school": "Tennessee",
			"slug": "tennessee",
			"record": "6-2",
			"previous_rank": 16,
			"first_place_votes": 0,
			"points": 719
		},
		{
			"rank": 17,
			"school": "Houston",
			"slug": "houston",
			"record": "6-2",
			"previous_rank": 18,
			"first_place_votes": 0,
			"points": 590
		},
		{
			"rank": 18,
			"school": "USC",
			"slug": "usc",
			"record": "7-2",
			"previous_rank": 0,
			"first_place_votes": 0,
			"points": 539
		},
		{
			"rank": 19,
			"school": "Missouri",
			"slug": "missouri",
			"record": "6-2",
			"previous_rank": 23,
			"first_place_votes": 0,
			"points": 475
		},
		{
			"rank": 20,
			"school": "Boise State",
			"slug": "boise-state",
			"record": "7-1",
			"previous_rank": 20,
			"first_place_votes": 0,
			"points": 451
		},
		{
			"rank": 21,
			"school": "Iowa",
			"slug": "iowa",
			"record": "6-2",
			"previous_rank": 0,
			"first_place_votes": 0,
			"points": 401
		},
		{
			"rank": 22,
			"school": "New Mexico",
			"slug": "new-mexico",
			"record": "7-1",
			"previous_rank": 0,
			"first_place_votes": 0,
			"points": 179
		},
		{
			"rank": 23,
			"school": "South Carolina",
			"slug": "south-carolina",
			"record": "5-3",
			"previous_rank": 0,
			"first_place_votes": 0,
			"points": 163
		},
		{
			"rank": 24,
			"school": "Arizona",
			"slug": "arizona",
			"record": "6-2",
			"previous_rank": 22,
			"first_place_votes": 0,
			"points": 154
		},
		{
			"rank": 25,
			"school": "Florida",
			"slug": "florida",
			"record": "5-3",
			"previous_rank": 17,
			"first_place_votes": 0,
			"points": 94
		}
	]
};
/**
* Truth-pack loaders. Numbers come from the AMD / Research JSON payloads —
* do not invent deltas, tape rates, or make/title splits.
*
*   data/week10_hx_vs_ap_gaps_2026.json
*   data/week1_accountability_pack_2026.json
*   data/week2_tape_2026.json
*   data/week2_tape_top25_closer_2026.json
*   data/week3_tape_2026.json
*   data/week3_tape_top25_closer_2026.json
*   data/week4_tape_2026.json
*   data/week4_tape_top25_closer_2026.json
*   data/week5_tape_2026.json
*   data/week5_tape_top25_closer_2026.json
*   data/week6_tape_2026.json
*   data/week6_tape_top25_closer_2026.json
*   data/week7_tape_2026.json
*   data/week7_tape_top25_closer_2026.json
*   data/week8_tape_2026.json
*   data/week8_tape_top25_closer_2026.json
*   data/week9_tape_2026.json
*   data/week9_tape_top25_closer_2026.json
*   data/week10_tape_2026.json
*   data/week10_tape_top25_closer_2026.json
*   data/sim_free_hx2026_8.json — free export of sim_10k_2026_hx2026_8.json
*     (make_field, proj_wins, conf_title; no win_title). Generated by scripts/generate-sim-free.mjs. The full sim
*     (with win_title) is server/test only: ./sim-full.server.ts. Never import the
*     full file here — this module is bundled into the public client JS.
*
* (Header sits on the first retained statement so it survives tree-shaking in the SSR bundle.)
*/
var sim10k = sim_free_hx2026_8_default;
/**
* Desk flags on the Week 10 ballot (Nov. 1). Rule: the Week 9 flags still on
* the ballot carry (Kentucky, Wake Forest, Houston, BYU). Northwestern and
* Oklahoma State dropped out, so those slots go to the AP debuts with the
* largest |delta|: New Mexico (AP 22 vs HX 98, −76) and South Carolina
* (AP 23 vs HX 27, −4). UCLA (−40) / Boise State (−27) lead the |delta|
* sort after these.
*/
var DISAGREE_HIGHLIGHT_NAMES = [
	"Kentucky",
	"Wake Forest",
	"New Mexico",
	"Houston",
	"South Carolina",
	"BYU"
];
/** "Iowa -2.3" → home-perspective HX margin (positive = home favored). Null if unparsable. */
function hxHomeMarginFromDisplay(g) {
	const m = g.hx_spread_display?.match(/^(.*\S)\s+-(\d+(?:\.\d+)?)$/);
	if (!m) return null;
	const pts = Number(m[2]);
	if (m[1] === g.home) return pts;
	if (m[1] === g.away) return -pts;
	return null;
}
/** HX MAE over the cards that carry a Vegas close (closer graded), from published lines. */
function hxMaeOnLinedCards(games) {
	let n = 0;
	let ae = 0;
	for (const g of games) {
		if (g.closer == null || g.score_home == null || g.score_away == null) continue;
		const hx = hxHomeMarginFromDisplay(g);
		if (hx == null) return null;
		n++;
		ae += Math.abs(hx - (g.score_home - g.score_away));
	}
	return n ? {
		n,
		mae_hx: Math.round(ae / n * 100) / 100
	} : null;
}
var week10TapePack = week10_tape_2026_default;
var week10Top25Pack = week10_tape_top25_closer_2026_default;
new Map(week10_ap_top25_2026_default.teams.flatMap((t) => {
	const names = [t.school];
	if (t.slug === "usc") names.push("USC");
	if (t.slug === "miami") names.push("Miami");
	if (t.slug === "ole-miss") names.push("Ole Miss");
	return names.map((n) => [n, t.slug]);
}));
/** Current HX 10k draws (scripts/hx-sim-10k.mjs). Stamp from meta.hx_stamp when present. */
var SIM_10K_AS_OF = sim10k.meta.as_of;
var SIM_10K_HX_STAMP = sim10k.meta.hx_stamp ?? "HX 2026.8";
`${SIM_10K_HX_STAMP}${SIM_10K_AS_OF}`;
new Set(DISAGREE_HIGHLIGHT_NAMES);
function isOdTerm(term) {
	return /^O\/D\b/.test(term);
}
/** Display term for movers — pack stores "O/D EPA"; chrome is O/D. */
function odTermLabel(term) {
	return isOdTerm(term) ? "O/D" : term;
}
function asciiLineToDisplay(line) {
	return line.replace(/ -/g, " −").replace(/^-/g, "−");
}
function pctFromLabeled(raw) {
	return Number.parseFloat(raw.replace("%", ""));
}
function flagId(matchup, result) {
	return `${matchup.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-winner-flip-${result.toLowerCase()}`;
}
/** Week 10 tape (HX 2026.7 pregame vs ESPN FINALs). Closer is on the Vegas-lined cards only. Headline numbers only from the file. */
function week10Tape() {
	const m = week10TapePack.meta;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		closer_flag: m.headline_flags.closer_below_45,
		closer_flag_rule: "<45%",
		vegas_closer: m.vegas_closer,
		hx_ats: m.ats_hx,
		hx_ats_pct: m.ats_hx_pct,
		mae_hx: m.mae_hx,
		mae_vegas: m.mae_vegas,
		brier: m.brier,
		lined: (() => {
			const l = hxMaeOnLinedCards(week10TapePack.games);
			return l && l.n === m.closer_n ? {
				...l,
				mae_vegas: m.mae_vegas
			} : void 0;
		})(),
		source: `week10_tape_2026 · FBS–FBS n=${m.n_games} · closer on ${m.closer_n} Vegas-lined cards · HX 2026.7 pregame · ESPN FINALs`
	};
}
function week10SeasonTape() {
	const m = week10TapePack.meta;
	return {
		label: "W1–W10",
		weeks: [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10
		],
		su: m.season_w1_w10_su_frac,
		su_pct: pctFromLabeled(m.season_w1_w10_su),
		hx_closer: m.season_w1_w10_closer_frac,
		hx_closer_pct: pctFromLabeled(m.season_w1_w10_closer),
		note: "Week 1–10 arithmetic: Week 9 rollup plus week10_tape_2026 (closer on Vegas-lined cards). Not a fresh W1–W9 audit."
	};
}
function week10BoardFlags() {
	const byEspn = new Map(week10TapePack.games.map((g) => [g.espn_event_id, g]));
	return [...week10TapePack.winner_flip_hits.map((row) => ({
		result: "HIT",
		row
	})), ...week10TapePack.winner_flip_misses.map((row) => ({
		result: "MISS",
		row
	}))].map(({ result, row }) => {
		const game = byEspn.get(row.espn_event_id);
		return {
			id: flagId(row.matchup, result),
			label: `${row.matchup} winner-flip`,
			result,
			matchup: row.matchup,
			espn_event_id: row.espn_event_id,
			hx: asciiLineToDisplay(row.hx),
			vegas: asciiLineToDisplay(row.vegas),
			final: row.final,
			away_score: game?.score_away ?? 0,
			home_score: game?.score_home ?? 0
		};
	});
}
function week10Top25Tape() {
	const m = week10Top25Pack.meta;
	const vegasN = week10Top25Pack.games.filter((g) => g.closer === "vegas").length;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		vegas_closer: `${vegasN}/${m.closer_n}`,
		source: `week10_tape_top25_closer_2026 · HX Top 25 involvement n=${m.n_games} · closer on ${m.closer_n} Vegas-lined cards · HX 2026.7 pregame ranks · ESPN FINALs`
	};
}
function simTeamBySlug(slug) {
	return sim10k.teams.find((t) => t.slug === slug);
}
/**
* Live "Where HX disagrees" rows: last stamped AP rank vs the current HX rank,
* straight off the board rows (HX refits weekly, so the static gaps file goes stale).
* delta = ap − hx (negative = HX colder than the ballot). Largest |delta| first.
*/
function liveDisagreementRows(teams) {
	return teams.filter((t) => t.apRank != null).map((t) => ({
		name: t.name,
		ap: t.apRank,
		hx: t.hxRank,
		hx_rating: t.hxRating,
		delta: t.apRank - t.hxRank,
		slug: t.slug,
		shortName: t.shortName,
		colorPrimary: t.colorPrimary,
		highlight: false
	})).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || a.ap - b.ap);
}
function toScheduleRow(teamSlug, g) {
	const homeIs = g.homeSlug === teamSlug;
	const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
	const oppName = homeIs ? g.awayName : g.homeName;
	const oppColor = homeIs ? g.awayColor : g.homeColor;
	return {
		key: `fbs-${g.id}`,
		week: g.week,
		kickoffDate: g.kickoffDate,
		opponentLabel: oppName,
		opponentSlug: oppSlug,
		opponentColor: oppColor,
		home: homeIs,
		neutral: g.neutral,
		location: g.location,
		status: g.status,
		homeScore: g.homeScore,
		awayScore: g.awayScore,
		isFcs: false,
		game: g
	};
}
/** Map preseason playoff_odds (logistic make-field curve) until AMD draws land. */
function make12FromTeam(team) {
	const hasLegacy = Number.isFinite(team.playoffOdds);
	return {
		makeField: hasLegacy ? team.playoffOdds : null,
		winTitle: null,
		makeFieldSource: hasLegacy ? "legacy-playoff-odds" : "pending",
		winTitleSource: "pending"
	};
}
/**
* Map one HX 2026.7 10k-draw row to Make 12 odds. Falls back to the legacy
* logistic make-field if the row is missing. Never treat make_field as a title.
*
* Client code never passes `winTitle` — this module is bundled into the public
* JS, so it must not read any title field off a row. Only the server-only full
* loader (./sim-full.server.ts) supplies it. No title → "pack-only".
*/
function make12FromSimRow(row, team, winTitle = null) {
	if (row) {
		const hasTitle = winTitle != null && Number.isFinite(winTitle);
		return {
			makeField: row.make_field,
			winTitle: hasTitle ? winTitle : null,
			makeFieldSource: "amd-draws",
			winTitleSource: hasTitle ? "amd-draws" : "pack-only"
		};
	}
	return team ? make12FromTeam(team) : {
		makeField: null,
		winTitle: null,
		makeFieldSource: "pending",
		winTitleSource: "pending"
	};
}
/**
* Free-surface projection of Make 12: make-field stays public, win_title is
* Edge Pack / paid only (AMD + Research rule). The number is dropped, not hidden.
*/
function make12FreeView(odds) {
	return {
		makeField: odds.makeField,
		makeFieldSource: odds.makeFieldSource,
		winTitle: null,
		winTitleSource: odds.winTitleSource === "amd-draws" ? "pack-only" : odds.winTitleSource
	};
}
/**
* Free board / rankings / free team page Make 12 — reads the free sim export
* (data/sim_free_hx2026_8.json), which has no win_title at all, so nothing
* title-shaped can reach the client bundle. The full sim with win_title is
* server/test only: ./sim-full.server.ts (make12FromSimFull).
*/
function make12FreeFromSim(slug, team) {
	return make12FreeView(make12FromSimRow(simTeamBySlug(slug), team));
}
function toFcsStubRow(stub, i) {
	return {
		key: `fcs-${stub.teamSlug}-${stub.kickoffDate}-${i}`,
		week: stub.week,
		kickoffDate: stub.kickoffDate,
		opponentLabel: stub.opponentLabel,
		opponentSlug: null,
		opponentColor: null,
		home: stub.home,
		neutral: false,
		location: null,
		status: stub.status,
		homeScore: stub.homeScore,
		awayScore: stub.awayScore,
		isFcs: true,
		game: null,
		kickoffAt: stub.kickoffAt ?? null,
		tv: stub.tv ?? null,
		vegasSpread: stub.vegasSpread ?? null,
		homeShort: stub.homeShort ?? null,
		awayShort: stub.awayShort ?? null,
		hxSpreadPolicy: stub.hxSpreadPolicy,
		live: stub.live
	};
}
function buildRemainingSchedule(teamSlug, games, stubs = fcsStubsForTeam(teamSlug)) {
	const fbsRows = games.filter((g) => g.status !== "final").map((g) => toScheduleRow(teamSlug, g));
	const fcsRows = stubs.filter((stub) => !fcsStubIsFinal(stub)).map((stub, i) => toFcsStubRow(stub, i));
	return [...fbsRows, ...fcsRows].sort((a, b) => {
		if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
		if (a.week !== b.week) return a.week - b.week;
		return a.opponentLabel.localeCompare(b.opponentLabel);
	});
}
/** Full FBS season slate for a team hub — played and unplayed. */
function buildSeasonSchedule(teamSlug, games) {
	return games.map((g) => toScheduleRow(teamSlug, g));
}
//#endregion
export { make12FreeFromSim as a, week10SeasonTape as c, liveDisagreementRows as i, week10Tape as l, buildRemainingSchedule as n, odTermLabel as o, buildSeasonSchedule as r, week10BoardFlags as s, SIM_10K_HX_STAMP as t, week10Top25Tape as u };
