/*$(document).ready(function(){
    // when a 'search tasks' button was clicked
    $(document).on('submit', '#search-product-form', function(){
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();
            changePageTitle("Search tasks: " + keywords);
        // get data from the api based on search keywords
        $.getJSON("https://www-ens.iro.umontreal.ca/~pift3225/restApi/api/product/search.php?s=" + keywords, function(data){
            // template in tasks.js
            readProductsTemplate(data, keywords);
            // chage page title
            changePageTitle("Search tasks: " + keywords);
        });
        // prevent whole page reload
        return false;
    });
});*/
