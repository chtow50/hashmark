import { t as MODEL } from "./sim_free_hx2026_8-BcoJ0dLp.mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as Panel, q as PageHead } from "./router-CuKSKwoX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-BFg1PbAw.js
var import_jsx_runtime = require_jsx_runtime();
var hx_2026_8_backtest_2026_default = {
	meta: {
		"source": "HASHMARK review 2026-11-12 (/workspace/hashmark-review, scripts backtest.mjs). Stamped FBS–FBS FINALs from repo migrations through 0090 (Week 0 stored as Week 1). Shipped = the HX board that was live each week (HX 2026.7 and earlier). HX 2026.8 walk-forward = Bayesian blend refit using only FINALs before each week, knobs also chosen only from earlier weeks.",
		"as_of": "2026-11-12",
		"as_of_tz": "America/Chicago"
	},
	weeks: [
		{
			"week": 1,
			"shipped": {
				"n": 49,
				"su": 40,
				"mae": 14.823,
				"brier": .142
			},
			"hx_2026_8_walkforward": {
				"n": 49,
				"su": 40,
				"mae": 14.823,
				"brier": .142
			}
		},
		{
			"week": 2,
			"shipped": {
				"n": 47,
				"su": 37,
				"mae": 12.196,
				"brier": .147
			},
			"hx_2026_8_walkforward": {
				"n": 47,
				"su": 39,
				"mae": 11.325,
				"brier": .14
			}
		},
		{
			"week": 3,
			"shipped": {
				"n": 56,
				"su": 49,
				"mae": 10.025,
				"brier": .119
			},
			"hx_2026_8_walkforward": {
				"n": 56,
				"su": 45,
				"mae": 10.355,
				"brier": .127
			}
		},
		{
			"week": 4,
			"shipped": {
				"n": 57,
				"su": 42,
				"mae": 12.789,
				"brier": .181
			},
			"hx_2026_8_walkforward": {
				"n": 57,
				"su": 44,
				"mae": 12.27,
				"brier": .177
			}
		},
		{
			"week": 5,
			"shipped": {
				"n": 55,
				"su": 39,
				"mae": 14.865,
				"brier": .195
			},
			"hx_2026_8_walkforward": {
				"n": 55,
				"su": 40,
				"mae": 13.486,
				"brier": .171
			}
		},
		{
			"week": 6,
			"shipped": {
				"n": 56,
				"su": 33,
				"mae": 12.742,
				"brier": .232
			},
			"hx_2026_8_walkforward": {
				"n": 56,
				"su": 36,
				"mae": 12.219,
				"brier": .221
			}
		},
		{
			"week": 7,
			"shipped": {
				"n": 57,
				"su": 34,
				"mae": 12.685,
				"brier": .234
			},
			"hx_2026_8_walkforward": {
				"n": 57,
				"su": 36,
				"mae": 11.717,
				"brier": .227
			}
		},
		{
			"week": 8,
			"shipped": {
				"n": 54,
				"su": 31,
				"mae": 12.989,
				"brier": .26
			},
			"hx_2026_8_walkforward": {
				"n": 54,
				"su": 31,
				"mae": 11.271,
				"brier": .25
			}
		},
		{
			"week": 9,
			"shipped": {
				"n": 54,
				"su": 44,
				"mae": 12.371,
				"brier": .153
			},
			"hx_2026_8_walkforward": {
				"n": 54,
				"su": 40,
				"mae": 12.985,
				"brier": .17
			}
		},
		{
			"week": 10,
			"shipped": {
				"n": 61,
				"su": 36,
				"mae": 15.955,
				"brier": .266
			},
			"hx_2026_8_walkforward": {
				"n": 61,
				"su": 37,
				"mae": 13.313,
				"brier": .223
			}
		}
	],
	totals_w2_11: {
		"n": 502,
		"shipped": {
			"n": 502,
			"su": 349,
			"mae": 13.036,
			"brier": .199
		},
		"hx_2026_8_walkforward": {
			"n": 502,
			"su": 352,
			"mae": 12.103,
			"brier": .19
		}
	},
	totals_w6_11: {
		"n": 287,
		"shipped": {
			"n": 287,
			"su": 182,
			"mae": 13.46,
			"brier": .228
		},
		"hx_2026_8_walkforward": {
			"n": 287,
			"su": 184,
			"mae": 12.273,
			"brier": .217
		}
	},
	vegas_lined_w2_11: {
		"n": 295,
		"mae_vegas": 11.269,
		"mae_shipped": 12.846,
		"mae_hx_2026_8_walkforward": 12.227
	},
	paired_w2_11: {
		"n": 502,
		"mean_mae_improvement": .934,
		"se": .286,
		"t": 3.26,
		"games_better": 281,
		"games_worse": 221
	},
	calibration_slope: {
		"preseason_w1_5": .893,
		"preseason_w6_11": .552,
		"hx_2026_8_w2_11": .908
	}
};
var hx_refit_2026_default = {
	meta: {
		"hx_stamp": "HX 2026.8",
		"method": "Bayesian blend: MAP ridge of opponent-adjusted capped margins around the preseason HX prior",
		"lambda": 2,
		"margin_cap": 28,
		"hfa_elo": 60,
		"n_finals": 551,
		"through_week": 11,
		"last_final_date": "2026-11-11",
		"first_live_week": 12,
		"scope": "Stamped FBS–FBS FINALs only; FCS opponents are unrated and excluded.",
		"migration": "0091_hx_refit_2026_11_12.sql"
	},
	board: [
		{
			"slug": "georgia",
			"hx": 7.2613,
			"rank": 1,
			"pre_hx": 7.888,
			"pre_rank": 1
		},
		{
			"slug": "alabama",
			"hx": 6.802,
			"rank": 2,
			"pre_hx": 5.343,
			"pre_rank": 9
		},
		{
			"slug": "miami",
			"hx": 5.8641,
			"rank": 3,
			"pre_hx": 5.226,
			"pre_rank": 10
		},
		{
			"slug": "notre-dame",
			"hx": 5.7705,
			"rank": 4,
			"pre_hx": 7.086,
			"pre_rank": 3
		},
		{
			"slug": "texas",
			"hx": 5.6718,
			"rank": 5,
			"pre_hx": 6.382,
			"pre_rank": 5
		},
		{
			"slug": "lsu",
			"hx": 5.6405,
			"rank": 6,
			"pre_hx": 4.022,
			"pre_rank": 20
		},
		{
			"slug": "tennessee",
			"hx": 5.0799,
			"rank": 7,
			"pre_hx": 4.073,
			"pre_rank": 17
		},
		{
			"slug": "utah",
			"hx": 4.988,
			"rank": 8,
			"pre_hx": 4.245,
			"pre_rank": 15
		},
		{
			"slug": "ohio-state",
			"hx": 4.9094,
			"rank": 9,
			"pre_hx": 7.846,
			"pre_rank": 2
		},
		{
			"slug": "ole-miss",
			"hx": 4.6824,
			"rank": 10,
			"pre_hx": 5.492,
			"pre_rank": 8
		},
		{
			"slug": "oregon",
			"hx": 4.6607,
			"rank": 11,
			"pre_hx": 6.97,
			"pre_rank": 4
		},
		{
			"slug": "indiana",
			"hx": 4.2977,
			"rank": 12,
			"pre_hx": 4.999,
			"pre_rank": 11
		},
		{
			"slug": "ucla",
			"hx": 3.9868,
			"rank": 13,
			"pre_hx": 1.268,
			"pre_rank": 48
		},
		{
			"slug": "missouri",
			"hx": 3.8413,
			"rank": 14,
			"pre_hx": 4.319,
			"pre_rank": 14
		},
		{
			"slug": "boise-state",
			"hx": 3.7713,
			"rank": 15,
			"pre_hx": 1.319,
			"pre_rank": 47
		},
		{
			"slug": "south-carolina",
			"hx": 3.5572,
			"rank": 16,
			"pre_hx": 2.896,
			"pre_rank": 27
		},
		{
			"slug": "texas-tech",
			"hx": 3.5364,
			"rank": 17,
			"pre_hx": 5.917,
			"pre_rank": 7
		},
		{
			"slug": "byu",
			"hx": 3.5199,
			"rank": 18,
			"pre_hx": 4.064,
			"pre_rank": 18
		},
		{
			"slug": "iowa",
			"hx": 3.5097,
			"rank": 19,
			"pre_hx": 3.763,
			"pre_rank": 23
		},
		{
			"slug": "louisville",
			"hx": 3.5017,
			"rank": 20,
			"pre_hx": 2.979,
			"pre_rank": 26
		},
		{
			"slug": "texas-am",
			"hx": 3.1904,
			"rank": 21,
			"pre_hx": 6.201,
			"pre_rank": 6
		},
		{
			"slug": "houston",
			"hx": 3.1648,
			"rank": 22,
			"pre_hx": 1.642,
			"pre_rank": 40
		},
		{
			"slug": "arizona",
			"hx": 3.1214,
			"rank": 23,
			"pre_hx": 2.368,
			"pre_rank": 29
		},
		{
			"slug": "wake-forest",
			"hx": 3.0911,
			"rank": 24,
			"pre_hx": -.261,
			"pre_rank": 71
		},
		{
			"slug": "usc",
			"hx": 2.9882,
			"rank": 25,
			"pre_hx": 3.876,
			"pre_rank": 22
		},
		{
			"slug": "kentucky",
			"hx": 2.8531,
			"rank": 26,
			"pre_hx": .248,
			"pre_rank": 65
		},
		{
			"slug": "northwestern",
			"hx": 2.8135,
			"rank": 27,
			"pre_hx": 1.758,
			"pre_rank": 36
		},
		{
			"slug": "florida",
			"hx": 2.7815,
			"rank": 28,
			"pre_hx": 3.506,
			"pre_rank": 24
		},
		{
			"slug": "oklahoma-state",
			"hx": 2.7185,
			"rank": 29,
			"pre_hx": -1.255,
			"pre_rank": 90
		},
		{
			"slug": "oklahoma",
			"hx": 2.6977,
			"rank": 30,
			"pre_hx": 4.173,
			"pre_rank": 16
		},
		{
			"slug": "baylor",
			"hx": 2.6969,
			"rank": 31,
			"pre_hx": .96,
			"pre_rank": 52
		},
		{
			"slug": "nebraska",
			"hx": 2.6264,
			"rank": 32,
			"pre_hx": 1.989,
			"pre_rank": 34
		},
		{
			"slug": "duke",
			"hx": 2.4664,
			"rank": 33,
			"pre_hx": 1.494,
			"pre_rank": 43
		},
		{
			"slug": "smu",
			"hx": 2.4301,
			"rank": 34,
			"pre_hx": 4.035,
			"pre_rank": 19
		},
		{
			"slug": "penn-state",
			"hx": 2.3188,
			"rank": 35,
			"pre_hx": 4.393,
			"pre_rank": 13
		},
		{
			"slug": "wisconsin",
			"hx": 2.1968,
			"rank": 36,
			"pre_hx": 1.05,
			"pre_rank": 51
		},
		{
			"slug": "clemson",
			"hx": 2.0881,
			"rank": 37,
			"pre_hx": 3.895,
			"pre_rank": 21
		},
		{
			"slug": "liberty",
			"hx": 1.9828,
			"rank": 38,
			"pre_hx": -.638,
			"pre_rank": 75
		},
		{
			"slug": "auburn",
			"hx": 1.9148,
			"rank": 39,
			"pre_hx": 2.243,
			"pre_rank": 32
		},
		{
			"slug": "james-madison",
			"hx": 1.909,
			"rank": 40,
			"pre_hx": 1.574,
			"pre_rank": 41
		},
		{
			"slug": "north-carolina",
			"hx": 1.7551,
			"rank": 41,
			"pre_hx": -1.095,
			"pre_rank": 85
		},
		{
			"slug": "washington",
			"hx": 1.65,
			"rank": 42,
			"pre_hx": 3.352,
			"pre_rank": 25
		},
		{
			"slug": "tcu",
			"hx": 1.6096,
			"rank": 43,
			"pre_hx": 2.245,
			"pre_rank": 31
		},
		{
			"slug": "illinois",
			"hx": 1.5925,
			"rank": 44,
			"pre_hx": 1.677,
			"pre_rank": 38
		},
		{
			"slug": "texas-state",
			"hx": 1.4979,
			"rank": 45,
			"pre_hx": .734,
			"pre_rank": 58
		},
		{
			"slug": "mississippi-state",
			"hx": 1.4619,
			"rank": 46,
			"pre_hx": .118,
			"pre_rank": 69
		},
		{
			"slug": "michigan",
			"hx": 1.3811,
			"rank": 47,
			"pre_hx": 4.891,
			"pre_rank": 12
		},
		{
			"slug": "new-mexico",
			"hx": 1.3069,
			"rank": 48,
			"pre_hx": -2,
			"pre_rank": 98
		},
		{
			"slug": "florida-state",
			"hx": 1.2827,
			"rank": 49,
			"pre_hx": .33,
			"pre_rank": 63
		},
		{
			"slug": "pittsburgh",
			"hx": 1.2483,
			"rank": 50,
			"pre_hx": .896,
			"pre_rank": 53
		},
		{
			"slug": "memphis",
			"hx": .9926,
			"rank": 51,
			"pre_hx": 1.089,
			"pre_rank": 50
		},
		{
			"slug": "virginia-tech",
			"hx": .7977,
			"rank": 52,
			"pre_hx": 1.156,
			"pre_rank": 49
		},
		{
			"slug": "iowa-state",
			"hx": .7618,
			"rank": 53,
			"pre_hx": .836,
			"pre_rank": 54
		},
		{
			"slug": "arkansas",
			"hx": .5765,
			"rank": 54,
			"pre_hx": .613,
			"pre_rank": 60
		},
		{
			"slug": "fresno-state",
			"hx": .5431,
			"rank": 55,
			"pre_hx": .25,
			"pre_rank": 64
		},
		{
			"slug": "ucf",
			"hx": .4973,
			"rank": 56,
			"pre_hx": -.719,
			"pre_rank": 78
		},
		{
			"slug": "louisiana-tech",
			"hx": .3752,
			"rank": 57,
			"pre_hx": -2.101,
			"pre_rank": 101
		},
		{
			"slug": "north-texas",
			"hx": .3012,
			"rank": 58,
			"pre_hx": -2.224,
			"pre_rank": 102
		},
		{
			"slug": "minnesota",
			"hx": .2877,
			"rank": 59,
			"pre_hx": 1.928,
			"pre_rank": 35
		},
		{
			"slug": "cincinnati",
			"hx": .2737,
			"rank": 60,
			"pre_hx": -.985,
			"pre_rank": 83
		},
		{
			"slug": "western-michigan",
			"hx": .256,
			"rank": 61,
			"pre_hx": .468,
			"pre_rank": 61
		},
		{
			"slug": "oregon-state",
			"hx": .2352,
			"rank": 62,
			"pre_hx": -1.148,
			"pre_rank": 88
		},
		{
			"slug": "vanderbilt",
			"hx": .1959,
			"rank": 63,
			"pre_hx": 2.472,
			"pre_rank": 28
		},
		{
			"slug": "utsa",
			"hx": .1215,
			"rank": 64,
			"pre_hx": 1.362,
			"pre_rank": 46
		},
		{
			"slug": "virginia",
			"hx": .0988,
			"rank": 65,
			"pre_hx": 1.431,
			"pre_rank": 45
		},
		{
			"slug": "west-virginia",
			"hx": .0561,
			"rank": 66,
			"pre_hx": -1.21,
			"pre_rank": 89
		},
		{
			"slug": "michigan-state",
			"hx": .0459,
			"rank": 67,
			"pre_hx": -1.849,
			"pre_rank": 95
		},
		{
			"slug": "kansas",
			"hx": .0427,
			"rank": 68,
			"pre_hx": .75,
			"pre_rank": 57
		},
		{
			"slug": "purdue",
			"hx": .0417,
			"rank": 69,
			"pre_hx": -1.521,
			"pre_rank": 94
		},
		{
			"slug": "arizona-state",
			"hx": .0244,
			"rank": 70,
			"pre_hx": 1.569,
			"pre_rank": 42
		},
		{
			"slug": "utah-state",
			"hx": -.0351,
			"rank": 71,
			"pre_hx": -.683,
			"pre_rank": 77
		},
		{
			"slug": "kansas-state",
			"hx": -.1854,
			"rank": 72,
			"pre_hx": 2.356,
			"pre_rank": 30
		},
		{
			"slug": "toledo",
			"hx": -.2131,
			"rank": 73,
			"pre_hx": 1.494,
			"pre_rank": 44
		},
		{
			"slug": "georgia-southern",
			"hx": -.2584,
			"rank": 74,
			"pre_hx": -1.891,
			"pre_rank": 97
		},
		{
			"slug": "usf",
			"hx": -.3774,
			"rank": 75,
			"pre_hx": .187,
			"pre_rank": 68
		},
		{
			"slug": "syracuse",
			"hx": -.4146,
			"rank": 76,
			"pre_hx": -1.37,
			"pre_rank": 92
		},
		{
			"slug": "jacksonville-state",
			"hx": -.4921,
			"rank": 77,
			"pre_hx": -.911,
			"pre_rank": 81
		},
		{
			"slug": "louisiana",
			"hx": -.6489,
			"rank": 78,
			"pre_hx": -1.084,
			"pre_rank": 84
		},
		{
			"slug": "tulsa",
			"hx": -.7871,
			"rank": 79,
			"pre_hx": -3.174,
			"pre_rank": 111
		},
		{
			"slug": "nc-state",
			"hx": -.8148,
			"rank": 80,
			"pre_hx": 2.151,
			"pre_rank": 33
		},
		{
			"slug": "maryland",
			"hx": -1.0222,
			"rank": 81,
			"pre_hx": -.266,
			"pre_rank": 72
		},
		{
			"slug": "boston-college",
			"hx": -1.0293,
			"rank": 82,
			"pre_hx": -2.346,
			"pre_rank": 104
		},
		{
			"slug": "colorado",
			"hx": -1.063,
			"rank": 83,
			"pre_hx": -.432,
			"pre_rank": 73
		},
		{
			"slug": "unlv",
			"hx": -1.3979,
			"rank": 84,
			"pre_hx": 1.753,
			"pre_rank": 37
		},
		{
			"slug": "east-carolina",
			"hx": -1.4566,
			"rank": 85,
			"pre_hx": -.441,
			"pre_rank": 74
		},
		{
			"slug": "florida-atlantic",
			"hx": -1.5145,
			"rank": 86,
			"pre_hx": -3.103,
			"pre_rank": 110
		},
		{
			"slug": "stanford",
			"hx": -1.7048,
			"rank": 87,
			"pre_hx": -.759,
			"pre_rank": 79
		},
		{
			"slug": "buffalo",
			"hx": -1.7225,
			"rank": 88,
			"pre_hx": -3.35,
			"pre_rank": 113
		},
		{
			"slug": "san-diego-state",
			"hx": -1.7388,
			"rank": 89,
			"pre_hx": .828,
			"pre_rank": 55
		},
		{
			"slug": "army",
			"hx": -1.7483,
			"rank": 90,
			"pre_hx": -4.382,
			"pre_rank": 123
		},
		{
			"slug": "uconn",
			"hx": -1.9263,
			"rank": 91,
			"pre_hx": -1.867,
			"pre_rank": 96
		},
		{
			"slug": "georgia-state",
			"hx": -1.9281,
			"rank": 92,
			"pre_hx": -4.454,
			"pre_rank": 124
		},
		{
			"slug": "california",
			"hx": -1.9366,
			"rank": 93,
			"pre_hx": .615,
			"pre_rank": 59
		},
		{
			"slug": "ohio",
			"hx": -1.9402,
			"rank": 94,
			"pre_hx": .234,
			"pre_rank": 66
		},
		{
			"slug": "georgia-tech",
			"hx": -1.9515,
			"rank": 95,
			"pre_hx": 1.672,
			"pre_rank": 39
		},
		{
			"slug": "delaware",
			"hx": -1.9897,
			"rank": 96,
			"pre_hx": -2.638,
			"pre_rank": 105
		},
		{
			"slug": "air-force",
			"hx": -2.0733,
			"rank": 97,
			"pre_hx": -6.457,
			"pre_rank": 135
		},
		{
			"slug": "central-michigan",
			"hx": -2.103,
			"rank": 98,
			"pre_hx": -3.321,
			"pre_rank": 112
		},
		{
			"slug": "miami-oh",
			"hx": -2.1206,
			"rank": 99,
			"pre_hx": -.98,
			"pre_rank": 82
		},
		{
			"slug": "south-alabama",
			"hx": -2.1751,
			"rank": 100,
			"pre_hx": -2.815,
			"pre_rank": 108
		},
		{
			"slug": "wyoming",
			"hx": -2.2071,
			"rank": 101,
			"pre_hx": -3.759,
			"pre_rank": 118
		},
		{
			"slug": "washington-state",
			"hx": -2.2149,
			"rank": 102,
			"pre_hx": .782,
			"pre_rank": 56
		},
		{
			"slug": "fiu",
			"hx": -2.3525,
			"rank": 103,
			"pre_hx": -3.077,
			"pre_rank": 109
		},
		{
			"slug": "rutgers",
			"hx": -2.3712,
			"rank": 104,
			"pre_hx": -.041,
			"pre_rank": 70
		},
		{
			"slug": "marshall",
			"hx": -2.3772,
			"rank": 105,
			"pre_hx": .228,
			"pre_rank": 67
		},
		{
			"slug": "navy",
			"hx": -2.4375,
			"rank": 106,
			"pre_hx": -5.018,
			"pre_rank": 129
		},
		{
			"slug": "tulane",
			"hx": -2.4513,
			"rank": 107,
			"pre_hx": -1.144,
			"pre_rank": 87
		},
		{
			"slug": "troy",
			"hx": -2.5437,
			"rank": 108,
			"pre_hx": -1.108,
			"pre_rank": 86
		},
		{
			"slug": "uab",
			"hx": -2.5901,
			"rank": 109,
			"pre_hx": -2.099,
			"pre_rank": 100
		},
		{
			"slug": "coastal-carolina",
			"hx": -2.6387,
			"rank": 110,
			"pre_hx": -2.009,
			"pre_rank": 99
		},
		{
			"slug": "arkansas-state",
			"hx": -2.6744,
			"rank": 111,
			"pre_hx": -1.518,
			"pre_rank": 93
		},
		{
			"slug": "nevada",
			"hx": -2.7947,
			"rank": 112,
			"pre_hx": -5.408,
			"pre_rank": 130
		},
		{
			"slug": "app-state",
			"hx": -2.8065,
			"rank": 113,
			"pre_hx": -2.237,
			"pre_rank": 103
		},
		{
			"slug": "san-jose-state",
			"hx": -2.9547,
			"rank": 114,
			"pre_hx": -4.306,
			"pre_rank": 121
		},
		{
			"slug": "western-kentucky",
			"hx": -2.9568,
			"rank": 115,
			"pre_hx": .347,
			"pre_rank": 62
		},
		{
			"slug": "kennesaw-state",
			"hx": -3.0638,
			"rank": 116,
			"pre_hx": -3.933,
			"pre_rank": 119
		},
		{
			"slug": "hawaii",
			"hx": -3.1166,
			"rank": 117,
			"pre_hx": -.898,
			"pre_rank": 80
		},
		{
			"slug": "colorado-state",
			"hx": -3.1219,
			"rank": 118,
			"pre_hx": -3.359,
			"pre_rank": 114
		},
		{
			"slug": "temple",
			"hx": -3.4206,
			"rank": 119,
			"pre_hx": -3.367,
			"pre_rank": 115
		},
		{
			"slug": "middle-tennessee",
			"hx": -3.4299,
			"rank": 120,
			"pre_hx": -4.824,
			"pre_rank": 126
		},
		{
			"slug": "missouri-state",
			"hx": -3.43,
			"rank": 121,
			"pre_hx": -2.744,
			"pre_rank": 106
		},
		{
			"slug": "rice",
			"hx": -3.4873,
			"rank": 122,
			"pre_hx": -3.668,
			"pre_rank": 117
		},
		{
			"slug": "old-dominion",
			"hx": -3.5172,
			"rank": 123,
			"pre_hx": -1.31,
			"pre_rank": 91
		},
		{
			"slug": "bowling-green",
			"hx": -3.6793,
			"rank": 124,
			"pre_hx": -4.357,
			"pre_rank": 122
		},
		{
			"slug": "southern-miss",
			"hx": -3.9256,
			"rank": 125,
			"pre_hx": -.648,
			"pre_rank": 76
		},
		{
			"slug": "kent-state",
			"hx": -4.1247,
			"rank": 126,
			"pre_hx": -5.891,
			"pre_rank": 134
		},
		{
			"slug": "new-mexico-state",
			"hx": -4.2314,
			"rank": 127,
			"pre_hx": -4.776,
			"pre_rank": 125
		},
		{
			"slug": "eastern-michigan",
			"hx": -4.2527,
			"rank": 128,
			"pre_hx": -2.747,
			"pre_rank": 107
		},
		{
			"slug": "ball-state",
			"hx": -4.8259,
			"rank": 129,
			"pre_hx": -5.422,
			"pre_rank": 131
		},
		{
			"slug": "charlotte",
			"hx": -4.9491,
			"rank": 130,
			"pre_hx": -5.772,
			"pre_rank": 133
		},
		{
			"slug": "ul-monroe",
			"hx": -5.0546,
			"rank": 131,
			"pre_hx": -4.951,
			"pre_rank": 128
		},
		{
			"slug": "sam-houston",
			"hx": -5.1998,
			"rank": 132,
			"pre_hx": -4.285,
			"pre_rank": 120
		},
		{
			"slug": "massachusetts",
			"hx": -5.5866,
			"rank": 133,
			"pre_hx": -8.99,
			"pre_rank": 136
		},
		{
			"slug": "northern-illinois",
			"hx": -5.62,
			"rank": 134,
			"pre_hx": -4.854,
			"pre_rank": 127
		},
		{
			"slug": "akron",
			"hx": -6.0099,
			"rank": 135,
			"pre_hx": -3.541,
			"pre_rank": 116
		},
		{
			"slug": "utep",
			"hx": -6.0139,
			"rank": 136,
			"pre_hx": -5.512,
			"pre_rank": 132
		}
	],
	history: /* @__PURE__ */ JSON.parse("{\"weeks\":[1,2,3,4,5,6,7,8,9,10,11,12],\"note\":\"HX entering each week (refit on FINALs from earlier weeks; Week 1 = preseason).\",\"hx\":{\"air-force\":[-6.457,-6.457,-6.457,-6.457,-4.773,-4.619,-2.957,-2.117,-2.765,-2.375,-2.076,-2.073],\"akron\":[-3.541,-3.962,-3.955,-4.454,-5.013,-5.266,-5.301,-5.681,-5.763,-5.752,-5.76,-6.01],\"alabama\":[5.343,5.46,5.89,5.967,6.237,7.207,7.124,6.249,6.194,6.186,6.805,6.802],\"app-state\":[-2.237,-2.237,-1.164,-1.638,-1.954,-2.017,-2.923,-2.652,-2.008,-2.27,-2.804,-2.807],\"arizona\":[2.368,2.368,2.222,1.986,2.119,2.568,2.92,2.973,3.479,3.357,3.112,3.121],\"arizona-state\":[1.569,1.569,0.957,0.637,0.416,-0.67,-0.546,-0.746,-0.309,0.097,0.023,0.024],\"arkansas\":[0.613,0.613,-0.042,-0.288,0.924,0.21,0.135,0.666,0.572,0.245,0.577,0.577],\"arkansas-state\":[-1.518,-1.594,-1.988,-2.496,-2.854,-2.391,-2.767,-2.178,-2.306,-2.215,-2.666,-2.674],\"army\":[-4.382,-4.382,-3.854,-3.868,-2.932,-2.607,-2.651,-1.483,-1.244,-1.58,-1.751,-1.748],\"auburn\":[2.243,2.01,2.729,1.917,2.292,2.218,1.862,2.741,2.288,2.157,1.916,1.915],\"ball-state\":[-5.422,-3.668,-3.593,-4.405,-4.698,-4.614,-4.499,-4.25,-4.136,-4.184,-4.396,-4.826],\"baylor\":[0.96,1.193,1.432,1.312,1.41,2.463,2.425,2.01,1.718,2.619,2.695,2.697],\"boise-state\":[1.319,2.441,2.659,2.621,4.023,4.115,4.07,3.861,3.815,3.523,3.742,3.771],\"boston-college\":[-2.346,-3.075,-2.963,-2.855,-2.432,-2.271,-2.365,-1.578,-0.386,-0.967,-1.042,-1.029],\"bowling-green\":[-4.357,-4.357,-4.038,-4.214,-4.01,-3.483,-3.561,-3.79,-3.775,-3.726,-3.784,-3.679],\"buffalo\":[-3.35,-3.35,-3.977,-3.539,-3.715,-3.502,-2.034,-2.368,-2.429,-2.479,-2.262,-1.722],\"byu\":[4.064,4.064,4.21,4.071,4.228,4.161,4.224,4.584,3.916,3.467,3.515,3.52],\"california\":[0.615,-0.951,-0.51,-0.618,-0.907,-1.023,-0.468,-1.261,-1.522,-1.881,-1.933,-1.937],\"central-michigan\":[-3.321,-4.554,-4.554,-3.833,-2.85,-2.125,-2.404,-2.606,-2.712,-2.809,-2.094,-2.103],\"charlotte\":[-5.772,-5.772,-4.535,-3.775,-5.062,-5.491,-5.69,-4.738,-4.744,-4.697,-4.949,-4.949],\"cincinnati\":[-0.985,-0.256,-0.219,-0.536,0.212,-0.578,-0.717,-0.572,0.658,0.186,0.222,0.274],\"clemson\":[3.895,2.364,2.104,1.972,2.475,1.844,2.075,2.066,1.59,2.054,2.086,2.088],\"coastal-carolina\":[-2.009,-2.1,-2.1,-1.931,-2.962,-3.298,-2.723,-2.985,-2.663,-2.007,-2.633,-2.639],\"colorado\":[-0.432,0.455,0.213,-0.775,-0.783,-0.7,-0.667,-0.293,-1.081,-0.83,-1.062,-1.063],\"colorado-state\":[-3.359,-2.218,-2.218,-2.334,-1.838,-2.863,-2.718,-3.17,-2.804,-2.966,-3.128,-3.122],\"delaware\":[-2.638,-2.638,-1.794,-1.516,-2.359,-2.945,-3.073,-3.257,-2.512,-1.859,-1.982,-1.99],\"duke\":[1.494,1.6,2.065,2.726,2.544,2.293,1.905,1.627,1.543,1.916,2.466,2.466],\"east-carolina\":[-0.441,-0.558,-1.13,-0.975,-1.147,-1.12,-0.844,-1.755,-1.499,-1.613,-1.461,-1.457],\"eastern-michigan\":[-2.747,-3.604,-4.273,-4.694,-4.544,-3.416,-3.5,-3.894,-3.542,-3.648,-4.184,-4.253],\"fiu\":[-3.077,-2.763,-2.425,-2.581,-2.288,-2.436,-1.723,-1.746,-2.155,-2.427,-2.397,-2.353],\"florida\":[3.506,3.417,3.38,3.798,5.213,3.93,2.965,3.474,3.431,3.384,2.784,2.781],\"florida-atlantic\":[-3.103,-3.014,-3.125,-2.733,-1.344,-1.696,-1.564,-2.356,-2.479,-2.431,-1.522,-1.515],\"florida-state\":[0.33,0.388,0.364,0.823,0.503,1.924,1.08,1.479,1.649,0.987,1.282,1.283],\"fresno-state\":[0.25,-0.701,-0.74,-0.116,-0.086,0.914,0.825,0.469,0.321,0.849,0.536,0.543],\"georgia\":[7.888,7.888,6.744,7.122,7.633,7.127,7.477,6.481,6.453,6.528,7.263,7.261],\"georgia-southern\":[-1.891,-1.891,-1.664,-1.603,-1.654,-1.437,-0.928,-0.827,-1.004,-0.692,-0.252,-0.258],\"georgia-state\":[-4.454,-4.454,-3.013,-2.822,-1.999,-1.115,-1.212,-1.512,-1.958,-2.523,-1.925,-1.928],\"georgia-tech\":[1.672,0.785,0.059,-0.425,-0.893,-0.939,-0.431,-0.399,-1.404,-1.706,-1.958,-1.951],\"hawaii\":[-0.898,-2.211,-2.64,-2.772,-3.627,-3.686,-3.781,-3.837,-3.107,-3.161,-3.112,-3.117],\"houston\":[1.642,1.646,1.82,2.58,2.908,3.235,3.954,3.709,3.543,3.42,3.156,3.165],\"illinois\":[1.677,1.802,1.14,1.343,1.034,0.225,0.435,0.422,1.208,1.086,1.606,1.592],\"indiana\":[4.999,4.756,5.475,5.088,4.883,4.845,5.057,5.014,5.059,4.494,4.313,4.298],\"iowa\":[3.763,3.172,2.691,2.787,2.899,2.255,2.77,2.788,2.287,3.126,3.52,3.51],\"iowa-state\":[0.836,0.836,1.477,1.642,1.481,1.039,1.006,0.971,0.442,0.638,0.749,0.762],\"jacksonville-state\":[-0.911,-0.911,-0.82,-1.04,-1.062,-1.154,-1.153,-1.214,-1.34,-0.741,-0.436,-0.492],\"james-madison\":[1.574,1.311,1.311,2.29,2.836,3.099,2.708,2.951,2.322,1.656,1.914,1.909],\"kansas\":[0.75,0.75,0.146,-0.583,-0.747,-0.092,0.263,-0.165,0.029,0.261,0.04,0.043],\"kansas-state\":[2.356,2.356,3.439,2.929,2.003,1.682,0.937,1.214,0.788,0.629,-0.192,-0.185],\"kennesaw-state\":[-3.933,-3.933,-5.374,-4.523,-4.006,-3.728,-3.646,-3.459,-4.056,-3.25,-3.051,-3.064],\"kent-state\":[-5.891,-5.257,-5.257,-4.273,-3.815,-3.695,-3.741,-4.103,-3.915,-3.921,-4.003,-4.125],\"kentucky\":[0.248,0.248,-0.683,1.553,1.764,2.211,2.681,3.054,3.215,3.212,2.862,2.853],\"liberty\":[-0.638,-0.375,-0.375,0.425,0.995,1.297,1.547,1.476,1.835,2.159,2.026,1.983],\"louisiana\":[-1.084,-1.084,-0.971,-1.235,-0.478,-0.932,-1.016,0.05,-0.54,-0.283,-0.641,-0.649],\"louisiana-tech\":[-2.101,-2.101,-1.742,-2.04,-1.838,-1.886,-1.915,-1.062,-0.6,-0.143,0.383,0.375],\"louisville\":[2.979,3.352,3.043,3.757,2.286,1.984,2.685,2.912,3.055,3.257,3.503,3.502],\"lsu\":[4.022,5.553,5.227,4.785,5.494,5.372,5.145,5.832,6.207,6.344,5.643,5.64],\"marshall\":[0.228,-0.294,-1.372,-0.963,-1.127,-1.656,-2.509,-2.514,-2.294,-1.982,-2.374,-2.377],\"maryland\":[-0.266,-0.266,1.23,1.081,-0.303,-0.693,-0.555,-1.243,-1.186,-1.366,-1.016,-1.022],\"massachusetts\":[-8.99,-5.317,-5.355,-5.105,-5.096,-6.653,-6.175,-5.603,-5.53,-5.603,-5.653,-5.587],\"memphis\":[1.089,2.296,1.113,0.968,1.292,1.669,1.709,1.145,0.892,1.162,0.993,0.993],\"miami\":[5.226,5.945,5.906,5.595,5.291,6.299,6.523,6.019,6.146,5.848,5.861,5.864],\"miami-oh\":[-0.98,-2.074,-2.217,-1.847,-1.63,-2.524,-2.867,-2.671,-2.341,-2.421,-2.58,-2.121],\"michigan\":[4.891,3.6,3.788,3.258,2.524,2.066,2.11,1.905,1.904,1.824,1.357,1.381],\"michigan-state\":[-1.849,-0.511,0.168,0.343,0.025,-0.261,-0.591,-0.423,-0.208,-0.442,0.056,0.046],\"middle-tennessee\":[-4.824,-4.824,-3.54,-2.907,-3.161,-3.854,-3.746,-3.739,-3.096,-3.595,-3.426,-3.43],\"minnesota\":[1.928,1.928,-0.53,0.246,0.804,1.049,0.039,-0.164,0.099,0.615,0.315,0.288],\"mississippi-state\":[0.118,0.414,2.354,3.132,3.209,2.735,2.827,2.074,1.896,1.719,1.468,1.462],\"missouri\":[4.319,4.319,4.923,3.769,3.335,4.55,4.978,4,3.877,4.479,3.843,3.841],\"missouri-state\":[-2.744,-2.071,-1.918,-2.939,-2.512,-2.611,-3.604,-3.499,-3.996,-3.496,-3.431,-3.43],\"navy\":[-5.018,-5.018,-4.87,-4.74,-3.989,-4.363,-3.447,-2.742,-2.95,-2.673,-2.441,-2.437],\"nc-state\":[2.151,0.513,0.513,0.288,0.25,0.334,-0.7,-0.626,-0.613,-0.231,-0.811,-0.815],\"nebraska\":[1.989,3.113,2.851,2.721,3.477,3.762,3.669,3.708,3.61,2.933,2.673,2.626],\"nevada\":[-5.408,-2.406,-2.12,-2.58,-3.517,-3.875,-2.73,-2.606,-2.193,-2.309,-2.792,-2.795],\"new-mexico\":[-2,-0.767,-0.767,-0.073,0.554,0.981,0.919,0.692,0.915,0.567,1.311,1.307],\"new-mexico-state\":[-4.776,-4.322,-4.41,-4.328,-5.104,-3.676,-4.038,-3.978,-3.578,-4.387,-4.224,-4.231],\"north-carolina\":[-1.095,0.153,0.153,0.379,0.37,0.587,1.143,1.586,0.961,1.362,1.742,1.755],\"north-texas\":[-2.224,-1.981,0.174,-0.464,-0.39,-0.42,-0.342,-0.143,-0.001,-0.18,0.3,0.301],\"northern-illinois\":[-4.854,-4.263,-4.423,-4.202,-4.66,-4.522,-5.286,-5.502,-6.336,-5.811,-5.615,-5.62],\"northwestern\":[1.758,1.758,1.758,2.998,3.251,4.124,3.672,3.453,3.477,3.317,2.856,2.813],\"notre-dame\":[7.086,7.413,6.447,6.029,6.311,6.415,6.313,5.951,5.938,5.57,5.767,5.771],\"ohio\":[0.234,-0.89,-1.038,-1.384,-1.335,-1.319,-0.878,-0.937,-1.282,-1.371,-1.43,-1.94],\"ohio-state\":[7.846,6.092,6.318,5.305,5.486,5.779,5.778,5.818,5.918,5.398,4.966,4.909],\"oklahoma\":[4.173,3.315,3.127,2.738,2.338,2.265,2.868,2.141,2.59,2.029,2.699,2.698],\"oklahoma-state\":[-1.255,-2.5,-0.29,-0.273,0.951,0.943,1.168,1.67,2.12,1.893,2.715,2.719],\"old-dominion\":[-1.31,-1.31,-1.99,-2.072,-2.883,-3.656,-3.154,-3.416,-3.755,-4.175,-3.515,-3.517],\"ole-miss\":[5.492,5.119,4.191,4.895,3.706,3.35,4.014,5.044,4.962,5.442,4.684,4.682],\"oregon\":[6.97,5.848,4.005,4,5.295,5.314,4.902,4.764,3.987,3.977,4.674,4.661],\"oregon-state\":[-1.148,-1.152,-0.631,-0.631,0.083,1.17,1.758,1.716,1.547,1.02,0.23,0.235],\"penn-state\":[4.393,4.915,4.246,4.181,3.185,2.832,2.249,2.119,2.148,2.279,2.271,2.319],\"pittsburgh\":[0.896,1.99,1.561,1.611,1.788,1.957,1.389,0.97,1.098,1.202,1.196,1.248],\"purdue\":[-1.521,-1.521,-1.548,-1.204,-1.129,-0.193,0.974,0.352,0.455,0.431,0.045,0.042],\"rice\":[-3.668,-3.668,-2.38,-2.356,-2.712,-2.24,-2.537,-3.553,-3.346,-3.355,-3.519,-3.487],\"rutgers\":[-0.041,-3.714,-3.826,-3.078,-3.05,-3.371,-3.244,-2.257,-2.224,-2.251,-2.374,-2.371],\"sam-houston\":[-4.285,-3.473,-3.641,-3.374,-3.251,-3.106,-3.376,-3.921,-4.506,-4.98,-5.189,-5.2],\"san-diego-state\":[0.828,0.828,0.313,-0.562,-1.245,-0.954,-1.674,-1.318,-1.704,-1.706,-1.745,-1.739],\"san-jose-state\":[-4.306,-2.27,-2.466,-3.355,-3.378,-2.668,-3.118,-2.892,-3.083,-2.915,-2.947,-2.955],\"smu\":[4.035,3.523,3.515,3.188,2.092,1.824,1.618,1.898,2.407,1.961,2.428,2.43],\"south-alabama\":[-2.815,-2.815,-2.414,-1.854,-2.345,-2.191,-1.689,-1.514,-1.777,-2.2,-2.12,-2.175],\"south-carolina\":[2.896,2.262,2.262,1.89,1.616,1.577,2.76,2.602,2.83,3.39,3.572,3.557],\"southern-miss\":[-0.648,-0.648,-1.606,-3.871,-3.333,-3.458,-3.803,-4.093,-3.873,-3.378,-3.928,-3.926],\"stanford\":[-0.759,-1.052,-1.169,-1.729,-1.62,-1.975,-1.567,-1.666,-1.582,-1.718,-1.703,-1.705],\"syracuse\":[-1.37,-1.37,-1.787,-1.73,-1.758,-1.523,-1.156,-1.292,-0.774,-0.497,-0.427,-0.415],\"tcu\":[2.245,0.997,0.997,1.531,0.993,1.126,1.099,2.076,1.323,1.301,1.606,1.61],\"temple\":[-3.367,-3.367,-2.904,-2.104,-2.806,-2.028,-2.993,-3.426,-3.326,-3.328,-3.437,-3.421],\"tennessee\":[4.073,4.073,5.041,4.092,4.116,4.157,3.991,4.858,4.419,4.517,5.084,5.08],\"texas\":[6.382,6.533,6.181,6.267,6.273,6.179,5.461,4.945,5.16,5.447,5.678,5.672],\"texas-am\":[6.201,5.528,5.986,3.993,3.271,3.574,3.07,3.135,3.25,3.395,3.193,3.19],\"texas-state\":[0.734,0.583,0.13,0.615,0.61,0.298,0.029,0.388,0.384,0.869,1.493,1.498],\"texas-tech\":[5.917,5.917,5.222,4.462,4.378,4.982,5.16,5.144,4.074,4.051,3.529,3.536],\"toledo\":[1.494,0.156,0.382,-0.381,0.367,0.583,-0.847,-0.391,-0.171,-0.237,-0.254,-0.213],\"troy\":[-1.108,-1.92,-1.976,-0.975,-1.259,-0.996,-0.736,-1.771,-2.76,-1.926,-2.54,-2.544],\"tulane\":[-1.144,-1.25,-1.362,-0.716,-1.43,-1.521,-1.812,-0.928,-1.605,-1.545,-2.448,-2.451],\"tulsa\":[-3.174,-1.929,-1.043,-0.971,-1.574,-1.718,-2.178,-1.311,-1.548,-1.69,-0.79,-0.787],\"uab\":[-2.099,-2.224,-2.703,-2.555,-2.874,-3.199,-3.132,-2.531,-2.429,-2.647,-2.589,-2.59],\"ucf\":[-0.719,-0.719,-0.146,-0.037,0.659,0.951,0.548,0.622,1.117,0.204,0.49,0.497],\"ucla\":[1.268,2.834,3.325,2.835,3.568,3.688,4.279,4.036,3.936,3.768,3.993,3.987],\"uconn\":[-1.867,-1.867,-3.363,-1.419,-1.616,-2.076,-1.484,-1.677,-1.471,-1.715,-1.983,-1.926],\"ul-monroe\":[-4.951,-5.247,-4.342,-4.111,-5.292,-5.601,-5.469,-6.033,-5.206,-5.528,-5.047,-5.055],\"unlv\":[1.753,1.51,-0.33,-0.513,0.066,0.123,0.2,-0.54,-0.586,-1.029,-1.371,-1.398],\"usc\":[3.876,3.648,3.533,2.9,2.606,2.616,2.784,3.027,2.445,3.056,2.991,2.988],\"usf\":[0.187,-0.127,-0.366,-0.408,-0.156,-0.756,-0.754,-0.429,-0.326,-0.132,-0.383,-0.377],\"utah\":[4.245,4.245,4.9,5.187,5.767,5.528,5.178,4.683,4.563,4.991,4.979,4.988],\"utah-state\":[-0.683,-0.683,0.46,0.043,0.194,0.151,-0.376,-0.551,-0.608,-0.19,-0.041,-0.035],\"utep\":[-5.512,-4.654,-4.716,-4.383,-5.32,-5.219,-5.551,-5.977,-5.886,-6.069,-6.015,-6.014],\"utsa\":[1.362,1.362,1.866,1.737,1.634,1.047,0.793,0.22,0.911,1.037,0.116,0.121],\"vanderbilt\":[2.472,2.472,1.628,1.425,1.249,1.232,0.258,-0.115,-0.156,-0.031,0.199,0.196],\"virginia\":[1.431,3.069,3.069,1.509,1.727,0.649,0.031,0.045,0.281,0.001,0.1,0.099],\"virginia-tech\":[1.156,1.156,1.836,2.605,1.827,1.385,1.037,0.936,1.254,1.113,0.791,0.798],\"wake-forest\":[-0.261,0.16,0.18,0.234,0.797,1.493,2.475,2.852,2.866,3.183,3.117,3.091],\"washington\":[3.352,3.475,2.347,2.202,1.402,1.476,0.631,1.17,1.05,1.894,1.653,1.65],\"washington-state\":[0.782,0.659,-0.439,-0.603,-1.242,-1.964,-1.821,-1.842,-2.028,-2.013,-2.222,-2.215],\"west-virginia\":[-1.21,-1.119,-1.119,0.423,-0.831,-0.745,-1.188,-1.086,-0.302,-0.332,0.048,0.056],\"western-kentucky\":[0.347,-2.655,-1.797,-1.686,-1.813,-3.063,-2.271,-1.948,-1.979,-2.703,-2.952,-2.957],\"western-michigan\":[0.468,1.759,1.821,1.48,0.211,-0.039,0.493,0.258,0.101,-0.061,-0.025,0.256],\"wisconsin\":[1.05,0.723,0.401,0.586,1.679,2.544,2.361,2.21,2.775,2.105,2.201,2.197],\"wyoming\":[-3.759,-4.9,-4.9,-5.427,-4.011,-4.083,-3.608,-3.37,-2.916,-2.82,-2.202,-2.207]}}"),
	grades: [
		{
			"week": 1,
			"n": 49,
			"su": 40,
			"mae": 14.823,
			"brier": .142,
			"live": false
		},
		{
			"week": 2,
			"n": 47,
			"su": 39,
			"mae": 11.032,
			"brier": .138,
			"live": false
		},
		{
			"week": 3,
			"n": 56,
			"su": 45,
			"mae": 10.355,
			"brier": .127,
			"live": false
		},
		{
			"week": 4,
			"n": 57,
			"su": 45,
			"mae": 12.157,
			"brier": .177,
			"live": false
		},
		{
			"week": 5,
			"n": 55,
			"su": 40,
			"mae": 13.266,
			"brier": .169,
			"live": false
		},
		{
			"week": 6,
			"n": 56,
			"su": 35,
			"mae": 12.217,
			"brier": .222,
			"live": false
		},
		{
			"week": 7,
			"n": 57,
			"su": 36,
			"mae": 11.7,
			"brier": .227,
			"live": false
		},
		{
			"week": 8,
			"n": 54,
			"su": 33,
			"mae": 11.283,
			"brier": .25,
			"live": false
		},
		{
			"week": 9,
			"n": 54,
			"su": 40,
			"mae": 12.847,
			"brier": .17,
			"live": false
		},
		{
			"week": 10,
			"n": 61,
			"su": 37,
			"mae": 13.313,
			"brier": .223,
			"live": false
		},
		{
			"week": 11,
			"n": 5,
			"su": 4,
			"mae": 9.648,
			"brier": .127,
			"live": false
		}
	]
};
var WEIGHTS = [
	{
		key: "Recruiting talent",
		w: MODEL.weights.talent,
		note: "CFBD team talent composite (247 recruiting strength of the current roster). Real signal — ablation +0.052."
	},
	{
		key: "Prior-year rating",
		w: MODEL.weights.prior,
		note: "Blend of last season’s SP+, Elo, and SRS, each z-scored first. Real signal — ablation +0.037."
	},
	{
		key: "Recent win-trend",
		w: MODEL.weights.trend,
		note: "Weighted win% over the previous four seasons (0.4 / 0.3 / 0.2 / 0.1). Inside the noise band; kept at modest weight."
	},
	{
		key: "Roster retention",
		w: MODEL.weights.retention,
		note: "CFBD returning production (percent PPA + usage). Inside noise. Not the two-deep talent composite."
	},
	{
		key: "Portal net",
		w: MODEL.weights.portal,
		note: "Incoming transfer ratings minus outgoing, this offseason. Inside noise. Roster talent already counts who is actually on the two-deep."
	}
];
function ModelPage() {
	const wsum = Object.values(MODEL.weights).reduce((a, b) => a + b, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `HX ${MODEL.version}`,
			title: "How the rating is built",
			lede: "HX starts from a preseason composite and is refit every week from stamped FINALs, so teams that are better or worse than expected move as the season goes. A replacement-level Group of Five team sits near 0. Head-to-head uses Elo built from HX."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InSeasonPanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Preseason prior · weights"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Each feature is z-scored across FBS, then weighted. Georgia opened 2026 at +7.89. Walk-forward Top 25 balanced ≈ 0.646. Only talent and prior rating beat season-to-season noise. QB continuity, coach tenure, and SOS were tested and zeroed — they made the score worse. A separate Connelly-residual term moved ten new-HC ratings on this board. Tenure stays zeroed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: WEIGHTS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.key
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-muted",
								children: row.w.toFixed(1)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-1 overflow-hidden rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent",
								style: { width: `${row.w / wsum * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-muted",
							children: row.note
						})
					] }, row.key))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Matchup engine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						"Each team starts at ",
						MODEL.eloBase,
						" + ",
						MODEL.eloScale,
						" × HX. Home-field is ",
						MODEL.homeFieldElo,
						" Elo points, dropped on a neutral floor. Win probability is the standard Elo logistic; spread is a quadratic on that same gap. Calibrated on 2019–2025 FBS games at 70.8% straight-up."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-accent",
					children: `Elo     = ${MODEL.eloBase} + ${MODEL.eloScale} × HX
P(home) = 1 / (1 + 10^(−(EloΔ + HFA) / ${MODEL.eloDenom}))
d       = EloΔ + HFA
spread  = 0.050835 × d
        + 4.5795×10⁻⁵ × d × |d|`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "The old linear map compressed blowouts; this curve was fit on 2019–2023 FBS actual MOV (holdout 2024–2025), not on this week’s Vegas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Run any pair on the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matchup",
							className: "text-fg underline decoration-border underline-offset-4",
							children: "matchup board"
						}),
						"."
					]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "2026 notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The board is the full 136-team FBS set from the HASHMARK database — recruiting, portal, returning production, SP+/Elo/SRS, and 2026 rosters. Two-deeps are the listed TWO·DEEP charts for all 136 programs (thetwodeep.com, refreshed 2026-09-07)." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Offensive-line mass is on the talent Size board as a measurable. It is not a term in HX. The talent composite is the depth-weighted 247 of the two-deep, transfers included." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ten 2026 coach changes carry a Connelly residual in the preseason prior (κ = −0.25, 15% OC bump). The in-season refit starts from that prior." })
				]
			})]
		})
	] });
}
var pct = (g) => g.n ? `${(100 * g.su / g.n).toFixed(1)}%` : "—";
var fmt = (x, d = 2) => x == null ? "—" : x.toFixed(d);
function InSeasonPanel() {
	const t = hx_2026_8_backtest_2026_default.totals_w2_11;
	const live = hx_refit_2026_default.grades.filter((g) => g.live);
	const m = hx_refit_2026_default.meta;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "In season · weekly refit"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Every Sunday, after the week’s FINALs are stamped, HX is refit from the preseason prior and every FBS–FBS result so far. Each margin is turned into an Elo gap with the same spread curve the board uses (capped at ±",
						m.margin_cap,
						" points so blowouts don’t run the table), adjusted for opponent and home field. The preseason prior counts as ",
						m.lambda,
						" games, so its weight fades as a team plays: roughly half after two games, roughly a fifth after eight."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"One rating, same scale: Elo = ",
						MODEL.eloBase,
						" + ",
						MODEL.eloScale,
						" × HX. Only the HX values move. FCS opponents are unrated and stay out of the fit. Current board: ",
						m.n_finals,
						" FINALs through Week ",
						m.through_week,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Why: through Week 10 the board leaned on preseason expectations. Preseason spread gaps were worth ",
						hx_2026_8_backtest_2026_default.calibration_slope.preseason_w1_5,
						" of a point per point in Weeks 1–5 and",
						" ",
						hx_2026_8_backtest_2026_default.calibration_slope.preseason_w6_11,
						" in Weeks 6–11. Refit week by week using only earlier results, the same games come in at ",
						hx_2026_8_backtest_2026_default.calibration_slope.hx_2026_8_w2_11,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Soft-cal FLAG stays. On Vegas-lined games in Weeks 2–11 the close still beats both boards (MAE ",
						fmt(hx_2026_8_backtest_2026_default.vegas_lined_w2_11.mae_vegas),
						" vs ",
						fmt(hx_2026_8_backtest_2026_default.vegas_lined_w2_11.mae_hx_2026_8_walkforward),
						" refit and ",
						fmt(hx_2026_8_backtest_2026_default.vegas_lined_w2_11.mae_shipped),
						" as shipped, n = ",
						hx_2026_8_backtest_2026_default.vegas_lined_w2_11.n,
						")."
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm tabular",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
						className: "mb-2 text-left text-xs text-muted",
						children: "Accountability · stamped FBS–FBS FINALs. “As shipped” is the board that was live each week; “Refit” uses only results from earlier weeks."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "Week"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "Games"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "SU as shipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "SU refit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "MAE as shipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 font-normal",
								children: "MAE refit"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						hx_2026_8_backtest_2026_default.weeks.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.week
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.shipped.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.shipped.su
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.week === 1 ? "—" : w.hx_2026_8_walkforward.su
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: fmt(w.shipped.mae)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1",
									children: w.week === 1 ? "—" : fmt(w.hx_2026_8_walkforward.mae)
								})
							]
						}, w.week)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border font-medium text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: "2–11"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: t.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-1 pr-2",
									children: [
										t.shipped.su,
										" · ",
										pct(t.shipped)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-1 pr-2",
									children: [
										t.hx_2026_8_walkforward.su,
										" · ",
										pct(t.hx_2026_8_walkforward)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: fmt(t.shipped.mae)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1",
									children: fmt(t.hx_2026_8_walkforward.mae)
								})
							]
						}),
						live.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-1 pr-2",
									children: [g.week, " · live"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: g.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: g.su
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1",
									children: fmt(g.mae)
								})
							]
						}, `live-${g.week}`))
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Week 1 is the preseason board for both. Weeks 2–11 total includes the ",
					t.n - hx_2026_8_backtest_2026_default.weeks.filter((w) => w.week >= 2).reduce((a, w) => a + w.shipped.n, 0),
					" Week 11 FINALs stamped before the switch (Nov 12). Refit was closer to the final margin in",
					" ",
					hx_2026_8_backtest_2026_default.paired_w2_11.games_better,
					" of ",
					hx_2026_8_backtest_2026_default.paired_w2_11.n,
					" games. From Week 12 the refit rows are the live board."
				]
			})] })]
		})]
	});
}
//#endregion
export { ModelPage as component };
