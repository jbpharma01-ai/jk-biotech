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
          blue: '#0F4C81',        // J K Biotech Deep Navy Blue
          lightBlue: '#1B84C6',   // Medical Cyan Blue
          teal: '#00A896',        // Pharmaceutical Mint Emerald
          darkTeal: '#028090',
          darkBg: '#081C24',
          grayBg: '#F8FAFC',
          border: '#E2E8F0',
        },
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36abf8',
          500: '#0c8ee9',
          600: '#006fb8', // Main Primary Blue
          700: '#005898',
          800: '#054b7e', // Deep Corporate Blue
          900: '#0a3f68',
          950: '#072844',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Main Secondary Green/Teal
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card': '0 10px 30px -5px rgba(0, 88, 152, 0.08)',
        'dropdown': '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 43, 73, 0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
