/**
 * @fileoverview Page with error not found
 */
goog.provide('sm.lErrorNotFound.ErrorNotFound');

goog.require('sm.bSmItem.SmItemCompact');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lErrorNotFound.Template');
goog.require('sm.lErrorNotFound.View');



goog.scope(function() {
    var View = sm.lErrorNotFound.View;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lErrorNotFound.ErrorNotFound = function(view, opt_domHelper) {
        sm.lErrorNotFound.ErrorNotFound.base(this, 'constructor', view,
            opt_domHelper);

        /**
         * HeadedList Instance
         * @type {?sm.bSmItemList.SmItemList}
         * @private
         */
        this.popular_ = null;


        /**
         * ItemCompact Instance
         * @type {?sm.bSmItem.SmItemCompact}
         * @private
         */
        this.catalog_ = null;
    };
    goog.inherits(sm.lErrorNotFound.ErrorNotFound, sm.iLayout.LayoutStendhal);
    var ErrorNotFound = sm.lErrorNotFound.ErrorNotFound;


    /**
     * Name of this element in factory
     * @const {string}
     */
    ErrorNotFound.NAME = sm.lErrorNotFound.Template.NAME();


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    ErrorNotFound.prototype.decorateInternal = function(element) {
        ErrorNotFound.base(this, 'decorateInternal', element);

        this.initSectionPopular_();
    };


    /**
     * Init popular
     * @private
     */
    ErrorNotFound.prototype.initSectionPopular_ = function() {
        var dom = this.getView().getDom();

        if (dom.popular) {
            this.popular_ = this.decorateChild(
                sm.bSmItemList.SmItemList.NAME,
                dom.popular
            );
        }

        if (dom.catalog) {
            this.catalog_ = this.decorateChild(
                sm.bSmItem.SmItemCompact.NAME,
                dom.catalog
            );
        }
    };

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        ErrorNotFound.NAME, {
            control: ErrorNotFound,
            view: View
        }
    );
});  // goog.scope


/**
 * creates sm.lErrorNotFound.ErrorNotFound instance
 */
jQuery(function() {
    sm.iLayout.LayoutStendhal.autoInstance(
        sm.lErrorNotFound.ErrorNotFound.NAME,
        sm.lErrorNotFound.View.CssClass.ROOT
    );
});
