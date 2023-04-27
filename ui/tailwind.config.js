/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors : {
          primaryColor : '#4397A4',
          footerbg : '#486A6F',
          color1 : '#a8c1ec',
          color2 : '#E1EBFA'
        },
        backgroundColor : {
          'bg1' : '#F4F7FF',
          'bg2' : '#E1EBFA',
          gradient1 : 'linear-gradient(42.43deg, #C6DBFF 0%, #E1EBFA 52.25%)'
        },
        gradientColorStops : {
          gradient1 : 'linear-gradient(42.43deg, #C6DBFF 0%, #E1EBFA 52.25%)'
        },
        backgroundImage : {
          'hero' : 'url(../public/background.png)'
        },
        boxShadow : {
          shadow1 : '0 25px 80px -32px #486A6F'
        }
      },
    },
    plugins: [],
  }
)

