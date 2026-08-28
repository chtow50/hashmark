export const CONFS = [
  "All",
  "SEC",
  "Big Ten",
  "ACC",
  "Big 12",
  "Independent",
  "Group of Five",
  "American",
  "Sun Belt",
  "MAC",
  "CUSA",
  "Mountain West",
  "Pac-12",
] as const;

export type ConfFilter = (typeof CONFS)[number];

export const G5 = new Set(["Mountain West", "American", "Sun Belt", "CUSA", "MAC", "Pac-12"]);

export function parseConf(value: unknown): ConfFilter {
  return CONFS.includes(value as ConfFilter) ? (value as ConfFilter) : "All";
}

export function inConf(conference: string, conf: ConfFilter) {
  if (conf === "All") return true;
  if (conf === "Group of Five") return G5.has(conference);
  return conference === conf;
}
