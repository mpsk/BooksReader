define(['durandal/system', 'service/rest'], function (system, rest) {

	var REST = rest;
	var books = ko.observableArray();

	var self = {

		books: ko.observableArray(),

		activate: function(){
	    	
	    },

	    addBook: function(){
	    	document.getElementById('file').addEventListener('change', handleFileSelect, false);

			if (window.File && window.FileReader && window.FileList && window.Blob) {

				var that = this;
				var file = 'app/service/test.txt';
				var reader = new FileReader();

				reader.readAsText(file);

				REST.library().then(function(library){
					console.warn(library);
					books(JSON.stringify(library));
				});
				
			} else {
				alert('The File APIs are not fully supported in this browser.');
			}

	    }
	};

    return {
        books: books,
        activate: self.activate,
        addBook: self.addBook
    };

});

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	console.warn(files);

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0; i < files.length; i++) {
		var f = files[i];

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			console.warn(theFile);
		})(f);

		reader.readAsText(f);
	}
}