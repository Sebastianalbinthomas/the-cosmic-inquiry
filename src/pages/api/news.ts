import type { APIRoute } from 'astro';
import { getNews } from '../../lib/cosmic-service';

export const GET: APIRoute = async () => {
  const news = await getNews();
  return new Response(JSON.stringify(news), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
