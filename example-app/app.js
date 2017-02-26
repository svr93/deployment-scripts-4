define([

    'angular',
    './common/common',

    './router-components/router-components',
    './app.component',
    '$$',
], (angular, Common, RouterComponents, Component, $$) => {
    "use strict";

    angular
        .module('app', [ Common, RouterComponents ])
        .component('app', Component)

    angular.bootstrap($$('body'), [ 'app' ], null)
})
