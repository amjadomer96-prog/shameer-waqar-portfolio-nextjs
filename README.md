# Shameer Waqar — Portfolio

A scroll-driven 3D portfolio built with **Next.js 16**, **React Three Fiber**
(three.js), **Motion** and **Tailwind CSS 3**. Scrolling flies a camera through
a frozen world; the text on top is a normal HTML page, so it stays readable,
selectable by screen readers and indexable.

## The journey

| Section | In the 3D world | On the page (HUD) |
|---|---|---|
| `#top` | "SW" built from glowing voxels, frozen in an ice block on a snowfield | Role, location, about |
| `#about` | Camera orbits the monolith | Status readout |
| `#ifund` … `#safalife` | Each project is a phone with its real app screen, frozen in its own ice block | Code, name, stack, date, *Click to explore* |
| `#log` | Camera passes through an ice ring into a field of drifting nodes | Experience, education, stack |
| `#contact` | "SW" assembles from ~7,000 particles above a ring pedestal | Email, phone, channel carousel |

Clicking a block (or *Click to explore*) opens a panel with the walkthrough
video, details and links.

Everything in the scene is procedural: no 3D models, no HDR files, no font
files. Ice is `MeshPhysicalMaterial` with transmission, iridescence and a
generated frost texture; the terrain, ice shapes and point clouds come from
noise and rasterised text.

## Where things live

- `lib/projects.js` — **projects**: copy, stack, links, video, and the
  `frozen` screen image shown inside each ice block.
- `lib/profile.js` — experience, education and stack for the log.
- `lib/site.js` — email, phone and social links.
- `components/world/` — the three.js scene. `scene/Director.js` maps scroll
  position to camera keyframes, anchored to the page sections.
- `components/hud/` — the HTML overlay: sections, scramble text, loader,
  sound toggle (synthesised wind) and the project panel.

## Adding a project

1. Add a phone screenshot (`m-home.jpg`, about 600×1300), a short muted
   `walkthrough.mp4` and its first frame `poster.jpg` to `public/work/<slug>/`.
2. Add an entry to `PROJECTS` in `lib/projects.js` with a `code` like
   `PROJECT_05`. A new ice block and HUD section appear automatically.

## Accessibility and performance

- Reduced motion or no WebGL2: the 3D world is skipped and a static frost
  backdrop with the project screens is shown instead.
- three.js loads after first paint; rendering pauses when the tab is hidden;
  objects far from the camera are not drawn.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy

The repo is linked to Vercel; pushing to `main` redeploys
`shameer-waqar-portfolio-nextjs.vercel.app`.
