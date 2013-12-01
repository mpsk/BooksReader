define(['plugins/router',
        'service/user',
        'service/rest',
        'service/translator'
        ], function (router, user, rest, translator) {

    var REST = rest;

    var currentBook = ko.observable();
    var context = ko.observable('');
    var contents = ko.observable(['']);

    var book = {

        getBookContent: function(bookName){

            _.each(user.books(), function(item){
                if (item.name === bookName) {
                    currentBook(item);
                }
            });

            REST.getFile(user.id, bookName).then(function(text){
                // console.warn(text);
                var xml = $.parseXML(text);
                console.warn(xml);
                context(text);
            });

        },

        showContext: function(){

        },

        getContents: function(){

        },

        getSelectedText: function(vm, evt){
            var text = $.selection();
            if (text.length > 0) {
                translator.translate(text).then(function(data){
                    console.warn(data);
                    REST.addWord(text, data, currentBook().name);
                });
            }
        }

    };

    function activate(bookName){

        // FIXME: Bad solution. Maybe use trigger app events.
        var check = setInterval(function(){
            if (user.id) {

                book.getBookContent(bookName);
                clearInterval(check);
            }

        }, 500);

    }

    return {
        activate: activate,
        user: user,
        currentBook: currentBook,
        context: context,
        showContext: book.showContext,
        getSelectedText: book.getSelectedText
    };
})