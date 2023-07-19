<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/category.php';

$database = new Database();
$db = $database->getConnection();

$cat = new Category($db);

$stmt = $cat->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
    $cats_arr = array();
    $cats_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $cat_item = array(
            "id" => $Id,
            "name" => $Name
        );

        array_push($cats_arr["records"], $cat_item);
    }

    http_response_code(200);

    echo json_encode($cats_arr);
} else {

    http_response_code(404);

    echo json_encode(
        array("message" => "No products found.")
    );
}

?>