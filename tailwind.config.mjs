/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#02040a',
          900: '#050a18',
          850: '#0a1026',
          800: '#0f1738',
          700: '#18234d',
          600: '#23336b',
          500: '#32488f',
        },
        nebula: {
          purple: '#7c3aed',
          violet: '#8b5cf6',
          indigo: '#6366f1',
          pink: '#ec4899',
          glow: 'rgba(139, 92, 246, 0.45)',
        },
        stellar: {
          gold: '#f59e0b',
          amber: '#fbbf24',
          yellow: '#fde047',
          glow: 'rgba(245, 158, 11, 0.35)',
        },
        cyan: {
          cosmic: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.4)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse-slow': 'spin-reverse 75s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'beam': 'beam 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.3))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(139, 92, 246, 0.75))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        beam: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'radial-radial-nebula': 'radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.18) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
        'radial-star-glow': 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 60%)',
        'cosmic-gradient': 'linear-gradient(135deg, #050a18 0%, #0a1026 50%, #030712 100%)',
      },
    },
  },
  plugins: [],
};
