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
          primary: '#42B4CA', //light blue
          secondary: '#0A1128', //dark blue
          tertiary: '#193840', //dark blue green
          accent: '#BFDE42', //limegreen
      },
      animation: {
        'fade-in': 'fadeIn .8s ease-in',
        'fade-out': 'fadeOut .8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('tailwindcss-animated')
  ],
};
export default config;
