<?php
require_once("../db.php");

$userId= $_POST["userId"];

//Taken from solution: https://stackoverflow.com/questions/64016241/cryptojs-encrypt-decrypt-by-php-and-javascript-simple-output-encrypted-strin
//{
function myCrypt($value, $key, $iv){
    $encrypted_data = openssl_encrypt($value, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($encrypted_data);
  }    
$valTxt="MyText";
$key="01234567890123456789012345678901"; // 32 bytes
$vector="1234567890123412"; // 16 bytes    
//}

$encrypted = myCrypt($_POST['mail'], $key, $vector);
$mail= $encrypted;

$userName= $_POST['user_mail'];

$sql= "UPDATE `Users`
SET `mail`='$mail', `userName`='$userName'
WHERE userId=$userId";

if($conn->query($sql)===true){
    echo json_encode(array('success' => 1));
}    
else{
    echo json_encode(array('success' => 0));
}

$conn->close();
?>