<?php 
$serverName= "localhost";
$userName= "root";
$password= "";

$conn = new mysqli($serverName, $userName, $password);

if($conn->connect_error)
    die("conncetion failed: " . $conn->connect_error);

$dbName= "My_ToDo_List";
if(!mysqli_select_db($conn,$dbName)){
    $sql= "CREATE DATABASE $dbName";
    if($conn->query($sql)===false)
       echo "error creadting database: " . $conn->error;

}

$conn = new mysqli($serverName,$userName,$password,$dbName);

$sql= " SELECT userId FROM Users ";
if(!$conn->query($sql)){
    $sql= "CREATE TABLE Users(userId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    `mail` VARCHAR(999) UNIQUE, `userName` VARCHAR(999), `password` VARCHAR(999));";

    if($conn->query($sql)===false)
        echo "error creadting table: " . $conn->error;
}


$sql= " SELECT groupID FROM groups ";
if(!$conn->query($sql)){
    $sql= "CREATE TABLE groups(groupID INT(6) UNSIGNED PRIMARY KEY,
            constraint group_owner_fk foreign key (groupID) references Users (userId) );";
    if($conn->query($sql)===false)
        echo "error creadting table: " . $conn->error;
}



$sql= " SELECT toDoId FROM to_do_list ";
if(!$conn->query($sql)){
    $sql= "CREATE TABLE to_do_list(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    `name` VARCHAR(999) NOT NULL, ownerID INT(6) unsigned NOT NULL,
    isComplete INT NOT NULL, DueDate DATE NOT NULL, groupID INT(6) unsigned NOT NULL,
    constraint ownership_todo2_fk foreign key (ownerID) references Users (userId) 
    );";  // ownership_todo_fk make the FK from table Users

    if($conn->query($sql)===true){        
        $sql= "Alter table to_do_list add FOREIGN KEY(groupID) REFERENCES groups (groupID);";
        if($conn->query($sql)===false)
            echo "error creadting table1: " . $conn->error;     
    }
}


$sql= " SELECT groupID FROM membersInGroup ";
if(!$conn->query($sql)){
    $sql= "CREATE TABLE membersInGroup(groupID INT(6) UNSIGNED NOT NULL, userID INT(6) UNSIGNED NOT NULL,   
           `status` VARCHAR(3) NOT NULL,         
           constraint g_O_ID_fk foreign key (groupID) references groups (groupID) on delete cascade,           
           PRIMARY KEY (groupID, userID) );";
    if($conn->query($sql)===true)
    {
        $sql= "Alter table membersInGroup add FOREIGN KEY(userId) REFERENCES Users (userId);";
        if($conn->query($sql)===false)
            echo "error creadting table: " . $conn->error;      
    }  
}


?>
