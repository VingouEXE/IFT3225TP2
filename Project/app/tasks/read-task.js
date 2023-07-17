$(document).ready(function(){
    // show list of product on first load
    showTasks();
    // when a 'read tasks' button was clicked
    $(document).on('click', '.read-tasks-button', function(){
        showTasks();
    });
});

// function to show list of tasks
function showTasks(){
    $.getJSON("http://localhost/test2/api/tasks/read.php", function(data){
       readTasksTemplate(data, "");
       changePageTitle("Read Tasks");	
    });
}
