import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - electric blue to emerald gradient
        primary: {
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80c0ff',
          300: '#4da7ff',
          400: '#3d8bfd',
          500: '#0d6efd',
          600: '#0b5ed7',
          700: '#0a4ebd',
          800: '#083ea3',
          900: '#062e89',
        },
        secondary: {
          50: '#e8faf0',
          100: '#c5f2d9',
          200: '#a2eac2',
          300: '#7fe3ab',
          400: '#5cdb94',
          500: '#2ecc71',
          600: '#27ae60',
          700: '#219a52',
          800: '#1b8544',
          900: '#156f36',
        },
        // Dark theme palette
        dark: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#303030',
          800: '#262626',
          900: '#171717',
          950: '#121212',
        },
        accent: {
          coral: '#ff7f50',
          gold: '#ffd700',
          violet: '#8b5cf6',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'radial-gradient(circle at top right, rgba(13, 110, 253, 0.1), transparent 60%), radial-gradient(circle at bottom left, rgba(46, 204, 113, 0.1), transparent 60%)',
        'gradient-mesh': 'linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(46, 204, 113, 0.05) 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(13, 110, 253, 0.3)',
        'glow-md': '0 0 30px rgba(13, 110, 253, 0.4)',
        'glow-lg': '0 0 45px rgba(13, 110, 253, 0.5)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 15px 40px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.15' },
          '50%': { transform: 'scale(1.05)', opacity: '0.2' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e5e5e5',
            a: {
              color: '#3d8bfd',
              '&:hover': {
                color: '#5ca1fd',
              },
            },
            h1: { color: '#ffffff' },
            h2: { color: '#ffffff' },
            h3: { color: '#ffffff' },
            h4: { color: '#ffffff' },
            strong: { color: '#ffffff' },
            code: {
              color: '#e5e5e5',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
            },
            blockquote: {
              borderLeftColor: '#3d8bfd',
              color: '#a3a3a3',
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
