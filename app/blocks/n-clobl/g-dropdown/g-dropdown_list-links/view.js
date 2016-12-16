goog.provide('sm.gDropdown.ViewListLinks');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom');
goog.require('goog.json');
goog.require('sm.gDropdown.ViewSelect');



/**
 * Dropdown View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.gDropdown.ViewSelect}
 */
sm.gDropdown.ViewListLinks = function(opt_params, opt_template, opt_modifier) {
    sm.gDropdown.ViewListLinks.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );
};
goog.inherits(sm.gDropdown.ViewListLinks, sm.gDropdown.ViewSelect);


goog.scope(function() {
    var View = sm.gDropdown.ViewListLinks,
        Utils = cl.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-dropdown_list-links',
        OPENER_LINK: 'g-dropdown__opener-link'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
    };


    /**
     * Init dom elements
     * @protected
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        this.dom.openerLink = this.getElementByClass(
            View.CssClass.OPENER_LINK
        );

        this.dom.list = this.getElementByClass(
            sm.gList.ViewLinks.CssClass.ROOT
        );
    };
});  // goog.scope
