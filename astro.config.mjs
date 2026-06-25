import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://charywoodworks.github.io',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => page !== undefined,
    }),
  ],
  output: 'static',
  image: {
    // Configure image optimization for when real photos replace placeholders
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Quality settings matching design spec (80% for gallery/hero)
        quality: 80,
      },
    },
  },
});
