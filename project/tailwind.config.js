/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-900': '#121212',
        'dark-800': '#1E1E1E',
        'dark-700': '#252525',
        'gold-primary': '#D4AF37',
        'gold-light': '#F5CC7F',
        'gold-dark': '#9A7D1E',
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#F44336',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'sans': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'film-grain': "url('/src/assets/film-grain.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};