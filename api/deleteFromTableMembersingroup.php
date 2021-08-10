<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}


   $userID= $_POST["userID"];
   $grpuoID= $_POST["grpuoID"];

    $sql= "DELETE FROM `membersingroup` WHERE groupID='$grpuoID' AND userID='$userID'";

    if($conn->query($sql)===true){
        // $last_id=$conn->insert_id;
        echo json_encode(array('success' => 1));
    }    
    else{
        echo json_encode(array('success' => 0));
    }
    
$conn->close();
?>