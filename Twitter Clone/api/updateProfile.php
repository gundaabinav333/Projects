<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $profile_image_url = $_POST["profile_image_url"];
    $pdo = getPDO();

    $query = "UPDATE users SET profile_image_url = ? WHERE id = ?";
    $statement = $pdo->prepare($query);
    $updateResult = $statement->execute([$profile_image_url, $id]);

    if ($updateResult) {
        $query = "SELECT profile_image_url FROM users WHERE id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$id]);
        $fetchResult = $stmt->fetchColumn();

        if ($fetchResult !== false) {
            $response["data"] = $fetchResult;
            $response["message"] = "Data updated successfully.";
            $response["status"] = true;
        } else {
            $response["message"] = "Error fetching data after update.";
        }
    } else {
        $response["message"] = "Error updating data: " . $statement->errorInfo()[2];
    }
} else {
    $response["message"] = 'Only POST requests are accepted';
}

echo json_encode($response);

?>
