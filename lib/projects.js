// Single source for the hero 3D stack and the work section.
// Media in /public/work was captured from the live sites.

export const PROJECTS = [
  {
    slug: "ifund",
    name: "iFund",
    kind: "Funding marketplace app",
    year: "2026",
    summary:
      "AI-matched funding for property and business. Borrowers post funding requests, lenders get matched leads, and both sides talk in the app. I build the mobile app with the iFund team.",
    points: [
      "Building the iFund mobile app in Expo and React Native, from the Figma designs to working screens.",
      "Borrower and lender flows: funding requests, matched leads, chats, notifications and settings.",
      "Supabase auth and data, TanStack Query caching, push notifications and in-app subscriptions.",
    ],
    stack: ["React Native", "Expo", "Supabase", "TanStack Query"],
    live: "https://www.ifund.realestate",
    domain: "ifund.realestate",
    source: null,
    video: "/work/ifund/walkthrough.mp4",
    poster: "/work/ifund/poster.jpg",
    still: "/work/ifund/home.jpg",
    mobile: "/work/ifund/m-home.jpg",
  },
  {
    slug: "lds-library",
    name: "LDS Library",
    kind: "Design reference library",
    year: "2026",
    summary:
      "A searchable library of 225+ hand-picked design resources for Legit Design Studio, with a weekly newsletter that assembles itself.",
    points: [
      "Static Astro site with 51 topic pages, 8 role toolkits and a Finder that keeps every filter in the URL.",
      "Command palette search on every page, opened with Ctrl K or /.",
      "Newsletter and submission endpoints running as Vercel functions, sending through Resend.",
    ],
    stack: ["Astro", "TypeScript", "Vercel Functions", "Resend"],
    live: "https://lds-library.vercel.app",
    domain: "lds-library.vercel.app",
    source: null,
    video: "/work/lds-library/walkthrough.mp4",
    poster: "/work/lds-library/poster.jpg",
    still: "/work/lds-library/home.jpg",
    mobile: "/work/lds-library/m-home.jpg",
  },
  {
    slug: "amariya",
    name: "Amariya",
    kind: "Voice-guided sales site",
    year: "2026",
    summary:
      "A talking website for an AI hotel receptionist. Visitors press the orb and speak, and the voice agent walks them through the page.",
    points: [
      "Voice agent drives the page through client tools: it scrolls, fills in hotel details, estimates ROI and books demos.",
      "WebGL particle field that reshapes for every section, plus pinned scroll scenes.",
      "Lenis smooth scrolling on desktop; touch devices and reduced motion keep native scrolling.",
    ],
    stack: ["JavaScript", "WebGL", "ElevenLabs", "Lenis"],
    live: "https://aria-hotel-website.vercel.app",
    domain: "aria-hotel-website.vercel.app",
    source: null,
    video: "/work/amariya/walkthrough.mp4",
    poster: "/work/amariya/poster.jpg",
    still: "/work/amariya/home.jpg",
    mobile: "/work/amariya/m-home.jpg",
  },
];

// Panels in the hero 3D stack, front to back. `target` is the anchor they scroll to.
export const HERO_PANELS = [
  { src: "/work/ifund/home.jpg", target: "ifund", w: 1440, h: 900 },
  { src: "/work/lds-library/home.jpg", target: "lds-library", w: 1440, h: 900 },
  { src: "/work/amariya/home.jpg", target: "amariya", w: 1440, h: 900 },
  { src: "/images/feature-graphic.jpg", target: "project", w: 1024, h: 500 },
];

export const ALSO_SHIPPED = [
  {
    name: "LDS Live Status",
    line: "A Vercel function that watches designers' Figma files and publishes studio presence as public JSON. The Figma token never leaves the server.",
    href: "https://github.com/amjadomer96-prog/lds-live-status",
    cta: "Source",
  },
  {
    name: "This portfolio",
    line: "Next.js, Tailwind, Motion and a small React Three Fiber scene. Screens and videos are captured from the live projects.",
    href: "https://github.com/amjadomer96-prog/shameer-waqar-portfolio-nextjs",
    cta: "Source",
  },
];

export const SAFALIFE_SHOTS = [
  { src: "/images/shot-salah.jpg", label: "Salah", w: 520, h: 650 },
  { src: "/images/shot-quran.jpg", label: "Quran", w: 520, h: 924 },
  { src: "/images/shot-dhikr.jpg", label: "Dhikr", w: 520, h: 924 },
  { src: "/images/shot-charity.jpg", label: "Charity", w: 520, h: 924 },
  { src: "/images/shot-points.jpg", label: "Points", w: 520, h: 924 },
  { src: "/images/shot-iftar.jpg", label: "Iftar", w: 520, h: 650 },
];
