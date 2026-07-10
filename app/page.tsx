import Hero from "@/components/Hero";
import About from "@/components/About";
import Lifecycle from "@/components/Lifecycle";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import FilmStrip from "@/components/FilmStrip";
import Timeline from "@/components/Timeline";
import Honors from "@/components/Honors";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import MindWorld from "@/components/world/MindWorld";

/**
 * The hero stays above the world as the title card. Below it the camera enters
 * the mind and does not cut again.
 *
 * Chapter order matches components/world/mindWorld.ts one-for-one. No content section
 * was dropped: FilmStrip was extracted out of Projects so that CREATE (Film & VFX) gets
 * its own chapter and its own plate, rather than being a marquee buried inside Engineering.
 */
export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <MindWorld
        sections={[
          <Timeline key="journey" />,
          <div key="about">
            <About />
            <Lifecycle />
          </div>,
          <Research key="research" />,
          <Projects key="work" />,
          <FilmStrip key="films" />,
          <Writing key="writing" />,
          <Honors key="honors" />,
          <Contact key="contact" />,
        ]}
      />
    </main>
  );
}
