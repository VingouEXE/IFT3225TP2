function loginTemplate(){
    formL="<div id='create-signin' class='btn btn-primary pull-right m-b-15px create-sign-button'>";
    formL+="<span class='glyphicon glyphicon-plus'></span> SignIn";
    formL+="</div>";
  
    formL +=`<form id='login-form' action='#' method='post' border='0'>"
    		<table class='table table-hover table-responsive table-bordered'>
        		<tr>
					<td>Email</td>
					<td><input type='email' name='email' class='form-control' required /></td>
        		</tr>
        		<tr>
					<td>Password</td>
					<td><input type='password' name='password' class='form-control' required /></td>
        		</tr>
        		<tr>
                    <td></td>
                    <td>
                        <button type='submit' class='btn btn-primary'>
                            <span class='glyphicon glyphicon-plus'></span> Login
                        </button>
                    </td>
        		</tr>
    		</table>
		</form>`

    // inject to 'page-content' of our app
    $("#page-login").html(formL);
}
$(document).on('submit', '#login-form', function(){
	// get form data
	var form_data=JSON.stringify($(this).serializeObject());
	// submit form data to api
	$.ajax({
    		url: "http://localhost/test2/api/users/check.php",
    		type : "POST",
    		contentType : 'application/json',
    		data : form_data,
    		success : function(result) {
            if (result.message!="fail"){
                showTasks();
            }
            else{

            }
        	// task was created, go back to tasks list

        	
    	},
    	error: function(xhr, resp, text) {
        	// show error to console
        	console.log(xhr, resp, text);
    	}
        });
        return false;
    });