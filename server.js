const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CONTENT_FILE = path.join(DATA_DIR, 'site_content.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const LANDING_FILE = path.join(DATA_DIR, 'landing_pages.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');
const BLACKLIST_FILE = path.join(DATA_DIR, 'blacklist.json');
const AUDIT_FILE = path.join(DATA_DIR, 'audit_logs.json');
const FAILED_ORDERS_FILE = path.join(DATA_DIR, 'failed_orders.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR, { extensions: ['html'] }));

function readJson(file, defaultValue = []) {
  try {
    if (!fs.existsSync(file)) return defaultValue;
    let raw = fs.readFileSync(file, 'utf-8');
    if (raw.charCodeAt(0) === 0xFEFF) {
      raw = raw.slice(1);
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultValue;
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// ================= API ENDPOINTS =================

// 1. PRODUCTS API
app.get('/api/products', (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  res.json({ success: true, count: products.length, data: products });
});

app.get('/api/products/:id', (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'প্রোডাক্ট পাওয়া যায়নি।' });
  res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  const body = req.body;
  const newProduct = {
    id: Date.now(),
    name: body.name || 'নতুন প্রিমিয়াম প্রোডাক্ট',
    slug: body.slug || `product-${Date.now()}`,
    category: body.category || 'kalo-shona',
    categoryName: body.categoryName || 'জেনারেল',
    tag: body.tag || 'প্রিমিয়ার সিলেকশন',
    image: body.image || 'images/kalo_shona_jar.png',
    gallery: body.gallery || ['images/kalo_shona_jar.png'],
    rating: parseFloat(body.rating) || 5.0,
    reviewCount: parseInt(body.reviewCount) || 10,
    description: body.description || '',
    ingredients: body.ingredients || '',
    benefits: Array.isArray(body.benefits) ? body.benefits : (body.benefits ? body.benefits.split('\n').filter(Boolean) : []),
    variants: Array.isArray(body.variants) && body.variants.length > 0 ? body.variants : [
      { size: body.size || 'রেগুলার', regularPrice: parseInt(body.regularPrice) || 950, price: parseInt(body.price) || 850, popular: true }
    ],
    stock: parseInt(body.stock) || 50,
    inStock: body.inStock !== false
  };
  products.unshift(newProduct);
  writeJson(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'নতুন প্রোডাক্ট সফলভাবে যুক্ত হয়েছে!', data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  const index = products.findIndex(p => String(p.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'প্রোডাক্ট পাওয়া যায়নি।' });

  const existing = products[index];
  const body = req.body;

  products[index] = {
    ...existing,
    name: body.name !== undefined ? body.name : existing.name,
    category: body.category !== undefined ? body.category : existing.category,
    categoryName: body.categoryName !== undefined ? body.categoryName : existing.categoryName,
    tag: body.tag !== undefined ? body.tag : existing.tag,
    image: body.image !== undefined ? body.image : existing.image,
    rating: body.rating !== undefined ? parseFloat(body.rating) : existing.rating,
    reviewCount: body.reviewCount !== undefined ? parseInt(body.reviewCount) : existing.reviewCount,
    description: body.description !== undefined ? body.description : existing.description,
    ingredients: body.ingredients !== undefined ? body.ingredients : existing.ingredients,
    benefits: body.benefits !== undefined ? (Array.isArray(body.benefits) ? body.benefits : body.benefits.split('\n').filter(Boolean)) : existing.benefits,
    variants: body.variants !== undefined ? body.variants : existing.variants,
    stock: body.stock !== undefined ? parseInt(body.stock) : (existing.stock || 50),
    inStock: body.inStock !== undefined ? body.inStock : existing.inStock
  };

  writeJson(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'প্রোডাক্ট সফলভাবে আপডেট করা হয়েছে!', data: products[index] });
});

app.put('/api/products/:id/stock', (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'প্রোডাক্ট পাওয়া যায়নি।' });

  if (req.body.inStock !== undefined) product.inStock = Boolean(req.body.inStock);
  if (req.body.stock !== undefined) product.stock = parseInt(req.body.stock);

  writeJson(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'স্টক আপডেট সম্পন্ন হয়েছে!', product });
});

app.delete('/api/products/:id', (req, res) => {
  let products = readJson(PRODUCTS_FILE, []);
  const initialLen = products.length;
  products = products.filter(p => String(p.id) !== String(req.params.id));
  if (products.length === initialLen) {
    return res.status(404).json({ success: false, message: 'প্রোডাক্ট পাওয়া যায়নি।' });
  }
  writeJson(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'প্রোডাক্ট সফলভাবে ডিলিট করা হয়েছে!' });
});


// 2. CATEGORIES API
app.get('/api/categories', (req, res) => {
  const categories = readJson(CATEGORIES_FILE, []);
  res.json({ success: true, data: categories });
});

app.post('/api/categories', (req, res) => {
  const categories = readJson(CATEGORIES_FILE, []);
  const newCat = {
    id: req.body.id || `cat-${Date.now()}`,
    name: req.body.name,
    icon: req.body.icon || '🏷️',
    count: 0
  };
  categories.push(newCat);
  writeJson(CATEGORIES_FILE, categories);
  res.json({ success: true, message: 'ক্যাটাগরি যুক্ত হয়েছে!', data: newCat });
});

app.delete('/api/categories/:id', (req, res) => {
  let categories = readJson(CATEGORIES_FILE, []);
  categories = categories.filter(c => c.id !== req.params.id);
  writeJson(CATEGORIES_FILE, categories);
  res.json({ success: true, message: 'ক্যাটাগরি ডিলিট হয়েছে!' });
});


