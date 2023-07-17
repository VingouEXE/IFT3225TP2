<?php if (isset($_GET['source'])) die(highlight_file(__FILE__, 1)); ?>

<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../config/database.php';
include_once '../models/task.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare product object
$task = new Task($db);
  
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
  
// set ID property of product to be edited
$task->id = $data->id;
  
// set product property values
$task->title=$data->title;
$task->user=$data->user;
$task->description=$data->description;
$task->category=$data->category;
//$task->date=$data->date;
$task->finish=$data->finish;
//$task->deleted=$data->deleted;
$task->id=$data->id;

// update the product
if($task->update()){
  
    // set response code - 200 ok
    http_response_code(200);
  
    // tell the user
    echo json_encode(array("message" => "Product was updated."));
}
  
// if unable to update the product, tell the user
else{
  
    // set response code - 503 service unavailable
    http_response_code(503);
  
    // tell the user
    echo json_encode(array("message" => "Unable to update product."));
}
?>
