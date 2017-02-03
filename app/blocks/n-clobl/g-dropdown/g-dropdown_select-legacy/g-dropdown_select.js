goog.provide('sm.gDropdown.DropdownSelectLegacy');

goog.require('cl.gDropdown.Dropdown');
goog.require('cl.gList.List');
goog.require('sm.gDropdown.TemplateSelectLegacy');
goog.require('sm.gDropdown.ViewSelectLegacy');
goog.require('sm.gList.List.Select');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Dropdown select control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
sm.gDropdown.DropdownSelectLegacy = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


    /**
     * manager of list
     * @type {cl.gList.List}
     * @private
     */
    this.listInstance_ = null;


    /**
     * Selected value
     * @type {number}
     * @private
     */
    this.value_ = null;
};
goog.inherits(sm.gDropdown.DropdownSelectLegacy, cl.gDropdown.Dropdown);

goog.scope(function() {
    var DropdownSelect = sm.gDropdown.DropdownSelectLegacy,
        DropdownView = cl.gDropdown.View;

    /**
     * Name of this element in factory
     */
    DropdownSelect.NAME = sm.gDropdown.TemplateSelectLegacy.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        DropdownSelect.NAME, {
            control: DropdownSelect,
            view: sm.gDropdown.ViewSelectLegacy
        }
    );

    /**
     * Event enum
     * @enum
     */
    DropdownSelect.Event = {
        ITEM_SELECT: cl.gList.List.Event.ITEM_SELECT
    };


    /**
     * @param {Element} element
     * @override
     */
    DropdownSelect.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var Factory = sm.iCloblFactory.FactoryStendhal.getInstance();
        this.listInstance_ = Factory.decorate(
            sm.gList.List.Select.NAME,
            this.getView().getDom().selectList,
            this
        );
    };


    /**
     * @override
     */
    DropdownSelect.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.listInstance_,
            cl.gList.List.Event.ITEM_SELECT,
            this.onListItemSelect_
        );

        this.getHandler().listen(
            document.body,
            goog.events.EventType.CLICK,
            this.onOutsideClick_
        );
    };


    /**
     * Get current selected index
     * @public
     * @return {?number}
     */
    DropdownSelect.prototype.getValue = function() {
        return this.value_;
    };


    /**
     * Get current selected text
     * @public
     * @return {string}
     */
    DropdownSelect.prototype.getSelectedValue = function() {
        var selectedIndex = this.getValue();
        return this.listInstance_.getItemValue(selectedIndex);
    };


    /**
     * Return true if dropdown has value,
     * and set or unset not valid state depends have it value or not
     * @public
     * @return {boolean}
     */
    DropdownSelect.prototype.validate = function() {
        var isValid = false,
            value = this.getValue();

        if (value !== null) {
            isValid = true;
        }

        var view = this.getView();

        if (isValid) {
            view.unsetNotValidState();
        } else {
            view.setNotValidState();
        }

        return isValid;
    };


    /**
     * Clear selection
     */
    DropdownSelect.prototype.clear = function() {
        this.value_ = null;
        this.listInstance_.deselectAll();

        this.getView().clear();
    };


    /**
     * Select item by index
     * @param {number} index
     */
    DropdownSelect.prototype.selectByIndex = function(index) {
        this.value_ = index;

        var openerText = this.listInstance_.getItemValue(index);

        var view = this.getView();
        view.removePlaceholderModifier();
        view.setOpenerCustomText(openerText);
    };


    /**
     * Handler for click on list items
     * @param {Object} event
     * @private
     */
    DropdownSelect.prototype.onListItemSelect_ = function(event) {
        this.selectByIndex(event['itemId']);

        this.validate();
    };


    /**
     * Handler for click on dropdown
     * @param {Object} event
     * @private
     */
    DropdownSelect.prototype.onOutsideClick_ = function(event) {
        if (goog.dom.getAncestorByClass(
                event.target,
                DropdownView.CssClass.OPENER
            ) !==
            this.getElementByClass(DropdownView.CssClass.OPENER)) {

            this.close();
        }
    };
});  // goog.scope
