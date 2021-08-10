<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$groupID = $_POST['groupID'];

$sql = "SELECT u.userId as userID, u.mail as mail, u.userName as groupName, mg.`status` as status1
FROM `membersingroup` as mg INNER JOIN `users` as u ON mg.userID=u.userId
WHERE mg.groupID='$groupID' AND mg.`status`=\"M\"";

$result = $conn->query($sql);
$arr = array();

if ($result) {
    foreach ($result as $inner_row) :
        array_push($arr, $inner_row);
    endforeach;
}


echo(json_encode($arr));

?>