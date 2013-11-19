requirejs.config({
    paths: {
        'text': '../scripts/require/text',
        'durandal': '../scripts/durandal',
        'plugins': '../scripts/durandal/plugins'
    },
    urlArgs: 'v=' + Math.random()
});

define('jquery', function () {
    return jQuery;
});

define('knockout', function () {
    return ko;
});

define(['durandal/app', 'durandal/system', 'durandal/viewLocator', 'service/dataContext'], 
function (app, system, viewLocator, dataContext) {

    system.debug(false);

    app.title = 'BookReader';

    app.configurePlugins({
        router: true
    });

    app.start().then(function(){
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell');
    });

})