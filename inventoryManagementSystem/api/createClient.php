<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["clientName"])) {
        $client_name = $_POST["clientName"];
        $pdo = getPDO();
        if (!$pdo) {
            $response["message"] = "Database Not Connected!";
        } else {
            $query = "INSERT INTO client (client_name) VALUES (?)";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([$client_name]);

            if ($result) {
                $response["message"] = "Data inserted successfully.";
                $response["status"] = true;
                $response["data"] = "client created successfully";
                echo json_encode($response);
                exit;
            } else {
                $response["message"] = "Error inserting data: " . $statement->errorInfo()[2];
            }
        }
    } else {
        $response["message"] = "Missing POST parameter: clientName";
        echo json_encode($response);
    }
}
?>
