<?php
    require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $password = md5($_POST["password"]);
   

    $response = ["status" => true, "message" => "", "data" => null];
    $pdo = getPDO();


    //email and password validations

    function validateEmail($email) {
        global $response;
        if (empty($email)) {
            $response["status"]="false";
            $response["data"]="Email is required.";
            exit;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response["status"]="false";
            $response["data"]="Enter valid email address";
            exit;
        }
    
        return "";
    }

    function validatePassword($password) {
        global $response;
        if (empty($password)) {
            $response["status"]="false";
            $response["data"]="Password is required.";
            exit;
        }
        if (strlen($password) < 8) {
            $response["status"]="false";
            $response["data"]="password should have a minimum of 8 characters.";
            exit;
        }
   };

   validateEmail($email);
   validatePassword($password);

    $query = "SELECT * FROM USERS WHERE email=? AND password=?";
    $statement = $pdo->prepare($query);
    $statement->execute([$email, $password]);
    $user = $statement->fetchAll(PDO::FETCH_ASSOC);
    $response["data"]=$user;

    if (count($user) == 1) {
        $response["message"] = "LoggedIn Successfully!";
        $response["status"]=true;
        $response["data"] = [
            "user" => $user[0],
            "email" => $email,
            "id"=>$user[0]["id"],
            "first_name"=>$user[0]["first_name"],
        ];

    

        echo json_encode($response);


        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "Invalid Email or Password";
        echo json_encode($response);
        exit;
    }
}
    echo 'only POST requests are accepted';
?>