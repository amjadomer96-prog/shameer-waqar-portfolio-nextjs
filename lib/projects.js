// Projects shown in the 3D archive. Each one is frozen in its own ice block;
// `frozen` is the screen texture inside the block. Media in /public/work was
// captured from the live sites and the app builds.

export const PROJECTS = [
  {
    slug: "ifund",
    code: "PROJECT_01",
    name: "iFund",
    kind: "Funding marketplace app",
    date: "07.2026",
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
    frozen: "/work/ifund/m-home.jpg",
  },
  {
    slug: "lds-library",
    code: "PROJECT_02",
    name: "LDS Library",
    kind: "Design reference library",
    date: "10.2026",
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
    frozen: "/work/lds-library/m-home.jpg",
  },
  {
    slug: "amariya",
    code: "PROJECT_03",
    name: "Amariya",
    kind: "Voice-guided sales site",
    date: "09.2026",
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
    frozen: "/work/amariya/m-home.jpg",
  },
  {
    slug: "safalife",
    code: "PROJECT_04",
    name: "SafaLife",
    kind: "Habit-building app, gamified",
    date: "04.2026",
    summary:
      "An Islamic habit-building app around Salah, Quran, Dhikr and Charity. Streaks, points and rewards make consistency feel like progress, not pressure.",
    points: [
      "Designed and built the mobile screens for daily habit tracking and rewards.",
      "Built the navigation flows that connect streaks, points and progress states.",
      "Node, Express and MongoDB API with scheduled jobs for the daily rollover and reminders.",
    ],
    stack: ["Flutter", "Node.js", "Express", "MongoDB"],
    live: null,
    domain: "safalife",
    source: null,
    video: null,
    poster: null,
    frozen: "/work/safalife/m-home.jpg",
    gallery: [
      { src: "/images/shot-salah.jpg", label: "Salah", w: 520, h: 650 },
      { src: "/images/shot-quran.jpg", label: "Quran", w: 520, h: 924 },
      { src: "/images/shot-dhikr.jpg", label: "Dhikr", w: 520, h: 924 },
      { src: "/images/shot-points.jpg", label: "Points", w: 520, h: 924 },
    ],
  },
];

export const ALSO_SHIPPED = [
  {
    name: "LDS Live Status",
    line: "Vercel function that publishes designer presence from Figma as JSON.",
    href: "https://github.com/amjadomer96-prog/lds-live-status",
  },
  {
    name: "This portfolio",
    line: "Next.js, React Three Fiber and a lot of procedural ice.",
    href: "https://github.com/amjadomer96-prog/shameer-waqar-portfolio-nextjs",
  },
];
