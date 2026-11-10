/**
 * Preme Farm - Cloudflare Pages Functions Universal Edge API
 * Powered by Cloudflare D1 Database (Edge SQLite)
 */

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

function parseJsonField(val, fallback = null) {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '');
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  // Ensure Cloudflare D1 binding is present
  const db = env.DB;
  if (!db) {
    return jsonResponse({
      success: false,
      message: 'Cloudflare D1 Database binding [DB] is not configured in Cloudflare Pages settings.',
      tip: 'Go to Cloudflare Pages > Settings > Functions > D1 Database Bindings, and bind DB to your database.'
    }, 503);
  }

  try {
    // ================= 1. HEALTH CHECK =================
    if (path === '/api/health') {
      return jsonResponse({ status: 'ok', engine: 'Cloudflare Edge Worker + D1', timestamp: new Date().toISOString() });
    }

    // ================= 2. PRODUCTS API =================
    if (path === '/api/products' && method === 'GET') {
      const q = url.searchParams.get('q');
      const cat = url.searchParams.get('category');
      
      let query = 'SELECT * FROM products WHERE 1=1';
      const params = [];

      if (cat && cat !== 'all') {
        query += ' AND category = ?';
        params.push(cat);
      }
      if (q) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${q}%`, `%${q}%`);
      }
      query += ' ORDER BY id ASC';

      const rows = (await db.prepare(query).bind(...params).all()).results || [];
      const data = rows.map(r => ({
        ...r,
        gallery: parseJsonField(r.gallery, []),
        benefits: parseJsonField(r.benefits, []),
        variants: parseJsonField(r.variants, [])
      }));
      return jsonResponse({ success: true, count: data.length, data });
    }

    const prodIdMatch = path.match(/^\/api\/products\/(\d+)$/);
    if (prodIdMatch && method === 'GET') {
      const id = parseInt(prodIdMatch[1]);
      const r = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
      if (!r) return jsonResponse({ success: false, message: 'Product not found' }, 404);
      return jsonResponse({
        success: true,
        data: {
          ...r,
          gallery: parseJsonField(r.gallery, []),
          benefits: parseJsonField(r.benefits, []),
          variants: parseJsonField(r.variants, [])
        }
      });
    }

    if (path === '/api/products' && method === 'POST') {
      const body = await request.json();
      const nextIdRow = await db.prepare('SELECT MAX(id) as maxId FROM products').first();
      const nextId = (nextIdRow?.maxId || 0) + 1;

      await db.prepare(`
        INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        nextId,
        body.name || 'নতুন প্রোডাক্ট',
        body.slug || `prod-${nextId}`,
        body.category || 'others',
        body.categoryName || 'অন্যান্য',
        body.tag || '',
        body.price || (body.variants?.[0]?.price || 0),
        body.regularPrice || (body.variants?.[0]?.regularPrice || 0),
        5.0,
        10,
        body.image || 'images/logo.png',
        JSON.stringify(body.gallery || []),
        body.description || '',
        JSON.stringify(body.benefits || []),
        body.ingredients || '',
        JSON.stringify(body.variants || [])
      ).run();

      return jsonResponse({ success: true, id: nextId, message: 'প্রোডাক্ট সফলভাবে তৈরি হয়েছে' });
    }

    if (prodIdMatch && method === 'PUT') {
      const id = parseInt(prodIdMatch[1]);
      const body = await request.json();
      await db.prepare(`
        UPDATE products SET 
          name = COALESCE(?, name),
          category = COALESCE(?, category),
          price = COALESCE(?, price),
          regularPrice = COALESCE(?, regularPrice),
          description = COALESCE(?, description),
          variants = COALESCE(?, variants)
        WHERE id = ?
      `).bind(
        body.name,
        body.category,
        body.price,
        body.regularPrice,
        body.description,
        body.variants ? JSON.stringify(body.variants) : null,
        id
      ).run();
      return jsonResponse({ success: true, message: 'প্রোডাক্ট আপডেট হয়েছে' });
    }

    if (prodIdMatch && method === 'DELETE') {
      const id = parseInt(prodIdMatch[1]);
      await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true, message: 'প্রোডাক্ট মুছে ফেলা হয়েছে' });
    }

    // ================= 3. ORDERS API =================
    if (path === '/api/orders' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all()).results || [];
      const orders = rows.map(r => ({
        ...r,
        customer: parseJsonField(r.customer, {}),
        items: parseJsonField(r.items, []),
        courier: parseJsonField(r.courier, null),
        lastUpdatedBy: parseJsonField(r.lastUpdatedBy, null)
      }));
      return jsonResponse({ success: true, count: orders.length, orders });
    }

    if (path === '/api/orders' && method === 'POST') {
      const body = await request.json();
      const countRow = await db.prepare('SELECT COUNT(*) as cnt FROM orders').first();
      const num = 1000 + (countRow?.cnt || 0) + 1;
      const orderId = `PF-${num}`;

      const customer = body.customer || {};
      const items = body.items || [];
      const subtotal = body.subtotal || items.reduce((acc, i) => acc + ((i.price || 0) * (i.quantity || 1)), 0);
      const deliveryCharge = body.deliveryCharge !== undefined ? body.deliveryCharge : 70;
      const total = body.total || (subtotal + deliveryCharge);
      const createdAt = new Date().toISOString();

      await db.prepare(`
        INSERT INTO orders (id, customer, items, subtotal, deliveryCharge, total, status, source, callCenterNote, courier, lastUpdatedBy, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderId,
        JSON.stringify(customer),
        JSON.stringify(items),
        subtotal,
        deliveryCharge,
        total,
        body.status || 'Pending',
        body.source || 'Website Store',
        body.notes || body.callCenterNote || '',
        JSON.stringify(null),
        JSON.stringify({ agent: body.agent || 'Website Customer', timestamp: createdAt }),
        createdAt
      ).run();

      // Log activity
      await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
        orderId,
        body.agent || 'Website Customer',
        `নতুন অর্ডার #${orderId} প্লেস করা হয়েছে (টাকা: ৳${total})`,
        createdAt
      ).run();

      // If customer had an abandoned order with this phone, auto resolve it
      if (customer.phone) {
        await db.prepare("UPDATE failed_orders SET status = 'Recovered' WHERE customer LIKE ?").bind(`%"phone":"${customer.phone}"%`).run();
      }

      return jsonResponse({ success: true, order: { id: orderId, total, status: 'Pending' } }, 201);
    }

    const orderIdMatch = path.match(/^\/api\/orders\/([A-Za-z0-9\-]+)$/);
    if (orderIdMatch && method === 'PUT') {
      const id = orderIdMatch[1];
      const body = await request.json();
      const existing = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first();
      if (!existing) return jsonResponse({ success: false, message: 'Order not found' }, 404);

      const status = body.status || existing.status;
      const customer = body.customer ? JSON.stringify(body.customer) : existing.customer;
      const subtotal = body.subtotal !== undefined ? body.subtotal : existing.subtotal;
      const deliveryCharge = body.deliveryCharge !== undefined ? body.deliveryCharge : existing.deliveryCharge;
      const total = body.total !== undefined ? body.total : (subtotal + deliveryCharge);
      const callCenterNote = body.callCenterNote !== undefined ? body.callCenterNote : existing.callCenterNote;
      const lastUpdatedBy = JSON.stringify({ agent: body.agent || 'Admin', timestamp: new Date().toISOString() });

      await db.prepare(`
        UPDATE orders SET status = ?, customer = ?, subtotal = ?, deliveryCharge = ?, total = ?, callCenterNote = ?, lastUpdatedBy = ?
        WHERE id = ?
      `).bind(status, customer, subtotal, deliveryCharge, total, callCenterNote, lastUpdatedBy, id).run();

      await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
        id,
        body.agent || 'Admin',
        `অর্ডার স্ট্যাটাস পরিবর্তিত: ${status}`,
        new Date().toISOString()
      ).run();

      return jsonResponse({ success: true, message: 'অর্ডার সফলভাবে আপডেট হয়েছে' });
    }

    if (orderIdMatch && method === 'DELETE') {
      const id = orderIdMatch[1];
      await db.prepare('DELETE FROM orders WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true, message: 'অর্ডার মুছে ফেলা হয়েছে' });
    }

    // ================= 4. FAILED ORDERS API =================
    if (path === '/api/failed-orders' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM failed_orders ORDER BY createdAt DESC').all()).results || [];
      const data = rows.map(r => ({
        ...r,
        customer: parseJsonField(r.customer, {})
      }));
      return jsonResponse({ success: true, count: data.length, data });
    }

    if (path === '/api/failed-orders' && method === 'POST') {
      const body = await request.json();
      const phone = body.customer?.phone;
      if (!phone || phone.length < 10) {
        return jsonResponse({ success: false, message: 'Valid phone required' }, 400);
      }

      // Check if existing record for this phone
      const existing = await db.prepare("SELECT id FROM failed_orders WHERE customer LIKE ? AND status = 'Failed / Abandoned'").bind(`%"phone":"${phone}"%`).first();
      const failId = existing ? existing.id : `FAIL-${Math.floor(100 + Math.random() * 900)}`;

      if (existing) {
        await db.prepare(`
          UPDATE failed_orders SET customer = ?, product = ?, amount = ?, step = ?, reason = ?
          WHERE id = ?
        `).bind(
          JSON.stringify(body.customer),
          body.product || 'প্রিমি ফার্ম পণ্য',
          body.amount || 0,
          body.step || 'Checkout Form Interaction',
          body.reason || 'ফর্ম পূরণ করার পর অর্ডার কনফার্ম করেননি',
          failId
        ).run();
      } else {
        await db.prepare(`
          INSERT INTO failed_orders (id, customer, product, amount, step, reason, status, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          failId,
          JSON.stringify(body.customer),
          body.product || 'প্রিমি ফার্ম পণ্য',
          body.amount || 0,
          body.step || 'Checkout Form Interaction',
          body.reason || 'ফর্ম পূরণ করার পর অর্ডার কনফার্ম করেননি',
          'Failed / Abandoned',
          new Date().toISOString()
        ).run();
      }

      return jsonResponse({ success: true, id: failId });
    }

    const failDeleteMatch = path.match(/^\/api\/failed-orders\/([A-Za-z0-9\-]+)$/);
    if (failDeleteMatch && method === 'DELETE') {
      const id = failDeleteMatch[1];
      await db.prepare('DELETE FROM failed_orders WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true, message: 'ব্যর্থ অর্ডার রেকর্ড ডিলিট করা হয়েছে' });
    }

    const failConvertMatch = path.match(/^\/api\/failed-orders\/convert\/([A-Za-z0-9\-]+)$/);
    if (failConvertMatch && method === 'POST') {
      const failId = failConvertMatch[1];
      const failItem = await db.prepare('SELECT * FROM failed_orders WHERE id = ?').bind(failId).first();
      if (!failItem) return jsonResponse({ success: false, message: 'Record not found' }, 404);

      const cust = parseJsonField(failItem.customer, {});
      const countRow = await db.prepare('SELECT COUNT(*) as cnt FROM orders').first();
      const num = 1000 + (countRow?.cnt || 0) + 1;
      const orderId = `PF-${num}`;
      const createdAt = new Date().toISOString();

      await db.prepare(`
        INSERT INTO orders (id, customer, items, subtotal, deliveryCharge, total, status, source, callCenterNote, courier, lastUpdatedBy, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderId,
        JSON.stringify(cust),
        JSON.stringify([{ id: 1, name: failItem.product || 'প্রিমি ফার্ম কালো সোনা', price: failItem.amount || 950, quantity: 1 }]),
        failItem.amount || 950,
        70,
        (failItem.amount || 950) + 70,
        'Confirmed',
        'Failed Order Conversion',
        'কল সেন্টার থেকে ব্যর্থ লিড সফল অর্ডারে কনভার্ট করা হয়েছে',
        JSON.stringify(null),
        JSON.stringify({ agent: 'Call Center Agent', timestamp: createdAt }),
        createdAt
      ).run();

      await db.prepare("UPDATE failed_orders SET status = 'Recovered' WHERE id = ?").bind(failId).run();

      return jsonResponse({ success: true, message: `সফলভাবে অর্ডার #${orderId} তৈরি করা হয়েছে!`, orderId });
    }

    // ================= 5. ADMIN AUTHENTICATION =================
    if (path === '/api/admin/login' && method === 'POST') {
      const body = await request.json();
      const { username, password } = body;

      // Master admin check
      if ((username === 'admin@premefarm.com' || username === 'admin') && password === 'Admin@PremeFarm') {
        return jsonResponse({
          success: true,
          token: 'token_master_admin_' + Date.now(),
          user: { id: 'ADMIN-01', name: 'সুপার এডমিন', email: 'admin@premefarm.com', role: 'Super Admin' }
        });
      }

      // Check database users / staff
      const user = await db.prepare('SELECT * FROM users WHERE phone = ? OR id = ?').bind(username, username).first();
      if (user && user.password === password && (user.role === 'admin' || user.role === 'super_admin' || user.role === 'staff')) {
        return jsonResponse({
          success: true,
          token: 'token_' + user.id + '_' + Date.now(),
          user: { id: user.id, name: user.name, role: user.role }
        });
      }

      return jsonResponse({ success: false, message: 'ভুল ইমেইল আইডি অথবা পাসওয়ার্ড!' }, 401);
    }

    // ================= 6. CUSTOMER AUTHENTICATION =================
    if (path === '/api/auth/register' && method === 'POST') {
      const body = await request.json();
      const { name, phone, password } = body;
      if (!phone || !password) return jsonResponse({ success: false, message: 'Phone and password required' }, 400);

      const exists = await db.prepare('SELECT id FROM users WHERE phone = ?').bind(phone).first();
      if (exists) return jsonResponse({ success: false, message: 'এই মোবাইল নম্বরে ইতিমধ্যে একাউন্ট রয়েছে' }, 409);

      const userId = `USR-${Date.now().toString().slice(-6)}`;
      await db.prepare('INSERT INTO users (id, phone, name, password, role, createdAt) VALUES (?, ?, ?, ?, ?, datetime(\'now\'))').bind(
        userId, phone, name || 'সম্মানিত গ্রাহক', password, 'customer'
      ).run();

      return jsonResponse({ success: true, user: { id: userId, phone, name: name || 'সম্মানিত গ্রাহক', role: 'customer' } });
    }

    if (path === '/api/auth/login' && method === 'POST') {
      const body = await request.json();
      const { phone, password } = body;
      const user = await db.prepare('SELECT * FROM users WHERE phone = ? AND password = ?').bind(phone, password).first();
      if (!user) return jsonResponse({ success: false, message: 'মোবাইল নম্বর অথবা পাসওয়ার্ড সঠিক নয়' }, 401);

      return jsonResponse({ success: true, user: { id: user.id, phone: user.phone, name: user.name, role: user.role } });
    }

    if (path === '/api/auth/profile' && method === 'PUT') {
      const body = await request.json();
      const { phone, name, newPassword } = body;
      if (!phone) return jsonResponse({ success: false, message: 'Phone required' }, 400);

      if (newPassword) {
        await db.prepare('UPDATE users SET name = ?, password = ? WHERE phone = ?').bind(name, newPassword, phone).run();
      } else {
        await db.prepare('UPDATE users SET name = ? WHERE phone = ?').bind(name, phone).run();
      }

      return jsonResponse({ success: true, message: 'প্রোফাইল আপডেট হয়েছে' });
    }

    // ================= 7. BLACKLIST & SECURITY =================
    if (path === '/api/blacklist' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM blacklist ORDER BY id DESC').all()).results || [];
      const phones = rows.filter(r => r.type === 'phone').map(r => r.value);
      const ips = rows.filter(r => r.type === 'ip').map(r => r.value);
      return jsonResponse({ success: true, blacklist: { phones, ips, fullRecords: rows } });
    }

    if (path === '/api/blacklist' && method === 'POST') {
      const body = await request.json();
      const { type, value, reason, blockedBy } = body;
      if (!value) return jsonResponse({ success: false, message: 'Value required' }, 400);

      await db.prepare('INSERT OR REPLACE INTO blacklist (type, value, reason, blockedBy, createdAt) VALUES (?, ?, ?, ?, datetime(\'now\'))').bind(
        type || 'phone',
        value.trim(),
        reason || 'সন্দেহজনক কার্যকলাপ',
        blockedBy || 'সুপার এডমিন'
      ).run();

      return jsonResponse({ success: true, message: `${value} ব্ল্যাকলিস্টে যুক্ত করা হয়েছে` });
    }

    const blDelMatch = path.match(/^\/api\/blacklist\/([a-z]+)\/(.+)$/);
    if (blDelMatch && method === 'DELETE') {
      const type = blDelMatch[1];
      const val = decodeURIComponent(blDelMatch[2]);
      await db.prepare('DELETE FROM blacklist WHERE type = ? AND value = ?').bind(type, val).run();
      return jsonResponse({ success: true, message: `${val} আনব্লক করা হয়েছে` });
    }

    // ================= 8. AUDIT LOGS =================
    if (path === '/api/audit-logs' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100').all()).results || [];
      return jsonResponse({ success: true, logs: rows });
    }

    // ================= 9. COUPONS =================
    if (path === '/api/coupons' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM coupons WHERE status = \'active\'').all()).results || [];
      return jsonResponse({ success: true, coupons: rows });
    }

    if (path === '/api/coupons/apply' && method === 'POST') {
      const body = await request.json();
      const code = (body.code || '').trim().toUpperCase();
      const orderTotal = body.total || 0;

      const coupon = await db.prepare('SELECT * FROM coupons WHERE UPPER(code) = ? AND status = \'active\'').bind(code).first();
      if (!coupon) return jsonResponse({ success: false, message: 'অবৈধ কুপন কোড' }, 400);

      if (coupon.minOrder && orderTotal < coupon.minOrder) {
        return jsonResponse({ success: false, message: `এই কুপন ব্যবহারের জন্য সর্বনিম্ন ৳${coupon.minOrder} টাকার অর্ডার প্রয়োজন` }, 400);
      }

      return jsonResponse({ success: true, discount: coupon.discount, type: coupon.type });
    }

    // ================= 10. SETTINGS & CMS =================
    if (path === '/api/settings' && method === 'GET') {
      const r = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('general').first();
      const settings = r ? parseJsonField(r.value, {}) : {};
      return jsonResponse({ success: true, settings });
    }

    if (path === '/api/settings' && method === 'POST') {
      const body = await request.json();
      await db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind('general', JSON.stringify(body)).run();
      return jsonResponse({ success: true, message: 'সেটিংস আপডেট হয়েছে' });
    }

    if (path === '/api/cms' && method === 'GET') {
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, {}) : {};
      return jsonResponse({ success: true, content });
    }

    if (path === '/api/cms' && method === 'POST') {
      const body = await request.json();
      await db.prepare('INSERT OR REPLACE INTO cms (key, value) VALUES (?, ?)').bind('content', JSON.stringify(body)).run();
      return jsonResponse({ success: true, message: 'CMS কন্টেন্ট আপডেট হয়েছে' });
    }

    // ================= 11. LANDING PAGES =================
    if (path === '/api/landing' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM landing_pages').all()).results || [];
      return jsonResponse({ success: true, data: rows });
    }

    return jsonResponse({ success: false, message: `Route not found: ${method} ${path}` }, 404);

  } catch (err) {
    return jsonResponse({ success: false, error: err.message, stack: err.stack }, 500);
  }
}
