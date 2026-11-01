import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL || '/';
  const sitemap = new URL(`${base}sitemap-index.xml`, site ?? 'https://www.lacaleta.nl');

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.toString()}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
