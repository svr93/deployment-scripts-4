// eslint-disable-next-line no-undef
window.requirejs = {

    paths: {

        bluebird: 'vendor/bluebird/js/browser/bluebird.min',

        angular: 'vendor/angular/angular.min',
        '_angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router.min',
        '_ui-router-extras': 'vendor/ui-router-extras/release/ct-ui-router-extras.min',

        'text': 'vendor/text/text',
    },
    shim: {

        angular:                { exports: 'angular' },
        '_angular-ui-router':   { deps: [ 'angular' ] },
        '_ui-router-extras':    { deps: [ '_angular-ui-router' ] },
    },
    map: {

        '*': { 'css': 'vendor/require-css/css' },
    },
}
