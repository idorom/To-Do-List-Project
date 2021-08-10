<?php 
session_start();

if(!isset($_SESSION['mail'])){
    header('Location: signIN.php');
    exit;
}

$_SESSION=[]; //delete session
session_destroy(); //delete session
setcookie("data", $data, strtotime("-7 day"));
header('Location: signIN.php');
exit;