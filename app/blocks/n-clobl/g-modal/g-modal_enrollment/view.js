goog.provide('sm.gModal.ViewEnrollment');

goog.require('sm.gModal.TemplateEnrollment');
goog.require('sm.gModal.ViewStendhal');


goog.scope(function() {



    /**
     * View for Modal Enrollment
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.gModal.ViewStendhal}
     */
    sm.gModal.ViewEnrollment = function(opt_params, opt_type, opt_modifier) {
        sm.gModal.ViewEnrollment.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.gModal.ViewEnrollment, sm.gModal.ViewStendhal);
    var View = sm.gModal.ViewEnrollment;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'g-modal_enrollment',
        SECTION_ERROR: 'g-modal__section_error',
        NAME_INPUT: 'g-modal__name-input',
        PHONE_INPUT: 'g-modal__phone-input',
        EMAIL_INPUT: 'g-modal__email-input',
        COMMENT_TEXTAREA: 'g-modal__comment-textarea'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @protected
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Show error messages
     * @param {Array<string>} errorMessages
     */
    View.prototype.showErrors = function(errorMessages) {
        var listErrors = this.renderListErrors_(errorMessages);

        goog.dom.removeChildren(this.dom.sectionError);
        goog.dom.appendChild(this.dom.sectionError, listErrors);
    };


    /**
     * Render list error messages
     * @param {Array<string>} errorMessages
     * @return {Element}
     * @private
     */
    View.prototype.renderListErrors_ = function(errorMessages) {
        return goog.soy.renderAsElement(
            sm.gModal.TemplateEnrollment.listErrors,
            {
                params: {
                    data: {
                        errors: errorMessages
                    }
                }
            },
            {
                factoryIndex: this.getFactory().getIndex()
            }
        );
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.sectionError = this.getElementByClass(
            View.CssClass.SECTION_ERROR
        );

        this.dom.nameField = this.getElementByClass(
            View.CssClass.NAME_INPUT
        );

        this.dom.phoneField = this.getElementByClass(
            View.CssClass.PHONE_INPUT
        );

        this.dom.emailField = this.getElementByClass(
            View.CssClass.EMAIL_INPUT
        );

        this.dom.commentField = this.getElementByClass(
            View.CssClass.COMMENT_TEXTAREA
        );

        this.dom.button = this.getElementByClass(
            cl.gButton.View.CssClass.ROOT
        );
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            entityType: rawParams['entityType']
        };
    };
});  // goog.scope
