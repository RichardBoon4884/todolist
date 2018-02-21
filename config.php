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