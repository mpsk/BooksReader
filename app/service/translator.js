define([], function () {
    
	var KEY = 'trnsl.1.1.20131122T210759Z.34245b798456966b.bd525e7d279824e390146aed4b68eb514b238876';

    var translator = {

		translate: function(text) {
			var dfd = $.Deferred();

			$.ajax({
				url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
				data: {
					key: KEY,
					text: text,
					lang: 'ru',
					format: 'plain'
				},
				complete: function(data){
					var status = data.status;
					
					if (status === 200 || data.responseJSON) {
						dfd.resolve(data.responseJSON.text[0]);
					}
					else if (status === 413) {
						dfd.resolve("Текст слишком длинный...");
					}
					else if (status === 422) {
						dfd.resolve("Текст не может быть переведен.");
					}
					else if (status === 403 || status === 404) {
						dfd.resolve("Превышено суточное ограничение на перевод.");
					}
					else {
						dfd.resolve("Переводчик не работает :)");
					}
				}
			});

			return dfd.promise();
		}
		
 	}

    return translator;
});