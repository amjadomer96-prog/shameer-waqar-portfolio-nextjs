import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import { caseStudyUrl } from "@/lib/seo";

// The home page and one page per case study. lastModified is the build date.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.map((p) => ({
      url: caseStudyUrl(p.slug),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    })),
  ];
}
