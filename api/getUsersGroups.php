<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}

$userId = $_POST['userId'];

$sql = "SELECT `userName`, u1.userId as groupID 
        FROM `users` as u1 INNER JOIN `groups` as g1 ON u1.userId=g1.groupID 
        WHERE u1.userId='$userId'
        UNION 
        SELECT u3.`userName`, u3.userId as groupID 
        FROM `membersInGroup` as mg3 INNER JOIN `users` as u3 ON mg3.groupID=u3.userId 
        WHERE mg3.userId='$userId' AND mg3.groupID!='$userId' AND mg3.`status`=\"M\"
        UNION 
        SELECT u.`userName`, u.userId as groupID FROM
        (SELECT mg.groupID as groupID FROM `membersInGroup` as mg INNER JOIN `groups` as g2 ON mg.userId=g2.groupID 
                        WHERE mg.userId='$userId' AND mg.`status`=\"M\") as t INNER JOIN `users` as u ON t.groupID=u.userId";

$result = $conn->query($sql);
$arr = array();

if ($result) {
    foreach ($result as $inner_row) :
        array_push($arr, $inner_row);
    endforeach;
}


echo(json_encode($arr));

?>