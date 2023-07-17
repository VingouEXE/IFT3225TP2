<?php if (isset($_GET['source'])) die(highlight_file(__FILE__, 1)); ?>

<?php
class User{
  
    // database connection and table name
    private $conn;
    private $table_name = "users";
  
    // object properties
    public $id;
    public $name;
    public $password;
    public $email;
    public $role;
    public $created_at;
  
    public function __construct($db){
        $this->conn = $db;
    }
  
    // used by select drop-down list
    public function readAll(){
        //select all data
        $query = "SELECT id, name
                FROM " . $this->table_name;
  
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
  
        return $stmt;
    }

  public function readById($id){

    //select all data
    $query = "SELECT id, name, email, role
            FROM " . $this->table_name . "
            WHERE id = ". $id;

    $stmt = $this->conn->prepare( $query );
    $stmt->execute();

    return $stmt;
  }

  public function connect($email, $psw){
    $hash = password_hash($psw,PASSWORD_DEFAULT);
    //select all data
    $query = "SELECT id, name, email, role, password
            FROM " . $this->table_name . "
            WHERE email = '". $email ."'";

    $stmt = $this->conn->prepare( $query );
    $stmt->execute();

    $num = $stmt->rowCount();

    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['id'];
        $this->password = $row['password'];
        if(password_verify($psw, $this->password)){
            $_SESSION["id"] = $this->id;
            return true;
        }
        
    }
    return false;
  }
  function create(){

    // query to insert record
    $query = "INSERT INTO " . $this->table_name . " 
    (name, password, email, role) VALUES
    (:name, :password, :email, :role)";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // sanitize  $hash = password_hash($psw,PASSWORD_DEFAULT);
    $this->name=htmlspecialchars(strip_tags($this->name));
    $this->password=password_hash(htmlspecialchars(strip_tags($this->password)),PASSWORD_DEFAULT);
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->role=htmlspecialchars(strip_tags($this->role));

    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":password", $this->password);
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":role", $this->role);

    // execute query
    if($stmt->execute()){
        return true;
    }

    return false;

  }
}
?>