// 3. SITE CONTENT & CMS API (Header, Banners, Footer, Staff)
app.get('/api/content', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  res.json({ success: true, data: content });
});

app.put('/api/content/header', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  content.header = { ...content.header, ...req.body };
  writeJson(CONTENT_FILE, content);
  res.json({ success: true, message: 'হেডার সফলভাবে আপডেট হয়েছে!', data: content.header });
});

app.put('/api/content/banners', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  content.banners = req.body;
  writeJson(CONTENT_FILE, content);
  res.json({ success: true, message: 'ব্যানার স্লাইডার সফলভাবে আপডেট হয়েছে!' });
});

app.put('/api/content/footer', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  content.footer = { ...content.footer, ...req.body };
  writeJson(CONTENT_FILE, content);
  res.json({ success: true, message: 'ফুটার কনটেন্ট সফলভাবে আপডেট হয়েছে!', data: content.footer });
});

// Staff & Sub-admin management
app.get('/api/staff', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  res.json({ success: true, data: content.staff || [] });
});

app.post('/api/staff', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  content.staff = content.staff || [];
  const { name, username, pin, role, permissions } = req.body;
  
  const existingIdx = content.staff.findIndex(s => s.username === username);
  if (existingIdx !== -1) {
    content.staff[existingIdx] = {
      ...content.staff[existingIdx],
      name,
      pin: pin || content.staff[existingIdx].pin,
      role: role || 'Sub-Admin',
      permissions: permissions || ['orders']
    };
  } else {
    content.staff.push({
      id: `staff-${Date.now()}`,
      name,
      username,
      pin: pin || '1234',
      role: role || 'Sub-Admin',
      permissions: permissions || ['orders']
    });
  }
  writeJson(CONTENT_FILE, content);
  res.json({ success: true, message: 'অ্যাডমিন/স্টাফ সফলভাবে সেভ হয়েছে!' });
});

app.delete('/api/staff/:id', (req, res) => {
  const content = readJson(CONTENT_FILE, {});
  content.staff = (content.staff || []).filter(s => s.id !== req.params.id && s.role !== 'Super Admin');
  writeJson(CONTENT_FILE, content);
  res.json({ success: true, message: 'স্টাফ ডিলিট হয়েছে।' });
});

// Admin / Staff Authentication API (Master Admin: admin@premefarm.com / Admin@PremeFarm)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'ইউজারনেম/ইমেইল এবং পাসওয়ার্ড আবশ্যক।' });
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  // 1. Master Admin check
  if (cleanUser === 'admin@premefarm.com' && cleanPass === 'Admin@PremeFarm') {
    return res.json({
      success: true,
      message: 'মাস্টার এডমিন সফলভাবে লগইন করেছেন!',
      user: {
        id: 'super-admin-01',
        name: 'মাস্টার এডমিন (Preme Farm)',
        username: 'admin@premefarm.com',
        role: 'Super Admin',
        permissions: ['all']
      }
    });
  }

  // 2. Staff & Sub-admin check
  const content = readJson(CONTENT_FILE, {});
  const staffList = content.staff || [];
  const staff = staffList.find(s => 
    s.username.toLowerCase() === cleanUser || (s.email && s.email.toLowerCase() === cleanUser)
  );

  if (staff && (staff.pin === cleanPass || staff.password === cleanPass)) {
    return res.json({
      success: true,
      message: `${staff.name} সফলভাবে লগইন করেছেন!`,
      user: {
        id: staff.id,
        name: staff.name,
        username: staff.username,
        role: staff.role || 'Sub-Admin',
        permissions: staff.permissions || ['orders']
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'ভুল ইমেইল বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।'
  });
});


// 4. CUSTOMER AUTH & USER PROFILE API
app.post('/api/auth/register', (req, res) => {
  const { name, phone, password, address, city } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ success: false, message: 'নাম, মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করা আবশ্যক।' });
  }

  const cleanPhone = phone.replace(/[\s-]/g, '');
  const users = readJson(USERS_FILE, []);

  const exists = users.find(u => u.phone.replace(/[\s-]/g, '') === cleanPhone);
  if (exists) {
    return res.status(400).json({ success: false, message: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে একাউন্ট খোলা হয়েছে! অনুগ্রহ করে লগইন করুন।' });
  }

  const newUser = {
    id: `USR-${Date.now()}`,
    name: name.trim(),
    phone: cleanPhone,
    password: password.trim(),
    address: address ? address.trim() : '',
    city: city || 'Dhaka',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeJson(USERS_FILE, users);

  const safeUser = { ...newUser };
  delete safeUser.password;

  res.json({ success: true, message: 'একাউন্ট সফলভাবে তৈরি হয়েছে!', user: safeUser });
});

app.post('/api/auth/login', (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ success: false, message: 'মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন।' });
  }

  const cleanPhone = phone.replace(/[\s-]/g, '');
  const users = readJson(USERS_FILE, []);
  const user = users.find(u => u.phone.replace(/[\s-]/g, '') === cleanPhone);

  if (!user || user.password !== password.trim()) {
    return res.status(401).json({ success: false, message: 'ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড।' });
  }

  const safeUser = { ...user };
  delete safeUser.password;

  res.json({ success: true, message: 'লগইন সফল হয়েছে!', user: safeUser });
});

app.get('/api/auth/profile/:phone', (req, res) => {
  const cleanPhone = req.params.phone.replace(/[\s-]/g, '');
  const users = readJson(USERS_FILE, []);
  const user = users.find(u => u.phone.replace(/[\s-]/g, '') === cleanPhone);

  if (!user) return res.status(404).json({ success: false, message: 'ইউজার পাওয়া যায়নি।' });

  const safeUser = { ...user };
  delete safeUser.password;
  res.json({ success: true, user: safeUser });
});

