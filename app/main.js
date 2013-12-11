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

define(['durandal/app', 'durandal/system', 'durandal/viewLocator', 'service/dataStore'], 
function (app, system, viewLocator, dataStore) {

    system.debug(true);

    app.title = 'BookReader';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function(){
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell');

    });

});