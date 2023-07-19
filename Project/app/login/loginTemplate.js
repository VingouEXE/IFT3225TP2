function loginTemplate() {
  formL =
    "<div id='create-signin' class='btn btn-primary pull-right m-b-15px create-sign-button'>";
  formL += "Sign In";
  formL += "</div>";
  formL += `<form id='login-form' action='#' method='post' border='0'>
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
		</form>`;
  $("#page-login").html(formL);
}
$(document).on("submit", "#login-form", function () {
  var form_data = JSON.stringify($(this).serializeObject());
  $.ajax({
    url: "http://localhost/test2/api/users/check.php",
    type: "POST",
    contentType: "application/json",
    data: form_data,
    success: function (result) {
      if (result.message != "fail") {
        document.location.href = "index.php";
      } else {
        document.getElementById("login-form").reset();
      }
    },
    error: function (xhr, resp, text) {
      console.log(xhr, resp, text);
    },
  });
  return false;
});
