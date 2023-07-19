$(document).ready(function () {
  showLogin();
  $(document).on("click", ".login-button", function () {
    showLogin();
  });
});

function showLogin() {
  $.getJSON("http://localhost/test2/api/users/read.php", function (data) {
    loginTemplate();
    changePageTitle("Login");
  });
}
