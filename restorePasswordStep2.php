    <?php require_once("parts/header.php"); ?>

<?php
      $mail=null;
      if(isset($_SESSION["mail"]))
        $mail=$_SESSION["mail"];
      else
        $mail=null;

    if( (!isset($_SESSION["mail1"])) || (!isset($_SESSION["userId1"])) ){
        header('Location: restorePassword.php');
        exit;
    }

    $mail= $_SESSION["mail1"];
    $userId= $_SESSION["userId1"];
 ?>





    <div class="container" id="container6" data-id=<?=$userId?> data-mail=<?=$mail?>>

      
      <div class="row">
        <div class="column" id="icon3div">
          <img id="icon6" src="images/56.png">
          <!-- <img id="icon4" src="images/logo2.png"> -->
        </div>

        <div class="col login-content" id="rFormDiv6">
          <div class="login-content"> 
            <form id="form4" method="POST">
              <h2 class="title">RESTORE PASSWORD 2</h2>
              <div class="input-div pass">           		   
                <div class="i">            		    	
                  <i class="fas fa-lock"></i>           		   
                </div>           		   
                <div class="div">           		    	
                  <h5>Password</h5>           		    	
                  <input type="password" class="input" id="user_password_step_2", name="user_password">            	   
                </div>                
              </div>
                        
              <div class="input-div pass">                    
                <div class="i">                          
                  <i class="fas fa-lock"></i>                    
                </div>                    
                <div class="div">                         
                  <h5>Password valid</h5>                        
                  <input type="password" class="input" id="confirm_user_password_step_2", name="confirm_user_password">                
                </div>              
              </div>

              <input type="submit" class ="btn1" id="reset_password_button_step_2" value="Reset Password Button">            
            </form> 
          </div>
        </div>
      </div>
    </div>

    <script src="JS/restorePassword2.js"></script>

    <?php require_once("parts/footer.php"); ?>