goog.provide('sm.lCatalog.Catalog');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lCatalog.View');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lCatalog.Catalog = function(view, opt_domHelper) {
        sm.lCatalog.Catalog.base(this, 'constructor', view, opt_domHelper);
    };
    goog.inherits(sm.lCatalog.Catalog, sm.iLayout.LayoutStendhal);

    var Catalog = sm.lCatalog.Catalog;


    /**
     * @param {Element} element
     * @override
     */
    Catalog.prototype.decorateInternal = function(element) {
        Catalog.base(this, 'decorateInternal', element);
    };


});  // goog.scope


/**
 * creates sm.lCatalog.Catalog instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lCatalog.View.CssClass.ROOT
    );

    var view = new sm.lCatalog.View(null, null, 'stendhal');
    var instance = new sm.lCatalog.Catalog(view);

    instance.decorate(domElement);
});
