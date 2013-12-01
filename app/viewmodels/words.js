define(['service/user'], function(user) {

    var self = {
       selectedBookName: ko.observable('erg'),
      filter: ko.observable(''),
      filteredWords: ko.computed(function () {
          return ko.utils.arrayFilter(user.words(), function (words1) {
             //alert(words1.text) ;
             //alert(self.filter());
             var sstr = words1.text;
             //alert(sstr+" } "+self.filter()+" { "+sstr.indexOf(self.filter()) );
             var result = sstr.indexOf(self.filter())> -1 || !self.filter();     
             //alert(result);
            return result;
          });
         // alert(user.words().length );
        /* setTimeout(function(){
              return ko.utils.arrayFilter(user.words(), function (words1) {
                  console.log(words(), words1);
                  var result = words1.indexOf(self.filter() ) != -1 || !self.filter();       
                    return result;
                })
         },1000);*/
         
       }),
      deleteWord: function(text){
         //user.words()
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