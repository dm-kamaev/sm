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
     * Validation error texts
     * @enum {string}
     */
    ModalFeedback.Error = {
        'FILL_REQUIRED_FIELDS': 'Пожалуйста, заполните обязательные поля'
    };

    /**
     * @param {Element} element
     * @override
     */
    ModalFeedback.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_();
    };

    /**
     * Sets up the Component.
     * @public
     * @override
     */
    ModalFeedback.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.elements_.submitButton,
            cl.gButton.Button.Event.CLICK,
            this.onClickSubmit_
        );
    };

    /**
     * Show errors
     * @param {string} error
     * @public
     */
    ModalFeedback.prototype.showError = function(error) {
        if (this.isValidError_(error)) {
            this.getView().showValidationError(error);
        }
    };

    /**
     * Check that error is valid
     * @param {string} error
     * @return {boolean}
     * @private
     */
    ModalFeedback.prototype.isValidError_ = function(error) {
        return error == ModalFeedback.Error.FILL_REQUIRED_FIELDS;
    };

    /**
     * Submit button click handler
     * @private
     */
    ModalFeedback.prototype.onClickSubmit_ = function() {
        if (this.validateForm_()) {
            this.sendData_();
        } else {
            this.showError(ModalFeedback.Error.FILL_REQUIRED_FIELDS);
        }
    };

    /**
     * Send data to api
     * @private
     */
    ModalFeedback.prototype.sendData_ = function() {
    };

    /**
     * Validates form
     * @return {boolean}
     * @private
     */
    ModalFeedback.prototype.validateForm_ = function() {
        var isValidInputs = this.validateInputs_(),
            isValidDropdown = this.validateDropdown_(),
            isValidText = this.validateText_();

        var isValid = isValidInputs && isValidDropdown && isValidText;

        return isValid;
    };

    /**
     * Validate inputs
     * @return {boolean}
     * @private
     */
    ModalFeedback.prototype.validateInputs_ = function() {
        var isValid = true;

        this.elements_.inputs.forEach(function(input) {
            isValid = input.validate() && isValid;
        });

        return isValid;
    };

    /**
     * Validate theme dropdown
     * @return {boolean}
     * @private
     */
    ModalFeedback.prototype.validateDropdown_ = function() {
        return this.elements_.dropdown.validate();
    };

    /**
     * Validate text area
     * @return {boolean}
     * @private
     */
    ModalFeedback.prototype.validateText_ = function() {
        return this.elements_.textarea.validate();
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
            textarea: this.decorateChild(
                'textarea', domElements.textArea
            )
        };

        this.initInputs_();
    };

    /**
     * Inits containing inputs
     * @private
     */
    ModalFeedback.prototype.initInputs_ = function() {
        var view = this.getView();
        this.elements_.inputs = [];

        for (var i = 0; input = view.getDom().inputs[i]; i++) {
            this.elements_.inputs[i] = this.decorateChild('input', input);
        }
    };
});
