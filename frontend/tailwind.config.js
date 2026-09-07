/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(76, 29, 149, 0.08)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(196, 181, 253, 0.45), transparent 30%), radial-gradient(circle at top right, rgba(167, 139, 250, 0.2), transparent 26%), linear-gradient(135deg, #4c1d95 0%, #6d28d9 42%, #7c3aed 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
