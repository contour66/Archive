// app/api/locales/route.ts
export const runtime = 'nodejs'; // ensure Node, not Edge

export async function GET() {
  try {
    const env   = process.env.CONTENTSTACK_ENVIRONMENT!;
    const apiKey = process.env.CONTENTSTACK_API_KEY!;
    const token  = process.env.CONTENTSTACK_DELIVERY_TOKEN!;

    if (!env || !apiKey || !token) {
      return new Response('Missing CONTENTSTACK_ENVIRONMENT/API_KEY/DELIVERY_TOKEN', { status: 500 });
    }

    const url = `https://cdn.contentstack.io/v3/locales?environment=${encodeURIComponent(env)}`;

    const res = await fetch(url, {
      headers: { api_key: apiKey, access_token: token },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(text || 'Locales fetch failed', { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err: any) {
    return new Response(`Locales API error: ${err?.message || err}`, { status: 500 });
  }
}