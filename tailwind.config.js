// tailwind.config.js

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': "url('/grid.svg')",
      },
    },
  },
  plugins: [],
};
