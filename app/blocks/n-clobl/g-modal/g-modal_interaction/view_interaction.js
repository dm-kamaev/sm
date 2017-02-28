goog.provide('sm.gModal.ViewInteraction');

goog.require('sm.gModal.ViewStendhal');


goog.scope(function() {



    /**
     * View for Modal Interaction
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.gModal.ViewStendhal}
     */
    sm.gModal.ViewInteraction = function(opt_params, opt_type, opt_modifier) {
        sm.gModal.ViewInteraction.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.gModal.ViewInteraction, sm.gModal.ViewStendhal);
    var View = sm.gModal.ViewInteraction;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'g-modal_interaction',
        ERROR_SECTION: 'g-modal__section_error',
        ERROR: 'g-modal__error'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.button = this.getElementByClass(
            cl.gButton.View.CssClass.ROOT
        );

        this.dom.errorSection = this.getElementByClass(
            View.CssClass.ERROR_SECTION
        );

        this.dom.error = this.getElementByClass(
            View.CssClass.ERROR
        );
    };


    /**
     * @protected
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Show error message
     * @param {string} errorMessage
     * @public
     */
    View.prototype.showError = function(errorMessage) {
        goog.dom.setTextContent(this.dom.error, errorMessage);

        goog.dom.classes.remove(
            this.dom.errorSection,
            cl.iUtils.Utils.CssClass.HIDDEN
        );
    };


    /**
     * Hide error message
     * @public
     */
    View.prototype.hideError = function() {
        goog.dom.classes.add(
            this.dom.errorSection,
            cl.iUtils.Utils.CssClass.HIDDEN
        );

        goog.dom.setTextContent(this.dom.error, '');
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     * @override
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            contentName: rawParams['contentName'],
            api: rawParams['api']
        };
    };
});  // goog.scope
