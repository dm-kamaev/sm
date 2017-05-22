goog.provide('sm.iSmUtils.smUtils');



/**
 * Utils
 * @constructor
 */
sm.iSmUtils.smUtils = function() {
};

goog.scope(function() {
    var Utils = sm.iSmUtils.smUtils;

    /**
     * Returns true if the specified value is a string.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a string.
     */
    Utils.isString = function(val) {
        return typeof val == 'string';
    };

});  // goog.scope
