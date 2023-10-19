<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => []];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $pdo = getPDO();
    $query = "SELECT transactions.*, products.product_name, products.product_price FROM transactions INNER JOIN products ON transactions.product_id = products.id";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $fetchResult = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($fetchResult !== false) {
        $response["data"]["transactions"] = $fetchResult;
        $response["message"] = "Transaction data fetched successfully.";
        $response["status"] = true;

    } else {
        $response["message"] = "Error fetching transaction data.";
    }
} else {
    $response["message"] = 'Only GET requests are accepted';
}

echo json_encode($response);
?>
