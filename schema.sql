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

INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (1, 'প্রিমি ফার্ম কালো সোনা (Black Gold - মধুময় কালোজিরা)', 'kalo-shona-madhumoy-kalojira', 'kalo-shona', 'কালো সোনা', 'বেস্ট সেলার • ১০০% অর্গানিক', 550, 650, 5, 468, 'images/kalo_shona_jar.png', '["images/kalo_shona_jar.png","images/hero_banner_1.png","images/hero_banner_2.png"]', '১০০% খাঁটি সুন্দরবনের মধু, বাছাইকৃত কালোজিরা, খাঁটি সরিষার তেল ও পুষ্টিকর গুঁড়া মশলার সমন্বয়ে তৈরি ঐতিহ্যবাহী বিশেষ পথ্য ''কালো সোনা''। এটি সারাদিনের কর্মশক্তি বৃদ্ধি করে, দীর্ঘস্থায়ী ক্লান্তি দূর করে এবং রোগ প্রতিরোধ ক্ষমতা বহুগুণে বৃদ্ধি করে।', '["স্মৃতিশক্তি বৃদ্ধি ও মস্তিষ্কের কার্যক্ষমতা সচল রাখে","ত্বকের প্রাকৃতিক উজ্জ্বলতা ও লাবণ্য বৃদ্ধি করে","কোলেস্টেরল ও রক্তচাপ নিয়ন্ত্রণে বিশেষ ভূমিকা রাখে","শারীরিক দুর্বলতা ও ক্লান্তি দূর করে শক্তি বৃদ্ধি করে","রক্ত বিশুদ্ধকরণ ও রক্ত সঞ্চালন স্বাভাবিক রাখে","শরীরের রোগ প্রতিরোধ ক্ষমতা (ইমিউনিটি) বৃদ্ধি করে"]', 'বাছাইকৃত প্রিমিয়াম কালোজিরা, খাঁটি সরিষার তেল, সুন্দরবনের মধু, পুষ্টিকর গুঁড়া মশলা ও প্রাকৃতিক ভেষজ উপাদান।', '[{"size":"২৫০ গ্রাম","regularPrice":650,"price":550,"popular":false},{"size":"৪০০ গ্রাম","regularPrice":1150,"price":950,"popular":true},{"size":"১ কেজি","regularPrice":1850,"price":1550,"popular":false}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (2, 'প্রিমি ফার্ম খাঁটি গাওয়া ঘি (Aroma Premium Ghee)', 'premium-aroma-gawa-ghee', 'ghee', 'ঘি', 'শতভাগ খাঁটি ও দানাদার', 890, 1050, 5, 284, 'images/hero_banner_2.png', '["images/hero_banner_2.png"]', 'গ্রামের দেশি গরুর খাঁটি দুধের মাখন থেকে ঐতিহ্যবাহী জ্বাল পদ্ধতিতে তৈরি অতুলনীয় সুগন্ধি ও সুস্বাদু দানাদার গাওয়া ঘি। কোনো কৃত্রিম ফ্লেভার বা রং ছাড়া শতভাগ প্রাকৃতিক।', '["অতুলনীয় সুবাস ও খাঁটি দানাদার টেক্সচার","উন্নত মানের ফ্যাট হজমশক্তি ও রোগ প্রতিরোধ বাড়ায়","মস্তিষ্কের পুষ্টি ও স্মৃতিশক্তি বৃদ্ধিতে দারুণ উপকারী"]', '১০০% খাঁটি দেশি গরুর দুধের মাখন থেকে প্রস্তুত গাওয়া ঘি।', '[{"size":"৫০০ গ্রাম","regularPrice":1050,"price":890,"popular":true},{"size":"১ কেজি","regularPrice":1950,"price":1690,"popular":false}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (3, 'সুন্দরবনের প্রাকৃতিক খাঁটি মধু (Pure Sundarban Wild Honey)', 'sundarban-pure-wild-honey', 'honey', 'মধু', '১০০% কাঁচা ও বিশুদ্ধ', 650, 750, 5, 340, 'images/kalo_shona_jar.png', '["images/kalo_shona_jar.png"]', 'সুন্দরবনের গভীর জঙ্গল থেকে মোয়ালদের দ্বারা সরাসরি সংগৃহীত ১০০% কাঁচা ও বিশুদ্ধ খলিশা ও গরান ফুলের মধু। কোনো চিনি বা কৃত্রিম তরল মিশ্রণমুক্ত।', '["কাশি, ঠান্ডা ও শ্বাসকষ্টের প্রাকৃতিক উপশম","শারীরিক বল ও মেধা শক্তি বৃদ্ধি করে","শরীরের রোগ প্রতিরোধ ব্যবস্থা সুদৃঢ় করে"]', '১০০% সুন্দরবনের প্রাকৃতিক কাঁচা মধু।', '[{"size":"৫০০ গ্রাম","regularPrice":750,"price":650,"popular":true},{"size":"১ কেজি","regularPrice":1400,"price":1200,"popular":false}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (4, 'খাঁটি সরিষা ফুলের মধু (Mustard Flower Honey)', 'mustard-flower-pure-honey', 'honey', 'মধু', 'প্রাকৃতিক পুষ্টি', 450, 550, 4.9, 165, 'images/kalo_shona_jar.png', '["images/kalo_shona_jar.png"]', 'শীতকালে সরিষা ক্ষেত থেকে সংগৃহীত হালকা সোনালী রঙের শতভাগ খাঁটি সরিষা ফুলের মধু। পুষ্টি ও মিষ্টি স্বাদে অতুলনীয়।', '["সহজে হজম হয় ও প্রাকৃতিক মিষ্টির স্বাস্থ্যকর উৎস","শিশুদের শারীরিক বিকাশ ও মেধা বৃদ্ধিতে সাহায্য করে"]', '১০০% প্রাকৃতিক সরিষা ফুলের মধু।', '[{"size":"৫০০ গ্রাম","regularPrice":550,"price":450,"popular":true},{"size":"১ কেজি","regularPrice":990,"price":850,"popular":false}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (5, 'প্রিমিয়াম ইলিশ মাছের আচার (Authentic Hilsa Fish Pickle)', 'premium-hilsa-fish-pickle', 'pickle', 'আচার', 'প্রিমি ফার্ম সিগনেচার স্পেশাল', 580, 650, 5, 389, 'images/hero_banner_1.png', '["images/hero_banner_1.png"]', 'তাজা খাঁটি ইলিশ মাছ, খাঁটি ঘানিভাঙা সরিষার তেল, কাঁচা মরিচ ও ঘরোয়া বিশেষ মশলায় প্রস্তুত ঐতিহ্যবাহী জিভে জল আনা ইলিশ আচার। কোনো রাসায়নিক প্রিজারভেটিভ নেই।', '["ঘরোয়া রেসিপিতে তৈরি খাঁটি বাঙ্গালি স্বাদ","শতভাগ প্রিজারভেটিভ ও কেমিক্যালমুক্ত","খিচুড়ি, পোলাও বা গরম ভাতের সাথে অনন্য রসনা তৃপ্তি"]', 'তাজা ইলিশ মাছের টুকরো, খাঁটি সরিষার তেল, পাঁচফোড়ন, মেথি, রসুন, কাঁচা মরিচ, সিরকা ও খাঁটি মশলা।', '[{"size":"২০০ গ্রাম","regularPrice":650,"price":580,"popular":false},{"size":"৪০০ গ্রাম","regularPrice":980,"price":880,"popular":true},{"size":"৮০০ গ্রাম","regularPrice":1650,"price":1480,"popular":false}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (6, '৬ ধরনের ঘরোয়া খাঁটি আচার কম্বো (6-Pickle Feast Combo)', '6-pickle-feast-combo', 'pickle', 'আচার', 'ফ্যামিলি ফেস্ট কম্বো', 1300, 1500, 4.9, 174, 'images/hero_banner_2.png', '["images/hero_banner_2.png"]', 'আম, তেঁতুল, জলপাই, চালতা, বরই এবং রসুনের খাঁটি সরিষার তেলে তৈরি ৬টি ঐতিহ্যবাহী স্পেশাল আচারের সম্পূর্ণ ফ্যামিলি প্যাক।', '["একসাথে ৬টি ভিন্ন স্বাদের প্রিমিয়াম আচার","রুচি বৃদ্ধি ও হজমে চমৎকার সহায়ক","১০০% খাঁটি ও স্বাস্থ্যসম্মত ঘরোয়া প্রক্রিয়া"]', 'আম, মিষ্টি তেঁতুল, জলপাই, চালতা, টক বরই, দেশি রসুন, খাঁটি সরিষার তেল ও মসলা।', '[{"size":"৬টি স্পেশাল আচার কম্বো সেট","regularPrice":1500,"price":1300,"popular":true}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (7, 'রসুনের খাঁটি সরিষার তেলের আচার (Garlic Pickle)', 'pure-garlic-pickle', 'pickle', 'আচার', 'স্বাস্থ্যকর ভেষজ আচার', 380, 450, 4.8, 112, 'images/hero_banner_1.png', '["images/hero_banner_1.png"]', 'বাছাইকৃত দেশি রসুনের কোয়া, খাঁটি সরিষার তেল ও সুস্বাদু মসলার সমন্বয়ে তৈরি স্বাস্থ্যকর আচার। কোলেস্টেরল ও রক্তচাপ নিয়ন্ত্রণে সাহায্য করে।', '["হার্ট ভালো রাখতে ও কোলেস্টেরল কমাতে সহায়ক","ভাতের সাথে অনন্য সুস্বাদু ও রুচিকর"]', 'দেশি রসুন, খাঁটি সরিষার তেল, সরিষা দানা, মেথি, জিরা, ধনে, শুকনো মরিচ।', '[{"size":"৩৫০ গ্রাম","regularPrice":450,"price":380,"popular":true}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (8, 'রোজেলা টি / চুকাই চা (Premium Rosella Herbal Tea)', 'premium-rosella-tea', 'tea', 'চা ও হারবাল', 'হার্বাল ওয়েলনেস', 290, 350, 4.9, 192, 'images/wellness_model.png', '["images/wellness_model.png","images/hero_banner_3.png"]', '১০০% প্রাকৃতিক রোজেলা (হিবিস্কাস/চুকাই) ফুলের পাপড়ি দিয়ে তৈরি প্রিমিয়াম ভেষজ চা। প্রচুর অ্যান্টিঅক্সিডেন্ট ও ভিটামিন সি সমৃদ্ধ যা রক্তচাপ ও ওজন নিয়ন্ত্রণে অতুলনীয়। ক্যাফেইনমুক্ত সতেজ পানীয়।', '["উচ্চ রক্তচাপ ও হাইপারটেনশন নিয়ন্ত্রণে সাহায্য করে","শরীরের মেদ কমাতে ও ওজন নিয়ন্ত্রণে সহায়ক","প্রচুর ভিটামিন সি ও অ্যান্টিঅক্সিডেন্ট রোগ প্রতিরোধ বাড়ায়","হৃদযন্ত্র সুস্থ রাখে ও লিভার ডিটক্সে সাহায্য করে"]', '১০০% প্রাকৃতিক রোজেলা (চুকাই/হিবিস্কাস) শুকনো ফুল।', '[{"size":"১০০ গ্রাম","regularPrice":350,"price":290,"popular":true}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (9, 'প্রিমিয়াম সীড মিক্স (Superfood Seed Mix - 5 Seeds Blend)', 'superfood-seed-mix', 'seeds', 'সিড ও সুপারফুড', 'সুপারফুড • ওমেগা-৩ সমৃদ্ধ', 500, 590, 4.9, 235, 'images/morning_model.png', '["images/morning_model.png","images/hero_banner_2.png"]', 'চিয়া সিড, সূর্যমুখী বীজ, কুমড়ার বীজ, অর্গানিক তিসি এবং সাদা তিলের সুষম ও পুষ্টিকর সুপারফুড মিশ্রণ। ওমেগা-৩, ফাইবার ও প্রোটিনে ভরপুর যা প্রতিদিনের পুষ্টির চাহিদা মেটায়।', '["ওমেগা-৩ ফ্যাটি এসিড হার্ট ও রক্তনালী সুস্থ রাখে","উচ্চ খাদ্য আঁশ বা ফাইবার হজমপ্রক্রিয়া সহজ করে","শরীরের শক্তি ও কর্মক্ষমতা সারাদিন ধরে রাখে"]', 'চিয়া সিড, সূর্যমুখী বীজ, কুমড়ার বীজ, তিসি (Flaxseed), সাদা তিল।', '[{"size":"৫০০ গ্রাম","regularPrice":590,"price":500,"popular":true}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (10, 'সীড মিক্স (৫০০g) + রোজেলা টি (১০০g) স্পেশাল হেলথ কম্বো', 'seed-mix-rosella-tea-health-combo', 'combo', 'কম্বো অফার', 'স্পেশাল সেভার কম্বো • বেস্ট ভ্যালু', 750, 850, 5, 310, 'images/hero_banner_3.png', '["images/hero_banner_3.png","images/wellness_model.png"]', 'সুস্থ ও চনমনে জীবনযাপনের সেরা স্বাস্থ্যকর জুড়ি — ৫০০ গ্রাম সুপারফুড সীড মিক্স এবং ১০০ গ্রাম অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ রোজেলা টি একসাথে বিশেষ ছাড়ে।', '["সম্পূর্ণ প্রাকৃতিক পুষ্টি ও অ্যান্টিঅক্সিডেন্টের সংমিশ্রণ","হৃদযন্ত্রের সুরক্ষা ও ওজন নিয়ন্ত্রণে কার্যকর জুড়ি","একসাথে দুটি সুপারফুড বিশেষ সাশ্রয়ী মূল্যে"]', '৫০০ গ্রাম প্রিমিয়াম সীড মিক্স + ১০০ গ্রাম রোজেলা টি।', '[{"size":"কম্বো সেট (সীড মিক্স ৫০০g + রোজেলা টি ১০০g)","regularPrice":850,"price":750,"popular":true}]');
INSERT INTO products (id, name, slug, category, categoryName, tag, price, regularPrice, rating, reviewCount, image, gallery, description, benefits, ingredients, variants) VALUES (11, '৩টি আচার + ১টি উপহার মেগা প্যাক (3 Pickle + 1 Free Gift Offer)', '3-pickle-plus-free-gift-pack', 'combo', 'কম্বো অফার', 'মেগা অফার • ফ্রি গিফট', 1090, 1300, 4.9, 210, 'images/hero_banner_1.png', '["images/hero_banner_1.png"]', 'পছন্দের ৩টি স্পেশাল আচার কিনলে পাচ্ছেন আরও ১টি আকর্ষণীয় উপহার প্যাক সম্পূর্ণ ফ্রি! পরিবারের সবার পছন্দমতো সেরা স্বাদের অফার।', '["৩টি আচার কিনলে ১টি সম্পূর্ণ ফ্রি","অসাধারণ খাঁটি স্বাদ ও সেরা ভ্যালু অফার"]', '৩টি প্রিমিয়াম সিলেকশন আচার + ১টি সারপ্রাইজ গিফট প্যাক।', '[{"size":"৩টি আচার + ১টি ফ্রি প্যাক","regularPrice":1300,"price":1090,"popular":true}]');
INSERT OR IGNORE INTO coupons (code, discount, type, minOrder, validUntil, usageCount, status) VALUES ('PREME10', 100, 'fixed', 800, '2026-12-31', 0, 'active');
INSERT OR IGNORE INTO coupons (code, discount, type, minOrder, validUntil, usageCount, status) VALUES ('FREESHIP', 70, 'shipping', 1200, '2026-12-31', 0, 'active');
INSERT OR REPLACE INTO users (id, phone, name, password, role, createdAt) VALUES ('ADMIN-01', 'admin@premefarm.com', 'সুপার এডমিন', 'Admin@PremeFarm', 'super_admin', datetime('now'));
INSERT OR REPLACE INTO settings (key, value) VALUES ('general', '{"store":{"name":"Preme Farm (প্রিমি ফার্ম)","domain":"premefarm.com","hotline":"01872170476","supportEmail":"support@premefarm.com","address":"ঢাকা, বাংলাদেশ","deliveryChargeInsideDhaka":70,"deliveryChargeOutsideDhaka":130,"freeDeliveryThreshold":1800},"couriers":{"steadfast":{"enabled":true,"name":"Steadfast Courier","baseUrl":"https://portal.steadfast.com.bd/api/v1/create_order","apiKey":"sf_live_api_key_premefarm_2026","secretKey":"sf_secret_key_9948271038","autoDispatch":false,"sandbox":false},"pathao":{"enabled":true,"name":"Pathao Courier","baseUrl":"https://api-hermes.pathao.com/aladdin/api/v1/orders","clientId":"pathao_client_premefarm_102","clientSecret":"pathao_secret_99812401","storeId":"store_dhaka_01","sandbox":false},"redx":{"enabled":false,"name":"RedX Courier","baseUrl":"https://openapi.redx.com.bd/v1.0.0-beta/parcels","apiToken":"","sandbox":false}}}');
INSERT OR REPLACE INTO cms (key, value) VALUES ('content', '{"header":{"topTicker":"🌿 বিশেষ মেগা অফার: ২ বা ততোধিক প্রোডাক্ট অর্ডারে সারা দেশে ক্যাশ অন ডেলিভারি একদম ফ্রি!","hotline":"01872170476","logoImage":"images/logo.png","brandName":"Preme Farm","brandTagline":"প্রিমি ফার্ম • সুখী জীবনের জন্য স্বাস্থ্যকর খাবার"},"banners":[{"id":1,"badge":"⚡ কাজের ক্লান্তি দূর করার ন্যাচারাল ফর্মুলা","title":"অফিসের কাজের ক্লান্তি? <br><span class=\"gold\">সারাদিন থাকুন চাঙ্গা ও প্রাণবন্ত!</span>","desc":"টানা কাজের চাপ আর শারীরিক দুর্বলতাকে বিদায় জানান। কাজের টেবিলে রাখুন প্রিমি ফার্মের মধুময় কালো সোনা — ১০০% প্রাকৃতিক স্ট্যামিনা বুস্টার।","image":"images/hero_banner_1.png","buttonText":"🛍️ এখনই অর্ডার করুন","productId":1},{"id":2,"badge":"🌿 সুস্থ ও ফিট থাকার সহজ অভ্যাস","title":"খাঁটি পণ্যের বিশ্বস্ত ঠিকানা <br><span class=\"gold\">আপনার সুস্থতার সিক্রেট পার্টনার!</span>","desc":"প্রতিদিন সকালে মাত্র এক চামচেই ফিরিয়ে আনুন অফুরন্ত উদ্যম, ক্লান্তিহীন কর্মশক্তি ও অটুট রোগ প্রতিরোধ ক্ষমতা।","image":"images/hero_banner_2.png","buttonText":"🛍️ ট্রায়াল প্যাক অর্ডার করুন","productId":1},{"id":3,"badge":"🍵 ১০০% খাঁটি ভেষজ ওয়েলনেস","title":"সুখী জীবনের জন্য <br><span class=\"gold\">স্বাস্থ্যকর ও খাঁটি খাবার</span>","desc":"সুন্দরবনের কাঁচা মধু, দানাদার গাওয়া ঘি, রোজেলা টি ও ঘরোয়া আচারের খাঁটি স্বাদ ঘরে বসেই উপভোগ করুন।","image":"images/hero_banner_3.png","buttonText":"🛍️ শপ দেখুন","productId":2}],"footer":{"aboutText":"সুখী জীবনের জন্য স্বাস্থ্যকর ও খাঁটি খাবার পৌঁছে দিতে প্রিমি ফার্ম নিবেদিতপ্রাণ। কোনো রাসায়নিক প্রিজারভেটিভ বা ভেজাল নেই — শতভাগ প্রাকৃতিক ও নিরাপদ পথ্য।","hotline":"01872170476","hotlineHours":"সকাল ৯টা - রাত ১১টা","address":"ঢাকা, বাংলাদেশ","copyright":"© ২০২৬ Preme Farm (প্রিমি ফার্ম)। সর্বস্বত্ব সংরক্ষিত।"},"staff":[{"id":"staff-admin","name":"সুপার এডমিন","username":"admin","pin":"1234","role":"Super Admin","roleTitleBn":"সুপার এডমিন","roleTitleEn":"Super Admin","permissions":["*"]},{"id":"staff-tanvir","name":"তানভীর (Agent-01)","username":"tanvir","pin":"1234","role":"Call Center Agent","roleTitleBn":"কল সেন্টার এক্সিকিউটিভ","roleTitleEn":"Call Center Agent","permissions":["orders"]},{"id":"staff-sadia","name":"সাদিয়া (Agent-02)","username":"sadia","pin":"1234","role":"Call Center Agent","roleTitleBn":"কল সেন্টার এক্সিকিউটিভ","roleTitleEn":"Call Center Agent","permissions":["orders"]},{"id":"staff-rafiq","name":"রফিক (Supervisor)","username":"rafiq","pin":"1234","role":"Supervisor","roleTitleBn":"কল সেন্টার সুপারভাইজার","roleTitleEn":"Supervisor","permissions":["orders","audit","blacklist"]},{"id":"staff-marketing","name":"মার্কেটিং স্পেশালিস্ট","username":"marketing","pin":"1234","role":"Marketing","roleTitleBn":"মার্কেটিং স্পেশালিস্ট","roleTitleEn":"Marketing Specialist","permissions":["landing","coupons"]}]}');
