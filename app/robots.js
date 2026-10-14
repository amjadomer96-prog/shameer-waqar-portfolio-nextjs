import { SITE_URL } from "@/lib/site";

// Everything is public. AI crawlers are welcome too: llms.txt is written for them.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
