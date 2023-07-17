$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-sign-button', function(){
	var categories_options_html='';
	var user_options_html='';
    	// load list of categories
	$.getJSON("http://localhost/test2/api/roles/read.php", function(data){
		// build categories option html
		// loop through returned list of data
		categories_options_html=`<select name='role' class='form-control'>`;
		$.each(data.records, function(key, val){
    			categories_options_html+=`<option value='` + val.id + `'>` + val.role + `</option>`;
		});
		categories_options_html+=`</select>`;
		// we have our html form here where product information will be entered
		// we used the 'required' html5 property to prevent empty fields
		var create_task_html=`
		<form id='create-sign-form' action='#' method='post' border='0'>
    		<table class='table table-hover table-responsive table-bordered'>
            <tr>
            <td>Name</td>
            <td><input type='text' name='name' class='form-control' required /></td>
        </tr>
            <tr>
            <td>Email</td>
            <td><input type='email' name='email' class='form-control' required /></td>
        </tr>
        <tr>
            <td>Password</td>
            <td><input type='password' name='password' class='form-control' required /></td>
        </tr>
        		<tr>
					<td>Role</td>
					<td>` + categories_options_html + `</td>
        		</tr>
        		<tr>
            			<td></td>
            			<td>
                			<button type='submit' class='btn btn-primary'>
                    			<span class='glyphicon glyphicon-plus'></span> Sign in
                			</button>
            			</td>
        		</tr>
    		</table>
		</form>`;
		// inject html to 'page-content' of our app
		$("#page-login").html(create_task_html);
		// chage page title
		changePageTitle("Sign in");
	});
    });
    $(document).on('submit', '#create-sign-form', function(){
    // get form data
    var form_data=JSON.stringify($(this).serializeObject());
	console.log("form_data")
	console.log(form_data)
    // submit form data to api
    $.ajax({
        url: "http://localhost/test2/api/users/create.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            // product was created, go back to tasks list
            showLogin();
        },
        error: function(xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text);
        }
    });
    return false;
});
});
