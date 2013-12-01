define(['service/user'], function(user) {

    var self = {
      selectedBook: ko.observable(''),
      filter: ko.observable(''),
      filteredWords: ko.computed(function () {
          return ko.utils.arrayFilter(user.words(), function (words1) {
             var sstr = words1.text;
             var bstr = words1.book;
             var result = true;
             if(self.filter()!=undefined){
               result = sstr.indexOf(self.filter())> -1 || !self.filter();                   
                  if(self.selectedBook()!=undefined){                  
                    var b_name = self.selectedBook().name;
                    if(bstr.toString()!=b_name.toString()) result=false;
                  }
              }      
            return result;
          });
        
         
       }),
      deleteWord: function(text){
         //user.words()
       }
        }
    
   

    return {
       words: user.words,
       selectedBook: self.selectedBook,
       books: user.books,
       filter: self.filter,
       deleteWord: self.deleteWord,
       filteredWords: self.filteredWords
    };
})