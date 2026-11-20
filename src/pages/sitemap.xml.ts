import type { APIRoute } from 'astro';
import { getTopics, getCategories, getNews } from '../lib/cosmic-service';
import { SOLAR_SYSTEM_PLANETS } from '../lib/cosmic-data';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://the-cosmic-inquiry.netlify.app';

  const [topics, categories, news] = await Promise.all([
    getTopics(),
    getCategories(),
    getNews()
  ]);

  const staticUrls = [
    '',
    '/timeline',
    '/glossary',
    '/chronicle'
  ];

  const categoryUrls = categories.map((c) => `/categories/${c.slug}`);
  const topicUrls = topics.map((t) => `/explore/${t.slug}`);
  const planetUrls = SOLAR_SYSTEM_PLANETS.map((p) => `/explore/${p.slug}`);
  const newsUrls = news.map((n) => `/chronicle/${n.slug}`);

  const allUrls = Array.from(new Set([...staticUrls, ...categoryUrls, ...topicUrls, ...planetUrls, ...newsUrls]));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/explore') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
