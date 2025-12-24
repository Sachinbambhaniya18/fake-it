export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#B9FF66', // Acid Green
        dark: '#191A23',    // Main dark background/text
        gray: {
          light: '#F3F3F3', // Light background
          medium: '#EDF2F7', // Slightly darker
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'sharp': '5px 5px 0px 0px rgba(0,0,0,1)', // Brutalist shadow
      }
    },
  },
  plugins: [],
};
