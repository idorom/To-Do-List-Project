<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$toDoId= $_POST["toDoId"];

$name= $_POST['name'];
$ownerID= $_POST['ownerID'];
$DueDate= $_POST['DueDate'];

$sql= "UPDATE `To_Do_List`
SET `name`='$name', `ownerID`='$ownerID', `DueDate`='$DueDate'
WHERE toDoId=$toDoId";

if($conn->query($sql)===true){
    echo json_encode(array('success' => 1));
}    
else{
    echo json_encode(array('success' => 0));
}

$conn->close();
?>