import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedResearch from "../components/FeaturedResearch";
import Projects from "../components/Projects";
import Skills from "@/components/Skills";
import Experience from "../components/Experience";
import Connect from "../components/Connect";

export default function Home() {
  return (
    <main>

      <Hero />
     
      <About />
      <Experience />
      <FeaturedResearch />
      <Projects />
      <Skills />
       <Connect />

    </main>
  );
}
  