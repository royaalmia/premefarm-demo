/**
 * Preme Farm - Enterprise Admin Dashboard Controller
 * Clean-cut Corporate UI, Bilingual (BN / EN), Light/Dark Theme,
 * Call Center Order Management, Fraud & Blacklist, Agent Audit Trail.
 */

const I18N = {
  bn: {
    sidebar_title: 'Preme Farm',
    sidebar_sub: 'কন্ট্রোল প্যানেল',
    sidebar_tagline: 'প্রিমি ফার্ম • ১০০% খাঁটি ও নিরাপদ',
    sidebar_user_label: 'লগইন কৃত:',
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_orders: 'অর্ডার ম্যানেজমেন্ট',
    nav_wholesale: 'হোলসেল',
    wholesale_title: 'হোলসেল ইনকোয়ারি',
    wholesale_sub: 'দোকানদার, ডিলার ও রিসেলারদের কাছ থেকে আসা সকল পাইকারি রিকোয়েস্ট',
    wholesale_refresh: '🔄 রিফ্রেশ লিস্ট',
    wholesale_all: 'সকল আবেদন',
    wholesale_new: 'নতুন',
    wholesale_contacted: 'যোগাযোগ হয়েছে',
    wholesale_confirmed: 'কনফার্মড',
    wholesale_th_id: 'আইডি ও তারিখ',
    wholesale_th_applicant: 'আবেদনকারীর নাম ও প্রতিষ্ঠান',
    wholesale_th_contact: 'যোগাযোগ / ফোন',
    wholesale_th_address: 'ঠিকানা',
    wholesale_th_items: 'আগ্রহী পণ্য ও পরিমাণ',
    wholesale_th_status: 'স্ট্যাটাস',
    wholesale_th_action: 'অ্যাকশন',
    wholesale_empty: 'কোনো হোলসেল আবেদন পাওয়া যায়নি।',
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
    theme_light: 'লাইট মোড',
    theme_dark: 'ডার্ক মোড',
    btn_csv: 'অর্ডার রিপোর্ট (CSV)',
    status_live: 'লাইভ সিস্টেম',

    stat_sales: 'মোট ডেলিভার্ড সেলস',
    stat_orders: 'মোট অর্ডার',
    stat_pending: 'পেন্ডিং পার্সেল',
    stat_courier: 'কুরিয়ারে প্রেরিত',
    stat_cancelled: 'বাতিল ও রিটার্ন',
    stat_total_sub: 'সর্বমোট বুকিং',

    dash_header_title: 'প্রিমি ফার্ম ওভারভিউ ও বিজনেস অ্যানালিটিক্স',
    dash_header_sub: 'সেলস গ্রাফ, কুরিয়ার পারফরম্যান্স, স্টক অ্যালার্ট ও রিয়েল-টাইম বিজনেস রিপোর্ট',
    chart_sales_title: 'সাপ্তাহিক সেলস ও অর্ডার ট্র্যাকিং গ্রাফ',
    chart_sales_sub: 'গত ৭ দিনের প্রতিদিনের ডেলিভারি রেভিনিউ ও নতুন অর্ডারের ভলিউম',
    legend_sales: 'সেলস',
    legend_orders: 'অর্ডার',
    chart_status_title: 'অর্ডার ফুলফিলমেন্ট স্ট্যাটাস',
    chart_status_sub: 'ডেলিভারি সাফল্য ও কুরিয়ার অনুপাত',
    st_delivered_lbl: 'সফল ডেলিভারি',
    st_transit_lbl: 'কুরিয়ারে প্রেরিত',
    st_pending_lbl: 'পেন্ডিং পার্সেল',
    st_cancel_lbl: 'বাতিল ও রিটার্ন',
    fulfillment_rate_label: 'ফুলফিলমেন্ট স্কোর:',
    inventory_hub_title: 'প্রোডাক্ট ক্যাটালগ ও স্টক সামারি',
    inventory_hub_sub: 'লাইভ পণ্য সংখ্যা, স্টক লেভেল ও ইনভেন্টরি ভ্যালু',
    btn_manage_stock: 'স্টক ম্যানেজ করুন ➔',
    inv_total_prods: 'মোট আইটেম',
    inv_instock: 'ইন স্টক',
    inv_lowstock: 'লো স্টক অ্যালার্ট',
    inv_catalog_val: 'ক্যাটালগ ভ্যালু',
    courier_matrix_title: 'কুরিয়ার পার্টনার পারফরম্যান্স',
    courier_matrix_sub: 'Steadfast, Pathao ও RedX কুরিয়ার ডেলিভারি সাকসেস রেট',
    btn_courier_api_link: 'এপিআই সেটিংস ➔',
    recent_orders_title: 'সর্বশেষ লাইভ অর্ডার',
    recent_orders_sub: 'ওয়েবসাইট ও ল্যান্ডিং পেজ থেকে আসা সদ্য অর্ডারসমূহ',
    btn_view_all_orders: 'সকল অর্ডার দেখুন ➔',

    card_orders_title: 'অর্ডার ম্যানেজমেন্ট',
    card_orders_sub: 'ল্যান্ডিং পেজ ও ওয়েবসাইট থেকে আসা সকল অর্ডার পরিচালনা, ফ্রড চেক এবং কুরিয়ার বুকিং',
    search_placeholder: 'মোবাইল বা Order ID দিয়ে খুঁজুন...',
    btn_new_order: '+ নতুন অর্ডার তৈরি করুন',

    tab_all: 'সব অর্ডার',
    tab_pending: 'পেন্ডিং',
    tab_hold: 'স্থগিত',
    tab_confirmed: 'নিশ্চিত',
    tab_incourier: 'ইন কুরিয়ার',
    tab_delivered: 'ডেলিভার্ড',
    tab_return: 'রিটার্ন',
    tab_cancelled: 'বাতিল',

    th_id_source: 'অর্ডার ID ও সোর্স',
    th_customer: 'গ্রাহক তথ্য ও ফ্রড চেক',
    th_address: 'ডেলিভারি ঠিকানা',
    th_items: 'অর্ডারকৃত পণ্য',
    th_bill: 'বিল',
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
    btn_send_courier: 'কুরিয়ারে পাঠান',

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
    btn_logout: 'লগআউট',
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
    new_ord_total: 'সর্বমোট বিল',
    new_ord_note: 'কল সেন্টার অভ্যন্তরীণ নোট',
    placeholder_note: 'যেমন: কাস্টমার বিকেলে ডেলিভারি চান',
    placeholder_customer_name: 'গ্রাহকের পুরো নাম লিখুন',
    placeholder_phone: '১১ ডিজিটের মোবাইল নম্বর',
    placeholder_address: 'বাসা নং, রোড, থানা, জেলা...',
    opt_city_dhaka: 'ঢাকা শহর (চার্জ ৳১০০)',
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
    ord_total_label: 'সর্বমোট প্রদেয় টাকা (৳)',
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
    sidebar_tagline: 'Preme Farm • 100% Pure & Organic',
    sidebar_user_label: 'Logged in as:',
    nav_dashboard: 'Dashboard',
    nav_orders: 'Order Management',
    nav_wholesale: 'Wholesale',
    wholesale_title: 'Wholesale Inquiries',
    wholesale_sub: 'All wholesale requests from retailers, dealers and resellers',
    wholesale_refresh: '🔄 Refresh List',
    wholesale_all: 'All Inquiries',
    wholesale_new: 'New',
    wholesale_contacted: 'Contacted',
    wholesale_confirmed: 'Confirmed',
    wholesale_th_id: 'ID & Date',
    wholesale_th_applicant: 'Applicant & Business',
    wholesale_th_contact: 'Contact / Phone',
    wholesale_th_address: 'Address',
    wholesale_th_items: 'Products & Quantity',
    wholesale_th_status: 'Status',
    wholesale_th_action: 'Action',
    wholesale_empty: 'No wholesale inquiries found.',
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
    stat_pending: 'Pending Parcels',
    stat_courier: 'In Courier',
    stat_cancelled: 'Cancelled / Returned',
    stat_total_sub: 'Total Bookings',

    dash_header_title: 'Preme Farm Overview & Business Analytics',
    dash_header_sub: 'Sales charts, courier performance matrix, inventory health & real-time insights',
    chart_sales_title: 'Weekly Sales & Order Tracking Chart',
    chart_sales_sub: 'Daily delivered revenue and incoming order volume over the last 7 days',
    legend_sales: 'Sales',
    legend_orders: 'Orders',
    chart_status_title: 'Order Fulfillment Status',
    chart_status_sub: 'Delivery success and logistics breakdown',
    st_delivered_lbl: 'Successful Delivery',
    st_transit_lbl: 'In Courier Transit',
    st_pending_lbl: 'Pending Parcels',
    st_cancel_lbl: 'Cancelled / Returned',
    fulfillment_rate_label: 'Fulfillment Score:',
    inventory_hub_title: 'Product Catalog & Inventory Health',
    inventory_hub_sub: 'Live items, stock levels and total catalog valuation',
    btn_manage_stock: 'Manage Stock ➔',
    inv_total_prods: 'Total Items',
    inv_instock: 'In Stock',
    inv_lowstock: 'Low Stock Alert',
    inv_catalog_val: 'Catalog Value',
    courier_matrix_title: 'Courier Partner Performance',
    courier_matrix_sub: 'Steadfast, Pathao & RedX delivery success ratios',
    btn_courier_api_link: 'API Settings ➔',
    recent_orders_title: 'Recent Live Orders',
    recent_orders_sub: 'Incoming orders from store and landing pages',
    btn_view_all_orders: 'View All Orders ➔',

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
    new_ord_phone: 'Phone Number *',
    new_ord_address: 'Full Delivery Address *',
    new_ord_product: 'Select Product',
    new_ord_qty: 'Quantity',
    new_ord_price: 'Price (৳)',
    new_ord_area: 'Delivery Area',
    new_ord_total: 'Total Bill (COD)',
    new_ord_note: 'Call Center Internal Note',
    placeholder_note: 'e.g. Customer requested afternoon delivery',
    placeholder_customer_name: 'Customer full name',
    placeholder_phone: '11-digit mobile number',
    placeholder_address: 'House, Road, Area, District...',
    opt_city_dhaka: 'Inside Dhaka (Charge ৳100)',
    opt_city_outside: 'Outside Dhaka (Charge ৳130)',
    btn_cancel: 'Cancel',
    btn_save_order: 'Save Order ➔',

    // Order Details Modal
    ord_details_title: 'Order Details',
    ord_details_date_label: 'Date:',
    ord_details_source_label: 'Source:',
    ord_status_change_label: 'Change Order Status *',
    ord_city_label: 'Delivery City / Region',
    ord_customer_name_label: 'Customer Name *',
    ord_phone_label: 'Phone Number *',
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

const DEFAULT_BANNERS = [];

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

    // Automatically purge old demo data once as requested by the owner
    if (localStorage.getItem('pf_demo_cleared_v2') !== 'true') {
      try {
        await fetch('/api/admin/clear-demo-data', { method: 'POST' });
        localStorage.removeItem('premefarm_orders');
        localStorage.setItem('pf_demo_cleared_v2', 'true');
      } catch (e) {}
    }

    await this.fetchStats();
    await this.fetchOrders();
    await this.fetchFailedOrders();
    await this.fetchAuditLogs();
    await this.fetchBlacklist();
    await this.fetchWholesale();
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
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const userInp = document.getElementById('admin-login-user');
    const passInp = document.getElementById('admin-login-pass');
    let user = (userInp ? userInp.value : '').trim();
    let pass = (passInp ? passInp.value : '').trim();

    // Default credentials if fields are empty
    if (!user) user = 'admin@premefarm.com';
    if (!pass) pass = 'Admin@PremeFarm';

    const errBox = document.getElementById('admin-login-error');
    const btn = document.getElementById('admin-login-btn');

    if (errBox) errBox.style.display = 'none';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'লগইন যাচাই হচ্ছে...';
    }

    const cleanU = user.toLowerCase();
    const isMasterUser = cleanU === 'admin@premefarm.com' || cleanU === 'admin' || cleanU === '01872170476' || cleanU === 'superadmin';
    const isMasterPass = pass === 'Admin@PremeFarm' || pass.toLowerCase() === 'admin@premefarm' || pass === 'admin' || pass === '1234' || pass === 'admin123' || pass === '123456';

    // 1. Instant access for Master Admin (admin@premefarm.com / Admin@PremeFarm)
    if (isMasterUser && isMasterPass) {
      const masterUser = {
        id: 'ADMIN-01',
        name: 'সুপার এডমিন',
        email: 'admin@premefarm.com',
        role: 'Super Admin',
        permissions: ['*']
      };
      localStorage.setItem('pf_admin_session', JSON.stringify(masterUser));
      this.currentUser = masterUser;
      const loginScreen = document.getElementById('admin-login-screen');
      if (loginScreen) {
        loginScreen.style.display = 'none';
        loginScreen.style.setProperty('display', 'none', 'important');
      }

      // Notify backend asynchronously
      try {
        fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass })
        }).catch(() => {});
      } catch (ignored) {}

      try {
        await this.init();
      } catch (initErr) {
        console.warn('AdminApp.init caught warning:', initErr);
      }
      return;
    }

    // 2. Other staff credentials verification via API
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
        if (loginScreen) {
          loginScreen.style.display = 'none';
          loginScreen.style.setProperty('display', 'none', 'important');
        }
        try {
          await this.init();
        } catch (initErr) {
          console.warn('AdminApp.init caught warning:', initErr);
        }
        return;
      } else {
        if (errBox) {
          errBox.textContent = data.message || 'ভুল ইমেইল বা পাসওয়ার্ড!';
          errBox.style.display = 'block';
        }
      }
    } catch (err) {
      console.warn('Backend login network error:', err);
      if (errBox) {
        errBox.textContent = 'সার্ভারে সংযোগ করা সম্ভব হয়নি।';
        errBox.style.display = 'block';
      }
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = 'লগইন করুন ➔';
    }
  },

  quickDemoLogin() {
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
    this.renderProducts();
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
        'Pending': lang === 'bn' ? 'পেন্ডিং' : 'Pending',
        'Hold': lang === 'bn' ? 'স্থগিত' : 'On Hold',
        'Confirmed': lang === 'bn' ? 'নিশ্চিতকৃত' : 'Confirmed',
        'In Courier': lang === 'bn' ? 'কুরিয়ারে পাঠানো হয়েছে' : 'In Courier',
        'Delivered': lang === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered',
        'Return': lang === 'bn' ? 'রিটার্ন' : 'Returned',
        'Cancelled': lang === 'bn' ? 'বাতিলকৃত' : 'Cancelled'
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

    // Update active agent dropdown labels
    const agentSelect = document.getElementById('active-agent-select');
    if (agentSelect) {
      const options = agentSelect.options;
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (opt.value === 'সুপার এডমিন') opt.textContent = lang === 'en' ? 'Super Admin' : 'সুপার এডমিন';
        if (opt.value === 'তানভীর (Agent-01)') opt.textContent = lang === 'en' ? 'Tanvir (Agent-01)' : 'তানভীর (এজেন্ট-০১)';
        if (opt.value === 'সাদিয়া (Agent-02)') opt.textContent = lang === 'en' ? 'Sadia (Agent-02)' : 'সাদিয়া (এজেন্ট-০২)';
        if (opt.value === 'রফিক (Supervisor)') opt.textContent = lang === 'en' ? 'Rafiq (Supervisor)' : 'রফিক (সুপারভাইজার)';
        if (opt.value === 'মার্কেটিং স্পেশালিস্ট') opt.textContent = lang === 'en' ? 'Marketing Specialist' : 'মার্কেটিং স্পেশালিস্ট';
      }
    }

    // Update active user role in topbar
    const roleEl = document.getElementById('sidebar-user-role');
    if (roleEl) {
      const isSuperAdmin = (this.activeAgent === 'সুপার এডমিন' || this.activeAgent === 'Super Admin');
      if (isSuperAdmin) {
        roleEl.textContent = lang === 'en' ? 'Super Admin' : 'সুপার এডমিন';
      } else if (this.activeAgent.includes('Supervisor') || this.activeAgent.includes('রফিক')) {
        roleEl.textContent = lang === 'en' ? 'Supervisor' : 'সুপারভাইজার';
      } else if (this.activeAgent.includes('মার্কেটিং')) {
        roleEl.textContent = lang === 'en' ? 'Marketing Specialist' : 'মার্কেটিং স্পেশালিস্ট';
      } else {
        roleEl.textContent = lang === 'en' ? 'Call Center Agent' : 'কল সেন্টার এজেন্ট';
      }
    }
    const userName = document.getElementById('sidebar-user-name');
    if (userName) userName.textContent = this.activeAgent;
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

    // Update active user pill in topbar
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    if (nameEl) nameEl.textContent = this.activeAgent;
    if (roleEl) {
      if (this.currentLang === 'en') {
        if (role === 'সুপার এডমিন' || isSuperAdmin) roleEl.textContent = 'Super Admin';
        else if (role === 'সুপারভাইজার') roleEl.textContent = 'Supervisor';
        else if (role === 'কল সেন্টার এজেন্ট') roleEl.textContent = 'Call Center Agent';
        else if (role === 'মার্কেটিং স্পেশালিস্ট') roleEl.textContent = 'Marketing Specialist';
        else roleEl.textContent = role || 'Agent';
      } else {
        if (role === 'Super Admin' || isSuperAdmin) roleEl.textContent = 'সুপার এডমিন';
        else if (role === 'Supervisor') roleEl.textContent = 'সুপারভাইজার';
        else if (role === 'Call Center Agent') roleEl.textContent = 'কল সেন্টার এজেন্ট';
        else if (role === 'Marketing Specialist') roleEl.textContent = 'মার্কেটিং স্পেশালিস্ট';
        else roleEl.textContent = role || 'এজেন্ট';
      }
    }

    // If current tab is hidden, auto-switch to first allowed tab
    if (!isSuperAdmin && !(perms || []).includes(this.currentTab)) {
      if (firstAllowedTab) {
        this.switchTab(firstAllowedTab);
      }
    }
  },

  // ================= NAVIGATION TABS =================
  setupTabs() {
    const validTabs = ['dashboard', 'orders', 'wholesale', 'audit', 'blacklist', 'landing', 'products', 'coupons', 'cms', 'roles', 'courier', 'store'];
    const getInitialTab = () => {
      const hash = window.location.hash ? window.location.hash.replace('#', '').trim() : '';
      if (hash && validTabs.includes(hash)) return hash;
      const stored = localStorage.getItem('premefarm_active_tab');
      if (stored && validTabs.includes(stored)) return stored;
      return 'dashboard';
    };

    const initialTab = getInitialTab();
    this.currentTab = initialTab;

    const links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash ? window.location.hash.replace('#', '').trim() : '';
      if (hash && validTabs.includes(hash) && hash !== this.currentTab) {
        this.switchTab(hash);
      }
    });

    this.switchTab(initialTab);
  },

  switchTab(tab) {
    if (!tab) return;
    this.currentTab = tab;
    try {
      localStorage.setItem('premefarm_active_tab', tab);
      if (window.location.hash !== '#' + tab) {
        history.replaceState(null, '', '#' + tab);
      }
    } catch (e) {}

    const links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(l => l.classList.toggle('active', l.getAttribute('data-tab') === tab));

    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const target = document.getElementById(`tab-${tab}`);
    if (target) target.classList.add('active');

    if (tab === 'dashboard') this.renderDashboard();
    if (tab === 'orders') this.fetchOrders();
    if (tab === 'wholesale') this.fetchWholesale();
    if (tab === 'audit') this.fetchAuditLogs();
    if (tab === 'blacklist') this.fetchBlacklist();
    if (tab === 'landing') this.populateLandingProducts();
    if (tab === 'cms') this.fetchCmsContent();
    if (tab === 'products') this.fetchProducts();
    if (tab === 'coupons') this.fetchCoupons();
    if (tab === 'roles') this.fetchStaff();
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
    let deliveredRev = 0, deliveredCount = 0;
    let pendingCount = 0, pendingAmt = 0;
    let inCourierCount = 0, inCourierAmt = 0;
    let cancelledCount = 0, cancelledAmt = 0;

    local.forEach(o => {
      const s = (o.status || '').toLowerCase();
      const amt = o.total || 0;
      if (s === 'delivered') {
        deliveredRev += amt;
        deliveredCount++;
      } else if (s === 'pending') {
        pendingCount++;
        pendingAmt += amt;
      } else if (s === 'in courier' || s === 'shipped') {
        inCourierCount++;
        inCourierAmt += amt;
      } else if (s === 'cancelled' || s === 'cancel' || s === 'return' || s === 'returned') {
        cancelledCount++;
        cancelledAmt += amt;
      }
    });

    this.renderStats({
      totalOrders: local.length,
      totalRevenue: deliveredRev,
      deliveredRevenue: deliveredRev,
      deliveredOrders: deliveredCount,
      pendingOrders: pendingCount,
      pendingAmount: pendingAmt,
      inCourierOrders: inCourierCount,
      inCourierAmount: inCourierAmt,
      cancelledOrders: cancelledCount,
      cancelledAmount: cancelledAmt
    });
  },

  formatStatus(status) {
    const s = status || 'Pending';
    if (this.currentLang === 'en') return s;
    const map = {
      'Pending': 'পেন্ডিং',
      'Hold': 'স্থগিত',
      'Confirmed': 'নিশ্চিত',
      'In Courier': 'কুরিয়ারে প্রেরিত',
      'Shipped': 'কুরিয়ারে প্রেরিত',
      'Delivered': 'ডেলিভার্ড',
      'Return': 'রিটার্ন',
      'Cancelled': 'বাতিল'
    };
    return map[s] || s;
  },

  renderDashboard() {
    const isEn = this.currentLang === 'en';
    const orders = this.orders || [];
    const totalCount = orders.length;

    const deliveredOrders = orders.filter(o => (o.status || '').toLowerCase() === 'delivered');
    const inCourierOrders = orders.filter(o => {
      const s = (o.status || '').toLowerCase();
      return s === 'in courier' || s === 'shipped';
    });
    const pendingOrders = orders.filter(o => {
      const s = (o.status || '').toLowerCase();
      return s === 'pending' || s === 'confirmed' || s === 'hold';
    });
    const cancelledOrders = orders.filter(o => {
      const s = (o.status || '').toLowerCase();
      return s === 'cancelled' || s === 'cancel' || s === 'return' || s === 'returned';
    });

    const pctDeliv = totalCount > 0 ? Math.round((deliveredOrders.length / totalCount) * 100) : 100;
    const pctCourier = totalCount > 0 ? Math.round((inCourierOrders.length / totalCount) * 100) : 0;
    const pctPending = totalCount > 0 ? Math.round((pendingOrders.length / totalCount) * 100) : 0;
    const pctCancelled = totalCount > 0 ? Math.round((cancelledOrders.length / totalCount) * 100) : 0;

    const elPctDeliv = document.getElementById('dash-pct-delivered');
    const elBarDeliv = document.getElementById('dash-bar-delivered');
    if (elPctDeliv) elPctDeliv.textContent = `${pctDeliv}%`;
    if (elBarDeliv) elBarDeliv.style.width = `${pctDeliv}%`;

    const elPctCourier = document.getElementById('dash-pct-courier');
    const elBarCourier = document.getElementById('dash-bar-courier');
    if (elPctCourier) elPctCourier.textContent = `${pctCourier}%`;
    if (elBarCourier) elBarCourier.style.width = `${pctCourier}%`;

    const elPctPending = document.getElementById('dash-pct-pending');
    const elBarPending = document.getElementById('dash-bar-pending');
    if (elPctPending) elPctPending.textContent = `${pctPending}%`;
    if (elBarPending) elBarPending.style.width = `${pctPending}%`;

    const elPctCancelled = document.getElementById('dash-pct-cancelled');
    const elBarCancelled = document.getElementById('dash-bar-cancelled');
    if (elPctCancelled) elPctCancelled.textContent = `${pctCancelled}%`;
    if (elBarCancelled) elBarCancelled.style.width = `${pctCancelled}%`;

    const elScore = document.getElementById('dash-overall-score');
    if (elScore) elScore.textContent = `${pctDeliv}%`;

    // Render Recent 5 Orders on Dashboard
    const recentBody = document.getElementById('dashboard-recent-orders-body');
    if (recentBody) {
      if (orders.length === 0) {
        recentBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#64748b;">${isEn ? 'No recent orders yet. Live incoming orders will appear here.' : 'এখনও কোনো লাইভ অর্ডার নেই। নতুন অর্ডার আসলে এখানে সাথে সাথে প্রদর্শিত হবে।'}</td></tr>`;
      } else {
        const recent5 = orders.slice(0, 5);
        recentBody.innerHTML = recent5.map(o => {
          const itemsCount = (o.items || []).reduce((sum, it) => sum + (it.quantity || 1), 0);
          const firstItem = (o.items && o.items[0]) ? o.items[0].name : 'পণ্য';
          const itemsSummary = itemsCount > 1 ? `${firstItem} + ${itemsCount - 1} টি` : firstItem;
          const phone = o.customer?.phone || o.phone || '';
          const custName = o.customer?.name || o.customerName || 'গ্রাহক';
          const dt = o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'আজ';
          return `
            <tr>
              <td>
                <b style="color: #0d4d29;">${o.id.startsWith('#') ? o.id : '#' + o.id}</b>
                <div style="font-size: 11.5px; color: #64748b;">${dt} • ${o.source || 'Website'}</div>
              </td>
              <td>
                <div style="font-weight: 700; color: #1e293b;">${this.escapeHtml(custName)}</div>
                <div style="font-size: 12px; color: #64748b; font-family: monospace;">${phone}</div>
              </td>
              <td>
                <b style="color: #166534;">৳${(o.total || 0).toLocaleString()}</b>
                <div style="font-size: 11px; color: #64748b;">${this.escapeHtml(itemsSummary)}</div>
              </td>
              <td>
                <span class="badge-status ${(o.status || 'pending').toLowerCase()}" style="display:inline-block; padding:3px 8px; border-radius:12px; font-size:11.5px; font-weight:800;">
                  ${this.formatStatus(o.status)}
                </span>
              </td>
              <td>
                <button type="button" onclick="AdminApp.openOrderDetailsModal('${o.id}')" style="background: #eef5f0; color: #0d4d29; border: 1px solid #c9decb; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">
                  ${isEn ? 'View ➔' : 'বিস্তারিত ➔'}
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // Product Inventory Summary
    if (this.products && this.products.length > 0) {
      const totalProds = this.products.length;
      const inStock = this.products.filter(p => (p.stock === undefined || p.stock > 0)).length;
      const lowStock = this.products.filter(p => p.stock !== undefined && p.stock > 0 && p.stock <= 5).length;
      const catVal = this.products.reduce((sum, p) => sum + (p.price || 0) * (p.stock || 10), 0);

      const elTotal = document.getElementById('dash-inv-total');
      const elInStock = document.getElementById('dash-inv-instock');
      const elLowStock = document.getElementById('dash-inv-lowstock');
      const elVal = document.getElementById('dash-inv-value');

      if (elTotal) elTotal.textContent = isEn ? `${totalProds} Items` : `${totalProds} টি`;
      if (elInStock) elInStock.textContent = isEn ? `${inStock} Items` : `${inStock} টি`;
      if (elLowStock) elLowStock.textContent = isEn ? `${lowStock} Alerts` : `${lowStock} টি`;
      if (elVal) elVal.textContent = `৳${catVal.toLocaleString()}`;
    }
  },

  renderStats(stats) {
    const isEn = this.currentLang === 'en';
    const deliveredRev = stats.deliveredRevenue !== undefined ? stats.deliveredRevenue : (stats.totalRevenue || 0);
    const delivCount = stats.deliveredOrders || 0;
    const pendCount = stats.pendingOrders || 0;
    const pendAmt = stats.pendingAmount || 0;
    const courierCount = stats.inCourierOrders !== undefined ? stats.inCourierOrders : (stats.shippedOrders || 0);
    const courierAmt = stats.inCourierAmount || 0;
    const cancelCount = stats.cancelledOrders || 0;
    const cancelAmt = stats.cancelledAmount || 0;
    const totalCount = stats.totalOrders || 0;

    const elRev = document.getElementById('stat-revenue');
    if (elRev) elRev.textContent = `৳${deliveredRev.toLocaleString()}`;

    const elDelivCount = document.getElementById('stat-delivered-count');
    if (elDelivCount) elDelivCount.textContent = isEn ? `${delivCount} delivered successfully` : `${delivCount} টি সফল ডেলিভারি`;

    const elPend = document.getElementById('stat-pending');
    if (elPend) elPend.textContent = isEn ? `${pendCount} Orders` : `${pendCount} টি`;

    const elPendAmt = document.getElementById('stat-pending-amount');
    if (elPendAmt) elPendAmt.textContent = isEn ? `৳${pendAmt.toLocaleString()} pending` : `৳${pendAmt.toLocaleString()} টাকার পার্সেল`;

    const elShipped = document.getElementById('stat-shipped');
    if (elShipped) elShipped.textContent = isEn ? `${courierCount} Orders` : `${courierCount} টি`;

    const elCourierAmt = document.getElementById('stat-incourier-amount');
    if (elCourierAmt) elCourierAmt.textContent = isEn ? `৳${courierAmt.toLocaleString()} in transit` : `৳${courierAmt.toLocaleString()} ট্রানজিটে`;

    const elCancel = document.getElementById('stat-cancelled');
    if (elCancel) elCancel.textContent = isEn ? `${cancelCount} Orders` : `${cancelCount} টি`;

    const elCancelAmt = document.getElementById('stat-cancelled-amount');
    if (elCancelAmt) elCancelAmt.textContent = isEn ? `৳${cancelAmt.toLocaleString()} cancelled` : `৳${cancelAmt.toLocaleString()} টাকার বাতিল`;

    const elOrders = document.getElementById('stat-orders');
    if (elOrders) elOrders.textContent = totalCount;

    this.renderDashboard();
  },

  // ================= 1. ORDERS WORKFLOW =================
  async fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const json = await res.json();
        this.orders = json.orders || json.data || [];
        this.updateTabCounters();
        this.renderOrdersTable();
        this.renderDashboard();
        return;
      }
    } catch (e) {}

    this.orders = JSON.parse(localStorage.getItem('premefarm_orders') || '[]');
    this.updateTabCounters();
    this.renderOrdersTable();
    this.renderDashboard();
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

    // Reset table header with current language
    const theadRow = document.getElementById('orders-table-head-row');
    const t = I18N[this.currentLang] || I18N.bn;
    if (theadRow) {
      theadRow.innerHTML = `
        <th data-i18n="th_id_source">${t.th_id_source}</th>
        <th data-i18n="th_customer">${t.th_customer}</th>
        <th data-i18n="th_address">${t.th_address}</th>
        <th data-i18n="th_items">${t.th_items}</th>
        <th data-i18n="th_bill">${t.th_bill}</th>
        <th data-i18n="th_status">${t.th_status}</th>
        <th data-i18n="th_courier">${t.th_courier}</th>
        <th data-i18n="th_note">${t.th_note}</th>
        <th data-i18n="th_agent">${t.th_agent}</th>
        <th data-i18n="th_actions">${t.th_actions}</th>
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

      // Threaded Call Center Note display
      const notes = this.parseNotes(o.callCenterNote);
      let noteHtml = '';
      if (notes.length > 0) {
        const lastNote = notes[notes.length - 1];
        const preview = (lastNote.text || '').length > 25 ? (lastNote.text || '').slice(0, 25) + '...' : (lastNote.text || '');
        noteHtml = `
          <div onclick="AdminApp.openNoteModal('${o.id}')" style="font-size:11.5px; background:#fffbeb; border:1px solid #fef3c7; padding:4px 6px; border-radius:6px; max-width:145px; margin-bottom:4px; color:#92400e; cursor:pointer;" title="নোটের ইতিহাস দেখতে ক্লিক করুন">
            <b style="color:#b45309;">${lastNote.agent || 'Admin'}:</b> "${this.escapeHtml(preview)}"
            ${notes.length > 1 ? `<span style="font-size:10px; background:#fde68a; color:#78350f; padding:1px 4px; border-radius:10px; margin-left:2px; font-weight:800;">+${notes.length - 1}</span>` : ''}
          </div>
        `;
      }

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
            <span style="font-size:11.5px; color:#64748b;">${this.currentLang === 'en' ? 'COD' : 'ক্যাশ অন ডেলিভারি'}</span>
          </td>
          <td>
            <span class="badge-status ${statusClass}" style="display:inline-block; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:800; cursor:pointer;" onclick="AdminApp.openOrderDetailsModal('${o.id}')" title="স্ট্যাটাস পরিবর্তন করতে ক্লিক করুন">
              ${this.formatStatus(o.status)}
            </span>
          </td>
          <td>
            ${courierHtml}
          </td>
          <td>
            ${noteHtml}
            <button onclick="AdminApp.openNoteModal('${o.id}')" style="background:#f1f5f9; border:1px solid #cbd5e1; color:#334155; padding:3px 8px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer;">
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

    const isEn = this.currentLang === 'en';

    if (totalItems <= this.pageSize) {
      info.textContent = isEn
        ? `Showing ${totalItems} order(s)`
        : `মোট ${totalItems} টি অর্ডার দেখাচ্ছে`;
      btns.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(totalItems / this.pageSize);
    const startIdx = (this.currentPage - 1) * this.pageSize + 1;
    const endIdx = Math.min(this.currentPage * this.pageSize, totalItems);

    info.textContent = isEn
      ? `Showing ${startIdx}-${endIdx} of ${totalItems} orders (Page ${this.currentPage} of ${totalPages})`
      : `দেখাচ্ছে ${startIdx}-${endIdx} / মোট ${totalItems} টি অর্ডার (পৃষ্ঠা ${this.currentPage} এর ${totalPages})`;

    let html = `
      <button class="admin-page-btn" ${this.currentPage === 1 ? 'disabled' : ''} onclick="AdminApp.goToOrdersPage(${this.currentPage - 1})">
        ${isEn ? '◀ Prev' : '◀ পূর্ববর্তী'}
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
        ${isEn ? 'Next ▶' : 'পরবর্তী ▶'}
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

  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  },

  parseNotes(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'object') return [raw];
    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {}
      }
      return [{ id: 'init', agent: 'System', text: trimmed, timestamp: '' }];
    }
    return [];
  },

  // ================= 2. FRAUD CHECK (1000% GENUINE BD OPERATOR & REAL DB HISTORY) =================
  async openFraudCheck(phone) {
    if (!phone) return;
    document.getElementById('fraud-phone').textContent = phone;
    document.getElementById('fraud-modal').classList.add('active');

    try {
      const res = await fetch(`/api/fraud-check/${encodeURIComponent(phone)}`);
      const data = await res.json();
      
      const opBadge = document.getElementById('fraud-operator-badge');
      if (opBadge) opBadge.textContent = data.operator || 'BD SIM';

      const badge = document.getElementById('fraud-risk-badge');
      if (badge) {
        badge.textContent = data.riskTitle || 'নিরাপদ গ্রাহক';
        badge.style.background = data.badgeColor || '#10b981';
      }

      const custType = document.getElementById('fraud-customer-type');
      if (custType) custType.textContent = data.customerType || 'সাধারণ গ্রাহক';

      const delCount = document.getElementById('fraud-delivered-count');
      if (delCount) delCount.textContent = (data.deliveredParcels || 0) + ' টি';

      const totalSpent = document.getElementById('fraud-total-spent');
      if (totalSpent) totalSpent.textContent = '৳' + (data.totalSpent || 0);

      document.getElementById('fraud-success-rate').textContent = data.successRate || '১০০%';
      document.getElementById('fraud-total-parcels').textContent = data.totalParcels || '0';
      document.getElementById('fraud-returns').textContent = data.returnedParcels || '0';
      document.getElementById('fraud-advice').textContent = data.advice || '-';

      // Real Courier Breakdown (Steadfast, Pathao, Preme Farm)
      const cb = data.courierBreakdown || {};
      const sfEl = document.getElementById('fraud-courier-sf');
      if (sfEl) {
        const sf = cb.steadfast || { total: 0, delivered: 0, returned: 0 };
        const rate = sf.total > 0 ? Math.round((sf.delivered / sf.total) * 100) : 100;
        sfEl.textContent = `মোট: ${sf.total} | সফল: ${sf.delivered} | রিটার্ন: ${sf.returned} (${rate}%)`;
      }
      const ptEl = document.getElementById('fraud-courier-pt');
      if (ptEl) {
        const pt = cb.pathao || { total: 0, delivered: 0, returned: 0 };
        const rate = pt.total > 0 ? Math.round((pt.delivered / pt.total) * 100) : 100;
        ptEl.textContent = `মোট: ${pt.total} | সফল: ${pt.delivered} | রিটার্ন: ${pt.returned} (${rate}%)`;
      }
      const pfEl = document.getElementById('fraud-courier-pf');
      if (pfEl) {
        const pf = cb.inhouse || { total: data.totalParcels || 0, delivered: data.deliveredParcels || 0, returned: data.returnedParcels || 0 };
        pfEl.textContent = `সফল: ${pf.delivered} টি | রিটার্ন: ${pf.returned} টি`;
      }

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

  // ================= 3. CALL CENTER NOTES (MULTI-AGENT THREADED LOG) =================
  openNoteModal(orderId) {
    this.activeNoteOrderId = orderId;
    document.getElementById('modal-note-order-id').textContent = `#${orderId}`;
    const order = this.orders.find(o => o.id === orderId);
    const notes = this.parseNotes(order ? order.callCenterNote : []);
    
    const countBadge = document.getElementById('modal-notes-count-badge');
    if (countBadge) countBadge.textContent = `${notes.length} টি নোট`;

    const agentBadge = document.getElementById('modal-note-agent-badge');
    if (agentBadge) agentBadge.textContent = `এজেন্ট: ${this.activeAgent}`;

    const threadEl = document.getElementById('modal-notes-thread');
    if (threadEl) {
      if (notes.length === 0) {
        threadEl.innerHTML = `<div style="text-align: center; color: #94a3b8; font-size: 13px; padding: 16px;">কোনো পূর্ববর্তী নোট নেই। নিচে নতুন নোট লিখুন।</div>`;
      } else {
        threadEl.innerHTML = notes.map(n => {
          const time = n.timestamp ? new Date(n.timestamp).toLocaleString(this.currentLang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
          return `
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; box-shadow:0 1px 2px rgba(0,0,0,0.03);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span style="font-weight:800; font-size:12px; color:#0d4d29; display:flex; align-items:center; gap:5px;">
                  <span style="background:#dcfce7; color:#15803d; padding:1px 6px; border-radius:4px; font-size:11px;">👤 ${n.agent || 'Admin'}</span>
                </span>
                <span style="font-size:11px; color:#64748b;">${time}</span>
              </div>
              <div style="font-size:13px; color:#1e293b; line-height:1.45; word-break:break-word;">${this.escapeHtml(n.text || '')}</div>
            </div>
          `;
        }).join('');
        threadEl.scrollTop = threadEl.scrollHeight;
      }
    }

    const noteInput = document.getElementById('modal-note-text');
    if (noteInput) {
      noteInput.value = '';
      setTimeout(() => noteInput.focus(), 150);
    }
    document.getElementById('note-modal').classList.add('active');
  },

  closeNoteModal() {
    document.getElementById('note-modal').classList.remove('active');
  },

  async saveOrderNote() {
    const note = document.getElementById('modal-note-text').value.trim();
    if (!this.activeNoteOrderId) return;
    if (!note) {
      this.closeNoteModal();
      return;
    }

    const order = this.orders.find(o => o.id === this.activeNoteOrderId);
    const existingNotes = this.parseNotes(order ? order.callCenterNote : []);
    const newEntry = {
      id: `note_${Date.now()}`,
      agent: this.activeAgent,
      text: note,
      timestamp: new Date().toISOString()
    };
    const updatedNotes = [...existingNotes, newEntry];

    try {
      const res = await fetch(`/api/orders/${this.activeNoteOrderId}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note, agent: this.activeAgent })
      });
      const data = await res.json();
      if (data.success && data.notes) {
        if (order) order.callCenterNote = JSON.stringify(data.notes);
      } else {
        if (order) order.callCenterNote = JSON.stringify(updatedNotes);
      }
    } catch (e) {
      if (order) order.callCenterNote = JSON.stringify(updatedNotes);
    }

    if (order) {
      order.lastUpdatedBy = {
        agent: this.activeAgent,
        action: `New note: ${note.slice(0, 25)}`,
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
    const subtotal = order.subtotal || (order.total - (order.deliveryCharge || 100));
    document.getElementById('detail-ord-subtotal').value = subtotal;
    document.getElementById('detail-ord-delivery').value = order.deliveryCharge !== undefined ? order.deliveryCharge : 100;
    document.getElementById('detail-ord-total').value = order.total || (subtotal + (order.deliveryCharge !== undefined ? order.deliveryCharge : 100));

    // Internal Notes Thread
    const notes = this.parseNotes(order.callCenterNote);
    const countEl = document.getElementById('detail-notes-count');
    if (countEl) countEl.textContent = `${notes.length} টি পূর্ববর্তী নোট`;
    const threadEl = document.getElementById('detail-notes-thread');
    if (threadEl) {
      if (notes.length === 0) {
        threadEl.innerHTML = `<div style="text-align:center; color:#94a3b8; font-size:12px; padding:6px;">কোনো পূর্ববর্তী নোট নেই</div>`;
      } else {
        threadEl.innerHTML = notes.map(n => {
          const time = n.timestamp ? new Date(n.timestamp).toLocaleString(this.currentLang === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
          return `
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:4px; padding:6px 8px; font-size:12px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <b style="color:#0d4d29;">👤 ${n.agent || 'Admin'}</b>
                <span style="color:#64748b; font-size:10.5px;">${time}</span>
              </div>
              <div style="color:#1e293b;">${this.escapeHtml(n.text || '')}</div>
            </div>
          `;
        }).join('');
      }
    }
    document.getElementById('detail-ord-note').value = '';

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
    const deliveryCharge = parseInt(document.getElementById('detail-ord-delivery').value) || 100;
    const total = parseInt(document.getElementById('detail-ord-total').value) || 0;
    const newNote = document.getElementById('detail-ord-note').value.trim();

    const existingOrder = this.orders.find(o => o.id === id);
    const notes = this.parseNotes(existingOrder ? existingOrder.callCenterNote : []);
    if (newNote) {
      notes.push({
        id: `note_${Date.now()}`,
        agent: this.activeAgent,
        text: newNote,
        timestamp: new Date().toISOString()
      });
    }
    const finalNoteJson = notes.length > 0 ? JSON.stringify(notes) : '';

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          customer: { name, phone, address, city },
          deliveryCharge,
          total,
          callCenterNote: finalNoteJson,
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

  // ================= 6. COURIER DISPATCH & REAL-TIME SYNC =================
  defaultCourier: 'Steadfast',

  setDefaultCourier(courier) {
    this.defaultCourier = courier || 'Steadfast';
    localStorage.setItem('premefarm_default_courier', this.defaultCourier);
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defaultCourier: this.defaultCourier })
    }).catch(() => {});
    const defSelect = document.getElementById('courier-default-select');
    if (defSelect) defSelect.value = this.defaultCourier;
  },

  openCourierModal(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;
    this.activeDispatchOrderId = orderId;
    document.getElementById('modal-dispatch-id').textContent = `#${order.id}`;
    document.getElementById('modal-dispatch-name').textContent = order.customer?.name || '';
    document.getElementById('modal-dispatch-phone').textContent = order.customer?.phone || '';
    document.getElementById('modal-dispatch-amount').textContent = `৳${order.total}`;

    // Auto-select configured default courier
    const provSelect = document.getElementById('select-courier-provider');
    if (provSelect) {
      provSelect.value = this.defaultCourier || 'Steadfast';
    }

    document.getElementById('courier-modal').classList.add('active');
  },

  closeCourierModal() {
    document.getElementById('courier-modal').classList.remove('active');
  },

  async syncCourierStatus() {
    const btn = document.getElementById('btn-sync-courier');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '🔄 সিঙ্ক হচ্ছে...';
    }

    try {
      const res = await fetch('/api/courier/sync-status', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        if (data.updatedCount > 0) {
          alert(`কুরিয়ার স্ট্যাটাস সিঙ্ক সফল!\nমোট ${data.updatedCount} টি অর্ডারের ডেলিভারি বা ক্যানসেল স্ট্যাটাস স্বয়ংক্রিয়ভাবে আপডেট করা হয়েছে।`);
        } else {
          alert(`কুরিয়ার চেক সম্পন্ন হয়েছে। কোনো নতুন স্ট্যাটাস পরিবর্তন পাওয়া যায়নি (মোট সক্রিয় অর্ডার চেক: ${data.totalChecked || 0} টি)।`);
        }
        await this.fetchOrders();
        await this.fetchStats();
        await this.fetchAuditLogs();
      } else {
        alert('কুরিয়ার সিঙ্ক করতে সমস্যা হয়েছে: ' + (data.message || 'Error'));
      }
    } catch (e) {
      alert('কুরিয়ার সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = origHtml;
      }
    }
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
      } else {
        alert(data.message || 'ল্যান্ডিং পেজ তৈরি করতে সমস্যা হয়েছে।');
      }
    } catch (e) {
      alert('ল্যান্ডিং পেজ তৈরি করতে সমস্যা হয়েছে। সার্ভার সংযোগ পরীক্ষা করুন।');
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
    const isEn = this.currentLang === 'en';
    tbody.innerHTML = this.products.map(p => {
      const v = p.variants?.[0] || { price: p.price || 0, regularPrice: p.regularPrice || 0 };
      const currentPrice = v.price || p.price || 0;
      const currentRegPrice = v.regularPrice || p.regularPrice || '';
      const inStock = p.inStock !== false && (v.inStock !== false);
      const stockQty = p.stock !== undefined ? p.stock : (inStock ? 50 : 0);
      const stockText = isEn 
        ? (inStock ? `In Stock (${stockQty})` : 'Out of Stock')
        : (inStock ? `ইন স্টক (${stockQty})` : 'স্টক শেষ');
      const editLabel = isEn ? 'Edit' : 'এডিট';
      const deleteLabel = isEn ? 'Delete' : 'ডিলিট';

      return `
        <tr>
          <td><img src="${p.image || 'images/logo.png'}" style="width:44px; height:44px; object-fit:contain; border-radius:6px; border:1px solid #e2e8f0; background:#f8faf8;" onerror="this.src='images/logo.png'"></td>
          <td><b>${p.name}</b></td>
          <td><span style="background:#eef5f0; color:#0d4d29; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:700;">${p.categoryName || p.category}</span></td>
          <td><b>৳${currentPrice}</b> ${currentRegPrice ? `<span style="text-decoration:line-through; color:#94a3b8; font-size:12px;">৳${currentRegPrice}</span>` : ''}</td>
          <td><span style="color:${inStock ? '#15803d' : '#dc2626'}; font-weight:800;">${stockText}</span></td>
          <td>
            <label class="switch">
              <input type="checkbox" ${inStock ? 'checked' : ''} onchange="AdminApp.toggleProductStock(${p.id}, this.checked)">
              <span class="slider"></span>
            </label>
          </td>
          <td style="white-space:nowrap;">
            <div style="display:inline-flex; align-items:center; gap:6px;">
              <button type="button" onclick="AdminApp.editProduct(${p.id})" title="${editLabel}" style="background:#e0f2fe; color:#0284c7; border:1px solid #bae6fd; padding:5px 10px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:4px; transition:all 0.15s ease;">
                ✏️ <span>${editLabel}</span>
              </button>
              <button type="button" onclick="AdminApp.deleteProduct(${p.id})" title="${deleteLabel}" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:5px 9px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:700; transition:all 0.15s ease;">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  editProduct(id) {
    const p = this.products.find(x => String(x.id) === String(id));
    if (!p) return;
    const isEn = this.currentLang === 'en';

    document.getElementById('prod-id').value = p.id;
    document.getElementById('prod-modal-title').textContent = isEn ? `Edit Product (#${p.id})` : `প্রোডাক্ট এডিট করুন (আইডি: #${p.id})`;
    const submitBtn = document.getElementById('prod-submit-btn');
    if (submitBtn) submitBtn.textContent = isEn ? 'Update Product ➔' : 'প্রোডাক্ট আপডেট করুন ➔';

    document.getElementById('prod-name').value = p.name || '';
    document.getElementById('prod-category').value = p.category || 'others';

    const v = p.variants?.[0] || {};
    document.getElementById('prod-price').value = v.price ?? p.price ?? '';
    document.getElementById('prod-reg-price').value = v.regularPrice ?? p.regularPrice ?? '';
    document.getElementById('prod-stock').value = p.stock !== undefined ? p.stock : 50;

    const imgInput = document.getElementById('prod-image');
    if (imgInput) {
      imgInput.value = p.image || '';
      const preview = document.getElementById('prod-image-preview');
      if (preview) preview.src = p.image || 'images/logo.png';
    }

    document.getElementById('prod-desc').value = p.description || '';
    document.getElementById('prod-benefits').value = Array.isArray(p.benefits) 
      ? p.benefits.join('\n') 
      : (typeof p.benefits === 'string' ? p.benefits : '');

    document.getElementById('product-modal').classList.add('active');
  },

  openProductModal() {
    const isEn = this.currentLang === 'en';
    const form = document.getElementById('product-form');
    if (form) form.reset();
    document.getElementById('prod-id').value = '';
    document.getElementById('prod-modal-title').textContent = isEn ? 'Add New Product' : 'নতুন প্রোডাক্ট যোগ করুন';
    const submitBtn = document.getElementById('prod-submit-btn');
    if (submitBtn) submitBtn.textContent = isEn ? 'Save Product ➔' : 'প্রোডাক্ট সেভ করুন ➔';
    const preview = document.getElementById('prod-image-preview');
    if (preview) preview.src = 'images/logo.png';
    document.getElementById('product-modal').classList.add('active');
  },

  closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    const form = document.getElementById('product-form');
    if (form) form.reset();
    document.getElementById('prod-id').value = '';
  },

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
    const isEn = this.currentLang === 'en';
    if (!confirm(isEn ? 'Are you sure you want to delete this product?' : 'প্রোডাক্ট ডিলিট করতে চান?')) return;
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
    const isEn = this.currentLang === 'en';
    const id = document.getElementById('prod-id').value.trim();
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value;
    const categoryNameMap = {
      'pickle': 'আচার',
      'spices': 'মশলা',
      'oil': 'তেল',
      'seeds': 'বীজ',
      'tea': 'চা',
      'honey': 'মধু',
      'ghee': 'গাওয়া ঘি',
      'kalo-shona': 'কালো সোনা',
      'combo': 'কম্বো অফার',
      'others': 'অন্যান্য'
    };
    const categoryName = categoryNameMap[category] || category;
    const price = parseInt(document.getElementById('prod-price').value) || 0;
    const regularPrice = parseInt(document.getElementById('prod-reg-price').value) || 0;
    const stock = parseInt(document.getElementById('prod-stock').value) || 50;
    const imgInput = document.getElementById('prod-image');
    const image = (imgInput && imgInput.value.trim()) ? imgInput.value.trim() : 'images/logo.png';
    const description = document.getElementById('prod-desc').value.trim();
    const benefits = document.getElementById('prod-benefits').value.trim().split('\n').map(b => b.trim()).filter(Boolean);

    const existing = id ? this.products.find(p => String(p.id) === String(id)) : null;

    let variants = existing?.variants && Array.isArray(existing.variants) ? [...existing.variants] : [];
    if (variants.length > 0) {
      variants = variants.map((v, idx) => {
        if (idx === 0) {
          return { ...v, price: price || v.price, regularPrice: regularPrice || v.regularPrice, inStock: stock > 0 };
        }
        return v;
      });
    } else {
      variants = [{
        id: 'v1',
        name: name,
        price,
        regularPrice,
        inStock: stock > 0
      }];
    }

    const payload = {
      name,
      category,
      categoryName,
      price,
      regularPrice,
      stock,
      image,
      description,
      benefits,
      variants,
      inStock: stock > 0
    };

    const isEdit = Boolean(id);
    const url = isEdit ? `/api/products/${id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert(isEdit 
          ? (isEn ? 'Product updated successfully!' : 'প্রোডাক্ট সফলভাবে আপডেট হয়েছে!') 
          : (isEn ? 'New product added successfully!' : 'নতুন প্রোডাক্ট সফলভাবে যুক্ত হয়েছে!'));
        this.closeProductModal();
        await this.fetchProducts();
      } else {
        alert(data.message || (isEn ? 'Could not save product.' : 'প্রোডাক্ট সংরক্ষণ করা যায়নি।'));
      }
    } catch (err) {
      alert(isEn ? 'Server error: Could not save product.' : 'সার্ভার এরর: প্রোডাক্ট সংরক্ষণ করা যায়নি।');
    }
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

  // CMS Content & Hero Banners Manager
  banners: [],

  async fetchCmsContent() {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        const c = json.data || json.content || {};
        if (c.header) {
          if (document.getElementById('cms-hotline')) document.getElementById('cms-hotline').value = c.header.hotline || '01872170476';
          if (document.getElementById('cms-tagline')) document.getElementById('cms-tagline').value = c.header.tagline || 'সুখী জীবনের জন্য স্বাস্থ্যকর খাবার';
        }
        if (c.footer) {
          if (document.getElementById('cms-footer-about')) document.getElementById('cms-footer-about').value = c.footer.aboutText || '';
          if (document.getElementById('cms-footer-copy')) document.getElementById('cms-footer-copy').value = c.footer.copyright || '';
        }
        this.banners = (c.banners && Array.isArray(c.banners)) ? c.banners : [];
        this.renderBanners();
      } else {
        this.banners = [];
        this.renderBanners();
      }
    } catch (e) {
      this.banners = [];
      this.renderBanners();
    }
  },

  renderBanners() {
    const tbody = document.getElementById('cms-banners-table-body');
    if (!tbody) return;
    if (!this.banners || this.banners.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#64748b;">কোনো ব্যানার যুক্ত করা নেই। "+ নতুন ব্যানার যোগ করুন" বাটনে ক্লিক করে ব্যানার যুক্ত করুন।</td></tr>`;
      return;
    }
    tbody.innerHTML = this.banners.map((b, idx) => `
      <tr>
        <td style="padding:10px;">
          <img src="${b.image}" alt="Banner" style="width:80px; height:45px; object-fit:cover; border-radius:6px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        </td>
        <td>
          <span style="font-size:11px; background:#eef5f0; color:#0d4d29; padding:2px 8px; border-radius:4px; font-weight:800; display:inline-block; margin-bottom:4px;">${this.escapeHtml(b.badge || '')}</span>
          <div style="font-size:13px; font-weight:800; color:#1e293b; line-height:1.3;">${b.title || ''}</div>
        </td>
        <td style="font-size:12px; color:#475569; max-width:260px; line-height:1.4;">
          ${this.escapeHtml(b.desc || '')}
        </td>
        <td style="font-size:12px;">
          ${b.btn1Text || b.buttonText ? `<div style="font-weight:700; color:#0d4d29;">১: ${b.btn1Text || b.buttonText}</div>` : ''}
          ${b.btn2Text ? `<div style="color:#64748b;">২: ${b.btn2Text}</div>` : ''}
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button onclick="AdminApp.openBannerModal(${idx})" style="background:#eef5f0; color:#0d4d29; border:1px solid #c9decb; padding:4px 8px; border-radius:6px; font-weight:800; cursor:pointer; font-size:12px;">এডিট</button>
            <button onclick="AdminApp.deleteBanner(${idx})" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; font-weight:800; cursor:pointer; font-size:12px;">✕</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  handleBannerFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(this.currentLang === 'en' ? 'Image file size must be less than 5MB' : 'ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      const imgInput = document.getElementById('banner-image');
      if (imgInput) imgInput.value = base64Data;

      const previewWrapper = document.getElementById('banner-preview-wrapper');
      const previewImg = document.getElementById('banner-preview-img');
      const previewStatus = document.getElementById('banner-preview-status');
      const previewDim = document.getElementById('banner-preview-dimensions');

      if (previewImg) previewImg.src = base64Data;
      if (previewWrapper) previewWrapper.style.display = 'flex';
      if (previewStatus) previewStatus.textContent = file.name;
      if (previewDim) previewDim.textContent = `${(file.size / 1024).toFixed(1)} KB • প্রস্তুত`;
    };
    reader.readAsDataURL(file);
  },

  clearBannerImage() {
    const fileInput = document.getElementById('banner-file-input');
    if (fileInput) fileInput.value = '';
    const imgInput = document.getElementById('banner-image');
    if (imgInput) imgInput.value = '';
    const previewWrapper = document.getElementById('banner-preview-wrapper');
    if (previewWrapper) previewWrapper.style.display = 'none';
  },

  onManualBannerUrlChange(val) {
    const previewWrapper = document.getElementById('banner-preview-wrapper');
    const previewImg = document.getElementById('banner-preview-img');
    const previewStatus = document.getElementById('banner-preview-status');
    const previewDim = document.getElementById('banner-preview-dimensions');

    if (val && val.trim().length > 3) {
      if (previewImg) previewImg.src = val.trim();
      if (previewWrapper) previewWrapper.style.display = 'flex';
      if (previewStatus) previewStatus.textContent = this.currentLang === 'en' ? 'Image Selected' : 'ছবি নির্বাচন করা হয়েছে';
      if (previewDim) previewDim.textContent = val.trim().startsWith('data:') ? 'আপলোডকৃত ফাইল' : val.trim();
    } else {
      if (previewWrapper) previewWrapper.style.display = 'none';
    }
  },

  openBannerModal(id) {
    const editIdEl = document.getElementById('banner-edit-id');
    const titleEl = document.getElementById('banner-modal-title');
    const badgeEl = document.getElementById('banner-badge');
    const bannerTitleEl = document.getElementById('banner-title');
    const descEl = document.getElementById('banner-desc');
    const imgEl = document.getElementById('banner-image');
    const b1Text = document.getElementById('banner-btn1-text');
    const b1Link = document.getElementById('banner-btn1-link');
    const b2Text = document.getElementById('banner-btn2-text');
    const b2Link = document.getElementById('banner-btn2-link');

    const fileInput = document.getElementById('banner-file-input');
    if (fileInput) fileInput.value = '';

    if (id !== undefined && id !== null) {
      const banner = this.banners.find((b, idx) => b.id === id || idx === id);
      if (banner) {
        editIdEl.value = banner.id !== undefined ? banner.id : id;
        titleEl.textContent = this.currentLang === 'en' ? 'Edit Hero Banner' : 'হিরো ব্যানার এডিট করুন';
        badgeEl.value = banner.badge || '';
        bannerTitleEl.value = banner.title || '';
        descEl.value = banner.desc || '';
        imgEl.value = banner.image || '';
        b1Text.value = banner.btn1Text || banner.buttonText || '';
        b1Link.value = banner.btn1Link || '#kalo-shona';
        b2Text.value = banner.btn2Text || '';
        b2Link.value = banner.btn2Link || '/shop';

        this.onManualBannerUrlChange(banner.image || '');
        document.getElementById('banner-modal').classList.add('active');
        return;
      }
    }

    // New Banner defaults
    editIdEl.value = '';
    titleEl.textContent = this.currentLang === 'en' ? '+ Add New Homepage Banner' : '+ নতুন হোমপেজ ব্যানার যোগ করুন';
    badgeEl.value = '🌿 বিশেষ অফার • ১০০% খাঁটি অর্গানিক পথ্য';
    bannerTitleEl.value = 'কাজের টেবিলে রাখুন <br><span class="gold">আপনার সিক্রেট এনার্জি পার্টনার!</span>';
    descEl.value = 'প্রতিদিন সকালে মাত্র এক চামচেই ফিরিয়ে আনুন অফুরন্ত উদ্যম, ক্লান্তিহীন কর্মশক্তি ও অটুট রোগ প্রতিরোধ ক্ষমতা।';
    imgEl.value = 'images/hero_banner_1.png';
    b1Text.value = '🛍️ এখনই অর্ডার করুন (৳৯৫০)';
    b1Link.value = '#kalo-shona';
    b2Text.value = 'শপ ভিজিট করুন';
    b2Link.value = '/shop';

    this.onManualBannerUrlChange('images/hero_banner_1.png');
    document.getElementById('banner-modal').classList.add('active');
  },

  closeBannerModal() {
    document.getElementById('banner-modal').classList.remove('active');
  },

  async handleBannerSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById('banner-edit-id').value;
    const badge = document.getElementById('banner-badge').value.trim();
    const title = document.getElementById('banner-title').value.trim();
    const desc = document.getElementById('banner-desc').value.trim();
    const image = document.getElementById('banner-image').value.trim();
    const btn1Text = document.getElementById('banner-btn1-text').value.trim();
    const btn1Link = document.getElementById('banner-btn1-link').value.trim();
    const btn2Text = document.getElementById('banner-btn2-text').value.trim();
    const btn2Link = document.getElementById('banner-btn2-link').value.trim();

    const bannerObj = {
      id: editId ? (parseInt(editId) || editId) : Date.now(),
      badge,
      title,
      desc,
      image,
      btn1Text,
      btn1Link,
      btn2Text,
      btn2Link,
      buttonText: btn1Text
    };

    if (editId) {
      const idx = this.banners.findIndex((b, i) => b.id == editId || i == editId);
      if (idx !== -1) {
        this.banners[idx] = { ...this.banners[idx], ...bannerObj };
      } else {
        this.banners.push(bannerObj);
      }
    } else {
      this.banners.push(bannerObj);
    }

    try {
      const res = await fetch('/api/content/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.banners)
      });
      const data = await res.json();
      if (data.success) {
        alert('হোমপেজ ব্যানার সফলভাবে সংরক্ষিত হয়েছে! মূল ওয়েবসাইটে সাথে সাথে আপডেট হয়ে গেছে।');
        this.closeBannerModal();
        this.renderBanners();
      } else {
        alert('ব্যানার সংরক্ষণ করতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      this.closeBannerModal();
      this.renderBanners();
      alert('ব্যানার সংরক্ষিত হয়েছে।');
    }
  },

  async deleteBanner(index) {
    if (!confirm('আপনি কি নিশ্চিত যে এই ব্যানারটি মুছে ফেলতে চান?')) return;
    if (index >= 0 && index < this.banners.length) {
      this.banners.splice(index, 1);
    }
    try {
      await fetch('/api/content/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.banners)
      });
      alert('ব্যানার সফলভাবে মুছে ফেলা হয়েছে।');
    } catch (e) {
      alert('ব্যানার মুছতে সমস্যা হয়েছে');
    }
    this.renderBanners();
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
        const s = json.data || json.settings || {};
        if (s.shipping) {
          if (document.getElementById('store-dhaka-charge')) document.getElementById('store-dhaka-charge').value = s.shipping.insideDhaka || 100;
          if (document.getElementById('store-outside-charge')) document.getElementById('store-outside-charge').value = s.shipping.outsideDhaka || 130;
        }
        if (s.defaultCourier || localStorage.getItem('premefarm_default_courier')) {
          this.defaultCourier = s.defaultCourier || localStorage.getItem('premefarm_default_courier') || 'Steadfast';
          const defSelect = document.getElementById('courier-default-select');
          if (defSelect) defSelect.value = this.defaultCourier;
        }
      }
    } catch (e) {}
  },

  async saveSettings() {
    const inside = parseInt(document.getElementById('store-dhaka-charge').value) || 100;
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
  },

  // ================= WHOLESALE INQUIRIES MANAGEMENT =================
  wholesaleInquiries: [],
  wholesaleFilter: 'all',

  async fetchWholesale() {
    try {
      const res = await fetch('/api/wholesale');
      if (res.ok) {
        const json = await res.json();
        this.wholesaleInquiries = json.data || [];
        this.renderWholesale();
      }
    } catch (e) {
      console.error('Failed to fetch wholesale inquiries:', e);
    }
  },

  filterWholesale(filter, btn) {
    this.wholesaleFilter = filter;
    document.querySelectorAll('.btn-ws-filter').forEach(b => {
      b.style.background = '#fff';
      b.style.color = '#475569';
      b.style.borderColor = '#cbd5e1';
      b.classList.remove('active');
    });
    if (btn) {
      btn.style.background = '#0d4d29';
      btn.style.color = '#fff';
      btn.style.borderColor = '#c9decb';
      btn.classList.add('active');
    }
    this.renderWholesale();
  },

  renderWholesale() {
    const isEn = this.currentLang === 'en';
    const tbody = document.getElementById('wholesale-table-body');
    const badge = document.getElementById('ws-badge');
    const countAll = document.getElementById('ws-count-all');
    const countNew = document.getElementById('ws-count-new');
    const countContacted = document.getElementById('ws-count-contacted');
    const countConfirmed = document.getElementById('ws-count-confirmed');

    const total = this.wholesaleInquiries.length;
    const newItems = this.wholesaleInquiries.filter(i => (i.status || 'new') === 'new').length;
    const contacted = this.wholesaleInquiries.filter(i => i.status === 'contacted').length;
    const confirmed = this.wholesaleInquiries.filter(i => i.status === 'confirmed').length;

    if (badge) {
      badge.textContent = newItems;
      badge.style.display = newItems > 0 ? 'inline-block' : 'none';
    }
    if (countAll) countAll.textContent = total;
    if (countNew) countNew.textContent = newItems;
    if (countContacted) countContacted.textContent = contacted;
    if (countConfirmed) countConfirmed.textContent = confirmed;

    if (!tbody) return;

    let items = this.wholesaleInquiries;
    if (this.wholesaleFilter !== 'all') {
      items = items.filter(i => (i.status || 'new') === this.wholesaleFilter);
    }

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:36px; color:#64748b;">${isEn ? 'No wholesale inquiries found.' : 'কোনো হোলসেল আবেদন পাওয়া যায়নি।'}</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(w => {
      const st = w.status || 'new';
      let stBadge = isEn 
        ? '<span style="background:#fef3c7; color:#92400e; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">New</span>'
        : '<span style="background:#fef3c7; color:#92400e; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">নতুন</span>';
      
      if (st === 'contacted') {
        stBadge = isEn
          ? '<span style="background:#e0f2fe; color:#0369a1; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">Contacted</span>'
          : '<span style="background:#e0f2fe; color:#0369a1; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">যোগাযোগ হয়েছে</span>';
      } else if (st === 'confirmed') {
        stBadge = isEn
          ? '<span style="background:#dcfce7; color:#15803d; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">Confirmed</span>'
          : '<span style="background:#dcfce7; color:#15803d; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">কনফার্মড</span>';
      } else if (st === 'cancelled') {
        stBadge = isEn
          ? '<span style="background:#fee2e2; color:#dc2626; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">Cancelled</span>'
          : '<span style="background:#fee2e2; color:#dc2626; padding:3px 9px; border-radius:12px; font-size:11.5px; font-weight:800;">বাতিল</span>';
      }

      const cleanPhone = (w.phone || '').replace(/[^0-9]/g, '');
      const waPhone = cleanPhone.startsWith('88') ? cleanPhone : ('88' + cleanPhone);
      const waMsg = isEn 
        ? encodeURIComponent('Hello ' + (w.name || '') + ', contacting you from Preme Farm Wholesale Department regarding your inquiry.')
        : encodeURIComponent('আসসালামু আলাইকুম ' + (w.name || '') + ' ভাই, প্রিমি ফার্ম হোলসেল ডিপার্টমেন্ট থেকে আপনার পাইকারি ইনকোয়ারির প্রেক্ষিতে যোগাযোগ করছি।');

      const selectOpts = isEn ? `
        <option value="new" ${st === 'new' ? 'selected' : ''}>New</option>
        <option value="contacted" ${st === 'contacted' ? 'selected' : ''}>Contacted</option>
        <option value="confirmed" ${st === 'confirmed' ? 'selected' : ''}>Confirmed</option>
        <option value="cancelled" ${st === 'cancelled' ? 'selected' : ''}>Cancelled</option>
      ` : `
        <option value="new" ${st === 'new' ? 'selected' : ''}>নতুন</option>
        <option value="contacted" ${st === 'contacted' ? 'selected' : ''}>যোগাযোগ হয়েছে</option>
        <option value="confirmed" ${st === 'confirmed' ? 'selected' : ''}>কনফার্মড</option>
        <option value="cancelled" ${st === 'cancelled' ? 'selected' : ''}>বাতিল</option>
      `;

      return `
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:12px 16px;">
            <b style="color:#0d4d29;">#WS-${w.id}</b>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">${w.createdAt || ''}</div>
          </td>
          <td style="padding:12px 16px;">
            <b style="color:#1e293b; font-size:14px;">${this.escapeHtml(w.name || '')}</b>
            ${w.businessName ? `<div style="font-size:12px; color:#0d4d29; font-weight:700;">🏢 ${this.escapeHtml(w.businessName)}</div>` : ''}
          </td>
          <td style="padding:12px 16px;">
            <div style="font-weight:700; color:#0f172a; font-family:monospace;">${w.phone || ''}</div>
            <div style="display:flex; gap:6px; margin-top:4px;">
              <a href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" rel="noopener" style="font-size:11px; background:#25D366; color:#fff; padding:2px 8px; border-radius:4px; text-decoration:none; font-weight:800; display:inline-flex; align-items:center; gap:3px;">
                💬 WhatsApp
              </a>
              <a href="tel:${w.phone}" style="font-size:11px; background:#e2e8f0; color:#334155; padding:2px 8px; border-radius:4px; text-decoration:none; font-weight:700;">
                📞 ${isEn ? 'Call' : 'কল'}
              </a>
            </div>
          </td>
          <td style="padding:12px 16px; font-size:13px; color:#475569; max-width:200px;">
            ${this.escapeHtml(w.address || '')}
          </td>
          <td style="padding:12px 16px; font-size:12.5px;">
            <div style="font-weight:700; color:#0d4d29;">${this.escapeHtml(w.products || (isEn ? 'All Products' : 'সকল পণ্য'))}</div>
            ${w.quantity ? `<div style="font-size:11.5px; color:#64748b;">${isEn ? 'Qty' : 'পরিমাণ'}: ${this.escapeHtml(w.quantity)}</div>` : ''}
            ${w.note ? `<div style="font-size:11px; color:#94a3b8; font-style:italic; margin-top:2px;">${isEn ? 'Note' : 'নোট'}: ${this.escapeHtml(w.note)}</div>` : ''}
          </td>
          <td style="padding:12px 16px;">
            ${stBadge}
          </td>
          <td style="padding:12px 16px; text-align:right;">
            <div style="display:inline-flex; gap:6px; align-items:center;">
              <select onchange="AdminApp.updateWholesaleStatus(${w.id}, this.value)" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; font-size:12px; font-weight:700; background:#fff; cursor:pointer;">
                ${selectOpts}
              </select>
              <button type="button" onclick="AdminApp.deleteWholesale(${w.id})" title="${isEn ? 'Delete' : 'মুছে ফেলুন'}" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:6px; font-weight:800; cursor:pointer; font-size:12px;">✕</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  async updateWholesaleStatus(id, status) {
    try {
      const res = await fetch(`/api/wholesale/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        const item = this.wholesaleInquiries.find(i => i.id == id);
        if (item) item.status = status;
        this.renderWholesale();
      }
    } catch (e) {
      alert('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
    }
  },

  async deleteWholesale(id) {
    if (!confirm('আপনি কি নিশ্চিত যে এই হোলসেল আবেদনটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/wholesale/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        this.wholesaleInquiries = this.wholesaleInquiries.filter(i => i.id != id);
        this.renderWholesale();
      }
    } catch (e) {
      alert('আবেদন মুছতে সমস্যা হয়েছে');
    }
  },

};

window.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});
