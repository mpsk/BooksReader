define([], function () {
    
    var translator = {
	
		$.ajax({
			  url:"https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20131122T210759Z.34245b798456966b.bd525e7d279824e390146aed4b68eb514b238876&text=Better%20late%20than%20never&lang=ru",
			  success: function(data){
				//var obj = jQuery.parseJSON(data);
				//alert( data.text );
				console.log( data.text );
			  }
			});   	
    };

    return translator;
});