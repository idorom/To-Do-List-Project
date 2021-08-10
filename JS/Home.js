let table = document.getElementById("groupsTable");
let header1;
let header2;
let header3;

let selectActive1;

let groupsList=[];
let list = [];

let defulatCorrentUser;  //Current user using the system;
let groupId; //Current group using the by defulatCorrentUser;
let globalUserID;
let globalUserMail;
let globalUserName;

//global form's elements value
let taskNameTemp= "";
let taskDateTemp= "";
/*currently the user that enter the system is david and the user that enter the system is always 
the defualt owner of the task, unless the user change the owner*/
// let taskOwnerTempNew; 
let isScecoundTime=false;   

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

$(document).ready(function(){
    //Change the navbar title dynamicly
    $('.header .title').html("Home");
    $('title').html("Home");


    if($("#container5").data("mail")){
        $('.header #nav_signIN_LogOut').html("Log-Out");
        $('.header #nav_signIN_LogOut').attr("href", "LogOut.php");
    }
    
    else{
        $('.header #nav_signIN_LogOut').html("Log-In");
        $('.header #nav_signIN_LogOut').attr("href", "signIN.php");
    }
 
    getUserOnline(); 

    $("#selectActive1").change(function(){
        groupId= selectActive1;
        reload_Selector_Actives_List();       
    }); 
    
    reload_Selector_Actives_List();

    $("#lbl_err_move_to_toDoList").hide();

    //Function that move to toDoList.php page
    $("#form5").submit(function(e){
        e.preventDefault();   
        
        if(groupsList.length===0)
        {
            $("#lbl_err_move_to_toDoList").html("You Need To Have A Group for Entering"); 
        }     
        else{
            $("#lbl_err_move_to_toDoList").html("");
            
            $.ajax({
                type: "POST",
                url: "api/CreateSessionGroupIdFromHomePage.php",
                data: {groupId : $("#selectGroup1 option:selected").data("id")},
                success: function(response){
                
                    // console.warn(response);
                    let jsonData= JSON.parse(response); 

                    if(jsonData.success===1)
                        location.replace("toDoList.php");
                }
            });          
        }
    });

    $("#Create_Delete_Group_button").click(function(){
        //delete user's group 
        if(groupsList[0]?.groupID==globalUserID)
        {
            const modal = new Promise(function(resolve, reject){  
                let txtContenet= "Are You Sure You Want To Delete Your Group?"; 
                let header= "Delete Model";

                $('#Home_modal #Home_modalLabel').html(header);
                if(($('#Home_modal .modal-body'))!=null)
                    $('#Home_modal .modal-body').empty();

                let lblTemp = document.createElement("label");                    
                lblTemp.innerHTML=txtContenet;
                
                let formTemp = document.createElement("form");                    
                formTemp.appendChild(lblTemp);  
                $("#Home_modal").find(".modal-body").append(formTemp);
                
                $('#Home_modal').modal('show');

                $('#Home_modal #Home_modal_btn').click(function(){
                    resolve("user clicked");
                });
                $('#Home_modal #cancel2').click(function(){
                    reject("user clicked cancel");
                });
                $(".modal").on("hidden.bs.modal", function(){
                    reject("user clicked cancel");
                });                    
            }).then(function(val){
                $.ajax({
                    type: "POST",
                    url: 'api/deleteGroup.php',
                    data: {"userId": globalUserID},
                    success: function(response)
                    {                                   
                        // console.warn(response);
                        let jsonData= JSON.parse(response); 
            
                        if(jsonData.success===1)
                        {
                            // id= jsonData.id;
                            
                            alert("Delete Group Successfully");  
                            $("#Create_Delete_Group_button").html("Delete Group");
                            $(".manager_option").show();  
                            getUserGruops();
                            refreshTable();
                        }
                        else
                        {
                            alert(jsonData.success);                          
                        }         
                    }
                });             
                $("#Create_Delete_Group_button").html("Create Group");
                $(".manager_option").hide();

            }).catch(function(err){
                //user clicked cancel when press 'exit button' OR 'Cancel Button' OR 'Outside the Modal'
                console.log("In form delete", err);
            });              
        }
        else //Create a group for user
        { 
            const modal = new Promise(function(resolve, reject){  
                let txtContenet= "Are You Sure You Want To Create Your Group?";
                let header= "Create Model";

                $('#Home_modal #Home_modalLabel').html(header);
                if(($('#Home_modal .modal-body'))!=null)
                    $('#Home_modal .modal-body').empty();

                let lblTemp = document.createElement("label");                    
                lblTemp.innerHTML=txtContenet;
                
                let formTemp = document.createElement("form");                    
                formTemp.appendChild(lblTemp);  
                $("#Home_modal").find(".modal-body").append(formTemp);
                
                $('#Home_modal').modal('show');

                $('#Home_modal #Home_modal_btn').click(function(){
                    resolve("user clicked");
                });
                $('#Home_modal #cancel2').click(function(){
                    reject("user clicked cancel");
                });
                $(".modal").on("hidden.bs.modal", function(){
                    reject("user clicked cancel");
                });                    
            }).then(function(val){
                $.ajax({
                    type: "POST",
                    url: 'api/addGroup.php',
                    data: {"userId": globalUserID},
                    success: function(response)
                    {                                   
                        // console.warn(response);
                        let jsonData= JSON.parse(response); 
            
                        if(jsonData.success===1)
                        {
                            // id= jsonData.id;                            
                            alert("Create Group Successfully");  
                            $("#Create_Delete_Group_button").html("Delete Group");
                            $(".manager_option").show();  
                            getUserGruops();
                            refreshTable();
                        }
                        else if(jsonData.success===0)  
                        {
                            alert("somthing went wrong");                          
                        }         
                    }
                });   

            }).catch(function(err){
                //user clicked cancel when press 'exit button' OR 'Cancel Button' OR 'Outside the Modal'
                console.log("In form delete", err);
            }); 
        }

    });

});


