<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST["user_id"];
    $follower_id = $_POST["follower_id"];
    
    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
    }else{
            $query = "INSERT INTO followers (user_id,follower_id) VALUES (?,?)";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([$user_id,$follower_id]);

            if ($result) {
                $response["message"] = "Data inserted successfully.";
                $response["status"] = true;
               
        
                echo json_encode($response);
                exit;
            
            } else {
                $response["message"] = "Error inserting data: " . $statement->errorInfo()[2];
                $response["data"]="Already Followed";
            }
        }
    }
?>