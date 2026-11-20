import type { APIRoute } from 'astro';
import { searchCosmos } from '../../lib/cosmic-service';

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q') || '';
  const results = await searchCosmos(query);
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
