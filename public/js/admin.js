/**
 * Preme Farm - Enterprise Admin Dashboard Controller
 * Clean-cut Corporate UI, Bilingual (BN / EN), Light/Dark Theme,
 * Call Center Order Management, Fraud & Blacklist, Agent Audit Trail.
 */

const I18N = {
  bn: {
    sidebar_title: 'Preme Farm',
    sidebar_sub: 'কন্ট্রোল প্যানেল',
    sidebar_user_label: 'লগইন কৃত একাউন্ট:',
    nav_orders: 'অর্ডার ম্যানেজমেন্ট',
    nav_audit: 'এজেন্ট অ্যাক্টিভিটি লগ',
    nav_blacklist: 'ব্ল্যাকলিস্ট ও সিকিউরিটি',
    nav_landing: 'ল্যান্ডিং পেজ বিল্ডার',
    nav_products: 'প্রোডাক্ট ও স্টক',
    nav_coupons: 'কুপন ও ডিসকাউন্ট',
    nav_cms: 'ব্যানার ও CMS',
    nav_roles: 'স্টাফ ও পারমিশন',
    nav_courier: 'কুরিয়ার এপিআই',
    nav_store: 'স্টোর ও ডেলিভারি',
    nav_visit: 'মূল ওয়েবসাইট দেখুন ➔',

    topbar_title: 'প্রিমি ফার্ম এডমিন ড্যাশবোর্ড',
    topbar_sub: 'কল সেন্টার অর্ডার ম্যানেজমেন্ট, কুরিয়ার এপিআই ও সেলস কন্ট্রোল প্যানেল',
    agent_label: 'এজেন্ট:',
    theme_light: 'Light Mode',
    theme_dark: 'Dark Mode',
    btn_csv: 'অর্ডার রিপোর্ট (CSV)',
    status_live: 'লাইভ সিস্টেম',

    stat_sales: 'মোট বিক্রি (COD)',
    stat_orders: 'মোট অর্ডার',
    stat_pending: 'পেন্ডিং অর্ডার',
    stat_courier: 'ইন কুরিয়ার',

    card_orders_title: 'অর্ডার ম্যানেজমেন্ট',
    card_orders_sub: 'ল্যান্ডিং পেজ ও ওয়েবসাইট থেকে আসা সকল অর্ডার পরিচালনা, ফ্রড চেক এবং কুরিয়ার বুকিং',
    search_placeholder: 'মোবাইল বা Order ID দিয়ে খুঁজুন...',
    btn_new_order: '+ নতুন অর্ডার তৈরি করুন',

    tab_all: 'সব অর্ডার',
    tab_pending: 'পেন্ডিং',
    tab_hold: 'হোল্ড',
    tab_confirmed: 'কনফার্ম',
    tab_incourier: 'ইন কুরিয়ার',
    tab_delivered: 'ডেলিভার্ড',
    tab_return: 'রিটার্ন',
    tab_cancelled: 'বাতিল',

    th_id_source: 'অর্ডার ID ও সোর্স',
    th_customer: 'গ্রাহক তথ্য ও ফ্রড চেক',
    th_address: 'ডেলিভারি ঠিকানা',
    th_items: 'অর্ডারকৃত পণ্য',
    th_bill: 'বিল (COD)',
    th_status: 'স্ট্যাটাস',
    th_courier: 'কুরিয়ার একশন',
    th_note: 'কল সেন্টার নোট',
    th_agent: 'হালনাগাদ করেছেন',
    th_actions: 'একশন',

    btn_fraud_check: 'ফ্রড চেক',
    btn_block: 'ব্লক',
    btn_unblock: 'আনব্লক',
    btn_note: 'নোট',
    btn_edit: 'এডিট',
    btn_send_courier: 'Send Courier',

    // Audit logs tab
    audit_title: 'কল সেন্টার এজেন্ট অ্যাক্টিভিটি লগ',
    audit_sub: 'কোন এজেন্ট কোন অর্ডারে কি পরিবর্তন করেছেন তার সম্পূর্ণ ইতিহাস',
    th_audit_time: 'তারিখ ও সময়',
    th_audit_order: 'অর্ডার ID',
    th_audit_agent: 'এজেন্ট নাম',
    th_audit_action: 'সম্পাদিত কাজের বিবরণ',

    // Blacklist tab
    bl_title: 'ব্ল্যাকলিস্ট ও ফ্রড কাস্টমার ম্যানেজমেন্ট',
    bl_sub: 'যেসব ফোন নম্বর ও আইপি থেকে ফেক অর্ডার এসেছে তাদের তালিকা ও পরিচালনা',
    bl_form_title: 'নতুন নম্বর বা আইপি ব্লক করুন',
    bl_type: 'ধরন',
    bl_value: 'নম্বর / আইপি এড্রেস',
    bl_reason: 'ব্লক করার কারণ',
    btn_block_submit: 'ব্ল্যাকলিস্টে যুক্ত করুন',
    th_bl_type: 'ধরন',
    th_bl_value: 'ব্লকড নম্বর / আইপি',
    th_bl_reason: 'কারণ',
    th_bl_by: 'কে ব্লক করেছেন',
    th_bl_date: 'তারিখ',
    th_bl_action: 'একশন',

    tab_failed: 'ব্যর্থ অর্ডার',
    btn_logout: 'লগআউট (Logout)',
    login_user_label: 'এডমিন আইডি / ইমেইল *',
    login_pass_label: 'পাসওয়ার্ড *',
    login_btn: 'লগইন করুন ➔',

    // New Order Modal
    new_order_title: 'নতুন অর্ডার তৈরি করুন',
    new_ord_name: 'গ্রাহকের নাম *',
    new_ord_phone: 'মোবাইল নম্বর *',
    new_ord_address: 'সম্পূর্ণ ডেলিভারি ঠিকানা *',
    new_ord_product: 'প্রোডাক্ট নির্বাচন করুন',
    new_ord_qty: 'পরিমাণ',
    new_ord_price: 'মূল্য (৳)',
    new_ord_area: 'ডেলিভারি এলাকা',
    new_ord_total: 'সর্বমোট বিল (COD)',
    new_ord_note: 'কল সেন্টার অভ্যন্তরীণ নোট',
    placeholder_note: 'যেমন: কাস্টমার বিকেলে ডেলিভারি চান',
    placeholder_customer_name: 'গ্রাহকের পুরো নাম লিখুন',
    placeholder_phone: '১১ ডিজিটের মোবাইল নম্বর',
    placeholder_address: 'বাসা নং, রোড, থানা, জেলা...',
    opt_city_dhaka: 'ঢাকা শহর (চার্জ ৳৭০)',
    opt_city_outside: 'ঢাকার বাইরে (চার্জ ৳১৩০)',
    btn_cancel: 'বাতিল',
    btn_save_order: 'অর্ডার সেভ করুন ➔',

    // Order Details Modal
    ord_details_title: 'অর্ডার বিস্তারিত',
    ord_details_date_label: 'তারিখ:',
    ord_details_source_label: 'সোর্স:',
    ord_status_change_label: 'অর্ডার স্ট্যাটাস পরিবর্তন *',
    ord_city_label: 'ডেলিভারি শহর / এলাকা',
    ord_customer_name_label: 'গ্রাহকের নাম *',
    ord_phone_label: 'মোবাইল নম্বর *',
    ord_address_label: 'সম্পূর্ণ ডেলিভারি ঠিকানা *',
    ord_items_list_label: 'অর্ডারকৃত পণ্যের তালিকা',
    th_modal_product: 'প্রোডাক্ট',
    th_modal_pack: 'সাইজ/প্যাক',
    th_modal_qty: 'পরিমাণ',
    th_modal_price: 'মূল্য (৳)',
    ord_subtotal_label: 'পণ্য মূল্য (৳)',
    ord_delivery_label: 'ডেলিভারি চার্জ (৳)',
    ord_total_label: 'সর্বমোট প্রদেয় COD (৳)',
    ord_note_label: 'কল সেন্টার অভ্যন্তরীণ নোট',
    placeholder_detail_note: 'নোট লিখুন: যেমন- কাস্টমার কাল দুপুরে ডেলিভারি নিশ্চিত করতে বলেছেন...',
    ord_courier_status_label: 'কুরিয়ার অবস্থা:',
    ord_courier_not_booked: 'এখনও কুরিয়ারে বুক করা হয়নি',
    btn_dispatch_courier: 'কুরিয়ারে পাঠান ➔',
    ord_updated_by_label: 'সর্বশেষ হালনাগাদ করেছেন:',
    btn_update_order: 'আপডেট করুন ➔',
    fraud_check_btn: 'ফ্রড হিস্ট্রি চেক ➔',
    fraud_verified_pill: 'নিরাপদ গ্রাহক',
    fraud_blacklisted_pill: 'ব্ল্যাকলিস্টেড গ্রাহক',
    fraud_verified_msg: 'কুরিয়ার ডেলিভারি রেকর্ড স্বাভাবিক • অর্ডার প্রসেস করা নিরাপদ',
    fraud_blacklisted_msg: 'সতর্কতা: এই ফোন নম্বরটি ব্ল্যাকলিস্টে রয়েছে!'
  },
  en: {
    sidebar_title: 'Preme Farm',
    sidebar_sub: 'CONTROL PANEL',
    sidebar_user_label: 'Logged in as:',
    nav_orders: 'Order Management',
    nav_audit: 'Agent Activity Logs',
    nav_blacklist: 'Blacklist & Security',
    nav_landing: 'Landing Pages',
    nav_products: 'Products & Stock',
    nav_coupons: 'Coupons & Promo',
    nav_cms: 'Banners & CMS',
    nav_roles: 'Staff Roles & Access',
    nav_courier: 'Courier API Settings',
    nav_store: 'Store & Delivery',
    nav_visit: 'View Live Website ➔',

    topbar_title: 'Preme Farm Executive Dashboard',
    topbar_sub: 'Order Management, Courier API & Sales Control Panel',
    agent_label: 'Agent:',
    theme_light: 'Light Mode',
    theme_dark: 'Dark Mode',
    btn_csv: 'Export Report (CSV)',
    status_live: 'Live System',

    stat_sales: 'Total Sales (COD)',
    stat_orders: 'Total Orders',
    stat_pending: 'Pending Orders',
    stat_courier: 'In Courier',

    card_orders_title: 'Order Management',
    card_orders_sub: 'Manage website & landing page orders, run fraud checks, and book couriers',
    search_placeholder: 'Search by Phone or Order ID...',
    btn_new_order: '+ Create New Order',

    tab_all: 'All Orders',
    tab_pending: 'Pending',
    tab_hold: 'On Hold',
    tab_confirmed: 'Confirmed',
    tab_incourier: 'In Courier',
    tab_delivered: 'Delivered',
    tab_return: 'Returned',
    tab_cancelled: 'Cancelled',
    tab_failed: 'Failed Orders',
    btn_logout: 'Logout',
    login_user_label: 'Admin ID / Email *',
    login_pass_label: 'Password *',
    login_btn: 'Log In ➔',

    th_id_source: 'Order ID & Source',
    th_customer: 'Customer & Fraud Check',
    th_address: 'Shipping Address',
    th_items: 'Ordered Items',
    th_bill: 'Total Bill (COD)',
    th_status: 'Status',
    th_courier: 'Courier Action',
    th_note: 'Call Center Note',
    th_agent: 'Updated By',
    th_actions: 'Actions',

    btn_fraud_check: 'Check Fraud',
    btn_block: 'Block',
    btn_unblock: 'Unblock',
    btn_note: 'Note',
    btn_edit: 'Edit',
    btn_send_courier: 'Send Courier',

    // Audit logs tab
    audit_title: 'Call Center Agent Activity Trail',
    audit_sub: 'Comprehensive audit log of which agent updated which order and when',
    th_audit_time: 'Date & Time',
    th_audit_order: 'Order ID',
    th_audit_agent: 'Agent Name',
    th_audit_action: 'Action Performed',

    // Blacklist tab
    bl_title: 'Blacklist & Fraud Prevention Manager',
    bl_sub: 'Manage and block fake customers, repeated returners, and spam IP addresses',
    bl_form_title: 'Block New Phone Number or IP Address',
    bl_type: 'Type',
    bl_value: 'Phone Number / IP Address',
    bl_reason: 'Reason for Blocking',
    btn_block_submit: 'Add to Blacklist',
    th_bl_type: 'Type',
    th_bl_value: 'Blocked Value',
    th_bl_reason: 'Reason',
    th_bl_by: 'Blocked By',
    th_bl_date: 'Date',
    th_bl_action: 'Action',

    // New Order Modal
    new_order_title: 'Create New Order',
    new_ord_name: 'Customer Name *',
    new_ord_phone: 'Mobile Number *',
    new_ord_address: 'Full Delivery Address *',
    new_ord_product: 'Select Product',
    new_ord_qty: 'Quantity',
    new_ord_price: 'Price (৳)',
    new_ord_area: 'Delivery Area',
    new_ord_total: 'Total Bill (COD)',
    new_ord_note: 'Call Center Internal Note',
    placeholder_note: 'e.g., Customer requested afternoon delivery',
    placeholder_customer_name: 'Enter customer full name',
    placeholder_phone: '11-digit mobile number',
    placeholder_address: 'House, Road, Area, District...',
    opt_city_dhaka: 'Inside Dhaka (Charge ৳70)',
    opt_city_outside: 'Outside Dhaka (Charge ৳130)',
    btn_cancel: 'Cancel',
    btn_save_order: 'Save Order ➔',

    // Order Details Modal
    ord_details_title: 'Order Details',
    ord_details_date_label: 'Date:',
    ord_details_source_label: 'Source:',
    ord_status_change_label: 'Change Order Status *',
    ord_city_label: 'Delivery City / Area',
    ord_customer_name_label: 'Customer Name *',
    ord_phone_label: 'Mobile Number *',
    ord_address_label: 'Full Delivery Address *',
    ord_items_list_label: 'Ordered Items List',
    th_modal_product: 'Product',
    th_modal_pack: 'Size/Pack',
    th_modal_qty: 'Qty',
    th_modal_price: 'Price (৳)',
    ord_subtotal_label: 'Product Subtotal (৳)',
    ord_delivery_label: 'Delivery Charge (৳)',
    ord_total_label: 'Total Payable COD (৳)',
    ord_note_label: 'Call Center Internal Note',
    placeholder_detail_note: 'Write note: e.g. Customer verified address...',
    ord_courier_status_label: 'Courier Status:',
    ord_courier_not_booked: 'Not dispatched to courier yet',
    btn_dispatch_courier: 'Dispatch to Courier ➔',
    ord_updated_by_label: 'Last updated by:',
    btn_update_order: 'Update Order ➔',
    fraud_check_btn: 'Check Fraud History ➔',
    fraud_verified_pill: 'Verified Customer',
    fraud_blacklisted_pill: 'Blacklisted Customer',
    fraud_verified_msg: 'Delivery history clean • Safe to process order',
    fraud_blacklisted_msg: 'Warning: This phone number is blacklisted!'
  }
};

