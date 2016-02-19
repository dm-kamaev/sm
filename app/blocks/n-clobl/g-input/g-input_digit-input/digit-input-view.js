goog.provide('sm.gInput.DigitInputView');

goog.require('cl.gInput.View');

/**
 * Input View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.View}
 */
sm.gInput.DigitInputView = function(opt_params, opt_template, opt_domHelper) {
    goog.base(this, opt_params, opt_template, opt_domHelper);
};
goog.inherits(sm.gInput.DigitInputView, cl.gInput.View);


goog.scope(function() {
    var DigitInputView = sm.gInput.DigitInputView;
    /**
     * Css class enum
     * @enum {string}
     */
    DigitInputView.CssClass = {
        NOT_VALID: 'g-input_not-valid'
    };

    /**
     * Event enum
     * @enum {string}
     */
    DigitInputView.Event = {
        FOCUS: 'input-focus'
    };

    /**
     * @override
     */
    DigitInputView.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.input,
            goog.events.EventType.FOCUS,
            this.onFocus
        );
    };

    /**
     * Focus handler
     */
    DigitInputView.prototype.onFocus = function() {
        this.dispatchEvent({
            type: DigitInputView.Event.FOCUS
        });
    };

    /***
     * Add modifier, which mean that value in input is not valid
     * @public
     */
    DigitInputView.prototype.addNotValidModifier = function() {
        goog.dom.classes.add(
            this.getElement(),
                DigitInputView.CssClass.NOT_VALID
            );
    };

    /***
     * Remove modifier, which mean that value in input is not valid
     * @public
     */
    DigitInputView.prototype.removeNotValidModifier = function() {
        goog.dom.classes.remove(
            this.getElement(),
            DigitInputView.CssClass.NOT_VALID
        );
    };
});
