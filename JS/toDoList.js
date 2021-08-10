let table = document.getElementById("calsTable");
let bool = false;
let sortBool = false;

let groupsList=[];

let thingsToDo = [];
let defulatCorrentUser;  //Current user using the system;
let groupId; //Current group using the by defulatCorrentUser;
let globalUserID;
let globalUserMail;
let globalUserName;
let fromHomPage_GID;

let vue;

//global form's elements value
let taskNameTemp= "";
let taskDateTemp= "";
/*currently the user that enter the system is david and the user that enter the system is always 
the defualt owner of the task, unless the user change the owner*/
let taskOwnerTempNew; 
let isScecoundTime=false;   

let membersList = [];
let dateTasks= [];

const suggest_tasks = [
    {"name":"toDo1"},
    {"name":"toDo2"},
    {"name":"toDo3"},
    {"name":"toDo4"},
    {"name":"toDo5"}, 
    {"name":"toDo11"},
    {"name":"aaaaa"},
    {"name":"abc"},
    {"name":"aab"},
    {"name":"working"}, 
    {"name":"work"}, 
];

      let suggest_tasks_list=[];
      for(i=0 ; i< suggest_tasks.length ; i++)
      {
        suggest_tasks_list.push(suggest_tasks[i].name);
      }


function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
        
    return [year, month, day].join('-');
}


//Function that reload the memberList Users to the Selector
function reload_Selector_List(){
    let p=0;
    let strTemp;
    
    $('#task_owner').html('');
    
    for( p=0 ; p<membersList.length ; p++){    
        strTemp=(membersList[p].userId=== taskOwnerTempNew.userId) ? " selected " : "";
        $("#task_owner").append("<option data-id=\""+membersList[p].userId+"\" "+ strTemp + ">"+ membersList[p].ownerName + "</option>");           
    }
}


//Function that reload the memberGroupsList Users to the Selector
function reload_Selector_Groups_List(){
    let p=0;
    let strTemp;   
    $('#selectorGroup').html('');

    let chosenID;

    if(fromHomPage_GID!=null)
        chosenID=fromHomPage_GID;
    else
        chosenID=globalUserID;

    for( p=0 ; p<groupsList.length ; p++){     
        strTemp=(groupsList[p].groupID==chosenID) ? " selected " : "";
        $("#selectorGroup").append("<option data-id=\""+groupsList[p].groupID+"\" "+ strTemp + ">"+ groupsList[p].groupName + "</option>");           
    } 
    fromHomPage_GID=null; // fromHomPage_GID will use once at relocation from home page and then become null

    groupId= $("#selectorGroup option:selected").data("id");
}


