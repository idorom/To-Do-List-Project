<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail1'])){
    header('Location: ../signIN.php');
    exit;
}

$userId= $_POST["userId"];
//$mail= $_POST['user_mail'];
$password= $_POST['user_password'];


$sql= "UPDATE `Users`
SET `password`='$password'
WHERE userId=$userId";

if($conn->query($sql)===true){
    echo json_encode(array('success' => 1));
}    
else{
    echo json_encode(array('success' => 0));
}

$conn->close();
?>