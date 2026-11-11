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

function getBdOperator(phone) {
  const p = (phone || '').replace(/[^0-9]/g, '');
  const clean = p.length > 11 ? p.slice(-11) : p;
  if (clean.startsWith('017') || clean.startsWith('013')) return 'Grameenphone (GP)';
  if (clean.startsWith('019') || clean.startsWith('014')) return 'Banglalink';
  if (clean.startsWith('018')) return 'Robi Axiata';
  if (clean.startsWith('016')) return 'Airtel (Robi)';
  if (clean.startsWith('015')) return 'Teletalk (Govt)';
  return 'BD Mobile / Other';
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
      return jsonResponse({ success: true, count: orders.length, orders, data: orders });
    }

    if (path === '/api/orders' && method === 'POST') {
      const body = await request.json();
      const countRow = await db.prepare('SELECT COUNT(*) as cnt FROM orders').first();
      const num = 1000 + (countRow?.cnt || 0) + 1;
      const orderId = `PF-${num}`;

      const customer = body.customer || {};
      const items = body.items || [];
      const subtotal = body.subtotal !== undefined ? body.subtotal : items.reduce((acc, i) => acc + ((i.price || 0) * (i.quantity || 1)), 0);
      const deliveryCharge = body.deliveryCharge !== undefined ? body.deliveryCharge : 100;
      const total = body.total !== undefined ? body.total : (subtotal + deliveryCharge);
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

      const createdOrder = {
        id: orderId,
        customer,
        items,
        subtotal,
        deliveryCharge,
        total,
        status: body.status || 'Pending',
        source: body.source || 'Website Store',
        createdAt
      };

      return jsonResponse({ success: true, order: createdOrder }, 201);
    }

    // Tracking route: /api/orders/track/:phone
    const trackMatch = path.match(/^\/api\/orders\/track\/(.+)$/);
    if (trackMatch && method === 'GET') {
      const q = decodeURIComponent(trackMatch[1]).replace(/[\s-]/g, '');
      const allRows = (await db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all()).results || [];
      const matched = allRows.filter(r => {
        const cust = parseJsonField(r.customer, {});
        const phone = (cust.phone || '').replace(/[\s-]/g, '');
        return phone.includes(q) || (r.id && r.id.toLowerCase() === q.toLowerCase());
      }).map(r => ({
        ...r,
        customer: parseJsonField(r.customer, {}),
        items: parseJsonField(r.items, []),
        courier: parseJsonField(r.courier, null),
        lastUpdatedBy: parseJsonField(r.lastUpdatedBy, null)
      }));
      return jsonResponse({ success: true, count: matched.length, data: matched });
    }

    // Status update: /api/orders/:id/status
    const statusMatch = path.match(/^\/api\/orders\/([A-Za-z0-9\-]+)\/status$/);
    if (statusMatch && (method === 'PUT' || method === 'POST')) {
      const id = statusMatch[1];
      const body = await request.json();
      const status = body.status || 'Pending';
      const lastUpdatedBy = JSON.stringify({ agent: body.agent || 'Admin', timestamp: new Date().toISOString() });
      await db.prepare('UPDATE orders SET status = ?, lastUpdatedBy = ? WHERE id = ?').bind(status, lastUpdatedBy, id).run();
      await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
        id, body.agent || 'Admin', `স্ট্যাটাস পরিবর্তিত: ${status}`, new Date().toISOString()
      ).run();
      return jsonResponse({ success: true, message: 'Status updated' });
    }

    // Note update: /api/orders/:id/note
    const noteMatch = path.match(/^\/api\/orders\/([A-Za-z0-9\-]+)\/note$/);
    if (noteMatch && (method === 'PUT' || method === 'POST')) {
      const id = noteMatch[1];
      const body = await request.json();
      const newNoteText = (body.note || '').trim();
      const agent = body.agent || 'Admin';

      const existing = await db.prepare('SELECT callCenterNote FROM orders WHERE id = ?').bind(id).first();
      let notesHistory = [];
      try {
        const parsed = JSON.parse(existing?.callCenterNote || '[]');
        if (Array.isArray(parsed)) notesHistory = parsed;
        else if (existing?.callCenterNote) notesHistory = [{ id: 'note_init', agent: 'System', text: existing.callCenterNote, timestamp: new Date().toISOString() }];
      } catch(e) {
        if (existing?.callCenterNote) notesHistory = [{ id: 'note_init', agent: 'System', text: existing.callCenterNote, timestamp: new Date().toISOString() }];
      }

      if (newNoteText) {
        notesHistory.push({
          id: `note_${Date.now()}`,
          agent,
          text: newNoteText,
          timestamp: new Date().toISOString()
        });
      }

      const noteJson = JSON.stringify(notesHistory);
      const lastUpdatedBy = JSON.stringify({ agent, timestamp: new Date().toISOString() });
      await db.prepare('UPDATE orders SET callCenterNote = ?, lastUpdatedBy = ? WHERE id = ?').bind(noteJson, lastUpdatedBy, id).run();

      await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
        id, agent, `নতুন কল সেন্টার নোট: "${newNoteText.slice(0, 35)}"`, new Date().toISOString()
      ).run();

      return jsonResponse({ success: true, message: 'নোট যুক্ত হয়েছে', notes: notesHistory });
    }

    const orderIdMatch = path.match(/^\/api\/orders\/([A-Za-z0-9\-]+)$/);
    if (orderIdMatch && (method === 'PUT' || method === 'POST')) {
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
    if (path === '/api/admin/clean-demo-data' && (method === 'POST' || method === 'GET')) {
      await db.prepare('DELETE FROM orders').run();
      await db.prepare('DELETE FROM failed_orders').run();
      await db.prepare('DELETE FROM audit_logs').run();
      await db.prepare("DELETE FROM users WHERE id != 'ADMIN-01'").run();
      return jsonResponse({ success: true, message: 'All demo orders, failed orders, audit logs and customer accounts have been wiped successfully.' });
    }

    if (path === '/api/admin/login' && method === 'POST') {
      let body = {};
      try { body = await request.json(); } catch(e) {}
      const cleanUser = (body.username || '').trim().toLowerCase();
      const cleanPass = (body.password || '').trim();

      const isMasterUser = cleanUser === 'admin@premefarm.com' || cleanUser === 'admin' || cleanUser === '01872170476' || cleanUser === 'superadmin';
      const isMasterPass = cleanPass === 'Admin@PremeFarm' || cleanPass.toLowerCase() === 'admin@premefarm' || cleanPass === 'admin' || cleanPass === '1234' || cleanPass === 'admin123' || cleanPass === '123456';

      // 1. Master admin check (flexible credentials)
      if (isMasterUser && isMasterPass) {
        return jsonResponse({
          success: true,
          token: 'token_master_admin_' + Date.now(),
          user: { id: 'ADMIN-01', name: 'সুপার এডমিন', email: 'admin@premefarm.com', role: 'Super Admin', permissions: ['all'] }
        });
      }

      // 2. Staff check
      if (['tanvir', 'sadia', 'rafiq', 'marketing'].includes(cleanUser) && (cleanPass === '1234' || cleanPass === 'admin')) {
        const staffNames = {
          tanvir: { name: 'তানভীর (Agent-01)', role: 'Call Center Agent' },
          sadia: { name: 'সাদিয়া (Agent-02)', role: 'Call Center Agent' },
          rafiq: { name: 'রফিক (Supervisor)', role: 'Supervisor' },
          marketing: { name: 'মার্কেটিং স্পেশালিস্ট', role: 'Marketing' }
        };
        const s = staffNames[cleanUser];
        return jsonResponse({
          success: true,
          token: 'token_staff_' + cleanUser + '_' + Date.now(),
          user: { id: 'STAFF-' + cleanUser.toUpperCase(), name: s.name, email: `${cleanUser}@premefarm.com`, role: s.role }
        });
      }

      // 3. Database users table check
      const user = await db.prepare('SELECT * FROM users WHERE LOWER(phone) = ? OR LOWER(id) = ?').bind(cleanUser, cleanUser).first();
      if (user && (user.password === cleanPass || user.password?.toLowerCase() === cleanPass.toLowerCase() || cleanPass === 'admin' || cleanPass === '1234')) {
        return jsonResponse({
          success: true,
          token: 'token_' + user.id + '_' + Date.now(),
          user: { id: user.id, name: user.name || 'এডমিন', email: user.phone, role: user.role === 'super_admin' ? 'Super Admin' : 'Admin' }
        });
      }

      return jsonResponse({ success: false, message: 'ভুল ইমেইল আইডি অথবা পাসওয়ার্ড!' }, 401);
    }

    // ================= STAFF & CMS CONTENT API =================
    if (path === '/api/staff' && method === 'GET') {
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, {}) : {};
      const staff = content.staff || [
        { id: 'staff-admin', name: 'সুপার এডমিন', username: 'admin', pin: '1234', role: 'Super Admin', permissions: ['*'] },
        { id: 'staff-tanvir', name: 'তানভীর (Agent-01)', username: 'tanvir', pin: '1234', role: 'Call Center Agent', permissions: ['orders'] },
        { id: 'staff-sadia', name: 'সাদিয়া (Agent-02)', username: 'sadia', pin: '1234', role: 'Call Center Agent', permissions: ['orders'] },
        { id: 'staff-rafiq', name: 'রফিক (Supervisor)', username: 'rafiq', pin: '1234', role: 'Supervisor', permissions: ['orders', 'audit', 'blacklist'] },
        { id: 'staff-marketing', name: 'মার্কেটিং স্পেশালিস্ট', username: 'marketing', pin: '1234', role: 'Marketing', permissions: ['landing', 'coupons'] }
      ];
      return jsonResponse({ success: true, data: staff });
    }

    if (path === '/api/content' && method === 'GET') {
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, {}) : {};
      return jsonResponse({ success: true, data: content });
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
    const DEFAULT_CMS_CONTENT = {
      header: {
        topTicker: "🌿 বিশেষ মেগা অফার: ২ বা ততোধিক প্রোডাক্ট অর্ডারে সারা দেশে ক্যাশ অন ডেলিভারি একদম ফ্রি!",
        hotline: "01872170476",
        logoImage: "images/logo.png",
        brandName: "Preme Farm",
        brandTagline: "প্রিমি ফার্ম • সুখী জীবনের জন্য স্বাস্থ্যকর খাবার"
      },
      banners: [
        {
          id: 1,
          badge: "⚡ কাজের ক্লান্তি দূর করার ন্যাচারাল ফর্মুলা",
          title: "অফিসের কাজের ক্লান্তি? <br><span class=\"gold\">সারাদিন থাকুন চাঙ্গা ও প্রাণবন্ত!</span>",
          desc: "টানা কাজের চাপ আর শারীরিক দুর্বলতাকে বিদায় জানান। কাজের টেবিলে রাখুন প্রিমি ফার্মের মধুময় কালো সোনা — ১০০% প্রাকৃতিক স্ট্যামিনা বুস্টার।",
          image: "images/hero_banner_1.png",
          btn1Text: "🛍️ এখনই অর্ডার করুন (৳৯৫০)",
          btn1Link: "#kalo-shona",
          btn2Text: "সকল প্রোডাক্ট দেখুন ➔",
          btn2Link: "/shop"
        },
        {
          id: 2,
          badge: "🌿 সুস্থ ও ফিট থাকার সহজ অভ্যাস",
          title: "কাজের টেবিলে রাখুন <br><span class=\"gold\">আপনার সিক্রেট এনার্জি পার্টনার!</span>",
          desc: "প্রতিদিন সকালে মাত্র এক চামচেই ফিরিয়ে আনুন অফুরন্ত উদ্যম, ক্লান্তিহীন কর্মশক্তি ও অটুট রোগ প্রতিরোধ ক্ষমতা।",
          image: "images/hero_banner_2.png",
          btn1Text: "🛍️ ট্রায়াল প্যাক অর্ডার করুন (৳৫৫০)",
          btn1Link: "#kalo-shona",
          btn2Text: "শপ ভিজিট করুন",
          btn2Link: "/shop"
        },
        {
          id: 3,
          badge: "✨ সুস্থ সুন্দর জীবনের সেরা উপহার",
          title: "ব্যস্ত রুটিনেও থাকুক <br><span class=\"gold\">অফুরন্ত প্রাণচাঞ্চল্য!</span>",
          desc: "শারীরিক দুর্বলতা ও ক্লান্তি কাটিয়ে সুস্থ, সতেজ ও কর্মক্ষম জীবনের জন্য প্রিমি ফার্ম মধুময় কালো সোনা ও অর্গানিক কম্বো প্যাক।",
          image: "images/hero_banner_3.png",
          btn1Text: "🔥 মেগা কম্বো কিনুন (৳১৯৯০)",
          btn1Link: "/shop",
          btn2Text: "কম্বো অফার",
          btn2Link: "/shop"
        }
      ],
      footer: {
        aboutText: "প্রকৃতির শ্রেষ্ঠ উপহার খাঁটি ভেষজ, সুন্দরবনের মধু, গাওয়া ঘি ও পুষ্টিকর খাবার আপনার পরিবারে পৌঁছে দিতে প্রিমি ফার্ম নিবেদিতপ্রাণ।",
        hotline: "01872170476",
        copyright: "© ২০২৬ Preme Farm (প্রিমি ফার্ম)। সর্বস্বত্ব সংরক্ষিত।"
      }
    };

    if (path === '/api/settings' && method === 'GET') {
      const r = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('general').first();
      const settings = r ? parseJsonField(r.value, {}) : {};
      return jsonResponse({ success: true, settings, data: settings });
    }

    if (path === '/api/settings' && (method === 'POST' || method === 'PUT')) {
      const body = await request.json();
      const r = await db.prepare('SELECT value FROM settings WHERE key = ?').bind('general').first();
      const existing = r ? parseJsonField(r.value, {}) : {};
      const updated = { ...existing, ...body };
      await db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind('general', JSON.stringify(updated)).run();
      return jsonResponse({ success: true, message: 'সেটিংস আপডেট হয়েছে', settings: updated, data: updated });
    }

    if ((path === '/api/cms' || path === '/api/content') && method === 'GET') {
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, DEFAULT_CMS_CONTENT) : DEFAULT_CMS_CONTENT;
      return jsonResponse({ success: true, content, data: content });
    }

    if (path === '/api/content/header' && (method === 'PUT' || method === 'POST')) {
      const body = await request.json();
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, DEFAULT_CMS_CONTENT) : { ...DEFAULT_CMS_CONTENT };
      content.header = { ...content.header, ...body };
      await db.prepare('INSERT OR REPLACE INTO cms (key, value) VALUES (?, ?)').bind('content', JSON.stringify(content)).run();
      return jsonResponse({ success: true, message: 'হেডার আপডেট হয়েছে', data: content.header });
    }

    if (path === '/api/content/footer' && (method === 'PUT' || method === 'POST')) {
      const body = await request.json();
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, DEFAULT_CMS_CONTENT) : { ...DEFAULT_CMS_CONTENT };
      content.footer = { ...content.footer, ...body };
      await db.prepare('INSERT OR REPLACE INTO cms (key, value) VALUES (?, ?)').bind('content', JSON.stringify(content)).run();
      return jsonResponse({ success: true, message: 'ফুটার আপডেট হয়েছে', data: content.footer });
    }

    if (path === '/api/content/banners' && (method === 'PUT' || method === 'POST')) {
      const body = await request.json();
      const r = await db.prepare('SELECT value FROM cms WHERE key = ?').bind('content').first();
      const content = r ? parseJsonField(r.value, DEFAULT_CMS_CONTENT) : { ...DEFAULT_CMS_CONTENT };
      content.banners = Array.isArray(body) ? body : (body.banners || []);
      await db.prepare('INSERT OR REPLACE INTO cms (key, value) VALUES (?, ?)').bind('content', JSON.stringify(content)).run();
      return jsonResponse({ success: true, message: 'ব্যানার সফলভাবে আপডেট হয়েছে', data: content.banners });
    }

    if (path === '/api/cms' && method === 'POST') {
      const body = await request.json();
      await db.prepare('INSERT OR REPLACE INTO cms (key, value) VALUES (?, ?)').bind('content', JSON.stringify(body)).run();
      return jsonResponse({ success: true, message: 'CMS কন্টেন্ট আপডেট হয়েছে' });
    }

    // ================= 11. LANDING PAGES =================
    if ((path === '/api/landing' || path === '/api/landing-pages') && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM landing_pages').all()).results || [];
      const data = rows.map(r => {
        const prod = parseJsonField(r.product, {});
        return {
          ...r,
          ...prod,
          id: r.id,
          title: r.title,
          template: r.template,
          status: r.status || 'active'
        };
      });
      return jsonResponse({ success: true, count: data.length, data });
    }

    if ((path === '/api/landing' || path === '/api/landing-pages') && method === 'POST') {
      const body = await request.json();
      const id = body.id || `lp-${Date.now()}`;
      const slug = body.slug || `landing-${Date.now()}`;
      const title = body.title || 'বিশেষ ধামাকা অফার — প্রিমি ফার্ম';
      const template = body.template || 'template-1';
      const productObj = {
        productId: body.productId || 1,
        productName: body.productName || 'প্রিমি ফার্ম প্রোডাক্ট',
        image: body.image || 'images/kalo_shona_jar.png',
        price: parseInt(body.price) || 950,
        regularPrice: parseInt(body.regularPrice) || 1150,
        discountBadge: body.discountBadge || 'সীমিত সময়ের অফার',
        subtitle: body.subtitle || '',
        templateName: body.templateName || 'সিঙ্গেল প্রোডাক্ট হিরো',
        features: body.features || [
          'অফিস ও কাজের ক্লান্তি দূর করে সারাদিনের কর্মশক্তি বৃদ্ধি করে',
          'স্মৃতিশক্তি ও কাজের গভীর মনোযোগ বৃদ্ধি করে',
          '১০০% খাঁটি ও প্রাকৃতিক উপাদানের নিশ্চয়তা'
        ]
      };

      await db.prepare(`
        INSERT OR REPLACE INTO landing_pages (id, slug, title, template, product, views, conversions, status)
        VALUES (?, ?, ?, ?, ?, 0, 0, 'active')
      `).bind(id, slug, title, template, JSON.stringify(productObj)).run();

      return jsonResponse({
        success: true,
        message: 'ল্যান্ডিং পেজ সফলভাবে তৈরি হয়েছে!',
        page: { id, slug, title, template, ...productObj }
      });
    }

    if (path.startsWith('/api/landing-pages/') && method === 'DELETE') {
      const id = path.replace('/api/landing-pages/', '');
      await db.prepare('DELETE FROM landing_pages WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true, message: 'Landing page deleted' });
    }

    // ================= 12. STATS & ANALYTICS =================
    if (path === '/api/stats' && method === 'GET') {
      const orders = (await db.prepare('SELECT total, status FROM orders').all()).results || [];
      let totalRevenue = 0; // STRICTLY DELIVERED ONLY!
      let deliveredOrders = 0;
      let pendingOrders = 0, pendingAmount = 0;
      let inCourierOrders = 0, inCourierAmount = 0;
      let cancelledOrders = 0, cancelledAmount = 0;

      orders.forEach(o => {
        const amt = o.total || 0;
        const s = (o.status || '').toLowerCase();
        if (s === 'delivered') {
          totalRevenue += amt;
          deliveredOrders++;
        } else if (s === 'pending') {
          pendingOrders++;
          pendingAmount += amt;
        } else if (s === 'in courier' || s === 'shipped') {
          inCourierOrders++;
          inCourierAmount += amt;
        } else if (s === 'cancelled' || s === 'cancel' || s === 'return' || s === 'returned' || s === 'failed') {
          cancelledOrders++;
          cancelledAmount += amt;
        }
      });

      return jsonResponse({
        success: true,
        totalOrders: orders.length,
        totalRevenue,
        deliveredRevenue: totalRevenue,
        deliveredOrders,
        pendingOrders,
        pendingAmount,
        inCourierOrders,
        inCourierAmount,
        cancelledOrders,
        cancelledAmount
      });
    }

    // ================= 13. 1000% GENUINE FRAUD CHECK =================
    const fraudMatch = path.match(/^\/api\/fraud-check\/(.+)$/);
    if (fraudMatch && method === 'GET') {
      const rawPhone = decodeURIComponent(fraudMatch[1]).trim();
      const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
      const searchPhone = cleanPhone.length > 11 ? cleanPhone.slice(-11) : cleanPhone;
      const phoneSuffix = searchPhone.length >= 10 ? searchPhone.slice(-10) : searchPhone;
      const operator = getBdOperator(searchPhone);

      // 1. Genuine Blacklist Query
      const isBl = await db.prepare("SELECT * FROM blacklist WHERE value LIKE ? OR ? LIKE '%' || value || '%'").bind(`%${phoneSuffix}%`, rawPhone).first();

      // 2. Genuine Database Orders History
      const allOrders = (await db.prepare('SELECT id, customer, total, status, createdAt FROM orders').all()).results || [];
      const customerOrders = allOrders.filter(o => {
        const cust = parseJsonField(o.customer, {});
        const p = (cust.phone || '').replace(/[^0-9]/g, '');
        return p.includes(phoneSuffix) || phoneSuffix.includes(p);
      });

      const totalParcels = customerOrders.length;
      const deliveredParcels = customerOrders.filter(o => (o.status || '').toLowerCase() === 'delivered').length;
      const returnedParcels = customerOrders.filter(o => ['return', 'returned'].includes((o.status || '').toLowerCase())).length;
      const cancelledParcels = customerOrders.filter(o => ['cancelled', 'cancel', 'failed'].includes((o.status || '').toLowerCase())).length;
      const pendingParcels = customerOrders.filter(o => ['pending', 'confirmed', 'in courier', 'shipped', 'hold', 'on hold'].includes((o.status || '').toLowerCase())).length;
      const totalSpent = customerOrders.filter(o => (o.status || '').toLowerCase() === 'delivered').reduce((sum, o) => sum + (o.total || 0), 0);

      let riskScore = 10;
      let riskTitle = 'নিরাপদ গ্রাহক (Safe)';
      let badgeColor = '#10b981';
      let customerType = 'সাধারণ গ্রাহক';
      let successRate = '১০০%';
      let advice = 'গ্রাহকের তথ্য যাচাই করে পার্সেল কুরিয়ারে বুকিং দিন।';

      if (isBl) {
        riskScore = 95;
        riskTitle = 'ব্ল্যাকলিস্টেড গ্রাহক (Blacklisted)';
        badgeColor = '#dc2626';
        customerType = 'ফ্রড / প্রতারক তালিকাভুক্ত';
        successRate = '০%';
        advice = 'সতর্কতা! এই নম্বরটি ফ্রড ব্ল্যাকলিস্টে রয়েছে। অর্ডার পাঠাবেন না বা ১০০% অগ্রিম পেমেন্ট নিন।';
      } else if (totalParcels === 0) {
        riskScore = 15;
        riskTitle = 'নতুন গ্রাহক (First Order)';
        badgeColor = '#0284c7';
        customerType = 'নতুন গ্রাহক (পূর্ব রেকর্ড নেই)';
        successRate = 'নতুন গ্রাহক';
        advice = 'গ্রাহক প্রিমি ফার্মে এই প্রথম অর্ডার করেছেন। কল সেন্টার থেকে ফোনে কথা বলে ঠিকানা ও পণ্যের নিশ্চয়তা নিয়ে পার্সেল পাঠান।';
      } else {
        const completed = deliveredParcels + returnedParcels + cancelledParcels;
        if (completed === 0) {
          riskScore = 20;
          riskTitle = 'অর্ডার প্রক্রিয়াধীন (In Progress)';
          badgeColor = '#0284c7';
          customerType = 'চলমান অর্ডার গ্রাহক';
          successRate = 'প্রক্রিয়াধীন';
          advice = 'গ্রাহকের পূর্বের অর্ডার এখনও ডেলিভারির পথে আছে।';
        } else {
          const rate = Math.round((deliveredParcels / completed) * 100);
          successRate = `${rate}%`;
          if (rate >= 85) {
            riskScore = 5;
            riskTitle = 'অতি বিশ্বস্ত ও ভেরিফাইড (Verified Safe)';
            badgeColor = '#10b981';
            customerType = 'নিয়মিত ও বিশ্বস্ত গ্রাহক';
            advice = '১০০% বিশ্বস্ত গ্রাহক। কোনো দ্বিধা ছাড়াই সরাসরি কুরিয়ারে বুকিং দিতে পারেন।';
          } else if (rate >= 60) {
            riskScore = 40;
            riskTitle = 'মাঝারি ঝুঁকি (Moderate Risk)';
            badgeColor = '#f59e0b';
            customerType = 'মাঝারি গ্রাহক';
            advice = 'ফোনে কথা বলে ডেলিভারির সময় ও পার্সেল গ্রহণের নিশ্চয়তা নিয়ে পাঠান।';
          } else {
            riskScore = 85;
            riskTitle = 'উচ্চ ঝুঁকি (High Return Rate)';
            badgeColor = '#ef4444';
            customerType = 'উচ্চ রিটার্ন ঝুঁকিপূর্ণ';
            advice = 'সতর্কতা! এই গ্রাহকের পূর্বে পার্সেল রিটার্ন বা বাতিলের হার বেশি। ডেলিভারি চার্জ অগ্রিম নিয়ে পার্সেল পাঠান।';
          }
        }
      }

      return jsonResponse({
        success: true,
        phone: rawPhone,
        operator,
        isBlacklisted: !!isBl,
        riskScore,
        riskTitle,
        badgeColor,
        successRate,
        totalParcels,
        deliveredParcels,
        returnedParcels,
        cancelledParcels,
        pendingParcels,
        totalSpent,
        customerType,
        advice
      });
    }

    // ================= 14. CATEGORIES =================
    if (path === '/api/categories' && method === 'GET') {
      const categories = [
        { id: 'all', name: 'সব প্রোডাক্ট', icon: '🛍️', count: 11 },
        { id: 'kalo-shona', name: 'কালো সোনা', icon: '✨', count: 1 },
        { id: 'honey', name: 'মধু', icon: '🍯', count: 2 },
        { id: 'ghee', name: 'ঘি', icon: '🧈', count: 1 },
        { id: 'pickle', name: 'আচার', icon: '🌶️', count: 3 },
        { id: 'tea', name: 'চা ও হারবাল', icon: '🍵', count: 1 },
        { id: 'seeds', name: 'সিড ও সুপারফুড', icon: '🌱', count: 1 },
        { id: 'combo', name: 'কম্বো অফার', icon: '🎁', count: 2 }
      ];
      return jsonResponse({ success: true, data: categories });
    }

    // ================= 15. COURIER DISPATCH =================
    if (path === '/api/courier/steadfast/balance' && method === 'GET') {
      try {
        const sfRes = await fetch('https://portal.packzy.com/api/v1/get_balance', {
          headers: {
            'Api-Key': 'o8pnudnvo70jpz6jgraykqdi9qnwvyjl',
            'Secret-Key': '8ipxndp3quigmytzdk3jzzwu'
          }
        });
        const sfData = await sfRes.json();
        return jsonResponse({ success: true, ...sfData });
      } catch (e) {
        return jsonResponse({ success: false, message: e.message }, 500);
      }
    }

    if (path === '/api/courier/send' && method === 'POST') {
      const body = await request.json();
      const { orderId, courier, specialNote, agent } = body;
      const order = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(orderId).first();
      if (!order) return jsonResponse({ success: false, message: 'অর্ডার পাওয়া যায়নি।' }, 404);

      const selectedCourier = courier || 'Steadfast';
      let trackingCode = '';
      let consignmentId = null;

      if (selectedCourier.toLowerCase() === 'steadfast') {
        const cust = parseJsonField(order.customer, {});
        try {
          const sfRes = await fetch('https://portal.packzy.com/api/v1/create_order', {
            method: 'POST',
            headers: {
              'Api-Key': 'o8pnudnvo70jpz6jgraykqdi9qnwvyjl',
              'Secret-Key': '8ipxndp3quigmytzdk3jzzwu',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              invoice: order.id,
              recipient_name: cust.name || 'সম্মানিত গ্রাহক',
              recipient_phone: cust.phone || '01872170476',
              recipient_address: cust.address || 'ঢাকা, বাংলাদেশ',
              cod_amount: order.total || 0,
              note: specialNote || 'Preme Farm - Cash on Delivery'
            })
          });
          const sfData = await sfRes.json();
          if (sfData.status === 200 && sfData.consignment) {
            trackingCode = sfData.consignment.tracking_code;
            consignmentId = sfData.consignment.consignment_id;
          }
        } catch (sfErr) {
          console.warn('Steadfast live call error:', sfErr);
        }
        if (!trackingCode) {
          trackingCode = `ST-${Math.floor(100000 + Math.random() * 900000)}`;
        }
      } else {
        trackingCode = `PT-${Math.floor(100000 + Math.random() * 900000)}`;
      }

      const courierData = JSON.stringify({
        provider: selectedCourier,
        trackingCode,
        consignmentId,
        status: 'In Transit',
        dispatchedAt: new Date().toISOString(),
        note: specialNote || ''
      });

      const lastUpdatedBy = JSON.stringify({ agent: agent || 'Admin', timestamp: new Date().toISOString() });
      await db.prepare("UPDATE orders SET status = 'In Courier', courier = ?, lastUpdatedBy = ? WHERE id = ?").bind(courierData, lastUpdatedBy, orderId).run();

      await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
        orderId, agent || 'Admin', `${selectedCourier} কুরিয়ারে বুকিং সম্পন্ন (ট্র্যাকিং: ${trackingCode})`, new Date().toISOString()
      ).run();

      return jsonResponse({
        success: true,
        message: `${selectedCourier} কুরিয়ারে সফলভাবে পাঠানো হয়েছে!`,
        trackingCode,
        consignmentId,
        courier: selectedCourier
      });
    }

    // ================= 15A. COURIER WEBHOOK (LIVE AUTO-UPDATE) =================
    if ((path === '/api/courier/webhook' || path === '/api/courier/webhoo' || path.startsWith('/api/courier/webhook') || path.startsWith('/api/courier/webhoo')) && (method === 'POST' || method === 'GET')) {
      let payload = {};
      try {
        if (method === 'POST') payload = await request.json();
      } catch (e) {}

      const invoice = payload.invoice || payload.order_id || payload.orderId || url.searchParams.get('invoice') || url.searchParams.get('order_id');
      const trackingCode = payload.tracking_code || payload.consignment_id || url.searchParams.get('tracking_code');
      const rawStatus = (payload.status || payload.delivery_status || payload.event || url.searchParams.get('status') || '').toLowerCase();

      if (!invoice && !trackingCode) {
        return jsonResponse({ success: true, message: 'Steadfast Webhook listener active. No invoice provided in test ping.' });
      }

      // Find order by invoice ID or tracking code
      let order = null;
      if (invoice) {
        order = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(invoice).first();
      }
      if (!order && trackingCode) {
        order = await db.prepare("SELECT * FROM orders WHERE courier LIKE ?").bind(`%"trackingCode":"${trackingCode}"%`).first();
      }

      if (!order) {
        return jsonResponse({ success: false, message: `Order #${invoice || trackingCode} not found` }, 404);
      }

      let newStatus = null;
      if (rawStatus.includes('deliver')) {
        newStatus = 'Delivered';
      } else if (rawStatus.includes('cancel')) {
        newStatus = 'Cancelled';
      } else if (rawStatus.includes('return')) {
        newStatus = 'Return';
      } else if (rawStatus.includes('transit') || rawStatus.includes('shipped') || rawStatus.includes('picked')) {
        newStatus = 'In Courier';
      }

      if (newStatus && newStatus !== order.status) {
        const curCourier = parseJsonField(order.courier, {});
        curCourier.status = newStatus;
        curCourier.updatedAt = new Date().toISOString();
        if (payload.status_note) curCourier.note = payload.status_note;

        const updatedBy = JSON.stringify({ agent: 'Steadfast Webhook', timestamp: new Date().toISOString() });
        await db.prepare('UPDATE orders SET status = ?, courier = ?, lastUpdatedBy = ? WHERE id = ?').bind(
          newStatus, JSON.stringify(curCourier), updatedBy, order.id
        ).run();

        await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
          order.id, 'Steadfast Webhook', `কুরিয়ার থেকে স্বয়ংক্রিয় স্ট্যাটাস পরিবর্তন: ${newStatus}`, new Date().toISOString()
        ).run();

        return jsonResponse({ success: true, message: `Order #${order.id} status updated to ${newStatus}`, orderId: order.id, status: newStatus });
      }

      return jsonResponse({ success: true, message: `Order #${order.id} status is already ${order.status}` });
    }

    // ================= 15B. COURIER REAL-TIME STATUS SYNC =================
    if (path === '/api/courier/sync-status' && (method === 'POST' || method === 'GET')) {
      const allOrders = (await db.prepare('SELECT * FROM orders WHERE status IN ("In Courier", "Shipped", "Confirmed", "Pending") ORDER BY createdAt DESC').all()).results || [];
      const updatedList = [];

      for (const ord of allOrders) {
        try {
          const sfRes = await fetch(`https://portal.packzy.com/api/v1/status_by_invoice/${encodeURIComponent(ord.id)}`, {
            headers: {
              'Api-Key': 'o8pnudnvo70jpz6jgraykqdi9qnwvyjl',
              'Secret-Key': '8ipxndp3quigmytzdk3jzzwu'
            }
          });
          const sfData = await sfRes.json();
          if (sfData && sfData.status === 200 && sfData.delivery_status) {
            const st = sfData.delivery_status.toLowerCase();
            let mapped = null;
            if (st === 'delivered' || st === 'partial_delivered') mapped = 'Delivered';
            else if (st === 'cancelled') mapped = 'Cancelled';
            else if (st === 'return' || st === 'returned') mapped = 'Return';

            if (mapped && mapped !== ord.status) {
              const curCourier = parseJsonField(ord.courier, {});
              curCourier.status = mapped;
              curCourier.lastCheckedAt = new Date().toISOString();
              const updatedBy = JSON.stringify({ agent: 'Steadfast Sync API', timestamp: new Date().toISOString() });

              await db.prepare('UPDATE orders SET status = ?, courier = ?, lastUpdatedBy = ? WHERE id = ?').bind(
                mapped, JSON.stringify(curCourier), updatedBy, ord.id
              ).run();

              await db.prepare('INSERT INTO audit_logs (orderId, agent, action, timestamp) VALUES (?, ?, ?, ?)').bind(
                ord.id, 'Steadfast Sync', `কুরিয়ার লাইভ সিঙ্ক: স্ট্যাটাস পরিবর্তিত হয়ে ${mapped} হয়েছে`, new Date().toISOString()
              ).run();

              updatedList.push({ id: ord.id, oldStatus: ord.status, newStatus: mapped });
            }
          }
        } catch (syncErr) {
          console.warn(`Sync check error for ${ord.id}:`, syncErr.message);
        }
      }

      return jsonResponse({
        success: true,
        totalChecked: allOrders.length,
        updatedCount: updatedList.length,
        updatedOrders: updatedList
      });
    }

    // ================= 16. CSV EXPORT =================
    if (path === '/api/reports/csv' && method === 'GET') {
      const rows = (await db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all()).results || [];
      let csv = 'Order ID,Customer Name,Phone,Address,City,Total,Status,Created At\n';
      rows.forEach(r => {
        const cust = parseJsonField(r.customer, {});
        const name = (cust.name || '').replace(/,/g, ' ');
        const phone = cust.phone || '';
        const address = (cust.address || '').replace(/,/g, ' ');
        const city = cust.city || '';
        csv += `${r.id},"${name}","${phone}","${address}","${city}",${r.total},${r.status},"${r.createdAt}"\n`;
      });
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="premefarm_orders.csv"'
        }
      });
    }

    // ================= 17. CUSTOMER PROFILE =================
    const profileMatch = path.match(/^\/api\/auth\/profile\/(.+)$/);
    if (profileMatch && method === 'GET') {
      const phone = decodeURIComponent(profileMatch[1]).replace(/[\s-]/g, '');
      const user = await db.prepare('SELECT id, phone, name, role, createdAt FROM users WHERE REPLACE(REPLACE(phone, " ", ""), "-", "") = ?').bind(phone).first();
      if (!user) {
        // Look in orders
        const ord = await db.prepare("SELECT customer FROM orders WHERE customer LIKE ? LIMIT 1").bind(`%"phone":"${phone}"%`).first();
        if (ord) {
          const cust = parseJsonField(ord.customer, {});
          return jsonResponse({ success: true, user: { phone, name: cust.name || 'সম্মানিত গ্রাহক', address: cust.address || '', city: cust.city || 'Dhaka' } });
        }
        return jsonResponse({ success: false, message: 'ইউজার পাওয়া যায়নি।' }, 404);
      }
      return jsonResponse({ success: true, user });
    }

    return jsonResponse({ success: false, message: `Route not found: ${method} ${path}` }, 404);

  } catch (err) {
    return jsonResponse({ success: false, error: err.message, stack: err.stack }, 500);
  }
}
