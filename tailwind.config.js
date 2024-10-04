/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: 'rgba(240, 242, 245, 1)',
        borderGray: 'rgba(149, 149, 149, 0.25)',
        cleanGrey: 'rgba(158, 158, 158, 1)',
        notesb: 'rgba(217, 217, 217, 1)'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
      },
      fontSize: {
        'custom-size': '14.2px', 
      },
      lineHeight: {
        'custom-line-height': '17.19px', 
      },
      fontWeight: {
        'bold-custom': 700,
      },
    },
  },
  plugins: [],
};
