/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuro: {
          primary: '#2563EB',
          bg: '#F3F4F6',
        }
      }
    },
  },
  plugins: [],
}