goog.provide('sm.gModal.ViewSuccess');

goog.require('sm.gModal.ViewStendhal');


goog.scope(function() {



    /**
     * View for Modal Success
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.gModal.ViewStendhal}
     */
    sm.gModal.ViewSuccess = function(opt_params, opt_type, opt_modifier) {
        sm.gModal.ViewSuccess.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.gModal.ViewSuccess, sm.gModal.ViewStendhal);
    var View = sm.gModal.ViewSuccess;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'g-modal_success'
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
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.button = this.getElementByClass(
            cl.gButton.View.CssClass.ROOT
        );
    };
});  // goog.scope
