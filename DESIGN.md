# Design System: Shameer Waqar Portfolio

## 1. Visual Theme & Atmosphere

A dark, quiet stage for real product work. Density is gallery-airy (3): long
sections, wide margins and one idea per screen. Variance is offset-asymmetric
(6): left-aligned heroes, split columns weighted toward the work, and a
staggered screen grid on the case studies. Motion is cinematic but subordinate
(7): a WebGL particle field morphs between shapes behind the page, and each
project has its own scroll choreography. The atmosphere is a lit workbench at
night: the screens are the brightest things in the room.

The rule above all others: **the work is always sharp.** App screens and site
recordings are plain images and video at full resolution. Nothing translucent,
blurred or 3D ever sits on top of them.

## 2. Color Palette & Roles

- **Night Canvas** (#0A0B0D): page background. Never pure black.
- **Raised Surface** (#111317): browser frames, the command palette.
- **Raised Surface 2** (#191C21): browser bars, hover fills.
- **Warm Paper Ink** (#EDECE8): primary text and the primary button fill.
- **Steel Muted** (#9297A0): secondary text, labels and metadata. Passes 4.5:1 on the canvas.
- **Hairline** (Warm Paper Ink at 10%): every divider and border.
- **Phone Bezel** (#15171C): device frames around app screens.
- **One accent at a time.** The base is **Soft Periwinkle** (#7EA2FF). Each
  project section and case study swaps it for the product's own color, and only
  that color is on screen there:
  - **iFund Mint** (#35D6A0)
  - **LDS Lavender Blue** (#93A5FF)
  - **Amariya Amber** (#F2A65E)
  - **SafaLife Lilac** (#C08BFF)

  The accent marks state and identity: the active nav item, focus rings,
  list bullets, the current step, the project kind label. It is never used for
  large fills or glows.

## 3. Typography Rules

- **Display:** Geist, semibold, tracked tight (-0.045em to -0.055em) with
  0.92 to 1.0 leading. Sizes use `clamp()`; the hero tops out at 6.1rem.
  Hierarchy comes from weight and color (ink against muted) as much as size.
- **Body:** Geist regular, 15 to 18px, relaxed leading, at most 60 to 65
  characters per line. Secondary copy steps down to Steel Muted.
- **Mono:** Geist Mono for labels (12px, uppercase, +0.14em tracking),
  periods, counters, step numbers and keyboard hints. All counters use
  tabular figures.
- Headings balance their lines (`text-wrap: balance`); paragraphs use
  `text-wrap: pretty`.
- **Banned:** Inter, system serif faces, gradient text, all-caps body copy.

## 4. Component Stylings

- **Buttons:** 44px tall on touch layouts (36px from md up for the small size),
  10px corners, no shadow, no glow. Primary is an ink fill with canvas text.
  Ghost is a hairline outline. Accent is a 10% accent tint with a 40% accent
  border. All scale to 0.97 when pressed.
- **Chips:** pill-shaped, hairline border, 4% ink fill, mono 12px. Used only for
  the stack list.
- **Cards:** not used. Groups are separated by hairline top borders and
  space. Elevation is reserved for the browser frame, phone frames and the
  palette, where it explains that something is a device or a layer.
- **Media frames:** 14px corners for browser windows; phone bezels with 5 to
  7px of padding and rounded corners that match the device.
- **Command palette:** a native dialog with a 14px radius, a 72% canvas
  backdrop, a 160ms entrance and icon rows with an accent bar on the active row.
- **Lists:** feature lists use a mono "+" in the accent color as the bullet.

## 5. Layout Principles

- One content column, 1240px wide, with `clamp(20px, 5vw, 72px)` gutters.
- Heroes are left-aligned. The particle cloud takes whatever space the text
  block leaves on the right (`data-field-clear`).
- Sections are separated by a hairline and 7 to 10rem of vertical space.
- Splits are uneven on purpose (0.7fr to 1.9fr, 1.25fr to 1fr). There is no
  row of three equal cards anywhere.
- Full-height frames use `100dvh` and `min-h-[100dvh]`, never `h-screen`.
- Below 768px every split collapses to one column. App screens become a
  swipeable row instead of a shrunken grid. Nothing scrolls sideways except
  rows that are meant to.
- Every interactive element has at least a 44px target on touch layouts.

## 6. Motion & Interaction

- **Curves:** `land` (cubic-bezier 0.16, 1, 0.3, 1) for reveals and `snap`
  (0.2, 0, 0, 1) for controls. Springs where physics reads better: the iFund
  phone steps at stiffness 150 and damping 20, and the nav marker at 400 and 30.
- **Reveals:** a 14px rise, a 6px blur and a fade over 0.45s, once per element,
  staggered by 40 to 60ms in lists. Content on screen at load uses the CSS
  `.rise` animation, so it never waits for JavaScript.
- **Scroll choreography:** one per project (phone scrub, browser flatten, iris
  reveal, horizontal deck), all driven by scroll position so scrolling back
  lands on the same frame.
- **Ambient:** the particle field breathes and morphs, turns toward the pointer
  with some weight and leans with scroll speed. The skills globe spins slowly
  and can be dragged.
- **Pointer:** the two main calls to action (hero and contact) lean toward the
  mouse, clamped to 10px. The work index shows a preview of the hovered
  project above the pointer, tilting with its speed. Case-study screens swing
  up into place in 3D and lean toward the pointer, always settling flat.
- **Page to page:** a cross-document view transition lifts the old page away
  and settles the new one in. The footer closes on the name set full width,
  its letters turning up out of the baseline.
- Entrances and scroll scenes animate only `transform`, `opacity` and
  `filter`; controls fade their colors. Video and the globe pause off screen,
  and the canvas stops when the tab is hidden.
- **Reduced motion:** no canvas, no pinning and no entrance animation; every
  section renders in normal flow.

## 7. Anti-Patterns (Banned)

- No emojis, no Inter, no pure black (#000000) surfaces.
- No neon glows, glassmorphism over content, or gradient text.
- No more than one accent color on screen.
- Nothing may cover, blur or tint a project screen or recording.
- No rows of three equal cards; no centered hero.
- No filler copy ("Scroll to explore", bouncing chevrons) and no marketing
  clichés ("elevate", "seamless", "unleash", "next-gen").
- No "it's not X, it's Y" sentences. Copy is first person, specific and
  checkable: real screen counts, real stacks, real dates.
- No placeholder names, stock photos or invented numbers.
