$(document).ready(function(){
    $(document).on('submit', '#search-task-form', function(){
        var keywords = $(this).find(":input[name='keywords']").val();
            changePageTitle("Search Task: " + keywords);
        $.getJSON("http://localhost/test2/api/tasks/search.php?s=" + keywords, function(data){
            readTasksTemplate(data, keywords);
            changePageTitle("Search products: " + keywords);
        });
        return false;
    });
});