//Function that reload the memberGroupsList Users to the Selector
function reload_Selector_Groups_List(){
    let p=0;
    let strTemp;   
    $('#selectGroup1').html('');
    for( p=0 ; p<groupsList.length ; p++){     
        strTemp=(groupsList[p].groupID===globalUserID) ? " selected " : "";
        $("#selectGroup1").append("<option data-id=\""+groupsList[p].groupID+"\" "+ strTemp + ">"+ groupsList[p].groupName + "</option>");           
    } 
    groupId= $("#selectGroup1 option:selected").data("id");
}



//Function that reload the 
function reload_Selector_Actives_List(){
    selectActive1= $("#selectActive1 option:selected").data("id");

    header1= "Mail";
    header2= "Manger Name"; 
    header3= "Status";
    
    if(selectActive1==1)
    {
        header4= "Request To Join / Cancel";
        getNewGroups();         
    }
    else if(selectActive1==2)
    {
        header4= "Leave The Group";
        getMyMemberhips();
    }
    else if(selectActive1==3)
    {
        header2= "Name"; 
        header5= "Reject";
        header4= "Aprrove";
        getMyGroupRQ();        
    }
    else if(selectActive1==4)
    {
        header2= "Name"; 
        header4= "Remove From Group";
        getMyGroupMembers();
    }
}


function getNewGroups(){
    $.ajax({
        type: "POST",
        url: 'api/getNewGroups.php',
        data: {userId: globalUserID}, 
        success: function(response)
        {                                 
            // console.warn(response);
            const myArr = JSON.parse(response);

            list=[];
            for (let i = 0; i < myArr.length; i++) {
                let p= myArr[i];
                let status= (p.status1==null)? "Available": p.status1;
                
                let groupTemp= {"groupID":p.groupID, "mail": myDecrypt1(p.mail), "groupName": p.groupName, "status": status};
                list.push(groupTemp);
            }   
            refreshTable();             
        }        
    }); 
}


function getMyMemberhips(){
    $.ajax({
        type: "POST",
        url: 'api/getMyMemberhips.php',
        data: {userId: globalUserID}, 
        success: function(response)
        {                                 
            // console.warn(response);
            const myArr = JSON.parse(response);

            list=[];
            for (let i = 0; i < myArr.length; i++) {
                let p= myArr[i];

                let groupTemp= {"groupID":p.groupID, "mail": myDecrypt1(p.mail), "groupName": p.groupName, "status": p.status1};
                list.push(groupTemp);
            }   
            refreshTable();             
        }        
    }); 
}


