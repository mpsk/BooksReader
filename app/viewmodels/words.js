define(['service/rest', 'service/user'], function (rest, user) {

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
        }
    };

    function deactivate (para){
        REST.updateUser(user);
    };
   

    return {
        deactivate: deactivate,
        words: user.words,
        selectedBook: selectedBook,
        books: user.books,
        filter: filter,
        //fbId: user.fbId,
        deleteWord: self.deleteWord,
        filteredWords: self.filteredWords
    };
})