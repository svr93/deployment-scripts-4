let requirejs = {

    paths: {

        bluebird: 'vendor/bluebird/js/browser/bluebird.min',
        'keyboardevent-key-polyfill': 'vendor/keyboardevent-key-polyfill/index',

        angular: 'vendor/angular/angular.min',
        '_angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router.min',
        '_ui-router-extras': 'vendor/ui-router-extras/release/ct-ui-router-extras.min',

        'text': 'vendor/text/text',

        'selector-alias': 'vendor/selector-alias/selector-alias',
        $$: 'app/util/selector',
        throttle: 'app/util/throttle',
    },
    shim: {

        angular:                { exports: 'angular' },
        '_angular-ui-router':   { deps: [ 'angular' ] },
        '_ui-router-extras':    { deps: [ '_angular-ui-router' ] },
        'selector-alias':       { exports: 'Selector' },
    },
    map: {

        '*': { 'css': 'vendor/require-css/css' },
    },
}
