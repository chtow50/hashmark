#!/usr/bin/env node
/**
 * Generates migrations/0003_seed.sql from the 2026 preseason HASHMARK board.
 * Run: node scripts/generate-cfb-seed.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function sqlStr(v) {
  if (v == null) return "NULL";
  return `'${String(v).replaceAll("'", "''")}'`;
}

function round(n, d = 2) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

const FIRST = [
  "Marcus", "Jalen", "Caleb", "Darius", "Isaiah", "Malachi", "Cameron", "Andre",
  "Noah", "Elijah", "Jordan", "Ty", "Bryson", "Kaden", "Miles", "Devin",
  "Xavier", "Roman", "Silas", "Nico", "Jaylen", "Terrell", "Amari", "Keon",
  "Bryce", "Cole", "Owen", "Hunter", "Grant", "Reid", "Luca", "Ezra",
  "Malik", "Jasper", "Theo", "Ashton", "Brady", "Cooper", "Declan", "Finn",
  "Hassan", "Iverson", "Jamal", "Kendrick", "Leon", "Micah", "Nasir", "Omari",
];

const LAST = [
  "Walker", "Harris", "Brooks", "Patel", "Nguyen", "Reed", "Foster", "Price",
  "Jenkins", "Bennett", "Coleman", "Hayes", "Griffin", "Murray", "Pearson",
  "Sanders", "Bishop", "Fleming", "Horton", "McLean", "Barrett", "Lawson",
  "Nash", "Pruitt", "Rowe", "Steele", "Tucker", "Vaughn", "Whitaker", "Yates",
  "Armstrong", "Calhoun", "Dalton", "Ellison", "Farrell", "Goodwin", "Hendrix",
  "Ingram", "Jeffries", "Keaton", "Langford", "Monroe", "Nolan", "Odom",
];

const POS_META = {
  QB: { h: 75, w: 218, unit: "OFF" },
  RB: { h: 71, w: 212, unit: "OFF" },
  WR: { h: 73, w: 198, unit: "OFF" },
  TE: { h: 76, w: 248, unit: "OFF" },
  LT: { h: 78, w: 318, unit: "OFF" },
  LG: { h: 76, w: 315, unit: "OFF" },
  C: { h: 75, w: 305, unit: "OFF" },
  RG: { h: 76, w: 315, unit: "OFF" },
  RT: { h: 77, w: 318, unit: "OFF" },
  DE: { h: 76, w: 268, unit: "DEF" },
  DT: { h: 75, w: 308, unit: "DEF" },
  LB: { h: 74, w: 236, unit: "DEF" },
  CB: { h: 72, w: 188, unit: "DEF" },
  S: { h: 73, w: 204, unit: "DEF" },
};

const ROSTER = [
  "QB", "RB", "WR", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT",
  "DE", "DT", "DT", "DE", "LB", "LB", "LB", "CB", "CB", "S", "S",
];

const QB_NAMES = {
  "ohio-state": "Julian Sayin",
  texas: "Arch Manning",
  georgia: "Gunner Stockton",
  oregon: "Dante Moore",
  "notre-dame": "CJ Carr",
  lsu: "Sam Leavitt",
  indiana: "Fernando Mendoza",
};

const TWODEEP_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "twodeep-rosters.json");
const TWODEEP = JSON.parse(readFileSync(TWODEEP_PATH, "utf8")).teams ?? {};
const REC_HISTORY = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "data", "recruiting-history.json"), "utf8"),
).classes ?? {};

const OL_POS = new Set(["LT", "LG", "C", "RG", "RT", "OT", "OG", "QT", "QG", "SG", "ST"]);
const SKILL_POS = new Set(["RB", "RB-A", "RB-B", "FB", "SB", "SB-A", "SB-Z", "WR", "WR-X", "WR-Z", "WR-F", "WR-Y", "SLOT", "TE", "TE-Y", "TE-H", "TE-F"]);
const DL_POS = new Set(["DE", "LDE", "RDE", "JACK", "EDGE", "DT", "NT", "LDT", "RDT", "LEO", "RUSH", "STUD", "JOKER", "STING", "SPEAR"]);
const LB_POS = new Set(["MLB", "WLB", "ILB", "OLB", "LB", "MAC", "MONEY", "SLB", "LILB", "RILB", "LOLB", "ROLB", "CASH", "BUCK", "WOLF", "DOG"]);
const DB_POS = new Set(["CB", "LCB", "RCB", "FCB", "BCB", "NB", "FS", "SS", "S", "BS", "ROVER", "SPUR", "BANDIT", "HUSKY", "CAT", "CHEETAH"]);

const PIPELINE = {
  TX: ["texas", "texas-am", "texas-tech", "baylor", "tcu", "houston", "oklahoma", "lsu"],
  FL: ["miami", "florida", "florida-state", "georgia", "alabama", "usf", "clemson"],
  GA: ["georgia", "auburn", "alabama", "clemson", "florida-state", "georgia-tech", "south-carolina"],
  CA: ["usc", "ucla", "oregon", "washington", "stanford", "california", "colorado"],
  OH: ["ohio-state", "michigan", "cincinnati", "penn-state", "notre-dame"],
  PA: ["penn-state", "pittsburgh", "notre-dame", "ohio-state", "west-virginia"],
  LA: ["lsu", "tulane", "alabama", "ole-miss", "texas-am"],
  AL: ["alabama", "auburn", "ole-miss", "lsu", "georgia"],
  NJ: ["penn-state", "rutgers", "ohio-state", "michigan", "notre-dame"],
  VA: ["virginia", "virginia-tech", "clemson", "north-carolina", "penn-state"],
  NC: ["north-carolina", "nc-state", "clemson", "duke", "wake-forest"],
  SC: ["clemson", "south-carolina", "georgia", "north-carolina"],
  MI: ["michigan", "michigan-state", "ohio-state", "notre-dame"],
  IL: ["illinois", "notre-dame", "iowa", "wisconsin", "ohio-state"],
  MD: ["maryland", "penn-state", "ohio-state", "virginia"],
  NY: ["syracuse", "penn-state", "notre-dame", "boston-college"],
  TN: ["tennessee", "vanderbilt", "georgia", "alabama", "ole-miss"],
  MS: ["ole-miss", "mississippi-state", "lsu", "alabama"],
  AR: ["arkansas", "ole-miss", "lsu", "texas-am"],
  OK: ["oklahoma", "oklahoma-state", "texas", "tcu"],
  AZ: ["arizona", "arizona-state", "usc", "oregon"],
  CO: ["colorado", "utah", "colorado-state", "oregon"],
  UT: ["utah", "byu", "colorado", "oregon"],
  OR: ["oregon", "washington", "usc", "stanford"],
  WA: ["washington", "oregon", "washington-state", "usc"],
  MO: ["missouri", "kansas", "kansas-state", "arkansas"],
  KY: ["kentucky", "louisville", "tennessee", "cincinnati"],
  IN: ["indiana", "notre-dame", "purdue", "ohio-state"],
  WI: ["wisconsin", "iowa", "minnesota", "illinois"],
  IA: ["iowa", "iowa-state", "nebraska", "wisconsin"],
  MN: ["minnesota", "iowa", "wisconsin", "nebraska"],
  NE: ["nebraska", "iowa", "iowa-state", "kansas-state"],
  KS: ["kansas", "kansas-state", "oklahoma", "missouri"],
  NV: ["unlv", "fresno-state", "oregon", "usc"],
  ID: ["boise-state", "oregon", "washington", "utah"],
};

const STATE_META = {
  AL: ["Alabama", "South"], AK: ["Alaska", "West"], AZ: ["Arizona", "West"],
  AR: ["Arkansas", "South"], CA: ["California", "West"], CO: ["Colorado", "West"],
  CT: ["Connecticut", "Northeast"], DE: ["Delaware", "Northeast"], DC: ["District of Columbia", "Northeast"],
  FL: ["Florida", "South"], GA: ["Georgia", "South"], HI: ["Hawaii", "West"],
  ID: ["Idaho", "West"], IL: ["Illinois", "Midwest"], IN: ["Indiana", "Midwest"],
  IA: ["Iowa", "Midwest"], KS: ["Kansas", "Midwest"], KY: ["Kentucky", "South"],
  LA: ["Louisiana", "South"], ME: ["Maine", "Northeast"], MD: ["Maryland", "Northeast"],
  MA: ["Massachusetts", "Northeast"], MI: ["Michigan", "Midwest"], MN: ["Minnesota", "Midwest"],
  MS: ["Mississippi", "South"], MO: ["Missouri", "Midwest"], MT: ["Montana", "West"],
  NE: ["Nebraska", "Midwest"], NV: ["Nevada", "West"], NH: ["New Hampshire", "Northeast"],
  NJ: ["New Jersey", "Northeast"], NM: ["New Mexico", "West"], NY: ["New York", "Northeast"],
  NC: ["North Carolina", "South"], ND: ["North Dakota", "Midwest"], OH: ["Ohio", "Midwest"],
  OK: ["Oklahoma", "South"], OR: ["Oregon", "West"], PA: ["Pennsylvania", "Northeast"],
  RI: ["Rhode Island", "Northeast"], SC: ["South Carolina", "South"], SD: ["South Dakota", "Midwest"],
  TN: ["Tennessee", "South"], TX: ["Texas", "South"], UT: ["Utah", "West"],
  VT: ["Vermont", "Northeast"], VA: ["Virginia", "South"], WA: ["Washington", "West"],
  WV: ["West Virginia", "South"], WI: ["Wisconsin", "Midwest"], WY: ["Wyoming", "West"],
};

/** @typedef {[string,string,string,string,string,string,string,string,string,number,number,string,number|null,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} TeamRow */

