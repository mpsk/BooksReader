define(['service/user'], function(user) {

    // var user_name = ko.observable(user.name());


     function activate() {


        /*rest.getUserAvatar().then(function(answer) {
            console.info('activate', answer);
            $('#userinfo').append(answer);
        });*/
        setTimeout(function(){
            var result="<IMG src='http://graph.facebook.com/"+user.fbId+"/picture?type=large'>"; 
            $('#userinfo').append(result);
        },1000);

        //var result = rest.getUserAvatar();
        //console.info(result);
      
    
     }

    return {
        activate: activate,
        nameName: user.name,
        books_count: user.books.length,
        words_count: user.words.length
    };
})