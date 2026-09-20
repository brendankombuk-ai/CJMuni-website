import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#F1AF21",
          400: "#F4BE47",
          600: "#C98F14",
        },
        ink: {
          DEFAULT: "#000000",
          900: "#0A0A0A",
          800: "#111111",
          700: "#161616",
        },
        charcoal: {
          DEFAULT: "#4A4A4A",
          light: "#6E6E6E",
          dark: "#2A2A2A",
        },
        goat: {
          DEFAULT: "#E12129",
          // The emblem red is a shade too dark to read as small text on black.
          // This is the same red lifted towards white until it clears AA.
          light: "#EA6469",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Montserrat", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        headline: "-0.02em",
        label: "0.18em",
      },
      maxWidth: {
        frame: "1400px",
      },
      screens: {
        xs: "390px",
      },
      transitionTimingFunction: {
        muni: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "tech-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
