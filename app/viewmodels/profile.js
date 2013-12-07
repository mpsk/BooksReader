define(['service/user'], function(user) {

    var books_count1 = ko.observable(0);
    var words_count1 = ko.observable(0);
   
    function activate() {
       
        setTimeout(function(){
            var result="<IMG src='http://graph.facebook.com/"+user.fbId+"/picture?type=large'>"; 
            $('#userinfo').append(result);   
           books_count1( user.books().length );//ko.observable( user.books().length );
           words_count1( user.words().length );
           console.log(books_count1);
        },1000);         
    
     }

    return {
        activate: activate,
        nameName: user.name,
        /*books_count: user.books().length,
        words_count: user.words().length*/
        books_count1: books_count1,
        words_count1: words_count1
    };
})