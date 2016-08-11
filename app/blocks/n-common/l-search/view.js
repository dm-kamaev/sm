goog.provide('sm.lSearch.View');

goog.require('sm.iLayout.ViewStendhal');



goog.scope(function() {



    /**
     * Search View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lSearch.View = function(opt_params, opt_type, opt_modifier) {
        sm.lSearch.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.lSearch.View, sm.iLayout.ViewStendhal);



    var View = sm.lSearch.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-search'
    };


    /**
     *
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };


    /**
     * Init dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            sort: this.getElementByClass(
                sm.gDropdown.ViewSelect.CssClass.ROOT,
                element
            ),
            filterPanel: this.getElementByClass(
                sm.lSearch.bFilterPanel.View.CssClass.ROOT,
                element
            ),
            resultsList: this.getElementByClass(
                sm.bSmItemList.View.CssClass.ROOT,
                element
            )
        };
    };
});  // goog.scope
