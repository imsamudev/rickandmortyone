import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          lightBlue: '#42B4CA',
          darkBlue: '#0A1128',
          darkBlueGreen: '#193840',
          limeGreen: '#BFDE42',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('tailwindcss-animated')
  ],
};
export default config;
