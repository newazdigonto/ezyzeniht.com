/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#e1e9f2',
          200: '#c2d2e5',
          300: '#94b3d3',
          400: '#5f8ebd',
          500: '#3c70a6',
          600: '#2b5689',
          700: '#22446d',
          800: '#1c385b',
          900: '#0f2446', // Exact EZY Zenith Deep Navy from Logo
          950: '#081427',
        },
        zenith: {
          orange: '#f5932d', // Exact EZY Zenith Orange from Logo
          orangeHover: '#df7e17',
          orangeLight: '#fff7ed',
          dark: '#0f2446',
          slate: '#1c3454',
          blue: '#2c5282',
          lightBg: '#f8fafc',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'border-pulse': 'borderPulse 4s ease infinite',
        'border-spin': 'borderSpin 6s linear infinite',
        'border-slide': 'borderSlide 3s linear infinite',
      },
      keyframes: {
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(245, 147, 45, 0.4)' },
          '50%': { borderColor: 'rgba(15, 36, 70, 0.9)' },
        },
        borderSpin: {
          '100%': { transform: 'rotate(360deg)' }
        },
        borderSlide: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 36, 70, 0.05), 0 1px 2px -1px rgba(15, 36, 70, 0.03)',
        'minimal': '0 4px 20px -2px rgba(15, 36, 70, 0.06), 0 0 1px 1px rgba(15, 36, 70, 0.04)',
        'glow-orange': '0 0 25px -5px rgba(245, 147, 45, 0.35)',
        'glow-navy': '0 0 25px -5px rgba(15, 36, 70, 0.3)',
      }
    },
  },
  plugins: [],
}
