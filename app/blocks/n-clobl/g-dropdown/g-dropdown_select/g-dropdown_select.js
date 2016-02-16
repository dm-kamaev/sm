goog.provide('sm.gDropdownSelect.DropdownSelect');

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
sm.gDropdownSelect.DropdownSelect = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    /**
     * manager of list
     * @type {cl.gList.List}
     * @private
     */
    this.listInstance_ = null;
};
goog.inherits(sm.gDropdownSelect.DropdownSelect, cl.gDropdown.Dropdown);

goog.scope(function() {
    var Select = sm.gDropdownSelect.DropdownSelect;

    /**
     * Event enum
     * @enum
     */
    Select.Event = {
        ITEM_SELECT: cl.gList.List.Event.ITEM_SELECT,
        CONTROL_CLICK: sm.gDropdownSelect.View.Event.CONTROL_CLICK
    };

    /**
     * @param {Element} element
     * @override
     */
    Select.prototype.decorateInternal = function(element) {
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
    Select.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        this.getHandler().listen(
            this.listInstance_,
            cl.gList.List.Event.ITEM_SELECT,
            this.onListItemSelect_
        );

        this.autoDispatch(sm.gDropdownSelect.View.Event.CONTROL_CLICK);
    };

    /**
     * Handler for click on list items
     * @param {Object} event
     * @private
     */
    Select.prototype.onListItemSelect_ = function(event) {
        var openerText = this
            .listInstance_
            .getOpenerText(event.itemId);

        var view = this.getView();
        view.removePlaceholderModifier();
        view.setOpenerCustomText(openerText);
    };
});
