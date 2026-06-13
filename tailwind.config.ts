import type { Config } from "tailwindcss";

/**
 * Type scale uses a 1.25 modular ratio.
 * Display sizes (3xl+) use fluid clamp() so they scale gracefully from
 * mobile → desktop without breakpoints. Body sizes stay fixed for predictable rhythm.
 *
 * Color palette uses OKLCH for perceptual uniformity; every neutral is tinted
 * toward the gold hue (~75°) for subconscious cohesion with the accent.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm-tinted neutral scale (OKLCH, gold-leaning hue 75°)
        ink: {
          950: "oklch(0.135 0.008 75)", // deepest — body background
          900: "oklch(0.185 0.008 75)", // raised surface
          850: "oklch(0.215 0.008 75)",
          800: "oklch(0.255 0.007 75)", // borders / cards
          700: "oklch(0.325 0.006 75)",
          600: "oklch(0.425 0.005 75)",
          500: "oklch(0.530 0.005 75)",
          400: "oklch(0.640 0.005 75)",
          300: "oklch(0.760 0.006 75)",
          200: "oklch(0.860 0.007 75)",
          100: "oklch(0.940 0.008 75)", // warm bone — primary foreground
          50: "oklch(0.975 0.008 75)",
        },
        // Refined gold (single accent, used at ~10% weight)
        gold: {
          DEFAULT: "oklch(0.780 0.130 75)",
          soft: "oklch(0.855 0.105 75)",
          deep: "oklch(0.620 0.130 75)",
          mute: "oklch(0.700 0.060 75)",
        },
        accent: "oklch(0.780 0.130 75)",
      },
      fontFamily: {
        // Display: high-contrast editorial serif (Fontshare)
        display: ["Erode", "ui-serif", "Georgia", "serif"],
        // Body: refined neo-grotesque (Fontshare)
        sans: ["Switzer", "ui-sans-serif", "system-ui", "sans-serif"],
        // Mono: technical, restrained (next/font/google)
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Body scale (fixed rem)
        "2xs": ["0.6875rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.55" }],
        base: ["1rem", { lineHeight: "1.7" }],          // body — extra leading for light-on-dark
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.375rem", { lineHeight: "1.5" }],
        "2xl": ["1.75rem", { lineHeight: "1.35" }],

        // Display scale (fluid clamp)
        "3xl": ["clamp(2rem, 2.5vw + 1rem, 2.625rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "4xl": ["clamp(2.5rem, 3vw + 1.25rem, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "5xl": ["clamp(3rem, 4vw + 1.5rem, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "6xl": ["clamp(3.75rem, 5.5vw + 1.5rem, 6.25rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "7xl": ["clamp(4.5rem, 7vw + 1rem, 8rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "hero": ["clamp(4rem, 11vw + 1rem, 11rem)", { lineHeight: "0.93", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
        eyebrow: "0.28em",
      },
      lineHeight: {
        reading: "1.75",
      },
      maxWidth: {
        prose: "65ch",
        "prose-tight": "55ch",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
