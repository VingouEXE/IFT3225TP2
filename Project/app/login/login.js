$(document).ready(function () {
  showLogin();
  $(document).on("click", ".login-button", function () {
    showLogin();
  });
});

function showLogin() {
  $.getJSON("https://www-ens.iro.umontreal.ca/~clouatrv/api/users/read.php", function (data) {
    loginTemplate();
    changePageTitle("Login");
  });
}
