$(document).ready(function () {
  $(document).on("click", ".create-task-button", function () {
    var categories_options_html = "";
    var user_options_html = "";
    $.getJSON(
      "https://www-ens.iro.umontreal.ca/~clouatrv/api/categories/read.php",
      function (data) {
        categories_options_html = `<select name='category' class='form-control'>`;
        $.each(data.records, function (key, val) {
          categories_options_html +=
            `<option value='` + val.id + `'>` + val.name + `</option>`;
        });
        categories_options_html += `</select>`;
        $.getJSON("https://www-ens.iro.umontreal.ca/~clouatrv/api/users/read.php", function (data) {
          user_options_html = `<select name='user' class='form-control'>`;
          $.each(data.records, function (key, val) {
            user_options_html +=
              `<option value='` + val.id + `'>` + val.name + `</option>`;
          });
          user_options_html += `</select>`;
          var create_task_html =
            `
    		<!-- 'read tasks' button to show list of tasks -->
    		<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button'>
        		<span class='glyphicon glyphicon-list'></span> Read tasks
    		</div>
		<form id='create-task-form' action='#' method='post' border='0'>
    		<table class='table table-hover table-responsive table-bordered'>
				<tr>
					<td>User</td>
					<td>` +
            user_options_html +
            `</td>
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
					<td>` +
            categories_options_html +
            `</td>
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
          $("#page-content").html(create_task_html);
          changePageTitle("Create Task");
        });
      }
    );
  });
  $(document).on("submit", "#create-task-form", function () {
    var form_data = JSON.stringify($(this).serializeObject());
    $.ajax({
      url: "https://www-ens.iro.umontreal.ca/~clouatrv/api/tasks/create.php",
      type: "POST",
      contentType: "application/json",
      data: form_data,
      success: function (result) {
        showTasks();
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
      },
    });
    return false;
  });
});
