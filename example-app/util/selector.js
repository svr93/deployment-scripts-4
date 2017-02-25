define([

    'selector-alias',
    'angular',
], (Selector, angular) => {
    "use strict";

    /**
     * Selects element from DOM tree
     * @param {string} selector
     * @param {!(HTMLElement|Object)=} startNode
     * @return {!Object}
     */
    function $$(selector, startNode) {

        if (startNode && startNode[ 'length' ] === 1) {

            startNode = startNode[ 0 ]
        }
        return angular.element(Selector.$$(selector, startNode))
    }

    return Object.freeze($$)
})
