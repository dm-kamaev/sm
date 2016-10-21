goog.provide('sm.gDropdown.ViewListLinks');

goog.require('cl.gDropdown.View');
goog.require('cl.iUtils.Utils');



/**
 * Dropdown View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gDropdown.View}
 */
sm.gDropdown.ViewListLinks = function(opt_params, opt_template, opt_modifier) {
    sm.gDropdown.ViewListLinks.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );
};
goog.inherits(sm.gDropdown.ViewListLinks, cl.gDropdown.View);


goog.scope(function() {
    var View = sm.gDropdown.ViewListLinks,
        Utils = cl.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-dropdown_list-links',
        OPENER: 'g-dropdown__opener',
        OPENER_LINK: 'g-dropdown__opener-link',
        CONTENT: 'g-dropdown__content'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        OPENER_CLICK: cl.gDropdown.View.Event.OPENER_CLICK,
        CONTENT_CLICK: cl.gDropdown.View.Event.CONTENT_CLICK,
        CLOSE_DROPDOWN: cl.gDropdown.View.Event.CLOSE_DROPDOWN
    };

    /**
     * @override
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
        this.dom.openerLink = this.getElementByClass(
            View.CssClass.OPENER_LINK
        );

        this.dom.listLinks = this.getElementByClass(
            sm.gList.ViewLinks.CssClass.ROOT
        );
    };
});  // goog.scope
