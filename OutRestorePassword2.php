<?php 
session_start();
$_SESSION=[]; //delete session
session_destroy(); //delete session
header('Location: signIN.php');
exit;