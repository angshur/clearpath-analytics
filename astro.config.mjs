import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://clearpath-analytics.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  redirects: {
    '/services/data-engineering': '/data-engineering',
    '/services/semantic-layer': '/semantic-layer',
  },
});
