/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "black-100":"#2B2C35",
        "primary-blue":{
          DEFAULT:"#2B59FF",
          100:"#F5F8FF",
        },
        "secondary-orange":"#f79761",
        "light-white": {
          DEFAULT:"rgba(59,60,152,0.03)",
          100:"rgba(59,60,152,0.02)",
        },
        grey:"#747A88",
      },
      backgroundImage: {
        'hero-bg':"url('/hero-bg1.jpeg')",
        'gradient-radial':'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
