import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-100": "#363A63",
        "dark-200": "#212545",
        "dark-300": "#0F1124",
        "light-100": "#EDEEF7",
        "light-200": "#D9DBF2",
        "light-300": "#B8BCE0",
        "light-400": "#7A81B8",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
