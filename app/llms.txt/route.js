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
