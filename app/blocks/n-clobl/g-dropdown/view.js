goog.provide('sm.gDropdown.ViewStendhal');

goog.require('cl.gDropdown.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom');



/**
 * Dropdown View Stendhal
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gDropdown.View}
 */
sm.gDropdown.ViewStendhal = function(opt_params, opt_template, opt_modifier) {
    sm.gDropdown.ViewStendhal.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );
};
goog.inherits(sm.gDropdown.ViewStendhal, cl.gDropdown.View);


goog.scope(function() {
    var View = sm.gDropdown.ViewStendhal,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-dropdown_stendhal',
        ICON_ARROW_UP: 'g-dropdown__opener-arrow-icon_up',
        ICON_ARROW_DOWN: 'g-dropdown__opener-arrow-icon_down'
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
     * Hide list element
     * @override
     */
    View.prototype.close = function() {
        View.base(this, 'close');


    };

    /**
     * Show list element
     * @override
     */
    View.prototype.open = function() {
        View.base(this, 'open');


    };


    /**
     * Toggle list element visibility
     * @override
     */
    View.prototype.toggle = function() {
        View.base(this, 'toggle');
    };


    /**
     * Toggle icon arrow
     * @private
     */
    View.prototype.toggleIconArrow_ = function() {
        if (this.dom.iconArrowUp && this.dom.iconArrowDown) {
            goog.dom.classlist.toggle(
                this.dom.iconArrowUp,
                Utils.CssClass.HIDDEN
            );

            goog.dom.classlist.toggle(
                this.dom.iconArrowDown,
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Init dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom.iconArrowUp = this.getElementByClass(
            View.CssClass.ICON_ARROW_UP
        );

        this.dom.iconArrowDown = this.getElementByClass(
            View.CssClass.ICON_ARROW_DOWN
        );
    };
});  // goog.scope
