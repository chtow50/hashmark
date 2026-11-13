/** /games/<key> URLs: `<kickoff date>-<away slug>-at-<home slug>`, e.g. 2026-11-14-michigan-at-oregon. */
export function gameKey(kickoffDate: string, away: string, home: string): string {
  return `${kickoffDate.slice(0, 10)}-${away}-at-${home}`;
}

export function parseGameKey(key: string): { date: string; away: string; home: string } | null {
  const m = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+?)-at-([a-z0-9-]+)$/.exec(key);
  return m ? { date: m[1], away: m[2], home: m[3] } : null;
}

/** Calendar date in America/Chicago for an ISO instant (CFBD start times are UTC). */
export function chicagoDate(iso: string): string {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
  return p;
}
