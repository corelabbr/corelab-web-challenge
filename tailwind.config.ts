import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#455A64",
          placeholder: "#50656E",
          text: "#4F4F4D"
        },
        border: {
          primary: "#D9D9D9"
        },
        background: "#F0F2F5",
        buttonSelected: "#FFE3B3",
        custom: {
          lightBlue: "#BAE2FF",
          lightGreen: "#B9FFDD",
          lightYellow: "#FFE8AC",
          lightOrange: "#FFCAB9",
          lightRed: "#F99494",
          skyBlue: "#9DD6FF",
          lightPurple: "#ECA1FF",
          limeGreen: "#DAFF8B",
          coral: "#FFA285",
          lightGray: "#CDCDCD",
          mediumGray: "#979797",
          beige: "#A99A7C",
          white: "#FFFFFF"
        }
      }
    }
  },
  plugins: []
};

export default config;
