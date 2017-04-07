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
    Switch.prototype.selectLink = function(id) {
        this.selectedLinkId_ = id;

        this.items.forEach(function(item) {
            item.deselect();
        });
        this.items[id].select();

        this.getView().selectLink(id);
    };


    /**
     * select default element
     * @public
     */
    Switch.prototype.reset = function() {
        var id = this.params.selectedItemId;
        this.selectLink(id);
    };


    /**
     * Item click handler
     * @param {number} id
     * @private
     */
    Switch.prototype.onItemClick_ = function(id) {
        if (id != this.selectedLinkId_) {
            this.selectLink(id);
            var params = this.params.items[id];
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
