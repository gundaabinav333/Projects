<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["product_name"])) {
    $pdo = getPDO();
    $product_name = $_POST["product_name"];
    $query = "SELECT id FROM products WHERE product_name=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$product_name]);
    $fetchResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($fetchResult !== false) {
        $response["data"] = $fetchResult;
        $response["message"] = "Data fetched successfully.";
        $response["status"] = true;
    } else {
        $response["message"] = "Error fetching data.";
    }
} else {
    $response["message"] = 'Only POST requests with "product_name" parameter are accepted';
}

echo json_encode($response);
?>
