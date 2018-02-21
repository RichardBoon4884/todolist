<?php

require "../../config.php";

switch ((isset($_GET['action'])) ? $_GET['action'] : false) {
    case "index":
        $stmt = $conn->prepare("SELECT * FROM tasks WHERE list=:list");
        $stmt->bindParam(':list', $_GET['list']);
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
                $stmt = $conn->prepare("UPDATE tasks SET title=:title, done=:done, list=:list WHERE id=:id");
                $stmt->bindParam(':id', $task['id']);
            } else {
                $stmt = $conn->prepare("INSERT INTO tasks SET title=:title, done=:done, list=:list");
            }
            $done = ($task['done']) ? 1 : 0;
            $stmt->bindParam(':title', $task['title']);
            $stmt->bindParam(':done', $done);
            $stmt->bindParam(':list', $task['list']);
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