<?php 
    session_start();
    require_once("db.php");
?>
<?php
    if(isset($_COOKIE["data"])){
      $user_data = unserialize($_COOKIE["data"]);

      $_SESSION["mail"]=$user_data[0];
      $_SESSION["userId"]=$user_data[1];
      $_SESSION["userName"]=$user_data[2];
    }
?>

<!doctype html>
<html lang="he" dir="ltr">
  <head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.rtl.min.css" integrity="sha384-4dNpRvNX0c/TdYEbYup8qbjvjaMrgUPh+g4I03CnNtANuv+VAvPL6LqdwzZKV38G" crossorigin="anonymous">
    
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    
    <link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a81368914c.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>


    <title></title>
  </head>

  <body>
    <header id="header" class="header"> 
      <nav class="navbar navbar-expand-lg navbar-light bg-light" id="mainNav">
        <div class="container" id="u">  
          <div class="container container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".toggle_titles" aria-controls=".toggle_titles" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                <a class="navbar-brand title"></a>
            </button>

            <div class="collapse navbar-collapse lNav toggle_titles" id="navbarNav">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                  <li class="nav-item ">
                    <a class="nav-link " href="Home.php"/>HomePage</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="toDoList.php"/>ToDoList</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="restorePassword.php"/>Restore Password</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="signUP.php"/>Sign-Up</a>
                </li>
                </ul>
            </div>

            <div class="collapse navbar-collapse rNav toggle_titles" id="log_In_Out">
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0 ">
                  <li class="nav-item">
                    <a class="nav-link" id="nav_signIN_LogOut"  href="signIN.php"/>Log-In</a>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </header> 