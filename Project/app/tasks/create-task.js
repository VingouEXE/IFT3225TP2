$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-task-button', function(){
	var categories_options_html='';
	var user_options_html='';
    	// load list of categories
	$.getJSON("http://localhost/test2/api/categories/read.php", function(data){
		// build categories option html
		// loop through returned list of data
		categories_options_html=`<select name='category' class='form-control'>`;
		$.each(data.records, function(key, val){
    			categories_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
		});
		categories_options_html+=`</select>`;
		$.getJSON("http://localhost/test2/api/users/read.php", function(data){
		// build categories option html
		// loop through returned list of data
		user_options_html=`<select name='user' class='form-control'>`;
		$.each(data.records, function(key, val){
			user_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
		});
		user_options_html+=`</select>`;	
	
	
		// we have our html form here where product information will be entered
		// we used the 'required' html5 property to prevent empty fields
		var create_task_html=`
    		<!-- 'read tasks' button to show list of tasks -->
    		<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button'>
        		<span class='glyphicon glyphicon-list'></span> Read tasks
    		</div>
		<form id='create-task-form' action='#' method='post' border='0'>
    		<table class='table table-hover table-responsive table-bordered'>
				<tr>
					<td>User</td>
					<td>` + user_options_html + `</td>
        		</tr>
        		<tr>
					<td>Title</td>
					<td><input type='text' name='title' class='form-control' required /></td>
        		</tr>
        		<!-- <tr>
					<td>Date</td>
					<td><input type='date' name='date' class='form-control' required /></td>
        		</tr> -->
        		<tr>
					<td>Description</td>
					<td><textarea name='description' class='form-control' required></textarea></td>
        		</tr>
        		<tr>
					<td>Category</td>
					<td>` + categories_options_html + `</td>
        		</tr>
        		<tr>
            			<td></td>
            			<td>
                			<button type='submit' class='btn btn-primary'>
                    			<span class='glyphicon glyphicon-plus'></span> Create Task
                			</button>
            			</td>
        		</tr>
    		</table>
		</form>`;
		// inject html to 'page-content' of our app
		$("#page-content").html(create_task_html);
		// chage page title
		changePageTitle("Create Task");
	});
    });
	});
    $(document).on('submit', '#create-task-form', function(){
    // get form data
    var form_data=JSON.stringify($(this).serializeObject());
	console.log("form_data")
	console.log(form_data)
    // submit form data to api
    $.ajax({
        url: "http://localhost/test2/api/tasks/create.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            // product was created, go back to tasks list
            showTasks();
        },
        error: function(xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text);
        }
    });
    return false;
});
});