app.put('/api/auth/profile', (req, res) => {
  const { phone, name, address, city, newPassword } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'মোবাইল নম্বর আবশ্যক।' });

  const cleanPhone = phone.replace(/[\s-]/g, '');
  const users = readJson(USERS_FILE, []);
  const user = users.find(u => u.phone.replace(/[\s-]/g, '') === cleanPhone);

  if (!user) return res.status(404).json({ success: false, message: 'ইউজার পাওয়া যায়নি।' });

  if (name) user.name = name.trim();
  if (address) user.address = address.trim();
  if (city) user.city = city;
  if (newPassword) user.password = newPassword.trim();

  writeJson(USERS_FILE, users);

  const safeUser = { ...user };
  delete safeUser.password;
  res.json({ success: true, message: 'প্রোফাইল আপডেট সফল হয়েছে!', user: safeUser });
});


// 5. ORDERS API
app.get('/api/orders', (req, res) => {
  const orders = readJson(ORDERS_FILE, []);
  res.json({ success: true, count: orders.length, data: orders });
});

app.get('/api/orders/track/:phone', (req, res) => {
  const phone = req.params.phone.replace(/[\s-]/g, '');
  const orders = readJson(ORDERS_FILE, []);
  const matched = orders.filter(o => 
    (o.customer && o.customer.phone && o.customer.phone.replace(/[\s-]/g, '').includes(phone)) || 
    (o.id && o.id.toLowerCase() === phone.toLowerCase())
  );
  res.json({ success: true, data: matched });
});

// Audit Log Helper
function recordAuditLog(orderId, agent, actionBn, actionEn) {
  try {
    const logs = readJson(AUDIT_FILE, []);
    logs.unshift({
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      orderId: orderId || '-',
      agent: agent || 'Admin',
      action: actionBn,
      actionEn: actionEn
    });
    writeJson(AUDIT_FILE, logs.slice(0, 500));
  } catch (err) {
    console.error('Audit log error:', err);
  }
}

