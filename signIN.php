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
    $temp=$_POST['mail'];
    $encrypted = myCrypt($temp, $key, $vector);

    $mail= $encrypted;

    $password= $_POST['user_password'];
    $savePassword= $_POST['save_password'];
    
    $sql= " SELECT `userId`, `mail`, `userName` FROM `users` WHERE `mail`='$mail' AND `password`='$password'";
    
    $result = $conn->query($sql);
    
    $userId= -1;
    $userName;
    
    foreach ($result as $row) :
        if ($row['mail'] === $mail) {
                $userId = $row['userId'];
                $userName = $row['userName'];
                break;
        }
    endforeach;
    
    if($userId>-1){    
        $_SESSION["mail"]=$mail;
        $_SESSION["userId"]=$userId;
        $_SESSION["userName"]=$userName;

        $data = serialize(array($mail, $userId, $userName));

        if($savePassword=="on"){
          setcookie("data", $data, strtotime("7 day"));
        }
        header('Location: Home.php');
        exit;
      }
      else{
        $ErrorM= "The Mail: '$temp' was not found";
        header('Location: signIN.php?err=1&errText='.$ErrorM.'');          
        exit;
      }
  }
?>

	

	<div class="container" id="container1" data-mail=<?=$mail?>>

    <div class="row">
        <div class="column" id="icon1div">
          <img id="icon1" src="images/logo1.png">
        </div>

        <div class="column login-content"  id="rFormDiv1">
          <form id="form1" method="POST" onsubmit="return validtionMailAndPassword()"/>
            <img src="images/avatar.svg">
            <h2 class="title">Welcome</h2>
              <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <h5>Mail</h5>
                    <input type="email" class="input form-control" name="mail" id="mail" aria-describedby="emailHelp">
                  </div>
              </div>
              <div class="input-div pass">
                  <div class="i"> 
                    <i class="fas fa-lock"></i>
                  </div>
                  <div class="div">
                    <h5>Password</h5>
                    <input type="password" class="input form-control" name="user_password" id="user_password">
                  </div>
              </div>
              <div class="div">
                <a class="signIN_a" href="restorePassword.php">?Forgot Password</a>
                <a class="signIN_a" href="signUP.php">Sign Up</a>  
              </div>

              <div class="div">
                <label for="save_password" class="form-label">Remember Me</label>
                <input type="checkbox" name="save_password" id="save_password">
              </div>


            <input type="submit" class ="btn1" id="login_button" value="Login">

            <?php if(isset($_GET["err"]) && $_GET["err"]=="1"):?>
              <div class="alert alert-danger" role="alert">
                <?=$_GET["errText"]; ?>
              </div>
            <?php endif;?>
          </form>      
        </div>
    </div>
  </div>
    <script src="JS/login.js"></script>

    <?php require_once("parts/footer.php"); ?>
