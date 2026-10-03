import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";

// Everything in the world is procedural: no models, no HDRs, no font files.

export const FOG_COLOR = "#c3cad3";
export const INK = "#18202b";

export const simplex = new SimplexNoise();

export function fbm2(x, y, octaves = 4) {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * simplex.noise(x * freq, y * freq);
    freq *= 2.03;
    amp *= 0.5;
  }
  return sum;
}

export const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ---------- textures ---------- */

let frostTex;
// Cloudy noise + scratches: used as bump and roughness so the ice reads frosted.
export function frostTexture() {
  if (frostTex) return frostTex;
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  g.fillStyle = "#808080";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 1500; i++) {
    const v = Math.random() < 0.5 ? 255 : 0;
    g.fillStyle = `rgba(${v},${v},${v},${0.03 + Math.random() * 0.05})`;
    g.beginPath();
    g.arc(Math.random() * size, Math.random() * size, 4 + Math.random() * 30, 0, Math.PI * 2);
    g.fill();
  }
  g.lineCap = "round";
  for (let i = 0; i < 240; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const a = Math.random() * Math.PI;
    const l = 10 + Math.random() * 90;
    g.strokeStyle = `rgba(255,255,255,${0.06 + Math.random() * 0.2})`;
    g.lineWidth = 0.5 + Math.random() * 1.5;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    g.stroke();
  }
  const img = g.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 26;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  frostTex = new THREE.CanvasTexture(c);
  frostTex.wrapS = frostTex.wrapT = THREE.RepeatWrapping;
  frostTex.anisotropy = 4;
  return frostTex;
}

let dotTex;
export function dotTexture() {
  if (dotTex) return dotTex;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.4, "rgba(255,255,255,0.8)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  dotTex = new THREE.CanvasTexture(c);
  return dotTex;
}

let shadowTex;
export function softShadowTexture() {
  if (shadowTex) return shadowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(0,0,0,0.85)");
  grd.addColorStop(0.5, "rgba(0,0,0,0.3)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  shadowTex = new THREE.CanvasTexture(c);
  return shadowTex;
}

/*
  Rasterise text on a canvas and return filled cell centres, centred and
  normalised so the text is `width` world units wide.
*/
export function rasterizeText(text, { step = 6, width = 2, font = "900 180px Arial, Helvetica, sans-serif" } = {}) {
  const W = 640;
  const H = 260;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  g.fillStyle = "#fff";
  g.font = font;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, W / 2, H / 2 + 8);
  const data = g.getImageData(0, 0, W, H).data;
  const cells = [];
  let minX = W;
  let maxX = 0;
  let minY = H;
  let maxY = 0;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 140) {
        cells.push(x, y);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  const scale = width / Math.max(1, maxX - minX);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const out = [];
  for (let i = 0; i < cells.length; i += 2) {
    out.push([(cells[i] - cx) * scale, -(cells[i + 1] - cy) * scale]);
  }
  return { cells: out, cellSize: step * scale, height: (maxY - minY) * scale };
}

/* ---------- geometry ---------- */

// Rough ice block: a subdivided box pushed around by layered noise.
export function iceBlockGeometry(w, h, d, { seed = 0, chunk = 0.12, chip = 0.018, seg = 16 } = {}) {
  const geo = new THREE.BoxGeometry(
    w,
    h,
    d,
    seg,
    Math.max(4, Math.round((seg * h) / w)),
    Math.max(4, Math.round((seg * d) / w))
  );
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const dir = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    dir.copy(v).normalize();
    const n1 = simplex.noise3d(v.x * 0.9 + seed, v.y * 0.9, v.z * 0.9);
    const n2 = simplex.noise3d(v.x * 3.1 + seed * 2, v.y * 3.1, v.z * 3.1);
    const n3 = Math.abs(simplex.noise3d(v.x * 5 + seed, v.y * 5, v.z * 5));
    v.addScaledVector(dir, n1 * chunk + n2 * chip - n3 * chip * 0.8);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

// Any geometry with normals, displaced along them (used for the ice ring).
export function roughen(geo, { seed = 0, amount = 0.08, freq = 1.6 } = {}) {
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n =
      simplex.noise3d(x * freq + seed, y * freq, z * freq) * amount +
      simplex.noise3d(x * freq * 4, y * freq * 4 + seed, z * freq * 4) * amount * 0.3;
    pos.setXYZ(i, x + nor.getX(i) * n, y + nor.getY(i) * n, z + nor.getZ(i) * n);
  }
  geo.computeVertexNormals();
  return geo;
}

export function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

export function phoneBodyGeometry(w, h, r, depth) {
  const g = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 10,
  });
  g.translate(0, 0, -depth / 2);
  return g;
}

export function screenGeometry(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRectShape(w, h, r), 10);
  const uv = g.attributes.uv;
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  }
  return g;
}

// Crop a texture like CSS object-fit: cover for a target aspect ratio.
export function coverTexture(tex, targetAspect) {
  const img = tex.image;
  if (!img) return tex;
  const aspect = img.width / img.height;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  if (aspect > targetAspect) {
    const s = targetAspect / aspect;
    tex.repeat.set(s, 1);
    tex.offset.set((1 - s) / 2, 0);
  } else {
    const s = aspect / targetAspect;
    tex.repeat.set(1, s);
    tex.offset.set(0, 1 - s); // keep the top of the screen
  }
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/* ---------- materials ---------- */

export function iceMaterial(overrides = {}) {
  const frost = frostTexture();
  return new THREE.MeshPhysicalMaterial({
    color: "#f1f6fb",
    transmission: 1,
    thickness: 0.9,
    roughness: 0.22,
    roughnessMap: frost,
    bumpMap: frost,
    bumpScale: 0.2,
    ior: 1.31,
    iridescence: 0.8,
    iridescenceIOR: 1.25,
    iridescenceThicknessRange: [100, 600],
    clearcoat: 0.45,
    clearcoatRoughness: 0.2,
    attenuationColor: new THREE.Color("#cfe0f0"),
    attenuationDistance: 3.5,
    envMapIntensity: 1.05,
    ...overrides,
  });
}
