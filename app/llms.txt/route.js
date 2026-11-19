import { PROJECTS } from "@/lib/projects";
import { ABOUT, EDUCATION, FAQ, ROLES, SKILL_GROUPS } from "@/lib/profile";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";
import { HOME_DESCRIPTION, caseStudyUrl } from "@/lib/seo";

// A plain-text summary of the site for AI assistants (llmstxt.org), built from
// the same data as the pages. Generated once at build time.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Shameer Waqar",
    "",
    `> ${HOME_DESCRIPTION}`,
    "",
    ...ABOUT.paragraphs,
    "",
    "## Case studies",
    "",
    ...PROJECTS.map((p) => `- [${p.name}](${caseStudyUrl(p.slug)}): ${p.headline}. ${p.summary}`),
    "",
    "## More work, live",
    "",
    "- [TrueKicks](https://truekicks-seven.vercel.app): a 3D sneaker shop with its own admin for products, stock, discounts, payments and orders (Next.js, Payload CMS, PostgreSQL, Three.js)",
    "- [A&A Communication](https://aa-communication.vercel.app): an online store for a phone and repair shop in Hackney, London (Next.js, Payload CMS)",
    "- [Elysium Scent](https://www.elysiumscent.com): a perfume shop that takes orders on WhatsApp, and a [walk-in 3D store](https://elysium-scent-store.vercel.app) (Next.js, React Three Fiber)",
    "- [Wiki Authority Group](https://wiki-authority-group.vercel.app): a company site with a Three.js globe and scroll-driven sections",
    "- [Legit Design Studio](https://legitdesign.studio): the studio's website, rebuilt in Next.js",
    "- [HRMS](https://lds-hrms.vercel.app): an HR management system on React and Supabase",
    "- [Revocalize concept](https://revocalize-concept.vercel.app) and [Stonebridge concept](https://stonebridge-redesign.vercel.app): design concepts built with Ubaid Qureshi",
    "",
    "## Studio",
    "",
    "With the product designer Ubaid Qureshi I run Ubaid & Shameer, a design and development studio: https://www.designdev.net (services: https://www.designdev.net/services).",
    "",
    "## Experience",
    "",
    ...ROLES.map((r) => `- ${r.title}, ${r.org} (${r.period})`),
    "",
    "## Education",
    "",
    ...EDUCATION.map((e) => `- ${e.title}, ${e.org} (${e.period})`),
    "",
    "## Skills",
    "",
    ...SKILL_GROUPS.map((g) => `- ${g.title}: ${g.skills.join(", ")}`),
    "",
    "## Questions",
    "",
    ...FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Contact",
    "",
    `- Email: ${EMAIL}`,
    `- Website: ${SITE_URL}`,
    `- GitHub: ${GITHUB_URL}`,
    `- LinkedIn: ${LINKEDIN_URL}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
