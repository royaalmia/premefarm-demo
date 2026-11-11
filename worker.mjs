import { onRequest } from './functions/api/[[route]].js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API routes powered by Cloudflare D1 Database
    if (url.pathname.startsWith('/api')) {
      return onRequest({ request, env, params: {}, ctx });
    }

    // 2. Direct JSON route for /data/products.json (Universal Cross-Device Fallback)
    if (url.pathname === '/data/products.json') {
      const prodsReq = new Request(new URL('/api/products', request.url), request);
      return onRequest({ request: prodsReq, env, params: {}, ctx });
    }

    // 3. Cloudflare Static Assets natively serves HTML, CSS, images, client JS
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Assets binding not found', { status: 500 });
  }
};
