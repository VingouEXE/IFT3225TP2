<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../models/task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$task->id = isset($_GET['id']) ? $_GET['id'] : die();

$task->readOne();

if ($task->title != null) {
    $task_arr = array(
        "id" => $task->id,
        "title" => $task->title,
        "description" => $task->description,
        "category" => $task->category,
        "date" => $task->date,
        "finish" => $task->finish,
        "deleted" => $task->deleted,
        "user" => $task->user,
        "userN" => $task->user_name
    );
    http_response_code(200);

    echo json_encode($task_arr);
} else {
    http_response_code(404);

    echo json_encode(array("message" => "task does not exist."));
}
?>