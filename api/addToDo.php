<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$name= $_POST['name'];
$ownerID= $_POST['ownerID'];
$isComplete= 0;
$DueDate= $_POST['DueDate'];
$groupId= $_POST['groupId'];

$sql= "INSERT INTO `To_Do_List`(`name`, `ownerID`, `isComplete`, `DueDate`, `groupId`)
VALUES ('$name', '$ownerID', '$isComplete', '$DueDate', '$groupId')";

if($conn->query($sql)===true){
    $last_id=$conn->insert_id;
    echo json_encode(array('success' => 1, "id"=>$last_id));
}    
else{
    echo json_encode(array('success' => 0));
}

$conn->close();
?>
