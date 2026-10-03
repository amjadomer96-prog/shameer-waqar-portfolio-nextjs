import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/useReduced";
import { SITE_URL } from "@/lib/site";

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

const title = "Shameer Waqar | Full-stack and mobile developer";
const description =
  "Shameer Waqar builds web and mobile products with MERN, Flutter and React Native. Full-stack developer at Legit Design Studio, fourth-year CS student in Karachi.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Shameer Waqar",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Shameer Waqar portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="btn btn-primary fixed left-4 top-3 z-skip -translate-y-20 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
