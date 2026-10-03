// Every project has its own accent colour, its own particle shape in the
// background field, and its own showcase component (see components/showcase).
// Media in /public/work was captured from the live sites and the app builds.

export const PROJECTS = [
  {
    slug: "ifund",
    index: "01",
    name: "iFund",
    kind: "Funding marketplace app",
    role: "Mobile developer, with the iFund team",
    year: "2026",
    accent: "#35d6a0",
    shape: "bars",
    summary:
      "AI-matched funding for property and business. Borrowers post a request, lenders get matched leads, and both sides talk inside the app.",
    points: [
      "Built in Expo and React Native, from the Figma designs to working screens.",
      "Borrower and lender flows: requests, matches, chats, notifications, settings.",
      "Supabase auth and data, TanStack Query caching, push notifications, subscriptions.",
    ],
    stack: ["React Native", "Expo", "Supabase", "TanStack Query"],
    live: "https://www.ifund.realestate",
    domain: "ifund.realestate",
    // scroll-scrubbed through the phone, one step per screen
    screens: [
      { src: "/work/ifund/app/01-splash.jpg", label: "Launch", line: "The app opens on the iFund brand." },
      { src: "/work/ifund/app/02-requests.jpg", label: "Post a request", line: "A borrower creates a funding request in a three-step form." },
      { src: "/work/ifund/app/03-matches.jpg", label: "Get matched", line: "Lenders are matched on amount, location and funding type." },
      { src: "/work/ifund/app/04-lender.jpg", label: "Review the lender", line: "Profiles show funding range, regions and verification." },
      { src: "/work/ifund/app/05-messages.jpg", label: "Talk in the app", line: "Both sides message without leaving iFund." },
      { src: "/work/ifund/app/06-leads.jpg", label: "Lenders get leads", line: "The lender dashboard delivers each new match as a lead." },
    ],
  },
  {
    slug: "lds-library",
    index: "02",
    name: "LDS Library",
    kind: "Design reference library",
    role: "Design and build",
    year: "2026",
    accent: "#93a5ff",
    shape: "shelf",
    summary:
      "A searchable library of 225+ hand-picked design resources for Legit Design Studio, with a weekly newsletter that assembles itself.",
    points: [
      "Static Astro site: 51 topic pages, 8 role toolkits, and a Finder that keeps every filter in the URL.",
      "Command palette search on every page, opened with Ctrl K or /.",
      "Newsletter and submission endpoints as Vercel functions, sending through Resend.",
    ],
    stack: ["Astro", "TypeScript", "Vercel Functions", "Resend"],
    live: "https://lds-library.vercel.app",
    domain: "lds-library.vercel.app",
    video: "/work/lds-library/walkthrough.mp4",
    poster: "/work/lds-library/poster.jpg",
    mobile: "/work/lds-library/m-home.jpg",
  },
  {
    slug: "amariya",
    index: "03",
    name: "Amariya",
    kind: "Voice-guided sales site",
    role: "Front-end build",
    year: "2026",
    accent: "#f2a65e",
    shape: "orb",
    summary:
      "A talking website for an AI hotel receptionist. Visitors press the orb and speak, and the voice agent walks them through the page.",
    points: [
      "The voice agent drives the page through client tools: it scrolls, fills in hotel details, estimates ROI and books demos.",
      "A WebGL particle field that reshapes for every section, plus pinned scroll scenes.",
      "Smooth scrolling on desktop; touch devices and reduced motion keep native scrolling.",
    ],
    stack: ["JavaScript", "WebGL", "ElevenLabs", "Lenis"],
    live: "https://aria-hotel-website.vercel.app",
    domain: "aria-hotel-website.vercel.app",
    video: "/work/amariya/walkthrough.mp4",
    poster: "/work/amariya/poster.jpg",
    mobile: "/work/amariya/m-home.jpg",
  },
  {
    slug: "safalife",
    index: "04",
    name: "SafaLife",
    kind: "Habit-building app, gamified",
    role: "Mobile screens and API",
    year: "2026",
    accent: "#c08bff",
    shape: "crescent",
    summary:
      "An Islamic habit-building app around Salah, Quran, Dhikr and Charity. Streaks, points and rewards make consistency feel like progress, not pressure.",
    points: [
      "Designed and built the mobile screens for daily habit tracking and rewards.",
      "Navigation flows that connect streaks, points and progress states.",
      "Node, Express and MongoDB API with scheduled jobs for the daily rollover and reminders.",
    ],
    stack: ["Flutter", "Node.js", "Express", "MongoDB"],
    live: null,
    domain: null,
    // slides sideways as the page scrolls; each card adds to the points counter
    deck: [
      { src: "/images/shot-salah.jpg", label: "Salah", w: 520, h: 650, points: 50 },
      { src: "/images/shot-quran.jpg", label: "Quran", w: 520, h: 924, points: 40 },
      { src: "/images/shot-dhikr.jpg", label: "Dhikr", w: 520, h: 924, points: 30 },
      { src: "/images/shot-charity.jpg", label: "Charity", w: 520, h: 924, points: 60 },
      { src: "/images/shot-points.jpg", label: "Points", w: 520, h: 924, points: 50 },
      { src: "/images/shot-iftar.jpg", label: "Iftar", w: 520, h: 650, points: 20 },
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
    line: "Next.js, React Three Fiber, Motion and Lenis.",
    href: "https://github.com/amjadomer96-prog/shameer-waqar-portfolio-nextjs",
  },
];
