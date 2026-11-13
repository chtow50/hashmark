/** Client-only file downloads: CSV from rows, PNG from an on-page SVG chart. */

function save(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const csvCell = (v: unknown): string => {
  if (v == null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(header: string[], rows: unknown[][]): string {
  return [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n") + "\n";
}

export function downloadCsv(filename: string, header: string[], rows: unknown[][]) {
  save(new Blob([`\uFEFF${toCsv(header, rows)}`], { type: "text/csv;charset=utf-8" }), filename);
}

const STYLE_PROPS = [
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "opacity",
  "font-size",
  "font-family",
  "font-weight",
  "paint-order",
  "filter",
] as const;

async function toDataUrl(src: string): Promise<string | null> {
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(typeof r.result === "string" ? r.result : null);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Renders an on-page SVG to a PNG at 2x, with computed colors and fonts inlined (CSS variables do
 * not resolve outside the page) and same-origin logos embedded as data URLs. Adds a title strip and
 * a source footer so the image stands on its own.
 */
export async function downloadSvgPng(
  svg: SVGSVGElement,
  filename: string,
  opts: { title: string; footer: string },
) {
  const w = svg.viewBox.baseVal?.width || svg.clientWidth;
  const h = svg.viewBox.baseVal?.height || svg.clientHeight;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const src = [svg, ...svg.querySelectorAll("*")] as Element[];
  const dst = [clone, ...clone.querySelectorAll("*")] as Element[];
  src.forEach((el, i) => {
    const cs = getComputedStyle(el);
    const d = dst[i] as SVGElement;
    for (const p of STYLE_PROPS) {
      const v = cs.getPropertyValue(p);
      if (v) d.style.setProperty(p, v);
    }
  });
  await Promise.all(
    [...clone.querySelectorAll("image")].map(async (img) => {
      const href = img.getAttribute("href");
      const data = href ? await toDataUrl(href) : null;
      if (data) img.setAttribute("href", data);
      else img.remove();
    }),
  );
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", String(w));
  clone.setAttribute("height", String(h));
  const xml = new XMLSerializer().serializeToString(clone);
  const img = new Image();
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("chart render failed"));
    img.src = url;
  });
  const root = getComputedStyle(document.documentElement);
  const bg = root.getPropertyValue("--color-surface").trim() || "#16171a";
  const fg = root.getPropertyValue("--color-fg").trim() || "#f2f1ec";
  const muted = root.getPropertyValue("--color-muted").trim() || "#a3a29c";
  const font = getComputedStyle(document.body).fontFamily;
  const pad = 20, top = 44, bottom = 30, scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = (w + pad * 2) * scale;
  canvas.height = (h + top + bottom) * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas");
  ctx.scale(scale, scale);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w + pad * 2, h + top + bottom);
  ctx.fillStyle = fg;
  ctx.font = `600 16px ${font}`;
  ctx.fillText(opts.title, pad, 28);
  ctx.drawImage(img, pad, top, w, h);
  ctx.fillStyle = muted;
  ctx.font = `11px ${font}`;
  ctx.fillText(opts.footer, pad, h + top + 20);
  ctx.textAlign = "right";
  ctx.fillText("hashmarkcfb.com", w + pad, h + top + 20);
  URL.revokeObjectURL(url);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (!blob) throw new Error("png encode failed");
  save(blob, filename);
}
