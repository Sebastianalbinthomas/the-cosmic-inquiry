import type { APIRoute } from 'astro';
import { getTopics, createTopic } from '../../lib/cosmic-service';

export const GET: APIRoute = async ({ url }) => {
  const category = url.searchParams.get('category') || undefined;
  const topics = await getTopics(category);
  return new Response(JSON.stringify(topics), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const created = await createTopic(body);
    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
