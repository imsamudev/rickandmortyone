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
        // The secondary colors "_number" are lighter
        primary: '#42B4CA', //light blue 1
        primary_1: '#86e3f6', //light blue 2
        secondary: '#0A1128', //dark blue
        secondary_1: '#121f49', //dark blue 2
        accent: '#BFDE42', //limegreen
        white: '#f3f3f3',
      },
      animation: {
        'fade-in': 'fadeIn .8s ease-in',
        'fade-out': 'fadeOut .8s ease-out',
        'expand-contract': 'expandContract 3s infinite',
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
        expandContract: {
          '0%, 100%': { filter: 'drop-shadow(0px 0px 2px rgba(191,222,66,1))' },
          '50%': { filter: 'drop-shadow(0px 0px 6px rgba(191,222,66,1))' },
        },
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
