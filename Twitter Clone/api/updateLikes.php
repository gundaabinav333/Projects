<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

$tweet_id = $_POST["tweet_id"];
$user_id = $_POST["user_id"];
$pdo = getPDO();

// Check if the like relationship already exists
$checkQuery = "SELECT * FROM LIKES WHERE tweet_id = ? AND liked_by_id = ?";
$checkStatement = $pdo->prepare($checkQuery);
$checkStatement->execute([$tweet_id, $user_id]);
$existingLike = $checkStatement->fetch();

if (!$existingLike) {
    $insertQuery = "INSERT INTO LIKES (tweet_id, liked_by_id) VALUES (?, ?)";
    $insertStatement = $pdo->prepare($insertQuery);
    $insertResult = $insertStatement->execute([$tweet_id, $user_id]);

    if ($insertResult) {
        $query = "SELECT tweet_likes FROM tweets WHERE tweet_id = ?";
        $statement = $pdo->prepare($query);
        $statement->execute([$tweet_id]);
        $currentLikes = $statement->fetchColumn();
        $newLikes = $currentLikes + 1;
        $updateQuery = "UPDATE tweets SET tweet_likes = ? WHERE tweet_id = ?";
        $updateStatement = $pdo->prepare($updateQuery);
        $updateResult = $updateStatement->execute([$newLikes, $tweet_id]);

        if ($updateResult) {
            $response["message"] = "Like count updated successfully.";
            $response["status"] = true; 
        } else {
            $response["message"] = "Error updating like count.";
        }
    } else {
        $response["message"] = "Error inserting like relationship.";
    }
} else {
    $response["message"] = "Already liked";
}

echo json_encode($response);
?>