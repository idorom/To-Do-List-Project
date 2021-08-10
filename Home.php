<?php require_once("parts/header.php"); ?>
 
<?php
        if(!isset($_SESSION['mail'])){
            header('Location: signIN.php');
            exit;
        }
       
        $mail= $_SESSION["mail"];
        $userId= $_SESSION["userId"];
        $userName= $_SESSION["userName"];

?>

    
<div class="container py-5" id="container5" data-id=<?=$userId?> data-mail=<?=$mail?> data-name=<?=$userName?>>

    <div class="row mt-4 my-mt-2">
      <div class="col-7 col-md-2">
          <h3 class="h3_title">HomePage</h3>
          <h5>Hello: <?=$userName?></h5> 
      </div>
    </div>
   
    <div class="row mt-2 my-mt-1">    
      <div class="col-12 col-md-3">
        <form id="form5" method="POST" >
          <label id="lb_selector_Group1" for="selectGroup1" class="form-label">Choose A Group From The List</label>
          <select id="selectGroup1" class="form-select" aria-label="Default select example">
          <!--reload by JS-->
          </select>        
          <input type="submit" class ="btn btn-primary" id="move_to_toDoList" value="ToDOList">
          
          <div id="move_to_toDoList_buttonDiv">
            <label id="lbl_err_move_to_toDoList" for="move_to_toDoList" class="form-label our_error_label"></label>
          </div> 

          <button type="button" id="Create_Delete_Group_button" class="btn btn-primary"></button>
        </form>
      </div> 
    </div>
     
    
    <div class="row mt-0 my-mt-0"> 
      <div class="col-11 col-md-3">
        <label id="lb_selector_Active1" for="selectActive1" class="form-label">Groups</label>
        <select id="selectActive1" class="form-select" aria-label="Default select example">
            <option selected class="sort_by_date_option" data-id=1>Request Memberships</option>
            <option class="sort_by_date_option" data-id=2>My Memberships</option>
            <option class="sort_by_name_option manager_option" data-id=3>Handle My Group's Requsts</option>
            <option class="sort_by_name_option manager_option" data-id=4>Handle My Group's Members</option>
        </select>
      </div>   

      <div class="col-10 col-md-12" id="divGroupsTable">       
        <table class="table table-responsive table-bordered table-responsive-md table-striped text-center my-5" id="groupsTable">        
          <thead>      
            <!--reload by JS-->
          </thead>
            <tbody> 
              <!--reload by JS-->
            </tbody>    
        </table>   
      </div>
    </div>
       
</div>


  <div class="modal fade insert collapse" id="Home_modal" tabindex="-1" role="dialog" aria-labelledby="Home_modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <h5 class="modal-title" id="Home_modalLabel"><!--reload by JS--></h5> 
        </div>
        <div class="modal-body" id="modal-body"> 
        <!--reload by JS-->                  
        </div>
        <div class="modal-footer">
          <button type="button" id="cancel2" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <a type="button" id="Home_modal_btn" class="btn btn-default btn-ok btn-danger"data-bs-dismiss="modal">Continue</a>  
        </div>        
      </div>
    </div>
    
  </div>

  
  <script src="JS/Home.js"></script>  

  <?php require_once("parts/footer.php"); ?>