define(['durandal/app', 
		'durandal/system', 
		'service/rest', 
		'service/reader',
		'service/translator',
		'service/user'], function (app, system, rest, reader, translator, user) {

	var REST = rest;
	var books = ko.observableArray();

	var self = {

	    addBook: function(vm, evt){
	    	var file = reader.getInputFile(evt);
	    	REST.loadBook(file);
	    },

	    getLibrary: function(){
			REST.root().then(function(db) {
				console.warn(db);
				books(JSON.stringify(db));
			});

			console.warn(user);
	    },

		getSelectedText: function(vm, evt){
			var text = $.selection();
			if (text.length > 0) {
				translator.translate(text).then(function(data){
					console.warn(data);
				});
			}
		},

		getText: function(){
			console.warn(this);
			REST.getFile(user.id, this).then(function(text){
				console.warn(text);
			});
		}
	    
	};

    return {
        books: books,
        addBook: self.addBook,
        getLibrary: self.getLibrary,
        getSelectedText: self.getSelectedText,
        user: user, // just for test here
        getText: self.getText //
    };

});