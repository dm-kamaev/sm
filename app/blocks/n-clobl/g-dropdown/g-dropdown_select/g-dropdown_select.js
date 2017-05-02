goog.provide('sm.gDropdown.DropdownSelect');

goog.require('cl.gDropdown.Dropdown');
goog.require('sm.gDropdown.Event.ItemSelect');
goog.require('sm.gDropdown.TemplateSelect');
goog.require('sm.gDropdown.ViewSelect');
goog.require('sm.gList.ListStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Dropdown control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
sm.gDropdown.DropdownSelect = function(view, opt_params, opt_domHelper) {
    sm.gDropdown.DropdownSelect.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * @type {sm.gDropdown.ViewSelect.Params}
     * @override
     * @protected
     */
    this.params = view.getParams() || {};


    /**
     * Instance list
     * @type {sm.gList.ListStendhal}
     * @protected
     */
    this.list = null;


    /**
     * Data of the selected item
     * @type {{
     *     value: (string|number),
     *     label: string
     * }}
     * @protected
     */
    this.selectedItemData = {};
};
goog.inherits(sm.gDropdown.DropdownSelect, cl.gDropdown.Dropdown);


goog.scope(function() {
    var Dropdown = sm.gDropdown.DropdownSelect,
        View = sm.gDropdown.ViewSelect;

    var Event = sm.gDropdown.Event;

    /**
     * Name of this element in factory
     */
    Dropdown.NAME = sm.gDropdown.TemplateSelect.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Dropdown.NAME, {
        control: Dropdown,
        view: View
    });

    /**
     * @typedef {sm.gDropdown.ViewSelect.Params}
     */
    sm.gDropdown.DropdownSelect.Params;


    /**
     * Event enum
     * @enum {string}
     */
    Dropdown.Event = {
        OPENER_CLICK: cl.gDropdown.Dropdown.Event.OPENER_CLICK,
        CONTENT_CLICK: cl.gDropdown.Dropdown.Event.CONTENT_CLICK,
        CLOSE_DROPDOWN: cl.gDropdown.Dropdown.Event.CLOSE_DROPDOWN,
        ITEM_SELECT: Event.ItemSelect.Type
    };


    /**
     * @param {Element} element
     * @override
     */
    Dropdown.prototype.decorateInternal = function(element) {
        Dropdown.base(this, 'decorateInternal', element);

        this.initList();
        this.initDefaultSelectedItem_();
    };


    /**
     * @override
     */
    Dropdown.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.list,
            sm.gList.ListStendhal.Event.ITEM_SELECT,
            this.onListItemSelect
        );
    };


    /**
     * Get id on list item (index in array)
     * @param {number} value
     * @return {number}
     * @public
     */
    Dropdown.prototype.getItemId = function(value) {
        return goog.array.findIndex(this.params.items, function(item) {
            return item.value == value;
        });
    };


    /**
     * Get value on list item
     * @return {?string}
     * @override
     * @public
     */
    Dropdown.prototype.getValue = function() {
        return this.getSelectedItemData().value;
    };


    /**
     * Set value on list item
     * @param {string} value
     * @override
     * @public
     */
    Dropdown.prototype.setValue = function(value) {
        var id = this.getItemId(value);
        this.selectItem(id);
        this.list.select(id);
    };


    /**
     * Get label on list item
     * @return {?string}
     * @public
     */
    Dropdown.prototype.getLabel = function() {
        return this.getSelectedItemData().label;
    };


    /**
     * Get dropdown name
     * @return {?string}
     * @public
     */
    Dropdown.prototype.getName = function() {
        return this.params.name || null;
    };


    /**
     * Set opener default and reset selected item data
     * @public
     */
    Dropdown.prototype.reset = function() {
        this.setSelectedItemData(null);
        this.list.deselectAll();

        var lastItem = this.params.items[this.params.items.length - 1];
        this.getView().changeOpenerText(lastItem.label);
    };


    /**
     * Return true if dropdown has value,
     * and set or unset not valid state depends have it value or not
     * @return {boolean}
     * @public
     */
    Dropdown.prototype.validate = function() {
        var value = this.getValue(),
            isValid = goog.isDefAndNotNull(value);

        this.getView().setStateValidity(isValid);

        return isValid;
    };


    /**
     * Get true if item was selected else - false
     * @return {boolean}
     * @public
     */
    Dropdown.prototype.isSelected = function() {
        return !goog.object.isEmpty(this.selectedItemData);
    };


    /**
     * Select item
     * @param {number} itemId
     * @public
     */
    Dropdown.prototype.selectItem = function(itemId) {
        this.setSelectedItemData(itemId);

        var openerText = this.generateOpenerText(itemId);
        this.getView().changeOpenerText(openerText);
    };


    /**
     * Get selected item data
     * @return {{
     *     value: (string|number),
     *     label: (string)
     * }}
     * @public
     */
    Dropdown.prototype.getSelectedItemData = function() {
        return this.selectedItemData;
    };


    /**
     * Set selected item data
     * @param {number} itemId
     * @protected
     */
    Dropdown.prototype.setSelectedItemData = function(itemId) {
        var value = this.getValueById_(itemId);

        if (goog.isDefAndNotNull(value)) {
            this.getView().setStateValidity(true);

            this.selectedItemData = {
                value: value,
                label: this.getLabelById_(itemId)
            };
        } else {
            this.selectedItemData = {};
        }
    };


    /**
     * Handler for click on list items
     * @param {goog.events.Event} event
     * @protected
     */
    Dropdown.prototype.onListItemSelect = function(event) {
        var itemId = event['itemId'];

        this.selectItem(itemId);

        var event = new Event.ItemSelect(this.getSelectedItemData(), this);
        this.dispatchEvent(event);
    };


    /**
     * Generate Opener Text
     * @param {number} itemId
     * @return {string}
     * @protected
     */
    Dropdown.prototype.generateOpenerText = function(itemId) {
        return this.getLabel(itemId);
    };


    /**
     * Initializes instance of list
     * @protected
     */
    Dropdown.prototype.initList = function() {
        this.list = this.decorateChild(
            sm.gList.ListStendhal.NAME,
            this.getView().getDom().list
        );
    };


    /**
     * Init default selected item
     * @private
     */
    Dropdown.prototype.initDefaultSelectedItem_ = function() {
        var itemId = goog.array.findIndex(this.params.items, function(item) {
            return item.isSelected;
        });

        if (~itemId) {
            this.selectItem(itemId);
        }
    };


    /**
     * Get value on list item by item id
     * @param {number} itemId
     * @return {?string}
     * @private
     */
    Dropdown.prototype.getValueById_ = function(itemId) {
        return this.params.items[itemId] ?
            this.params.items[itemId].value :
            null;
    };


    /**
     * Get label on list item by item id
     * @param {number} itemId
     * @return {?string}
     * @private
     */
    Dropdown.prototype.getLabelById_ = function(itemId) {
        return this.params.items[itemId] ?
            this.params.items[itemId].label :
            null;
    };
});  // goog.scope
