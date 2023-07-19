$(document).ready(function () {
  $(document).on("click", ".delete-task-button", function () {
    var task_id = $(this).attr("data-id");
    $.ajax({
      url: "http://localhost/test2/api/tasks/delete.php",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({ id: task_id }),
      success: function (result) {
        showTasks();
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
      },
    });
  });
});
