import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        indigo: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#000000',
          700: '#1a1a1a',
          800: '#2a2a2a',
          900: '#3a3a3a',
          950: '#000000',
        },
        slate: colors.neutral,
      },
      boxShadow: {
        'xl': '0 20px 40px -15px rgba(0,0,0,0.05)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.08)',
        'soft': '0 4px 20px rgba(0,0,0,0.03)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
