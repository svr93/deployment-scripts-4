define([

], () => {
    "use strict";

    /**
     * Throttle func from https://learn.javascript.ru/task/throttle
     * @param {function} func
     * @param {number=} ms
     * @return {function}
     */
    function throttle(func, ms) {

        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;
            // eslint-disable-next-line no-undef
            setTimeout(function() {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }

    return Object.freeze(throttle)
})
