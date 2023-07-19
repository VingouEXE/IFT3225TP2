$(document).ready(function(){
    $(document).on('submit', '#search-task-form', function(){
        var keywords = $(this).find(":input[name='keywords']").val();
            changePageTitle("Search Task: " + keywords);
        $.getJSON("https://www-ens.iro.umontreal.ca/~clouatrv/api/tasks/search.php?s=" + keywords, function(data){
            readTasksTemplate(data, keywords);
            changePageTitle("Search products: " + keywords);
        });
        return false;
    });
});
