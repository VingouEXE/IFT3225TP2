function readTasksTemplate(data, keywords){
  
    // search tasks form
    var read_tasks_html ="<form id='search-product-form' action='#' method='post'>";
    read_tasks_html+="<div class='input-group pull-left w-30-pct'>";
 
    read_tasks_html+="<span class='input-group-btn'>";
    read_tasks_html+="</button>";
    read_tasks_html+="</span>";
    
    read_tasks_html+="</div>";
    read_tasks_html+="</form>";
    
    // when clicked, it will load the create product form
    read_tasks_html+="<div id='create-task' class='btn btn-primary pull-right m-b-15px create-task-button'>";
    read_tasks_html+="<span class='glyphicon glyphicon-plus'></span> Create Task";
    read_tasks_html+="</div>";
    
    // start table
    read_tasks_html+="<table class='table table-bordered table-hover'>";
    
    // creating our table heading
    read_tasks_html+="<tr>";
    read_tasks_html+="<th>Id</th>";
    read_tasks_html+="<th>Title</th>";
    read_tasks_html+="<th>User</th>";
    read_tasks_html+="<th>Category</th>";
    read_tasks_html+="<th>Description</th>";
    read_tasks_html+="<th>Finished</th>";
    read_tasks_html+="<th>Date</th>";
    read_tasks_html+="<th class='text-align-center'>Action</th>";
    read_tasks_html+="</tr>";
    // loop through returned list of data
    $.each(data.records, function(key, val) {
        // creating new table row per record
        read_tasks_html+="<tr>";

        read_tasks_html+="<td>" + val.id + "</td>";
        read_tasks_html+="<td>" + val.title + "</td>";
        read_tasks_html+="<td>" + val.user + "</td>";
        read_tasks_html+="<td>" + val.category + "</td>";
        read_tasks_html+="<td>" + val.description + "</td>";
        read_tasks_html+="<td>" + val.finish + "</td>";
        read_tasks_html+="<td>" + val.date + "</td>";

        // 'action' buttons
        read_tasks_html+="<td>";
        // read product button
        read_tasks_html+="<button class='btn btn-primary m-r-10px read-one-task-button' data-id='" + val.id + "'>";
        read_tasks_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
        read_tasks_html+="</button>";

        // edit button
        read_tasks_html+="<button class='btn btn-info m-r-10px update-task-button' data-id='" + val.id + "'>";
        read_tasks_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
        read_tasks_html+="</button>";

        // delete button
        read_tasks_html+="<button class='btn btn-danger delete-task-button' data-id='" + val.id + "'>";
        read_tasks_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
        read_tasks_html+="</button>";
        read_tasks_html+="</td>";

        read_tasks_html+="</tr>";
    });

    // end table
    read_tasks_html+="</table>";

    // inject to 'page-content' of our app
    $("#page-content").html(read_tasks_html);
}
