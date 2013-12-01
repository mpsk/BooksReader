define(['service/user'], function(user) {

    // var user_name = ko.observable(user.name());


    // function activate() {
    //     var dfd = $.Deferred();

    //     //dfd.resolve(response);
    //     setTimeout(function() {
    //         console.info(user.name());
    //         user_name(user.name());
    //     }, 2000);


    // }

    return {
        // activate: activate,
        nameName: user.name,
        books_count: user.books.length,
        words_count: user.words.length
    };
})