/**
 * Controller for built-in global variables
 */

/* global window */
/* eslint-disable requirejs/no-multiple-define, requirejs/no-named-define */

define([

    'bluebird',
], (Promise) => {
    "use strict";

    window.Promise = Promise

    // ES6 module system should help us avoid yet more
    // such global namespace-object additions.
    // https://esdiscuss.org/topic/why-do-json-date-and-math-exist

    /**
     * standard pseudo-module
     * http://wiki.ecmascript.org/doku.php?id=harmony:modules_standard#math
     */
    define('@math', () => makeModule(window.Math))

    /**
     * standard pseudo-module
     * http://wiki.ecmascript.org/doku.php?id=harmony:modules_standard#json
     */
    define('@json', () => makeModule(window.JSON))

    /**
     * Crypto API for JWT / Math.random analog
     * P.S. SubtleCrypto methods in IE11
     * return object with oncomplete/onerror callbacks. See details:
     * https://msdn.microsoft.com/en-us/library/dn904640(v=vs.85).aspx
     */
    define('@browser/crypto', () => {

        //noinspection JSUnresolvedVariable
        const crypto = window.crypto || window.msCrypto
        if (!crypto.subtle) {

            //noinspection JSUnresolvedVariable
            crypto.subtle = crypto.webkitSubtle
        }
        return crypto
    })

    /**
     * Creates safe module
     * @param {!Object} obj
     * @return {!Object}
     */
    function makeModule(obj) {

        return Object.freeze(Object.create(obj))
    }
})
