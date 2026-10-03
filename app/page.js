import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Project from "@/components/Project";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <Project />
        <Stack />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
