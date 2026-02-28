/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: "#00FF94",
        charcoal: "#121212",
        glass: "rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
}