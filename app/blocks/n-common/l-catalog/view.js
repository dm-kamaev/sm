goog.provide('sm.lCatalog.View');

goog.require('sm.iLayout.ViewStendhal');



goog.scope(function() {



    /**
     * Catalog View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lCatalog.View = function(opt_params, opt_type, opt_modifier) {
        sm.lCatalog.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.lCatalog.View, sm.iLayout.ViewStendhal);

    var View = sm.lCatalog.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-catalog'
    };


    /**
     *
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
        };
    };
});  // goog.scope
