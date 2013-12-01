define(['plugins/router',
        'service/user',
        'service/rest',
        'service/translator'
        ], function (router, user, rest, translator) {

    var REST = rest;

    var currentBook = ko.observable();

    var context = ko.observable('');
    var contents = ko.observableArray([]);
    var $bookSections = [];

    var book = {

        getBook: function(bookName){

            _.each(user.books(), function(item){
                if (item.name === bookName) {
                    user.curBookName = bookName;
                    console.info('CURRENT BOOK IS '+user.curBookName);
                    currentBook(item);
                }
            });

            REST.getFile(user.id, bookName).then(function(text){
                // console.warn(text);
                var xml = $.parseXML(text);
                console.warn(xml);
                context(text);
                book.showContents();
            });

        },

        // Оглавление
        showContents: function(){
            var xml = $.parseXML(context());
            var body = $(xml).find('body');
            var sections = $(body[0]).find('section');
            console.warn(sections);
            $bookSections = sections;

            _.each(sections, function(item, i){
                var title = $(item).find('title').text();
                title = title.replace(/\n/g, '');

                if (title) {
                    var section = {title: title, index: i};
                    contents.push(section);
                }
            });

            console.warn(body);
            console.warn(contents());
            // console.warn(sections);
        },

        // Текст
        showContext: function(){
            var that = this;
            _.each($bookSections, function(item, i){
                if (that.index === i) {
                    console.warn(item);
                }
            });
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
        
        contents([]);

        var check = setInterval(function(){
            if (user.id) {
                book.getBook(bookName);
                clearInterval(check);
            }
        }, 500);

    }

    return {
        activate: activate,
        user: user,
        currentBook: currentBook,
        context: context,
        contents: contents,
        showContext: book.showContext,
        getSelectedText: book.getSelectedText
    };
})