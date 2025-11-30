/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f472b6", // pastel pink (based on pink-400)
          dark: "#ec4899",    // slightly deeper pink
        },
        soft: {
          bg: "#fff1f2",      // very light pink background
        },
      },
    },
  },
  plugins: [],
};
