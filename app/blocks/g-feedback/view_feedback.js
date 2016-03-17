goog.provide('sm.gModal.ViewFeedback');

goog.require('sm.gModal.ViewStendhal');


/**
 * Feedback modal View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.gModal.ViewStendhal}
 */
sm.gModal.ViewFeedback = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.gModal.ViewFeedback, sm.gModal.ViewStendhal);


goog.scope(function() {
    var ViewFeedback = sm.gModal.ViewFeedback;

    /**
     * @param {Element} element
     * @override
     */
    ViewFeedback.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.inputs = goog.dom.getElementsByClass(
            cl.gInput.View.CssClass.ROOT,
            element
        );

        this.dom.themeField = goog.dom.getElementByClass(
            cl.gDropdown.View.CssClass.ROOT,
            element
        );

        this.dom.submitButton = goog.dom.getElementByClass(
            cl.gButton.View.CssClass.ROOT,
            element
        );

        this.dom.textArea = goog.dom.getElementByClass(
            cl.gTextarea.View.CssClass.ROOT,
            element
        );
    };
});
