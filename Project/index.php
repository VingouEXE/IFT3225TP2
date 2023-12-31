<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TP2</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="app/assets/style.css" rel="stylesheet" />
</head>

<body>
    <?php
    session_start();
    if (isset($_SESSION['id'])) {
        echo "<div id=userId hidden><p>" . $_SESSION['id'] . "<p></div>";
        echo "<div id=userRole hidden><p>" . $_SESSION['role'] . "<p></div>";
        echo '<div><a href="logout.php">Disconnect</a></div>'; ?>
        <div id="app"></div>
    <?php } else { ?>
        <div id="login"></div>
    <?php }
    ?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous">
        </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
    <script src="app/app.js"></script>
    <script src="app/login.js"></script>
    <script src="app/tasks/task.js"></script>
    <script src="app/tasks/read-task.js"></script>
    <script src="app/tasks/create-task.js"></script>
    <script src="app/tasks/read-one-task.js"></script>
    <script src="app/tasks/update-task.js"></script>
    <script src="app/tasks/delete-task.js"></script>
    <script src="app/tasks/search-task.js"></script>
    <script src="app/login/login.js"></script>
    <script src="app/login/signin.js"></script>
    <script src="app/login/loginTemplate.js"></script>
</body>

</html>