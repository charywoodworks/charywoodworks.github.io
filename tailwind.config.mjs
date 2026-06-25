/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#fdf8f0',
          100: '#f5e6d3',
          200: '#e8c9a0',
          300: '#d4a373',
          400: '#b8834f',
          500: '#8B5E3C',
          600: '#6d4a2f',
          700: '#523723',
          800: '#3a2718',
          900: '#2a1c11',
        },
        accent: {
          DEFAULT: '#1B5E20',
          light: '#2E7D32',
          dark: '#0D3B11',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1FAD53',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        touch: '44px',
      },
    },
  },
  plugins: [],
};
