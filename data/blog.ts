export type BlogPost = {
  slug: string;          // path under /blog/
  file: string;          // file in /public/blog/
  title: string;
  blurb: string;
  readTime: string;
  topic: string;
  date: string;
  cover: string;         // unsplash image URL
};

export const posts: BlogPost[] = [
  {
    slug: "context-window",
    file: "/blog/context-window.html",
    title: "The Window — Why Your Chatbot Slows Down",
    blurb:
      "An interactive, jargon-free explainer of the context window: what the model can actually see, why doubling the conversation quadruples the cost, and what 'lost in the middle' really means.",
    readTime: "~ 15 min",
    topic: "Explainer",
    date: "2026",
    cover:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "llm-harness",
    file: "/blog/llm-harness.html",
    title: "The Harness — What Wraps the Brain",
    blurb:
      "The model is only part of the story. An interactive tour of the six things that wrap a language model — turning a single chat turn into an agent that can read, search, run code, and act.",
    readTime: "~ 15 min",
    topic: "Explainer",
    date: "2026",
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "attention-atlas",
    file: "/blog/attention-atlas.html",
    title: "The Attention Atlas",
    blurb:
      "A field guide to every major attention mechanism, from the original Transformer to Flash Attention 4 — seven families, fifty mechanisms, one decade.",
    readTime: "~ 90 min",
    topic: "Attention",
    date: "2026",
    cover:
      "https://images.unsplash.com/photo-1635776062764-e025521e3df3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lighthouse-attention",
    file: "/blog/lighthouse-attention.html",
    title: "Lighthouse Attention — A Visual Deep Dive",
    blurb:
      "How a hierarchical, parameter-free trick lets you pre-train Transformers on million-token contexts — and still get a fully dense model at the end.",
    readTime: "~ 20 min",
    topic: "Long Context",
    date: "May 2026",
    cover:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lima-less",
    file: "/blog/lima-less.html",
    title: "LIMA & LESS — The Statistics of Selecting Training Data",
    blurb:
      "LIMA argued a thousand carefully chosen examples can rival a million sloppy ones. LESS gave us the math. A complete recipe for data-efficient fine-tuning.",
    readTime: "~ 25 min",
    topic: "Fine-Tuning",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lolcats",
    file: "/blog/lolcats.html",
    title: "LoLCATs · A Technical Walkthrough",
    blurb:
      "Attention transfer as feature-map distillation, LoRA as residual correction, and a block-wise schedule that makes 405B-parameter linearization tractable.",
    readTime: "~ 18 min",
    topic: "Subquadratic LLMs",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "popgym",
    file: "/blog/popgym.html",
    title: "POPGym, considered as a language model",
    blurb:
      "What if partially-observable reinforcement learning is just next-token prediction wearing a different costume?",
    readTime: "~ 8 min",
    topic: "RL × LM",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
];
