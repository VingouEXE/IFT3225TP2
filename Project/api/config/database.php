<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>
<?php
class Database
{

    private $username = "clouatrv";
    private $host = "www-ens";
    private $db_name = "clouatrv_web";
    private $password = "trvvj47C";
    public $conn;

    // get the database connection
    public function getConnection()
    {

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

}
?>