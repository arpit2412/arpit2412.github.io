export type Project = {
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Frontier-Scale Foundation Model Training",
    kicker: "AIML · ResetData Grant",
    description:
      "Co-investigator on an A$1.2M grant training language, multimodal, and reasoning models on a 256× NVIDIA H200 cluster, owning training methodology, alignment research, and stability/throughput validation of the datacenter.",
    tags: ["LLMs", "256× H200", "Distributed Training", "Alignment"],
    featured: true,
  },
  {
    title: "Trust & Safety MLLMs at TikTok",
    kicker: "Production ML",
    description:
      "Novel multimodal LLM architectures reasoning over image, video, and text at platform scale, +2-3% AUC on business data, +5% further via ensembling and distillation. Owned retraining, evaluation, and deployment.",
    tags: ["MLLM", "SigLIP", "DINOv2", "Gemma", "Production"],
    featured: true,
  },
  {
    title: "ML for Film VFX",
    kicker: "Rising Sun Pictures",
    description:
      "Research shipped into production VFX pipelines on nine films, occlusion-aware deepfake losses (−15% FID), production gaze estimation, and generative pipelines across diffusion, GANs, NeRF, and Gaussian Splatting.",
    tags: ["Deepfake", "Diffusion", "Gaussian Splatting", "9 Films"],
    href: "https://www.imdb.com/name/nm16969018/",
    linkLabel: "Credits on IMDb",
    featured: true,
  },
  {
    title: "A2.AI",
    kicker: "Co-Founder",
    description:
      "An applied-AI venture translating frontier research in LLMs, multimodal systems, and efficient training into deployed products.",
    tags: ["Founder", "Applied AI"],
    href: "https://a2ai.com.au",
    linkLabel: "a2ai.com.au",
  },
  {
    title: "Interactive AI Explainers",
    kicker: "Writing & Teaching",
    description:
      "A growing library of visual, interactive deep-dives: the Attention Atlas, a Mixture-of-Experts workbook, and vLLM from the inside out.",
    tags: ["Attention", "MoE", "vLLM", "Long Context"],
    href: "#writing",
    linkLabel: "Read the explainers",
  },
  {
    title: "Open-Source ML",
    kicker: "140K+ repo visits",
    description:
      "Public research code across LLMs, attention mechanisms, noisy-label learning, and parameter-efficient fine-tuning.",
    tags: ["PEFT", "Noisy Labels", "Open Source"],
    href: "https://github.com/arpit2412",
    linkLabel: "github.com/arpit2412",
  },
];

export const researchAreas = [
  {
    title: "Machine Unlearning",
    body: "Making models forget, provably and stably. SineProject (CVPR 2026) and bounded parameter-efficient unlearning in LLMs.",
    pubs: "CVPR 2026 · NeurIPS 2026 (sub.)",
  },
  {
    title: "Efficient Training & PEFT",
    body: "Compute- and memory-efficient LLM training (US provisional patent), learnable-rank LoRA, and regularizers against LoRA forgetting.",
    pubs: "US Patent (filed) · NeurIPS 2026 (sub.)",
  },
  {
    title: "Multimodal LLMs",
    body: "Vision-language alignment and production MLLM architectures that reason over image, video, and text together.",
    pubs: "CVPR 2026 · TikTok production",
  },
  {
    title: "Generative Models",
    body: "Diffusion guidance without retraining (STRIDE), GANs and deepfake pipelines for film VFX, NeRF and Gaussian Splatting.",
    pubs: "NeurIPS 2026 (sub.) · 9 films",
  },
  {
    title: "Long Context & Attention",
    body: "Attention mechanisms from first principles, from the original Transformer to linear attention and million-token contexts.",
    pubs: "Attention Atlas · vLLM deep-dive",
  },
  {
    title: "Robust Learning",
    body: "Instance-dependent noisy-label learning via graphical models and peer-agreement sample selection.",
    pubs: "ECCV 2024 · WACV 2023 · TPAMI (sub.)",
  },
];
