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

$task = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->name) &&
    !empty($data->password) &&
    !empty($data->email) &&
    !empty($data->role)
) {

    $task->name = $data->name;
    $task->password = $data->password;
    $task->email = $data->email;
    $task->role = $data->role;

    if ($task->create()) {

        http_response_code(201);

        echo json_encode(array("message" => "user was created."));
    } else {

        http_response_code(503);

        echo json_encode(array("message" => "Unable to create user."));
    }
} else {

    http_response_code(400);

    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>