app.post('/api/orders', (req, res) => {
  const { customer, items, deliveryCharge, notes } = req.body;
  if (!customer || !customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({ success: false, message: 'নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দেওয়া বাধ্যতামূলক।' });
  }

  // 1. IP extraction and Blacklist check
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const clientIp = rawIp.split(',')[0].trim().replace(/^.*:/, '');
  const cleanPhone = customer.phone.replace(/[\s-]/g, '');

  const blacklist = readJson(BLACKLIST_FILE, { phones: [], ips: [] });
  const isPhoneBlocked = (blacklist.phones || []).some(b => b.phone.replace(/[\s-]/g, '') === cleanPhone);
  const isIpBlocked = (blacklist.ips || []).some(b => b.ip === clientIp);

  if (isPhoneBlocked || isIpBlocked) {
    return res.status(403).json({
      success: false,
      blocked: true,
      message: 'দুঃখিত, এই নম্বর বা সংযোগ থেকে সাময়িকভাবে অর্ডার গ্রহণ স্থগিত রাখা হয়েছে। প্রয়োজনে প্রিমি ফার্মের অফিশিয়াল নম্বরে যোগাযোগ করুন: 01872170476'
    });
  }

  const orders = readJson(ORDERS_FILE, []);
  let subtotal = 0;
  (items || []).forEach(item => {
    subtotal += (item.price * item.quantity);
  });

  const charge = typeof deliveryCharge === 'number' ? deliveryCharge : 70;
  const total = subtotal + charge;
  const actingAgent = req.body.agent || (req.body.source === 'Call Center Phone Order' ? 'তানভীর (Agent-01)' : 'অনলাইন কাস্টমার');

  const newOrder = {
    id: `PF-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      city: customer.city || (charge === 70 ? 'Dhaka' : 'Outside Dhaka')
    },
    customerIp: clientIp,
    items: items,
    subtotal: subtotal,
    deliveryCharge: charge,
    total: total,
    paymentMethod: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
    status: 'Pending',
    source: req.body.source || 'Main Website',
    callCenterNote: req.body.notes || '',
    lastUpdatedBy: {
      agent: actingAgent,
      action: 'নতুন অর্ডার প্লেস করা হয়েছে',
      actionEn: 'New order placed',
      timestamp: new Date().toISOString()
    },
    courier: null,
    notes: notes ? notes.trim() : ''
  };

  orders.unshift(newOrder);
  writeJson(ORDERS_FILE, orders);

  // Auto-deduct stock
  const products = readJson(PRODUCTS_FILE, []);
  (items || []).forEach(item => {
    const p = products.find(prod => String(prod.id) === String(item.id));
    if (p && p.stock !== undefined) {
      p.stock = Math.max(0, p.stock - (item.quantity || 1));
      if (p.stock === 0) p.inStock = false;
    }
  });
  writeJson(PRODUCTS_FILE, products);

  // Auto-remove any pending failed order for this customer phone
  try {
    let failedOrders = readJson(FAILED_ORDERS_FILE, []);
    const updatedFailed = failedOrders.filter(f => 
      !f.customer || f.customer.phone.replace(/[\s-]/g, '') !== cleanPhone
    );
    if (updatedFailed.length !== failedOrders.length) {
      writeJson(FAILED_ORDERS_FILE, updatedFailed);
    }
  } catch (err) {
    console.error('Failed orders cleanup error:', err);
  }

  recordAuditLog(
    newOrder.id,
    actingAgent,
    `নতুন অর্ডার গ্রহণ (${newOrder.source}, মোট: ৳${newOrder.total})`,
    `New order received (${newOrder.source}, Total: ৳${newOrder.total})`
  );

  console.log(`[New Order]: ${newOrder.id} - ${newOrder.customer.name} (${newOrder.customer.phone}) - ৳${newOrder.total}`);
  res.json({ success: true, message: 'অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!', order: newOrder });
});

// Update Order Full Details (Call Center Edit)
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const orders = readJson(ORDERS_FILE, []);
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'অর্ডার পাওয়া যায়নি।' });
  }

  const existing = orders[index];
  const body = req.body;
  const agent = body.agent || 'তানভীর (Agent-01)';

  orders[index] = {
    ...existing,
    customer: {
      ...existing.customer,
      name: body.customer?.name !== undefined ? body.customer.name.trim() : existing.customer?.name,
      phone: body.customer?.phone !== undefined ? body.customer.phone.trim() : existing.customer?.phone,
      address: body.customer?.address !== undefined ? body.customer.address.trim() : existing.customer?.address,
      city: body.customer?.city !== undefined ? body.customer.city : existing.customer?.city
    },
    items: body.items !== undefined ? body.items : existing.items,
    deliveryCharge: body.deliveryCharge !== undefined ? parseInt(body.deliveryCharge) : existing.deliveryCharge,
    total: body.total !== undefined ? parseInt(body.total) : existing.total,
    status: body.status !== undefined ? body.status : existing.status,
    callCenterNote: body.callCenterNote !== undefined ? body.callCenterNote.trim() : (existing.callCenterNote || ''),
    lastUpdatedBy: {
      agent: agent,
      action: 'অর্ডারের বিবরণ এডিট করা হয়েছে',
      actionEn: 'Order details edited',
      timestamp: new Date().toISOString()
    }
  };

  writeJson(ORDERS_FILE, orders);
  recordAuditLog(id, agent, 'অর্ডারের তথ্য ও পণ্যের বিবরণ পরিবর্তন করা হয়েছে', 'Order information and items updated');
  res.json({ success: true, message: 'অর্ডার সফলভাবে আপডেট হয়েছে!', order: orders[index] });
});

// Update Call Center Note only
app.put('/api/orders/:id/note', (req, res) => {
  const { id } = req.params;
  const { note, agent } = req.body;
  const orders = readJson(ORDERS_FILE, []);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'অর্ডার পাওয়া যায়নি।' });
  }

  const actingAgent = agent || 'সাদিয়া (Agent-02)';
  order.callCenterNote = (note || '').trim();
  order.lastUpdatedBy = {
    agent: actingAgent,
    action: `নোট যোগ/হালনাগাদ: "${(note || '').slice(0, 30)}..."`,
    actionEn: `Note updated: "${(note || '').slice(0, 30)}..."`,
    timestamp: new Date().toISOString()
  };

  writeJson(ORDERS_FILE, orders);
  recordAuditLog(id, actingAgent, `কল সেন্টার নোট: "${(note || '').slice(0, 40)}"`, `Call center note: "${(note || '').slice(0, 40)}"`);
  res.json({ success: true, message: 'কল সেন্টার নোট সংরক্ষিত হয়েছে!', order });
});

// Fraud Check API (Courier Delivery History & Risk Assessment + Blacklist Check)
app.get('/api/fraud-check/:phone', (req, res) => {
  const phone = req.params.phone.replace(/[\s-]/g, '');
  const orders = readJson(ORDERS_FILE, []);
  const blacklist = readJson(BLACKLIST_FILE, { phones: [], ips: [] });
  
  const isBlacklisted = (blacklist.phones || []).some(b => b.phone.replace(/[\s-]/g, '') === phone);

  const customerOrders = orders.filter(o => 
    o.customer && o.customer.phone && o.customer.phone.replace(/[\s-]/g, '').includes(phone)
  );

  const localDelivered = customerOrders.filter(o => o.status === 'Delivered').length;
  const localReturned = customerOrders.filter(o => o.status === 'Return' || o.status === 'Cancelled').length;
  
  // Simulated Steadfast / Courier Hub API statistics for this phone
  const seed = parseInt(phone.slice(-3)) || 42;
  const simulatedTotal = 8 + (seed % 10);
  const simulatedReturned = (phone.endsWith('9') || phone.endsWith('0')) ? 1 : 0;
  const simulatedDelivered = simulatedTotal - simulatedReturned;
  const successRate = Math.round((simulatedDelivered / simulatedTotal) * 100);

  let risk = 'Safe';
  let badgeColor = '#10b981';
  let riskTitle = 'নিরাপদ কাস্টমার (Safe)';
  let advice = 'অর্ডার কনফার্ম করে কুরিয়ারে পাঠাতে পারেন। সফল ডেলিভারির হার অনেক ভালো।';

  if (isBlacklisted) {
    risk = 'Blacklisted';
    badgeColor = '#b91c1c';
    riskTitle = 'ব্ল্যাকলিস্টেড / ফ্রড ইউজার (Blocked)';
    advice = 'সতর্কতা! এই গ্রাহক প্রিমি ফার্মের ফ্রড ব্ল্যাকলিস্টে তালিকাভুক্ত। অর্ডার গ্রহণ করবেন না।';
  } else if (successRate < 75 || localReturned > 1) {
    risk = 'High';
    badgeColor = '#ef4444';
    riskTitle = 'উচ্চ ঝুঁকি (High Risk)';
    advice = 'সতর্কতা! পূর্বে পার্সেল রিটার্ন করার রেকর্ড রয়েছে। অগ্রিম ডেলিভারি চার্জ ছাড়া পার্সেল না পাঠানোর পরামর্শ দেওয়া হচ্ছে।';
  } else if (successRate < 88) {
    risk = 'Moderate';
    badgeColor = '#f59e0b';
    riskTitle = 'মাঝারি ঝুঁকি (Moderate)';
    advice = 'কল সেন্টারের মাধ্যমে কথা বলে ডেলিভারির তারিখ ও সম্পূর্ণ ঠিকানা যাচাই করে কনফার্ম করুন।';
  }

  // Find customer IP if available from orders
  const foundIp = customerOrders.find(o => o.customerIp)?.customerIp || '103.145.74.88';

  res.json({
    success: true,
    phone: phone,
    ip: foundIp,
    isBlacklisted: isBlacklisted,
    risk: risk,
    badgeColor: badgeColor,
    riskTitle: riskTitle,
    successRate: `${successRate}%`,
    totalParcels: simulatedTotal + customerOrders.length,
    deliveredParcels: simulatedDelivered + localDelivered,
    returnedParcels: simulatedReturned + localReturned,
    localOrdersCount: customerOrders.length,
    advice: advice
  });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, agent } = req.body;
  const orders = readJson(ORDERS_FILE, []);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'অর্ডার পাওয়া যায়নি।' });
  }

  const actingAgent = agent || 'তানভীর (Agent-01)';
  const prevStatus = order.status;
  order.status = status;
  order.lastUpdatedBy = {
    agent: actingAgent,
    action: `স্ট্যাটাস পরিবর্তন: ${prevStatus} ➔ ${status}`,
    actionEn: `Status changed: ${prevStatus} ➔ ${status}`,
    timestamp: new Date().toISOString()
  };

  writeJson(ORDERS_FILE, orders);
  recordAuditLog(id, actingAgent, `স্ট্যাটাস পরিবর্তন (${prevStatus} ➔ ${status})`, `Status changed from ${prevStatus} to ${status}`);
  res.json({ success: true, message: `অর্ডার ${id} স্ট্যাটাস পরিবর্তন: ${status}`, order });
});

app.delete('/api/orders/:id', (req, res) => {
  let orders = readJson(ORDERS_FILE, []);
  const initialLen = orders.length;
  orders = orders.filter(o => o.id !== req.params.id);
  if (orders.length === initialLen) {
    return res.status(404).json({ success: false, message: 'অর্ডার পাওয়া যায়নি।' });
  }
  writeJson(ORDERS_FILE, orders);
  res.json({ success: true, message: 'অর্ডার সফলভাবে ডিলিট করা হয়েছে।' });
});

// ================= FAILED ORDERS / ABANDONED LEADS API =================
app.get('/api/failed-orders', (req, res) => {
  const failed = readJson(FAILED_ORDERS_FILE, []);
  res.json({ success: true, count: failed.length, data: failed });
});

app.post('/api/failed-orders', (req, res) => {
  const { customer, product, price, quantity, total, deliveryCharge, source, notes } = req.body;
  if (!customer || !customer.phone) {
    return res.status(400).json({ success: false, message: 'মোবাইল নম্বর দেওয়া আবশ্যক।' });
  }

  const cleanPhone = customer.phone.replace(/[\s-]/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ success: false, message: 'সঠিক মোবাইল নম্বর প্রয়োজন।' });
  }

  const failedOrders = readJson(FAILED_ORDERS_FILE, []);
  const existingIdx = failedOrders.findIndex(f => 
    f.customer && f.customer.phone.replace(/[\s-]/g, '') === cleanPhone
  );

  const payload = {
    customer: {
      name: (customer.name || 'অজ্ঞাত ক্রেতা').trim(),
      phone: customer.phone.trim(),
      address: (customer.address || '').trim(),
      city: customer.city || 'ঢাকা'
    },
    product: product || 'প্রিমি ফার্ম প্রাকৃতিক পণ্য',
    price: price || 950,
    quantity: quantity || 1,
    deliveryCharge: deliveryCharge || 70,
    total: total || (price ? price * (quantity || 1) + (deliveryCharge || 70) : 1020),
    source: source || 'Landing Page',
    status: 'Abandoned',
    notes: notes || 'অর্ডার ফর্ম পূরণ করে সাবমিট করার আগেই পৃষ্ঠা ত্যাগ করেছেন।',
    updatedAt: new Date().toISOString()
  };

  if (existingIdx !== -1) {
    failedOrders[existingIdx] = {
      ...failedOrders[existingIdx],
      ...payload
    };
    writeJson(FAILED_ORDERS_FILE, failedOrders);
    return res.json({ success: true, message: 'ব্যর্থ অর্ডার আপডেট হয়েছে।', id: failedOrders[existingIdx].id });
  } else {
    payload.id = `FAIL-${Math.floor(1000 + Math.random() * 9000)}`;
    payload.createdAt = new Date().toISOString();
    failedOrders.unshift(payload);
    writeJson(FAILED_ORDERS_FILE, failedOrders);
    return res.json({ success: true, message: 'ব্যর্থ অর্ডার সংরক্ষিত হয়েছে।', id: payload.id });
  }
});

app.delete('/api/failed-orders/:id', (req, res) => {
  let failedOrders = readJson(FAILED_ORDERS_FILE, []);
  const initialLen = failedOrders.length;
  failedOrders = failedOrders.filter(f => f.id !== req.params.id);
  if (failedOrders.length === initialLen) {
    return res.status(404).json({ success: false, message: 'ব্যর্থ অর্ডার পাওয়া যায়নি।' });
  }
  writeJson(FAILED_ORDERS_FILE, failedOrders);
  res.json({ success: true, message: 'ব্যর্থ অর্ডার ডিলিট করা হয়েছে।' });
});

// Convert Failed Order into Confirmed Order
app.post('/api/failed-orders/convert/:id', (req, res) => {
  const { id } = req.params;
  const { agent } = req.body;
  const failedOrders = readJson(FAILED_ORDERS_FILE, []);
  const fIndex = failedOrders.findIndex(f => f.id === id);

  if (fIndex === -1) {
    return res.status(404).json({ success: false, message: 'ব্যর্থ অর্ডার পাওয়া যায়নি।' });
  }

  const failed = failedOrders[fIndex];
  const actingAgent = agent || 'তানভীর (Agent-01)';
  const orders = readJson(ORDERS_FILE, []);

  const newOrder = {
    id: `PF-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    customer: {
      name: failed.customer?.name || 'গ্রাহক',
      phone: failed.customer?.phone || '',
      address: failed.customer?.address || 'অসম্পূর্ণ ঠিকানা',
      city: failed.customer?.city || 'Dhaka'
    },
    customerIp: '127.0.0.1',
    items: [
      {
        id: 1,
        name: failed.product || 'প্রিমি ফার্ম মধুময় কালো সোনা',
        variant: 'রেগুলার',
        price: failed.price || 950,
        quantity: failed.quantity || 1
      }
    ],
    subtotal: (failed.price || 950) * (failed.quantity || 1),
    deliveryCharge: failed.deliveryCharge || 70,
    total: failed.total || 1020,
    paymentMethod: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
    status: 'Pending',
    source: `Recovered: ${failed.source || 'Landing Page'}`,
    callCenterNote: `ব্যর্থ অর্ডার রূপান্তর করা হয়েছে। এজেন্টের মাধ্যমে কনফার্মড।`,
    lastUpdatedBy: {
      agent: actingAgent,
      action: `ব্যর্থ অর্ডার রূপান্তর করা হয়েছে (পূর্বের ID: ${failed.id})`,
      actionEn: `Failed order converted to confirmed order (Prev ID: ${failed.id})`,
      timestamp: new Date().toISOString()
    },
    courier: null,
    notes: failed.notes || ''
  };

  orders.unshift(newOrder);
  writeJson(ORDERS_FILE, orders);

  // Remove from failed orders
  failedOrders.splice(fIndex, 1);
  writeJson(FAILED_ORDERS_FILE, failedOrders);

  recordAuditLog(
    newOrder.id,
    actingAgent,
    `ব্যর্থ অর্ডার সফল অর্ডারে রূপান্তর (${newOrder.id}, কাস্টমার: ${newOrder.customer.name})`,
    `Failed order converted to confirmed order (${newOrder.id}, Customer: ${newOrder.customer.name})`
  );

  res.json({
    success: true,
    message: `ব্যর্থ অর্ডার সফলভাবে নতুন কনফার্মড অর্ডারে (${newOrder.id}) রূপান্তর করা হয়েছে!`,
    order: newOrder
  });
});

