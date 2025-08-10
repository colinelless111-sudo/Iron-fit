/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { gold: '#C9A227', charcoal: '#0f0f0f', accent: '#E63946' }
      }
    }
  },
  plugins: []
};
