// Search and sharing: page metadata and the schema.org graph.
// Everything here is built from the same data the pages render, so search
// results, link previews and the page itself never disagree.

import { PROJECTS } from "@/lib/projects";
import { EDUCATION, SKILL_GROUPS } from "@/lib/profile";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

export const NAME = "Shameer Waqar";
export const JOB_TITLE = "Full Stack Developer";

export const HOME_TITLE = "Shameer Waqar | Full Stack & Mobile Developer in Karachi";
export const HOME_DESCRIPTION =
  "Full stack and mobile developer in Karachi. I build React Native and Flutter apps, Next.js sites and the Node.js APIs behind them.";

export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "Shameer Waqar, full stack and mobile developer" };

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

export const caseStudyUrl = (slug) => `${SITE_URL}/work/${slug}`;

// Open Graph and Twitter tags for one page. Next.js replaces these objects per
// page rather than merging them, so every page sends the full set.
export function social({ title, description, url, images = [OG_IMAGE], type = "website" }) {
  return {
    openGraph: { title, description, url, siteName: NAME, locale: "en_US", type, images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME,
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  jobTitle: JOB_TITLE,
  description: HOME_DESCRIPTION,
  worksFor: { "@type": "Organization", name: "Legit Design Studio", url: "https://legitdesign.studio" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "UIT University" },
    { "@type": "EducationalOrganization", name: "NED Academy" },
  ],
  hasCredential: EDUCATION.filter((e) => e.title.startsWith("Diploma")).map((e) => ({
    "@type": "EducationalOccupationalCredential",
    name: e.title,
    credentialCategory: "Diploma",
    recognizedBy: { "@type": "EducationalOrganization", name: "NED Academy" },
  })),
  knowsAbout: SKILL_GROUPS.flatMap((g) => g.skills),
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: NAME,
  description: HOME_DESCRIPTION,
  inLanguage: "en",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
};

const graph = (nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeJsonLd(faq) {
  const modified = new Date().toISOString();
  return graph([
    person,
    website,
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: HOME_TITLE,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      mainEntity: { "@id": PERSON_ID },
      dateModified: modified,
      hasPart: PROJECTS.map((p) => ({ "@id": `${caseStudyUrl(p.slug)}#work` })),
    },
    ...PROJECTS.map(projectNode),
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ]);
}

function projectNode(p) {
  const image = p.screens?.[0]?.src ?? p.poster ?? p.deck?.[0]?.src;
  return {
    "@type": "CreativeWork",
    "@id": `${caseStudyUrl(p.slug)}#work`,
    name: p.name,
    headline: `${p.name}: ${p.headline}`,
    description: p.summary,
    url: caseStudyUrl(p.slug),
    image: `${SITE_URL}${image}`,
    dateCreated: p.year,
    genre: p.kind,
    keywords: p.stack.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    ...(p.live ? { sameAs: p.live } : {}),
  };
}

export function caseStudyJsonLd(p) {
  const url = caseStudyUrl(p.slug);
  return graph([
    person,
    website,
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: p.seo.title,
      description: p.seo.description,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      about: { "@id": `${url}#work` },
      author: { "@id": PERSON_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    projectNode(p),
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: p.name, item: url },
      ],
    },
  ]);
}
