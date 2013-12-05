define(['plugins/router',
        'service/user', 
        'service/dataStore'], function (router, user, dataStore) {

    var contents = ko.observableArray([]);
    var currentBook = ko.observable();

    var self = {
        showContext: function(){
            var that = this;
            _.each(dataStore.bookContents, function(item, i){
                if (that.index === i) {
                    console.warn(item);
                    self.routeToContext(item);
                }
            });

            // console.warn(dataStore.bookContents);
        },

        routeToContext: function(section) {
            router.navigate('#book/' + user.curBookName()+'/'+section.title);
        }
    };


    function activate(){
        currentBook(user.curBookName());
        contents(dataStore.bookContents);
        console.warn(user, dataStore.bookContents);
    };

    return {
        activate: activate,
        contents: contents,
        showContext: self.showContext,
        user: user,
        router: router
    };

});