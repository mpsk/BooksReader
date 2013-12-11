define(['service/rest', 'service/user'], function (rest, user) {

    var REST = rest;
    var selectedBook = ko.observable('');
    var filter = ko.observable('');
    var word_value = ko.observable('');
    var edit_word;

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
            REST.updateUser(user);
        },
        editWord: function(obj) {
            word_value(obj.translate);
            edit_word = obj;
            $('#dialog').modal('show');   
            REST.updateUser(user);       
        },

        updateWord: function(){
           ko.utils.arrayFilter(user.words(), function(words1) {
               if(words1.text==edit_word.text) {
                    words1.translate = word_value();
               }
           });
           filter('/');
           filter('');
            $('#dialog').modal('hide');
        }       

    };

    function deactivate (para){
        REST.updateUser(user);
    };
   var sortFunction = function(a, b) {
        return a.text < b.text ? -1 : 1;
    };
    /*var sortedWords = ko.computed(function() {
       return self.filteredWords().sort(function (left, right) { 
            return left.text == right.text ? 
                 0 : 
                 (left.text < right.text ? -1 : 1); 
        });
      }); */

     function activate() {
        console.log('CUR BOOK ' + user.curBookName());
        if(user.curBookName().length>0){
            ko.utils.arrayFilter(user.books(), function(book) {
               if(book.name==user.curBookName()) {
                   selectedBook(book);
               }
           });            
        }
     }

    return {
        deactivate: deactivate,
        words: user.words,
        selectedBook: selectedBook,
        books: user.books,
        filter: filter,
        deleteWord: self.deleteWord,
        filteredWords: self.filteredWords,
        editWord: self.editWord,
        word_value: word_value,
        updateWord: self.updateWord,
        activate: activate
    };
})