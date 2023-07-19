<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$stmt = $task->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
    $tasks_arr = array();
    $tasks_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $task_item = array(
            "id" => $Id,
            "title" => $Title,
            "description" => $Description,
            "category" => $category_name,
            "date" => $Updated_at,
            "finish" => $Finish,
            "deleted" => $Deleted,
            "user" => $User,
            "userN" => $user_name
        );

        array_push($tasks_arr["records"], $task_item);
    }

    http_response_code(200);

    echo json_encode($tasks_arr);
} else {

    http_response_code(200);

    echo json_encode(
        array("message" => "No task found.")
    );
}

?>