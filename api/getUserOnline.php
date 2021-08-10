<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$mail = $_POST['mail'];
$userID;

$sql = "SELECT `mail`, userId, `userName` FROM `users` WHERE `mail`='$mail'";
$result = $conn->query($sql);
$arr = array();

if ($result) {
    foreach ($result as $inner_row) :
        array_push($arr, $inner_row);
    endforeach;
}

echo(json_encode($arr));

?>