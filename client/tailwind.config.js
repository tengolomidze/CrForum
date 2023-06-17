/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'alksanet': ["ALK Sanet", 'sans-serif'],
        'bpgarial': ["BPG Arial", 'sans-serif']
        
      },
      colors: {
        "main": "rgb(255, 255, 255)",
        "monokaipink": "#ff003d",
        "monokaigreen": "#A9DC76",
        "bg": "#121212"
      },
    },
    screens: {
      'phone': '400px',

      'tablet': '640px',

      'laptop': '1024px',

      'desktop': '1280px',
    },
  },
  plugins: [],
}
