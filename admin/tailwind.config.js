/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0F4C81",
          lightBlue: "#1B84C6",
          teal: "#00A896",
          darkTeal: "#028090",
          darkBg: "#0B192C",
          surface: "#1E3E62",
          grayBg: "#F8FAFC",
          border: "#E2E8F0",
        },
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fc",
          400: "#36abf8",
          500: "#0c8ee9",
          600: "#006fb8",
          700: "#005898",
          800: "#054b7e",
          900: "#0a3f68",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.02)",
        card: "0 10px 30px -5px rgba(15, 76, 129, 0.08)",
      },
    },
  },
  plugins: [],
};
