<?php if (isset($_GET['source'])) die(highlight_file(__FILE__, 1)); ?>
<?php
class Task{
  
    // database connection and table name
    private $conn;
    private $table_name = "tasks";
  
    // object properties
    public $id;
    public $title;
    public $date;
    public $user;
    public $finish;
    public $deleted;
    public $description;
    public $category;
    public $created_at;
    public $updated_at;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read tasks
    function readAll(){

    // select all query
    $query = "SELECT t.*, c.name
            FROM " . $this->table_name . " t
            LEFT JOIN categories c ON t.category = c.id
            WHERE t.deleted = 0";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
    }

    function readAllOrder($ord){

        // select all query
        $query = "SELECT t.*, c.name
        FROM " . $this->table_name . " t
        LEFT JOIN categories c ON t.category = c.id
        WHERE t.deleted = 0
        ORDER BY " . $ord;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
    
    function readAllOrderId($ord, $id){

        // select all query
        $query = "SELECT t.*, c.name
        FROM " . $this->table_name . " t
        LEFT JOIN categories c ON t.category = c.id
        WHERE t.deleted = 0 AND t.user = ". $id ."
        ORDER BY " . $ord;
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
    
    // create product
function create(){

    // query to insert record
    $query = "INSERT INTO " . $this->table_name . " 
    (title, user, category, date, description) VALUES
    (:title, :user, :category, CURRENT_TIMESTAMP(), :description)";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // sanitize
    $this->title=htmlspecialchars(strip_tags($this->title));
    $this->user=htmlspecialchars(strip_tags($this->user));
    $this->category=htmlspecialchars(strip_tags($this->category));
    $this->date=htmlspecialchars(strip_tags($this->date));
    $this->description=htmlspecialchars(strip_tags($this->description));

    // bind values
    $stmt->bindParam(":title", $this->title);
    $stmt->bindParam(":user", $this->user);
    $stmt->bindParam(":description", $this->description);
    $stmt->bindParam(":category", $this->category);
    //$stmt->bindParam(":datef", $this->date);

    // execute query
    if($stmt->execute()){
        return true;
    }

    return false;

  }

  // used when filling up the update product form
  function readOne(){

    // query to read single record
    $query = "SELECT t.*, c.name
    FROM " . $this->table_name . " t
    LEFT JOIN categories c ON t.category = c.id
    WHERE t.id = ?";

    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    // bind id of product to be updated
    $stmt->bindParam(1, $this->id);

    // execute query
    $stmt->execute();

    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // set values to object properties
    $this->title = $row['Title'];
    $this->date = $row['Date'];
    $this->user = $row['User'];
    $this->category = $row['Category'];
    $this->finish = $row['Finish'];
    $this->deleted = $row['Deleted'];
    $this->description = $row['Description'];
    $this->created_at = $row['Created_at'];
    $this->updated_at = $row['Updated_at'];
  }

  // update the product
function update(){
  
    // update query
    $query = "UPDATE
                " . $this->table_name . "
            SET
                title = :title,
                user = :user,
                category = :category,
                finish = :finish,
                updated_at = CURRENT_TIMESTAMP(),
                description = :description
            WHERE
                id = :id";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // sanitize
    $this->title=htmlspecialchars(strip_tags($this->title));
    $this->user=htmlspecialchars(strip_tags($this->user));
    $this->description=htmlspecialchars(strip_tags($this->description));
    $this->category=htmlspecialchars(strip_tags($this->category));
    $this->finish=htmlspecialchars(strip_tags($this->finish));
    $this->id=htmlspecialchars(strip_tags($this->id));
  
    // bind new values
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':user', $this->user);
    $stmt->bindParam(':description', $this->description);
    $stmt->bindParam(':category', $this->category);
    $stmt->bindParam(':finish', $this->finish);
    $stmt->bindParam(':id', $this->id);
  
    // execute the query
    if($stmt->execute()){
        return true;
    }
  
    return false;
  }

  // delete the product
  function delete(){

    // delete query
    $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));

    // bind id of record to delete
    $stmt->bindParam(1, $this->id);

    // execute query
    if($stmt->execute()){
        return true;
    }

    return false;
  }
}
?>
