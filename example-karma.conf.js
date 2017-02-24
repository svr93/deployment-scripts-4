"use strict";

const path = require('path')

/**
 * Specifies configuration options.
 * @param {Object} config
 */
module.exports = function(config) {

    const vendorPathList = [

        'vendor/bluebird/js/browser/bluebird.min',

        'vendor/angular/angular.min',
        'vendor/angular-ui-router/release/angular-ui-router.min',
        'vendor/ui-router-extras/release/ct-ui-router-extras.min',

        'vendor/angular-mocks/angular-mocks',
    ]
        .map((item) => {

            return {

                pattern: path.join('client/src', path.format({

                    name: item,
                    ext: '.js',
                })),

                /**
                 * True for all non-AMD libs
                 * @param {boolean}
                 */
                included: item.includes('vendor/angular')
            }
        })
    const optionData = {

        frameworks: [ 'jasmine' ],
        browsers: [

            'Chrome',
            'Firefox',
            'Safari',
            'SafariTechPreview',
        ],
        concurrency: 1,
        browserNoActivityTimeout: 30000,
        singleRun: true,
        files: [

            { pattern: 'client/src/requirejs-config.js',    included: true },
            { pattern: 'node_modules/requirejs/require.js', included: true },
            {
                pattern: 'node_modules/karma-requirejs/lib/adapter.js',
                included: true,
            },
            { pattern: 'client/src/global/web-api.js',      included: false },
            { pattern: 'test-client/jasmine-env.js',        included: false },
        ],
        preprocessors: {

            'client/src/**/*.js': [ 'babel' ],
        },
    }
    const baseFileList = optionData.files
    optionData.files = vendorPathList.concat(baseFileList, [

        'test-client/test-main.js',
    ])
    config.set(optionData)
}
