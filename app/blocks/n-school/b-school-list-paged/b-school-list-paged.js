goog.provide('sm.bSchoolListPaged.SchoolListPaged');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bSchoolListItem.SchoolListItem');
goog.require('sm.bSchoolListPaged.View');



/**
 * SchoolListPaged
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSchoolListPaged.SchoolListPaged = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


    /**
     * school List Items
     * @type {sm.bSchoolListItem.SchoolListItem}
     * @private
     */
    this.items_ = [];


    /**
     * Render params for current list items
     * @type {Array<Object>}
     * @private
     */
    this.itemsParams_ = [];
};
goog.inherits(sm.bSchoolListPaged.SchoolListPaged, cl.iControl.Control);


goog.scope(function() {
     var SchoolListPaged = sm.bSchoolListPaged.SchoolListPaged,
        View = sm.bSchoolListPaged.View,
        SchoolListItem = sm.bSchoolListItem.SchoolListItem,
        FactoryManager = cl.iFactory.FactoryManager;


    /**
     * @override
     * @param {Element} element
     */
    SchoolListPaged.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initItems_();
        this.initItemsParams_();
    };


    /**
     * Add one item to the top page
     * @param {Object} item
     */
    SchoolListPaged.prototype.addItem = function(item) {
        this.removeItems_();
        this.itemsParams_.unshift(item);
        this.updateItems_();
    };


    /**
     * Remove item with given id
     * @param {number} itemId
     */
    SchoolListPaged.prototype.removeItem = function(itemId) {
        this.removeItems_();
        this.itemsParams_ = goog.array.filter(
            this.itemsParams_,
            function(itemParams) {
                return itemParams.id != itemId;
            }
        );
        this.updateItems_();
    };


    /**
     * If empty return false
     * @return {boolean}
     */
    SchoolListPaged.prototype.isNotEmpty = function() {
        return !!this.itemsParams_.length;
    };


    /**
     * Remove all items from list and from items array
     * @private
     */
    SchoolListPaged.prototype.removeItems_ = function() {
        this.removeChildren(true);
        this.items_ = [];
    };


    /**
     * Render item lists with refreshed item params array
     * @private
     */
    SchoolListPaged.prototype.updateItems_ = function() {
        this.getView().updateItems(this.itemsParams_);
        this.initItems_(this.itemsParams_);
    };


    /**
     * Init item params for each added item
     * @private
     */
    SchoolListPaged.prototype.initItemsParams_ = function() {
        this.itemsParams_ = this.items_.map(function(item) {
            return item.getParams();
        });
    };


    /**
     * init School List Items
     * @param {Array.<sm.bSchoolListItem.SchoolListItem.Params>=} opt_itemsParams
     * @private
     */
    SchoolListPaged.prototype.initItems_ = function(opt_itemsParams) {
        var itemInstance,
            itemsParams = opt_itemsParams || [],
            item,
            itemParams;

        var itemsAmount = this.getView().getDom().schoolListItems.length;

        for (var i = 0; i < itemsAmount; i++) {
            item = this.getView().getDom().schoolListItems[i];
            itemParams = itemsParams[i];

            itemInstance = new SchoolListItem(itemParams);
            this.addChild(itemInstance);
            this.items_.push(itemInstance);
            itemInstance.decorate(item);
        }
    };
});  // goog.scope
