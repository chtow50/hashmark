import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as ImageDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-button-CmQIZdLC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var W = 1200;
var H = 630;
/** Team colors too dark for the dark card fall back to the site accent. */
function readable(hex) {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
	if (!m) return null;
	const n = parseInt(m[1], 16);
	const lin = (c) => (c /= 255) <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
	return .2126 * lin(n >> 16 & 255) + .7152 * lin(n >> 8 & 255) + .0722 * lin(n & 255) < .07 ? null : `#${m[1]}`;
}
function cssVar(name, fallback) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
async function renderShareCard(card) {
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
	ctx.roundRect(40, 40, 1120, 550, 28);
	ctx.fill();
	ctx.fillStyle = accent;
	ctx.fillRect(40, 72, 10, 120);
	const fit = (text, font, max, start) => {
		let px = start;
		ctx.font = font(px);
		while (ctx.measureText(text).width > max && px > 20) ctx.font = font(--px);
		return px;
	};
	ctx.fillStyle = muted;
	ctx.font = `500 22px ${mono}`;
	ctx.fillText(card.kicker.toUpperCase(), 80, 98);
	ctx.fillStyle = fg;
	fit(card.title, (px) => `600 ${px}px ${display}`, 1040, 88);
	ctx.fillText(card.title, 80, 180);
	if (card.subtitle) {
		ctx.fillStyle = muted;
		fit(card.subtitle, (px) => `400 ${px}px ${sans}`, 1040, 28);
		ctx.fillText(card.subtitle, 80, 226);
	}
	const stats = card.stats.slice(0, 4);
	const colW = 1040 / Math.max(stats.length, 1);
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
		const span = hi - lo || 1, x0 = 80, x1 = 1120, y0 = 420;
		ctx.strokeStyle = line;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x0, 508);
		ctx.lineTo(x1, 508);
		ctx.stroke();
		ctx.strokeStyle = accent;
		ctx.lineWidth = 4;
		ctx.lineJoin = "round";
		ctx.beginPath();
		v.forEach((val, i) => {
			const x = x0 + i * 1040 / (v.length - 1);
			const y = y0 + (hi - val) * 80 / span;
			if (i) ctx.lineTo(x, y);
			else ctx.moveTo(x, y);
		});
		ctx.stroke();
		ctx.fillStyle = muted;
		ctx.font = `400 18px ${sans}`;
		ctx.fillText(card.line.startLabel, x0, 536);
		ctx.textAlign = "right";
		ctx.fillText(card.line.endLabel, x1, 536);
		ctx.textAlign = "left";
		ctx.fillText(card.line.caption, x0, 408);
	}
	ctx.fillStyle = muted;
	ctx.font = `400 18px ${sans}`;
	ctx.fillText(card.footer, 80, 560);
	ctx.textAlign = "right";
	ctx.fillStyle = fg;
	ctx.font = `600 22px ${display}`;
	ctx.fillText("HASHMARK · hashmarkcfb.com", 1120, 560);
	const blob = await new Promise((r) => c.toBlob(r, "image/png"));
	if (!blob) throw new Error("png encode failed");
	return blob;
}
/** Native share sheet with the PNG where the browser supports files; otherwise a download. */
async function shareCard(card) {
	const blob = await renderShareCard(card);
	const file = new File([blob], card.filename, { type: "image/png" });
	const nav = navigator;
	if (nav.canShare?.({ files: [file] }) && window.matchMedia("(pointer: coarse)").matches) try {
		await nav.share({
			files: [file],
			title: card.title
		});
		return "shared";
	} catch (e) {
		if (e.name === "AbortError") return "shared";
	}
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = card.filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
	return "downloaded";
}
/** Builds a 1200×630 PNG from the page's own numbers and shares or downloads it. */
function ShareImageButton({ card, label = "Share image" }) {
	const [state, setState] = (0, import_react.useState)("idle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: state === "busy",
		onClick: async () => {
			setState("busy");
			try {
				await shareCard(card());
				setState("done");
				setTimeout(() => setState("idle"), 2e3);
			} catch {
				setState("error");
			}
		},
		className: "inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-colors hover:text-fg disabled:opacity-60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageDown, {
			className: "size-4",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-live": "polite",
			children: state === "busy" ? "Making image…" : state === "done" ? "Image ready" : state === "error" ? "Couldn't make image" : label
		})]
	});
}
//#endregion
export { ShareImageButton as t };
