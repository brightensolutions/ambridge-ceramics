import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      /* ================= COLORS ================= */

      colors: {
        /* --- brand primitives --- */
        brand: {
          green: "#2d5a43",
          greenStrong: "#244c3a",
        },

        /* --- semantic surfaces --- */
        surface: {
          base: "#f4f7f9",
          elevated: "#ffffff",
          muted: "#eef2f4",
        },

        /* --- semantic text --- */
        text: {
          primary: "#1a242f",
          secondary: "#374151",
          muted: "#6b7280",
          inverse: "#ffffff",
        },

        /* --- borders --- */
        border: {
          subtle: "#e5e7eb",
          strong: "#d1d5db",
        },
      },

      /* ================= TYPOGRAPHY ================= */

      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },

      fontSize: {
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.28em" }],
        body: ["17px", { lineHeight: "1.75" }],
        h1: ["clamp(40px,4vw,58px)", { lineHeight: "1.05" }],
        h2: ["clamp(28px,3vw,40px)", { lineHeight: "1.1" }],
      },

      /* ================= SHADOWS ================= */

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
        card: "0 6px 18px rgba(0,0,0,0.08)",
      },

      /* ================= RADIUS ================= */

      borderRadius: {
        luxury: "14px",
      },
    },
  },

  plugins: [],
};

export default config;