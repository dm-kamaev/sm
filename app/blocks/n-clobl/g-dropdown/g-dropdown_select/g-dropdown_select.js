goog.provide('sm.gDropdown.DropdownSelect');

goog.require('cl.gDropdown.Dropdown');
goog.require('sm.gDropdown.ViewSelect');



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
     * Instance list
     * @type {sm.gList.ListStendhal}
     * @protected
     */
    this.list = null;
};
goog.inherits(sm.gDropdown.DropdownSelect, cl.gDropdown.Dropdown);


goog.scope(function() {
    var Dropdown = sm.gDropdown.DropdownSelect,
        View = sm.gDropdown.ViewSelect;

    /**
     * Event enum
     * @enum {string}
     */
    Dropdown.Event = {
        OPENER_CLICK: cl.gDropdown.Dropdown.Event.OPENER_CLICK,
        CONTENT_CLICK: cl.gDropdown.Dropdown.Event.CONTENT_CLICK,
        CLOSE_DROPDOWN: cl.gDropdown.Dropdown.Event.CLOSE_DROPDOWN
    };


    /**
     * @param {Element} element
     * @override
     */
    Dropdown.prototype.decorateInternal = function(element) {
        Dropdown.base(this, 'decorateInternal', element);

        this.initList();
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
     * Get value on list item
     * @param {number} itemId
     * @return {string}
     * @public
     */
    Dropdown.prototype.getValue = function(itemId) {
        return this.params.items[itemId].value;
    };


    /**
     * Get label on list item
     * @param {number} itemId
     * @return {string}
     * @public
     */
    Dropdown.prototype.getLabel = function(itemId) {
        return this.params.items[itemId].label;
    };


    /**
     * Handler for click on list items
     * @param {goog.events.Event} event
     * @protected
     */
    Dropdown.prototype.onListItemSelect = function(event) {
        var itemId = event['itemId'];

        this.dispatchEvent({
            'type': Dropdown.Event.CONTENT_CLICK,
            'data': this.getValue(itemId)
        });

        if (this.params.isChangingOpenerText) {
            var openerText = this.getLabel(itemId);
            this.getView().changeOpenerText(openerText);
        }
    };


    /**
     * Initializes instance of list
     * @protected
     */
    Dropdown.prototype.initList = function() {
        this.list = this.decorateChild(
            'list',
            this.getView().getDom().list
        );
    };
});  // goog.scope
