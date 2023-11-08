<?php
require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = ["status" => true, "message" => "", "data" => null];
    $pdo = getPDO();

    $tweet_id = $_POST["tweet_id"];

    $query = "SELECT tweet_likes FROM tweets WHERE tweet_id = ?";
    $statement = $pdo->prepare($query);
    $statement->execute([$tweet_id]);
    $result = $statement->fetchColumn();

    $response["data"] = $result;

    echo json_encode($response);
}
else{
    $response["status"]="false";
    $response["data"]="only POST requests are accepted";
    echo json_encode($response);
}
?>