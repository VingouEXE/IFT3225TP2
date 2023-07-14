<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "tp2";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

const HTTP_OK = 200;
const HTTP_CREATE = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_METHOD_NOT_ALLOWED = 405;

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST') {
    $response_code = HTTP_BAD_REQUEST;
    $message = "Il manque le paramètre ACTION";

    if ($_POST['action'] == "addTask" && isset($_POST['title']) && isset($_POST['date'])
        && isset($_POST['user']) && isset($_POST['description']) && isset($_POST['category'])) {
        $response_code = HTTP_CREATE;
        $message="Created";
        $title = $_POST['title'];
        $date = $_POST['date'];
        $user = $_POST['user'];
        $desc = $_POST['description'];
        $cat = $_POST['category'];
        
        $sql = "INSERT INTO tasks (title, user, category, date, description) VALUES ('$title', $user, '$cat', '$date', '$desc')";
        $result = $conn->query($sql);
    }

    if ($_POST['action'] == "updateTask" && isset($_POST['id']) && isset($_POST['title']) && isset($_POST['date'])
        && isset($_POST['user']) && isset($_POST['description']) && isset($_POST['category'])) {
        $response_code = HTTP_CREATE;
        $message="Modify";
        $id = $_POST['id'];
        $title = $_POST['title'];
        $date = $_POST['date'];
        $user = $_POST['user'];
        $finish = $_POST['finish'];
        $del = $_POST['deleted'];
        $desc = $_POST['description'];
        $cat = $_POST['category'];
        
        $sql = "UPDATE tasks SET title = '$title', user=$user, category='$cat', date='$date', description='$desc', finish=$finish, deleted=$del WHERE id = $id";
        $result = $conn->query($sql);
    }

    if ($_POST['action'] == "deleteTask" && isset($_Post['id'])) {
        $response_code = HTTP_OK;
        $message="ok";
        $id = $_POST['id'];
        
        $sql = "UPDATE tasks SET deleted = '1' WHERE id = $id";
        $result = $conn->query($sql);
    }

    if ($_GET['action'] == "getTask" && isset($_GET['id'])) {
        $response_code = HTTP_OK;
        $message="ok";
        $id = $_GET['id'];
        
        $sql = "SELECT * from tasks WHERE id = $id AND deleted = '0'";
        $result = $conn->query($sql);
    }

    if ($_GET['action'] == "getAllTask") {
        $response_code = HTTP_OK;
        $message="ok";
        
        $sql = "SELECT * from tasks WHERE deleted = '0'";
        $result = $conn->query($sql);
    }

    if ($_POST['action'] == "addUser" && isset($_POST['name']) && isset($_POST['password'])
        && isset($_POST['email']) && isset($_POST['role']) && isset($_POST['category'])) {
        $response_code = HTTP_CREATE;
        $message="Created";
        $name = $_POST['name'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        $role = $_POST['role'];
        
        $sql = "INSERT INTO users (name, password, email, role) VALUES ('$name', $password, '$email', $role)";
        $result = $conn->query($sql);
    }

    if ($_GET['action'] == "getUser" && isset($_GET['id'])) {
        $response_code = HTTP_OK;
        $message="ok";
        $id = $_GET['id'];
        
        $sql = "SELECT * from users WHERE id = $id";
        $result = $conn->query($sql);
    }

    if ($_GET['action'] == "getAllUser") {
        $response_code = HTTP_OK;
        $message="ok";
        
        $sql = "SELECT * from users";
        $result = $conn->query($sql);
    }

    if ($_GET['action'] == "getCategories") {
        $response_code = HTTP_OK;
        $message="ok";
        
        $sql = "SELECT * from categories";
        $result = $conn->query($sql);
    }

    if ($_GET['action'] == "getRoles") {
        $response_code = HTTP_OK;
        $message="ok";
        
        $sql = "SELECT * from roles";
        $result = $conn->query($sql);
    }

    response($response_code, $message, $result);
} else {
    $response_code = HTTP_METHOD_NOT_ALLOWED;
    $message = "Method not allowed !";
    response($response_code, $message);
}

function response($response_code, $message, $number = null) {
    header('Content-Type: application/json');
    http_response_code($response_code);
    $response = [
        "response_code" => $response_code,
        "message" => $message,
        "number" => $number
    ];

    echo json_encode($response);
}
$conn->close();
?>