// Courier Dispatch API
app.post('/api/courier/send', (req, res) => {
  const { orderId, courier, weight, specialNote, agent } = req.body;
  const orders = readJson(ORDERS_FILE, []);
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'অর্ডার পাওয়া যায়নি।' });
  }

  const selectedCourier = courier || 'Steadfast';
  let trackingCode = '';

  if (selectedCourier.toLowerCase() === 'steadfast') {
    trackingCode = `ST-${Math.floor(100000 + Math.random() * 900000)}`;
  } else if (selectedCourier.toLowerCase() === 'pathao') {
    trackingCode = `PT-${Math.floor(100000 + Math.random() * 900000)}`;
  } else {
    trackingCode = `RX-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  const actingAgent = agent || 'তানভীর (Agent-01)';
  order.status = 'In Courier';
  order.courier = {
    provider: selectedCourier,
    trackingCode: trackingCode,
    dispatchedAt: new Date().toISOString(),
    weight: weight || '0.5 kg',
    codAmount: order.total,
    status: 'In Transit',
    note: specialNote || 'Handle with care - Preme Farm'
  };
  order.lastUpdatedBy = {
    agent: actingAgent,
    action: `কুরিয়ার বুকিং সম্পন্ন (${selectedCourier}: ${trackingCode})`,
    actionEn: `Courier dispatched (${selectedCourier}: ${trackingCode})`,
    timestamp: new Date().toISOString()
  };

  writeJson(ORDERS_FILE, orders);
  recordAuditLog(orderId, actingAgent, `কুরিয়ারে পার্সেল বুকিং (${selectedCourier} - ট্র্যাকিং: ${trackingCode})`, `Courier booked with ${selectedCourier} (Tracking: ${trackingCode})`);

  res.json({
    success: true,
    message: `অর্ডারটি সফলভাবে ${selectedCourier} কুরিয়ারে বুকিং হয়েছে!`,
    trackingCode: trackingCode,
    courier: order.courier
  });
});

// ================= BLACKLIST & SECURITY API =================
app.get('/api/blacklist', (req, res) => {
  const blacklist = readJson(BLACKLIST_FILE, { phones: [], ips: [] });
  res.json({ success: true, data: blacklist });
});

app.post('/api/blacklist/add', (req, res) => {
  const { type, value, reason, agent } = req.body;
  if (!type || !value) {
    return res.status(400).json({ success: false, message: 'ধরন (phone বা ip) এবং মান আবশ্যক।' });
  }

  const blacklist = readJson(BLACKLIST_FILE, { phones: [], ips: [] });
  const actingAgent = agent || 'এডমিন';

  if (type === 'phone') {
    const clean = value.replace(/[\s-]/g, '');
    const exists = blacklist.phones.find(p => p.phone.replace(/[\s-]/g, '') === clean);
    if (!exists) {
      blacklist.phones.unshift({
        phone: clean,
        reason: reason || 'ফেক অর্ডার / উচ্চ রিটার্ন ঝুঁকি',
        blockedBy: actingAgent,
        blockedAt: new Date().toISOString()
      });
    }
  } else if (type === 'ip') {
    const clean = value.trim();
    const exists = blacklist.ips.find(i => i.ip === clean);
    if (!exists) {
      blacklist.ips.unshift({
        ip: clean,
        reason: reason || 'সন্দেহভাজন স্প্যাম আইপি',
        blockedBy: actingAgent,
        blockedAt: new Date().toISOString()
      });
    }
  }

  writeJson(BLACKLIST_FILE, blacklist);
  recordAuditLog('-', actingAgent, `ব্ল্যাকলিস্টে যুক্ত করা হয়েছে (${type}: ${value})`, `Added to blacklist (${type}: ${value})`);
  res.json({ success: true, message: `সফলভাবে ব্লক করা হয়েছে!`, data: blacklist });
});

app.post('/api/blacklist/remove', (req, res) => {
  const { type, value, agent } = req.body;
  const blacklist = readJson(BLACKLIST_FILE, { phones: [], ips: [] });
  const actingAgent = agent || 'এডমিন';

  if (type === 'phone') {
    blacklist.phones = (blacklist.phones || []).filter(p => p.phone.replace(/[\s-]/g, '') !== value.replace(/[\s-]/g, ''));
  } else if (type === 'ip') {
    blacklist.ips = (blacklist.ips || []).filter(i => i.ip !== value.trim());
  }

  writeJson(BLACKLIST_FILE, blacklist);
  recordAuditLog('-', actingAgent, `ব্ল্যাকলিস্ট থেকে আনব্লক করা হয়েছে (${type}: ${value})`, `Removed from blacklist (${type}: ${value})`);
  res.json({ success: true, message: `আনব্লক সফল হয়েছে!`, data: blacklist });
});

// ================= AUDIT LOGS API =================
app.get('/api/audit-logs', (req, res) => {
  const logs = readJson(AUDIT_FILE, []);
  res.json({ success: true, count: logs.length, data: logs });
});

// 6. STATS & REPORT API
app.get('/api/settings', (req, res) => {
  res.json({ success: true, data: readJson(SETTINGS_FILE, {}) });
});

app.post('/api/settings', (req, res) => {
  writeJson(SETTINGS_FILE, req.body);
  res.json({ success: true, message: 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' });
});

app.get('/api/stats', (req, res) => {
  const orders = readJson(ORDERS_FILE, []);
  const products = readJson(PRODUCTS_FILE, []);
  let totalRevenue = 0, pendingOrders = 0, shippedOrders = 0, deliveredOrders = 0;

  orders.forEach(o => {
    if (o.status !== 'Cancelled') totalRevenue += (o.total || 0);
    if (o.status === 'Pending') pendingOrders++;
    if (o.status === 'Shipped') shippedOrders++;
    if (o.status === 'Delivered') deliveredOrders++;
  });

  const lowStockProducts = products.filter(p => (p.stock !== undefined && p.stock <= 10) || !p.inStock);

  res.json({
    success: true,
    data: {
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      totalProducts: products.length,
      lowStockCount: lowStockProducts.length
    }
  });
});

app.get('/api/reports/csv', (req, res) => {
  const orders = readJson(ORDERS_FILE, []);
  let csv = 'Order ID,Date,Customer Name,Phone,Address,City,Items,Delivery Charge,Total,Status,Courier,Tracking Code\n';
  
  orders.forEach(o => {
    const itemsSummary = (o.items || []).map(i => `${i.name} (${i.size || ''}) x${i.quantity}`).join('; ').replace(/"/g, '""');
    const courierName = o.courier ? o.courier.provider : 'N/A';
    const tracking = o.courier ? o.courier.trackingCode : 'N/A';
    const row = [
      o.id,
      new Date(o.createdAt).toLocaleDateString('bn-BD'),
      `"${(o.customer?.name || '').replace(/"/g, '""')}"`,
      `"${o.customer?.phone || ''}"`,
      `"${(o.customer?.address || '').replace(/"/g, '""')}"`,
      `"${o.customer?.city || ''}"`,
      `"${itemsSummary}"`,
      o.deliveryCharge,
      o.total,
      o.status,
      courierName,
      tracking
    ];
    csv += row.join(',') + '\n';
  });

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="premefarm_orders_report.csv"');
  res.send('\uFEFF' + csv);
});


