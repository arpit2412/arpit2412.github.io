import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="max-w-3xl font-display text-d-lg font-semibold">{title}</h2>
      {lede && <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">{lede}</p>}
    </Reveal>
  );
}