function getMyGroupMembers(){
    $.ajax({
        type: "POST",
        url: 'api/getMyGroupMembers.php',
        data: {groupID: globalUserID}, 
        success: function(response)
        {                                 
            // console.warn(response);
            const myArr = JSON.parse(response);

            list=[];
            for (let i = 0; i < myArr.length; i++) {
                let p= myArr[i];
                
                let groupTemp= {"userID":p.userID, "mail": myDecrypt1(p.mail) , "groupName": p.groupName, "status": p.status1};
                list.push(groupTemp);
            }   
            refreshTable();             
        }        
    }); 
}

function getMyGroupRQ(){
    $.ajax({
        type: "POST",
        url: 'api/getMyGroupRQ.php',
        data: {groupID: globalUserID}, 
        success: function(response)
        {                                 
            // console.warn(response);
            const myArr = JSON.parse(response);

            list=[];
            for (let i = 0; i < myArr.length; i++) {
                let p= myArr[i];

                let groupTemp= {"userID":p.userID, "mail": myDecrypt1(p.mail) ,"groupName": p.groupName, "status": p.status1};
                list.push(groupTemp);
            }   
            refreshTable();             
        }        
    }); 
}


function getUserOnline(){
    globalUserID= $("#container5").data("id");
    globalUserMail= myDecrypt1($("#container5").data("mail"));  
    globalUserName= $("#container5").data("name"); 
    defulatCorrentUser= {"userId":globalUserID, "mail":globalUserMail, "userName":globalUserName};

    reload_Selector_Groups_List();
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
        }        
    }); 
}


