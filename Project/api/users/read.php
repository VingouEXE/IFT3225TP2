<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$stmt = $user->readAll();
$num = $stmt->rowCount();

if ($num > 0) {

    $user_arr = array();
    $user_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $user_item = array(
            "id" => $id,
            "name" => $name
        );

        array_push($user_arr["records"], $user_item);
    }

    http_response_code(200);

    echo json_encode($user_arr);
} else {

    http_response_code(200);

    echo json_encode(
        array("message" => "No user found.")
    );
}
?>