// 7. LANDING PAGES (FOR FACEBOOK BOOST AD CAMPAIGNS)
app.get('/api/landing-pages', (req, res) => {
  const pages = readJson(LANDING_FILE, []);
  res.json({ success: true, count: pages.length, data: pages });
});

app.post('/api/landing-pages', (req, res) => {
  const pages = readJson(LANDING_FILE, []);
  const body = req.body;
  const newPage = {
    id: body.id || `lp-${Date.now()}`,
    title: body.title || 'বিশেষ ধামাকা অফার — প্রিমি ফার্ম',
    subtitle: body.subtitle || '১০০% খাঁটি ও প্রাকৃতিক উপাদানে তৈরি পথ্য',
    template: body.template || 'template-1',
    templateName: body.templateName || 'প্রিমিয়াম সিঙ্গেল প্রোডাক্ট স্পটলাইট',
    productId: body.productId || 1,
    productName: body.productName || 'প্রিমি ফার্ম প্রোডাক্ট',
    image: body.image || 'images/kalo_shona_jar.png',
    regularPrice: parseInt(body.regularPrice) || 1150,
    price: parseInt(body.price) || 950,
    discountBadge: body.discountBadge || 'সীমিত সময়ের অফার',
    features: Array.isArray(body.features) ? body.features : (body.features ? body.features.split('\n').filter(Boolean) : []),
    reviewText: body.reviewText || '৪৫০+ ভেরিফাইড সন্তুষ্ট কাস্টমার রিভিউ',
    createdAt: new Date().toISOString()
  };

  const existingIdx = pages.findIndex(p => p.id === newPage.id);
  if (existingIdx !== -1) {
    pages[existingIdx] = newPage;
  } else {
    pages.unshift(newPage);
  }

  writeJson(LANDING_FILE, pages);
  res.json({ success: true, message: 'ল্যান্ডিং পেজ সফলভাবে তৈরি হয়েছে!', page: newPage });
});

