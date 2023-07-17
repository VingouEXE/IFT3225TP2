$(document).ready(function(){
    // handle 'read one' button click
    $(document).on('click', '.read-one-task-button', function(){
    	// get product id
	var id = $(this).attr('data-id');
	// read product record based on given ID
	$.getJSON("http://localhost/test2/api/tasks/read_one.php?id=" + id, function(data){
	// start html
		var read_one_product_html=`
    		<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button'>
        		<span class='glyphicon glyphicon-list'></span> Read tasks
    		</div>
		<table class='table table-bordered table-hover'>
    		<tr>
        		<td>Id</td>
        		<td>` + data.id + `</td>
    		</tr>
    		<tr>
        		<td>Titre</td>
        		<td>` + data.title + `</td>
    		</tr>
    		<tr>
        		<td>Description</td>
        		<td>` + data.description + `</td>
    		</tr>
    		<tr>
        		<td>Category</td>
        		<td>` + data.category + `</td>
    		</tr>
		</table>`;
		// inject html to 'page-content' of our app
		$("#page-content").html(read_one_product_html);
		// chage page title
		changePageTitle("Create Task");
	});
    });
});


