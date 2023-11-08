<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST["first_name"];
    $lastname = $_POST["last_name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $password = md5($_POST["password"]);
    
    //firstname validation

    function validateFirstName($firstname) {
        global $response;

        if (empty($firstname)) {
            $response["status"]="false";
            $response["data"]="First name is required.";
            exit;
        }
        if (strlen($firstname) < 3) {
            $response["status"]="false";
            $response["data"]="First name should have a minimum of three characters.";
            exit;
        }
        if (!preg_match("/^[a-zA-Z ]*$/", $firstname)) {

            $response["status"]="false";
            $response["data"]="First name can only contain letters";
            exit;
        }
        return ""; 
    }

    //lastname validation
    function validateLastName($lastname) {
        global $response;
        if (empty($lastname)) {
            $response["status"]="false";
            $response["data"]="First name is required.";
            exit;
        }
        if (strlen($lastname) < 3) {
            $response["status"]="false";
            $response["data"]="Last name should have a minimum of three characters.";
            exit;
        }
        if (!preg_match("/^[a-zA-Z ]*$/", $lastname)) {

            $response["status"]="false";
            $response["data"]="Last name can only contain letters";
            exit;
        }
        return ""; 
    }

    // mobile no validation
    function validateMobileNo($phone) {
        global $response;
        if (empty($phone)) {
            $response["status"]="false";
            $response["data"]="Mobile number is required.";
            exit;
        }
        if (!preg_match("/^[0-9]{10}$/", $phone)) {
            $response["status"]="false";
            $response["data"]="Invalid mobile number format. Please enter a 10-digit number.";
            exit;
        }
        return "";
    }


    //email validation
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

    //password validation
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
    

   validateFirstName($firstname);
   validateLastName($lastname);
   validateMobileNo($phone);
   validateEmail($email);
   validatePassword($password);  
    
    //database connection
    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
    } else {
        $query = "SELECT email FROM users WHERE email = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$email]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) == 1) {
            $response["message"] = "Email already taken!";
            echo json_encode($response);
            exit;
            
        } else {
            $query = "INSERT INTO users (first_name, last_name, phone, email, password, updated_at) VALUES (?, ?, ?, ?, ?, NOW())";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([$firstname, $lastname, $phone, $email, $password]);

            if ($result) {
                $response["message"] = "Data inserted successfully.";
                $response["status"] = true;
            } else {
                $response["message"] = "Error inserting data: " . $statement->errorInfo()[2];
            }
        }
    }
} else {
    $response["message"] = 'Only POST requests are accepted';
}

echo json_encode($response);
?>