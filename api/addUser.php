<?php
require_once("../db.php");


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

$encrypted = myCrypt($_POST['user_mail'], $key, $vector);
$mail= $encrypted;
$password= $_POST['user_password'];
$userName= $_POST['user_name'];




$sql= " SELECT `userId`, `mail` FROM `users` WHERE `mail`='$mail'";

$result = $conn->query($sql);

$tempID= -1;
$tempMail="";

if($result!=null){
    foreach ($result as $row) :
        if ($row['mail'] === $mail) {
                $tempID = $row['userId'];
                $tempMail= $row['mail'];
                break;
        }
    endforeach;
}


if($tempID===-1){
    $sql= "INSERT INTO `users`(`mail`, `userName`, `password`) VALUES ('$mail','$userName','$password')";

    if($conn->query($sql)===true){
        $last_id=$conn->insert_id;
        echo json_encode(array('success' => 1, "id"=>$last_id));
    }    
    else{
        echo json_encode(array('success' => 0));
    }
}    
else{
    echo json_encode(array('success' => 2, "mail"=>$tempMail));
}




$conn->close();
?>