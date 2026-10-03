# Shameer Waqar — Portfolio

Built with **Next.js 16**, **React Three Fiber** (three.js), **Motion**,
**Lenis** and **Tailwind CSS 3**.

The rule behind the design: **the work is always sharp.** Every project
screen and recording is a normal image or video in the page. The 3D layer
sits behind the content and never covers it.

## How each project is shown

Each project gets its own scroll choreography, accent colour and particle shape.

| Project | Showcase | Component | Particle shape |
|---|---|---|---|
| iFund | A pinned phone that steps through six real app screens, one flow step per screen | `showcase/PhoneScrub.js` | Rising bars |
| LDS Library | A browser window that arrives tilted in 3D, lays flat, then fills the screen while the walkthrough plays | `showcase/BrowserFlatten.js` | A wall of cards |
| Amariya | A voice orb that opens into the site while a transcript line appears word by word | `showcase/IrisReveal.js` | A breathing orb |
| SafaLife | Screens slide sideways as you scroll, filling a points counter and a seven-day streak | `showcase/HorizontalDeck.js` | A crescent |

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

- **Command palette**: `Ctrl K`, `Cmd K` or `/` to jump to any section or
  project, copy the email address or open a link. It is also the menu on
  small screens.
- **Project rail** on wide screens to jump between projects.
- **Smooth scrolling** with Lenis on desktop, driven from Motion's frame loop.
- **Reduced motion or no WebGL2**: no canvas, nothing pinned, all content
  shown in normal flow.

## Where to edit

- `lib/projects.js` — projects: copy, stack, links, accent, media.
- `lib/profile.js` — skills, experience, education.
- `lib/site.js` — email, phone and social links.
- `public/work/` — app screens and site recordings.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy

The repo is linked to Vercel; pushing to `main` redeploys
`shameer-waqar-portfolio-nextjs.vercel.app`.
