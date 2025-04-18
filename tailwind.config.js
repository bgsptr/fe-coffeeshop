/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '19.5px'],
        lg: ['18px', '21.94px'],
        xl: ['20px', '24.38px'],
        '2xl': ['24px', '29.26px'],
        '3xl': ['28px', '50px'],
        '4xl': ['48px', '58px'],
        '5xl': ['64px'],
        '8xl': ['96px', '106px']
      },
      extend: {
        transitionDuration: {
          '1500': '1500ms',
          '2000': '2000ms'
        },
        animation: {
          fade: 'fadeIn 5s ease-out',
        },
        fontFamily: {
          palanquin: ['Palanquin', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
          rokkitt: ['Rokkitt', 'serif'],
          mulish: ['Mulish', 'sans-serif']
        },
        colors: {
          'main': "#9EBBF1",
          'primary': "#2788E2",
          'sec': "#42B4EE",
          'grey' : "#3F4756",
          'footer': "#51565E",
          'nn600': '#6D7588',
          'ggb00': '#00B000',
          'hggb00': '#009600',
          'ob052': '#D68052',
          'gref8': '#f8f8f8'
        },
        boxShadow: {
          '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
        },
        backgroundImage: {
          'hero': "url('assets/images/collection-background.svg')",
          'card': "url('assets/images/thumbnail-background.svg')",
        },
        screens: {
          "wide": "1440px"
        },
        borderWidth: {
          '1': '1px',
        },
      },
    },
    plugins: [],
  }