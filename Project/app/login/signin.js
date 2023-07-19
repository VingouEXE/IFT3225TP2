$(document).ready(function () {
  $(document).on("click", ".create-sign-button", function () {
    var categories_options_html = "";
    var user_options_html = "";
    $.getJSON("http://localhost/test2/api/roles/read.php", function (data) {
      categories_options_html = `<select name='role' class='form-control'>`;
      $.each(data.records, function (key, val) {
        categories_options_html +=
          `<option value='` + val.id + `'>` + val.role + `</option>`;
      });
      categories_options_html += `</select>`;
      var create_task_html =
        `<button type='cancel' id='cancel' class='btn btn-danger'>
        Cancel
    </button>
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
					<td>` +
        categories_options_html +
        `</td>
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
      $("#page-login").html(create_task_html);
      changePageTitle("Sign in");
    });
  });
  $(document).on("submit", "#create-sign-form", function () {
    var form_data = JSON.stringify($(this).serializeObject());
    $.ajax({
      url: "http://localhost/test2/api/users/create.php",
      type: "POST",
      contentType: "application/json",
      data: form_data,
      success: function (result) {
        showLogin();
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
      },
    });
    return false;
  });
  $(document).on("click", "#cancel", function () {
    showLogin();
  });
});
