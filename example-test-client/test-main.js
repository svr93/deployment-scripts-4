/* global __karma__ */

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
        requirejs(testFileList, __karma__.start)
    },
})
