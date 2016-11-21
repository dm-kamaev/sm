goog.provide('sm.gDropdown.ViewListLinks');

goog.require('cl.gDropdown.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom');
goog.require('goog.json');



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
        CONTENT: 'g-dropdown__content',
        OPENER_TEXT: 'g-dropdown__opener-text'
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


    /**
     * Change label of opener
     * @param {string} label
     */
    View.prototype.changeOpenerText = function(label) {
        goog.dom.setTextContent(
            this.getElementByClass(View.CssClass.OPENER_TEXT),
            label
        );
    };


    /**
     * Transform params to compressed ones
     * @param {Object} params
     * @return {sm.gDropdown.ViewListLinks.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(params) {
        var res = {};

        res.opener = params['opener'];

        params['isChangingOpenerText'] ?
            res.isChangingOpenerText = params['isChangingOpenerText'] :
            res.isChangingOpenerText = false;

        if (params['values']) {
            res.values = params['values'].map(function(item) {
                return {
                    label: item['label'],
                    value: item['value']
                };
            });
        } else {
            res.values = null;
        }

        return res;
    };
});  // goog.scope
