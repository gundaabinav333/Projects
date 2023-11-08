<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST["id"];

    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
    } else {
        $query =  "SELECT tweets.*, users.first_name, users.last_name,users.profile_image_url
        FROM tweets
        INNER JOIN followers ON tweets.user_id = followers.follower_id
        INNER JOIN users ON tweets.user_id = users.id
        WHERE followers.user_id = ?";
        $statement = $pdo->prepare($query);
        $result = $statement->execute([$user_id]);

        if ($result) {
            $response["message"] = "Data fetched successfully.";
            $response["status"] = true;
            $response["data"] = $statement->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $response["message"] = "Error fetching data: " . $statement->errorInfo()[2];
        }
    }
} else {
    $response["message"] = 'Only POST requests are accepted';
}

echo json_encode($response);
?>