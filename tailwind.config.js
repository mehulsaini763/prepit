/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-montserrat)"],
      noto: ["var(--font-noto-sans)"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite", // Adjust the duration (e.g., 'spin 3s' for slower)
      },
    },
    screens: {
      md: "920px",
    },
  },
  plugins: [],
});
