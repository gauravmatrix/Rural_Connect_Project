/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        govBlue: "#0B3C5D",
        govOrange: "#F59E0B",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 40px -20px rgba(11, 60, 93, 0.45)",
      },
    },
  },
  plugins: [],
}

