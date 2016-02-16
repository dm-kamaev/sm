goog.provide('sm.gDropdownSelect.View');

goog.require('cl.gDropdown.View');

/**
 * Dropdown control
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gDropdown.View}
 */
sm.gDropdownSelect.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.gDropdownSelect.View, cl.gDropdown.View);

goog.scope(function() {
    var View = sm.gDropdownSelect.View,
        ListView = cl.gList.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        CUSTOM_TEXT: 'g-dropdown__opener-custom-text',
        PLACEHOLDER: 'g-dropdown__opener-text_placeholder',
        ROOT: 'g-dropdown_select'
    };

    /**
     * Event enum
     */
    View.Event = {
        CONTROL_CLICK: 'control-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.customText = this.getElementByClass(View.CssClass.CUSTOM_TEXT);
        this.dom.selectList = this.getElementByClass(ListView.CssClass.ROOT);
    };

    /**
     * Set text to custom text in opener
     * @param {string} text
     * @protected
     */
    View.prototype.setOpenerCustomText = function(text) {
        goog.dom.setTextContent(
            this.dom.customText,
            text
        );
    };

    /**
     * Removes placeholder modifier from element with custom text
     * @protected
     */
    View.prototype.removePlaceholderModifier = function() {
        goog.dom.classes.remove(
            this.dom.customText,
            View.CssClass.PLACEHOLDER
        );
    };

    /**
     * Dropdown onclick handler
     * @protected
     * @override
     */
    View.prototype.onControlClick = function() {
        this.toggle();
        console.log({
            'type': View.Event.CONTROL_CLICK
        });
        this.dispatchEvent({
            type: View.Event.CONTROL_CLICK
        });
    };
});

