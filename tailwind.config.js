/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#09A67A", // Main green
        primaryFont: "#082f32",
        secondary: "#F2F3EE", // Accent orange
        background: "#F5F5F5", // Page background
        header: "#F4EFD5", // Header background
        success: "#0F9D58", // Green for success/status
        warning: "#F4B400", // Yellow for warnings
        danger: "#D32F2F", // Red for errors/alerts
        info: "#1E90A0", // Teal/Info color
        "slate-100": "#F4F4F4",
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
    },
  },
  plugins: [],
};
