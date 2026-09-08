import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as cn } from "./router-DgNS_QMM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-logo-B4vdH6FI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Local team logo registry. Assets live in `public/logos/{slug}.png`.
*
* Full FBS (136 teams). Expand by adding ESPN ids here and running
* `node scripts/fetch-team-logos.mjs`.
*
* Source: ESPN CDN (`a.espncdn.com/i/teamlogos/ncaa/500/{id}.png`) — fetched once
* into the repo so runtime does not depend on ESPN.
*/
/** ESPN numeric team ids — add rows as logos are fetched. */
var TEAM_LOGO_ESPN_IDS = {
	"alabama": 333,
	"arkansas": 8,
	"auburn": 2,
	"florida": 57,
	"georgia": 61,
	"kentucky": 96,
	"lsu": 99,
	"mississippi-state": 344,
	"missouri": 142,
	"oklahoma": 201,
	"ole-miss": 145,
	"south-carolina": 2579,
	"tennessee": 2633,
	"texas": 251,
	"texas-am": 245,
	"vanderbilt": 238,
	"illinois": 356,
	"indiana": 84,
	"iowa": 2294,
	"maryland": 120,
	"michigan": 130,
	"michigan-state": 127,
	"minnesota": 135,
	"nebraska": 158,
	"northwestern": 77,
	"ohio-state": 194,
	"oregon": 2483,
	"penn-state": 213,
	"purdue": 2509,
	"rutgers": 164,
	"ucla": 26,
	"usc": 30,
	"washington": 264,
	"wisconsin": 275,
	"boston-college": 103,
	"california": 25,
	"clemson": 228,
	"duke": 150,
	"florida-state": 52,
	"georgia-tech": 59,
	"louisville": 97,
	"miami": 2390,
	"nc-state": 152,
	"north-carolina": 153,
	"pittsburgh": 221,
	"smu": 2567,
	"stanford": 24,
	"syracuse": 183,
	"virginia": 258,
	"virginia-tech": 259,
	"wake-forest": 154,
	"arizona": 12,
	"arizona-state": 9,
	"baylor": 239,
	"byu": 252,
	"cincinnati": 2132,
	"colorado": 38,
	"houston": 248,
	"iowa-state": 66,
	"kansas": 2305,
	"kansas-state": 2306,
	"oklahoma-state": 197,
	"tcu": 2628,
	"texas-tech": 2641,
	"ucf": 2116,
	"utah": 254,
	"west-virginia": 277,
	"army": 349,
	"charlotte": 2429,
	"east-carolina": 151,
	"florida-atlantic": 2226,
	"memphis": 235,
	"navy": 2426,
	"north-texas": 249,
	"rice": 242,
	"temple": 218,
	"tulane": 2655,
	"tulsa": 202,
	"uab": 5,
	"usf": 58,
	"utsa": 2636,
	"air-force": 2005,
	"boise-state": 68,
	"colorado-state": 36,
	"fresno-state": 278,
	"hawaii": 62,
	"nevada": 2440,
	"new-mexico": 167,
	"san-diego-state": 21,
	"san-jose-state": 23,
	"unlv": 2439,
	"utah-state": 328,
	"wyoming": 2751,
	"app-state": 2026,
	"arkansas-state": 2032,
	"coastal-carolina": 324,
	"georgia-southern": 290,
	"georgia-state": 2247,
	"james-madison": 256,
	"louisiana": 309,
	"marshall": 276,
	"old-dominion": 295,
	"south-alabama": 6,
	"southern-miss": 2572,
	"texas-state": 326,
	"troy": 2653,
	"ul-monroe": 2433,
	"akron": 2006,
	"ball-state": 2050,
	"bowling-green": 189,
	"buffalo": 2084,
	"central-michigan": 2117,
	"eastern-michigan": 2199,
	"kent-state": 2309,
	"massachusetts": 113,
	"miami-oh": 193,
	"northern-illinois": 2459,
	"ohio": 195,
	"toledo": 2649,
	"western-michigan": 2711,
	"delaware": 48,
	"fiu": 2229,
	"jacksonville-state": 55,
	"kennesaw-state": 338,
	"liberty": 2335,
	"louisiana-tech": 2348,
	"middle-tennessee": 2393,
	"missouri-state": 2623,
	"new-mexico-state": 166,
	"sam-houston": 2534,
	"utep": 2638,
	"western-kentucky": 98,
	"oregon-state": 204,
	"washington-state": 265,
	"notre-dame": 87,
	"uconn": 41
};
/** Slugs with a committed asset under `public/logos/`. */
var TEAM_LOGO_SLUGS = new Set(Object.keys(TEAM_LOGO_ESPN_IDS));
function hasTeamLogo(slug) {
	return TEAM_LOGO_SLUGS.has(slug);
}
function teamLogoSrc(slug) {
	return hasTeamLogo(slug) ? `/logos/${slug}.png` : null;
}
var DEFAULT_SIZE = 18;
function TeamLogo({ slug, size = DEFAULT_SIZE, className }) {
	const src = teamLogoSrc(slug);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	if (!src || hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		width: size,
		height: size,
		loading: "lazy",
		decoding: "async",
		className: cn("inline-block shrink-0 object-contain", className),
		style: {
			width: size,
			height: size
		},
		onError: () => setHidden(true)
	});
}
//#endregion
export { TeamLogo as n, hasTeamLogo as r, TEAM_LOGO_ESPN_IDS as t };
