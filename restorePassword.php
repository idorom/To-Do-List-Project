<?php require_once("parts/header.php"); ?>

<?php
      $mail=null;
      if(isset($_SESSION["mail"]))
        $mail=$_SESSION["mail"];
      else
        $mail=null;
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

  if($_POST){
    $temp=$_POST['user_mail'];
    $encrypted = myCrypt($temp, $key, $vector);

    $mail= $encrypted;

    
    $sql= " SELECT `userId`, `mail` FROM `users` WHERE `mail`='$mail'";
    
    $result = $conn->query($sql);
    
    $userId= -1;
    
    if($result){
    foreach ($result as $row) :
        if ($row['mail'] === $mail) {
                $userId = $row['userId'];
                break;
        }
    endforeach;
    
    if($userId>-1){    
        $_SESSION["mail1"]=$mail;
        $_SESSION["userId1"]=$userId;

        header('Location: restorePasswordStep2.php');
        exit;
      }
    
      else{
        $ErrorM= "The Mail: '$temp' Has Not Found";
        header('Location: restorePassword.php?err=1&errText='.$ErrorM.'');   
        exit;
      }
    }
  }
?>



  <div class="container" id="container3" data-mail=<?= $mail?>> 

    <div class="row">
      <div class="column" id="icon3div">
        <img id="icon3" src="images/56.png">
      </div>

      <div class="col login-content" id="rFormDiv3">
        <div class="login-content"> 
          <form id="form3" method="POST" onsubmit="return RestorePassword()"/>
          <h2 class="title">RESTORE PASSWORD</h2>
            <div class="input-div pass">           		   
              <div class="i">           		   		
                <i class="fas fa-user"></i>           		   
              </div> 
              <div class="div">
                <h5>Your Email</h5>           		   		
                <input type="email" class="input" id="user_mail", name="user_mail">    		   
              </div>            
            </div>   

            <input type="submit" class ="btn1" id="reset_password_button" value="Enter your Mail"> 

            <?php if(isset($_GET["err"]) && $_GET["err"]=="1"):?>
              <div class="alert alert-danger" role="alert">
                <?=$_GET["errText"]; ?>
              </div>
            <?php endif;?>        
          </form> 
        </div>
      </div>
    </div>
  </div>

    <script src="JS/restorePassword.js"></script>

    <?php require_once("parts/footer.php"); ?>