/**
 * slug, name, short, mascot, conf, city, st, c1, c2,
 * lastW, lastL, finish, ap,
 * recRank, commits, recAvg, recPts, s5, s4, s3,
 * hxRank, hxRating, off, def, special, sos, projW, returning, playoff, prior, talent
 */
const TEAMS = [
  ["ohio-state", "Ohio State", "Ohio St", "Buckeyes", "Big Ten", "Columbus", "OH", "#ba0c2f", "#a7b1b7", 12, 2, "CFP Quarterfinal", 1, 4, 29, 91.9, 301.23, 3, 15, 11, 1, 34.82, 32.4, 31.8, 18.2, 8.4, 11.6, 74, 38.4, 31.2, 98.6],
  ["georgia", "Georgia", "Georgia", "Bulldogs", "SEC", "Athens", "GA", "#ba0c2f", "#000000", 11, 3, "CFP Quarterfinal", 3, 7, 32, 91.01, 292.14, 1, 22, 9, 2, 33.41, 30.1, 33.6, 17.4, 9.1, 11.2, 81, 32.1, 30.4, 97.2],
  ["oregon", "Oregon", "Oregon", "Ducks", "Big Ten", "Eugene", "OR", "#154733", "#fee123", 13, 2, "CFP Semifinal", 2, 3, 24, 92.86, 303.22, 4, 14, 6, 3, 32.96, 33.8, 29.4, 16.8, 7.2, 11.1, 69, 29.8, 29.8, 96.4],
  ["texas", "Texas", "Texas", "Longhorns", "SEC", "Austin", "TX", "#bf5700", "#ffffff", 10, 3, "Citrus Bowl", 5, 6, 26, 91.27, 298.38, 4, 13, 9, 4, 31.88, 31.6, 30.2, 15.9, 8.8, 10.8, 71, 24.6, 28.4, 95.8],
  ["notre-dame", "Notre Dame", "Notre Dame", "Fighting Irish", "Independent", "South Bend", "IN", "#0c2340", "#c99700", 10, 2, "Bowl opt-out", 4, 5, 30, 91.91, 299.28, 4, 20, 6, 5, 31.12, 29.8, 31.1, 17.1, 6.4, 10.6, 72, 22.4, 27.6, 94.1],
  ["miami", "Miami", "Miami", "Hurricanes", "ACC", "Coral Gables", "FL", "#f47321", "#005030", 12, 2, "CFP First Round", 7, 9, 31, 91.03, 284.61, 1, 21, 9, 6, 30.04, 31.2, 27.6, 16.4, 6.1, 10.4, 68, 18.9, 26.2, 93.4],
  ["texas-am", "Texas A&M", "Texas A&M", "Aggies", "SEC", "College Station", "TX", "#500000", "#ffffff", 11, 2, "CFP First Round", 8, 10, 27, 91.94, 283.13, 1, 21, 4, 7, 29.71, 28.4, 29.8, 15.2, 8.6, 10.3, 70, 16.4, 25.8, 92.6],
  ["alabama", "Alabama", "Alabama", "Crimson Tide", "SEC", "Tuscaloosa", "AL", "#9e1b32", "#ffffff", 9, 4, "ReliaQuest Bowl", 13, 2, 28, 91.94, 303.79, 4, 11, 12, 8, 29.18, 27.2, 30.4, 16.1, 8.9, 10.1, 77, 14.8, 24.1, 96.8],
  ["indiana", "Indiana", "Indiana", "Hoosiers", "Big Ten", "Bloomington", "IN", "#990000", "#eeebeb", 14, 1, "National Champion", 6, 31, 22, 87.4, 218.4, 0, 6, 16, 9, 28.66, 29.4, 26.8, 14.6, 7.8, 10.0, 52, 14.2, 22.8, 81.2],
  ["ole-miss", "Ole Miss", "Ole Miss", "Rebels", "SEC", "Oxford", "MS", "#ce1126", "#14213d", 11, 3, "CFP First Round", 9, 22, 22, 88.8, 236.72, 0, 8, 14, 10, 28.21, 32.6, 24.1, 13.8, 8.4, 9.9, 64, 11.6, 23.4, 86.4],
  ["oklahoma", "Oklahoma", "Oklahoma", "Sooners", "SEC", "Norman", "OK", "#841617", "#fdf9d8", 10, 3, "Armed Forces Bowl", 10, 16, 25, 89.43, 252.55, 0, 11, 14, 11, 27.84, 28.9, 26.4, 15.5, 9.0, 9.7, 67, 10.4, 22.1, 88.1],
  ["lsu", "LSU", "LSU", "Tigers", "SEC", "Baton Rouge", "LA", "#461d7c", "#fdd023", 10, 4, "Texas Bowl", 11, 11, 19, 91.67, 272.69, 2, 10, 7, 12, 27.41, 27.6, 27.8, 14.9, 8.7, 9.6, 66, 9.8, 21.6, 91.2],
  ["usc", "USC", "USC", "Trojans", "Big Ten", "Los Angeles", "CA", "#990000", "#ffc72c", 9, 4, "Holiday Bowl", 15, 1, 42, 91.97, 310.67, 3, 19, 13, 13, 26.92, 30.8, 23.4, 14.2, 6.8, 9.4, 73, 8.6, 20.4, 94.8],
  ["texas-tech", "Texas Tech", "Texas Tech", "Red Raiders", "Big 12", "Lubbock", "TX", "#cc0000", "#000000", 11, 2, "CFP First Round", 12, 18, 22, 89.34, 250.26, 1, 8, 13, 14, 26.44, 31.4, 22.8, 13.1, 5.9, 9.3, 62, 7.9, 21.2, 84.6],
  ["michigan", "Michigan", "Michigan", "Wolverines", "Big Ten", "Ann Arbor", "MI", "#00274c", "#ffcb05", 8, 5, "ReliaQuest Bowl", 16, 12, 24, 90.35, 270.12, 2, 11, 11, 15, 26.08, 24.6, 28.9, 16.8, 8.2, 9.1, 71, 7.2, 19.8, 90.4],
  ["tennessee", "Tennessee", "Tennessee", "Volunteers", "SEC", "Knoxville", "TN", "#ff8200", "#ffffff", 9, 4, "Citrus Bowl", 20, 8, 32, 90.42, 290.74, 2, 14, 16, 16, 25.71, 30.2, 22.1, 13.6, 8.1, 9.0, 69, 6.4, 20.1, 89.6],
  ["penn-state", "Penn State", "Penn St", "Nittany Lions", "Big Ten", "University Park", "PA", "#041e42", "#ffffff", 9, 4, "Pinstripe Bowl", 18, 28, 23, 88.1, 224.8, 0, 8, 15, 17, 25.18, 25.4, 26.6, 15.4, 7.9, 8.8, 63, 5.8, 18.6, 87.2],
  ["washington", "Washington", "Washington", "Huskies", "Big Ten", "Seattle", "WA", "#4b2e83", "#b7a57a", 10, 3, "Alamo Bowl", 17, 13, 26, 89.56, 262.32, 1, 10, 15, 18, 24.86, 28.1, 23.6, 14.1, 6.6, 8.7, 66, 5.4, 18.2, 88.8],
  ["clemson", "Clemson", "Clemson", "Tigers", "ACC", "Clemson", "SC", "#f56600", "#522d80", 9, 4, "Gator Bowl", 26, 20, 23, 89.0, 243.28, 0, 10, 12, 19, 24.41, 24.8, 25.9, 16.2, 6.9, 8.6, 65, 4.9, 17.4, 86.1],
  ["florida", "Florida", "Florida", "Gators", "SEC", "Gainesville", "FL", "#0021a5", "#fa4616", 8, 5, "Gasparilla Bowl", 27, 15, 20, 90.65, 253.02, 0, 13, 7, 20, 23.96, 26.4, 23.1, 13.4, 8.5, 8.4, 72, 4.2, 16.8, 88.4],
  ["smu", "SMU", "SMU", "Mustangs", "ACC", "Dallas", "TX", "#0033a0", "#c8102e", 11, 2, "Fenway Bowl", 19, 33, 24, 87.2, 214.6, 0, 5, 18, 21, 23.52, 29.6, 20.4, 12.8, 5.4, 8.3, 58, 3.8, 17.9, 79.4],
  ["byu", "BYU", "BYU", "Cougars", "Big 12", "Provo", "UT", "#002e5d", "#ffffff", 11, 2, "Pop-Tarts Bowl", 14, 21, 23, 88.62, 238.06, 0, 7, 15, 22, 23.14, 26.8, 22.6, 14.8, 5.1, 8.2, 61, 3.6, 19.1, 78.6],
  ["utah", "Utah", "Utah", "Utes", "Big 12", "Salt Lake City", "UT", "#cc0000", "#808080", 10, 3, "Las Vegas Bowl", 21, 29, 21, 87.8, 221.4, 0, 6, 15, 23, 22.71, 23.4, 25.8, 15.9, 6.2, 8.1, 64, 3.1, 16.4, 82.1],
  ["iowa", "Iowa", "Iowa", "Hawkeyes", "Big Ten", "Iowa City", "IA", "#000000", "#ffcd00", 10, 3, "Music City Bowl", 22, 41, 20, 86.4, 198.2, 0, 3, 17, 24, 22.28, 18.6, 29.4, 17.6, 7.4, 8.0, 68, 2.8, 16.1, 74.8],
  ["louisville", "Louisville", "Louisville", "Cardinals", "ACC", "Louisville", "KY", "#ad0000", "#000000", 10, 3, "Fenway Bowl", 24, 36, 22, 87.1, 208.4, 0, 5, 16, 25, 21.94, 27.2, 20.1, 13.2, 5.8, 7.9, 59, 2.6, 15.6, 77.2],
  ["missouri", "Missouri", "Missouri", "Tigers", "SEC", "Columbia", "MO", "#f1b82d", "#000000", 9, 4, "Rate Bowl", 25, 32, 23, 87.6, 216.1, 0, 5, 18, 26, 21.58, 24.8, 21.6, 13.8, 8.0, 7.8, 62, 2.3, 15.2, 80.4],
  ["south-carolina", "South Carolina", "S Carolina", "Gamecocks", "SEC", "Columbia", "SC", "#73000a", "#000000", 8, 5, "Birmingham Bowl", 28, 14, 19, 90.27, 256.43, 0, 10, 9, 27, 21.14, 22.4, 23.2, 13.1, 8.3, 7.6, 66, 2.0, 14.4, 85.2],
  ["houston", "Houston", "Houston", "Cougars", "Big 12", "Houston", "TX", "#c8102e", "#76232f", 10, 3, "Texas Bowl", 23, 38, 25, 86.8, 204.6, 0, 4, 20, 28, 20.82, 26.1, 19.8, 12.4, 5.6, 7.5, 57, 1.8, 16.8, 76.1],
  ["michigan-state", "Michigan State", "Michigan St", "Spartans", "Big Ten", "East Lansing", "MI", "#18453b", "#ffffff", 7, 6, "Did not bowl", 42, 34, 24, 87.0, 212.8, 0, 5, 18, 29, 20.41, 21.6, 22.4, 13.6, 7.6, 7.3, 61, 1.5, 13.8, 79.8],
  ["auburn", "Auburn", "Auburn", "Tigers", "SEC", "Auburn", "AL", "#0c2340", "#e87722", 7, 6, "Did not bowl", 35, 26, 22, 88.4, 228.6, 0, 8, 14, 30, 20.08, 23.1, 20.8, 12.9, 8.7, 7.2, 64, 1.3, 13.2, 84.1],
  ["florida-state", "Florida State", "Florida St", "Seminoles", "ACC", "Tallahassee", "FL", "#782f40", "#ceb888", 6, 7, "Did not bowl", 48, 17, 34, 88.68, 251.54, 0, 12, 22, 31, 19.66, 24.8, 18.4, 12.2, 6.4, 7.0, 70, 1.1, 12.4, 86.8],
  ["north-carolina", "North Carolina", "UNC", "Tar Heels", "ACC", "Chapel Hill", "NC", "#7bafd4", "#13294b", 7, 6, "Did not bowl", 44, 19, 40, 88.23, 247.62, 0, 12, 28, 32, 19.28, 25.6, 17.2, 11.8, 5.9, 6.9, 63, 1.0, 12.1, 82.6],
  ["boise-state", "Boise State", "Boise St", "Broncos", "Mountain West", "Boise", "ID", "#0033a0", "#d64309", 12, 2, "Fiesta Bowl", 29, 52, 21, 85.4, 176.2, 0, 2, 18, 33, 18.94, 26.4, 18.8, 14.1, 4.2, 9.4, 54, 2.4, 18.6, 71.4],
  ["illinois", "Illinois", "Illinois", "Fighting Illini", "Big Ten", "Champaign", "IL", "#e84a27", "#13294b", 8, 5, "ReliaQuest Bowl", 34, 24, 38, 87.58, 230.19, 0, 5, 31, 34, 18.61, 24.2, 18.1, 12.6, 7.1, 6.8, 60, 0.9, 13.6, 78.2],
  ["tcu", "TCU", "TCU", "Horned Frogs", "Big 12", "Fort Worth", "TX", "#4d1979", "#a3a9d3", 9, 4, "Alamo Bowl", 31, 39, 23, 86.6, 201.4, 0, 4, 18, 35, 18.28, 25.8, 17.4, 12.1, 5.7, 6.7, 56, 0.8, 14.2, 75.4],
  ["arizona", "Arizona", "Arizona", "Wildcats", "Big 12", "Tucson", "AZ", "#cc0033", "#003366", 9, 4, "Holiday Bowl", 30, 43, 22, 86.2, 194.8, 0, 3, 18, 36, 17.96, 24.6, 18.2, 12.8, 5.4, 6.6, 58, 0.7, 13.9, 74.1],
  ["georgia-tech", "Georgia Tech", "Georgia Tech", "Yellow Jackets", "ACC", "Atlanta", "GA", "#b3a369", "#003057", 8, 5, "Gasparilla Bowl", 37, 45, 21, 86.0, 191.2, 0, 3, 17, 37, 17.64, 23.4, 18.8, 13.1, 6.2, 6.5, 57, 0.7, 12.8, 73.6],
  ["iowa-state", "Iowa State", "Iowa St", "Cyclones", "Big 12", "Ames", "IA", "#c8102e", "#f1be48", 9, 4, "Pop-Tarts Bowl", 38, 47, 22, 85.8, 188.4, 0, 3, 18, 38, 17.32, 21.8, 20.1, 13.6, 6.0, 6.4, 59, 0.6, 12.6, 72.8],
  ["kansas-state", "Kansas State", "Kansas St", "Wildcats", "Big 12", "Manhattan", "KS", "#512888", "#d1d1d1", 8, 5, "Liberty Bowl", 40, 48, 21, 85.6, 186.1, 0, 3, 17, 39, 17.04, 22.6, 19.2, 13.4, 5.8, 6.3, 58, 0.6, 12.2, 72.2],
  ["vanderbilt", "Vanderbilt", "Vanderbilt", "Commodores", "SEC", "Nashville", "TN", "#866d4b", "#000000", 8, 5, "Birmingham Bowl", 36, 50, 20, 85.2, 182.4, 0, 2, 17, 40, 16.76, 23.8, 17.1, 12.4, 8.2, 6.2, 55, 0.5, 13.1, 71.6],
  ["pittsburgh", "Pittsburgh", "Pitt", "Panthers", "ACC", "Pittsburgh", "PA", "#003594", "#ffb81c", 8, 5, "Military Bowl", 39, 42, 24, 86.1, 196.4, 0, 4, 19, 41, 16.48, 20.4, 20.6, 14.2, 5.6, 6.1, 60, 0.5, 11.8, 74.6],
  ["oklahoma-state", "Oklahoma State", "Oklahoma St", "Cowboys", "Big 12", "Stillwater", "OK", "#ff7300", "#000000", 7, 6, "Did not bowl", 41, 46, 22, 85.9, 187.2, 0, 3, 18, 42, 16.21, 24.1, 16.2, 11.8, 5.9, 6.0, 54, 0.4, 11.4, 73.1],
  ["wisconsin", "Wisconsin", "Wisconsin", "Badgers", "Big Ten", "Madison", "WI", "#c5050c", "#ffffff", 7, 6, "Did not bowl", 46, 44, 21, 86.3, 193.6, 0, 3, 17, 43, 15.94, 18.2, 22.8, 15.1, 7.3, 5.9, 62, 0.4, 11.1, 75.8],
  ["minnesota", "Minnesota", "Minnesota", "Golden Gophers", "Big Ten", "Minneapolis", "MN", "#7a0019", "#ffcc33", 8, 5, "Duke's Mayo Bowl", 43, 51, 22, 85.1, 179.8, 0, 2, 19, 44, 15.68, 20.8, 18.6, 13.8, 7.0, 5.8, 58, 0.4, 11.6, 70.4],
  ["virginia-tech", "Virginia Tech", "Virginia Tech", "Hokies", "ACC", "Blacksburg", "VA", "#861f41", "#e5751f", 7, 6, "Did not bowl", 45, 40, 23, 86.4, 199.2, 0, 4, 18, 45, 15.42, 19.6, 19.4, 13.6, 5.7, 5.7, 59, 0.3, 10.8, 73.8],
  ["navy", "Navy", "Navy", "Midshipmen", "American", "Annapolis", "MD", "#00205b", "#c5b783", 10, 3, "Armed Forces Bowl", 32, 78, 18, 82.1, 128.4, 0, 0, 16, 46, 15.16, 22.4, 16.8, 18.4, 4.1, 8.2, 71, 0.9, 14.6, 62.4],
  ["unlv", "UNLV", "UNLV", "Rebels", "Mountain West", "Las Vegas", "NV", "#b10234", "#666666", 10, 3, "LA Bowl", 33, 61, 20, 84.2, 158.6, 0, 1, 17, 47, 14.88, 25.2, 14.6, 12.1, 4.0, 7.8, 52, 0.8, 13.4, 66.8],
  ["james-madison", "James Madison", "JMU", "Dukes", "Sun Belt", "Harrisonburg", "VA", "#450084", "#cbbeaa", 11, 2, "Cure Bowl", 47, 66, 19, 83.8, 148.2, 0, 1, 16, 48, 14.62, 23.8, 15.4, 12.6, 3.8, 7.6, 53, 0.6, 12.8, 64.2],
  ["arkansas", "Arkansas", "Arkansas", "Razorbacks", "SEC", "Fayetteville", "AR", "#9d2235", "#ffffff", 6, 7, "Did not bowl", 52, 35, 24, 87.3, 210.4, 0, 5, 18, 49, 14.36, 22.1, 15.2, 11.4, 8.1, 5.6, 58, 0.3, 10.2, 77.6],
  ["nebraska", "Nebraska", "Nebraska", "Cornhuskers", "Big Ten", "Lincoln", "NE", "#e41c38", "#ffffff", 6, 7, "Did not bowl", 54, 37, 23, 86.9, 206.2, 0, 4, 18, 50, 14.12, 20.4, 16.8, 12.8, 7.2, 5.5, 61, 0.3, 9.8, 76.4],
  ["colorado", "Colorado", "Colorado", "Buffaloes", "Big 12", "Boulder", "CO", "#cfb87c", "#000000", 6, 7, "Did not bowl", 56, 30, 22, 87.9, 219.6, 0, 6, 15, 51, 13.88, 24.6, 13.2, 11.1, 5.2, 5.4, 56, 0.2, 9.4, 80.8],
  ["west-virginia", "West Virginia", "W Virginia", "Mountaineers", "Big 12", "Morgantown", "WV", "#002855", "#eaaa00", 7, 6, "Did not bowl", 50, 25, 50, 86.96, 229.51, 0, 5, 44, 52, 13.64, 21.8, 14.8, 12.2, 5.5, 5.3, 55, 0.2, 10.6, 72.4],
  ["baylor", "Baylor", "Baylor", "Bears", "Big 12", "Waco", "TX", "#154734", "#ffb81c", 7, 6, "Did not bowl", 51, 49, 22, 85.4, 184.6, 0, 3, 18, 53, 13.41, 22.4, 14.1, 11.6, 5.6, 5.2, 54, 0.2, 10.1, 71.2],
  ["duke", "Duke", "Duke", "Blue Devils", "ACC", "Durham", "NC", "#003087", "#ffffff", 8, 5, "Birmingham Bowl", 49, 54, 21, 85.0, 174.8, 0, 2, 18, 54, 13.18, 21.2, 15.6, 12.4, 5.4, 5.1, 56, 0.2, 10.4, 69.8],
  ["california", "California", "Cal", "Golden Bears", "ACC", "Berkeley", "CA", "#003262", "#fdb515", 7, 6, "Did not bowl", 53, 53, 23, 85.2, 177.4, 0, 2, 19, 55, 12.96, 20.8, 15.1, 11.8, 5.8, 5.0, 57, 0.2, 9.6, 70.6],
  ["nc-state", "NC State", "NC State", "Wolfpack", "ACC", "Raleigh", "NC", "#cc0000", "#000000", 7, 6, "Did not bowl", 55, 55, 22, 84.9, 172.6, 0, 2, 18, 56, 12.74, 20.1, 15.8, 12.1, 5.5, 4.9, 55, 0.2, 9.2, 69.1],
  ["tulane", "Tulane", "Tulane", "Green Wave", "American", "New Orleans", "LA", "#006747", "#43b3ae", 10, 3, "Military Bowl", 57, 62, 20, 84.0, 156.2, 0, 1, 17, 57, 12.52, 22.6, 13.8, 12.8, 4.2, 6.8, 53, 0.4, 11.2, 65.4],
  ["memphis", "Memphis", "Memphis", "Tigers", "American", "Memphis", "TN", "#003087", "#8d734a", 10, 3, "Liberty Bowl", 58, 63, 21, 83.9, 154.8, 0, 1, 18, 58, 12.31, 23.4, 12.9, 11.6, 4.0, 6.6, 52, 0.3, 10.8, 64.8],
  ["ucla", "UCLA", "UCLA", "Bruins", "Big Ten", "Los Angeles", "CA", "#2d68c4", "#f2a900", 5, 8, "Did not bowl", 62, 27, 21, 88.6, 226.4, 0, 7, 14, 59, 12.1, 19.4, 14.6, 11.2, 6.9, 4.8, 64, 0.2, 8.4, 83.2],
  ["stanford", "Stanford", "Stanford", "Cardinal", "ACC", "Stanford", "CA", "#8c1515", "#ffffff", 5, 8, "Did not bowl", 64, 56, 20, 85.6, 170.2, 0, 3, 16, 60, 11.88, 16.8, 16.4, 12.6, 5.9, 4.7, 58, 0.1, 7.8, 72.6],
  ["arizona-state", "Arizona State", "Arizona St", "Sun Devils", "Big 12", "Tempe", "AZ", "#8c1d40", "#ffc627", 6, 7, "Did not bowl", 60, 57, 22, 84.8, 169.4, 0, 2, 18, 61, 11.66, 20.6, 13.4, 11.4, 5.3, 4.6, 54, 0.1, 8.8, 68.4],
  ["kentucky", "Kentucky", "Kentucky", "Wildcats", "SEC", "Lexington", "KY", "#0033a0", "#ffffff", 5, 8, "Did not bowl", 66, 58, 21, 85.1, 175.6, 0, 3, 17, 62, 11.44, 18.2, 15.1, 11.8, 8.0, 4.5, 57, 0.1, 8.1, 71.8],
  ["mississippi-state", "Mississippi State", "Miss St", "Bulldogs", "SEC", "Starkville", "MS", "#5d1725", "#c1c6c8", 5, 8, "Did not bowl", 68, 23, 34, 87.1, 230.56, 0, 4, 30, 63, 11.22, 19.8, 13.2, 10.8, 8.2, 4.4, 61, 0.1, 7.6, 76.8],
  ["wake-forest", "Wake Forest", "Wake Forest", "Demon Deacons", "ACC", "Winston-Salem", "NC", "#9e7e38", "#000000", 6, 7, "Did not bowl", 61, 64, 20, 83.6, 150.4, 0, 1, 17, 64, 11.02, 19.4, 13.8, 11.6, 5.2, 4.4, 54, 0.1, 7.9, 63.6],
  ["syracuse", "Syracuse", "Syracuse", "Orange", "ACC", "Syracuse", "NY", "#f76900", "#000000", 6, 7, "Did not bowl", 63, 59, 22, 84.6, 166.8, 0, 2, 18, 65, 10.82, 20.1, 12.8, 11.2, 5.1, 4.3, 53, 0.1, 7.4, 67.2],
  ["virginia", "Virginia", "Virginia", "Cavaliers", "ACC", "Charlottesville", "VA", "#232d4b", "#f84c1e", 7, 6, "Did not bowl", 59, 60, 21, 84.4, 164.2, 0, 2, 17, 66, 10.62, 18.6, 14.2, 12.1, 5.4, 4.3, 55, 0.1, 8.2, 66.4],
  ["army", "Army", "Army", "Black Knights", "American", "West Point", "NY", "#000000", "#d4bf91", 10, 3, "Armed Forces Bowl", 65, 82, 16, 81.4, 118.6, 0, 0, 14, 67, 10.42, 18.8, 15.6, 17.2, 3.9, 7.4, 78, 0.3, 10.6, 58.2],
  ["liberty", "Liberty", "Liberty", "Flames", "CUSA", "Lynchburg", "VA", "#0a254e", "#a6192e", 9, 4, "Cure Bowl", 67, 70, 22, 83.2, 142.8, 0, 1, 19, 68, 10.22, 22.1, 11.8, 11.4, 3.6, 6.2, 51, 0.2, 8.6, 61.8],
  ["usf", "South Florida", "USF", "Bulls", "American", "Tampa", "FL", "#006747", "#cfc493", 8, 5, "Birmingham Bowl", 69, 67, 23, 83.5, 146.4, 0, 1, 20, 69, 10.02, 21.6, 11.4, 10.8, 4.1, 5.8, 52, 0.2, 7.8, 63.1],
  ["utsa", "UTSA", "UTSA", "Roadrunners", "American", "San Antonio", "TX", "#0c2340", "#f47321", 8, 5, "Frisco Bowl", 70, 68, 24, 83.4, 144.8, 0, 1, 21, 70, 9.84, 20.8, 11.8, 11.1, 4.4, 5.6, 53, 0.2, 7.6, 62.6],
  ["fresno-state", "Fresno State", "Fresno St", "Bulldogs", "Mountain West", "Fresno", "CA", "#db0032", "#002e6d", 9, 4, "LA Bowl", 71, 71, 21, 83.0, 140.2, 0, 1, 18, 71, 9.66, 20.4, 12.1, 11.6, 3.8, 5.9, 54, 0.2, 7.9, 60.4],
  ["app-state", "App State", "App State", "Mountaineers", "Sun Belt", "Boone", "NC", "#ffcc00", "#222222", 8, 5, "Cure Bowl", 72, 74, 20, 82.6, 134.6, 0, 0, 18, 72, 9.48, 19.6, 12.4, 12.2, 3.7, 5.4, 55, 0.1, 7.2, 59.1],
  ["toledo", "Toledo", "Toledo", "Rockets", "MAC", "Toledo", "OH", "#002b5c", "#ffd200", 10, 3, "Boca Raton Bowl", 73, 76, 19, 82.2, 130.8, 0, 0, 17, 73, 9.3, 21.2, 11.6, 11.8, 3.5, 6.1, 52, 0.2, 7.4, 57.8],
  ["washington-state", "Washington State", "Wash St", "Cougars", "Pac-12", "Pullman", "WA", "#981e32", "#5e6a71", 7, 6, "Did not bowl", 74, 65, 22, 83.8, 149.6, 0, 1, 19, 74, 9.12, 19.8, 11.2, 10.6, 4.8, 4.2, 54, 0.1, 6.8, 64.1],
  ["east-carolina", "East Carolina", "ECU", "Pirates", "American", "Greenville", "NC", "#592a8a", "#fdc82f", 7, 6, "Did not bowl", 75, 73, 21, 82.8, 136.4, 0, 0, 19, 75, 8.94, 19.2, 11.4, 11.2, 4.0, 4.8, 53, 0.1, 6.6, 58.6],
  ["north-texas", "North Texas", "North Texas", "Mean Green", "American", "Denton", "TX", "#00853e", "#ffffff", 8, 5, "New Mexico Bowl", 76, 69, 26, 83.1, 141.6, 0, 1, 22, 76, 8.76, 22.4, 9.8, 10.4, 4.3, 5.2, 51, 0.1, 6.9, 60.8],
  ["texas-state", "Texas State", "Texas St", "Bobcats", "Sun Belt", "San Marcos", "TX", "#501214", "#8d734a", 8, 5, "First Responder Bowl", 77, 72, 24, 82.9, 138.2, 0, 0, 22, 77, 8.58, 21.6, 9.6, 10.2, 4.2, 5.0, 50, 0.1, 6.4, 59.4],
  ["maryland", "Maryland", "Maryland", "Terrapins", "Big Ten", "College Park", "MD", "#e03a3e", "#ffd520", 5, 8, "Did not bowl", 78, 77, 20, 83.4, 145.2, 0, 1, 17, 78, 8.4, 18.4, 11.8, 10.8, 6.4, 4.1, 56, 0.1, 6.1, 67.8],
  ["rutgers", "Rutgers", "Rutgers", "Scarlet Knights", "Big Ten", "Piscataway", "NJ", "#cc0033", "#5f6a72", 5, 8, "Did not bowl", 79, 75, 21, 83.0, 139.4, 0, 1, 18, 79, 8.22, 17.8, 12.1, 10.6, 6.2, 4.0, 55, 0.1, 5.8, 65.2],
  ["purdue", "Purdue", "Purdue", "Boilermakers", "Big Ten", "West Lafayette", "IN", "#000000", "#cfb991", 4, 8, "Did not bowl", 82, 80, 22, 82.4, 132.6, 0, 0, 20, 80, 8.04, 16.4, 12.6, 10.4, 6.8, 3.9, 57, 0.1, 5.4, 63.8],
  ["northwestern", "Northwestern", "Northwestern", "Wildcats", "Big Ten", "Evanston", "IL", "#4e2a84", "#ffffff", 5, 7, "Did not bowl", 80, 81, 18, 82.6, 133.8, 0, 0, 16, 81, 7.88, 15.8, 13.4, 11.6, 6.6, 3.8, 59, 0.1, 5.6, 61.4],
  ["boston-college", "Boston College", "Boston Coll", "Eagles", "ACC", "Chestnut Hill", "MA", "#8a100b", "#b29d6c", 5, 7, "Did not bowl", 81, 79, 20, 82.8, 135.2, 0, 1, 17, 82, 7.72, 16.2, 12.2, 10.8, 5.0, 3.8, 54, 0.1, 5.2, 62.1],
  ["kansas", "Kansas", "Kansas", "Jayhawks", "Big 12", "Lawrence", "KS", "#0051ba", "#e8000d", 5, 7, "Did not bowl", 83, 83, 21, 82.1, 127.4, 0, 0, 19, 83, 7.56, 18.4, 10.2, 10.1, 5.2, 3.7, 52, 0.1, 5.1, 60.2],
  ["cincinnati", "Cincinnati", "Cincinnati", "Bearcats", "Big 12", "Cincinnati", "OH", "#e00122", "#000000", 5, 7, "Did not bowl", 84, 84, 22, 82.0, 126.2, 0, 0, 20, 84, 7.4, 17.6, 10.6, 10.4, 5.4, 3.6, 53, 0.1, 4.9, 59.8],
  ["ucf", "UCF", "UCF", "Knights", "Big 12", "Orlando", "FL", "#ba9b37", "#000000", 5, 7, "Did not bowl", 85, 85, 23, 81.8, 124.8, 0, 0, 21, 85, 7.24, 18.8, 9.8, 10.2, 4.8, 3.6, 51, 0.1, 4.8, 58.4],
  ["colorado-state", "Colorado State", "Colorado St", "Rams", "Mountain West", "Fort Collins", "CO", "#1e4d2b", "#c8c372", 7, 6, "Did not bowl", 86, 86, 20, 81.6, 122.4, 0, 0, 18, 86, 7.08, 17.2, 10.4, 10.6, 3.6, 4.4, 52, 0.1, 5.0, 56.6],
  ["san-diego-state", "San Diego State", "San Diego St", "Aztecs", "Mountain West", "San Diego", "CA", "#a6192e", "#000000", 6, 7, "Did not bowl", 87, 87, 21, 81.4, 120.8, 0, 0, 19, 87, 6.92, 16.4, 10.8, 10.8, 3.7, 4.2, 53, 0.1, 4.6, 55.8],
  ["uconn", "UConn", "UConn", "Huskies", "Independent", "Storrs", "CT", "#000e2f", "#a1a1a4", 6, 7, "Did not bowl", 88, 88, 19, 81.2, 119.2, 0, 0, 17, 88, 6.76, 16.8, 10.1, 10.2, 3.4, 3.4, 51, 0.1, 4.4, 54.2],
  ["ball-state", "Ball State", "Ball St", "Cardinals", "MAC", "Muncie", "IN", "#ba0c2f", "#ffffff", 5, 7, "Did not bowl", 89, 89, 18, 80.6, 112.4, 0, 0, 16, 89, 6.4, 14.2, 10.6, 9.8, 3.2, 3.1, 48, 0.05, 3.8, 51.6],
];

