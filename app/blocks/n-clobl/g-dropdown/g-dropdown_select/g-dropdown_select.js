goog.provide('cl.gDropdownSelect.DropdownSelect');

goog.require('cl.gDropdown.Dropdown');

/**
 * Select control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
cl.gDropdownSelect.DropdownSelect = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    /**
     * manager of list
     * @type {cl.gList.List}
     * @private
     */
    this.listInstance_ = null;
};
goog.inherits(cl.gDropdownSelect.DropdownSelect, cl.gDropdown.Dropdown);

goog.scope(function() {
    var Select = cl.gDropdownSelect.DropdownSelect;

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
            cl.gList.View.Event.ITEM_SELECT,
            this.onListItemSelect_
        );
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
