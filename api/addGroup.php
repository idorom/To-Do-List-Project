<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$userId= $_POST["userId"];

$sql= "INSERT INTO `groups` (`groupID`) VALUES('$userId')";

if($conn->query($sql)===true){
    $last_id=$conn->insert_id;
    echo json_encode(array('success' => 1, "id"=>$last_id));
}    
else{
    echo json_encode(array('success' => 0));
}

$conn->close();
?>
