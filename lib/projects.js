// Every project has its own accent colour, its own particle shape in the
// background field, and its own showcase component (see components/showcase).
// Feature lists describe what is actually in each codebase.

export const PROJECTS = [
  {
    slug: "ifund",
    name: "iFund",
    kind: "Funding marketplace app",
    role: "Mobile developer. I built the complete app.",
    year: "2026",
    accent: "#35d6a0",
    shape: "bars",
    summary:
      "A two-sided marketplace for property and business funding. Borrowers post what they need, every lender match is scored, and both sides talk and close inside the app. I built the complete mobile app in React Native.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "TanStack Query", "RevenueCat", "Sentry"],
    live: "https://www.ifund.realestate",
    domain: "ifund.realestate",
    // scroll-scrubbed through the phone, one step per screen
    screens: [
      { src: "/work/ifund/app/01-splash.jpg", label: "Launch", line: "Intelligent funding for real estate, on iOS and Android." },
      { src: "/work/ifund/app/02-signin.jpg", label: "Sign in", line: "Email and password, or one tap with Google or Apple." },
      { src: "/work/ifund/app/03-signup.jpg", label: "Choose a side", line: "One account form for both roles: lender or borrower." },
      { src: "/work/ifund/app/04-dashboard.jpg", label: "Lender dashboard", line: "Exposures, match score, enquiries and the best matches of the day." },
      { src: "/work/ifund/app/05-leads.jpg", label: "Leads pipeline", line: "Every lead by stage, from first match to funded." },
      { src: "/work/ifund/app/06-filters.jpg", label: "Filter leads", line: "By location, amount, date posted and funding type." },
      { src: "/work/ifund/app/07-matches.jpg", label: "Scored matches", line: "Each request carries a match score, so the strongest leads come first." },
      { src: "/work/ifund/app/08-chats.jpg", label: "Chat", line: "Lenders and borrowers message in the app, with attachments." },
      { src: "/work/ifund/app/09-settings.jpg", label: "Security and plan", line: "Face ID, two-factor sign-in, login activity and subscription billing." },
    ],
    features: [
      {
        title: "Accounts and security",
        items: [
          "Sign-up with a lender or borrower role, email verification and password reset.",
          "Google and Apple sign-in.",
          "Face ID unlock, two-factor authentication and a login-activity log.",
        ],
      },
      {
        title: "Borrower side",
        items: [
          "Three-step onboarding and funding-request form: purpose, amount, property and timeline.",
          "Create, edit and delete requests, each with its own status.",
          "Scored lender matches with filters, lender profiles, reviews and verification badges.",
        ],
      },
      {
        title: "Lender side",
        items: [
          "Three-step onboarding with a profile preview and plan selection.",
          "Dashboard with exposures, match score, enquiries, best matches and analytics.",
          "Leads pipeline that updates in real time, with stages from match to funded.",
          "Matching preferences, lead settings and service areas.",
          "Starter, Professional and Elite plans with in-app purchase and billing.",
        ],
      },
      {
        title: "Messaging and notifications",
        items: [
          "In-app chat with attachments, presence and unread counts.",
          "Push notifications with instant, daily or weekly preferences, plus a notification centre.",
          "Help centre, contact support and an in-app rating prompt.",
        ],
      },
      {
        title: "Under the hood",
        items: [
          "About 50 screens across seven navigators, on a shared library of sheets, sliders, charts and form controls.",
          "Supabase for auth, database, storage and realtime; TanStack Query for caching and background refresh.",
          "Sentry error reporting, over-the-air updates, deep links and secure token storage.",
        ],
      },
    ],
  },
  {
    slug: "lds-library",
    name: "LDS Library",
    kind: "Design reference library",
    role: "Design and development",
    year: "2026",
    accent: "#93a5ff",
    shape: "shelf",
    summary:
      "A searchable library of 225+ hand-picked design resources for Legit Design Studio, with a weekly newsletter that assembles and sends itself.",
    stack: ["Astro", "TypeScript", "Vercel Functions", "Vercel Cron", "Resend"],
    live: "https://lds-library.vercel.app",
    domain: "lds-library.vercel.app",
    video: "/work/lds-library/walkthrough.mp4",
    poster: "/work/lds-library/poster.jpg",
    mobile: "/work/lds-library/m-home.jpg",
    features: [
      {
        title: "The library",
        items: [
          "225+ resources in six categories, 51 topic pages and 8 role-based toolkits, all generated from one data file.",
          "Home page with shelf tiles, a featured carousel, latest additions and AI essentials.",
          "One card template shared by every page and the Finder, so cards never drift apart.",
        ],
      },
      {
        title: "Search and discovery",
        items: [
          "Command palette on every page, opened with Ctrl K or /.",
          "Finder with search plus category, topic, pricing, studio-pick and saved filters, all kept in the URL.",
          "Save resources for later, a latest-additions page and an RSS feed.",
        ],
      },
      {
        title: "Automated newsletter",
        items: [
          "A weekly issue built from the data and sent by a scheduled job through Resend.",
          "Double opt-in signup with signed confirmation links, with no database to run.",
          "A web archive that always matches the email, with duplicate sends prevented.",
          "A suggest-a-resource form that emails the team.",
        ],
      },
      {
        title: "Tooling",
        items: [
          "Scripts that validate the data, check every link and fetch cover images.",
          "Static Astro pages with serverless endpoints, deployed on Vercel.",
        ],
      },
    ],
  },
  {
    slug: "amariya",
    name: "Amariya",
    kind: "Voice-guided sales site",
    role: "Front-end development",
    year: "2026",
    accent: "#f2a65e",
    shape: "orb",
    summary:
      "A talking website for an AI hotel receptionist. Visitors press the orb and speak, and the voice agent walks them through the page.",
    stack: ["JavaScript", "WebGL", "ElevenLabs", "Lenis", "HTML and CSS"],
    live: "https://aria-hotel-website.vercel.app",
    domain: "aria-hotel-website.vercel.app",
    video: "/work/amariya/walkthrough.mp4",
    poster: "/work/amariya/poster.jpg",
    mobile: "/work/amariya/m-home.jpg",
    features: [
      {
        title: "Voice agent",
        items: [
          "Visitors talk or type with an ElevenLabs voice agent from an orb on the page.",
          "The agent drives the site through client tools: it scrolls to sections, fills in hotel details, shows an ROI estimate, highlights features, recommends a plan and books a demo.",
          "A live transcript and a conversation dock that follows the visitor down the page.",
        ],
      },
      {
        title: "3D and motion",
        items: [
          "A WebGL particle field behind the whole page that reshapes for every section.",
          "A scroll story where greetings leave the orb one at a time.",
          "A pinned features scene where tags settle on a ring around the particle sphere.",
          "An eclipse behind the pricing plans, and paragraphs that light up word by word.",
        ],
      },
      {
        title: "Product details",
        items: [
          "ROI calculator driven by configurable assumptions.",
          "Demo-request form that posts to a webhook.",
          "SEO head with Open Graph and structured data, a sitemap and a 404 page.",
          "Responsive layout with touch and reduced-motion fallbacks.",
        ],
      },
    ],
  },
  {
    slug: "safalife",
    name: "SafaLife",
    kind: "Habit-building app, gamified",
    role: "Sole developer: Flutter app and Node.js API",
    year: "2026",
    accent: "#c08bff",
    shape: "crescent",
    summary:
      "An Islamic habit-building app around Salah, Quran, Dhikr and Charity. Streaks, points and rewards make consistency feel like progress, not pressure.",
    stack: ["Flutter", "Dart", "Node.js", "Express", "MongoDB", "JWT"],
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
    features: [
      {
        title: "Daily worship",
        items: [
          "Salah: prayer times from the user's location, a daily prayer log and a post-prayer checklist.",
          "Quran: a reader by Surah and Juz that keeps reading progress.",
          "Dhikr: a counter with daily targets and a catalogue of adhkar.",
          "Charity: a giving log with goals and campaigns.",
        ],
      },
      {
        title: "Progress and rewards",
        items: [
          "Points for every completed habit, with a reward screen.",
          "A home dashboard, daily progress and a detail view for each habit.",
          "Streaks across days, kept in step by a nightly rollover job.",
        ],
      },
      {
        title: "Accounts",
        items: [
          "Email sign-up plus Google, Apple and Facebook sign-in.",
          "Profile with avatar upload, a notification centre and accessibility settings.",
          "Onboarding flow and Hijri dates.",
        ],
      },
      {
        title: "API",
        items: [
          "Node.js, Express and MongoDB API with 11 route modules behind JWT authentication.",
          "Scheduled jobs for the daily rollover and reminder notifications.",
          "Prayer times and scoring calculated on the server.",
        ],
      },
    ],
  },
];

export const ALSO_SHIPPED = [
  {
    name: "LDS Live Status",
    line: "A serverless function that publishes designer presence from Figma as JSON.",
    href: "https://github.com/amjadomer96-prog/lds-live-status",
  },
  {
    name: "This portfolio",
    line: "Next.js, Three.js with custom shaders, Motion and Lenis.",
    href: "https://github.com/amjadomer96-prog/shameer-waqar-portfolio-nextjs",
  },
];
