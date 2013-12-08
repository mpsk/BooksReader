define(['plugins/router',
        'plugins/dialog',
        'service/user',
        'service/rest',
        'service/translator',
        'service/dataStore',
        'service/options'
        ], function (router, dialog, user, rest, translator, dataStore, options) {

    var REST = rest;

    var currentBook = ko.observable();

    var context = ko.observable('');
    var contents = ko.observableArray([]);
    var currentSection = ko.observable('');
    var bookSections = [];
    //var fontSizeCSS = ko.observable( options.font_size );

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
                // console.warn(item, i);
                var title = $(item).find('title').text();
                var cleanTitle = title.replace(/<p>|<strong>|<\/strong>/g, '')
                                    .replace(/<\/p>/g, '. ');

                // console.warn(cleanTitle);
                // console.warn($(item).find('title'));
                // title = title.replace(/\n/g, '');

                var section = {title: cleanTitle, index: i, text: item.innerHTML};
                contents.push(section);

                
            });

            dataStore.bookContents = contents();

            console.warn(contents());
        },

        // Текст
        showContext: function(selectedSection){
            // var that = this;

            console.warn(selectedSection, selectedSection.length);
            contents().length === 0 ? book.showContents() : null;
            
            _.each(contents(), function(item, i){
                var cleanTitle = item.title.replace(/\n/g,'');
                // console.warn(cleanTitle, cleanTitle.length, selectedSection.trim() == cleanTitle.trim());

                if (!selectedSection.title) {
                    if (selectedSection.trim() == cleanTitle.trim()) {
                        var cleanText = item.text.replace('&lt;', '<').replace('&gt;', '>');
                        currentSection(item.text);
                        console.warn(item);
                    }
                }
                else {
                    // If route from book view
                    if (selectedSection.index === item.index){
                        var cleanText = item.text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        currentSection(item.text);
                        // console.warn(selectedSection, cleanTitle);
                    }
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
        }/*,
        fontSizeCSS: ko.computed(function() {
            return {"fontSize": options.font_size() + "px"};
        }, this)*/

    };

    function activate(bookName, selectedSection){
        // FIXME: Bad solution. Maybe use trigger app events.
        contents([]);
        dataStore.bookContents = [];
        console.warn(bookName, selectedSection);

        var check = setInterval(function(){
            if (user.id && !selectedSection) {
                book.getBook(bookName);
                clearInterval(check);
            }

            else if (user.id && selectedSection) {
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
        fontSizeCSS: options.font_size,
        fontName: options.font_name,
        context: context,
        contents: contents,
        showContext: book.showContext,
        getSelectedText: book.getSelectedText
    };
})