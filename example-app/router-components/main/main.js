define([

    'angular',
    'angular-ui-router',
    './main.component',
], (angular, uiRouter, Component) => {
    "use strict";

    const module = angular
        .module('main', [ uiRouter ])
        .config([ '$stateProvider', ($sP) => {

            $sP.state('main', {

                url: '/main',
                template: Component.template,
                controller: Component.controller,
                controllerAs: '$ctrl',
            })
        } ])
        .config([ '$urlRouterProvider', ($uRP) => $uRP.otherwise('/main') ])

    return module.name
})
