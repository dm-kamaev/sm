goog.provide('sm.bSmStars.SmStars');

goog.require('cl.iControl.Control');
goog.require('sm.bSmStars.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmStars.SmStars = function(view, opt_domHelper) {
    sm.bSmStars.SmStars.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.bSmStars.SmStars, cl.iControl.Control);


goog.scope(function() {
    var Stars = sm.bSmStars.SmStars;


    /**
     * Get value to input
     * @return {number}
     */
    Stars.prototype.getValue = function() {
        return this.getView().getValue();
    };


    /**
     * Set value to input
     * @param {number} value
     */
    Stars.prototype.setValue = function(value) {
        this.getView().setValue(value);
    };
});  // goog.scope
