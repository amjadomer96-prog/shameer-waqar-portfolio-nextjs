// Target shapes for the particle field. Every generator fills a Float32Array
// of n * 3 coordinates inside a box about 2.6 units wide. A seeded RNG keeps
// the shapes identical on every load.

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rotate(out, rx, ry) {
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  for (let i = 0; i < out.length; i += 3) {
    const x = out[i] * cy + out[i + 2] * sy;
    const z0 = -out[i] * sy + out[i + 2] * cy;
    const y = out[i + 1] * cx - z0 * sx;
    const z = out[i + 1] * sx + z0 * cx;
    out[i] = x;
    out[i + 1] = y;
    out[i + 2] = z;
  }
  return out;
}

// Hero: three stacked layers, the "full stack".
function stack(n, r) {
  const out = new Float32Array(n * 3);
  const W = 2.1;
  const D = 1.35;
  const rad = 0.22;
  for (let i = 0; i < n; i++) {
    const layer = i % 3;
    let x;
    let z;
    if (r() < 0.3) {
      // outline, so each layer has a readable edge
      const side = r() * 2 * (W + D);
      if (side < W) [x, z] = [side - W / 2, -D / 2];
      else if (side < W + D) [x, z] = [W / 2, side - W - D / 2];
      else if (side < 2 * W + D) [x, z] = [side - W - D - W / 2, D / 2];
      else [x, z] = [-W / 2, side - 2 * W - D - D / 2];
    } else {
      do {
        x = (r() - 0.5) * W;
        z = (r() - 0.5) * D;
        // reject the square corners
      } while (
        Math.abs(x) > W / 2 - rad &&
        Math.abs(z) > D / 2 - rad &&
        Math.hypot(Math.abs(x) - (W / 2 - rad), Math.abs(z) - (D / 2 - rad)) > rad
      );
    }
    out.set([x, (layer - 1) * 0.6 + (r() - 0.5) * 0.02, z], i * 3);
  }
  return rotate(out, 0.5, 0.72);
}

// iFund: five rising bars.
function bars(n, r) {
  const out = new Float32Array(n * 3);
  const heights = [0.5, 0.85, 1.2, 1.65, 2.15];
  const total = heights.reduce((a, b) => a + b, 0);
  const w = 0.34;
  let i = 0;
  heights.forEach((h, b) => {
    const count = b === heights.length - 1 ? n - i : Math.round((n * h) / total);
    const cx = (b - 2) * 0.5;
    for (let k = 0; k < count && i < n; k++, i++) {
      let x = (r() - 0.5) * w;
      let y = r() * h;
      let z = (r() - 0.5) * w;
      const face = r();
      if (face < 0.18) y = h; // top cap
      else if (face < 0.6) x = (r() < 0.5 ? -1 : 1) * (w / 2);
      else z = (r() < 0.5 ? -1 : 1) * (w / 2);
      out.set([cx + x, y - 1.1, z], i * 3);
    }
  });
  return rotate(out, 0.2, -0.55);
}

// LDS Library: a curved wall of cards, like shelves of references.
function shelf(n, r) {
  const out = new Float32Array(n * 3);
  const cols = 4;
  const rows = 3;
  const cw = 0.52;
  const ch = 0.36;
  const gap = 0.13;
  const W = cols * cw + (cols - 1) * gap;
  const H = rows * ch + (rows - 1) * gap;
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const row = Math.floor(i / cols) % rows;
    let x;
    let y;
    if (r() < 0.6) {
      const side = r() * 2 * (cw + ch);
      if (side < cw) [x, y] = [side, 0];
      else if (side < cw + ch) [x, y] = [cw, side - cw];
      else if (side < 2 * cw + ch) [x, y] = [side - cw - ch, ch];
      else [x, y] = [0, side - 2 * cw - ch];
    } else {
      x = r() * cw;
      y = r() * ch;
    }
    const px = c * (cw + gap) + x - W / 2;
    const py = row * (ch + gap) + y - H / 2;
    out.set([px, py, px * px * 0.16 - 0.2], i * 3);
  }
  return rotate(out, 0, 0.25);
}

// Amariya: the voice orb.
function orb(n, r) {
  const out = new Float32Array(n * 3);
  const shell = Math.floor(n * 0.86);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    if (i < shell) {
      const y = 1 - (i / (shell - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      out.set([Math.cos(th) * rad * 1.12, y * 1.12, Math.sin(th) * rad * 1.12], i * 3);
    } else {
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const rad = Math.cbrt(r()) * 0.5;
      const s = Math.sqrt(1 - u * u);
      out.set([Math.cos(th) * s * rad, u * rad, Math.sin(th) * s * rad], i * 3);
    }
  }
  return out;
}

// SafaLife: a crescent with a small star.
function crescent(n, r) {
  const out = new Float32Array(n * 3);
  const starCount = Math.floor(n * 0.07);
  for (let i = 0; i < n; i++) {
    let x;
    let y;
    if (i < starCount) {
      // four-point sparkle (astroid)
      do {
        x = (r() - 0.5) * 0.5;
        y = (r() - 0.5) * 0.5;
      } while (Math.sqrt(Math.abs(x)) + Math.sqrt(Math.abs(y)) > Math.sqrt(0.24));
      x += 0.62;
      y += 0.42;
    } else {
      do {
        x = (r() - 0.5) * 2.4;
        y = (r() - 0.5) * 2.4;
      } while (Math.hypot(x, y) > 1.2 || Math.hypot(x - 0.52, y - 0.2) < 1.02);
    }
    out.set([x - 0.15, y, (r() - 0.5) * 0.22], i * 3);
  }
  return rotate(out, 0, -0.3);
}

// Skills and path: a calm rolling surface.
function wave(n, r) {
  const out = new Float32Array(n * 3);
  const cols = Math.ceil(Math.sqrt(n * 1.7));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const x = ((i % cols) / (cols - 1) - 0.5) * 3.6 + (r() - 0.5) * 0.02;
    const z = (Math.floor(i / cols) / (rows - 1) - 0.5) * 2.2 + (r() - 0.5) * 0.02;
    const y = Math.sin(x * 2.1) * 0.2 + Math.cos(z * 3.2 + x) * 0.14;
    out.set([x, y, z], i * 3);
  }
  return rotate(out, 0.62, 0.3);
}

// Contact: the SW monogram, sampled from text drawn on a 2D canvas.
function monogram(n, r) {
  const out = new Float32Array(n * 3);
  const W = 560;
  const H = 260;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.fillStyle = "#fff";
  g.font = "900 210px Arial, Helvetica, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("SW", W / 2, H / 2 + 10);
  const data = g.getImageData(0, 0, W, H).data;
  const filled = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  const count = filled.length / 2;
  const scale = 2.7 / W;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(r() * count) * 2;
    out.set(
      [
        (filled[k] - W / 2 + r() * 2) * scale,
        -(filled[k + 1] - H / 2 + r() * 2) * scale,
        (r() - 0.5) * 0.3,
      ],
      i * 3
    );
  }
  return out;
}

export function buildShapes(n) {
  return {
    stack: stack(n, rng(11)),
    bars: bars(n, rng(23)),
    shelf: shelf(n, rng(37)),
    orb: orb(n, rng(41)),
    crescent: crescent(n, rng(53)),
    wave: wave(n, rng(67)),
    monogram: monogram(n, rng(79)),
  };
}

// Per-particle randoms: x = morph delay, y = phase, z = size.
export function buildRandoms(n) {
  const r = rng(97);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < out.length; i++) out[i] = r();
  return out;
}
