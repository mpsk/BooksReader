define(['service/user',
        'service/rest',
        ], function (user, rest) {

    var REST = rest;

    var book = {
        
        getBookPreview: function(vm, e){
            var that = this;
            REST.getFile(user.id, this).then(function(text){
                var preview = reader.getBookPreview(text);
                dialog.showMessage(preview, that.title);
            });
        }

    };

    function activate(){
        var that = this;

        console.warn(user.curBookName);

        REST.getFile(user.id, user.curBookName).then(function(text) {
            console.warn(text);
        });
    }

    return {
        activate: activate,
        user: user
    };
})