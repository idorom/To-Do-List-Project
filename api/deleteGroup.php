<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}
   
    $userId= $_POST["userId"];

    $sql= "DELETE FROM `to_do_list` WHERE groupID=$userId;";
           

    if($conn->query($sql)===true){ 

        $sql= "DELETE FROM `membersingroup` WHERE groupID=$userId;";
        if($conn->query($sql)===true)
        {  

            $sql= "DELETE FROM `groups` WHERE groupID=$userId;";
            if($conn->query($sql)===true)
            {                  
                echo json_encode(array('success' => 1));
            }    
            else
            {
                echo json_encode(array('success' => "\'groups\' delete failed"));
            }
        }    
        else
        {
            echo json_encode(array('success' => "\'membersingroup\' delete failed"));
        }
    }    
    else
    {
        echo json_encode(array('success' => "\'to_do_list\' delete failed"));
    }

$conn->close();
?>