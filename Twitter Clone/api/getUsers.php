<?php
require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = ["status" => true, "message" => "", "data" => null];
    $pdo = getPDO();

    $searchName = isset($_POST["searchName"]) ? $_POST["searchName"] : "";

    $query = "SELECT * FROM users WHERE LOWER(CONCAT(first_name, ' ', last_name)) LIKE LOWER(:searchName)";
    $statement = $pdo->prepare($query);
    $statement->bindValue(':searchName', '%' . strtolower($searchName) . '%', PDO::PARAM_STR);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $response["data"] = $results;

    echo json_encode($response);
} else {
    echo 'Only POST requests are accepted';
}
?>