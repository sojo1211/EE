/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo
          light: '#6366F1',
          dark: '#4338CA',
        },
        accent: {
          purple: '#7C3AED',
          cyan: '#06B6D4',
        },
        bg: {
          slate: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
