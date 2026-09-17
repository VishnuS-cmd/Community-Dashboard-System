/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--theme-primary)',
        accent: 'var(--theme-accent)',
        surface: 'var(--theme-surface)',
        muted: 'var(--theme-muted)'
      }
    }
  },
  plugins: []
};
