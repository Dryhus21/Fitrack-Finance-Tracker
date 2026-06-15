import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        crammed: "-0.06em",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "fade-in": "fadeIn 0.6s ease-out backwards",
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin 16s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "draw-line": "drawLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        finance: {
          primary: "#10b981",
          "primary-content": "#022c1f",
          secondary: "#a3a3a3",
          "secondary-content": "#0a0a0a",
          accent: "#f97316",
          "accent-content": "#1c0a02",
          neutral: "#1a1814",
          "neutral-content": "#e5e5e5",
          "base-100": "#0c0a08",
          "base-200": "#15120e",
          "base-300": "#26221b",
          "base-content": "#f5f1e8",
          info: "#60a5fa",
          success: "#10b981",
          warning: "#eab308",
          error: "#ef4444",
          "--rounded-box": "0.625rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.25rem",
          "--border-btn": "1px",
          "--tab-radius": "0.375rem",
        },
      },

    ],
    darkTheme: "finance",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};

export default config;
