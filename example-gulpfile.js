"use strict";

/* global console */
/* eslint-disable no-console */

const path = require('path')
const argv = require('yargs')[ 'argv' ]

/* Common gulp module list */
const gulp = require('gulp')
const gulpif = require('gulp-if')
const connect = require('gulp-connect')
const concat = require('gulp-concat')

/* CSS processing module list */
const postcss = require('gulp-postcss')
const cssvariables = require('postcss-css-variables')

/* HTML processing module list */
const htmlreplace = require('gulp-html-replace')

/* JS processing module list */
const babel = require('gulp-babel')
const requirejsOptimize = require('gulp-requirejs-optimize')
const closure = require('gulp-closure-compiler-service')

const CLIENT_CSS_PATH = path.join(__dirname, 'client/**/*.css')
const CLIENT_HTML_PATH = path.join(__dirname, 'client/**/*.html')
const CLIENT_JS_PATH = `${ __dirname }/client/src`
const SERVER_REL_STATIC_PATH = 'server/www'
const SERVER_REL_JS_PATH = `${ SERVER_REL_STATIC_PATH }/src`

const CSS_PRODUCTION_FILE_NAME = 'main.min.css'
const JS_PRODUCTION_FILE_NAME = 'main.min.js'

const WATCH = argv._.includes('watch')
const PRODUCTION = !!argv[ 'production' ]
const STATIC_PORT = 8010
const LIVERELOAD_PORT = 30010

gulp.task('watch', () => {

    gulp.watch(CLIENT_CSS_PATH, [ 'css' ])
    gulp.watch(CLIENT_HTML_PATH, [ 'html' ])
    gulp.watch(path.join(CLIENT_JS_PATH, '**/*.js')).on('change', (evt) => {

        console.log(`${ evt.type }: ${ evt.path }`)
        return processJS(evt.path)
    })
    connect.server({

        root: SERVER_REL_STATIC_PATH,
        port: STATIC_PORT,
        livereload: { port: LIVERELOAD_PORT },
    })
})

gulp.task('css', (done) => {

    let dest = SERVER_REL_STATIC_PATH
    if (PRODUCTION) {

        dest = `${ dest }/src`
    }
    return gulp.src(CLIENT_CSS_PATH)
        .pipe(postcss([ cssvariables() ]))
        .on('error', (err) => {

            console.error(err.message)
            done(err)
        })
        .pipe(gulpif(PRODUCTION, concat(CSS_PRODUCTION_FILE_NAME)))
        .pipe(gulp.dest(dest))
        .pipe(gulpif(WATCH, connect.reload()))
})

gulp.task('html', () => {

    //noinspection HtmlUnknownTarget
    return gulp.src(CLIENT_HTML_PATH)
        .pipe(gulpif(PRODUCTION, htmlreplace({

            css: {

                src: `src/${ CSS_PRODUCTION_FILE_NAME }`,
                tpl: '<link rel="stylesheet" href="%s">',
            },
            js: {

                src: `src/${ JS_PRODUCTION_FILE_NAME }`,
                tpl: '<script src="%s"></script>',
            },
        })))
        .pipe(gulp.dest(SERVER_REL_STATIC_PATH))
        .pipe(gulpif(WATCH, connect.reload()))
})

gulp.task('js', () => {

    if (PRODUCTION) {

        if (WATCH) { throw new Error('BAD ARG') }

        const uiRouter = `define('angular-ui-router', 'ct.ui.router.extras')`
        //noinspection JSUnusedGlobalSymbols
        return gulp.src(`${ CLIENT_JS_PATH }/main.js`)
            .pipe(requirejsOptimize({

                name: 'main',
                mainConfigFile: `${ CLIENT_JS_PATH }/requirejs-config.js`,
                paths: {

                    'angular-ui-router': 'empty:',
                },
                deps: [

                    'global/web-api',
                    '_ui-router-extras',
                ],
                findNestedDependencies: true,
                include: [ 'vendor/almond/almond' ],
                out: JS_PRODUCTION_FILE_NAME,
                optimize: 'none',
                onBuildRead: function(_, path, contentStr) {

                    if (contentStr.includes('angular-ui-router')) {

                        contentStr = `${ uiRouter }\n${ contentStr }`
                    }
                    const cssRegExp = new RegExp(`'css!.*'[,]{0,1}`, 'g')
                    return contentStr.replace(cssRegExp, '')
                },
            }))
            .pipe(gulpif(argv.babel, babel()))
            .pipe(closure())
            .pipe(gulp.dest(SERVER_REL_JS_PATH))
    }

    return processJS(`${ CLIENT_JS_PATH }/**/*.js`)
})

/**
 * Processes JS files.
 * @param {string} src
 * @return {Stream}
 */
function processJS(src) {

    let dest = SERVER_REL_JS_PATH
    if (WATCH) {

        const FILE_DIRNAME_PATH = path.dirname(src)
        const FILE_REL_PATH = path.relative(CLIENT_JS_PATH, FILE_DIRNAME_PATH)

        dest = path.join(SERVER_REL_JS_PATH, FILE_REL_PATH)
    }
    return gulp.src(src)
        .pipe(gulpif(argv.babel, babel()))
        .on('error', (err) => console.error(err.message))
        .pipe(gulp.dest(dest))
        .pipe(gulpif(WATCH, connect.reload()))
}

gulp.task('default', [ 'css', 'html', 'js' ], () => {

})
