<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->user) &&
    !empty($data->description) &&
    !empty($data->category)
) {
    $task->title = $data->title;
    $task->user = $data->user;
    $task->description = $data->description;
    $task->category = $data->category;

    if ($task->create()) {

        http_response_code(201);

        echo json_encode(array("message" => "task was created."));
    } else {

        http_response_code(503);

        echo json_encode(array("message" => "Unable to create task."));
    }
} else {

    http_response_code(400);

    echo json_encode(array("message" => "Unable to create task. Data is incomplete."));
}
?>