/**
 * Preme Farm (প্রিমি ফার্ম) - Core E-Commerce Logic
 * Supports dual-mode: Node.js Express Backend & Cloudflare/GitHub Pages static fallback
 */

const PremeStore = {
  cart: [],
  products: [],
  deliveryCharge: 100,

  init() {
    this.loadCart();
    this.fetchProducts();
    this.updateCartBadge();
    this.loadDynamicBanners();
  },

  loadCart() {
    try {
      const saved = localStorage.getItem('premefarm_cart');
      this.cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.cart = [];
    }
  },

  saveCart() {
    localStorage.setItem('premefarm_cart', JSON.stringify(this.cart));
    this.updateCartBadge();
  },

  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge, .cart-pill-badge, #header-cart-count');
    const totalQty = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalAmount = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    badges.forEach(b => {
      b.textContent = totalQty;
    });

    const pillTotal = document.getElementById('header-cart-total');
    if (pillTotal) {
      pillTotal.textContent = `৳ ${totalAmount.toLocaleString('bn-BD')}`;
    }
  },

  async fetchProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        this.products = data.data || [];
        window.dispatchEvent(new CustomEvent('products_loaded', { detail: this.products }));
        return;
      }
    } catch (e) {
      console.warn('Backend API unavailable.');
    }
    this.products = [];
    window.dispatchEvent(new CustomEvent('products_loaded', { detail: this.products }));
  },

  addToCart(productId, variantIndex = 0, quantity = 1, autoOpenCart = true) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    const variant = product.variants[variantIndex] || product.variants[0];

    const existing = this.cart.find(i => i.productId === productId && i.variant === variant.size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        variant: variant.size,
        price: variant.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`✅ "${product.name} (${variant.size})" কার্টে যোগ করা হয়েছে!`);
    
    if (autoOpenCart) {
      this.openCartDrawer();
    }
  },

  buyNow(productId, variantIndex = 0, quantity = 1) {
    this.addToCart(productId, variantIndex, quantity, false);
    // Redirect to checkout or scroll to checkout
    const checkoutEl = document.getElementById('checkout-section');
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/cart';
    }
  },

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.renderCartDrawer();
    this.renderCartPage();
  },

  updateQuantity(index, delta) {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.saveCart();
      this.renderCartDrawer();
      this.renderCartPage();
    }
  },

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getTotal() {
    const sub = this.getSubtotal();
    const charge = sub >= 1800 ? 0 : this.deliveryCharge;
    return sub + charge;
  },

  openCartDrawer() {
    this.renderCartDrawer();
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    }
  },

  renderCartDrawer() {
    const body = document.getElementById('cart-items-body');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    if (!body) return;

    if (this.cart.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: #88998b;">
          <div style="font-size: 48px; margin-bottom: 12px;">🛒</div>
          <h4 style="font-size: 18px; color: #1b2a1e; margin-bottom: 6px;">আপনার কার্ট বর্তমানে খালি</h4>
          <p style="font-size: 14px;">পছন্দের প্রোডাক্ট কার্টে যোগ করতে শপ ভিজিট করুন।</p>
          <a href="/shop" class="btn-primary-large" style="margin-top: 18px; padding: 10px 24px; font-size: 15px;">শপিং শুরু করুন ➔</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '৳০';
      return;
    }

    let html = '';
    this.cart.forEach((item, idx) => {
      html += `
        <div class="cart-item-card">
          <img src="${item.image}" class="cart-item-img" alt="${item.name}">
          <div class="cart-item-meta">
            <h5>${item.name}</h5>
            <span class="variant">${item.variant}</span>
            <span class="price">৳${item.price}</span>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <button onclick="PremeStore.updateQuantity(${idx}, -1)" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid #ccc; background:#fff; cursor:pointer;">-</button>
              <span style="font-weight: 700; font-size: 14px;">${item.quantity}</span>
              <button onclick="PremeStore.updateQuantity(${idx}, 1)" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid #ccc; background:#fff; cursor:pointer;">+</button>
            </div>
          </div>
          <button onclick="PremeStore.removeFromCart(${idx})" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 18px;">🗑️</button>
        </div>
      `;
    });

    body.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = `৳${this.getSubtotal()}`;
  },

  renderCartPage() {
    // Used on /cart page
    const listEl = document.getElementById('cart-page-list');
    const subtotalEl = document.getElementById('cart-page-subtotal');
    const deliveryEl = document.getElementById('cart-page-delivery');
    const totalEl = document.getElementById('cart-page-total');
    if (!listEl) return;

    if (this.cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 40px; background: #fff; border-radius: 14px; border: 1px solid #e2e8e3;">
          <div style="font-size: 54px; margin-bottom: 12px;">🛍️</div>
          <h3 style="color: #1b2a1e; margin-bottom: 8px;">আপনার কার্টে কোনো প্রোডাক্ট নেই</h3>
          <p style="color: #556958; margin-bottom: 20px;">আমাদের খাঁটি অর্গানিক মধুময় কালো সোনা ও প্রাকৃতিক ভেষজ দেখুন।</p>
          <a href="/shop" class="btn-primary-large">প্রোডাক্ট কালেকশন দেখুন ➔</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '৳০';
      if (deliveryEl) deliveryEl.textContent = '৳০';
      if (totalEl) totalEl.textContent = '৳০';
      return;
    }

    let html = '';
    this.cart.forEach((item, idx) => {
      html += `
        <div class="cart-page-item">
          <div class="cart-page-item-top">
            <img src="${item.image}" class="cart-page-item-img" alt="${item.name}">
            <div class="cart-page-item-details">
              <h4 class="cart-page-item-title">${item.name}</h4>
              <div class="cart-page-item-variant">সাইজ/ওজন: <b>${item.variant}</b></div>
              <div class="cart-page-item-unit-price">একক মূল্য: ৳${item.price}</div>
            </div>
          </div>
          <div class="cart-page-item-bottom">
            <div class="cart-page-qty-wrap">
              <button onclick="PremeStore.updateQuantity(${idx}, -1)" class="cart-page-qty-btn" aria-label="Decrease">-</button>
              <span class="cart-page-qty-num">${item.quantity}</span>
              <button onclick="PremeStore.updateQuantity(${idx}, 1)" class="cart-page-qty-btn" aria-label="Increase">+</button>
            </div>
            <div class="cart-page-item-subtotal">৳${item.price * item.quantity}</div>
            <button onclick="PremeStore.removeFromCart(${idx})" class="cart-page-remove-btn" title="মুছে ফেলুন">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
    const sub = this.getSubtotal();
    const charge = sub >= 1800 ? 0 : this.deliveryCharge;
    if (subtotalEl) subtotalEl.textContent = `৳${sub}`;
    if (deliveryEl) deliveryEl.textContent = charge === 0 ? 'ফ্রি' : `৳${charge}`;
    if (totalEl) totalEl.textContent = `৳${sub + charge}`;
  },

  async loadDynamicBanners() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        const banners = json.data?.banners || json.content?.banners;
        if (Array.isArray(banners) && banners.length > 0) {
          this.renderHeroSlider(banners);
        }
      }
    } catch (e) {}
  },

  renderHeroSlider(banners) {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;
    
    // Build slides HTML
    // Build slides HTML (Crystal clear banner with no dark shadow overlay)
    const slidesHtml = banners.map((b, idx) => {
      const hasText = (b.title && b.title.trim().length > 0) || (b.desc && b.desc.trim().length > 0);
      return `
        <div class="slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${b.image}'); background-size: cover; background-position: center;">
          ${hasText ? `
            <div class="slide-content">
              ${b.badge ? `<div class="slide-badge">${b.badge}</div>` : ''}
              ${b.title ? `<h2 class="slide-title">${b.title}</h2>` : ''}
              ${b.desc ? `<p class="slide-desc">${b.desc}</p>` : ''}
              <div class="slide-actions">
                ${b.btn1Text || b.buttonText ? `<a href="${b.btn1Link || '#kalo-shona'}" class="btn-primary-large"><span>🛍️</span> ${b.btn1Text || b.buttonText}</a>` : ''}
                ${b.btn2Text ? `<a href="${b.btn2Link || '/shop'}" class="btn-secondary-outline">${b.btn2Text}</a>` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    const dotsHtml = `
      <div class="slider-dots">
        ${banners.map((_, idx) => `<span class="dot ${idx === 0 ? 'active' : ''}" onclick="window.setCustomHeroSlide(${idx})"></span>`).join('')}
      </div>
    `;

    slider.innerHTML = slidesHtml + dotsHtml;

    // Attach slide transition
    let cur = 0;
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    window.setCustomHeroSlide = (idx) => {
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      cur = idx;
    };

    if (window._heroSliderInterval) clearInterval(window._heroSliderInterval);
    window._heroSliderInterval = setInterval(() => {
      if (slides.length > 1) {
        window.setCustomHeroSlide((cur + 1) % slides.length);
      }
    }, 5500);
  },

  async submitOrder(formData) {
    if (this.cart.length === 0) {
      alert('আপনার কার্ট খালি! অনুগ্রহ করে একটি প্রোডাক্ট সিলেক্ট করুন।');
      return;
    }

    const subtotal = this.getSubtotal();
    const deliveryCharge = subtotal >= 1800 ? 0 : (this.deliveryCharge || 100);
    const total = subtotal + deliveryCharge;

    const orderPayload = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city || (this.deliveryCharge === 100 ? 'Dhaka' : 'Outside Dhaka')
      },
      items: [...this.cart],
      subtotal,
      deliveryCharge,
      total,
      notes: formData.notes || ''
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const result = await res.json();
        this.onOrderSuccess(result.order);
        return;
      }
    } catch (e) {
      console.warn('Backend offline, saving order to localStorage fallback for Cloudflare/GitHub Pages.');
    }

    // LocalStorage fallback for Cloudflare Pages / GitHub Pages
    const localOrders = JSON.parse(localStorage.getItem('premefarm_orders') || '[]');
    const fallbackOrder = {
      id: `PF-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      ...orderPayload,
      paymentMethod: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
      status: 'Pending',
      courier: null
    };
    localOrders.unshift(fallbackOrder);
    localStorage.setItem('premefarm_orders', JSON.stringify(localOrders));

    this.onOrderSuccess(fallbackOrder);
  },

  onOrderSuccess(order) {
    this.cart = [];
    this.saveCart();
    
    // Save order phone to remember user on /profile
    if (order.customer && order.customer.phone) {
      localStorage.setItem('premefarm_user_phone', order.customer.phone);
    }

    const modal = document.getElementById('order-success-modal');
    if (modal) {
      const idEl = document.getElementById('success-order-id');
      const nameEl = document.getElementById('success-customer-name');
      const totalEl = document.getElementById('success-order-total');
      const phoneEl = document.getElementById('success-customer-phone');
      const waLink = document.getElementById('success-whatsapp-btn');
      const trackBtn = document.getElementById('success-track-btn');
      const itemsList = document.getElementById('success-items-list');
      const subtotalEl = document.getElementById('success-order-subtotal');
      const deliveryEl = document.getElementById('success-order-delivery');

      if (idEl) idEl.textContent = order.id;
      if (nameEl) nameEl.textContent = order.customer?.name || '';
      if (phoneEl) phoneEl.textContent = order.customer?.phone || '';
      if (totalEl) totalEl.textContent = `৳${(order.total || 0).toLocaleString()}`;
      if (subtotalEl) subtotalEl.textContent = `৳${(order.subtotal || (order.total - (order.deliveryCharge || 100))).toLocaleString()}`;
      if (deliveryEl) deliveryEl.textContent = `৳${(order.deliveryCharge !== undefined ? order.deliveryCharge : 100).toLocaleString()}`;

      if (itemsList && order.items && order.items.length > 0) {
        itemsList.innerHTML = order.items.map(i => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed #e2e8f0; font-size: 13.5px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e293b;">${i.name}</span>
              ${i.size ? `<span style="font-size: 11.5px; background: #eef5f0; color: #0d4d29; padding: 1px 6px; border-radius: 4px;">${i.size}</span>` : ''}
              <span style="color: #64748b; font-size: 12px;">× ${i.quantity || 1}</span>
            </div>
            <div style="font-weight: 800; color: #0d4d29;">৳${((i.price || 0) * (i.quantity || 1)).toLocaleString()}</div>
          </div>
        `).join('');
      }

      if (trackBtn) {
        trackBtn.href = `/profile?phone=${encodeURIComponent(order.customer?.phone || '')}`;
      }

      if (waLink) {
        const msg = encodeURIComponent(`হ্যালো প্রিমি ফার্ম, আমি এইমাত্র অর্ডার করেছি।\nঅর্ডার আইডি: #${order.id}\nমোট বিল: ৳${order.total} (ক্যাশ অন ডেলিভারি)\nঅনুগ্রহ করে অর্ডারটি দ্রুত পাঠিয়ে দিন।`);
        waLink.href = `https://wa.me/8801872170476?text=${msg}`;
      }

      modal.classList.add('active');
    } else {
      alert(`🎉 ধন্যবাদ! আপনার অর্ডার #${order.id} গ্রহণ করা হয়েছে। মোট: ৳${order.total} (ক্যাশ অন ডেলিভারি)।`);
      window.location.href = `/profile?phone=${encodeURIComponent(order.customer?.phone || '')}`;
    }
  },

  showToast(msg) {
    let toast = document.getElementById('store-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'store-toast';
      toast.style.cssText = 'position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:#0d4d29; color:#fff; padding:12px 24px; border-radius:30px; font-weight:700; font-size:15px; box-shadow:0 8px 24px rgba(0,0,0,0.3); z-index:9999; border:1px solid #D4AF37; transition:opacity 0.3s; pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2800);
  },

  // ================= PRODUCT QUICKVIEW MODAL & RELEVANT PRODUCTS =================
  currentModalProduct: null,
  currentModalVariantIdx: 0,
  currentModalQty: 1,

  openProductModal(productId) {
    const product = (this.products || []).find(p => String(p.id) === String(productId));
    if (!product) return;

    this.currentModalProduct = product;
    this.currentModalVariantIdx = 0;
    this.currentModalQty = 1;

    this.renderProductModal();
    const modal = document.getElementById('product-quickview-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeProductModal() {
    const modal = document.getElementById('product-quickview-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  handleModalBackdropClick(e) {
    if (e.target && e.target.id === 'product-quickview-modal') {
      this.closeProductModal();
    }
  },

  selectModalVariant(idx) {
    this.currentModalVariantIdx = idx;
    this.renderProductModal();
  },

  updateModalQty(delta) {
    this.currentModalQty = Math.max(1, (this.currentModalQty || 1) + delta);
    const qtyVal = document.getElementById('modal-qty-val');
    if (qtyVal) qtyVal.textContent = this.currentModalQty;
  },

  buyModalProductNow() {
    if (!this.currentModalProduct) return;
    const pId = this.currentModalProduct.id;
    const vIdx = this.currentModalVariantIdx;
    const qty = this.currentModalQty;
    this.closeProductModal();
    this.buyNow(pId, vIdx, qty);
  },

  addModalProductToCart() {
    if (!this.currentModalProduct) return;
    this.addToCart(this.currentModalProduct.id, this.currentModalVariantIdx, this.currentModalQty, true);
    this.closeProductModal();
  },

  renderProductModal() {
    const container = document.getElementById('product-quickview-content');
    if (!container || !this.currentModalProduct) return;

    const p = this.currentModalProduct;
    const v = (p.variants && p.variants[this.currentModalVariantIdx]) || (p.variants && p.variants[0]) || { price: 950, regularPrice: 1150, size: 'রেগুলার' };
    const discount = v.regularPrice && v.regularPrice > v.price ? Math.round(((v.regularPrice - v.price) / v.regularPrice) * 100) : 0;
    const savings = v.regularPrice && v.regularPrice > v.price ? (v.regularPrice - v.price) : 0;

    // Relevant products
    const related = (this.products || []).filter(item => String(item.id) !== String(p.id)).slice(0, 4);

    let html = `
      <div class="modal-product-top">
        <div class="modal-img-col">
          <div class="modal-main-img-box">
            ${discount > 0 ? `<span class="modal-discount-badge">-${discount}%</span>` : ''}
            <img src="${p.image}" alt="${p.name}" id="modal-main-view-img">
          </div>
          ${p.gallery && p.gallery.length > 1 ? `
            <div class="modal-gallery-thumbs">
              ${p.gallery.map((g, idx) => `
                <img src="${g}" class="modal-thumb ${idx === 0 ? 'active' : ''}" onclick="document.getElementById('modal-main-view-img').src='${g}'; document.querySelectorAll('.modal-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" alt="thumb">
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="modal-info-col">
          <span class="modal-cat-tag">${p.categoryName || '১০০% খাঁটি ও প্রাকৃতিক'}</span>
          <h2 class="modal-prod-title">${p.name}</h2>
          <div class="modal-prod-rating">
            <span>★★★★★</span>
            <span style="color:#64748b; font-size:13px; font-weight:700;">${p.rating || 5.0} (${p.reviewCount || 100}+ কাস্টমার রিভিউ)</span>
          </div>

          <div class="modal-pricing-box">
            <span class="modal-current-price">৳${v.price}</span>
            ${v.regularPrice ? `<span class="modal-regular-price">৳${v.regularPrice}</span>` : ''}
            ${savings > 0 ? `<span class="modal-save-pill">৳${savings} সাশ্রয়</span>` : ''}
          </div>

          <label class="modal-section-label">প্যাকেজিং / সাইজ নির্বাচন করুন:</label>
          <div class="modal-variants-list">
            ${(p.variants || []).map((varItem, idx) => `
              <div class="modal-var-pill ${idx === this.currentModalVariantIdx ? 'active' : ''}" onclick="PremeStore.selectModalVariant(${idx})">
                <span>${varItem.size}</span>
                <b style="font-size:12.5px;">৳${varItem.price}</b>
              </div>
            `).join('')}
          </div>

          <label class="modal-section-label">পরিমাণ (Quantity):</label>
          <div class="modal-qty-actions">
            <div class="modal-qty-box">
              <button type="button" class="modal-qty-btn" onclick="PremeStore.updateModalQty(-1)">-</button>
              <span class="modal-qty-val" id="modal-qty-val">${this.currentModalQty}</span>
              <button type="button" class="modal-qty-btn" onclick="PremeStore.updateModalQty(1)">+</button>
            </div>
            <button type="button" class="btn-modal-buy-now" onclick="PremeStore.buyModalProductNow()">
              <span>⚡</span> এখনই অর্ডার করুন
            </button>
            <button type="button" class="btn-modal-add-cart" onclick="PremeStore.addModalProductToCart()">
              <span>🛒</span> কার্টে রাখুন
            </button>
          </div>

          <div style="display:flex; gap:12px; font-size:12px; color:#475569; font-weight:700; flex-wrap:wrap; padding-top:10px; border-top:1px dashed #e2ebe4;">
            <span>🛡️ ১০০% খাঁটি পণ্য নিশ্চয়তা</span>
            <span>🚚 সারা দেশে ক্যাশ অন ডেলিভারি</span>
            <span>📦 নিরাপদ সুরক্ষিত প্যাকেজিং</span>
          </div>
        </div>
      </div>

      <div class="modal-desc-box">
        <h4 class="modal-desc-title">পণ্যের বিবরণ:</h4>
        <p class="modal-desc-text">${p.description || 'প্রিমি ফার্মের প্রতিটি পণ্য সম্পূর্ণ নিজস্ব তত্ত্বাবধানে স্বাস্থ্যসম্মত উপায়ে প্রক্রিয়াজাত ও প্যাকেজিং করা হয়।'}</p>

        ${p.benefits && p.benefits.length > 0 ? `
          <h4 class="modal-desc-title" style="margin-top:14px;">স্বাস্থ্য উপকারিতা:</h4>
          <ul class="modal-benefits-list">
            ${p.benefits.map(b => `<li>${b}</li>`).join('')}
          </ul>
        ` : ''}

        ${p.ingredients ? `
          <h4 class="modal-desc-title" style="margin-top:14px;">উপাদানসমূহ:</h4>
          <p class="modal-desc-text" style="color:#334155; font-weight:600;">${p.ingredients}</p>
        ` : ''}
      </div>

      <!-- Relevant Products Section -->
      ${related.length > 0 ? `
        <div class="modal-relevant-section">
          <div class="modal-relevant-header">
            <h3>সংশ্লিষ্ট অন্যান্য পণ্য (Relevant Products)</h3>
            <span style="font-size:13px; color:#0d4d29; font-weight:700;">গ্রাহকরা এর সাথে আরও যা দেখছেন ➔</span>
          </div>
          <div class="modal-relevant-grid">
            ${related.map(rel => {
              const relVar = rel.variants[0];
              const relDisc = relVar.regularPrice && relVar.regularPrice > relVar.price ? Math.round(((relVar.regularPrice - relVar.price)/relVar.regularPrice)*100) : 0;
              return `
                <div class="modal-rel-card" onclick="PremeStore.openProductModal(${rel.id})">
                  <div style="position:relative;">
                    ${relDisc > 0 ? `<span style="position:absolute; top:4px; left:4px; background:#0d4d29; color:#fff; font-size:10px; font-weight:800; padding:2px 6px; border-radius:10px;">-${relDisc}%</span>` : ''}
                    <img src="${rel.image}" alt="${rel.name}">
                  </div>
                  <div class="modal-rel-title">${rel.name}</div>
                  <div class="modal-rel-price">৳${relVar.price}</div>
                  <button type="button" class="modal-rel-btn">অপশন দেখুন</button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
    `;

    container.innerHTML = html;
  }
};

// ================= GLOBAL HEADER SEARCH =================
function handleHeaderSearch(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('header-search-input');
  if (!input) return;
  const q = input.value.trim();
  if (q) {
    window.location.href = `/shop?search=${encodeURIComponent(q)}`;
  }
}

function onHeaderSearchInput(val) {
  const dropdown = document.getElementById('header-search-dropdown');
  if (!dropdown) return;
  const q = val.toLowerCase().trim();
  if (!q || !PremeStore.products || PremeStore.products.length === 0) {
    dropdown.classList.remove('active');
    dropdown.innerHTML = '';
    return;
  }

  const matches = PremeStore.products.filter(p => 
    p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
  );

  if (matches.length === 0) {
    dropdown.innerHTML = `<div style="padding: 12px 14px; font-size: 13.5px; color: #64748b;">কোনো পণ্য পাওয়া যায়নি</div>`;
    dropdown.classList.add('active');
    return;
  }

  dropdown.innerHTML = matches.slice(0, 5).map(p => {
    const v = p.variants?.[0] || { price: 950 };
    return `
      <a href="/shop?id=${p.id}" class="search-drop-item" style="display:flex; align-items:center; gap:12px; padding:10px 14px; border-bottom:1px solid #f1f5f9; text-decoration:none; color:#1e293b;">
        <img src="${p.image}" alt="${p.name}" style="width:38px; height:38px; object-fit:cover; border-radius:4px; border:1px solid #e2e8f0;">
        <div style="flex:1;">
          <b style="font-size:13.5px; display:block; color:#0f172a;">${p.name}</b>
          <span style="font-size:13px; color:#0d4d29; font-weight:800;">৳${v.price}</span>
        </div>
      </a>
    `;
  }).join('');
  dropdown.classList.add('active');
}

// ================= ANIMATED TYPEWRITER SEARCH PLACEHOLDER =================
function initSearchPlaceholderAnimation() {
  const inputs = document.querySelectorAll('#header-search-input, #shop-search-input, .drawer-search-input');
  if (!inputs.length) return;

  const suggestions = [
    'মধুময় কালো সোনা খুঁজুন...',
    'খাঁটি দানাদার গাওয়া ঘি খুঁজুন...',
    'সুন্দরবনের প্রাকৃতিক মধু খুঁজুন...',
    'ইলিশ মাছের স্পেশাল আচার...',
    'রোজেলা হারবাল চা খুঁজুন...',
    'সুপারফুড সীড মিক্স খুঁজুন...',
    'রসুনের খাঁটি সরিষার আচার...',
    'প্রাকৃতিক পুষ্টিকর ভেষজ পথ্য...'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingTimer = null;

  inputs.forEach(input => {
    input.addEventListener('focus', () => { 
      input._isFocused = true;
      input.setAttribute('placeholder', 'যেকোনো পণ্য লিখুন...');
    });

    input.addEventListener('blur', () => { 
      input._isFocused = false; 
    });
  });

  function typeLoop() {
    const currentPhrase = suggestions[phraseIdx];
    
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    const text = currentPhrase.substring(0, charIdx);
    inputs.forEach(input => {
      if (!input._isFocused && (!input.value || input.value.trim().length === 0)) {
        input.setAttribute('placeholder', text);
      }
    });

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === currentPhrase.length) {
      speed = 1800; // Hold at the end of phrase
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % suggestions.length;
      speed = 300; // Pause before typing next phrase
    }

    typingTimer = setTimeout(typeLoop, speed);
  }

  typeLoop();
}

function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  if (drawer && overlay) {
    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    } else {
      drawer.classList.add('active');
      overlay.classList.add('active');
    }
  }
}

function closeMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    PremeStore.closeProductModal();
    PremeStore.closeCartDrawer();
    closeMobileNav();
  }
});

document.addEventListener('click', (e) => {
  const searchWrap = document.querySelector('.header-search-wrap');
  const dropdown = document.getElementById('header-search-dropdown');
  if (dropdown && searchWrap && !searchWrap.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Ensure initialization runs both on DOMContentLoaded and immediately if already loaded
function bootStore() {
  PremeStore.init();
  initSearchPlaceholderAnimation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootStore);
} else {
  bootStore();
}


// ================= WHOLESALE POPUP MODAL HANDLERS =================
window.openWholesaleModal = function() {
  const modal = document.getElementById('wholesale-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closeWholesaleModal = function() {
  const modal = document.getElementById('wholesale-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.handleWholesaleSubmit = async function(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('ws-submit-btn');
  const statusMsg = document.getElementById('ws-status-msg');

  const name = document.getElementById('ws-name').value.trim();
  const businessName = document.getElementById('ws-business').value.trim();
  const phone = document.getElementById('ws-phone').value.trim();
  const address = document.getElementById('ws-address').value.trim();
  const quantity = document.getElementById('ws-quantity').value.trim();
  const note = document.getElementById('ws-note').value.trim();

  const checkedProds = Array.from(document.querySelectorAll('input[name="ws-prod"]:checked')).map(el => el.value);
  const products = checkedProds.join(', ');

  if (!name || !phone || !address) {
    alert('অনুগ্রহ করে নাম, মোবাইল নম্বর এবং ঠিকানা প্রদান করুন।');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'জমা হচ্ছে... ⏳';
  }

  try {
    const res = await fetch('/api/wholesale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, businessName, phone, address, products, quantity, note })
    });
    const data = await res.json();
    if (data.success) {
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.style.background = '#dcfce7';
        statusMsg.style.color = '#15803d';
        statusMsg.style.border = '1px solid #86efac';
        statusMsg.innerHTML = '🎉 ' + (data.message || 'আপনার হোলসেল আবেদনটি সফলভাবে জমা হয়েছে!');
      }
      document.getElementById('wholesale-form').reset();
      setTimeout(() => {
        window.closeWholesaleModal();
        if (statusMsg) statusMsg.style.display = 'none';
      }, 3000);
    } else {
      alert(data.message || 'আবেদন জমা দিতে সমস্যা হয়েছে।');
    }
  } catch (err) {
    alert('নেটওয়ার্ক সমস্যার কারণে আবেদন জমা দেওয়া সম্ভব হয়নি। আবার চেষ্টা করুন।');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>আবেদন জমা দিন</span> ➔';
    }
  }
};
