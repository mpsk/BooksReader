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
			return $cover.html();
		},

		getBookTitle: function(text){
			var xml = $.isXMLDoc(text);
			console.warn('xml '+xml);
			if (xml) {
				var xmlText = $.parseXML(text);
				var title = $(xmlText).find('book-title').text();
			} else {
				var cleanText = text.replace(/\n/g, '');
				var title = $(cleanText).find('book-title').text();
			}

			return title;
		},

		getBookAuthor: function(text){
			var xml = $.isXMLDoc(text);
			console.warn('xml '+xml);
			if (xml) {
				var xmlText = $.parseXML(text);
				var author = $(xmlText).find('title-info author');
				var firstName = $(author).find('first-name').text();
				var lastName = $(author).find('last-name').text();
			} else {
				var cleanText = text.replace(/\n/g, '');
				var author = $(cleanText).find('title-info author');
				var firstName = $(author).find('first-name').text();
				var lastName = $(author).find('last-name').text();
			}

			var fullName = firstName+' '+lastName;
			return fullName;
		},

		getBookPreview: function(text){
			// var xml = $.parseXML(text);
			// var desc = $(xml).find('description');
			// var description = $(desc).text();
			// console.warn(description);
			var cleanText = text.replace(/\n/g, '');
			var description = $(cleanText).find('description').html();
			console.warn(description);

			return description;
		},

		getBookInfo: function(file){
			var info = {};
			var coding = 'utf-8';

			FileAPI.readAsBinaryString(file, function(e) {

				coding = $.parseXML(e.result).xmlEncoding || coding;

				info.cover = "data:image/jpeg;base64," + reader.getBookBinaryImage(e.result);

				FileAPI.readAsText(file, coding, function(e){
					info.title = reader.getBookTitle(e.result);
					info.author = reader.getBookAuthor(e.result);
				});

			});

			return info;
		}

	};

	return reader;
});