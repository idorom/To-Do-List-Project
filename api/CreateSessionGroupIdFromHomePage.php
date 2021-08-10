<?php
require_once("../db.php");

session_start();
    $_SESSION['groupIdFromHomePage']= $_POST['groupId'];

    if(isset($_SESSION['groupIdFromHomePage'])){
        echo json_encode(array('success' => 1));
    }    
    else{
        echo json_encode(array('success' => 0));
    }
    exit;
?>