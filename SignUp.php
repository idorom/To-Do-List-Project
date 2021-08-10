<?php require_once("parts/header.php"); ?>

<?php 
    $mail=null;
    if(isset($_SESSION["mail"]))
      $mail=$_SESSION["mail"];
    else
      $mail=null;
?>

<div class="container py-5" id="container2" data-mail=<?=$mail?>>

  <div class="row">
    <div class="column" id="icon2div">
      <img id="icon2" src="images/logo2.png"> 
    </div>

    <div class="column login-content" id="rFormDiv2">
      <div class="login-content"> 
        <form id="form2" method="POST">
        <h2 class="title">Sign-Up</h2>
          <div class="input-div one">           		   
            <div class="i">           		   		
              <i class="fas fa-user"></i>           		   
            </div> 
            <div class="div">
              <h5>Username</h5>           		   		
              <input type="text" class="input" id="user_name", name="user_name">    		   
            </div>            
          </div>
              
          <div class="input-div one">                
            <div class="i">                        
              <i class="fas fa-user"></i>                
            </div>                
            <div class="div">                  
              <h5>mail</h5>                    
              <input type="text" class="input" id="user_mail", name="user_mail">            
            </div>      
          </div>

          <div class="input-div one">        
            <div class="i">                
              <i class="fas fa-user"></i>        
            </div>        
            <div class="div">            
              <h5>mail valid</h5>            
              <input type="text" class="input" id="confirm_user_mail", name="confirm_user_mail">           		
            </div>            
          </div>
              
          <div class="input-div pass">           		   
            <div class="i">            		    	
              <i class="fas fa-lock"></i>           		   
            </div>           		   
            <div class="div">           		    	
              <h5>Password</h5>           		    	
              <input type="password" class="input" id="user_password", name="user_password">            	   
            </div>                
          </div>
                    
          <div class="input-div pass">                    
            <div class="i">                          
              <i class="fas fa-lock"></i>                    
            </div>                    
            <div class="div">                         
              <h5>Password valid</h5>                        
              <input type="password" class="input" id="confirm_user_password", name="confirm_user_password">                
            </div>              
          </div>

          <input type="submit" class ="btn1" id="SignUp_button" value="Sign Up">  
          <?php if(isset($_GET["err"]) && $_GET["err"]=="1"):?>
            <div class="alert alert-danger" role="alert">
              <?=$_GET["errText"]; ?>
            </div>
          <?php endif;?>      
        </form> 
      </div>

  </div>
</div>
   
<script src="JS/SignUp.js"></script>

<?php require_once("parts/footer.php"); ?>