/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      primary: "#dcecf8",
      secondary: "#645bee",
      tertiary: "#d0fbff",
      quaternary: "#e8def7",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },

    extend: {

      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // }

    }
  },
  plugins: [],
}

