import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1f",
        sand: "#f5efe3",
        ember: "#d97757",
        pine: "#1f4d3f",
        mist: "#d9e6df"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"]
      },
      boxShadow: {
        card: "0 20px 60px rgba(29, 29, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
