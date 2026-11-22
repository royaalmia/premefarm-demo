<?php
/**
 * Preme Farm - Olive Combo Order Processing Script (cPanel Native)
 * Dual Action:
 * 1. Safely logs orders locally into orders.csv and orders.json (Instant fail-safe)
 * 2. Real-time forward to Bizmation Create Order API (https://api.bizmation.io/api/orders/store)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// =========================================================================
// ⚙️ BIZMATION CONFIGURATION (বিজমেশনের টোকেন ও ইনভেন্টরি আইডি এখানে বসান)
// =========================================================================
define('BIZMATION_API_URL', 'https://api.bizmation.io/api/orders/store');
define('BIZMATION_ACCESS_TOKEN', 'YOUR_BIZMATION_API_ACCESS_TOKEN'); // Replace with your actual Bearer token
define('BIZMATION_INVENTORY_ID', 12345); // Replace with your actual numeric Bizmation User/Inventory ID

$orders_json_file = __DIR__ . '/orders.json';
$orders_csv_file = __DIR__ . '/orders.csv';

// Admin view access
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    $action = $_GET['action'];
    $secret = isset($_GET['key']) ? $_GET['key'] : '';

    if ($secret !== 'preme2026' && $secret !== 'admin') {
        echo json_encode(['success' => false, 'error' => 'Unauthorized access']);
        exit;
    }

    if ($action === 'list_json' && file_exists($orders_json_file)) {
        echo file_get_contents($orders_json_file);
        exit;
    }

    echo json_encode([
        'success' => true,
        'total_orders' => file_exists($orders_json_file) ? count(json_decode(file_get_contents($orders_json_file), true) ?: []) : 0
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read raw JSON or form-data
    $raw_input = file_get_contents('php://input');
    $data = json_decode($raw_input, true);

    if (!$data) {
        $data = $_POST;
    }

    $name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
    $phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : (isset($data['mobile_number']) ? trim(strip_tags($data['mobile_number'])) : '');
    $address = isset($data['address']) ? trim(strip_tags($data['address'])) : '';
    $delivery_area = isset($data['delivery_area']) ? trim(strip_tags($data['delivery_area'])) : 'inside_dhaka';
    $quantity = isset($data['quantity']) ? intval($data['quantity']) : 1;
    $notes = isset($data['notes']) ? trim(strip_tags($data['notes'])) : 'Facebook Ads 1KG Olive Combo Offer';
    $uu_id = isset($data['uu_id']) ? trim(strip_tags($data['uu_id'])) : ('pf_' . uniqid() . '_' . bin2hex(random_bytes(4)));
    $page_url = isset($data['url']) ? trim(strip_tags($data['url'])) : ($_SERVER['HTTP_REFERER'] ?? 'https://premefarm.com');

    // Clean phone number format for Bangladesh (01XXXXXXXXX)
    $clean_phone = preg_replace('/[^0-9]/', '', $phone);
    if (strlen($clean_phone) === 13 && substr($clean_phone, 0, 2) === '88') {
        $clean_phone = substr($clean_phone, 2);
    }

    if (empty($name) || empty($clean_phone) || empty($address)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দেওয়া আবশ্যক।']);
        exit;
    }

    $item_price = 790;
    $delivery_charge = ($delivery_area === 'outside_dhaka' || (isset($data['delivery_charge']) && intval($data['delivery_charge']) === 100)) ? 100 : 80;
    $total_price = ($item_price * $quantity) + $delivery_charge;
    $order_id = 'PF-OLV-' . strtoupper(substr(uniqid(), -6));
    $timestamp = date('Y-m-d H:i:s');
    $date_only = date('Y-m-d');
    $time_only = date('h:i A');

    $user_ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Mozilla/5.0';

    // 1. Build Bizmation Official Payload
    $bizmation_payload = [
        'uu_id' => $uu_id,
        'name' => $name,
        'address' => $address,
        'mobile_number' => $clean_phone,
        'delivery_charge' => $delivery_charge,
        'discount' => 0,
        'check_duplicate_order' => 'No',
        'user_ip' => $user_ip,
        'user_agent' => $user_agent,
        'inventory_id' => BIZMATION_INVENTORY_ID,
        'note' => $notes,
        'url' => $page_url,
        'order_items' => [
            [
                'type' => 'Title',
                'product_title' => '১ কেজি প্রিমিয়াম জলপাই আচার কম্বো (অলিভ জামুন ৫০০ গ্রাম + বার্মিজ জলপাই ৫০০ গ্রাম)',
                'price' => $item_price,
                'quantity' => $quantity,
                'attributes' => 'Weight::1KG,,Pack::Combo,,'
            ]
        ]
    ];

    // 2. Forward to Bizmation API via cURL
    $bizmation_response = null;
    $bizmation_status = 'Pending / Config Required';

    if (BIZMATION_ACCESS_TOKEN !== 'YOUR_BIZMATION_API_ACCESS_TOKEN' && !empty(BIZMATION_ACCESS_TOKEN)) {
        $ch = curl_init(BIZMATION_API_URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($bizmation_payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . trim(BIZMATION_ACCESS_TOKEN)
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $response_body = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $bizmation_response = json_decode($response_body, true);
        if ($http_code >= 200 && $http_code < 300) {
            $bizmation_status = 'Synced to Bizmation (Code ' . $http_code . ')';
        } else {
            $bizmation_status = 'Bizmation Error (' . $http_code . ')';
        }
    }

    $order_record = [
        'order_id' => $order_id,
        'date' => $date_only,
        'time' => $time_only,
        'timestamp' => $timestamp,
        'name' => $name,
        'phone' => $clean_phone,
        'address' => $address,
        'delivery_area' => ($delivery_charge === 100) ? 'ঢাকার বাইরে (৳১০০)' : 'ঢাকার ভেতরে (৳৮০)',
        'product' => '১ কেজি প্রিমিয়াম জলপাই আচার কম্বো (অলিভ জামুন ৫০০ গ্রাম + বার্মিজ জলপাই ৫০০ গ্রাম)',
        'quantity' => $quantity,
        'unit_price' => $item_price,
        'delivery_charge' => $delivery_charge,
        'total_amount' => $total_price,
        'bizmation_status' => $bizmation_status,
        'uu_id' => $uu_id,
        'ip' => $user_ip
    ];

    // 3. Local JSON Backup
    $existing_orders = [];
    if (file_exists($orders_json_file)) {
        $existing_orders = json_decode(file_get_contents($orders_json_file), true) ?: [];
    }
    array_unshift($existing_orders, $order_record);
    file_put_contents($orders_json_file, json_encode($existing_orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // 4. Local CSV Backup (for Excel)
    $csv_exists = file_exists($orders_csv_file);
    $fp = fopen($orders_csv_file, 'a');
    if (!$csv_exists) {
        fprintf($fp, chr(0xEF).chr(0xBB).chr(0xBF)); // UTF-8 BOM
        fputcsv($fp, ['Order ID', 'Date', 'Time', 'Customer Name', 'Phone Number', 'Delivery Area', 'Full Address', 'Quantity', 'Product', 'Delivery Charge', 'Total (BDT)', 'Bizmation Status']);
    }
    fputcsv($fp, [
        $order_id,
        $date_only,
        $time_only,
        $name,
        $clean_phone,
        $order_record['delivery_area'],
        $address,
        $quantity,
        $order_record['product'],
        $delivery_charge,
        $total_price,
        $bizmation_status
    ]);
    fclose($fp);

    // Return Success to Frontend
    echo json_encode([
        'success' => true,
        'order_id' => $order_id,
        'total' => $total_price,
        'delivery_charge' => $delivery_charge,
        'bizmation_status' => $bizmation_status,
        'message' => 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