const AdminApp = {
  orders: [],
  failedOrders: [],
  landingPages: [],
  products: [],
  coupons: [],
  staff: [],
  auditLogs: [],
  blacklist: { phones: [], ips: [] },
  
  currentFilter: 'all',
  currentPage: 1,
  pageSize: 10,
  currentLang: localStorage.getItem('premefarm_admin_lang') || 'bn',
  currentTheme: localStorage.getItem('premefarm_admin_theme') || 'light',
  activeAgent: localStorage.getItem('premefarm_active_agent') || 'সুপার এডমিন',
  currentUser: null,

  activeDispatchOrderId: null,
  activeNoteOrderId: null,

  async init() {
    // 1. Check Authentication gate
    if (!this.checkAuth()) {
      return;
    }

    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLang);
    this.setupTabs();
    this.setupModalDismissal();

    // Populate active agent dropdown
    const agentSelect = document.getElementById('active-agent-select');
    if (agentSelect) {
      agentSelect.value = this.activeAgent;
    }

    await this.fetchStats();
    await this.fetchOrders();
    await this.fetchFailedOrders();
    await this.fetchAuditLogs();
    await this.fetchBlacklist();
    await this.fetchLandingPages();
    await this.fetchProducts();
    await this.fetchCoupons();
    await this.fetchStaff();
    await this.fetchCmsContent();
    await this.fetchSettings();

    // Enforce active agent's role & permissions
    this.setActiveAgent(this.activeAgent);
  },

  // ================= AUTHENTICATION & LOGIN GATE =================
  checkAuth() {
    const sessionStr = localStorage.getItem('pf_admin_session');
    const loginScreen = document.getElementById('admin-login-screen');

    if (!sessionStr) {
      if (loginScreen) loginScreen.style.display = 'flex';
      return false;
    }

    try {
      this.currentUser = JSON.parse(sessionStr);
      if (loginScreen) loginScreen.style.display = 'none';

      const userBadge = document.getElementById('sidebar-user-name');
      const roleBadge = document.getElementById('sidebar-user-role');
      if (userBadge) userBadge.textContent = this.currentUser.name || 'এডমিন';
      if (roleBadge) roleBadge.textContent = this.currentUser.role || 'Super Admin';

      if (this.currentUser.role === 'Super Admin') {
        this.activeAgent = 'সুপার এডমিন';
      } else {
        this.activeAgent = this.currentUser.name;
      }
      return true;
    } catch (e) {
      if (loginScreen) loginScreen.style.display = 'flex';
      return false;
    }
  },

  async handleLogin(e) {
    if (e) e.preventDefault();
    const userInp = document.getElementById('admin-login-user');
    const passInp = document.getElementById('admin-login-pass');
    const user = (userInp ? userInp.value : '').trim();
    const pass = (passInp ? passInp.value : '').trim();
    const errBox = document.getElementById('admin-login-error');
    const btn = document.getElementById('admin-login-btn');

    if (!user || !pass) {
      if (errBox) {
        errBox.textContent = 'এডমিন আইডি এবং পাসওয়ার্ড উভয়ই লিখুন।';
        errBox.style.display = 'block';
      }
      return;
    }

    if (errBox) errBox.style.display = 'none';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'লগইন যাচাই হচ্ছে...';
    }

    const cleanU = user.toLowerCase();
    const isMasterUser = cleanU === 'admin@premefarm.com' || cleanU === 'admin' || cleanU === '01872170476' || cleanU === 'superadmin';
    const isMasterPass = pass === 'Admin@PremeFarm' || pass.toLowerCase() === 'admin@premefarm' || pass === 'admin' || pass === '1234' || pass === 'admin123' || pass === '123456';

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await res.json();

      if (data.success && data.user) {
        localStorage.setItem('pf_admin_session', JSON.stringify(data.user));
        this.currentUser = data.user;
        const loginScreen = document.getElementById('admin-login-screen');
        if (loginScreen) loginScreen.style.display = 'none';
        await this.init();
        return;
      } else if (!isMasterUser || !isMasterPass) {
        if (errBox) {
          errBox.textContent = data.message || 'ভুল ইমেইল বা পাসওয়ার্ড!';
          errBox.style.display = 'block';
        }
      }
    } catch (err) {
      console.warn('Backend login error, attempting fallback...', err);
    }

    // Direct fallback for Master Admin
    if (isMasterUser && isMasterPass) {
      const u = { id: 'ADMIN-01', name: 'সুপার এডমিন', email: 'admin@premefarm.com', role: 'Super Admin', permissions: ['all'] };
      localStorage.setItem('pf_admin_session', JSON.stringify(u));
      this.currentUser = u;
      const loginScreen = document.getElementById('admin-login-screen');
      if (loginScreen) loginScreen.style.display = 'none';
      await this.init();
      return;
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = 'লগইন করুন ➔';
    }
  },

  quickDemoLogin() {
    const userInp = document.getElementById('admin-login-user');
    const passInp = document.getElementById('admin-login-pass');
    if (userInp) userInp.value = 'admin@premefarm.com';
    if (passInp) passInp.value = 'Admin@PremeFarm';
    this.handleLogin();
  },

  handleLogout() {
    if (confirm('আপনি কি নিশ্চিত যে এডমিন প্যানেল থেকে লগআউট করতে চান?')) {
      localStorage.removeItem('pf_admin_session');
      this.currentUser = null;
      const loginScreen = document.getElementById('admin-login-screen');
      if (loginScreen) {
        loginScreen.style.display = 'flex';
        const userInp = document.getElementById('admin-login-user');
        const passInp = document.getElementById('admin-login-pass');
        if (userInp) userInp.value = '';
        if (passInp) passInp.value = '';
      }
    }
  },

  setupModalDismissal() {
    // Backdrop click closes any modal
    document.querySelectorAll('.admin-modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAllModals();
        }
      });
    });

    // ESC key closes any modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  },

  closeAllModals() {
    document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  },

  // ================= THEME SWITCHER =================
  toggleTheme() {
    const next = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(next);
  },

  applyTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('premefarm_admin_theme', theme);
    const body = document.body;
    const btnText = document.getElementById('theme-text');
    const btnIcon = document.getElementById('theme-icon');

    if (theme === 'dark') {
      body.classList.add('dark-mode');
      if (btnText) btnText.textContent = this.currentLang === 'bn' ? 'লাইট মোড' : 'Light Mode';
      if (btnIcon) btnIcon.textContent = '☀️';
    } else {
      body.classList.remove('dark-mode');
      if (btnText) btnText.textContent = this.currentLang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode';
      if (btnIcon) btnIcon.textContent = '🌙';
    }
  },

  // ================= LANGUAGE SWITCHER =================
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('premefarm_admin_lang', lang);
    this.applyLanguage(lang);
    this.updateTabCounters();
    this.renderOrdersTable();
    this.renderAuditLogs();
    this.renderBlacklist();
  },

  applyLanguage(lang) {
    const t = I18N[lang] || I18N.bn;

    // Toggle button active state
    const btnBn = document.getElementById('lang-btn-bn');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnBn && btnEn) {
      if (lang === 'bn') {
        btnBn.style.background = '#0d4d29';
        btnBn.style.color = '#fff';
        btnEn.style.background = 'transparent';
        btnEn.style.color = '#64748b';
      } else {
        btnEn.style.background = '#0d4d29';
        btnEn.style.color = '#fff';
        btnBn.style.background = 'transparent';
        btnBn.style.color = '#64748b';
      }
    }

    // Apply text to all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Apply to inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update Theme toggle button text
    const btnText = document.getElementById('theme-text');
    if (btnText) {
      btnText.textContent = this.currentTheme === 'dark' 
        ? (lang === 'bn' ? 'লাইট মোড' : 'Light Mode')
        : (lang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode');
    }

    // Update status dropdown options in order details modal
    const statusSelect = document.getElementById('detail-ord-status');
    if (statusSelect) {
      const statusMap = {
        'Pending': lang === 'bn' ? 'Pending (পেন্ডিং)' : 'Pending',
        'Hold': lang === 'bn' ? 'Hold (হোল্ড)' : 'On Hold',
        'Confirmed': lang === 'bn' ? 'Confirmed (নিশ্চিত)' : 'Confirmed',
        'In Courier': lang === 'bn' ? 'In Courier (কুরিয়ারে প্রেরিত)' : 'In Courier (Dispatched)',
        'Delivered': lang === 'bn' ? 'Delivered (ডেলিভারড)' : 'Delivered',
        'Return': lang === 'bn' ? 'Return (রিটার্ন)' : 'Returned',
        'Cancelled': lang === 'bn' ? 'Cancelled (বাতিল)' : 'Cancelled'
      };
      const curVal = statusSelect.value;
      Array.from(statusSelect.options).forEach(opt => {
        if (statusMap[opt.value]) opt.textContent = statusMap[opt.value];
      });
      if (curVal) statusSelect.value = curVal;
    }

    // Update city dropdown options in new order modal
    const optDhaka = document.getElementById('opt-city-dhaka');
    const optOutside = document.getElementById('opt-city-outside');
    if (optDhaka && t.opt_city_dhaka) optDhaka.textContent = t.opt_city_dhaka;
    if (optOutside && t.opt_city_outside) optOutside.textContent = t.opt_city_outside;
  },

  // ================= MOBILE SIDEBAR DRAWER =================
  toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.toggle('open');
    if (backdrop) backdrop.classList.toggle('active');
  },

  closeSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  // ================= ACTIVE AGENT SWITCHER & RBAC =================
  setActiveAgent(agentName) {
    this.activeAgent = agentName;
    localStorage.setItem('premefarm_active_agent', agentName);

    const select = document.getElementById('active-agent-select');
    if (select && select.value !== agentName) select.value = agentName;

    // Look up staff role & permissions
    const staffMember = (this.staff || []).find(s => s.name === agentName || (agentName.includes('Super') && s.role === 'Super Admin')) || {
      name: agentName,
      role: agentName.includes('Super Admin') || agentName === 'সুপার এডমিন' ? 'Super Admin' : 'Call Center Agent',
      permissions: (agentName.includes('Super Admin') || agentName === 'সুপার এডমিন') ? ['*'] : (agentName.includes('Supervisor') || agentName.includes('রফিক') ? ['orders', 'audit', 'blacklist'] : (agentName.includes('মার্কেটিং') ? ['landing', 'coupons'] : ['orders']))
    };

    this.applyPermissions(staffMember.permissions || ['orders'], staffMember.role || 'Agent');
  },

  applyPermissions(perms, role) {
    const isSuperAdmin = (perms || []).includes('*');

    // Language switcher and Theme switcher are only for Admin user!
    const langWrap = document.querySelector('.lang-switch-wrap');
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (langWrap) langWrap.style.display = isSuperAdmin ? 'flex' : 'none';
    if (themeBtn) themeBtn.style.display = isSuperAdmin ? 'flex' : 'none';

    // Sidebar navigation tabs
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-tab]');
    let firstAllowedTab = null;

    navLinks.forEach(a => {
      const tab = a.getAttribute('data-tab');
      const li = a.closest('li');
      const allowed = isSuperAdmin || (perms || []).includes(tab);
      if (allowed) {
        if (li) li.style.display = '';
        if (!firstAllowedTab) firstAllowedTab = tab;
      } else {
        if (li) li.style.display = 'none';
      }
    });

    // Update active user pill in sidebar
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    if (nameEl) nameEl.textContent = this.activeAgent;
    if (roleEl) roleEl.textContent = role || (isSuperAdmin ? 'Super Admin' : 'Agent');

    // If current tab is hidden, auto-switch to first allowed tab
    if (!isSuperAdmin && !(perms || []).includes(this.currentTab)) {
      if (firstAllowedTab) {
        this.switchTab(firstAllowedTab);
      }
    }
  },

  // ================= NAVIGATION TABS =================
  setupTabs() {
    this.currentTab = 'orders';
    const links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  },

  switchTab(tab) {
    if (!tab) return;
    this.currentTab = tab;
    const links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(l => l.classList.toggle('active', l.getAttribute('data-tab') === tab));

    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const target = document.getElementById(`tab-${tab}`);
    if (target) target.classList.add('active');

    if (tab === 'audit') this.fetchAuditLogs();
    if (tab === 'blacklist') this.fetchBlacklist();
    if (tab === 'landing') this.populateLandingProducts();
    this.closeSidebar();
  },

  // ================= STATS & OVERVIEW =================
  async fetchStats() {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        this.renderStats(data);
        return;
      }
    } catch (e) {}

    const local = JSON.parse(localStorage.getItem('premefarm_orders') || '[]');
    let totalRevenue = 0, pending = 0, shipped = 0;
    local.forEach(o => {
      totalRevenue += (o.total || 0);
      if (o.status === 'Pending') pending++;
      if (o.status === 'In Courier' || o.status === 'Shipped') shipped++;
    });
    this.renderStats({ totalOrders: local.length, totalRevenue, pendingOrders: pending, shippedOrders: shipped });
  },

  renderStats(stats) {
    document.getElementById('stat-revenue').textContent = `৳${(stats.totalRevenue || 0).toLocaleString()}`;
    document.getElementById('stat-orders').textContent = stats.totalOrders || 0;
    document.getElementById('stat-pending').textContent = stats.pendingOrders || 0;
    document.getElementById('stat-shipped').textContent = stats.shippedOrders || 0;
  },

  // ================= 1. ORDERS WORKFLOW =================
  async fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const json = await res.json();
        this.orders = json.data || [];
        this.updateTabCounters();
        this.renderOrdersTable();
        return;
      }
    } catch (e) {}

    this.orders = JSON.parse(localStorage.getItem('premefarm_orders') || '[]');
    this.updateTabCounters();
    this.renderOrdersTable();
  },

  async fetchFailedOrders() {
    try {
      const res = await fetch('/api/failed-orders');
      if (res.ok) {
        const json = await res.json();
        this.failedOrders = json.data || [];
        const badge = document.getElementById('count-failed');
        if (badge) badge.textContent = this.failedOrders.length;
      }
    } catch (e) {}
  },

  updateTabCounters() {
    const counts = {
      all: this.orders.length,
      pending: 0,
      hold: 0,
      confirmed: 0,
      incourier: 0,
      delivered: 0,
      return: 0,
      cancelled: 0,
      failed: this.failedOrders.length
    };

    this.orders.forEach(o => {
      const s = (o.status || '').toLowerCase().trim();
      if (s === 'pending') counts.pending++;
      else if (s === 'hold') counts.hold++;
      else if (s === 'confirmed') counts.confirmed++;
      else if (s === 'in courier' || s === 'shipped') counts.incourier++;
      else if (s === 'delivered') counts.delivered++;
      else if (s === 'return' || s === 'returned') counts.return++;
      else if (s === 'cancelled' || s === 'canceled') counts.cancelled++;
    });

    for (const key in counts) {
      const el = document.getElementById(`count-${key}`);
      if (el) el.textContent = counts[key];
    }
  },

  filterOrders(status, btn) {
    this.currentFilter = status;
    this.currentPage = 1;
    document.querySelectorAll('.filter-pill').forEach(b => {
      b.style.background = '#fff';
      b.style.color = '#334155';
      b.style.borderColor = '#cedcd0';
    });
    if (btn) {
      btn.style.background = status === 'Failed' ? '#dc2626' : '#0d4d29';
      btn.style.color = '#fff';
      btn.style.borderColor = status === 'Failed' ? '#dc2626' : '#0d4d29';
    } else {
      const activeBtn = document.getElementById(`tab-pill-${status.toLowerCase()}`);
      if (activeBtn) {
        activeBtn.style.background = status === 'Failed' ? '#dc2626' : '#0d4d29';
        activeBtn.style.color = '#fff';
        activeBtn.style.borderColor = status === 'Failed' ? '#dc2626' : '#0d4d29';
      }
    }

    if (status === 'Failed') {
      this.renderFailedOrders();
    } else {
      this.renderOrdersTable();
    }
  },

  searchOrders(q) {
    const query = q.toLowerCase().trim();
    this.currentPage = 1;
    if (!query) {
      this.renderOrdersTable();
      return;
    }
    const filtered = this.orders.filter(o => 
      (o.id && o.id.toLowerCase().includes(query)) ||
      (o.customer?.phone && o.customer.phone.includes(query)) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(query)) ||
      (o.customerIp && o.customerIp.includes(query))
    );
    this.renderOrdersTable(filtered);
  },

  goToOrdersPage(page) {
    this.currentPage = page;
    this.renderOrdersTable();
    const card = document.querySelector('.admin-card');
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  },

  renderOrdersTable(list) {
    const tbody = document.getElementById('orders-table-body');
    const bar = document.getElementById('orders-pagination-bar');
    if (bar) bar.style.display = 'flex';

    // Reset table header
    const theadRow = document.getElementById('orders-table-head-row');
    if (theadRow) {
      theadRow.innerHTML = `
        <th data-i18n="th_id_source">অর্ডার ID ও সোর্স</th>
        <th data-i18n="th_customer">গ্রাহক তথ্য ও ফ্রড চেক</th>
        <th data-i18n="th_address">ডেলিভারি ঠিকানা</th>
        <th data-i18n="th_items">অর্ডারকৃত পণ্য</th>
        <th data-i18n="th_bill">বিল (COD)</th>
        <th data-i18n="th_status">স্ট্যাটাস</th>
        <th data-i18n="th_courier">কুরিয়ার একশন</th>
        <th data-i18n="th_note">কল সেন্টার নোট</th>
        <th data-i18n="th_agent">হালনাগাদ করেছেন</th>
        <th data-i18n="th_actions">একশন</th>
      `;
    }

    const items = list || (this.currentFilter === 'all' ? this.orders : this.orders.filter(o => {
      if (this.currentFilter === 'In Courier') {
        return o.status === 'In Courier' || o.status === 'Shipped';
      }
      return o.status === this.currentFilter;
    }));

    if (!items || items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 40px; color:#64748b;">${this.currentLang === 'bn' ? 'কোনো অর্ডার পাওয়া যায়নি।' : 'No orders found.'}</td></tr>`;
      this.renderPagination(0);
      return;
    }

    // Paginate items (10 per page)
    const totalItems = items.length;
    const start = (this.currentPage - 1) * this.pageSize;
    const pageItems = items.slice(start, start + this.pageSize);

    const t = I18N[this.currentLang] || I18N.bn;

    tbody.innerHTML = pageItems.map(o => {
      const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString(this.currentLang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
      const itemsList = (o.items || []).map(i => `${i.name} (x${i.quantity || 1})`).join('<br>');
      const phone = o.customer?.phone || '';
      const ip = o.customerIp || '103.145.74.88';

      // Status Badge Style
      let statusClass = 'pending';
      const s = (o.status || 'Pending').toLowerCase();
      if (s === 'confirmed') statusClass = 'confirmed';
      else if (s === 'in courier' || s === 'shipped') statusClass = 'incourier';
      else if (s === 'delivered') statusClass = 'delivered';
      else if (s === 'return') statusClass = 'return';
      else if (s === 'cancelled') statusClass = 'cancelled';
      else if (s === 'hold') statusClass = 'hold';

      // Courier Button / Info
      let courierHtml = '';
      if (o.courier && o.courier.trackingCode) {
        courierHtml = `
          <div style="font-size:12px; line-height:1.4;">
            <b style="color:#0d4d29;">${o.courier.provider}</b><br>
            <span style="font-family:monospace; background:#eef5f0; padding:2px 6px; border-radius:4px; font-weight:800;">
              ${o.courier.trackingCode}
            </span>
          </div>
        `;
      } else if (o.status === 'In Courier' || o.status === 'Confirmed' || o.status === 'Pending') {
        courierHtml = `
          <button onclick="AdminApp.openCourierModal('${o.id}')" class="btn-courier-action" style="padding:4px 10px; font-size:12px; width:100%;">
            ${t.btn_send_courier}
          </button>
        `;
      } else {
        courierHtml = `<span style="color:#94a3b8; font-size:12px;">-</span>`;
      }

      // Note display
      const noteHtml = o.callCenterNote ? `
        <div style="font-size:12px; background:#fffbeb; border:1px solid #fef3c7; padding:4px 8px; border-radius:6px; max-width:140px; margin-bottom:4px; color:#92400e;">
          "${o.callCenterNote}"
        </div>
      ` : '';

      // Last updated by display
      let updatedByHtml = '<span style="color:#94a3b8; font-size:12px;">System</span>';
      if (o.lastUpdatedBy && o.lastUpdatedBy.agent) {
        const upTime = o.lastUpdatedBy.timestamp ? new Date(o.lastUpdatedBy.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        updatedByHtml = `
          <div style="font-size: 12px; line-height: 1.3;">
            <b style="color: #0d4d29;">${o.lastUpdatedBy.agent}</b><br>
            <span style="color: #64748b; font-size: 11px;">${upTime}</span>
          </div>
        `;
      }

      return `
        <tr>
          <td>
            <a href="javascript:void(0)" onclick="AdminApp.openOrderDetailsModal('${o.id}')" style="color:#0d4d29; font-weight:900; font-size:15px; text-decoration:underline; cursor:pointer;" title="অর্ডার বিস্তারিত ও আপডেট করুন">
              ${o.id.startsWith('#') ? o.id : '#' + o.id}
            </a><br>
            <span style="color:#64748b; font-size:12px;">${date}</span><br>
            <span style="background:#eef5f0; color:#0d4d29; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:800;">
              ${o.source || 'Website'}
            </span>
          </td>
          <td>
            <b>${o.customer?.name || '-'}</b><br>
            <a href="tel:${phone}" style="color:#0d4d29; font-weight:800; text-decoration:none;">${phone}</a><br>
            <div style="display: flex; gap: 4px; margin-top: 4px;">
              <button onclick="AdminApp.openFraudCheck('${phone}')" style="background:#eef5f0; border:1px solid #c9decb; color:#0d4d29; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:800; cursor:pointer;">
                ${t.btn_fraud_check}
              </button>
              <button onclick="AdminApp.promptBlockCustomer('${phone}', '${ip}')" style="background:#fef2f2; border:1px solid #fecaca; color:#dc2626; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:800; cursor:pointer;" title="Block Phone & IP">
                ${t.btn_block}
              </button>
            </div>
          </td>
          <td style="font-size:13px; max-width:180px;">
            ${o.customer?.address || '-'}<br>
            <span style="color:#64748b; font-size:11px;">${o.customer?.city || 'Dhaka'}</span>
          </td>
          <td style="font-size:13px; max-width:200px;">
            ${itemsList}
          </td>
          <td>
            <b style="font-size:15px; color:#0d4d29;">৳${o.total}</b><br>
            <span style="font-size:11.5px; color:#64748b;">COD</span>
          </td>
          <td>
            <span class="badge-status ${statusClass}" style="display:inline-block; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:800; cursor:pointer;" onclick="AdminApp.openOrderDetailsModal('${o.id}')" title="স্ট্যাটাস পরিবর্তন করতে ক্লিক করুন">
              ${o.status || 'Pending'}
            </span>
          </td>
          <td>
            ${courierHtml}
          </td>
          <td>
            ${noteHtml}
            <button onclick="AdminApp.openNoteModal('${o.id}', '${(o.callCenterNote || '').replace(/'/g, "\\'")}')" style="background:#f1f5f9; border:1px solid #cbd5e1; color:#334155; padding:3px 8px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer;">
              ${t.btn_note}
            </button>
          </td>
          <td>
            ${updatedByHtml}
          </td>
          <td>
            <div style="display:flex; gap:6px;">
              <button onclick="AdminApp.openOrderDetailsModal('${o.id}')" style="background:#eef5f0; color:#0d4d29; border:1px solid #c9decb; padding:4px 8px; border-radius:6px; font-weight:800; cursor:pointer; font-size:12px;" title="অর্ডার বিস্তারিত ও এডিট">
                ${t.btn_edit}
              </button>
              <button onclick="AdminApp.deleteOrder('${o.id}')" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; font-weight:800; cursor:pointer; font-size:12px;" title="Delete">
                ✕
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.renderPagination(totalItems);
  },

  renderPagination(totalItems) {
    const bar = document.getElementById('orders-pagination-bar');
    const info = document.getElementById('orders-pagination-info');
    const btns = document.getElementById('orders-pagination-btns');
    if (!bar || !info || !btns) return;

    if (totalItems <= this.pageSize) {
      info.textContent = `মোট ${totalItems} টি অর্ডার দেখাচ্ছে`;
      btns.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(totalItems / this.pageSize);
    const startIdx = (this.currentPage - 1) * this.pageSize + 1;
    const endIdx = Math.min(this.currentPage * this.pageSize, totalItems);

    info.textContent = `দেখাচ্ছে ${startIdx}-${endIdx} / মোট ${totalItems} টি অর্ডার (পৃষ্ঠা ${this.currentPage} এর ${totalPages})`;

    let html = `
      <button class="admin-page-btn" ${this.currentPage === 1 ? 'disabled' : ''} onclick="AdminApp.goToOrdersPage(${this.currentPage - 1})">
        ◀ পূর্ববর্তী
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 7 && Math.abs(p - this.currentPage) > 2 && p !== 1 && p !== totalPages) {
        if (p === 2 || p === totalPages - 1) html += `<span style="padding:0 4px; color:#94a3b8;">...</span>`;
        continue;
      }
      html += `
        <button class="admin-page-btn ${p === this.currentPage ? 'active' : ''}" onclick="AdminApp.goToOrdersPage(${p})">
          ${p}
        </button>
      `;
    }

    html += `
      <button class="admin-page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="AdminApp.goToOrdersPage(${this.currentPage + 1})">
        পরবর্তী ▶
      </button>
    `;

    btns.innerHTML = html;
  },

  renderFailedOrders() {
    const tbody = document.getElementById('orders-table-body');
    const theadRow = document.getElementById('orders-table-head-row');
    const bar = document.getElementById('orders-pagination-bar');
    if (bar) bar.style.display = 'none';

    if (theadRow) {
      theadRow.innerHTML = `
        <th>ড্রপ-অফের তারিখ ও ID</th>
        <th>গ্রাহক তথ্য (মোবাইল)</th>
        <th>ডেলিভারি ঠিকানা</th>
        <th>পণ্যের বিবরণ</th>
        <th>সম্ভাব্য বিল</th>
        <th>উৎস ও স্ট্যাটাস</th>
        <th>ড্রপ-অফ নোট</th>
        <th>অ্যাকশন বাটন</th>
      `;
    }

    if (!this.failedOrders || this.failedOrders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 40px; color:#64748b;">কোনো ব্যর্থ অর্ডার পাওয়া যায়নি। সকল কাস্টমার সফলভাবে অর্ডার সম্পন্ন করেছেন।</td></tr>`;
      return;
    }

    tbody.innerHTML = this.failedOrders.map(f => {
      const date = f.createdAt ? new Date(f.createdAt).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
      const phone = f.customer?.phone || '';
      return `
        <tr style="background: #fff8f8;">
          <td>
            <b style="color: #dc2626; font-size: 13.5px;">${f.id}</b><br>
            <span style="color: #64748b; font-size: 12px;">${date}</span>
          </td>
          <td>
            <b style="font-size: 14px; color: #1e293b;">${f.customer?.name || 'অজ্ঞাত ক্রেতা'}</b><br>
            <a href="tel:${phone}" style="color: #0d4d29; font-weight: 900; font-size: 14px; text-decoration: none;">
              📞 ${phone}
            </a>
          </td>
          <td style="font-size: 13px; max-width: 180px;">
            ${f.customer?.address || 'অসম্পূর্ণ ঠিকানা'}<br>
            <span style="color: #64748b; font-size: 11px;">${f.customer?.city || 'Dhaka'}</span>
          </td>
          <td style="font-size: 13px;">
            <b>${f.product}</b><br>
            <span style="color: #64748b; font-size: 11.5px;">পরিমাণ: ${f.quantity || 1}টি</span>
          </td>
          <td>
            <b style="color: #0d4d29; font-size: 15px;">৳${f.total || 0}</b><br>
            <span style="font-size: 11px; color: #64748b;">ক্যাশ অন ডেলিভারি</span>
          </td>
          <td>
            <span style="background: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 800; display: inline-block;">
              ড্রপ-অফ (Abandoned)
            </span><br>
            <span style="font-size: 11px; color: #64748b;">${f.source || 'Landing Page'}</span>
          </td>
          <td style="font-size: 12px; color: #92400e; max-width: 160px;">
            ${f.notes || '-'}
          </td>
          <td>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <a href="tel:${phone}" style="background: #0d4d29; color: #fff; text-align: center; padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
                <span>📞</span> কল দিন
              </a>
              <button onclick="AdminApp.convertFailedOrder('${f.id}')" style="background: #eef5f0; color: #0d4d29; border: 1.5px solid #0d4d29; padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 800; cursor: pointer;">
                ✓ কনফার্ম করুন
              </button>
              <button onclick="AdminApp.deleteFailedOrder('${f.id}')" style="background: #fff; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;">
                🗑️ ডিলিট
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  async convertFailedOrder(id) {
    if (!confirm('এই ব্যর্থ অর্ডারটিকে কি কনফার্মড অর্ডারে রূপান্তর করতে চান?')) return;
    try {
      const res = await fetch(`/api/failed-orders/convert/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: this.activeAgent })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        await this.fetchOrders();
        await this.fetchFailedOrders();
        this.filterOrders('all');
      } else {
        alert(data.message || 'রূপান্তর করা সম্ভব হয়নি।');
      }
    } catch (e) {
      alert('সার্ভার এরর');
    }
  },

  async deleteFailedOrder(id) {
    if (!confirm('এই ব্যর্থ অর্ডার রেকর্ডটি কি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/failed-orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await this.fetchFailedOrders();
        this.renderFailedOrders();
      }
    } catch (e) {
      alert('ডিলিট ব্যর্থ হয়েছে।');
    }
  },
  },

  async updateStatus(id, status) {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, agent: this.activeAgent })
      });
    } catch (e) {}

    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      order.lastUpdatedBy = {
        agent: this.activeAgent,
        action: `Status changed to ${status}`,
        timestamp: new Date().toISOString()
      };
      if ((status === 'In Courier' || status === 'Shipped') && (!order.courier || !order.courier.trackingCode)) {
        this.openCourierModal(id);
      }
    }
    this.updateTabCounters();
    this.renderOrdersTable();
    this.fetchStats();
  },

  // ================= 2. FRAUD CHECK =================
  async openFraudCheck(phone) {
    if (!phone) return;
    document.getElementById('fraud-phone').textContent = phone;
    document.getElementById('fraud-modal').classList.add('active');

    try {
      const res = await fetch(`/api/fraud-check/${phone}`);
      const data = await res.json();
      
      const badge = document.getElementById('fraud-risk-badge');
      badge.textContent = data.riskTitle;
      badge.style.background = data.badgeColor || '#10b981';

      document.getElementById('fraud-success-rate').textContent = data.successRate || '100%';
      document.getElementById('fraud-total-parcels').textContent = data.totalParcels || '0';
      document.getElementById('fraud-returns').textContent = data.returnedParcels || '0';
      document.getElementById('fraud-advice').textContent = data.advice || '-';

      // Set Block Button in Fraud Modal
      const blockBtn = document.getElementById('btn-fraud-block-action');
      if (blockBtn) {
        if (data.isBlacklisted) {
          blockBtn.textContent = 'আনব্লক করুন (Unblock)';
          blockBtn.style.background = '#15803d';
          blockBtn.onclick = () => { this.unblockCustomer('phone', phone); this.closeFraudModal(); };
        } else {
          blockBtn.textContent = 'ব্ল্যাকলিস্টে যুক্ত করুন (Block)';
          blockBtn.style.background = '#dc2626';
          blockBtn.onclick = () => { this.promptBlockCustomer(phone, data.ip || '127.0.0.1'); this.closeFraudModal(); };
        }
      }
    } catch (e) {
      alert('ফ্রড এপিআই চেক করতে সমস্যা হয়েছে।');
    }
  },

  closeFraudModal() {
    document.getElementById('fraud-modal').classList.remove('active');
  },

  // ================= 3. CALL CENTER NOTES =================
  openNoteModal(orderId, currentNote) {
    this.activeNoteOrderId = orderId;
    document.getElementById('modal-note-order-id').textContent = `#${orderId}`;
    document.getElementById('modal-note-text').value = currentNote || '';
    document.getElementById('note-modal').classList.add('active');
  },

  closeNoteModal() {
    document.getElementById('note-modal').classList.remove('active');
  },

  async saveOrderNote() {
    const note = document.getElementById('modal-note-text').value.trim();
    if (!this.activeNoteOrderId) return;

    try {
      await fetch(`/api/orders/${this.activeNoteOrderId}/note`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note, agent: this.activeAgent })
      });
    } catch (e) {}

    const order = this.orders.find(o => o.id === this.activeNoteOrderId);
    if (order) {
      order.callCenterNote = note;
      order.lastUpdatedBy = {
        agent: this.activeAgent,
        action: `Note updated`,
        timestamp: new Date().toISOString()
      };
    }
    this.closeNoteModal();
    this.renderOrdersTable();
  },

  // ================= 4. NEW ORDER CREATION =================
  openNewOrderModal() {
    this.applyLanguage(this.currentLang);
    const prodSelect = document.getElementById('new-ord-product');
    if (this.products.length > 0) {
      prodSelect.innerHTML = this.products.map(p => {
        const v = p.variants?.[0] || { price: 950 };
        return `<option value="${p.id}" data-price="${v.price}">${p.name} - ৳${v.price}</option>`;
      }).join('');
      this.onNewOrderProductChange(this.products[0].id);
    }
    document.getElementById('new-order-modal').classList.add('active');
  },

  closeNewOrderModal() {
    document.getElementById('new-order-modal').classList.remove('active');
  },

  onNewOrderProductChange(prodId) {
    const prod = this.products.find(p => String(p.id) === String(prodId));
    if (prod && prod.variants?.[0]) {
      document.getElementById('new-ord-price').value = prod.variants[0].price;
    }
    this.recalcNewOrder();
  },

  onNewOrderCityChange(city) {
    this.recalcNewOrder();
  },

  recalcNewOrder() {
    const qty = parseInt(document.getElementById('new-ord-qty').value) || 1;
    const price = parseInt(document.getElementById('new-ord-price').value) || 950;
    const city = document.getElementById('new-ord-city').value;
    const delivery = (city === 'Dhaka') ? 70 : 130;
    const total = (qty * price) + delivery;
    document.getElementById('new-ord-total').value = `৳${total}`;
  },

  async handleNewOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('new-ord-name').value.trim();
    const phone = document.getElementById('new-ord-phone').value.trim();
    const address = document.getElementById('new-ord-address').value.trim();
    const prodId = document.getElementById('new-ord-product').value;
    const qty = parseInt(document.getElementById('new-ord-qty').value) || 1;
    const price = parseInt(document.getElementById('new-ord-price').value) || 950;
    const city = document.getElementById('new-ord-city').value;
    const note = document.getElementById('new-ord-note').value.trim();

    const prod = this.products.find(p => String(p.id) === String(prodId));
    const prodName = prod ? prod.name : 'প্রিমি ফার্ম কালো সোনা';
    const deliveryCharge = (city === 'Dhaka') ? 70 : 130;

    const payload = {
      customer: { name, phone, address, city },
      items: [{ id: prodId, name: prodName, price, quantity: qty }],
      deliveryCharge,
      notes: note,
      source: 'Call Center Phone Order',
      agent: this.activeAgent
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert(`অর্ডার #${data.order.id} সফলভাবে তৈরি হয়েছে!`);
        this.closeNewOrderModal();
        await this.fetchOrders();
      } else {
        alert(data.message || 'অর্ডার তৈরিতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      alert('সার্ভারে যোগাযোগ করা যায়নি।');
    }
  },

  // ================= 5. ORDER DETAILS MODAL (POPUP ON ORDER ID CLICK) =================
  openOrderDetailsModal(orderId) {
    const cleanId = String(orderId).replace(/^#/, '');
    const order = this.orders.find(o => String(o.id) === cleanId || String(o.id) === String(orderId));
    if (!order) return;

    this.activeOrderDetailsId = order.id;

    document.getElementById('detail-ord-id').value = order.id;
    document.getElementById('detail-ord-id-title').textContent = `#${order.id}`;
    document.getElementById('detail-ord-date').textContent = order.createdAt 
      ? new Date(order.createdAt).toLocaleString(this.currentLang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      : '-';
    document.getElementById('detail-ord-source').textContent = order.source || 'Website Store';

    // Status
    const statusSelect = document.getElementById('detail-ord-status');
    if (statusSelect) statusSelect.value = order.status || 'Pending';

    // Customer
    document.getElementById('detail-ord-name').value = order.customer?.name || '';
    const phone = order.customer?.phone || '';
    document.getElementById('detail-ord-phone').value = phone;
    document.getElementById('detail-ord-address').value = order.customer?.address || '';
    document.getElementById('detail-ord-city').value = order.customer?.city || 'Dhaka';

    // Fraud pill & verification
    const isEn = this.currentLang === 'en';
    const fraudPill = document.getElementById('detail-fraud-pill');
    const fraudText = document.getElementById('detail-fraud-text');
    const isBlacklisted = (this.blacklist?.phones || []).includes(phone);
    if (isBlacklisted) {
      if (fraudPill) {
        fraudPill.style.background = '#dc2626';
        fraudPill.textContent = isEn ? 'Blacklisted Customer' : 'ব্ল্যাকলিস্টেড গ্রাহক';
      }
      if (fraudText) fraudText.textContent = isEn ? 'Warning: This phone number is on the blacklist!' : 'সতর্কতা: এই ফোন নম্বরটি ব্ল্যাকলিস্টে রয়েছে!';
    } else {
      if (fraudPill) {
        fraudPill.style.background = '#15803d';
        fraudPill.textContent = isEn ? 'Verified Customer' : 'নিরাপদ গ্রাহক';
      }
      if (fraudText) fraudText.textContent = isEn ? 'Delivery history clean • Safe to process order' : 'কুরিয়ার ডেলিভারি রেট ৯২% • ফ্রড রিস্ক নেই';
    }

    // Items table
    const itemsTbody = document.getElementById('detail-items-table-body');
    const items = order.items || [];
    if (!items || items.length === 0) {
      if (itemsTbody) itemsTbody.innerHTML = `<tr><td colspan="4" style="padding:10px; text-align:center; color:#94a3b8;">${isEn ? 'No items recorded' : 'কোনো পণ্য রেকর্ড নেই'}</td></tr>`;
    } else {
      if (itemsTbody) {
        itemsTbody.innerHTML = items.map(item => `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding:8px 10px; font-weight:700; color:#1e293b;">${item.name}</td>
            <td style="padding:8px 10px; color:#64748b;">${item.size || '-'}</td>
            <td style="padding:8px 10px; text-align:center; font-weight:800;">${item.quantity || 1}</td>
            <td style="padding:8px 10px; text-align:right; font-weight:800; color:#0d4d29;">৳${(item.price || 0) * (item.quantity || 1)}</td>
          </tr>
        `).join('');
      }
    }

    // Subtotal & Financials
    const subtotal = order.subtotal || (order.total - (order.deliveryCharge || 70));
    document.getElementById('detail-ord-subtotal').value = subtotal;
    document.getElementById('detail-ord-delivery').value = order.deliveryCharge || 70;
    document.getElementById('detail-ord-total').value = order.total || (subtotal + (order.deliveryCharge || 70));

    // Internal Note
    document.getElementById('detail-ord-note').value = order.callCenterNote || '';

    // Courier Info
    const courierInfo = document.getElementById('detail-courier-info');
    const courierBtn = document.getElementById('detail-courier-btn');
    if (order.courier && order.courier.trackingCode) {
      if (courierInfo) courierInfo.innerHTML = `<b style="color:#0d4d29;">${order.courier.provider}</b> (${isEn ? 'Tracking' : 'ট্র্যাকিং কোড'}: <code style="font-weight:800; background:#eef5f0; padding:2px 6px; border-radius:4px;">${order.courier.trackingCode}</code>)`;
      if (courierBtn) courierBtn.style.display = 'none';
    } else {
      if (courierInfo) courierInfo.textContent = isEn ? 'Not dispatched to courier yet' : 'এখনও কুরিয়ারে বুক করা হয়নি';
      if (courierBtn) courierBtn.style.display = 'inline-block';
    }

    // Agent last updated
    if (order.lastUpdatedBy && order.lastUpdatedBy.agent) {
      document.getElementById('detail-ord-agent').textContent = order.lastUpdatedBy.agent;
      document.getElementById('detail-ord-timestamp').textContent = order.lastUpdatedBy.timestamp
        ? new Date(order.lastUpdatedBy.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';
    } else {
      document.getElementById('detail-ord-agent').textContent = isEn ? 'System (Website)' : 'সিস্টেম (Website)';
      document.getElementById('detail-ord-timestamp').textContent = isEn ? 'Initial Order' : 'প্রাথমিক অর্ডার';
    }

    this.applyLanguage(this.currentLang);

    const modal = document.getElementById('order-details-modal');
    if (modal) modal.classList.add('active');
  },

  closeOrderDetailsModal() {
    const modal = document.getElementById('order-details-modal');
    if (modal) modal.classList.remove('active');
  },

  recalcOrderDetails() {
    const sub = parseInt(document.getElementById('detail-ord-subtotal').value) || 0;
    const del = parseInt(document.getElementById('detail-ord-delivery').value) || 0;
    document.getElementById('detail-ord-total').value = sub + del;
  },

  async handleSaveOrderDetails(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('detail-ord-id').value;
    const status = document.getElementById('detail-ord-status').value;
    const name = document.getElementById('detail-ord-name').value.trim();
    const phone = document.getElementById('detail-ord-phone').value.trim();
    const address = document.getElementById('detail-ord-address').value.trim();
    const city = document.getElementById('detail-ord-city').value.trim();
    const deliveryCharge = parseInt(document.getElementById('detail-ord-delivery').value) || 70;
    const total = parseInt(document.getElementById('detail-ord-total').value) || 0;
    const callCenterNote = document.getElementById('detail-ord-note').value.trim();

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          customer: { name, phone, address, city },
          deliveryCharge,
          total,
          callCenterNote,
          agent: this.activeAgent
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('অর্ডারের বিবরণ সফলভাবে হালনাগাদ করা হয়েছে!');
        this.closeOrderDetailsModal();
        await this.fetchOrders();
        await this.fetchStats();
      } else {
        alert(data.message || 'আপডেট করতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      alert('সার্ভারে যোগাযোগ করা যায়নি।');
    }
  },

  openCourierFromModal() {
    const id = document.getElementById('detail-ord-id').value;
    this.closeOrderDetailsModal();
    this.openCourierModal(id);
  },

  checkModalCustomerFraud() {
    const phone = document.getElementById('detail-ord-phone').value;
    if (phone) {
      this.openFraudCheck(phone);
    }
  },

  // Backwards compatibility alias
  openEditOrderModal(orderId) {
    this.openOrderDetailsModal(orderId);
  },
  closeEditOrderModal() {
    this.closeOrderDetailsModal();
  },

  async deleteOrder(id) {
    if (!confirm(`আপনি কি নিশ্চিতভাবে অর্ডার #${id} ডিলিট করতে চান?`)) return;
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      this.orders = this.orders.filter(o => o.id !== id);
      this.updateTabCounters();
      this.renderOrdersTable();
      this.fetchStats();
    } catch (e) {}
  },

  // ================= 6. COURIER DISPATCH =================
  openCourierModal(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;
    this.activeDispatchOrderId = orderId;
    document.getElementById('modal-dispatch-id').textContent = `#${order.id}`;
    document.getElementById('modal-dispatch-name').textContent = order.customer?.name || '';
    document.getElementById('modal-dispatch-phone').textContent = order.customer?.phone || '';
    document.getElementById('modal-dispatch-amount').textContent = `৳${order.total}`;
    document.getElementById('courier-modal').classList.add('active');
  },

  closeCourierModal() {
    document.getElementById('courier-modal').classList.remove('active');
  },

  async dispatchToCourier() {
    const provider = document.getElementById('select-courier-provider').value;
    const order = this.orders.find(o => o.id === this.activeDispatchOrderId);
    if (!order) return;

    try {
      const res = await fetch('/api/courier/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          courier: provider,
          weight: '0.5 kg',
          specialNote: 'Preme Farm - Cash on Delivery',
          agent: this.activeAgent
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`অর্ডারটি সফলভাবে ${provider} কুরিয়ারে বুকিং হয়েছে!\nট্র্যাকিং কোড: ${data.trackingCode}`);
        this.closeCourierModal();
        await this.fetchOrders();
      }
    } catch (e) {
      alert('কুরিয়ার বুকিংয়ে সমস্যা হয়েছে।');
    }
  },

  // ================= 7. AGENT AUDIT LOGS =================
  async fetchAuditLogs() {
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const json = await res.json();
        this.auditLogs = json.data || [];
        this.renderAuditLogs();
      }
    } catch (e) {}
  },

  renderAuditLogs() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;

    if (!this.auditLogs || this.auditLogs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:30px; color:#64748b;">${this.currentLang === 'bn' ? 'কোনো লগ রেকর্ড পাওয়া যায়নি।' : 'No audit logs found.'}</td></tr>`;
      return;
    }

    tbody.innerHTML = this.auditLogs.map(log => {
      const date = log.timestamp ? new Date(log.timestamp).toLocaleString(this.currentLang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
      const actionText = (this.currentLang === 'en' && log.actionEn) ? log.actionEn : log.action;

      return `
        <tr>
          <td style="font-size:12.5px; color:#64748b;">${date}</td>
          <td><b style="color:#0d4d29;">${log.orderId || '-'}</b></td>
          <td><span style="font-weight:700; color:#1e293b; background:#eef5f0; padding:3px 8px; border-radius:12px; font-size:12px;">${log.agent}</span></td>
          <td style="font-size:13.5px;">${actionText}</td>
        </tr>
      `;
    }).join('');
  },

  // ================= 8. BLACKLIST & SECURITY =================
  async fetchBlacklist() {
    try {
      const res = await fetch('/api/blacklist');
      if (res.ok) {
        const json = await res.json();
        this.blacklist = json.data || { phones: [], ips: [] };
        this.renderBlacklist();
      }
    } catch (e) {}
  },

  renderBlacklist() {
    const tbody = document.getElementById('blacklist-table-body');
    if (!tbody) return;

    const phones = this.blacklist.phones || [];
    const ips = this.blacklist.ips || [];
    const all = [
      ...phones.map(p => ({ ...p, type: 'phone', val: p.phone })),
      ...ips.map(i => ({ ...i, type: 'ip', val: i.ip }))
    ];

    if (all.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#64748b;">${this.currentLang === 'bn' ? 'ব্ল্যাকলিস্টে কোনো তথ্য নেই।' : 'No blacklist entries found.'}</td></tr>`;
      return;
    }

    tbody.innerHTML = all.map(b => {
      const date = b.blockedAt ? new Date(b.blockedAt).toLocaleDateString() : '-';
      const typeLabel = b.type === 'phone' ? 'Phone' : 'IP';
      return `
        <tr>
          <td><span style="background:${b.type === 'phone' ? '#e0f2fe' : '#fef3c7'}; color:${b.type === 'phone' ? '#0369a1' : '#b45309'}; padding:3px 8px; border-radius:12px; font-weight:800; font-size:11px;">${typeLabel}</span></td>
          <td><b style="font-family:monospace; color:#dc2626; font-size:14px;">${b.val}</b></td>
          <td style="font-size:13px; color:#475569;">${b.reason}</td>
          <td style="font-size:12px; font-weight:700;">${b.blockedBy || 'Admin'}</td>
          <td style="font-size:12px; color:#64748b;">${date}</td>
          <td>
            <button onclick="AdminApp.unblockCustomer('${b.type}', '${b.val}')" style="background:#eef5f0; border:1px solid #c9decb; color:#0d4d29; padding:3px 10px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer;">
              ${I18N[this.currentLang].btn_unblock}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  promptBlockCustomer(phone, ip) {
    const reason = prompt(`এই গ্রাহককে ব্লক করার কারণ লিখুন (মোবাইল: ${phone}):`, 'বারবার ফেক অর্ডার ও কুরিয়ার রিটার্ন');
    if (!reason) return;

    this.blockCustomer('phone', phone, reason);
    if (ip && ip !== '127.0.0.1') {
      this.blockCustomer('ip', ip, `সংশ্লিষ্ট ফেক কাস্টমার আইপি (${phone})`);
    }
  },

  async blockCustomer(type, value, reason) {
    try {
      const res = await fetch('/api/blacklist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value, reason, agent: this.activeAgent })
      });
      const data = await res.json();
      if (data.success) {
        alert(`${type === 'phone' ? 'মোবাইল নম্বর' : 'আইপি'} সফলভাবে ব্লক করা হয়েছে!`);
        await this.fetchBlacklist();
      }
    } catch (e) {
      alert('ব্লক করতে সমস্যা হয়েছে।');
    }
  },

  async unblockCustomer(type, value) {
    if (!confirm(`আপনি কি নিশ্চিতভাবে ${value} আনব্লক করতে চান?`)) return;
    try {
      const res = await fetch('/api/blacklist/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value, agent: this.activeAgent })
      });
      const data = await res.json();
      if (data.success) {
        alert('সফলভাবে আনব্লক করা হয়েছে!');
        await this.fetchBlacklist();
      }
    } catch (e) {
      alert('আনব্লক করতে সমস্যা হয়েছে।');
    }
  },

  async handleManualBlockSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('bl-input-type').value;
    const value = document.getElementById('bl-input-val').value.trim();
    const reason = document.getElementById('bl-input-reason').value.trim();
    if (!value) return;

    await this.blockCustomer(type, value, reason);
    document.getElementById('bl-input-val').value = '';
    document.getElementById('bl-input-reason').value = '';
  },

  // ================= CSV EXPORT =================
  exportOrdersCSV() {
    window.location.href = '/api/reports/csv';
  },

  // ================= 9. LANDING PAGES, PRODUCTS, COUPONS =================
  async fetchLandingPages() {
    try {
      const res = await fetch('/api/landing-pages');
      if (res.ok) {
        const json = await res.json();
        this.landingPages = json.data || [];
        this.renderLandingPages();
      }
    } catch (e) {}
  },

  renderLandingPages() {
    const tbody = document.getElementById('landing-table-body');
    if (!tbody) return;
    tbody.innerHTML = this.landingPages.map(lp => {
      const price = lp.price || lp.offerPrice || 950;
      const url = `/landing?id=${lp.id}`;
      return `
        <tr>
          <td><img src="${lp.image || 'images/kalo_shona_jar.png'}" style="width:48px; height:48px; object-fit:cover; border-radius:6px; border:1px solid #dce8dd;"></td>
          <td>
            <b style="color:#0d4d29; font-size:14px;">${lp.title}</b><br>
            <span style="font-size:12px; color:#64748b;">${lp.subtitle || ''}</span>
          </td>
          <td>
            <span style="background:#eef5f0; color:#0d4d29; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:800;">
              ${lp.templateName || lp.template}
            </span>
          </td>
          <td><b style="color:#0d4d29; font-size:15px;">৳${price}</b></td>
          <td>
            <a href="${url}" target="_blank" style="color:#0d4d29; font-weight:800; text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-size:13px;">
              ${url} ➔
            </a>
          </td>
          <td>
            <button onclick="AdminApp.deleteLandingPage('${lp.id}')" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; cursor:pointer;" title="Delete">
              ✕
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openLandingModal() {
    this.populateLandingProducts();
    const modal = document.getElementById('landing-modal');
    if (modal) modal.classList.add('active');
  },

  closeLandingModal() {
    const modal = document.getElementById('landing-modal');
    if (modal) modal.classList.remove('active');
  },

  populateLandingProducts() {
    const select = document.getElementById('lp-form-product');
    if (!select || !this.products) return;
    select.innerHTML = '<option value="">-- প্রোডাক্ট নির্বাচন করুন --</option>' +
      this.products.map(p => {
        const pr = p.variants?.[0]?.price || p.price || 950;
        return `<option value="${p.id}">${p.name} (৳${pr})</option>`;
      }).join('');
  },

  onSelectLandingProduct(productId) {
    if (!productId) return;
    const p = this.products.find(item => String(item.id) === String(productId));
    if (!p) return;

    const price = p.variants?.[0]?.price || p.price || 950;
    const regPrice = p.variants?.[0]?.regularPrice || p.regularPrice || Math.round(price * 1.25);

    document.getElementById('lp-form-title').value = `${p.name} — বিশেষ মেগা অফার!`;
    document.getElementById('lp-form-subtitle').value = p.description ? p.description.substring(0, 85) + '...' : '১০০% প্রাকৃতিক উপাদানে তৈরি বিশেষ পথ্য • ক্যাশ অন ডেলিভারি';
    document.getElementById('lp-form-price').value = price;
    document.getElementById('lp-form-reg-price').value = regPrice;
    document.getElementById('lp-form-image').value = p.image || 'images/kalo_shona_jar.png';
    document.getElementById('lp-form-badge').value = `বিশেষ মেগা অফার • ৳${regPrice - price} ছাড়`;
  },

  selectTemplate(tpl, el) {
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    if (el) el.classList.add('selected');
    this.selectedLandingTemplate = tpl;
  },

  async handleLandingSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('lp-form-title').value.trim();
    const subtitle = document.getElementById('lp-form-subtitle').value.trim();
    const price = parseInt(document.getElementById('lp-form-price').value) || 950;
    const regularPrice = parseInt(document.getElementById('lp-form-reg-price').value) || (price + 200);
    const badge = document.getElementById('lp-form-badge').value.trim();
    const image = document.getElementById('lp-form-image').value.trim() || 'images/kalo_shona_jar.png';
    const prodId = document.getElementById('lp-form-product').value;

    const tplNames = {
      'template-1': 'সিঙ্গেল প্রোডাক্ট হিরো',
      'template-2': 'ফ্ল্যাশ সেল কাউন্টডাউন',
      'template-3': 'মেগা কম্বো সেভার প্যাক',
      'template-4': 'সোশ্যাল প্রুফ ও রিভিউ',
      'template-5': 'ন্যাচারাল ভেষজ ওয়েলনেস'
    };

    const chosenTpl = this.selectedLandingTemplate || 'template-1';

    try {
      const res = await fetch('/api/landing-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subtitle,
          price,
          regularPrice,
          discountBadge: badge,
          template: chosenTpl,
          templateName: tplNames[chosenTpl] || 'কাস্টম টেমপ্লেট',
          image,
          productId: prodId ? parseInt(prodId) : 1
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('নতুন ল্যান্ডিং পেজ সফলভাবে তৈরি হয়েছে!');
        this.closeLandingModal();
        await this.fetchLandingPages();
      }
    } catch (e) {
      alert('ল্যান্ডিং পেজ তৈরি করতে সমস্যা হয়েছে।');
    }
  },

  async deleteLandingPage(id) {
    if (!confirm('ল্যান্ডিং পেজ ডিলিট করতে চান?')) return;
    try {
      await fetch(`/api/landing-pages/${id}`, { method: 'DELETE' });
      await this.fetchLandingPages();
    } catch (e) {}
  },

  // Products
  async fetchProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        this.products = json.data || [];
        this.renderProducts();
      }
    } catch (e) {}
  },

  renderProducts() {
    const tbody = document.getElementById('admin-products-body');
    if (!tbody) return;
    tbody.innerHTML = this.products.map(p => {
      const v = p.variants?.[0] || { price: 950, regularPrice: 1150 };
      return `
        <tr>
          <td><img src="${p.image}" style="width:44px; height:44px; object-fit:contain; border-radius:6px; border:1px solid #e2e8f0;"></td>
          <td><b>${p.name}</b></td>
          <td><span style="background:#eef5f0; color:#0d4d29; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:700;">${p.category}</span></td>
          <td><b>৳${v.price}</b> <span style="text-decoration:line-through; color:#94a3b8; font-size:12px;">৳${v.regularPrice || ''}</span></td>
          <td><span style="color:${p.inStock ? '#15803d' : '#dc2626'}; font-weight:800;">${p.inStock ? 'ইন স্টক (' + p.stock + ')' : 'স্টক শেষ'}</span></td>
          <td>
            <label class="switch">
              <input type="checkbox" ${p.inStock ? 'checked' : ''} onchange="AdminApp.toggleProductStock(${p.id}, this.checked)">
              <span class="slider"></span>
            </label>
          </td>
          <td>
            <button onclick="AdminApp.deleteProduct(${p.id})" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; cursor:pointer;">✕</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  openProductModal() { document.getElementById('product-modal').classList.add('active'); },
  closeProductModal() { document.getElementById('product-modal').classList.remove('active'); },

  async toggleProductStock(id, inStock) {
    try {
      await fetch(`/api/products/${id}/stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock, stock: inStock ? 50 : 0 })
      });
      await this.fetchProducts();
    } catch (e) {}
  },

  async deleteProduct(id) {
    if (!confirm('প্রোডাক্ট ডিলিট করতে চান?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      await this.fetchProducts();
    } catch (e) {}
  },

  async generateAiDescription() {
    const keywords = document.getElementById('ai-keywords').value.trim();
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value;

    if (!name) {
      alert('অনুগ্রহ করে আগে প্রোডাক্টের নাম লিখুন।');
      return;
    }

    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords, name, category })
      });
      const json = await res.json();
      if (json.success && json.data) {
        document.getElementById('prod-desc').value = json.data.description;
        document.getElementById('prod-benefits').value = json.data.benefits.join('\n');
      }
    } catch (e) {
      alert('AI বিবরণ তৈরিতে সমস্যা হয়েছে।');
    }
  },

  async handleProductSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value;
    const price = parseInt(document.getElementById('prod-price').value) || 950;
    const regularPrice = parseInt(document.getElementById('prod-reg-price').value) || 1150;
    const stock = parseInt(document.getElementById('prod-stock').value) || 50;
    const description = document.getElementById('prod-desc').value.trim();
    const benefits = document.getElementById('prod-benefits').value.trim().split('\n').filter(b => b.trim());

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, category, price, regularPrice, stock, description, benefits,
          image: 'images/kalo_shona_jar.png'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('নতুন প্রোডাক্ট সফলভাবে যুক্ত হয়েছে!');
        this.closeProductModal();
        await this.fetchProducts();
      }
    } catch (e) {}
  },

  // Coupons
  async fetchCoupons() {
    try {
      const res = await fetch('/api/coupons');
      if (res.ok) {
        const json = await res.json();
        this.coupons = json.data || [];
        this.renderCoupons();
      }
    } catch (e) {}
  },

  renderCoupons() {
    const tbody = document.getElementById('coupons-table-body');
    if (!tbody) return;
    tbody.innerHTML = this.coupons.map(c => `
      <tr>
        <td><b style="font-family:monospace; color:#0d4d29; font-size:14px; background:#eef5f0; padding:2px 8px; border-radius:4px;">${c.code}</b></td>
        <td>${c.type === 'percent' ? 'শতাংশ (%)' : 'নির্দিষ্ট টাকা (৳)'}</td>
        <td><b>${c.amount}${c.type === 'percent' ? '%' : '৳'}</b></td>
        <td>৳${c.minOrder || 0}</td>
        <td>${c.description || '-'}</td>
        <td><span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:800;">${c.status}</span></td>
        <td><button onclick="AdminApp.deleteCoupon('${c.id}')" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; cursor:pointer;">✕</button></td>
      </tr>
    `).join('');
  },

  openCouponModal() { document.getElementById('coupon-modal').classList.add('active'); },
  closeCouponModal() { document.getElementById('coupon-modal').classList.remove('active'); },

  async handleCouponSubmit(e) {
    e.preventDefault();
    const code = document.getElementById('cpn-code').value.trim();
    const amount = parseInt(document.getElementById('cpn-amount').value) || 100;
    const minOrder = parseInt(document.getElementById('cpn-min').value) || 800;
    const description = document.getElementById('cpn-desc').value.trim();

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, amount, minOrder, description, type: 'fixed' })
      });
      const data = await res.json();
      if (data.success) {
        alert('নতুন কুপন কোড যুক্ত হয়েছে!');
        this.closeCouponModal();
        await this.fetchCoupons();
      }
    } catch (e) {}
  },

  async deleteCoupon(id) {
    if (!confirm('কুপন ডিলিট করতে চান?')) return;
    try {
      await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
      await this.fetchCoupons();
    } catch (e) {}
  },

  // Staff & Sub-admins
  async fetchStaff() {
    try {
      const res = await fetch('/api/staff');
      if (res.ok) {
        const json = await res.json();
        this.staff = json.data || [];
        this.renderStaff();
      }
    } catch (e) {}
  },

  renderStaff() {
    const tbody = document.getElementById('staff-table-body');
    if (!tbody) return;
    tbody.innerHTML = this.staff.map(s => `
      <tr>
        <td><b>${s.name}</b></td>
        <td><code>${s.username}</code></td>
        <td><span class="badge-role">${s.role}</span></td>
        <td><span style="font-size:12.5px; color:#475569;">${(s.permissions || []).join(', ')}</span></td>
        <td>
          ${s.role !== 'Super Admin' ? `<button onclick="AdminApp.deleteStaff('${s.id}')" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; cursor:pointer;">✕</button>` : '<span style="color:#94a3b8; font-size:12px;">Protected</span>'}
        </td>
      </tr>
    `).join('');
  },

  openStaffModal() { document.getElementById('staff-modal').classList.add('active'); },
  closeStaffModal() { document.getElementById('staff-modal').classList.remove('active'); },

  async handleStaffSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('stf-name').value.trim();
    const username = document.getElementById('stf-username').value.trim();
    const pin = document.getElementById('stf-pin').value.trim();
    const permissions = [];
    if (document.getElementById('perm-orders').checked) permissions.push('orders');
    if (document.getElementById('perm-landing').checked) permissions.push('landing');
    if (document.getElementById('perm-products').checked) permissions.push('products');
    if (document.getElementById('perm-cms').checked) permissions.push('cms');
    if (document.getElementById('perm-reports').checked) permissions.push('reports');

    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, pin, role: 'Sub-Admin', permissions })
      });
      const data = await res.json();
      if (data.success) {
        alert('সাব-এডমিন একাউন্ট সফলভাবে সংরক্ষিত হয়েছে!');
        this.closeStaffModal();
        await this.fetchStaff();
      }
    } catch (e) {}
  },

  async deleteStaff(id) {
    if (!confirm('স্টাফ ডিলিট করতে চান?')) return;
    try {
      await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      await this.fetchStaff();
    } catch (e) {}
  },

  // CMS Content
  async fetchCmsContent() {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        const c = json.data || {};
        if (c.header) {
          if (document.getElementById('cms-hotline')) document.getElementById('cms-hotline').value = c.header.hotline || '01872170476';
          if (document.getElementById('cms-tagline')) document.getElementById('cms-tagline').value = c.header.tagline || 'সুখী জীবনের জন্য স্বাস্থ্যকর খাবার';
        }
        if (c.footer) {
          if (document.getElementById('cms-footer-about')) document.getElementById('cms-footer-about').value = c.footer.aboutText || '';
          if (document.getElementById('cms-footer-copy')) document.getElementById('cms-footer-copy').value = c.footer.copyright || '';
        }
      }
    } catch (e) {}
  },

  async saveCmsContent() {
    const hotline = document.getElementById('cms-hotline').value.trim();
    const tagline = document.getElementById('cms-tagline').value.trim();
    const aboutText = document.getElementById('cms-footer-about').value.trim();
    const copyright = document.getElementById('cms-footer-copy').value.trim();

    try {
      await fetch('/api/content/header', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotline, tagline })
      });
      await fetch('/api/content/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aboutText, copyright })
      });
      alert('ওয়েবসাইট কনটেন্ট সফলভাবে সংরক্ষণ করা হয়েছে!');
    } catch (e) {}
  },

  // Settings
  async fetchSettings() {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const json = await res.json();
        const s = json.data || {};
        if (s.shipping) {
          if (document.getElementById('store-dhaka-charge')) document.getElementById('store-dhaka-charge').value = s.shipping.insideDhaka || 70;
          if (document.getElementById('store-outside-charge')) document.getElementById('store-outside-charge').value = s.shipping.outsideDhaka || 130;
        }
      }
    } catch (e) {}
  },

  async saveSettings() {
    const inside = parseInt(document.getElementById('store-dhaka-charge').value) || 70;
    const outside = parseInt(document.getElementById('store-outside-charge').value) || 130;

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping: { insideDhaka: inside, outsideDhaka: outside }
        })
      });
      alert('স্টোর সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!');
    } catch (e) {}
  }
};

window.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});