$(document).ready(function(){
    //Change the navbar title dynamicly
    $('.header .title').html("To Do List"); 
    $('title').html("To Do List");


    if($("#container4").data("mail")){
        $('.header #nav_signIN_LogOut').html("Log-Out");
        $('.header #nav_signIN_LogOut').attr("href", "LogOut.php");
    }
    
    else{
        $('.header #nav_signIN_LogOut').html("Log-In");
        $('.header #nav_signIN_LogOut').attr("href", "signIN.php");
    }

    
    getUserOnline();

    let ownerForm;
    //open the form
    function add_update_Reload(index){    
        let isUpdate=false;
        let erorTaskName = $("#eror_task_Name");
        let erorTaskDate = $("#eror_task_date");     
        let response;
        let taskTemp;


        const modal = new Promise(function(resolve, reject){  
            
            if(index>-1){   //Update-From reload values form's elements from array thingsToDo 
                taskTemp= thingsToDo[index-1];   
                isUpdate=true;
                lbl_text_set(erorTaskName, -1); 
                lbl_text_set(erorTaskDate, -1);  
                
                //reload values of the task to the elements
                if(taskTemp!=null){
                    $("#task_Name").val(taskTemp.name);
                    $("#task_date").val(taskTemp.toCompleteDate);               
                    ownerForm= taskTemp.owner;
                } 
            }
            else //ADD-Form reload values form's elements from global form's elements value
            {        
                $("#task_Name").val(taskNameTemp);
                $("#task_date").val(taskDateTemp);
                ownerForm=taskOwnerTempNew;

                let numTemp;
                numTemp= (isScecoundTime && erorTaskName.html().length>0) ? 0 : -1;
                lbl_text_set(erorTaskName, numTemp);
                
                numTemp= (isScecoundTime && erorTaskDate.html().length>0) ? 0 : -1;
                lbl_text_set(erorTaskDate, numTemp);
            }
            response = ownerForm.userId;
            $("#task_owner option[data-id='" + response + "']").prop("selected", true);



            if(vue){
                autocomplete(document.getElementById("task_Name"), suggest_tasks_list);
                vue.task.task_Name= $("#task_Name").val();
                vue.task.task_owner= $("#task_owner option:selected").html();
                vue.task.task_date= $("#task_date").val();
            }

            
            $('#AddUpdateModal').modal('show');
            
            $('#add_update_form').submit(function(e){
                e.preventDefault();

                let dateSTR = $("#task_date").val();
                let taskName = $("#task_Name").val();  
                let bool = true;
                
                //IF TaskName is empty realod error label && prevent by bool varible confirm of the modal
                if(taskName.length<1){
                    lbl_text_set(erorTaskName, 0);   
                    bool=false;
                }
                else
                    lbl_text_set(erorTaskName, -1);  

                //IF TaskDate is empty realod error label && prevent by bool varible confirm of the modal
                if(dateSTR.length<1){              
                    lbl_text_set(erorTaskDate, 0);
                    bool=false;
                }            
                else
                    lbl_text_set(erorTaskDate, -1);   

                //IF all the field are aproved confirm add/update 
                if(bool){
                    isScecoundTime=false;
                    resolve("user clicked");
                }
            });
            $('#confirmation #cancel').click(function(){
                reject("user clicked cancel");
            });
            $(".modal").on("hidden.bs.modal", function(){
                reject("user clicked cancel");
            });        
        }).then(function(val){
            //val is your returned value. argument called with resolve for: add or update task.
            if(isUpdate)
                update_To_DO(taskTemp);
            else
                add_To_DO();

            //Reset of global elements
            taskNameTemp="";
            taskDateTemp="";
            // taskOwnerTempNew= defulatCorrentUser;
            taskOwnerTempNew.userId= globalUserID;
            taskOwnerTempNew.ownerName= globalUserName;
            
            $('#AddUpdateModal').modal('hide');
        }).catch(function(err){
            //user clicked cancel when press 'exit button' OR 'Cancel Button' OR 'Outside the Modal'

            //IF new task in the add-form not added, the elements are input in
            if(isUpdate===false){
                taskNameTemp=$("#task_Name").val();
                taskDateTemp=$("#task_date").val();

                ownerName=$("#task_owner option:selected").html();
                userId=$("#task_owner option:selected").data("id"); 
                taskOwnerTempNew.userId=userId;
                taskOwnerTempNew.ownerName=ownerName;

                isScecoundTime=true;
            }  
            console.log("In form add or update", err);        
        });
    }
   

    //Function that set label text
    function lbl_text_set(lbl, num){
        errors_names=["' Can't Be Empty)",];
        let error_Text= (num===0) ? ("('"+lbl.data("name") + errors_names[num]) : "";        
        lbl.html(error_Text);
     }
     
     //Function that Update a task in the array by the text fields from the Update-form
     function update_To_DO(taskTemp){
         taskTemp.name= $("#task_Name").val(); 
         taskTemp.owner.ownerName=$("#task_owner option:selected").html();
         taskTemp.owner.userId=$("#task_owner option:selected").data("id"); 
         let oldDate=taskTemp.toCompleteDate;
         taskTemp.toCompleteDate= formatDate(document.querySelector("#task_date").value);
         
         $.ajax({
            type: "POST",
            url: 'api/editToDo.php',
            data: {toDoId: taskTemp.toDoId ,name: taskTemp.name, ownerID: taskTemp.owner.userId, DueDate: taskTemp.toCompleteDate},
            success: function(response)
            {                                   
                console.warn(response);
                let jsonData= JSON.parse(response); 

                if(jsonData.success===1)
                {
                    let id= jsonData.id;
                    dateTasks=[];
                    for(let i=0;i<thingsToDo.length;i++)
                        dateTasks.push(formatDate(thingsToDo[i].toCompleteDate));
                    reload_Date_List();
                }
                else if(jsonData.success===0)  
                {
                    alert("somthing went wrong");                          
                }         
            }
        }); 

         sort_toDo_List();   
     }
     
     //Function that Add a new task in the array by the the text fields from the Add-form
     function add_To_DO(){         
         let name= $("#task_Name").val(); 
         let ownerName=$("#task_owner option:selected").html();
         let userId=$("#task_owner option:selected").data("id"); 
         let owner={"userId": userId , "ownerName":ownerName}; 
         let toCompleteDate= formatDate(document.querySelector("#task_date").value);
         let toDoId;
         $.ajax({
            type: "POST",
            url: 'api/addToDo.php',
            data: {name: name, ownerID: userId, DueDate: toCompleteDate, groupId:groupId},
            success: function(response)
            {                                   
                // console.warn(response);
                let jsonData= JSON.parse(response); 

                if(jsonData.success===1)
                {
                    toDoId= jsonData.id;
                    thingsToDo.push({"toDoId":toDoId,"name": name, "owner":owner, "isComplete": 0,"toCompleteDate": toCompleteDate,
                    "groupId":groupId});

                    dateTasks.push(formatDate(toCompleteDate));
                    reload_Date_List();

                    sort_toDo_List(); 
                }
                else if(jsonData.success===0)  
                {
                    alert("somthing went wrong");                          
                }         
            }
        }); 
     }

     $('#choose_date_of_tasks_to_dupllicate').click(function(){
        coppyToDoListOfDate_ForToday(formatDate($("#select_date_of_current_tasks option:selected").val()));
    });

     function coppyToDoListOfDate_ForToday(date){
        taskToDuplicate= [];
        
        for(let p=0; p<thingsToDo.length;p++){
           
           let t ={};
           t.name=thingsToDo[p].name;
           t.toCompleteDate=thingsToDo[p].toCompleteDate;
           t.owner=thingsToDo[p].owner;
           t.groupId=thingsToDo[p].groupId;

            if(t.toCompleteDate===date){
                t.toCompleteDate= formatDate(new Date());
                t.isComplete=0;
                taskToDuplicate.push(t);
            }   
        }   
        $.ajax({
            type: "POST",
            url: 'api/addCoppyTaskForToday.php',
            data: {"data": taskToDuplicate},
            success: function(response)
            {                                   
                // console.warn(response);
                let jsonData= JSON.parse(response); 

                if(jsonData.success===1)
                {                    
                    getToDoList();
                }
                else if(jsonData.success===0)  
                {
                    alert("somthing went wrong");                          
                }         
            }
        }); 
     }


    //Function that reload the memberList Users to the Selector
    function reload_Date_List(){
        let p=0;
        let strTemp;
        
        $('#select_date_of_current_tasks').html('');

        dateTasks.sort(function (a, b) {
            return new Date(a)-new Date(b);
        });  

        let newDateTasks = [];
        $.each(dateTasks, function(i, el){
            if($.inArray(el, newDateTasks) === -1) newDateTasks.push(el);
        });
        
        dateTasks=newDateTasks;

        for( p=0 ; p<dateTasks.length ; p++){   
            strTemp=(p===0) ? " selected " : ""; 
            $("#select_date_of_current_tasks").append("<option "+ strTemp + ">"+ dateTasks[p] + "</option>"); 
        }

        if(dateTasks.length>0)
            document.getElementById("choose_date_of_tasks_to_dupllicate").disabled = false;
        else
            document.getElementById("choose_date_of_tasks_to_dupllicate").disabled = true;
    }

    //Reload the Table by array 'thingsToDo' elements
    function refreshTable(){
        table.innerHTML="";  
        let html1=
                `<tr>
                <th>Task Name</th>
                <th>Owner</th>
                <th>Due Date</th>
                <th>Delete</th>
                <th>Edit</th>
                </tr>`;
        table.innerHTML += html1;    
        let counter=0;

        for(t of thingsToDo) {

            let row = table.insertRow(table.rows.length);
            row.id=t.name;

            //the id of the row is the task_name           
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);        
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
                
            counter++;
            let cell1ID= "r"+counter+"c"+1;
            let cell4ID= "r"+counter+"c"+4;
            let cell5ID= "r"+counter+"c"+5; 
            
            let check_state = (t.isComplete==1) ? "checked" : "unchecked"; 
    
            cell1.innerHTML = "<td><input type=\"checkbox\" "+ check_state +" id=\""+ cell1ID +"\" class=\"checkbox\"> "+t.name+"</td>";
            cell2.innerHTML = t.owner.ownerName;
            cell3.innerHTML = t.toCompleteDate; 
            cell4.innerHTML ="<button type=\"button\" id=\""+ cell4ID +"\" class=\"btn btn-primary btn-xs dt-delete btnDelete\"><img class=\"imgDelte\" src=\"images\/iconfinder_cross_4115230.png\"></button>";
            cell5.innerHTML ="<button type=\"button\" id=\""+ cell5ID +"\" class=\"btn btn-primary btn-xs dt-edit btnEdit\"><img class=\"imgEdit\" src=\"images\/728966-20.png\"></button>";     
        
            //Cell of Delete Button
            $(("#"+cell4ID)).click(function(e){
                e.preventDefault();
                let indexCell;
                indexCell = $(cell4).closest("tr").index();                        
                let temp= table.rows[indexCell].id;            
    
                const modal = new Promise(function(resolve, reject){  
                    let txtContenet= "Are you sure you want to delete '"+temp+"'?";
    
                    if(($('#confirmation .modal-body'))!=null)
                        $('#confirmation .modal-body').empty();
    
                    let lblTemp = document.createElement("label");                    
                    lblTemp.innerHTML=txtContenet;
                    
                    let formTemp = document.createElement("form");                    
                    formTemp.appendChild(lblTemp);  
                    $("#confirmation").find(".modal-body").append(formTemp);
                    
                    $('#confirmation').modal('show');
    
                    $('#confirmation #delete1').click(function(){
                        resolve("user clicked");
                    });
                    $('#confirmation #cancel1').click(function(){
                        reject("user clicked cancel");
                    });
                    $(".modal").on("hidden.bs.modal", function(){
                        reject("user clicked cancel");
                    });                    
                }).then(function(val){
                        //val is your returned value. argument called with resolve.
                        if (indexCell > -1) {
                            let toDoId= thingsToDo[indexCell-1].toDoId;
                            $.ajax({
                                type: "POST",
                                url: 'api/deleteToDo.php',
                                data: {"toDoId": toDoId},
                                success: function(response)
                                {
                                    // console.warn(response);
                                    let jsonData= JSON.parse(response); 
                                    if(jsonData.success=="1")
                                    {  
                                        // dateTasks.splice(thingsToDo[indexOf(oldDate)],1);
                                        thingsToDo.splice(indexCell-1, 1);    
                                        
                                        dateTasks=[];
                                        for(let i=0;i<thingsToDo.length;i++)
                                            dateTasks.push(formatDate(thingsToDo[i].toCompleteDate));
                                        reload_Date_List();
                                        refreshTable();
                                    }
                                    else
                                    {
                                        alert("somthing went wrong");                
                                    }            
                                }
                            });
                        }                        
                }).catch(function(err){
                    //user clicked cancel when press 'exit button' OR 'Cancel Button' OR 'Outside the Modal'
                    console.log("In form delete", err);
                });                
             });               
            
            //Cell of Edit Button
            $(("#"+cell5ID)).click(function(){
                let indexCell;
                indexCell = $(cell5).closest("tr").index();   
                update_Task(indexCell);
            });
    
            //Cell of CheckBox + "tdDo"'s Name 
            $(("#"+cell1ID)).click(function(){
                let indexCell;
                indexCell = $(cell1).closest("tr").index();    
    
                //find the task in the array thingsToDo
                let taskTemp= thingsToDo[indexCell-1];               

                if(taskTemp.isComplete==1)
                    taskTemp.isComplete=0;            
                else 
                    taskTemp.isComplete=1;

                $.ajax({
                    type: "POST",
                    url: 'api/changeCompleteToDO.php',
                    data: {toDoId: taskTemp.toDoId, isComplete: taskTemp.isComplete}, 
                    success: function(response)
                    {    
                        // console.warn(response);                               
                        let jsonData= JSON.parse(response); 

                        if(jsonData.success===1)
                        {
                            // alert(bool);
                        }  
                    }        
                }); 
            });
        }  
    }    
    
    
    //Function that intialized the modal form to update-form
    function update_Task(index){
        $("#AddUpdateModalLabel").html("Update Task");
        $("#submit1").html("UPDATE");
        add_update_Reload(index);
    }
    
    //Function that intialized the modal form to add-form
    $("#add_toDo_button").click(function add_New_Task(){ 
        $("#AddUpdateModalLabel").html("Add New Task");
        $("#submit1").html("ADD");    
        add_update_Reload(-1);
    });

    
    //// autocomplete From website: "https://www.w3schools.com/howto/howto_js_autocomplete.asp"
    function autocomplete(inp, arr) {        
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        let currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            let a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode === 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode === 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          let x = document.getElementsByClassName("autocomplete-items");
          for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e){
            closeAllLists(e.target);
            vue.task.task_Name= $("#task_Name").val();
        });
      }      
            

      /*initiate the autocomplete function on the "task_Name" element, and pass along the 'suggest_tasks' 
      array as possible autocomplete values:*/
      autocomplete(document.getElementById("task_Name"), suggest_tasks_list);    
      

    //Select Way To Sort thingsToDo (An Array)- By Date OR By Name
    function sort_toDo_List(){
        if(sortBool===false)
            sort_toDo_List_by_date();
        else
            sort_toDo_List_by_name();
        refreshTable();
    }

    //Sort thingsToDo (An Array) by Name
    function sort_toDo_List_by_name(){
        thingsToDo.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });   
    }

    //Sort thingsToDo (An Array) by Date
    function sort_toDo_List_by_date(){
        thingsToDo.sort(function (a, b) {
            return new Date(a.toCompleteDate)-new Date(b.toCompleteDate);
        });     
    }


    /*An Event Of 'selectorGroup' That initlize global variables AND 
     Activated getUsers() Function that get user's groups that he has membership (An Array) */
    $("#selectorGroup").change(function(){
        groupId= $("#selectorGroup option:selected").data("id");
        //Reset of global elements
        taskNameTemp="";
        taskDateTemp="";
        taskOwnerTempNew.userId= globalUserID;
        taskOwnerTempNew.ownerName= globalUserName;

        getUsers(); 
        reload_Date_List();       
      }); 


    /*An Event Of 'selectSort' That Activated sort_by() Function That Order thingsToDo (An Array) */
    document.querySelector("#selectSort").addEventListener("change", sort_by);
    function sort_by(){
        if($("#selectSort option:selected").val() === $("#selectSort .sort_by_date_option").val())
            sortBool=false;  
        else 
            sortBool=true;
        sort_toDo_List();
    }

    function getUserOnline(){
            globalUserID= $("#container4").data("id");
            globalUserMail= myDecrypt1($("#container4").data("mail")); 
            globalUserName= $("#container4").data("name"); 
           
            defulatCorrentUser= {"userId":globalUserID, "mail":globalUserMail, "userName":globalUserName};            

            if($("#container4").data("gid")){
                fromHomPage_GID=$("#container4").data("gid");
            }


            taskOwnerTempNew= defulatCorrentUser;
            getUserGruops();
    }
    

    function getUserGruops(){        
        $.ajax({
            type: "POST",
            url: 'api/getUsersGroups.php',
            data: {userId: globalUserID}, 
            success: function(response)
            {                                 
                // console.warn(response);
                const myArr = JSON.parse(response);

                groupsList=[];
                for (let i = 0; i < myArr.length; i++) {
                    let p= myArr[i];
                    let groupTemp= {"groupID":p.groupID, "groupName":p.userName};
                    groupsList.push(groupTemp);
                }
                
                //if groupsList is empty or not initialized, The functionality stops and a warning label appears
                isMemberInGroups();
                
                reload_Selector_Groups_List();
                getUsers();
            }        
        }); 
    }


    function getUsers()
    {          
        if(!groupId)
            groupId= globalUserID;

        $.ajax({
            type: "POST",
            url: 'api/getUsers.php',
            data: {userId: globalUserID, groupId:groupId}, 
            success: function(response)
            {                      
                // console.warn(response);
                const myArr = JSON.parse(response);
                
                membersList=[];
                for (let i = 0; i < myArr.length; i++) {
                    let p= myArr[i];
                    
                    let userTemp= {"userId":p.userId, "mail": myDecrypt1(p.mail), "ownerName":p.userName};
                    
                    membersList.push(userTemp);                    
                }
                
                reload_Selector_List();
                getToDoList();  
            }        
        }); 
    }
    
    function getToDoList(){
        $.ajax({
            type: "POST",
            url: 'api/getToDoList.php',
            data: {groupId:groupId}, 
            success: function(response)
            {                                   
                // console.warn(response);
                const myArr = JSON.parse(response);

                thingsToDo=[];
                dateTasks=[];
                for (let i = 0; i < myArr.length; i++) {
                    let p= myArr[i];
                    
                    let userTemp= {"userId":p.userId, "mail": myDecrypt1(p.mail), "ownerName":p.userName};
                    thingsToDo.push({"toDoId": p.toDoId, "name": p.name, "owner": userTemp,"isComplete": p.isComplete ,
                    "toCompleteDate": formatDate(p.DueDate), "groupId":p.groupId});

                    dateTasks.push(formatDate(p.DueDate));
                }
                reload_Date_List();
                sort_toDo_List();
            }        
        });      
    } 

    function isMemberInGroups()
    {
        if(groupsList.length<1)
        {
            document.getElementById("add_toDo_button").disabled = true;

            let lblTemp = document.createElement("label");                    
            lblTemp.innerHTML="You Must First Open Your Own Group OR Join An Existing Group";
            $(lblTemp).css("color", "red");
            $("#add_toDo_buttonDiv").append(lblTemp);
        }
    }

    if(!vue){
        vue= new Vue({
            el: "#app",
            data() {
                return { 
                    task: {
                        task_Name: $("#task_Name").val(),
                        task_owner: $("#task_owner option:selected").html(),
                        task_date: $("#task_date").val(),
                    },                
                }
            },
        });
    }
});


//Taken from solution: https://stackoverflow.com/questions/64016241/cryptojs-encrypt-decrypt-by-php-and-javascript-simple-output-encrypted-strin
function myDecrypt1(mail){
    let DataEncrypt = mail;
    let DataKey = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901");
    let DataVector = CryptoJS.enc.Utf8.parse("1234567890123412");
    let decrypted = CryptoJS.AES.decrypt(DataEncrypt, DataKey, { iv: DataVector });        
    let decrypted1 = CryptoJS.enc.Utf8.stringify(decrypted);
    return decrypted1; 
}