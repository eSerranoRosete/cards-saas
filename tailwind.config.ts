import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1500px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "slide-from-right": "slide-from-right 0.1s ease-in-out",
        "slide-to-right": "slide-to-right 0.1s ease-in-out",
      },
      keyframes: {
        "slide-from-right": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "slide-to-right": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  darkMode: "class",
};
export default config;
