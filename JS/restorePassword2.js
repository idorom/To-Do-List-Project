$(document).ready(function(){
    //Change the navbar title dynamicly
    $('.header .title').html("Restore Password");
    $('title').html("Restore Password Step 2");


    if($("#container6").data("mail")){
        $('.header #nav_signIN_LogOut').html("Log-Out");
        $('.header #nav_signIN_LogOut').attr("href", "LogOut.php");
    }
    
    else{
        $('.header #nav_signIN_LogOut').html("Log-In");
        $('.header #nav_signIN_LogOut').attr("href", "signIN.php");
    }


    $("#form4").submit(function(e){        
        e.preventDefault(); 
        if(validtionPassword()===true){  
            $.ajax({
                type: "POST",
                url: 'api/userRestorePassword.php',
                data: {user_password: $("#user_password_step_2").val() , userId: $("#container6").data("id")},
                success: function(response)
                {                                   
                    // console.warn(response);
                    let jsonData= JSON.parse(response); 
    
                    if(jsonData.success===1)
                    {
                        alert("Your Password has been changed successfully");
                        location.replace("OutRestorePassword2.php");
                    }
                    else if(jsonData.success===0)  
                    {
                        alert("somthing went wrong");                          
                    }         
                }
            }); 
        }
    })   
});


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


let MsgEror="";


function validtionPassword()
{
    MsgEror="";

    let password1= document.getElementById("user_password_step_2").value;   
    let password2= document.getElementById("confirm_user_password_step_2").value;
   
    if(password1.length<8)
    {
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Invalid Password, correct Password need at least 8 letters or more";
    }

    if(password2.length!=0)
        checkEquals2Strings(password1,password2);
    else{
        if(MsgEror.length>0)
             MsgEror+="\n";
        MsgEror+="Verification of Password not correct";
    }

    if(MsgEror.length>0)
        alert(MsgEror);
        
    if(MsgEror.length==0)
    {
        return true;
    }
    else
        return false;
}

function checkEquals2Strings(s1,s2)
{     
    if(s1.localeCompare(s2)==0)
    {
        return true;
    }
    else
    {        
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Verification of Password not correct";    
        return false;
    }        
}