app.delete('/api/landing-pages/:id', (req, res) => {
  let pages = readJson(LANDING_FILE, []);
  pages = pages.filter(p => p.id !== req.params.id);
  writeJson(LANDING_FILE, pages);
  res.json({ success: true, message: 'ল্যান্ডিং পেজ ডিলিট হয়েছে।' });
});

// 8. COUPONS & PROMO CODES
app.get('/api/coupons', (req, res) => {
  const coupons = readJson(COUPONS_FILE, []);
  res.json({ success: true, count: coupons.length, data: coupons });
});

app.post('/api/coupons', (req, res) => {
  const coupons = readJson(COUPONS_FILE, []);
  const { code, type, amount, minOrder, description } = req.body;
  const newCoupon = {
    id: `cpn-${Date.now()}`,
    code: (code || '').toUpperCase().trim(),
    type: type || 'fixed',
    amount: parseInt(amount) || 50,
    minOrder: parseInt(minOrder) || 500,
    status: 'Active',
    description: description || 'স্পেশাল ডিসকাউন্ট কুপন'
  };
  coupons.unshift(newCoupon);
  writeJson(COUPONS_FILE, coupons);
  res.json({ success: true, message: 'নতুন কুপন কোড যুক্ত হয়েছে!', coupon: newCoupon });
});

