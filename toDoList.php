<?php require_once("parts/header.php"); ?>
 
<?php
        if(!isset($_SESSION['mail'])){
            header('Location: signIN.php');
            exit;
        }
        
        $mail= $_SESSION["mail"];
        $userId= $_SESSION["userId"];
        $userName= $_SESSION["userName"];

        if(isset($_SESSION['groupIdFromHomePage']))
          $groupId= $_SESSION['groupIdFromHomePage'];
        else
          $groupId=null;
        //when the user refresh the page again the first opstion of selectorGroup will be chosen
        $_SESSION['groupIdFromHomePage']=null; 

        //Taken from solution: https://stackoverflow.com/questions/64016241/cryptojs-encrypt-decrypt-by-php-and-javascript-simple-output-encrypted-strin
        //{
        function myCrypt($value, $key, $iv){
          $encrypted_data = openssl_encrypt($value, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
          return base64_encode($encrypted_data);
        }
        
        function myDecrypt($value, $key, $iv){
          $value = base64_decode($value);
          $data = openssl_decrypt($value, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
          return $data;
        }
        
        $valTxt="MyText";
        $key="01234567890123456789012345678901"; // 32 bytes
        $vector="1234567890123412"; // 16 bytes
        $encrypted = myCrypt("mail4@gmail.com", $key, $vector);
        $decrypted = myDecrypt($encrypted, $key, $vector);
        //}
 ?>



    
<div class="container py-5" id="container4" data-id=<?=$userId?> data-mail=<?=$mail?> data-name=<?=$userName?> data-gid=<?=$groupId?>>
      <div class="row mt-4 my-mt-2">
        <div class="col-7 col-md-2">
            <h3 class="h3_title">ToDoList</h3> 
            <h5>Hello: <?=$userName?></h5> 
        </div>
      </div>
      
      <div class="row my-1 my-mt-0">
        <div class="col-7 col-md-2">
          <label id="lb_selector_Group" for="selectorGroup" class="form-label">Group Name</label>
          <select id="selectorGroup" class="form-select" aria-label="Default select example">
          <!--reload by JS-->
          </select>  
       </div>

        <div class="col-7 col-md-2" id="selectSortDiv">
          <label id="lb_select_Sort" for="selectSort" class="form-label">Order By</label>
          <select id="selectSort" class="form-select" aria-label="Default select example">
            <option selected class="sort_by_date_option">sort_by_date</option>
            <option class="sort_by_name_option">sort_by_name</option>
          </select>  
        </div>
      
        <div class="col-12" id="colTable">       
          <table class="table table-responsive table-bordered table-responsive-md table-striped text-center my-3" id="calsTable">        
            <thead>      
              <!--reload by JS-->
            </thead>
              <tbody> 
                <!--reload by JS-->
              </tbody>    
          </table>   
        </div>  
    </div>

    <div class="row my-3 my-md-4" id="add_toDo_buttonDiv">         
      <div class="col-12 col-md-8">                 
        <button type="button" id="add_toDo_button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddUpdateModal">
              Add Task 
        </button> 
        <label id="lb_select_date_of_current_tasks" for="select_date_of_current_tasks" class="form-label">Choose A Date For Coppying All Tasks For Today:</label>
      </div>
    </div>

    <div class="row my-3 my-md-4">
      <div class="col-7 col-md-2"> 
          <select id="select_date_of_current_tasks" class="form-select" aria-label="Default select example">
          <!--reload by JS-->
          </select>  
        <button type="button" id="choose_date_of_tasks_to_dupllicate" class="btn btn-primary">
          Copy 
        </button>              
      </div>
    </div>  

</div>





  <!-- Modals -->
  <div class="modal fade insert collapse" id="AddUpdateModal" tabindex="-1" role="dialog" aria-labelledby="AddUpdateModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <h5 class="modal-title" id="AddUpdateModalLabel"></h5>        
        </div>
        <div class="modal-body">
          <form id="add_update_form" method="POST" >
            <div id="app">
              <fieldset>
                <div class="mb-3 autocomplete" id="div_task_Name">
                  <label id="lb_task_Name" for="task_Name" class="form-label">Task Name</label>  
                  <label id="eror_task_Name" data-name="Task Name" for="task_Name" class="form-label our_error_label"></label>     
                  <input id="task_Name" type="text" name="task_Name" placeholder="Task Name" v-model="task.task_Name" >
                </div>      
                    
                <div class="mb-3" id="div_task_owner" >
                  <label for="task_owner" class="form-label">Owner</label>        
                  <select id="task_owner" class="form-select" aria-label="Default select example" v-model="task.task_owner">                
                  </select>
                </div>
                <div class="mb-3" id="div_task_date">
                  <label id="lb_task_date" for="task_date" class="form-label">Due Date</label>
                  <label id="eror_task_date" data-name="Due Date" for="task_date" class="form-label our_error_label"></label>     
                  <input type="date" class="form-control" id="task_date" v-model="task.task_date">
                </div>
              
                  
                      <!-- <input type="text" placeholder="task Name" />
                      <input type="text" placeholder="task owner" "/>
                      <input type="text" placeholder="task date" /> -->
              </fieldset>
             
               <label id="lb_vue1" v-if="task.task_Name ||task.task_date">Task name: {{task.task_Name}}</label>
               <br>
               <label id="lb_vue2" v-if="task.task_Name ||task.task_date">Task owner: {{task.task_owner}}</label>
               <br>
               <label id="lb_vue3" v-if="task.task_Name ||task.task_date">Task date: {{task.task_date}}</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" id="cancel" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <input type="submit" id="submit1" form="add_update_form" class="btn btn-primary" value="Submit"></input>
        </div>
      </div>
    </div>
  </div>




  <div class="modal fade insert collapse" id="confirmation" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <h5 class="modal-title" id="deleteModalLabel">Delete Model</h5>    
        </div>
        <div class="modal-body" id="modal-body">                   
        </div>
        <div class="modal-footer">
          <button type="button" id="cancel1" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <a type="button" id="delete1" class="btn btn-default btn-ok btn-danger"data-bs-dismiss="modal">Continue</a>  
        </div>        
      </div>
    </div> 
  </div>

  <script src="JS/toDoList.js"></script>
  

  <?php require_once("parts/footer.php"); ?>