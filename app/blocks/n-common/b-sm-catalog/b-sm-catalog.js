goog.provide('sm.bSmCatalog.SmCatalog');

goog.require('cl.iControl.Control');
goog.require('sm.bSmCatalog.Template');
goog.require('sm.bSmCatalog.View');
goog.require('sm.bSmHeadedList.SmHeadedList');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');


goog.scope(function() {



    /**
     * Catalog block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmCatalog.SmCatalog = function(view, opt_domHelper) {
        sm.bSmCatalog.SmCatalog.base(
            this, 'constructor', view, opt_domHelper
        );
    };
    goog.inherits(sm.bSmCatalog.SmCatalog, cl.iControl.Control);
    var Catalog = sm.bSmCatalog.SmCatalog;

    /**
     * Name of this element in factory
     */
    Catalog.NAME = sm.bSmCatalog.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Catalog.NAME, {
        control: Catalog,
        view: sm.bSmCatalog.View
    });

    /**
     * @override
     * @param {Element} element
     */
    Catalog.prototype.decorateInternal = function(element) {
        Catalog.base(this, 'decorateInternal', element);

        this.initItems_();
    };


    /**
     * @override
     */
    Catalog.prototype.enterDocument = function() {
        Catalog.base(this, 'enterDocument');
    };


    /**
     * Init catalog items
     * @private
     */
    Catalog.prototype.initItems_ = function() {
        this.decorateChildren(
            sm.bSmHeadedList.SmHeadedList.NAME,
            this.getView().getDom().items
        );
    };

});  // goog.scope
