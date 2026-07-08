import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import { education } from "@/data/experience";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="About"
          title="Research-grade ideas, shipped at production scale."
        />

        <div className="grid gap-16 md:grid-cols-[3fr,2fr]">
          <div className="space-y-6">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-prose text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="border-l border-edge pl-8">
              <p className="eyebrow mb-6">Education</p>
              <ul className="space-y-7">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="font-display font-medium leading-snug">{e.degree}</p>
                    <p className="mt-1 text-sm text-muted">{e.org}</p>
                    <p className="mt-1 font-mono text-2xs uppercase tracking-wider text-faint">{e.dates}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
