/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        // Existing Brand Colors
        brand: {
          blue: "#0F4C81",
          lightBlue: "#1B84C6",
          teal: "#00A896",
          darkTeal: "#028090",
          darkBg: "#081C24",
          grayBg: "#F8FAFC",
          border: "#E2E8F0",
        },

        // Existing Primary Palette
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
          950: "#072844",
        },

        // Existing Secondary Palette
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },

        // ⭐ Premium Theme (Black + Orange)
        premium: {
          black: "#09090B",
          charcoal: "#111111",
          surface: "#1A1A1A",
          border: "#2B2B2B",

          orange: "#FF7B00",
          orangeDark: "#E36400",
          orangeLight: "#FFB15E",

          white: "#FFFFFF",

          gray: "#B6B6B6",
          grayDark: "#6B7280",

          glow: "#FF8A00",
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 20px -2px rgba(15,23,42,.05)",
        card: "0 10px 30px -5px rgba(0,88,152,.08)",
        dropdown: "0 20px 40px -15px rgba(15,23,42,.12)",
        glass: "0 8px 32px rgba(0,43,73,.10)",

        // Premium Shadows
        orange: "0 20px 45px rgba(255,123,0,.35)",
        orangeLg: "0 30px 70px rgba(255,123,0,.45)",
        black: "0 20px 50px rgba(0,0,0,.45)",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      keyframes: {
        productScroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },

      animation: {
        "product-scroll": "productScroll 30s linear infinite",
      },

    },
  },

  plugins: [],
};