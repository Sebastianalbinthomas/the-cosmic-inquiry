import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

const isBuild = process.argv.includes('build') || process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: isBuild ? netlify() : undefined,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['three', 'lucide-react'],
    },
  },
});
