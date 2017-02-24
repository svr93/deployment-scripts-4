#!/usr/bin/env bash

currentDir=$(pwd)

# default project name
projectName='__new-project__'

while [[ "$1" != '' ]]; do
    case $1 in
        -name )                     shift
                                    projectName=$1
                                    ;;
        * )                         echo 'Error: bad param'
                                    ;;
    esac
    shift
done

projectDir='../'${projectName}
mkdir ${projectDir}
mkdir ${projectDir}'/client'

clientSrcDir=${projectDir}'/client/src'
mkdir ${clientSrcDir}
cp -r example-global ${clientSrcDir}'/global'
cp -r example-test-client ${projectDir}'/test-client'
cp example-requirejs-config.js ${clientSrcDir}'/requirejs-config.js'

cp example-.gitignore ${projectDir}'/.gitignore'
cp example-karma.conf.js ${projectDir}'/karma.conf.js'
cp example-.babelrc ${projectDir}'/.babelrc'
cp example-.eslintrc ${projectDir}'/.eslintrc'
cp example-.eslintignore ${projectDir}'/.eslintignore'
cp example-gulpfile.js ${projectDir}'/gulpfile.js'
cp example-.bowerrc ${projectDir}'/.bowerrc'

cd ${projectDir}

npm init
npm i --save-dev karma

json -I -f package.json \
-e 'this.scripts.test="node ./node_modules/karma/bin/karma start karma.conf.js"'
json -I -f package.json \
-e 'this.engines={ "node": "6.4" }'

npm i --save-dev jasmine
npm i --save-dev karma-jasmine

npm i --save-dev karma-chrome-launcher
npm i --save-dev karma-firefox-launcher
npm i --save-dev karma-safari-launcher
npm i --save-dev karma-safaritechpreview-launcher

npm i --save-dev requirejs
npm i --save-dev karma-requirejs

git init
typings init
typings i --save --global dt~jasmine

git add client/src/global/web-api.js
git commit -a -m 'add web-api.js'

git add typings.json
git commit -a -m 'use typings'

git add .gitignore
git add package.json
git add client/src/requirejs-config.js
git add test-client/test-main.js
git add test-client/jasmine-env.js
git add karma.conf.js
git commit -a -m 'add test frameworks'

npm i --save-dev karma-babel-preprocessor
npm i --save-dev babel-plugin-transform-es2015-arrow-functions
npm i --save-dev babel-plugin-transform-es2015-block-scoping
npm i --save-dev babel-plugin-transform-es2015-shorthand-properties #IE11

git add .babelrc
git commit -a -m 'add Babel support'

npm i --save-dev eslint
npm i --save-dev eslint-plugin-requirejs

git add .eslintrc
git add .eslintignore
git commit -a -m 'add ESLint support'

npm i --save-dev gulp
npm i --save-dev gulp-connect
npm i --save-dev gulp-if
npm i --save-dev yargs

git add gulpfile.js
git commit -a -m 'add Gulp support'

npm i --save-dev gulp-babel
echo '/server/www/' >> .gitignore

git commit -a -m 'process JS in gulpfile'

echo '/client/src/vendor' >> .gitignore
git add .bowerrc
git commit -a -m 'add bowerrc'

cd ${currentDir}
