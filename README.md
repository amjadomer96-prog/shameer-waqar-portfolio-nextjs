# Shameer Waqar — Portfolio (Next.js)

A personal portfolio built with **Next.js 16 (App Router)** and **Tailwind CSS**.
Blueprint / build-log design concept — same visual identity as the original
HTML version, now as a proper React project you can extend and redeploy.

## What's inside

- `app/` — Next.js App Router pages, layout, and global styles
- `components/` — one component per section (Nav, Hero, Stack, Experience,
  Project, Education, Contact, Footer) plus `ScrollEffects.js` for the
  reveal-on-scroll and typewriter effects
- `public/images/` — real SafaLife app screenshots and app icon
- `app/icon.png` — site favicon (an "SW" monogram)

Your **GitHub** (`github.com/amjadomer96-prog`) and **LinkedIn**
(`linkedin.com/in/shameer-waqar-85482834a`) are linked in the nav bar, the
hero spec sheet, and the contact section.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (recommended, free)

**Option A — GitHub (easiest):**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Leave all settings as default (Vercel auto-detects Next.js) and click **Deploy**.
4. You'll get a live `your-project.vercel.app` URL in about a minute.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel
```
Follow the prompts — it'll deploy straight from this folder.

## Editing content

- Update your name, roles, bullets, and links in the files under `components/`
  — everything is plain JSX text, no CMS needed.
- To add more projects, duplicate the pattern in `components/Project.js`.
- Colors and fonts live in `tailwind.config.js` and `app/globals.css` if you
  want to adjust the palette.

## Notes

- Images are served through `next/image` for automatic optimization.
- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts via a
  `<link>` tag in `app/layout.js` — no extra config needed.
