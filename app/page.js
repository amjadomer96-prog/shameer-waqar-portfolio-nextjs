import { PROJECTS } from "@/lib/projects";
import Field from "@/components/field/Field";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import ProjectRail from "@/components/site/ProjectRail";
import CommandPalette from "@/components/site/CommandPalette";
import { Contact, Footer, Path, Skills, WorkIntro } from "@/components/site/Sections";
import PhoneScrub from "@/components/showcase/PhoneScrub";
import BrowserFlatten from "@/components/showcase/BrowserFlatten";
import IrisReveal from "@/components/showcase/IrisReveal";
import HorizontalDeck from "@/components/showcase/HorizontalDeck";

const project = (slug) => PROJECTS.find((p) => p.slug === slug);

export default function Home() {
  return (
    <>
      {/* particle field: fixed behind everything, never over the work */}
      <Field />
      <div className="relative z-10">
        <Header />
        <ProjectRail />
        <main id="main">
          <Hero />
          <WorkIntro />
          {/* each project has its own way of being shown */}
          <PhoneScrub project={project("ifund")} />
          <BrowserFlatten project={project("lds-library")} />
          <IrisReveal project={project("amariya")} />
          <HorizontalDeck project={project("safalife")} />
          <Skills />
          <Path />
          <Contact />
        </main>
        <Footer />
      </div>
      <CommandPalette />
    </>
  );
}
