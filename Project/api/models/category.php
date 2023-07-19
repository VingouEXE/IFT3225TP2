<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>

<?php
class Category
{

    private $conn;
    private $table_name = "categories";

    public $id;
    public $name;
    public $created_at;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readAll()
    {
        $query = "SELECT *
                FROM
                    " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readAllOrder($ord)
    {
        $query = "SELECT *
                FROM
                    " . $this->table_name . "
                ORDER BY " . $ord;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readByIdOrder($id, $ord)
    {

        $query = "SELECT *
            FROM
                " . $this->table_name . "
            WHERE id = " . $id . "
            ORDER BY" . $ord;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readById($id)
    {

        $query = "SELECT *
            FROM
                " . $this->table_name . "
            WHERE id = " . $id;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>