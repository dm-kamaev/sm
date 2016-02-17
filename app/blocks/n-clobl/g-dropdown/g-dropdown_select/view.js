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
        ROOT: 'g-dropdown_select',
        NOT_SELECTED: 'g-dropdown_not-selected'
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
     * Adds placeholder modifier from element with custom text
     * @protected
     */
    View.prototype.addPlaceholderModifier = function() {
        goog.dom.classes.add(
            this.dom.customText,
            View.CssClass.PLACEHOLDER
        );
    };

    /**
     * Add not selected modifier
     * @public
     */
    View.prototype.addNotSelectedModifier = function() {
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.NOT_SELECTED
        );
    };

    /**
     * Remove not selected modifier
     * @public
     */
    View.prototype.removeNotSelectedModifier = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.NOT_SELECTED
        );
    };
});

