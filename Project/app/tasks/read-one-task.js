$(document).ready(function () {
  $(document).on("click", ".read-one-task-button", function () {
    var id = $(this).attr("data-id");
    $.getJSON(
      "https://www-ens.iro.umontreal.ca/~clouatrv/api/tasks/read_one.php?id=" + id,
      function (data) {
        var read_one_product_html =
          `
    		<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button'>
        		<span class='glyphicon glyphicon-list'></span> Read tasks
    		</div>
		<table class='table table-bordered table-hover'>
    		<tr>
        		<td>Id</td>
        		<td>` +
          data.id +
          `</td>
    		</tr>
			<tr>
        		<td>User</td>
        		<td>` +
          data.user +
          `</td>
    		</tr>
    		<tr>
        		<td>Titre</td>
        		<td>` +
          data.title +
          `</td>
    		</tr>
    		<tr>
        		<td>Description</td>
        		<td>` +
          data.description +
          `</td>
    		</tr>
    		<tr>
        		<td>Category</td>
        		<td>` +
          data.category +
          `</td>
    		</tr>
		</table>`;
        $("#page-content").html(read_one_product_html);
        changePageTitle("Create Task");
      }
    );
  });
});