function refreshTable(){    
    table.innerHTML="";  
    let html1;

    if(selectActive1==3)
        html1=`<tr><th>`+header1+`</th><th>`+header2+`</th><th>`+header3+`</th><th>`+header4+`</th><th>`+header5+`</th></tr>`;
    else
        html1=`<tr><th>`+header1+`</th><th>`+header2+`</th><th>`+header3+`</th><th>`+header4+`</th></tr>`;

    table.innerHTML += html1;  
    
    let Action="action";
    let Action2="Regect";

    let counter=0;
    
    for(l of list){
        let row = table.insertRow(table.rows.length);
        row.id;
        
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1); 
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5;

        if(selectActive1==3)
            cell5 = row.insertCell(4);
            
        counter++;
        let cell1ID= "r"+counter+"c"+1;
        let cell2ID= "r"+counter+"c"+2;
        let cell3ID= "r"+counter+"c"+3;
        let cell4ID= "r"+counter+"c"+4;
        let cell5ID;

        if(selectActive1==3)
            cell5ID= "r"+counter+"c"+5;

 
        if(selectActive1==1 &&  l.status=="Available") //Ask to join a new group
            Action= "Join";
        else if(selectActive1==1 &&  l.status=="RQ") //Cancel your requset to join a group
            Action= "Cancel";
        else if(selectActive1==2) //Leave a group
            Action= "Leave";
        else if(selectActive1==3) //Aprrove a requset from user to be member
            Action= "Aprrove";
        else if(selectActive1==4) //Remove a member from your group
            Action= "Remove";
       
        row.id=Action;
        
        cell1.innerHTML = l.mail;
        cell2.innerHTML = l.groupName;
        cell3.innerHTML = l.status;
        if(selectActive1==3 || (selectActive1==1 &&  l.status=="Available"))
            cell4.innerHTML = "<button type=\"button\" id=\""+ cell4ID +"\" data-id=\""+ Action +"\" class=\"btn btn-primary btn-xs dt-edit btnEdit\"><img class=\"imgEdit\" src=\"images\/partnership.png\"></button>";
        else
            cell4.innerHTML = "<button type=\"button\" id=\""+ cell4ID +"\" data-id=\""+ Action +"\"  class=\"btn btn-primary btn-xs dt-delete btnDelete\"><img class=\"imgDelte\" src=\"images\/iconfinder_cross_4115230.png\"></button>";
        
        if(selectActive1==3)
            cell5.innerHTML = "<button type=\"button\" id=\""+ cell5ID +"\" data-id=\""+ Action2 +"\"  class=\"btn btn-primary btn-xs dt-delete btnDelete\"><img class=\"imgDelte\" src=\"images\/iconfinder_cross_4115230.png\"></button>";
        

        //Cell of Action Button
        $(("#"+cell4ID)).click(function(e){
            e.preventDefault();
            
            let indexCell;
            indexCell = $(cell4).closest("tr").index();                        
            let temp= table.rows[indexCell].id;

            const modal = new Promise(function(resolve, reject){  
                let txtContenet= "Are you sure you want to '"+temp+"'?"; 
                let header= temp+" Model";

                $('#Home_modal #Home_modalLabel').html(header);
                if(($('#Home_modal .modal-body'))!=null)
                    $('#Home_modal .modal-body').empty();

                let lblTemp = document.createElement("label");                    
                lblTemp.innerHTML=txtContenet;
                
                let formTemp = document.createElement("form");                    
                formTemp.appendChild(lblTemp);  
                $("#Home_modal").find(".modal-body").append(formTemp);
                
                $('#Home_modal').modal('show');

                $('#Home_modal #Home_modal_btn').click(function(){
                    resolve("user clicked");
                });
                $('#Home_modal #cancel2').click(function(){
                    reject("user clicked cancel");
                });
                $(".modal").on("hidden.bs.modal", function(){
                    reject("user clicked cancel");
                });                    
            }).then(function(val){
                    //val is your returned value. argument called with resolve.
                    if (indexCell > -1) {
                        let l= list[indexCell-1];

                        if(selectActive1==1 &&  l.status=="Available") //Ask to join a new group- SQL
                        {
                            askGroupRQ(l);
                        }
                        else if(selectActive1==1 &&  l.status=="RQ") //Cancel your requset to join a group- SQL
                        {
                            cancelMyRQ(l);
                        }
                        else if(selectActive1==2) //Leave a group- SQL
                        {
                            cancelMyMembership(l,indexCell);
                        }
                        else if(selectActive1==3) //Aprrove a requset from user to be member- SQL
                        {
                            aprroveUserMembership(l,indexCell);
                        }
                        else if(selectActive1==4) //Remove a member from your group- SQL
                        {
                            removeUserMembership(l,indexCell);
                        }
                    }                        
            }).catch(function(err){
                //user clicked cancel when press 'exit button' OR 'Cancel Button' OR 'Outside the Modal'
                console.log("In form delete", err);
            });                
        });  
        
        //Cell of Action2 Button
        $(("#"+cell5ID)).click(function(e){
            e.preventDefault();
            
            let indexCell;
            indexCell = $(cell5).closest("tr").index();

            const modal = new Promise(function(resolve, reject){  
                let txtContenet= "Are you sure you want to '"+Action2+"'?"; 
                let header= Action2+" Model";
                $('#Home_modal #Home_modalLabel').html(header);
                if(($('#Home_modal .modal-body'))!=null)
                    $('#Home_modal .modal-body').empty();

                let lblTemp = document.createElement("label");                    
                lblTemp.innerHTML=txtContenet;
                
                let formTemp = document.createElement("form");                    
                formTemp.appendChild(lblTemp);  
                $("#Home_modal").find(".modal-body").append(formTemp);
                
                $('#Home_modal').modal('show');

                $('#Home_modal #Home_modal_btn').click(function(){
                    resolve("user clicked");
                });
                $('#Home_modal #cancel2').click(function(){
                    reject("user clicked cancel");
                });
                $(".modal").on("hidden.bs.modal", function(){
                    reject("user clicked cancel");
                });                    
            }).then(function(val){
                    //val is your returned value. argument called with resolve.
                    if (indexCell > -1) {
                        let l= list[indexCell-1];

                        rejectGroupRQ(l,indexCell);
                    }                        
            }).catch(function(err){
                //user clicked cancel when press 'exit button' OR 'Cancel Button' OR 'Outside the Modal'
                console.log("In form delete", err);
            });                
        }); 
    }    
}  


function askGroupRQ(l)
{
    $.ajax({
        type: "POST",
        url: 'api/askGroupRQ.php',
        data: {"grpuoID": l.groupID, "userID": globalUserID},
        success: function(response)
        {                                   
            // console.warn(response);
            let jsonData= JSON.parse(response); 

            if(jsonData.success===1)
            {
                // id= jsonData.id;
                
                l.status="RQ";
                refreshTable();
            }
            else if(jsonData.success===0)  
            {
                alert("somthing went wrong");                          
            }         
        }
    }); 
}