const GAMES = [
  [1, "2026-09-05", "lsu", "clemson", false, "Baton Rouge, LA", "Week 1 headliner"],
  [1, "2026-09-05", "ole-miss", "louisville", false, "Oxford, MS", "ACC/SEC opener"],
  [1, "2026-09-05", "oregon", "boise-state", false, "Eugene, OR", "Group of Five test"],
  [1, "2026-09-05", "ohio-state", "ball-state", false, "Columbus, OH", null],
  [1, "2026-09-05", "texas", "texas-state", false, "Austin, TX", null],
  [1, "2026-09-05", "indiana", "north-texas", false, "Bloomington, IN", "Title defense opens"],
  [1, "2026-09-05", "alabama", "east-carolina", false, "Tuscaloosa, AL", null],
  [1, "2026-09-05", "georgia-tech", "colorado", false, "Atlanta, GA", "Coach Prime on the road"],
  [1, "2026-09-05", "usc", "fresno-state", false, "Los Angeles, CA", null],
  [1, "2026-09-05", "washington", "washington-state", false, "Seattle, WA", "Apple Cup in September"],
  [1, "2026-09-05", "duke", "tulane", false, "Durham, NC", null],
  [1, "2026-09-05", null, "baylor", true, "Atlanta, GA", "Baylor vs Auburn, Mercedes-Benz"],
  [2, "2026-09-12", "texas", "ohio-state", false, "Austin, TX", "HX No. 1 at No. 4"],
  [2, "2026-09-12", "georgia", "south-carolina", false, "Athens, GA", null],
  [3, "2026-09-19", "miami", "florida", false, "Miami Gardens, FL", "The Florida rivalry"],
  [5, "2026-10-03", "iowa", "ohio-state", false, "Iowa City, IA", "Kinnick night"],
  [6, "2026-10-10", "tennessee", "texas", false, "Knoxville, TN", "SEC heavyweight"],
  [7, "2026-10-17", "usc", "oregon", false, "Los Angeles, CA", "Coliseum lights"],
  [8, "2026-10-24", "alabama", "tennessee", false, "Tuscaloosa, AL", "Third Saturday in October"],
  [10, "2026-11-07", "ohio-state", "oregon", false, "Columbus, OH", "Big Ten title-race marker"],
  [12, "2026-11-21", "georgia", "texas", false, "Athens, GA", "SEC round-robin"],
  [13, "2026-11-28", "michigan", "ohio-state", false, "Ann Arbor, MI", "The Game"],
  [13, "2026-11-28", "lsu", "ole-miss", false, "Baton Rouge, LA", "Magnolia Board"],
  [13, "2026-11-28", "oklahoma", "texas", false, "Dallas, TX", "Red River, relocated slate"],
];

