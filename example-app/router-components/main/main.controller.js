define([

], () => {
    "use strict";

    return [ '$scope', '$state', (() => {

        function Controller($scope, $state) {

            this._$scope = $scope
            this._$state = $state
        }
        Object.freeze(Controller.prototype)
        return Controller
    })() ]
})
