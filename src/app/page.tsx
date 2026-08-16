import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Writing from "@/components/sections/Writing";

/**
 * Section order is the narrative: hook, proof, person, capability, history,
 * voice, call to action. Work comes before About deliberately — a visitor
 * decides whether to care about you based on what you've built.
 *
 * To drop a section: remove it here and delete its entry in
 * src/data/navigation.ts (the navbar scroll-spy reads that list).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Writing />
      <Contact />
    </>
  );
}
