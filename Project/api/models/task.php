<?php if (isset($_GET['source']))
    die(highlight_file(__FILE__, 1)); ?>
<?php
class Task
{

    private $conn;
    private $table_name = "tasks";
    public $id;
    public $title;
    public $date;
    public $user;
    public $user_name;
    public $finish;
    public $deleted;
    public $description;
    public $category;
    public $category_name;
    public $created_at;
    public $updated_at;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function readAll()
    {

        $query = "SELECT t.*, c.name as category_name, u.name as user_name
            FROM " . $this->table_name . " t
            LEFT JOIN categories c ON t.category = c.id
            LEFT JOIN users u ON t.user = u.id
            WHERE t.deleted = 0";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function readAllOrder($ord)
    {

        $query = "SELECT t.*, c.name
        FROM " . $this->table_name . " t
        LEFT JOIN categories c ON t.category = c.id
        WHERE t.deleted = 0
        ORDER BY " . $ord;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function readAllOrderId($ord, $id)
    {

        $query = "SELECT t.*, c.name
        FROM " . $this->table_name . " t
        LEFT JOIN categories c ON t.category = c.id
        WHERE t.deleted = 0 AND t.user = " . $id . "
        ORDER BY " . $ord;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    function create()
    {

        $query = "INSERT INTO " . $this->table_name . " 
    (title, user, category, date, description) VALUES
    (:title, :user, :category, CURRENT_TIMESTAMP(), :description)";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->description = htmlspecialchars(strip_tags($this->description));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":user", $this->user);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":category", $this->category);

        if ($stmt->execute()) {
            return true;
        }

        return false;

    }

    function readOne()
    {

        $query = "SELECT t.*, c.name as category_name, u.name as user_name
    FROM " . $this->table_name . " t
    LEFT JOIN categories c ON t.category = c.id
    LEFT JOIN users u ON t.user = u.id
    WHERE t.id = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->title = $row['Title'];
        $this->date = $row['Date'];
        $this->user = $row['user_name'];
        $this->category = $row['category_name'];
        $this->finish = $row['Finish'];
        $this->deleted = $row['Deleted'];
        $this->description = $row['Description'];
        $this->created_at = $row['Created_at'];
        $this->updated_at = $row['Updated_at'];
    }

    function update()
    {

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

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->finish = htmlspecialchars(strip_tags($this->finish));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':user', $this->user);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':category', $this->category);
        $stmt->bindParam(':finish', $this->finish);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete()
    {

        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function search($keywords){

        $query ="SELECT t.*, c.name as category_name, u.u as user_name
        FROM " . $this->table_name . " t
        LEFT JOIN categories c ON t.category = c.id
        LEFT JOIN users u ON t.user = u.id
        WHERE (t.title LIKE ?
                     OR t.description LIKE ?
                     OR u.name LIKE ?)";
    
        $stmt = $this->conn->prepare($query);
    
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
    
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
    
        $stmt->execute();
    
        return $stmt;
      }
}
?>