/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0B1624',
        base: '#050B14',
        primary: '#1886E6',
        accent: '#58A6FF',
        text: '#E6EDF3',
        muted: '#8B949E'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(24, 134, 230, 0.18)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseGlass: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlass: 'pulseGlass 5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
