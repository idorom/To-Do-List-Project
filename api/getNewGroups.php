<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}


$userId= $_POST['userId'];

$sql = "SELECT u.userId as groupID, u.mail as mail, u.userName as groupName,m.status as status1
from `groups` g
inner join `users` u ON u.userId=g.groupID
left join `membersingroup` m ON g.groupID=m.groupID and m.userID='$userId'
where g.groupID<>'$userId' and (m.status=\"RQ\" OR m.status IS NULL)";

$result = $conn->query($sql);
$arr = array();

if ($result) {

    foreach ($result as $inner_row) :
        array_push($arr, $inner_row);
    endforeach;
}


echo(json_encode($arr));

?>