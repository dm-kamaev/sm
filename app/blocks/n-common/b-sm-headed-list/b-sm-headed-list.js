goog.provide('sm.bSmHeadedList.SmHeadedList');

goog.require('cl.iControl.Control');
goog.require('sm.bSmHeadedList.Template');
goog.require('sm.bSmHeadedList.View');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.iCloblFactory.FactoryStendhal');


goog.scope(function() {



    /**
     * Headed List block
     * It contains list and header
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmHeadedList.SmHeadedList = function(view, opt_domHelper) {
        sm.bSmHeadedList.SmHeadedList.base(
            this, 'constructor', view, opt_domHelper
        );

    };
    goog.inherits(sm.bSmHeadedList.SmHeadedList, cl.iControl.Control);
    var HeadedList = sm.bSmHeadedList.SmHeadedList,
        View = sm.bSmHeadedList.View;

    /**
     * Name of this element in factory
     */
    HeadedList.NAME = sm.bSmHeadedList.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(HeadedList.NAME, {
        control: HeadedList,
        view: View
    });


    /**
     * @override
     * @param {Element} element
     */
    HeadedList.prototype.decorateInternal = function(element) {
        HeadedList.base(this, 'decorateInternal', element);

        this.initList_();
    };


    /**
     * @override
     */
    HeadedList.prototype.enterDocument = function() {
        HeadedList.base(this, 'enterDocument');
    };


    /**
     * Init item list
     * @private
     */
    HeadedList.prototype.initList_ = function() {
        this.decorateChild(
            sm.bSmItemList.SmItemList.NAME,
            this.getView().getDom().itemList
        );
    };

});  // goog.scope
