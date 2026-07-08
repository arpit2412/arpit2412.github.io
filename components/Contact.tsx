import { ArrowUpRight, Github, GraduationCap, Instagram, Linkedin, Mail, Youtube, Clapperboard } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/arpit2412", href: profile.links.linkedin },
  { icon: Github, label: "GitHub", value: "arpit2412", href: profile.links.github },
  { icon: GraduationCap, label: "Scholar", value: "Publications", href: profile.links.scholar },
  { icon: Clapperboard, label: "IMDb", value: "Film credits", href: profile.links.imdb },
  { icon: Youtube, label: "YouTube", value: "@AIParameters", href: profile.links.youtube },
  { icon: Instagram, label: "Instagram", value: "@AIParameters", href: profile.links.instagram },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-edge py-28 md:py-40">
      {/* closing glow, painted as a gradient (no blur filter) */}
      <div className="cta-glow pointer-events-none absolute inset-x-0 top-0 h-[28rem]" />

      <div className="relative mx-auto max-w-shell px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Contact</p>
          <h2 className="mx-auto max-w-3xl font-display text-d-lg font-semibold">
            Building something at the frontier?
            <br />
            <span className="text-accent">Let&apos;s talk.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Research collaborations, advisory work, speaking, or ambitious products. I&apos;m
            always open to a good conversation about hard AI problems.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-medium text-base transition-transform duration-300 ease-spring hover:scale-[1.03]"
          >
            {profile.email}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-3">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="card-lift inline-flex items-center gap-2.5 rounded-full border border-edge bg-card px-5 py-2.5 text-sm"
              >
                <Icon size={15} className="text-accent" />
                <span className="font-medium">{label}</span>
                <span className="hidden text-faint sm:inline">{value}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-28 max-w-shell border-t border-edge px-6 pt-8">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-2xs text-faint">© {new Date().getFullYear()} Arpit Garg</p>
          <p className="font-mono text-2xs text-faint">Adelaide, Australia</p>
        </div>
      </footer>
    </section>
  );
}
