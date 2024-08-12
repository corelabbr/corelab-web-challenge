import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        header: "0px 1px 7px 0px rgba(149,149,149,0.25)",
        card: "0 3px 10px rgba(0,0,0,0.2)",
        input: "1px 1px 3px 0px rgba(0,0,0,0.25)",
        textarea: "inset 1px 1px 200px 0px rgba(0,0,0,0.15)",
      },
      colors: {
        "background-light": "#F0F2F5",
        primary: "#455A64",
        "primary-light": "#D9D9D9",
        "primary-dark": "#263238",
        accent: {
          yellow: "#FFA000",
        },
      },
      maxWidth: {
        card: "24.375rem",
      },
      maxHeight: {
        card: "27.3125rem",
      },
    },
  },
  plugins: [],
};
export default config;
