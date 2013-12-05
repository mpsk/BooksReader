define(['service/user', 
        'service/dataStore'], function (user, dataStore) {

    var contents = ko.observableArray([]);
    var currentBook = ko.observable();

    function activate(){
        setTimeout(function(){
            
            currentBook(user.curBookName());
            contents(dataStore.bookContents);

            console.warn(user, dataStore.bookContents);
        }, 100);
    };

    return {
        activate: activate,
        contents: contents,
        user: user
    };

});