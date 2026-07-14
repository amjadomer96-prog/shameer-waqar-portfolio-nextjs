import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <Nav />
      <main id="top">
        <Hero />
        <Stack />
        <Experience />
        <Project />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
