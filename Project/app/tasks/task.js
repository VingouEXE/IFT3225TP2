function readTasksTemplate(data, keywords) {
  var id=$("#userId p").text();
  var role=$("#userRole p").text();
  var read_tasks_html ="<form id='search-task-form' action='#' method='post'>";
  read_tasks_html+="<div class='input-group pull-left w-30-pct'>";
    
    read_tasks_html+="<input type='text' value=\"" + keywords + "\" name='keywords' class='form-control product-search-keywords' />";
 
    read_tasks_html+="<span class='input-group-btn'>";
    read_tasks_html+="<button type='submit' class='btn btn-default' type='button'>";
    read_tasks_html+="<span class='glyphicon glyphicon-search'></span>";
    read_tasks_html+="</button>";
    read_tasks_html+="</span>";
    
    read_tasks_html+="</div>";
    read_tasks_html+="</form>";
  read_tasks_html +=
    "<form id='search-product-form' action='#' method='post'>";
  read_tasks_html += "<div class='input-group pull-left w-30-pct'>";

  read_tasks_html += "<span class='input-group-btn'>";
  read_tasks_html += "</button>";
  read_tasks_html += "</span>";

  read_tasks_html += "</div>";
  read_tasks_html += "</form>";

  read_tasks_html +=
    "<div id='create-task' class='btn btn-primary pull-right m-b-15px create-task-button'>";
  read_tasks_html +=
    "<span class='glyphicon glyphicon-plus'></span> Create Task";
  read_tasks_html += "</div>";

  read_tasks_html += "<table id='sort' class='table table-bordered table-hover'>";

  read_tasks_html += "<tr>";
  read_tasks_html += "<th onclick='sortTable(0)' id='th0'>Id</th>";
  read_tasks_html += "<th onclick='sortTable(1)' id='th1'>Title</th>";
  read_tasks_html += "<th onclick='sortTable(2)' id='th2'>User</th>";
  read_tasks_html += "<th onclick='sortTable(3)' id='th3'>Category</th>";
  read_tasks_html += "<th onclick='sortTable(4)' id='th4'>Description</th>";
  read_tasks_html += "<th onclick='sortTable(5)' id='th5'>Finished</th>";
  read_tasks_html += "<th onclick='sortTable(6)' id='th6'>Date</th>";
  read_tasks_html += "<th class='text-align-center'>Action</th>";
  read_tasks_html += "</tr>";
  $.each(data.records, function (key, val) {
    read_tasks_html += "<tr>";

    read_tasks_html += "<td>" + val.id + "</td>";
    read_tasks_html += "<td>" + val.title + "</td>";
    read_tasks_html += "<td>" + val.userN + "</td>";
    read_tasks_html += "<td>" + val.category + "</td>";
    read_tasks_html += "<td>" + val.description + "</td>";
    read_tasks_html += "<td>" + (val.finish==0?"":"✓") + "</td>";
    read_tasks_html += "<td>" + val.date + "</td>";

    read_tasks_html += "<td>";
    read_tasks_html +=
      "<button class='btn btn-primary m-r-10px read-one-task-button' data-id='" +
      val.id +
      "'>";
    read_tasks_html +=
      "<span class='glyphicon glyphicon-eye-open'></span> Read";
    read_tasks_html += "</button>";

    if(id==val.user || role==1){
        read_tasks_html +=
        "<button class='btn btn-info m-r-10px update-task-button' data-id='" +
        val.id +
        "'>";
      read_tasks_html += "<span class='glyphicon glyphicon-edit'></span> Edit";
      read_tasks_html += "</button>";
  
      read_tasks_html +=
        "<button class='btn btn-danger delete-task-button' data-id='" +
        val.id +
        "'>";
      read_tasks_html +=
        "<span class='glyphicon glyphicon-remove'></span> Delete";
      read_tasks_html += "</button>";
    }
    
    read_tasks_html += "</td>";

    read_tasks_html += "</tr>";
  });

  read_tasks_html += "</table>";

  $("#page-content").html(read_tasks_html);
}

function sortTable(n) {
    //https://www.w3schools.com/howto/howto_js_sort_table.asp
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("sort");
    for (let i = 0; i <= 6; i++) {
        document.getElementById("th"+i).style.backgroundColor = "white";
      }
    document.getElementById("th"+n).style.backgroundColor = "gray";
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }