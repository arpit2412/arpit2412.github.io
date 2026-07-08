import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const stages = [
  {
    verb: "Pretrain",
    head: "Frontier models from scratch",
    body: "Data pipelines, tokenizers, and distributed training runs on a 256× NVIDIA H200 cluster. Stability, throughput, and training methodology owned end to end.",
    proof: "A$1.2M ResetData grant",
  },
  {
    verb: "Fine-tune",
    head: "Alignment and PEFT",
    body: "LoRA with learnable rank, regularizers that stop fine-tuning from forgetting, and vision-language alignment that stays stable under pressure.",
    proof: "NeurIPS 2026 submissions · US patent filed",
  },
  {
    verb: "Deploy",
    head: "Production at platform scale",
    body: "Trust & Safety MLLMs serving TikTok, with the full retraining, evaluation, and deployment loop. ML research shipped into nine feature-film VFX pipelines.",
    proof: "TikTok · Rising Sun Pictures",
  },
  {
    verb: "Unlearn",
    head: "Making models forget",
    body: "The step most teams never get to: provable, bounded machine unlearning, so deployed models can remove what they should no longer know.",
    proof: "SineProject · CVPR 2026",
  },
];

export default function Lifecycle() {
  return (
    <section className="relative border-t border-edge py-28 md:py-36">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          title="Pretrain. Fine-tune. Deploy. Unlearn."
          lede="I have owned every stage of the model lifecycle, including the one most people never reach: teaching a deployed model to forget."
        />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal key={s.verb} delay={i * 0.1}>
              <div className="group relative border-t-2 border-edge pt-6 transition-colors duration-500 hover:border-accent">
                <p className="font-mono text-2xs text-accent">{s.verb}</p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{s.head}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                <p className="mt-5 font-mono text-2xs text-faint">{s.proof}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
