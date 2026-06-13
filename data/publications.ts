export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  status?: "accepted" | "in submission" | "published";
  arxiv?: string;
  url?: string;
  short?: string; // venue chip
  highlight?: boolean;
};

export const publications: Publication[] = [
  {
    title: "SineProject: Machine Unlearning for Stable Vision-Language Alignment",
    authors: "A. Garg, H. Saratchandran, S. Lucey",
    venue: "CVPR",
    short: "CVPR 2026",
    year: 2026,
    status: "accepted",
    highlight: true,
  },
  {
    title:
      "STRIDE: Training-Free Diversity Guidance via PCA-Directed Feature Perturbation in Single-Step Diffusion Models",
    authors: "A. Yadav, A. Garg, T. D. Huy, L. Liu",
    venue: "NeurIPS",
    short: "NeurIPS 2026",
    year: 2026,
    status: "in submission",
    arxiv: "https://arxiv.org/abs/2605.11494",
  },
  {
    title: "LR-LoRA: Parameter-Efficient Fine-Tuning with Learnable Rank",
    authors: "A. Garg, S. Lucey, H. Saratchandran",
    venue: "NeurIPS",
    short: "NeurIPS 2026",
    year: 2026,
    status: "in submission",
  },
  {
    title: "Mask the Target: A Plug-and-Play Regularizer Against LoRA Forgetting",
    authors: "R. Xu*, A. Garg* (co-first), H. Saratchandran, S. Lucey",
    venue: "NeurIPS",
    short: "NeurIPS 2026",
    year: 2026,
    status: "in submission",
  },
  {
    title: "Stable Forgetting: Bounded Parameter-Efficient Unlearning in LLMs",
    authors: "A. Garg, H. Saratchandran, R. Garg, S. Lucey",
    venue: "NeurIPS",
    short: "NeurIPS 2026",
    year: 2026,
    status: "in submission",
    arxiv: "https://arxiv.org/abs/2509.24166",
  },
  {
    title:
      "AEON: Adaptive Estimation of Instance-Dependent ID/OOD Label Noise for Robust Learning",
    authors: "A. Garg, C. Nguyen, R. Felix, Y. Liu, T.-T. Do, G. Carneiro",
    venue: "TPAMI",
    short: "TPAMI",
    year: 2025,
    status: "in submission",
    arxiv: "https://arxiv.org/abs/2501.13389",
  },
  {
    title:
      "PASS: Peer-Agreement Based Sample Selection for Training with Instance-Dependent Noisy Labels",
    authors: "A. Garg, C. Nguyen, R. Felix, T.-T. Do, G. Carneiro",
    venue: "Image and Vision Computing",
    short: "IMAVIS 2025",
    year: 2025,
    status: "published",
  },
  {
    title:
      "Instance-Dependent Noisy-Label Learning with Graphical-Model-Based Noise-Rate Estimation",
    authors: "A. Garg, C. Nguyen, R. Felix, T.-T. Do, G. Carneiro",
    venue: "Springer",
    short: "ECCV 2024",
    year: 2024,
    status: "published",
  },
  {
    title: "Instance-Dependent Noisy-Label Learning via Graphical Modelling",
    authors: "A. Garg, C. Nguyen, R. Felix, T.-T. Do, G. Carneiro",
    venue: "IEEE/CVF",
    short: "WACV 2023",
    year: 2023,
    status: "published",
  },
  {
    title:
      "Per-VIS: Person Retrieval in Video Surveillance Using Semantic Description",
    authors: "P. Shah, A. Garg, V. Gajjar",
    venue: "IEEE/CVF",
    short: "WACV 2021",
    year: 2021,
    status: "published",
  },
];
