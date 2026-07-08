import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://arpit2412.github.io"),
  title: "Arpit Garg · AI Researcher & Engineer",
  description:
    "Senior ML engineer and published researcher (CVPR, ECCV, WACV, TPAMI). LLMs, multimodal AI, machine unlearning, efficient training on 256× H200 GPUs, and ML for film VFX. Co-founder of A2.AI.",
  openGraph: {
    title: "Arpit Garg",
    description:
      "LLMs · Multimodal AI · Machine Unlearning · Efficient Training · VFX ML. Research fellow at AIML/CSIRO, senior MLE at TikTok, co-founder of A2.AI.",
    type: "website",
    url: "https://arpit2412.github.io",
  },
  twitter: { card: "summary_large_image", title: "Arpit Garg: AI Researcher" },
};

// Set theme class before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-base font-sans text-ink">
        <Nav />
        {children}
      </body>
    </html>
  );
}
