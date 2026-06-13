import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Publications from "@/components/Publications";
import FilmsMarquee from "@/components/FilmsMarquee";
import News from "@/components/News";
import Blog from "@/components/Blog";
import Patents from "@/components/Patents";
import Footer from "@/components/Footer";
import SectionBreak from "@/components/SectionBreak";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <About />

      <SectionBreak
        src="https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=2200&q=85"
        caption="A datacenter hums at 256 GPUs. Somewhere inside, a model learns to forget."
      />

      <Timeline />

      <SectionBreak
        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=2200&q=85"
        caption="Every paper is an argument with the field. Every result is a vote."
        align="right"
      />

      <Publications />

      <SectionBreak
        src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=85"
        caption="On set, a face is rebuilt one pixel at a time. In a lab, so is reality."
      />

      <FilmsMarquee />

      <SectionBreak
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85"
        caption="The frontier moves. Latest, here."
        align="center"
      />

      <News />
      <Blog />
      <Patents />
      <Footer />
    </main>
  );
}
