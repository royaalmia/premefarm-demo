import { onRequest } from './functions/api/[[route]].js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API routes powered by Cloudflare D1
    if (url.pathname.startsWith('/api')) {
      return onRequest({ request, env, params: {}, ctx });
    }

    // 2. Static Assets handling
    if (env.ASSETS) {
      const pathname = url.pathname;

      // Handle clean page routes directly
      const cleanPages = {
        '/shop': '/shop.html',
        '/cart': '/cart.html',
        '/profile': '/profile.html',
        '/admin': '/admin.html',
        '/landing': '/landing.html'
      };

      const normalized = pathname.replace(/\/$/, '');
      if (cleanPages[normalized]) {
        const targetUrl = new URL(cleanPages[normalized], request.url);
        const res = await env.ASSETS.fetch(new Request(targetUrl.toString()));
        // If assets attempts to redirect back to clean URL, serve the file content directly
        if (res.status >= 300 && res.status < 400) {
          const directUrl = new URL(cleanPages[normalized], request.url);
          const directRes = await env.ASSETS.fetch(directUrl.toString());
          return new Response(directRes.body, {
            status: 200,
            headers: directRes.headers
          });
        }
        return res;
      }

      // Default assets fetch
      let res = await env.ASSETS.fetch(request);
      
      // Fallback for any clean route without extension
      if (res.status === 404 && !pathname.includes('.')) {
        const fallbackUrl = new URL(`${normalized}.html`, request.url);
        const fallbackRes = await env.ASSETS.fetch(fallbackUrl.toString());
        if (fallbackRes.status < 400) {
          return new Response(fallbackRes.body, {
            status: 200,
            headers: fallbackRes.headers
          });
        }
      }

      return res;
    }

    return new Response('Not Found', { status: 404 });
  }
};
