<?php
require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = ["status" => true, "message" => "", "data" => null];

    if (isset($_POST["product_name"], $_POST["product_quantity"], $_POST["clientName"], $_POST["adminId"], $_POST["product_id"])) {
        $product_name = $_POST["product_name"];
        $product_quantity = $_POST["product_quantity"];
        $clientName = $_POST["clientName"];
        $admin_id = $_POST["adminId"];
        $product_id = $_POST["product_id"];

        try {
            $pdo = getPDO();
            $pdo->beginTransaction(); 

            $check="SELECT product_quantity FROM products WHERE id=?";
            $checkStatement=$pdo->prepare($check);
            $checkStatement->execute([$product_id]);

            // Update product quantity
            $query = "UPDATE products SET product_quantity = product_quantity + ? WHERE product_name = ?";
            $statement = $pdo->prepare($query);
            $statement->execute([$product_quantity, $product_name]);

            // Retrieve product price
            $query2 = "SELECT product_price FROM products WHERE product_name = ?";
            $statement2 = $pdo->prepare($query2);
            $statement2->execute([$product_name]);
            $fetchResult2 = $statement2->fetch(PDO::FETCH_ASSOC);

            $product_price = $fetchResult2['product_price'];

            // Calculate total value
            $totalValue = $product_quantity * $product_price;

            // Insert a transaction record
            $transaction_type = "intake";
            $query3 = "INSERT INTO transactions (transaction_type, client_name, admin_id, product_id, transacted_quantity, total_value) VALUES (?, ?, ?, ?, ?, ?)";
            $statement3 = $pdo->prepare($query3);
            $statement3->execute([$transaction_type, $clientName, $admin_id, $product_id, $product_quantity, $totalValue]);

            $pdo->commit(); // Commit the transaction
            $response["data"] = $fetchResult2;
            echo json_encode($response);
        } catch (PDOException $e) {
            $pdo->rollBack();
            $response["status"] = false;
            $response["message"] = "Database error: " . $e->getMessage();
            echo json_encode($response);
        }
    } else {
        $response["status"] = false;
        $response["message"] = "Missing or incomplete input data";
        echo json_encode($response);
    }
} else {
    $response = ["status" => false, "data" => "Only POST requests are accepted"];
    echo json_encode($response);
}
?>
