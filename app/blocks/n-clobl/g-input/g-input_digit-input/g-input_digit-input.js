goog.provide('sm.gInput.DigitInput');

goog.require('sm.gInput.DigitInputTemplate');
goog.require('sm.gInput.DigitInputView');
goog.require('sm.gInput.InputStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



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
    var DigitInput = sm.gInput.DigitInput,
        View = sm.gInput.DigitInputView;

    /**
     * Name of this element in factory
     */
    DigitInput.NAME = sm.gInput.DigitInputTemplate.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(DigitInput.NAME, {
        control: DigitInput,
        view: View
    });

    /**
     * Event enum
     * @enum
     */
    DigitInput.Event = {
        FOCUS: View.Event.FOCUS
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
