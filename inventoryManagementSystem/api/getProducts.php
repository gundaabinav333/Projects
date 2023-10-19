<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $pdo = getPDO();
    $query = "SELECT product_name FROM products";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $fetchResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($fetchResult !== false) {
        $response["data"] = $fetchResult;
        $response["message"] = "Data fetched successfully.";
        $response["status"] = true;
    } else {
        $response["message"] = "Error fetching data.";
    }
} else {
    $response["message"] = 'Only POST requests are accepted';
}

echo json_encode($response);
?>