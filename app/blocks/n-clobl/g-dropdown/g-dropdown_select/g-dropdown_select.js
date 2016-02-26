goog.provide('sm.gDropdown.DropdownSelect');

goog.require('cl.gDropdown.Dropdown');
goog.require('cl.gList.List');

/**
 * Select control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
sm.gDropdown.DropdownSelect = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

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
    var DropdownSelect = sm.gDropdown.DropdownSelect;

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
    };

    /**
     * Handler for click on list items
     * @param {Object} event
     * @private
     */
    DropdownSelect.prototype.onListItemSelect_ = function(event) {
        var openerText = this
            .listInstance_
            .getOpenerText(event['itemId']);

        this.value_ = event.itemId;

        var view = this.getView();
        view.removePlaceholderModifier();
        view.setOpenerCustomText(openerText);

        this.dispatchEvent({
            'type': DropdownSelect.Event.ITEM_SELECT,
            'itemId': event['itemId']
        });
    };

    /**
     * Get current selected value
     * @public
     * @return {number}
     */
    DropdownSelect.prototype.getValue = function() {
        return this.value_;
    };
});
