<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $tweet_text = $_POST["tweet_text"];
    $tweet_image_url = isset($_POST["filePath"]) ? $_POST["filePath"] : "empty";
    
    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
    }else{
            $query = "INSERT INTO tweets (user_id,tweet_text,tweet_image_url) VALUES (?,?,?)";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([$id,$tweet_text,$tweet_image_url]);

            if ($result) {
                $response["message"] = "Data inserted successfully.";
                $response["status"] = true;
                $response["data"]=$tweet_image_url;
                $responseData = [
                    "tweet_text" => $tweet_text,
                    "tweet_image_url" => $tweet_image_url,
                ];
                $response["data"] = $responseData;
                
        
                echo json_encode($response);
                exit;
            
            } else {
                $response["message"] = "Error inserting data: " . $statement->errorInfo()[2];
            }
        }
    }
?>032