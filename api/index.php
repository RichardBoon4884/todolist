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
        $stmt = $conn->prepare("SELECT * FROM tasks");
        $stmt->execute();

        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $results = $stmt->fetchAll();

        foreach ($results as $key => $result) {
            $results[$key]['done'] = ($result['done'] == 1) ? true : false;
        }

        header('Content-Type: application/json');
        echo json_encode($results);
        break;
    case "insert":
        $tasks = json_decode(file_get_contents('php://input'), true);

        foreach ($tasks as $task) {
            if (isset($task['id'])) {
                $stmt = $conn->prepare("UPDATE tasks SET title=:title, done=:done WHERE id=:id");
                $stmt->bindParam(':id', $task['id']);
            } else {
                $stmt = $conn->prepare("INSERT INTO tasks SET title=:title, done=:done");
            }
            $done = ($task['done']) ? 1 : 0;
            $stmt->bindParam(':title', $task['title']);
            $stmt->bindParam(':done', $done);
            $stmt->execute();
        }

        $result = "ok";
        header('Content-Type: application/json');
        echo json_encode($result);
        break;
    case "delete":
        $tasks = json_decode(file_get_contents('php://input'), true);

        foreach ($tasks as $task) {
            $stmt = $conn->prepare("DELETE FROM tasks WHERE id=:id");
            $stmt->bindParam(':id', $task['id']);
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