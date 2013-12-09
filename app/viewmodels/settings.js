define(['service/options','service/rest'], function(options, rest) {
   
   	var font_sizes = [6,8,10,12,14,16,18,20,24,28,32];
	var font_family = ['Arial','Georgia','Times New Roman','Serif','Verdana'];
	function saveChanges(){
		//rest.updateUser();			
	}

    return {
    	font_sizes: font_sizes,	
    	font_names: font_family,	
    	font_size: options.font_size,
    	font_name: options.font_name,
    	saveChanges: saveChanges
    };

})