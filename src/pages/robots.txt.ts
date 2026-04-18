import type { APIRoute } from 'astro';
import { absoluteUrl } from '../site';

/** Ссылка на sitemap для обхода и индексации (URL из site.ts + base). */
export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap-index.xml')}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
