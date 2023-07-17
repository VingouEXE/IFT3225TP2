<?php if (isset($_GET['source'])) die(highlight_file(__FILE__, 1)); ?>

<?php
class Role{
  
    // database connection and table name
    private $conn;
    private $table_name = "roles";
  
    // object properties
    public $id;
    public $role;
    public $created_at;
  
    public function __construct($db){
        $this->conn = $db;
    }
  
    // used by select drop-down list
    public function readAll(){
        //select all data
        $query = "SELECT *
                FROM
                    " . $this->table_name;
  
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
  
        return $stmt;
    }

    public function readAllOrder($ord){
        //select all data
        $query = "SELECT *
                FROM
                    " . $this->table_name . "
                ORDER BY " . $ord;
  
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
  
        return $stmt;
    }

    // used by select drop-down list
  public function readByIdOrder($id, $ord){

    //select all data
    $query = "SELECT *
            FROM
                " . $this->table_name . "
            WHERE id = ". $id . "
            ORDER BY" . $ord;

    $stmt = $this->conn->prepare( $query );
    $stmt->execute();

    return $stmt;
  }

  public function readById($id){

    //select all data
    $query = "SELECT *
            FROM
                " . $this->table_name . "
            WHERE id = ". $id;

    $stmt = $this->conn->prepare( $query );
    $stmt->execute();

    return $stmt;
  }
}
?>
