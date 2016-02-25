goog.provide('sm.gDropdown.DropdownSelectView');

goog.require('cl.gDropdown.View');

/**
 * Dropdown control
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gDropdown.View}
 */
sm.gDropdown.DropdownSelectView =
    function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.gDropdown.DropdownSelectView, cl.gDropdown.View);

goog.scope(function() {
    var DropdownSelectView = sm.gDropdown.DropdownSelectView;

    /**
     * Css class enum
     * @enum {string}
     */
    DropdownSelectView.CssClass = {
        CUSTOM_TEXT: 'g-dropdown__opener-custom-text',
        PLACEHOLDER: 'g-dropdown__opener-text_placeholder',
        ROOT: 'g-dropdown_select',
        NOT_SELECTED: 'g-dropdown_not-selected'
    };


    /**
     * @override
     * @param {Element} element
     */
    DropdownSelectView.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.dom.customText = this.getElementByClass(
            DropdownSelectView.CssClass.CUSTOM_TEXT
        );
        this.dom.selectList = this.getElementByClass(
            cl.gList.View.CssClass.ROOT
        );
    };

    /**
     * Set text to custom text in opener
     * @param {string} text
     * @protected
     */
    DropdownSelectView.prototype.setOpenerCustomText = function(text) {
        goog.dom.setTextContent(
            this.dom.customText,
            text
        );
    };

    /**
     * Removes placeholder modifier from element with custom text
     * @protected
     */
    DropdownSelectView.prototype.removePlaceholderModifier = function() {
        goog.dom.classes.remove(
            this.dom.customText,
            DropdownSelectView.CssClass.PLACEHOLDER
        );
    };

    /**
     * Adds placeholder modifier from element with custom text
     * @protected
     */
    DropdownSelectView.prototype.addPlaceholderModifier = function() {
        goog.dom.classes.add(
            this.dom.customText,
            DropdownSelectView.CssClass.PLACEHOLDER
        );
    };

    /**
     * Add not selected modifier
     * @public
     */
    DropdownSelectView.prototype.addNotSelectedModifier = function() {
        goog.dom.classes.add(
            this.getElement(),
            DropdownSelectView.CssClass.NOT_SELECTED
        );
    };

    /**
     * Remove not selected modifier
     * @public
     */
    DropdownSelectView.prototype.removeNotSelectedModifier = function() {
        goog.dom.classes.remove(
            this.getElement(),
            DropdownSelectView.CssClass.NOT_SELECTED
        );
    };
});

