<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$userId = $_POST['userId'];
$groupId= $_POST['groupId'];

$sql = "SELECT `userId`,`mail`,`userName` FROM `users` WHERE `userId`='$groupId' 
        UNION 
        SELECT `userId`,`mail`,`userName` FROM `users` 
        WHERE userId IN(SELECT userID FROM `membersInGroup` as mg WHERE groupID='$groupId' AND mg.`status`=\"M\")";


$result = $conn->query($sql);
$arr = array();

if ($result) {

    foreach ($result as $inner_row) :
        array_push($arr, $inner_row);
    endforeach;
}


echo(json_encode($arr));

?>