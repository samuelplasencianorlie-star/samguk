import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        carbon: "#111214",
        ember: "#c1121f",
        gold: "#d6a84f",
        cream: "#f7f3e8"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(214,168,79,0.22), 0 18px 70px rgba(0,0,0,0.48)"
      }
    }
  },
  plugins: []
};

export default config;
