/** Civil-date helpers for the schedule board. Kick times display in Chicago. */

export const CHICAGO_TZ = "America/Chicago";

const YMD = /^\d{4}-\d{2}-\d{2}$/;

export function isYmd(value: string): boolean {
  return YMD.test(value);
}

export function ymdInTimeZone(date: Date, timeZone = CHICAGO_TZ): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function todayChicago(now = new Date()): string {
  return ymdInTimeZone(now, CHICAGO_TZ);
}

/** Calendar arithmetic on a YYYY-MM-DD civil date (not a timezone instant). */
export function addDaysYmd(ymd: string, delta: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + delta));
  const yy = next.getUTCFullYear();
  const mm = String(next.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(next.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function formatChicagoTitle(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  // 17:00 UTC is midday in Chicago year-round, so the weekday/date stay on `ymd`.
  const probe = new Date(Date.UTC(y, m - 1, d, 17));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TZ,
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(probe);
}

export function formatKickCt(iso: string | null): string {
  if (!iso) return "—";
  const when = new Date(iso);
  if (Number.isNaN(when.getTime())) return "—";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(when);
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  if (!hour || !minute) return "—";
  return `${hour}:${minute} CT`;
}
