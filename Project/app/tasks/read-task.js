$(document).ready(function () {
  showTasks();
  $(document).on("click", ".read-tasks-button", function () {
    showTasks();
  });
});

function showTasks() {
  $.getJSON("http://localhost/test2/api/tasks/read.php", function (data) {
    readTasksTemplate(data, "");
    changePageTitle("Read Tasks");
  });
}
