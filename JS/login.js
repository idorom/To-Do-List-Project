
$(document).ready(function(){
    //Change the navbar title dynamicly
    $('.header .title').html("Log In");
    $('title').html("Log In");

    if($("#container1").data("mail")){
        $('.header #nav_signIN_LogOut').html("Log-Out");
        $('.header #nav_signIN_LogOut').attr("href", "LogOut.php");
    }
    
    else{
        $('.header #nav_signIN_LogOut').html("Log-In");
        $('.header #nav_signIN_LogOut').attr("href", "signIN.php");
    }

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

function validtionMailAndPassword()
{
    MsgEror="";
    let str= document.getElementById("mail").value;   
    let password1= document.getElementById("user_password").value;  

    isMailVaild(str); 

    if(password1.length<8)
    {
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Invalid Password, need 8 letters or more";
    } 
    if(MsgEror.length>0){
        alert(MsgEror);
        return false;
    }
    else{
        return true;
    }     
}


function isMailVaild(str)
{    
    const regex= /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
   

    if(str.length==0)
    {
        MsgEror+="Mail field is empty";
        return MsgEror;
    }
    if(!(regex.test(str)))
    {
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Invalid Mail";
        return MsgEror;
    }  
}