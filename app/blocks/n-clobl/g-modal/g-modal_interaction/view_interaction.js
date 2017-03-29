goog.provide('sm.gModal.ViewInteraction');

goog.require('sm.gModal.TemplateInteraction');
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
        ERRORS_SECTION: 'g-modal__section_errors',
        ERROR: 'g-modal__error'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * Show error messages
     * @param {Array<string>} errorMessages
     * @public
     */
    View.prototype.showErrors = function(errorMessages) {
        var listErrors = this.renderListErrors_(errorMessages);

        goog.dom.removeChildren(this.dom.errorsSection);
        goog.dom.appendChild(this.dom.errorsSection, listErrors);
    };


    /**
     * @protected
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Init dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom.button = this.getElementByClass(
            cl.gButton.View.CssClass.ROOT
        );

        this.dom.errorsSection = this.getElementByClass(
            View.CssClass.ERRORS_SECTION
        );

        this.dom.error = this.getElementByClass(
            View.CssClass.ERROR
        );
    };


    /**
     * Render list error messages
     * @param {Array<string>} errorMessages
     * @return {Element}
     * @private
     */
    View.prototype.renderListErrors_ = function(errorMessages) {
        return goog.soy.renderAsElement(
            sm.gModal.TemplateInteraction.listErrors,
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
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     * @override
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            id: rawParams['id'],
            api: rawParams['api'],
            contentName: rawParams['contentName']
        };
    };
});  // goog.scope
