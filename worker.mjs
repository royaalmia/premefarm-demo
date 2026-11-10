import { onRequest } from './functions/api/[[route]].js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Route API requests to D1 handler
    if (url.pathname.startsWith('/api')) {
      return onRequest({ request, env, params: {}, ctx });
    }

    // 2. Clean URLs routing for HTML pages
    const cleanRoutes = {
      '/': '/index.html',
      '/shop': '/shop.html',
      '/cart': '/cart.html',
      '/profile': '/profile.html',
      '/admin': '/admin.html',
      '/landing': '/landing.html'
    };

    if (cleanRoutes[url.pathname]) {
      const rewrittenUrl = new URL(request.url);
      rewrittenUrl.pathname = cleanRoutes[url.pathname];
      const rewrittenReq = new Request(rewrittenUrl, request);
      if (env.ASSETS) {
        return env.ASSETS.fetch(rewrittenReq);
      }
    }

    // 3. Serve static assets (CSS, JS, images, etc.) from ./public
    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }
      
      // Fallback for clean URL if not ended in .html
      if (!url.pathname.includes('.')) {
        const htmlUrl = new URL(request.url);
        htmlUrl.pathname = url.pathname + '.html';
        const htmlResp = await env.ASSETS.fetch(new Request(htmlUrl, request));
        if (htmlResp.status !== 404) {
          return htmlResp;
        }
      }
      return response;
    }

    return new Response('Not Found', { status: 404 });
  }
};
