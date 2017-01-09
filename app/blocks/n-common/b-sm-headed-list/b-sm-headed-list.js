goog.provide('sm.bSmHeadedList.SmHeadedList');

goog.require('cl.iControl.Control');


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
    var HeadedList = sm.bSmHeadedList.SmHeadedList;


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
            'smItemList',
            this.getView().getDom().itemList
        );
    };

});  // goog.scope
