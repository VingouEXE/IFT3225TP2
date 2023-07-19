<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->password)
) {

    $user->email = $data->email;
    $user->password = $data->password;
    $user->connect($user->email, $user->password);
    
    if ($user->id) {
        session_start();

        $task_arr = array(
            "id" => $user->id,
            "name" => $user->name,
            "password" => $user->password,
            "email" => $user->email,
            "role" => $user->role,
        );
        $_SESSION["id"] = $user->id;
        $_SESSION["role"] = $user->role;
        
        http_response_code(200);
        echo json_encode($task_arr);
    } else {

        http_response_code(200);

        echo json_encode(array("message" => "fail"));
    }
} else {

    http_response_code(400);

    echo json_encode(array("message" => "Unable to login. Data is incomplete."));
}
?>