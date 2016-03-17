goog.provide('sm.gModal.ModalFeedback');

goog.require('sm.gModal.ModalStendhal');

/**
 * Modal control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.gModal.ModalStendhal}
 */
sm.gModal.ModalFeedback = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    /**
     * Elements instances
     * @type {Object}
     * @private
     */
    this.elements_ = {};

};
goog.inherits(sm.gModal.ModalFeedback, sm.gModal.ModalStendhal);

goog.scope(function() {
    var ModalFeedback = sm.gModal.ModalFeedback;

    /**
     * @param {Element} element
     * @override
     */
    ModalFeedback.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_();
    };

    /**
     * Init containing elements
     * @private
     */
    ModalFeedback.prototype.initElements_ = function() {
        var domElements = this.getView().getDom();
        this.elements_ = {
            dropdown: this.decorateChild(
                'dropdown-select', domElements.themeField
            ),
            submitButton: this.decorateChild(
                'button', domElements.submitButton
            ),
            textarea: this.decorateChild('textarea', domElements.textArea)
        };

        this.initInputs_();
    };

    /**
     * Inits containing inputs
     * @private
     */
    ModalFeedback.prototype.initInputs_ = function() {
        var view = this.getView();

        for (var i = 0; input = view.getDom().inputs[i]; i++) {
            this.elements_.inputs = this.decorateChild('input', input);
        }
    };
});
