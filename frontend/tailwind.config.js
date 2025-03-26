/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans your JSX files
  theme: {
    extend: {
      colors: {
        primary: "#F4F1DE",
        accent: "#2A9D8F",
        background: "#264653"
      },
      fontFamily: {
        sans: ["Inter","Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
