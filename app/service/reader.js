define(['durandal/system', 'plugins/http'], function (system, http) {

	var coding = {
		UTF: 'UTF-8'
	};

	var reader = {
		
		readFile: function(file){
			var dfd = $.Deferred();
			var fileReader = new FileReader();
			var type = file.type;

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

			fileReader.onload = (function(f) {
				return function(e) {
					console.warn(f, e);
					var book = {
						name: f.name,
						size: f.size,
						type: f.type,
						date: e.timeStamp,
						content: e.srcElement.result
					};
					console.warn(book);
					dfd.resolve(f);
				}
			})(file);

			return dfd.promise();

		},

		getInputFile: function(evt) {
			var input = $(evt.target);
			var files = FileAPI.getFiles(input);

			return files[0];
		}

	};

	return reader;
});