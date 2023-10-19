<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["productName"]) && isset($_POST["productPrice"])) {
        $product_name = $_POST["productName"];
        $product_price = $_POST["productPrice"];
        
        $pdo = getPDO();
        if (!$pdo) {
            $response["message"] = "Database Not Connected!";
        } else {
            $query = "INSERT INTO products (product_name, product_price) VALUES (?, ?)";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([$product_name, $product_price]);

            if ($result) {
                $response["message"] = "Data inserted successfully.";
                $response["status"] = true;
                $response["data"] = "product added successfully";
                echo json_encode($response);
                exit;
            } else {
                $response["message"] = "Error inserting data: " . $statement->errorInfo()[2];
            }
        }
    } else {
        $response["message"] = "Missing POST parameters: productName and/or productPrice";
        echo json_encode($response);
    }
}
?>
