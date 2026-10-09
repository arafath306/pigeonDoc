/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pigeon brand — vibrant emerald teal
        brand: {
          50: '#effcf6',
          100: '#d6f7e9',
          200: '#b0eed6',
          300: '#7adfbf',
          400: '#42c8a4',
          500: '#1fae8c',
          600: '#129073',
          700: '#11735e',
          800: '#125b4d',
          900: '#114b40',
          950: '#052b24',
        },
        // Midnight ink — deep navy for dark surfaces
        ink: {
          50: '#f4f6fa',
          100: '#e6ebf2',
          200: '#c9d4e3',
          300: '#a3b5cc',
          400: '#768fb0',
          500: '#546e92',
          600: '#3f5677',
          700: '#2c3d57',
          800: '#1a2639',
          900: '#0f1729',
          950: '#080d18',
        },
        // Warm gold — premium accent for special badges
        gold: {
          50: '#fbf8ef',
          100: '#f5ecd3',
          200: '#ead7a3',
          300: '#ddbd71',
          400: '#d0a548',
          500: '#c1912f',
          600: '#a37524',
          700: '#7d581e',
          800: '#543b14',
          900: '#33240c',
        },
        accent: {
          50: '#eefaff',
          100: '#d8f1ff',
          200: '#b9e7ff',
          300: '#88d8ff',
          400: '#4bc4ff',
          500: '#1aabff',
          600: '#008ce6',
          700: '#0070bd',
          800: '#075d99',
          900: '#0c4f7e',
          950: '#073354',
        },
        success: {
          50: '#effaf3',
          500: '#1fae8c',
          700: '#11735e',
        },
        warning: {
          50: '#fff8ec',
          500: '#f5a524',
          700: '#b97312',
        },
        error: {
          50: '#fef1f1',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Fraunces"', 'Inter', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)',
        'soft-md': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.06)',
        'soft-lg': '0 12px 32px -4px rgba(15, 23, 42, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        'glow': '0 0 0 1px rgba(31, 174, 140, 0.18), 0 8px 24px -8px rgba(31, 174, 140, 0.35)',
        'corporate': '0 1px 2px 0 rgba(8, 13, 24, 0.06), 0 8px 24px -8px rgba(8, 13, 24, 0.18)',
        'corporate-lg': '0 24px 64px -16px rgba(8, 13, 24, 0.28), 0 4px 16px -4px rgba(8, 13, 24, 0.12)',
        'gold-glow': '0 0 0 1px rgba(193, 145, 47, 0.25), 0 8px 24px -8px rgba(193, 145, 47, 0.4)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'fade-in-up': 'fade-in-up 0.35s ease-out',
        'scale-in': 'scale-in 0.18s ease-out',
        'slide-in-right': 'slide-in-right 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
