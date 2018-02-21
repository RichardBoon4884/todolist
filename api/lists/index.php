<?php

// Connection to DB
$servername = "localhost";
$username = "todolist";
$password = "todolist";

try {
    $conn = new PDO("mysql:host=$servername;dbname=todolist", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}

switch ((isset($_GET['action'])) ? $_GET['action'] : false) {
    case "index":
        $stmt = $conn->prepare("SELECT * FROM lists");
        $stmt->execute();

        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $results = $stmt->fetchAll();

        header('Content-Type: application/json');
        echo json_encode($results);
        break;
    case "insert":
        $lists = json_decode(file_get_contents('php://input'), true);

        foreach ($lists as $list) {
            if (isset($list['id'])) {
                $stmt = $conn->prepare("UPDATE lists SET title=:title WHERE id=:id");
                $stmt->bindParam(':id', $list['id']);
            } else {
                $stmt = $conn->prepare("INSERT INTO lists SET title=:title");
            }
            $stmt->bindParam(':title', $list['title']);
            $stmt->execute();
        }

        $result = "ok";
        header('Content-Type: application/json');
        echo json_encode($result);
        break;
    case "delete":
        $lists = json_decode(file_get_contents('php://input'), true);

        foreach ($lists as $list) {
            if ($list['id'] == 1) {
                $result = "Inbox can't be removed!";
                header('Content-Type: application/json');
                echo json_encode($result);
                return false;
            }

            $stmt = $conn->prepare("DELETE FROM lists WHERE id=:id");
            $stmt->bindParam(':id', $list['id']);
            $stmt->execute();
        }

        $result = "ok";
        header('Content-Type: application/json');
        echo json_encode($result);
        break;
    default:
        http_response_code(404);
        echo "404";
}

$conn = null;