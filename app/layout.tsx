import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arpit Garg — Senior ML / Research Engineer",
  description:
    "Senior ML engineer and published researcher (CVPR 2026, ECCV, WACV, TPAMI). LLMs, multimodal AI, computer vision, machine unlearning, and efficient training systems.",
  openGraph: {
    title: "Arpit Garg",
    description:
      "LLMs · Multimodal AI · Computer Vision · VFX ML · Efficient Training Systems",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        {/* Erode (display serif) + Switzer (body sans) via Fontshare — free for commercial use */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=erode@300,400,500,600,700,300i,400i,500i,600i,700i&f[]=switzer@300,400,500,600,700&display=swap"
        />
      </head>
      <body className="bg-ink-950 text-ink-100 grain antialiased font-sans">
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
