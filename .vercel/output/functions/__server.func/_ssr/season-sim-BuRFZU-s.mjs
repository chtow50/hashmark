import { i as fcsStubsForTeam, r as fcsStubIsFinal } from "./fcs-stubs-EhAXIu6R.mjs";
import { r as sim_free_hx2026_8_default } from "./sim_free_hx2026_8-BBZtxINK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/season-sim-BuRFZU-s.js
var week11_tape_2026_default = {
	meta: {
		"as_of": "2026-11-15 4:32 PM CT",
		"week": 11,
		"season": 2026,
		"scope": "FBS–FBS only",
		"n_games": 66,
		"su": "43/66",
		"su_pct": 65.2,
		"closer_n": 50,
		"hx_closer": "21/50",
		"hx_closer_pct": 42,
		"vegas_closer": "29/50",
		"closer_ties": 0,
		"hx_closer_of_slate": "21/66",
		"closer_note": "Closer is HX vs the stamped Vegas close (smaller |line − home margin|), so it is graded only where a Vegas close is stamped: 50 of 66 cards. 16 Week 11 cards stayed blank (no exact two-book match at the 0087 / 0095 / 0100 stamps). Same definition as Weeks 8–10 (closer on Vegas-lined cards only). Raw grader count over the full slate is 21/66.",
		"ats_hx": "21/49",
		"ats_hx_pct": 42.9,
		"ats_note": "Re-derived: HX side vs stamped Vegas close; HX = Vegas and pushes excluded (n=49).",
		"mae_hx": 13.95,
		"mae_vegas": 11.3,
		"mae_note": "MAE HX over all 66 cards; MAE Vegas over the 50 cards with a stamped close.",
		"brier": .202,
		"season_w1_w11_su": "70.0%",
		"season_w1_w11_closer": "42.0%",
		"season_w1_w11_su_frac": "424/606",
		"season_w1_w11_closer_frac": "163/388",
		"season_note": "Arithmetic: Week 10 tape W1–W10 rollup (381/540 SU, 142/338 closer) plus this week (SU 43/66, closer 21/50 on Vegas-lined cards). Not a fresh W1–W10 audit.",
		"sources": {
			"finals": "ESPN scoreboard/game pages STATUS_FINAL (migrations 0089–0090, 0097–0100); 66/66 scores match ESPN",
			"grade": "HX 2026.8 pregame board: lock_home_hx / lock_away_hx stamped when each FINAL landed, through the HX spread map (quadratic, HFA 60 Elo, 0 neutral); Vegas = stamped closes on games.vegas_* (0087, 0095, 0100)",
			"hx_ranks": "Board ranks entering the week (HX 2026.8 one-step refit 0094; not retuned by this tape)",
			"method_check": "Same grader as the published Week 10 tape; ratings are the pregame locks, not the post-refit board"
		},
		"coverage_notes": [
			"All 66 FBS–FBS Week 11 games are ESPN STATUS_FINAL. Finals stamped in 0089–0090 and 0097–0100. Sacramento State @ Central Michigan (Wed, stamped before Sac State joined the FBS board) is unrated and not graded.",
			"Vegas closes stay the stamped 0087 / 0095 / 0100 Week 11 book (50 cards). This tape does not add or rewrite lines.",
			"HX lines on the ledger are the pregame HX 2026.8 locks. The tape is not a retune; the weekly refit runs after it.",
			"Closer 21/50 on the Vegas-lined cards. SU 65.2% is under 70%. Soft-cal FLAG remains.",
			"Season 424/606 is arithmetic, not a fresh audit of Weeks 1-10."
		],
		"headline_flags": {
			"closer_below_45": true,
			"su_below_70": true,
			"n_su_misses": 23,
			"n_winner_flip_hits": 1,
			"n_winner_flip_misses": 4
		}
	},
	su_misses: [
		{
			"matchup": "Ohio@Miami (OH)",
			"hx_fav": "Ohio",
			"hx_spread_display": "Ohio -0.2",
			"vegas_details": null,
			"final": "Ohio 17–Miami (OH) 34",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401866460"
		},
		{
			"matchup": "Florida State@Pittsburgh",
			"hx_fav": "Pittsburgh",
			"hx_spread_display": "Pittsburgh -3.2",
			"vegas_details": "Pitt -3.5",
			"final": "Florida State 16–Pittsburgh 10",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401858293"
		},
		{
			"matchup": "Houston@Colorado",
			"hx_fav": "Houston",
			"hx_spread_display": "Houston -10.1",
			"vegas_details": "Houston -9.5",
			"final": "Houston 32–Colorado 42",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856860"
		},
		{
			"matchup": "Syracuse@NC State",
			"hx_fav": "NC State",
			"hx_spread_display": "NC State -2.0",
			"vegas_details": "Syracuse -3",
			"final": "Syracuse 34–NC State 31",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401858300"
		},
		{
			"matchup": "Texas Tech@Oklahoma State",
			"hx_fav": "Oklahoma State",
			"hx_spread_display": "Oklahoma State -0.8",
			"vegas_details": "Oklahoma St -2.5",
			"final": "Texas Tech 52–Oklahoma State 27",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401856863"
		},
		{
			"matchup": "Tulane@Rice",
			"hx_fav": "Rice",
			"hx_spread_display": "Rice -0.1",
			"vegas_details": "Rice -1.5",
			"final": "Tulane 20–Rice 17",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401862828"
		},
		{
			"matchup": "UAB@Temple",
			"hx_fav": "Temple",
			"hx_spread_display": "Temple -0.7",
			"vegas_details": "Temple -2.5",
			"final": "UAB 36–Temple 10",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401862829"
		},
		{
			"matchup": "Wisconsin@Maryland",
			"hx_fav": "Wisconsin",
			"hx_spread_display": "Wisconsin -6.6",
			"vegas_details": null,
			"final": "Wisconsin 21–Maryland 24",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858520"
		},
		{
			"matchup": "App State@Marshall",
			"hx_fav": "Marshall",
			"hx_spread_display": "Marshall -4.6",
			"vegas_details": "App State -2.5",
			"final": "App State 20–Marshall 16",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401869928"
		},
		{
			"matchup": "South Carolina@Arkansas",
			"hx_fav": "South Carolina",
			"hx_spread_display": "South Carolina -5.6",
			"vegas_details": null,
			"final": "South Carolina 6–Arkansas 34",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401856882"
		},
		{
			"matchup": "Wake Forest@SMU",
			"hx_fav": "SMU",
			"hx_spread_display": "SMU -1.2",
			"vegas_details": null,
			"final": "Wake Forest 49–SMU 7",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858301"
		},
		{
			"matchup": "Stanford@Virginia Tech",
			"hx_fav": "Virginia Tech",
			"hx_spread_display": "Virginia Tech -11.9",
			"vegas_details": null,
			"final": "Stanford 40–Virginia Tech 22",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401858299"
		},
		{
			"matchup": "Arizona State@UCF",
			"hx_fav": "UCF",
			"hx_spread_display": "UCF -4.7",
			"vegas_details": "UCF -2.5",
			"final": "Arizona State 26–UCF 13",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856857"
		},
		{
			"matchup": "Jacksonville State@Western Kentucky",
			"hx_fav": "Jacksonville State",
			"hx_spread_display": "Jacksonville State -2.6",
			"vegas_details": "Jax State -6",
			"final": "Jacksonville State 24–Western Kentucky 34",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401870752"
		},
		{
			"matchup": "Georgia Tech@Clemson",
			"hx_fav": "Clemson",
			"hx_spread_display": "Clemson -18.0",
			"vegas_details": "Clemson -14",
			"final": "Georgia Tech 20–Clemson 6",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858297"
		},
		{
			"matchup": "Auburn@Mississippi State",
			"hx_fav": "Mississippi State",
			"hx_spread_display": "Mississippi State -1.8",
			"vegas_details": "Auburn -2.5",
			"final": "Auburn 41–Mississippi State 9",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401856886"
		},
		{
			"matchup": "Kansas@West Virginia",
			"hx_fav": "West Virginia",
			"hx_spread_display": "West Virginia -3.3",
			"vegas_details": "W Virginia -2.5",
			"final": "Kansas 37–West Virginia 14",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856861"
		},
		{
			"matchup": "Florida@Kentucky",
			"hx_fav": "Kentucky",
			"hx_spread_display": "Kentucky -3.4",
			"vegas_details": "Kentucky -2.5",
			"final": "Florida 21–Kentucky 14",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856884"
		},
		{
			"matchup": "Texas@LSU",
			"hx_fav": "LSU",
			"hx_spread_display": "LSU -3.1",
			"vegas_details": "LSU -3.5",
			"final": "Texas 22–LSU 21",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401856885"
		},
		{
			"matchup": "James Madison@UConn",
			"hx_fav": "James Madison",
			"hx_spread_display": "James Madison -8.3",
			"vegas_details": "JMU -4",
			"final": "James Madison 22–UConn 46",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401861967"
		},
		{
			"matchup": "UNLV@New Mexico",
			"hx_fav": "New Mexico",
			"hx_spread_display": "New Mexico -11.7",
			"vegas_details": "New Mexico -14.5",
			"final": "UNLV 21–New Mexico 17",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401864539"
		},
		{
			"matchup": "Utah State@San Diego State",
			"hx_fav": "Utah State",
			"hx_spread_display": "Utah State -1.8",
			"vegas_details": null,
			"final": "Utah State 13–San Diego State 30",
			"closer": null,
			"winner_flip": false,
			"espn_event_id": "401860915"
		},
		{
			"matchup": "Ole Miss@Oklahoma",
			"hx_fav": "Ole Miss",
			"hx_spread_display": "Ole Miss -2.6",
			"vegas_details": "Oklahoma -2.5",
			"final": "Ole Miss 17–Oklahoma 24",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401856887"
		}
	],
	winner_flip_hits: [{
		"matchup": "North Texas @ UTSA",
		"hx": "UTSA -2.6",
		"vegas": "North Texas -2.5",
		"final": "16–35",
		"espn_event_id": "401862827"
	}],
	winner_flip_misses: [
		{
			"matchup": "Syracuse @ NC State",
			"hx": "NC State -2.0",
			"vegas": "Syracuse -3",
			"final": "34–31",
			"espn_event_id": "401858300"
		},
		{
			"matchup": "App State @ Marshall",
			"hx": "Marshall -4.6",
			"vegas": "App State -2.5",
			"final": "20–16",
			"espn_event_id": "401869928"
		},
		{
			"matchup": "Auburn @ Mississippi State",
			"hx": "Mississippi State -1.8",
			"vegas": "Auburn -2.5",
			"final": "41–9",
			"espn_event_id": "401856886"
		},
		{
			"matchup": "Ole Miss @ Oklahoma",
			"hx": "Ole Miss -2.6",
			"vegas": "Oklahoma -2.5",
			"final": "17–24",
			"espn_event_id": "401856887"
		}
	],
	games: [
		{
			"espn_event_id": "401866458",
			"kick_ct": "2026-11-10 18:00",
			"tv": "CBSSN",
			"away": "Western Michigan",
			"home": "Akron",
			"away_slug": "western-michigan",
			"home_slug": "akron",
			"score_away": 42,
			"score_home": 14,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Western Michigan",
			"hx_spread_display": "Western Michigan -9.4",
			"vegas_details": null,
			"home_hx_rank": 137,
			"away_hx_rank": 62,
			"flags": []
		},
		{
			"espn_event_id": "401866459",
			"kick_ct": "2026-11-10 18:00",
			"tv": "ESPNU",
			"away": "Kent State",
			"home": "Bowling Green",
			"away_slug": "kent-state",
			"home_slug": "bowling-green",
			"score_away": 28,
			"score_home": 33,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Bowling Green",
			"hx_spread_display": "Bowling Green -8.3",
			"vegas_details": null,
			"home_hx_rank": 120,
			"away_hx_rank": 130,
			"flags": []
		},
		{
			"espn_event_id": "401866460",
			"kick_ct": "2026-11-10 19:00",
			"tv": "ESPN2",
			"away": "Ohio",
			"home": "Miami (OH)",
			"away_slug": "ohio",
			"home_slug": "miami-oh",
			"score_away": 17,
			"score_home": 34,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Ohio",
			"hx_spread_display": "Ohio -0.2",
			"vegas_details": null,
			"home_hx_rank": 96,
			"away_hx_rank": 89,
			"flags": []
		},
		{
			"espn_event_id": "401866461",
			"kick_ct": "2026-11-11 18:30",
			"tv": "ESPN2",
			"away": "Buffalo",
			"home": "Ball State",
			"away_slug": "buffalo",
			"home_slug": "ball-state",
			"score_away": 28,
			"score_home": 7,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Buffalo",
			"hx_spread_display": "Buffalo -2.6",
			"vegas_details": null,
			"home_hx_rank": 129,
			"away_hx_rank": 88,
			"flags": []
		},
		{
			"espn_event_id": "401866463",
			"kick_ct": "2026-11-11 18:30",
			"tv": null,
			"away": "Massachusetts",
			"home": "Toledo",
			"away_slug": "massachusetts",
			"home_slug": "toledo",
			"score_away": 0,
			"score_home": 24,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Toledo",
			"hx_spread_display": "Toledo -50.4",
			"vegas_details": null,
			"home_hx_rank": 77,
			"away_hx_rank": 131,
			"flags": []
		},
		{
			"espn_event_id": "401862824",
			"kick_ct": "2026-11-12 19:00",
			"tv": "ESPN",
			"away": "Memphis",
			"home": "South Florida",
			"away_slug": "memphis",
			"home_slug": "usf",
			"score_away": 52,
			"score_home": 41,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Memphis",
			"hx_spread_display": "Memphis -0.9",
			"vegas_details": "Memphis -4.5",
			"home_hx_rank": 76,
			"away_hx_rank": 51,
			"flags": []
		},
		{
			"espn_event_id": "401869969",
			"kick_ct": "2026-11-12 20:00",
			"tv": "ESPN2",
			"away": "Louisiana",
			"home": "UL Monroe",
			"away_slug": "louisiana",
			"home_slug": "ul-monroe",
			"score_away": 42,
			"score_home": 21,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Louisiana",
			"hx_spread_display": "Louisiana -10.8",
			"vegas_details": "Louisiana -10.5",
			"home_hx_rank": 133,
			"away_hx_rank": 78,
			"flags": []
		},
		{
			"espn_event_id": "401858293",
			"kick_ct": "2026-11-13 18:00",
			"tv": "ESPN",
			"away": "Florida State",
			"home": "Pittsburgh",
			"away_slug": "florida-state",
			"home_slug": "pittsburgh",
			"score_away": 16,
			"score_home": 10,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "Pittsburgh",
			"hx_spread_display": "Pittsburgh -3.2",
			"vegas_details": "Pitt -3.5",
			"home_hx_rank": 49,
			"away_hx_rank": 48,
			"flags": []
		},
		{
			"espn_event_id": "401858526",
			"kick_ct": "2026-11-13 20:00",
			"tv": "FOX",
			"away": "Illinois",
			"home": "UCLA",
			"away_slug": "illinois",
			"home_slug": "ucla",
			"score_away": 14,
			"score_home": 22,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "UCLA",
			"hx_spread_display": "UCLA -11.4",
			"vegas_details": "UCLA -10",
			"home_hx_rank": 13,
			"away_hx_rank": 44,
			"flags": []
		},
		{
			"espn_event_id": "401856860",
			"kick_ct": "2026-11-13 21:15",
			"tv": "ESPN",
			"away": "Houston",
			"home": "Colorado",
			"away_slug": "houston",
			"home_slug": "colorado",
			"score_away": 32,
			"score_home": 42,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Houston",
			"hx_spread_display": "Houston -10.1",
			"vegas_details": "Houston -9.5",
			"home_hx_rank": 84,
			"away_hx_rank": 22,
			"flags": []
		},
		{
			"espn_event_id": "401856859",
			"kick_ct": "2026-11-14 11:00",
			"tv": null,
			"away": "Cincinnati",
			"home": "Iowa State",
			"away_slug": "cincinnati",
			"home_slug": "iowa-state",
			"score_away": 13,
			"score_home": 41,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Iowa State",
			"hx_spread_display": "Iowa State -4.8",
			"vegas_details": "Iowa St -1.5",
			"home_hx_rank": 53,
			"away_hx_rank": 61,
			"flags": []
		},
		{
			"espn_event_id": "401858296",
			"kick_ct": "2026-11-14 11:00",
			"tv": "ABC",
			"away": "Duke",
			"home": "Miami",
			"away_slug": "duke",
			"home_slug": "miami",
			"score_away": 25,
			"score_home": 36,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Miami",
			"hx_spread_display": "Miami -15.4",
			"vegas_details": "Miami -13.5",
			"home_hx_rank": 3,
			"away_hx_rank": 33,
			"flags": []
		},
		{
			"espn_event_id": "401858300",
			"kick_ct": "2026-11-14 11:00",
			"tv": "ACC Network",
			"away": "Syracuse",
			"home": "NC State",
			"away_slug": "syracuse",
			"home_slug": "nc-state",
			"score_away": 34,
			"score_home": 31,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "NC State",
			"hx_spread_display": "NC State -2.0",
			"vegas_details": "Syracuse -3",
			"home_hx_rank": 80,
			"away_hx_rank": 75,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401858301",
			"kick_ct": "2026-11-14 11:00",
			"tv": null,
			"away": "Wake Forest",
			"home": "SMU",
			"away_slug": "wake-forest",
			"home_slug": "smu",
			"score_away": 49,
			"score_home": 7,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "SMU",
			"hx_spread_display": "SMU -1.2",
			"vegas_details": null,
			"home_hx_rank": 34,
			"away_hx_rank": 24,
			"flags": []
		},
		{
			"espn_event_id": "401858520",
			"kick_ct": "2026-11-14 11:00",
			"tv": "FS1",
			"away": "Wisconsin",
			"home": "Maryland",
			"away_slug": "wisconsin",
			"home_slug": "maryland",
			"score_away": 21,
			"score_home": 24,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Wisconsin",
			"hx_spread_display": "Wisconsin -6.6",
			"vegas_details": null,
			"home_hx_rank": 81,
			"away_hx_rank": 36,
			"flags": []
		},
		{
			"espn_event_id": "401858522",
			"kick_ct": "2026-11-14 11:00",
			"tv": "FOX",
			"away": "Northwestern",
			"home": "Ohio State",
			"away_slug": "northwestern",
			"home_slug": "ohio-state",
			"score_away": 19,
			"score_home": 28,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Ohio State",
			"hx_spread_display": "Ohio State -10.1",
			"vegas_details": "Ohio St -10.5",
			"home_hx_rank": 9,
			"away_hx_rank": 26,
			"flags": []
		},
		{
			"espn_event_id": "401861967",
			"kick_ct": "2026-11-14 11:00",
			"tv": "CBSSN",
			"away": "James Madison",
			"home": "UConn",
			"away_slug": "james-madison",
			"home_slug": "uconn",
			"score_away": 22,
			"score_home": 46,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "James Madison",
			"hx_spread_display": "James Madison -8.3",
			"vegas_details": "JMU -4",
			"home_hx_rank": 93,
			"away_hx_rank": 40,
			"flags": []
		},
		{
			"espn_event_id": "401858297",
			"kick_ct": "2026-11-14 11:30",
			"tv": "CW",
			"away": "Georgia Tech",
			"home": "Clemson",
			"away_slug": "georgia-tech",
			"home_slug": "clemson",
			"score_away": 20,
			"score_home": 6,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Clemson",
			"hx_spread_display": "Clemson -18.0",
			"vegas_details": "Clemson -14",
			"home_hx_rank": 37,
			"away_hx_rank": 97,
			"flags": []
		},
		{
			"espn_event_id": "401858525",
			"kick_ct": "2026-11-14 11:30",
			"tv": "BTN",
			"away": "Nebraska",
			"home": "Rutgers",
			"away_slug": "nebraska",
			"home_slug": "rutgers",
			"score_away": 31,
			"score_home": 0,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Nebraska",
			"hx_spread_display": "Nebraska -12.9",
			"vegas_details": null,
			"home_hx_rank": 103,
			"away_hx_rank": 30,
			"flags": []
		},
		{
			"espn_event_id": "401856889",
			"kick_ct": "2026-11-14 11:45",
			"tv": "SEC Network",
			"away": "Alabama",
			"home": "Vanderbilt",
			"away_slug": "alabama",
			"home_slug": "vanderbilt",
			"score_away": 21,
			"score_home": 6,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Alabama",
			"hx_spread_display": "Alabama -19.6",
			"vegas_details": "Alabama -19.5",
			"home_hx_rank": 64,
			"away_hx_rank": 2,
			"flags": []
		},
		{
			"espn_event_id": "401862825",
			"kick_ct": "2026-11-14 12:00",
			"tv": "ESPN+",
			"away": "East Carolina",
			"home": "Charlotte",
			"away_slug": "east-carolina",
			"home_slug": "charlotte",
			"score_away": 17,
			"score_home": 16,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "East Carolina",
			"hx_spread_display": "East Carolina -7.5",
			"vegas_details": "ECU -11.5",
			"home_hx_rank": 132,
			"away_hx_rank": 86,
			"flags": []
		},
		{
			"espn_event_id": "401862829",
			"kick_ct": "2026-11-14 12:00",
			"tv": "ESPN+",
			"away": "UAB",
			"home": "Temple",
			"away_slug": "uab",
			"home_slug": "temple",
			"score_away": 36,
			"score_home": 10,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "Temple",
			"hx_spread_display": "Temple -0.7",
			"vegas_details": "Temple -2.5",
			"home_hx_rank": 121,
			"away_hx_rank": 110,
			"flags": []
		},
		{
			"espn_event_id": "401869937",
			"kick_ct": "2026-11-14 12:00",
			"tv": "ESPN+",
			"away": "Arkansas State",
			"home": "Coastal Carolina",
			"away_slug": "arkansas-state",
			"home_slug": "coastal-carolina",
			"score_away": 21,
			"score_home": 28,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Coastal Carolina",
			"hx_spread_display": "Coastal Carolina -3.3",
			"vegas_details": "Coastal -1.5",
			"home_hx_rank": 111,
			"away_hx_rank": 112,
			"flags": []
		},
		{
			"espn_event_id": "401856862",
			"kick_ct": "2026-11-14 13:00",
			"tv": null,
			"away": "Kansas State",
			"home": "TCU",
			"away_slug": "kansas-state",
			"home_slug": "tcu",
			"score_away": 10,
			"score_home": 20,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "TCU",
			"hx_spread_display": "TCU -9.2",
			"vegas_details": "TCU -9.5",
			"home_hx_rank": 43,
			"away_hx_rank": 73,
			"flags": []
		},
		{
			"espn_event_id": "401870769",
			"kick_ct": "2026-11-14 13:00",
			"tv": "ESPN+",
			"away": "Kennesaw State",
			"home": "Sam Houston",
			"away_slug": "kennesaw-state",
			"home_slug": "sam-houston",
			"score_away": 26,
			"score_home": 7,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Kennesaw State",
			"hx_spread_display": "Kennesaw State -3.1",
			"vegas_details": "Kennesaw -7.5",
			"home_hx_rank": 134,
			"away_hx_rank": 117,
			"flags": []
		},
		{
			"espn_event_id": "401856888",
			"kick_ct": "2026-11-14 14:00",
			"tv": null,
			"away": "Tennessee",
			"home": "Texas A&M",
			"away_slug": "tennessee",
			"home_slug": "texas-am",
			"score_away": 22,
			"score_home": 7,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Tennessee",
			"hx_spread_display": "Tennessee -2.3",
			"vegas_details": "Tennessee -2.5",
			"home_hx_rank": 21,
			"away_hx_rank": 7,
			"flags": []
		},
		{
			"espn_event_id": "401870796",
			"kick_ct": "2026-11-14 14:00",
			"tv": "ESPN+",
			"away": "New Mexico State",
			"home": "Missouri State",
			"away_slug": "new-mexico-state",
			"home_slug": "missouri-state",
			"score_away": 21,
			"score_home": 27,
			"ot": true,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Missouri State",
			"hx_spread_display": "Missouri State -5.9",
			"vegas_details": "Missouri St -1.5",
			"home_hx_rank": 122,
			"away_hx_rank": 128,
			"flags": []
		},
		{
			"espn_event_id": "401871060",
			"kick_ct": "2026-11-14 14:00",
			"tv": "ESPN+",
			"away": "Florida International",
			"home": "Delaware",
			"away_slug": "fiu",
			"home_slug": "delaware",
			"score_away": 16,
			"score_home": 24,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Delaware",
			"hx_spread_display": "Delaware -4.5",
			"vegas_details": null,
			"home_hx_rank": 98,
			"away_hx_rank": 105,
			"flags": []
		},
		{
			"espn_event_id": "401856861",
			"kick_ct": "2026-11-14 14:30",
			"tv": null,
			"away": "Kansas",
			"home": "West Virginia",
			"away_slug": "kansas",
			"home_slug": "west-virginia",
			"score_away": 37,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "West Virginia",
			"hx_spread_display": "West Virginia -3.3",
			"vegas_details": "W Virginia -2.5",
			"home_hx_rank": 67,
			"away_hx_rank": 70,
			"flags": []
		},
		{
			"espn_event_id": "401856883",
			"kick_ct": "2026-11-14 14:30",
			"tv": null,
			"away": "Missouri",
			"home": "Georgia",
			"away_slug": "missouri",
			"home_slug": "georgia",
			"score_away": 21,
			"score_home": 48,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Georgia",
			"hx_spread_display": "Georgia -15.4",
			"vegas_details": "Georgia -16.5",
			"home_hx_rank": 1,
			"away_hx_rank": 14,
			"flags": []
		},
		{
			"espn_event_id": "401858294",
			"kick_ct": "2026-11-14 14:30",
			"tv": "NBC",
			"away": "Boston College",
			"home": "Notre Dame",
			"away_slug": "boston-college",
			"home_slug": "notre-dame",
			"score_away": 7,
			"score_home": 41,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Notre Dame",
			"hx_spread_display": "Notre Dame -30.6",
			"vegas_details": null,
			"home_hx_rank": 4,
			"away_hx_rank": 83,
			"flags": []
		},
		{
			"espn_event_id": "401858295",
			"kick_ct": "2026-11-14 14:30",
			"tv": "ACC Network",
			"away": "California",
			"home": "Virginia",
			"away_slug": "california",
			"home_slug": "virginia",
			"score_away": 7,
			"score_home": 36,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Virginia",
			"hx_spread_display": "Virginia -10.0",
			"vegas_details": "Virginia -12.5",
			"home_hx_rank": 66,
			"away_hx_rank": 94,
			"flags": []
		},
		{
			"espn_event_id": "401858518",
			"kick_ct": "2026-11-14 14:30",
			"tv": "CBS",
			"away": "USC",
			"home": "Indiana",
			"away_slug": "usc",
			"home_slug": "indiana",
			"score_away": 13,
			"score_home": 27,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Indiana",
			"hx_spread_display": "Indiana -7.6",
			"vegas_details": "Indiana -8.5",
			"home_hx_rank": 12,
			"away_hx_rank": 25,
			"flags": []
		},
		{
			"espn_event_id": "401858523",
			"kick_ct": "2026-11-14 14:30",
			"tv": "FS1",
			"away": "Michigan",
			"home": "Oregon",
			"away_slug": "michigan",
			"home_slug": "oregon",
			"score_away": 7,
			"score_home": 31,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Oregon",
			"hx_spread_display": "Oregon -14.8",
			"vegas_details": "Oregon -10.5",
			"home_hx_rank": 11,
			"away_hx_rank": 47,
			"flags": []
		},
		{
			"espn_event_id": "401864536",
			"kick_ct": "2026-11-14 14:30",
			"tv": "MW+",
			"away": "Nevada",
			"home": "Northern Illinois",
			"away_slug": "nevada",
			"home_slug": "northern-illinois",
			"score_away": 28,
			"score_home": 7,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Nevada",
			"hx_spread_display": "Nevada -5.3",
			"vegas_details": "Nevada -10.5",
			"home_hx_rank": 135,
			"away_hx_rank": 113,
			"flags": []
		},
		{
			"espn_event_id": "401869952",
			"kick_ct": "2026-11-14 14:30",
			"tv": "ESPN+",
			"away": "Georgia Southern",
			"home": "Georgia State",
			"away_slug": "georgia-southern",
			"home_slug": "georgia-state",
			"score_away": 34,
			"score_home": 17,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Georgia Southern",
			"hx_spread_display": "Georgia Southern -1.5",
			"vegas_details": "Ga Southern -5.5",
			"home_hx_rank": 95,
			"away_hx_rank": 74,
			"flags": []
		},
		{
			"espn_event_id": "401870752",
			"kick_ct": "2026-11-14 14:30",
			"tv": "ESPN+",
			"away": "Jacksonville State",
			"home": "Western Kentucky",
			"away_slug": "jacksonville-state",
			"home_slug": "western-kentucky",
			"score_away": 24,
			"score_home": 34,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "Jacksonville State",
			"hx_spread_display": "Jacksonville State -2.6",
			"vegas_details": "Jax State -6",
			"home_hx_rank": 115,
			"away_hx_rank": 82,
			"flags": []
		},
		{
			"espn_event_id": "401871061",
			"kick_ct": "2026-11-14 14:30",
			"tv": "CBSSN",
			"away": "Middle Tennessee",
			"home": "Liberty",
			"away_slug": "middle-tennessee",
			"home_slug": "liberty",
			"score_away": 23,
			"score_home": 28,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Liberty",
			"hx_spread_display": "Liberty -24.4",
			"vegas_details": "Liberty -20.5",
			"home_hx_rank": 38,
			"away_hx_rank": 124,
			"flags": []
		},
		{
			"espn_event_id": "401860916",
			"kick_ct": "2026-11-14 15:00",
			"tv": "CW",
			"away": "Fresno State",
			"home": "Texas State",
			"away_slug": "fresno-state",
			"home_slug": "texas-state",
			"score_away": 35,
			"score_home": 37,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Texas State",
			"hx_spread_display": "Texas State -6.4",
			"vegas_details": null,
			"home_hx_rank": 45,
			"away_hx_rank": 56,
			"flags": []
		},
		{
			"espn_event_id": "401856886",
			"kick_ct": "2026-11-14 15:15",
			"tv": null,
			"away": "Auburn",
			"home": "Mississippi State",
			"away_slug": "auburn",
			"home_slug": "mississippi-state",
			"score_away": 41,
			"score_home": 9,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Mississippi State",
			"hx_spread_display": "Mississippi State -1.8",
			"vegas_details": "Auburn -2.5",
			"home_hx_rank": 46,
			"away_hx_rank": 39,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401862828",
			"kick_ct": "2026-11-14 15:30",
			"tv": "ESPN+",
			"away": "Tulane",
			"home": "Rice",
			"away_slug": "tulane",
			"home_slug": "rice",
			"score_away": 20,
			"score_home": 17,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "Rice",
			"hx_spread_display": "Rice -0.1",
			"vegas_details": "Rice -1.5",
			"home_hx_rank": 123,
			"away_hx_rank": 107,
			"flags": []
		},
		{
			"espn_event_id": "401871099",
			"kick_ct": "2026-11-14 16:00",
			"tv": "ESPN+",
			"away": "Southern Miss",
			"home": "Louisiana Tech",
			"away_slug": "southern-miss",
			"home_slug": "louisiana-tech",
			"score_away": 31,
			"score_home": 63,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Louisiana Tech",
			"hx_spread_display": "Louisiana Tech -19.1",
			"vegas_details": "LA Tech -18.5",
			"home_hx_rank": 57,
			"away_hx_rank": 126,
			"flags": []
		},
		{
			"espn_event_id": "401856857",
			"kick_ct": "2026-11-14 16:30",
			"tv": null,
			"away": "Arizona State",
			"home": "UCF",
			"away_slug": "arizona-state",
			"home_slug": "ucf",
			"score_away": 26,
			"score_home": 13,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "UCF",
			"hx_spread_display": "UCF -4.7",
			"vegas_details": "UCF -2.5",
			"home_hx_rank": 55,
			"away_hx_rank": 71,
			"flags": []
		},
		{
			"espn_event_id": "401858521",
			"kick_ct": "2026-11-14 16:30",
			"tv": "BTN",
			"away": "Washington",
			"home": "Michigan State",
			"away_slug": "washington",
			"home_slug": "michigan-state",
			"score_away": 21,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Washington",
			"hx_spread_display": "Washington -1.5",
			"vegas_details": "Washington -3.5",
			"home_hx_rank": 68,
			"away_hx_rank": 42,
			"flags": []
		},
		{
			"espn_event_id": "401860914",
			"kick_ct": "2026-11-14 17:00",
			"tv": "USA Net",
			"away": "Oregon State",
			"home": "Boise State",
			"away_slug": "oregon-state",
			"home_slug": "boise-state",
			"score_away": 41,
			"score_home": 46,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Boise State",
			"hx_spread_display": "Boise State -15.9",
			"vegas_details": "Boise St -14.5",
			"home_hx_rank": 15,
			"away_hx_rank": 63,
			"flags": []
		},
		{
			"espn_event_id": "401869928",
			"kick_ct": "2026-11-14 17:00",
			"tv": "ESPN+",
			"away": "App State",
			"home": "Marshall",
			"away_slug": "app-state",
			"home_slug": "marshall",
			"score_away": 20,
			"score_home": 16,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Marshall",
			"hx_spread_display": "Marshall -4.6",
			"vegas_details": "App State -2.5",
			"home_hx_rank": 104,
			"away_hx_rank": 114,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401856884",
			"kick_ct": "2026-11-14 17:15",
			"tv": null,
			"away": "Florida",
			"home": "Kentucky",
			"away_slug": "florida",
			"home_slug": "kentucky",
			"score_away": 21,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Kentucky",
			"hx_spread_display": "Kentucky -3.4",
			"vegas_details": "Kentucky -2.5",
			"home_hx_rank": 27,
			"away_hx_rank": 28,
			"flags": []
		},
		{
			"espn_event_id": "401856858",
			"kick_ct": "2026-11-14 18:00",
			"tv": null,
			"away": "Baylor",
			"home": "BYU",
			"away_slug": "baylor",
			"home_slug": "byu",
			"score_away": 7,
			"score_home": 28,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "BYU",
			"hx_spread_display": "BYU -5.8",
			"vegas_details": "BYU -7",
			"home_hx_rank": 18,
			"away_hx_rank": 31,
			"flags": []
		},
		{
			"espn_event_id": "401858298",
			"kick_ct": "2026-11-14 18:00",
			"tv": null,
			"away": "Louisville",
			"home": "North Carolina",
			"away_slug": "louisville",
			"home_slug": "north-carolina",
			"score_away": 16,
			"score_home": 14,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Louisville",
			"hx_spread_display": "Louisville -1.9",
			"vegas_details": "Louisville -3.5",
			"home_hx_rank": 41,
			"away_hx_rank": 19,
			"flags": []
		},
		{
			"espn_event_id": "401858524",
			"kick_ct": "2026-11-14 18:00",
			"tv": "FS1",
			"away": "Minnesota",
			"home": "Penn State",
			"away_slug": "minnesota",
			"home_slug": "penn-state",
			"score_away": 14,
			"score_home": 42,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Penn State",
			"hx_spread_display": "Penn State -10.1",
			"vegas_details": "Penn St -7.5",
			"home_hx_rank": 35,
			"away_hx_rank": 60,
			"flags": []
		},
		{
			"espn_event_id": "401864538",
			"kick_ct": "2026-11-14 18:00",
			"tv": "CBSSN",
			"away": "San José State",
			"home": "Air Force",
			"away_slug": "san-jose-state",
			"home_slug": "air-force",
			"score_away": 3,
			"score_home": 24,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Air Force",
			"hx_spread_display": "Air Force -5.9",
			"vegas_details": "Air Force -12.5",
			"home_hx_rank": 101,
			"away_hx_rank": 116,
			"flags": []
		},
		{
			"espn_event_id": "401871100",
			"kick_ct": "2026-11-14 18:00",
			"tv": "ESPN+",
			"away": "Troy",
			"home": "South Alabama",
			"away_slug": "troy",
			"home_slug": "south-alabama",
			"score_away": 14,
			"score_home": 27,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "South Alabama",
			"hx_spread_display": "South Alabama -4.5",
			"vegas_details": "South Alabama -3",
			"home_hx_rank": 100,
			"away_hx_rank": 108,
			"flags": []
		},
		{
			"espn_event_id": "401862826",
			"kick_ct": "2026-11-14 18:15",
			"tv": "ESPN+",
			"away": "Florida Atlantic",
			"home": "Tulsa",
			"away_slug": "florida-atlantic",
			"home_slug": "tulsa",
			"score_away": 21,
			"score_home": 38,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Tulsa",
			"hx_spread_display": "Tulsa -5.5",
			"vegas_details": null,
			"home_hx_rank": 79,
			"away_hx_rank": 87,
			"flags": []
		},
		{
			"espn_event_id": "401856885",
			"kick_ct": "2026-11-14 18:30",
			"tv": null,
			"away": "Texas",
			"home": "LSU",
			"away_slug": "texas",
			"home_slug": "lsu",
			"score_away": 22,
			"score_home": 21,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "LSU",
			"hx_spread_display": "LSU -3.1",
			"vegas_details": "LSU -3.5",
			"home_hx_rank": 6,
			"away_hx_rank": 5,
			"flags": []
		},
		{
			"espn_event_id": "401858299",
			"kick_ct": "2026-11-14 18:30",
			"tv": null,
			"away": "Stanford",
			"home": "Virginia Tech",
			"away_slug": "stanford",
			"home_slug": "virginia-tech",
			"score_away": 40,
			"score_home": 22,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Virginia Tech",
			"hx_spread_display": "Virginia Tech -11.9",
			"vegas_details": null,
			"home_hx_rank": 52,
			"away_hx_rank": 90,
			"flags": []
		},
		{
			"espn_event_id": "401858519",
			"kick_ct": "2026-11-14 18:30",
			"tv": "NBC",
			"away": "Purdue",
			"home": "Iowa",
			"away_slug": "purdue",
			"home_slug": "iowa",
			"score_away": 7,
			"score_home": 28,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Iowa",
			"hx_spread_display": "Iowa -15.6",
			"vegas_details": "Iowa -16.5",
			"home_hx_rank": 17,
			"away_hx_rank": 69,
			"flags": []
		},
		{
			"espn_event_id": "401864539",
			"kick_ct": "2026-11-14 18:30",
			"tv": "CW",
			"away": "UNLV",
			"home": "New Mexico",
			"away_slug": "unlv",
			"home_slug": "new-mexico",
			"score_away": 21,
			"score_home": 17,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "New Mexico",
			"hx_spread_display": "New Mexico -11.7",
			"vegas_details": "New Mexico -14.5",
			"home_hx_rank": 50,
			"away_hx_rank": 85,
			"flags": []
		},
		{
			"espn_event_id": "401856882",
			"kick_ct": "2026-11-14 18:45",
			"tv": "SEC Network",
			"away": "South Carolina",
			"home": "Arkansas",
			"away_slug": "south-carolina",
			"home_slug": "arkansas",
			"score_away": 6,
			"score_home": 34,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "South Carolina",
			"hx_spread_display": "South Carolina -5.6",
			"vegas_details": null,
			"home_hx_rank": 54,
			"away_hx_rank": 20,
			"flags": []
		},
		{
			"espn_event_id": "401862827",
			"kick_ct": "2026-11-14 20:00",
			"tv": "ESPNU",
			"away": "North Texas",
			"home": "UTSA",
			"away_slug": "north-texas",
			"home_slug": "utsa",
			"score_away": 16,
			"score_home": 35,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "UTSA",
			"hx_spread_display": "UTSA -2.6",
			"vegas_details": "North Texas -2.5",
			"home_hx_rank": 65,
			"away_hx_rank": 58,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401856863",
			"kick_ct": "2026-11-14 20:30",
			"tv": null,
			"away": "Texas Tech",
			"home": "Oklahoma State",
			"away_slug": "texas-tech",
			"home_slug": "oklahoma-state",
			"score_away": 52,
			"score_home": 27,
			"ot": false,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "Oklahoma State",
			"hx_spread_display": "Oklahoma State -0.8",
			"vegas_details": "Oklahoma St -2.5",
			"home_hx_rank": 29,
			"away_hx_rank": 16,
			"flags": []
		},
		{
			"espn_event_id": "401860915",
			"kick_ct": "2026-11-14 20:30",
			"tv": "USA Net",
			"away": "Utah State",
			"home": "San Diego State",
			"away_slug": "utah-state",
			"home_slug": "san-diego-state",
			"score_away": 13,
			"score_home": 30,
			"ot": false,
			"closer": null,
			"su_hit": false,
			"hx_fav": "Utah State",
			"hx_spread_display": "Utah State -1.8",
			"vegas_details": null,
			"home_hx_rank": 92,
			"away_hx_rank": 72,
			"flags": []
		},
		{
			"espn_event_id": "401864540",
			"kick_ct": "2026-11-14 21:00",
			"tv": "FS1",
			"away": "Wyoming",
			"home": "UTEP",
			"away_slug": "wyoming",
			"home_slug": "utep",
			"score_away": 27,
			"score_home": 15,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Wyoming",
			"hx_spread_display": "Wyoming -7.0",
			"vegas_details": "Wyoming -10",
			"home_hx_rank": 136,
			"away_hx_rank": 109,
			"flags": []
		},
		{
			"espn_event_id": "401856864",
			"kick_ct": "2026-11-14 21:30",
			"tv": null,
			"away": "Utah",
			"home": "Arizona",
			"away_slug": "utah",
			"home_slug": "arizona",
			"score_away": 40,
			"score_home": 39,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Utah",
			"hx_spread_display": "Utah -2.3",
			"vegas_details": "Utah -2.5",
			"home_hx_rank": 23,
			"away_hx_rank": 8,
			"flags": []
		},
		{
			"espn_event_id": "401860917",
			"kick_ct": "2026-11-14 21:45",
			"tv": "CBSSN",
			"away": "Colorado State",
			"home": "Washington State",
			"away_slug": "colorado-state",
			"home_slug": "washington-state",
			"score_away": 7,
			"score_home": 73,
			"ot": false,
			"closer": null,
			"su_hit": true,
			"hx_fav": "Washington State",
			"hx_spread_display": "Washington State -6.3",
			"vegas_details": null,
			"home_hx_rank": 102,
			"away_hx_rank": 119,
			"flags": []
		},
		{
			"espn_event_id": "401864537",
			"kick_ct": "2026-11-14 22:00",
			"tv": "CW",
			"away": "North Dakota State",
			"home": "Hawaiʻi",
			"away_slug": "north-dakota-state",
			"home_slug": "hawaii",
			"score_away": 21,
			"score_home": 13,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "North Dakota State",
			"hx_spread_display": "North Dakota State -7.4",
			"vegas_details": "N Dakota St -6.5",
			"home_hx_rank": 118,
			"away_hx_rank": 59,
			"flags": []
		},
		{
			"espn_event_id": "401856887",
			"kick_ct": "2026-11-15 12:00",
			"tv": "SEC Network",
			"away": "Ole Miss",
			"home": "Oklahoma",
			"away_slug": "ole-miss",
			"home_slug": "oklahoma",
			"score_away": 17,
			"score_home": 24,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Ole Miss",
			"hx_spread_display": "Ole Miss -2.6",
			"vegas_details": "Oklahoma -2.5",
			"home_hx_rank": 32,
			"away_hx_rank": 10,
			"flags": ["WINNER_FLIP_MISS"]
		}
	]
};
var week11_tape_top25_closer_2026_default = {
	meta: {
		"as_of": "2026-11-15 4:32 PM CT",
		"week": 11,
		"season": 2026,
		"universe": "FBS–FBS with at least one team in the HX Top 25 entering the week (HX 2026.8 hx_rank <= 25)",
		"n_games": 20,
		"closer_n": 17,
		"hx_closer": "6/17",
		"hx_closer_pct": 35.3,
		"su": "14/20",
		"su_pct": 70,
		"vegas_closer_n": 11,
		"closer_ties": 0,
		"full_slate_closer": "21/50 (42.0%) on Vegas-lined cards",
		"source_tape": "data/week11_tape_2026.json",
		"rank_source": "HX 2026.8 board ranks entering Week 11 (not retuned)",
		"peer_note": "Week 4 Top 25 rule applied to the 66 ESPN FINALs and HX 2026.8 ranks. Closer graded only on cards with a stamped Vegas close (17 of 20). Public headline is the full slate."
	},
	games: [
		{
			"espn_event_id": "401858526",
			"kick_ct": "2026-11-13 20:00",
			"matchup": "Illinois @ UCLA",
			"away": "Illinois",
			"home": "UCLA",
			"home_hx_rank": 13,
			"away_hx_rank": 44,
			"hx_spread_display": "UCLA -11.4",
			"vegas_details": "UCLA -10",
			"final": "14–22",
			"score_away": 14,
			"score_home": 22,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856860",
			"kick_ct": "2026-11-13 21:15",
			"matchup": "Houston @ Colorado",
			"away": "Houston",
			"home": "Colorado",
			"home_hx_rank": 84,
			"away_hx_rank": 22,
			"hx_spread_display": "Houston -10.1",
			"vegas_details": "Houston -9.5",
			"final": "32–42",
			"score_away": 32,
			"score_home": 42,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401858296",
			"kick_ct": "2026-11-14 11:00",
			"matchup": "Duke @ Miami",
			"away": "Duke",
			"home": "Miami",
			"home_hx_rank": 3,
			"away_hx_rank": 33,
			"hx_spread_display": "Miami -15.4",
			"vegas_details": "Miami -13.5",
			"final": "25–36",
			"score_away": 25,
			"score_home": 36,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858301",
			"kick_ct": "2026-11-14 11:00",
			"matchup": "Wake Forest @ SMU",
			"away": "Wake Forest",
			"home": "SMU",
			"home_hx_rank": 34,
			"away_hx_rank": 24,
			"hx_spread_display": "SMU -1.2",
			"vegas_details": null,
			"final": "49–7",
			"score_away": 49,
			"score_home": 7,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401858522",
			"kick_ct": "2026-11-14 11:00",
			"matchup": "Northwestern @ Ohio State",
			"away": "Northwestern",
			"home": "Ohio State",
			"home_hx_rank": 9,
			"away_hx_rank": 26,
			"hx_spread_display": "Ohio State -10.1",
			"vegas_details": "Ohio St -10.5",
			"final": "19–28",
			"score_away": 19,
			"score_home": 28,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856889",
			"kick_ct": "2026-11-14 11:45",
			"matchup": "Alabama @ Vanderbilt",
			"away": "Alabama",
			"home": "Vanderbilt",
			"home_hx_rank": 64,
			"away_hx_rank": 2,
			"hx_spread_display": "Alabama -19.6",
			"vegas_details": "Alabama -19.5",
			"final": "21–6",
			"score_away": 21,
			"score_home": 6,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856888",
			"kick_ct": "2026-11-14 14:00",
			"matchup": "Tennessee @ Texas A&M",
			"away": "Tennessee",
			"home": "Texas A&M",
			"home_hx_rank": 21,
			"away_hx_rank": 7,
			"hx_spread_display": "Tennessee -2.3",
			"vegas_details": "Tennessee -2.5",
			"final": "22–7",
			"score_away": 22,
			"score_home": 7,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856883",
			"kick_ct": "2026-11-14 14:30",
			"matchup": "Missouri @ Georgia",
			"away": "Missouri",
			"home": "Georgia",
			"home_hx_rank": 1,
			"away_hx_rank": 14,
			"hx_spread_display": "Georgia -15.4",
			"vegas_details": "Georgia -16.5",
			"final": "21–48",
			"score_away": 21,
			"score_home": 48,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858294",
			"kick_ct": "2026-11-14 14:30",
			"matchup": "Boston College @ Notre Dame",
			"away": "Boston College",
			"home": "Notre Dame",
			"home_hx_rank": 4,
			"away_hx_rank": 83,
			"hx_spread_display": "Notre Dame -30.6",
			"vegas_details": null,
			"final": "7–41",
			"score_away": 7,
			"score_home": 41,
			"closer": null,
			"su_hit": true
		},
		{
			"espn_event_id": "401858518",
			"kick_ct": "2026-11-14 14:30",
			"matchup": "USC @ Indiana",
			"away": "USC",
			"home": "Indiana",
			"home_hx_rank": 12,
			"away_hx_rank": 25,
			"hx_spread_display": "Indiana -7.6",
			"vegas_details": "Indiana -8.5",
			"final": "13–27",
			"score_away": 13,
			"score_home": 27,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858523",
			"kick_ct": "2026-11-14 14:30",
			"matchup": "Michigan @ Oregon",
			"away": "Michigan",
			"home": "Oregon",
			"home_hx_rank": 11,
			"away_hx_rank": 47,
			"hx_spread_display": "Oregon -14.8",
			"vegas_details": "Oregon -10.5",
			"final": "7–31",
			"score_away": 7,
			"score_home": 31,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401860914",
			"kick_ct": "2026-11-14 17:00",
			"matchup": "Oregon State @ Boise State",
			"away": "Oregon State",
			"home": "Boise State",
			"home_hx_rank": 15,
			"away_hx_rank": 63,
			"hx_spread_display": "Boise State -15.9",
			"vegas_details": "Boise St -14.5",
			"final": "41–46",
			"score_away": 41,
			"score_home": 46,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856858",
			"kick_ct": "2026-11-14 18:00",
			"matchup": "Baylor @ BYU",
			"away": "Baylor",
			"home": "BYU",
			"home_hx_rank": 18,
			"away_hx_rank": 31,
			"hx_spread_display": "BYU -5.8",
			"vegas_details": "BYU -7",
			"final": "7–28",
			"score_away": 7,
			"score_home": 28,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858298",
			"kick_ct": "2026-11-14 18:00",
			"matchup": "Louisville @ North Carolina",
			"away": "Louisville",
			"home": "North Carolina",
			"home_hx_rank": 41,
			"away_hx_rank": 19,
			"hx_spread_display": "Louisville -1.9",
			"vegas_details": "Louisville -3.5",
			"final": "16–14",
			"score_away": 16,
			"score_home": 14,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856885",
			"kick_ct": "2026-11-14 18:30",
			"matchup": "Texas @ LSU",
			"away": "Texas",
			"home": "LSU",
			"home_hx_rank": 6,
			"away_hx_rank": 5,
			"hx_spread_display": "LSU -3.1",
			"vegas_details": "LSU -3.5",
			"final": "22–21",
			"score_away": 22,
			"score_home": 21,
			"closer": "hx",
			"su_hit": false
		},
		{
			"espn_event_id": "401858519",
			"kick_ct": "2026-11-14 18:30",
			"matchup": "Purdue @ Iowa",
			"away": "Purdue",
			"home": "Iowa",
			"home_hx_rank": 17,
			"away_hx_rank": 69,
			"hx_spread_display": "Iowa -15.6",
			"vegas_details": "Iowa -16.5",
			"final": "7–28",
			"score_away": 7,
			"score_home": 28,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856882",
			"kick_ct": "2026-11-14 18:45",
			"matchup": "South Carolina @ Arkansas",
			"away": "South Carolina",
			"home": "Arkansas",
			"home_hx_rank": 54,
			"away_hx_rank": 20,
			"hx_spread_display": "South Carolina -5.6",
			"vegas_details": null,
			"final": "6–34",
			"score_away": 6,
			"score_home": 34,
			"closer": null,
			"su_hit": false
		},
		{
			"espn_event_id": "401856863",
			"kick_ct": "2026-11-14 20:30",
			"matchup": "Texas Tech @ Oklahoma State",
			"away": "Texas Tech",
			"home": "Oklahoma State",
			"home_hx_rank": 29,
			"away_hx_rank": 16,
			"hx_spread_display": "Oklahoma State -0.8",
			"vegas_details": "Oklahoma St -2.5",
			"final": "52–27",
			"score_away": 52,
			"score_home": 27,
			"closer": "hx",
			"su_hit": false
		},
		{
			"espn_event_id": "401856864",
			"kick_ct": "2026-11-14 21:30",
			"matchup": "Utah @ Arizona",
			"away": "Utah",
			"home": "Arizona",
			"home_hx_rank": 23,
			"away_hx_rank": 8,
			"hx_spread_display": "Utah -2.3",
			"vegas_details": "Utah -2.5",
			"final": "40–39",
			"score_away": 40,
			"score_home": 39,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856887",
			"kick_ct": "2026-11-15 12:00",
			"matchup": "Ole Miss @ Oklahoma",
			"away": "Ole Miss",
			"home": "Oklahoma",
			"home_hx_rank": 32,
			"away_hx_rank": 10,
			"hx_spread_display": "Ole Miss -2.6",
			"vegas_details": "Oklahoma -2.5",
			"final": "17–24",
			"score_away": 17,
			"score_home": 24,
			"closer": "vegas",
			"su_hit": false
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
*   data/week11_tape_2026.json
*   data/week11_tape_top25_closer_2026.json
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
var week11TapePack = week11_tape_2026_default;
var week11Top25Pack = week11_tape_top25_closer_2026_default;
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
/** Week 11 tape (HX 2026.8 pregame vs ESPN FINALs). Closer is on the Vegas-lined cards only. Headline numbers only from the file. */
function week11Tape() {
	const m = week11TapePack.meta;
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
			const l = hxMaeOnLinedCards(week11TapePack.games);
			return l && l.n === m.closer_n ? {
				...l,
				mae_vegas: m.mae_vegas
			} : void 0;
		})(),
		source: `week11_tape_2026 · FBS–FBS n=${m.n_games} · closer on ${m.closer_n} Vegas-lined cards · HX 2026.8 pregame · ESPN FINALs`
	};
}
function week11SeasonTape() {
	const m = week11TapePack.meta;
	return {
		label: "W1–W11",
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
			10,
			11
		],
		su: m.season_w1_w11_su_frac,
		su_pct: pctFromLabeled(m.season_w1_w11_su),
		hx_closer: m.season_w1_w11_closer_frac,
		hx_closer_pct: pctFromLabeled(m.season_w1_w11_closer),
		note: "Week 1–11 arithmetic: Week 10 rollup plus week11_tape_2026 (closer on Vegas-lined cards). Not a fresh W1–W10 audit."
	};
}
function week11BoardFlags() {
	const byEspn = new Map(week11TapePack.games.map((g) => [g.espn_event_id, g]));
	return [...week11TapePack.winner_flip_hits.map((row) => ({
		result: "HIT",
		row
	})), ...week11TapePack.winner_flip_misses.map((row) => ({
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
function week11Top25Tape() {
	const m = week11Top25Pack.meta;
	const vegasN = week11Top25Pack.games.filter((g) => g.closer === "vegas").length;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		vegas_closer: `${vegasN}/${m.closer_n}`,
		source: `week11_tape_top25_closer_2026 · HX Top 25 involvement n=${m.n_games} · closer on ${m.closer_n} Vegas-lined cards · HX 2026.8 pregame ranks · ESPN FINALs`
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
export { make12FreeFromSim as a, week11SeasonTape as c, liveDisagreementRows as i, week11Tape as l, buildRemainingSchedule as n, odTermLabel as o, buildSeasonSchedule as r, week11BoardFlags as s, SIM_10K_HX_STAMP as t, week11Top25Tape as u };
