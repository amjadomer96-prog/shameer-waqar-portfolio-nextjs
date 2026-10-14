// Builds the link-preview images in public/og (1200x630) from the real
// screens. Run with `npm run og` after changing a project's screens or copy.

import fs from "node:fs";
import path from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";
import { PROJECTS } from "../lib/projects.js";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/og");
const font = fs.readFileSync(path.join(ROOT, "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));

const BG = "#0A0B0D";
const INK = "#EDECE8";
const MUTED = "#9297A0";

// screens are embedded as data URIs, resized first to keep the render light
async function img(src, width) {
  const buf = await sharp(path.join(ROOT, "public", src)).resize({ width: width * 2 }).jpeg({ quality: 86 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

function phone(src, { left, top, width, height }) {
  return h(
    "div",
    {
      style: {
        position: "absolute",
        left,
        top,
        display: "flex",
        padding: 6,
        borderRadius: 34,
        background: "#15171c",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
      },
    },
    h("img", { src, width, height, style: { borderRadius: 28 } })
  );
}

function browser(src, domain, { left, top, width, height }) {
  return h(
    "div",
    {
      style: {
        position: "absolute",
        left,
        top,
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        overflow: "hidden",
        background: "#111317",
        border: "1px solid rgba(237,236,232,0.12)",
        boxShadow: "0 50px 100px rgba(0,0,0,0.7)",
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px", background: "#191c21", color: MUTED, fontSize: 15 } },
      h("div", { style: { width: 10, height: 10, borderRadius: 5, background: "rgba(237,236,232,0.16)" } }),
      h("div", { style: { width: 10, height: 10, borderRadius: 5, background: "rgba(237,236,232,0.16)" } }),
      h("div", { style: { width: 10, height: 10, borderRadius: 5, background: "rgba(237,236,232,0.16)" } }),
      h("div", { style: { marginLeft: 10 } }, domain)
    ),
    h("img", { src, width, height })
  );
}

function card({ accent, label, title, line, footer, media }) {
  return h(
    "div",
    {
      style: {
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: BG,
        backgroundImage: `radial-gradient(circle at 82% 45%, ${rgba(accent, 0.16)}, transparent 55%)`,
        fontFamily: "Geist",
        color: INK,
      },
    },
    ...media,
    h(
      "div",
      { style: { position: "absolute", left: 72, top: 64, bottom: 64, width: 540, display: "flex", flexDirection: "column", justifyContent: "space-between" } },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 12, fontSize: 26, letterSpacing: -0.5 } },
        h("span", { style: { color: accent } }, "+"),
        "Shameer Waqar"
      ),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        h("div", { style: { fontSize: 18, letterSpacing: 3.5, color: MUTED, textTransform: "uppercase" } }, label),
        h("div", { style: { marginTop: 18, fontSize: title.length > 10 ? 92 : 112, lineHeight: 0.95, letterSpacing: -5 } }, title),
        h("div", { style: { marginTop: 22, fontSize: 32, lineHeight: 1.2, letterSpacing: -0.8, color: MUTED, maxWidth: 520, textWrap: "balance" } }, line)
      ),
      h("div", { style: { display: "flex", fontSize: 20, color: MUTED, letterSpacing: 0.2 } }, footer)
    )
  );
}

async function mediaFor(p) {
  if (p.screens) {
    const [a, b] = await Promise.all([img(p.screens[3].src, 236), img(p.screens[6].src, 236)]);
    return [phone(a, { left: 650, top: 104, width: 236, height: 511 }), phone(b, { left: 916, top: 48, width: 236, height: 511 })];
  }
  if (p.video) {
    const [poster, mobile] = await Promise.all([img(p.poster, 700), img(p.mobile, 170)]);
    return [
      browser(poster, p.domain, { left: 640, top: 110, width: 700, height: 437 }),
      phone(mobile, { left: 600, top: 300, width: 170, height: 368 }),
    ];
  }
  const shots = [p.deck[1], p.deck[4], p.deck[2]];
  const [a, b, c] = await Promise.all(shots.map((s) => img(s.src, 210)));
  const ph = (src, left, top) => h("img", { src, width: 210, height: 373, style: { position: "absolute", left, top, borderRadius: 22, border: "1px solid rgba(237,236,232,0.12)" } });
  return [ph(a, 640, 150), ph(b, 874, 70), ph(c, 1108, 190)];
}

async function render(element, file) {
  const res = new ImageResponse(element, { width: 1200, height: 630, fonts: [{ name: "Geist", data: font, weight: 400, style: "normal" }] });
  const png = Buffer.from(await res.arrayBuffer());
  await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUT, file));
  console.log("wrote", file);
}

fs.mkdirSync(OUT, { recursive: true });
sharp.cache(false);

for (const p of PROJECTS) {
  await render(
    card({
      accent: p.accent,
      label: `Case study / ${p.year}`,
      title: p.name,
      line: p.headline,
      footer: p.stack.slice(0, 4).join("  /  "),
      media: await mediaFor(p),
    }),
    `${p.slug}.jpg`
  );
}
