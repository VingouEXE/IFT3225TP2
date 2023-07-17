$(document).ready(function(){
    // show html form when 'update task' button was clicked
    $(document).on('click', '.update-task-button', function(){
    	// get task id
	var id = $(this).attr('data-id');
	// read one record based on given task id
	$.getJSON("http://localhost/test2/api/tasks/read_one.php?id=" + id, function(data){
    		// values will be used to fill out our form
    		var title = data.title;
    		var date = data.date;
    		var user = data.user;
			var description = data.description;
    		var category = data.category;
    		var finish = data.finish;
		// load list of categories
		$.getJSON("http://localhost/test2/api/categories/read.php", function(data){
    		// build 'categories option' html
    		// loop through returned list of data
        		var categories_options_html=`<select name='category' class='form-control'>`;
        		$.each(data.records, function(key, val){
            		// pre-select option is category id is the same
            		if(val.id==category){ categories_options_html+=`<option value='` + val.id + `' selected>` + val.name + `</option>`; }
            		else{ categories_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`; }
        		});
        		categories_options_html+=`</select>`;
				$.getJSON("http://localhost/test2/api/users/read.php", function(data){
    		// build 'categories option' html
    		// loop through returned list of data
        		var users_options_html=`<select name='user' class='form-control'>`;
        		$.each(data.records, function(key, val){
            		// pre-select option is category id is the same
            		if(val.id==user){ users_options_html+=`<option value='` + val.id + `' selected>` + val.name + `</option>`; }
            		else{ users_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`; }
        		});
        		users_options_html+=`</select>`;
			// store 'update task' html to this variable
			var update_task_html=`
    			<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button'>
        			<span class='glyphicon glyphicon-list'></span> Read tasks
    			</div>
			<!-- build 'update task' html form -->
			<!-- we used the 'required' html5 property to prevent empty fields -->
			<form id='update-task-form' action='#' method='post' border='0'>
    			<table class='table table-hover table-responsive table-bordered'>
        			<tr>
            				<td>Title</td>
            				<td><input value=\"` + title + `\" type='text' name='title' class='form-control' required /></td>
        			</tr>
					<tr>
            				<td>User</td>
            				<td>` + users_options_html + `</td>
        			</tr>
        			<!-- description field -->
        			<tr>
            				<td>Description</td>
            				<td><textarea name='description' class='form-control' required>` + description + `</textarea></td>
        			</tr>
        			<!-- categories 'select' field -->
        			<tr>
            				<td>Category</td>
            				<td>` + categories_options_html + `</td>
        			</tr>
					<tr>
						<td>Finish?</td>
						<td>
							<input type="radio" id="finishf" name="finish" value="0" checked="checked">
							<label for="finishf">No</label><br>
							<input type="radio" id="finisht" name="finish" value="1">
							<label for="finisht">Yes</label><br>
						</td>
        			</tr>
					<tr>
						<td><input value=\"` + id + `\" name='id' type='hidden' /></td>
					</tr>
        			<tr>
            				<td>
                				<button type='submit' class='btn btn-info'>
                    				<span class='glyphicon glyphicon-edit'></span> Update Task
                				</button>
            				</td>
        			</tr>
    			</table>
			</form>`;
			// inject to 'page-content' of our app
			$("#page-content").html(update_task_html);
			// chage page title
			changePageTitle("Update Task");
		});
	});
    });
});
    // will run if 'create task' form was submitted
    $(document).on('submit', '#update-task-form', function(){
	// get form data
	var form_data=JSON.stringify($(this).serializeObject());
	// submit form data to api
	$.ajax({
    		url: "http://localhost/test2/api/tasks/update.php",
    		type : "POST",
    		contentType : 'application/json',
    		data : form_data,
    		success : function(result) {
        	// task was created, go back to tasks list
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
