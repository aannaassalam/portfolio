/**
 * Synk Innovations — brand asset QC.
 *
 * Checks every file in public/brand/ against the identity spec. Run:
 *   node brand-source/qc.js
 *
 * Verifies: valid XML/SVG, correct viewBox, no raster or external resources,
 * no unintended background, expected colours, artwork inside the viewBox with
 * margin, and identical symbol geometry across every variant.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const DIR = path.join(__dirname, "..", "public", "brand");
const EXPECTED = [
  "synk-favicon.svg",
  "synk-letterhead-a4.svg",
  "synk-logo-dark.svg",
  "synk-logo-full-dark.svg",
  "synk-logo-full-light.svg",
  "synk-logo-light.svg",
  "synk-logo-stacked-dark.svg",
  "synk-logo-stacked-light.svg",
  "synk-logo-violet.svg",
  "synk-mark-dark.svg",
  "synk-mark-light.svg",
  "synk-mark-violet.svg",
];

// Files that legitimately carry a background rect.
const MAY_HAVE_BACKGROUND = new Set([
  "synk-favicon.svg",
  "synk-letterhead-a4.svg",
]);

const fails = [];
const warn = (f, msg) => fails.push(`${f}: ${msg}`);

(async () => {
  const present = fs.readdirSync(DIR).filter((f) => f.endsWith(".svg")).sort();
  const missing = EXPECTED.filter((f) => !present.includes(f));
  const extra = present.filter((f) => !EXPECTED.includes(f));
  if (missing.length) fails.push(`MISSING: ${missing.join(", ")}`);
  if (extra.length) fails.push(`UNEXPECTED: ${extra.join(", ")}`);

  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  const signatures = new Map();

  for (const f of present) {
    const src = fs.readFileSync(path.join(DIR, f), "utf8");

    // --- static checks -----------------------------------------------
    if (/<image\b/i.test(src)) warn(f, "contains <image> (raster)");
    if (/data:image\/(png|jpe?g)/i.test(src)) warn(f, "embeds a raster data URI");
    if (/xlink:href\s*=\s*"https?:/i.test(src) || /href\s*=\s*"https?:/i.test(src))
      warn(f, "references an external resource");
    if (/<filter\b/i.test(src)) warn(f, "uses a filter");
    if (!/^<svg[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/m.test(src))
      warn(f, "missing xmlns");
    if (!MAY_HAVE_BACKGROUND.has(f) && /<rect\b/i.test(src))
      warn(f, "has a <rect> — should be transparent");

    // --- parse + geometry --------------------------------------------
    await page.setContent(`<body style="margin:0">${src}</body>`);
    const info = await page.evaluate(() => {
      if (document.querySelector("parsererror")) return { parseError: true };
      const root = document.querySelector("svg");
      if (!root) return { parseError: true };
      const vb = root.getAttribute("viewBox");
      const nums = vb ? vb.trim().split(/[\s,]+/).map(Number) : null;
      const m0 = root.getScreenCTM().inverse();
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      const colors = new Set();
      root.querySelectorAll("polygon,path,rect,line").forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.fill && cs.fill !== "none") colors.add(cs.fill);
        if (cs.stroke && cs.stroke !== "none") colors.add(cs.stroke);
        if (el.tagName === "rect" || el.tagName === "line") return;
        const bb = el.getBBox();
        const sw = cs.stroke === "none" ? 0 : (parseFloat(cs.strokeWidth) || 0) / 2;
        const m = m0.multiply(el.getScreenCTM());
        for (const [cx, cy] of [
          [bb.x - sw, bb.y - sw],
          [bb.x + bb.width + sw, bb.y - sw],
          [bb.x - sw, bb.y + bb.height + sw],
          [bb.x + bb.width + sw, bb.y + bb.height + sw],
        ]) {
          const p = new DOMPoint(cx, cy).matrixTransform(m);
          x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y);
          x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y);
        }
      });
      // Symbol fingerprint: the DISTINCT polygon point data, independent of
      // transform and of how many times the symbol is placed. The letterhead
      // legitimately carries two instances (header lockup + sign-off), so a
      // raw concatenation would report a false difference.
      const sig = [...new Set(
        [...root.querySelectorAll("polygon")].map((p) => p.getAttribute("points"))
      )].sort().join("|");
      return { vb: nums, ink: [x0, y0, x1, y1], colors: [...colors], sig };
    });

    if (info.parseError) { warn(f, "INVALID XML/SVG"); continue; }
    if (!info.vb || info.vb.length !== 4) { warn(f, "missing/!4 viewBox"); continue; }

    const [vx, vy, vw, vh] = info.vb;
    const [x0, y0, x1, y1] = info.ink;
    const margin = Math.min(x0 - vx, y0 - vy, vx + vw - x1, vy + vh - y1);
    if (margin < -0.01) warn(f, `artwork clipped by ${(-margin).toFixed(2)}`);

    if (f === "synk-favicon.svg") {
      if (vw !== 64 || vh !== 64) warn(f, `favicon viewBox must be 64x64, got ${vw}x${vh}`);
      if (margin < 3) warn(f, `favicon padding too tight (${margin.toFixed(2)}/64)`);
    }
    if (/^synk-(logo|mark)-(dark|light|violet)\.svg$/.test(f)) {
      if (vw !== 1000 || vh !== 1000) warn(f, `symbol viewBox must be 1000x1000, got ${vw}x${vh}`);
    }
    if (vw <= 0 || vh <= 0) warn(f, "non-positive viewBox size");

    if (info.sig) {
      if (!signatures.has(info.sig)) signatures.set(info.sig, []);
      signatures.get(info.sig).push(f);
    }

    console.log(
      `  ok  ${f.padEnd(30)} viewBox=${vw}x${vh}  margin=${margin.toFixed(2)}  ` +
      `colours=${info.colors.length}`
    );
  }

  if (signatures.size > 1) {
    fails.push(
      "symbol geometry differs between files: " +
      [...signatures.values()].map((g) => g.join("+")).join("  VS  ")
    );
  } else if (signatures.size === 1) {
    console.log(`\n  symbol geometry identical across ${[...signatures.values()][0].length} files`);
  }

  // Favicon legibility at the required sizes.
  const fav = fs.readFileSync(path.join(DIR, "synk-favicon.svg"), "utf8");
  await page.setViewportSize({ width: 200, height: 80 });
  await page.setContent(
    `<body style="margin:0;background:#3a3a42;display:flex;gap:10px;align-items:center;padding:8px">` +
    [48, 32, 16].map((s) => fav.replace("<svg ", `<svg width="${s}" height="${s}" `)).join("") +
    `</body>`
  );
  await page.screenshot({ path: path.join(__dirname, "qc-favicon.png") });

  await browser.close();

  console.log("");
  if (fails.length) {
    console.log("FAILED:");
    fails.forEach((l) => console.log("  ✗ " + l));
    process.exit(1);
  }
  console.log(`PASS — ${present.length} files, all checks clean.`);
})();
