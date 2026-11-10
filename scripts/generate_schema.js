const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const esc = s => s ? s.toString().replace(/'/g, "''") : '';

let sql = `DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT,
  category TEXT,
  categoryName TEXT,
  tag TEXT,
  price INTEGER,
  regularPrice INTEGER,
  rating REAL DEFAULT 5.0,
  reviewCount INTEGER DEFAULT 100,
  image TEXT,
  gallery TEXT,
  description TEXT,
  benefits TEXT,
  ingredients TEXT,
  variants TEXT
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer TEXT NOT NULL,
  items TEXT NOT NULL,
  subtotal INTEGER DEFAULT 0,
  deliveryCharge INTEGER DEFAULT 70,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'Pending',
  source TEXT DEFAULT 'Website Store',
  callCenterNote TEXT DEFAULT '',
  courier TEXT,
  lastUpdatedBy TEXT,
  createdAt TEXT
);

DROP TABLE IF EXISTS failed_orders;
CREATE TABLE failed_orders (
  id TEXT PRIMARY KEY,
  customer TEXT NOT NULL,
  product TEXT,
  amount INTEGER DEFAULT 0,
  step TEXT,
  reason TEXT,
  status TEXT DEFAULT 'Failed / Abandoned',
  createdAt TEXT
);

DROP TABLE IF EXISTS blacklist;
CREATE TABLE blacklist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  value TEXT NOT NULL UNIQUE,
  reason TEXT,
  blockedBy TEXT,
  createdAt TEXT
);

DROP TABLE IF EXISTS audit_logs;
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orderId TEXT,
  agent TEXT,
  action TEXT,
  timestamp TEXT
);

DROP TABLE IF EXISTS coupons;
CREATE TABLE coupons (
  code TEXT PRIMARY KEY,
  discount INTEGER,
  type TEXT,
  minOrder INTEGER,
  validUntil TEXT,
  usageCount INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  phone TEXT UNIQUE,
  name TEXT,
  password TEXT,
  role TEXT DEFAULT 'customer',
  createdAt TEXT
);

DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

DROP TABLE IF EXISTS landing_pages;
CREATE TABLE landing_pages (
  id TEXT PRIMARY KEY,
  slug TEXT,
  title TEXT,
  template TEXT,
  product TEXT,
  views INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

DROP TABLE IF EXISTS cms;
CREATE TABLE cms (
  key TEXT PRIMARY KEY,
  value TEXT
);

`;

// Seed products
const prodPath = path.join(rootDir, 'data', 'products.json');
if (fs.existsSync(prodPath)) {
  const products = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
  for (const p of products) {
    const basePrice = p.price || (p.variants && p.variants[0] ? p.variants[0].price : 0);
    const baseRegPrice = p.regularPrice || (p.variants && p.variants[0] ? p.variants[0].regularPrice : 0);
    sql += `INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (${p.id}, '${esc(p.name)}', '${esc(p.slug)}', '${esc(p.category)}', '${esc(p.categoryName)}', '${esc(p.tag)}', ${basePrice}, ${baseRegPrice}, ${p.rating || 5}, ${p.reviewCount || 100}, '${esc(p.image)}', '${esc(JSON.stringify(p.gallery || []))}', '${esc(p.description)}', '${esc(JSON.stringify(p.benefits || []))}', '${esc(p.ingredients)}', '${esc(JSON.stringify(p.variants || []))}');\n`;
  }
}

// Seed clean orders
sql += `INSERT INTO orders (id, customer, items, subtotal, deliveryCharge, total, status, source, callCenterNote, courier, lastUpdatedBy, createdAt) VALUES ('PF-2041', '{"name":"মাহমুদুল হাসান","phone":"01712345678","address":"বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা","city":"Dhaka"}', '[{"id":1,"name":"প্রিমি ফার্ম কালো সোনা","price":950,"quantity":1,"size":"৪০০ গ্রাম"}]', 950, 70, 1020, 'Pending', 'Landing Page', 'নতুন অর্ডার এসেছে। কল দিয়ে নিশ্চিত করতে হবে।', NULL, '{"agent":"সিস্টেম","timestamp":"2026-11-10T23:45:00.000Z"}', '2026-11-10T23:45:00.000Z');
INSERT INTO orders (id, customer, items, subtotal, deliveryCharge, total, status, source, callCenterNote, courier, lastUpdatedBy, createdAt) VALUES ('PF-2042', '{"name":"সায়মা সুলতানা","phone":"01819556677","address":"নাসিরাবাদ হাউজিং সোসাইটি, রোড ২, চট্টগ্রাম","city":"Outside Dhaka"}', '[{"id":5,"name":"ইলিশ মাছের আচার","price":880,"quantity":1},{"id":8,"name":"রোজেলা টি","price":290,"quantity":1}]', 1170, 130, 1300, 'Pending', 'Main Website', '', NULL, '{"agent":"সিস্টেম","timestamp":"2026-11-10T23:30:00.000Z"}', '2026-11-10T23:30:00.000Z');
INSERT INTO orders (id, customer, items, subtotal, deliveryCharge, total, status, source, callCenterNote, courier, lastUpdatedBy, createdAt) VALUES ('PF-2028', '{"name":"নাজমুল হুদা","phone":"01872170476","address":"প্লট ৪, ব্লক সি, বসুন্ধরা আ/এ, ঢাকা","city":"Dhaka"}', '[{"id":1,"name":"প্রিমি ফার্ম কালো সোনা","price":950,"quantity":2,"size":"৪০০ গ্রাম"}]', 1900, 70, 1970, 'In Courier', 'Landing Page', 'Steadfast কুরিয়ারে বুকিং সম্পন্ন।', '{"provider":"Steadfast","trackingCode":"ST-492104","status":"In Transit"}', '{"agent":"সুপার এডমিন","timestamp":"2026-11-10T18:00:00.000Z"}', '2026-11-10T17:10:00.000Z');
`;

// Seed failed orders
sql += `INSERT INTO failed_orders (id, customer, product, amount, step, reason, status, createdAt) VALUES ('FAIL-901', '{"name":"মাহমুদুল হাসান","phone":"01712349876","address":"উত্তরা, ঢাকা","city":"Dhaka"}', 'প্রিমি ফার্ম মধুময় কালো সোনা (৪০০ গ্রাম)', 950, 'Checkout Form', 'ফর্ম পূরণ করার পর কনফার্ম করেননি', 'Failed / Abandoned', '2026-11-10T22:15:00.000Z');
INSERT INTO failed_orders (id, customer, product, amount, step, reason, status, createdAt) VALUES ('FAIL-902', '{"name":"কামরুল ইসলাম","phone":"01987654321","address":"সৈয়দপুর, নীলফামারী","city":"Outside Dhaka"}', 'সুন্দরবনের প্রাকৃতিক মধু (১ কেজি)', 1200, 'Checkout Form', 'ব্রাউজার ক্লোজ করেছেন', 'Failed / Abandoned', '2026-11-10T23:30:00.000Z');
`;

// Seed coupons
sql += `INSERT OR IGNORE INTO coupons (code, discount, type, minOrder, validUntil, usageCount, status) VALUES ('PREME10', 100, 'fixed', 800, '2026-12-31', 0, 'active');
INSERT OR IGNORE INTO coupons (code, discount, type, minOrder, validUntil, usageCount, status) VALUES ('FREESHIP', 70, 'shipping', 1200, '2026-12-31', 0, 'active');
`;

// Seed users
sql += `INSERT OR REPLACE INTO users (id, phone, name, password, role, createdAt) VALUES ('ADMIN-01', 'admin@premefarm.com', 'সুপার এডমিন', 'Admin@PremeFarm', 'super_admin', datetime('now'));
INSERT OR REPLACE INTO users (id, phone, name, password, role, createdAt) VALUES ('USER-DEMO', '01700000000', 'কাস্টমার ডেমো', '123456', 'customer', datetime('now'));
`;

// Seed settings
const setPath = path.join(rootDir, 'data', 'settings.json');
if (fs.existsSync(setPath)) {
  const settings = JSON.parse(fs.readFileSync(setPath, 'utf8'));
  sql += `INSERT OR REPLACE INTO settings (key, value) VALUES ('general', '${esc(JSON.stringify(settings))}');\n`;
}

// Seed CMS
const cmsPath = path.join(rootDir, 'data', 'site_content.json');
if (fs.existsSync(cmsPath)) {
  const cms = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));
  sql += `INSERT OR REPLACE INTO cms (key, value) VALUES ('content', '${esc(JSON.stringify(cms))}');\n`;
}

const outPath = path.join(rootDir, 'schema.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log('Successfully generated clean schema.sql. Bytes:', sql.length);
