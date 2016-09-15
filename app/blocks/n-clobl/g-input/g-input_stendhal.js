goog.provide('sm.gInput.InputStendhal');

goog.require('cl.gInput.Input');
goog.require('sm.gInput.ViewStendhal');



/**
 * Stendhal Input control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.Input}
 */
sm.gInput.InputStendhal = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.gInput.InputStendhal, cl.gInput.Input);


goog.scope(function() {
    var Input = sm.gInput.InputStendhal,
        View = sm.gInput.ViewStendhal;


    /**
     * Event enum
     * @enum {string}
     */
    Input.Event = {
        NOT_VALID: cl.gInput.Input.Event.NOT_VALID,
        BLUR: cl.gInput.Input.Event.BLUR,
        INPUT: cl.gInput.Input.Event.INPUT,
        CHANGE: cl.gInput.Input.Event.CHANGE,
        FOCUS: cl.gInput.Input.Event.FOCUS,
        ENTER_PRESS: View.Event.ENTER_PRESS
    };


    /**
     * @override
     */
    Input.prototype.enterDocument = function() {
        Input.base(this, 'enterDocument');

        this.autoDispatch(View.Event.ENTER_PRESS);
    };
});  // goog.scope
