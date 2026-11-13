/**
 * Client-only 1200×630 share images drawn on a canvas from numbers already on the page.
 * Nothing here computes a rating; callers pass the values they display.
 */
export type ShareStat = { label: string; value: string };
export type ShareCard = {
  kicker: string;
  title: string;
  subtitle?: string;
  stats: ShareStat[];
  /** Optional line (e.g. HX by week) with first/last labels. */
  line?: { values: number[]; startLabel: string; endLabel: string; caption: string };
  accent?: string;
  footer: string;
  filename: string;
};

const W = 1200;
const H = 630;

/** Team colors too dark for the dark card fall back to the site accent. */
function readable(hex?: string): string | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L < 0.07 ? null : `#${m[1]}`;
}

function cssVar(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

export async function renderShareCard(card: ShareCard): Promise<Blob> {
  await document.fonts?.ready;
  const bg = cssVar("--color-bg", "#0d0e10");
  const surface = cssVar("--color-surface", "#16171a");
  const fg = cssVar("--color-fg", "#f2f1ec");
  const muted = cssVar("--color-muted", "#a3a29c");
  const line = cssVar("--color-line", "#2a2b2f");
  const accent = readable(card.accent) ?? cssVar("--color-accent", "#c5ccd4");
  const sans = cssVar("--font-sans", "sans-serif");
  const display = cssVar("--font-display", "sans-serif");
  const mono = cssVar("--font-mono", "monospace");

  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("no canvas");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = surface;
  ctx.beginPath();
  ctx.roundRect(40, 40, W - 80, H - 80, 28);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.fillRect(40, 72, 10, 120);

  const fit = (text: string, font: (px: number) => string, max: number, start: number) => {
    let px = start;
    ctx.font = font(px);
    while (ctx.measureText(text).width > max && px > 20) ctx.font = font(--px);
    return px;
  };

  ctx.fillStyle = muted;
  ctx.font = `500 22px ${mono}`;
  ctx.fillText(card.kicker.toUpperCase(), 80, 98);
  ctx.fillStyle = fg;
  fit(card.title, (px) => `600 ${px}px ${display}`, W - 160, 88);
  ctx.fillText(card.title, 80, 180);
  if (card.subtitle) {
    ctx.fillStyle = muted;
    fit(card.subtitle, (px) => `400 ${px}px ${sans}`, W - 160, 28);
    ctx.fillText(card.subtitle, 80, 226);
  }

  const stats = card.stats.slice(0, 4);
  const colW = (W - 160) / Math.max(stats.length, 1);
  const statTop = card.line ? 290 : 320;
  stats.forEach((s, i) => {
    const x = 80 + i * colW;
    ctx.fillStyle = muted;
    ctx.font = `500 20px ${mono}`;
    ctx.fillText(s.label.toUpperCase(), x, statTop);
    ctx.fillStyle = fg;
    fit(s.value, (px) => `600 ${px}px ${display}`, colW - 24, 72);
    ctx.fillText(s.value, x, statTop + 72);
  });

  if (card.line && card.line.values.length > 1) {
    const v = card.line.values;
    const lo = Math.min(...v);
    const hi = Math.max(...v);
    const span = hi - lo || 1;
    const x0 = 80, x1 = W - 80, y0 = 420, y1 = 500;
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y1 + 8);
    ctx.lineTo(x1, y1 + 8);
    ctx.stroke();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.beginPath();
    v.forEach((val, i) => {
      const x = x0 + (i * (x1 - x0)) / (v.length - 1);
      const y = y0 + ((hi - val) * (y1 - y0)) / span;
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = muted;
    ctx.font = `400 18px ${sans}`;
    ctx.fillText(card.line.startLabel, x0, y1 + 36);
    ctx.textAlign = "right";
    ctx.fillText(card.line.endLabel, x1, y1 + 36);
    ctx.textAlign = "left";
    ctx.fillText(card.line.caption, x0, 408);
  }

  ctx.fillStyle = muted;
  ctx.font = `400 18px ${sans}`;
  ctx.fillText(card.footer, 80, H - 70);
  ctx.textAlign = "right";
  ctx.fillStyle = fg;
  ctx.font = `600 22px ${display}`;
  ctx.fillText("HASHMARK · hashmarkcfb.com", W - 80, H - 70);

  const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/png"));
  if (!blob) throw new Error("png encode failed");
  return blob;
}

/** Native share sheet with the PNG where the browser supports files; otherwise a download. */
export async function shareCard(card: ShareCard): Promise<"shared" | "downloaded"> {
  const blob = await renderShareCard(card);
  const file = new File([blob], card.filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] }) && window.matchMedia("(pointer: coarse)").matches) {
    try {
      await nav.share({ files: [file], title: card.title });
      return "shared";
    } catch (e) {
      if ((e as Error).name === "AbortError") return "shared";
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = card.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "downloaded";
}
