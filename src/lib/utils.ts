import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtHeight(inches: number) {
  const whole = Math.round(inches);
  const ft = Math.floor(whole / 12);
  const inn = whole % 12;
  return `${ft}'${inn}"`;
}

export function fmtNum(n: number, digits = 1) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtPct(n: number, digits = 1) {
  return `${fmtNum(n, digits)}%`;
}

export function apLabel(rank: number | null) {
  return rank == null ? "NR" : String(rank);
}

export function deltaVsAp(hxRank: number, apRank: number | null) {
  if (apRank == null) return { label: "NR", value: 0, kind: "nr" as const };
  const d = apRank - hxRank;
  if (d === 0) return { label: "even", value: 0, kind: "even" as const };
  if (d > 0) return { label: `+${d}`, value: d, kind: "up" as const };
  return { label: String(d), value: d, kind: "down" as const };
}
