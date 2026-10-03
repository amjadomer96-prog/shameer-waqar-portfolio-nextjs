import { PROJECTS } from "@/lib/projects";
import Experience from "@/components/hud/Experience";
import HudFrame from "@/components/hud/HudFrame";
import ProjectDialog from "@/components/hud/ProjectDialog";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  LogSection,
  ProjectSection,
} from "@/components/hud/Sections";

export default function Home() {
  return (
    <Experience>
      <HudFrame />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <div id="work">
          {PROJECTS.map((p, i) => (
            <ProjectSection key={p.slug} project={p} index={i} />
          ))}
        </div>
        <LogSection />
        <ContactSection />
      </main>
      <ProjectDialog />
    </Experience>
  );
}
