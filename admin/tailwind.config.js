/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ⭐ Premium Theme (Black + Orange matching frontend)
        premium: {
          black: "#09090B",
          charcoal: "#111111",
          surface: "#1A1A1A",
          surfaceHover: "#242424",
          border: "#2B2B2B",
          borderLight: "#383838",

          orange: "#FF7B00",
          orangeDark: "#E36400",
          orangeLight: "#FFB15E",
          orangeSubtle: "rgba(255, 123, 0, 0.12)",

          white: "#FFFFFF",

          gray: "#B6B6B6",
          grayDark: "#6B7280",

          glow: "#FF8A00",
        },

        // Updated Brand Colors
        brand: {
          orange: "#FF7B00",
          orangeDark: "#E36400",
          orangeLight: "#FFB15E",
          black: "#09090B",
          charcoal: "#111111",
          surface: "#1A1A1A",
          border: "#2B2B2B",
          darkBg: "#09090B",
          grayBg: "#F8FAFC",

          // Harmonious aliases for existing component references
          blue: "#FF7B00",
          lightBlue: "#FFB15E",
          teal: "#FF7B00",
          darkTeal: "#E36400",
        },

        // Primary Palette mapped to Orange
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF7B00",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.02)",
        card: "0 10px 30px -5px rgba(255, 123, 0, 0.06)",
        orange: "0 10px 25px -5px rgba(255, 123, 0, 0.35)",
        orangeLg: "0 20px 45px -10px rgba(255, 123, 0, 0.45)",
        black: "0 20px 50px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

