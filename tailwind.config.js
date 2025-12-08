/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F626A",
        secondary: "#F2F3EE",
      },
      fontSize: {
        base: "15px",
      },
      borderRadius: {
        sm: "0.25rem", // default small
        md: "0.5rem", // default medium
        lg: ".6rem", // larger radius
        xl: ".6rem", // extra large
        "2xl": "2rem", // for big cards
        full: "9999px", // fully round
      },
      boxShadow: {
        lg: "0 0.1rem 0.5rem 0 rgba(40, 35, 45, 0.08)",
      },
      maxWidth: {
        "7xl": "85rem", // 1360px
      },
    },
  },
  plugins: [],
};
