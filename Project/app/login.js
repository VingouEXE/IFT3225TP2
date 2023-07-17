$(document).ready(function(){
    // app html
    var app_html=`
        <div class='container'>
            <div class='page-header'>
                <h1 id='login-title'>Login</h1>
            </div>
            <div id='page-login'></div>
        </div>`;
    $("#login").html(app_html);
});
// change page title
function changePageTitle(page_title){
    // change page title
    $('#login-title').text(page_title);
    // change title tag
    document.title=page_title;
}
// function to make form values to json format
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};