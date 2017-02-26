// eslint-disable-next-line requirejs/amd-function-arity
define([

    'text!./main.html',
    './main.controller',
    'css!./main',
], (template, controller) => {
    "use strict";

    return Object.freeze({ template, controller })
})
