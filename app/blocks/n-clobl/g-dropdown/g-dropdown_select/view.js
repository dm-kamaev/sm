goog.provide('sm.gDropdown.ViewSelect');

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
sm.gDropdown.ViewSelect = function(opt_params, opt_template, opt_modifier) {
    sm.gDropdown.ViewSelect.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );

    /**
     * @type {sm.gDropdown.ViewSelect.Params}
     * @protected
     */
    this.params = null;
};
goog.inherits(sm.gDropdown.ViewSelect, cl.gDropdown.View);


goog.scope(function() {
    var View = sm.gDropdown.ViewSelect,
        Utils = cl.iUtils.Utils;


    /**
     * @typedef {{
     *     opener: (string|undefined),
     *     defaultOpenerText: (string|undefined),
     *     items: Array<{
     *         label: string,
     *         value: string
     *     }>
     * }}
     */
    sm.gDropdown.ViewSelect.Params;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-dropdown_select',
        OPENER: 'g-dropdown__opener',
        OPENER_TEXT: 'g-dropdown__opener-text',
        OPENER_TEXT_CHANGING: 'g-dropdown__text_changing',
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

        this.initDom();
    };


    /**
     * Change text of opener
     * @param {string} text
     * @protected
     */
    View.prototype.changeOpenerText = function(text) {
        if (this.dom.changingOpenerText) {
            goog.dom.setTextContent(
                this.dom.changingOpenerText,
                text
            );
        }
    };


    /**
     * Return data-params from dom element
     * @return {sm.gDropdown.ViewSelect.Params}
     * @override
     * @protected
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');

        this.params = rawParams ? this.transformParams(rawParams) : null;
        return this.params;
    };


    /**
     * Transform params to compressed ones
     * rawParams['defaultOpenerText']['content'] - get to soy parameters
     * passed through the value - let with kind="html"
     * @param {Object} rawParams
     * @return {sm.gDropdown.ViewSelect.Params}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        var defaultOpenerText = null;

        if (rawParams['defaultOpenerText']) {
            defaultOpenerText = rawParams['defaultOpenerText']['content'] ||
                rawParams['defaultOpenerText'];
        }

        return {
            opener: rawParams['opener'],
            defaultOpenerText: defaultOpenerText,
            items: rawParams['items'] ?
                rawParams['items'].map(function(item) {
                    return {
                        label: item['label'],
                        value: item['value']
                    };
                }) :
                []
        };
    };


    /**
     * Init dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom.opener = this.getElementByClass(
            View.CssClass.OPENER
        );

        this.dom.changingOpenerText = this.getElementByClass(
            View.CssClass.OPENER_TEXT_CHANGING
        );

        this.dom.list = this.getElementByClass(
            sm.gList.ViewStendhal.CssClass.ROOT
        );
    };
});  // goog.scope