function cancelMyRQ(l)
{
    $.ajax({
        type: "POST",
        url: 'api/deleteFromTableMembersingroup.php',
        data: {"grpuoID": l.groupID, "userID": globalUserID},
        success: function(response)
        {
            // console.warn(response);
            let jsonData= JSON.parse(response); 
            if(jsonData.success=="1")
            {  
                l.status="Available"; 
                refreshTable();
            }
            else
            {
                alert("somthing went wrong");                
            }            
        }
    });
}

function cancelMyMembership(l,indexCell)
{
    $.ajax({
        type: "POST",
        url: 'api/deleteFromTableMembersingroup.php',
        data: {"grpuoID": l.groupID, "userID": globalUserID},
        success: function(response)
        {
            // console.warn(response);
            let jsonData= JSON.parse(response); 
            if(jsonData.success=="1")
            {  
                list.splice(indexCell-1, 1); 
                refreshTable();
            }
            else
            {
                alert("somthing went wrong");                
            }            
        }
    });
}

function aprroveUserMembership(l,indexCell)
{
    $.ajax({
        type: "POST",
        url: 'api/aprroveUserMembership.php',
        data: {"grpuoID": globalUserID, "userID": l.userID},
        success: function(response)
        {                                   
            // console.warn(response);
            let jsonData= JSON.parse(response); 

            if(jsonData.success===1)
            {
                l.status="M"; 
                list.splice(indexCell-1, 1); 
                refreshTable();
            }
            else if(jsonData.success===0)  
            {
                alert("somthing went wrong");                          
            }         
        }
    }); 
}

function rejectGroupRQ(l,indexCell){
    $.ajax({
        type: "POST",
        url: 'api/deleteFromTableMembersingroup.php',
        data: {"grpuoID": globalUserID, "userID": l.userID},
        success: function(response)
        {
            // console.warn(response);
            let jsonData= JSON.parse(response); 
            if(jsonData.success=="1")
            {  
                list.splice(indexCell-1, 1); 
                refreshTable();
            }
            else
            {
                alert("somthing went wrong");                
            }            
        }
    });
}

function removeUserMembership(l,indexCell)
{
    $.ajax({
        type: "POST",
        url: 'api/deleteFromTableMembersingroup.php',
        data: {"grpuoID": globalUserID, "userID": l.userID},
        success: function(response)
        {
            // console.warn(response);
            let jsonData= JSON.parse(response); 
            if(jsonData.success=="1")
            {  
                list.splice(indexCell-1, 1); 
                refreshTable();
            }
            else
            {
                alert("somthing went wrong");                
            }            
        }
    });
}

    
    function isMemberInGroups()
    {
        if(groupsList.length<1)
        {
            createDeleteLabelChange();
            document.getElementById("move_to_toDoList").disabled = true;

            let lblTemp = document.createElement("label");                    
            lblTemp.innerHTML="You Must First Open Your Own Group OR Join An Existing Group";
            lblTemp.id="lblTemp";
            $("#move_to_toDoList_buttonDiv").append(lblTemp);
            
        }
        else
        {
            createDeleteLabelChange();
            document.getElementById("move_to_toDoList").disabled = false;

            if($("#move_to_toDoList_buttonDiv #lblTemp"))
                $("#move_to_toDoList_buttonDiv #lblTemp").remove();
            
        }
    }

    function createDeleteLabelChange(){
        if(groupsList[0]?.groupID==globalUserID){
            $("#Create_Delete_Group_button").html("Delete Group"); 
            $("#selectActive1").val($("#selectActive1 option:first").val());
            reload_Selector_Actives_List();
            $(".manager_option").show();
        }
        else{
            $("#Create_Delete_Group_button").html("Create Group");
            $("#selectActive1").val($("#selectActive1 option:first").val());
            reload_Selector_Actives_List();
            $(".manager_option").hide();
        }
    }


    //Taken from solution: https://stackoverflow.com/questions/64016241/cryptojs-encrypt-decrypt-by-php-and-javascript-simple-output-encrypted-strin
    function myDecrypt1(mail){
        let DataEncrypt = mail;
        let DataKey = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901");
        let DataVector = CryptoJS.enc.Utf8.parse("1234567890123412");
        let decrypted = CryptoJS.AES.decrypt(DataEncrypt, DataKey, { iv: DataVector });        
        let decrypted1 = CryptoJS.enc.Utf8.stringify(decrypted);
       return decrypted1; 
    }


const inputs = document.querySelectorAll(".input");
function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}
inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});