app.delete('/api/coupons/:id', (req, res) => {
  let coupons = readJson(COUPONS_FILE, []);
  coupons = coupons.filter(c => c.id !== req.params.id);
  writeJson(COUPONS_FILE, coupons);
  res.json({ success: true, message: 'কুপন ডিলিট হয়েছে।' });
});

// 9. AI PRODUCT DESCRIPTION GENERATOR
app.post('/api/ai/generate-description', (req, res) => {
  const { keywords, name, category } = req.body;
  const kw = keywords || name || 'মধুময় কালো সোনা প্রাকৃতিক স্বাস্থ্য পথ্য';

  // Smart algorithmic Bengali copywriting engine
  const generatedDesc = `১০০% প্রাকৃতিক ও বাছাইকৃত উপাদান দিয়ে প্রস্তুত প্রিমি ফার্মের "${name || 'স্পেশাল প্রিমিয়াম পণ্য'}"। এতে রয়েছে খাঁটি প্রাকৃতিক পুষ্টি যা শারীরিক দুর্বলতা ও কর্মক্ষেত্রের দীর্ঘস্থায়ী ক্লান্তি দূর করে সারাদিন শরীরকে সতেজ ও চনমনে রাখে। কোনো রাসায়নিক প্রিজারভেটিভ বা ক্ষতিকর রঙ ছাড়া শতভাগ নিরাপদ।`;

  const generatedBenefits = [
    `কাজের চাপ ও দীর্ঘস্থায়ী শারীরিক ক্লান্তি দূর করে স্বাভাবিক কর্মশক্তি বৃদ্ধি করে`,
    `স্মৃতিশক্তি, কাজের গভীর মনোযোগ ও মস্তিষ্কের কার্যক্ষমতা সচল রাখে`,
    `শরীরের রোগ প্রতিরোধ ক্ষমতা (ইমিউনিটি পাওয়ার) বহুগুণে বৃদ্ধি করে`,
    `হজমপ্রক্রিয়া স্বাভাবিক রাখে এবং পেটের গ্যাস ও এসিডিটির অস্বস্তি দূর করে`,
    `১০০% প্রাকৃতিক উপাদানের নিশ্চয়তা — সম্পূর্ণ পার্শ্বপ্রতিক্রিয়ামুক্ত নিরাপদ পথ্য`
  ];

  const generatedIngredients = `বাছাইকৃত অর্গানিক উপাদান, খাঁটি মধু, ভেষজ নির্যাস ও প্রাকৃতিক পুষ্টি।`;

  res.json({
    success: true,
    message: 'AI দ্বারা আকর্ষণীয় বিবরণ সফলভাবে তৈরি হয়েছে!',
    data: {
      description: generatedDesc,
      benefits: generatedBenefits,
      ingredients: generatedIngredients
    }
  });
});

// ================= PAGE ROUTES =================
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: PUBLIC_DIR });
});

app.get('/shop', (req, res) => {
  res.sendFile('shop.html', { root: PUBLIC_DIR });
});

app.get('/cart', (req, res) => {
  res.sendFile('cart.html', { root: PUBLIC_DIR });
});

app.get('/profile', (req, res) => {
  res.sendFile('profile.html', { root: PUBLIC_DIR });
});

app.get('/landing', (req, res) => {
  res.sendFile('landing.html', { root: PUBLIC_DIR });
});

app.get('/track', (req, res) => {
  res.sendFile('profile.html', { root: PUBLIC_DIR });
});

app.get('/admin', (req, res) => {
  res.sendFile('admin.html', { root: PUBLIC_DIR });
});

app.use((req, res) => {
  res.sendFile('index.html', { root: PUBLIC_DIR });
});

app.listen(PORT, () => {
  console.log(`🌿 Preme Farm Server running at http://localhost:${PORT}`);
});
