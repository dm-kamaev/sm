goog.provide('sm.bSmCatalog.SmCatalog');

goog.require('cl.iControl.Control');


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
            'smHeadedList',
            this.getView().getDom().items
        );
    };

});  // goog.scope
