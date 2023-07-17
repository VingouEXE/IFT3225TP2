$(document).ready(function(){
    // will run if the delete button was clicked
    $(document).on('click', '.delete-task-button', function(){
    	// get the product id
	var task_id = $(this).attr('data-id');
	// bootbox for good looking 'confirm pop up'
    				// send delete request to api / remote server
    				$.ajax({
        				url: "http://localhost/test2/api/tasks/delete.php",
        				type : "POST",
        				dataType : 'json',
        				data : JSON.stringify({ id: task_id }),
        				success : function(result) {
            				// re-load list of tasks
            				showTasks();
        				},
        				error: function(xhr, resp, text) {
            					console.log(xhr, resp, text);
        				}
    				});
    });
});
