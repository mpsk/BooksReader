define(['service/rest', 'service/user', 'durandal/app'], function (rest, user, app) {

    var REST = rest;
    var selectedBook = ko.observable('');
    var filter = ko.observable('');

    var self = {

        filteredWords: ko.computed(function() {
            return ko.utils.arrayFilter(user.words(), function(words1) {

                var sstr = words1.text;
                var bstr = words1.book;
                var result = true;

                if (filter() != undefined) {
                    result = sstr.indexOf(filter()) > -1 || !filter();

                    if ( (selectedBook() !== '') && (selectedBook() !== undefined) ) {
                        var b_name = selectedBook().name;
                        if (bstr.toString() != b_name.toString()) result = false;
                    }
                }

                return result;
            });
        }),

        deleteWord: function(obj) {
            user.words.remove(this);
        },
        editWord: function(obj) {
            //debugger;
          app.showDialog('viewmodels/sender').then(function(dialogResult){
              //do something with the dialog result here
            });
        },

        sortWords: function(){
            console.info('sort');          
        }
    };

    function deactivate (para){
        REST.updateUser(user);
    };
   var sortFunction = function(a, b) {
        return a.text < b.text ? -1 : 1;
    };
    var sortedWords = ko.computed(function() {
       return self.filteredWords().sort(function (left, right) { 
            return left.text == right.text ? 
                 0 : 
                 (left.text < right.text ? -1 : 1); 
        });
      }); 

    return {
        deactivate: deactivate,
        words: user.words,
        selectedBook: selectedBook,
        books: user.books,
        filter: filter,
        //fbId: user.fbId,
        deleteWord: self.deleteWord,
        filteredWords: self.filteredWords,
        sortedWords: sortedWords,
        editWord: self.editWord
    };
})