<?php if (isset($_GET['source'])) die(highlight_file(__FILE__, 1)); ?>

<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../config/database.php';
include_once '../models/category.php';
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$cat = new Category($db);
  
// query products
$stmt = $cat->readAll();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
    // products array
    $cats_arr=array();
    $cats_arr["records"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $cat_item=array(
        "id" => $Id,
        "name" => $Name
        );
  
        array_push($cats_arr["records"], $cat_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($cats_arr);
}else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}

?>
