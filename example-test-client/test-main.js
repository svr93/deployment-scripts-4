/* global __karma__ */

/*
    eslint-disable
    requirejs/no-named-define,
    requirejs/no-invalid-define
*/

// eslint-disable-next-line no-undef
document.body.appendChild(document.createElement('app'))

requirejs.config({

    baseUrl: 'base/client/src',
    paths: {

        'jasmine-env': '../../test-client/jasmine-env',
    },
    deps: Object
        .keys(__karma__.files)
        .filter(function(item) {

            return item.match(new RegExp([

                'global/web-api.js',
                'vendor/ui-router-extras/',
            ].join('|'))) // + all non-AMD libs
        }),
    callback: function() {
        "use strict";

        var testFileList = Object
            .keys(__karma__.files)
            .filter(function(item) {

                return item.match(new RegExp('test-client/')) &&
                    !item.match(new RegExp('test-main.js'))
            })
        define('angular-ui-router', 'ct.ui.router.extras')

        requirejs(testFileList, __karma__.start)
    },
})
