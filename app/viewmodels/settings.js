define([], function() {

    var self = {
       font_size: ko.observable(10),
       font_name: ko.observable('Verdana')
        }    
   

    return {
      font_size: self.font_size,
      font_name: self.font_name
    };
})