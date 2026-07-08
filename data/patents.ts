export type Patent = {
  title: string;
  kind: "US Provisional" | "UK Design (Granted)";
  meta: string;
  number?: string;
  date?: string;
};

export const patents: Patent[] = [
  {
    title: "Attention Mechanism for Neural Networks",
    kind: "US Provisional",
    meta: "Compute & memory-efficient training of large language models.",
    date: "Filed May 2026",
  },
  {
    title: "AI-Assisted Rural & Indigenous Healthcare Robot",
    kind: "UK Design (Granted)",
    meta: "Class 24, Medical Equipment · UK Intellectual Property Office",
    number: "No. 6520933",
    date: "29 April 2026",
  },
];

export const honors = [
  {
    title: "ICML 2025 Best Reviewer: Gold Award",
    body: "Recognised among the top reviewers worldwide.",
  },
  {
    title: "Investigator, A$1.2M ResetData Grant",
    body: "Training large foundation models on 256× NVIDIA H200 GPUs.",
  },
  {
    title: "Invited Speaker, MLSS Melbourne 2026",
    body: "By invitation from Maincode.",
  },
  {
    title: "Open-Source Impact",
    body: "140,000+ visits across public ML repositories.",
  },
];
