goog.provide('sm.gModal.ViewFeedback');

goog.require('sm.gModal.ViewStendhal');



/**
 * Feedback modal View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.gModal.ViewFeedback = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.gModal.ViewFeedback, sm.gModal.ViewStendhal);


goog.scope(function() {
    var ViewFeedback = sm.gModal.ViewFeedback;


    /**
     * Css class enum
     * @enum {string}
     */
    ViewFeedback.CssClass = {
        ROOT: 'g-modal_feedback',
        VALIDATION_ERRORS: 'g-modal__section_validation-errors',
        FORM: 'g-modal__form-content'
    };


    /**
     * @param {Element} element
     * @override
     */
    ViewFeedback.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_(element)
            .getDataParams_(element);

    };


    /**
     * Show error
     * @param {string} error
     * @public
     */
    ViewFeedback.prototype.showValidationError = function(error) {
        goog.dom.getDomHelper().setTextContent(
            this.dom.errors,
            error
        );

        goog.dom.classes.remove(
            this.dom.errors,
            cl.iUtils.Utils.CssClass.HIDDEN
        );

    };


    /**
     * Get data params
     * @param {Element} element dom element
     * @return {sm.gModal.ViewFeedback}
     * @private
     */
    ViewFeedback.prototype.getDataParams_ = function(element) {
        var params = JSON.parse(goog.dom.dataset.get(element, 'params'));

        for (var paramName in params) {
            this.params[paramName] = params[paramName];
        }

        return this;
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @return {sm.gModal.ViewFeedback}
     * @private
     */
    ViewFeedback.prototype.initDom_ = function(element) {
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

        this.dom.form = goog.dom.getElementByClass(
            ViewFeedback.CssClass.FORM,
            element
        );

        this.dom.errors = goog.dom.getElementByClass(
            ViewFeedback.CssClass.VALIDATION_ERRORS,
            element
        );

        return this;
    };
});  // goog.scope
