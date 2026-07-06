/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#FD4D08',
          'primary-light': '#FE7A46',
          'primary-dark':  '#D93D00',
          cream:     '#F8E8D9',
          warm:      '#FFDBBA',
          footer:    '#FCDEC3',
          gold:      '#FCC47C',
          'gold-dark': '#FCA33A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.6s ease-out forwards',
        'fade-in-left':  'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'float':         'float 3s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'scale-in':      'scaleIn 0.4s ease-out forwards',
        'slide-down':    'slideDown 0.3s ease-out forwards',
        'spin-slow':     'spin 3s linear infinite',
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      boxShadow: {
        'brand-sm': '0 2px 15px rgba(253,120,69,0.3)',
        'brand':    '0 4px 20px rgba(253,120,69,0.4)',
        'brand-lg': '0 8px 40px rgba(253,120,69,0.5)',
        'card':     '0 2px 10px rgba(119,119,119,0.2)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
