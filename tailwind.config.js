/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Satoshi: ["Satoshi", "sans-serif"],
      GeneralSans: ["General Sans", "sans-serif"],

    },
    extend: {
      backgroundImage: {
        "home": "url('/images/page-bg-4.png')"
      },
      colors:{
      gp:{
        "purple-500": "#7371FC",
        "purple-100": "#E5D9F2",
      },
    },
    },
   
  },
  plugins: [],
}