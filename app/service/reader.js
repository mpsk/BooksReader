define(['durandal/system', 'plugins/http'], function (system, http) {

	var coding = {
		UTF: 'UTF-8'
	};

	var reader = {

		getInputFile: function(evt) {
			var input = $(evt.target);
			var files = FileAPI.getFiles(input);

			return files[0];
		},

		// TODO: Need to finish get all image position
		getBookBinaryImage: function(text){
			var cleanText = text.replace(/\n/g, '');
			$cover = $(cleanText).find('binary');
			
			console.warn($cover);

			return $cover.html();
		}

	};

	return reader;
});