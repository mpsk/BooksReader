define(['durandal/system', 'plugins/http', 'service/rest'], function (system, http, rest) {
    
    var REST = rest;
	var coding = {
		UTF: 'UTF-8'
	};

	var reader = {
		getType: function(file){
			var type = file.type;
			return type;
		},

		getFile: function(evt) {
			var book = {};
			var dfd = $.Deferred();
	    	
			var input = $(evt.target);
			var files = FileAPI.getFiles(input);

	    	// if (window.File && window.FileReader && window.FileList && window.Blob) {
	    		// var files = evt.target.files;

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var fileReader = new FileReader();

				fileReader.onload = (function(f) {
					return function(e) {
						console.warn(f, e);
						book = {
							name: f.name,
							size: f.size,
							type: f.type,
							date: e.timeStamp,
							content: e.srcElement.result
						};

						REST.loadBook(f);
						dfd.resolve(book);
					}

				})(file);

				if (file.webkitSlice) {
					var blob = file.webkitSlice(start, stop + 1);
				} else if (file.mozSlice) {
					var blob = file.mozSlice(start, stop + 1);
				}

				var type = reader.getType(file);
				console.warn(type);
				switch (type) {
					case 'text/plain':
						fileReader.readAsText(file)
						break
					case '':
						fileReader.readAsBinaryString(file)
						break
					default:
						fileReader.readAsBinaryString(file)
				}

			}
			// } else {
			// 	dfd.resolve('The File APIs are not fully supported in this browser.');
			// }

			return dfd.promise();
		}
	};

	return reader;
});