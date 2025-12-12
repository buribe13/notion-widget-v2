import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          dark: "#1E1E1E",
          panel: "#2C2C2B",
          text: "#FFFEFC",
          "text-dim": "#86837E",
          "text-muted": "#55534E",
          border: "rgba(230, 229, 227, 0.1)",
          blue: "#2383E2",
          red: "#F54242",
          green: "#34C759",
          orange: "#D9730D",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        rounded: ["-apple-system", "BlinkMacSystemFont", "sans-serif"], // Approximating SF Pro
      },
    },
  },
  plugins: [],
};
export default config;
