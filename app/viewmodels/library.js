define(['durandal/app', 
		'durandal/system', 
		'service/rest', 
		'service/reader',
		'service/translator',
        'service/user',
        'service/bookStore'], function (app, system, rest, reader, translator, user, bookStore) {

	var REST = rest;
	var books = ko.observableArray();
	var cur_book = "some_book";

	var self = {

	    addBook: function(vm, evt){
	    	var file = reader.getInputFile(evt);
	    	REST.uploadBook(file).then(function(response){
	    		console.warn(response);
	    	});
	    },

	    getLibrary: function(){
			// REST.root().then(function(db) {
			// 	console.warn(db);
			// 	books(JSON.stringify(db));
			// });

			console.warn(user);
	    },

		getSelectedText: function(vm, evt){
			var text = $.selection();
			if (text.length > 0) {
				translator.translate(text).then(function(data){
					console.warn(data);
					REST.addWord(text, data, cur_book);
				});
			}
		},

		getBookContent: function(vm, e){
			REST.getFile(user.id, this).then(function(text){

				console.warn(text);
			});
		}
	    
	};

    return {
        addBook: self.addBook,
        getLibrary: self.getLibrary,
        getSelectedText: self.getSelectedText,
        user: user, // just for test here
        getBookContent: self.getBookContent //
    };

});