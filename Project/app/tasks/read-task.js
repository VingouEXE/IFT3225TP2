$(document).ready(function () {
  showTasks();
  $(document).on("click", ".read-tasks-button", function () {
    showTasks();
  });
});

function showTasks() {
  $.getJSON("https://www-ens.iro.umontreal.ca/~clouatrv/api/tasks/read.php", function (data) {
    readTasksTemplate(data, "");
    changePageTitle("Read Tasks");
  });
}
