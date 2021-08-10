<?php
   require_once("../db.php");
   
    $userId= $_POST["userId"];
    $sql= "DELETE FROM Users WHERE userId=$userId";

    if($conn->query($sql)===true){
        $last_id=$conn->insert_id;
        echo json_encode(array('success' => 1, "userId"=>$last_id));
    }    
    else{
        echo json_encode(array('success' => 0));
    }

$conn->close();
?>