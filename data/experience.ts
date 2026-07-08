export type Experience = {
  role: string;
  org: string;
  meta?: string;
  location?: string;
  dates: string;
  bullets: string[];
  tags?: string[];
};

export const experience: Experience[] = [
  {
    role: "Research Fellow & Visiting Research Scientist",
    org: "AIML, University of Adelaide · CSIRO",
    meta: "A$1.2M Grant Co-Investigator",
    location: "Adelaide, Australia",
    dates: "May 2025 - Present",
    bullets: [
      "Co-investigator on an A$1.2M ResetData grant to train frontier-scale foundation models (language, multimodal, reasoning) on a 256× NVIDIA H200 cluster.",
      "Owned end-to-end training methodology, alignment, controllability research, and stability/throughput validation of the multi-million-dollar datacenter.",
      "Authored compute and memory-efficient LLM training that simultaneously reduces wall-clock time and peak GPU memory; covered by a US provisional patent.",
      "Lead research on machine unlearning, LoRA / PEFT, and stable vision-language alignment, accepted at CVPR 2026 (SineProject), multiple NeurIPS 2026 submissions, TPAMI under review.",
      "Joint appointment at CSIRO advising on responsible-AI and trustworthy LLM/MLLM systems.",
    ],
    tags: ["LLMs", "MLLMs", "Unlearning", "LoRA / PEFT", "H200"],
  },
  {
    role: "Senior Machine Learning Engineer",
    org: "TikTok",
    meta: "Trust & Safety Research",
    location: "Australia",
    dates: "Oct 2024 - Present",
    bullets: [
      "Designed and shipped novel MLLM architectures for Trust & Safety: +2-3% AUC on business data, +5% additional lift via ensemble and distillation.",
      "Stack: SigLIP, CLIP, SAM, Co-DETR, DINOv2, ConvNeXt vision backbones paired with Phi, Gemma, Mistral LLMs.",
      "Owned retraining, evaluation, and deployment of production safety models with cross-functional engineering and product teams.",
      "Mentored junior engineers and drove research-engineering handoffs; co-authored top-tier peer-reviewed publications through sustained academic partnerships.",
    ],
    tags: ["MLLM", "Production", "SigLIP", "DINOv2", "Mentorship"],
  },
  {
    role: "Machine Learning Developer (Research)",
    org: "Rising Sun Pictures",
    meta: "VFX ML Research",
    location: "Adelaide, Australia",
    dates: "Jun 2023 - Sep 2024",
    bullets: [
      "Designed a novel background-augmentation and occlusion-aware loss for deepfake pipelines, reducing FID by 15%.",
      "Integrated into shipping VFX workflows on Mad Max: Furiosa, Deadpool, Mickey 17, La Brea, Sonic 3, and Sinners.",
      "Shipped a production gaze-estimation model improving facial authenticity in VFX shots, reducing gaze error by 4%.",
      "Contributed to generative-AI pipelines across transformers, GANs, diffusion, super-resolution, Gaussian Splatting / NeRF, and video/audio synthesis.",
    ],
    tags: ["VFX", "Diffusion", "GANs", "NeRF", "Gaussian Splatting"],
  },
  {
    role: "Machine Learning Researcher",
    org: "Adelaide Business School & UoA",
    meta: "Applied CV & NLP for Market Intelligence",
    location: "Adelaide, Australia",
    dates: "Jan 2020 - Jun 2023",
    bullets: [
      "Built CV/NLP market-intelligence systems covering 5,000+ companies; +12% sentiment accuracy and +7% data-driven decision quality.",
      "Designed an NLP expert-recommendation system with custom embeddings scaling to 200,000+ professional profiles.",
      "Architected an automated DL framework for security-patch classification across 10,000+ vulnerabilities.",
    ],
    tags: ["NLP", "Embeddings", "Market intelligence"],
  },
  {
    role: "Applied ML Research Intern",
    org: "DRDO & WESEE (Indian Navy)",
    meta: "Defence R&D",
    location: "India",
    dates: "May 2018 - Mar 2019",
    bullets: [
      "Built CV / DIP algorithms for satellite-imagery analysis at >1M-image scale (DRDO).",
      "Delivered 20+ mission-critical algorithms improving real-time decision speed by 21% and operational efficiency by 25% for naval weapons systems (WESEE).",
    ],
    tags: ["Satellite imagery", "Defence", "DIP"],
  },
];

export const education = [
  {
    degree: "Ph.D., LLMs / MLLMs, Generative AI & Computer Vision",
    org: "Australian Institute for Machine Learning, University of Adelaide",
    meta: "Collaborations: University of Oxford, University of Surrey, Monash University",
    dates: "Nov 2021 - Jan 2025",
  },
  {
    degree: "M.S., Artificial Intelligence & Data Science",
    org: "The University of Adelaide",
    meta: "Adelaide, Australia",
    dates: "Jul 2019 - Jun 2021",
  },
  {
    degree: "B.Eng., Computer Engineering",
    org: "Rajasthan Technical University",
    meta: "India",
    dates: "Aug 2015 - Jun 2019",
  },
];
