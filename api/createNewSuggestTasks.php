<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}


$userID= $_POST["toDoId"];


$sql="SELECT t.`name`, t.toDoId, `groupID` 
FROM to_do_list t 
Where t.groupID IN(SELECT groupID FROM membersingroup m WHERE m.userID='$userID' AND m.status=\"m\")";

if($conn->query($sql)===true){
    echo json_encode(array('success' => 1));
}    
else{
    echo json_encode(array('success' => 0));
}

$conn->close();
?>