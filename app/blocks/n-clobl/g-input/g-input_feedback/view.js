goog.provide('sm.gInputFeedback.View');

goog.require('cl.gInput.View');

/**
 * Input View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.View}
 */
sm.gInputFeedback.View = function(opt_params, opt_template, opt_domHelper) {
    goog.base(this, opt_params, opt_template, opt_domHelper);
};
goog.inherits(sm.gInputFeedback.View, cl.gInput.View);


goog.scope(function() {
    var View = sm.gInputFeedback.View;
    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        NOT_VALID: 'g-input_not-valid'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        FOCUS: 'input-focus'
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
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
    View.prototype.onFocus = function() {
        this.dispatchEvent({
            type: View.Event.FOCUS
        });
    };

    /***
     * Add modifier, which mean that value in input is not valid
     * @public
     */
    View.prototype.addNotValidModifier = function() {
        goog.dom.classes.add(
            this.getElement(),
                View.CssClass.NOT_VALID
            );
    };

    /***
     * Remove modifier, which mean that value in input is not valid
     * @public
     */
    View.prototype.removeNotValidModifier = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.NOT_VALID
        );
    };
});
