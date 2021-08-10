<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}


   $toDoId= $_POST["toDoId"];
    $sql= "DELETE FROM `to_do_list` WHERE toDoId='$toDoId'";

    if($conn->query($sql)===true){
        // $last_id=$conn->insert_id;
        echo json_encode(array('success' => 1));
    }    
    else{
        echo json_encode(array('success' => 0));
    }
    
$conn->close();
?>