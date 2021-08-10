$(document).ready(function(){
    //Change the navbar title dynamicly
    $('.header .title').html("Sign Up");
    $('title').html("Sign Up");
    
    if($("#container2").data("mail")){
        $('.header #nav_signIN_LogOut').html("Log-Out");
        $('.header #nav_signIN_LogOut').attr("href", "LogOut.php");
    }       
    else{
        $('.header #nav_signIN_LogOut').html("Log-In");
        $('.header #nav_signIN_LogOut').attr("href", "signIN.php");
    }


    $("#form2").submit(function(e){        
        e.preventDefault();        
        
        if(validtionMailAndPassword()===true){
            $.ajax({
                type: "POST",
                url: 'api/addUser.php',
                data: $(this).serialize(),
                success: function(response)
                {                                   
                    console.log(response);
                    let jsonData= JSON.parse(response); 

                    if(jsonData.success===1)
                    {
                        let str="Hello '"+ $("#user_name").val() +"' and welcome to 'AwesomeList',\n Let's Log-In";                        
                        alert(str); 
                        location.replace("signIN.php");
                    }
                    else if(jsonData.success===2)
                    {
                        let str="The mail: '"+ $("#user_mail").val() + "' is already used";
                        location.replace("SignUp.php?err=1&errText="+str+"");
                    }
                    else if(jsonData.success===0)  
                    {
                        $("#errorLabel").val("somthing went wrong");
                        location.replace("SignUp.php?err=1&errText="+str+"");                    
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

//document.querySelector("#SignUp_button").addEventListener("click", validtionMailAndPassword);
function validtionMailAndPassword()
{
    MsgEror="";
    let name= document.getElementById("user_name").value; 
    let str1= document.getElementById("user_mail").value;   
    let str2= document.getElementById("confirm_user_mail").value;
    let password1= document.getElementById("user_password").value;   
    let password2= document.getElementById("confirm_user_password").value;
    
    isMailVaild(str1);

    if(name.length<2)
    {
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Invalid Name, correct name need at least 2 letters or more";
    }    
   
    if(password1.length<8)
    {
        if(MsgEror.length>0)
            MsgEror+="\n";
        MsgEror+="Invalid Password, correct Password need at least 8 letters or more";
    }

    if(str2.length!=0)
        checkEquals2Strings(str1,str2,true);
    else{
        if(MsgEror.length>0)
             MsgEror+="\n";
        MsgEror+="Verification of Mail not correct";
    }

    if(password2.length!=0)
        checkEquals2Strings(password1,password2,false);
    else{
        if(MsgEror.length>0)
             MsgEror+="\n";
        MsgEror+="Verification of Password not correct";
    }

    if(MsgEror.length>0)
        alert(MsgEror);
        
    if(MsgEror.length==0)
        return true;
    else
        return false;
}

function checkEquals2Strings(s1,s2,c)
{     
    if(s1.localeCompare(s2)==0)
    {
        return true;
    }
    else
    {        
        if((c==true))
        {
            if(MsgEror.length>0)
                MsgEror+="\n";
            MsgEror+="Verification of Mail not correct";
        }
        if((c==false))
        {
            if(MsgEror.length>0)
                MsgEror+="\n";
            MsgEror+="Verification of Password not correct";
        }
        return false;
    }        
}