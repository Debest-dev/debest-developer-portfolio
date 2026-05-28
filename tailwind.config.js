/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#EEF2FF",
          500: "#4F46E5",
          600: "#4338CA",
        },
        accent: "#0EA5E9",
        bg: "#FAFAFA",
        text: "#0A0A0A",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
