define(['plugins/router',
        'plugins/dialog',
        'service/user',
        'service/rest',
        'service/translator',
        'service/dataStore'
        ], function (router, dialog, user, rest, translator, dataStore) {

    var REST = rest;

    var currentBook = ko.observable();

    var context = ko.observable('');
    var contents = ko.observableArray([]);
    var currentSection = ko.observable('');
    var bookSections = [];

    var book = {

        getBook: function(bookName, selectedSection){

            _.each(user.books(), function(item){
                if (item.name === bookName) {
                    user.curBookName(bookName);
                    console.info('CURRENT BOOK IS '+user.curBookName());
                    currentBook(item);
                }
            });

            REST.getFile(user.id, bookName).then(function(text){
                var xml = $.parseXML(text);
                console.warn(xml);
                context(text);

                // book.showContents();
                selectedSection ? book.showContext(selectedSection) : book.showContents();

            });

        },

        // Оглавление
        showContents: function(){
            // var xml = $.parseXML(context());
            // var body = $(context()).find('body');
            // var body = $(xml).find('body');
            // var sections = $(body[0]).find('section');
            var sections = $(context()).find('section');
            console.warn(sections);
            bookSections = sections;

            _.each(sections, function(item, i){
                console.warn(item, i);
                var title = $(item).find('title').text();
                // console.warn($(item).find('title'));
                // title = title.replace(/\n/g, '');

                var section = {title: title, index: i, text: item.innerHTML};
                contents.push(section);

                
            });

            dataStore.bookContents = contents();

            console.warn(contents());
        },

        // Текст
        showContext: function(selectedSection){
            console.warn(selectedSection);
            var that = this;

            _.each(contents(), function(item, i){
                console.warn(item, i);
                if (selectedSection && (selectedSection.index === i) ) {
                    console.warn(item.text);
                    currentSection(item.text);
                } else if (that.index === i) {
                    console.warn(item);
                    currentSection(item.text);
                }
            });

            // console.warn(dataStore.bookContents);
        },

        getSelectedText: function(vm, evt){
            var text = $.selection();
            if (text.length > 0) {
                translator.translate(text).then(function(data){
                    console.warn(data);
                    dialog.showMessage('Translate: "'+data+'"', 'Text: "'+text+'"', ['Close', 'Add']).then(function(dialogResult){
                      if(dialogResult=='Add'){
                        REST.addWord(text, data, currentBook().name);
                      }
                    });                   
                });
            }
        }

    };

    function activate(bookName, selectedSection){
        // FIXME: Bad solution. Maybe use trigger app events.
        contents([]);
        dataStore.bookContents = [];

        var check = setInterval(function(){
            if (user.id && !selectedSection) {
                book.getBook(bookName);
                clearInterval(check);
            }

            if (user.id && selectedSection) {
                book.getBook(bookName, selectedSection);
                clearInterval(check);
            }
        }, 500);

    };

    return {
        activate: activate,
        user: user,
        currentBook: currentBook,
        currentSection: currentSection,
        context: context,
        contents: contents,
        showContext: book.showContext,
        getSelectedText: book.getSelectedText
    };
})