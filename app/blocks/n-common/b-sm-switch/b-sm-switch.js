goog.provide('sm.bSmSwitch.SmSwitch');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmSwitch.Template');
goog.require('sm.bSmSwitch.View');



/**
 *
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSwitch.SmSwitch = function(view, opt_params, opt_domHelper) {
    sm.bSmSwitch.SmSwitch.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * Instance list
     * @type {Array<sm.bSmLink.SmLink>}
     * @protected
     */
    this.items = [];


    /**
     * id of selected link
     * @type {?number}
     * @private
     */
    this.selectedLinkId_ = null;

};
goog.inherits(sm.bSmSwitch.SmSwitch, cl.iControl.Control);


goog.scope(function() {
    var Switch = sm.bSmSwitch.SmSwitch,
        View = sm.bSmSwitch.View;

    /**
     * NAme of this element in factory
     * @const {string}
     */
    Switch.NAME = sm.bSmSwitch.Template.NAME();


    /**
     * Event enum
     * @enum {string}
     */
    Switch.Event = {
        CLICK: sm.bSmLink.SmLink.Event.CLICK,
        ITEM_SELECT: sm.bSmSwitch.Event.ItemSelect.Type
    };


    /**
     * @override
     * @public
     */
    Switch.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.items.forEach(function(item, i) {
            this.getHandler().listen(
                item,
                Switch.Event.CLICK,
                this.onItemClick_.bind(this, i)
            );
        }, this);
    };


    /**
     * control presence of class SELECTED
     * @param {number} id
     * @public
     */
    Switch.prototype.selectItem = function(id) {
        this.selectedLinkId_ = id;

        this.items.forEach(function(item) {
            item.deselect();
        });
        this.items[id].select();

        this.getView().selectItem(id);
    };


    /**
     * select default element
     * @public
     */
    Switch.prototype.reset = function() {
        var id = this.params.selectedItemId;
        this.selectItem(id);
    };


    /**
     * Get id on list item (index in array)
     * @param {number} value
     * @return {number}
     * @public
     */
    Switch.prototype.getItemId = function(value) {
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
    Switch.prototype.getValue = function() {
        return this.getSelectedItemData().value;
    };


    /**
     * Set value on list item
     * @param {string} value
     * @override
     * @public
     */
    Switch.prototype.setValue = function(value) {
        var id = this.getItemId(value);
        this.selectItem(id);
    };


    /**
     * get data from selected item
     * @return {{
     *     value: (string|number|undefined),
     *     label: string
     * }}
     * @public
     */
    Switch.prototype.getSelectedItemData = function() {
        return this.params.items[this.selectedLinkId_];
    };


    /**
     * Item click handler
     * @param {number} id
     * @private
     */
    Switch.prototype.onItemClick_ = function(id) {
        if (id !== this.selectedLinkId_) {
            this.selectItem(id);
            var params = this.getSelectedItemData();
            var event = new sm.bSmSwitch.Event.ItemSelect(params);
            this.dispatchEvent(event);
        }
    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Switch.prototype.decorateInternal = function(element) {
        Switch.base(this, 'decorateInternal', element);

        var links = this.getView().getDom().links;
        this.items = this.decorateChildren(
            sm.bSmLink.SmLink.NAME,
            links
        );
    };


    /**
     * Register control in factory
     */
    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        Switch.NAME, {
            control: Switch,
            view: View
        }
    );
});  // goog.scope
