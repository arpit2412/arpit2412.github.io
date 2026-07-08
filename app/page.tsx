import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Honors from "@/components/Honors";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <About />
      <Research />
      <Projects />
      <Timeline />
      <Honors />
      <Writing />
      <Contact />
    </main>
  );
}
