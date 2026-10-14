# Shameer Waqar: portfolio

Built with **Next.js 16**, **React Three Fiber** (three.js), **Motion**,
**Lenis** and **Tailwind CSS 3**.

The rule behind the design: **the work is always sharp.** Every project
screen and recording is a normal image or video in the page. The 3D layer
sits behind the content and never covers it.

## How each project is shown

Each project gets its own scroll choreography, accent colour and particle shape.

| Project | Showcase | Component | Particle shape |
|---|---|---|---|
| iFund | A pinned phone that steps through nine real app screens, one flow step per screen | `showcase/PhoneScrub.js` | Rising bars |
| LDS Library | A browser window that arrives tilted in 3D, lays flat, then fills the screen while the walkthrough plays | `showcase/BrowserFlatten.js` | A wall of cards |
| Amariya | A voice orb that opens into the site while a transcript line appears word by word | `showcase/IrisReveal.js` | A breathing orb |
| SafaLife | Screens slide sideways as you scroll, filling a points counter and a seven-day streak | `showcase/HorizontalDeck.js` | A crescent |

Under each showcase, `ProjectDetails` lists the role, the stack and every
feature group from `lib/projects.js`, and links to the project's case study.

## Case studies

Every project also has its own page at `/work/<slug>` (`app/work/[slug]/page.js`):
the brief, every screen or the site recording at full size (`components/work/CaseMedia.js`),
the result, the full feature list and a link to the next case study. The copy
comes from the case-study fields in `lib/projects.js`. Only the four slugs are
generated; anything else under `/work/` is a 404.

## Search and sharing

Everything is built from the same data the pages render (`lib/seo.js`):

- A title, description, canonical URL and Open Graph and Twitter tags on every page.
- JSON-LD: Person, WebSite, ProfilePage and FAQPage on the home page; WebPage,
  CreativeWork and BreadcrumbList on each case study.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `favicon.ico`, an
  Apple touch icon and `llms.txt`, a plain-text summary for AI assistants.
- Security headers in `next.config.mjs`.
- Link-preview images in `public/og/`, rendered from the real screens by
  `npm run og`.
- Captions on both walkthrough videos, describing what is on screen.
- The hero entrance is CSS, so the headline paints before any JavaScript runs.

## The skills globe

`components/site/Skills3D.js` places every skill on a sphere and projects it
each frame, so nearer labels are larger and brighter. It spins on its own,
tilts to the active group as the page scrolls, and can be dragged. The
particle field draws the sphere and its orbits behind the labels.

## The particle field

`components/field/` is one three.js draw call: about 18,000 points (7,000 on
touch devices) that morph between shapes as the page scrolls.

- Sections opt in with `fieldProps({ shape, accent, anchor, alpha })` from
  `lib/field.js`. The cloud holds a section's shape while it is pinned and
  morphs to the next one in the gap between sections.
- The morph is computed in the vertex shader from scroll position alone, so
  scrolling backwards lands on exactly the same frame. Plain WebGL2, so it
  runs in every current browser.
- Shapes are generated in `shapes.js` (no model files). Add a generator there
  to add a shape.
- Below 1024px the cloud only sits where a section reserves space for it;
  elsewhere it becomes a faint backdrop, so text never rests on it.

## Other features

- **Navigation**: the header marks the section you are in, shows scroll
  progress, and keeps the URL in sync (`#amariya`, `#contact`), so any
  section can be linked to directly.

- **Command palette**: `Ctrl K`, `Cmd K` or `/` to jump to any section,
  project or case study, copy the email address or open a link. Every row has an icon, the
  active row is marked, and a footer shows the keys and the result count. It
  is also the menu on small screens, where it opens without raising the
  keyboard.
- **Project rail** on wide screens to jump between projects.
- **Smooth scrolling** with Lenis on desktop, driven from Motion's frame loop.
- **Reduced motion**: no canvas, and the showcases and skills section drop
  their scroll animation and render in normal flow (the iFund phone still
  steps through its screens, without the turn and rise).
- **No WebGL2**: the particle canvas is skipped; everything else works as usual.

## Accessibility and UX checks

Measured in a browser at phone, tablet and desktop sizes:

- Text contrast is at least 4.5:1 and nothing readable is under 12px.
- Controls are at least 44px on touch layouts and 24px on desktop.
- Jumps move keyboard focus to the section; the palette has a visible close
  button and 44px rows.
- The SafaLife deck also responds to a sideways swipe on touch screens.
- Media below the fold waits until its section is near (`motion/useNear.js`).
- On wide screens the particle cloud measures where a section's text ends
  (`data-field-clear`) and fits into the space left over.

## Where to edit

- `lib/projects.js` — projects: copy, stack, links, accent, media.
- `lib/profile.js` — about text, skills, experience, education, FAQ.
- `lib/site.js` — email, phone and social links.
- `public/work/` — app screens and site recordings.

## Run it locally

```bash
npm install
npm run dev
```

## Test

`tests/seo.test.mjs` checks a running build: titles, descriptions, canonicals,
structured data, robots, sitemap, icons, llms.txt, headers, list markup and
captions. It uses Node's built-in test runner, so there is nothing to install.

```bash
npm run build && npm start
npm test                     # against http://localhost:3000
SEO_BASE_URL=https://shameer-waqar-portfolio-nextjs.vercel.app npm test
```

## Deploy

The repo is linked to Vercel; pushing to `main` redeploys
`shameer-waqar-portfolio-nextjs.vercel.app`.
