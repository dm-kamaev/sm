goog.provide('sm.gInput.DigitInput');

goog.require('cl.gInput.Input');
goog.require('sm.gInput.DigitInputView');

/**
 * Input control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.Input}
 */
sm.gInput.DigitInput = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);
};
goog.inherits(sm.gInput.DigitInput, cl.gInput.Input);


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
});
