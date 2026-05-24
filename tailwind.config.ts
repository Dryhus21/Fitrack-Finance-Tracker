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
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
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
          neutral: "#171717",
          "neutral-content": "#e5e5e5",
          "base-100": "#0a0a0a",
          "base-200": "#141414",
          "base-300": "#262626",
          "base-content": "#f5f5f5",
          info: "#60a5fa",
          success: "#10b981",
          warning: "#eab308",
          error: "#ef4444",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.25rem",
          "--border-btn": "1px",
          "--tab-radius": "0.375rem",
        },
      },
      {
        financeLight: {
          primary: "#059669",
          "primary-content": "#ecfdf5",
          secondary: "#525252",
          "secondary-content": "#fafafa",
          accent: "#ea580c",
          "accent-content": "#fff7ed",
          neutral: "#171717",
          "neutral-content": "#fafafa",
          "base-100": "#ffffff",
          "base-200": "#fafafa",
          "base-300": "#e5e5e5",
          "base-content": "#0a0a0a",
          info: "#2563eb",
          success: "#059669",
          warning: "#d97706",
          error: "#dc2626",
          "--rounded-box": "0.5rem",
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
