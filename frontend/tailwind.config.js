/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5F6FB',
        surface: '#FFFFFF',
        ink: '#171B2E',
        muted: '#6B7089',
        line: '#E7E9F2',
        primary: {
          DEFAULT: '#0F9E93',
          dark: '#0B7A72',
          light: '#E3F6F3'
        },
        accent: {
          DEFAULT: '#FF6A4D',
          light: '#FFE8E2'
        },
        success: '#22A06B',
        warning: '#E3A008',
        danger: '#E23E57'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,27,46,0.04), 0 8px 24px rgba(23,27,46,0.06)'
      }
    }
  },
  plugins: []
};
