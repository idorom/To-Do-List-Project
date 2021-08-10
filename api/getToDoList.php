<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

// $mail = $_POST['mail'];
$groupId= $_POST['groupId'];

$sql = "SELECT toDoId,`name`,userId,`mail`,`userName`, `isComplete`, `DueDate`, `groupId` 
        FROM `to_do_list`INNER JOIN `users` ON ownerID=userId
        WHERE `groupId`='$groupId'";

$result = $conn->query($sql);
$arr = array();

if ($result) {

    foreach ($result as $inner_row) :
        array_push($arr, $inner_row);
    endforeach;
}


echo(json_encode($arr));

?>