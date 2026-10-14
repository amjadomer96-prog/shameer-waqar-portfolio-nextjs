import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/useReduced";
import { SITE_URL } from "@/lib/site";
import { HOME_DESCRIPTION, HOME_TITLE, NAME, social } from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Defaults for every page. Each page sets its own canonical URL and share tags.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${NAME}` },
  description: HOME_DESCRIPTION,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  category: "technology",
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  ...social({ title: HOME_TITLE, description: HOME_DESCRIPTION, url: SITE_URL }),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0B0D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        {/* without JavaScript nothing animates in, so show everything */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}.iris-clip{clip-path:none!important}.iris-scrim{display:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="btn btn-primary fixed left-4 top-3 z-skip -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
