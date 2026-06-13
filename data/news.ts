export type NewsItem = {
  date: string; // ISO or readable
  kind: "talk" | "paper" | "award" | "grant" | "patent" | "press";
  title: string;
  body: string;
  href?: string;
};

export const news: NewsItem[] = [
  {
    date: "May 2026",
    kind: "talk",
    title: "Invited speaker — MLSS Melbourne 2026",
    body: "Lecturing at the Machine Learning Summer School, Melbourne (by invitation from Maincode).",
  },
  {
    date: "Apr 2026",
    kind: "patent",
    title: "UK Design Patent granted (No. 6520933)",
    body: "AI-Assisted Rural & Indigenous Healthcare Robot — Class 24, Medical Equipment. UK Intellectual Property Office.",
  },
  {
    date: "Mar 2026",
    kind: "paper",
    title: "SineProject accepted at CVPR 2026",
    body: "Machine unlearning for stable vision-language alignment. First-author work with Saratchandran and Lucey.",
  },
  {
    date: "May 2026",
    kind: "patent",
    title: "US Provisional Patent filed",
    body: "Attention mechanism for neural networks — compute and memory-efficient LLM training, productionised in internal pipelines.",
  },
  {
    date: "Jan 2026",
    kind: "paper",
    title: "AEON submitted to TPAMI",
    body: "Adaptive estimation of instance-dependent ID/OOD label noise for robust learning. arXiv:2501.13389.",
  },
  {
    date: "Dec 2025",
    kind: "paper",
    title: "PASS published in Image and Vision Computing",
    body: "Peer-agreement based sample selection for training with instance-dependent noisy labels.",
  },
  {
    date: "Aug 2025",
    kind: "award",
    title: "ICML 2025 Best Reviewer — Gold Award",
    body: "Recognised among the top reviewers worldwide.",
  },
  {
    date: "May 2025",
    kind: "grant",
    title: "A$2.1M ResetData grant — investigator",
    body: "Lead investigator for frontier-scale foundation model training on 256× NVIDIA H200 GPUs.",
  },
  {
    date: "May 2025",
    kind: "press",
    title: "Joint appointment as Visiting Research Scientist at CSIRO",
    body: "Advising on responsible-AI, trustworthy LLM/MLLM systems, and national-scale safety research.",
  },
  {
    date: "Oct 2024",
    kind: "press",
    title: "Joined TikTok Trust & Safety Research",
    body: "Senior ML engineer designing MLLM architectures for production safety models at scale.",
  },
  {
    date: "Sep 2024",
    kind: "paper",
    title: "ECCV 2024 — Instance-Dependent Noisy-Label Learning",
    body: "Graphical-model-based noise-rate estimation; published at ECCV 2024 (Springer).",
  },
  {
    date: "Ongoing",
    kind: "press",
    title: "Open-source impact — 140,000+ repo visits",
    body: "Public ML projects across LLMs, attention mechanisms, noisy-label learning, and PEFT.",
  },
];