function pickHometown(slug, rng) {
  const local = Object.entries(PIPELINE).filter(([, teams]) => teams.includes(slug));
  if (local.length && rng() < 0.55) {
    return local[Math.floor(rng() * local.length)][0];
  }
  const feeders = ["TX", "FL", "GA", "CA", "OH", "PA", "LA", "AL", "NC", "VA", "NJ", "IL", "MI", "TN", "MD"];
  if (rng() < 0.7) return feeders[Math.floor(rng() * feeders.length)];
  const all = Object.keys(STATE_META);
  return all[Math.floor(rng() * all.length)];
}

function makeName(rng, i) {
  return `${FIRST[(i * 7 + Math.floor(rng() * FIRST.length)) % FIRST.length]} ${LAST[(i * 11 + Math.floor(rng() * LAST.length)) % LAST.length]}`;
}

function build() {
  const teamBySlug = new Map();
  TEAMS.forEach((row, i) => {
    teamBySlug.set(row[0], { id: i + 1, row });
  });

  const players = [];
  const hometownCounts = new Map();

  for (const { id, row } of teamBySlug.values()) {
    const slug = row[0];
    const rng = mulberry32(hashSeed(slug));
    const talent = row[30];
    const recAvg = row[15];
    const olBoost = talent > 90 ? 8 : talent > 80 ? 4 : 0;

    const real = TWODEEP[slug];
    if (Array.isArray(real) && real.length) {
      for (const p of real) {
        const hometown = p.hometownState || pickHometown(slug, rng);
        const classYear = p.classYear || "SO";
        players.push({
          teamId: id,
          name: p.name,
          jersey: Number(p.jersey ?? 0),
          position: p.position,
          depth: Number(p.depth ?? 1),
          classYear,
          height: Number(p.heightIn),
          weight: Number(p.weightLbs),
          stars: Number(p.stars ?? 3),
          rating: clamp(Number(p.rating ?? 82), 60, 99.9),
          hometown,
          unit: p.unit === "DEF" ? "DEF" : "OFF",
          transfer: /TR/i.test(classYear),
        });
        const key = `${hometown}|${id}`;
        hometownCounts.set(key, (hometownCounts.get(key) ?? 0) + 1);
      }
      continue;
    }

    ROSTER.forEach((pos, i) => {
      const meta = POS_META[pos];
      const hJitter = Math.round((rng() - 0.5) * 4);
      const wJitter = Math.round((rng() - 0.5) * 18);
      const isOL = ["LT", "LG", "C", "RG", "RT"].includes(pos);
      const height = clamp(meta.h + hJitter, 68, 82);
      const weight = clamp(meta.w + wJitter + (isOL ? olBoost : 0), 175, 360);
      const starRoll = rng() + talent / 220;
      let stars = 3;
      if (starRoll > 1.28) stars = 5;
      else if (starRoll > 0.92) stars = 4;
      else if (starRoll < 0.42) stars = 2;
      if (pos === "QB" && talent > 92) stars = Math.max(stars, 4);
      const rating = round(70 + stars * 5.4 + rng() * 4 + (recAvg - 85) * 0.35, 2);
      const classRoll = rng();
      const classYear = classRoll < 0.22 ? "FR" : classRoll < 0.48 ? "SO" : classRoll < 0.75 ? "JR" : "SR";
      const hometown = pickHometown(slug, rng);
      const name = pos === "QB" && QB_NAMES[slug] ? QB_NAMES[slug] : makeName(rng, i + id * 13);
      players.push({
        teamId: id,
        name,
        jersey: 0,
        position: pos,
        depth: 1,
        classYear,
        height,
        weight,
        stars,
        rating: clamp(rating, 68, 99.9),
        hometown,
        unit: meta.unit,
        transfer: false,
      });
      const key = `${hometown}|${id}`;
      hometownCounts.set(key, (hometownCounts.get(key) ?? 0) + 1);
    });
  }

  const rosterProfiles = [];
  for (const { id } of teamBySlug.values()) {
    const squad = players.filter((p) => p.teamId === id);
    const avg = (arr, fn) => (arr.length ? arr.reduce((s, x) => s + fn(x), 0) / arr.length : 0);
    const depthW = (p) => (Number(p.depth) === 1 ? 1 : 0.4);
    const wavg = (arr, fn) => {
      if (!arr.length) return 0;
      let s = 0;
      let w = 0;
      for (const p of arr) {
        const ww = depthW(p);
        s += fn(p) * ww;
        w += ww;
      }
      return w ? s / w : 0;
    };
    const ol = squad.filter((p) => OL_POS.has(p.position));
    const skill = squad.filter((p) => SKILL_POS.has(p.position));
    const db = squad.filter((p) => DB_POS.has(p.position));
    const qb = squad.filter((p) => p.position === "QB");
    const dl = squad.filter((p) => DL_POS.has(p.position));
    const lb = squad.filter((p) => LB_POS.has(p.position));
    const off = squad.filter((p) => p.unit === "OFF");
    const def = squad.filter((p) => p.unit === "DEF");
    const starters = squad.filter((p) => Number(p.depth) === 1);
    const blue = squad.filter((p) => p.stars >= 4);
    const transfers = squad.filter((p) => p.transfer);
    const homegrown = squad.filter((p) => !p.transfer);
    const row = TEAMS[id - 1];
    const talentScore = round(wavg(squad, (p) => p.rating), 2);
    const trW = transfers.reduce((s, p) => s + depthW(p), 0);
    const allW = squad.reduce((s, p) => s + depthW(p), 0);
    rosterProfiles.push({
      teamId: id,
      talentRank: 0,
      talentScore,
      blueChipPct: round(squad.length ? (blue.length / squad.length) * 100 : 0, 1),
      transferPct: round(squad.length ? (transfers.length / squad.length) * 100 : 0, 1),
      transferCount: transfers.length,
      offTalent: round(wavg(off.length ? off : squad, (p) => p.rating), 2),
      defTalent: round(wavg(def.length ? def : squad, (p) => p.rating), 2),
      starterTalent: round(wavg(starters.length ? starters : squad, (p) => p.rating), 2),
      hsTalent: round(wavg(homegrown.length ? homegrown : squad, (p) => p.rating), 2),
      portalTalent: round(transfers.length ? wavg(transfers, (p) => p.rating) : 0, 2),
      portalShare: round(allW ? (trW / allW) * 100 : 0, 1),
      qbTalent: round(wavg(qb.length ? qb : [], (p) => p.rating), 2),
      skillTalent: round(wavg(skill.length ? skill : [], (p) => p.rating), 2),
      olTalent: round(wavg(ol.length ? ol : [], (p) => p.rating), 2),
      dlTalent: round(wavg(dl.length ? dl : [], (p) => p.rating), 2),
      lbTalent: round(wavg(lb.length ? lb : [], (p) => p.rating), 2),
      dbTalent: round(wavg(db.length ? db : [], (p) => p.rating), 2),
      avgRating: talentScore,
      avgHeight: round(avg(squad, (p) => p.height), 1),
      avgWeight: round(avg(squad, (p) => p.weight), 1),
      olH: round(avg(ol.length ? ol : squad, (p) => p.height), 1),
      olW: round(avg(ol.length ? ol : squad, (p) => p.weight), 1),
      skH: round(avg(skill.length ? skill : squad, (p) => p.height), 1),
      skW: round(avg(skill.length ? skill : squad, (p) => p.weight), 1),
      dbH: round(avg(db.length ? db : squad, (p) => p.height), 1),
      returningStarters: Math.round(11 + (row[27] / 100) * 11),
    });
  }
  rosterProfiles.sort((a, b) => b.talentScore - a.talentScore);
  rosterProfiles.forEach((p, i) => {
    p.talentRank = i + 1;
  });

  const stateRecruits = new Map();
  for (const p of players) {
    const cur = stateRecruits.get(p.hometown) ?? { n: 0, five: 0, rating: 0 };
    cur.n += 1;
    if (p.stars >= 5) cur.five += 1;
    cur.rating += p.rating;
    stateRecruits.set(p.hometown, cur);
  }

  const lines = [];
  lines.push("-- HASHMARK 2026 preseason seed (generated)");
  lines.push("truncate state_commits, games, players, roster_profile, recruiting, rankings, states, teams restart identity cascade;");
  lines.push("");
  lines.push("insert into teams (id, slug, name, short_name, mascot, conference, city, state, color_primary, color_secondary, last_wins, last_losses, last_finish) values");
  lines.push(
    TEAMS.map((t, i) => {
      const comma = i === TEAMS.length - 1 ? ";" : ",";
      return `  (${i + 1}, ${sqlStr(t[0])}, ${sqlStr(t[1])}, ${sqlStr(t[2])}, ${sqlStr(t[3])}, ${sqlStr(t[4])}, ${sqlStr(t[5])}, ${sqlStr(t[6])}, ${sqlStr(t[7])}, ${sqlStr(t[8])}, ${t[9]}, ${t[10]}, ${sqlStr(t[11])})${comma}`;
    }).join("\n"),
  );

  lines.push("");
  lines.push("insert into rankings (team_id, season, week, hx_rank, hx_rating, ap_rank, offense_rating, defense_rating, special_rating, sos_rating, projected_wins, returning_production, playoff_odds, prior_score, talent_score) values");
  const talentById = new Map(rosterProfiles.map((p) => [p.teamId, p.talentScore]));
  lines.push(
    TEAMS.map((t, i) => {
      const ap = t[12] == null ? "NULL" : t[12];
      const comma = i === TEAMS.length - 1 ? ";" : ",";
      const talent = talentById.get(i + 1) ?? t[30];
      return `  (${i + 1}, 2026, 0, ${t[20]}, ${t[21]}, ${ap}, ${t[22]}, ${t[23]}, ${t[24]}, ${t[25]}, ${t[26]}, ${t[27]}, ${t[28]}, ${t[29]}, ${talent})${comma}`;
    }).join("\n"),
  );

  const recRows = [];
  for (let i = 0; i < TEAMS.length; i++) {
    const t = TEAMS[i];
    const slug = t[0];
    const teamId = i + 1;
    recRows.push({
      teamId,
      year: 2026,
      rank: t[13],
      commits: t[14],
      avg: t[15],
      points: t[16],
      five: t[17],
      four: t[18],
      three: t[19],
    });
    for (const year of [2023, 2024, 2025]) {
      const known = REC_HISTORY[String(year)]?.[slug];
      if (known) {
        recRows.push({
          teamId,
          year,
          rank: known[0],
          commits: known[1],
          avg: known[2], // rated 247 Composite mean (0–100); NA commits are not in this number
          points: known[3],
          five: known[4],
          four: known[5],
          three: known[6],
        });
        continue;
      }
      const rng = mulberry32(hashSeed(`${slug}-${year}`));
      const drift = Math.round((rng() - 0.45) * 14);
      const rank = clamp(t[13] + drift, 8, 120);
      const commits = clamp(Math.round(t[14] + (rng() - 0.5) * 8), 14, 38);
      const avg = round(clamp(t[15] + (rng() - 0.55) * 1.8, 82.4, 93.2), 2);
      const points = round(clamp(t[16] + (rng() - 0.5) * 28, 110, 280), 2);
      const five = Math.max(0, t[17] + Math.round((rng() - 0.7) * 2));
      const four = clamp(Math.round(t[18] + (rng() - 0.5) * 6), 0, 22);
      const three = Math.max(0, commits - five - four);
      recRows.push({ teamId, year, rank, commits, avg, points, five, four, three });
    }
  }
  recRows.sort((a, b) => a.year - b.year || a.rank - b.rank || a.teamId - b.teamId);

  lines.push("");
  lines.push("insert into recruiting (team_id, class_year, composite_rank, commits, avg_rating, points, five_stars, four_stars, three_stars) values");
  lines.push(
    recRows
      .map((r, i) => {
        const comma = i === recRows.length - 1 ? ";" : ",";
        return `  (${r.teamId}, ${r.year}, ${r.rank}, ${r.commits}, ${r.avg}, ${r.points}, ${r.five}, ${r.four}, ${r.three})${comma}`;
      })
      .join("\n"),
  );

  lines.push("");
  lines.push("insert into roster_profile (team_id, talent_rank, talent_score, blue_chip_pct, transfer_pct, transfer_count, off_talent, def_talent, starter_talent, hs_talent, portal_talent, portal_share, qb_talent, skill_talent, ol_talent, dl_talent, lb_talent, db_talent, avg_rating, avg_height_in, avg_weight_lbs, ol_avg_height_in, ol_avg_weight_lbs, skill_avg_height_in, skill_avg_weight_lbs, db_avg_height_in, returning_starters) values");
  const profilesById = [...rosterProfiles].sort((a, b) => a.teamId - b.teamId);
  lines.push(
    profilesById
      .map((p, i) => {
        const comma = i === profilesById.length - 1 ? ";" : ",";
        return `  (${p.teamId}, ${p.talentRank}, ${p.talentScore}, ${p.blueChipPct}, ${p.transferPct}, ${p.transferCount}, ${p.offTalent}, ${p.defTalent}, ${p.starterTalent}, ${p.hsTalent}, ${p.portalTalent}, ${p.portalShare}, ${p.qbTalent}, ${p.skillTalent}, ${p.olTalent}, ${p.dlTalent}, ${p.lbTalent}, ${p.dbTalent}, ${p.avgRating}, ${p.avgHeight}, ${p.avgWeight}, ${p.olH}, ${p.olW}, ${p.skH}, ${p.skW}, ${p.dbH}, ${p.returningStarters})${comma}`;
      })
      .join("\n"),
  );

  lines.push("");
  const chunk = 80;
  for (let i = 0; i < players.length; i += chunk) {
    const slice = players.slice(i, i + chunk);
    const last = i + chunk >= players.length;
    lines.push(
      "insert into players (team_id, name, jersey, position, depth, class_year, height_in, weight_lbs, stars, rating, hometown_state, unit, transfer) values",
    );
    lines.push(
      slice
        .map((p, j) => {
          const end = j === slice.length - 1 ? ";" : ",";
          return `  (${p.teamId}, ${sqlStr(p.name)}, ${p.jersey}, ${sqlStr(p.position)}, ${p.depth}, ${sqlStr(p.classYear)}, ${p.height}, ${p.weight}, ${p.stars}, ${p.rating}, ${sqlStr(p.hometown)}, ${sqlStr(p.unit)}, ${p.transfer ? "true" : "false"})${end}`;
        })
        .join("\n"),
    );
    lines.push("");
  }

  const resolvedGames = [];
  for (const g of GAMES) {
    const homeSlug = g[2] ?? "auburn";
    const awaySlug = g[3];
    const home = teamBySlug.get(homeSlug);
    const away = teamBySlug.get(awaySlug);
    if (!home || !away) continue;
    resolvedGames.push({
      week: g[0],
      date: g[1],
      home: home.id,
      away: away.id,
      neutral: g[4],
      location: g[5],
      headline: g[6],
    });
  }
  lines.push(
    "insert into games (week, kickoff_date, home_team_id, away_team_id, neutral, location, headline) values",
  );
  lines.push(
    resolvedGames
      .map((g, i) => {
        const comma = i === resolvedGames.length - 1 ? ";" : ",";
        return `  (${g.week}, ${sqlStr(g.date)}, ${g.home}, ${g.away}, ${g.neutral}, ${sqlStr(g.location)}, ${sqlStr(g.headline)})${comma}`;
      })
      .join("\n"),
  );

  lines.push("");
  const stateRows = Object.entries(STATE_META).map(([code, [name, region]]) => {
    const rec = stateRecruits.get(code) ?? { n: 0, five: 0, rating: 0 };
    const avg = rec.n ? round(rec.rating / rec.n, 2) : 78;
    const talentIndex = round(rec.n * 1.4 + rec.five * 8 + (avg - 78) * 2, 1);
    return { code, name, region, n: rec.n, five: rec.five, avg, talentIndex };
  });
  lines.push("insert into states (code, name, region, recruits, five_stars, avg_rating, talent_index) values");
  lines.push(
    stateRows
      .map((s, i) => {
        const comma = i === stateRows.length - 1 ? ";" : ",";
        return `  (${sqlStr(s.code)}, ${sqlStr(s.name)}, ${sqlStr(s.region)}, ${s.n}, ${s.five}, ${s.avg}, ${s.talentIndex})${comma}`;
      })
      .join("\n"),
  );

  lines.push("");
  const commitRows = [];
  for (const [key, n] of hometownCounts.entries()) {
    const [state, teamId] = key.split("|");
    if (!STATE_META[state]) continue;
    commitRows.push({ state, teamId: Number(teamId), n });
  }
  commitRows.sort((a, b) => a.state.localeCompare(b.state) || b.n - a.n);
  lines.push("insert into state_commits (state_code, team_id, commits) values");
  lines.push(
    commitRows
      .map((c, i) => {
        const comma = i === commitRows.length - 1 ? ";" : ",";
        return `  (${sqlStr(c.state)}, ${c.teamId}, ${c.n})${comma}`;
      })
      .join("\n"),
  );

  lines.push("");
  lines.push(`select setval('teams_id_seq', ${TEAMS.length});`);
  lines.push(`select setval('players_id_seq', ${players.length});`);
  lines.push(`select setval('games_id_seq', ${resolvedGames.length});`);

  return lines.join("\n") + "\n";
}

const out = build();
const dest = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations", "0003_seed.sql");
writeFileSync(dest, out);
console.log(`wrote ${dest} (${out.length} bytes)`);
