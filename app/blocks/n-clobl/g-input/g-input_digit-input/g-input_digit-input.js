goog.provide('sm.gInput.DigitInput');

goog.require('sm.gInput.DigitInputView');
goog.require('sm.gInput.InputStendhal');



/**
 * Input control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.gInput.InputStendhal}
 */
sm.gInput.DigitInput = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.gInput.DigitInput, sm.gInput.InputStendhal);


goog.scope(function() {
    var DigitInput = sm.gInput.DigitInput;


    /**
     * Event enum
     * @enum
     */
    DigitInput.Event = {
        FOCUS: sm.gInput.DigitInputView.Event.FOCUS
    };


    /**
     * @override
     */
    DigitInput.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.autoDispatch(
            sm.gInput.DigitInputView.Event.FOCUS,
            function(event) {
                event['type'] = DigitInput.Event.FOCUS;
            }
        );
    };
});  // goog.scope
