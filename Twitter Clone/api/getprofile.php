<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $pdo = getPDO();
    $query = "SELECT * FROM users WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id]);
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