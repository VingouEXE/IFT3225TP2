$(document).ready(function(){
    // show list of product on first load
    showLogin();
    // when a 'read tasks' button was clicked
    $(document).on('click', '.login-button', function(){
        showLogin();
    });
});

// function to show list of tasks
function showLogin(){
    $.getJSON("http://localhost/test2/api/tasks/read.php", function(data){
        loginTemplate();
        changePageTitle("Login");
    });
}
