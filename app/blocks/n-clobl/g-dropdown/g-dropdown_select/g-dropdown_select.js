goog.provide('sm.gDropdown.DropdownSelect');

goog.require('cl.gDropdown.Dropdown');
goog.require('cl.gList.List');



/**
 * Dropdown select control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
sm.gDropdown.DropdownSelect = function(view, opt_domHelper) {
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
goog.inherits(sm.gDropdown.DropdownSelect, cl.gDropdown.Dropdown);

goog.scope(function() {
    var DropdownSelect = sm.gDropdown.DropdownSelect,
        DropdownView = cl.gDropdown.View;


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

        var factoryManager = cl.iFactory.FactoryManager.getInstance();
        this.listInstance_ = factoryManager.decorate(
            this.getView().getStylization(),
            'list-select',
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

        this.dispatchEvent({
            'type': DropdownSelect.Event.ITEM_SELECT,
            'itemId': event['itemId']
        });
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
