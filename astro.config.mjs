import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Standaard waarden voor een livegang op het eigen domein van het restaurant.
// Bij een preview-deploy op GitHub Pages worden deze overschreven via env vars.
//
// Let op: DEPLOY_BASE bevat het pad zonder voorloopende slash. Een waarde als
// "/la-caleta" wordt door Git Bash op Windows als systeempad omgezet.
const site = process.env.SITE_URL ?? 'https://www.lacaleta.nl';
const deployBase = process.env.DEPLOY_BASE?.trim();
const base = deployBase ? `/${deployBase.replace(/^\/+|\/+$/g, '')}` : '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
