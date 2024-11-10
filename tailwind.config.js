/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: { max: '600px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1200px' },
      '2xl': { max: '1536px' },
    },
    extend: {},
  },
  plugins: [],
};
