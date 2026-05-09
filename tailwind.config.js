export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f3ff',
          100: '#efe6ff',
          200: '#ddd0ff',
          300: '#c4a8ff',
          400: '#a876ff',
          500: '#8c4cff',
          600: '#7524f2',
          700: '#5c1ec7',
          800: '#48179b',
          900: '#3c147a',
        },
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
