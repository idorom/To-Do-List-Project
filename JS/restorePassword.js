$(document).ready(function(){
    //Change the navbar title dynamicly
    $('.header .title').html("Restore Password");
    $('title').html("Restore Password");


    if($("#container3").data("mail")){
        $('.header #nav_signIN_LogOut').html("Log-Out");
        $('.header #nav_signIN_LogOut').attr("href", "LogOut.php");
    }
       
    else{
        $('.header #nav_signIN_LogOut').html("Log-In");
        $('.header #nav_signIN_LogOut').attr("href", "signIN.php");
    }

});

let MsgEror="";

function RestorePassword()
{    let str= $("#user_mail").val();
    if(isMailVaild(str))
    {
        alert("The link to restore Password send to: '"+str+"'");
        return true;
    }
    else
    {
        alert(MsgEror);
        return false;
    }
}

function isMailVaild(str)
{    
    const regex= /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    
    let bool=true;

    if(str.length==0)
    {
        MsgEror+="Mail field is empty";
        bool=false;
        return bool;
    }
    if(!(regex.test(str)))
    {
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Invalid Mail";
        bool=false;
        return bool;
    }
    return bool;    
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
