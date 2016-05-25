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
    this.schoolListItems_ = [];
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

        this.initSchoolListItems_();
    };


    /**
     * init School List Items
     * @private
     */
    SchoolListPaged.prototype.initSchoolListItems_ = function() {
        var schoolListItemInstance,
            item;

        var lengthList = this.getView().getDom().schoolListItems.length;

        for (var i = 0; i < lengthList; i++) {
            item = this.getView().getDom().schoolListItems[i];

            schoolListItemInstance = new SchoolListItem();

            this.addChild(schoolListItemInstance);
            this.schoolListItems_.push(schoolListItemInstance);
            schoolListItemInstance.decorate(item);
        }
    };
});  // goog.scope
