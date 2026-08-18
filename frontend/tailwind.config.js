/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olympic: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#60a5fa',
          400: '#3b82f6',
          500: '#005EB8',
          600: '#0050A0',
          700: '#003D7A',
          800: '#002B57',
          900: '#0A1628',
          950: '#060D1A',
        },
        navy: {
          800: '#111827',
          900: '#0A1628',
          950: '#060D1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-left': 'slideLeft 0.5s ease-out both',
        'slide-right': 'slideRight 0.5s ease-out both',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'gradient-x': 'gradientX 8s ease infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'wave-1': 'wave1 4s ease-in-out infinite',
        'wave-2': 'wave2 5s ease-in-out infinite',
        'wave-3': 'wave3 6s ease-in-out infinite',
        'bob': 'bob 3s ease-in-out infinite',
        'bob-delayed': 'bob 3s ease-in-out 1.5s infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'sway-delayed': 'sway 5s ease-in-out 1s infinite',
        'swim': 'swim 8s linear infinite',
        'swim-delayed': 'swim 10s linear 2s infinite',
        'bubble-rise': 'bubbleRise 4s ease-in infinite',
        'sail': 'sail 7s ease-in-out infinite',
        'cruise': 'cruise 9s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounceSoft: {
          '0%': { opacity: '0', transform: 'scale(0.3) translateY(20px)' },
          '50%': { transform: 'scale(1.05) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        wave1: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-20px)' },
        },
        wave2: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(15px)' },
        },
        wave3: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-10px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-4px) rotate(1deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        swim: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(15px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(0px)', opacity: '0.6' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        },
        sail: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-3px) translateX(8px) rotate(1deg)' },
          '50%': { transform: 'translateY(-5px) translateX(0px) rotate(-0.5deg)' },
          '75%': { transform: 'translateY(-2px) translateX(-8px) rotate(0.5deg)' },
        },
        cruise: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '30%': { transform: 'translateY(-2px) translateX(6px)' },
          '60%': { transform: 'translateY(2px) translateX(-6px)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
