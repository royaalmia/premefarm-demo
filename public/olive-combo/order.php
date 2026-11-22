<?php
/**
 * Preme Farm - Olive Combo Order Processing Script (cPanel Native)
 * Automatically logs orders into orders.csv and orders.json
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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

    if ($action === 'download_csv' && file_exists($orders_csv_file)) {
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=preme_farm_olive_orders_' . date('Y-m-d') . '.csv');
        readfile($orders_csv_file);
        exit;
    }

    if ($action === 'list_json' && file_exists($orders_json_file)) {
        echo file_get_contents($orders_json_file);
        exit;
    }

    echo json_encode(['success' => true, 'total_orders' => file_exists($orders_json_file) ? count(json_decode(file_get_contents($orders_json_file), true) ?: []) : 0]);
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
    $phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
    $address = isset($data['address']) ? trim(strip_tags($data['address'])) : '';
    $delivery_area = isset($data['delivery_area']) ? trim(strip_tags($data['delivery_area'])) : 'inside_dhaka';
    $quantity = isset($data['quantity']) ? intval($data['quantity']) : 1;
    $notes = isset($data['notes']) ? trim(strip_tags($data['notes'])) : '';

    if (empty($name) || empty($phone) || empty($address)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দেওয়া আবশ্যক।']);
        exit;
    }

    $item_price = 790;
    $delivery_charge = ($delivery_area === 'outside_dhaka') ? 100 : 80;
    $total_price = ($item_price * $quantity) + $delivery_charge;
    $order_id = 'PF-OLV-' . strtoupper(substr(uniqid(), -6));
    $timestamp = date('Y-m-d H:i:s');
    $date_only = date('Y-m-d');
    $time_only = date('h:i A');

    $order_record = [
        'order_id' => $order_id,
        'date' => $date_only,
        'time' => $time_only,
        'timestamp' => $timestamp,
        'name' => $name,
        'phone' => $phone,
        'address' => $address,
        'delivery_area' => ($delivery_area === 'outside_dhaka') ? 'ঢাকার বাইরে (৳১০০)' : 'ঢাকার ভেতরে (৳৮০)',
        'product' => '১ কেজি প্রিমিয়াম জলপাই আচার কম্বো (অলিভ জামুন ৫০০ গ্রাম + বার্মিজ জলপাই ৫০০ গ্রাম)',
        'quantity' => $quantity,
        'unit_price' => $item_price,
        'delivery_charge' => $delivery_charge,
        'total_amount' => $total_price,
        'notes' => $notes,
        'status' => 'Pending / Processing',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
    ];

    // 1. Append to orders.json
    $existing_orders = [];
    if (file_exists($orders_json_file)) {
        $existing_orders = json_decode(file_get_contents($orders_json_file), true) ?: [];
    }
    array_unshift($existing_orders, $order_record);
    file_put_contents($orders_json_file, json_encode($existing_orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // 2. Append to orders.csv
    $csv_exists = file_exists($orders_csv_file);
    $fp = fopen($orders_csv_file, 'a');
    if (!$csv_exists) {
        // UTF-8 BOM for Excel Bengali character rendering
        fprintf($fp, chr(0xEF).chr(0xBB).chr(0xBF));
        fputcsv($fp, ['Order ID', 'Date', 'Time', 'Customer Name', 'Phone Number', 'Delivery Area', 'Full Address', 'Quantity', 'Product', 'Delivery Charge', 'Total (BDT)', 'Notes', 'Status']);
    }
    fputcsv($fp, [
        $order_id,
        $date_only,
        $time_only,
        $name,
        $phone,
        $order_record['delivery_area'],
        $address,
        $quantity,
        $order_record['product'],
        $delivery_charge,
        $total_price,
        $notes,
        'Pending'
    ]);
    fclose($fp);

    echo json_encode([
        'success' => true,
        'order_id' => $order_id,
        'total' => $total_price,
        'delivery_charge' => $delivery_charge,
        'message' => 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
