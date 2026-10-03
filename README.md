# Shameer Waqar — Portfolio (Next.js)

A one-page portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS 3**,
**Motion** and a small **React Three Fiber** scene. Light and dark mode follow
the visitor's OS setting.

## What's on the page

| Section | What it does |
|---|---|
| Hero | 3D stack of real project screens (WebGL). Panels fly in, follow the pointer, lift on hover, fan apart on scroll, and jump to their case study on click. |
| Recent work | Sticky card stack. Each card plays a muted walkthrough of the live site, with a phone view floating in 3D. |
| SafaLife | Draggable 3D carousel of the app's store screens (keyboard and buttons too). |
| Stack | Bento grid with pointer tilt and spotlight borders, plus a tool-logo marquee. |
| Experience | Timeline that draws itself as you scroll. |
| Education | Staggered list. |
| Contact | 3D business card that tilts and flips to show contact details. |
| Footer | Outlined name that fills in as you scroll. |

Everything respects `prefers-reduced-motion`: the WebGL scene is replaced by a
static CSS 3D stack, videos don't autoplay, and transform animations are skipped.

## Where things live

- `lib/projects.js` — **edit this to add or change projects** (copy, stack,
  links, media). The hero 3D panels read from it too.
- `lib/site.js` — email, phone, GitHub and LinkedIn links.
- `components/` — one file per section; interactive pieces sit in subfolders
  (`hero/`, `work/`, `safalife/`, `contact/`, `experience/`, `footer/`).
- `components/motion/` — shared animation helpers (reveal, split headline,
  magnetic button, tilt, smooth scroll, reduced-motion hook).
- `app/globals.css` — color tokens for light and dark mode, buttons, cards.
- `public/work/` — screenshots, phone views, posters and MP4 walkthroughs,
  captured from the live sites.

## Adding a project

1. Put a desktop screenshot (`home.jpg`), a phone screenshot (`m-home.jpg`),
   a short muted MP4 (`walkthrough.mp4`) and its first frame (`poster.jpg`)
   in `public/work/<slug>/`.
2. Add an entry to `PROJECTS` in `lib/projects.js`.
3. Optionally add it to `HERO_PANELS` to show it in the 3D hero.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

The repo is linked to Vercel; pushing to `main` redeploys
`shameer-waqar-portfolio-nextjs.vercel.app`. For a fresh project, import the
repo at [vercel.com/new](https://vercel.com/new) with default settings.
