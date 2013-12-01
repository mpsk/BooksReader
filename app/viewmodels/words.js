define(['service/user'], function(user) {

        var self = {
                selectedBookName: ko.observable(''),
    filter: ko.observable(''),
    filteredWords: ko.computed(function () {
       return ko.utils.arrayFilter(user.words, function (words1) {
          console.log(words1);
          var result = words1.indexOf(self.filter) != -1 || !self.filter;       
            return result;
        })
     }),
    deleteWord: function(text){
    
    }
        }
    
   

    return {
       words: user.words,
       selectedBookName: self.selectedBookName,
       books: user.books,
       filter: self.filter,
       deleteWord: self.deleteWord,
       filteredWords: self.filteredWords
    };
})