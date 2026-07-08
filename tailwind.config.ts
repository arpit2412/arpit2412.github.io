import type { Config } from "tailwindcss";

/**
 * All colors are CSS variables defined in globals.css — the .dark class
 * swaps the whole palette, so every component is theme-agnostic.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "var(--bg)",
        surface: "var(--surface)",
        card: "var(--card)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        edge: "var(--edge)",
        "edge-2": "var(--edge-2)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1.45", letterSpacing: "0.02em" }],
        // fluid display scale
        "d-sm": ["clamp(1.5rem, 1.2vw + 1.1rem, 2rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "d-md": ["clamp(2rem, 2.2vw + 1.2rem, 3rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "d-lg": ["clamp(2.6rem, 3.6vw + 1.3rem, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "d-xl": ["clamp(3.2rem, 7.5vw + 1rem, 7.25rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      letterSpacing: {
        eyebrow: "0.24em",
      },
      maxWidth: {
        shell: "72rem",
        prose: "62ch",
      },
      animation: {
        marquee: "marquee 55s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
