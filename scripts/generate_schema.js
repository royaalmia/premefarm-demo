const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const esc = s => s ? s.toString().replace(/'/g, "''") : '';

let sql = `-- =========================================================
-- Preme Farm Enterprise Cloudflare D1 Database Schema & Seed
-- Compatible with Cloudflare Workers, Pages Functions & SQLite
-- =========================================================

DROP TABLE IF EXISTS products;
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

-- ==================== SEED DATA ====================
`;

// Seed products
const prodPath = path.join(rootDir, 'data', 'products.json');
if (fs.existsSync(prodPath)) {
  const products = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
  for (const p of products) {
    sql += `INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (${p.id}, '${esc(p.name)}', '${esc(p.slug)}', '${esc(p.category)}', '${esc(p.categoryName)}', '${esc(p.tag)}', ${p.price || 0}, ${p.regularPrice || 0}, ${p.rating || 5}, ${p.reviewCount || 100}, '${esc(p.image)}', '${esc(JSON.stringify(p.gallery || []))}', '${esc(p.description)}', '${esc(JSON.stringify(p.benefits || []))}', '${esc(p.ingredients)}', '${esc(JSON.stringify(p.variants || []))}');\n`;
  }
}

// Seed orders
const ordPath = path.join(rootDir, 'data', 'orders.json');
if (fs.existsSync(ordPath)) {
  const orders = JSON.parse(fs.readFileSync(ordPath, 'utf8'));
  for (const o of orders) {
    sql += `INSERT INTO orders (id, customer, items, subtotal, deliveryCharge, total, status, source, callCenterNote, courier, lastUpdatedBy, createdAt) VALUES ('${esc(o.id)}', '${esc(JSON.stringify(o.customer))}', '${esc(JSON.stringify(o.items))}', ${o.subtotal || 0}, ${o.deliveryCharge || 70}, ${o.total || 0}, '${esc(o.status || 'Pending')}', '${esc(o.source || 'Website')}', '${esc(o.callCenterNote || '')}', '${esc(JSON.stringify(o.courier || null))}', '${esc(JSON.stringify(o.lastUpdatedBy || null))}', '${esc(o.createdAt || new Date().toISOString())}');\n`;
  }
}

// Seed failed orders
const failPath = path.join(rootDir, 'data', 'failed_orders.json');
if (fs.existsSync(failPath)) {
  const failed = JSON.parse(fs.readFileSync(failPath, 'utf8'));
  for (const f of failed) {
    sql += `INSERT INTO failed_orders (id, customer, product, amount, step, reason, status, createdAt) VALUES ('${esc(f.id)}', '${esc(JSON.stringify(f.customer))}', '${esc(f.product)}', ${f.amount || 0}, '${esc(f.step || '')}', '${esc(f.reason || '')}', '${esc(f.status || 'Failed')}', '${esc(f.createdAt || new Date().toISOString())}');\n`;
  }
}

// Seed settings
const setPath = path.join(rootDir, 'data', 'settings.json');
if (fs.existsSync(setPath)) {
  const settings = JSON.parse(fs.readFileSync(setPath, 'utf8'));
  sql += `INSERT INTO settings (key, value) VALUES ('general', '${esc(JSON.stringify(settings))}');\n`;
}

// Seed CMS
const cmsPath = path.join(rootDir, 'data', 'site_content.json');
if (fs.existsSync(cmsPath)) {
  const cms = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));
  sql += `INSERT INTO cms (key, value) VALUES ('content', '${esc(JSON.stringify(cms))}');\n`;
}

// Seed Coupons
const coupPath = path.join(rootDir, 'data', 'coupons.json');
if (fs.existsSync(coupPath)) {
  const coupons = JSON.parse(fs.readFileSync(coupPath, 'utf8'));
  for (const c of coupons) {
    sql += `INSERT OR IGNORE INTO coupons (code, discount, type, minOrder, validUntil, usageCount, status) VALUES ('${esc(c.code)}', ${c.discount || 0}, '${esc(c.type || 'fixed')}', ${c.minOrder || 0}, '${esc(c.validUntil || '')}', ${c.usageCount || 0}, '${esc(c.status || 'active')}');\n`;
  }
}

// Seed Users (Customer & Master Admin)
sql += `INSERT OR REPLACE INTO users (id, phone, name, password, role, createdAt) VALUES ('ADMIN-01', 'admin@premefarm.com', 'সুপার এডমিন', 'Admin@PremeFarm', 'super_admin', datetime('now'));\n`;
sql += `INSERT OR REPLACE INTO users (id, phone, name, password, role, createdAt) VALUES ('USER-DEMO', '01700000000', 'কাস্টমার ডেমো', '123456', 'customer', datetime('now'));\n`;

const outPath = path.join(rootDir, 'schema.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log('Successfully generated schema.sql at', outPath, 'Bytes:', sql.length);
