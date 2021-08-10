<?php
require_once("../db.php");

session_start();
if(!isset($_SESSION['mail'])){
    header('Location: ../signIN.php');
    exit;
}


$data= $_POST["data"];

$sql;
$counter=0;
foreach($data as $row)
{
    $name= $row['name'];
    $ownerID= $row['owner']['userId'];
    $isComplete= 0;
    $DueDate= $row['toCompleteDate'];
    $groupId= $row['groupId'];

    if($counter>0)
    {
        $sql .= "INSERT INTO `To_Do_List`(`name`, `ownerID`, `isComplete`, `DueDate`, `groupId`)
            VALUES ('$name', '$ownerID', '$isComplete', '$DueDate', '$groupId'); ";
    }
    else{
        $sql= "INSERT INTO `To_Do_List`(`name`, `ownerID`, `isComplete`, `DueDate`, `groupId`)
            VALUES ('$name', '$ownerID', '$isComplete', '$DueDate', '$groupId'); ";
    }
    $counter++;
    // echo "$counter";
}
// var_dump($sql);

if ($conn->multi_query($sql) === TRUE) {
    echo json_encode(array('success' => 1));
} else {
    echo json_encode(array('success' => 0));
}

$conn = null;
?>






