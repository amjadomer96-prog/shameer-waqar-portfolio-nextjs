/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B2445",
        "ink-2": "#123A66",
        paper: "#F6F5F0",
        "paper-dim": "#EFEDE5",
        line: "#DDD9CC",
        blue: "#2F6FED",
        slate: "#5C6B7A",
        amber: "#E8A33D",
        green: "#2FA875",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "1120px",
      },
    },
  },
  plugins: [],
}
